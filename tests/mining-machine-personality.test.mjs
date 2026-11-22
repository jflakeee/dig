import test from 'node:test';
import assert from 'node:assert/strict';
import { machineDropReaction } from '../src/miningMachinePersonality.ts';

test('low-grade drops do not trigger special cheers', () => {
  assert.equal(machineDropReaction({ coal: 5 }, 0, 1), null);
});
test('higher grade ore yields higher celebration tier', () => {
  assert.equal(machineDropReaction({ iron: 1 }, 0, 1)?.tier, 1);
  assert.equal(machineDropReaction({ gold: 1 }, 0, 2)?.tier, 2);
  assert.equal(machineDropReaction({ gem: 1 }, 0, 3)?.tier, 3);
  assert.equal(machineDropReaction({}, 1, 4)?.tier, 3);
});
test('human echoes are intermittent and deterministic', () => {
  assert.equal(machineDropReaction({ gold: 1 }, 0, 36)?.humanEcho, false);
  assert.equal(machineDropReaction({ gold: 1 }, 0, 37)?.humanEcho, true);
  assert.deepEqual(machineDropReaction({ gold: 1 }, 0, 37), machineDropReaction({ gold: 1 }, 0, 37));
});
