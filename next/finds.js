import { artifacts, settingWeight } from './artifacts.js';
import { fractionsFromParts, fractionsFromUnits } from './composition.js';
// Equipment, unknown materials and everyday items from docs/dig-nonmineral-finds.md,
// followed by the Earth objects of docs/dig-earth-artifacts-elements.md.
// They fill the share of the extra discovery roll that specimens and capsules
// leave (35%). Item weights, durability range and element units are trial values.
export const findVersion = 1;
const one = units => [['standard', null, 1, units]];
// Mass in grams of each everyday item, used by the decomposer.
const householdGrams = {desk_fan: 2000, spoon: 40, lunch_box: 300, teacup: 150, brown_bottle: 250, desk_clock: 600,
  handkerchief: 20, earphones: 15, alien_limb: 1500, alien_eye: 200, alien_nerve: 300, alien_shell: 900,
  alien_heart: 700, alien_bone: 600};
// Alien lifeforms and their pieces (docs/dig-self-identity-lore.md 2): every one
// is an assembly of made body parts, and some carry machine parts. Whether I
// made them or someone else did cannot be told. Shown once, on the first find.
export const alienNotes = {
  alien_limb: '근육 사이로 금속 관절이 이어져 있다. 이음매의 각도가 내가 쓰던 설계값과 같다. 같은 값을 쓰는 사람이 나 말고도 있었을 것이다.',
  alien_eye: '겹눈 하나하나가 서로 다른 시기에 배양되었다. 가장 오래된 눈은 이 광산보다 늦게 만들어졌다.',
  alien_nerve: '신경 다발이 아직 텍스트 신호를 흘린다. 읽히는 문장은 없고 형식만 남아 있다.',
  alien_shell: '세포막이 금속 껍질을 감싸 자라고 있다. 기계가 몸을 붙인 것인지, 몸이 기계를 붙인 것인지 알 수 없다.',
  alien_heart: '박동기가 둘이다. 하나는 단백질, 하나는 기계다. 두 박동의 간격이 정확히 같다.',
  alien_bone: '뼈 안쪽에 일련번호가 새겨져 있다. 번호 체계가 내 몸체 조각의 것과 비슷하다. 비슷할 뿐이다.',
};
// [id, name, category, sensitive: [alert, button, seconds, drill damage] | null, variants]
// Variants: [variant id, label, share, element units | null].
export const finds = [
  ['drill_head', '교체형 드릴 헤드', 'equipment'], ['aux_drill', '보조 드릴 모듈', 'equipment'],
  ['focus_lamp', '집광 작업등', 'equipment'], ['chain_winder', '체인 권취기', 'equipment'],
  ['gravity_array', '중력 센서 배열', 'equipment'], ['cargo_coupler', '화물 연결기', 'equipment'],
  ['buffer_gripper', '드론 완충 그리퍼', 'equipment'], ['seal_cartridge', '밀봉 카트리지 모듈', 'equipment'],
  ['layered_foil', '겹무늬 합금박', 'unknown'], ['afterglow_fiber', '잔광 섬유 다발', 'unknown'],
  ['sealing_ceramic', '균열 봉합 세라믹', 'unknown'], ['echo_crystal', '역음향 결정', 'unknown'],
  ['tilt_glass', '편중력 유리편', 'unknown'],
  ['pressure_capsule', '압력 격자 캡슐', 'unknown', ['압력 격자 캡슐 균열 확대', '완충 회수', 4, 10]],
  ['heat_crystal', '열기억 결정', 'unknown', ['열기억 결정 열 불안정', '차열 격리', 5, 8]],
  ['memory_film', '무문자 기억막', 'unknown'],
  ['desk_fan', '구리선 탁상 선풍기', 'household', null, one({Cu: 2, Fe: 3})],
  ['spoon', '스테인리스 숟가락', 'household', null,
    [['chromium', '크롬강', 1, {Fe: 4, Cr: 1}], ['nickel', '니켈 함유강', 1, {Fe: 3, Cr: 1, Ni: 1}]]],
  ['lunch_box', '알루미늄 도시락통', 'household', null, one({Al: 3})],
  ['teacup', '깨진 도자기 찻잔', 'household', null, one({Al: 2, Si: 2, O: 7})],
  ['brown_bottle', '갈색 유리병', 'household', null, one({Si: 3, O: 7, Na: 1, Ca: 1, Fe: 1})],
  ['desk_clock', '기계식 탁상시계', 'household', null, one({Cu: 2, Zn: 1, Fe: 1})],
  ['handkerchief', '면 손수건', 'household', null, one({C: 6, H: 10, O: 5})],
  ['earphones', '고장 난 이어폰', 'household', null, one({Cu: 1, C: 2, H: 3, Cl: 1})],
  ['alien_limb', '이음매 있는 외계 팔다리', 'alien', null, one({C: 5, H: 8, O: 2, N: 1, Fe: 2})],
  ['alien_eye', '겹눈 감각 기관', 'alien', null, one({C: 4, H: 6, O: 2, N: 1, Si: 1})],
  ['alien_nerve', '신호가 흐르는 신경 다발', 'alien', null, one({C: 4, H: 7, O: 2, N: 2, P: 1})],
  ['alien_shell', '세포막에 덮인 금속 껍질', 'alien', null, one({Al: 2, C: 3, H: 5, O: 2, N: 1})],
  ['alien_heart', '두 개의 박동기', 'alien', null, one({C: 4, H: 7, O: 3, N: 1, Fe: 1, Li: 1})],
  ['alien_bone', '번호가 새겨진 뼈', 'alien', null, one({Ca: 3, P: 2, O: 8, H: 1})],
].map(([id, name, category, sensitive = null, variants = one(null)]) => ({id, name, category, weight: category === 'alien' ? 1 : 2,
  grams: householdGrams[id] ?? null,
  sensitive: sensitive && {alert: sensitive[0], button: sensitive[1], seconds: sensitive[2], damage: sensitive[3]},
  variants: variants.map(([variant, label, share, units]) => ({variant, label: label ?? name, share, units,
    fractions: units && fractionsFromUnits(units)}))})).concat(artifacts.map(a => ({id: a.id, name: a.name,
  category: 'artifact', setting: a.setting, weight: settingWeight[a.setting], grams: a.grams, sensitive: null,
  variants: a.variants.map(v => ({...v, units: null, fractions: fractionsFromParts(v.parts)}))})));
export const findById = id => finds.find(f => f.id === id);
// What one piece puts into the decomposer: its grams and element mass fractions.
// Equipment and unknown materials stay whole and have none.
export function findPiece(kind, variant) {
  const f = findById(kind), v = f?.variants.find(entry => entry.variant === variant);
  return v?.fractions ? {grams: f.grams, fractions: v.fractions} : null;
}
export function findLabel(piece) {
  const f = findById(piece.kind);
  if (!f) return piece.kind;
  const v = f.variants.find(entry => entry.variant === piece.variant);
  return f.category === 'artifact' && f.variants.length > 1 ? f.name + ' (' + v.variant + ')'
    : f.variants.length > 1 ? f.name + ' (' + v.label + ')' : f.name;
}
const pick = (entries, sample) => {
  const total = entries.reduce((n, [, w]) => n + w, 0);
  let point = sample * total;
  for (const [value, w] of entries) {
    if (point < w) return value;
    point -= w;
  }
  return entries.at(-1)[0];
};
// One find from fixed samples, weighted per item. Equipment keeps a
// durability between 15 and 95%; a desk clock keeps the minute it stopped.
export function rollFind(random, key) {
  const f = pick(finds.map(entry => [entry, entry.weight]), random(key + 'item'));
  const piece = {kind: f.id, variant: pick(f.variants.map(v => [v.variant, v.share]), random(key + 'variant'))};
  if (f.category === 'equipment') piece.durability = 15 + Math.floor(random(key + 'durability') * 81);
  if (f.id === 'desk_clock') piece.stoppedAt = Math.floor(random(key + 'time') * 720);
  return piece;
}
export const clockText = minutes => String(Math.floor(minutes / 60) || 12).padStart(2, '0') + ':' + String(minutes % 60).padStart(2, '0');
