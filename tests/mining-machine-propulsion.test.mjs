import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_PROPULSION, collectDust, propulsionStep, BASE_SPEED } from '../src/miningMachinePropulsion.ts';

test('mining collects reaction mass without altering inventory', () => {
  const after = collectDust(INITIAL_PROPULSION, 8);
  assert.equal(after.dust, 4);
  assert.equal(INITIAL_PROPULSION.dust, 0);
});
test('basic movement is always available without fuel', () => {
  const result = propulsionStep({ dust: 0, energy: 0 }, 0.05, true);
  assert.equal(result.speed, BASE_SPEED);
  assert.equal(result.emergency, true);
});
test('boost consumes dust and increases speed', () => {
  const result = propulsionStep({ dust: 10, energy: 100 }, 0.05, true);
  assert.equal(result.speed, BASE_SPEED * 1.5);
  assert.ok(result.state.dust < 10);
});
test('negative mining and elapsed time are rejected', () => {
  assert.throws(() => collectDust(INITIAL_PROPULSION, -1));
  assert.throws(() => propulsionStep(INITIAL_PROPULSION, -1, false));
});
