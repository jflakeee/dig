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
// Whether a body of the given radius moving from `a` to `b` passes through an
// entrance's square opening, front side first. Exits let nothing in.
export function throughOpening(portal, a, b, size) {
  if (portal.exit) return false;
  const {axis, sign, point} = portal;
  const before = sign * (a[axis] - point[axis]), after = sign * (b[axis] - point[axis]);
  if (before >= 0 || after < 0) return false;
  const t = -before / (after - before);
  return [0, 1, 2].every(i => i === axis || Math.abs(a[i] + (b[i] - a[i]) * t - point[i]) + size <= portal.radius);
}
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
export const microgravityChance = 0.25;
// Portals no longer wait for a cleared face: a new chunk rolls once whether a
// portal will open on one of its faces, and when. For the last minute before
// it opens the forming portal reads on the sensor as microgravity and pulls
// weakly. Trial values.
export const portalChance = 0.35;
export const portalDelay = [60, 360];     // seconds after the chunk first appears
export const formingSeconds = 60;
const pourInterval = 0.25; // seconds between minerals pouring out after arrival
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
      // The guaranteed tutorial entrance stands alone in its chunk.
      if (!(tutorial && !cx && !cy && !cz)) schedulePortal(cached, [cx, cy, cz], id + ':portal:');
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
  // A chunk's one random portal: whether, which face, and when it opens.
  function schedulePortal(chunk, owner, id) {
    if (random(id + 'chance') >= portalChance) return;
    const face = Math.floor(random(id + 'face') * 6);
    const ready = elapsed + portalDelay[0] + random(id + 'delay') * (portalDelay[1] - portalDelay[0]);
    scheduleFace(chunk, owner, Math.floor(face / 2), face % 2 ? 1 : -1, 'random', ready);
  }
  // A face portal's opening: size, place on the face, strength. `ready` is when it opens.
  function scheduleFace(chunk, owner, axis, sign, cause, ready) {
      const id = owner.join(',') + ':' + (chunk.epoch ?? 0) + ':face' + (axis * 2 + Number(sign > 0)) + ':';
      const point = owner.map(n => n * side + 1);
      point[axis] += sign * side / 2;
      const width = 1 + Math.floor(random(id + 'width') * side);
      for (let i = 0; i < 3; i++)
        if (i !== axis) point[i] += Math.floor(random(id + 'offset' + i) * (side - width + 1)) - (side - width) / 2;
      chunk.faces.push({point, axis, sign, chunk: owner, exit: false,
        radius: width / 2, strength: 0.8 + random(id + 'strength') * 4,
        ready, cleared: elapsed, cause});
  }
  function enter(chunk) {
    if (chunk.entered) return;
    chunk.entered = true;
  }
  function dig(x, y, z, mined = true) {
    const chunk = chunkAt(x, y, z, true);
    const index = localIndex(x, y, z);
    if (!naturalSolid(chunk,x,y,z) || chunk.air.has(index)) return;
    chunk.air.add(index);
    // Face counts are still kept for saves, but clearing a face no longer opens anything.
    const coords = [x, y, z];
    for (let axis = 0; axis < 3; axis++) {
      const local = (coords[axis] + 15) & 31;
      if (local !== 0 && local !== side - 1) continue;
      chunk.remaining[axis * 2 + Number(local !== 0)]--;
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
    // Minerals swept through the portal behind the machine keep pouring out of
    // the exit for a few seconds after arrival.
    const pour = state.pour;
    if (pour?.left > 0) {
      pour.wait -= dt;
      while (pour.left > 0 && pour.wait <= 0) {
        const n = pour.left--, key = 'pour:' + n + ':';
        pour.wait += pourInterval;
        const spread = i => (roll(seed, key + i) - 0.5) * 0.9;
        const point = initial.point.map((v, i) => i === initial.axis ? v - initial.sign * 0.1 : v + spread(i));
        const speed = [0, 1, 2].map(i => i === initial.axis ? -initial.sign * pour.speed * (0.8 + 0.4 * roll(seed, key + 'v'))
          : spread(i) * 1.2);
        state.parts.push({point, speed, mass: 1 + 3 * roll(seed, key + 'm')});
      }
    }
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

  // Microgravity (docs/dig-4d-chunk-microgravity-sensor-detail-20261125.md):
  // some chunks hold a weak field of their own, fixed by the world seed, the
  // chunk and its generation, apart from portal gravity. The origin, where the
  // machine starts and arrives, has none. Chance and strengths are trial values.
  const fields = new Map();
  // Gravity is asked for every mote and part each tick, mostly in one chunk:
  // remember the last chunk asked so the common case builds no key.
  let last = null;
  function field(cx, cy, cz) {
    if (!cx && !cy && !cz) return null;
    if (last && last.x === cx && last.y === cy && last.z === cz && last.epoch === (generations.get(last.key) ?? 0)) return last.f;
    const key = [cx, cy, cz].join(','), epoch = generations.get(key) ?? 0, id = key + ':' + epoch + ':microgravity:';
    if (fields.has(id)) {
      last = {x: cx, y: cy, z: cz, key, epoch, f: fields.get(id)};
      return last.f;
    }
    let f = null;
    if (roll(seed, id + 'exists') < microgravityChance) {
      const z = 2 * roll(seed, id + 'z') - 1, a = 2 * Math.PI * roll(seed, id + 'a'), r = Math.sqrt(1 - z * z);
      f = {dir: [r * Math.cos(a), z, r * Math.sin(a)], strength: 0.15 + 0.45 * roll(seed, id + 'strength'),
        varied: roll(seed, id + 'varied') < 0.4};
    }
    fields.set(id, f);
    last = {x: cx, y: cy, z: cz, key, epoch, f};
    return f;
  }
  // The field at a point: a varied field bends its direction smoothly with position.
  // A portal forming in this chunk during its last minute: direction toward
  // where it will open, and a pull that grows to a fifth of its strength.
  function forming(p) {
    const key = p.map(v => chunkOf(Math.floor(v))).join(',');
    const chunk = chunks.get(key);
    const face = chunk?.faces.find(f => elapsed < f.ready && elapsed >= f.ready - formingSeconds);
    if (!face) return null;
    const gap = face.point.map((v, i) => v - p[i]);
    const distance = Math.hypot(...gap) || 1;
    const progress = 1 - (face.ready - elapsed) / formingSeconds;
    return {dir: gap.map(v => v / distance), strength: face.strength * 0.2 * progress, seconds: face.ready - elapsed, forming: true};
  }
  function microgravity(p) {
    const f = field(...p.map(v => chunkOf(Math.floor(v))));
    if (!f) return forming(p);
    let dir = f.dir;
    if (f.varied) {
      dir = dir.map((v, i) => v + 0.5 * Math.sin(p[(i + 1) % 3] / 5));
      const n = Math.hypot(...dir);
      dir = dir.map(v => v / n);
    }
    return {dir, strength: f.strength, varied: f.varied};
  }
  function gravity(p, active = portals()) {
    const pull = [0, 0, 0];
    const micro = microgravity(p), shaping = micro && !micro.forming ? forming(p) : null;
    for (const f of [micro, shaping]) if (f) for (let i = 0; i < 3; i++) pull[i] += f.dir[i] * f.strength;
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
    // A stronger portal sweeps more minerals through after the machine, faster.
    if (!tutorial) {
      const force = Math.min(1, arrivalStrength / 4.8);
      origin.debris = {tick: 0, time: 0, parts: [], pour: {left: Math.round(3 + 7 * force), wait: 0.3, speed: 2.2 + 1.6 * force}};
    }
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

  // Pieces flung out of a full train. They belong to their chunk, drift and
  // bounce like warehouse goods, and vanish when that chunk collapses.
  function ejected() {
    const entries = [];
    for (const chunk of chunks.values())
      for (const item of chunk.ejected ?? []) entries.push({chunk, item});
    return entries;
  }
  // Adds pieces the save flung out that this world does not hold yet.
  function syncEjected(savedChunks = []) {
    for (const state of savedChunks) {
      const chunk = chunks.get([state.x, state.y, state.z].join(','));
      if (!chunk || (chunk.epoch ?? 0) !== (state.epoch ?? 0)) continue;
      chunk.ejected ??= [];
      for (const item of state.ejected ?? [])
        if (!chunk.ejected.some(e => e.id === item.id)) chunk.ejected.push(structuredClone(item));
    }
  }
  function takeEjected(pos, velocity = [0, 0, 0]) {
    for (const {chunk, item} of ejected()) {
      if (Math.hypot(...item.point.map((v, i) => v - pos[i])) > 1.3 || item.cooldown > 0) continue;
      if (Math.hypot(...velocity.map((v, i) => v - item.speed[i])) > 3) continue;
      chunk.ejected.splice(chunk.ejected.indexOf(item), 1);
      return item;
    }
    return null;
  }
  // The machine's radius grows with the body upgrade; contacts reach with it.
  let body = radius;
  const reach = () => 1.3 * body / radius;
  function setBody(r) { body = r; }
  let cargoTime = saved?.cargoTime ?? 0;
  function hullContacts(dt,pos,speed,anchored) {
    let damage = 0, impactPoint = null, largest = 0;
    const swallowed = [];
    const blocked = point => blockers(point).length > 0;
    function contact(body,relativeTo,field,time) {
      const loss = contactDamage(body,pos,relativeTo,field,time,blocked,reach());
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
        const hit = hitHull(body,pos,relativeTo,anchored,reach());
        item.speed = body.speed;
        for (let i=0; i<3; i++) push[i] += hit[i];
      }
      // Flung pieces are light: they fall, bounce and settle without striking the hull.
      // A piece is small enough for any portal: crossing an entrance's opening takes it away.
      for (const {chunk,item} of ejected()) {
        const field = gravity(item.point,active);
        const start = item.point.slice();
        for (let i=0; i<3; i++) {
          item.speed[i] = (item.speed[i] + 0.05*field[i])*0.96;
          const point = item.point.slice();
          point[i] += 0.05*item.speed[i];
          if (solid(...point.map(Math.floor))) item.speed[i] *= -0.3;
          else item.point = point;
        }
        item.cooldown = Math.max(0,(item.cooldown ?? 0)-0.05);
        if (active.some(portal => throughOpening(portal, start, item.point, 0))) {
          chunk.ejected.splice(chunk.ejected.indexOf(item), 1);
          swallowed.push(item);
        }
      }
    }
    return {push,damage,impactPoint,swallowed};
  }
  function blockers(p, radius = body) {
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
    get elapsed() { return elapsed; },
    get hazard() { return chunks.get('0,0,0')?.hazard; },
    sense(pos,dt,shock) { return senseHazard(this.hazard,pos,dt,trace,shock); },
    advance(dt) { elapsed += dt; },
    hullContacts, debrisStep, fragments, snapshot, portals, gravity, warehouseItems, takeNearby,
    ejected, syncEjected, takeEjected, setBody, microgravity, forming,
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
