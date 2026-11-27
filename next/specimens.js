import { roll } from './roll.js';
import { elementSymbols } from './elements.js';
import { rollFind } from './finds.js';
import { fractionsFromUnits } from './composition.js';
import { selfShare } from './self.js';
// Mineral specimens and future-element capsules from
// docs/dig-element-coverage-plan.md sections 2-4. All rates are trial values.
export const specimenVersion = 1;
export const discoveryRate = 0.02;       // extra discovery per drilled block
export const specimenShare = 0.5;        // of discoveries
export const capsuleShare = 0.05;        // of discoveries; then the machine's own parts (next/self.js),
                                         // and the rest are non-mineral finds and Earth objects
export const captureSeconds = 6;
const tier = {common: 8, uncommon: 4, rare: 2, scarce: 1};
// [id, name, tier, sensitive capture label or null, [[variant, name, share, units], ...]]
const one = (name, units) => [[name, null, 1, units]];
export const specimens = [
  ['ice', '얼음 포유물', 'common', null, one('ice', {H: 2, O: 1})],
  ['hydrogen', '수소 기체 포유물', 'uncommon', '수소 기체 누출', one('hydrogen', {H: 2})],
  ['noble_gas', '희가스 포유물', 'uncommon', '희가스 누출', [['He', '헬륨', 50, {He: 1}], ['Ar', '아르곤', 30, {Ar: 1}],
    ['Ne', '네온', 10, {Ne: 1}], ['Kr', '크립톤', 6, {Kr: 1}], ['Xe', '제논', 4, {Xe: 1}]]],
  ['halite', '암염', 'common', null, one('halite', {Na: 1, Cl: 1})],
  ['fluorite', '형석', 'common', null, one('fluorite', {Ca: 1, F: 2})],
  ['apatite', '인회석', 'common', null, one('apatite', {Ca: 5, P: 3, O: 12, F: 1})],
  ['nitratine', '칠레초석', 'uncommon', null, one('nitratine', {Na: 1, N: 1, O: 3})],
  ['borax', '붕사', 'uncommon', null, one('borax', {Na: 2, B: 4, O: 17, H: 20})],
  ['spodumene', '리티아휘석', 'uncommon', null, one('spodumene', {Li: 1, Al: 1, Si: 2, O: 6})],
  ['beryl', '녹주석', 'rare', null, one('beryl', {Be: 3, Al: 2, Si: 6, O: 18})],
  ['sphalerite', '섬아연석', 'common', null, one('sphalerite', {Zn: 1, S: 1})],
  ['galena', '방연석', 'common', null, one('galena', {Pb: 1, S: 1})],
  ['celestine', '천청석', 'common', null, one('celestine', {Sr: 1, S: 1, O: 4})],
  ['barite', '중정석', 'common', null, one('barite', {Ba: 1, S: 1, O: 4})],
  ['zircon', '지르콘', 'common', null, one('zircon', {Zr: 1, Si: 1, O: 4})],
  ['cassiterite', '주석석', 'uncommon', null, one('cassiterite', {Sn: 1, O: 2})],
  ['stibnite', '휘안석', 'uncommon', null, one('stibnite', {Sb: 2, S: 3})],
  ['molybdenite', '휘수연석', 'uncommon', null, one('molybdenite', {Mo: 1, S: 2})],
  ['cobaltite', '휘코발트석', 'uncommon', null, one('cobaltite', {Co: 1, As: 1, S: 1})],
  ['vanadinite', '바나디나이트', 'uncommon', null, one('vanadinite', {Pb: 5, V: 3, O: 12, Cl: 1})],
  ['cinnabar', '진사', 'uncommon', null, one('cinnabar', {Hg: 1, S: 1})],
  ['mercury', '자연 수은 방울', 'rare', '수은 방울 가열', one('mercury', {Hg: 1})],
  ['bismuthinite', '휘창연석', 'uncommon', null, one('bismuthinite', {Bi: 2, S: 3})],
  ['xenotime', '제노타임', 'uncommon', null, one('xenotime', {Y: 1, P: 1, O: 4})],
  ['rare_earth', '희토류 인산염 결정', 'uncommon', null, [['Ce', 20], ['La', 14], ['Nd', 12], ['Pr', 6], ['Sm', 6], ['Gd', 6],
    ['Dy', 6], ['Er', 5], ['Yb', 5], ['Eu', 4], ['Tb', 4], ['Ho', 4], ['Tm', 4], ['Lu', 4]]
    .map(([e, w]) => [e, e + ' 우세', w, {[e]: 1, P: 1, O: 4}])],
  ['columbite', '콜룸바이트', 'rare', null, one('columbite', {Fe: 1, Nb: 2, O: 6})],
  ['tantalite', '탄탈라이트', 'rare', null, one('tantalite', {Fe: 1, Ta: 2, O: 6})],
  ['thortveitite', '토르트베이타이트', 'rare', null, one('thortveitite', {Sc: 2, Si: 2, O: 7})],
  ['hafnon', '하프논', 'scarce', null, one('hafnon', {Hf: 1, Si: 1, O: 4})],
  ['greenockite', '그리노카이트', 'rare', null, one('greenockite', {Cd: 1, S: 1})],
  ['clausthalite', '셀렌연석', 'rare', null, one('clausthalite', {Pb: 1, Se: 1})],
  ['calaverite', '칼라베라이트', 'rare', null, one('calaverite', {Au: 1, Te: 2})],
  ['bromargyrite', '취은석', 'rare', null, one('bromargyrite', {Ag: 1, Br: 1})],
  ['lautarite', '라우타라이트', 'rare', null, one('lautarite', {Ca: 1, I: 2, O: 6})],
  ['gallite', '갈라이트', 'scarce', null, one('gallite', {Cu: 1, Ga: 1, S: 2})],
  ['argyrodite', '아지로다이트', 'scarce', null, one('argyrodite', {Ag: 8, Ge: 1, S: 6})],
  ['roquesite', '로케사이트', 'scarce', null, one('roquesite', {Cu: 1, In: 1, S: 2})],
  ['rubicline', '루비클린', 'scarce', null, one('rubicline', {Rb: 1, Al: 1, Si: 3, O: 8})],
  ['pollucite', '폴루사이트', 'rare', null, one('pollucite', {Cs: 1, Al: 1, Si: 2, O: 6})],
  ['lorandite', '로란다이트', 'scarce', null, one('lorandite', {Tl: 1, As: 1, S: 2})],
  ['laurite', '라우라이트', 'scarce', null, one('laurite', {Ru: 1, S: 2})],
  ['bowieite', '보위아이트', 'scarce', null, one('bowieite', {Rh: 2, S: 3})],
  ['stibiopalladinite', '스티비오팔라디나이트', 'scarce', null, one('stibiopalladinite', {Pd: 5, Sb: 2})],
  ['osmiridium', '오스미리듐', 'scarce', null, one('osmiridium', {Ir: 1, Os: 1})],
  ['rheniite', '레늄광', 'scarce', null, one('rheniite', {Re: 1, S: 2})],
  ['thorite', '토라이트', 'rare', null, one('thorite', {Th: 1, Si: 1, O: 4})],
  // Decay products in secular equilibrium: atoms per uranium atom.
  ['uraninite', '우라니나이트', 'rare', null, [['Ra', 30, 3.58e-7], ['Rn', 30, 2.34e-12], ['Po', 20, 8.49e-11],
    ['Pa', 10, 3.35e-7], ['Ac', 10, 2.23e-10]].map(([e, w, r]) => [e, e + ' 함유', w, {U: 1, O: 2, [e]: r}])],
].map(([id, name, t, sensitive, list]) => ({id, name, weight: tier[t], tier: t, sensitive,
  variants: list.map(([variant, label, share, units]) => ({variant, label: label ?? name, share, units}))}));
// Elements no mineral can supply in play: Tc, Pm, At, Fr, Np, Pu and Am-Og.
export const capsuleOnly = ['Tc', 'Pm', 'At', 'Fr', 'Np', 'Pu', ...elementSymbols.slice(94)];
export const capsuleGuarantee = 10;
// Sensitive capsule forms from docs/dig-mineral-catalog-expansion.md: a share
// of capsules arrive unstable and must be secured in time or they burst.
export const capsuleForms = {
  pressure: {name: '미래 압력 캡슐', alert: '압력 캡슐 균열 확대', button: '완충 회수', seconds: 4, damage: 10, share: 0.2},
  energy: {name: '미래 에너지 결정', alert: '에너지 결정 열 불안정', button: '차열 격리', seconds: 5, damage: 8, share: 0.1},
};
// Compared in whole per-mille so band edges do not drift with float sums.
export function capsuleForm(sample) {
  const point = Math.floor(sample * 1000);
  const pressure = Math.round(capsuleForms.pressure.share * 1000), energy = Math.round(capsuleForms.energy.share * 1000);
  if (point < pressure) return 'pressure';
  if (point < pressure + energy) return 'energy';
  return null;
}
export const specimenById = id => specimens.find(s => s.id === id);
// Grams per piece: inclusions hold little gas, capsules a milligram sample.
const specimenGrams = kind => ({hydrogen: 0.5, noble_gas: 0.5, mercury: 5, capsule: 0.001})[kind] ?? 50;
export function specimenPiece(kind, variant, element) {
  const units = specimenUnits(kind, variant, element);
  return units && {grams: specimenGrams(kind), fractions: fractionsFromUnits(units)};
}
export function specimenUnits(kind, variant, element) {
  if (kind === 'capsule') return elementSymbols.includes(element) ? {[element]: 1} : null;
  return specimenById(kind)?.variants.find(v => v.variant === variant)?.units ?? null;
}
export function specimenLabel(kind, variant, element, form) {
  if (kind === 'capsule') return (capsuleForms[form]?.name ?? '원소 표본 캡슐') + ' (' + element + ')';
  const s = specimenById(kind);
  const v = s?.variants.find(entry => entry.variant === variant);
  return !s ? kind : s.variants.length > 1 ? s.name + ' (' + v.label + ')' : s.name;
}
function weighted(entries, sample) {
  const total = entries.reduce((n, [, w]) => n + w, 0);
  let point = sample * total;
  for (const [value, w] of entries) {
    if (point < w) return value;
    point -= w;
  }
  return entries.at(-1)[0];
}
// What the extra discovery roll of a drilled block yields, if anything.
// Specimens are fixed by the cell; a capsule's element depends on which
// elements are already registered, so it is drawn when the block is paid.
export function blockDiscovery(seed, key, random = k => roll(seed, k)) {
  key += ':discovery' + specimenVersion + ':';
  if (random(key + 'rate') >= discoveryRate) return null;
  const kind = random(key + 'kind');
  if (kind < specimenShare) {
    const s = weighted(specimens.map(entry => [entry, entry.weight]), random(key + 'specimen'));
    return {kind: s.id, variant: weighted(s.variants.map(v => [v.variant, v.share]), random(key + 'variant'))};
  }
  if (kind < specimenShare + capsuleShare) return {kind: 'capsule', sample: random(key + 'capsule'), form: capsuleForm(random(key + 'capsule-form'))};
  if (kind < specimenShare + capsuleShare + selfShare) return {self: random(key + 'self')};
  return {find: rollFind(random, key + 'find-')};
}
// Capsule element: capsule-only symbols weigh 3, others 1, registered ones a
// quarter. After `capsuleGuarantee` capsules in a row with registered
// elements the next one is drawn evenly from unregistered symbols.
export function capsuleElement(sample, registered, misses) {
  const known = new Set(registered);
  const unknown = elementSymbols.filter(e => !known.has(e));
  if (misses >= capsuleGuarantee && unknown.length)
    return unknown[Math.min(unknown.length - 1, Math.floor(sample * unknown.length))];
  return weighted(elementSymbols.map(e => [e, (capsuleOnly.includes(e) ? 3 : 1) * (known.has(e) ? 0.25 : 1)]), sample);
}
