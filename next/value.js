// The collapse of value (docs/dig-self-identity-lore.md 2): once time and
// wealth could pile up without end, no price decided anything. Presentation
// only: prices and settlements stay as they are; the trade screen starts to
// say so as the machine remembers it or piles up credits. Thresholds are trial values.
export const valueFragment = 6;           // research.js fragments: the balance whose digits I stopped counting
export function valueCollapse(s) {
  const remembered = !!s?.memoryLog?.includes(valueFragment);
  const credits = s?.credits ?? 0;
  if (credits >= 10_000_000 || (remembered && credits >= 100_000) || (s?.endingsSeen?.length ?? 0) > 0) return 2;
  if (remembered || credits >= 100_000) return 1;
  return 0;
}
export const collapseNotes = [
  '',
  '시세가 오르내린다. 무엇을 사고팔아도 아무것도 정해지지 않는다는 느낌이 남는다.',
  '잔고의 자릿수를 세다가 그만두었다. 어떤 값도 아무것도 정하지 않는다.',
];
// At the deepest level the balance shows as endless for one second in four.
export const showsEndless = (level, now) => level >= 2 && Math.floor(now) % 4 === 0;
