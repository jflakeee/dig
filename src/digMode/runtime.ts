import * as THREE from 'three';
import { addressChunk, chunkKey, type ChunkCoordinate, type LocalPosition } from './chunkCoordinates';
import {
  createDigModeRenderScene,
  type DigModeRenderScene,
} from './renderScene';
import { SessionChunks } from './sessionChunks';
import { ChunkRenderRegistry } from './chunkRenderRegistry';
import {
  buildSessionChunkSectionMeshes,
} from './sessionChunkLookup';
import {
  ChunkSectionMeshSet,
} from './chunkSectionMeshSet';
import type { SessionMineral, VoxelCoordinate } from './sessionChunks';
import { reconcileSessionChunkStreaming } from './chunkStreaming';
import type { ChunkStreamingFrame } from './chunkStreaming';
import {
  resolveSphereVoxelCollision,
  type SphereCollisionResult,
} from './sphereVoxelCollision';

export type DigModeMiningResult = Readonly<{
  mineral: SessionMineral | null;
  refreshedSections: number;
  refreshedNeighborChunks: number;
}>;

/**
 * Runtime coordinator for the isolated 4D mode. The host game loop calls
 * updateFrame; rendering and input remain owned by the host application.
 */
export class DigModeRuntime {
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  readonly session: SessionChunks;
  private readonly registry: ChunkRenderRegistry;
  private readonly chunkMeshes = new Map<string, ChunkSectionMeshSet>();

  constructor(
    private readonly materials: Readonly<Record<SessionMineral, THREE.Material>>,
    options: {
      aspect?: number;
      random?: () => number;
      renderScene?: DigModeRenderScene;
    } = {},
  ) {
    const renderScene = options.renderScene ?? createDigModeRenderScene(options.aspect ?? 1);
    this.scene = renderScene.scene;
    this.camera = renderScene.camera;
    this.session = new SessionChunks(options.random);
    this.registry = new ChunkRenderRegistry(this.scene);
  }

  /** Load the terrain chunk containing the player and reconcile streaming. */
  updateFrame(
    position: LocalPosition,
    visibleChunkKeys: ReadonlySet<string> = new Set(),
  ): ChunkStreamingFrame {
    const current = addressChunk(position).chunk;
    this.loadChunk(current);
    const frame = reconcileSessionChunkStreaming(this.session, position, visibleChunkKeys);
    this.registry.reconcile(frame);
    for (const chunk of frame.evicted) this.chunkMeshes.delete(chunkKey(chunk));
    return frame;
  }

  /** Ensure a chunk exists and its section meshes are attached to the scene. */
  loadChunk(chunk: ChunkCoordinate): ChunkSectionMeshSet {
    const key = chunkKey(chunk);
    const existing = this.chunkMeshes.get(key);
    if (existing) return existing;

    const meshSet = buildSessionChunkSectionMeshes(this.session, chunk, this.materials);
    this.chunkMeshes.set(key, meshSet);
    this.registry.register(chunk, meshSet.root);
    return meshSet;
  }

  /** Mine a voxel once and refresh only the sections whose faces may change. */
  mineVoxel(chunk: ChunkCoordinate, voxel: VoxelCoordinate): DigModeMiningResult {
    const mineral = this.session.mineVoxel(chunk, voxel);
    if (!mineral) return { mineral: null, refreshedSections: 0, refreshedNeighborChunks: 0 };

    const ownMesh = this.chunkMeshes.get(chunkKey(chunk));
    const ownRefresh = ownMesh?.refreshAfterVoxelChange(voxel);
    let refreshedNeighborChunks = 0;

    for (const neighborChunk of ownRefresh?.neighboringChunksToRefresh ?? []) {
      const neighborMesh = this.chunkMeshes.get(chunkKey(neighborChunk));
      if (!neighborMesh) continue;
      const neighborVoxel = voxelOnAdjacentChunkBoundary(voxel, chunk, neighborChunk);
      neighborMesh.refreshAfterVoxelChange(neighborVoxel);
      refreshedNeighborChunks++;
    }

    return {
      mineral,
      refreshedSections: ownRefresh?.refreshedSections.length ?? 0,
      refreshedNeighborChunks,
    };
  }

  /** Resolve a proposed sphere position against generated session terrain. */
  resolveMachinePosition(position: LocalPosition, radius: number): SphereCollisionResult {
    return resolveSphereVoxelCollision(this.session, position, radius);
  }

  /** Discard the old environment and immediately prepare the new exit chunk. */
  transitionThroughLargePassage(exitChunk: ChunkCoordinate): void {
    this.registry.clear();
    this.chunkMeshes.clear();
    this.session.transitionThroughLargePassage();
    this.loadChunk(exitChunk);
  }

  dispose(): void {
    this.registry.clear();
    this.chunkMeshes.clear();
  }
}

function voxelOnAdjacentChunkBoundary(
  sourceVoxel: VoxelCoordinate,
  sourceChunk: ChunkCoordinate,
  neighborChunk: ChunkCoordinate,
): VoxelCoordinate {
  const dx = neighborChunk.x - sourceChunk.x;
  const dy = neighborChunk.y - sourceChunk.y;
  const dz = neighborChunk.z - sourceChunk.z;
  const limit = 32;
  return {
    x: dx > 0 ? 0 : dx < 0 ? limit - 1 : sourceVoxel.x,
    y: dy > 0 ? 0 : dy < 0 ? limit - 1 : sourceVoxel.y,
    z: dz > 0 ? 0 : dz < 0 ? limit - 1 : sourceVoxel.z,
  };
}
