import { intersectStone } from './rock-shapes.js';
import { cargoLoss } from './hazards.js';
import { cargoNames } from './chunk-terrain.js';
import { createWorld, forward, offset, portalRayDistance, radius } from './world.js';
import { readSave, commit, saveKey, fabricationMs, rocksPerCeramic, ceramicPerRepair, variantCounts, decompositionPreview, sellPrice } from './save.js';
import { massText } from './composition.js';
import { currency, marketCycle, cycleSeconds, auctionSeconds, traderOf, marketStock, auctionEstimate } from './trade.js';
import { mineralIds, mineralName, variantName } from './minerals.js';
import { elementSymbols } from './elements.js';
import { specimenById, specimenLabel } from './specimens.js';
import { findById, findLabel, findPiece, clockText } from './finds.js';
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
let checkpointAge = 0;
let hull = 100;
let hazardVisible = false;
let discoveryNoticeUntil = 0;
let laserJob = null;
// `?seed=N` fixes the seed of every newly created world (N plus the number of
// completed trips), so automated checks see the same terrain on each run.
// Without it each new world draws a random seed. Saved worlds keep their own.
const seedParam = new URLSearchParams(location.search).get('seed');
const fixedSeed = /^\d{1,10}$/.test(seedParam ?? '') ? Number(seedParam) >>> 0 : undefined;
function newSeed(trips) {
  return fixedSeed === undefined ? undefined : (fixedSeed + trips) >>> 0;
}
function loadWorld() {
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
    p => specimenLabel(p.kind, p.variant, p.element));
  count(save.finds ?? [], p => findPiece(p.kind, p.variant) && 'f:' + p.kind + ':' + p.variant,
    p => findLabel(p) + (findById(p.kind).setting ? ' (' + findById(p.kind).setting + ')' : ''));
  return choices;
}
function decomposeOperation(value) {
  const [source, kind, variant] = value.split(':');
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
    ' → 회수 ' + massText(result.kept) + ' · 손실 ' + massText(result.grams - result.kept) + ' (원인 기록 없음)\n' + yieldText(result.out)
    : '분해할 원료가 없습니다.';
  el('decompose').disabled = busy || !result;
  const book = el('element-book');
  const log = save.elementLog ?? [];
  book.hidden = !log.length;
  el('element-count').textContent = log.length + ' / ' + elementSymbols.length + '종';
  el('element-list').textContent = elementSymbols.filter(symbol => log.includes(symbol))
    .map(symbol => symbol + ' ' + massText(save.elements[symbol] ?? 0, symbol)).join(' · ');
}
// Drone trade with machines of other times. Prices hold for one market cycle.
const credit = n => n.toLocaleString('ko-KR') + ' ' + currency;
const pieceName = p => p.kind === 'capsule' || specimenById(p.kind) ? specimenLabel(p.kind, p.variant, p.element) : findLabel(p);
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
  for (const p of save.specimens) if (p.kind !== 'capsule') {
    const value = 's|' + p.kind + '|' + p.variant;
    groups.set(value, [(groups.get(value)?.[0] ?? 0) + 1, p]);
  }
  for (const p of save.finds) {
    const c = findById(p.kind).category;
    if (c === 'unknown') continue;
    const value = 'f|' + p.kind + '|' + p.variant + (c === 'equipment' ? '|' + p.id : '');
    groups.set(value, [(groups.get(value)?.[0] ?? 0) + 1, p]);
  }
  for (const [value, [n, p]] of groups)
    choices.push([value, pieceName(p) + (p.durability !== undefined ? ' · 내구도 ' + p.durability + '%' : '') + ' · ' + n + '개']);
  return choices.map(([value, label]) => [value, label, sellPrice(save, tradeOperation(value))]).filter(c => c[2]);
}
function auctionChoices() {
  const out = [];
  for (const p of save.specimens) if (p.kind === 'capsule') out.push(['s|capsule|' + p.element + '|' + p.id, pieceName(p), auctionEstimate(p)]);
  for (const p of save.finds) if (findById(p.kind).category === 'unknown') out.push(['f|' + p.kind + '|' + p.variant + '|' + p.id, pieceName(p), auctionEstimate(p)]);
  return out;
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
  if (parts[0] === 'unsold') return '유찰 · ' + (tradeNames.get(parts.slice(1).join(':')) ?? '경매품') + ' 반환';
  const fee = Number(parts.pop()), price = Number(parts.pop());
  return '낙찰 · ' + (tradeNames.get(parts.slice(1).join(':')) ?? '경매품') + ' · ' + credit(price) + ' (수수료 ' + credit(fee) + ')';
}
const tradeNames = new Map();
function showTrade() {
  const box = el('trade');
  box.hidden = !save?.front;
  if (!panel || box.hidden) return;
  const cycle = marketCycle(save.marketTime);
  const trader = traderOf(save.marketSeed, cycle);
  el('credits').textContent = credit(save.credits);
  const left = Math.ceil((cycle + 1) * cycleSeconds - save.marketTime);
  el('trader').textContent = '신호 #' + trader.signal + ' · ' + trader.name + ' · 시세 갱신까지 ' + Math.floor(left / 60) + ':' + String(left % 60).padStart(2, '0');
  const sells = sellChoices();
  fillSelect(el('sell-source'), sells.map(([value, label, price]) => [value, label + ' → ' + credit(price)]));
  const sell = sells.find(([value]) => value === el('sell-source').value);
  el('sell').textContent = sell ? '1개 판매 · ' + credit(sell[2]) : '판매할 물품 없음';
  el('sell').disabled = busy || !sell;
  const stock = marketStock(save.marketSeed, cycle);
  const buttons = stock.map(o => '구매 · ' + o.name + (o.durability ? ' (내구도 ' + o.durability + '%)' : '') + ' · ' + credit(o.price));
  const list = el('buy-list');
  if (list.dataset.labels !== JSON.stringify(buttons)) {
    list.replaceChildren(...stock.map((o, i) => {
      const b = Object.assign(document.createElement('button'), {textContent: buttons[i]});
      b.dataset.item = o.item;
      b.onclick = () => {
        const offer = marketStock(save.marketSeed, marketCycle(save.marketTime)).find(x => x.item === o.item);
        write({type: 'buy', item: o.item, price: offer.price}, () => message(offer.name + ' 구매 · ' + credit(offer.price)));
      };
      return b;
    }));
    list.dataset.labels = JSON.stringify(buttons);
  }
  for (const b of list.children) b.disabled = busy || save.credits < (stock.find(o => o.item === b.dataset.item)?.price ?? Infinity);
  const auctions = auctionChoices();
  fillSelect(el('auction-source'), auctions.map(([value, label, estimate]) => [value, label + ' · 추정 ' + credit(estimate)]));
  el('auction').disabled = busy || !auctions.length;
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
  const log = save.tradeLog.slice(0, 5).map(tradeLogText);
  if (el('trade-log').dataset.lines !== JSON.stringify(log)) {
    el('trade-log').replaceChildren(...log.map(text => Object.assign(document.createElement('li'), {textContent: text})));
    el('trade-log').dataset.lines = JSON.stringify(log);
  }
}
// Finds kept whole: equipment with durability, unknown materials and items.
function showStored() {
  const box = el('stored');
  const pieces = save?.finds ?? [];
  box.hidden = !save?.front || !pieces.length;
  if (!panel || box.hidden) return;
  el('stored-count').textContent = pieces.length + '개';
  const lines = pieces.map(p => findLabel(p) + (p.durability !== undefined ? ' · 내구도 ' + p.durability + '%' : '') +
    (p.kind === 'desk_clock' ? ' · 멈춘 시각 ' + clockText(p.stoppedAt) : '') +
    (findById(p.kind).category === 'unknown' ? ' · 미분석' : findById(p.kind).category === 'equipment' && p.kind !== 'drill_head' ? ' · 장착 슬롯 준비 중' : ''));
  const list = el('stored-list');
  if (list.dataset.lines !== JSON.stringify(lines)) {
    list.replaceChildren(...lines.map(text => Object.assign(document.createElement('li'), {textContent: text})));
    list.dataset.lines = JSON.stringify(lines);
  }
  const head = bestHead();
  el('equip-head').hidden = !head;
  el('equip-head').disabled = busy;
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
  if (!panel) {
    el('reset-prompt').hidden = true;
    el('reset').hidden = false;
  }
  el('confirm-reset').disabled = busy;
  if (panel) el('cargo').textContent = (save?.cargo ?? []).map((n,i) => n ? cargoNames[i] + ' × ' + n : '').filter(Boolean).join(' · ');
  if (panel && save.front) {
    const cargo = el('cargo');
    cargo.textContent = [cargo.textContent, '기체 ' + Math.ceil(hull) + '% · 드릴 ' + (save.drillCondition ?? 100) + '%'].filter(Boolean).join(' | ');
  }
  const condition = save?.drillCondition ?? 100;
  const ceramic = save?.ceramic ?? 0;
  el('fire-ceramic').hidden = !save?.front || save.rocks < rocksPerCeramic;
  el('fire-ceramic').disabled = busy;
  el('repair').hidden = !save?.front || condition === 100 || ceramic < ceramicPerRepair;
  el('repair').disabled = busy;
  el('emergency').hidden = !save?.front || condition !== 0 || ceramic >= ceramicPerRepair || save.rocks >= rocksPerCeramic;
  el('emergency').disabled = busy || !!laserJob || (!el('emergency').hidden && !laserHit());
  if (panel) el('minerals').textContent = mineralIds.filter(id => id === 'rock' ? save?.rocks : save?.minerals?.[id])
    .map(id => {
      const parts = Object.entries(variantCounts(save, id)).filter(([, n]) => n > 0);
      const total = id === 'rock' ? save.rocks : save.minerals[id];
      const detail = parts.length > 1 || (parts[0] && variantName(id, parts[0][0]) !== mineralName(id))
        ? ' (' + parts.map(([v, n]) => variantName(id, v) + ' ' + n).join(' · ') + ')' : '';
      return mineralName(id) + ' × ' + total + detail;
    }).join(' · ');
  if (panel && save?.front) {
    el('materials').textContent = '세라믹 ' + ceramic + (condition < 100 && !ceramic ?
      ' · 수리용 세라믹 1개 필요 (암석 ' + save.rocks + '/' + rocksPerCeramic + ')' : '');
  }
  // The first sensitive find counts down in world time; later ones wait.
  const pending = save?.front && save.captures?.[0];
  const left = pending ? pending.expiresAt - world.elapsed : 0;
  el('capture-alert').hidden = el('capture').hidden = !pending || left <= 0;
  if (pending && left > 0) {
    const rule = findById(pending.kind)?.sensitive;
    const label = rule ? rule.alert : specimenById(pending.kind).sensitive;
    const verb = rule ? rule.button.split(' ')[0] : pending.kind === 'mercury' ? '밀봉' : '포집';
    el('capture-alert').textContent = label + ' · ' + verb + '까지 ' + Math.ceil(left) + '초' +
      (save.captures.length > 1 ? ' · 대기 ' + (save.captures.length - 1) : '');
    el('capture').textContent = rule ? rule.button : pending.kind === 'mercury' ? '냉각 밀봉' : '기체 포집';
  }
  el('capture').disabled = busy;
  const hazard = world.hazard;
  const alerted = hazardVisible && hazard && !hazard.spent;
  el('hazard-alert').hidden = !alerted;
  el('hazard-alert').textContent = alerted ? (hazard.kind === 'lava' ? '고열 감지 · 방향 전환' :
    hazard.fuse === null ? '불안정 광물 감지' : '충격 경고 · ' + Math.ceil(hazard.fuse) + '초') : '';
  el('stabilize').hidden = !(alerted && hazard.kind === 'volatile' && hazard.fuse !== null && Math.hypot(...hazard.point.map((v,i) => v-pos[i])) <= 2.5);
  el('stabilize').disabled = busy;
  const marker = el('sensor');
  const nearest = world.portals().reduce((best, portal) => {
    const distance = Math.hypot(...portal.point.map((v, i) => v - pos[i]));
    return !best || distance < best.distance ? {portal, distance} : best;
  }, null);
  const mouth = nearest?.portal.point;
  marker.hidden =
    !sensor || !mouth || Math.hypot(...mouth.map((v, i) => v - pos[i])) > 32;
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
async function write(op, after) {
  if (busy || fatal) return;
  busy = true;
  hud();
  const type = op?.type ?? op;
  try {
    let session = ['collect','drill','laser','repair','fire-ceramic','checkpoint','blast','pickup','capture'].includes(type)
      ? {hull, pos, velocity, drift, yaw, pitch, sensor, entered: world.portals().indexOf(entered), world: world.snapshot()}
      : null;
    if (op?.type === 'transit') {
      const destination = createWorld(false, undefined, op.radius, op.strength, undefined, undefined, newSeed((save.trips ?? 0) + 1));
      session = {hull,pos:[0.5,0.5,0.5],velocity:[0,0,0],drift,yaw:0,pitch:0,sensor:false,entered:-1,world:destination.snapshot()};
    }
    const before = save;
    save = await commit(save.revision, op, session);
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
      }
    }
    const fresh = (save.specimens ?? []).filter(p => !had.has(p.id));
    if (fresh.length && type !== 'capture') {
      message(fresh.map(p => p.kind === 'capsule' ? '원소 표본 캡슐 회수 · ' + p.element : '시료 발견 · ' + specimenLabel(p.kind, p.variant)).join(' · '));
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
        : specimenLabel(p.kind, p.variant) + ' 소실').join(' · '));
    for (const a of before.auctions ?? []) tradeNames.set(a.id, pieceName(a.piece));
    const settled = (save.tradeLog ?? []).filter(entry => !(before.tradeLog ?? []).includes(entry));
    if (settled.length) message(settled.map(tradeLogText).join(' · '));
    if (type === 'craft') installedUntil = Date.now()+1600;
    checkpointAge = 0;
    after?.();
  } catch (e) {
    try {
      syncSave(true);
    } catch {
      fatal = true;
    }
    message(e.message || '저장 실패 · 다시 시도해 주세요.');
  } finally {
    busy = false;
    hud();
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
el('sell-source').onchange = () => hud();
el('sell').onclick = () => {
  const value = el('sell-source').value;
  const price = value && sellPrice(save, tradeOperation(value));
  if (!price) return;
  const label = el('sell-source').selectedOptions[0]?.textContent.replace(/ · \d+개 → .*$/, '');
  write({type: 'sell', ...tradeOperation(value), price}, () => message(label + ' 판매 · ' + credit(price)));
};
el('auction').onclick = () => {
  const value = el('auction-source').value;
  if (!value) return;
  write({type: 'auction', ...tradeOperation(value)}, () => message('경매 등록 · 다른 시간대 채굴기의 입찰을 기다립니다'));
};
el('capture').onclick = () => {
  const pending = save?.captures?.[0];
  if (!pending) return;
  write({type: 'capture', id: pending.id}, () =>
    message((findById(pending.kind) ? findLabel(pending) : specimenLabel(pending.kind, pending.variant)) + ' 회수'));
};
el('equip-head').onclick = () => {
  const head = bestHead();
  if (head) write({type: 'equip-head', id: head.id}, () => message('드릴 헤드 교체 · 내구도 ' + save.drillCondition + '%'));
};
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
el('repair').onclick = () => write('repair', () => {
  laserJob = null;
  contact = null;
  timer = 0;
  message('드릴 수리 완료');
});
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
el('close').onclick = () => {
  panel = false;
  hud();
};
el('reset').onclick = () => {
  el('reset').hidden = true;
  el('reset-prompt').hidden = false;
};
el('confirm-reset').onclick = () => {
  write('reset', () => {
    loadWorld();
    releaseLook();
    panel = false;
    age = 0;
    message('');
  });
};
canvas.onpointerdown = (e) => {
  pointer = { id: e.pointerId, x: e.clientX, y: e.clientY };
  canvas.setPointerCapture(e.pointerId);
};
canvas.onpointermove = (e) => {
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
canvas.onpointerup = releaseLook;
canvas.onpointercancel = releaseLook;
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
function holdChains() {
  if (anchors.length) return;
  for (const sign of [-1, 1]) {
    const dir = forward(yaw + sign * 0.96, -0.22);
    const hit = world.trace(pos, ...dir, 6);
    if (hit) anchors.push(offset(pos, dir, hit.t));
  }
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
    if (Math.max(...lateral.map(Math.abs)) + radius <= portal.radius) entered = portal;
  }
  pos = next;
  world.stream(pos);
  if (entered && entered.sign * (pos[entered.axis] - entered.point[entered.axis]) < 0) entered = false;
  if (entered && entered.sign * (pos[entered.axis] - entered.point[entered.axis]) >= radius && !busy) {
    velocity = [0, 0, 0];
    write({type: 'transit', radius: entered.radius, strength: entered.strength}, () => {
      loadWorld();
      message('포탈 통과 완료');
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
  const {push,damage,impactPoint} = world.hullContacts(dt,pos,velocity.map((v,i) => v+drift[i]),anchors.length > 0);
  const hazard = world.sense(pos,dt,damage > 0);
  hazardVisible = hazard.visible;
  for (const [loss,cause,origin] of [[damage,'impact',impactPoint],
    [hazard.damage,hazard.blast ? 'blast' : 'lava',world.hazard?.point]]) {
    if (loss <= 0) continue;
    hull = Math.max(0,hull-loss);
    if (!hull) {
      write({type:'reboot',loss:cargoLoss(cause,origin,pos,yaw,pitch)}, () => {
        age = 0;
        loadWorld();
        message('기체 파손 · 재기동');
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
  const blocks = world.blockers(offset(pos, d, 0.7));
  if (blocks.length) {
    velocity = [0, 0, 0];
    if (save.drillCondition === 0) { anchors = []; return; }
    holdChains();
    const target = blocks[0],
      tag = target.join(',');
    if (targetTag !== tag) {
      timer = 0;
      targetTag = tag;
    }
    timer += dt;
    if (timer >= 0.16) {
      timer = 0;
      if (!world.dig(...target)) return;
      write({type: 'drill', cell: target}, () => {
        anchors = [];
        if (save.drillCondition === 0) message('드릴 파손 · 긴급 레이저 또는 메뉴에서 수리');
      });
    }
    return;
  }
  anchors = [];
  timer = 0;
  targetTag = '';
  velocity = velocity.map(
    (n, i) => n + ((d[i] * 1.9 - n) * 3 + pull[i]) * dt,
  );
  // Turning redirects propulsion. Inertia and portal pull may deflect the hull
  // sideways, but never translate it behind its current heading.
  const along = velocity.reduce((sum, v, i) => sum + v * d[i], 0);
  if (along < 0) velocity = velocity.map((v, i) => v - along * d[i]);
  const moved = move(dt);
  if (moved && !busy) {
    const type = world.takeNearby(pos,velocity.map((v,i) => v+drift[i]));
    if (type !== null) recoverCargo(type, cargoNames[type] + ' 회수');
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
    lastDraw = time;
    el('discovery-notice').hidden = age >= discoveryNoticeUntil;
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
        contact, fracture, age,
        mounted: !!save?.front && save.drillCondition !== 0,
        minerals: !!save?.front,
        working,
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
