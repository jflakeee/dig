import assert from 'node:assert/strict';
import { test } from 'node:test';
import { commit, readSave, saveKey, saveVersion, variantCounts, decompositionPreview } from '../next/save.js';
import { feeRange, fractionsFromUnits } from '../next/composition.js';

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

const near = (a, b) => Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(b));
// A run returns each element's mass share of the piece, less one loss rate.
function checkRun(before, after, op, grams, units) {
  const preview = decompositionPreview(before, op);
  assert.equal(preview.grams, grams);
  assert.ok(preview.fee >= feeRange[0] && preview.fee <= feeRange[1], String(preview.fee));
  const fractions = fractionsFromUnits(units);
  for (const [e, f] of Object.entries(fractions)) {
    assert.ok(near(preview.out[e], grams * f * (1 - preview.fee)), e);
    assert.ok(near(after.elements[e] - (before.elements[e] ?? 0), preview.out[e]), e);
  }
  assert.ok(preview.kept < grams);
  assert.equal(after.decomposeCount, before.decomposeCount + 1);
}

test('decomposing one piece spends it and adds its element mass, less a loss, in the same save', async t => {
  const data = mockStorage(t);
  const start = drilling({minerals: {copper_ore: 3}, variants: {'copper_ore:malachite': 1}});
  data.set(saveKey, JSON.stringify(start));
  const op = {type: 'decompose', mineral: 'copper_ore', variant: 'chalcopyrite'};
  const first = await commit(0, op);
  checkRun(start, first, op, 100, {Cu: 1, Fe: 1, S: 2});
  assert.deepEqual(first.elementLog, ['Cu', 'Fe', 'S']);
  assert.equal(first.minerals.copper_ore, 2);
  assert.deepEqual(variantCounts(first, 'copper_ore'), {chalcopyrite: 1, malachite: 1, native: 0});
  const op2 = {type: 'decompose', mineral: 'copper_ore', variant: 'malachite'};
  const second = await commit(first.revision, op2);
  checkRun(first, second, op2, 100, {Cu: 2, C: 1, O: 5, H: 2});
  assert.deepEqual(second.elementLog, ['Cu', 'Fe', 'S', 'C', 'O', 'H']);
  assert.deepEqual(second.variants, {});
  assert.equal(JSON.parse(data.get(saveKey)).revision, second.revision);
});

test('the loss of a run is fixed by the run count, so the preview never drifts', t => {
  mockStorage(t);
  const s = drilling({rocks: 2});
  const op = {type: 'decompose', mineral: 'rock', variant: 'granite'};
  assert.deepEqual(decompositionPreview(s, op), decompositionPreview(structuredClone(s), op));
  const rates = new Set(Array.from({length: 20}, (_, n) => decompositionPreview({...s, decomposeCount: n}, op).fee));
  assert.ok(rates.size > 15);
});

test('decomposing rock spends the chosen sub-species and keeps the total in step', async t => {
  const data = mockStorage(t);
  const start = drilling({rocks: 2, variants: {'rock:limestone': 1}});
  data.set(saveKey, JSON.stringify(start));
  const op = {type: 'decompose', mineral: 'rock', variant: 'granite'};
  const s = await commit(0, op);
  checkRun(start, s, op, 100, {K: 1, Al: 1, Si: 3, O: 8});
  assert.equal(s.rocks, 1);
  assert.deepEqual(variantCounts(s, 'rock'), {granite: 0, basalt: 0, limestone: 1, arkose: 0});
  const last = await commit(s.revision, {type: 'decompose', mineral: 'rock', variant: 'limestone'});
  assert.equal(last.rocks, 0);
  assert.deepEqual(last.variants, {});
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

test('a version-4 save opens with an empty element inventory, a version-7 one keeps its amounts as grams', t => {
  const data = mockStorage(t);
  const clean = readSave();
  const old = {...clean, version: 4, rocks: 4};
  delete old.elements;
  delete old.elementLog;
  data.set(saveKey, JSON.stringify(old));
  const s = readSave();
  assert.equal(s.version, saveVersion);
  assert.deepEqual([s.elements, s.elementLog, s.rocks, s.decomposeCount], [{}, [], 4, 0]);
  const seven = {...clean, version: 7, elements: {Fe: 3, S: 2}, elementLog: ['Fe', 'S']};
  delete seven.decomposeCount;
  data.set(saveKey, JSON.stringify(seven));
  assert.deepEqual([readSave().elements, readSave().decomposeCount], [{Fe: 3, S: 2}, 0]);
  for (const bad of [{elements: {Xx: 1}, elementLog: ['Xx']}, {elements: {Fe: 1}, elementLog: []},
    {elements: {Fe: 0}, elementLog: ['Fe']}, {elements: {}, elementLog: ['Fe', 'Fe']},
    {elements: {Fe: Infinity}, elementLog: ['Fe']}, {decomposeCount: -1}]) {
    data.set(saveKey, JSON.stringify({...clean, ...bad}));
    assert.throws(readSave, /원본을 보존/, JSON.stringify(bad));
  }
});
