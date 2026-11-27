import assert from 'node:assert/strict';
import { test } from 'node:test';
import { commit, readSave, saveKey, decompositionPreview, sellPrice } from '../next/save.js';
import { parts, partsOf, partPiece } from '../next/parts.js';
import { findById } from '../next/finds.js';

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
const item = (kind, variant = 'standard', id = kind) => ({id, kind, variant});

test('every everyday item splits into parts whose shares make the whole', () => {
  for (const f of ['desk_fan', 'lunch_box', 'teacup', 'brown_bottle', 'desk_clock', 'handkerchief', 'earphones']) {
    const got = partsOf(f, 'standard');
    assert.ok(got.length > 0, f);
    assert.ok(Math.abs(got.reduce((n, id) => n + parts[id].share, 0) - 1) < 1e-9, f);
    assert.ok(Math.abs(got.reduce((n, id) => n + partPiece(id).grams, 0) - findById(f).grams) < 1e-9);
  }
  assert.deepEqual(partsOf('spoon', 'nickel'), ['nickel_scrap']);
  assert.deepEqual(partsOf('spoon', 'chromium'), ['alloy_scrap']);
  assert.deepEqual(partsOf('focus_lamp', 'standard'), []);
});

test('salvage takes an item apart with nothing lost; parts are refired, decomposed or sold', async t => {
  const data = mockStorage(t);
  start(data, {finds: [item('teacup', 'standard', 'a'), item('teacup', 'standard', 'b'), {...item('desk_clock', 'standard', 'c'), stoppedAt: 0}], clockLog: [], findLog: ['teacup', 'desk_clock']});
  let s = await commit(0, {type: 'salvage', find: 'teacup', variant: 'standard'});
  s = await commit(s.revision, {type: 'salvage', find: 'teacup', variant: 'standard'});
  assert.deepEqual(s.parts, {ceramic_shard: 2});
  s = await commit(s.revision, 'refire-shards');
  assert.deepEqual([s.ceramic, s.parts], [1, {}]);
  s = await commit(s.revision, {type: 'salvage', find: 'desk_clock', variant: 'standard'});
  assert.deepEqual(s.parts, {brass_gear: 1, steel_spring: 1});
  const preview = decompositionPreview(s, {part: 'brass_gear'});
  assert.equal(preview.grams, 300);
  s = await commit(s.revision, {type: 'decompose', part: 'brass_gear'});
  assert.ok(s.elements.Cu > 0 && s.elements.Zn > 0);
  const price = sellPrice(s, {source: 'p', kind: 'steel_spring'});
  assert.ok(price > 0);
  s = await commit(s.revision, {type: 'sell', source: 'p', kind: 'steel_spring', price});
  assert.deepEqual(s.parts, {});
  await assert.rejects(commit(s.revision, {type: 'salvage', find: 'desk_clock', variant: 'standard'}), /부품으로 나눌 물품이 없습니다/);
});

test('a light plate patches the hull and two mechanical parts can maintain equipment', async t => {
  const data = mockStorage(t);
  start(data, {parts: {light_plate: 1, motor_coil: 1, steel_shaft: 1}, topics: {done: ['mineral_assay', 'part_structure'], job: null},
    finds: [{id: 'lamp', kind: 'focus_lamp', variant: 'standard', durability: 40}]});
  const session = {hull: 60, pos: [0.5, 0.5, 0.5], velocity: [0, 0, 0], yaw: 0, pitch: 0, sensor: false, entered: -1,
    world: (() => { const w = readSave().session?.world; return w; })()};
  delete session.world;
  await assert.rejects(commit(0, {type: 'patch-hull'}), /덧댈 수 없습니다/, 'needs the hull in the session');
  let s = await commit(0, {type: 'maintain', id: 'lamp', parts: true});
  assert.equal(s.finds[0].durability, 80);
  assert.deepEqual(s.parts, {light_plate: 1});
  await assert.rejects(commit(s.revision, {type: 'maintain', id: 'lamp', parts: true}), /정비 재료가 부족/);
});

test('a version-20 save starts with no parts and unknown parts are rejected', t => {
  const data = mockStorage(t);
  const {parts: _, ...old} = readSave();
  data.set(saveKey, JSON.stringify({...old, version: 20}));
  assert.deepEqual(readSave().parts, {});
  data.set(saveKey, JSON.stringify({...readSave(), parts: {warp_core: 1}}));
  assert.throws(() => readSave(), /읽을 수 없습니다/);
});
