import { cellOwner, savedAir } from './world.js';
import { blockYield, mineralIds, variants, defaultVariant, rockVariantAt, elementUnits } from './minerals.js';
import { elementSymbols } from './elements.js';
export const rocksPerCeramic = 3;
export const ceramicPerRepair = 1;
export const fabricationMs = 3000;
export const saveKey = 'dig-unified-v1';
export const saveVersion = 5;
// migrations[n] turns a version-n save into version n + 1. Add one entry per
// schema change and bump saveVersion; readSave applies them in order.
export const migrations = {
  1: s => ({
    ...s,
    // Legacy saves only establish the quantities still on board.
    discoveries: Array.isArray(s.cargo) ? s.cargo.flatMap((count, item) => count > 0 ? [{item, count}] : []) : [],
  }),
  // Rocks stay in `rocks`; the other 15 catalog minerals start at zero.
  2: s => ({...s, minerals: {}, mineralLog: s.rocks > 0 || s.front ? ['rock'] : [], blocksMined: 0}),
  // Every existing piece counts as its mineral's first sub-species.
  3: s => ({...s, variants: {}}),
  // Element inventory by symbol and the order each element was first recovered.
  4: s => ({...s, elements: {}, elementLog: []}),
};
// Sub-species counts. `variants` holds only non-default sub-species, keyed
// "mineral:variant"; the rest of a mineral's total is its default sub-species.
const total = (s, id) => id === 'rock' ? s.rocks : s.minerals[id] ?? 0;
export function variantCounts(s, id) {
  const counts = Object.fromEntries(variants[id].map(([v]) => [v, s.variants?.[id + ':' + v] ?? 0]));
  counts[defaultVariant(id)] = total(s, id) - variants[id].slice(1).reduce((n, [v]) => n + counts[v], 0);
  return counts;
}
function grant(s, id, variant) {
  if (id === 'rock') s.rocks++;
  else s.minerals[id] = (s.minerals[id] ?? 0) + 1;
  if (variant && variant !== defaultVariant(id)) s.variants[id + ':' + variant] = (s.variants[id + ':' + variant] ?? 0) + 1;
}
// Removes one piece of a given sub-species.
function spendVariant(s, id, variant) {
  if (variantCounts(s, id)[variant] < 1) throw Error('분해할 원료가 없습니다.');
  if (variant !== defaultVariant(id)) {
    const key = id + ':' + variant;
    if (--s.variants[key] === 0) delete s.variants[key];
  }
  if (id === 'rock') s.rocks--;
  else if (--s.minerals[id] === 0) delete s.minerals[id];
}
// Spends rocks from the default sub-species first, then in table order.
function spendRocks(s, n) {
  let left = n - Math.min(n, variantCounts(s, 'rock')[defaultVariant('rock')]);
  for (const [v] of variants.rock.slice(1)) {
    const key = 'rock:' + v, take = Math.min(left, s.variants[key] ?? 0);
    if (take) s.variants[key] -= take;
    if (s.variants[key] === 0) delete s.variants[key];
    left -= take;
  }
  s.rocks -= n;
}
const fresh = () => ({
  version: saveVersion,
  revision: 0,
  rocks: 0,
  drills: [],
  front: null,
  transited: false,
  trips: 0,
  craftReadyAt: null,
  ceramic: 0,
  drillCondition: 100,
  cargo: [0,0,0],
  discoveries: [],
  minerals: {},
  mineralLog: [],
  blocksMined: 0,
  variants: {},
  elements: {},
  elementLog: [],
  session: null,
  arrivalRadius: 1.64,
  arrivalStrength: 2.8,
});
const unreadable = '저장 기록을 읽을 수 없습니다. 원본을 보존했습니다.';
const vector = (v, valid = Number.isFinite) => Array.isArray(v) && v.length === 3 && v.every(n => valid(n));
function validDiscoveries(entries) {
  return Array.isArray(entries) && entries.length <= 3 &&
    entries.every(entry => entry && [0,1,2].includes(entry.item) &&
      Number.isSafeInteger(entry.count) && entry.count > 0) &&
    new Set(entries.map(entry => entry.item)).size === entries.length;
}
function validMinerals(s) {
  return s.minerals && typeof s.minerals === 'object' && !Array.isArray(s.minerals) &&
    Object.entries(s.minerals).every(([id, n]) => id !== 'rock' && mineralIds.includes(id) && Number.isSafeInteger(n) && n >= 0) &&
    Array.isArray(s.mineralLog) && s.mineralLog.every(id => mineralIds.includes(id)) &&
    new Set(s.mineralLog).size === s.mineralLog.length &&
    Number.isSafeInteger(s.blocksMined) && s.blocksMined >= 0 &&
    s.variants && typeof s.variants === 'object' && !Array.isArray(s.variants) &&
    Object.entries(s.variants).every(([key, n]) => {
      const [id, v] = key.split(':');
      return variants[id]?.slice(1).some(entry => entry[0] === v) && Number.isSafeInteger(n) && n > 0;
    }) &&
    mineralIds.every(id => variantCounts(s, id)[defaultVariant(id)] >= 0) &&
    s.elements && typeof s.elements === 'object' && !Array.isArray(s.elements) &&
    Object.entries(s.elements).every(([symbol, n]) => s.elementLog.includes(symbol) && Number.isSafeInteger(n) && n > 0) &&
    Array.isArray(s.elementLog) && s.elementLog.every(symbol => elementSymbols.includes(symbol)) &&
    new Set(s.elementLog).size === s.elementLog.length;
}
function validSession(s) {
  const w = s?.world;
  return (s?.hull === undefined || (Number.isFinite(s.hull) && s.hull > 0 && s.hull <= 100)) && vector(s?.pos) && vector(s.velocity) && (s.drift === undefined || vector(s.drift)) && Number.isFinite(s.yaw) && Number.isFinite(s.pitch) &&
    typeof s.sensor === 'boolean' && Number.isInteger(s.entered) && s.entered >= -1 &&
    Number.isFinite(w?.elapsed) && w.elapsed >= 0 && vector(w.center, Number.isSafeInteger) &&
    (w.cargoTime === undefined || (Number.isFinite(w.cargoTime) && w.cargoTime >= 0 && w.cargoTime < 0.05)) &&
    (w.seed === undefined || (Number.isSafeInteger(w.seed) && w.seed >= 0 && w.seed <= 0xffffffff)) &&
    (w.generations === undefined || (Array.isArray(w.generations) && w.generations.every(g =>
      Array.isArray(g) && g.length === 2 && /^-?\d+,-?\d+,-?\d+$/.test(g[0]) && Number.isSafeInteger(g[1]) && g[1] > 0))) &&
    typeof w.hasMouth === 'boolean' && Array.isArray(w.chunks) && w.chunks.every(c =>
      c && vector([c.x,c.y,c.z], Number.isSafeInteger) &&
      (c.epoch === undefined || (Number.isSafeInteger(c.epoch) && c.epoch >= 0)) &&
      (c.hazard == null || (vector(c.hazard.point) && [null,'lava','volatile'].includes(c.hazard.kind) &&
        Number.isFinite(c.hazard.seed) && typeof c.hazard.spent === 'boolean' &&
        (c.hazard.fuse === null || (Number.isFinite(c.hazard.fuse) && c.hazard.fuse >= 0)))) &&
      (c.debris === undefined || (c.debris && Number.isSafeInteger(c.debris.tick) && c.debris.tick >= 0 &&
        Number.isFinite(c.debris.time) && c.debris.time >= 0 && c.debris.time < 0.05 &&
        Array.isArray(c.debris.parts) && c.debris.parts.every(p => p && vector(p.point) && vector(p.speed) &&
        Number.isFinite(p.mass) && p.mass > 0))) &&
      (c.starterRocks === undefined || typeof c.starterRocks === 'boolean') &&
      (c.kind === undefined || (['rock','cave','empty','warehouse'].includes(c.kind) &&
        Number.isSafeInteger(c.seed) && c.seed >= 0 && c.seed <= 0xffffffff)) &&
      (c.kind !== 'warehouse' || (Array.isArray(c.items) && c.items.length <= 9 && c.items.every(item =>
        item && Number.isInteger(item.id) && item.id >= 0 && item.id < 9 && vector(item.point) &&
        (item.speed === undefined || vector(item.speed)) &&
        (item.cooldown === undefined || (Number.isFinite(item.cooldown) && item.cooldown >= 0)) &&
        (item.type === null || [0,1,2].includes(item.type))))) &&
      (Array.isArray(c.air) ? c.air.every(n => Number.isInteger(n) && n >= 0 && n < 32768)
        : typeof c.air === 'string' && /^[A-Za-z0-9+/]{5462}==$/.test(c.air)) &&
      Array.isArray(c.remaining) && c.remaining.length === 6 && c.remaining.every(n => Number.isInteger(n) && n >= 0 && n <= 1024) &&
      Array.isArray(c.faces) && c.faces.length <= 6 && c.faces.every(f =>
        f && vector(f.chunk, Number.isSafeInteger) && vector(f.point) && [0,1,2].includes(f.axis) &&
        [-1,1].includes(f.sign) && f.exit === false && Number.isFinite(f.ready) && Number.isFinite(f.cleared) &&
        (f.cause === undefined || ['initial','mined','debris'].includes(f.cause)) &&
        Number.isFinite(f.radius) && f.radius > 0 && Number.isFinite(f.strength) && f.strength > 0));
}
export function readSave() {
  const raw = localStorage.getItem(saveKey);
  if (raw === null) return fresh();
  let s;
  try {
    s = JSON.parse(raw);
  } catch {
    throw Error(unreadable);
  }
  if (Number.isSafeInteger(s?.version) && s.version > saveVersion)
    throw Error('더 새로운 버전에서 만든 저장입니다. 원본을 보존했습니다.');
  while (Number.isSafeInteger(s?.version) && s.version >= 1 && s.version < saveVersion) {
    if (!migrations[s.version]) throw Error(unreadable);
    s = {...migrations[s.version](s), version: s.version + 1};
  }
  if (
    !s ||
    s.version !== saveVersion ||
    !Number.isSafeInteger(s.revision) ||
    s.revision < 0 ||
    !Number.isSafeInteger(s.rocks) ||
    s.rocks < 0 ||
    !validDiscoveries(s.discoveries) ||
    !validMinerals(s) ||
    (s.cargo !== undefined && !vector(s.cargo, n => Number.isSafeInteger(n) && n >= 0)) ||
    (s.drillCondition !== undefined && !(Number.isInteger(s.drillCondition) && s.drillCondition >= 0 && s.drillCondition <= 100)) ||
    (s.craftReadyAt != null && (!Number.isSafeInteger(s.craftReadyAt) || s.craftReadyAt <= 0 || s.front || s.rocks < 3)) ||
    (s.ceramic !== undefined && !(Number.isSafeInteger(s.ceramic) && s.ceramic >= 0)) ||
    (s.session != null && !validSession(s.session)) ||
    !Array.isArray(s.drills) ||
    !(
      (s.drills.length === 0 && s.front === null) ||
      (s.drills.length === 1 &&
        s.front === 'drill-1' &&
        s.drills[0] === s.front)
    ) ||
    (s.arrivalStrength !== undefined && !(Number.isFinite(s.arrivalStrength) && s.arrivalStrength > 0)) ||
    (s.arrivalRadius !== undefined && !(Number.isFinite(s.arrivalRadius) && s.arrivalRadius > 0 && s.arrivalRadius <= 16)) ||
    (s.trips !== undefined && (!Number.isSafeInteger(s.trips) || s.trips < 0)) ||
    typeof s.transited !== 'boolean' ||
    (s.transited && !s.front)
  )
    throw Error(unreadable);
  return s;
}
export async function commit(revision, operation, session) {
  if (!navigator.locks)
    throw Error('안전한 저장을 위해 HTTPS 브라우저에서 다시 열어 주세요.');
  return navigator.locks.request(saveKey, () => {
    const s = readSave();
    if (s.revision !== revision)
      throw Error('다른 탭에서 진행이 바뀌었습니다. 다시 열어 주세요.');
    const type = operation?.type ?? operation;
    let found = null;
    if (['collect', 'drill', 'laser'].includes(type)) {
      // The work key is the cell's chunk, generation and index. A cell already
      // excavated in the committed world returns the committed result unpaid.
      if (!vector(operation?.cell, Number.isSafeInteger) || !session) throw Error('채굴 기록이 바뀌었습니다.');
      const {chunk, index} = cellOwner(...operation.cell);
      const find = w => w?.chunks.find(c => c.x === chunk[0] && c.y === chunk[1] && c.z === chunk[2]);
      const next = find(session.world);
      if (!next || !savedAir(next, index)) throw Error('채굴 기록이 바뀌었습니다.');
      const prior = find(s.session?.world);
      if (prior && (prior.epoch ?? 0) === (next.epoch ?? 0) && savedAir(prior, index)) return s;
      // Before the first drill the laser only gathers ordinary rock.
      const seed = session.world.seed, epoch = next.epoch ?? 0;
      found = !Number.isSafeInteger(seed) ? {base: 'rock', companion: null}
        : s.front ? blockYield(seed, chunk, epoch, index)
        : {base: 'rock', baseVariant: rockVariantAt(seed, chunk, epoch, index), companion: null};
    }
    switch (type) {
      case 'blast':
        if (!session || !Number.isInteger(operation.wear) || operation.wear < 0) throw Error('폭발 저장 오류');
        s.drillCondition = Math.max(0,(s.drillCondition ?? 100)-operation.wear);
        break;
      case 'checkpoint':
        break;
      case 'pickup': {
        if (!s.front || !session || ![0,1,2].includes(operation.item)) throw Error('회수할 수 없습니다.');
        s.cargo ??= [0,0,0];
        const entry = s.discoveries.find(entry => entry.item === operation.item);
        if (entry?.count === Number.MAX_SAFE_INTEGER || s.cargo[operation.item] === Number.MAX_SAFE_INTEGER)
          throw Error('회수 기록 한도에 도달했습니다.');
        s.cargo[operation.item]++;
        if (entry) entry.count++;
        else s.discoveries.push({item:operation.item, count:1});
        break;
      }
      case 'fire-ceramic':
        if (!s.front || s.rocks < rocksPerCeramic) throw Error('가열할 암석이 부족합니다.');
        spendRocks(s, rocksPerCeramic);
        s.ceramic = (s.ceramic ?? 0) + 1;
        break;
      case 'repair':
        if (!s.front || (s.drillCondition ?? 100) >= 100 || (s.ceramic ?? 0) < ceramicPerRepair)
          throw Error('수리 조건을 다시 확인해 주세요.');
        s.ceramic -= ceramicPerRepair;
        s.drillCondition = 100;
        break;
      case 'drill':
        if (!s.front || s.drillCondition === 0) throw Error('드릴을 사용할 수 없습니다.');
        if (Math.random() < 0.05) s.drillCondition = Math.max(0,(s.drillCondition ?? 100)-2);
        break;
      case 'laser':
        if (!s.front || s.drillCondition !== 0 || (s.ceramic ?? 0) >= ceramicPerRepair || s.rocks >= rocksPerCeramic) throw Error('긴급 채굴 조건이 바뀌었습니다.');
        break;
      case 'collect':
        if (s.front || s.rocks >= 3) throw Error('채굴 기록이 바뀌었습니다.');
        break;
      case 'begin-craft':
        if (s.front || s.rocks < 3 || s.craftReadyAt) throw Error('제작 기록이 바뀌었습니다.');
        s.craftReadyAt = Date.now()+fabricationMs;
        break;
      case 'craft':
        if (s.front || s.rocks < 3 || !s.craftReadyAt || Date.now() < s.craftReadyAt)
          throw Error('제작 조건을 다시 확인해 주세요.');
        spendRocks(s, 3);
        s.craftReadyAt = null;
        s.front = 'drill-1';
        s.drills.push(s.front);
        break;
      case 'transit':
        if (!s.front) throw Error('이동 기록이 바뀌었습니다.');
        s.arrivalStrength = operation.strength;
        s.arrivalRadius = operation.radius;
        s.trips = (s.trips ?? Number(s.transited)) + 1;
        s.transited = true;
        s.session = null;
        break;
      case 'reboot':
        if (operation.loss) {
          if (!vector(operation.loss,n => n === 0 || n === 1)) throw Error('화물 기록 오류');
          s.cargo = (s.cargo ?? [0,0,0]).map((n,i) => Math.max(0,n-operation.loss[i]));
        }
        s.session = null;
        s.transited = false;
        s.drillCondition = Math.floor((s.drillCondition ?? 100)*0.4);
        break;
      case 'decompose': {
        // One piece leaves and its element units arrive in the same save.
        const units = elementUnits(operation?.mineral, operation?.variant);
        if (!s.front || !units) throw Error('분해할 원료를 다시 선택해 주세요.');
        spendVariant(s, operation.mineral, operation.variant);
        for (const [symbol, n] of Object.entries(units)) {
          if ((s.elements[symbol] ?? 0) > Number.MAX_SAFE_INTEGER - n) throw Error('원소 보관 한도에 도달했습니다.');
          s.elements[symbol] = (s.elements[symbol] ?? 0) + n;
          if (!s.elementLog.includes(symbol)) s.elementLog.push(symbol);
        }
        break;
      }
      case 'reset':
        Object.assign(s, fresh(), { revision });
        break;
      default:
        throw Error('알 수 없는 저장 요청입니다.');
    }
    // One mining event pays its base and companion together, after validation.
    if (found) s.blocksMined++;
    for (const [id, variant] of found ? [[found.base, found.baseVariant], [found.companion, found.companionVariant]] : []) {
      if (!id) continue;
      grant(s, id, variant);
      if (!s.mineralLog.includes(id)) s.mineralLog.push(id);
    }
    if (type === 'collect' && s.rocks === 3) s.craftReadyAt = Date.now()+fabricationMs;
    if (session) s.session = session;
    s.revision++;
    localStorage.setItem(saveKey, JSON.stringify(s));
    return s;
  });
}
