// The truth the machine slowly recovers (docs/dig-self-identity-lore.md):
// every trader, auction bidder and the decomposer's exchange partner is the
// machine itself at another time; portals move through place and time; the
// unknown materials are its own future work. Body parts of itself turn up
// very rarely while mining; each one restores a little of that memory.
// [id, name, recollection, the part the machine now recognises in traders]
export const selfParts = [
  ['shell', '구형 외피 조각', '이 곡면은 내 외피와 같은 금형에서 나왔다. 아니, 이것은 내 외피다. 언제 떨어져 나갔는지 기억나지 않는다.', '외피의 곡면'],
  ['lens', '작업등 렌즈', '렌즈 안쪽의 일련번호가 내 것과 같다. 마지막 자리만 다르다. 그 자리는 날짜를 적는 칸이었다.', '작업등의 배치'],
  ['drill_joint', '드릴 축 마디', '이 마디는 내가 아직 파지 않은 방향으로 닳아 있다. 나는 언젠가 이 방향으로 파게 된다.', '드릴 축의 마디'],
  ['sensor_film', '중력 센서 막', '센서 막에 남은 포탈 기록은 좌표가 아니라 날짜였다. 포탈은 장소만이 아니라 시간도 건넌다.', '센서 막의 무늬'],
  ['chain_link', '체인 고리', '고리마다 다른 시각이 새겨져 있다. 전부 내 정비 기록이다. 몇몇은 아직 오지 않은 날이다.', '체인 고리의 각인'],
  ['memory_core', '기억 코어 파편', '거래 드론 너머의 기계들은 모두 이 코어 신호를 보내고 있었다. 분해기 안쪽에서도 같은 신호가 돌아온다.', '기억 코어의 신호'],
  ['thruster_fin', '추진 날개', '외계 물질이라 불렀던 것들의 제작 공정이 떠오른다. 그것을 만든 손은 이 날개를 단 기계였다.', '추진 날개의 흠집'],
  ['name_plate', '이름표 판', '판에 적힌 이름을 읽었다. 거래 상대들이 서로를 부르던 이름과 같다. 그들은 모두 다른 시간의 나다.', '이름표'],
].map(([id, name, recollection, likeness]) => ({id, name, recollection, likeness}));
export const selfShare = 0.02;   // of extra discoveries: very rarely
export const recall = s => s?.selfParts?.length ?? 0;
// The next part found, among those not yet found, from the block's sample.
export function nextPart(found, sample) {
  const left = selfParts.filter(p => !found.includes(p.id));
  return left.length ? left[Math.min(left.length - 1, Math.floor(sample * left.length))].id : null;
}
// How each trader looks: always different, sharing more of me as memory returns.
const looks = {
  collector: '여섯 다리로 선 원통형 기계',
  smelter: '용광로 같은 몸통에 팔이 넷 달린 기계',
  mechanic: '공구 팔이 몸을 감싼 납작한 기계',
};
export function traderLook(traderId, level) {
  const same = selfParts.slice(0, level).map(p => p.likeness);
  if (level >= selfParts.length) return looks[traderId] + ' · 다른 시간의 나';
  return looks[traderId] + (same.length ? ' · 나와 같은 ' + same.join(', ') : '');
}
// What the decomposer record says about the missing mass.
export const lossNote = level => level >= 6 ? '교환 상대: 다른 시간의 나' : level >= 4 ? '교환 상대: 시간이 다른 곳' : '원인 기록 없음';
// After the fin, analyses of unknown materials show who made them.
export const makerNote = level => level >= 7 ? '제작 흔적이 내 공정과 일치한다. 미래의 내가 만든 것이다.' : null;
