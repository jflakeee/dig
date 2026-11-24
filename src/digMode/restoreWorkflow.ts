import {
  validateTrainSave,
  type TrainSaveResult,
  type TrainSaveState,
} from './trainSave';

export type CurrentTrainSnapshot = Readonly<{
  state: TrainSaveState;
  /** Raw localStorage value; null represents an empty train save. */
  revision: string | null;
}>;

export type RestoreWorkflowResult =
  | 'restored'
  | 'invalid-code'
  | 'backup-failed'
  | 'clipboard-failed'
  | 'save-conflict'
  | 'save-failed';

export type RestoreWorkflowServices = Readonly<{
  /** Decode and validate a shareable train-progress code. */
  decodeRestoreCode(code: string): Promise<unknown>;
  /** Read the current train save and its raw storage revision. */
  readCurrentSnapshot(): Promise<CurrentTrainSnapshot>;
  /** Encode train progress as an obfuscated, non-secret share code. */
  encodeBackupCode(snapshot: TrainSaveState): Promise<string>;
  /** Copy the generated backup code to the user's clipboard. */
  copyToClipboard(code: string): Promise<void>;
  /** Persist only if storage still matches the supplied revision. */
  persistRestoredState(
    state: TrainSaveState,
    expectedRevision: string | null,
  ): Promise<TrainSaveResult>;
}>;

function sameTrainSave(left: TrainSaveState, right: TrainSaveState): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

/**
 * A restore is committed only after the current train snapshot has been
 * encoded, round-trip validated, and copied to the clipboard. The write uses
 * compare-and-swap so progress made during asynchronous work cannot be lost.
 * The share code is obfuscated, not encrypted; it contains train progress only.
 */
export async function restoreTrainFromSharedCode(
  code: string,
  services: RestoreWorkflowServices,
): Promise<RestoreWorkflowResult> {
  if (typeof code !== 'string' || code.trim().length < 16 || code.length > 200000) {
    return 'invalid-code';
  }

  let restoredState: TrainSaveState;
  try {
    restoredState = validateTrainSave(await services.decodeRestoreCode(code));
  } catch {
    return 'invalid-code';
  }

  let snapshot: CurrentTrainSnapshot;
  let snapshotState: TrainSaveState;
  let backupCode: string;
  try {
    snapshot = await services.readCurrentSnapshot();
    if (!snapshot || (snapshot.revision !== null && typeof snapshot.revision !== 'string')) {
      return 'backup-failed';
    }
    snapshotState = validateTrainSave(snapshot.state);
    backupCode = await services.encodeBackupCode(snapshotState);
    if (typeof backupCode !== 'string' || backupCode.trim().length < 16 || backupCode.length > 200000) {
      return 'backup-failed';
    }
    const verifiedBackup = validateTrainSave(await services.decodeRestoreCode(backupCode));
    if (!sameTrainSave(snapshotState, verifiedBackup)) return 'backup-failed';
  } catch {
    return 'backup-failed';
  }

  try {
    await services.copyToClipboard(backupCode);
  } catch {
    return 'clipboard-failed';
  }

  try {
    const result = await services.persistRestoredState(restoredState, snapshot.revision);
    if (result === 'saved') return 'restored';
    if (result === 'conflict') return 'save-conflict';
    return 'save-failed';
  } catch {
    return 'save-failed';
  }
}
