import { validateTrainSave, type TrainSaveState } from './trainSave';

const RESTORE_CODE_PREFIX = 'DIG4R1';
export const MAX_RESTORE_CODE_LENGTH = 200000;

/**
 * Produces a shareable, obfuscated save string. It is not encrypted and must
 * never be treated as a secret or as proof that a save is authentic.
 */
export function encodeRestoreCode(state: TrainSaveState): string {
  const payload = new TextEncoder().encode(JSON.stringify(validateTrainSave(state)));
  const encoded = toBase64Url(payload);
  const checksum = crc32(payload).toString(16).padStart(8, '0');
  const code = `${RESTORE_CODE_PREFIX}.${encoded}.${checksum}`;
  if (code.length > MAX_RESTORE_CODE_LENGTH) throw new Error('Restore code is too large');
  return code;
}

export function decodeRestoreCode(code: string): TrainSaveState {
  if (typeof code !== 'string') throw new Error('Invalid restore code');
  const normalized = code.trim();
  if (normalized.length < 16 || normalized.length > MAX_RESTORE_CODE_LENGTH) {
    throw new Error('Invalid restore code length');
  }

  const match = /^DIG4R1\.([A-Za-z0-9_-]+)\.([0-9a-f]{8})$/.exec(normalized);
  if (!match) throw new Error('Invalid restore code format');

  const payload = fromBase64Url(match[1]);
  if (crc32(payload).toString(16).padStart(8, '0') !== match[2]) {
    throw new Error('Restore code checksum mismatch');
  }

  const parsed: unknown = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(payload));
  return validateTrainSave(parsed);
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(value: string): Uint8Array {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function crc32(bytes: Uint8Array): number {
  let checksum = 0xffffffff;
  for (const byte of bytes) {
    checksum ^= byte;
    for (let bit = 0; bit < 8; bit++) {
      checksum = (checksum >>> 1) ^ ((checksum & 1) ? 0xedb88320 : 0);
    }
  }
  return (checksum ^ 0xffffffff) >>> 0;
}
