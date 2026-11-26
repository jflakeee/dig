import assert from 'node:assert/strict';
import { test } from 'node:test';
import { elementSymbols } from '../next/elements.js';
import { variants } from '../next/minerals.js';
import { blockDiscovery, capsuleElement, capsuleOnly, specimens, captureSeconds } from '../next/specimens.js';
import { commit, readSave, saveKey, saveVersion } from '../next/save.js';
import { cellOwner, createWorld } from '../next/world.js';

function mockStorage(t) {
  const data = new Map();
  const original = ['navigator','localStorage'].map(k => Object.getOwnPropertyDescriptor(globalThis,k));
  t.after(() => ['navigator','localStorage'].forEach((k,i) => {
    if (original[i]) Object.defineProperty(globalThis,k,original[i]); else delete globalThis[k];
  }));
  Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)}});
  Object.defineProperty(globalThis,'navigator',{configurable:true,value:{locks:{request:async(k,f)=>f()}}});
  return data;
}
const drilling = extra => ({...readSave(), front: 'drill-1', drills: ['drill-1'], ...extra});
const sessionOf = world => ({pos:[0.5,0.5,0.5],velocity:[0,0,0],yaw:0,pitch:0,sensor:false,entered:-1,world:world.snapshot()});
const {chunk, index} = cellOwner(0, 0, 3);
const cellKey = chunk.join(',') + ':0:cell' + index;
// The first seed whose block at (0, 0, 3) uncovers a find accepted by `want`.
function seedFor(want) {
  for (let seed = 0; ; seed++) if (want(blockDiscovery(seed, cellKey))) return seed;
}
function dugWorld(seed) {
  const world = createWorld(true, () => 0, undefined, undefined, undefined, undefined, seed);
  world.dig(0, 0, 3);
  return world;
}

test('minerals, specimens and capsules give every one of the 118 elements a source', () => {
  assert.equal(specimens.length, 47);
  const natural = new Set();
  for (const list of Object.values(variants)) for (const v of list) Object.keys(v[3]).forEach(e => natural.add(e));
  for (const s of specimens) {
    assert.ok(s.weight > 0);
    for (const v of s.variants) {
      assert.ok(v.share > 0);
      for (const [e, n] of Object.entries(v.units)) {
        assert.ok(elementSymbols.includes(e), e);
        assert.ok(Number.isInteger(n) && n > 0);
        natural.add(e);
      }
    }
  }
  assert.equal(natural.size, 88);
  assert.equal(capsuleOnly.length, 30);
  assert.deepEqual(capsuleOnly.filter(e => natural.has(e)), []);
  assert.equal(new Set([...natural, ...capsuleOnly]).size, 118);
});

test('the discovery roll and its kind split start and end at their rates', () => {
  const forced = (rate, kind) => key => key.endsWith('rate') ? rate : key.endsWith('kind') ? kind : 0;
  assert.equal(blockDiscovery(0, 'k', forced(0.0199, 0)).kind, 'ice');
  assert.equal(blockDiscovery(0, 'k', forced(0.02, 0)), null);
  assert.notEqual(blockDiscovery(0, 'k', forced(0, 0.5999)).kind, 'capsule');
  assert.equal(blockDiscovery(0, 'k', forced(0, 0.6)).kind, 'capsule');
  assert.equal(blockDiscovery(0, 'k', forced(0, 0.6499)).kind, 'capsule');
  assert.equal(blockDiscovery(0, 'k', forced(0, 0.65)).find.kind, 'drill_head');
  assert.ok(blockDiscovery(0, 'k', forced(0, 0.999999)).find);
});

test('capsules favour capsule-only and unregistered elements and guarantee a new one after ten repeats', () => {
  assert.equal(capsuleElement(0, [], 0), 'H');
  const all = elementSymbols.filter(e => e !== 'Og');
  assert.equal(capsuleElement(0, all, 10), 'Og');
  assert.equal(capsuleElement(0.999999, all, 10), 'Og');
  assert.equal(capsuleElement(0, all, 9), 'H');
  // Unweighted, Tc would hold 1/118 of draws; weighted with nothing registered it holds 3/178.
  const counts = {};
  for (let i = 0; i < 17800; i++) counts[capsuleElement((i + 0.5) / 17800, [], 0)] = (counts[capsuleElement((i + 0.5) / 17800, [], 0)] ?? 0) + 1;
  assert.equal(counts.Tc, 300);
  assert.equal(counts.Fe, 100);
});

test('a stable specimen is kept once as a piece and decomposes into its units', async t => {
  const data = mockStorage(t);
  data.set(saveKey, JSON.stringify(drilling()));
  t.mock.method(Math, 'random', () => 0.5);
  const seed = seedFor(d => d?.kind === 'fluorite');
  const world = dugWorld(seed);
  const paid = await commit(0, {type: 'drill', cell: [0, 0, 3]}, sessionOf(world));
  assert.equal(paid.specimens.length, 1);
  assert.deepEqual([paid.specimens[0].kind, paid.specimens[0].variant], ['fluorite', 'fluorite']);
  assert.deepEqual(paid.specimenLog, ['fluorite']);
  const again = await commit(paid.revision, {type: 'drill', cell: [0, 0, 3]}, sessionOf(world));
  assert.equal(again.specimens.length, 1);
  const split = await commit(paid.revision, {type: 'decompose', kind: 'fluorite', variant: 'fluorite'});
  assert.deepEqual(split.specimens, []);
  assert.deepEqual(split.elements, {Ca: 1, F: 2});
  await assert.rejects(commit(split.revision, {type: 'decompose', kind: 'fluorite', variant: 'fluorite'}), /분해할 원료/);
});

test('a sensitive find is kept only when captured before its deadline', async t => {
  const data = mockStorage(t);
  t.mock.method(Math, 'random', () => 0.5);
  const seed = seedFor(d => d?.kind === 'hydrogen');
  const start = JSON.stringify(drilling());
  for (const [wait, kept] of [[captureSeconds - 0.001, true], [captureSeconds, false]]) {
    data.set(saveKey, start);
    const world = dugWorld(seed);
    world.advance(10);
    const found = await commit(0, {type: 'drill', cell: [0, 0, 3]}, sessionOf(world));
    assert.deepEqual(found.specimens, []);
    assert.equal(found.captures.length, 1);
    assert.equal(found.captures[0].expiresAt, 10 + captureSeconds);
    world.advance(wait);
    const capture = commit(found.revision, {type: 'capture', id: found.captures[0].id}, sessionOf(world));
    if (kept) {
      const s = await capture;
      assert.deepEqual(s.captures, []);
      assert.deepEqual(s.specimens.map(p => p.kind), ['hydrogen']);
    } else {
      await assert.rejects(capture, /포집 시간이 지났습니다/);
      const s = await commit(found.revision, 'checkpoint', sessionOf(world));
      assert.deepEqual([s.captures, s.specimens], [[], []]);
    }
  }
});

test('waiting finds start their timers in turn and moving away abandons them', async t => {
  const data = mockStorage(t);
  const world = createWorld(true, () => 0);
  const piece = (id, expiresAt) => ({id, kind: 'noble_gas', variant: 'Xe', seconds: 6, expiresAt});
  data.set(saveKey, JSON.stringify(drilling({captures: [piece('a', 10), piece('b', null)]})));
  world.advance(10);
  const s = await commit(0, 'checkpoint', sessionOf(world));
  assert.deepEqual(s.captures, [piece('b', 16)]);
  const moved = await commit(s.revision, {type: 'transit', radius: 1, strength: 1}, sessionOf(world));
  assert.deepEqual(moved.captures, []);
});

test('a capsule holds one element, counts repeats and decomposes without its shell', async t => {
  const data = mockStorage(t);
  t.mock.method(Math, 'random', () => 0.5);
  const seed = seedFor(d => d?.kind === 'capsule');
  const all = elementSymbols.filter(e => e !== 'Og');
  data.set(saveKey, JSON.stringify(drilling({elements: {H: 1}, elementLog: all.map(e => e), capsuleMisses: 10})));
  const s = await commit(0, {type: 'drill', cell: [0, 0, 3]}, sessionOf(dugWorld(seed)));
  const capsule = s.specimens.find(p => p.kind === 'capsule');
  assert.equal(capsule.element, 'Og');
  assert.equal(s.capsuleMisses, 0);
  const split = await commit(s.revision, {type: 'decompose', kind: 'capsule', element: 'Og'});
  assert.equal(split.elements.Og, 1);
  assert.equal(split.elementLog.at(-1), 'Og');
  assert.equal(split.elementLog.length, 118);
});

test('a version-5 save opens with no specimens and malformed pieces are rejected', t => {
  const data = mockStorage(t);
  const clean = readSave();
  const old = {...clean, version: 5};
  for (const key of ['specimens', 'specimenLog', 'captures', 'capsuleMisses']) delete old[key];
  data.set(saveKey, JSON.stringify(old));
  const s = readSave();
  assert.equal(s.version, saveVersion);
  assert.deepEqual([s.specimens, s.specimenLog, s.captures, s.capsuleMisses], [[], [], [], 0]);
  for (const bad of [{specimens: [{id: 'a', kind: 'unobtainium'}]}, {specimens: [{id: 'a', kind: 'capsule', element: 'Xx'}]},
    {specimens: [{id: 'a', kind: 'fluorite', variant: 'fluorite'}, {id: 'a', kind: 'galena', variant: 'galena'}]},
    {captures: [{id: 'a', kind: 'fluorite', variant: 'fluorite', seconds: 6, expiresAt: null}]},
    {captures: [{id: 'a', kind: 'hydrogen', variant: 'hydrogen', seconds: 6, expiresAt: null},
      {id: 'b', kind: 'hydrogen', variant: 'hydrogen', seconds: 6, expiresAt: 3}]}]) {
    data.set(saveKey, JSON.stringify({...clean, ...bad}));
    assert.throws(readSave, /원본을 보존/, JSON.stringify(bad));
  }
});
