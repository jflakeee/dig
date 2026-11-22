import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_MEMORY, memoryMiningEvent, advanceMemory } from '../src/miningMachineMemory.ts';

test('memory emerges after 43 digs and fades after 6.5 seconds', () => {
  let state = INITIAL_MEMORY;
  let line = null;
  for (let i = 0; i < 43; i++) {
    const result = memoryMiningEvent(state, 20000 + i * 100);
    state = result.state;
    line = result.line;
  }
  assert.ok(line);
  assert.equal(advanceMemory(state, state.expiresAt - 1).line, null);
  const faded = advanceMemory(state, state.expiresAt);
  assert.ok(faded.line);
  assert.equal(faded.state.fragment, -1);
});
test('normal mining and memory changes never mutate initial state', () => {
  const result = memoryMiningEvent(INITIAL_MEMORY, 20000);
  assert.equal(result.line, null);
  assert.equal(INITIAL_MEMORY.eventCount, 0);
});
test('invalid times are rejected', () => {
  assert.throws(() => advanceMemory(INITIAL_MEMORY, -1));
  assert.throws(() => memoryMiningEvent(INITIAL_MEMORY, NaN));
});
