import type { ChunkCoordinate, LocalPosition } from './chunkCoordinates';
import { distanceToChunkMeters } from './chunkResetPolicy';

export type ChunkResidency = 'active' | 'nearby' | 'persisted' | 'visible-out-of-range' | 'reset-eligible';

/** Classifies lifecycle only; callers must persist before releasing chunk data. */
export function classifyChunkResidency(
  position: LocalPosition,
  chunk: ChunkCoordinate,
  visible: boolean,
): ChunkResidency {
  const distance = distanceToChunkMeters(position, chunk);
  if (distance <= 32) return 'active';
  if (distance <= 64) return 'nearby';
  if (distance <= 256) return 'persisted';
  return visible ? 'visible-out-of-range' : 'reset-eligible';
}
