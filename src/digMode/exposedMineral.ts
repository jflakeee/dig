import { DIG_CHUNK_VOXEL_COUNT } from './chunkRecord';
import type { ChunkCoordinate } from './chunkCoordinates';

export const BASE_MINERAL_TABLE_VERSION = 1;
export type BaseMineral = 'rock' | 'coal' | 'iron' | 'gold' | 'rare';

export type ExposureKey = Readonly<{
  worldSeed: number;
  chunk: ChunkCoordinate;
  voxelId: number;
  epoch: number;
  tableVersion?: number;
}>;

/** Global base distribution; 4D outlet items use a separate, slower emission system. */
export const BASE_MINERAL_WEIGHTS: ReadonlyArray<readonly [BaseMineral, number]> = [
  ['rock', 6500],
  ['coal', 1800],
  ['iron', 1000],
  ['gold', 500],
  ['rare', 200],
];
const WEIGHT_TOTAL = BASE_MINERAL_WEIGHTS.reduce((sum, [, weight]) => sum + weight, 0);
const MASK_64 = (1n << 64n) - 1n;

/** FNV-1a 64-bit over canonical integer coordinates; called only on first exposure. */
function hashExposureKey(key: ExposureKey, tableVersion: number): bigint {
  const { worldSeed, chunk, voxelId, epoch } = key;
  if (![worldSeed, chunk.x, chunk.y, chunk.z, voxelId, epoch, tableVersion].every(Number.isSafeInteger)) {
    throw new Error('Exposure key must contain safe integers');
  }
  if (worldSeed < 0 || voxelId < 0 || voxelId >= DIG_CHUNK_VOXEL_COUNT ||
      epoch < 0 || tableVersion < 1) throw new Error('Invalid exposure key');
  const canonical = `v${tableVersion}|${worldSeed}|${chunk.x},${chunk.y},${chunk.z}|${voxelId}|${epoch}`;
  let hash = 0xcbf29ce484222325n;
  for (const byte of new TextEncoder().encode(canonical)) {
    hash ^= BigInt(byte);
    hash = (hash * 0x100000001b3n) & MASK_64;
  }
  return hash;
}

/** Resolves a mineral deterministically from world/chunk/voxel/epoch identity. */
export function mineralForExposure(key: ExposureKey): BaseMineral {
  const tableVersion = key.tableVersion ?? BASE_MINERAL_TABLE_VERSION;
  const ticket = Number(hashExposureKey(key, tableVersion) % BigInt(WEIGHT_TOTAL));
  let cursor = 0;
  for (const [mineral, weight] of BASE_MINERAL_WEIGHTS) {
    cursor += weight;
    if (ticket < cursor) return mineral;
  }
  throw new Error('Base mineral table is incomplete');
}
