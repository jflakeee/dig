// Each occupied cell contains a convex stone. The voxel bounds clip its six
// main faces; these extra planes fracture the corners at different depths.
function hash(value) {
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967296;
}
const shapes = Array.from({ length: 64 }, (_, variant) => {
  const planes = [];
  for (let corner = 0; corner < 8; corner++) {
    const seed = variant * 211 + corner * 13;
    const x = (corner & 1 ? 1 : -1) * (0.6 + hash(seed + 1));
    const y = (corner & 2 ? 1 : -1) * (0.6 + hash(seed + 2));
    const z = (corner & 4 ? 1 : -1) * (0.6 + hash(seed + 3));
    const extent = (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2;
    planes.push({ x, y, z, bound: extent * (0.42 + 0.42 * hash(seed + 4)),
      shade: 0.78 + (0.24*y - 0.12*x + 0.08*z) / Math.hypot(x,y,z) });
  }
  return planes;
});

// The stone a cell holds: its variant index and the corner planes that cut it.
// Shared with the WebGL renderer so drawn stones match what rays and lasers hit.
export const stoneCount = shapes.length;
export const stoneVariant = (x, y, z) => Math.floor(hash(Math.imul(x, 73856093) ^ Math.imul(y, 19349663) ^ Math.imul(z, 83492791)) * shapes.length);
export const stonePlanes = variant => shapes[variant];
export function intersectStone(p, dx, dy, dz, x, y, z, near, far, axis) {
  const key = Math.imul(x, 73856093) ^ Math.imul(y, 19349663) ^ Math.imul(z, 83492791);
  const planes = shapes[Math.floor(hash(key) * shapes.length)];
  const ox = p[0] - x - 0.5, oy = p[1] - y - 0.5, oz = p[2] - z - 0.5;
  let shade = [0.78, 0.66, 1][axis];
  for (const plane of planes) {
    const gap = plane.bound - (plane.x * ox + plane.y * oy + plane.z * oz);
    const rate = plane.x * dx + plane.y * dy + plane.z * dz;
    if (Math.abs(rate) < 1e-9) {
      if (gap < 0) return null;
      continue;
    }
    const distance = gap / rate;
    if (rate > 0) far = Math.min(far, distance);
    else if (distance > near) {
      near = distance;
      shade = plane.shade;
    }
    if (near > far) return null;
  }
  return { x, y, z, t: near, axis, shade };
}
