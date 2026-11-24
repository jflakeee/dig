import type { ChunkCoordinate, LocalPosition } from './chunkCoordinates';
import {
  DIG_CHUNK_ACTIVE_DISTANCE_METERS,
  DIG_CHUNK_UNLOAD_DISTANCE_METERS,
  DIG_CHUNK_RESET_DISTANCE_METERS,
  distanceToChunkMeters,
} from './chunkResetPolicy';

export type ChunkResidency = 'active' | 'nearby' | 'persisted' | 'visible-out-of-range' | 'reset-eligible';

/** Classifies lifecycle only; callers must persist before releasing chunk data. */
export function classifyChunkResidency(
  position: LocalPosition,
  chunk: ChunkCoordinate,
  visible: boolean,
): ChunkResidency {
  const distance = distanceToChunkMeters(position, chunk);
  if (distance <= DIG_CHUNK_ACTIVE_DISTANCE_METERS) return 'active';
  if (distance <= DIG_CHUNK_UNLOAD_DISTANCE_METERS) return 'nearby';
  if (distance <= DIG_CHUNK_RESET_DISTANCE_METERS) return 'persisted';
  return visible ? 'visible-out-of-range' : 'reset-eligible';
}
