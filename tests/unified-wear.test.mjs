import assert from 'node:assert/strict';
import { test } from 'node:test';
import { commit, readSave, saveKey, maxWear } from '../next/save.js';

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

test('every drill repair wears the maximum by 0-3 points, the same way on a reload', async t => {
  const data = mockStorage(t);
  const run = async () => {
    start(data, {marketSeed: 77, drillCondition: 10, drillMax: 100, repairCount: 0, ceramic: 30});
    let s = readSave(), wears = [];
    for (let i = 0; i < 30; i++) {
      const before = s.drillMax;
      data.set(saveKey, JSON.stringify({...s, drillCondition: 0}));
      s = await commit(s.revision, 'repair');
      wears.push(before - s.drillMax);
      assert.equal(s.drillCondition, s.drillMax);
    }
    return wears;
  };
  const wears = await run();
  assert.ok(wears.every(w => Number.isInteger(w) && w >= 0 && w <= maxWear));
  assert.ok(new Set(wears).size > 1, 'the amount varies');
  assert.deepEqual(await run(), wears, 'fixed by the seed and the repair count');
});

test('a worn-out drill cannot be repaired; a new head brings its own maximum', async t => {
  const data = mockStorage(t);
  start(data, {drillCondition: 0, drillMax: 0, ceramic: 1,
    finds: [{id: 'h', kind: 'drill_head', variant: 'standard', durability: 80, maxDurability: 90}]});
  await assert.rejects(commit(0, 'repair'), /수명이 다했습니다/);
  const s = await commit(0, {type: 'equip-head', id: 'h'});
  assert.deepEqual([s.drillCondition, s.drillMax], [80, 90]);
});

test('worn-out equipment cannot be maintained; old saves start at full maximum; a drill above its maximum is rejected', async t => {
  const data = mockStorage(t);
  start(data, {minerals: {iron: 2, copper_ore: 1}, topics: {done: ['mineral_assay', 'part_structure'], job: null},
    finds: [{id: 'lamp', kind: 'focus_lamp', variant: 'standard', durability: 0, maxDurability: 0}]});
  await assert.rejects(commit(0, {type: 'maintain', id: 'lamp'}), /수명이 다했습니다/);
  const {drillMax, repairCount, ...old} = readSave();
  data.set(saveKey, JSON.stringify({...old, version: 22}));
  assert.deepEqual([readSave().drillMax, readSave().repairCount], [100, 0]);
  data.set(saveKey, JSON.stringify({...readSave(), drillCondition: 90, drillMax: 80}));
  assert.throws(() => readSave(), /읽을 수 없습니다/);
});
