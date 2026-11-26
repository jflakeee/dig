import assert from 'node:assert/strict';
import { test } from 'node:test';
import { studies, fragments } from '../next/research.js';
import { finds } from '../next/finds.js';
import { commit, readSave, saveKey, saveVersion } from '../next/save.js';

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
const at = elapsed => ({pos: [0.5, 0.5, 0.5], velocity: [0, 0, 0], yaw: 0, pitch: 0, sensor: false, entered: -1,
  world: {seed: 1, elapsed, center: [0, 0, 0], hasMouth: false, chunks: []}});
const piece = (id, kind) => ({id, kind, variant: 'standard'});
const drilling = extra => ({...readSave(), front: 'drill-1', drills: ['drill-1'], ...extra});

test('every unknown material has an analysis and the films hold eight fragments', () => {
  const unknown = finds.filter(f => f.category === 'unknown').map(f => f.id).sort();
  assert.deepEqual(Object.keys(studies).sort(), unknown);
  for (const s of Object.values(studies)) {
    assert.ok(s.seconds > 0 && s.traits && s.safety);
    assert.ok(Object.values(s.cost).every(g => g > 0));
  }
  assert.equal(fragments.length, 8);
});

test('an analysis spends its elements at the start and completes on the market clock', async t => {
  const data = mockStorage(t);
  const study = studies.tilt_glass;
  data.set(saveKey, JSON.stringify(drilling({finds: [piece('g', 'tilt_glass')], findLog: ['tilt_glass'],
    elements: {Si: 10, Na: 2, Ca: 1.5}, elementLog: ['Si', 'Na', 'Ca']})));
  let s = await commit(0, 'checkpoint', at(0));
  await assert.rejects(commit(s.revision, {type: 'research', kind: 'tilt_glass'}, at(0)), /원소가 부족/);
  data.set(saveKey, JSON.stringify({...s, elements: {Si: 10, Na: 2, Ca: 2}}));
  s = await commit(s.revision, {type: 'research', kind: 'tilt_glass'}, at(0));
  assert.deepEqual(s.elements, {Si: 2});
  assert.deepEqual(s.researchJob, {kind: 'tilt_glass', endsAt: study.seconds});
  await assert.rejects(commit(s.revision, {type: 'research', kind: 'tilt_glass'}, at(0)), /분석할 수 없습니다/);
  for (let time = 20; time < study.seconds; time += 20) s = await commit(s.revision, 'checkpoint', at(time));
  assert.deepEqual(s.research, []);
  s = await commit(s.revision, 'checkpoint', at(study.seconds));
  assert.deepEqual([s.research, s.researchJob, s.tradeLog[0]], [['tilt_glass'], null, 'research:tilt_glass']);
  assert.deepEqual(s.finds, [piece('g', 'tilt_glass')]);
  await assert.rejects(commit(s.revision, {type: 'research', kind: 'tilt_glass'}, at(study.seconds)), /분석할 수 없습니다/);
  await assert.rejects(commit(s.revision, {type: 'research', kind: 'echo_crystal'}, at(study.seconds)), /분석할 수 없습니다/);
});

test('reading memory films uses them up and leaves fragments in order', async t => {
  const data = mockStorage(t);
  const films = Array.from({length: 10}, (_, i) => piece('m' + i, 'memory_film'));
  data.set(saveKey, JSON.stringify(drilling({finds: films, findLog: ['memory_film']})));
  await assert.rejects(commit(0, {type: 'read-film'}), /판독할 기억막/);
  data.set(saveKey, JSON.stringify({...readSave(), research: ['memory_film']}));
  let s = readSave();
  for (let i = 0; i < fragments.length; i++) s = await commit(s.revision, {type: 'read-film'});
  assert.deepEqual(s.memoryLog, [0, 1, 2, 3, 4, 5, 6, 7]);
  assert.equal(s.finds.length, 2);
  await assert.rejects(commit(s.revision, {type: 'read-film'}), /판독할 기억막/);
});

test('a version-10 save opens with no research and malformed research state is rejected', t => {
  const data = mockStorage(t);
  const clean = readSave();
  const old = {...clean, version: 10};
  for (const k of ['research', 'researchJob', 'memoryLog']) delete old[k];
  data.set(saveKey, JSON.stringify(old));
  const s = readSave();
  assert.deepEqual([s.version, s.research, s.researchJob, s.memoryLog], [saveVersion, [], null, []]);
  for (const bad of [{research: ['drill_head']}, {research: ['tilt_glass', 'tilt_glass']},
    {researchJob: {kind: 'tilt_glass', endsAt: 5}, research: ['tilt_glass']}, {memoryLog: [1]}]) {
    data.set(saveKey, JSON.stringify({...clean, ...bad}));
    assert.throws(readSave, /원본을 보존/, JSON.stringify(bad));
  }
});
