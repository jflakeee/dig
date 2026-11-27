import assert from 'node:assert/strict';
import { test } from 'node:test';
import { trainLength, capacity, load, wagonsBeyondSafe, baseCapacity, wagonCapacity } from '../next/train.js';
import { commit, readSave, saveKey, saveVersion } from '../next/save.js';
import { createWorld } from '../next/world.js';

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
const coupler = {coupler: {id: 'c', kind: 'cargo_coupler', variant: 'standard', durability: 60}};
const drilling = extra => ({...readSave(), front: 'drill-1', drills: ['drill-1'], ...extra});
const wagons = n => Array.from({length: n}, (_, i) => 'wagon-' + (i + 1));

test('the train is 2 m plus 3 m a wagon and carries 120 plus 80 a wagon', () => {
  assert.deepEqual([0, 4, 5].map(n => trainLength({wagons: wagons(n)})), [2, 14, 17]);
  assert.deepEqual([0, 2].map(n => capacity({wagons: wagons(n)})), [baseCapacity, baseCapacity + 2 * wagonCapacity]);
  assert.equal(load({rocks: 3, minerals: {iron: 2, gold: 1}}), 6);
  assert.deepEqual(wagonsBeyondSafe({wagons: wagons(6)}), ['wagon-5', 'wagon-6']);
});

test('a full machine leaves mined pieces where they lie', async t => {
  const data = mockStorage(t);
  data.set(saveKey, JSON.stringify(drilling({rocks: baseCapacity})));
  const world = createWorld(true, () => 0);
  world.dig(0, 0, 3);
  const w = world.snapshot();
  delete w.seed;
  const s = await commit(0, {type: 'drill', cell: [0, 0, 3]},
    {pos: [0.5, 0.5, 0.5], velocity: [0, 0, 0], yaw: 0, pitch: 0, sensor: false, entered: -1, world: w});
  assert.deepEqual([s.rocks, s.leftBehind, s.blocksMined], [baseCapacity, 1, 1]);
});

test('wagons need a coupler and materials, and past 16 m need confirmation', async t => {
  const data = mockStorage(t);
  data.set(saveKey, JSON.stringify(drilling({rocks: 70, minerals: {iron: 20}, variants: {'iron:magnetite': 2}})));
  await assert.rejects(commit(0, {type: 'add-wagon'}), /화물 연결기/);
  data.set(saveKey, JSON.stringify({...readSave(), equipment: coupler}));
  let s = readSave();
  for (let i = 0; i < 4; i++) s = await commit(s.revision, {type: 'add-wagon'});
  // Iron is spent from its first sub-species (hematite) before magnetite.
  assert.deepEqual([s.wagons, trainLength(s), s.rocks, s.minerals.iron, s.variants], [wagons(4), 14, 30, 8, {'iron:magnetite': 2}]);
  await assert.rejects(commit(s.revision, {type: 'add-wagon'}), /16m를 넘습니다/);
  s = await commit(s.revision, {type: 'add-wagon', confirm: true});
  assert.equal(trainLength(s), 17);
  await assert.rejects(commit(s.revision, {type: 'unequip', slot: 'coupler'}), /화물칸을 먼저 분리/);
  s = await commit(s.revision, {type: 'remove-wagon'});
  assert.deepEqual(s.wagons, wagons(4));
  data.set(saveKey, JSON.stringify({...s, rocks: baseCapacity + 3 * wagonCapacity + 1}));
  await assert.rejects(commit(s.revision, {type: 'remove-wagon'}), /먼저 비워/);
  data.set(saveKey, JSON.stringify({...s, rocks: 2, minerals: {iron: 1}, variants: {}}));
  await assert.rejects(commit(s.revision, {type: 'add-wagon', confirm: true}), /재료가 부족/);
});

test('crossing a chunk with a train over 16 m loses the far wagons and the cargo that no longer fits', async t => {
  const data = mockStorage(t);
  const full = baseCapacity + 6 * wagonCapacity;
  data.set(saveKey, JSON.stringify(drilling({equipment: coupler, wagons: wagons(6), wagonCount: 6,
    rocks: full - 50, minerals: {gold: 50}})));
  let s = await commit(0, {type: 'cross-chunk'});
  assert.deepEqual(s.wagons, wagons(4));
  assert.equal(load(s), capacity(s));
  assert.deepEqual([s.rocks, s.minerals.gold], [capacity(s) - 50, 50]);
  s = await commit(s.revision, {type: 'cross-chunk'});
  assert.deepEqual(s.wagons, wagons(4));
});

test('a portal too small for wagons leaves every wagon behind', async t => {
  const data = mockStorage(t);
  const start = drilling({equipment: coupler, wagons: wagons(2), wagonCount: 2, rocks: baseCapacity + 30});
  data.set(saveKey, JSON.stringify(start));
  const wide = await commit(0, {type: 'transit', radius: 2, strength: 1});
  assert.deepEqual(wide.wagons, wagons(2));
  data.set(saveKey, JSON.stringify(start));
  const narrow = await commit(0, {type: 'transit', radius: 0.5, strength: 1});
  assert.deepEqual([narrow.wagons, narrow.rocks], [[], baseCapacity]);
});

test('a version-13 save opens without wagons and malformed train state is rejected', t => {
  const data = mockStorage(t);
  const clean = readSave();
  const old = {...clean, version: 13};
  for (const k of ['wagons', 'wagonCount', 'leftBehind']) delete old[k];
  data.set(saveKey, JSON.stringify(old));
  assert.deepEqual([readSave().version, readSave().wagons, readSave().wagonCount, readSave().leftBehind], [saveVersion, [], 0, 0]);
  for (const bad of [{wagons: ['car']}, {wagons: ['wagon-1', 'wagon-1'], wagonCount: 2}, {wagons: ['wagon-1'], wagonCount: 0}, {leftBehind: -1}]) {
    data.set(saveKey, JSON.stringify({...clean, ...bad}));
    assert.throws(readSave, /원본을 보존/, JSON.stringify(bad));
  }
});

test('driving slows with a fuller hold and more wagons, never below 60%', async () => {
  const { speedFactor, carFill } = await import('../next/train.js');
  assert.equal(speedFactor({rocks: 0, minerals: {}, wagons: []}), 1);
  assert.equal(speedFactor({rocks: baseCapacity, minerals: {}, wagons: []}), 0.75);
  assert.ok(Math.abs(speedFactor({rocks: 0, minerals: {}, wagons: wagons(2)}) - 0.94) < 1e-9);
  assert.equal(speedFactor({rocks: 10000, minerals: {}, wagons: wagons(8)}), 0.6);
  assert.deepEqual(carFill({rocks: baseCapacity + 40, minerals: {}, wagons: wagons(2)}), [1, 0.5, 0]);
  assert.deepEqual(carFill({rocks: 60, minerals: {}, wagons: []}), [0.5]);
});
