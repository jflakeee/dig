import { DIG_CHUNK_SIZE_METERS, DIG_VOXEL_SIZE_METERS, type ChunkCoordinate, type LocalPosition } from './chunkCoordinates';
import { portalGravityAcceleration, type PortalGravityField } from './portalGravity';

// Both mouths share a straight half-metre bore. The 0.64 m machine stays outside.
const COLUMN = 19;
const ROW = 16;
const INLET = 21;
const OUTLET = 26;

export function smallPassageCavity(): ChunkCoordinate[] {
  const cells: ChunkCoordinate[] = [];
  for (let z = INLET - 3; z <= OUTLET + 3; z++) {
    const inside = z >= INLET && z <= OUTLET;
    for (let x = inside ? COLUMN : COLUMN - 2; x <= (inside ? COLUMN : COLUMN + 1); x++) {
      for (let y = inside ? ROW : ROW - 1; y <= (inside ? ROW : ROW + 1); y++) {
        cells.push({ x, y, z });
      }
    }
  }
  return cells;
}

export class SmallPassage {
  readonly fields: readonly PortalGravityField[];
  readonly x: number;
  readonly y: number;
  z: number;
  private velocity = 0;
  private collected = false;

  constructor(chunk: ChunkCoordinate) {
    this.x = chunk.x * DIG_CHUNK_SIZE_METERS + (COLUMN + 0.5) * DIG_VOXEL_SIZE_METERS;
    this.y = chunk.y * DIG_CHUNK_SIZE_METERS + (ROW + 0.5) * DIG_VOXEL_SIZE_METERS;
    const base = chunk.z * DIG_CHUNK_SIZE_METERS;
    this.fields = [INLET, OUTLET + 1].map((voxel, i) => ({
      center: [this.x, this.y, base + voxel * DIG_VOXEL_SIZE_METERS],
      end: i === 0 ? 'inlet' : 'outlet',
      normalIntoPassage: [0, 0, i === 0 ? 1 : -1],
      influenceRadiusMeters: 1.6,
      accelerationMetersPerSecondSquared: 0.85,
    }));
    this.z = this.fields[0].center[2] - 0.7;
  }

  get visible(): boolean { return !this.collected; }

  step(dt: number, machine: LocalPosition): boolean {
    if (this.collected) return false;
    const outlet = this.fields[1].center[2];
    const gravity = portalGravityAcceleration([this.x, this.y, this.z], this.fields);
    this.velocity += gravity[2] * dt;
    // Stop at the far wall of the receiving pocket.
    const wall = outlet + 3 * DIG_VOXEL_SIZE_METERS - 0.12;
    this.z = Math.min(wall, this.z + this.velocity * dt);
    if (this.z === wall) this.velocity = 0;
    if (this.z < outlet || Math.hypot(machine.x - this.x, machine.y - this.y, machine.z - this.z) > 0.8) return false;
    this.collected = true;
    return true;
  }
}
