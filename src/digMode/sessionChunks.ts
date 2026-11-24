import { chunkKey, type ChunkCoordinate } from './chunkCoordinates';

export type SessionMineral = 'rock' | 'coal' | 'iron' | 'gold' | 'rare';
export type VoxelCoordinate = Readonly<{ x: number; y: number; z: number }>;
export type ExposedVoxel = Readonly<{ mineral: SessionMineral; mined: boolean }>;

type MutableVoxel = { mineral: SessionMineral; mined: boolean };

/**
 * Environment state exists only for this runtime session. It is deliberately
 * not serialized: reconnecting creates a new session, and passage transitions
 * discard the previous environment.
 */
export class SessionChunks {
  private readonly chunks = new Map<string, Map<string, MutableVoxel>>();

  constructor(private readonly random: () => number = Math.random) {}

  /** Resolve a mineral on first exposure and keep it stable for this session. */
  exposeVoxel(chunk: ChunkCoordinate, voxel: VoxelCoordinate): ExposedVoxel {
    const voxels = this.getOrCreateChunk(chunk);
    const key = voxelKey(voxel);
    let state = voxels.get(key);
    if (!state) {
      state = { mineral: rollMineral(this.random), mined: false };
      voxels.set(key, state);
    }
    return { ...state };
  }

  /**
   * Mine an exposed voxel once. Returns null if it was never exposed or was
   * already mined, preventing duplicate rewards during the current session.
   */
  mineVoxel(chunk: ChunkCoordinate, voxel: VoxelCoordinate): SessionMineral | null {
    const state = this.chunks.get(chunkKey(chunk))?.get(voxelKey(voxel));
    if (!state || state.mined) return null;
    state.mined = true;
    return state.mineral;
  }

  /** Forget one chunk's terrain and mining history. */
  resetChunk(chunk: ChunkCoordinate): void {
    this.chunks.delete(chunkKey(chunk));
  }

  /** Snapshot coordinates for the streaming controller; no world graph is stored. */
  getLoadedChunkCoordinates(): ChunkCoordinate[] {
    return [...this.chunks.keys()].map((key) => {
      const [x, y, z] = key.split(',').map(Number);
      return { x, y, z };
    });
  }

  /** A large passage starts a fresh local environment with no old map. */
  transitionThroughLargePassage(): void {
    this.chunks.clear();
  }

  /** Number of chunks currently held in memory; useful to the streaming layer. */
  get loadedChunkCount(): number {
    return this.chunks.size;
  }

  private getOrCreateChunk(chunk: ChunkCoordinate): Map<string, MutableVoxel> {
    const key = chunkKey(chunk);
    let voxels = this.chunks.get(key);
    if (!voxels) {
      voxels = new Map<string, MutableVoxel>();
      this.chunks.set(key, voxels);
    }
    return voxels;
  }
}

function voxelKey(voxel: VoxelCoordinate): string {
  const values = [voxel.x, voxel.y, voxel.z];
  if (!values.every((value) => Number.isSafeInteger(value) && value >= 0 && value < 32)) {
    throw new Error('Voxel coordinates must be integer indices in [0, 32)');
  }
  return values.join(',');
}

/** Base distribution; 4D outlet emissions use a separate, slower system. */
function rollMineral(random: () => number): SessionMineral {
  const sample = random();
  if (!Number.isFinite(sample) || sample < 0 || sample >= 1) {
    throw new Error('Random source must return a number in [0, 1)');
  }
  if (sample < 0.65) return 'rock';
  if (sample < 0.83) return 'coal';
  if (sample < 0.93) return 'iron';
  if (sample < 0.98) return 'gold';
  return 'rare';
}
