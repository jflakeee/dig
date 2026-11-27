import assert from 'node:assert/strict';
import { test } from 'node:test';
import { commit, readSave, saveKey, pledge } from '../next/save.js';
import { targets, baseValue, categories } from '../next/gamble.js';
import { mineralIds } from '../next/minerals.js';

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
// roll(2, 'gamble:0') wins (0.202); roll(1, 'gamble:0') loses (0.973).
const WIN = 2, LOSE = 1;
const start = (data, extra) => data.set(saveKey, JSON.stringify({...readSave(), revision: 0, front: 'drill-1', drills: ['drill-1'], variants: {}, ...extra}));

test('every category has targets with a base value', () => {
  for (const c of Object.keys(categories)) assert.ok(targets(c, mineralIds).length > 0 && targets(c, mineralIds).every(([, v]) => v > 0), c);
  assert.equal(baseValue('mineral', 'gold', mineralIds), 40);
  assert.equal(baseValue('research', 'repair', mineralIds), 200);
});

test('the pledge takes free credits first, then the most plentiful minerals', t => {
  mockStorage(t);
  const s = {...readSave(), credits: 30, bids: [], rocks: 50, minerals: {iron: 3}, variants: {}};
  assert.deepEqual(pledge(s, 20), {credits: 20, minerals: []});
  assert.deepEqual(pledge(s, 40), {credits: 30, minerals: [['rock', 'granite', 5]]});
  assert.equal(pledge(s, 30 + 100 + 18 + 1), null);
});

test('a lost gamble forfeits the pledge, a won one keeps it and pays the target times the multiple', async t => {
  const data = mockStorage(t);
  start(data, {marketSeed: LOSE, credits: 100, rocks: 20});
  let s = await commit(0, {type: 'gamble', category: 'mineral', id: 'gold', multiple: 3});
  assert.deepEqual([s.credits, s.rocks, s.gambleCount], [0, 10, 1]);
  assert.deepEqual(s.gambleLog[0], {win: false, category: 'mineral', id: 'gold', multiple: 3, stake: 120});
  start(data, {marketSeed: WIN, credits: 100, rocks: 20});
  s = await commit(0, {type: 'gamble', category: 'mineral', id: 'gold', multiple: 3});
  assert.deepEqual([s.credits, s.rocks, s.minerals.gold], [100, 20, 3]);
  assert.ok(s.mineralLog.includes('gold'));
});

test('a won item or equipment pays up to 20 pieces and the rest in credits; research unlocks', async t => {
  const data = mockStorage(t);
  start(data, {marketSeed: WIN, credits: 70 * 25});
  let s = await commit(0, {type: 'gamble', category: 'equipment', id: 'cargo_coupler', multiple: 25});
  assert.equal(s.finds.filter(p => p.kind === 'cargo_coupler' && p.durability === 100).length, 20);
  assert.equal(s.credits, 70 * 25 + 5 * 70);
  start(data, {marketSeed: WIN, credits: 200});
  s = await commit(0, {type: 'gamble', category: 'research', id: 'repair', multiple: 1});
  assert.deepEqual(s.automation.unlocked, ['repair']);
});

test('bad targets, multiples and short pledges are refused', async t => {
  const data = mockStorage(t);
  start(data, {credits: 10});
  await assert.rejects(commit(0, {type: 'gamble', category: 'mineral', id: 'gold', multiple: 0}), /걸 수 없는/);
  await assert.rejects(commit(0, {type: 'gamble', category: 'mineral', id: 'gold', multiple: 10001}), /걸 수 없는/);
  await assert.rejects(commit(0, {type: 'gamble', category: 'mineral', id: 'mithril', multiple: 1}), /걸 수 없는/);
  await assert.rejects(commit(0, {type: 'gamble', category: 'mineral', id: 'gold', multiple: 1}), /담보가 부족/);
});
