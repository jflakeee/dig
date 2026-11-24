import {
  validateTrainSave,
  type TrainSaveResult,
  type TrainSaveState,
} from './trainSave';

export type RestoreWorkflowResult =
  | 'restored'
  | 'invalid-code'
  | 'backup-failed'
  | 'clipboard-failed'
  | 'save-failed';

export type RestoreWorkflowServices = Readonly<{
  /** Decode/decrypt a shared restore code using the service's managed keys. */
  decodeRestoreCode(code: string): Promise<unknown>;
  /** Encode the current train snapshot as a code that can later be restored. */
  encodeBackupCode(snapshot: TrainSaveState): Promise<string>;
  /** Copy the generated backup code to the user's clipboard. */
  copyToClipboard(code: string): Promise<void>;
  /** Persist the incoming train state without changing the current world session. */
  persistRestoredState(state: TrainSaveState): Promise<TrainSaveResult>;
}>;

/**
 * A restore is committed only after the current train snapshot has been
 * encoded as a backup code and copied to the clipboard. World/session data is excluded.
 */
export async function restoreTrainFromSharedCode(
  code: string,
  currentState: TrainSaveState,
  services: RestoreWorkflowServices,
): Promise<RestoreWorkflowResult> {
  if (typeof code !== 'string' || code.trim().length < 8 || code.length > 200000) {
    return 'invalid-code';
  }

  let restoredState: TrainSaveState;
  try {
    restoredState = validateTrainSave(await services.decodeRestoreCode(code));
  } catch {
    return 'invalid-code';
  }

  let backupCode: string;
  try {
    const snapshot = validateTrainSave(currentState);
    backupCode = await services.encodeBackupCode(snapshot);
    if (typeof backupCode !== 'string' || backupCode.trim().length < 8 || backupCode.length > 200000) {
      return 'backup-failed';
    }
  } catch {
    return 'backup-failed';
  }

  try {
    await services.copyToClipboard(backupCode);
  } catch {
    return 'clipboard-failed';
  }

  try {
    return await services.persistRestoredState(restoredState) === 'saved'
      ? 'restored'
      : 'save-failed';
  } catch {
    return 'save-failed';
  }
}
