import { createWorld, forward, offset, radius, entrance } from './world.js';
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
function loadWorld() {
  world = createWorld(!save?.transited);
  pos = [0.5, 0.5, 0.5];
  velocity = [0, 0, 0];
  yaw = 0;
  pitch = 0;
  sensor = false;
  entered = false;
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
  const marker = el('sensor');
  const mouth = world.mouth;
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
    marker.classList.toggle('exposed', !world.tutorial || world.uncovered());
  }
}
function distance() {
  return Math.hypot(...pos.map((n, i) => entrance[i] - n));
}
function syncSave() {
  const latest = readSave();
  const newWorld =
    latest.front !== save?.front || latest.transited !== save?.transited;
  save = latest;
  if (newWorld) {
    loadWorld();
    if (!save.front) panel = false;
  }
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
    save = await commit(save.revision, op);
    after?.();
  } catch (e) {
    try {
      syncSave();
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
el('confirm-reset').onclick = () => write('reset', () => location.reload());
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
function move(dt) {
  const next = offset(pos, velocity, dt);
  if (world.blockers(next).length) {
    velocity = [0, 0, 0];
    return false;
  }
  const crossed = pos[2] < entrance[2] && next[2] >= entrance[2];
  pos = next;
  world.stream(pos);
  if (
    world.uncovered() &&
    crossed &&
    Math.hypot(pos[0] - 0.5, pos[1] - 0.5) < 1.64 - radius
  )
    entered = true;
  if (pos[2] < entrance[2]) entered = false;
  if (entered && pos[2] >= entrance[2] + radius && !busy) {
    velocity = [0, 0, 0];
    write('transit', () => {
      loadWorld();
      message('포탈 통과 완료');
    });
  }
  return true;
}
function tick(dt) {
  if (fatal || document.hidden) return;
  age += dt;
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
  const length = distance(),
    field = world.uncovered() && length < 4;
  const inward = pos.map((n, i) => (entrance[i] - n) / Math.max(0.01, length));
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
    if (timer >= 0.16) {
      timer = 0;
      write('collect', () => {
        world.dig(...target);
        anchors = [];
      });
    }
    return;
  }
  anchors = [];
  timer = 0;
  targetTag = '';
  const force = field && !entered ? 2.8 * (1 - length / 4) : 0;
  velocity = velocity.map(
    (n, i) => n + ((d[i] * 1.9 - n) * 3 + inward[i] * force) * dt,
  );
  // Turning redirects propulsion. Inertia and portal pull may deflect the hull
  // sideways, but never translate it behind its current heading.
  const along = velocity.reduce((sum, v, i) => sum + v * d[i], 0);
  if (along < 0) velocity = velocity.map((v, i) => v - along * d[i]);
  if (move(dt) && !sensor) {
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
        mounted: !!save?.front,
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
