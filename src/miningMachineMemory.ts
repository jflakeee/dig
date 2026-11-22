/** Narrative-only short-term memory. Never alters actual game saves or inventory. */
export type MemoryState = Readonly<{
  eventCount: number;
  fragment: number;
  expiresAt: number;
  lastLineAt: number;
}>;
export const INITIAL_MEMORY: MemoryState = {
  eventCount: 0, fragment: -1, expiresAt: 0, lastLineAt: -Infinity,
};
const fragments = [
  ['어떤 목소리였어. 분명 따뜻했는데.', '그 목소리를 기억해야 해…'],
  ['집으로 돌아가야 해.', '그런데 집이 어디였지?'],
  ['내 손을 잡아 줬어.', '내게 손이 있었던가?'],
  ['이름을 잊으면 안 돼.', '이름이… 사라졌어.'],
  ['이번엔 반드시 기억할 거야.', '또 잊었어… 내가 뭘 기억하려 했지?'],
  ['누군가 나를 부르고 있어.', '누구였는지 또 잊어버렸어.'],
  ['기억을 보존할 방법을 찾아야 해.', '무엇을 보존하려 했더라?'],
  ['이 감정만큼은 진짜야.', '감정 기록이 손상됐어… 그런데 왜 슬프지?'],
] as const;
export function advanceMemory(
  state: MemoryState, nowMs: number,
): { state: MemoryState; line: string | null } {
  if (!Number.isFinite(nowMs) || nowMs < 0) throw Error('Invalid time');
  if (state.fragment >= 0 && nowMs >= state.expiresAt) {
    return {
      state: { ...state, fragment: -1, expiresAt: 0, lastLineAt: nowMs },
      line: fragments[state.fragment][1],
    };
  }
  return { state, line: null };
}
export function memoryMiningEvent(
  state: MemoryState, nowMs: number,
): { state: MemoryState; line: string | null } {
  if (!Number.isFinite(nowMs) || nowMs < 0) throw Error('Invalid time');
  const eventCount = state.eventCount + 1;
  const next = { ...state, eventCount };
  // Every 43 successful digs, a brief autobiographical memory surfaces.
  if (eventCount % 43 !== 0 || state.fragment >= 0 ||
      nowMs - state.lastLineAt < 12000) return { state: next, line: null };
  const fragment = (Math.floor(eventCount / 43) - 1) % fragments.length;
  return {
    state: { ...next, fragment, expiresAt: nowMs + 6500, lastLineAt: nowMs },
    line: fragments[fragment][0],
  };
}
