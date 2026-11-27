import assert from 'node:assert/strict';
import { test } from 'node:test';
import { commit, readSave, saveKey, sellPrice } from '../next/save.js';
import { insightStage, stages, fresh, traceKey } from '../next/insight.js';
import { marketStock, lotsFor, minimumBid } from '../next/trade.js';

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
const start = (data, extra) => data.set(saveKey, JSON.stringify({...readSave(), revision: 0, front: 'drill-1', drills: ['drill-1'], variants: {}, ...extra}));

test('each step of realisation needs the one before it', () => {
  const with_ = (i, extra = {}) => ({insight: {...fresh(), ...i}, credits: 0, memoryLog: [], ...extra});
  assert.equal(stages.length, 6);
  assert.equal(insightStage({}), 0);
  assert.equal(insightStage(with_({traceSeen: true})), 1);
  assert.equal(insightStage(with_({urgentBuy: true, lowBid: true})), 0, 'no trace seen yet');
  assert.equal(insightStage(with_({traceSeen: true, urgentBuy: true, lowBid: true})), 2);
  assert.equal(insightStage(with_({traceSeen: true, urgentBuy: true, lowBid: true, trades: 30})), 3);
  assert.equal(insightStage(with_({traceSeen: true, urgentBuy: true, lowBid: true, trades: 30, rebirth: true})), 4);
  assert.equal(insightStage(with_({traceSeen: true, urgentBuy: true, lowBid: true, trades: 30, rebirth: true}, {credits: 100_000})), 5);
  assert.deepEqual(['m:iron', 'ceramic', 'capsule:Tc', 'tilt_glass'],
    [{mineral: 'iron'}, {ceramic: true}, {kind: 'capsule', element: 'Tc'}, {kind: 'tilt_glass'}].map(traceKey));
});

test('selling leaves a trace that the market then offers back; buys, bids and reboots add evidence', async t => {
  const data = mockStorage(t);
  start(data, {rocks: 5, credits: 2000});
  let s = await commit(0, {type: 'sell', source: 'm', kind: 'rock', variant: 'granite', price: sellPrice(readSave(), {source: 'm', kind: 'rock', variant: 'granite'})});
  assert.deepEqual(s.insight.traces, ['m:rock']);
  assert.equal(s.insight.trades, 1);
  assert.equal(s.insight.traceSeen, true, 'every cycle offers rock back');
  assert.equal(insightStage(s), 1);
  const head = marketStock(s.marketSeed, 0).find(o => o.item === 'drill_head');
  s = await commit(s.revision, {type: 'buy', item: 'drill_head', price: head.price});
  assert.equal(s.insight.urgentBuy, true, 'a drill head always costs over 1.6x its base');
  const lot = lotsFor(s.marketSeed, 0)[0];
  const amount = minimumBid(lot, s.marketTime, 0);
  s = await commit(s.revision, {type: 'bid', lot: lot.id, amount});
  assert.equal(s.insight.lowBid, amount <= lot.estimate);
  s = await commit(s.revision, {type: 'reboot'});
  assert.equal(s.insight.rebirth, true);
});

test('a version-17 save starts with no evidence and malformed evidence is rejected', t => {
  const data = mockStorage(t);
  const {insight, ...old} = readSave();
  data.set(saveKey, JSON.stringify({...old, version: 17}));
  assert.deepEqual(readSave().insight, fresh());
  data.set(saveKey, JSON.stringify({...readSave(), insight: {...fresh(), trades: -1}}));
  assert.throws(() => readSave(), /읽을 수 없습니다/);
});
