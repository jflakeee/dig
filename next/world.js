import { roll } from './roll.js';
import { blockYield } from './minerals.js';
import { arrivalHazard, senseHazard } from './hazards.js';
import { simulate, hitHull, contactDamage } from './debris.js';
import { terrainKind, makeChunk, naturalSolid, identify } from './chunk-terrain.js';
// One cell is half a metre. Coordinates name a voxel by its lower corner.
export const radius = 0.92;
export const exitMouth = [0.5, 0.5, -0.98];
export const forward = (yaw, pitch) => [
  Math.sin(yaw) * Math.cos(pitch),
  Math.sin(pitch),
  Math.cos(yaw) * Math.cos(pitch),
];
export const offset = (p, d, t) => p.map((v, i) => v + d[i] * t);
// Use the same one-sided square opening for visible surfaces and laser targeting.
export function portalRayDistance(portal, pos, ray, limit) {
  const {axis, sign, point, radius} = portal;
  if (ray[axis] * sign <= 0.001) return Infinity;
  const t = (point[axis] - pos[axis]) / ray[axis];
  if (t <= 0 || t > limit + 0.00001) return Infinity;
  for (let i = 0; i < 3; i++)
    if (i !== axis && Math.abs(pos[i] + ray[i] * t - point[i]) > radius) return Infinity;
  return t;
}
// Chunks are 16 m wide. Their voxel coordinates share one world frame.
const side = 32;
const chunkOf = (cell) => Math.floor((cell + 15) / side);
// The chunk coordinate and bit index that own a voxel.
export function cellOwner(x, y, z) {
  return {chunk: [chunkOf(x), chunkOf(y), chunkOf(z)],
    index: (((x + 15) & 31) * side + ((y + 15) & 31)) * side + ((z + 15) & 31)};
}
// Whether a saved chunk (`air` as an index array or base64 bit mask) has the cell excavated.
export function savedAir(state, index) {
  if (Array.isArray(state.air)) return state.air.includes(index);
  return (atob(state.air).charCodeAt(index >> 3) & (1 << (index & 7))) !== 0;
}
export { roll };
export function createWorld(tutorial, random, arrivalRadius = 1.64, arrivalStrength = 2.8, saved, terrainRandom, seed) {
  seed = (saved?.seed ?? seed ?? Math.random() * 4294967296) >>> 0;
  random ??= key => roll(seed, key);
  terrainRandom ??= random;
  // Times each coordinate has been reset; a new generation rolls new terrain.
  const generations = new Map(saved?.generations ?? []);
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
      const epoch = generations.get(key) ?? 0;
      const id = key + ':' + epoch;
      const kind = terrainKind(terrainRandom(id + ':kind'));
      cached = makeChunk(cx, cy, cz, kind, kind === 'rock' ? 0 : Math.floor(terrainRandom(id + ':seed') * 0x100000000));
      cached.epoch = epoch;
      let draw = 0;
      if (!tutorial && hasMouth && cx===0 && cy===0 && cz===0 && !saved)
        cached.hazard = arrivalHazard(() => terrainRandom(id + ':hazard:' + draw++));
      chunks.set(key, cached);
    }
    return cached;
  }
  function localIndex(x, y, z) {
    return (((x + 15) & 31) * side + ((y + 15) & 31)) * side + ((z + 15) & 31);
  }
  // cause: 'initial' (empty from generation), 'mined' (player excavation) or
  // 'debris' (portal detachment). Only mined faces open the six-face window.
  function scheduleFace(chunk, owner, axis, sign, cause) {
      const id = owner.join(',') + ':' + (chunk.epoch ?? 0) + ':face' + (axis * 2 + Number(sign > 0)) + ':';
      const point = owner.map(n => n * side + 1);
      point[axis] += sign * side / 2;
      const width = 1 + Math.floor(random(id + 'width') * side);
      for (let i = 0; i < 3; i++)
        if (i !== axis) point[i] += Math.floor(random(id + 'offset' + i) * (side - width + 1)) - (side - width) / 2;
      chunk.faces.push({point, axis, sign, chunk: owner, exit: false,
        radius: width / 2, strength: 0.8 + random(id + 'strength') * 4,
        ready: elapsed + 301 + random(id + 'delay') * 59, cleared: elapsed, cause});
  }
  function enter(chunk) {
    if (chunk.entered) return;
    chunk.entered = true;
    if (chunk.kind !== 'empty' && chunk.kind !== 'warehouse') return;
    const owner = [chunk.x,chunk.y,chunk.z];
    for (let axis=0; axis<3; axis++)
      for (const sign of [-1,1]) scheduleFace(chunk, owner, axis, sign, 'initial');
  }
  function dig(x, y, z, mined = true) {
    const chunk = chunkAt(x, y, z, true);
    const index = localIndex(x, y, z);
    if (!naturalSolid(chunk,x,y,z) || chunk.air.has(index)) return;
    chunk.air.add(index);
    const priorFaces = chunk.faces.length;
    const coords = [x, y, z];
    const owner = [chunk.x, chunk.y, chunk.z];
    for (let axis = 0; axis < 3; axis++) {
      const local = (coords[axis] + 15) & 31;
      if (local !== 0 && local !== side - 1) continue;
      const sign = local === 0 ? -1 : 1;
      const face = axis * 2 + Number(sign > 0);
      if (--chunk.remaining[face] !== 0) continue;
      scheduleFace(chunk, owner, axis, sign, mined ? 'mined' : 'debris');
    }
    // Saves written before `cause` existed count every face as mined.
    const firstMined = chunk.faces.find(f => (f.cause ?? 'mined') === 'mined');
    if (mined && priorFaces < 6 && chunk.faces.length === 6 && !chunk.linked &&
        firstMined && elapsed - firstMined.cleared <= 300) {
      chunk.linked = true;
      for (const face of chunk.faces) {
        const adjacent = owner.map((n, i) => n + (i === face.axis ? face.sign : 0));
        chunkAt(...adjacent.map(n => n * side), true);
      }
    }
    return true;
  }
  function fragments() {
    return chunks.get('0,0,0')?.debris?.parts ?? [];
  }
  function debrisStep(dt, pos, speed, anchored, onContact) {
    if (tutorial || !hasMouth) return [0,0,0];
    const chunk = chunks.get('0,0,0');
    const state = chunk.debris ??= {tick:0,time:0,parts:[]};
    state.parts = state.parts.filter(part => part.point.every((v,i) => Math.abs(chunkOf(Math.floor(v))-center[i]) <= 1));
    const active = portals();
    return simulate(state,dt,pos,speed,anchored,solid,(x,y,z) => dig(x,y,z,false),p => gravity(p,active),onContact);
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
  function solid(x,y,z) {
    const c = chunkAt(x,y,z,true);
    return naturalSolid(c,x,y,z) && !c.air.has(localIndex(x,y,z));
  }
  function stream(pos) {
    const next = pos.map(chunkOf);
    if (next.every((n, i) => n === center[i])) return;
    center = next;
    enter(chunkAt(...pos.map(Math.floor), true));
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
      generations.set(key, (chunk.epoch ?? 0) + 1);
      if (chunk === cached) cached = undefined;
      if (chunk.x === 0 && chunk.y === 0 && chunk.z === 0) hasMouth = false;
    }
  }
  function snapshot() {
    return {seed, generations: Array.from(generations), elapsed, center, hasMouth, cargoTime, chunks: Array.from(chunks.values(), chunk => {
      const {air, ...state} = chunk;
      if (air.size < 1024) return {...state, air: Array.from(air)};
      const bytes = new Uint8Array(side ** 3 / 8);
      for (const index of air) bytes[index >> 3] |= 1 << (index & 7);
      return {...state, air: btoa(String.fromCharCode(...bytes))};
    })};
  }
  if (saved) {
    elapsed = saved.elapsed;
    center = saved.center;
    hasMouth = saved.hasMouth;
    for (const state of saved.chunks) {
      const air = new Set();
      if (Array.isArray(state.air)) {
        for (const index of state.air) air.add(index);
      } else {
        const bytes = atob(state.air);
        if (bytes.length !== side ** 3 / 8) throw Error('굴착 기록을 읽을 수 없습니다.');
        for (let i = 0; i < bytes.length; i++)
          for (let bit = 0; bit < 8; bit++)
            if (bytes.charCodeAt(i) & (1 << bit)) air.add(i * 8 + bit);
      }
      chunks.set([state.x, state.y, state.z].join(','), {...state, air});
    }
  } else {
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) dig(x, y, z);
    const origin = chunkAt(0,0,0,true);
    if (tutorial && origin.kind !== 'rock') origin.starterRocks = true;
    enter(origin);
  }

  function warehouseItems() {
    const entries = [];
    for (const chunk of chunks.values())
      for (const item of chunk.items ?? []) entries.push({chunk,item});
    return entries;
  }
  function takeNearby(pos, velocity = [0,0,0]) {
    for (const {chunk,item} of warehouseItems()) {
      if (Math.hypot(...item.point.map((v,i) => v-pos[i])) > 1.3 || item.cooldown > 0) continue;
      if (Math.hypot(...velocity.map((v,i) => v-(item.speed?.[i] ?? 0))) > 2.5) continue;
      chunk.items.splice(chunk.items.indexOf(item),1);
      return identify(item,chunk);
    }
    return null;
  }

  let cargoTime = saved?.cargoTime ?? 0;
  function hullContacts(dt,pos,speed,anchored) {
    let damage = 0, impactPoint = null, largest = 0;
    const blocked = point => blockers(point).length > 0;
    function contact(body,relativeTo,field,time) {
      const loss = contactDamage(body,pos,relativeTo,field,time,blocked);
      damage += loss;
      if (loss > largest) { largest = loss; impactPoint = body.point.slice(); }
      return loss;
    }
    const push = debrisStep(dt,pos,speed,anchored,contact);
    cargoTime += dt;
    const active = portals();
    while (cargoTime + 1e-9 >= 0.05) {
      cargoTime = Math.max(0,cargoTime-0.05);
      for (const {item,chunk} of warehouseItems()) {
        item.speed ??= [0,0,0];
        const mass = 1 + ((chunk.seed + item.id*17) % 5);
        const field = gravity(item.point,active);
        for (let i=0; i<3; i++) {
          item.speed[i] = (item.speed[i] + 0.05*field[i])*0.999;
          const point = item.point.slice();
          point[i] += 0.05*item.speed[i];
          if (solid(...point.map(Math.floor))) item.speed[i] *= -0.25;
          else item.point = point;
        }
        item.cooldown = Math.max(0,(item.cooldown ?? 0)-0.05);
        const body = {point:item.point,speed:item.speed,mass};
        const relativeTo = speed.map((v,i) => v+push[i]);
        if (contact(body,relativeTo,field,0.05) > 0) item.cooldown = 0.5;
        const hit = hitHull(body,pos,relativeTo,anchored);
        item.speed = body.speed;
        for (let i=0; i<3; i++) push[i] += hit[i];
      }
    }
    return {push,damage,impactPoint};
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

  // DDA traversal is shared by view rays, laser hits and chain attachments.
  function trace(p, dx, dy, dz, limit = 32, intersect) {
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
      if (solid(x, y, z)) {
        if (!intersect) return { x, y, z, t, axis };
        const hit = intersect(p, dx, dy, dz, x, y, z, t, Math.min(tx, ty, tz, limit), axis);
        if (hit) return hit;
      }
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
  // Minerals a block will yield, for drawing. Pure: it never changes state.
  const yields = new Map();
  function mineralAt(x, y, z) {
    const chunk = chunkAt(x, y, z, false);
    if (!chunk) return null;
    const key = ((x + 1e5) * 2e5 + (y + 1e5)) * 2e5 + (z + 1e5);
    let entry = yields.get(key);
    if (!entry || entry.epoch !== (chunk.epoch ?? 0)) {
      if (yields.size > 4096) yields.clear();
      entry = {epoch: chunk.epoch ?? 0, value: blockYield(seed, [chunk.x, chunk.y, chunk.z], chunk.epoch ?? 0, localIndex(x, y, z))};
      yields.set(key, entry);
    }
    return entry.value;
  }
  return {
    mineralAt,
    get hazard() { return chunks.get('0,0,0')?.hazard; },
    sense(pos,dt,shock) { return senseHazard(this.hazard,pos,dt,trace,shock); },
    advance(dt) { elapsed += dt; },
    hullContacts, debrisStep, fragments, snapshot, portals, gravity, warehouseItems, takeNearby,
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
