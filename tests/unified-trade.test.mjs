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
  await assert.rejects(commit(s.revision, {type: 'auction', source: 'f', kind: 'tilt_glass', variant: 'standard', id: 'g1'}, at(0)), /분석을 마친/);
  data.set(saveKey, JSON.stringify({...s, research: ['tilt_glass']}));
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

test('other machines list two lots a cycle whose visible top bid climbs to a hidden ceiling', async () => {
  const { lotsFor, visibleRival, minimumBid, lotById, cycleSeconds: cycle } = await import('../next/trade.js');
  const lots = lotsFor(77, 3);
  assert.equal(lots.length, 2);
  assert.deepEqual(lots, lotsFor(77, 3));
  assert.notDeepEqual(lots, lotsFor(77, 4));
  assert.deepEqual(lotById(77, lots[1].id), lots[1]);
  for (const lot of lots) {
    assert.equal(lot.endsAt, 4 * cycle);
    let last = -1;
    for (let t = 3 * cycle; t <= 4 * cycle; t += 30) {
      const top = visibleRival(lot, t);
      assert.ok(top >= last && top <= lot.rival);
      last = top;
    }
    assert.equal(visibleRival(lot, 4 * cycle), lot.rival);
    assert.ok(minimumBid(lot, 3 * cycle + 60, 0) > visibleRival(lot, 3 * cycle + 60));
  }
});

test('a bid reserves credits until its lot closes, then wins and pays or is released', async t => {
  const { lotsFor, minimumBid, cycleSeconds: cycle } = await import('../next/trade.js');
  const data = mockStorage(t);
  // Find a seed whose first lot of cycle 0 has a ceiling the test can beat and another it cannot.
  let seed = 1;
  while (!(lotsFor(seed, 0)[0].rival > 0 && lotsFor(seed, 0)[0].rival < 900)) seed++;
  const lot = lotsFor(seed, 0)[0], other = lotsFor(seed, 0)[1];
  data.set(saveKey, JSON.stringify(drilling({marketSeed: seed, credits: 1000})));
  let s = await commit(0, 'checkpoint', at(0));
  const min = minimumBid(lot, s.marketTime);
  await assert.rejects(commit(s.revision, {type: 'bid', lot: lot.id, amount: min - 1}, at(0)), /더 높은 금액/);
  s = await commit(s.revision, {type: 'bid', lot: lot.id, amount: min}, at(0));
  assert.deepEqual(s.bids, [{lot: lot.id, amount: min}]);
  const raise = minimumBid(lot, s.marketTime, min);
  assert.equal(raise, min + Math.max(1, Math.round(lot.estimate * 0.05)));
  await assert.rejects(commit(s.revision, {type: 'bid', lot: lot.id, amount: raise - 1}, at(0)), /더 높은 금액/);
  s = await commit(s.revision, {type: 'bid', lot: lot.id, amount: Math.max(lot.rival, raise)}, at(0));
  assert.equal(s.bids[0].amount, Math.max(lot.rival, raise));
  const reserved = s.bids[0].amount;
  await assert.rejects(commit(s.revision, {type: 'bid', lot: other.id, amount: 1000 - reserved + 1}, at(0)), /크레딧이 부족|더 높은 금액/);
  // Run the market clock past the close of cycle 0.
  for (let time = 30; time <= cycle + 30; time += 30) s = await commit(s.revision, 'checkpoint', at(time));
  assert.deepEqual(s.bids, []);
  assert.equal(s.credits, 1000 - reserved);
  assert.equal(s.tradeLog.find(e => e.startsWith('won:')), 'won:' + lot.id + ':' + reserved);
  assert.ok([...s.specimens, ...s.finds].some(p => p.id === lot.piece.id));
  await assert.rejects(commit(s.revision, {type: 'bid', lot: lot.id, amount: 5000}, at(cycle + 30)), /입찰할 수 없는/);
});

test('a bid below the ceiling is released, and reserved credits cannot exceed the wallet', async t => {
  const { lotsFor, minimumBid, cycleSeconds: cycle } = await import('../next/trade.js');
  const data = mockStorage(t);
  let seed = 1;
  while (!(lotsFor(seed, 0)[0].rival > minimumBid(lotsFor(seed, 0)[0], 0) + 10)) seed++;
  const lot = lotsFor(seed, 0)[0];
  data.set(saveKey, JSON.stringify(drilling({marketSeed: seed, credits: 2000})));
  let s = await commit(0, 'checkpoint', at(0));
  s = await commit(s.revision, {type: 'bid', lot: lot.id, amount: minimumBid(lot, 0)}, at(0));
  for (let time = 30; time <= cycle + 30; time += 30) s = await commit(s.revision, 'checkpoint', at(time));
  assert.deepEqual([s.credits, s.bids, s.tradeLog.find(e => e.startsWith('outbid:'))], [2000, [], 'outbid:' + lot.id]);
  const clean = readSave();
  data.set(saveKey, JSON.stringify({...clean, credits: 10, bids: [{lot: 'c0-0', amount: 11}]}));
  assert.throws(readSave, /원본을 보존/);
  const old = {...clean, version: 14};
  delete old.bids;
  data.set(saveKey, JSON.stringify(old));
  assert.deepEqual(readSave().bids, []);
});
