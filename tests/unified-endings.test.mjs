import assert from 'node:assert/strict';
import { test } from 'node:test';
import { chooseEnding, counterFor, endings } from '../next/endings.js';
import { selfParts } from '../next/self.js';
import { blockDiscovery } from '../next/specimens.js';
import { marketStock } from '../next/trade.js';
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
const drilling = extra => ({...readSave(), front: 'drill-1', drills: ['drill-1'], ...extra});

test('the ending follows what the player did most, ties going to the earlier ending', () => {
  assert.deepEqual(endings.map(e => [e.id, e.counter]), [['overwritten', 'research'], ['made', 'equip'], ['endless', 'repair']]);
  assert.equal(chooseEnding({research: 5, equip: 2, repair: 4}), 'overwritten');
  assert.equal(chooseEnding({research: 1, equip: 9, repair: 4}), 'made');
  assert.equal(chooseEnding({research: 1, equip: 2, repair: 4}), 'endless');
  assert.equal(chooseEnding({research: 3, equip: 3, repair: 3}), 'overwritten');
  assert.equal(chooseEnding({research: 0, equip: 3, repair: 3}), 'made');
  assert.equal(chooseEnding({research: 0, equip: 0, repair: 0}), 'endless');
  assert.ok(endings.every(e => e.lines.length >= 4 && e.title));
});

test('research, fitting equipment and repair each count toward their ending', async t => {
  assert.deepEqual(['research', 'read-film', 'equip', 'equip-head', 'repair', 'sell', 'drill'].map(k => counterFor(k)),
    ['research', 'research', 'equip', 'equip', 'repair', null, null]);
  assert.equal(counterFor('buy', {item: 'drill_head'}), 'equip');
  assert.equal(counterFor('buy', {item: 'ceramic'}), null);
  const data = mockStorage(t);
  const head = marketStock(9, 0).find(o => o.item === 'drill_head');
  data.set(saveKey, JSON.stringify(drilling({marketSeed: 9, credits: head.price, drillCondition: 10, ceramic: 1,
    finds: [{id: 'l', kind: 'focus_lamp', variant: 'standard', durability: 50}], findLog: ['focus_lamp']})));
  let s = await commit(0, {type: 'equip', id: 'l'});
  s = await commit(s.revision, {type: 'buy', item: 'drill_head', price: head.price});
  s = await commit(s.revision, 'repair');
  assert.deepEqual(s.actions, {research: 0, equip: 2, repair: 1});
  await assert.rejects(commit(s.revision, 'repair'));
  assert.deepEqual(readSave().actions, s.actions);
});

test('the ending is fixed when the last part returns and does not change afterwards', async t => {
  const data = mockStorage(t);
  const {chunk, index} = cellOwner(0, 0, 3);
  let seed = 0;
  while (!('self' in (blockDiscovery(seed, chunk.join(',') + ':0:cell' + index) ?? {}))) seed++;
  const seven = selfParts.slice(0, 7).map(p => p.id);
  data.set(saveKey, JSON.stringify(drilling({selfParts: seven, actions: {research: 1, equip: 0, repair: 4}})));
  t.mock.method(Math, 'random', () => 0.5);
  const world = createWorld(true, () => 0, undefined, undefined, undefined, undefined, seed);
  world.dig(0, 0, 3);
  let s = await commit(0, {type: 'drill', cell: [0, 0, 3]},
    {pos: [0.5, 0.5, 0.5], velocity: [0, 0, 0], yaw: 0, pitch: 0, sensor: false, entered: -1, world: world.snapshot()});
  assert.equal(s.selfParts.length, 8);
  assert.equal(s.ending, 'endless');
  data.set(saveKey, JSON.stringify({...s, actions: {research: 50, equip: 0, repair: 4}}));
  s = await commit(s.revision, 'checkpoint');
  assert.equal(s.ending, 'endless');
});

test('a version-12 save opens with no counts and malformed ending state is rejected', t => {
  const data = mockStorage(t);
  const clean = readSave();
  const old = {...clean, version: 12};
  delete old.actions;
  delete old.ending;
  data.set(saveKey, JSON.stringify(old));
  assert.deepEqual([readSave().version, readSave().actions, readSave().ending], [saveVersion, {research: 0, equip: 0, repair: 0}, null]);
  for (const bad of [{ending: 'made'}, {ending: 'unknown', selfParts: selfParts.map(p => p.id)},
    {actions: {research: -1, equip: 0, repair: 0}}, {actions: {research: 0, equip: 0}}, {actions: {research: 0, equip: 0, repair: 0, sell: 1}}]) {
    data.set(saveKey, JSON.stringify({...clean, ...bad}));
    assert.throws(readSave, /원본을 보존/, JSON.stringify(bad));
  }
});

test('a new run lets memory go, keeps work records and the endings seen', async t => {
  const data = mockStorage(t);
  const all = selfParts.map(p => p.id);
  const before = drilling({selfParts: all, memoryLog: [0, 1], actions: {research: 2, equip: 5, repair: 1}, ending: 'made',
    endingsSeen: ['made'], rocks: 40, credits: 300, research: ['tilt_glass'], elements: {Fe: 2}, elementLog: ['Fe']});
  data.set(saveKey, JSON.stringify(before));
  const s = await commit(0, {type: 'new-cycle'});
  assert.deepEqual([s.selfParts, s.memoryLog, s.actions, s.ending, s.endingsSeen, s.cycles],
    [[], [], {research: 0, equip: 0, repair: 0}, null, ['made'], 1]);
  assert.deepEqual([s.rocks, s.credits, s.research, s.elements], [40, 300, ['tilt_glass'], {Fe: 2}]);
  await assert.rejects(commit(s.revision, {type: 'new-cycle'}), /엔딩을 본 뒤/);
});

test('a second run that reaches a different ending adds it to the endings seen', async t => {
  const data = mockStorage(t);
  const {chunk, index} = cellOwner(0, 0, 3);
  let seed = 0;
  while (!('self' in (blockDiscovery(seed, chunk.join(',') + ':0:cell' + index) ?? {}))) seed++;
  data.set(saveKey, JSON.stringify(drilling({selfParts: selfParts.slice(0, 7).map(p => p.id), endingsSeen: ['made'], cycles: 1,
    actions: {research: 9, equip: 0, repair: 0}})));
  t.mock.method(Math, 'random', () => 0.5);
  const world = createWorld(true, () => 0, undefined, undefined, undefined, undefined, seed);
  world.dig(0, 0, 3);
  const s = await commit(0, {type: 'drill', cell: [0, 0, 3]},
    {pos: [0.5, 0.5, 0.5], velocity: [0, 0, 0], yaw: 0, pitch: 0, sensor: false, entered: -1, world: world.snapshot()});
  assert.deepEqual([s.ending, s.endingsSeen], ['overwritten', ['made', 'overwritten']]);
  const clean = readSave();
  for (const bad of [{endingsSeen: ['made', 'made']}, {endingsSeen: ['ghost']}, {cycles: -1},
    {ending: 'made', selfParts: selfParts.map(p => p.id), endingsSeen: []}]) {
    data.set(saveKey, JSON.stringify({...clean, ...bad}));
    assert.throws(readSave, /원본을 보존/, JSON.stringify(bad));
  }
  const old = {...clean, version: 15, ending: 'endless', selfParts: selfParts.map(p => p.id)};
  delete old.endingsSeen;
  delete old.cycles;
  data.set(saveKey, JSON.stringify(old));
  assert.deepEqual([readSave().endingsSeen, readSave().cycles], [['endless'], 0]);
});

test('the epilogue opens only after all three endings and replays like an ending', async () => {
  const { epilogue, allEndingsSeen, playable, endings: all } = await import('../next/endings.js');
  assert.equal(allEndingsSeen({endingsSeen: ['made', 'endless']}), false);
  assert.equal(allEndingsSeen({endingsSeen: ['endless', 'overwritten', 'made']}), true);
  assert.equal(playable('epilogue'), epilogue);
  assert.equal(playable('made').title, '만들어진 채굴기계');
  assert.equal(epilogue.motion, 'all');
  assert.ok(epilogue.lines.length >= 5 && !all.some(e => e.id === epilogue.id));
});
