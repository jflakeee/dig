import type { Ore } from './ores';

export type MachineReaction = Readonly<{ line: string; tier: 1 | 2 | 3; humanEcho: boolean }>;
const echoes = [
  '방금 중요한 게 떠올랐는데… 뭐였지?',
  '이 장소, 전에 와 본 것 같아. 기록에는 없는데.',
  '누군가 기다리고 있었어. 누구였더라?',
  '잊지 않으려고 저장했는데… 파일이 비어 있어.',
  '내 기억 속 손은… 금속이 아니었어.',
  '이름이 있었는데. 왜 기억이 안 나지?',
  '이 말을… 전에 했었나?',
] as const;
const cheers = {
  1: ['좋아! 철광석이다!', '제법 괜찮은 발견이야!'],
  2: ['금이다! 이건 정말 멋져!', '대박! 귀한 광물이야!'],
  3: ['믿을 수 없어! 최고급 광물 발견!', '와아! 이걸 내가 찾았다고?!'],
} as const;

/** Pure, deterministic reaction selection. No random calls or save changes. */
export function machineDropReaction(
  gained: Partial<Record<Ore, number>>,
  rareCount: number,
  miningEvent: number,
): MachineReaction | null {
  if (!Number.isSafeInteger(miningEvent) || miningEvent < 0 ||
      !Number.isSafeInteger(rareCount) || rareCount < 0) throw Error('Invalid mining event');
  const tier: 1 | 2 | 3 | 0 = rareCount > 0 || (gained.gem ?? 0) > 0 ? 3
    : (gained.gold ?? 0) > 0 ? 2
    : (gained.iron ?? 0) > 0 || (gained.copper ?? 0) > 0 ? 1 : 0;
  if (!tier) return null;
  // A rare fragment of human memory is revealed occasionally, not on every drop.
  const humanEcho = miningEvent > 0 && miningEvent % 37 === 0;
  const lines = cheers[tier];
  return {
    line: humanEcho ? echoes[Math.floor(miningEvent / 37) % echoes.length]
      : lines[miningEvent % lines.length],
    tier, humanEcho,
  };
}
