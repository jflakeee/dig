import { intersectStone } from './rock-shapes.js';
import { cargoLoss } from './hazards.js';
import { cargoNames } from './chunk-terrain.js';
import { createWorld, forward, offset, portalRayDistance, radius } from './world.js';
import { readSave, commit, saveKey, fabricationMs, rocksPerCeramic, ceramicPerRepair, variantCounts } from './save.js';
import { mineralIds, mineralName, variantName } from './minerals.js';
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
  book.hidden = !entries.length && !found.length;
  if (!panel || book.hidden) {
    book.open = false;
    return;
  }
  const list = el('discovery-list');
  const lines = [...found.map(id => '광물 · ' + mineralName(id)),
    ...entries.map(({item,count}) => cargoNames[item] + ' · 누적 회수 ' + count + '개')];
  if (list.textContent === lines.join('')) return;
  list.replaceChildren(...lines.map(text => {
    const row = document.createElement('li');
    row.textContent = text;
    return row;
  }));
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
    let session = ['collect','drill','laser','repair','fire-ceramic','checkpoint','blast','pickup'].includes(type)
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
  if (checkpointAge >= 1) {
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
    if (save?.drillCondition === 0 || sensor || hazardVisible || !el('hazard-alert').hidden) hud();
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
