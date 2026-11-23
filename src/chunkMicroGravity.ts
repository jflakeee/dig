import type { Vec3 } from './zeroGravityMovement.ts';

/** Deterministic, bounded SF gravity anomalies; no terrain or save mutations. */
export const MICRO_GRAVITY_MAX = 0.12; // m/s², ~1.2% of Earth's surface gravity
export const MICRO_GRAVITY_DIRECTION_THRESHOLD = 0.008; // m/s²; below this, no stable heading
export const MICRO_GRAVITY_CHUNK_METERS = 16;

function hash(seed: number, x: number, y: number, z: number, channel: number) {
  let h = (seed | 0) ^ Math.imul(x, 73856093) ^ Math.imul(y, 19349663)
    ^ Math.imul(z, 83492791) ^ Math.imul(channel, 2654435761);
  h = Math.imul(h ^ (h >>> 16), 0x7feb352d);
  h = Math.imul(h ^ (h >>> 15), 0x846ca68b);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
export function chunkMicroGravity(seed: number, x: number, y: number, z: number): Vec3 {
  if (![seed, x, y, z].every(Number.isSafeInteger)) throw Error('Invalid chunk seed/coordinates');
  const azimuth = hash(seed, x, y, z, 0) * Math.PI * 2;
  const elevation = hash(seed, x, y, z, 1) * 2 - 1;
  // Most regions have nearly zero drift; a few are noticeable.
  const magnitude = MICRO_GRAVITY_MAX * hash(seed, x, y, z, 2) ** 2;
  const radial = Math.sqrt(1 - elevation * elevation) * magnitude;
  return [radial * Math.cos(azimuth), elevation * magnitude, radial * Math.sin(azimuth)];
}
const smooth = (t: number) => t * t * (3 - 2 * t);
export function microGravityAt(seed: number, position: Vec3): Vec3 {
  if (!position.every(Number.isFinite)) throw Error('Invalid position');
  const cells = position.map(v => Math.floor(v / MICRO_GRAVITY_CHUNK_METERS));
  // Eight-corner interpolation also reads the next cell on each axis.
  // Reject edge coordinates before an unsafe +1 silently aliases another chunk.
  if (!cells.every(v => Number.isSafeInteger(v) && Number.isSafeInteger(v + 1)))
    throw Error('Position exceeds chunk coordinate range');
  // Interpolate between neighboring chunk centers, avoiding discontinuities at chunk edges.
  const weights = position.map((v, axis) =>
    smooth(v / MICRO_GRAVITY_CHUNK_METERS - cells[axis])) as number[];
  const out = [0, 0, 0];
  for (let i = 0; i < 8; i++) {
    const wx = i & 1 ? weights[0] : 1 - weights[0];
    const wy = i & 2 ? weights[1] : 1 - weights[1];
    const wz = i & 4 ? weights[2] : 1 - weights[2];
    const g = chunkMicroGravity(seed, cells[0] + (i & 1 ? 1 : 0),
      cells[1] + (i & 2 ? 1 : 0), cells[2] + (i & 4 ? 1 : 0));
    const w = wx * wy * wz;
    for (let axis = 0; axis < 3; axis++) out[axis] += g[axis] * w;
  }
  return out as unknown as Vec3;
}
