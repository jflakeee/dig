import assert from 'node:assert/strict';
import { test } from 'node:test';
import { commit, readSave, saveKey, saveVersion, variantCounts } from '../next/save.js';

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

test('decomposing one piece spends it and adds its element units in the same save', async t => {
  const data = mockStorage(t);
  data.set(saveKey, JSON.stringify(drilling({minerals: {copper_ore: 3}, variants: {'copper_ore:malachite': 1}})));
  const first = await commit(0, {type: 'decompose', mineral: 'copper_ore', variant: 'chalcopyrite'});
  assert.deepEqual(first.elements, {Cu: 1, Fe: 1, S: 2});
  assert.deepEqual(first.elementLog, ['Cu', 'Fe', 'S']);
  assert.equal(first.minerals.copper_ore, 2);
  assert.deepEqual(variantCounts(first, 'copper_ore'), {chalcopyrite: 1, malachite: 1, native: 0});
  const second = await commit(first.revision, {type: 'decompose', mineral: 'copper_ore', variant: 'malachite'});
  assert.deepEqual(second.elements, {Cu: 3, Fe: 1, S: 2, C: 1, O: 5, H: 2});
  assert.deepEqual(second.elementLog, ['Cu', 'Fe', 'S', 'C', 'O', 'H']);
  assert.deepEqual(second.variants, {});
  assert.equal(JSON.parse(data.get(saveKey)).revision, second.revision);
});

test('decomposing rock spends the chosen sub-species and keeps the total in step', async t => {
  const data = mockStorage(t);
  data.set(saveKey, JSON.stringify(drilling({rocks: 2, variants: {'rock:limestone': 1}})));
  const s = await commit(0, {type: 'decompose', mineral: 'rock', variant: 'granite'});
  assert.equal(s.rocks, 1);
  assert.deepEqual(s.elements, {K: 1, Al: 1, Si: 3, O: 8});
  assert.deepEqual(variantCounts(s, 'rock'), {granite: 0, basalt: 0, limestone: 1, arkose: 0});
  const last = await commit(s.revision, {type: 'decompose', mineral: 'rock', variant: 'limestone'});
  assert.equal(last.rocks, 0);
  assert.deepEqual(last.variants, {});
  assert.equal(last.elements.O, 11);
});

test('decomposition is refused without the piece, before the drill, for unknown input or a stale revision', async t => {
  const data = mockStorage(t);
  const before = JSON.stringify(drilling({minerals: {iron: 1}}));
  data.set(saveKey, before);
  await assert.rejects(commit(0, {type: 'decompose', mineral: 'iron', variant: 'magnetite'}), /분해할 원료/);
  await assert.rejects(commit(0, {type: 'decompose', mineral: 'iron', variant: 'gold'}), /분해할 원료/);
  await assert.rejects(commit(0, {type: 'decompose', mineral: 'rock', variant: 'granite'}), /분해할 원료/);
  assert.equal(data.get(saveKey), before);
  const done = await commit(0, {type: 'decompose', mineral: 'iron', variant: 'hematite'});
  assert.deepEqual(done.minerals, {});
  await assert.rejects(commit(0, {type: 'decompose', mineral: 'iron', variant: 'hematite'}), /다른 탭/);
  data.set(saveKey, JSON.stringify({...JSON.parse(before), front: null, drills: [], rocks: 2}));
  await assert.rejects(commit(0, {type: 'decompose', mineral: 'rock', variant: 'granite'}), /분해할 원료/);
});

test('a version-4 save opens with an empty element inventory and invalid symbols are rejected', t => {
  const data = mockStorage(t);
  const clean = readSave();
  const old = {...clean, version: 4, rocks: 4};
  delete old.elements;
  delete old.elementLog;
  data.set(saveKey, JSON.stringify(old));
  const s = readSave();
  assert.equal(s.version, saveVersion);
  assert.deepEqual([s.elements, s.elementLog, s.rocks], [{}, [], 4]);
  for (const bad of [{elements: {Xx: 1}, elementLog: ['Xx']}, {elements: {Fe: 1}, elementLog: []},
    {elements: {Fe: 0}, elementLog: ['Fe']}, {elements: {}, elementLog: ['Fe', 'Fe']}]) {
    data.set(saveKey, JSON.stringify({...clean, ...bad}));
    assert.throws(readSave, /원본을 보존/, JSON.stringify(bad));
  }
});
