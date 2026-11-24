import { chunkKey, DIG_VOXELS_PER_AXIS, type ChunkCoordinate } from './chunkCoordinates';
import type { ChunkMineralLookup } from './chunkVoxelMesh';
import { SessionChunks } from './sessionChunks';

/**
 * Create a mesh lookup for one chunk. Cells inside that chunk are assigned a
 * session mineral on first lookup. Adjacent chunks are read-only here so
 * building this mesh cannot silently generate neighboring world chunks.
 */
export function createSessionChunkMineralLookup(
  session: SessionChunks,
  targetChunk: ChunkCoordinate,
): ChunkMineralLookup {
  const targetKey = chunkKey(targetChunk);

  return (globalX, globalY, globalZ) => {
    const global = [globalX, globalY, globalZ];
    if (!global.every(Number.isSafeInteger)) {
      throw new Error('Global voxel coordinates must be safe integers');
    }

    const chunk = {
      x: Math.floor(globalX / DIG_VOXELS_PER_AXIS),
      y: Math.floor(globalY / DIG_VOXELS_PER_AXIS),
      z: Math.floor(globalZ / DIG_VOXELS_PER_AXIS),
    };
    const local = {
      x: globalX - chunk.x * DIG_VOXELS_PER_AXIS,
      y: globalY - chunk.y * DIG_VOXELS_PER_AXIS,
      z: globalZ - chunk.z * DIG_VOXELS_PER_AXIS,
    };

    const state = chunkKey(chunk) === targetKey
      ? session.exposeVoxel(chunk, local)
      : session.readVoxel(chunk, local);
    return state && !state.mined ? state.mineral : null;
  };
}
