import assert from 'node:assert/strict';
import { test } from 'node:test';
import { commit, readSave, saveKey, decomposeQueue } from '../next/save.js';
import { energyCost } from '../next/energy.js';

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

test('decompose all takes every kind not kept, as far as energy goes', async t => {
  const data = mockStorage(t);
  start(data, {rocks: 3, minerals: {iron: 2}, parts: {light_plate: 1}, finds: [{id: 'a', kind: 'spoon', variant: 'nickel'}], findLog: ['spoon'], energy: 100});
  let s = await commit(0, {type: 'keep', key: 'm:iron', on: true});
  assert.deepEqual(s.keep, ['m:iron']);
  assert.equal(decomposeQueue(s).length, 1 + 1 + 3, 'part, spoon and three rocks; iron kept');
  s = await commit(s.revision, {type: 'decompose-all'});
  assert.deepEqual([s.rocks, s.minerals.iron, s.parts, s.finds.length], [0, 2, {}, 0]);
  assert.equal(s.energy, 100 - 5 * energyCost.decompose);
  await assert.rejects(commit(s.revision, {type: 'decompose-all'}), /분해할 화물이 없습니다/);
  s = await commit(s.revision, {type: 'keep', key: 'm:iron', on: false});
  assert.deepEqual(s.keep, []);
});

test('energy caps one press; bad keys are refused; a version-21 save keeps nothing', async t => {
  const data = mockStorage(t);
  start(data, {rocks: 10, energy: 12});
  const s = await commit(0, {type: 'decompose-all'});
  assert.deepEqual([s.rocks, s.energy], [8, 2]);
  await assert.rejects(commit(s.revision, {type: 'decompose-all'}), /에너지 부족/);
  await assert.rejects(commit(s.revision, {type: 'keep', key: 'x:rock', on: true}), /보관 설정 오류/);
  const {keep, ...old} = readSave();
  data.set(saveKey, JSON.stringify({...old, version: 21}));
  assert.deepEqual(readSave().keep, []);
});
