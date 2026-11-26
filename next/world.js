// One cell is half a metre. Coordinates name a voxel by its lower corner.
export const radius = 0.92;
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
export function createWorld(tutorial, random = Math.random, arrivalRadius = 1.64, arrivalStrength = 2.8) {
  const chunks = new Map();
  let elapsed = 0;
  const initial = {
    point: tutorial ? [0.5, 0.5, 7] : exitMouth, axis: 2, sign: tutorial ? 1 : -1,
    radius: tutorial ? 1.64 : arrivalRadius, strength: tutorial ? 0.6 : arrivalStrength, exit: !tutorial, chunk: [0, 0, 0],
  };
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
      cached = { x: cx, y: cy, z: cz, air: new Set(), remaining: Array(6).fill(side * side), faces: [] };
      chunks.set(key, cached);
    }
    return cached;
  }
  function localIndex(x, y, z) {
    return (((x + 15) & 31) * side + ((y + 15) & 31)) * side + ((z + 15) & 31);
  }
  function dig(x, y, z) {
    const chunk = chunkAt(x, y, z, true);
    const index = localIndex(x, y, z);
    if (chunk.air.has(index)) return;
    chunk.air.add(index);
    const coords = [x, y, z];
    const owner = [chunk.x, chunk.y, chunk.z];
    for (let axis = 0; axis < 3; axis++) {
      const local = (coords[axis] + 15) & 31;
      if (local !== 0 && local !== side - 1) continue;
      const sign = local === 0 ? -1 : 1;
      const face = axis * 2 + Number(sign > 0);
      if (--chunk.remaining[face] !== 0) continue;
      const point = owner.map(n => n * side + 1);
      point[axis] += sign * side / 2;
      const width = 1 + Math.floor(random() * side);
      for (let i = 0; i < 3; i++)
        if (i !== axis) point[i] += Math.floor(random() * (side - width + 1)) - (side - width) / 2;
      chunk.faces.push({point, axis, sign, chunk: owner, exit: false,
        radius: width / 2, strength: 0.8 + random() * 4,
        ready: elapsed + 301 + random() * 59, cleared: elapsed});
    }
    if (chunk.faces.length === 6 && !chunk.linked &&
        elapsed - chunk.faces[0].cleared <= 300) {
      chunk.linked = true;
      for (const face of chunk.faces) {
        const adjacent = owner.map((n, i) => n + (i === face.axis ? face.sign : 0));
        chunkAt(...adjacent.map(n => n * side), true);
      }
    }
  }
  function portals() {
    const result = hasMouth ? [initial] : [];
    for (const chunk of chunks.values())
      for (const face of chunk.faces)
        if (elapsed >= face.ready) result.push(face);
    return result;
  }

  function gravity(p, active = portals()) {
    const pull = [0, 0, 0];
    for (const portal of active) {
      if (!portal.chunk.every((n, i) => chunkOf(Math.floor(p[i])) === n)) continue;
      const gap = portal.point.map((v, i) => v - p[i]);
      const distance = Math.hypot(...gap);
      const strength = (portal.exit ? -portal.strength : portal.strength) / ((1 + distance * distance / 16) * Math.max(0.1, distance));
      for (let i = 0; i < 3; i++) pull[i] += gap[i] * strength;
    }
    return pull;
  }
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
    advance(dt) { elapsed += dt; },
    portals, gravity,
    hasChunk(x, y, z) { return chunks.has([x, y, z].join(',')); },
    tutorial,
    solid,
    dig,
    stream,
    blockers,
    trace,
    get mouth() {
      return hasMouth ? initial.point : null;
    },
  };
}
