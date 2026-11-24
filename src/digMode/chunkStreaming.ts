import { chunkKey, type ChunkCoordinate, type LocalPosition } from './chunkCoordinates';
import { classifyChunkResidency } from './chunkResidency';
import { SessionChunks } from './sessionChunks';

export type ChunkStreamingFrame = Readonly<{
  /** Chunks within 32m; keep collision and mining systems active. */
  active: ChunkCoordinate[];
  /** Chunks within 64m; keep ready for quick activation. */
  nearby: ChunkCoordinate[];
  /** Session data retained beyond the render range, up to 256m. */
  retained: ChunkCoordinate[];
  /** Visible chunks stay resident even when beyond the normal range. */
  visibleOutOfRange: ChunkCoordinate[];
  /** Chunks discarded because they are distant and no longer visible. */
  evicted: ChunkCoordinate[];
}>;

/**
 * Reconcile only chunks already encountered in this runtime session.
 * The caller creates newly streamed chunks around the player separately.
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
    evicted: ChunkCoordinate[];
  } = { active: [], nearby: [], retained: [], visibleOutOfRange: [], evicted: [] };

  for (const chunk of session.getLoadedChunkCoordinates()) {
    const residency = classifyChunkResidency(
      position,
      chunk,
      visibleChunkKeys.has(chunkKey(chunk)),
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
