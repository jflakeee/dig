// Zero-gravity movement math for the infinite-underground game mode.
// Uses a right-handed camera convention: yaw=0 faces negative Z,
// positive pitch looks up. No DOM or Three.js dependency.
export type Vec3 = readonly [number, number, number];
export function lookDirection(yaw: number, pitch: number): Vec3 {
  if (!Number.isFinite(yaw) || !Number.isFinite(pitch)) throw Error('Invalid camera orientation');
  const cp = Math.cos(pitch);
  return [-Math.sin(yaw) * cp, Math.sin(pitch), -Math.cos(yaw) * cp];
}
export function zeroGravityDisplacement(
  yaw: number,
  pitch: number,
  forward: number,
  strafe: number,
  vertical: number,
  speed: number,
  deltaSeconds: number,
): Vec3 {
  if (![forward, strafe, vertical, speed, deltaSeconds].every(Number.isFinite) ||
      speed < 0 || deltaSeconds < 0) throw Error('Invalid movement input');
  const [fx, fy, fz] = lookDirection(yaw, pitch);
  // Strafe stays horizontal so mobile direction control remains predictable.
  const sx = Math.cos(yaw), sz = -Math.sin(yaw);
  const dx = fx * forward + sx * strafe;
  const dy = fy * forward + vertical;
  const dz = fz * forward + sz * strafe;
  const length = Math.hypot(dx, dy, dz);
  if (length === 0) return [0, 0, 0];
  const scale = speed * deltaSeconds / Math.max(1, length);
  return [dx * scale, dy * scale, dz * scale];
}
