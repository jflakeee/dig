import assert from 'node:assert/strict';
import { test } from 'node:test';
import { baseCapacity } from '../next/train.js';
import { commit, readSave, saveKey } from '../next/save.js';
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
const session = world => {
  const w = world.snapshot();
  delete w.seed;
  return {pos: [0.5, 0.5, 0.5], velocity: [0, 0, 0], yaw: 0, pitch: 0, sensor: false, entered: -1, world: w};
};
async function flung(t) {
  const data = mockStorage(t);
  data.set(saveKey, JSON.stringify({...readSave(), front: 'drill-1', drills: ['drill-1'], rocks: baseCapacity}));
  const world = createWorld(true, () => 0);
  world.dig(0, 0, 3);
  const s = await commit(0, {type: 'drill', cell: [0, 0, 3]}, session(world));
  return {data, world, s};
}
const pieces = s => s.session.world.chunks.flatMap(c => c.ejected ?? []);

test('a full train keeps mining and flings the piece out of the machine', async t => {
  const {s} = await flung(t);
  const [piece] = pieces(s);
  assert.equal(s.rocks, baseCapacity);
  assert.equal(s.leftBehind, 1);
  assert.equal(piece.mineral, 'rock');
  assert.deepEqual(piece.point, [0.5, 0.5, 3.5]);
  assert.ok(piece.speed[2] > 0, 'flung away from the machine');
  assert.equal(piece.cooldown, 0.8);
  // The same cell and seed fling the same way.
  const again = await flung(t);
  assert.deepEqual(pieces(again.s)[0].speed, piece.speed);
});

test('a flung piece is gathered once when the hold has room', async t => {
  const {data, world, s} = await flung(t);
  const [piece] = pieces(s);
  world.syncEjected(s.session.world.chunks);
  assert.equal(world.ejected().length, 1);
  // Still full: the piece cannot come back yet.
  const held = world.ejected()[0].item;
  held.cooldown = 0;
  assert.equal(world.takeEjected([0.5, 0.5, 3]).id, piece.id);
  await assert.rejects(commit(s.revision, {type: 'collect-ejected', id: piece.id}, session(world)), /가득/);
  // Make room, then gather.
  data.set(saveKey, JSON.stringify({...readSave(), rocks: baseCapacity - 5}));
  const room = readSave();
  const got = await commit(room.revision, {type: 'collect-ejected', id: piece.id}, session(world));
  assert.equal(got.rocks, baseCapacity - 4);
  assert.equal(pieces(got).length, 0);
  await assert.rejects(commit(got.revision, {type: 'collect-ejected', id: piece.id}, session(world)), /회수할/);
});

test('a piece the session still holds cannot be gathered', async t => {
  const {data, s} = await flung(t);
  data.set(saveKey, JSON.stringify({...readSave(), rocks: 1}));
  const room = readSave();
  await assert.rejects(commit(room.revision, {type: 'collect-ejected', id: pieces(s)[0].id}, s.session), /회수할/);
});

test('malformed flung pieces are rejected', async t => {
  const {data, s} = await flung(t);
  const bad = structuredClone(s);
  bad.session.world.chunks.find(c => c.ejected).ejected[0].mineral = 'unobtainium';
  data.set(saveKey, JSON.stringify(bad));
  assert.throws(() => readSave(), /읽을 수 없습니다/);
});

test('flung pieces fall, settle and wait out their cooldown', () => {
  const world = createWorld(true, () => 0);
  world.dig(0, 0, 3);
  world.syncEjected([{...world.snapshot().chunks[0], ejected: [{id: 'p', point: [0.5, 0.5, 3.5], speed: [0, 2, 0], cooldown: 0.8, mineral: 'rock', variant: 'granite'}]}]);
  const item = world.ejected()[0].item;
  assert.equal(world.takeEjected([0.5, 0.5, 3.5], [0, 2, 0]), null, 'cooldown holds it back');
  let damage = 0;
  for (let i = 0; i < 120; i++) damage += world.hullContacts(1 / 30, [0.5, 0.5, 0.5], [0, 0, 0], false).damage;
  assert.equal(item.cooldown, 0);
  assert.ok(Math.hypot(...item.speed) < 0.5, 'settled');
  assert.ok(item.point.every((v, i) => Math.abs(v - [0.5, 0.5, 3.5][i]) < 1), 'stays in its dug cell');
  assert.equal(damage, 0);
  assert.equal(world.takeEjected(item.point, item.speed).id, 'p');
  assert.equal(world.ejected().length, 0);
});
