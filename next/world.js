// One cell is half a metre. Coordinates name a voxel by its lower corner.
export const radius = 0.92;
export const entrance = [0.5, 0.5, 7];
export const exitMouth = [0.5, 0.5, -0.98];
export const forward = (yaw, pitch) => [
  Math.sin(yaw) * Math.cos(pitch),
  Math.sin(pitch),
  Math.cos(yaw) * Math.cos(pitch),
];
export const offset = (p, d, t) => p.map((v, i) => v + d[i] * t);
const key = (x, y, z) => (x + 64) * 16384 + (y + 64) * 128 + z + 64;

export function createWorld(tutorial) {
  const air = new Set();
  const bounded = (x, y, z) => [x, y, z].every((v) => v >= -15 && v <= 16);
  const dig = (x, y, z) => air.add(key(x, y, z));
  for (let x = -1; x <= 1; x++)
    for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) dig(x, y, z);
  if (tutorial) {
    for (let x = -2; x <= 2; x++)
      for (let y = -2; y <= 2; y++) for (let z = 6; z <= 10; z++) dig(x, y, z);
  }
  const solid = (x, y, z) => !air.has(key(x, y, z));
  function blockers(p) {
    const found = [];
    for (let x = Math.floor(p[0] - radius); x <= p[0] + radius; x++)
      for (let y = Math.floor(p[1] - radius); y <= p[1] + radius; y++)
        for (let z = Math.floor(p[2] - radius); z <= p[2] + radius; z++) {
          if (!solid(x, y, z)) continue;
          const dist = [x, y, z].reduce(
            (sum, v, i) => sum + Math.max(v - p[i], 0, p[i] - v - 1) ** 2,
            0,
          );
          if (dist < radius * radius) found.push([x, y, z]);
        }
    return found;
  }
  function uncovered() {
    if (!tutorial) return false;
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++) if (solid(x, y, 5)) return false;
    return true;
  }
  // DDA traversal is shared by view rays, laser hits and chain attachments.
  function trace(p, dx, dy, dz, limit = 32) {
    let x = Math.floor(p[0]),
      y = Math.floor(p[1]),
      z = Math.floor(p[2]);
    const ax = Math.abs(1 / dx),
      ay = Math.abs(1 / dy),
      az = Math.abs(1 / dz);
    let tx = dx === 0 ? Infinity : ((dx > 0 ? x + 1 : x) - p[0]) / dx;
    let ty = dy === 0 ? Infinity : ((dy > 0 ? y + 1 : y) - p[1]) / dy;
    let tz = dz === 0 ? Infinity : ((dz > 0 ? z + 1 : z) - p[2]) / dz;
    let t = 0,
      axis = 2;
    while (t < limit) {
      if (solid(x, y, z)) return { x, y, z, t, axis };
      if (tx <= ty && tx <= tz) {
        t = tx;
        tx += ax;
        x += Math.sign(dx);
        axis = 0;
      } else if (ty <= tz) {
        t = ty;
        ty += ay;
        y += Math.sign(dy);
        axis = 1;
      } else {
        t = tz;
        tz += az;
        z += Math.sign(dz);
        axis = 2;
      }
    }
    return null;
  }
  return { tutorial, solid, dig, bounded, blockers, uncovered, trace };
}
