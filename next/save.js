import { cellOwner, savedAir } from './world.js';
import { blockYield, mineralIds, variants, defaultVariant, rockVariantAt, mineralPiece } from './minerals.js';
import { elementSymbols } from './elements.js';
import { blockDiscovery, capsuleElement, specimenById, specimenUnits, specimenPiece, captureSeconds } from './specimens.js';
import { findById, findPiece } from './finds.js';
import { decompose, decompositionFee } from './composition.js';
import { marketCycle, sellQuote, marketStock, auctionEstimate, auctionOutcome, auctionSeconds } from './trade.js';
import { slotOf, captureBonus } from './equipment.js';
import { studies, fragments } from './research.js';
import { selfParts, nextPart } from './self.js';
import { chooseEnding, endingCounters, counterFor, endingById } from './endings.js';
export const rocksPerCeramic = 3;
export const ceramicPerRepair = 1;
export const fabricationMs = 3000;
export const saveKey = 'dig-unified-v1';
export const saveVersion = 13;
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
  // Specimen and capsule pieces, kinds first found, sensitive finds awaiting
  // capture and the run of capsules that held registered elements.
  5: s => ({...s, specimens: [], specimenLog: [], captures: [], capsuleMisses: 0}),
  // Equipment, unknown materials and everyday items, and the kinds first found.
  // `clockLog` keeps the minute each recovered desk clock stopped at.
  6: s => ({...s, finds: [], findLog: [], clockLog: []}),
  // Elements become grams (one former unit counts as one gram) and the
  // decomposer counts its runs, which fix each run's loss.
  7: s => ({...s, decomposeCount: 0}),
  // Drone trade: credits, a market seed and game-time market clock, auctions in escrow.
  8: s => ({...s, ...tradeStart()}),
  // Fitted equipment by slot.
  9: s => ({...s, equipment: {}}),
  // Analysed unknown kinds, the analysis in progress and read memory fragments.
  10: s => ({...s, research: [], researchJob: null, memoryLog: []}),
  // Parts of the machine's own body found so far, in order; each restores memory.
  11: s => ({...s, selfParts: []}),
  // How often the player researched, fitted equipment and repaired, and the
  // ending fixed from those counts once the last memory returns.
  12: s => ({...s, actions: {research: 0, equip: 0, repair: 0}, ending: null}),
};
// An analysis finishes once the market clock passes its end; its kind is then known.
function finishResearch(s) {
  const job = s.researchJob;
  if (!job || s.marketTime < job.endsAt) return;
  if (!s.research.includes(job.kind)) s.research.push(job.kind);
  s.researchJob = null;
  logTrade(s, 'research:' + job.kind);
}
const tradeStart = () => ({credits: 0, marketSeed: Math.floor(Math.random() * 4294967296), marketTime: 0,
  marketClock: null, auctions: [], tradeLog: [], purchaseCount: 0});
// The market clock follows world time while playing; a new world or a jump
// back (another space, a reboot) restarts the reference without adding time.
function advanceMarket(s, world) {
  if (!world || !Number.isFinite(world.elapsed)) return;
  const prev = s.marketClock;
  if (prev && prev.seed === (world.seed ?? 0) && world.elapsed >= prev.elapsed)
    s.marketTime += Math.min(world.elapsed - prev.elapsed, 30);
  s.marketClock = {seed: world.seed ?? 0, elapsed: world.elapsed};
}
function logTrade(s, text) {
  s.tradeLog.unshift(text);
  s.tradeLog.length = Math.min(s.tradeLog.length, 20);
}
// Auctions settle once, when the market clock reaches their end.
function settleAuctions(s) {
  for (const a of s.auctions.filter(a => s.marketTime >= a.endsAt)) {
    const result = auctionOutcome(s.marketSeed, a.id, a.estimate);
    if (result.sold) {
      s.credits += result.net;
      logTrade(s, 'sold:' + a.id + ':' + result.price + ':' + result.fee);
    } else {
      (a.origin === 'specimens' ? s.specimens : s.finds).push(a.piece);
      logTrade(s, 'unsold:' + a.id);
    }
  }
  s.auctions = s.auctions.filter(a => s.marketTime < a.endsAt);
}
// The piece or mineral a trade operation names, and how to take it away.
function tradeTarget(s, op) {
  if (op?.source === 'm' && variants[op.kind] && (variantCounts(s, op.kind)[op.variant] ?? 0) > 0)
    return {thing: {mineral: op.kind}, key: 'm:' + op.kind, take: () => spendVariant(s, op.kind, op.variant)};
  const list = op?.source === 's' ? s.specimens : op?.source === 'f' ? s.finds : null;
  const at = list ? list.findIndex(p => op.id ? p.id === op.id : p.kind === op.kind &&
    (p.kind === 'capsule' ? p.element === op.element : p.variant === op.variant)) : -1;
  if (at < 0) return null;
  const piece = list[at];
  return {thing: piece, piece, origin: op.source === 's' ? 'specimens' : 'finds',
    key: op.source + ':' + piece.kind + ':' + (piece.element ?? piece.variant), take: () => list.splice(at, 1)};
}
export function sellPrice(s, op) {
  const t = tradeTarget(s, op);
  return t && sellQuote(s.marketSeed, marketCycle(s.marketTime), t.thing, t.key);
}
// What decomposing the piece named by `operation` would yield, without
// changing the save: input grams, the share lost and element grams out.
export function decompositionPreview(s, operation) {
  let piece = null, key = null;
  if (operation?.find) {
    const p = s.finds.find(q => q.kind === operation.find && q.variant === operation.variant);
    piece = p && findPiece(p.kind, p.variant);
    key = 'find:' + operation.find + ':' + operation.variant;
  } else if (operation?.kind) {
    const p = s.specimens.find(q => q.kind === operation.kind &&
      (q.kind === 'capsule' ? q.element === operation.element : q.variant === operation.variant));
    piece = p && specimenPiece(p.kind, p.variant, p.element);
    key = 'specimen:' + operation.kind + ':' + (operation.element ?? operation.variant);
  } else if (variants[operation?.mineral] && (variantCounts(s, operation.mineral)[operation.variant] ?? 0) > 0) {
    piece = mineralPiece(operation.mineral, operation.variant);
    key = 'mineral:' + operation.mineral + ':' + operation.variant;
  }
  if (!piece) return null;
  const fee = decompositionFee(s.decomposeCount, key);
  const out = decompose(piece.grams, piece.fractions, fee);
  return {grams: piece.grams, fee, out, kept: Object.values(out).reduce((n, m) => n + m, 0)};
}
// Capture rules for a sensitive specimen or find: seconds allowed and the
// drill damage an expired find deals (a lost gas or mercury deals none).
const captureRule = kind => findById(kind)?.sensitive ?? (specimenById(kind)?.sensitive ? {seconds: captureSeconds, damage: 0} : null);
// Sensitive finds wait in `captures`; only the first has a deadline in world
// seconds. A deadline reached before the capture input loses the find.
function expireCaptures(s, now) {
  const lost = [];
  while (s.captures.length) {
    const head = s.captures[0];
    head.expiresAt ??= now + head.seconds;
    if (now < head.expiresAt) break;
    lost.push(s.captures.shift());
    // An unstable find that is not secured in time bursts against the drill once.
    const damage = captureRule(head.kind)?.damage ?? 0;
    if (damage && s.front) s.drillCondition = Math.max(0, (s.drillCondition ?? 100) - damage);
    if (s.captures[0]) s.captures[0].expiresAt = head.expiresAt + s.captures[0].seconds;
  }
  return lost;
}
function addSpecimen(s, piece) {
  if (findById(piece.kind)) {
    s.finds.push(piece);
    if (!s.findLog.includes(piece.kind)) s.findLog.push(piece.kind);
    if (piece.kind === 'desk_clock') s.clockLog.push(piece.stoppedAt);
    return;
  }
  s.specimens.push(piece);
  if (!s.specimenLog.includes(piece.kind)) s.specimenLog.push(piece.kind);
}
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
  specimens: [],
  specimenLog: [],
  captures: [],
  capsuleMisses: 0,
  finds: [],
  findLog: [],
  clockLog: [],
  decomposeCount: 0,
  ...tradeStart(),
  equipment: {},
  research: [],
  researchJob: null,
  memoryLog: [],
  selfParts: [],
  actions: {research: 0, equip: 0, repair: 0},
  ending: null,
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
    Object.entries(s.elements).every(([symbol, n]) => s.elementLog.includes(symbol) && Number.isFinite(n) && n > 0) &&
    Number.isSafeInteger(s.decomposeCount) && s.decomposeCount >= 0 &&
    Number.isSafeInteger(s.credits) && s.credits >= 0 &&
    Number.isSafeInteger(s.marketSeed) && s.marketSeed >= 0 && s.marketSeed <= 0xffffffff &&
    Number.isFinite(s.marketTime) && s.marketTime >= 0 &&
    (s.marketClock === null || (Number.isFinite(s.marketClock?.seed) && Number.isFinite(s.marketClock.elapsed))) &&
    Array.isArray(s.auctions) && s.auctions.every(a => a && typeof a.id === 'string' && a.piece?.id === a.id &&
      ['specimens', 'finds'].includes(a.origin) && (a.origin === 'specimens' ? validPiece(a.piece) : validFind(a.piece)) &&
      Number.isSafeInteger(a.estimate) && a.estimate > 0 && Number.isFinite(a.endsAt)) &&
    Array.isArray(s.tradeLog) && s.tradeLog.length <= 20 && s.tradeLog.every(t => typeof t === 'string') &&
    Number.isSafeInteger(s.purchaseCount) && s.purchaseCount >= 0 &&
    s.equipment && typeof s.equipment === 'object' && !Array.isArray(s.equipment) &&
    Object.entries(s.equipment).every(([slot, p]) => validFind(p) && slotOf(p.kind) === slot) &&
    Array.isArray(s.research) && s.research.every(k => studies[k]) && new Set(s.research).size === s.research.length &&
    (s.researchJob === null || (studies[s.researchJob?.kind] && !s.research.includes(s.researchJob.kind) &&
      Number.isFinite(s.researchJob.endsAt))) &&
    Array.isArray(s.memoryLog) && s.memoryLog.every((n, i) => n === i) && s.memoryLog.length <= fragments.length &&
    Array.isArray(s.selfParts) && s.selfParts.every(id => selfParts.some(p => p.id === id)) && new Set(s.selfParts).size === s.selfParts.length &&
    s.actions && endingCounters.every(k => Number.isSafeInteger(s.actions[k]) && s.actions[k] >= 0) &&
    Object.keys(s.actions).length === endingCounters.length &&
    (s.ending === null || (endingById(s.ending) && s.selfParts.length === selfParts.length)) &&
    Array.isArray(s.elementLog) && s.elementLog.every(symbol => elementSymbols.includes(symbol)) &&
    new Set(s.elementLog).size === s.elementLog.length &&
    Array.isArray(s.specimens) && s.specimens.every(validPiece) &&
    Array.isArray(s.finds) && s.finds.every(validFind) &&
    Array.isArray(s.findLog) && s.findLog.every(kind => findById(kind)) && new Set(s.findLog).size === s.findLog.length &&
    Array.isArray(s.clockLog) && s.clockLog.every(m => Number.isInteger(m) && m >= 0 && m < 720) &&
    Array.isArray(s.captures) && s.captures.every((c, i) => (validPiece(c) || validFind(c)) && captureRule(c.kind) &&
      Number.isFinite(c.seconds) && c.seconds > 0 && (c.expiresAt === null || (i === 0 && Number.isFinite(c.expiresAt)))) &&
    new Set([...s.specimens, ...s.finds, ...s.captures, ...(s.auctions ?? []).map(a => a.piece),
      ...Object.values(s.equipment ?? {})].map(p => p.id)).size ===
      s.specimens.length + s.finds.length + s.captures.length + (s.auctions?.length ?? 0) + Object.keys(s.equipment ?? {}).length &&
    Array.isArray(s.specimenLog) && s.specimenLog.every(kind => kind === 'capsule' || specimenById(kind)) &&
    new Set(s.specimenLog).size === s.specimenLog.length &&
    Number.isSafeInteger(s.capsuleMisses) && s.capsuleMisses >= 0;
}
function validFind(p) {
  const f = p && findById(p.kind);
  return !!f && typeof p.id === 'string' && p.id.length <= 80 && f.variants.some(v => v.variant === p.variant) &&
    (f.category !== 'equipment' || (Number.isInteger(p.durability) && p.durability >= 0 && p.durability <= 100)) &&
    (p.kind !== 'desk_clock' || (Number.isInteger(p.stoppedAt) && p.stoppedAt >= 0 && p.stoppedAt < 720));
}
function validPiece(p) {
  return p && typeof p.id === 'string' && p.id.length <= 80 &&
    (p.kind === 'capsule' ? specimenUnits('capsule', null, p.element) !== null : specimenUnits(p.kind, p.variant) !== null);
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
      // The block's work key doubles as the id of whatever it uncovers.
      if (s.front && Number.isSafeInteger(seed))
        found.discovery = blockDiscovery(seed, chunk.join(',') + ':' + epoch + ':cell' + index);
      found.id = chunk.join(',') + ':' + epoch + ':' + index + '@' + (seed ?? 0);
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
        // A working auxiliary drill shares the strokes and wears by the same rule.
        if (s.equipment.aux?.durability > 0 && Math.random() < 0.05) s.equipment.aux.durability = Math.max(0, s.equipment.aux.durability - 2);
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
      case 'equip': {
        // Fitting a piece returns whatever held the slot to storage.
        const at = s.finds.findIndex(p => p.id === operation?.id);
        const slot = at >= 0 && slotOf(s.finds[at].kind);
        if (!s.front || !slot) throw Error('장착할 장비가 없습니다.');
        const [piece] = s.finds.splice(at, 1);
        if (s.equipment[slot]) s.finds.push(s.equipment[slot]);
        s.equipment[slot] = piece;
        break;
      }
      case 'unequip': {
        const piece = s.equipment[operation?.slot];
        if (!piece) throw Error('장착된 장비가 없습니다.');
        delete s.equipment[operation.slot];
        s.finds.push(piece);
        break;
      }
      case 'equip-head': {
        const at = s.finds.findIndex(p => p.id === operation?.id && p.kind === 'drill_head');
        if (!s.front || at < 0 || s.finds[at].durability <= (s.drillCondition ?? 100))
          throw Error('교체할 드릴 헤드가 없습니다.');
        // The worn cutting head is discarded and the found one takes its place.
        s.drillCondition = s.finds.splice(at, 1)[0].durability;
        break;
      }
      case 'capture': {
        if (!s.front || !session || !Number.isFinite(session.world?.elapsed)) throw Error('포집할 수 없습니다.');
        expireCaptures(s, session.world.elapsed);
        const head = s.captures[0];
        if (!head || head.id !== operation.id) throw Error('포집 시간이 지났습니다.');
        s.captures.shift();
        if (s.captures[0]) s.captures[0].expiresAt = session.world.elapsed + s.captures[0].seconds;
        const {expiresAt, seconds, ...piece} = head;
        addSpecimen(s, piece);
        break;
      }
      case 'decompose': {
        // One piece leaves and its element grams, less the decomposer's loss, arrive in the same save.
        const result = s.front && decompositionPreview(s, operation);
        if (!result) throw Error('분해할 원료가 없습니다.');
        if (operation.find) s.finds.splice(s.finds.findIndex(q => q.kind === operation.find && q.variant === operation.variant), 1);
        else if (operation.kind) s.specimens.splice(s.specimens.findIndex(q => q.kind === operation.kind &&
          (q.kind === 'capsule' ? q.element === operation.element : q.variant === operation.variant)), 1);
        else spendVariant(s, operation.mineral, operation.variant);
        for (const [symbol, grams] of Object.entries(result.out)) {
          s.elements[symbol] = (s.elements[symbol] ?? 0) + grams;
          if (!s.elementLog.includes(symbol)) s.elementLog.push(symbol);
        }
        s.decomposeCount++;
        break;
      }
      case 'sell': {
        // The confirmed price must still be this cycle's offer; otherwise show the new one first.
        const t = s.front && tradeTarget(s, operation);
        const price = t && sellQuote(s.marketSeed, marketCycle(s.marketTime), t.thing, t.key);
        if (!price) throw Error('판매할 물품이 없습니다.');
        if (price !== operation.price) throw Error('시세가 바뀌었습니다. 새 가격을 확인해 주세요.');
        t.take();
        s.credits += price;
        break;
      }
      case 'buy': {
        const offer = s.front && marketStock(s.marketSeed, marketCycle(s.marketTime)).find(o => o.item === operation?.item);
        if (!offer) throw Error('구매할 수 없습니다.');
        if (offer.price !== operation.price) throw Error('시세가 바뀌었습니다. 새 가격을 확인해 주세요.');
        if (s.credits < offer.price) throw Error('크레딧이 부족합니다.');
        s.credits -= offer.price;
        if (offer.item === 'ceramic') s.ceramic = (s.ceramic ?? 0) + 1;
        else s.finds.push({id: 'buy:' + s.purchaseCount, kind: 'drill_head', variant: 'standard', durability: offer.durability});
        s.purchaseCount++;
        break;
      }
      case 'auction': {
        const t = s.front && tradeTarget(s, operation);
        // An unknown material can be listed only once its kind has been analysed.
        if (t?.piece && studies[t.piece.kind] && !s.research.includes(t.piece.kind)) throw Error('분석을 마친 물질만 경매에 올릴 수 있습니다.');
        const estimate = t?.piece && auctionEstimate(t.piece);
        if (!estimate) throw Error('경매에 올릴 수 없습니다.');
        t.take();
        s.auctions.push({id: t.piece.id, piece: t.piece, origin: t.origin, estimate, endsAt: s.marketTime + auctionSeconds});
        break;
      }
      case 'cancel-auction': {
        const at = s.auctions.findIndex(a => a.id === operation?.id);
        if (at < 0) throw Error('이미 끝난 경매입니다.');
        const [a] = s.auctions.splice(at, 1);
        (a.origin === 'specimens' ? s.specimens : s.finds).push(a.piece);
        break;
      }
      case 'research': {
        // The element cost is spent when the analysis starts; one analysis runs at a time.
        const study = studies[operation?.kind];
        if (!s.front || !study || s.research.includes(study.kind) || s.researchJob ||
          !s.finds.some(p => p.kind === study.kind)) throw Error('분석할 수 없습니다.');
        for (const [e, g] of Object.entries(study.cost)) if ((s.elements[e] ?? 0) < g) throw Error('분석에 필요한 원소가 부족합니다.');
        for (const [e, g] of Object.entries(study.cost)) {
          s.elements[e] -= g;
          if (s.elements[e] <= 1e-12) delete s.elements[e];
        }
        s.researchJob = {kind: study.kind, endsAt: s.marketTime + study.seconds};
        break;
      }
      case 'read-film': {
        // Reading uses the film up and leaves the next fragment in the observation log.
        const at = s.finds.findIndex(p => p.kind === 'memory_film');
        if (!s.front || at < 0 || !s.research.includes('memory_film') || s.memoryLog.length >= fragments.length)
          throw Error('판독할 기억막이 없습니다.');
        s.finds.splice(at, 1);
        s.memoryLog.push(s.memoryLog.length);
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
    const d = found?.discovery;
    if (d && 'self' in d) {
      // A part of the machine itself rejoins the body at once; it is never stored or traded.
      const part = nextPart(s.selfParts, d.self);
      if (part) s.selfParts.push(part);
      // The last part brings back the last memory; the ending is fixed then.
      if (part && s.selfParts.length === selfParts.length) s.ending = chooseEnding(s.actions);
    } else if (d?.kind === 'capsule') {
      const element = capsuleElement(d.sample, s.elementLog, s.capsuleMisses);
      s.capsuleMisses = s.elementLog.includes(element) ? s.capsuleMisses + 1 : 0;
      addSpecimen(s, {id: found.id, kind: 'capsule', element});
    } else if (d) {
      const piece = d.find ? {id: found.id, ...d.find} : {id: found.id, kind: d.kind, variant: d.variant};
      const rule = captureRule(piece.kind);
      if (rule) s.captures.push({...piece, seconds: rule.seconds + captureBonus(s, piece.kind), expiresAt: null});
      else addSpecimen(s, piece);
    }
    // Moving to another space or rebooting leaves pending finds behind.
    if (type === 'transit' || type === 'reboot' || type === 'reset') s.captures = [];
    else if (session && Number.isFinite(session.world?.elapsed)) expireCaptures(s, session.world.elapsed);
    if (type === 'collect' && s.rocks === 3) s.craftReadyAt = Date.now()+fabricationMs;
    const counter = counterFor(type, operation);
    if (counter) s.actions[counter]++;
    if (type !== 'reset') {
      advanceMarket(s, session?.world);
      settleAuctions(s);
      finishResearch(s);
    }
    if (session) s.session = session;
    s.revision++;
    localStorage.setItem(saveKey, JSON.stringify(s));
    return s;
  });
}
