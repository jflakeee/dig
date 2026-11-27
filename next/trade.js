import { roll } from './roll.js';
import { specimenById, capsuleOnly } from './specimens.js';
import { findById } from './finds.js';
// Drone trade with mining machines of other times (docs/dig-4d-trade-implementation-detail-20261125.md).
// Every price, rate and duration here is a trial value.
export const currency = '크레딧';
export const cycleSeconds = 300;        // market cycle in game seconds
export const auctionSeconds = 120;      // auction length in game seconds
export const auctionFee = 0.1;          // taken from a winning sale only
export const unsoldChance = 0.3;
export const maxMultiple = 10;
const mineralValue = {rock: 2, coal: 4, iron: 6, gold: 40, quartz: 5, kaolinite: 4, copper_ore: 10, graphite: 8,
  pyrite: 6, nickel_ore: 14, chromite: 16, silver_ore: 25, ilmenite: 30, wolframite: 45, platinum: 120, diamond: 200};
const tierValue = {common: 15, uncommon: 30, rare: 70, scarce: 150};
const equipmentValue = {drill_head: 120, aux_drill: 150, focus_lamp: 80, chain_winder: 90, gravity_array: 110,
  cargo_coupler: 70, buffer_gripper: 100, seal_cartridge: 100};
const householdValue = {desk_fan: 18, spoon: 6, lunch_box: 8, teacup: 5, brown_bottle: 4, desk_clock: 25,
  handkerchief: 3, earphones: 9};
const alienValue = {alien_limb: 60, alien_eye: 45, alien_nerve: 50, alien_shell: 55, alien_heart: 80, alien_bone: 40};
const settingValue = {생활: 20, 공장: 40, 의료: 60, 연구: 120};
const unknownEstimate = {layered_foil: 90, afterglow_fiber: 110, sealing_ceramic: 120, echo_crystal: 100,
  tilt_glass: 150, pressure_capsule: 180, heat_crystal: 160, memory_film: 200};
// Other-time machines the drone can reach; one answers per market cycle.
export const traders = [
  {id: 'collector', name: '수집형 채굴기', likes: {specimen: 1.3, artifact: 1.2}},
  {id: 'smelter', name: '제련형 채굴기', likes: {mineral: 1.3}},
  {id: 'mechanic', name: '정비형 채굴기', likes: {equipment: 1.3, household: 1.15}},
];
export const marketCycle = time => Math.floor(time / cycleSeconds);
export function traderOf(seed, cycle) {
  const t = traders[Math.floor(roll(seed, 'trader:' + cycle) * traders.length)];
  return {...t, signal: 1000 + Math.floor(roll(seed, 'signal:' + cycle) * 9000)};
}
// What a sellable thing is: its value class and base value, or null when it
// has no price and can only go to auction.
export function valueOf(thing) {
  if (thing.mineral) return {group: 'mineral', base: mineralValue[thing.mineral] * (thing.count ?? 1)};
  if (thing.ceramic) return {group: 'equipment', base: 12};
  // Capsules and unknown materials sell at a little over a third of their auction estimate.
  if (thing.kind === 'capsule') return {group: 'specimen', base: Math.round(auctionEstimate(thing) * 0.35)};
  if (specimenById(thing.kind)) return {group: 'specimen', base: tierValue[specimenById(thing.kind).tier]};
  const f = findById(thing.kind);
  if (!f) return null;
  if (f.category === 'unknown') return {group: 'artifact', base: Math.round(unknownEstimate[f.id] * 0.35)};
  if (f.category === 'equipment') return {group: 'equipment', base: equipmentValue[f.id] * (thing.durability ?? 100) / 100};
  if (f.category === 'household') return {group: 'household', base: householdValue[f.id]};
  if (f.category === 'alien') return {group: 'specimen', base: alienValue[f.id]};
  return {group: 'artifact', base: f.id === 'superheavy_vessel' ? 300 : settingValue[f.setting]};
}
// The offer the answering machine makes this cycle for selling one piece.
export function sellQuote(seed, cycle, thing, key) {
  const v = valueOf(thing);
  if (!v) return null;
  const t = traderOf(seed, cycle);
  const swing = 0.75 + 0.5 * roll(seed, 'sell:' + cycle + ':' + key);
  return Math.max(1, Math.round(v.base * (t.likes[v.group] ?? 1) * swing));
}
// Goods the drone can bring in this cycle.
export const mineralPrice = (seed, cycle, id) => Math.max(2, Math.round(mineralValue[id] * 1.25 * (1.15 + 0.3 * roll(seed, 'buy:' + cycle + ':' + id))));
export function marketStock(seed, cycle, mineralIds = Object.keys(mineralValue), name = id => id) {
  return [
    ...mineralIds.map(id => ({item: 'm:' + id, mineral: id, name: name(id), price: mineralPrice(seed, cycle, id)})),
    {item: 'ceramic', name: '세라믹 부품', price: Math.round(18 * (1.15 + 0.3 * roll(seed, 'buy:' + cycle + ':ceramic')))},
    {item: 'drill_head', name: '교체형 드릴 헤드', durability: 70 + Math.floor(roll(seed, 'buy-head:' + cycle) * 26),
      price: Math.round(160 * (1.15 + 0.3 * roll(seed, 'buy:' + cycle + ':drill_head')))},
  ];
}
// Starting estimate the drone shows for something without a price.
// Any piece goes to auction: unknowns and capsules at their fixed estimates,
// everything else (mineral bundles included) at its base value.
export function auctionEstimate(piece) {
  if (piece.kind === 'capsule') return capsuleOnly.includes(piece.element) ? 150 : 40;
  if (unknownEstimate[piece.kind]) return unknownEstimate[piece.kind];
  const v = valueOf(piece);
  return v?.base ? Math.max(1, Math.round(v.base)) : null;
}
// Fixed when the auction ends from the seed stored at listing: unsold, or a
// winning price between one and ten times the listed estimate.
export function auctionOutcome(seed, id, estimate) {
  if (roll(seed, 'auction:' + id) < unsoldChance) return {sold: false};
  const price = Math.round(estimate * (1 + (maxMultiple - 1) * roll(seed, 'auction-price:' + id) ** 3));
  const fee = Math.round(price * auctionFee);
  return {sold: true, price, fee, net: price - fee};
}

// Auctions listed by the answering machine (trade design section 6). Each
// market cycle brings two lots that close when the cycle ends. Other bidders'
// visible top bid climbs over the cycle toward a hidden ceiling; the player
// wins by bidding at least that ceiling when the lot closes. Lots, estimates
// and ceilings follow from the market seed and cycle, so reopening changes nothing.
export const lotsPerCycle = 2;
const lotPool = [
  ...['Tc', 'Pm', 'At', 'Fr', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr']
    .map(e => ({kind: 'capsule', element: e})),
  ...['aux_drill', 'focus_lamp', 'chain_winder', 'gravity_array', 'cargo_coupler', 'buffer_gripper', 'seal_cartridge', 'drill_head']
    .map(kind => ({kind, variant: 'standard', equipment: true})),
  ...['layered_foil', 'afterglow_fiber', 'sealing_ceramic', 'echo_crystal', 'tilt_glass', 'memory_film']
    .map(kind => ({kind, variant: 'standard'})),
  ...['beryl', 'hafnon', 'gallite', 'argyrodite', 'roquesite', 'rubicline', 'laurite', 'rheniite'].map(kind => ({kind, variant: kind})),
];
function lotEstimate(piece) {
  if (piece.kind === 'capsule') return 150;
  if (piece.equipment) return Math.round(valueOf(piece).base);
  return auctionEstimate(piece) ?? valueOf(piece)?.base ?? 50;
}
export function lotsFor(seed, cycle) {
  return Array.from({length: lotsPerCycle}, (_, n) => {
    const id = 'c' + cycle + '-' + n, key = 'lot:' + id + ':';
    const base = lotPool[Math.floor(roll(seed, key + 'item') * lotPool.length)];
    const piece = {...base, id: 'lot:' + id};
    if (piece.equipment) {
      delete piece.equipment;
      piece.durability = 40 + Math.floor(roll(seed, key + 'durability') * 56);
    }
    const estimate = lotEstimate({...base, durability: piece.durability});
    // A fifth of lots draw no other bidder; the rest top out between 0.8 and 10 times the estimate.
    const rival = roll(seed, key + 'rival') < 0.2 ? 0 : Math.round(estimate * (0.8 + 9.2 * roll(seed, key + 'ceiling') ** 3));
    return {id, piece, estimate, rival, endsAt: (cycle + 1) * cycleSeconds};
  });
}
// Other bidders' top bid as the cycle runs, climbing to their ceiling at the close.
export function visibleRival(lot, time) {
  if (!lot.rival) return 0;
  const start = lot.endsAt - cycleSeconds;
  const p = Math.max(0, Math.min(1, (time - start) / cycleSeconds));
  return Math.round(Math.min(lot.rival, lot.estimate * 0.5 + (lot.rival - lot.estimate * 0.5) * p ** 2));
}
// The least the player can bid now: above the visible top, and at least 5%
// of the estimate above their own bid.
export function minimumBid(lot, time, own = 0) {
  const step = Math.max(1, Math.round(lot.estimate * 0.05));
  return Math.max(Math.round(lot.estimate * 0.5), visibleRival(lot, time) + 1, own ? own + step : 0);
}
export const lotById = (seed, id) => {
  const cycle = Number(/^c(\d+)-\d+$/.exec(id)?.[1]);
  return Number.isSafeInteger(cycle) ? lotsFor(seed, cycle).find(l => l.id === id) ?? null : null;
};
