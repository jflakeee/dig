/** Pure chunk coordinate and distance helpers for the infinite underground world. */
export const INFINITE_CHUNK_METERS = 16;
export type ChunkCoord = readonly [number, number, number];
export type WorldPosition = readonly [number, number, number];
export function chunkAt(position: WorldPosition): ChunkCoord {
  if (!position.every(Number.isFinite)) throw Error('Invalid world position');
  const coords = position.map(value => Math.floor(value / INFINITE_CHUNK_METERS));
  if (!coords.every(Number.isSafeInteger)) throw Error('Chunk coordinate overflow');
  return coords as unknown as ChunkCoord;
}
export function chunkKey(coord: ChunkCoord): string {
  if (!coord.every(Number.isSafeInteger)) throw Error('Invalid chunk coordinates');
  return coord.join(',');
}
export function chunkFromKey(key: string): ChunkCoord {
  if (!/^-?(0|[1-9]\d*),-?(0|[1-9]\d*),-?(0|[1-9]\d*)$/.test(key)) throw Error('Invalid chunk key');
  const values = key.split(',').map(Number);
  if (!values.every(Number.isSafeInteger)) throw Error('Chunk coordinate overflow');
  return values as unknown as ChunkCoord;
}
/** Shortest 3D distance from the player to the chunk's axis-aligned bounds. */
export function distanceToChunk(position: WorldPosition, coord: ChunkCoord): number {
  if (!position.every(Number.isFinite) || !coord.every(Number.isSafeInteger)) throw Error('Invalid position or chunk');
  const squared = position.reduce((sum, value, axis) => {
    const min = coord[axis] * INFINITE_CHUNK_METERS;
    const max = min + INFINITE_CHUNK_METERS;
    if (!Number.isFinite(min) || !Number.isFinite(max)) throw Error('Chunk bounds overflow');
    const delta = value < min ? min - value : value > max ? value - max : 0;
    return sum + delta * delta;
  }, 0);
  return Math.sqrt(squared);
}
export type ChunkRange = 'active' | 'unload' | 'retain' | 'reset';
export function chunkRange(distance: number): ChunkRange {
  if (!Number.isFinite(distance) || distance < 0) throw Error('Invalid chunk distance');
  if (distance <= 32) return 'active';
  if (distance <= 64) return 'unload';
  if (distance <= 256) return 'retain';
  return 'reset';
}
