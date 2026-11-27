import assert from 'node:assert/strict';
import { rollPassagePresence } from '../src/digMode/portalGeneration.ts';

function from(values: number[]) {
  let index = 0;
  return () => values[index++];
}

assert.deepEqual(rollPassagePresence(from([0.5, 0.5])), { small: false, large: false });
assert.deepEqual(rollPassagePresence(from([0.09, 0.5])), { small: true, large: false });
assert.deepEqual(rollPassagePresence(from([0.5, 0.02])), { small: false, large: true });
assert.deepEqual(rollPassagePresence(from([0.09, 0.02])), { small: true, large: true });
assert.throws(() => rollPassagePresence(from([-0.1, 0.2])), /Random source/);
assert.throws(() => rollPassagePresence(from([0.1, Number.NaN])), /Random source/);
console.log('Independent small/large portal odds and co-occurrence passed');
