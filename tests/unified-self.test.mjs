import assert from 'node:assert/strict';
import { test } from 'node:test';
import { selfParts, nextPart, traderLook, lossNote, makerNote, recall, finalMemory } from '../next/self.js';
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

test('eight parts of the machine each restore one recollection', () => {
  assert.equal(selfParts.length, 8);
  assert.equal(new Set(selfParts.map(p => p.id)).size, 8);
  assert.ok(selfParts.every(p => p.name && p.recollection && p.likeness));
  assert.equal(nextPart([], 0), 'shell');
  assert.equal(nextPart(['shell'], 0), 'lens');
  assert.equal(nextPart([], 0.999999), 'name_plate');
  assert.equal(nextPart(selfParts.map(p => p.id), 0.5), null);
});

test('traders, the decomposer and analyses reveal more of the truth as memory returns', () => {
  assert.equal(traderLook('collector', 0), '여섯 다리로 선 원통형 기계');
  assert.equal(traderLook('collector', 2), '여섯 다리로 선 원통형 기계 · 나와 같은 외피의 곡면, 작업등의 배치');
  assert.ok(traderLook('smelter', 8).endsWith('다른 시간의 나'));
  assert.notEqual(traderLook('smelter', 0), traderLook('mechanic', 0));
  assert.deepEqual([0, 3, 4, 5, 6, 8].map(lossNote),
    ['원인 기록 없음', '원인 기록 없음', '교환 상대: 시간이 다른 곳', '교환 상대: 시간이 다른 곳', '교환 상대: 다른 시간의 나', '교환 상대: 다른 시간의 나']);
  assert.equal(makerNote(6), null);
  assert.ok(makerNote(7).includes('미래의 내가'));
  assert.equal(recall({selfParts: ['shell', 'lens']}), 2);
  assert.equal(finalMemory(7), null);
  assert.ok(finalMemory(8).startsWith('나는 사람이었다.'));
});

test('a part found while drilling rejoins the body once and never enters storage', async t => {
  const data = mockStorage(t);
  const {chunk, index} = cellOwner(0, 0, 3);
  let seed = 0;
  while (!('self' in (blockDiscovery(seed, chunk.join(',') + ':0:cell' + index) ?? {}))) seed++;
  const start = {...readSave(), front: 'drill-1', drills: ['drill-1']};
  data.set(saveKey, JSON.stringify(start));
  t.mock.method(Math, 'random', () => 0.5);
  const world = createWorld(true, () => 0, undefined, undefined, undefined, undefined, seed);
  world.dig(0, 0, 3);
  const session = {pos: [0.5, 0.5, 0.5], velocity: [0, 0, 0], yaw: 0, pitch: 0, sensor: false, entered: -1, world: world.snapshot()};
  const s = await commit(0, {type: 'drill', cell: [0, 0, 3]}, session);
  assert.equal(s.selfParts.length, 1);
  assert.deepEqual([s.finds, s.specimens, s.captures], [[], [], []]);
  const again = await commit(s.revision, {type: 'drill', cell: [0, 0, 3]}, session);
  assert.equal(again.selfParts.length, 1);
  data.set(saveKey, JSON.stringify({...start, selfParts: selfParts.map(p => p.id)}));
  const full = await commit(0, {type: 'drill', cell: [0, 0, 3]}, session);
  assert.equal(full.selfParts.length, 8);
});

test('a version-11 save opens with no parts found and malformed part lists are rejected', t => {
  const data = mockStorage(t);
  const clean = readSave();
  const old = {...clean, version: 11};
  delete old.selfParts;
  data.set(saveKey, JSON.stringify(old));
  assert.deepEqual([readSave().version, readSave().selfParts], [saveVersion, []]);
  for (const bad of [{selfParts: ['tail']}, {selfParts: ['shell', 'shell']}, {selfParts: 'shell'}]) {
    data.set(saveKey, JSON.stringify({...clean, ...bad}));
    assert.throws(readSave, /원본을 보존/, JSON.stringify(bad));
  }
});
