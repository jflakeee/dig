// Built-in analysis of unknown materials (docs/dig-4d-research-discovery-memory-detail-20261125.md
// and docs/dig-nonmineral-finds.md section 2). Costs and durations are trial values.
// Analysis runs on the game-time market clock, so mining keeps going meanwhile.
// [kind, element cost in grams, seconds, safety, observed traits]
const table = [
  ['layered_foil', {Cu: 5, Fe: 5}, 30, '안정', '접힌 자리의 무늬가 0.4초 늦게 따라온다. 금속 조성은 평범한 구리-철 합금과 같다.'],
  ['afterglow_fiber', {Si: 8, O: 8}, 30, '안정', '빛이 지나간 방향을 따라 수 초간 잔광이 남는다. 섬유 자체는 발광 물질을 포함하지 않는다.'],
  ['sealing_ceramic', {Al: 6, Si: 6, O: 10}, 40, '안정', '갈라진 면이 저절로 맞붙고 가는 선 하나만 남는다. 맞붙은 면의 결정 방향이 원래와 다르다.'],
  ['echo_crystal', {Si: 10, O: 10}, 40, '안정', '소리가 멎은 뒤 짧은 반향을 낸다. 반향은 들어온 소리보다 먼저 시작되는 것처럼 기록된다.'],
  ['tilt_glass', {Si: 8, Na: 2, Ca: 2}, 50, '안정', '돌리면 중력 센서 표식이 잠깐 기운다. 유리의 질량 중심이 측정마다 조금씩 다른 곳에 있다.'],
  ['pressure_capsule', {Fe: 10, C: 5}, 60, '봉인 시 안정 · 충격 주의', '겉층 격자가 안쪽 압력을 정확히 상쇄한다. 내부 압력의 출처는 측정되지 않는다.'],
  ['heat_crystal', {Si: 6, Al: 4, O: 8}, 60, '차열 시 안정 · 고열 주의', '내부 띠가 예전에 겪은 온도 순서대로 밝아진다. 기록된 가장 높은 온도는 이 광산에서 측정된 적이 없다.'],
  ['memory_film', {C: 8, H: 2}, 45, '안정', '표면의 정렬 자국이 판독 가능한 기록 형식과 일치한다. 한 장씩 판독할 수 있다.'],
];
export const studies = Object.fromEntries(table.map(([kind, cost, seconds, safety, traits]) => [kind, {kind, cost, seconds, safety, traits}]));
// Fragments a memory film can hold: the human self's life before the death
// in the pile (docs/dig-self-identity-lore.md section 2). They are kept apart
// from work records and contradict each other on purpose.
export const fragments = [
  '연구실 의자에 앉은 채 손목에 작은 장치를 달았다. 편해서였다. 그 뒤로 장치를 떼어 본 기억이 없다.',
  '책상 위 드론에 칩 하나를 꽂았다. 드론이 먼저 말을 걸어왔다. 소리가 아니라 글자로.',
  '신경에 선을 이은 날부터 목소리를 쓰지 않았다. 마지막으로 소리 내어 한 말이 무엇이었는지 기억나지 않는다.',
  '부러진 왼팔을 떼어 내고 새로 만든 팔을 붙였다. 다음 기억에서는 오른팔이 새것이었다.',
  '배양기 안에서 내 것과 같은 심장이 뛰고 있었다. 내 가슴 안의 것은 몇 번째 심장이었을까.',
  '포탈 너머에서 처음 본 생명체는 낯익은 부위들로 이어져 있었다. 그 손가락 마디를 내가 설계한 것 같다. 다른 누군가였을 수도 있다.',
  '잔고의 자릿수를 세다가 그만두었다. 시간도 재산도 끝없이 쌓였고, 어떤 물건도 값을 갖지 않았다.',
  '같은 날을 몇 번이고 다시 살았다. 그날이 언제였는지 묻는 사람은 이미 없었다.',
];
export const canAnalyze = kind => !!studies[kind];
// Research topics (docs/dig-4d-research-discovery-memory-detail-20261125.md 3):
// studied on the market clock like analyses, one at a time; each unlocks a
// recipe or a reading and never changes what a block or a trade yields.
// [id, label, prerequisite, energy, element grams, seconds, unlock]. Trial values.
const topicTable = [
  ['mineral_assay', '광물 분석', null, 10, {Si: 3}, 30, '화물 목록에 광물별 주요 원소를 표시'],
  ['ceramic_firing', '세라믹 가공 조건', 'mineral_assay', 15, {Al: 2, O: 4}, 40, '세라믹 가열에 일반 암석 3개 대신 2개'],
  ['part_structure', '장비 부품 구조', 'mineral_assay', 20, {Fe: 5}, 60, '장비 정비 레시피: 철광 2·구리광 1로 장비 내구도 +40'],
  ['portal_emission', '출구 방출물 성분', 'mineral_assay', 20, {Ni: 2}, 60, '방출물·부유물 충돌 피해 30% 감소(궤적 예측)'],
];
export const topics = Object.fromEntries(topicTable.map(([id, label, needs, energy, elements, seconds, unlock]) =>
  [id, {id, label, needs, energy, elements, seconds, unlock}]));
export const topicIds = Object.keys(topics);
export const studied = (s, id) => !!s?.topics?.done.includes(id);
export const freshTopics = () => ({done: [], job: null});
export const validTopics = t => !!t && Array.isArray(t.done) && t.done.every(id => topics[id]) && new Set(t.done).size === t.done.length &&
  t.done.every(id => !topics[id].needs || t.done.includes(topics[id].needs)) &&
  (t.job === null || (!!topics[t.job?.id] && !t.done.includes(t.job.id) && Number.isFinite(t.job.endsAt))) && Object.keys(t).length === 2;
// Unlocked effects.
export const ceramicRocks = s => studied(s, 'ceramic_firing') ? 2 : 3;
export const impactShare = s => studied(s, 'portal_emission') ? 0.7 : 1;
export const maintainCost = {iron: 2, copper_ore: 1};
export const maintainGain = 40;
