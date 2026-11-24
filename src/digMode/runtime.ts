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
import { initialAutoMineState, stepAutoMine } from '../autoMineController';
import type { AutoMineDecision, AutoMineInput, AutoMineState } from '../autoMineController';
import { zeroGravityDisplacement } from '../zeroGravityMovement';
import { portalGravityAcceleration } from './portalGravity';
import type { PortalGravityField } from './portalGravity';
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

export type DigModeMovementInput = Readonly<{
  position: LocalPosition;
  yaw?: number;
  pitch?: number;
  forward: number;
  strafe: number;
  vertical: number;
  deltaSeconds: number;
  radius: number;
  thrustAcceleration: number;
  maximumSpeed: number;
  passageFields: readonly PortalGravityField[];
}>;

export type DigModeMovementResult = Readonly<{
  position: LocalPosition;
  velocity: readonly [number, number, number];
  collision: SphereCollisionResult;
}>;

export type DigModeAutoMiningFrame = Readonly<{
  decision: AutoMineDecision;
  mined: readonly SessionMineral[];
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
  private machineVelocity: [number, number, number] = [0, 0, 0];
  private lookYaw = 0;
  private lookPitch = 0;
  private autoMineState: AutoMineState = initialAutoMineState();

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

  /** Advance the autonomous mining state and apply its requested voxel cuts. */
  advanceAutomaticMining(
    input: AutoMineInput,
    targetVoxels: readonly Readonly<{ chunk: ChunkCoordinate; voxel: VoxelCoordinate }>[],
  ): DigModeAutoMiningFrame {
    const decision = stepAutoMine(this.autoMineState, input);
    this.autoMineState = decision.state;
    const mined: SessionMineral[] = [];
    for (const target of targetVoxels.slice(0, decision.mineBlocks)) {
      const result = this.mineVoxel(target.chunk, target.voxel);
      if (result.mineral) mined.push(result.mineral);
    }
    return { decision, mined };
  }

  /** Apply touch-drag deltas to the first-person camera orientation. */
  applyLookDelta(deltaX: number, deltaY: number, sensitivity = 0.003): void {
    if (![deltaX, deltaY, sensitivity].every(Number.isFinite) || sensitivity < 0) {
      throw new Error('Invalid camera look input');
    }
    this.lookYaw -= deltaX * sensitivity;
    this.lookPitch = Math.max(-1.52, Math.min(1.52, this.lookPitch - deltaY * sensitivity));
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.set(this.lookPitch, this.lookYaw, 0, 'YXZ');
  }

  /** Move with zero-G thrusters and temporary passage gravity fields. */
  moveMachine(input: DigModeMovementInput): DigModeMovementResult {
    if (![input.deltaSeconds, input.thrustAcceleration, input.maximumSpeed].every(Number.isFinite) ||
        input.deltaSeconds < 0 || input.thrustAcceleration < 0 || input.maximumSpeed <= 0) {
      throw new Error('Invalid movement timing or speed');
    }

    const yaw = input.yaw ?? this.lookYaw;
    const pitch = input.pitch ?? this.lookPitch;
    const thrustDirection = zeroGravityDisplacement(
      yaw, pitch, input.forward, input.strafe, input.vertical, 1, 1,
    );
    const gravity = portalGravityAcceleration(
      [input.position.x, input.position.y, input.position.z],
      input.passageFields,
    );
    const dt = input.deltaSeconds;
    this.machineVelocity[0] += (thrustDirection[0] * input.thrustAcceleration + gravity[0]) * dt;
    this.machineVelocity[1] += (thrustDirection[1] * input.thrustAcceleration + gravity[1]) * dt;
    this.machineVelocity[2] += (thrustDirection[2] * input.thrustAcceleration + gravity[2]) * dt;

    const speed = Math.hypot(...this.machineVelocity);
    if (speed > input.maximumSpeed) {
      const scale = input.maximumSpeed / speed;
      this.machineVelocity = this.machineVelocity.map((component) => component * scale) as [number, number, number];
    }

    const proposed = {
      x: input.position.x + this.machineVelocity[0] * dt,
      y: input.position.y + this.machineVelocity[1] * dt,
      z: input.position.z + this.machineVelocity[2] * dt,
    };
    this.loadChunk(addressChunk(proposed).chunk);
    const collision = resolveSphereVoxelCollision(this.session, proposed, input.radius);

    for (const normal of collision.contacts) {
      const intoSurface = this.machineVelocity[0] * normal.x +
        this.machineVelocity[1] * normal.y + this.machineVelocity[2] * normal.z;
      if (intoSurface < 0) {
        this.machineVelocity[0] -= normal.x * intoSurface;
        this.machineVelocity[1] -= normal.y * intoSurface;
        this.machineVelocity[2] -= normal.z * intoSurface;
      }
    }
    this.camera.position.set(collision.position.x, collision.position.y, collision.position.z);
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.set(pitch, yaw, 0, 'YXZ');
    return { position: collision.position, velocity: [...this.machineVelocity], collision };
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
    this.machineVelocity = [0, 0, 0];
    this.lookYaw = 0;
    this.lookPitch = 0;
    this.autoMineState = initialAutoMineState();
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
