import { chunkKey, type ChunkCoordinate, type LocalPosition } from './chunkCoordinates';
import {
  DIG_CHUNK_RESET_DISTANCE_METERS,
  distanceToChunkMeters,
} from './chunkResetPolicy';
import { classifyChunkResidency } from './chunkResidency';
import { SessionChunks } from './sessionChunks';

export type ChunkStreamingFrame = Readonly<{
  /** Chunks within 32m; keep collision and mining systems active. */
  active: ChunkCoordinate[];
  /** Chunks within 64m; keep ready for quick activation. */
  nearby: ChunkCoordinate[];
  /** Session data retained beyond the render range, up to 256m. */
  retained: ChunkCoordinate[];
  /** Visible chunks stay resident between 64m and the dust boundary. */
  visibleOutOfRange: ChunkCoordinate[];
  /** Chunks beyond 256m; renderer must hide them behind dense dust. */
  dustOccluded: ChunkCoordinate[];
  /** Distant chunks discarded from this session. */
  evicted: ChunkCoordinate[];
}>;

/**
 * Reconcile only chunks already encountered in this runtime session.
 * Beyond 256m, dust overrides renderer visibility and the chunk is discarded.
 */
export function reconcileSessionChunkStreaming(
  session: SessionChunks,
  position: LocalPosition,
  visibleChunkKeys: ReadonlySet<string> = new Set(),
): ChunkStreamingFrame {
  const frame: {
    active: ChunkCoordinate[];
    nearby: ChunkCoordinate[];
    retained: ChunkCoordinate[];
    visibleOutOfRange: ChunkCoordinate[];
    dustOccluded: ChunkCoordinate[];
    evicted: ChunkCoordinate[];
  } = {
    active: [],
    nearby: [],
    retained: [],
    visibleOutOfRange: [],
    dustOccluded: [],
    evicted: [],
  };

  for (const chunk of session.getLoadedChunkCoordinates()) {
    const beyondDustBoundary =
      distanceToChunkMeters(position, chunk) > DIG_CHUNK_RESET_DISTANCE_METERS;
    if (beyondDustBoundary) frame.dustOccluded.push(chunk);

    const residency = classifyChunkResidency(
      position,
      chunk,
      !beyondDustBoundary && visibleChunkKeys.has(chunkKey(chunk)),
    );

    switch (residency) {
      case 'active':
        frame.active.push(chunk);
        break;
      case 'nearby':
        frame.nearby.push(chunk);
        break;
      case 'retained':
        frame.retained.push(chunk);
        break;
      case 'visible-out-of-range':
        frame.visibleOutOfRange.push(chunk);
        break;
      case 'reset-eligible':
        session.resetChunk(chunk);
        frame.evicted.push(chunk);
        break;
    }
  }
  return frame;
}
