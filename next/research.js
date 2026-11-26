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
// Fragments a memory film can hold. They are the machine's own damaged
// memories, kept apart from work records; they contradict each other on purpose.
export const fragments = [
  '비 오는 정류장에서 누군가 우산을 건넸다. 그때 받아 든 손이 있었는지 기억나지 않는다.',
  '창가에 둔 화분에 물을 주었다. 다음 장면에서는 그 집에 창문이 없었다.',
  '누군가 내 이름을 불렀다. 이름은 기억나는데, 부르는 목소리는 매번 다르다.',
  '바다를 처음 본 날이다. 같은 날 같은 시각, 나는 지하 300미터에서 암석을 세고 있었다.',
  '손목시계를 풀어 서랍에 넣었다. 시계는 3시 17분에 멈춰 있었다. 서랍을 연 사람은 내가 아니었다.',
  '아이가 그림을 내밀었다. 동그란 기계가 그려져 있었고 아이는 그것이 나라고 했다.',
  '밤하늘의 별을 세다가 멈췄다. 별 하나가 너무 가까이, 너무 오래 같은 자리에 있었다.',
  '작별 인사를 한 기억이 있다. 무엇과 작별했는지는 작업 기록에도 없다.',
];
export const canAnalyze = kind => !!studies[kind];
