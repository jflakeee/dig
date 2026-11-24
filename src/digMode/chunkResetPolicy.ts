import {
  DIG_CHUNK_SIZE_METERS,
  type ChunkCoordinate,
  type LocalPosition,
} from './chunkCoordinates';

export const DIG_CHUNK_ACTIVE_DISTANCE_METERS = 32;
export const DIG_CHUNK_UNLOAD_DISTANCE_METERS = 64;
export const DIG_CHUNK_RESET_DISTANCE_METERS = 256;

/** Euclidean distance from a point to the nearest point on a chunk AABB. */
export function distanceToChunkMeters(
  position: LocalPosition,
  chunk: ChunkCoordinate,
): number {
  if (![position.x, position.y, position.z].every(Number.isFinite) ||
      ![chunk.x, chunk.y, chunk.z].every(Number.isSafeInteger)) {
    throw new Error('Invalid position or chunk coordinate');
  }
  const minX = chunk.x * DIG_CHUNK_SIZE_METERS;
  const minY = chunk.y * DIG_CHUNK_SIZE_METERS;
  const minZ = chunk.z * DIG_CHUNK_SIZE_METERS;
  const dx = Math.max(minX - position.x, 0, position.x - (minX + DIG_CHUNK_SIZE_METERS));
  const dy = Math.max(minY - position.y, 0, position.y - (minY + DIG_CHUNK_SIZE_METERS));
  const dz = Math.max(minZ - position.z, 0, position.z - (minZ + DIG_CHUNK_SIZE_METERS));
  return Math.hypot(dx, dy, dz);
}

/** Reset only beyond the configured distance and only after the chunk leaves view. */
export function shouldResetChunk(
  position: LocalPosition,
  chunk: ChunkCoordinate,
  visible: boolean,
): boolean {
  if (visible) return false;
  return distanceToChunkMeters(position, chunk) > DIG_CHUNK_RESET_DISTANCE_METERS;
}

/** Renderer can unload far chunks while retaining their persistent records. */
export function shouldUnloadChunk(position: LocalPosition, chunk: ChunkCoordinate): boolean {
  return distanceToChunkMeters(position, chunk) > DIG_CHUNK_UNLOAD_DISTANCE_METERS;
}
