import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createDirector, lines, categories, storyKey, settings } from '../next/story.js';

const memoryStore = () => { const m = new Map(); return {get: k => m.get(k) ?? null, set: (k, v) => m.set(k, v), m}; };

test('each of six categories holds short lines, none repeated', () => {
  assert.equal(categories.length, 6);
  const all = categories.flatMap(c => lines[c]);
  assert.ok(categories.every(c => lines[c].length >= 3 && lines[c].length <= 5));
  assert.equal(new Set(all).size, all.length);
  assert.ok(all.every(l => l.length <= 40));
});

test('an event is used once per key, waits until it may show, and respects the gap and cap', () => {
  const store = memoryStore();
  const d = createDirector(store);
  assert.equal(d.emit('arrival', 1), true);
  assert.equal(d.emit('arrival', 1), false, 'same key again');
  assert.equal(d.emit('arrival', 2), false, 'one clue queued at a time');
  assert.equal(d.next(10, false), null, 'held while something else is up');
  const first = d.next(10, true);
  assert.equal(first, lines.time_shift[0]);
  assert.equal(d.next(11, true), null, 'nothing queued');
  d.emit('arrival', 2);
  assert.equal(d.next(10 + settings.minGap - 1, true), null, 'too soon');
  assert.equal(d.next(10 + settings.minGap, true), lines.time_shift[1]);
  for (let i = 3; i <= 6; i++) { d.emit('arrival', i); d.next(i * 1000, true); }
  d.emit('memory_recognized', 'x');
  assert.equal(d.next(99999, true), null, 'four a session');
  assert.ok(JSON.parse(store.m.get(storyKey)).keys.includes('arrival:1'));
});

test('seen keys and lines carry over to the next session and reset clears them', () => {
  const store = memoryStore();
  const a = createDirector(store);
  a.emit('life_found', 'alien_heart');
  a.next(0, true);
  const b = createDirector(store);
  assert.equal(b.emit('life_found', 'alien_heart'), false);
  b.emit('life_found', 'alien_bone');
  assert.equal(b.next(0, true), lines.adapted_life[1], 'the next unseen line');
  b.reset();
  assert.equal(createDirector(store).emit('life_found', 'alien_heart'), true);
});

test('a failing store never blocks play', () => {
  const d = createDirector({get: () => { throw Error('blocked'); }, set: () => { throw Error('blocked'); }});
  assert.equal(d.emit('arrival', 1), true);
  assert.equal(d.next(0, true), lines.time_shift[0]);
  assert.equal(d.emit('unknown_event', 1), false);
});
