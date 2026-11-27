import assert from 'node:assert/strict';
import { test } from 'node:test';
import { commit, readSave, saveKey } from '../next/save.js';
import { topics, ceramicRocks, impactShare, freshTopics } from '../next/research.js';

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
const elements = {Si: 10, Al: 10, O: 10, Fe: 10, Ni: 10};

test('a topic needs its prerequisite, spends energy and grams, and finishes on the market clock', async t => {
  const data = mockStorage(t);
  start(data, {elements, elementLog: Object.keys(elements).sort()});
  await assert.rejects(commit(0, {type: 'study-topic', id: 'ceramic_firing'}), /연구할 수 없는/);
  let s = await commit(0, {type: 'study-topic', id: 'mineral_assay'});
  assert.equal(s.energy, 100 - topics.mineral_assay.energy);
  assert.ok(Math.abs(s.elements.Si - 7) < 1e-9);
  assert.equal(s.topics.job.id, 'mineral_assay');
  await assert.rejects(commit(s.revision, {type: 'study-topic', id: 'portal_emission'}), /연구할 수 없는/, 'one at a time');
  data.set(saveKey, JSON.stringify({...readSave(), marketTime: s.marketTime + topics.mineral_assay.seconds}));
  s = await commit(s.revision, 'checkpoint');
  assert.deepEqual(s.topics, {done: ['mineral_assay'], job: null});
  assert.equal(s.actions.research, 1);
});

test('unlocks: cheaper ceramic, equipment maintenance and softer impacts', async t => {
  const data = mockStorage(t);
  assert.equal(ceramicRocks({topics: freshTopics()}), 3);
  assert.equal(impactShare({topics: freshTopics()}), 1);
  const done = {done: ['mineral_assay', 'ceramic_firing', 'part_structure', 'portal_emission'], job: null};
  assert.equal(ceramicRocks({topics: done}), 2);
  assert.equal(impactShare({topics: done}), 0.7);
  start(data, {topics: done, rocks: 2, minerals: {iron: 2, copper_ore: 1},
    finds: [{id: 'lamp', kind: 'focus_lamp', variant: 'standard', durability: 70}]});
  let s = await commit(0, 'fire-ceramic');
  assert.deepEqual([s.ceramic, s.rocks], [1, 0]);
  s = await commit(s.revision, {type: 'maintain', id: 'lamp'});
  assert.ok(s.finds[0].maxDurability >= 97 && s.finds[0].maxDurability <= 100);
  assert.equal(s.finds[0].durability, s.finds[0].maxDurability);
  assert.deepEqual([s.minerals.iron ?? 0, s.minerals.copper_ore ?? 0], [0, 0]);
  assert.equal(s.actions.repair, 1);
  await assert.rejects(commit(s.revision, {type: 'maintain', id: 'lamp'}), /정비할 장비가 없습니다/);
});

test('maintenance waits for part structure; a version-19 save starts with no topics', async t => {
  const data = mockStorage(t);
  start(data, {minerals: {iron: 2, copper_ore: 1}, finds: [{id: 'lamp', kind: 'focus_lamp', variant: 'standard', durability: 50}]});
  await assert.rejects(commit(0, {type: 'maintain', id: 'lamp'}), /정비할 장비가 없습니다/);
  const {topics: _, ...old} = readSave();
  data.set(saveKey, JSON.stringify({...old, version: 19}));
  assert.deepEqual(readSave().topics, freshTopics());
  data.set(saveKey, JSON.stringify({...readSave(), topics: {done: ['ceramic_firing'], job: null}}));
  assert.throws(() => readSave(), /읽을 수 없습니다/, 'a topic without its prerequisite');
});
