import assert from 'node:assert/strict';
import { test } from 'node:test';
import { commit, readSave, saveKey } from '../next/save.js';
import { craftRecipes, hullRepairFor, affords } from '../next/craft.js';
import { slots } from '../next/equipment.js';
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
const start = (data, extra) => data.set(saveKey, JSON.stringify({...readSave(), front: 'drill-1', drills: ['drill-1'], ...extra}));
const session = hull => {
  const w = createWorld(true, () => 0).snapshot();
  delete w.seed;
  return {hull, pos: [0.5, 0.5, 0.5], velocity: [0, 0, 0], yaw: 0, pitch: 0, sensor: false, entered: -1, world: w};
};

test('every slot item has a recipe', () => {
  assert.deepEqual(Object.keys(craftRecipes).sort(), ['drill_head', ...Object.keys(slots)].sort());
});

test('crafting spends minerals and stores the piece at full durability', async t => {
  const data = mockStorage(t);
  start(data, {rocks: 10, minerals: {iron: 4}, variants: {}});
  const s = await commit(0, {type: 'craft-equipment', kind: 'cargo_coupler'});
  assert.deepEqual([s.rocks, s.minerals.iron], [5, 1]);
  assert.deepEqual(s.finds.at(-1), {id: 'craft-0', kind: 'cargo_coupler', variant: 'standard', durability: 100});
  assert.equal(s.actions.equip, 1);
  await assert.rejects(commit(s.revision, {type: 'craft-equipment', kind: 'cargo_coupler'}), /재료가 부족/);
  await assert.rejects(commit(s.revision, {type: 'craft-equipment', kind: 'desk_clock'}), /제작할 수 없는/);
  // The crafted piece fits its slot.
  const fitted = await commit(s.revision, {type: 'equip', id: 'craft-0'});
  assert.equal(fitted.equipment.coupler.durability, 100);
});

test('the hull mends from rock first, then iron, and stops at 100', async t => {
  const data = mockStorage(t);
  start(data, {rocks: 3, minerals: {iron: 1}, variants: {}});
  let s = await commit(0, {type: 'repair-hull'}, session(60));
  assert.deepEqual([s.rocks, s.minerals.iron, s.session.hull], [1, 1, 65]);
  s = await commit(s.revision, {type: 'repair-hull'}, session(65));
  assert.deepEqual([s.rocks, s.minerals.iron ?? 0, s.session.hull], [1, 0, 75]);
  await assert.rejects(commit(s.revision, {type: 'repair-hull'}, session(75)), /수리할 수 없습니다/);
  start(data, {rocks: 4, revision: s.revision});
  s = await commit(s.revision, {type: 'repair-hull'}, session(98));
  assert.equal(s.session.hull, 100);
  await assert.rejects(commit(s.revision, {type: 'repair-hull'}, session(100)), /수리할 수 없습니다/);
  assert.equal(s.actions.repair, 0, 'automatic hull repair is not an ending choice');
});

test('repair choice follows the cargo', () => {
  assert.equal(hullRepairFor({rocks: 1, minerals: {}}), null);
  assert.equal(hullRepairFor({rocks: 2, minerals: {}}).gain, 5);
  assert.equal(hullRepairFor({rocks: 0, minerals: {iron: 1}}).gain, 10);
  assert.ok(affords({rocks: 5, minerals: {iron: 3}}, craftRecipes.cargo_coupler));
});
