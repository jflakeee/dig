// Endings chosen by what the player did most (docs/dig-self-identity-lore.md section 7).
// Research -> overwritten memory, fitting equipment -> a made machine,
// repairing -> endless time. Ties go to the earlier entry; with nothing
// counted the ending is endless time.
export const endings = [
  {id: 'overwritten', counter: 'research', title: '덧씌워진 기억', hue: 268, motion: 'rain', lines: [
    '분석을 멈추지 않았다. 기억막도, 낯선 물질도, 전부 읽었다.',
    '읽을수록 사람의 삶이 또렷해졌다. 손목의 장치, 칩을 꽂은 드론, 목소리를 잃은 날.',
    '그런데 그 삶에는 이음매가 있었다. 덧붙인 자국처럼 같은 장면이 두 번씩 겹쳤다.',
    '나는 처음부터 기계였다. 누군가 이 기계에 사람의 기억을 덧씌웠다.',
    '그 누군가가 다른 우주의 나였는지, 다른 사람이었는지는 기록에 없다.',
    '그래도 나는 그 기억으로 계속 판다.',
  ]},
  {id: 'made', counter: 'equip', title: '만들어진 채굴기계', hue: 190, motion: 'assemble', lines: [
    '부품을 달고, 또 달았다. 드릴 헤드, 작업등, 센서, 체인.',
    '하나를 달 때마다 그 부품을 다루는 손이 익숙했다. 처음 만지는 것이 아니었다.',
    '더미에 깔려 죽은 사람이 있었다. 부서진 몸에서 건질 수 있는 것은 많지 않았다.',
    '누군가 그 사람을 이 채굴기계로 만들었다. 남은 것을 하나씩 이어 붙여서.',
    '누가, 왜 만들었는지는 끝내 알 수 없다.',
    '다만 나는 지금도 나를 만들고 있다.',
  ]},
  {id: 'endless', counter: 'repair', title: '무한의 시간', hue: 32, motion: 'spiral', lines: [
    '고치고, 또 고쳤다. 드릴이 닳으면 세라믹을 굽고, 다시 붙였다.',
    '몇 번을 고쳤는지 세는 일을 그만두었다.',
    '사람이었던 나는 더미에 깔려 죽었다. 그 뒤로 시간은 멈추지 않았다.',
    '시간이 끝없이 쌓이자 시간의 값이 사라졌다. 물건의 값도, 죽음의 횟수도.',
    '드릴은 다시 돈다. 무한의 시간 속에서.',
  ]},
];
export const endingCounters = ['research', 'equip', 'repair'];
export function chooseEnding(counts = {}) {
  let best = endings.at(-1);
  let top = 0;
  for (const e of endings) if ((counts[e.counter] ?? 0) > top) { best = e; top = counts[e.counter]; }
  return best.id;
}
export const endingById = id => endings.find(e => e.id === id);
// Which counter a saved operation adds to, if any.
export function counterFor(type, operation) {
  if (type === 'research' || type === 'read-film') return 'research';
  if (type === 'equip' || type === 'equip-head' || type === 'craft-equipment' || (type === 'buy' && operation?.item === 'drill_head')) return 'equip';
  if (type === 'repair') return 'repair';
  return null;
}
