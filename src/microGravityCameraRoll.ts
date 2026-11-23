import { MICRO_GRAVITY_DIRECTION_THRESHOLD } from './chunkMicroGravity.ts';

/** Screen-space gravity: +X is right, +Y is up, in the unrolled camera frame. */
export function gravityLevelRoll(current: number, gx: number, gy: number, dt: number): number {
  if (![current,gx,gy,dt].every(Number.isFinite)||dt<0||dt>0.1)
    throw Error('Invalid camera roll input');
  const strength=Math.hypot(gx,gy);
  if (!Number.isFinite(strength)) throw Error('Invalid projected gravity magnitude');
  if (dt===0)return current;
  // When forward points into gravity, its screen projection vanishes.
  // Ease out the previous bank instead of retaining an obsolete roll forever.
  if (strength<MICRO_GRAVITY_DIRECTION_THRESHOLD) {
    const step=0.9*dt;
    return Math.abs(current)<=step?0:current-Math.sign(current)*step;
  }
  const target=Math.atan2(gx,-gy);
  const difference=Math.atan2(Math.sin(target-current),Math.cos(target-current));
  const maxStep=0.9*dt;
  return current+Math.max(-maxStep,Math.min(maxStep,difference));
}
