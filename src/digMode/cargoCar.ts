import type { LocalPosition } from './chunkCoordinates';

// The rear car follows the cleared route of the mining machine through bends.
export const CARGO_RADIUS = 0.2;
const COUPLING_DISTANCE = 0.95;

export class CargoCar {
  private path: LocalPosition[] = [];
  private length = 0;

  follow(from: LocalPosition, to: LocalPosition): LocalPosition {
    if (!this.path.length) this.path.push(from);
    const last = this.path[this.path.length - 1];
    const distance = Math.hypot(to.x - last.x, to.y - last.y, to.z - last.z);
    if (distance < 0.005) return this.path[0];
    this.path.push(to);
    this.length += distance;
    while (this.length > COUPLING_DISTANCE && this.path.length > 1) {
      const [a, b] = this.path;
      const segment = Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);
      const trim = this.length - COUPLING_DISTANCE;
      if (trim >= segment) {
        this.path.shift();
        this.length -= segment;
      } else {
        const t = trim / segment;
        this.path[0] = { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y), z: a.z + t * (b.z - a.z) };
        this.length = COUPLING_DISTANCE;
      }
    }
    return this.path[0];
  }

  shiftX(offset: number): void {
    this.path = this.path.map(p => ({ ...p, x: p.x + offset }));
  }
}
