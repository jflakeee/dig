import assert from 'node:assert/strict';
import { test } from 'node:test';
import { elementSymbols, atomicMass, dalton } from '../next/elements.js';
import { artifacts, settingWeight } from '../next/artifacts.js';
import { decompose, feeRange, fractionsFromParts, massText } from '../next/composition.js';
import { findById, findPiece } from '../next/finds.js';
import { blockDiscovery } from '../next/specimens.js';
import { commit, readSave, saveKey, decompositionPreview } from '../next/save.js';
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

test('Earth objects alone hold every one of the 118 elements', () => {
  assert.equal(artifacts.length, 88);
  assert.equal(new Set(artifacts.map(a => a.id)).size, 88);
  const held = new Set();
  for (const a of artifacts) {
    assert.ok(a.grams > 0 && settingWeight[a.setting] > 0, a.id);
    for (const v of a.variants) {
      const f = fractionsFromParts(v.parts);
      const sum = Object.values(f).reduce((n, x) => n + x, 0);
      assert.ok(Math.abs(sum - 1) < 0.002, a.id + ' ' + sum);
      for (const e of Object.keys(f)) {
        assert.ok(elementSymbols.includes(e), a.id + e);
        held.add(e);
      }
    }
  }
  assert.deepEqual(elementSymbols.filter(e => !held.has(e)), []);
});

test('even at the highest loss no element of any object is lost entirely', () => {
  for (const a of artifacts)
    for (const v of a.variants) {
      const f = fractionsFromParts(v.parts);
      const out = decompose(a.grams, f, feeRange[1]);
      assert.deepEqual(Object.keys(f).filter(e => !out[e]), [], a.id + ':' + v.variant);
    }
});

test('superheavy atoms come back as whole atoms and are counted as such', () => {
  const vessel = artifacts.find(a => a.id === 'superheavy_vessel');
  assert.equal(vessel.variants.length, 19);
  const og = vessel.variants.find(v => v.variant === 'Og');
  const out = decompose(vessel.grams, fractionsFromParts(og.parts), 0.28);
  const atoms = out.Og / (atomicMass.Og * dalton);
  assert.ok(Math.abs(atoms - 7) < 1e-6, String(atoms));
  assert.equal(massText(out.Og, 'Og'), '원자 7개');
  assert.equal(massText(0.29e-6, 'Am'), '290 ng');
  assert.equal(massText(32.6), '32.6 g');
});

test('a smoke detector decomposes into its americium trace', async t => {
  const data = mockStorage(t);
  data.set(saveKey, JSON.stringify({...readSave(), front: 'drill-1', drills: ['drill-1'],
    finds: [{id: 'a', kind: 'smoke_detector', variant: 'standard'}], findLog: ['smoke_detector']}));
  const op = {type: 'decompose', find: 'smoke_detector', variant: 'standard'};
  const preview = decompositionPreview(readSave(), op);
  const s = await commit(0, op);
  assert.ok(Math.abs(s.elements.Am / (0.29e-6 * (1 - preview.fee)) - 1) < 1e-6);
  assert.equal(s.elements.Am, preview.out.Am);
  assert.deepEqual(s.finds, []);
  assert.ok(s.elementLog.includes('Am'));
});

test('an Earth object turns up while drilling and is kept as a find', async t => {
  const data = mockStorage(t);
  data.set(saveKey, JSON.stringify({...readSave(), front: 'drill-1', drills: ['drill-1']}));
  t.mock.method(Math, 'random', () => 0.5);
  const {chunk, index} = cellOwner(0, 0, 3);
  let seed = 0;
  while (findById(blockDiscovery(seed, chunk.join(',') + ':0:cell' + index)?.find?.kind)?.category !== 'artifact') seed++;
  const world = createWorld(true, () => 0, undefined, undefined, undefined, undefined, seed);
  world.dig(0, 0, 3);
  const s = await commit(0, {type: 'drill', cell: [0, 0, 3]},
    {pos: [0.5, 0.5, 0.5], velocity: [0, 0, 0], yaw: 0, pitch: 0, sensor: false, entered: -1, world: world.snapshot()});
  assert.equal(s.finds.length, 1);
  assert.equal(findById(s.finds[0].kind).category, 'artifact');
  assert.ok(findPiece(s.finds[0].kind, s.finds[0].variant));
});
