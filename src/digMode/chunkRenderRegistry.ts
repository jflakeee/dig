import * as THREE from 'three';
import { chunkKey, type ChunkCoordinate } from './chunkCoordinates';
import type { ChunkStreamingFrame } from './chunkStreaming';

type RegisteredChunk = {
  coordinate: ChunkCoordinate;
  root: THREE.Object3D;
};

/**
 * Owns scene attachment and visibility for generated chunk objects.
 * Chunk geometry is disposed on eviction; shared materials remain owned by
 * the caller so disposing one chunk cannot break another chunk's materials.
 */
export class ChunkRenderRegistry {
  private readonly chunks = new Map<string, RegisteredChunk>();

  constructor(
    private readonly scene: THREE.Scene,
    private readonly disposeGeometry: (root: THREE.Object3D) => void = disposeChunkGeometry,
  ) {}

  register(chunk: ChunkCoordinate, root: THREE.Object3D): void {
    const key = chunkKey(chunk);
    if (this.chunks.has(key)) {
      throw new Error(`Chunk render object already registered: ${key}`);
    }
    root.userData.digChunkKey = key;
    this.chunks.set(key, { coordinate: { ...chunk }, root });
    this.scene.add(root);
  }

  /** Apply stream decisions: nearby chunks render, distant unseen chunks hide. */
  reconcile(frame: ChunkStreamingFrame): void {
    const renderable = new Set<string>();
    for (const chunk of [...frame.active, ...frame.nearby, ...frame.visibleOutOfRange]) {
      renderable.add(chunkKey(chunk));
    }
    const dustHidden = new Set(frame.dustOccluded.map(chunkKey));
    const evicted = new Set(frame.evicted.map(chunkKey));

    for (const [key, entry] of this.chunks) {
      if (evicted.has(key)) {
        this.scene.remove(entry.root);
        this.disposeGeometry(entry.root);
        this.chunks.delete(key);
        continue;
      }
      entry.root.visible = renderable.has(key) && !dustHidden.has(key);
    }
  }

  remove(chunk: ChunkCoordinate): boolean {
    const key = chunkKey(chunk);
    const entry = this.chunks.get(key);
    if (!entry) return false;
    this.scene.remove(entry.root);
    this.disposeGeometry(entry.root);
    this.chunks.delete(key);
    return true;
  }

  clear(): void {
    for (const entry of this.chunks.values()) {
      this.scene.remove(entry.root);
      this.disposeGeometry(entry.root);
    }
    this.chunks.clear();
  }

  get registeredChunkCount(): number {
    return this.chunks.size;
  }
}

function disposeChunkGeometry(root: THREE.Object3D): void {
  root.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (mesh.isMesh) mesh.geometry.dispose();
  });
}
