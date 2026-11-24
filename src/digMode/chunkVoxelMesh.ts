import * as THREE from 'three';
import {
  DIG_VOXEL_SIZE_METERS,
  DIG_VOXELS_PER_AXIS,
  type ChunkCoordinate,
} from './chunkCoordinates';
import type { SessionMineral } from './sessionChunks';

export type ChunkMineralLookup = (
  globalVoxelX: number,
  globalVoxelY: number,
  globalVoxelZ: number,
) => SessionMineral | null;

type Face = Readonly<{
  normal: readonly [number, number, number];
  offset: readonly [number, number, number];
  corners: readonly (readonly [number, number, number])[];
}>;

const FACES: readonly Face[] = [
  {
    normal: [1, 0, 0], offset: [1, 0, 0],
    corners: [[1, 0, 0], [1, 1, 0], [1, 1, 1], [1, 0, 1]],
  },
  {
    normal: [-1, 0, 0], offset: [-1, 0, 0],
    corners: [[0, 0, 1], [0, 1, 1], [0, 1, 0], [0, 0, 0]],
  },
  {
    normal: [0, 1, 0], offset: [0, 1, 0],
    corners: [[0, 1, 0], [0, 1, 1], [1, 1, 1], [1, 1, 0]],
  },
  {
    normal: [0, -1, 0], offset: [0, -1, 0],
    corners: [[0, 0, 1], [0, 0, 0], [1, 0, 0], [1, 0, 1]],
  },
  {
    normal: [0, 0, 1], offset: [0, 0, 1],
    corners: [[1, 0, 1], [1, 1, 1], [0, 1, 1], [0, 0, 1]],
  },
  {
    normal: [0, 0, -1], offset: [0, 0, -1],
    corners: [[0, 0, 0], [0, 1, 0], [1, 1, 0], [1, 0, 0]],
  },
];

/**
 * Build one render group for a 32³ voxel chunk. The lookup callback receives
 * global voxel coordinates, allowing callers to suppress faces touching
 * adjacent chunks. Empty cells return null. Materials remain caller-owned.
 */
export function buildChunkVoxelGroup(
  chunk: ChunkCoordinate,
  lookup: ChunkMineralLookup,
  materials: Readonly<Record<SessionMineral, THREE.Material>>,
): THREE.Group {
  const geometryData = new Map<SessionMineral, {
    positions: number[];
    normals: number[];
    indices: number[];
  }>();
  const baseX = chunk.x * DIG_VOXELS_PER_AXIS;
  const baseY = chunk.y * DIG_VOXELS_PER_AXIS;
  const baseZ = chunk.z * DIG_VOXELS_PER_AXIS;

  for (const base of [baseX, baseY, baseZ]) {
    if (!Number.isSafeInteger(base)) {
      throw new Error('Chunk coordinate exceeds safe voxel index range');
    }
  }

  for (let y = 0; y < DIG_VOXELS_PER_AXIS; y++) {
    for (let z = 0; z < DIG_VOXELS_PER_AXIS; z++) {
      for (let x = 0; x < DIG_VOXELS_PER_AXIS; x++) {
        const mineral = lookup(baseX + x, baseY + y, baseZ + z);
        if (!mineral) continue;

        let data = geometryData.get(mineral);
        if (!data) {
          data = { positions: [], normals: [], indices: [] };
          geometryData.set(mineral, data);
        }

        for (const face of FACES) {
          const neighbor = lookup(
            baseX + x + face.offset[0],
            baseY + y + face.offset[1],
            baseZ + z + face.offset[2],
          );
          if (neighbor) continue;

          const firstVertex = data.positions.length / 3;
          for (const corner of face.corners) {
            data.positions.push(
              (x + corner[0]) * DIG_VOXEL_SIZE_METERS,
              (y + corner[1]) * DIG_VOXEL_SIZE_METERS,
              (z + corner[2]) * DIG_VOXEL_SIZE_METERS,
            );
            data.normals.push(face.normal[0], face.normal[1], face.normal[2]);
          }
          data.indices.push(
            firstVertex, firstVertex + 1, firstVertex + 2,
            firstVertex, firstVertex + 2, firstVertex + 3,
          );
        }
      }
    }
  }

  const group = new THREE.Group();
  const chunkWorldSize = DIG_VOXEL_SIZE_METERS * DIG_VOXELS_PER_AXIS;
  group.position.set(
    chunk.x * chunkWorldSize,
    chunk.y * chunkWorldSize,
    chunk.z * chunkWorldSize,
  );

  for (const [mineral, data] of geometryData) {
    if (data.indices.length === 0) continue;
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(data.positions, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(data.normals, 3));
    geometry.setIndex(data.indices);
    group.add(new THREE.Mesh(geometry, materials[mineral]));
  }
  return group;
}
