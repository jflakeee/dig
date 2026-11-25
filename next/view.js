import { entrance, exitMouth, forward } from './world.js';

import { createDust } from './dust.js';
function noise(x, y, z) {
  let h =
    Math.imul(x, 374761393) +
    Math.imul(y, 668265263) +
    Math.imul(z, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
export function createView(canvas) {
  const ctx = canvas.getContext('2d', { alpha: false });
  let pixels,
    lastTime = 0;
  const updateDust = createDust();
  function resize() {
    const ratio = canvas.clientWidth / Math.max(1, canvas.clientHeight);
    canvas.width = Math.round(Math.min(330, 216 * ratio));
    canvas.height = Math.round(canvas.width / ratio);
    pixels = ctx.createImageData(canvas.width, canvas.height);
  }
  resize();
  new ResizeObserver(resize).observe(canvas);
  return function render(s, now) {
    const { world, pos, yaw, pitch, light, working, anchors } = s;
    const w = canvas.width,
      h = canvas.height,
      f = Math.min(w, h) * 0.82;
    const d = forward(yaw, pitch),
      right = [Math.cos(yaw), 0, -Math.sin(yaw)];
    const up = [
      -Math.sin(yaw) * Math.sin(pitch),
      Math.cos(pitch),
      -Math.cos(yaw) * Math.sin(pitch),
    ];
    const source = pixels.data;
    const open = world.uncovered();
    const mouth = world.tutorial ? entrance : exitMouth;
    for (let j = 0; j < h; j++)
      for (let i = 0; i < w; i++) {
        const u = (i + 0.5 - w / 2) / f,
          v = (h / 2 - j - 0.5) / f;
        const dx = d[0] + right[0] * u + up[0] * v,
          dy = d[1] + up[1] * v,
          dz = d[2] + right[2] * u + up[2] * v;
        const hit = world.trace(pos, dx, dy, dz);
        let r = 2,
          g = 3,
          b = 4;
        if (hit) {
          const x = pos[0] + dx * hit.t,
            y = pos[1] + dy * hit.t,
            z = pos[2] + dz * hit.t;
          const a = hit.axis === 0 ? z : x,
            c = hit.axis === 1 ? z : y;
          const sample = (scale) =>
            noise(
              Math.floor(a * scale),
              Math.floor(c * scale),
              hit.x + 23 * hit.y + 53 * hit.z,
            );
          const strata = Math.sin(
            13 * c + 3 * a + 1.3 * Math.sin(a * 3) + sample(5) * 0.6,
          );
          const grain =
            0.47 + 0.22 * sample(9) + 0.22 * sample(49) + 0.12 * strata;
          const joint = Math.min(
            a - Math.floor(a),
            1 - a + Math.floor(a),
            c - Math.floor(c),
            1 - c + Math.floor(c),
          );
          const left =
            light[0] * Math.exp(-5 * ((u + 0.22) ** 2 + (v - 0.06) ** 2));
          const rightLight =
            light[1] * Math.exp(-6 * ((u - 0.24) ** 2 + (v + 0.1) ** 2));
          const core = light[2] * Math.exp(-16 * (u * u + v * v));
          const lum =
            (((left * 0.65 + rightLight * 0.55 + core * 0.28) * grain * 185) /
              (1 + 0.12 * hit.t ** 1.45)) *
            (joint < 0.013 ? 0.67 : 1) *
            [0.78, 0.66, 1][hit.axis];
          r += lum * 1.12;
          g += lum * 1.01;
          b += lum * 0.86;
        }
        if ((open && dz > 0.001) || (!world.tutorial && dz < -0.001)) {
          const t = (mouth[2] - pos[2]) / dz;
          const ex = pos[0] + dx * t - entrance[0],
            ey = pos[1] + dy * t - entrance[1],
            dist = ex * ex + ey * ey;
          if (
            t > 0 &&
            t < (hit?.t ?? 32) &&
            dist < (world.tutorial ? 2.7 : 1.3)
          ) {
            const era = Math.floor(now / 3) % 3,
              ridge =
                Math.sin(ex * (4 + era) + era) * 0.25 + 0.1 * Math.sin(ex * 9);
            const rim = Math.exp(-8 * Math.abs(dist - 2.48)) * 85;
            const value =
              (ey > ridge
                ? 30 + ey * 13
                : 15 + 10 * Math.sin(ey * 15 + ex * 3)) + rim;
            r = value * [0.75, 1.42, 0.81][era];
            g = value * [1.29, 1.03, 1.1][era];
            b = value * [1.36, 0.73, 1.53][era];
          }
        }
        const k = 4 * (i + j * w);
        source[k] = r;
        source[k + 1] = g;
        source[k + 2] = b;
        source[k + 3] = 255;
      }
    ctx.putImageData(pixels, 0, 0);
    function project(point) {
      const q = point.map((n, i) => n - pos[i]);
      const dot = (axis) => axis.reduce((sum, n, i) => sum + n * q[i], 0);
      const depth = dot(d);
      if (depth < 0.01) return null;
      return [w / 2 + (f * dot(right)) / depth, h / 2 - (f * dot(up)) / depth];
    }
    const motes = updateDust(world, pos, Math.min(0.1, now - lastTime));
    lastTime = now;
    for (const mote of motes) {
      if (mote.life <= 0) continue;
      const screen = project(mote.p);
      if (
        !screen ||
        screen[0] < 0 ||
        screen[0] >= w ||
        screen[1] < 0 ||
        screen[1] >= h
      )
        continue;
      const ray = mote.p.map((n, i) => n - pos[i]);
      if (world.trace(pos, ...ray, 0.999)) continue;
      const u = (screen[0] - w / 2) / f,
        v = (screen[1] - h / 2) / f;
      ctx.fillStyle =
        'rgba(222,207,174,' +
        light[0] * 0.7 * Math.exp(-4 * (u * u + v * v)) +
        ')';
      ctx.fillRect(screen[0], screen[1], 1, 1);
    }
    function line(x, y, a, b, color, width = 1) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(a, b);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.stroke();
    }
    if (!s.mounted && working && light[0] > 0) {
      line(w * 0.71, h, w * 0.5, h * 0.5, '#bd5726', 2);
      line(w * 0.71, h, w * 0.5, h * 0.5, '#ffd599');
      ctx.fillStyle = '#ffecbd';
      ctx.fillRect(w * 0.5 - 1, h * 0.5 - 1, 3, 3);
    }
    if (s.mounted) {
      for (const [n, point] of anchors.entries()) {
        const end = project(point);
        if (end) {
          ctx.setLineDash([2, 1]);
          line(w * (n ? 0.82 : 0.18), h, ...end, '#969789', 1.6);
          ctx.setLineDash([]);
        }
      }
      const cx = w * 0.54,
        cy = h * 0.98,
        length = Math.min(w, h) * 0.25;
      ctx.fillStyle = '#353a39';
      ctx.beginPath();
      ctx.moveTo(cx - length * 0.81, h);
      ctx.lineTo(cx - length * 0.25, cy - length);
      ctx.lineTo(cx + length * 0.52, h);
      ctx.fill();
      ctx.save();
      ctx.clip();
      const spin = working ? Math.sin(now * 19) * 2 : 0;
      for (let j = 0; j < 8; j++)
        line(
          cx - length,
          cy - length + (j * length) / 7 + spin,
          cx + length,
          cy - length + ((j + 3) * length) / 7 + spin,
          '#83857a',
          2,
        );
      ctx.restore();
    }
  };
}
