import { DIG_4D_SAVE_KEY } from './saveNamespace';
import type { KeyValueStorage } from './chunkRecord';

export const DIG_WORLD_META_VERSION = 1;
export const DIG_WORLD_META_KEY = `${DIG_4D_SAVE_KEY}:meta`;

export type DigWorldMeta = Readonly<{
  version: 1;
  worldSeed: number;
}>;

function generateWorldSeed(): number {
  const words = new Uint32Array(2);
  globalThis.crypto.getRandomValues(words);
  // Build a non-negative 53-bit integer that remains exactly representable.
  return (words[0] & 0x001fffff) * 0x100000000 + words[1];
}

function validateWorldMeta(value: unknown): DigWorldMeta {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Invalid 4D world metadata');
  }
  const candidate = value as Record<string, unknown>;
  if (candidate.version !== DIG_WORLD_META_VERSION ||
      !Number.isSafeInteger(candidate.worldSeed) ||
      (candidate.worldSeed as number) < 0) {
    throw new Error('Invalid 4D world metadata');
  }
  return { version: DIG_WORLD_META_VERSION, worldSeed: candidate.worldSeed as number };
}

/** Loads the stable world seed, creating it once for this independent save. */
export function openDigWorldMeta(
  storage: KeyValueStorage,
  createSeed: () => number = generateWorldSeed,
): DigWorldMeta {
  const raw = storage.getItem(DIG_WORLD_META_KEY);
  if (raw !== null) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      throw new Error('4D world metadata is not valid JSON');
    }
    return validateWorldMeta(parsed);
  }
  const meta = validateWorldMeta({ version: DIG_WORLD_META_VERSION, worldSeed: createSeed() });
  storage.setItem(DIG_WORLD_META_KEY, JSON.stringify(meta));
  return meta;
}
