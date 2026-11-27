/**
 * Short lines shown only when a player reconnects into a newly generated world.
 * Train-carried records survive, while the surrounding world does not.
 */
export const RECONNECT_MEMORY_DIALOGUE = [
  '열차는 그대로인데… 여긴 처음 보는 곳 같아.',
  '내가 이 통로를 지나왔던가? 기억이 잘 안 나네.',
  '기록은 남아 있네. 그런데 어디까지 왔더라?',
  '방금도 이 생각을 한 것 같은데…',
] as const;

/** Return no line on a fresh start; choose one on reconnect. */
export function getReconnectMemoryDialogue(
  isReconnect: boolean,
  random: () => number = Math.random,
): string | null {
  if (!isReconnect) return null;

  const index = Math.min(
    RECONNECT_MEMORY_DIALOGUE.length - 1,
    Math.max(0, Math.floor(random() * RECONNECT_MEMORY_DIALOGUE.length)),
  );
  return RECONNECT_MEMORY_DIALOGUE[index];
}
