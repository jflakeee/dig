import assert from 'node:assert/strict';
import { test } from 'node:test';
import { commit, readSave, saveKey } from '../next/save.js';
import { upgradeCost, cellsPerStroke, bodyRadius, drillCount } from '../next/upgrades.js';
import { capacity, carFill } from '../next/train.js';
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
const start = (data, extra) => data.set(saveKey, JSON.stringify({...readSave(), front: 'drill-1', drills: ['drill-1'], variants: {}, ...extra}));

test('the next level costs the base times that level and stops at the top', () => {
  assert.deepEqual(upgradeCost({upgrades: {wagon: 0}}, 'wagon'), {iron: 3, rock: 8});
  assert.deepEqual(upgradeCost({upgrades: {wagon: 2}}, 'wagon'), {iron: 9, rock: 24});
  assert.equal(upgradeCost({upgrades: {drills: 3}}, 'drills'), null);
});

test('upgrades widen the hold, the body and the cut', () => {
  const s = {upgrades: {body: 2, wagon: 1, drills: 2, bore: 1}, wagons: ['w1', 'w2']};
  assert.equal(capacity(s), 120 + 120 + 2 * 120);
  assert.deepEqual(carFill({...s, rocks: 300, minerals: {}}), [1, 60 / 120, 0]);
  assert.ok(Math.abs(bodyRadius(s) - 0.92 * 1.4) < 1e-9);
  assert.equal(drillCount(s), 3);
  assert.equal(cellsPerStroke(s), 6);
  assert.equal(cellsPerStroke({}), 1);
});

test('an upgrade spends minerals, levels once and counts as equipment work', async t => {
  const data = mockStorage(t);
  start(data, {rocks: 30, minerals: {iron: 20}});
  let s = await commit(0, {type: 'upgrade', id: 'wagon'});
  assert.deepEqual([s.upgrades.wagon, s.rocks, s.minerals.iron, s.actions.equip], [1, 22, 17, 1]);
  s = await commit(s.revision, {type: 'upgrade', id: 'wagon'});
  assert.deepEqual([s.upgrades.wagon, s.rocks, s.minerals.iron], [2, 6, 11]);
  await assert.rejects(commit(s.revision, {type: 'upgrade', id: 'wagon'}), /재료가 부족/);
  await assert.rejects(commit(s.revision, {type: 'upgrade', id: 'warp'}), /강화할 수 없습니다/);
});

test('several drills pay every cut cell once in one save', async t => {
  const data = mockStorage(t);
  start(data, {});
  const world = createWorld(true, () => 0);
  const cells = [[0, 0, 3], [1, 0, 3], [0, 1, 3]];
  for (const c of cells) world.dig(...c);
  const w = world.snapshot();
  delete w.seed;
  const session = {pos: [0.5, 0.5, 0.5], velocity: [0, 0, 0], yaw: 0, pitch: 0, sensor: false, entered: -1, world: w};
  const before = readSave();
  const s = await commit(before.revision, {type: 'drill', cell: cells[0], cells}, session);
  assert.equal(s.blocksMined, 3);
  assert.equal(s.revision, before.revision + 1);
  const again = await commit(s.revision, {type: 'drill', cell: cells[0], cells}, session);
  assert.equal(again.blocksMined, 3, 'already cut cells are not paid twice');
  await assert.rejects(commit(s.revision, {type: 'drill', cell: cells[0], cells: []}, session), /채굴 기록/);
});

test('a version-16 save gains level-0 upgrades and malformed levels are rejected', t => {
  const data = mockStorage(t);
  const clean = readSave();
  const {upgrades, ...old} = clean;
  data.set(saveKey, JSON.stringify({...old, version: 16}));
  assert.deepEqual(readSave().upgrades, {body: 0, wagon: 0, drills: 0, bore: 0});
  data.set(saveKey, JSON.stringify({...clean, upgrades: {body: 9, wagon: 0, drills: 0, bore: 0}}));
  assert.throws(() => readSave(), /읽을 수 없습니다/);
});
