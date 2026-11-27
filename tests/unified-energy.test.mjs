import assert from 'node:assert/strict';
import { test } from 'node:test';
import { commit, readSave, saveKey } from '../next/save.js';
import { energyCap, energyCost, addEnergy } from '../next/energy.js';
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
const start = (data, extra) => data.set(saveKey, JSON.stringify({...readSave(), revision: 0, front: 'drill-1', drills: ['drill-1'], variants: {}, ...extra}));

test('active work spends energy; short energy refuses only that work and changes nothing', async t => {
  const data = mockStorage(t);
  start(data, {rocks: 6, energy: 15});
  let s = await commit(0, 'fire-ceramic');
  assert.deepEqual([s.energy, s.ceramic, s.rocks], [15 - energyCost['fire-ceramic'], 1, 3]);
  await assert.rejects(commit(s.revision, 'fire-ceramic'), /에너지 부족 · 필요 10/);
  assert.deepEqual([readSave().energy, readSave().rocks], [5, 3]);
  s = await commit(s.revision, 'checkpoint');
  assert.equal(s.energy, 5, 'saving, driving and sensing cost nothing');
});

test('breaking blocks recovers energy up to the cap: drilling a little, the laser more', async t => {
  const data = mockStorage(t);
  start(data, {energy: 10});
  const world = createWorld(true, () => 0);
  const cells = [[0, 0, 3], [1, 0, 3]];
  for (const c of cells) world.dig(...c);
  const w = world.snapshot();
  delete w.seed;
  const session = {pos: [0.5, 0.5, 0.5], velocity: [0, 0, 0], yaw: 0, pitch: 0, sensor: false, entered: -1, world: w};
  let s = await commit(0, {type: 'drill', cell: cells[0], cells}, session);
  assert.equal(s.energy, 11);
  const again = await commit(s.revision, {type: 'drill', cell: cells[0], cells}, session);
  assert.equal(again.energy, 11, 'a cell already cut gives nothing again');
  const full = {energy: energyCap - 0.5};
  addEnergy(full, 2);
  assert.equal(full.energy, energyCap, 'past the cap is lost');
});

test('a version-18 save starts full and an impossible energy is rejected', t => {
  const data = mockStorage(t);
  const {energy, ...old} = readSave();
  data.set(saveKey, JSON.stringify({...old, version: 18}));
  assert.equal(readSave().energy, energyCap);
  data.set(saveKey, JSON.stringify({...readSave(), energy: 101}));
  assert.throws(() => readSave(), /읽을 수 없습니다/);
});
