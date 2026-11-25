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
// Chunks are 16 m wide. Their voxel coordinates share one world frame.
const side = 32;
const chunkOf = (cell) => Math.floor((cell + 15) / side);
export function createWorld(tutorial) {
  const chunks = new Map();
  let cached,
    center = [0, 0, 0],
    hasMouth = true;
  function chunkAt(x, y, z, create) {
    const cx = chunkOf(x),
      cy = chunkOf(y),
      cz = chunkOf(z);
    if (cached && cached.x === cx && cached.y === cy && cached.z === cz)
      return cached;
    const key = [cx, cy, cz].join(',');
    cached = chunks.get(key);
    if (!cached && create) {
      cached = { x: cx, y: cy, z: cz, air: new Set() };
      chunks.set(key, cached);
    }
    return cached;
  }
  function localIndex(x, y, z) {
    return (((x + 15) & 31) * side + ((y + 15) & 31)) * side + ((z + 15) & 31);
  }
  const dig = (x, y, z) => chunkAt(x, y, z, true).air.add(localIndex(x, y, z));
  const solid = (x, y, z) =>
    !chunkAt(x, y, z, false)?.air.has(localIndex(x, y, z));
  function stream(pos) {
    const next = pos.map(chunkOf);
    if (next.every((n, i) => n === center[i])) return;
    center = next;
    for (const [key, chunk] of chunks) {
      if (
        Math.max(
          Math.abs(chunk.x - next[0]),
          Math.abs(chunk.y - next[1]),
          Math.abs(chunk.z - next[2]),
        ) <= 1
      )
        continue;
      chunks.delete(key);
      if (chunk === cached) cached = undefined;
      if (chunk.x === 0 && chunk.y === 0 && chunk.z === 0) hasMouth = false;
    }
  }
  for (let x = -1; x <= 1; x++)
    for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) dig(x, y, z);
  if (tutorial) {
    for (let x = -2; x <= 2; x++)
      for (let y = -2; y <= 2; y++) for (let z = 6; z <= 10; z++) dig(x, y, z);
  }
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
    if (!tutorial || !hasMouth) return false;
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
  return {
    tutorial,
    solid,
    dig,
    stream,
    blockers,
    uncovered,
    trace,
    get mouth() {
      return hasMouth ? (tutorial ? entrance : exitMouth) : null;
    },
  };
}
