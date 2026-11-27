// Salvaged parts (docs/dig-nonmineral-finds.md 3). An everyday item can be
// taken apart into parts instead of decomposed: a mechanical split with no
// mass lost. Parts are then reused, sold, or decomposed to elements like any
// piece. [item key, part id, name, share of the item's grams, element units].
// Shares, uses and units are trial values.
import { findById } from './finds.js';
import { fractionsFromUnits } from './composition.js';
const table = [
  ['desk_fan', 'motor_coil', '모터 코일', 0.4, {Cu: 1}],
  ['desk_fan', 'steel_shaft', '철제 축', 0.6, {Fe: 1}],
  ['spoon:chromium', 'alloy_scrap', '크롬강 조각', 1, {Fe: 4, Cr: 1}],
  ['spoon:nickel', 'nickel_scrap', '니켈 함유강 조각', 1, {Fe: 3, Cr: 1, Ni: 1}],
  ['lunch_box', 'light_plate', '경량 판재', 1, {Al: 1}],
  ['teacup', 'ceramic_shard', '세라믹 파편', 1, {Al: 2, Si: 2, O: 7}],
  ['brown_bottle', 'glass_shard', '착색 유리 조각', 1, {Si: 3, O: 7, Na: 1, Ca: 1, Fe: 1}],
  ['desk_clock', 'brass_gear', '황동 기어', 0.5, {Cu: 2, Zn: 1}],
  ['desk_clock', 'steel_spring', '강철 스프링', 0.5, {Fe: 1}],
  ['handkerchief', 'cellulose', '셀룰로스 섬유', 1, {C: 6, H: 10, O: 5}],
  ['earphones', 'coated_wire', '피복선', 0.6, {Cu: 1, C: 2, H: 3, Cl: 1}],
  ['earphones', 'diaphragm', '진동판', 0.4, {C: 1, H: 2}],
];
export const parts = Object.fromEntries(table.map(([item, id, name, share, units]) => [id, {id, name, item: item.split(':')[0], share, units}]));
export const partIds = Object.keys(parts);
// The parts one item gives, by kind and variant; none for anything else.
export const partsOf = (kind, variant) => table.filter(([item]) => item === kind || item === kind + ':' + variant).map(([, id]) => id);
// What one part puts into the decomposer.
export function partPiece(id) {
  const p = parts[id];
  return p && {grams: findById(p.item).grams * p.share, fractions: fractionsFromUnits(p.units)};
}
export const mechanical = ['motor_coil', 'steel_shaft', 'alloy_scrap', 'nickel_scrap', 'brass_gear', 'steel_spring'];
export const shardsPerCeramic = 2;
export const plateHull = 15;
export const partsPerMaintain = 2;
export const validParts = p => !!p && typeof p === 'object' && !Array.isArray(p) &&
  Object.entries(p).every(([id, n]) => parts[id] && Number.isSafeInteger(n) && n > 0);
export const partCount = (s, ids) => ids.reduce((n, id) => n + (s?.parts?.[id] ?? 0), 0);
// Takes n parts from the listed kinds, in list order.
export function takeParts(s, ids, n) {
  for (const id of ids) {
    while (n > 0 && s.parts[id] > 0) {
      if (--s.parts[id] === 0) delete s.parts[id];
      n--;
    }
  }
}
