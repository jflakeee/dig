import assert from 'node:assert/strict';
import { test } from 'node:test';
import { elementSymbols } from '../next/elements.js';
import { finds, rollFind, clockText } from '../next/finds.js';
import { blockDiscovery } from '../next/specimens.js';
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
function seedFor(kind) {
  for (let seed = 0; ; seed++) if (blockDiscovery(seed, cellKey)?.find?.kind === kind) return seed;
}
function dugWorld(seed) {
  const world = createWorld(true, () => 0, undefined, undefined, undefined, undefined, seed);
  world.dig(0, 0, 3);
  return world;
}

test('the 24 finds split into eight equipment, unknown and household items', () => {
  assert.equal(finds.length, 24);
  for (const category of ['equipment', 'unknown', 'household'])
    assert.equal(finds.filter(f => f.category === category).length, 8, category);
  for (const f of finds.filter(f => f.category === 'household'))
    for (const v of f.variants)
      for (const [e, n] of Object.entries(v.units)) assert.ok(elementSymbols.includes(e) && Number.isInteger(n) && n > 0, f.id + e);
  for (const f of finds.filter(f => f.category !== 'household')) assert.ok(f.variants.every(v => v.units === null), f.id);
  assert.deepEqual(finds.filter(f => f.sensitive).map(f => [f.id, f.sensitive.seconds, f.sensitive.damage]),
    [['pressure_capsule', 4, 10], ['heat_crystal', 5, 8]]);
});

test('a find is fixed by its samples, including durability and a stopped clock', () => {
  const at = (item, extra = 0) => rollFind(key => key.endsWith('item') ? item : extra, 'k');
  assert.equal(at(0).kind, 'drill_head');
  assert.equal(at(0.999999).kind, 'earphones');
  assert.equal(at(0, 0).durability, 15);
  assert.equal(at(0, 0.999999).durability, 95);
  const clock = rollFind(key => key.endsWith('item') ? 21.5 / 24 : key.endsWith('time') ? 0.999999 : 0, 'k');
  assert.deepEqual([clock.kind, clock.stoppedAt, clockText(clock.stoppedAt)], ['desk_clock', 719, '11:59']);
  assert.equal(clockText(0), '12:00');
  assert.equal(rollFind(key => key.endsWith('item') ? 17.5 / 24 : key.endsWith('variant') ? 0.5 : 0, 'k').variant, 'nickel');
});

test('a household find decomposes into its units while equipment stays whole', async t => {
  const data = mockStorage(t);
  data.set(saveKey, JSON.stringify(drilling({finds: [
    {id: 'a', kind: 'spoon', variant: 'nickel'}, {id: 'b', kind: 'focus_lamp', variant: 'standard', durability: 40}],
    findLog: ['spoon', 'focus_lamp']})));
  const s = await commit(0, {type: 'decompose', find: 'spoon', variant: 'nickel'});
  assert.deepEqual(s.elements, {Fe: 3, Cr: 1, Ni: 1});
  assert.deepEqual(s.finds.map(p => p.id), ['b']);
  await assert.rejects(commit(s.revision, {type: 'decompose', find: 'focus_lamp', variant: 'standard'}), /분해할 원료/);
});

test('a drilled block keeps its find once and records a stopped clock in the log', async t => {
  const data = mockStorage(t);
  data.set(saveKey, JSON.stringify(drilling()));
  t.mock.method(Math, 'random', () => 0.5);
  const world = dugWorld(seedFor('desk_clock'));
  const s = await commit(0, {type: 'drill', cell: [0, 0, 3]}, sessionOf(world));
  assert.equal(s.finds.length, 1);
  assert.equal(s.finds[0].kind, 'desk_clock');
  assert.deepEqual(s.findLog, ['desk_clock']);
  assert.deepEqual(s.clockLog, [s.finds[0].stoppedAt]);
  const again = await commit(s.revision, {type: 'drill', cell: [0, 0, 3]}, sessionOf(world));
  assert.equal(again.finds.length, 1);
  const split = await commit(s.revision, {type: 'decompose', find: 'desk_clock', variant: 'standard'});
  assert.deepEqual(split.finds, []);
  assert.deepEqual(split.clockLog, s.clockLog);
});

test('a found drill head replaces a more worn one', async t => {
  const data = mockStorage(t);
  const heads = [{id: 'h1', kind: 'drill_head', variant: 'standard', durability: 80},
    {id: 'h2', kind: 'drill_head', variant: 'standard', durability: 20}];
  data.set(saveKey, JSON.stringify(drilling({drillCondition: 30, finds: heads, findLog: ['drill_head']})));
  await assert.rejects(commit(0, {type: 'equip-head', id: 'h2'}), /드릴 헤드/);
  const s = await commit(0, {type: 'equip-head', id: 'h1'});
  assert.equal(s.drillCondition, 80);
  assert.deepEqual(s.finds.map(p => p.id), ['h2']);
});

test('an unstable find is secured in time or bursts once against the drill', async t => {
  const data = mockStorage(t);
  t.mock.method(Math, 'random', () => 0.5);
  const start = JSON.stringify(drilling({drillCondition: 50}));
  for (const [kind, seconds, damage] of [['pressure_capsule', 4, 10], ['heat_crystal', 5, 8]]) {
    const seed = seedFor(kind);
    for (const [wait, kept] of [[seconds - 0.001, true], [seconds, false]]) {
      data.set(saveKey, start);
      const world = dugWorld(seed);
      const found = await commit(0, {type: 'drill', cell: [0, 0, 3]}, sessionOf(world));
      assert.equal(found.captures[0].expiresAt, seconds);
      world.advance(wait);
      if (kept) {
        const s = await commit(found.revision, {type: 'capture', id: found.captures[0].id}, sessionOf(world));
        assert.deepEqual([s.finds.map(p => p.kind), s.drillCondition], [[kind], found.drillCondition]);
      } else {
        const s = await commit(found.revision, 'checkpoint', sessionOf(world));
        assert.deepEqual([s.finds, s.captures, s.drillCondition], [[], [], found.drillCondition - damage]);
        const later = await commit(s.revision, 'checkpoint', sessionOf(world));
        assert.equal(later.drillCondition, s.drillCondition);
      }
    }
  }
});

test('a version-6 save opens with no finds and malformed finds are rejected', t => {
  const data = mockStorage(t);
  const clean = readSave();
  const old = {...clean, version: 6};
  for (const key of ['finds', 'findLog', 'clockLog']) delete old[key];
  data.set(saveKey, JSON.stringify(old));
  const s = readSave();
  assert.equal(s.version, saveVersion);
  assert.deepEqual([s.finds, s.findLog, s.clockLog], [[], [], []]);
  for (const bad of [{finds: [{id: 'a', kind: 'drill_head', variant: 'standard'}]},
    {finds: [{id: 'a', kind: 'drill_head', variant: 'standard', durability: 101}]},
    {finds: [{id: 'a', kind: 'desk_clock', variant: 'standard'}]},
    {finds: [{id: 'a', kind: 'spoon', variant: 'gold'}]},
    {finds: [{id: 'a', kind: 'toaster', variant: 'standard'}]},
    {clockLog: [720]}]) {
    data.set(saveKey, JSON.stringify({...clean, ...bad}));
    assert.throws(readSave, /원본을 보존/, JSON.stringify(bad));
  }
});
