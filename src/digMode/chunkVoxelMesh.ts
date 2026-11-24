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

export type VoxelSectionOrigin = Readonly<{ x: number; y: number; z: number }>;

type Face = Readonly<{
  normal: readonly [number, number, number];
  offset: readonly [number, number, number];
  corners: readonly (readonly [number, number, number])[];
}>;

const FACES: readonly Face[] = [
  { normal: [1, 0, 0], offset: [1, 0, 0], corners: [[1, 0, 0], [1, 1, 0], [1, 1, 1], [1, 0, 1]] },
  { normal: [-1, 0, 0], offset: [-1, 0, 0], corners: [[0, 0, 1], [0, 1, 1], [0, 1, 0], [0, 0, 0]] },
  { normal: [0, 1, 0], offset: [0, 1, 0], corners: [[0, 1, 0], [0, 1, 1], [1, 1, 1], [1, 1, 0]] },
  { normal: [0, -1, 0], offset: [0, -1, 0], corners: [[0, 0, 1], [0, 0, 0], [1, 0, 0], [1, 0, 1]] },
  { normal: [0, 0, 1], offset: [0, 0, 1], corners: [[1, 0, 1], [1, 1, 1], [0, 1, 1], [0, 0, 1]] },
  { normal: [0, 0, -1], offset: [0, 0, -1], corners: [[0, 0, 0], [0, 1, 0], [1, 1, 0], [1, 0, 0]] },
];

/** Build the complete mesh for one 32³ voxel chunk. */
export function buildChunkVoxelGroup(
  chunk: ChunkCoordinate,
  lookup: ChunkMineralLookup,
  materials: Readonly<Record<SessionMineral, THREE.Material>>,
): THREE.Group {
  const group = buildChunkVoxelSectionGroup(
    chunk, { x: 0, y: 0, z: 0 }, DIG_VOXELS_PER_AXIS, lookup, materials,
  );
  const chunkWorldSize = DIG_VOXEL_SIZE_METERS * DIG_VOXELS_PER_AXIS;
  group.position.set(chunk.x * chunkWorldSize, chunk.y * chunkWorldSize, chunk.z * chunkWorldSize);
  return group;
}

/**
 * Build a section mesh with chunk-local vertices. The caller positions this
 * group at the chunk origin; sections can then be replaced independently.
 */
export function buildChunkVoxelSectionGroup(
  chunk: ChunkCoordinate,
  sectionOrigin: VoxelSectionOrigin,
  sectionSize: number,
  lookup: ChunkMineralLookup,
  materials: Readonly<Record<SessionMineral, THREE.Material>>,
): THREE.Group {
  if (!Number.isSafeInteger(sectionSize) || sectionSize < 1 ||
      ![sectionOrigin.x, sectionOrigin.y, sectionOrigin.z].every(Number.isSafeInteger) ||
      sectionOrigin.x < 0 || sectionOrigin.y < 0 || sectionOrigin.z < 0 ||
      sectionOrigin.x + sectionSize > DIG_VOXELS_PER_AXIS ||
      sectionOrigin.y + sectionSize > DIG_VOXELS_PER_AXIS ||
      sectionOrigin.z + sectionSize > DIG_VOXELS_PER_AXIS) {
    throw new Error('Voxel section must fit within the chunk bounds');
  }

  const geometryData = new Map<SessionMineral, {
    positions: number[];
    normals: number[];
    indices: number[];
  }>();
  const baseX = chunk.x * DIG_VOXELS_PER_AXIS;
  const baseY = chunk.y * DIG_VOXELS_PER_AXIS;
  const baseZ = chunk.z * DIG_VOXELS_PER_AXIS;
  if (![baseX, baseY, baseZ].every(Number.isSafeInteger)) {
    throw new Error('Chunk coordinate exceeds safe voxel index range');
  }

  const endX = sectionOrigin.x + sectionSize;
  const endY = sectionOrigin.y + sectionSize;
  const endZ = sectionOrigin.z + sectionSize;
  for (let y = sectionOrigin.y; y < endY; y++) {
    for (let z = sectionOrigin.z; z < endZ; z++) {
      for (let x = sectionOrigin.x; x < endX; x++) {
        const mineral = lookup(baseX + x, baseY + y, baseZ + z);
        if (!mineral) continue;

        let data = geometryData.get(mineral);
        if (!data) {
          data = { positions: [], normals: [], indices: [] };
          geometryData.set(mineral, data);
        }
        for (const face of FACES) {
          if (lookup(baseX + x + face.offset[0], baseY + y + face.offset[1], baseZ + z + face.offset[2])) {
            continue;
          }
          const firstVertex = data.positions.length / 3;
          for (const corner of face.corners) {
            data.positions.push(
              (x + corner[0]) * DIG_VOXEL_SIZE_METERS,
              (y + corner[1]) * DIG_VOXEL_SIZE_METERS,
              (z + corner[2]) * DIG_VOXEL_SIZE_METERS,
            );
            data.normals.push(face.normal[0], face.normal[1], face.normal[2]);
          }
          data.indices.push(firstVertex, firstVertex + 1, firstVertex + 2, firstVertex, firstVertex + 2, firstVertex + 3);
        }
      }
    }
  }

  const group = new THREE.Group();
  for (const [mineral, data] of geometryData) {
    if (!data.indices.length) continue;
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(data.positions, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(data.normals, 3));
    geometry.setIndex(data.indices);
    group.add(new THREE.Mesh(geometry, materials[mineral]));
  }
  return group;
}
