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

test('one-hour baseline ore payout is deterministic and finite', () => {
  const result = simulate({ tier: 0, upgrade: 0, hours: 1, seed: 20261122, baseMineSeconds: 1 });
  assert.ok(result.blocks > 0);
  assert.ok(Number.isFinite(result.netGold));
  assert.equal(result.grossGold, Object.entries(result.counts).reduce((sum, [ore, count]) =>
    sum + count * ({ stone: 1, coal: 4, iron: 10, gold: 25, rare: 100 })[ore], 0));
});
test('all enhancement levels keep ore categories stable', () => {
  for (let upgrade = 0; upgrade <= 5; upgrade++) {
    const result = simulate({ tier: 1, upgrade, hours: .05, seed: 17 });
    assert.deepEqual(Object.keys(result.counts), ['stone', 'coal', 'iron', 'gold', 'rare']);
    assert.ok(result.repairs >= 0 && result.replacements >= 0);
  }
});
