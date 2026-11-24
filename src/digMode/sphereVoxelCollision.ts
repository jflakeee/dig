import {
  DIG_CHUNK_SIZE_METERS,
  DIG_VOXEL_SIZE_METERS,
  type ChunkCoordinate,
  type LocalPosition,
} from './chunkCoordinates';
import { SessionChunks } from './sessionChunks';

export type SphereCollisionResult = Readonly<{
  position: LocalPosition;
  collided: boolean;
  contacts: ReadonlyArray<Readonly<{ x: number; y: number; z: number }>>;
}>;

/**
 * Resolve a spherical machine against solid voxels already present in the
 * transient session. Uncreated chunks and mined voxels are empty.
 */
export function resolveSphereVoxelCollision(
  session: SessionChunks,
  position: LocalPosition,
  radius: number,
  maxIterations = 4,
): SphereCollisionResult {
  if (![position.x, position.y, position.z, radius].every(Number.isFinite) || radius <= 0) {
    throw new Error('Sphere position must be finite and radius must be positive');
  }
  if (!Number.isSafeInteger(maxIterations) || maxIterations < 1 || maxIterations > 8) {
    throw new Error('Collision iterations must be an integer from 1 to 8');
  }

  const resolved = { x: position.x, y: position.y, z: position.z };
  const contacts: Array<{ x: number; y: number; z: number }> = [];
  let collided = false;
  const epsilon = 1e-5;

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    let moved = false;
    const minVoxelX = Math.floor((resolved.x - radius) / DIG_VOXEL_SIZE_METERS);
    const maxVoxelX = Math.floor((resolved.x + radius) / DIG_VOXEL_SIZE_METERS);
    const minVoxelY = Math.floor((resolved.y - radius) / DIG_VOXEL_SIZE_METERS);
    const maxVoxelY = Math.floor((resolved.y + radius) / DIG_VOXEL_SIZE_METERS);
    const minVoxelZ = Math.floor((resolved.z - radius) / DIG_VOXEL_SIZE_METERS);
    const maxVoxelZ = Math.floor((resolved.z + radius) / DIG_VOXEL_SIZE_METERS);

    for (let gy = minVoxelY; gy <= maxVoxelY; gy++) {
      for (let gz = minVoxelZ; gz <= maxVoxelZ; gz++) {
        for (let gx = minVoxelX; gx <= maxVoxelX; gx++) {
          if (!isSolidVoxel(session, gx, gy, gz)) continue;

          const minX = gx * DIG_VOXEL_SIZE_METERS;
          const minY = gy * DIG_VOXEL_SIZE_METERS;
          const minZ = gz * DIG_VOXEL_SIZE_METERS;
          const maxX = minX + DIG_VOXEL_SIZE_METERS;
          const maxY = minY + DIG_VOXEL_SIZE_METERS;
          const maxZ = minZ + DIG_VOXEL_SIZE_METERS;
          const closestX = clamp(resolved.x, minX, maxX);
          const closestY = clamp(resolved.y, minY, maxY);
          const closestZ = clamp(resolved.z, minZ, maxZ);
          const dx = resolved.x - closestX;
          const dy = resolved.y - closestY;
          const dz = resolved.z - closestZ;
          const distanceSquared = dx * dx + dy * dy + dz * dz;
          if (distanceSquared >= radius * radius) continue;

          let nx = 0;
          let ny = 0;
          let nz = 0;
          let penetration: number;
          if (distanceSquared > epsilon * epsilon) {
            const distance = Math.sqrt(distanceSquared);
            nx = dx / distance;
            ny = dy / distance;
            nz = dz / distance;
            penetration = radius - distance;
          } else {
            // The sphere center is inside the voxel; push it through the
            // nearest face far enough to place the whole sphere outside.
            const left = resolved.x - minX;
            const right = maxX - resolved.x;
            const down = resolved.y - minY;
            const up = maxY - resolved.y;
            const back = resolved.z - minZ;
            const front = maxZ - resolved.z;
            const nearest = Math.min(left, right, down, up, back, front);
            if (nearest === left) {
              nx = -1;
              penetration = radius + left;
            } else if (nearest === right) {
              nx = 1;
              penetration = radius + right;
            } else if (nearest === down) {
              ny = -1;
              penetration = radius + down;
            } else if (nearest === up) {
              ny = 1;
              penetration = radius + up;
            } else if (nearest === back) {
              nz = -1;
              penetration = radius + back;
            } else {
              nz = 1;
              penetration = radius + front;
            }
          }

          resolved.x += nx * (penetration + epsilon);
          resolved.y += ny * (penetration + epsilon);
          resolved.z += nz * (penetration + epsilon);
          contacts.push({ x: nx, y: ny, z: nz });
          collided = true;
          moved = true;
        }
      }
    }
    if (!moved) break;
  }

  return { position: resolved, collided, contacts };
}

function isSolidVoxel(
  session: SessionChunks,
  globalX: number,
  globalY: number,
  globalZ: number,
): boolean {
  if (![globalX, globalY, globalZ].every(Number.isSafeInteger)) return false;
  const chunk: ChunkCoordinate = {
    x: Math.floor(globalX / 32),
    y: Math.floor(globalY / 32),
    z: Math.floor(globalZ / 32),
  };
  const local = {
    x: globalX - chunk.x * 32,
    y: globalY - chunk.y * 32,
    z: globalZ - chunk.z * 32,
  };
  const voxel = session.readVoxel(chunk, local);
  return voxel !== null && !voxel.mined;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
