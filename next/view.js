import { identify } from './chunk-terrain.js';
import { intersectStone } from './rock-shapes.js';
import { forward } from './world.js';

import { createDust } from './dust.js';
function noise(x, y, z) {
  let h =
    Math.imul(x, 374761393) +
    Math.imul(y, 668265263) +
    Math.imul(z, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
// Project into the view when visible. Otherwise pin an arrow to the edge;
// a target directly behind the hull defaults to a rightward turn.
export function portalMarker(mouth, pos, yaw, pitch, width, height) {
  const [x, y, z] = mouth.map((v, i) => v - pos[i]);
  const horizontal = x * Math.sin(yaw) + z * Math.cos(yaw);
  let right = x * Math.cos(yaw) - z * Math.sin(yaw);
  const down = horizontal * Math.sin(pitch) - y * Math.cos(pitch);
  const depth = horizontal * Math.cos(pitch) + y * Math.sin(pitch);
  const focal = Math.min(width, height) * 0.82;
  const edgeX = Math.max(1, width / 2 - 28),
    edgeY = Math.max(1, height / 2 - 58);
  if (
    depth > 0.001 &&
    Math.abs((right * focal) / depth) <= edgeX &&
    Math.abs((down * focal) / depth) <= edgeY
  )
    return {
      x: width / 2 + (right * focal) / depth,
      y: height / 2 + (down * focal) / depth,
      angle: 0,
      offscreen: false,
    };
  if (Math.hypot(right, down) < 0.0001) right = 1;
  const scale = 1 / Math.max(Math.abs(right) / edgeX, Math.abs(down) / edgeY);
  return {
    x: width / 2 + right * scale,
    y: height / 2 + down * scale,
    angle: Math.atan2(down, right),
    offscreen: true,
  };
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
    const { world, pos, yaw, pitch, light, working, anchors, contact } = s;
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
    const portals = world.portals();
    for (let j = 0; j < h; j++)
      for (let i = 0; i < w; i++) {
        const u = (i + 0.5 - w / 2) / f,
          v = (h / 2 - j - 0.5) / f;
        const dx = d[0] + right[0] * u + up[0] * v,
          dy = d[1] + up[1] * v,
          dz = d[2] + right[2] * u + up[2] * v;
        const hit = world.trace(pos, dx, dy, dz, 32, intersectStone);
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
          const left =
            light[0] * Math.exp(-5 * ((u + 0.22) ** 2 + (v - 0.06) ** 2));
          const rightLight =
            light[1] * Math.exp(-6 * ((u - 0.24) ** 2 + (v + 0.1) ** 2));
          const core = light[2] * Math.exp(-16 * (u * u + v * v));
          const lum =
            (((left * 0.65 + rightLight * 0.55 + core * 0.28) * grain * 185) /
              (1 + 0.12 * hit.t ** 1.45)) *
            hit.shade;
          r += lum * 1.12;
          g += lum * 1.01;
          b += lum * 0.86;
          if (contact && hit.x === contact.x && hit.y === contact.y && hit.z === contact.z) {
            const px = x - contact.point[0], py = y - contact.point[1], pz = z - contact.point[2];
            const radius = 0.07 + 0.27 * contact.heat;
            const distance2 = (px*px + py*py + pz*pz) / (radius*radius);
            if (distance2 < 1) {
              const intensity = (1-distance2) ** 2 * (0.35 + 0.65*contact.heat) * grain;
              r += 380 * intensity;
              g += 185 * intensity ** 2;
              b += 85 * intensity ** 3;
            }
          }
        }
        let nearest = hit?.t ?? 32;
        for (const portal of portals) {
          const axis = portal.axis, u = (axis + 1) % 3, v = (axis + 2) % 3;
          const ray = [dx, dy, dz];
          if (ray[axis] * portal.sign <= 0.001) continue;
          const t = (portal.point[axis] - pos[axis]) / ray[axis];
          if (t <= 0 || t > nearest + 0.00001) continue;
          const scale = 1.64 / portal.radius;
          const ex = (pos[u] + ray[u] * t - portal.point[u]) * scale;
          const ey = (pos[v] + ray[v] * t - portal.point[v]) * scale;
          const dist = Math.max(Math.abs(ex), Math.abs(ey)) ** 2;
          if (dist <= 1.64 ** 2) {
            nearest = t;
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
    const hazard = world.hazard;
    if (hazard?.kind && !hazard.spent) {
      const at = project(hazard.point);
      const ray = hazard.point.map((v,i) => v-pos[i]);
      const depth = Math.hypot(...ray);
      const rock = at && depth <= 7 && world.trace(pos,...ray,1);
      if (at && depth <= 7 && (!rock || [rock.x,rock.y,rock.z].every((v,i) => v === Math.floor(hazard.point[i])))) {
        const size = f*0.42/Math.max(0.5,depth);
        ctx.fillStyle = hazard.kind === 'lava' ? '#da5927' : '#dfaa59';
        ctx.beginPath();
        ctx.ellipse(at[0],at[1],size,size*(hazard.kind === 'lava' ? 0.4 : 0.85),0.3,0,Math.PI*2);
        ctx.fill();
      }
    }
    for (const part of world.fragments()) {
      const screen = project(part.point);
      if (!screen) continue;
      const ray = part.point.map((v,i) => v-pos[i]);
      const distance = Math.hypot(...ray);
      if (distance > 32 || world.trace(pos,...ray,0.98)) continue;
      const size = f*0.38/Math.max(0.5,distance);
      ctx.save();
      ctx.translate(...screen);
      ctx.rotate(part.mass);
      ctx.globalAlpha = light[0]/(1+distance*0.035);
      ctx.fillStyle = '#89775c';
      ctx.beginPath();
      ctx.moveTo(-size,-size*0.3);
      ctx.lineTo(-size*0.45,-size);
      ctx.lineTo(size*0.8,-size*0.65);
      ctx.lineTo(size,size*0.5);
      ctx.lineTo(-size*0.2,size);
      ctx.fill();
      ctx.restore();
    }
    for (const {chunk,item} of world.warehouseItems()) {
      const screen = project(item.point);
      if (!screen || screen[0]<0 || screen[0]>=w || screen[1]<0 || screen[1]>=h) continue;
      const ray = item.point.map((n,i) => n-pos[i]);
      const distance = Math.hypot(...ray);
      if (distance > 32 || world.trace(pos, ...ray, 0.999)) continue;
      const type = identify(item,chunk);
      const size = Math.min(14, f*0.32/Math.max(0.5,distance));
      ctx.save();
      ctx.translate(...screen);
      ctx.rotate(now*0.35+item.id);
      ctx.globalAlpha = light[0] / (1+distance*0.045);
      ctx.fillStyle = ['#a2bdca','#b5a68c','#9c8fbd'][type];
      if (type === 0) {
        ctx.beginPath();
        ctx.arc(0,0,size,0,Math.PI*2);
        ctx.strokeStyle = ctx.fillStyle;
        ctx.stroke();
      } else ctx.fillRect(-size,-size*0.6,2*size,1.2*size);
      ctx.restore();
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
      if (world.trace(pos, ...ray, 0.999, intersectStone)) continue;
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
    if (contact && light[0] > 0) {
      const at = project(contact.point);
      if (at) {
        const [x,y] = at;
        const heat = contact.heat;
        const distance = Math.hypot(...contact.point.map((v,i) => v-pos[i]));
        const size = f * (0.045 + 0.14*heat) / Math.max(0.25,distance);
        line(w*0.71,h,x,y,'rgba(253,106,52,0.28)',3);
        line(w*0.71,h,x,y,'#ffce87',0.85);
        for (let i=0;i<6;i++) {
          const life = (now*2.8+i/6)%1;
          const angle = i*2.4;
          const sparkX = x+Math.cos(angle)*life*size*1.8;
          const sparkY = y+Math.sin(angle)*life*size*1.8;
          line(sparkX,sparkY,sparkX+Math.cos(angle)*size*0.15,sparkY+Math.sin(angle)*size*0.15,
            'rgba(255,211,139,'+((1-life)*heat)+')');
        }
      }
    }
    if (s.fracture && s.age-s.fracture.at < 0.5) {
      const life = (s.age-s.fracture.at)*2;
      for (let i=0;i<12;i++) {
        const point = s.fracture.point.map((v,j) => v + Math.sin(i*2.4+j*7.1)*life*0.32);
        const at = project(point);
        if (!at) continue;
        ctx.fillStyle = 'rgba(166,139,104,'+(1-life)+')';
        ctx.fillRect(...at,i%3+1,i%2+1);
      }
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
