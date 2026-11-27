import assert from 'node:assert/strict';
import { test } from 'node:test';
import { commit, readSave, saveKey } from '../next/save.js';
import { automations, isOn } from '../next/automation.js';

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

test('an automation study spends credits and grams, finishes on the market clock and switches on', async t => {
  const data = mockStorage(t);
  start(data, {credits: 250, elements: {Si: 6}, elementLog: ['Si']});
  let s = await commit(0, {type: 'automate', id: 'repair'});
  assert.equal(s.credits, 50);
  assert.ok(Math.abs(s.elements.Si - 1) < 1e-9);
  assert.equal(s.automation.job.id, 'repair');
  await assert.rejects(commit(s.revision, {type: 'automate', id: 'wagon'}), /연구할 수 없습니다/);
  data.set(saveKey, JSON.stringify({...readSave(), marketTime: s.marketTime + automations.repair.seconds}));
  s = await commit(s.revision, 'checkpoint');
  assert.deepEqual(s.automation, {unlocked: ['repair'], off: [], job: null});
  assert.ok(isOn(s, 'repair'));
  s = await commit(s.revision, {type: 'automation-switch', id: 'repair', on: false});
  assert.ok(!isOn(s, 'repair'));
  s = await commit(s.revision, {type: 'automation-switch', id: 'repair', on: true});
  assert.ok(isOn(s, 'repair'));
  assert.equal(s.actions.research, 1);
});

test('short credits, short grams and unknown studies are refused', async t => {
  const data = mockStorage(t);
  start(data, {credits: 100, elements: {Si: 9}, elementLog: ['Si']});
  await assert.rejects(commit(0, {type: 'automate', id: 'repair'}), /크레딧이 부족/);
  start(data, {credits: 900, elements: {}});
  await assert.rejects(commit(0, {type: 'automate', id: 'repair'}), /원소가 부족/);
  await assert.rejects(commit(0, {type: 'automate', id: 'teleport'}), /연구할 수 없습니다/);
  await assert.rejects(commit(0, {type: 'automation-switch', id: 'repair', on: false}), /설정 오류/);
});

test('malformed automation state is rejected', t => {
  const data = mockStorage(t);
  data.set(saveKey, JSON.stringify({...readSave(), automation: {unlocked: ['repair'], off: ['sell'], job: null}}));
  assert.throws(() => readSave(), /읽을 수 없습니다/);
});
