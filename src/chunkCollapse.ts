// Chunk collapse lifecycle for the infinite underground world.
// A chunk's terrain edits are discarded only after it is safely off-screen.
export type ChunkKey = string;
export type ChunkRecord = {
  key: ChunkKey;
  center: readonly [number, number, number];
  epoch: number;
  edits: ReadonlySet<number>;
};
export type ChunkCollapseContext = {
  player: readonly [number, number, number];
  visibleKeys: ReadonlySet<ChunkKey>;
  pendingRewards: boolean;
  saveHealthy: boolean;
};
export type ChunkCollapseResult = {
  chunks: Map<ChunkKey, ChunkRecord>;
  collapsed: ChunkKey[];
};
export const COLLAPSE_DISTANCE_METERS = 256;
export const COLLAPSE_HYSTERESIS_METERS = 16;

export function distanceToChunkCenter(a: readonly number[], b: readonly number[]): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}
export function collapseDistantChunks(
  chunks: ReadonlyMap<ChunkKey, ChunkRecord>,
  context: ChunkCollapseContext,
  threshold = COLLAPSE_DISTANCE_METERS + COLLAPSE_HYSTERESIS_METERS,
): ChunkCollapseResult {
  if (!Number.isFinite(threshold) || threshold <= 0) throw Error('Invalid collapse threshold');
  const next = new Map(chunks);
  const collapsed: ChunkKey[] = [];
  if (!context.saveHealthy || context.pendingRewards) return { chunks: next, collapsed };
  for (const [key, chunk] of chunks) {
    if (context.visibleKeys.has(key) || chunk.edits.size === 0) continue;
    if (distanceToChunkCenter(chunk.center, context.player) <= threshold) continue;
    // Never touch persistent inventory, tool or reward records.
    next.set(key, { ...chunk, epoch: chunk.epoch + 1, edits: new Set<number>() });
    collapsed.push(key);
  }
  return { chunks: next, collapsed };
}
