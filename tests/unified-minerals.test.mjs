import assert from 'node:assert/strict';
import { test } from 'node:test';
import { blockYield, mineralIds, table } from '../next/minerals.js';
import { commit, readSave, saveKey } from '../next/save.js';
import { cellOwner, createWorld, roll } from '../next/world.js';

const forced = (base, companion) => key => key.endsWith('base') ? base : companion;
const yieldOf = (base, companion) => blockYield(0, [0, 0, 0], 0, 0, forced(base, companion));

test('the catalog has 16 distinct minerals and every table share sums to one', () => {
  assert.equal(mineralIds.length, 16);
  assert.equal(new Set(mineralIds).size, 16);
  assert.equal(table.reduce((n, row) => n + row[0], 0), 10000);
  const rare = table.at(-1)[2];
  assert.equal(rare.reduce((n, entry) => n + entry[1], 0), 10000);
  for (const [, base, companions] of table)
    for (const id of [base, ...companions.map(c => c[0])].filter(Boolean)) assert.ok(mineralIds.includes(id), id);
});

test('each base row and companion band starts and ends where the design says', () => {
  const bases = [[0, 'rock'], [0.6499, 'rock'], [0.65, 'coal'], [0.8299, 'coal'], [0.83, 'iron'],
    [0.9299, 'iron'], [0.93, 'gold'], [0.9799, 'gold']];
  for (const [sample, id] of bases) assert.equal(yieldOf(sample, 0.99).base, id, String(sample));
  assert.deepEqual(yieldOf(0, 0), {base: 'rock', companion: 'quartz'});
  assert.equal(yieldOf(0, 0.0999).companion, 'quartz');
  assert.equal(yieldOf(0, 0.10).companion, 'kaolinite');
  assert.equal(yieldOf(0, 0.18).companion, 'copper_ore');
  assert.equal(yieldOf(0, 0.2399).companion, 'copper_ore');
  assert.equal(yieldOf(0, 0.24).companion, null);
  assert.equal(yieldOf(0.7, 0.0999).companion, 'graphite');
  assert.equal(yieldOf(0.7, 0.10).companion, 'pyrite');
  assert.equal(yieldOf(0.7, 0.1499).companion, 'pyrite');
  assert.equal(yieldOf(0.7, 0.15).companion, null);
  assert.equal(yieldOf(0.9, 0.1199).companion, 'nickel_ore');
  assert.equal(yieldOf(0.9, 0.12).companion, 'chromite');
  assert.equal(yieldOf(0.9, 0.20).companion, null);
  assert.equal(yieldOf(0.95, 0.1999).companion, 'silver_ore');
  assert.equal(yieldOf(0.95, 0.20).companion, null);
  for (const [sample, id] of [[0, 'ilmenite'], [0.4, 'wolframite'], [0.7, 'platinum'], [0.9, 'diamond'], [0.999999, 'diamond']])
    assert.deepEqual(yieldOf(0.98, sample), {base: id, companion: null});
});

test('long-run yields match 100 bases and about 21.3 companions per 100 blocks', () => {
  const counts = {};
  let companions = 0;
  const n = 200000;
  for (let i = 0; i < n; i++) {
    const found = blockYield(99, [i >> 15, 0, 0], 0, i & 32767);
    counts[found.base] = (counts[found.base] ?? 0) + 1;
    if (found.companion) companions++;
  }
  assert.ok(Math.abs(counts.rock / n - 0.65) < 0.006);
  assert.ok(Math.abs(counts.coal / n - 0.18) < 0.005);
  assert.ok(Math.abs(companions / n - 0.213) < 0.005);
  assert.ok(Math.abs((counts.diamond ?? 0) / n - 0.002) < 0.0007);
});

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
const sessionOf = world => ({pos:[0.5,0.5,0.5],velocity:[0,0,0],yaw:0,pitch:0,sensor:false,entered:-1,world:world.snapshot()});
// The first cell along +z whose fixed roll is a rock with a copper companion.
function copperCell(seed) {
  for (let z = 2; z < 16; z++) {
    const {chunk, index} = cellOwner(0, 0, z);
    const found = blockYield(seed, chunk, 0, index);
    if (found.base === 'rock' && found.companion === 'copper_ore') return z;
  }
}

test('a drill block pays its base and companion once and registers both', async t => {
  const data = mockStorage(t);
  data.set(saveKey, JSON.stringify({...readSave(), front:'drill-1', drills:['drill-1']}));
  t.mock.method(Math, 'random', () => 0.5);
  let seed = 0, z;
  while (!(z = copperCell(seed))) seed++;
  const world = createWorld(true, () => 0, undefined, undefined, undefined, undefined, seed);
  for (let i = 2; i <= z; i++) world.dig(0, 0, i);
  const paid = await commit(0, {type:'drill', cell:[0,0,z]}, sessionOf(world));
  assert.equal(paid.rocks, 1);
  assert.deepEqual(paid.minerals, {copper_ore: 1});
  assert.deepEqual(paid.mineralLog, ['rock', 'copper_ore']);
  assert.equal(paid.blocksMined, 1);
  const again = await commit(paid.revision, {type:'drill', cell:[0,0,z]}, sessionOf(world));
  assert.deepEqual(again, paid);
  assert.equal(world.mineralAt(0, 0, z + 1) !== null, true);
  assert.deepEqual(JSON.parse(JSON.stringify(world.snapshot())), JSON.parse(JSON.stringify(sessionOf(world).world)));
});

test('before the first drill the laser gathers plain rock whatever the block holds', async t => {
  const data = mockStorage(t);
  data.set(saveKey, JSON.stringify(readSave()));
  const {chunk, index} = cellOwner(0, 0, 3);
  let seed = 0;
  while (blockYield(seed, chunk, 0, index).base !== 'gold') seed++;
  const world = createWorld(true, () => 0, undefined, undefined, undefined, undefined, seed);
  world.dig(0, 0, 3);
  const paid = await commit(0, {type:'collect', cell:[0,0,3]}, sessionOf(world));
  assert.equal(paid.rocks, 1);
  assert.deepEqual(paid.minerals, {});
  assert.deepEqual(paid.mineralLog, ['rock']);
});

test('a version-2 save keeps its rocks, drill and revision and opens with empty minerals', t => {
  const data = mockStorage(t);
  const old = {...readSave(), version: 2, revision: 41, rocks: 27, front: 'drill-1', drills: ['drill-1'], transited: true};
  for (const key of ['minerals', 'mineralLog', 'blocksMined']) delete old[key];
  data.set(saveKey, JSON.stringify(old));
  for (let i = 0; i < 2; i++) {
    const s = readSave();
    assert.equal(s.version, 3);
    assert.equal(s.rocks, 27);
    assert.equal(s.revision, 41);
    assert.equal(s.front, 'drill-1');
    assert.equal(s.transited, true);
    assert.deepEqual(s.minerals, {});
    assert.deepEqual(s.mineralLog, ['rock']);
  }
});

test('keyed rolls are stable for the same key and seed', () => {
  assert.equal(roll(5, 'a'), roll(5, 'a'));
  assert.notEqual(roll(5, 'a'), roll(6, 'a'));
});
