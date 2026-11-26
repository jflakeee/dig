import assert from 'node:assert/strict';
import { test } from 'node:test';
import { auctionEstimate, auctionOutcome, auctionSeconds, cycleSeconds, marketCycle, marketStock, sellQuote, traderOf,
  unsoldChance, maxMultiple, auctionFee } from '../next/trade.js';
import { commit, readSave, saveKey, saveVersion, sellPrice } from '../next/save.js';
import { roll } from '../next/roll.js';

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
const drilling = extra => ({...readSave(), front: 'drill-1', drills: ['drill-1'], marketSeed: 77, ...extra});
const at = (elapsed, seed = 1) => ({pos: [0.5, 0.5, 0.5], velocity: [0, 0, 0], yaw: 0, pitch: 0, sensor: false, entered: -1,
  world: {seed, elapsed, center: [0, 0, 0], hasMouth: false, chunks: []}});

test('offers hold for a market cycle, differ between cycles and follow condition', () => {
  assert.equal(marketCycle(cycleSeconds - 0.001), 0);
  assert.equal(marketCycle(cycleSeconds), 1);
  const gold = c => sellQuote(77, c, {mineral: 'gold'}, 'm:gold');
  assert.equal(gold(3), gold(3));
  assert.ok(new Set(Array.from({length: 12}, (_, c) => gold(c))).size > 4);
  assert.deepEqual(traderOf(77, 3), traderOf(77, 3));
  const head = d => sellQuote(77, 0, {kind: 'drill_head', variant: 'standard', durability: d}, 'f:drill_head');
  assert.ok(head(90) > head(30));
  assert.equal(sellQuote(77, 0, {kind: 'tilt_glass', variant: 'standard'}, 'f:tilt_glass'), null);
  assert.equal(sellQuote(77, 0, {kind: 'capsule', element: 'Og'}, 's:capsule:Og'), null);
  assert.equal(auctionEstimate({kind: 'capsule', element: 'Og'}), 150);
  assert.equal(auctionEstimate({kind: 'capsule', element: 'Fe'}), 40);
  assert.equal(auctionEstimate({kind: 'drill_head'}), null);
  const stock = marketStock(77, 0);
  assert.deepEqual(stock, marketStock(77, 0));
  assert.ok(stock.find(o => o.item === 'drill_head').durability >= 70);
});

test('an auction ends unsold or between one and ten times its estimate, less the fee', () => {
  let unsold = 0;
  for (let i = 0; i < 2000; i++) {
    const r = auctionOutcome(5, 'a' + i, 100);
    assert.deepEqual(r, auctionOutcome(5, 'a' + i, 100));
    if (!r.sold) { unsold++; continue; }
    assert.ok(r.price >= 100 && r.price <= 100 * maxMultiple, String(r.price));
    assert.equal(r.fee, Math.round(r.price * auctionFee));
    assert.equal(r.net, r.price - r.fee);
  }
  assert.ok(Math.abs(unsold / 2000 - unsoldChance) < 0.04);
});

test('the market clock follows world time, capped per save and restarted in a new world', async t => {
  const data = mockStorage(t);
  data.set(saveKey, JSON.stringify(drilling()));
  let s = await commit(0, 'checkpoint', at(10));
  assert.equal(s.marketTime, 0);
  s = await commit(s.revision, 'checkpoint', at(12.5));
  assert.equal(s.marketTime, 2.5);
  s = await commit(s.revision, 'checkpoint', at(500));
  assert.equal(s.marketTime, 32.5);
  s = await commit(s.revision, 'checkpoint', at(3, 2));
  assert.equal(s.marketTime, 32.5);
  s = await commit(s.revision, 'checkpoint', at(4, 2));
  assert.equal(s.marketTime, 33.5);
});

test('selling pays this cycle offer once and refuses a stale price', async t => {
  const data = mockStorage(t);
  const head = {id: 'h', kind: 'drill_head', variant: 'standard', durability: 60};
  data.set(saveKey, JSON.stringify(drilling({minerals: {gold: 2}, finds: [head], findLog: ['drill_head'],
    specimens: [{id: 'f', kind: 'fluorite', variant: 'fluorite'}], specimenLog: ['fluorite']})));
  const gold = {type: 'sell', source: 'm', kind: 'gold', variant: 'native'};
  const price = sellPrice(readSave(), gold);
  await assert.rejects(commit(0, {...gold, price: price + 1}), /시세가 바뀌었습니다/);
  let s = await commit(0, {...gold, price});
  assert.equal(s.credits, price);
  assert.equal(s.minerals.gold, 1);
  const spec = {type: 'sell', source: 's', kind: 'fluorite', variant: 'fluorite'};
  s = await commit(s.revision, {...spec, price: sellPrice(s, spec)});
  assert.deepEqual(s.specimens, []);
  const sellHead = {type: 'sell', source: 'f', kind: 'drill_head', variant: 'standard', id: 'h'};
  s = await commit(s.revision, {...sellHead, price: sellPrice(s, sellHead)});
  assert.deepEqual(s.finds, []);
  await assert.rejects(commit(s.revision, {...sellHead, price: 1}), /판매할 물품이 없습니다/);
  await assert.rejects(commit(s.revision, {type: 'sell', source: 'f', kind: 'tilt_glass', variant: 'standard', price: 1}), /판매할 물품이 없습니다/);
});

test('buying spends credits for a ceramic or a drill head with this cycle durability', async t => {
  const data = mockStorage(t);
  const [ceramic, head] = marketStock(77, 0);
  data.set(saveKey, JSON.stringify(drilling({credits: ceramic.price + head.price})));
  let s = await commit(0, {type: 'buy', item: 'ceramic', price: ceramic.price});
  assert.equal(s.ceramic, 1);
  s = await commit(s.revision, {type: 'buy', item: 'drill_head', price: head.price});
  assert.equal(s.credits, 0);
  assert.deepEqual(s.finds, [{id: 'buy:1', kind: 'drill_head', variant: 'standard', durability: head.durability}]);
  await assert.rejects(commit(s.revision, {type: 'buy', item: 'ceramic', price: ceramic.price}), /크레딧이 부족합니다/);
});

test('an auction holds its piece in escrow and settles once when the market clock reaches its end', async t => {
  const data = mockStorage(t);
  const capsule = {id: 'c1', kind: 'capsule', element: 'Og'};
  const glass = {id: 'g1', kind: 'tilt_glass', variant: 'standard'};
  data.set(saveKey, JSON.stringify(drilling({specimens: [capsule], specimenLog: ['capsule'], finds: [glass], findLog: ['tilt_glass']})));
  let s = await commit(0, 'checkpoint', at(0));
  s = await commit(s.revision, {type: 'auction', source: 's', kind: 'capsule', variant: 'Og', id: 'c1'}, at(0));
  assert.deepEqual([s.specimens, s.auctions.map(a => [a.id, a.estimate, a.endsAt])], [[], [['c1', 150, auctionSeconds]]]);
  s = await commit(s.revision, {type: 'auction', source: 'f', kind: 'tilt_glass', variant: 'standard', id: 'g1'}, at(0));
  s = await commit(s.revision, {type: 'cancel-auction', id: 'g1'}, at(1));
  assert.deepEqual(s.finds, [glass]);
  await assert.rejects(commit(s.revision, {type: 'auction', source: 'f', kind: 'drill_head', variant: 'standard'}), /경매에 올릴 수 없습니다/);
  for (let time = 30; time < auctionSeconds; time += 30) s = await commit(s.revision, 'checkpoint', at(time));
  assert.equal(s.auctions.length, 1);
  s = await commit(s.revision, 'checkpoint', at(auctionSeconds + 1));
  const outcome = auctionOutcome(77, 'c1', 150);
  assert.deepEqual(s.auctions, []);
  if (outcome.sold) assert.deepEqual([s.credits, s.tradeLog[0]], [outcome.net, 'sold:c1:' + outcome.price + ':' + outcome.fee]);
  else assert.deepEqual([s.specimens, s.tradeLog[0]], [[capsule], 'unsold:c1']);
  const later = await commit(s.revision, 'checkpoint', at(auctionSeconds + 2));
  assert.equal(later.credits, s.credits);
  assert.equal(later.tradeLog.length, 1);
  await assert.rejects(commit(later.revision, {type: 'cancel-auction', id: 'c1'}), /이미 끝난 경매/);
});

test('a version-8 save opens with an empty wallet and malformed trade state is rejected', t => {
  const data = mockStorage(t);
  const clean = readSave();
  const old = {...clean, version: 8};
  for (const k of ['credits', 'marketSeed', 'marketTime', 'marketClock', 'auctions', 'tradeLog', 'purchaseCount']) delete old[k];
  data.set(saveKey, JSON.stringify(old));
  const s = readSave();
  assert.equal(s.version, saveVersion);
  assert.deepEqual([s.credits, s.marketTime, s.marketClock, s.auctions, s.tradeLog], [0, 0, null, [], []]);
  assert.ok(Number.isSafeInteger(s.marketSeed));
  for (const bad of [{credits: -1}, {credits: 1.5}, {marketTime: -1}, {marketSeed: 2 ** 32},
    {auctions: [{id: 'x', piece: {id: 'y', kind: 'capsule', element: 'Og'}, origin: 'specimens', estimate: 1, endsAt: 1}]},
    {auctions: [{id: 'x', piece: {id: 'x', kind: 'capsule', element: 'Og'}, origin: 'finds', estimate: 1, endsAt: 1}]}]) {
    data.set(saveKey, JSON.stringify({...clean, ...bad}));
    assert.throws(readSave, /원본을 보존/, JSON.stringify(bad));
  }
});
