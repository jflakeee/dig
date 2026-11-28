import test from 'node:test';
import assert from 'node:assert/strict';
import { tiers, tierOrder, nextAutoTier, autoRule } from '../next/view3d.js';

test('tiers rise in cost from low to high', () => {
  assert.deepEqual(tierOrder, ['low', 'medium', 'high']);
  assert.equal(tiers.low.shadows, false);
  assert.equal(tiers.high.bloom, true);
  assert.ok(tiers.low.scale < tiers.medium.scale && tiers.medium.scale < tiers.high.scale);
});

test('auto quality steps down when slow and up when fast', () => {
  assert.equal(nextAutoTier('medium', autoRule.down - 1, []), 'low');
  assert.equal(nextAutoTier('low', autoRule.down - 1, []), 'low');
  assert.equal(nextAutoTier('medium', autoRule.up + 1, []), 'high');
  assert.equal(nextAutoTier('high', autoRule.up + 1, []), 'high');
  assert.equal(nextAutoTier('medium', 45, []), 'medium');
});

test('auto quality never climbs back to a tier it left for being slow', () => {
  assert.equal(nextAutoTier('medium', 60, ['high']), 'medium');
  assert.equal(nextAutoTier('low', 60, ['medium']), 'low');
});
