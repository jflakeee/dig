import assert from 'node:assert/strict';
import { test } from 'node:test';
import { valueCollapse, collapseNotes, showsEndless, valueFragment } from '../next/value.js';
import { fragments } from '../next/research.js';

test('value collapses with the remembered fragment, piled credits or a seen ending', () => {
  assert.match(fragments[valueFragment], /잔고의 자릿수/);
  assert.equal(valueCollapse({credits: 0, memoryLog: []}), 0);
  assert.equal(valueCollapse({credits: 100_000, memoryLog: []}), 1);
  assert.equal(valueCollapse({credits: 5, memoryLog: [valueFragment]}), 1);
  assert.equal(valueCollapse({credits: 100_000, memoryLog: [valueFragment]}), 2);
  assert.equal(valueCollapse({credits: 10_000_000, memoryLog: []}), 2);
  assert.equal(valueCollapse({credits: 0, memoryLog: [], endingsSeen: ['endless']}), 2);
  assert.ok(collapseNotes[1] && collapseNotes[2]);
});

test('only the deepest collapse shows the balance as endless, one second in four', () => {
  assert.equal(showsEndless(1, 8), false);
  assert.deepEqual([8, 9, 10, 11, 12].map(t => showsEndless(2, t)), [true, false, false, false, true]);
});
