import assert from 'node:assert/strict';
import { test } from 'node:test';
import { slots, drillInterval, sensorRange, anchorMass, captureBonus } from '../next/equipment.js';
import { hitHull } from '../next/debris.js';
import { finds } from '../next/finds.js';
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
const piece = (id, kind, durability = 50) => ({id, kind, variant: 'standard', durability});
const drilling = extra => ({...readSave(), front: 'drill-1', drills: ['drill-1'], ...extra});

test('the seven non-head equipment kinds each have their own slot', () => {
  const equipment = finds.filter(f => f.category === 'equipment' && f.id !== 'drill_head').map(f => f.id).sort();
  assert.deepEqual(Object.keys(slots).sort(), equipment);
  assert.equal(new Set(Object.values(slots).map(s => s.slot)).size, 7);
});

test('a fitted piece changes its effect only while it still works', () => {
  const fit = (slot, kind, durability = 50) => ({equipment: {[slot]: piece('p', kind, durability)}});
  assert.deepEqual([drillInterval({}), drillInterval(fit('aux', 'aux_drill')), drillInterval(fit('aux', 'aux_drill', 0))], [0.16, 0.12, 0.16]);
  assert.deepEqual([sensorRange({}), sensorRange(fit('sensor', 'gravity_array'))], [32, 64]);
  assert.deepEqual([anchorMass({}), anchorMass(fit('chain', 'chain_winder'))], [48, 72]);
  assert.equal(captureBonus(fit('gripper', 'buffer_gripper'), 'pressure_capsule'), 2);
  assert.equal(captureBonus(fit('gripper', 'buffer_gripper'), 'hydrogen'), 0);
  assert.equal(captureBonus(fit('cartridge', 'seal_cartridge'), 'mercury'), 2);
  assert.equal(captureBonus(fit('cartridge', 'seal_cartridge', 0), 'mercury'), 0);
  // A heavier anchored hull is pushed less by the same fragment.
  const part = {point: [0, 0, 1], speed: [0, 0, -6], mass: 20};
  const push = anchored => Math.hypot(...hitHull({...part}, [0, 0, 0], [0, 0, 0], anchored));
  assert.ok(push(72) < push(true) && push(true) < push(false));
});

test('fitting, swapping and removing equipment keep every piece in one place', async t => {
  const data = mockStorage(t);
  const a = piece('a', 'focus_lamp', 40), b = piece('b', 'focus_lamp', 90);
  data.set(saveKey, JSON.stringify(drilling({finds: [a, b, piece('h', 'drill_head'), {id: 's', kind: 'spoon', variant: 'chromium'}],
    findLog: ['focus_lamp', 'drill_head', 'spoon']})));
  let s = await commit(0, {type: 'equip', id: 'a'});
  assert.deepEqual(s.equipment, {lamp: a});
  s = await commit(s.revision, {type: 'equip', id: 'b'});
  assert.deepEqual(s.equipment, {lamp: b});
  assert.deepEqual(s.finds.map(p => p.id).sort(), ['a', 'h', 's']);
  for (const id of ['h', 's', 'missing']) await assert.rejects(commit(s.revision, {type: 'equip', id}), /장착할 장비/);
  s = await commit(s.revision, {type: 'unequip', slot: 'lamp'});
  assert.deepEqual(s.equipment, {});
  assert.equal(s.finds.length, 4);
  await assert.rejects(commit(s.revision, {type: 'unequip', slot: 'lamp'}), /장착된 장비/);
});

test('an auxiliary drill wears with the drill strokes and a cartridge lengthens a capture', async t => {
  const data = mockStorage(t);
  const {chunk, index} = cellOwner(0, 0, 3);
  let seed = 0;
  while (blockDiscovery(seed, chunk.join(',') + ':0:cell' + index)?.kind !== 'hydrogen') seed++;
  data.set(saveKey, JSON.stringify(drilling({equipment: {aux: piece('x', 'aux_drill', 3), cartridge: piece('c', 'seal_cartridge')}})));
  t.mock.method(Math, 'random', () => 0);
  const world = createWorld(true, () => 0, undefined, undefined, undefined, undefined, seed);
  world.dig(0, 0, 3);
  const s = await commit(0, {type: 'drill', cell: [0, 0, 3]},
    {pos: [0.5, 0.5, 0.5], velocity: [0, 0, 0], yaw: 0, pitch: 0, sensor: false, entered: -1, world: world.snapshot()});
  assert.equal(s.equipment.aux.durability, 1);
  assert.equal(s.captures[0].seconds, 8);
  assert.equal(s.captures[0].expiresAt, 8);
});

test('a version-9 save opens with no fitted equipment and mismatched slots are rejected', t => {
  const data = mockStorage(t);
  const clean = readSave();
  const old = {...clean, version: 9};
  delete old.equipment;
  data.set(saveKey, JSON.stringify(old));
  assert.deepEqual([readSave().version, readSave().equipment], [saveVersion, {}]);
  for (const bad of [{equipment: {aux: piece('x', 'focus_lamp')}}, {equipment: {lamp: piece('x', 'focus_lamp', 101)}},
    {equipment: {lamp: piece('x', 'focus_lamp')}, finds: [piece('x', 'chain_winder')]}]) {
    data.set(saveKey, JSON.stringify({...clean, ...bad}));
    assert.throws(readSave, /원본을 보존/, JSON.stringify(bad));
  }
});
