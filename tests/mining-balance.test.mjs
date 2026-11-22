import test from 'node:test';
import assert from 'node:assert/strict';
import { simulate } from '../scripts/mining-balance.mjs';

test('same seed and inputs produce identical results', () => {
  const opts = { tier: 1, upgrade: 3, hours: .02, seed: 42 };
  assert.deepEqual(simulate(opts), simulate(opts));
});
test('more upgrade produces more blocks at fixed seed and duration', () => {
  const base = simulate({ tier: 0, upgrade: 0, hours: .1, seed: 1 });
  const boosted = simulate({ tier: 0, upgrade: 5, hours: .1, seed: 1 });
  assert.ok(boosted.blocks > base.blocks);
});
test('ore counts equal actual mined blocks and no negative durability', () => {
  const result = simulate({ tier: 2, upgrade: 5, hours: 1, seed: 123 });
  assert.equal(Object.values(result.counts).reduce((a,b)=>a+b,0), result.blocks);
  assert.ok(result.remainingDurability >= 0);
  assert.ok(result.maximumDurability >= 500);
});
test('invalid inputs are rejected', () => {
  assert.throws(() => simulate({ tier: 99 }), /Invalid/);
});
