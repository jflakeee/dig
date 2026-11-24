import type { ChunkCoordinate } from './chunkCoordinates';
import {
  loadChunkRecord,
  recordExposedResource,
  saveChunkRecord,
  type ExposedResourceId,
  type KeyValueStorage,
} from './chunkRecord';
import { mineralForExposure, type BaseMineral } from './exposedMineral';

const BASE_MINERALS = new Set<BaseMineral>(['rock', 'coal', 'iron', 'gold', 'rare']);

export type ExposureResult = Readonly<{
  resource: ExposedResourceId;
  mineral: BaseMineral;
  newlyRecorded: boolean;
}>;

/**
 * Resolves a voxel's mineral once per chunk epoch and persists the result before
 * returning it to the caller. Call only when terrain logic says the solid voxel
 * has become exposed. Reward delivery belongs after this persistence boundary.
 */
export function resolveVoxelExposure(
  storage: KeyValueStorage,
  input: Readonly<{
    worldSeed: number;
    chunk: ChunkCoordinate;
    voxelId: number;
    epoch: number;
  }>,
): ExposureResult {
  const record = loadChunkRecord(storage, input.chunk);
  if (record.epoch !== input.epoch) throw new Error('Stale chunk epoch');
  const key = String(input.voxelId);
  const existing = record.exposedResources[key];
  if (existing !== undefined) {
    if (!BASE_MINERALS.has(existing as BaseMineral)) throw new Error('Existing resource is not a base mineral');
    return { resource: existing, mineral: existing as BaseMineral, newlyRecorded: false };
  }
  const mineral = mineralForExposure(input);
  const next = recordExposedResource(record, input.voxelId, mineral);
  saveChunkRecord(storage, input.chunk, next);
  return { resource: mineral, mineral, newlyRecorded: true };
}
