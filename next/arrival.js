// What the machine's clock records on arriving through a portal
// (docs/dig-self-identity-lore.md 1 and 8). A portal joins place, time and
// universe at once, so the reading never settles: the clock logs a jump ahead
// and a jump back for the same arrival, and past and future cannot be told
// apart. Fixed by the market seed and the trip number, so a reload shows the
// same record. All ranges are trial values.
import { roll } from './roll.js';
const years = r => Math.round(10 ** (1 + 5 * r));      // 10 to 1,000,000 years
const group = n => n.toLocaleString('ko-KR');
export function arrivalReading(seed, trip) {
  const key = 'arrival:' + trip + ':';
  const ahead = years(roll(seed, key + 'ahead')), behind = years(roll(seed, key + 'behind'));
  const signal = Math.floor(roll(seed, key + 'signal') * 0x10000).toString(16).toUpperCase().padStart(4, '0');
  // Now and then the clock also logs the very moment it left.
  const same = roll(seed, key + 'same') < 0.15;
  return {ahead, behind, signal, same,
    line: '도착 · 시간대 판정 불가 — 시계에 +' + group(ahead) + '년과 −' + group(behind) + '년이 함께 기록됨' +
      (same ? ', 출발한 순간과도 일치' : '') + ' · 우주 신호 #' + signal};
}
