export const DIG_CHUNK_SIZE_METERS = 16;
export const DIG_VOXEL_SIZE_METERS = 0.5;
export const DIG_VOXELS_PER_AXIS = DIG_CHUNK_SIZE_METERS / DIG_VOXEL_SIZE_METERS;

export type ChunkCoordinate = Readonly<{ x: number; y: number; z: number }>;
export type LocalPosition = Readonly<{ x: number; y: number; z: number }>;
export type ChunkAddress = Readonly<{ chunk: ChunkCoordinate; local: LocalPosition }>;

function assertFinitePosition(position: LocalPosition): void {
  if (![position.x, position.y, position.z].every(Number.isFinite)) {
    throw new Error('World position must contain finite coordinates');
  }
}

/** Maps a world-space position into a chunk and a local [0, 16) position. */
export function addressChunk(position: LocalPosition): ChunkAddress {
  assertFinitePosition(position);
  const chunk = {
    x: Math.floor(position.x / DIG_CHUNK_SIZE_METERS),
    y: Math.floor(position.y / DIG_CHUNK_SIZE_METERS),
    z: Math.floor(position.z / DIG_CHUNK_SIZE_METERS),
  };
  if (![chunk.x, chunk.y, chunk.z].every(Number.isSafeInteger)) {
    throw new Error('World position exceeds safe chunk coordinate range');
  }
  const local = {
    x: position.x - chunk.x * DIG_CHUNK_SIZE_METERS,
    y: position.y - chunk.y * DIG_CHUNK_SIZE_METERS,
    z: position.z - chunk.z * DIG_CHUNK_SIZE_METERS,
  };
  return { chunk, local };
}

export function chunkKey(chunk: ChunkCoordinate): string {
  if (![chunk.x, chunk.y, chunk.z].every(Number.isSafeInteger)) {
    throw new Error('Chunk coordinates must be safe integers');
  }
  return `${chunk.x},${chunk.y},${chunk.z}`;
}

/** Returns voxel indices for a local position, or null when outside this chunk. */
export function localVoxelIndex(position: LocalPosition): ChunkCoordinate | null {
  assertFinitePosition(position);
  const { x, y, z } = position;
  const size = DIG_CHUNK_SIZE_METERS;
  if (x < 0 || y < 0 || z < 0 || x >= size || y >= size || z >= size) return null;
  return {
    x: Math.floor(x / DIG_VOXEL_SIZE_METERS),
    y: Math.floor(y / DIG_VOXEL_SIZE_METERS),
    z: Math.floor(z / DIG_VOXEL_SIZE_METERS),
  };
}
