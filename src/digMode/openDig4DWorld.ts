import type { ChunkCoordinate, LocalPosition } from './chunkCoordinates';
import {
  loadChunkRecord,
  resetChunkRecord,
  type ChunkRecord,
  type KeyValueStorage,
} from './chunkRecord';
import { classifyChunkResidency } from './chunkResidency';
import { resolveVoxelExposure, type ExposureResult } from './resolveVoxelExposure';
import { openDigWorldMeta, type DigWorldMeta } from './worldMeta';

export type Dig4DWorld = Readonly<{
  meta: DigWorldMeta;
  loadChunk: (coordinate: ChunkCoordinate) => ChunkRecord;
  exposeVoxel: (coordinate: ChunkCoordinate, voxelId: number) => ExposureResult;
  resetChunk: (coordinate: ChunkCoordinate) => ChunkRecord;
  residency: (
    position: LocalPosition,
    coordinate: ChunkCoordinate,
    visible: boolean,
  ) => ReturnType<typeof classifyChunkResidency>;
}>;

/** Opens only the independent 4D world save; legacy DIG saves are untouched. */
export function openDig4DWorld(storage: KeyValueStorage): Dig4DWorld {
  const meta = openDigWorldMeta(storage);
  return {
    meta,
    loadChunk: coordinate => loadChunkRecord(storage, coordinate),
    exposeVoxel: (coordinate, voxelId) => {
      const record = loadChunkRecord(storage, coordinate);
      return resolveVoxelExposure(storage, {
        worldSeed: meta.worldSeed,
        chunk: coordinate,
        voxelId,
        epoch: record.epoch,
      });
    },
    resetChunk: coordinate => resetChunkRecord(storage, coordinate),
    residency: (position, coordinate, visible) =>
      classifyChunkResidency(position, coordinate, visible),
  };
}
