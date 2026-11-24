import * as THREE from 'three';
import { chunkKey, DIG_VOXEL_SIZE_METERS, DIG_VOXELS_PER_AXIS, type ChunkCoordinate } from './chunkCoordinates';
import {
  buildChunkVoxelSectionGroup,
  type ChunkMineralLookup,
  type VoxelSectionOrigin,
} from './chunkVoxelMesh';
import type { SessionMineral, VoxelCoordinate } from './sessionChunks';

export const DIG_VOXEL_SECTION_SIZE = 8;
const SECTIONS_PER_AXIS = DIG_VOXELS_PER_AXIS / DIG_VOXEL_SECTION_SIZE;

export type SectionRefreshResult = Readonly<{
  refreshedSections: VoxelSectionOrigin[];
  neighboringChunksToRefresh: ChunkCoordinate[];
}>;

/** A chunk composed of independently rebuildable 8³ voxel sections. */
export class ChunkSectionMeshSet {
  readonly root = new THREE.Group();
  private readonly sections = new Map<string, THREE.Group>();

  constructor(
    private readonly chunk: ChunkCoordinate,
    private readonly lookup: ChunkMineralLookup,
    private readonly materials: Readonly<Record<SessionMineral, THREE.Material>>,
  ) {
    const worldSize = DIG_VOXELS_PER_AXIS * DIG_VOXEL_SIZE_METERS;
    this.root.position.set(chunk.x * worldSize, chunk.y * worldSize, chunk.z * worldSize);
    for (let sy = 0; sy < SECTIONS_PER_AXIS; sy++) {
      for (let sz = 0; sz < SECTIONS_PER_AXIS; sz++) {
        for (let sx = 0; sx < SECTIONS_PER_AXIS; sx++) {
          this.rebuildSection({ x: sx, y: sy, z: sz });
        }
      }
    }
  }

  /**
   * Rebuild the mined voxel's section plus sections containing its six
   * neighbors. Boundary crossings are returned so loaded adjacent chunks can
   * refresh their exposed faces too.
   */
  refreshAfterVoxelChange(voxel: VoxelCoordinate): SectionRefreshResult {
    const coordinates = [voxel.x, voxel.y, voxel.z];
    if (!coordinates.every((v) => Number.isSafeInteger(v) && v >= 0 && v < DIG_VOXELS_PER_AXIS)) {
      throw new Error('Voxel coordinate must be an integer index inside the chunk');
    }

    const sectionKeys = new Map<string, VoxelSectionOrigin>();
    const neighborChunks = new Map<string, ChunkCoordinate>();
    const directions = [
      { x: 1, y: 0, z: 0 }, { x: -1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 }, { x: 0, y: -1, z: 0 },
      { x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: -1 },
    ];

    const addSectionForVoxel = (x: number, y: number, z: number) => {
      const section = {
        x: Math.floor(x / DIG_VOXEL_SECTION_SIZE),
        y: Math.floor(y / DIG_VOXEL_SECTION_SIZE),
        z: Math.floor(z / DIG_VOXEL_SECTION_SIZE),
      };
      sectionKeys.set(sectionKey(section), section);
    };
    addSectionForVoxel(voxel.x, voxel.y, voxel.z);

    for (const direction of directions) {
      const x = voxel.x + direction.x;
      const y = voxel.y + direction.y;
      const z = voxel.z + direction.z;
      if (x >= 0 && x < DIG_VOXELS_PER_AXIS &&
          y >= 0 && y < DIG_VOXELS_PER_AXIS &&
          z >= 0 && z < DIG_VOXELS_PER_AXIS) {
        addSectionForVoxel(x, y, z);
      } else {
        const adjacent = {
          x: this.chunk.x + direction.x,
          y: this.chunk.y + direction.y,
          z: this.chunk.z + direction.z,
        };
        neighborChunks.set(chunkKey(adjacent), adjacent);
      }
    }

    for (const section of sectionKeys.values()) this.rebuildSection(section);
    return {
      refreshedSections: [...sectionKeys.values()],
      neighboringChunksToRefresh: [...neighborChunks.values()],
    };
  }

  clear(): void {
    for (const section of this.sections.values()) {
      this.root.remove(section);
      disposeGeometry(section);
    }
    this.sections.clear();
  }

  get sectionCount(): number {
    return this.sections.size;
  }

  private rebuildSection(section: VoxelSectionOrigin): void {
    const key = sectionKey(section);
    const previous = this.sections.get(key);
    if (previous) {
      this.root.remove(previous);
      disposeGeometry(previous);
    }

    const rebuilt = buildChunkVoxelSectionGroup(
      this.chunk,
      {
        x: section.x * DIG_VOXEL_SECTION_SIZE,
        y: section.y * DIG_VOXEL_SECTION_SIZE,
        z: section.z * DIG_VOXEL_SECTION_SIZE,
      },
      DIG_VOXEL_SECTION_SIZE,
      this.lookup,
      this.materials,
    );
    this.sections.set(key, rebuilt);
    this.root.add(rebuilt);
  }
}

function sectionKey(section: VoxelSectionOrigin): string {
  return `${section.x},${section.y},${section.z}`;
}

function disposeGeometry(root: THREE.Object3D): void {
  root.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (mesh.isMesh) mesh.geometry.dispose();
  });
}
