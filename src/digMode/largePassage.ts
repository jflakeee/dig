import { DIG_CHUNK_SIZE_METERS, DIG_VOXEL_SIZE_METERS, type ChunkCoordinate, type LocalPosition } from './chunkCoordinates';
import type { PortalGravityField } from './portalGravity';

// A three-voxel bore lies along +X, clear of the small passage along +Z.
const FIRST = 18;
const LAST = 26;
const AXIS = 16;
const HALF_WIDTH = 1.5 * DIG_VOXEL_SIZE_METERS;

export function* largePassageCavity(): Iterable<ChunkCoordinate> {
  for (let x = FIRST - 3; x <= LAST + 4; x++) {
    for (let y = AXIS - 1; y <= AXIS + 1; y++) {
      for (let z = AXIS - 1; z <= AXIS + 1; z++) yield { x, y, z };
    }
  }
}

export class LargePassage {
  readonly fields: readonly PortalGravityField[];

  readonly firstExitVoxel = LAST + 1;
  readonly gravityFields: readonly PortalGravityField[];

  constructor(chunk: ChunkCoordinate, readonly outletOnly = false) {
    const y = chunk.y * DIG_CHUNK_SIZE_METERS + (AXIS + 0.5) * DIG_VOXEL_SIZE_METERS;
    const z = chunk.z * DIG_CHUNK_SIZE_METERS + (AXIS + 0.5) * DIG_VOXEL_SIZE_METERS;
    this.fields = [FIRST, LAST + 1].map((index, i) => ({
      center: [chunk.x * DIG_CHUNK_SIZE_METERS + index * DIG_VOXEL_SIZE_METERS, y, z],
      end: i === 0 ? 'inlet' : 'outlet',
      normalIntoPassage: [i === 0 ? 1 : -1, 0, 0],
      influenceRadiusMeters: 2.5,
      accelerationMetersPerSecondSquared: 1,
    }));
    this.gravityFields = outletOnly ? [this.fields[1]] : this.fields;
  }

  crossesForward(from: LocalPosition, to: LocalPosition, end: 0 | 1, radius: number): boolean {
    if (this.outletOnly) return false;
    const [x, y, z] = this.fields[end].center;
    const plane = end === 0 ? x : x + radius;
    if (from.x >= plane || to.x < plane) return false;
    const t = (plane - from.x) / (to.x - from.x);
    return Math.max(Math.abs(from.y + t * (to.y - from.y) - y),
      Math.abs(from.z + t * (to.z - from.z) - z)) <= HALF_WIDTH - radius + 1e-5;
  }

  // Intersect the swept sphere with the exit aperture during reverse travel.
  reverseContactX(from: LocalPosition, to: LocalPosition, radius: number): number | undefined {
    const [outlet, y, z] = this.fields[1].center;
    const stop = outlet + radius;
    if (from.x < stop || to.x >= stop) return;
    const fraction = (from.x - stop) / (from.x - to.x);
    const dy = Math.max(0, Math.abs(from.y + (to.y - from.y) * fraction - y) - HALF_WIDTH);
    const dz = Math.max(0, Math.abs(from.z + (to.z - from.z) * fraction - z) - HALF_WIDTH);
    if (Math.hypot(dy, dz) <= radius) return stop;
  }
}
