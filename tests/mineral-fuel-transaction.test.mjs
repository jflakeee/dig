import test from 'node:test';
import assert from 'node:assert/strict';
import { planMineralFuelConversion } from '../src/mineralFuelTransaction.ts';

const base = { dust: 8, energy: 50 };
test('conversion plan reserves exact ore count without mutating state', () => {
  const plan = planMineralFuelConversion(base, 'coal', 9, 3);
  assert.deepEqual(plan, {
    ore: 'coal', units: 3, remaining: 6,
    nextPropulsion: { dust: 8, energy: 80 },
  });
  assert.deepEqual(base, { dust: 8, energy: 50 });
});
test('insufficient ore cannot create energy', () => {
  assert.equal(planMineralFuelConversion(base, 'coal', 1, 2), null);
});
test('overflow is rejected rather than consuming ore for no energy', () => {
  assert.equal(planMineralFuelConversion({ dust: 0, energy: 95 }, 'coal', 5, 1), null);
});
test('invalid quantities are rejected', () => {
  assert.throws(() => planMineralFuelConversion(base, 'coal', 2, -1));
  assert.throws(() => planMineralFuelConversion(base, 'coal', 2, 0.5));
  assert.throws(() => planMineralFuelConversion(base, '', 2, 1));
});
