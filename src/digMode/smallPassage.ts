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
  private readonly ore: { z: number; speed: number };
  private readonly drone: { z: number; speed: number };
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
    const inlet = this.fields[0].center[2];
    this.ore = { z: inlet - 0.7, speed: 0 };
    this.drone = { z: inlet - 1.1, speed: 0 };
  }

  get z(): number { return this.ore.z; }
  get droneZ(): number { return this.drone.z; }
  get droneX(): number { return this.x + 0.1; }
  get visible(): boolean { return !this.collected; }

  step(dt: number, machine: LocalPosition): boolean {
    const outlet = this.fields[1].center[2];
    // The drone brakes once its entire hull clears the outlet.
    this.advanceBody(this.drone, this.droneX, outlet + 0.25, dt);
    if (this.collected) return false;
    this.advanceBody(this.ore, this.x, outlet + 3 * DIG_VOXEL_SIZE_METERS - 0.12, dt);
    if (this.z < outlet || Math.hypot(machine.x - this.x, machine.y - this.y, machine.z - this.z) > 0.8) return false;
    this.collected = true;
    return true;
  }

  private advanceBody(body: { z: number; speed: number }, x: number, stopZ: number, dt: number): void {
    if (body.z >= stopZ) return;
    const gravity = portalGravityAcceleration([x, this.y, body.z], this.fields);
    body.speed += gravity[2] * dt;
    body.z = Math.min(stopZ, body.z + body.speed * dt);
    if (body.z === stopZ) body.speed = 0;
  }
}
