// Equipment, unknown materials and everyday items from docs/dig-nonmineral-finds.md.
// They fill the share of the extra discovery roll that specimens and capsules
// leave (35%). Item weights, durability range and element units are trial values.
export const findVersion = 1;
const one = units => [['standard', null, 1, units]];
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
].map(([id, name, category, sensitive = null, variants = one(null)]) => ({id, name, category,
  sensitive: sensitive && {alert: sensitive[0], button: sensitive[1], seconds: sensitive[2], damage: sensitive[3]},
  variants: variants.map(([variant, label, share, units]) => ({variant, label: label ?? name, share, units}))}));
export const findById = id => finds.find(f => f.id === id);
export const findUnits = (kind, variant) => findById(kind)?.variants.find(v => v.variant === variant)?.units ?? null;
export function findLabel(piece) {
  const f = findById(piece.kind);
  if (!f) return piece.kind;
  const v = f.variants.find(entry => entry.variant === piece.variant);
  return f.variants.length > 1 ? f.name + ' (' + v.label + ')' : f.name;
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
// One find from fixed samples: every item weighs the same. Equipment keeps a
// durability between 15 and 95%; a desk clock keeps the minute it stopped.
export function rollFind(random, key) {
  const f = pick(finds.map(entry => [entry, 1]), random(key + 'item'));
  const piece = {kind: f.id, variant: pick(f.variants.map(v => [v.variant, v.share]), random(key + 'variant'))};
  if (f.category === 'equipment') piece.durability = 15 + Math.floor(random(key + 'durability') * 81);
  if (f.id === 'desk_clock') piece.stoppedAt = Math.floor(random(key + 'time') * 720);
  return piece;
}
export const clockText = minutes => String(Math.floor(minutes / 60) || 12).padStart(2, '0') + ':' + String(minutes % 60).padStart(2, '0');
