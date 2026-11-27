import { intersectStone } from './rock-shapes.js';
import { cargoLoss } from './hazards.js';
import { cargoNames } from './chunk-terrain.js';
import { createWorld, forward, offset, portalRayDistance } from './world.js';
import { upgrades, upgradeIds, upgradeCost, level, bodyRadius, cellsPerStroke, baseRadius, drillCount, drillSize } from './upgrades.js';
import { readSave, commit, saveKey, decomposeQueue, maxWear, fabricationMs, ceramicPerRepair, variantCounts, decompositionPreview, sellPrice, captureRule, reservedCredits, pledge } from './save.js';
import { massText } from './composition.js';
import { currency, marketCycle, cycleSeconds, auctionSeconds, traderOf, marketStock, auctionEstimate, lotsFor, lotById, visibleRival, minimumBid } from './trade.js';
import { slots, slotOf, working as fittedAndWorking, drillInterval, sensorRange, anchorMass } from './equipment.js';
import { studies, fragments, topics, topicIds, studied, ceramicRocks, impactShare, maintainCost, maintainGain } from './research.js';
import { automations, automationIds, isOn } from './automation.js';
import { arrivalReading } from './arrival.js';
import { valueCollapse, collapseNotes, showsEndless } from './value.js';
import { stages as insightStages, insightStage, traceKey } from './insight.js';
import { categories, targets, winChance, maxMultiple, maxPieces } from './gamble.js';
import { selfParts, recall, traderLook, lossNote, makerNote, finalMemory, deathEnding } from './self.js';
import { endingById, endings, epilogue, allEndingsSeen, playable, endingCount } from './endings.js';
import { portalCost, researchProgress } from './portal.js';
import { createDirector, settings as storySettings } from './story.js';
import { energyCap, energyCost } from './energy.js';
import { parts, partIds, partsOf, mechanical, shardsPerCeramic, plateHull, partsPerMaintain, partCount } from './parts.js';
// Whether the buffer covers an operation's energy, and a short reason when not.
const powered = type => (save?.energy ?? energyCap) >= (energyCost[type] ?? 0);
const lowPower = type => '에너지 부족 · 필요 ' + energyCost[type];
import { trainLength, capacity, load, canCouple, wagonCost, safeLength, wagonsBeyondSafe, speedFactor, carFill, machineLength, wagonLength, crossingCars } from './train.js';
let crossing = null;
import { mineralIds, mineralName, variantName, mineralPiece } from './minerals.js';
import { craftRecipes, affords, owned, hullRepairBelow, hullRepairFor } from './craft.js';
import { elementSymbols } from './elements.js';
import { specimenById, specimenLabel } from './specimens.js';
import { findById, findLabel, findPiece, clockText, alienNotes } from './finds.js';
import { createView, portalMarker } from './view.js';
const el = (id) => document.getElementById(id);
const canvas = el('scene'),
  render = createView(canvas);
let save,
  fatal = false,
  busy = false,
  panel = false;
let world,
  pos,
  yaw,
  pitch,
  velocity,
  drift,
  sensor,
  anchors,
  timer,
  targetTag,
  entered;
let age = 0,
  previous = 0,
  lastDraw = 0,
  pointer = null,
  audio,
  osc,
  gain;
let contact = null, fracture = null, installedUntil = 0;
let lastRockGain = -Infinity;
let nextHullRepair = 0;
let nextAutomation = 0;
let snagged = null;
let chainShots = [];
let safeStopUntil = 0, saveFailures = 0;
// Story clues keep their own seen list apart from the save and their own clock,
// which runs only while the page is visible.
const story = createDirector({get: k => localStorage.getItem(k), set: (k, v) => localStorage.setItem(k, v)});
let storyClock = 0, storyUntil = 0, tradeSeenSince = null;
// The trade drone is small enough for any portal: each trade sends it from the
// hull into the nearest open entrance (or ahead, relaying) and back.
let drones = [];
const droneOut = 1.4, droneAway = 1.2;
function launchDrone() {
  const from = pos.map((v, i) => v + (i === 1 ? 0.6 : 0));
  const gate = world.portals().filter(p => !p.exit).map(p => [p, Math.hypot(...p.point.map((v, i) => v - pos[i]))])
    .filter(([, d]) => d < 40).sort((a, b) => a[1] - b[1])[0]?.[0];
  const to = gate ? gate.point.slice() : offset(from, forward(yaw, pitch + 0.3), 6);
  drones.push({from, to, at: age, gate: !!gate});
}
// Where each drone is now: out along its path, gone through the portal, then back.
function dronePoints() {
  const total = droneOut * 2 + droneAway;
  drones = drones.filter(d => age - d.at < total);
  return drones.flatMap(d => {
    const t = age - d.at;
    const k = t < droneOut ? t / droneOut : t < droneOut + droneAway ? null : 1 - (t - droneOut - droneAway) / droneOut;
    if (k === null) return [];
    const ease = k * k * (3 - 2 * k);
    return [{point: d.from.map((v, i) => v + (d.to[i] - v) * ease + (i === 1 ? Math.sin(Math.PI * k) * 0.8 : 0)), blink: Math.floor(age * 6) % 2 === 0}];
  });
}
let checkpointAge = 0;
let hull = 100;
let hazardVisible = false;
let discoveryNoticeUntil = 0;
let laserJob = null;
// Chunk the machine was last in, and whether a long-train crossing awaits saving.
let lastChunk = '', crossPending = false;
// Whether the new-run button is waiting for its confirming press.
let confirmCycle = false;
// `?seed=N` fixes the seed of every newly created world (N plus the number of
// completed trips), so automated checks see the same terrain on each run.
// Without it each new world draws a random seed. Saved worlds keep their own.
const seedParam = new URLSearchParams(location.search).get('seed');
const fixedSeed = /^\d{1,10}$/.test(seedParam ?? '') ? Number(seedParam) >>> 0 : undefined;
function newSeed(trips) {
  return fixedSeed === undefined ? undefined : (fixedSeed + trips) >>> 0;
}
function loadWorld() {
  crossing = null;
  // A new or reloaded world starts a fresh chunk reference; arriving is not a crossing.
  lastChunk = '';
  crossPending = false;
  const session = save?.session;
  contact = fracture = null;
  lastRockGain = -Infinity;
  installedUntil = 0;
  checkpointAge = 0;
  hazardVisible = false;
  discoveryNoticeUntil = 0;
  laserJob = null;
  hull = session?.hull ?? 100;
  world = createWorld(!save?.transited, undefined, save?.arrivalRadius, save?.arrivalStrength, session?.world, undefined, newSeed(save?.trips ?? 0));
  pos = session?.pos ?? [0.5, 0.5, 0.5];
  velocity = session?.velocity ?? [0, 0, 0];
  drift = session?.drift ?? [0,0,0];
  yaw = session?.yaw ?? 0;
  pitch = session?.pitch ?? 0;
  sensor = session?.sensor ?? false;
  entered = session ? world.portals()[session.entered] : false;
  anchors = [];
  chainShots = [];
  timer = 0;
  targetTag = '';
}
function message(text) {
  el('message').textContent = text;
}
function showDiscoveries() {
  const book = el('discoveries');
  const entries = save?.discoveries ?? [];
  const found = save?.mineralLog ?? [];
  const samples = save?.specimenLog ?? [];
  const items = save?.findLog ?? [];
  book.hidden = !entries.length && !found.length && !samples.length && !items.length;
  if (!panel || book.hidden) {
    book.open = false;
    return;
  }
  const list = el('discovery-list');
  const lines = [...found.map(id => '광물 · ' + mineralName(id)),
    ...samples.map(kind => '시료 · ' + (kind === 'capsule' ? '원소 표본 캡슐' : specimenById(kind).name)),
    ...items.map(kind => '물품 · ' + findById(kind).name + (kind === 'desk_clock' && save.clockLog?.length
      ? ' · 멈춘 시각 ' + save.clockLog.map(clockText).join(', ') : '')),
    ...entries.map(({item,count}) => cargoNames[item] + ' · 누적 회수 ' + count + '개')];
  if (list.textContent === lines.join('')) return;
  list.replaceChildren(...lines.map(text => {
    const row = document.createElement('li');
    row.textContent = text;
    return row;
  }));
}
// Owned sub-species as [mineral, variant, count], in catalog order.
// Decomposer choices: [value, label, units]. Minerals by sub-species, then
// specimens and capsules grouped by identical contents.
function decomposeChoices() {
  const choices = mineralIds.flatMap(id => Object.entries(variantCounts(save, id)).filter(([, n]) => n > 0)
    .map(([v, n]) => ['m:' + id + ':' + v,
      (variantName(id, v) === mineralName(id) ? mineralName(id) : variantName(id, v) + ' (' + mineralName(id) + ')') + ' · ' + n + '개']));
  const count = (list, valueOf, labelOf) => {
    const groups = new Map();
    for (const p of list) {
      const value = valueOf(p);
      if (value) groups.set(value, [(groups.get(value)?.[0] ?? 0) + 1, p]);
    }
    for (const [value, [n, p]] of groups) choices.push([value, labelOf(p) + ' · ' + n + '개']);
  };
  count(save.specimens ?? [], p => 's:' + p.kind + ':' + (p.kind === 'capsule' ? p.element : p.variant),
    p => specimenLabel(p.kind, p.variant, p.element, p.form));
  count(save.finds ?? [], p => findPiece(p.kind, p.variant) && 'f:' + p.kind + ':' + p.variant,
    p => findLabel(p) + (findById(p.kind).setting ? ' (' + findById(p.kind).setting + ')' : ''));
  for (const id of partIds) if (save.parts?.[id]) choices.push(['p:' + id, '부품 · ' + parts[id].name + ' · ' + save.parts[id] + '개']);
  return choices;
}
function decomposeOperation(value) {
  const [source, kind, variant] = value.split(':');
  if (source === 'p') return {type: 'decompose', part: kind};
  if (source === 'm') return {type: 'decompose', mineral: kind, variant};
  if (source === 'f') return {type: 'decompose', find: kind, variant};
  return kind === 'capsule' ? {type: 'decompose', kind, element: variant} : {type: 'decompose', kind, variant};
}
const yieldText = out => elementSymbols.filter(e => out[e]).map(e => e + ' ' + massText(out[e], e)).join(' · ');
function showDecomposer() {
  const box = el('decomposer');
  box.hidden = !save?.front;
  if (!panel || box.hidden) return;
  const select = el('decompose-source');
  const options = decomposeChoices();
  if (select.dataset.options !== JSON.stringify(options)) {
    const chosen = select.value;
    select.replaceChildren(...options.map(([value, label]) => new Option(label, value)));
    select.dataset.options = JSON.stringify(options);
    if (options.some(([value]) => value === chosen)) select.value = chosen;
  }
  const choice = options.find(([value]) => value === select.value);
  const result = choice && decompositionPreview(save, decomposeOperation(choice[0]));
  // The loss is shown but never explained: the machine keeps no record of where it goes.
  el('decompose-preview').textContent = result ? choice[1].replace(/ · \d+개$/, '') + ' 1개 · ' + massText(result.grams) +
    ' → 회수 ' + massText(result.kept) + ' · 손실 ' + massText(result.grams - result.kept) + ' (' + lossNote(recall(save)) + ')\n' + yieldText(result.out)
    : '분해할 원료가 없습니다.';
  el('decompose').disabled = !result || !powered('decompose');
  // An everyday item can instead be taken apart into reusable parts, losing nothing.
  const [src, kind, variant] = (choice?.[0] ?? '').split(':');
  const got = src === 'f' ? partsOf(kind, variant) : [];
  el('salvage').hidden = !got.length;
  el('salvage').textContent = '부품으로 회수 · ' + got.map(id => parts[id].name).join(' + ') + ' (손실 없음)';
  el('decompose').textContent = powered('decompose') ? '원료 1개 분해 · 에너지 ' + energyCost.decompose : lowPower('decompose');
  const book = el('element-book');
  const log = save.elementLog ?? [];
  book.hidden = !log.length;
  el('element-count').textContent = log.length + ' / ' + elementSymbols.length + '종';
  el('element-list').textContent = elementSymbols.filter(symbol => log.includes(symbol))
    .map(symbol => symbol + ' ' + massText(save.elements[symbol] ?? 0, symbol)).join(' · ');
}
// Drone trade with machines of other times. Prices hold for one market cycle.
const credit = n => n.toLocaleString('ko-KR') + ' ' + currency;
const pieceName = p => p.mineral ? variantName(p.mineral, p.variant) + ' ' + (p.count ?? 1) + '개 묶음' : p.kind === 'capsule' || specimenById(p.kind) ? specimenLabel(p.kind, p.variant, p.element, p.form) : findLabel(p);
function tradeOperation(value) {
  const [source, kind, variant, id] = value.split('|');
  return {source, kind, variant, element: kind === 'capsule' ? variant : undefined, id: id || undefined};
}
function sellChoices() {
  const choices = [];
  for (const id of mineralIds)
    for (const [v, n] of Object.entries(variantCounts(save, id))) if (n > 0)
      choices.push(['m|' + id + '|' + v, (variantName(id, v) === mineralName(id) ? mineralName(id) : variantName(id, v) + ' (' + mineralName(id) + ')') + ' · ' + n + '개']);
  const groups = new Map();
  for (const p of save.specimens) {
    const value = 's|' + p.kind + '|' + (p.kind === 'capsule' ? p.element : p.variant);
    groups.set(value, [(groups.get(value)?.[0] ?? 0) + 1, p]);
  }
  if (save.ceramic) choices.push(['c|ceramic|', '세라믹 · ' + save.ceramic + '개']);
  for (const id of partIds) if (save.parts?.[id]) choices.push(['p|' + id + '|', '부품 · ' + parts[id].name + ' · ' + save.parts[id] + '개']);
  for (const p of save.finds) {
    const c = findById(p.kind).category;
    const value = 'f|' + p.kind + '|' + p.variant + (c === 'equipment' ? '|' + p.id : '');
    groups.set(value, [(groups.get(value)?.[0] ?? 0) + 1, p]);
  }
  for (const [value, [n, p]] of groups)
    choices.push([value, pieceName(p) + (p.durability !== undefined ? ' · 내구도 ' + p.durability + '%' : '') + ' · ' + n + '개']);
  return choices.map(([value, label]) => [value, label, sellPrice(save, tradeOperation(value))]).filter(c => c[2]);
}
// Every piece can go to auction (unknowns once analysed); minerals as bundles of ten.
function auctionChoices() {
  const out = [];
  for (const id of mineralIds)
    for (const [v, n] of Object.entries(variantCounts(save, id))) if (n >= 10)
      out.push(['m|' + id + '|' + v + '|10', variantName(id, v) + ' 10개 묶음', auctionEstimate({mineral: id, count: 10})]);
  for (const p of save.specimens) out.push(['s|' + p.kind + '|' + (p.kind === 'capsule' ? p.element : p.variant) + '|' + p.id, pieceName(p), auctionEstimate(p)]);
  for (const p of save.finds) if (findById(p.kind).category !== 'unknown' || save.research.includes(p.kind))
    out.push(['f|' + p.kind + '|' + p.variant + '|' + p.id, pieceName(p) + (p.durability !== undefined ? ' · 내구도 ' + p.durability + '%' : ''), auctionEstimate(p)]);
  return out.filter(c => c[2]);
}
function fillSelect(select, options) {
  if (select.dataset.options === JSON.stringify(options)) return;
  const chosen = select.value;
  select.replaceChildren(...options.map(([value, label]) => new Option(label, value)));
  select.dataset.options = JSON.stringify(options);
  if (options.some(([value]) => value === chosen)) select.value = chosen;
}
// Log entries are "sold:<id>:<price>:<fee>" or "unsold:<id>"; ids may contain colons.
function tradeLogText(entry) {
  const parts = entry.split(':');
  const lotName = id => { const lot = lotById(save.marketSeed, id); return lot ? pieceName(lot.piece) : '경매품'; };
  if (parts[0] === 'won') return '경매 낙찰 · ' + lotName(parts[1]) + ' · ' + credit(Number(parts[2]));
  if (parts[0] === 'outbid') return '입찰 실패 · ' + lotName(parts[1]) + ' · 예약 해제';
  if (parts[0] === 'research') return '분석 완료 · ' + (findById(parts[1])?.name ?? parts[1]);
  if (parts[0] === 'unsold') return '유찰 · ' + (tradeNames.get(parts.slice(1).join(':')) ?? '경매품') + ' 반환';
  const fee = Number(parts.pop()), price = Number(parts.pop());
  return '낙찰 · ' + (tradeNames.get(parts.slice(1).join(':')) ?? '경매품') + ' · ' + credit(price) + ' (수수료 ' + credit(fee) + ')';
}
const tradeNames = new Map();
// The balance; when value has fully collapsed it reads as endless now and then.
function showCredits() {
  const reserved = reservedCredits(save);
  const text = showsEndless(valueCollapse(save), age) ? '∞ ' + currency
    : credit(save.credits) + (reserved ? ' (예약 ' + credit(reserved) + ')' : '');
  if (el('credits').textContent !== text) el('credits').textContent = text;
}
function showTrade() {
  const box = el('trade');
  box.hidden = !save?.front;
  if (!panel || box.hidden) return;
  const cycle = marketCycle(save.marketTime);
  const trader = traderOf(save.marketSeed, cycle);
  const reserved = reservedCredits(save);
  showCredits();
  const collapse = valueCollapse(save);
  const left = Math.ceil((cycle + 1) * cycleSeconds - save.marketTime);
  el('trader').textContent = '거래 상대 · 알 수 없음 · 신호 #' + trader.signal + ' · 시세 갱신까지 ' + Math.floor(left / 60) + ':' + String(left % 60).padStart(2, '0') +
    '\n' + traderLook(trader.id, recall(save)) + (collapse ? '\n' + collapseNotes[collapse] : '');
  // What the machine has come to suspect about the other side, step by step.
  const guesses = insightStages.slice(0, insightStage(save) + 1).map(st => st.text);
  if (el('insight-list').dataset.lines !== JSON.stringify(guesses)) {
    el('insight-list').replaceChildren(...guesses.map(text => Object.assign(document.createElement('li'), {textContent: text})));
    el('insight-list').dataset.lines = JSON.stringify(guesses);
  }
  const traced = t => save.insight.traces.includes(traceKey(t)) ? ' · 내 판매 흔적' : '';
  const sells = sellChoices();
  fillSelect(el('sell-source'), sells.map(([value, label, price]) => [value, label + ' → ' + credit(price)]));
  const sell = sells.find(([value]) => value === el('sell-source').value);
  el('sell').textContent = sell ? '1개 판매 · ' + credit(sell[2]) : '판매할 물품 없음';
  el('sell').disabled = !sell;
  const stock = marketStock(save.marketSeed, cycle, mineralIds, mineralName);
  const buttons = stock.map(o => '구매 · ' + o.name + (o.durability ? ' (내구도 ' + o.durability + '%)' : '') + ' · ' + credit(o.price) +
    traced(o.mineral ? {mineral: o.mineral} : o.item === 'ceramic' ? {ceramic: true} : {kind: o.item}));
  const list = el('buy-list');
  if (list.dataset.labels !== JSON.stringify(buttons)) {
    list.replaceChildren(...stock.map((o, i) => {
      const b = Object.assign(document.createElement('button'), {textContent: buttons[i]});
      b.dataset.item = o.item;
      b.onclick = () => {
        const offer = marketStock(save.marketSeed, marketCycle(save.marketTime), mineralIds, mineralName).find(x => x.item === o.item);
        write({type: 'buy', item: o.item, price: offer.price}, () => message(offer.name + ' 구매 · ' + credit(offer.price)));
      };
      return b;
    }));
    list.dataset.labels = JSON.stringify(buttons);
  }
  for (const b of list.children) b.disabled = save.credits - reserved < (stock.find(o => o.item === b.dataset.item)?.price ?? Infinity) ||
    (b.dataset.item.startsWith('m:') && load(save) >= capacity(save));
  // Lots other machines list this cycle: visible top bid, my bid, time left.
  const lots = lotsFor(save.marketSeed, cycle);
  const lotRows = lots.map(lot => {
    const own = save.bids.find(b => b.lot === lot.id)?.amount ?? 0, top = visibleRival(lot, save.marketTime);
    const next = minimumBid(lot, save.marketTime, own);
    return [lot.id, next, pieceName(lot.piece) + traced(lot.piece) + (lot.piece.durability ? ' · 내구도 ' + lot.piece.durability + '%' : '') +
      ' · 추정 ' + credit(lot.estimate) + ' · 최고 ' + credit(Math.max(top, own)) + (own > top ? ' (나)' : '') +
      ' · 마감까지 ' + Math.max(0, Math.ceil(lot.endsAt - save.marketTime)) + '초', own];
  });
  const lotList = el('lot-list');
  const shape = JSON.stringify(lotRows.map(([id, next, text]) => [id, next, text]));
  if (lotList.dataset.rows !== shape) {
    lotList.replaceChildren(...lotRows.map(([id, next, text, own]) => {
      const li = Object.assign(document.createElement('li'), {textContent: text + ' '});
      const bid = Object.assign(document.createElement('button'), {textContent: (own ? '올려 입찰 · ' : '입찰 · ') + credit(next)});
      bid.dataset.amount = next;
      bid.dataset.free = save.credits - reserved + own;
      bid.onclick = () => write({type: 'bid', lot: id, amount: next}, () => message('입찰 · ' + credit(next) + ' 예약'));
      li.append(bid);
      return li;
    }));
    lotList.dataset.rows = shape;
  }
  for (const b of lotList.querySelectorAll('button')) b.disabled = Number(b.dataset.free) < Number(b.dataset.amount);
  const auctions = auctionChoices();
  fillSelect(el('auction-source'), auctions.map(([value, label, estimate]) => [value, label + ' · 추정 ' + credit(estimate)]));
  el('auction').disabled = !auctions.length;
  el('auction').textContent = auctions.length ? '경매 등록 · ' + auctionSeconds + '초 뒤 결과' : '경매에 올릴 물품 없음';
  for (const a of save.auctions) tradeNames.set(a.id, pieceName(a.piece));
  const rows = save.auctions.map(a => [a.id, pieceName(a.piece) + ' · 추정 ' + credit(a.estimate) + ' · 마감까지 ' + Math.max(0, Math.ceil(a.endsAt - save.marketTime)) + '초']);
  const auctionList = el('auction-list');
  if (auctionList.dataset.rows !== JSON.stringify(rows)) {
    auctionList.replaceChildren(...rows.map(([id, text]) => {
      const li = Object.assign(document.createElement('li'), {textContent: text + ' '});
      const cancel = Object.assign(document.createElement('button'), {textContent: '등록 취소'});
      cancel.onclick = () => write({type: 'cancel-auction', id}, () => message('경매 취소 · 물품 반환'));
      li.append(cancel);
      return li;
    }));
    auctionList.dataset.rows = JSON.stringify(rows);
  }
  // Once value has collapsed, a settled price is noted as deciding nothing.
  const log = save.tradeLog.slice(0, 5).map(tradeLogText)
    .map(text => collapse && /^(경매 )?낙찰/.test(text) ? text + ' · 아무것도 정해지지 않음' : text);
  if (el('trade-log').dataset.lines !== JSON.stringify(log)) {
    el('trade-log').replaceChildren(...log.map(text => Object.assign(document.createElement('li'), {textContent: text})));
    el('trade-log').dataset.lines = JSON.stringify(log);
  }
}
// Built-in analysis of unknown materials and reading of memory films.
let memoryUntil = 0;
// Automation studies and their switches, in fixed order, updated in place.
// Research topics in fixed order: studied, studying, open, or waiting on a prerequisite.
function showTopics() {
  const job = save.topics.job;
  el('topic-status').textContent = job ? '· ' + topics[job.id].label + ' 남은 ' + Math.max(0, Math.ceil(job.endsAt - save.marketTime)) + '초'
    : '· ' + save.topics.done.length + ' / ' + topicIds.length;
  const list = el('topic-list');
  if (list.children.length !== topicIds.length) {
    list.replaceChildren(...topicIds.map(id => {
      const li = document.createElement('li');
      const act = document.createElement('button');
      act.onclick = () => write({type: 'study-topic', id}, () => message('연구 시작 · ' + topics[id].label));
      li.append(document.createElement('span'), ' ', act);
      return li;
    }));
  }
  topicIds.forEach((id, i) => {
    const t = topics[id], li = list.children[i], [label, act] = [li.firstChild, li.lastChild];
    const done = studied(save, id), locked = t.needs && !studied(save, t.needs);
    const short = Object.entries(t.elements).filter(([e, g]) => (save.elements[e] ?? 0) < g);
    const text = t.label + ' · ' + t.unlock + (done ? '' : ' · 에너지 ' + t.energy + ' · ' +
      Object.entries(t.elements).map(([e, g]) => e + ' ' + g + ' g').join(' · ') + ' · ' + t.seconds + '초');
    li.className = done || (!locked && !short.length) ? 'ready' : '';
    if (label.textContent !== text) label.textContent = text;
    act.textContent = done ? '완료' : job?.id === id ? '연구 중' : locked ? topics[t.needs].label + ' 먼저' :
      short.length ? '원소 부족 · ' + short.map(([e]) => e).join(', ') : save.energy < t.energy ? '에너지 부족 · 필요 ' + t.energy : '연구';
    act.disabled = done || !!job || !!locked || short.length > 0 || save.energy < t.energy;
  });
}
// Equipment maintenance appears once part structure is studied: every worn piece, fitted or stored.
function showParts() {
  const shards = partCount(save, ['ceramic_shard']), plates = partCount(save, ['light_plate']);
  el('parts-title').hidden = !shards && !plates;
  el('refire-shards').hidden = !shards;
  el('refire-shards').textContent = '세라믹 파편 재소성 · 파편 ' + Math.min(shards, shardsPerCeramic) + '/' + shardsPerCeramic + ' → 세라믹 1개';
  el('refire-shards').disabled = shards < shardsPerCeramic;
  el('patch-hull').hidden = !plates;
  el('patch-hull').textContent = '경량 판재로 기체 보강 · 기체 +' + plateHull + '% · 판재 ' + plates + '개';
  el('patch-hull').disabled = hull >= 100;
}
function showMaintain() {
  showParts();
  const on = studied(save, 'part_structure');
  el('maintain-title').hidden = !on;
  const pieces = on ? [...Object.values(save.equipment), ...save.finds].filter(p => p.durability !== undefined && p.durability < (p.maxDurability ?? 100)) : [];
  // Each maintenance also wears the maximum by up to 3%.
  const rows = pieces.map(p => [p.id, pieceName(p) + ' · 내구도 ' + p.durability + '% / 최대 ' + (p.maxDurability ?? 100) + '% → 최대 ' + maxWear + '% 감소 후 +' + maintainGain + '% · ' +
    Object.entries(maintainCost).map(([id, n]) => mineralName(id) + ' ' + Math.min(owned(save, id), n) + '/' + n).join(' · ') + ' · 에너지 ' + energyCost.maintain]);
  const list = el('maintain-list');
  if (list.dataset.ids !== rows.map(r => r[0]).join()) {
    list.replaceChildren(...rows.map(([id]) => {
      const li = document.createElement('li');
      const act = Object.assign(document.createElement('button'), {textContent: '정비'});
      act.onclick = () => write({type: 'maintain', id}, () => message('장비 정비 완료'));
      // Two salvaged mechanical parts can stand in for the minerals.
      const alt = Object.assign(document.createElement('button'), {textContent: '기계 부품 ' + partsPerMaintain + '개로 정비'});
      alt.onclick = () => write({type: 'maintain', id, parts: true}, () => message('부품으로 장비 정비 완료'));
      li.append(document.createElement('span'), ' ', act, ' ', alt);
      return li;
    }));
    list.dataset.ids = rows.map(r => r[0]).join();
  }
  const ok = affords(save, maintainCost) && powered('maintain');
  rows.forEach(([, text], i) => {
    const li = list.children[i];
    if (li.firstChild.textContent !== text) li.firstChild.textContent = text;
    const byParts = partCount(save, mechanical) >= partsPerMaintain && powered('maintain');
    li.className = ok || byParts ? 'ready' : '';
    li.children[1].disabled = !ok;
    li.lastChild.disabled = !byParts;
    li.lastChild.hidden = !partCount(save, mechanical);
  });
}
function showAutomation() {
  const auto = save.automation, job = auto.job;
  el('automation-status').textContent = job ? '· ' + automations[job.id].label + ' 남은 ' +
    Math.max(0, Math.ceil(job.endsAt - save.marketTime)) + '초' : '· ' + auto.unlocked.length + ' / ' + automationIds.length;
  const list = el('automation-list');
  if (list.children.length !== automationIds.length) {
    list.replaceChildren(...automationIds.map(id => {
      const li = document.createElement('li');
      const act = document.createElement('button');
      act.onclick = () => {
        if (!save.automation.unlocked.includes(id))
          write({type: 'automate', id}, () => message('자동화 연구 시작 · ' + automations[id].label));
        else {
          const on = !isOn(save, id);
          write({type: 'automation-switch', id, on}, () => message(automations[id].label + (on ? ' 켬' : ' 끔')));
        }
      };
      li.append(document.createElement('span'), ' ', act);
      return li;
    }));
  }
  const free = save.credits - reservedCredits(save);
  automationIds.forEach((id, i) => {
    const a = automations[id], li = list.children[i], [label, act] = [li.firstChild, li.lastChild];
    const done = auto.unlocked.includes(id);
    const short = !done && (free < a.credits || Object.entries(a.elements).some(([e, g]) => (save.elements[e] ?? 0) < g));
    const text = a.label + ' · ' + a.effect + (done ? '' : ' · ' + credit(a.credits) + ' · ' +
      Object.entries(a.elements).map(([e, g]) => e + ' ' + g + ' g').join(' · ') + ' · ' + a.seconds + '초');
    li.className = done || !short ? 'ready' : '';
    if (label.textContent !== text) label.textContent = text;
    act.textContent = done ? (isOn(save, id) ? '켜짐' : '꺼짐') : job?.id === id ? '연구 중' : short ? '재료 부족' : !powered('automate') ? lowPower('automate') : '연구 · 에너지 ' + energyCost.automate;
    act.disabled = (!done && (!!job || short || !powered('automate')));
  });
}
// Presses one automated button when its condition holds; true when it wrote.
function automate() {
  if (isOn(save, 'capture') && save.captures?.length && !el('capture').hidden) { el('capture').click(); return true; }
  if (isOn(save, 'repair') && (save.drillCondition ?? 100) < 50) {
    if ((save.ceramic ?? 0) >= ceramicPerRepair) { write('repair', () => message('자동 드릴 수리')); return true; }
    if (save.rocks >= ceramicRocks(save) && powered('fire-ceramic')) { write('fire-ceramic', () => message('자동 세라믹 가열')); return true; }
  }
  const full = load(save) >= capacity(save) * 0.9;
  if (isOn(save, 'wagon') && full && canCouple(save) && trainLength(save) + 3 <= safeLength &&
    (save.minerals.iron ?? 0) >= wagonCost.iron && save.rocks >= wagonCost.rock) {
    write({type: 'add-wagon'}, () => message('자동 화물칸 연결'));
    return true;
  }
  if (isOn(save, 'sell') && full) {
    const id = mineralIds.reduce((a, b) => owned(save, b) > owned(save, a) ? b : a);
    const v = Object.entries(variantCounts(save, id)).find(([, n]) => n > 0)?.[0];
    const op = v && {source: 'm', kind: id, variant: v};
    const price = op && sellPrice(save, op);
    if (price) { write({type: 'sell', ...op, price}, () => message('자동 판매 · ' + variantName(id, v) + ' · ' + credit(price))); return true; }
  }
  if (isOn(save, 'decompose') && powered('decompose')) {
    const p = save.finds.find(q => ['household', 'artifact', 'alien'].includes(findById(q.kind).category) && findPiece(q.kind, q.variant));
    if (p) { write({type: 'decompose', find: p.kind, variant: p.variant}, () => message('자동 분해 · ' + pieceName(p))); return true; }
  }
  if (isOn(save, 'analyze') && !save.researchJob && powered('research')) {
    const kind = save.finds.map(p => p.kind).find(k => studies[k] && !save.research.includes(k) &&
      Object.entries(studies[k].cost).every(([e, g]) => (save.elements[e] ?? 0) >= g));
    if (kind) { write({type: 'research', kind}, () => message('자동 분석 시작 · ' + findById(kind).name)); return true; }
    if (!el('read-film').hidden) { el('read-film').click(); return true; }
  }
  if (isOn(save, 'equip')) {
    const p = save.finds.find(q => slotOf(q.kind) && q.durability > 0 && !save.equipment[slotOf(q.kind)]);
    if (p) { write({type: 'equip', id: p.id}, () => message('자동 장착 · ' + pieceName(p))); return true; }
  }
  if (isOn(save, 'upgrade')) {
    const id = upgradeIds.map(k => [k, upgradeCost(save, k)]).filter(([, c]) => c && affords(save, c))
      .sort((a, b) => Object.values(a[1]).reduce((n, x) => n + x, 0) - Object.values(b[1]).reduce((n, x) => n + x, 0))[0]?.[0];
    if (id) { write({type: 'upgrade', id}, () => message('자동 강화 · ' + upgrades[id].label + ' ' + level(save, id) + '단계')); return true; }
  }
  return false;
}
// Gambling: a target, a multiple, and the pledge it would take.
const targetName = (category, id) => category === 'mineral' ? mineralName(id) : category === 'research' ? automations[id].label : findById(id).name;
function gambleChoice() {
  const category = el('gamble-category').value, id = el('gamble-target').value;
  const base = targets(category, mineralIds).find(([t]) => t === id)?.[1];
  const multiple = Math.round(Number(el('gamble-multiple').value));
  return {category, id, base, multiple, ok: !!base && multiple >= 1 && multiple <= maxMultiple};
}
function showGamble() {
  const box = el('gamble');
  box.hidden = !save?.front;
  if (!panel || box.hidden) return;
  fillSelect(el('gamble-category'), Object.entries(categories));
  fillSelect(el('gamble-target'), targets(el('gamble-category').value, mineralIds)
    .map(([id, base]) => [id, targetName(el('gamble-category').value, id) + ' · 기준 ' + credit(base)]));
  const c = gambleChoice();
  const stake = c.ok ? c.base * c.multiple : 0;
  const pawn = c.ok && pledge(save, stake);
  el('gamble-preview').textContent = !c.ok ? '배수는 1부터 ' + maxMultiple + '까지입니다.' :
    '담보 ' + credit(stake) + (pawn ? ' = 크레딧 ' + pawn.credits + (pawn.minerals.length ? ' + ' +
      pawn.minerals.map(([m, v, n]) => variantName(m, v) + ' ' + n).join(' · ') : '') : ' · 담보 부족') +
    '\n당첨 확률 ' + Math.round(winChance * 100) + '% · 당첨 시 ' + targetName(c.category, c.id) + ' × ' + c.multiple +
    (c.category === 'item' || c.category === 'equipment' ? ' (실물 최대 ' + maxPieces + '개, 나머지는 크레딧)' : '') + ' · 낙첨 시 담보 소실';
  el('gamble-draw').disabled = !pawn;
  const lines = save.gambleLog.map(e => (e.win ? '당첨' : '낙첨') + ' · ' + targetName(e.category, e.id) + ' × ' + e.multiple + ' · 담보 ' + credit(e.stake));
  if (el('gamble-log').dataset.lines !== JSON.stringify(lines)) {
    el('gamble-log').replaceChildren(...lines.map(text => Object.assign(document.createElement('li'), {textContent: text})));
    el('gamble-log').dataset.lines = JSON.stringify(lines);
  }
}
// The portal design waits at the end of research.
function showPortal() {
  const p = researchProgress(save);
  el('portal-status').textContent = save.portalBuilt ? '· 제작함' : p.done ? '· 제작 가능' : '· 잠김';
  const short = Object.entries(portalCost.elements).filter(([e, g]) => (save.elements[e] ?? 0) < g);
  const poor = save.credits - reservedCredits(save) < portalCost.credits;
  el('portal-preview').textContent = !p.done
    ? '연구의 끝에 열린다 · 분석 ' + p.analyses + ' / ' + Object.keys(studies).length + ' · 자동화 ' + p.automations + ' / ' + automationIds.length
    : '필요 ' + credit(portalCost.credits) + ' · ' + Object.entries(portalCost.elements).map(([e, g]) => e + ' ' + g + ' g').join(' · ') +
      (save.portalBuilt ? '\n이 모든 것은 내가 포탈을 만들면서 시작되었다.' : '');
  el('build-portal').hidden = !p.done;
  el('build-portal').disabled = poor || short.length > 0 || !powered('build-portal');
  el('build-portal').textContent = short.length ? '원소 부족 · ' + short.map(([e]) => e).join(', ') : poor ? '크레딧 부족' : !powered('build-portal') ? lowPower('build-portal') : (save.portalBuilt ? '포탈 다시 제작' : '포탈 제작') + ' · 에너지 ' + energyCost['build-portal'];
}
// The gravity sensor reads the field of the chunk the machine is in: whether
// there is one, how strong, and which way relative to the machine's heading.
function showMicro() {
  // A portal forming here reads first: as microgravity that keeps growing.
  const f = save?.front ? world.forming(pos) ?? world.microgravity(pos) : null;
  let text = '';
  if (f) {
    const ahead = forward(yaw, 0), side = [Math.cos(yaw), 0, -Math.sin(yaw)];
    const dot = v => v.reduce((n, x, i) => n + x * f.dir[i], 0);
    const parts = [[dot(ahead), '앞', '뒤'], [dot(side), '오른쪽', '왼쪽'], [f.dir[1], '위', '아래']]
      .filter(([v]) => Math.abs(v) > 0.35).map(([v, plus, minus]) => v > 0 ? plus : minus);
    text = '미세중력 감지 · 세기 ' + f.strength.toFixed(2) + ' · 방향 ' + (parts.join('·') || '불분명') + (f.forming ? ' · 점점 강해짐' : f.varied ? ' · 위치마다 변함' : '');
  }
  const out = el('micro');
  if (out.textContent !== text) out.textContent = text;
  out.hidden = !text;
}
// The trade screen counts as observed once it has been open and readable for
// three seconds; then the signal and this cycle's quotes may raise a clue.
// Clues show only when nothing else is speaking: not in the intro, with the
// menu open, during an ending, or while a memory line is up.
function showStory(dt) {
  if (!document.hidden) storyClock += dt;
  const trading = panel && save?.front && el('trade').open;
  if (!trading) tradeSeenSince = null;
  else if (tradeSeenSince === null) tradeSeenSince = storyClock;
  else if (storyClock - tradeSeenSince >= 3) {
    const cycle = marketCycle(save.marketTime), trader = traderOf(save.marketSeed, cycle);
    story.emit('trader_signal', trader.id + ':' + trader.signal);
    story.emit('quote_observed', save.marketSeed + ':' + cycle);
  }
  const canShow = !!save?.front && !panel && !document.hidden && age >= memoryUntil && el('ending').hidden;
  const line = story.next(storyClock, canShow);
  const out = el('story-line');
  if (line) {
    out.textContent = line;
    storyUntil = storyClock + storySettings.showSeconds;
  }
  const visible = storyClock < storyUntil;
  if (out.hidden === visible) out.hidden = !visible;
}
function showResearch() {
  const box = el('research');
  const owned = [...new Set(save?.finds?.filter(p => studies[p.kind]).map(p => p.kind) ?? [])];
  box.hidden = !save?.front;
  if (!panel || box.hidden) return;
  showTopics();
  showAutomation();
  showPortal();
  const job = save.researchJob;
  el('research-status').textContent = job ? '· 분석 중' : save.research.length ? '· ' + save.research.length + '종 완료' : '';
  const open = owned.filter(k => !save.research.includes(k));
  fillSelect(el('research-source'), open.map(k => [k, findById(k).name]));
  const study = studies[el('research-source').value];
  const short = study && Object.entries(study.cost).filter(([e, g]) => (save.elements[e] ?? 0) < g);
  el('research-preview').textContent = job
    ? '분석 중 · ' + findById(job.kind).name + ' · 남은 ' + Math.max(0, Math.ceil(job.endsAt - save.marketTime)) + '초'
    : study ? '필요 원소 ' + Object.entries(study.cost).map(([e, g]) => e + ' ' + g + ' g (보유 ' + massText(save.elements[e] ?? 0, e) + ')').join(' · ') +
      '\n소요 ' + study.seconds + '초 · 완료하면 관측 특성과 안전 상태를 기록하고 경매 등록이 열립니다'
    : '분석할 미지 물질이 없습니다.';
  el('research-start').disabled = !!job || !study || short.length > 0 || !powered('research');
  el('research-start').textContent = short?.length ? '원소 부족 · ' + short.map(([e]) => e).join(', ') : !powered('research') ? lowPower('research') : '분석 시작 · 에너지 ' + energyCost.research;
  const films = save.finds.filter(p => p.kind === 'memory_film').length;
  el('read-film').hidden = !save.research.includes('memory_film') || !films || save.memoryLog.length >= fragments.length;
  el('read-film').textContent = '기억막 판독 · ' + films + '장';
  el('read-film').disabled = false;
  const maker = makerNote(recall(save));
  const rows = save.research.map(k => findById(k).name + ' · ' + studies[k].safety + ' · ' + studies[k].traits + (maker ? ' ' + maker : ''));
  if (el('research-list').dataset.rows !== JSON.stringify(rows)) {
    el('research-list').replaceChildren(...rows.map(text => Object.assign(document.createElement('li'), {textContent: text})));
    el('research-list').dataset.rows = JSON.stringify(rows);
  }
  el('memory-book').hidden = !save.memoryLog.length;
  const lines = save.memoryLog.map(i => fragments[i]);
  if (el('memory-list').dataset.rows !== JSON.stringify(lines)) {
    el('memory-list').replaceChildren(...lines.map(text => Object.assign(document.createElement('li'), {textContent: text})));
    el('memory-list').dataset.rows = JSON.stringify(lines);
  }
}
// Ending sequence: an animation per ending with its lines shown in turn.
// Mining keeps running underneath; the player can skip at any time.
let endingRun = null;
function playEnding(id) {
  const ending = playable(id);
  if (!ending) return;
  const box = el('ending'), canvas = el('ending-canvas'), line = el('ending-line'), title = el('ending-title');
  const ctx = canvas.getContext('2d');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lineSeconds = 4.5, start = performance.now();
  box.hidden = false;
  title.textContent = '';
  el('ending-skip').textContent = '건너뛰기';
  const run = {stop: false};
  endingRun?.stop && (endingRun.stop = true);
  endingRun = run;
  // The epilogue gives every third dot to one of the three endings.
  const dots = Array.from({length: 140}, (_, i) => ({a: i * 2.399, r: Math.random(), s: 0.3 + Math.random(),
    as: ending.motion === 'all' ? endings[i % 3] : ending}));
  function draw(now) {
    if (run.stop) return;
    const t = (now - start) / 1000;
    const w = canvas.width = canvas.clientWidth, h = canvas.height = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    const k = still ? 0 : t;
    for (const d of dots) {
      ctx.fillStyle = 'hsla(' + d.as.hue + ',70%,' + (45 + 30 * d.s) + '%,' + (0.25 + 0.45 * d.s) + ')';
      let x, y, size = 1.5 + 2.5 * d.s;
      if (d.as.motion === 'rain') {
        // Memories falling past like unread text.
        x = (d.r * w + d.a * 37) % w;
        y = ((d.s * 90 * k + d.a * 53) % (h + 40)) - 20;
        ctx.fillRect(x, y, 1.5, 10 + 18 * d.s);
        continue;
      }
      if (d.as.motion === 'assemble') {
        // Parts drawn in from the edges to form one body.
        const p = Math.min(1, k / 18 + d.r * 0.2);
        const far = Math.max(w, h) * (0.9 - 0.6 * d.r);
        const near = Math.min(w, h) * 0.18 * (0.6 + 0.4 * d.s);
        const radius = far + (near - far) * p;
        x = w / 2 + Math.cos(d.a) * radius;
        y = h / 2 + Math.sin(d.a) * radius;
      } else if (d.as.motion === 'portal') {
        // Points gather into a square frame that opens wider: a portal being built.
        const side = Math.min(w, h) * (0.15 + 0.3 * Math.min(1, k / 20));
        const along = (d.a * 0.37 + k * 0.05 * d.s) % 4, edge = Math.floor(along), f = along - edge;
        const pull = Math.min(1, k / 10 + d.r * 0.3);
        const tx = [-1 + 2 * f, 1, 1 - 2 * f, -1][edge] * side, ty = [-1, -1 + 2 * f, 1, 1 - 2 * f][edge] * side;
        x = w / 2 + (Math.cos(d.a) * w * 0.6) * (1 - pull) + tx * pull;
        y = h / 2 + (Math.sin(d.a) * h * 0.6) * (1 - pull) + ty * pull;
      } else {
        // Time turning without end.
        const radius = Math.min(w, h) * (0.05 + 0.45 * d.r);
        const angle = d.a + k * (0.6 - d.r * 0.4);
        x = w / 2 + Math.cos(angle) * radius;
        y = h / 2 + Math.sin(angle) * radius;
      }
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    const i = Math.floor(t / lineSeconds);
    if (i < ending.lines.length) {
      if (line.textContent !== ending.lines[i]) line.textContent = ending.lines[i];
      line.style.opacity = still ? 1 : Math.min(1, (t % lineSeconds) / 0.8, (lineSeconds - t % lineSeconds) / 0.8);
    } else {
      line.textContent = '';
      title.textContent = '엔딩 · ' + ending.title;
      el('ending-skip').textContent = '닫기';
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}
function closeEnding() {
  if (endingRun) endingRun.stop = true;
  el('ending').hidden = true;
}
// Cargo train: length against the 16 m chunk side, cargo room and wagons.
let confirmLong = false;
// The quick bar outside the menu: cargo at a glance, drill repair, decompose all.
function showQuick() {
  const box = el('quick');
  box.hidden = !save?.front || panel;
  if (box.hidden) return;
  const text = '화물 ' + load(save) + ' / ' + capacity(save) + ' · 에너지 ' + save.energy + ' · 드릴 ' + (save.drillCondition ?? 100) + '%' +
    (save.drillMax <= 0 ? ' · 수명 다함, 드릴 헤드 교체 필요' : save.drillMax < 100 ? ' / 최대 ' + save.drillMax + '%' : '');
  if (el('quick-cargo').textContent !== text) el('quick-cargo').textContent = text;
  const condition = save.drillCondition ?? 100, ceramic = save.ceramic ?? 0;
  const canFire = save.rocks >= ceramicRocks(save) && powered('fire-ceramic');
  el('quick-repair').hidden = condition >= save.drillMax || save.drillMax <= 0;
  el('quick-repair').textContent = ceramic >= ceramicPerRepair ? '드릴 수리 · 세라믹 1' : canFire ? '드릴 수리 · 세라믹 가열부터' : '드릴 수리 · 재료 부족';
  el('quick-repair').disabled = ceramic < ceramicPerRepair && !canFire;
  const n = Math.min(decomposeQueue(save).length, Math.floor(save.energy / energyCost.decompose));
  el('quick-decompose').textContent = n ? '전체 분해 · ' + n + '개' : decomposeQueue(save).length ? lowPower('decompose') : '분해할 화물 없음';
  el('quick-decompose').disabled = !n;
}
el('quick-repair').onclick = () => {
  if ((save.ceramic ?? 0) >= ceramicPerRepair) {
    const before = save.drillMax;
    write('repair', () => message('드릴 수리 완료 · 드릴 ' + save.drillMax + '% · 최대 내구도 -' + (before - save.drillMax) + '%'));
  }
  else write('fire-ceramic', () => message('세라믹 가열 완료 · 한 번 더 누르면 드릴을 수리합니다'));
};
el('quick-decompose').onclick = () => {
  const before = save.decomposeCount;
  write({type: 'decompose-all'}, () => message('전체 분해 · ' + (save.decomposeCount - before) + '개 · 보관 중인 종류는 제외'));
};
function showTrain() {
  const box = el('train');
  box.hidden = !save?.front;
  if (!panel || box.hidden) return;
  const length = trainLength(save), next = length + 3;
  el('train-summary').textContent = '· ' + length + ' m · ' + load(save) + ' / ' + capacity(save);
  const pace = Math.round(speedFactor(save) * 100);
  const risk = length > safeLength;
  el('train-status').classList.toggle('risk', risk);
  el('train-status').textContent = '화물칸 ' + save.wagons.length + '량 · 열차 ' + length + ' m / 안전 ' + safeLength + ' m · 광물 ' +
    load(save) + ' / ' + capacity(save) + ' · 전진 속도 ' + pace + '%' + (save.leftBehind ? ' · 튕겨낸 광물 ' + save.leftBehind + '개' : '') +
    (risk ? '\n16 m를 넘었습니다. 청크 경계를 지날 때 뒤쪽 화물칸 ' + wagonsBeyondSafe(save).length + '량과 그 화물을 잃을 수 있습니다.' : '') +
    (canCouple(save) ? '' : '\n화물칸을 연결하려면 화물 연결기를 장착해야 합니다.');
  const short = (save.minerals.iron ?? 0) < wagonCost.iron || save.rocks < wagonCost.rock;
  el('add-wagon').disabled = !canCouple(save) || short;
  el('add-wagon').textContent = confirmLong ? '위험 확인 · ' + next + ' m로 연결' :
    '화물칸 연결 · 철광 ' + wagonCost.iron + ' · 일반 암석 ' + wagonCost.rock + (next > safeLength ? ' · ' + next + ' m 경고' : '');
  el('remove-wagon').hidden = !save.wagons.length;
  el('remove-wagon').disabled = false;
  // Everything collected: minerals by sub-species, then items by name.
  const minerals = mineralIds.filter(id => owned(save, id)).map(id => {
    const parts = Object.entries(variantCounts(save, id)).filter(([, n]) => n > 0);
    const detail = parts.length > 1 || (parts[0] && variantName(id, parts[0][0]) !== mineralName(id))
      ? ' (' + parts.map(([v, n]) => variantName(id, v) + ' ' + n).join(' · ') + ')' : '';
    // With the mineral assay studied, each mineral shows its two main elements.
    const piece = studied(save, 'mineral_assay') && mineralPiece(id, parts[0]?.[0]);
    const assay = piece ? ' · ' + Object.entries(piece.fractions).sort((a, b) => b[1] - a[1]).slice(0, 2)
      .map(([e, f]) => e + ' ' + Math.round(f * 100) + '%').join('·') : '';
    return ['m:' + id, '광물 · ' + mineralName(id) + ' × ' + owned(save, id) + detail + assay];
  });
  // Items grouped by name; kinds the decomposer can take carry a storage key.
  const items = new Map();
  const add = (name, key, n = 1) => items.set(name, [key, (items.get(name)?.[1] ?? 0) + n]);
  for (const p of save.specimens) add('시료 · ' + pieceName(p), 's:' + p.kind);
  for (const p of save.finds) add('물품 · ' + pieceName(p), findPiece(p.kind, p.variant) ? 'f:' + p.kind : null);
  (save.cargo ?? []).forEach((n, i) => n && add('물품 · ' + cargoNames[i], null, n));
  if (save.ceramic) add('물품 · 세라믹', null, save.ceramic);
  for (const id of partIds) if (save.parts?.[id]) add('부품 · ' + parts[id].name, 'p:' + id, save.parts[id]);
  const rows = [...minerals, ...Array.from(items, ([name, [key, n]]) => [key, name + ' × ' + n])];
  const list = el('cargo-list');
  const shape = JSON.stringify(rows);
  if (list.dataset.rows !== shape) {
    list.replaceChildren(...(rows.length ? rows : [[null, '수집한 광물과 물품이 없습니다.']]).map(([key, text]) => {
      const li = Object.assign(document.createElement('li'), {textContent: text + ' '});
      if (key) {
        // Kept kinds are left out of "decompose everything".
        const keep = document.createElement('button');
        keep.className = 'keep';
        keep.dataset.key = key;
        keep.onclick = () => write({type: 'keep', key, on: !save.keep.includes(key)});
        li.append(keep);
      }
      return li;
    }));
    list.dataset.rows = shape;
  }
  for (const b of list.querySelectorAll('button.keep')) {
    const on = save.keep.includes(b.dataset.key);
    b.textContent = on ? '보관 중' : '보관';
    b.setAttribute('aria-pressed', String(on));
  }
}
// Crafting: equipment from collected minerals, craftable recipes first.
function showCraft() {
  const box = el('workshop');
  box.hidden = !save?.front;
  if (!panel || box.hidden) return;
  const recipes = Object.entries(craftRecipes).map(([kind, cost]) => ({kind, cost, ok: affords(save, cost)}))
    .sort((a, b) => b.ok - a.ok);
  const ready = recipes.filter(r => r.ok).length;
  el('craft-summary').textContent = '· 제작 가능 ' + ready + ' / ' + recipes.length;
  const rows = recipes.map(r => [r.kind, r.ok, (slots[r.kind]?.label ?? '드릴 끝') + ' · ' + findById(r.kind).name + ' · ' +
    Object.entries(r.cost).map(([id, n]) => mineralName(id) + ' ' + Math.min(owned(save, id), n) + '/' + n).join(' · ')]);
  // Rows are rebuilt only when the order changes, so a tap is not lost to a refresh.
  const list = el('craft-list');
  const order = rows.map(([kind]) => kind).join();
  if (list.dataset.order !== order) {
    list.replaceChildren(...rows.map(([kind]) => {
      const li = document.createElement('li');
      const make = document.createElement('button');
      make.onclick = () => write({type: 'craft-equipment', kind}, () => message(findById(kind).name + ' 제작 · 보관 물품에 추가'));
      li.append(document.createElement('span'), ' ', make);
      return li;
    }));
    list.dataset.order = order;
  }
  rows.forEach(([, ok, text], i) => {
    const li = list.children[i], [label, make] = [li.firstChild, li.lastChild];
    li.className = ok ? 'ready' : '';
    if (label.textContent !== text) label.textContent = text;
    make.textContent = ok ? '제작' : '재료 부족';
    make.disabled = !ok;
  });  showUpgrades();
  showMaintain();
}
// Upgrade rows in fixed order, updated in place.
function showUpgrades() {
  const list = el('upgrade-list');
  if (list.children.length !== upgradeIds.length) {
    list.replaceChildren(...upgradeIds.map(id => {
      const li = document.createElement('li');
      const make = document.createElement('button');
      make.onclick = () => write({type: 'upgrade', id}, () => message(upgrades[id].label + ' ' + level(save, id) + '단계'));
      li.append(document.createElement('span'), ' ', make);
      return li;
    }));
  }
  upgradeIds.forEach((id, i) => {
    const li = list.children[i], [label, make] = [li.firstChild, li.lastChild];
    const cost = upgradeCost(save, id), ok = !!cost && affords(save, cost);
    const text = upgrades[id].label + ' ' + level(save, id) + '/' + upgrades[id].max + ' · ' + upgrades[id].effect +
      (cost ? ' · ' + Object.entries(cost).map(([k, n]) => mineralName(k) + ' ' + Math.min(owned(save, k), n) + '/' + n).join(' · ') : ' · 최대');
    li.className = ok ? 'ready' : '';
    if (label.textContent !== text) label.textContent = text;
    make.textContent = !cost ? '최대' : ok ? '강화' : '재료 부족';
    make.disabled = !ok;
  });
}
// A small diagram of the train at the bottom left: the spherical machine, then
// each spherical wagon with its fill, cars past the 16 m safe length marked.
function showTrainStrip() {
  const strip = el('train-strip');
  const wagons = save?.wagons?.length ?? 0;
  strip.hidden = !save?.front || !wagons;
  if (strip.hidden) return;
  const fills = carFill(save);
  // While crossing a chunk boundary each car shows whether it is over yet;
  // the strip keeps the result a second after the last car passes.
  const states = crossing && crossingCars(save, crossing.traveled);
  if (crossing && !crossing.doneAt && states.every(c => c !== 'pending')) crossing.doneAt = age;
  if (crossing?.doneAt && age - crossing.doneAt > 1) crossing = null;
  const passed = states ? states.filter(c => c === 'passed').length : 0, kept = states ? states.filter(c => c !== 'lost').length : 0;
  const shape = fills.map(f => Math.round(f * 10)).join() + '|' + wagons + '|' + (crossing ? states.join() : '');
  if (strip.dataset.shape === shape) return;
  strip.dataset.shape = shape;
  strip.replaceChildren(...fills.map((f, i) => {
    const car = document.createElement('span');
    car.className = (i === 0 ? 'car machine' : 'car' + (machineLength + wagonLength * i > safeLength ? ' risk' : '')) +
      (crossing ? ' ' + states[i] : '');
    car.style.setProperty('--fill', f);
    return car;
  }), ...(crossing ? [Object.assign(document.createElement('span'), {className: 'caption', textContent: '경계 통과 ' + passed + '/' + kept})] : []));
  strip.setAttribute('aria-label', '열차 ' + trainLength(save) + ' m · 광물 ' + load(save) + ' / ' + capacity(save) +
    (crossing ? ' · 경계 통과 ' + passed + '/' + kept : ''));
}
// The machine's own recovered memory, one recollection per body part found.
// The last eight arrivals, newest first, each with its unsettled clock.
function showArrivals() {
  const trips = save?.front ? save.trips ?? 0 : 0;
  el('arrival-book').hidden = !trips;
  if (!panel || !trips) return;
  const lines = Array.from({length: Math.min(8, trips)}, (_, i) => arrivalReading(save.marketSeed, trips - i).line.replace(/^도착 · /, ''));
  const list = el('arrival-list');
  if (list.dataset.lines !== JSON.stringify(lines)) {
    list.replaceChildren(...lines.map(text => Object.assign(document.createElement('li'), {textContent: text})));
    list.dataset.lines = JSON.stringify(lines);
  }
}
function showSelf() {
  const found = save?.selfParts ?? [];
  const seen = save?.endingsSeen ?? [];
  el('self-book').hidden = !found.length && !seen.length;
  if (!panel || el('self-book').hidden) return;
  el('self-count').textContent = found.length + ' / ' + selfParts.length;
  const lines = found.map(id => selfParts.find(p => p.id === id)).map(p => p.name + ' · ' + p.recollection);
  if (finalMemory(found.length)) lines.push('마지막 기억 · ' + finalMemory(found.length));
  // Endings seen in any run can be replayed; a new run lets memory go but keeps them.
  el('endings-seen').hidden = !seen.length;
  el('endings-seen').textContent = '본 엔딩 ' + seen.length + ' / ' + endingCount;
  const replays = el('ending-replays');
  const shown = allEndingsSeen(save) ? [...seen, epilogue.id] : seen;
  if (replays.dataset.seen !== shown.join()) {
    replays.replaceChildren(...shown.map(id => {
      const b = Object.assign(document.createElement('button'), {textContent: '엔딩 다시 보기 · ' + playable(id).title});
      b.onclick = () => playEnding(id);
      return b;
    }));
    replays.dataset.seen = shown.join();
  }
  el('new-cycle').hidden = !save.ending;
  el('new-cycle').disabled = false;
  el('new-cycle').textContent = confirmCycle ? '정말 기억을 내려놓기 · 몸체 조각·기억막·행동 기록이 사라집니다' : '새 회차 · 기억을 내려놓기';
  if (el('self-list').dataset.rows !== JSON.stringify(lines)) {
    el('self-list').replaceChildren(...lines.map(text => Object.assign(document.createElement('li'), {textContent: text})));
    el('self-list').dataset.rows = JSON.stringify(lines);
  }
}
// Finds kept whole: equipment with durability, unknown materials and items.
function showStored() {
  const box = el('stored');
  const pieces = save?.finds ?? [];
  const fitted = Object.entries(save?.equipment ?? {});
  box.hidden = !save?.front || (!pieces.length && !fitted.length);
  if (!panel || box.hidden) return;
  el('stored-count').textContent = pieces.length + '개' + (fitted.length ? ' · 장착 ' + fitted.length : '');
  // Fitted pieces first, each with its effect and a button to take it off.
  const fittedRows = fitted.map(([slot, p]) => [slot, slots[p.kind].label + ' · ' + findLabel(p) + ' · 내구도 ' + p.durability + '% · ' +
    (p.durability > 0 ? slots[p.kind].effect : '고장으로 작동 안 함')]);
  const fittedList = el('fitted-list');
  if (fittedList.dataset.rows !== JSON.stringify(fittedRows)) {
    fittedList.replaceChildren(...fittedRows.map(([slot, text]) => {
      const li = Object.assign(document.createElement('li'), {textContent: text});
      const off = Object.assign(document.createElement('button'), {textContent: '해제'});
      off.onclick = () => write({type: 'unequip', slot}, () => message(text.split(' · ')[1] + ' 해제'));
      li.append(off);
      return li;
    }));
    fittedList.dataset.rows = JSON.stringify(fittedRows);
  }
  const rows = pieces.map(p => [p.id, findLabel(p) + (p.durability !== undefined ? ' · 내구도 ' + p.durability + '%' : '') +
    (p.kind === 'desk_clock' ? ' · 멈춘 시각 ' + clockText(p.stoppedAt) : '') +
    (findById(p.kind).category === 'unknown' ? (save.research.includes(p.kind) ? ' · 분석 완료' : ' · 미분석') : ''), slotOf(p.kind)]);
  const list = el('stored-list');
  if (list.dataset.rows !== JSON.stringify(rows)) {
    list.replaceChildren(...rows.map(([id, text, slot]) => {
      const li = Object.assign(document.createElement('li'), {textContent: text});
      if (slot) {
        const on = Object.assign(document.createElement('button'), {textContent: save.equipment[slot] ? '교체 장착' : '장착'});
        on.onclick = () => write({type: 'equip', id}, () => message(text.split(' · ')[0] + ' 장착'));
        li.append(on);
      }
      return li;
    }));
    list.dataset.rows = JSON.stringify(rows);
  }
  for (const b of [...list.querySelectorAll('button'), ...fittedList.querySelectorAll('button')]) b.disabled = false;
  const head = bestHead();
  el('equip-head').hidden = !head;
  el('equip-head').disabled = false;
  if (head) el('equip-head').textContent = '드릴 헤드 교체 · 내구도 ' + (save.drillCondition ?? 100) + '% → ' + head.durability + '%';
}
function bestHead() {
  return (save?.finds ?? []).filter(p => p.kind === 'drill_head' && p.durability > (save.drillCondition ?? 100))
    .sort((a, b) => b.durability - a.durability)[0];
}
function recoverCargo(item, label) {
  const isNew = !save.discoveries.some(entry => entry.item === item);
  write({type:'pickup', item}, () => {
    message(label);
    if (isNew) {
      discoveryNoticeUntil = age + 2;
      el('discovery-notice').textContent = '발견 도감에 기록됨 · ' + cargoNames[item];
    }
  });
}
function hud() {
  el('rock').firstElementChild.textContent = save?.rocks ?? '—';
  el('menu').hidden = !save?.front;
  el('menu').setAttribute('aria-expanded', String(panel));
  el('panel').hidden = !panel;
  showDiscoveries();
  showDecomposer();
  showStored();
  showTrade();
  showGamble();
  showResearch();
  showSelf();
  showArrivals();
  showTrain();
  showQuick();
  showCraft();
  showTrainStrip();
  if (!panel) {
    el('reset-prompt').hidden = true;
    el('reset').hidden = false;
  }
  el('confirm-reset').disabled = false;
  if (panel) el('cargo').textContent = (save?.cargo ?? []).map((n,i) => n ? cargoNames[i] + ' × ' + n : '').filter(Boolean).join(' · ');
  if (panel && save.front) {
    const cargo = el('cargo');
    cargo.textContent = [cargo.textContent, '기체 ' + Math.ceil(hull) + '% · 드릴 ' + (save.drillCondition ?? 100) + '%' + (save.drillMax < 100 ? ' (최대 ' + save.drillMax + '%)' : '') + ' · 에너지 ' + save.energy + ' / ' + energyCap].filter(Boolean).join(' | ');
  }
  const condition = save?.drillCondition ?? 100;
  const ceramic = save?.ceramic ?? 0;
  el('fire-ceramic').hidden = !save?.front || save.rocks < ceramicRocks(save);
  el('fire-ceramic').disabled = !powered('fire-ceramic');
  el('fire-ceramic').firstChild.textContent = powered('fire-ceramic') ? '세라믹 가열 ' : lowPower('fire-ceramic') + ' ';
  el('fire-ceramic').lastElementChild.textContent = '암석 ' + ceramicRocks(save) + '개 · 에너지 ' + energyCost['fire-ceramic'];
  el('repair').hidden = !save?.front || condition >= save.drillMax || save.drillMax <= 0 || ceramic < ceramicPerRepair;
  el('repair').disabled = false;
  el('emergency').hidden = !save?.front || condition !== 0 || ceramic >= ceramicPerRepair || save.rocks >= ceramicRocks(save);
  el('emergency').disabled = !!laserJob || (!el('emergency').hidden && !laserHit());
  if (panel && save?.front) {
    el('materials').textContent = '세라믹 ' + ceramic + (condition < 100 && !ceramic ?
      ' · 수리용 세라믹 1개 필요 (암석 ' + save.rocks + '/' + ceramicRocks(save) + ')' : '');
  }
  // The first sensitive find counts down in world time; later ones wait.
  const pending = save?.front && save.captures?.[0];
  const left = pending ? pending.expiresAt - world.elapsed : 0;
  el('capture-alert').hidden = el('capture').hidden = !pending || left <= 0;
  if (pending && left > 0) {
    const rule = captureRule(pending);
    const verb = rule.button.split(' ')[0];
    el('capture-alert').textContent = rule.alert + ' · ' + (verb === '기체' ? '포집' : verb === '냉각' ? '밀봉' : verb) + '까지 ' + Math.ceil(left) + '초' +
      (save.captures.length > 1 ? ' · 대기 ' + (save.captures.length - 1) : '');
    el('capture').textContent = rule.button;
  }
  el('capture').disabled = false;
  const hazard = world.hazard;
  const alerted = hazardVisible && hazard && !hazard.spent;
  el('hazard-alert').hidden = !alerted;
  el('hazard-alert').textContent = alerted ? (hazard.kind === 'lava' ? '고열 감지 · 방향 전환' :
    hazard.fuse === null ? '불안정 광물 감지' : '충격 경고 · ' + Math.ceil(hazard.fuse) + '초') : '';
  el('stabilize').hidden = !(alerted && hazard.kind === 'volatile' && hazard.fuse !== null && Math.hypot(...hazard.point.map((v,i) => v-pos[i])) <= 2.5);
  el('stabilize').disabled = false;
  const marker = el('sensor');
  const nearest = world.portals().reduce((best, portal) => {
    const distance = Math.hypot(...portal.point.map((v, i) => v - pos[i]));
    return !best || distance < best.distance ? {portal, distance} : best;
  }, null);
  const mouth = nearest?.portal.point;
  marker.hidden =
    !sensor || !mouth || Math.hypot(...mouth.map((v, i) => v - pos[i])) > sensorRange(save);
  if (!marker.hidden) {
    const mark = portalMarker(
      mouth,
      pos,
      yaw,
      pitch,
      canvas.clientWidth,
      canvas.clientHeight,
    );
    marker.classList.toggle('offscreen', mark.offscreen);
    marker.style.left = mark.x + 'px';
    marker.style.top = mark.y + 'px';
    marker.style.transform =
      'translate(-50%, -50%) rotate(' + mark.angle + 'rad)';
    marker.classList.toggle('exposed', true);
  }
}

function syncSave(force = false) {
  const latest = readSave();
  if (!force && latest.revision === save?.revision) return;
  const mounted = !save?.front && latest.front;
  save = latest;
  loadWorld();
  if (mounted) installedUntil = Date.now()+1600;
  if (!save.front) panel = false;
}
try {
  save = readSave();
} catch (e) {
  fatal = true;
  message(e.message);
}
loadWorld();
hud();
// A press that arrives while a save is running waits for it instead of being
// lost; the world's own saves (mining, checkpoints) simply retry next frame.
const worldOps = ['collect', 'drill', 'laser', 'checkpoint', 'blast', 'pickup', 'collect-ejected', 'repair-hull', 'cross-chunk', 'transit', 'reboot'];
let queued = null;
async function write(op, after) {
  if (fatal) return;
  if (busy) {
    if (!worldOps.includes(op?.type ?? op)) queued = [op, after];
    return;
  }
  busy = true;
  hud();
  const type = op?.type ?? op;
  try {
    let session = ['collect','drill','laser','repair','fire-ceramic','checkpoint','blast','pickup','capture','collect-ejected','repair-hull','patch-hull'].includes(type)
      ? {hull, pos, velocity, drift, yaw, pitch, sensor, entered: world.portals().indexOf(entered), world: world.snapshot()}
      : null;
    if (op?.type === 'transit') {
      const destination = createWorld(false, undefined, op.radius, op.strength, undefined, undefined, newSeed((save.trips ?? 0) + 1));
      session = {hull,pos:[0.5,0.5,0.5],velocity:[0,0,0],drift,yaw:0,pitch:0,sensor:false,entered:-1,world:destination.snapshot()};
    }
    const before = save;
    save = await commit(save.revision, op, session);
    // Pieces the save flung out of a full train join this world.
    if (save.session?.world) world.syncEjected(save.session.world.chunks);
    if (save.rocks > before.rocks && ['collect','laser','drill'].includes(type)) lastRockGain = age;
    const gained = mineralIds.filter(id => (save.minerals?.[id] ?? 0) > (before.minerals?.[id] ?? 0));
    if (gained.length && ['laser','drill'].includes(type)) {
      message(gained.map(id => mineralName(id) + ' +1').join(' · '));
      const first = gained.find(id => !before.mineralLog?.includes(id));
      if (first) {
        discoveryNoticeUntil = age + 2;
        el('discovery-notice').textContent = '발견 도감에 기록됨 · ' + mineralName(first);
      }
    }
    // A part of the machine's own body: the recollection shows apart from work messages.
    const regained = (save.selfParts ?? []).filter(id => !(before.selfParts ?? []).includes(id));
    if (regained.length) {
      const part = selfParts.find(p => p.id === regained.at(-1));
      message('몸체 조각 회수 · ' + part.name);
      // With the last part, the death underneath every other memory comes back too.
      el('memory-line').textContent = part.recollection + (finalMemory(save.selfParts.length) ? ' … ' + finalMemory(save.selfParts.length) : '');
      memoryUntil = age + (finalMemory(save.selfParts.length) ? 20 : 10);
      discoveryNoticeUntil = age + 3;
      el('discovery-notice').textContent = '기억 일부 복구 · ' + save.selfParts.length + ' / ' + selfParts.length;
      // With the last memory back, the ending chosen from the player's habits follows it.
      if (save.ending && !before.ending) {
        setTimeout(() => playEnding(save.ending), 8000);
        // Seeing the last of the three endings brings the epilogue after it.
        if (allEndingsSeen(save) && !allEndingsSeen(before))
          setTimeout(() => playEnding(epilogue.id), 8000 + (endingById(save.ending).lines.length * 4.5 + 5) * 1000);
      }
    }
    // Wagons gone without being uncoupled stayed behind in a collapsed chunk or a small portal.
    if ((save.wagons?.length ?? 0) < (before.wagons?.length ?? 0) && type !== 'remove-wagon') {
      const text = '화물칸 ' + (before.wagons.length - save.wagons.length) + '량 소실 · 광물 ' + (load(before) - load(save)) + '개와 함께 남겨짐';
      message(text);
      // Mining messages follow quickly, so the loss also stays at the top for a while.
      discoveryNoticeUntil = age + 4;
      el('discovery-notice').textContent = text;
    }
    if ((save.leftBehind ?? 0) > (before.leftBehind ?? 0) && !(before.leftBehind > 0 && load(before) >= capacity(before)))
      message('화물칸 가득 · 채굴한 광물과 아이템을 기계 밖으로 튕겨냅니다');
    // A new step of realisation about the trade counterpart shows like a memory.
    if (insightStage(save) > insightStage(before)) {
      el('memory-line').textContent = insightStages[insightStage(save)].text;
      memoryUntil = age + 10;
    }
    // Finished events that may raise a story clue; the director decides whether one shows.
    if (type === 'transit') story.emit('arrival', save.trips);
    for (const kind of save.research.filter(k => !before.research?.includes(k))) story.emit('material_identified', kind);
    if ((save.memoryLog?.length ?? 0) > (before.memoryLog?.length ?? 0)) story.emit('memory_recognized', 'film' + save.memoryLog.length);
    for (const id of (save.selfParts ?? []).filter(id => !before.selfParts?.includes(id))) story.emit('memory_recognized', 'part:' + id);
    for (const p of (save.finds ?? []).filter(p => findById(p.kind)?.category === 'alien' && !before.findLog?.includes(p.kind))) story.emit('life_found', p.kind);
    if (['sell', 'buy', 'auction', 'bid', 'cancel-auction'].includes(type)) launchDrone();
    const had = new Set([...(before.specimens ?? []), ...(before.finds ?? [])].map(p => p.id));
    const freshFinds = (save.finds ?? []).filter(p => !had.has(p.id));
    if (freshFinds.length && type !== 'capture') {
      message(freshFinds.map(p => '발견 · ' + findLabel(p) + (findById(p.kind).setting ? ' (' + findById(p.kind).setting + ')' : '') +
        (p.durability !== undefined ? ' · 내구도 ' + p.durability + '%' : '') +
        (p.kind === 'desk_clock' ? ' · ' + clockText(p.stoppedAt) + '에 멈춤' : '')).join(' · '));
      const first = freshFinds.find(p => !before.findLog?.includes(p.kind));
      if (first) {
        discoveryNoticeUntil = age + 2;
        el('discovery-notice').textContent = '발견 도감에 기록됨 · ' + findById(first.kind).name;
        // A first alien piece shows how it was put together, and that the maker is unknown.
        if (alienNotes[first.kind]) {
          el('memory-line').textContent = alienNotes[first.kind];
          memoryUntil = age + 10;
        }
      }
    }
    const fresh = (save.specimens ?? []).filter(p => !had.has(p.id));
    if (fresh.length && type !== 'capture') {
      message(fresh.map(p => p.kind === 'capsule' ? specimenLabel(p.kind, null, p.element, p.form) + ' 회수' : '시료 발견 · ' + specimenLabel(p.kind, p.variant)).join(' · '));
      const first = fresh.find(p => !before.specimenLog?.includes(p.kind));
      if (first) {
        discoveryNoticeUntil = age + 2;
        el('discovery-notice').textContent = '발견 도감에 기록됨 · ' + (first.kind === 'capsule' ? '원소 표본 캡슐' : specimenById(first.kind).name);
      }
    }
    const kept = new Set([...(save.captures ?? []), ...(save.specimens ?? []), ...(save.finds ?? [])].map(p => p.id));
    const lost = (before.captures ?? []).filter(p => !kept.has(p.id));
    if (lost.length && !['transit', 'reboot', 'reset'].includes(type))
      message(lost.map(p => findById(p.kind)?.sensitive ? findLabel(p) + ' 폭발 · 드릴 -' + findById(p.kind).sensitive.damage
        : p.kind === 'capsule' ? specimenLabel(p.kind, null, p.element, p.form) + ' 폭발 · 드릴 -' + captureRule(p).damage
        : specimenLabel(p.kind, p.variant) + ' 소실').join(' · '));
    for (const a of before.auctions ?? []) tradeNames.set(a.id, pieceName(a.piece));
    const settled = (save.tradeLog ?? []).filter(entry => !(before.tradeLog ?? []).includes(entry));
    if (settled.length) message(settled.map(tradeLogText).join(' · '));
    if (type === 'craft') installedUntil = Date.now()+1600;
    checkpointAge = 0;
    if (saveFailures && worldOps.includes(type)) message('저장 복구 · 운행을 다시 시작합니다');
    saveFailures = 0;
    after?.();
  } catch (e) {
    try {
      syncSave(true);
    } catch {
      fatal = true;
    }
    // A world save that fails (storage full or blocked, a conflicting write)
    // halts driving and mining; saving is retried at a growing interval.
    if (worldOps.includes(type)) {
      saveFailures++;
      safeStopUntil = age + Math.min(10, 2 * saveFailures);
      message('저장 실패 · 안전 정지 · ' + Math.ceil(safeStopUntil - age) + '초 뒤 다시 저장합니다' + (e.message ? ' (' + e.message + ')' : ''));
    } else message(e.message || '저장 실패 · 다시 시도해 주세요.');
  } finally {
    busy = false;
    hud();
    if (queued) {
      const [next, then] = queued;
      queued = null;
      write(next, then);
    }
  }
}
window.addEventListener('storage', (e) => {
  if (e.key !== saveKey && e.key !== null) return;
  try {
    syncSave();
    message('다른 탭의 진행을 불러왔습니다.');
  } catch (e) {
    fatal = true;
    message(e.message);
  }
  hud();
});
function sound() {
  try {
    if (!audio) {
      audio = new AudioContext();
      osc = audio.createOscillator();
      gain = audio.createGain();
      osc.type = 'triangle';
      osc.frequency.value = 99;
      gain.gain.value = 0;
      osc.connect(gain);
      gain.connect(audio.destination);
      osc.start();
    }
    if (audio.state === 'suspended') audio.resume().catch(() => {});
  } catch {
    /* Audio may be unavailable until a user gesture. */
  }
}
sound();
document.addEventListener('pointerdown', sound);
el('stabilize').onclick = () => {
  const h = world.hazard;
  if (busy || fatal || !h || h.spent || h.fuse === null || !world.sense(pos,0).visible ||
      Math.hypot(...h.point.map((v,i) => v-pos[i])) > 2.5) return;
  h.spent = true;
  recoverCargo(2, '밀봉 회수 · 미확인 결정');
};
el('decompose-source').onchange = () => hud();
el('add-wagon').onclick = () => {
  // Past 16 m the first press only warns; the second confirms.
  if (trainLength(save) + 3 > safeLength && !confirmLong) { confirmLong = true; hud(); return; }
  const confirm = confirmLong;
  confirmLong = false;
  write({type: 'add-wagon', confirm}, () => message('화물칸 연결 · 열차 ' + trainLength(save) + ' m'));
};
el('remove-wagon').onclick = () => write({type: 'remove-wagon'}, () => message('화물칸 분리 · 열차 ' + trainLength(save) + ' m'));
el('ending-skip').onclick = closeEnding;
el('new-cycle').onclick = () => {
  if (!confirmCycle) { confirmCycle = true; hud(); return; }
  confirmCycle = false;
  write({type: 'new-cycle'}, () => {
    el('memory-line').textContent = '기억이 다시 흩어진다. 이번이 몇 번째인지는 알 수 없다.';
    memoryUntil = age + 10;
    message('새 회차 · 작업 기록은 남아 있다');
  });
};
el('sell-source').onchange = () => hud();
el('research-source').onchange = () => hud();
el('research-start').onclick = () => {
  const kind = el('research-source').value;
  if (kind) write({type: 'research', kind}, () => message('분석 시작 · ' + findById(kind).name));
};
el('read-film').onclick = () => write({type: 'read-film'}, () => {
  // The fragment appears apart from ordinary messages and fades after a while.
  el('memory-line').textContent = fragments[save.memoryLog.at(-1)];
  memoryUntil = age + 8;
});
el('sell').onclick = () => {
  const value = el('sell-source').value;
  const price = value && sellPrice(save, tradeOperation(value));
  if (!price) return;
  const label = el('sell-source').selectedOptions[0]?.textContent.replace(/ · \d+개 → .*$/, '');
  write({type: 'sell', ...tradeOperation(value), price}, () => message(label + ' 판매 · ' + credit(price)));
};
el('gamble-category').onchange = el('gamble-target').onchange = el('gamble-multiple').oninput = () => hud();
el('build-portal').onclick = () => write({type: 'build-portal'}, () => {
  message('포탈 제작 완료');
  setTimeout(() => playEnding('portal'), 1200);
});
el('gamble-draw').onclick = () => {
  const c = gambleChoice();
  if (!c.ok) return;
  write({type: 'gamble', category: c.category, id: c.id, multiple: c.multiple}, () => {
    const e = save.gambleLog[0];
    message((e.win ? '당첨 · ' + targetName(e.category, e.id) + ' × ' + e.multiple : '낙첨 · 담보 ' + credit(e.stake) + ' 소실'));
  });
};
el('auction').onclick = () => {
  const value = el('auction-source').value;
  if (!value) return;
  const op = tradeOperation(value);
  if (op.source === 'm') { op.count = Number(op.id); delete op.id; }
  write({type: 'auction', ...op}, () => message('경매 등록 · 다른 시간대 채굴기의 입찰을 기다립니다'));
};
el('capture').onclick = () => {
  const pending = save?.captures?.[0];
  if (!pending) return;
  write({type: 'capture', id: pending.id}, () =>
    message((findById(pending.kind) ? findLabel(pending) : specimenLabel(pending.kind, pending.variant, pending.element, pending.form)) + ' 회수'));
};
el('equip-head').onclick = () => {
  const head = bestHead();
  if (head) write({type: 'equip-head', id: head.id}, () => message('드릴 헤드 교체 · 내구도 ' + save.drillCondition + '%'));
};
el('salvage').onclick = () => {
  const [, find, variant] = (el('decompose-source').value ?? '').split(':');
  write({type: 'salvage', find, variant}, () => message('부품 회수 · ' + partsOf(find, variant).map(id => parts[id].name).join(' · ')));
};
el('refire-shards').onclick = () => write('refire-shards', () => message('세라믹 파편 재소성 · 세라믹 1개'));
el('patch-hull').onclick = () => write({type: 'patch-hull'}, () => {
  hull = Math.min(100, hull + plateHull);
  message('경량 판재로 기체 보강 · 기체 ' + Math.ceil(hull) + '%');
});
el('decompose').onclick = () => {
  const choice = decomposeChoices().find(([value]) => value === el('decompose-source').value);
  const result = choice && decompositionPreview(save, decomposeOperation(choice[0]));
  if (!result) return;
  const known = new Set(save.elementLog ?? []);
  write(decomposeOperation(choice[0]), () => {
    message(choice[1].replace(/ · \d+개$/, '') + ' 분해 · 회수 ' + massText(result.kept) + ' · 손실 ' + massText(result.grams - result.kept));
    const first = elementSymbols.find(symbol => result.out[symbol] && !known.has(symbol));
    if (first) {
      discoveryNoticeUntil = age + 2;
      el('discovery-notice').textContent = '원소 도감에 기록됨 · ' + first;
    }
  });
};
el('fire-ceramic').onclick = () => write('fire-ceramic', () => message('암석 가열 완료 · 세라믹 1개'));
el('repair').onclick = () => { const before = save.drillMax; write('repair', () => {
  laserJob = null;
  contact = null;
  timer = 0;
  message('드릴 수리 완료 · 드릴 ' + save.drillMax + '% · 최대 내구도 -' + (before - save.drillMax) + '%');
}); };
el('emergency').onclick = () => {
  if (busy || laserJob || save?.drillCondition !== 0) return;
  const hit = laserHit();
  if (hit) {
    laserJob = {cell:[hit.x,hit.y,hit.z], elapsed:0};
    message('긴급 레이저 채굴 중');
    hud();
  }
};
el('menu').onclick = () => {
  panel = !panel;
  hud();
};
// A click anywhere outside the menu closes it; the menu button toggles it itself.
// Checked while capturing, before any handler can rebuild the clicked element.
document.addEventListener('click', e => {
  if (!panel || el('panel').contains(e.target) || el('menu').contains(e.target)) return;
  panel = false;
  hud();
}, {capture: true});
el('reset').onclick = () => {
  el('reset').hidden = true;
  el('reset-prompt').hidden = false;
};
el('confirm-reset').onclick = () => {
  write('reset', () => {
    story.reset();
    loadWorld();
    releaseLook();
    panel = false;
    age = 0;
    message('');
  });
};
// Camera distance: a factor of the default that shows the machine and every
// drill. Mouse wheel on PC, two-finger pinch on touch. Kept on this device.
const zoomKey = 'dig-camera-zoom';
let zoom = 1;
try { zoom = Math.min(3, Math.max(0.4, Number(localStorage.getItem(zoomKey)) || 1)); } catch { /* storage may be blocked */ }
function setZoom(value) {
  zoom = Math.min(3, Math.max(0.4, value));
  try { localStorage.setItem(zoomKey, String(zoom)); } catch { /* storage may be blocked */ }
}
const touches = new Map();
let pinch = 0;
// A double click or double tap brings the camera back to the default view.
function defaultView() {
  setZoom(1);
  message('기본 시야');
}
canvas.addEventListener('dblclick', defaultView);
let lastTap = null;
canvas.addEventListener('pointerup', e => {
  if (e.pointerType !== 'touch' || touches.size > 1) return;
  const now = performance.now();
  if (lastTap && now - lastTap.at < 320 && Math.hypot(e.clientX - lastTap.x, e.clientY - lastTap.y) < 30) {
    lastTap = null;
    defaultView();
  } else lastTap = {at: now, x: e.clientX, y: e.clientY};
});
canvas.addEventListener('wheel', e => {
  e.preventDefault();
  setZoom(zoom * Math.exp(e.deltaY * 0.0015));
}, {passive: false});
canvas.onpointerdown = (e) => {
  touches.set(e.pointerId, [e.clientX, e.clientY]);
  canvas.setPointerCapture(e.pointerId);
  if (touches.size === 2) {
    pointer = null;
    pinch = Math.hypot(...[...touches.values()].reduce((a, b) => [a[0] - b[0], a[1] - b[1]]));
    return;
  }
  if (touches.size === 1) pointer = { id: e.pointerId, x: e.clientX, y: e.clientY };
};
canvas.onpointermove = (e) => {
  if (touches.has(e.pointerId)) touches.set(e.pointerId, [e.clientX, e.clientY]);
  if (touches.size === 2 && pinch) {
    const spread = Math.hypot(...[...touches.values()].reduce((a, b) => [a[0] - b[0], a[1] - b[1]]));
    if (spread > 0) setZoom(zoom * pinch / spread);
    pinch = spread;
    return;
  }
  if (!pointer || pointer.id !== e.pointerId) return;
  yaw += (e.clientX - pointer.x) * 0.008;
  pitch = Math.max(
    -1.48,
    Math.min(1.48, pitch - (e.clientY - pointer.y) * 0.008),
  );
  pointer.x = e.clientX;
  pointer.y = e.clientY;
};
function releaseLook() {
  pointer = null;
}
canvas.onpointerup = canvas.onpointercancel = (e) => {
  touches.delete(e.pointerId);
  if (touches.size < 2) pinch = 0;
  releaseLook();
};
window.addEventListener('orientationchange', releaseLook);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    releaseLook();
    previous = 0;
    if (audio) audio.suspend().catch(() => {});
  } else if (audio) {
    audio.resume().catch(() => {});
  }
});
// Chains shoot from the hull to where they strike solid rock; the anchor holds
// at once, and the drawn chain flies out over a quarter second. Released
// chains reel back in. Only the drawing is animated; the hold is not delayed.
const chainOut = 0.25, chainIn = 0.2;
function holdChains() {
  if (anchors.length) return;
  for (const sign of [-1, 1]) {
    const dir = forward(yaw + sign * 0.96, -0.22);
    const hit = world.trace(pos, ...dir, 6);
    if (!hit) continue;
    const to = offset(pos, dir, hit.t);
    anchors.push(to);
    chainShots.push({from: offset(pos, dir, Math.min(hit.t, bodyRadius(save) * 0.9)), to, side: sign, at: age});
  }
}
function releaseChains() {
  anchors = [];
  for (const c of chainShots) c.off ??= age;
}
// How far each chain reaches now, from 0 at the hull to 1 at the rock.
function chainReach() {
  chainShots = chainShots.filter(c => c.off === undefined || age - c.off < chainIn);
  return chainShots.map(c => ({from: c.from, to: c.to, side: c.side,
    reach: Math.min(1, (age - c.at) / chainOut) * (c.off === undefined ? 1 : Math.max(0, 1 - (age - c.off) / chainIn))}));
}
function move(dt, speed = velocity) {
  const next = offset(pos, speed, dt);
  if (world.blockers(next).length) {
    velocity = [0, 0, 0];
    return false;
  }
  for (const portal of world.portals()) {
    if (portal.exit) continue;
    const {axis, sign, point} = portal;
    const before = sign * (pos[axis] - point[axis]);
    const after = sign * (next[axis] - point[axis]);
    if (before >= 0 || after < 0) continue;
    const t = -before / (after - before);
    const lateral = point.map((v, i) => i === axis ? 0 : pos[i] + (next[i] - pos[i]) * t - v);
    if (Math.max(...lateral.map(Math.abs)) + bodyRadius(save) <= portal.radius) entered = portal;
  }
  if (crossing) crossing.traveled += Math.hypot(...next.map((v, i) => v - pos[i])) * 0.5;
  pos = next;
  // Crossing into another chunk lets the far one collapse; a train over 16 m
  // loses the wagons left in it.
  const chunkKey = pos.map(v => Math.floor((Math.floor(v) + 15) / 32)).join();
  world.stream(pos);
  if (chunkKey !== lastChunk) {
    if (lastChunk && save?.wagons?.length && trainLength(save) > safeLength) crossPending = true;
    // The strip shows each car passing the boundary in turn.
    if (lastChunk && save?.wagons?.length) crossing = {traveled: 0, cars: crossingCars(save, 0)};
    lastChunk = chunkKey;
  }
  if (entered && entered.sign * (pos[entered.axis] - entered.point[entered.axis]) < 0) entered = false;
  if (entered && entered.sign * (pos[entered.axis] - entered.point[entered.axis]) >= bodyRadius(save) && !busy) {
    velocity = [0, 0, 0];
    write({type: 'transit', radius: entered.radius, strength: entered.strength}, () => {
      loadWorld();
      message('포탈 통과 완료');
      // The clock cannot tell whether this is the past or the future.
      el('memory-line').textContent = arrivalReading(save.marketSeed, save.trips).line;
      memoryUntil = age + 8;
    });
  }
  return true;
}
function laserHit(direction = forward(yaw, pitch)) {
  const hit = world.trace(pos, ...direction, 32, intersectStone);
  if (hit && world.portals().some(portal => Number.isFinite(portalRayDistance(portal, pos, direction, hit.t)))) return null;
  return hit;
}
function heatStone(hit, direction, elapsed, operation) {
  const point = offset(pos, direction, hit.t);
  contact = {point, x:hit.x, y:hit.y, z:hit.z, heat:Math.min(1, elapsed / 1.35)};
  if (elapsed < 1.35 || !world.dig(hit.x, hit.y, hit.z)) return false;
  contact = null;
  write({type: operation, cell: [hit.x, hit.y, hit.z]}, () => {
    fracture = {point, at:age};
    if (operation === 'laser' && lastRockGain === age) message('긴급 채굴 완료 · 일반 암석 1개');
  });
  return true;
}
function tick(dt) {
  if (fatal || document.hidden) return;
  age += dt;
  world.advance(dt);
  const d = forward(yaw, pitch);
  if (!save.front) {
    if (busy) return;
    if (save.rocks >= 3) {
      contact = null;
      if (!save.craftReadyAt) write('begin-craft');
      else if (Date.now() >= save.craftReadyAt) write('craft');
      return;
    }
    const hit = laserHit(d);
    if (!hit) { contact = null; timer = 0; return; }
    const tag = [hit.x,hit.y,hit.z].join(',');
    if (targetTag !== tag) { targetTag = tag; timer = 0; }
    timer += dt;
    if (heatStone(hit, d, timer, 'collect')) timer = 0;
    return;
  }
  if (busy) return;
  // Physics that produced a non-finite value returns to the last save and waits.
  if (![...pos, ...velocity, ...drift].every(Number.isFinite)) {
    loadWorld();
    safeStopUntil = age + 2;
    message('물리 값 오류 · 마지막 저장 위치로 돌아가 안전 정지');
    return;
  }
  // Safe stop: nothing drives or mines; only the retried save runs.
  if (age < safeStopUntil) return;
  if (saveFailures) {
    write('checkpoint');
    return;
  }
  const {push,damage,impactPoint,swallowed} = world.hullContacts(dt,pos,velocity.map((v,i) => v+drift[i]),anchors.length > 0 && anchorMass(save));
  if (swallowed.length) message('튕겨낸 조각 ' + swallowed.length + '개가 포탈로 빨려 들어갔습니다');
  const hazard = world.sense(pos,dt,damage > 0);
  hazardVisible = hazard.visible;
  // Studying portal emissions predicts debris paths and softens impacts.
  for (const [loss,cause,origin] of [[damage * impactShare(save),'impact',impactPoint],
    [hazard.damage,hazard.blast ? 'blast' : 'lava',world.hazard?.point]]) {
    if (loss <= 0) continue;
    hull = Math.max(0,hull-loss);
    if (!hull) {
      write({type:'reboot',loss:cargoLoss(cause,origin,pos,yaw,pitch)}, () => {
        age = 0;
        loadWorld();
        message('기체 파손 · 재기동');
        // The death ending, told in text only; play goes on after it.
        el('memory-line').textContent = deathEnding(cause);
        memoryUntil = age + 12;
      });
      return;
    }
    const label = {impact:'충격·압착',blast:'광물 폭발',lava:'용암 접촉'}[cause];
    message(label + ' · 기체 ' + Math.ceil(hull) + '%');
  }
  if (hazard.blast) {
    write({type:'blast', wear:Math.ceil(hazard.damage/8)});
    return;
  }
  drift = drift.map((v,i) => (v+push[i])*Math.exp(-1.2*dt));
  if (Math.hypot(...drift) > 0.001) {
    if (!move(dt,drift)) drift = [0,0,0];
    if (busy) return;
  }
  if (crossPending) {
    crossPending = false;
    write({type: 'cross-chunk'});
    return;
  }
  // Researched automations press their buttons, about once a second.
  if (age >= nextAutomation) {
    nextAutomation = age + 1;
    if (automate()) return;
  }
  // The hull mends itself from collected minerals, about once a second.
  const repair = hull > 0 && hull < hullRepairBelow && age >= nextHullRepair && hullRepairFor(save);
  if (repair) {
    nextHullRepair = age + 1;
    write({type: 'repair-hull'}, () => {
      hull = Math.min(100, hull + repair.gain);
      message('기체 자동 수리 · ' + Object.entries(repair.cost).map(([id, n]) => mineralName(id) + ' ' + n).join(' · ') +
        ' → 기체 ' + Math.ceil(hull) + '%');
    });
    return;
  }
  checkpointAge += dt;
  // Save as soon as a capture deadline passes so the loss is settled once.
  if (checkpointAge >= 1 || world.elapsed >= (save.captures?.[0]?.expiresAt ?? Infinity)) {
    write('checkpoint');
    return;
  }
  if (laserJob) {
    const hit = laserHit(d);
    if (!hit || ![hit.x,hit.y,hit.z].every((v,i) => v === laserJob.cell[i])) {
      laserJob = null;
      contact = null;
      message('조준이 변경되었습니다.');
    } else {
      laserJob.elapsed += dt;
      if (heatStone(hit, d, laserJob.elapsed, 'laser')) laserJob = null;
      return;
    }
  }
  const pull = entered ? [0, 0, 0] : world.gravity(pos);
  // The probe extends beyond one integration step so the entire body fits.
  world.setBody(bodyRadius(save));
  const probe = offset(pos, d, 0.7 * bodyRadius(save) / baseRadius);
  // A body snagged on a side wall (pulled sideways by portal or micro gravity)
  // has nothing in the forward probe; then the drills cut what holds the body.
  const ahead = world.blockers(probe);
  const blocks = (ahead.length || !snagged ? ahead : world.blockers(snagged)).sort((a, b) =>
    Math.hypot(...a.map((v, i) => v + 0.5 - probe[i])) - Math.hypot(...b.map((v, i) => v + 0.5 - probe[i])));
  if (blocks.length) {
    velocity = [0, 0, 0];
    if (save.drillCondition === 0) { releaseChains(); return; }
    holdChains();
    const target = blocks[0],
      tag = target.join(',');
    if (targetTag !== tag) {
      timer = 0;
      targetTag = tag;
    }
    timer += dt;
    if (timer >= drillInterval(save)) {
      timer = 0;
      // Every drill, and every bore level, cuts one more of the nearest blocks.
      const cut = blocks.slice(0, cellsPerStroke(save)).filter(cell => world.dig(...cell));
      if (!cut.length) return;
      write({type: 'drill', cell: cut[0], cells: cut}, () => {
        releaseChains();
        if (save.drillCondition === 0) message('드릴 파손 · 긴급 레이저 또는 메뉴에서 수리');
      });
    }
    return;
  }
  releaseChains();
  timer = 0;
  targetTag = '';
  velocity = velocity.map(
    (n, i) => n + ((d[i] * 1.9 * speedFactor(save) - n) * 3 + pull[i]) * dt,
  );
  // Turning redirects propulsion. Inertia and portal pull may deflect the hull
  // sideways, but never translate it behind its current heading.
  const along = velocity.reduce((sum, v, i) => sum + v * d[i], 0);
  if (along < 0) velocity = velocity.map((v, i) => v - along * d[i]);
  const tried = offset(pos, velocity, dt);
  const moved = move(dt);
  // Where the body tried to go when a wall stopped it.
  snagged = moved ? null : tried;
  if (moved && !busy) {
    const type = world.takeNearby(pos,velocity.map((v,i) => v+drift[i]));
    if (type !== null) recoverCargo(type, cargoNames[type] + ' 회수');
    // With room again, flung pieces are gathered back on passing close by.
    else if (save.front && load(save) < capacity(save)) {
      const piece = world.takeEjected(pos, velocity.map((v,i) => v+drift[i]));
      if (piece) write({type: 'collect-ejected', id: piece.id}, () =>
        message('튕겨낸 조각 재수집 · ' + (piece.piece ? pieceName(piece.piece) : variantName(piece.mineral, piece.variant))));
    }
  }
  if (moved && !sensor) {
    sensor = true;
    hud();
  }
}
function frame(time) {
  const dt = previous ? Math.min(0.075, (time - previous) / 1000) : 0;
  previous = time;
  tick(dt);
  if (time - lastDraw >= 33) {
    const drawDt = Math.min(0.1, (time - lastDraw) / 1000);
    lastDraw = time;
    if (crossing) showTrainStrip();
    showMicro();
    showStory(drawDt);
    if (panel && save?.front && valueCollapse(save) >= 2) showCredits();
    el('discovery-notice').hidden = age >= discoveryNoticeUntil;
    el('memory-line').hidden = age >= memoryUntil;
    const light = [0, 0.5, 1].map((delay) =>
      Math.max(0, Math.min(1, (age - delay) * 1.7)),
    );
    const working = !fatal && (!!contact || !!laserJob || anchors.length > 0);
    render(
      {
        world,
        pos,
        yaw,
        pitch,
        light,
        anchors,
        chains: chainReach(),
        drones: dronePoints(),
        contact, fracture, age,
        mounted: !!save?.front && save.drillCondition !== 0,
        minerals: !!save?.front,
        focus: !!fittedAndWorking(save, 'lamp'),
        working,
        // Once a drill is mounted the camera stands back far enough for all drills.
        body: save?.front ? {radius: bodyRadius(save), drills: drillCount(save), size: drillSize(save),
          distance: (bodyRadius(save) * 2.4 + drillSize(save) * 1.2) * zoom} : null,
      },
      time / 1000,
    );
    el('rock-gain').hidden = age - lastRockGain >= 0.7;
    const now = Date.now();
    const notice = save?.craftReadyAt ? (now < save.craftReadyAt-fabricationMs+950 ?
      '기본 드릴 제작 시작' : '기본 드릴 제작중') : now < installedUntil ? '기본 드릴 장착함' : '';
    const toast = el('fabrication');
    if (toast.textContent !== notice) {
      toast.textContent = notice;
      toast.hidden = !notice;
      if (notice) toast.animate([{opacity:0},{opacity:1}],{duration:160});
    }
    if (osc && audio) osc.frequency.setTargetAtTime(contact ? 110+contact.heat*145 : 99,audio.currentTime,0.07);
    if (gain)
      gain.gain.setTargetAtTime(
        working ? Math.min(0.045, age * 0.012) : 0,
        audio.currentTime,
        0.14,
      );
    if (save?.drillCondition === 0 || sensor || hazardVisible || !el('hazard-alert').hidden || save?.captures?.length) hud();
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
