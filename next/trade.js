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
  if (thing.mineral) return {group: 'mineral', base: mineralValue[thing.mineral]};
  if (thing.kind === 'capsule') return null;
  if (specimenById(thing.kind)) return {group: 'specimen', base: tierValue[specimenById(thing.kind).tier]};
  const f = findById(thing.kind);
  if (!f || f.category === 'unknown') return null;
  if (f.category === 'equipment') return {group: 'equipment', base: equipmentValue[f.id] * (thing.durability ?? 100) / 100};
  if (f.category === 'household') return {group: 'household', base: householdValue[f.id]};
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
export function marketStock(seed, cycle) {
  return [
    {item: 'ceramic', name: '세라믹 부품', price: Math.round(18 * (1.15 + 0.3 * roll(seed, 'buy:' + cycle + ':ceramic')))},
    {item: 'drill_head', name: '교체형 드릴 헤드', durability: 70 + Math.floor(roll(seed, 'buy-head:' + cycle) * 26),
      price: Math.round(160 * (1.15 + 0.3 * roll(seed, 'buy:' + cycle + ':drill_head')))},
  ];
}
// Starting estimate the drone shows for something without a price.
export function auctionEstimate(piece) {
  if (piece.kind === 'capsule') return capsuleOnly.includes(piece.element) ? 150 : 40;
  return unknownEstimate[piece.kind] ?? null;
}
// Fixed when the auction ends from the seed stored at listing: unsold, or a
// winning price between one and ten times the listed estimate.
export function auctionOutcome(seed, id, estimate) {
  if (roll(seed, 'auction:' + id) < unsoldChance) return {sold: false};
  const price = Math.round(estimate * (1 + (maxMultiple - 1) * roll(seed, 'auction-price:' + id) ** 3));
  const fee = Math.round(price * auctionFee);
  return {sold: true, price, fee, net: price - fee};
}
