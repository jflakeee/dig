import assert from 'node:assert/strict';
import { test } from 'node:test';
import { commit, readSave, saveKey } from '../next/save.js';
import { researchProgress, portalCost } from '../next/portal.js';
import { endingById, endingCount, chooseEnding, portalEnding, allEndingsSeen } from '../next/endings.js';
import { studies } from '../next/research.js';
import { automationIds } from '../next/automation.js';

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
const finished = {research: Object.keys(studies), automation: {unlocked: [...automationIds], off: [], job: null}};
const rich = {credits: portalCost.credits, elements: {...portalCost.elements}, elementLog: Object.keys(portalCost.elements)};

test('the portal design opens only at the end of research', () => {
  assert.equal(researchProgress({research: [], automation: {unlocked: []}}).done, false);
  assert.equal(researchProgress({...finished, research: Object.keys(studies).slice(1)}).done, false);
  assert.deepEqual(researchProgress(finished), {analyses: 8, automations: 8, done: true});
});

test('building the portal spends its cost and records the portal ending', async t => {
  const data = mockStorage(t);
  data.set(saveKey, JSON.stringify({...readSave(), front: 'drill-1', drills: ['drill-1'], ...rich}));
  await assert.rejects(commit(0, {type: 'build-portal'}), /연구가 아직/);
  data.set(saveKey, JSON.stringify({...readSave(), ...finished}));
  const s = await commit(0, {type: 'build-portal'});
  assert.deepEqual([s.portalBuilt, s.credits, Object.keys(s.elements).length, s.endingsSeen], [true, 0, 0, ['portal']]);
  assert.equal(s.actions.research, 1);
  await assert.rejects(commit(s.revision, {type: 'build-portal'}), /크레딧이 부족/);
});

test('the portal ending stands apart from the three chosen by habit', () => {
  assert.equal(endingById('portal'), portalEnding);
  assert.equal(endingCount, 4);
  assert.notEqual(chooseEnding({research: 0, equip: 0, repair: 0}), 'portal');
  assert.equal(allEndingsSeen({endingsSeen: ['portal']}), false);
  assert.match(portalEnding.lines.join(' '), /내가 포탈을 만들면서 시작되었다/);
});
