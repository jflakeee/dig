// Automation studies (docs/dig-upgrades-camera-automation-trade-gamble.md 4).
// Each unlocks a switch that presses one menu button on its own. Trial values.
const table = [
  ['repair', '자동 세라믹·드릴 수리', 200, {Si: 5}, 30, '드릴 내구도 50% 미만이면 세라믹을 굽고 수리'],
  ['wagon', '자동 화물칸 연결', 300, {Fe: 10}, 45, '적재 90% 이상이고 16 m 안쪽이면 화물칸 연결'],
  ['decompose', '자동 분해', 300, {C: 5}, 45, '생활물품과 지구 물건을 하나씩 분해'],
  ['analyze', '자동 분석', 400, {O: 5}, 60, '분석 대기 물질을 차례로 분석하고 기억막 판독'],
  ['sell', '자동 판매', 500, {Cu: 5}, 60, '적재 90% 이상이면 가장 많은 광물을 판매'],
  ['equip', '자동 장착', 500, {Ni: 5}, 60, '빈 슬롯에 보관 장비를 장착'],
  ['upgrade', '자동 강화', 800, {W: 5}, 90, '가능한 강화를 싼 것부터 진행'],
  ['capture', '자동 시료 포집', 600, {Ag: 5}, 60, '민감 시료 포집 버튼을 대신 누름'],
];
export const automations = Object.fromEntries(table.map(([id, label, credits, elements, seconds, effect]) =>
  [id, {id, label, credits, elements, seconds, effect}]));
export const automationIds = Object.keys(automations);
export const fresh = () => ({unlocked: [], off: [], job: null});
export const isOn = (s, id) => !!s?.automation?.unlocked.includes(id) && !s.automation.off.includes(id);
export const validAutomation = a => !!a && Array.isArray(a.unlocked) && Array.isArray(a.off) &&
  a.unlocked.every(id => automations[id]) && new Set(a.unlocked).size === a.unlocked.length &&
  a.off.every(id => a.unlocked.includes(id)) && new Set(a.off).size === a.off.length &&
  (a.job === null || (!!automations[a.job?.id] && !a.unlocked.includes(a.job.id) && Number.isFinite(a.job.endsAt))) &&
  Object.keys(a).length === 3;
