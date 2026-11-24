import {
  validateTrainSave,
  type TrainSaveResult,
  type TrainSaveState,
} from './trainSave';

export type VerifiedMailbox = Readonly<{
  email: string;
  verificationToken: string;
}>;

export type RestoreWorkflowResult =
  | 'restored'
  | 'verification-required'
  | 'verification-failed'
  | 'invalid-code'
  | 'backup-failed'
  | 'save-failed';

export type RestoreWorkflowServices = Readonly<{
  /** Must return a mailbox grant issued only after successful email verification. */
  verifyMailbox(): Promise<VerifiedMailbox | null>;
  /** Decode/decrypt a shared restore code using the service's managed keys. */
  decodeRestoreCode(code: string): Promise<unknown>;
  /** Encrypt the current train snapshot for the verified mailbox. */
  encryptCurrentBackup(
    mailbox: VerifiedMailbox,
    snapshot: TrainSaveState,
  ): Promise<string>;
  /** Resolve only after the backup email has been accepted for delivery. */
  sendBackupEmail(mailbox: VerifiedMailbox, encryptedBackup: string): Promise<void>;
  /** Persist the incoming train state without changing the current world session. */
  persistRestoredState(state: TrainSaveState): Promise<TrainSaveResult>;
}>;

/**
 * A restore is committed only after the current train snapshot has been
 * encrypted and emailed to a verified address. World/session data is excluded.
 */
export async function restoreTrainFromSharedCode(
  code: string,
  currentState: TrainSaveState,
  services: RestoreWorkflowServices,
): Promise<RestoreWorkflowResult> {
  if (typeof code !== 'string' || code.trim().length < 8 || code.length > 200000) {
    return 'invalid-code';
  }

  let mailbox: VerifiedMailbox | null;
  try {
    mailbox = await services.verifyMailbox();
  } catch {
    return 'verification-failed';
  }
  if (!mailbox || !mailbox.email || !mailbox.verificationToken) {
    return 'verification-required';
  }

  let restoredState: TrainSaveState;
  try {
    restoredState = validateTrainSave(await services.decodeRestoreCode(code));
  } catch {
    return 'invalid-code';
  }

  let encryptedBackup: string;
  try {
    const snapshot = validateTrainSave(currentState);
    encryptedBackup = await services.encryptCurrentBackup(mailbox, snapshot);
    if (!encryptedBackup || typeof encryptedBackup !== 'string') return 'backup-failed';
    await services.sendBackupEmail(mailbox, encryptedBackup);
  } catch {
    return 'backup-failed';
  }

  try {
    return await services.persistRestoredState(restoredState) === 'saved'
      ? 'restored'
      : 'save-failed';
  } catch {
    return 'save-failed';
  }
}
