import { microGravityAt } from './chunkMicroGravity.ts';
import type { Vec3 } from './zeroGravityMovement.ts';

export type DriftState = Readonly<{ velocity: Vec3 }>;
export const INITIAL_DRIFT: DriftState = { velocity: [0, 0, 0] };
/** Optional assist damping keeps the machine controllable and never consumes fuel. */
export function microGravityDrift(
  state: DriftState, seed: number, position: Vec3, dt: number,
): { state: DriftState; displacement: Vec3 } {
  if (!Number.isFinite(dt) || dt < 0 || dt > 0.1) throw Error('Invalid delta');
  if (!state.velocity.every(Number.isFinite)) throw Error('Invalid velocity');
  if (dt === 0) return { state, displacement: [0, 0, 0] };
  const g = microGravityAt(seed, position);
  // Exact solution for constant acceleration with linear damping over one frame.
  // This avoids frame-rate-dependent drift from applying acceleration before damping.
  const decay = Math.exp(-2.5 * dt);
  const accelerationWeight = -Math.expm1(-2.5 * dt) / 2.5;
  const next = state.velocity.map((v, i) => {
    return v * decay + g[i] * accelerationWeight;
  });
  const speed = Math.hypot(...next);
  const scale = speed > 0.12 ? 0.12 / speed : 1;
  const velocity = next.map(v => v * scale) as unknown as Vec3;
  // Integrate the velocity curve, rather than treating end-of-frame velocity
  // as the average. Apply the same speed-cap scale if the endpoint is capped.
  const displacement = state.velocity.map((v, i) =>
    (v * accelerationWeight + g[i] * (dt - accelerationWeight) / 2.5) * scale,
  ) as unknown as Vec3;
  return { state: { velocity }, displacement };
}
