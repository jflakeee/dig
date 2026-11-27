// Slots for the found equipment of docs/dig-nonmineral-finds.md. One piece per
// slot; the replaceable drill head is not a slot, it replaces the drill's tip.
// Effects are trial values. A piece at 0% durability stays fitted but idle.
export const slots = {
  aux_drill: {slot: 'aux', label: '보조 드릴', effect: '채굴 간격 0.16 → 0.12초, 사용 중 마모'},
  focus_lamp: {slot: 'lamp', label: '조명', effect: '작업등이 좁고 깊게 비춤'},
  chain_winder: {slot: 'chain', label: '체인', effect: '고정 중 충돌로 밀리는 정도 감소'},
  gravity_array: {slot: 'sensor', label: '센서', effect: '포탈 표식 감지 거리 2배'},
  cargo_coupler: {slot: 'coupler', label: '후방 연결부', effect: '화물칸을 연결할 수 있음'},
  buffer_gripper: {slot: 'gripper', label: '드론 팔', effect: '충격 민감 물체 회수 +2초'},
  seal_cartridge: {slot: 'cartridge', label: '드론 수집부', effect: '기체·수은·열 민감 시료 포집 +2초'},
};
export const slotOf = kind => slots[kind]?.slot ?? null;
// The fitted piece of a slot when it still works.
export function working(s, slot) {
  const p = s?.equipment?.[slot];
  return p && p.durability > 0 ? p : null;
}
export const drillInterval = s => working(s, 'aux') ? 0.12 : 0.16;
export const sensorRange = s => working(s, 'sensor') ? 64 : 32;
export const anchorMass = s => working(s, 'chain') ? 72 : 48;
// Extra capture seconds for a sensitive piece (a kind, or a capsule with its form).
export function captureBonus(s, piece) {
  const kind = typeof piece === 'string' ? piece : piece?.kind === 'capsule' ? piece.form + '_capsule' : piece?.kind;
  if (kind === 'pressure_capsule') return working(s, 'gripper') ? 2 : 0;
  if (['hydrogen', 'noble_gas', 'mercury', 'heat_crystal', 'energy_capsule'].includes(kind)) return working(s, 'cartridge') ? 2 : 0;
  return 0;
}
