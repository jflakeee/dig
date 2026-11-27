import assert from 'node:assert/strict';
import { test } from 'node:test';
import { arrivalReading } from '../next/arrival.js';

test('an arrival logs a jump ahead and a jump back at once, fixed by seed and trip', () => {
  const a = arrivalReading(77, 3);
  assert.deepEqual(a, arrivalReading(77, 3));
  assert.notDeepEqual(a, arrivalReading(77, 4));
  for (let trip = 1; trip < 200; trip++) {
    const r = arrivalReading(77, trip);
    assert.ok(r.ahead >= 10 && r.ahead <= 1e6 && r.behind >= 10 && r.behind <= 1e6);
    assert.match(r.line, /^도착 · 시간대 판정 불가 — 시계에 \+[\d,]+년과 −[\d,]+년이 함께 기록됨/);
    assert.match(r.signal, /^[0-9A-F]{4}$/);
  }
  const same = Array.from({length: 400}, (_, t) => arrivalReading(5, t).same).filter(Boolean).length;
  assert.ok(same > 20 && same < 110, 'about 15% also match the moment of leaving');
});
