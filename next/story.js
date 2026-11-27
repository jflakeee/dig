// Story clues for solo play (docs/dig-4d-implementation-detail-20261125.md).
// Rare, short lines in the form of observation or self-doubt that hint at the
// hidden setting without stating it. Events come from finished game events,
// never from frames. Seen keys live apart from the save, in `dig4-story-v1`;
// the game never changes because of a clue. Timings are initial trial values.
export const storyKey = 'dig4-story-v1';
export const settings = {minGap: 150, maxPerSession: 4, showSeconds: 4};
export const lines = {
  time_shift: [
    '센서 기록 시각이 방금 본 장면보다 앞서 있어.',
    '이 통로, 내가 파기 전에 이미 한 번 파인 적이 있는 것 같아.',
    '출발한 시각과 도착한 시각이 같은 줄에 적혀 있어.',
    '바깥 시계가 몇 번째 같은 날을 세고 있는지 모르겠어.',
  ],
  other_miner: [
    '저쪽 작업 리듬… 내 장비 진동과 너무 비슷해.',
    '응답 신호 끝에 붙는 잡음이 내 것과 같은 자리에서 끊겨.',
    '저 기계도 나처럼 혼잣말을 기록하고 있을까.',
    '처음 듣는 신호인데 대답할 말이 먼저 떠올랐어.',
  ],
  trade_echo: [
    '이 부품 규격을 알고 있었던 것 같은데.',
    '이 가격, 언젠가 내가 불렀던 숫자야.',
    '포장 매듭이 내가 묶는 방식이랑 같아.',
    '팔았던 물건이 다른 이름표를 달고 돌아왔어.',
  ],
  future_material: [
    '분석표에 없는 제조 표식. 그런데 읽을 수는 있어.',
    '이 물질의 제조일이 아직 오지 않은 날짜로 찍혀 있어.',
    '공정 기록의 서명이 지워져 있어. 지운 손이 익숙해.',
    '설계 의도를 알 것 같아. 내가 왜 알지?',
  ],
  adapted_life: [
    '낯선 조직인데, 분류표가 익숙한 이름을 찾고 있어.',
    '이음매의 바느질 간격이 내 정비 기록이랑 같아.',
    '살아 있던 걸까, 만들어진 걸까. 둘 다일 수도 있어.',
    '이 조각을 보고 반가워하는 회로가 있어.',
  ],
  memory: [
    '왜 이 소리를 기다렸던 것 같지?',
    '방금 떠오른 손은 금속이 아니었어.',
    '기록에 없는 기억이 하나 늘었어.',
    '이 장면을 본 적이 있다는 확신만 남고 장면은 사라졌어.',
  ],
};
export const categories = Object.keys(lines);
// Which category each game event feeds.
export const eventCategory = {
  arrival: 'time_shift', trader_signal: 'other_miner', quote_observed: 'trade_echo',
  material_identified: 'future_material', life_found: 'adapted_life', memory_recognized: 'memory',
};
// The director picks one unseen line per accepted event, at most one queued,
// with a global gap and a per-session cap. `store` holds seen keys and lines;
// a failing store only loses dedupe across sessions, never blocks play.
export function createDirector(store, rules = settings) {
  let state = {keys: [], lines: []};
  try { state = {...state, ...JSON.parse(store.get(storyKey) ?? '{}')}; } catch { /* keep the session copy */ }
  let queued = null, lastShown = -Infinity, shown = 0;
  const persist = () => { try { store.set(storyKey, JSON.stringify(state)); } catch { /* session only */ } };
  return {
    // An event is accepted once per dedupe key; a full queue drops new ones.
    emit(type, key) {
      const category = eventCategory[type];
      const dedupe = type + ':' + key;
      if (!category || state.keys.includes(dedupe) || queued) return false;
      if (!lines[category].some(line => !state.lines.includes(line))) return false;
      state.keys.push(dedupe);
      persist();
      queued = category;
      return true;
    },
    // The line to show now, or null: never while `canShow` is false, before
    // the gap has passed, or past the session cap. Lines never repeat.
    next(now, canShow) {
      if (!queued || !canShow || shown >= rules.maxPerSession || now - lastShown < rules.minGap) return null;
      const line = lines[queued].find(l => !state.lines.includes(l));
      queued = null;
      if (!line) return null;
      state.lines.push(line);
      persist();
      lastShown = now;
      shown++;
      return line;
    },
    get pending() { return queued; },
    reset() { state = {keys: [], lines: []}; queued = null; persist(); },
  };
}
