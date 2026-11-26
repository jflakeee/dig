import { cargoNames } from './chunk-terrain.js';
import { createWorld, forward, offset, radius } from './world.js';
import { readSave, commit, saveKey } from './save.js';
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
let checkpointAge = 0;
let hull = 100;
function loadWorld() {
  const session = save?.session;
  checkpointAge = 0;
  hull = session?.hull ?? 100;
  world = createWorld(!save?.transited, Math.random, save?.arrivalRadius, save?.arrivalStrength, session?.world);
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
function hud() {
  el('rock').firstElementChild.textContent = save?.rocks ?? '—';
  el('craft').hidden = fatal || !!save?.front || !(save?.rocks >= 3);
  el('craft').disabled = busy;
  el('menu').hidden = !save?.front;
  el('menu').setAttribute('aria-expanded', String(panel));
  el('panel').hidden = !panel;
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
  save = latest;
  loadWorld();
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
  try {
    let session = save.front && (op === 'collect' || op === 'checkpoint' || op?.type === 'pickup')
      ? {hull, pos, velocity, drift, yaw, pitch, sensor, entered: world.portals().indexOf(entered), world: world.snapshot()}
      : null;
    if (op?.type === 'transit') {
      const destination = createWorld(false, Math.random, op.radius, op.strength);
      session = {hull,pos:[0.5,0.5,0.5],velocity:[0,0,0],drift,yaw:0,pitch:0,sensor:false,entered:-1,world:destination.snapshot()};
    }
    save = await commit(save.revision, op, session);
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
el('craft').onclick = () => {
  write('craft', () => {
    timer = 0;
    message('');
  });
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
function tick(dt) {
  if (fatal || document.hidden) return;
  age += dt;
  world.advance(dt);
  const d = forward(yaw, pitch);
  if (!save.front) {
    if (busy || !world.trace(pos, ...d)) return;
    timer += dt;
    if (timer >= 1.35) {
      timer = 0;
      write('collect');
    }
    return;
  }
  if (busy) return;
  const {push,damage} = world.hullContacts(dt,pos,velocity.map((v,i) => v+drift[i]),anchors.length > 0);
  if (damage > 0) {
    hull = Math.max(0,hull-damage);
    if (hull === 0) {
      write('reboot', () => {
        age = 0;
        loadWorld();
        message('기체 파손 · 재기동');
      });
      return;
    }
    message('충격·압착 감지 · 기체 ' + Math.ceil(hull) + '%');
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
  const pull = entered ? [0, 0, 0] : world.gravity(pos);
  // The probe extends beyond one integration step so the entire body fits.
  const blocks = world.blockers(offset(pos, d, 0.7));
  if (blocks.length) {
    velocity = [0, 0, 0];
    holdChains();
    const target = blocks[0],
      tag = target.join(',');
    if (targetTag !== tag) {
      timer = 0;
      targetTag = tag;
    }
    timer += dt;
    if (timer >= (save.drillCondition === 0 ? 1.35 : 0.16)) {
      timer = 0;
      world.dig(...target);
      write('collect', () => {
        anchors = [];
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
    if (type !== null) write({type:'pickup', item:type}, () => message(cargoNames[type] + ' 회수'));
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
    const light = [0, 0.5, 1].map((delay) =>
      Math.max(0, Math.min(1, (age - delay) * 1.7)),
    );
    const working = !fatal && (!save?.front || anchors.length > 0);
    render(
      {
        world,
        pos,
        yaw,
        pitch,
        light,
        anchors,
        mounted: !!save?.front && save.drillCondition !== 0,
        working,
      },
      time / 1000,
    );
    if (gain)
      gain.gain.setTargetAtTime(
        working ? Math.min(0.045, age * 0.012) : 0,
        audio.currentTime,
        0.14,
      );
    if (sensor) hud();
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
