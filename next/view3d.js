// WebGL renderer for the trial build, built on three.js. It draws what the
// Canvas 2D ray tracer (view.js) drew, with real lights: the work lamps are
// spotlights on the machine and the core beam casts shadows. Stones use the
// same fractured shapes the rays and the laser hit (rock-shapes.js). Dust,
// the laser, sparks, chains and the cockpit drill stay on a 2D overlay.
// Called with the same state object as view.js; game logic is untouched.
import * as THREE from 'three';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';
import { identify } from './chunk-terrain.js';
import { stoneCount, stoneVariant, stonePlanes } from './rock-shapes.js';
import { mineralTint } from './minerals.js';
import { forward } from './world.js';
import { createDust } from './dust.js';

const reach = 15;            // cells drawn around the camera, about 7.5 m
const rebuildGap = 0.12;     // seconds between terrain rebuilds at most
const theme = {
  void: 0x020304, stone: [0.36, 0.33, 0.30], debris: 0x89775c, hull: 0x9fb0ab, drill: 0x8d918a,
  lava: 0xda5927, unstable: 0xdfaa59, drone: 0x9aa7ab, signal: 0x9ff0c8, dust: 0xdecfae,
  items: [0xa2bdca, 0xb5a68c, 0x9c8fbd], lamp: 0xffe6c4, heat: 0xff7a35,
};

// The convex stone of one variant: the unit cell cut by its corner planes.
function stoneGeometry(variant) {
  const planes = [[1,0,0,0.5],[-1,0,0,0.5],[0,1,0,0.5],[0,-1,0,0.5],[0,0,1,0.5],[0,0,-1,0.5],
    ...stonePlanes(variant).map(p => [p.x, p.y, p.z, p.bound])];
  const points = [];
  for (let i = 0; i < planes.length; i++)
    for (let j = i + 1; j < planes.length; j++)
      for (let k = j + 1; k < planes.length; k++) {
        const [a, b, c] = [planes[i], planes[j], planes[k]];
        const m = new THREE.Matrix3().set(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
        if (Math.abs(m.determinant()) < 1e-6) continue;
        const v = new THREE.Vector3(a[3], b[3], c[3]).applyMatrix3(m.invert());
        if (planes.every(p => p[0] * v.x + p[1] * v.y + p[2] * v.z <= p[3] + 1e-6)) points.push(v);
      }
  return new ConvexGeometry(points);
}

export function createView3d(canvas) {
  const renderer = new THREE.WebGLRenderer({canvas, antialias: false, powerPreference: 'high-performance'});
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  // A 2D layer over the WebGL canvas for dust, the laser and the cockpit drill.
  const overlay = document.createElement('canvas');
  overlay.className = 'scene-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  canvas.after(overlay);
  const ctx = overlay.getContext('2d');

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(theme.void);
  scene.fog = new THREE.Fog(theme.void, 6, reach + 4);
  const camera = new THREE.PerspectiveCamera(70, 1, 0.05, 60);
  scene.add(camera, new THREE.AmbientLight(0xb8c4d0, 0.02));

  // Work lamps: two wide floods and the core beam, which casts shadows.
  const lamp = (angle, penumbra, shadow) => {
    const l = new THREE.SpotLight(theme.lamp, 0, reach + 6, angle, penumbra, 1.4);
    l.castShadow = shadow;
    if (shadow) {
      l.shadow.mapSize.set(512, 512);
      l.shadow.bias = -0.0015;
      l.shadow.camera.near = 0.2;
    }
    scene.add(l, l.target);
    return l;
  };
  const lamps = [lamp(0.75, 0.9, false), lamp(0.7, 0.9, false), lamp(0.32, 0.55, true)];
  const heatLight = new THREE.PointLight(theme.heat, 0, 4, 1.6);
  scene.add(heatLight);

  // Terrain: one instanced mesh per stone variant, only cells that face open air.
  const stoneMaterial = new THREE.MeshStandardMaterial({roughness: 0.93, metalness: 0.02, flatShading: true});
  const stones = Array.from({length: stoneCount}, (_, v) => {
    const mesh = new THREE.InstancedMesh(stoneGeometry(v), stoneMaterial, 256);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.castShadow = mesh.receiveShadow = true;
    mesh.count = 0;
    mesh.frustumCulled = false;
    scene.add(mesh);
    return mesh;
  });
  const matrix = new THREE.Matrix4(), color = new THREE.Color();
  let built = {version: -1, cell: '', at: -Infinity, world: null, minerals: null};
  function shade(x, y, z) {
    let h = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(z, 1274126177);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }
  function rebuild(world, around, minerals) {
    const counts = new Array(stoneCount).fill(0);
    const [cx, cy, cz] = around.map(Math.floor);
    const open = (x, y, z) => !world.solid(x, y, z);
    for (let x = cx - reach; x <= cx + reach; x++)
      for (let y = cy - reach; y <= cy + reach; y++)
        for (let z = cz - reach; z <= cz + reach; z++) {
          if ((x - cx) ** 2 + (y - cy) ** 2 + (z - cz) ** 2 > reach * reach || open(x, y, z)) continue;
          if (!open(x + 1, y, z) && !open(x - 1, y, z) && !open(x, y + 1, z) && !open(x, y - 1, z) && !open(x, y, z + 1) && !open(x, y, z - 1)) continue;
          const v = stoneVariant(x, y, z), mesh = stones[v];
          if (counts[v] >= mesh.instanceMatrix.count) continue;
          matrix.makeTranslation(x + 0.5, y + 0.5, z + 0.5);
          mesh.setMatrixAt(counts[v], matrix);
          // Exposed faces show the block's base mineral once a drill is mounted.
          const found = minerals ? world.mineralAt(x, y, z) : null;
          const tint = found ? mineralTint(found.base) : [1, 1, 1];
          const g = 0.82 + 0.36 * shade(x, y, z);
          color.setRGB(theme.stone[0] * g * 1.12 * tint[0], theme.stone[1] * g * 1.01 * tint[1], theme.stone[2] * g * 0.86 * tint[2]);
          mesh.setColorAt(counts[v], color);
          counts[v]++;
        }
    stones.forEach((mesh, v) => {
      mesh.count = counts[v];
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    });
  }

  // Portals: a shader surface on the opening and a coloured glow.
  const portalMaterial = new THREE.ShaderMaterial({
    uniforms: {time: {value: 0}, era: {value: 0}},
    side: THREE.DoubleSide,
    vertexShader: 'varying vec2 vUv; void main() { vUv = uv * 2.0 - 1.0; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `uniform float time; uniform float era; varying vec2 vUv;
      void main() {
        vec2 e = vUv * 1.64;
        float dist = pow(max(abs(e.x), abs(e.y)), 2.0);
        float ridge = sin(e.x * (4.0 + era) + era) * 0.25 + 0.1 * sin(e.x * 9.0 + time * 0.6);
        float rim = exp(-8.0 * abs(dist - 2.48)) * 85.0;
        float value = (e.y > ridge ? 30.0 + e.y * 13.0 : 15.0 + 10.0 * sin(e.y * 15.0 + e.x * 3.0 + time)) + rim;
        vec3 tint = era < 0.5 ? vec3(0.75, 1.29, 1.36) : era < 1.5 ? vec3(1.42, 1.03, 0.73) : vec3(0.81, 1.1, 1.53);
        gl_FragColor = vec4(value * tint / 255.0, 1.0);
      }`,
  });
  const portalMeshes = new Map();
  const portalGlow = [new THREE.PointLight(0x9adfd0, 0, 10, 1.5), new THREE.PointLight(0x9adfd0, 0, 10, 1.5)];
  scene.add(...portalGlow);
  function showPortals(world, center) {
    const list = world.portals();
    const live = new Set(list);
    for (const [portal, mesh] of portalMeshes) if (!live.has(portal)) { scene.remove(mesh); portalMeshes.delete(portal); }
    for (const portal of list) {
      if (portalMeshes.has(portal)) continue;
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(portal.radius * 2, portal.radius * 2), portalMaterial);
      mesh.position.set(...portal.point);
      if (portal.axis === 0) mesh.rotation.y = Math.PI / 2;
      if (portal.axis === 1) mesh.rotation.x = Math.PI / 2;
      scene.add(mesh);
      portalMeshes.set(portal, mesh);
    }
    const near = list.map(p => [p, Math.hypot(...p.point.map((v, i) => v - center[i]))]).sort((a, b) => a[1] - b[1]);
    portalGlow.forEach((light, i) => {
      const p = near[i];
      light.intensity = p && p[1] < 12 ? 2.4 * Math.min(1, p[0].radius) : 0;
      if (p) light.position.set(...p[0].point);
    });
  }

  // The machine and its drills (outside view), and small moving things.
  const hull = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 20), new THREE.MeshPhysicalMaterial({
    color: theme.hull, metalness: 0.55, roughness: 0.22, transparent: true, opacity: 0.32, depthWrite: false, clearcoat: 1}));
  const rim = new THREE.Mesh(new THREE.TorusGeometry(1, 0.018, 6, 64), new THREE.MeshStandardMaterial({color: 0xc7d0ca, metalness: 0.8, roughness: 0.3}));
  const drillGeometry = new THREE.ConeGeometry(0.24, 0.55, 7).rotateX(Math.PI / 2).translate(0, 0, 0.275);
  const drillMaterial = new THREE.MeshStandardMaterial({color: theme.drill, metalness: 0.9, roughness: 0.32});
  const brokenMaterial = new THREE.MeshStandardMaterial({color: 0x4a3b33, metalness: 0.5, roughness: 0.7});
  const drills = [];
  scene.add(hull, rim);
  const pool = (geometry, material, size) => {
    const mesh = new THREE.InstancedMesh(geometry, material, size);
    mesh.count = 0;
    mesh.frustumCulled = false;
    mesh.castShadow = true;
    scene.add(mesh);
    return mesh;
  };
  const debris = pool(new THREE.IcosahedronGeometry(0.2, 0), new THREE.MeshStandardMaterial({color: theme.debris, roughness: 0.9, flatShading: true}), 96);
  const crates = pool(new THREE.BoxGeometry(0.5, 0.3, 0.32), new THREE.MeshStandardMaterial({roughness: 0.7}), 64);
  const rings = pool(new THREE.TorusGeometry(0.22, 0.04, 6, 18), new THREE.MeshStandardMaterial({color: theme.items[0], metalness: 0.6, roughness: 0.3}), 64);
  const pieces = pool(new THREE.BoxGeometry(0.12, 0.12, 0.12), new THREE.MeshStandardMaterial({roughness: 0.6, emissive: 0x221a10}), 256);
  const drones = pool(new THREE.OctahedronGeometry(0.12, 0), new THREE.MeshStandardMaterial({color: theme.drone, metalness: 0.7, roughness: 0.3, emissive: theme.signal, emissiveIntensity: 0}), 8);
  const hazard = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 10), new THREE.MeshStandardMaterial({emissiveIntensity: 1.6}));
  const contactGlow = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 8), new THREE.MeshBasicMaterial({color: 0xffb46a, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false}));
  scene.add(hazard, contactGlow);
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(64 * 3), 3));
  // Round, small motes that only show where the lamps reach.
  const moteSprite = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 16;
    const g = c.getContext('2d'), grad = g.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 16, 16);
    return new THREE.CanvasTexture(c);
  })();
  const dust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({color: theme.dust, size: 0.03, map: moteSprite,
    transparent: true, opacity: 0.45, depthWrite: false, blending: THREE.AdditiveBlending}));
  dust.frustumCulled = false;
  scene.add(dust);
  const updateDust = createDust();
  const q = new THREE.Quaternion(), e = new THREE.Euler(), v3 = new THREE.Vector3(), scale = new THREE.Vector3();

  let lastTime = 0, w = 0, h = 0;
  function resize() {
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    if (!cw || !ch) return;
    // Rendered at a modest internal resolution: sharp enough, cheap on phones.
    const ratio = Math.min(window.devicePixelRatio || 1, 2) * 0.55;
    renderer.setPixelRatio(ratio);
    renderer.setSize(cw, ch, false);
    w = overlay.width = Math.round(cw * ratio);
    h = overlay.height = Math.round(ch * ratio);
    camera.aspect = cw / ch;
  }
  resize();
  new ResizeObserver(resize).observe(canvas);

  return function render(s, now) {
    const {world, pos: center, yaw, pitch, light, working, chains = [], drones: flying = [], contact, minerals, focus, body} = s;
    const d = forward(yaw, pitch), right = [Math.cos(yaw), 0, -Math.sin(yaw)];
    const up = [-Math.sin(yaw) * Math.sin(pitch), Math.cos(pitch), -Math.cos(yaw) * Math.sin(pitch)];
    // The same third-person camera as the 2D view: straight behind, pulled in front of rock.
    let pos = center, outside = false;
    if (body && body.distance > 0) {
      const wall = world.trace(center, ...d.map(n => -n), body.distance + 0.2);
      const back = Math.max(0, Math.min(body.distance, wall ? wall.t - 0.2 : body.distance));
      outside = back > body.radius * 1.15;
      if (outside) pos = center.map((n, i) => n - d[i] * back);
    }
    const f = Math.min(w, h) * 0.82;
    camera.fov = 2 * Math.atan(h / 2 / f) * 180 / Math.PI;
    camera.updateProjectionMatrix();
    camera.position.set(...pos);
    camera.up.set(...up);
    camera.lookAt(pos[0] + d[0], pos[1] + d[1], pos[2] + d[2]);

    // Terrain, rebuilt when cells open, the camera crosses a cell, or the world changes.
    const cell = pos.map(Math.floor).join();
    if ((built.world !== world || built.version !== world.version || built.cell !== cell || built.minerals !== minerals) && now - built.at >= rebuildGap) {
      rebuild(world, pos, minerals);
      built = {version: world.version, cell, at: now, world, minerals};
    }

    // Lamps ride on the machine and follow the view; the core narrows with a focusing lamp.
    const aim = [[-0.22, 0.06], [0.24, -0.1], [0, 0]];
    lamps.forEach((l, k) => {
      l.position.set(center[0] + up[0] * 0.3, center[1] + up[1] * 0.3, center[2] + up[2] * 0.3);
      const [u, vv] = aim[k];
      l.target.position.set(...center.map((n, i) => n + (d[i] + right[i] * u + up[i] * vv) * 4));
      l.intensity = light[k] * (k === 2 ? (focus ? 70 : 40) : 16);
    });
    lamps[2].angle = focus ? 0.22 : 0.32;
    lamps[2].distance = focus ? reach + 12 : reach + 6;

    showPortals(world, center);
    portalMaterial.uniforms.time.value = now;
    portalMaterial.uniforms.era.value = Math.floor(now / 3) % 3;

    // Contact heat glows and lights the cut.
    heatLight.intensity = contact ? 4 * contact.heat : 0;
    contactGlow.visible = !!contact;
    if (contact) {
      heatLight.position.set(...contact.point);
      contactGlow.position.set(...contact.point);
      contactGlow.scale.setScalar(0.07 + 0.27 * contact.heat);
      contactGlow.material.opacity = 0.35 + 0.65 * contact.heat;
    }

    // Machine and drills from outside; drills orbit off the centre and spin while cutting.
    hull.visible = rim.visible = outside;
    if (outside) {
      hull.position.set(...center);
      hull.scale.setScalar(body.radius);
      rim.position.set(...center);
      rim.scale.setScalar(body.radius);
      rim.lookAt(center[0] + d[0], center[1] + d[1], center[2] + d[2]);
    }
    while (drills.length < (body?.drills ?? 0)) {
      const m = new THREE.Mesh(drillGeometry, drillMaterial);
      m.castShadow = true;
      scene.add(m);
      drills.push(m);
    }
    drills.forEach((m, k) => {
      m.visible = outside && k < body.drills;
      if (!m.visible) return;
      const angle = (k / body.drills) * Math.PI * 2 + 0.6 + now * (working ? 1.2 : 0.25);
      const ring = body.radius * 0.62;
      const base = center.map((n, i) => n + d[i] * body.radius * 0.75 + (right[i] * Math.cos(angle) + up[i] * Math.sin(angle)) * ring);
      m.position.set(...base);
      m.lookAt(base[0] + d[0], base[1] + d[1], base[2] + d[2]);
      m.rotateZ(working ? now * 19 : 0);
      m.scale.setScalar(body.size);
      m.material = s.mounted ? drillMaterial : brokenMaterial;
    });

    // Hazard, debris, warehouse goods, flung pieces and drones.
    const hz = world.hazard;
    hazard.visible = !!(hz?.kind && !hz.spent);
    if (hazard.visible) {
      hazard.position.set(...hz.point);
      hazard.scale.set(1, hz.kind === 'lava' ? 0.45 : 0.85, 1);
      hazard.material.color.set(hz.kind === 'lava' ? theme.lava : theme.unstable);
      hazard.material.emissive.set(hz.kind === 'lava' ? theme.lava : theme.unstable);
    }
    let n = 0;
    for (const part of world.fragments()) {
      if (n >= 96) break;
      e.set(part.mass, part.mass * 1.7, 0);
      matrix.compose(v3.set(...part.point), q.setFromEuler(e), scale.setScalar(0.6 + part.mass * 0.25));
      debris.setMatrixAt(n++, matrix);
    }
    debris.count = n;
    debris.instanceMatrix.needsUpdate = true;
    let nc = 0, nr = 0;
    for (const {chunk, item} of world.warehouseItems()) {
      const type = identify(item, chunk);
      e.set(0, now * 0.35 + item.id, 0);
      matrix.compose(v3.set(...item.point), q.setFromEuler(e), scale.setScalar(1));
      if (type === 0 && nr < 64) rings.setMatrixAt(nr++, matrix);
      else if (nc < 64) {
        crates.setMatrixAt(nc, matrix);
        crates.setColorAt(nc++, color.set(theme.items[type]));
      }
    }
    crates.count = nc;
    rings.count = nr;
    crates.instanceMatrix.needsUpdate = rings.instanceMatrix.needsUpdate = true;
    if (crates.instanceColor) crates.instanceColor.needsUpdate = true;
    let np = 0;
    for (const {item} of world.ejected()) {
      if (np >= 256) break;
      const tint = item.mineral ? mineralTint(item.mineral) : [1.2, 1.1, 1.4];
      matrix.compose(v3.set(...item.point), q.identity(), scale.setScalar(1));
      pieces.setMatrixAt(np, matrix);
      pieces.setColorAt(np++, color.setRGB(0.55 * tint[0], 0.55 * tint[1], 0.55 * tint[2]));
    }
    pieces.count = np;
    pieces.instanceMatrix.needsUpdate = true;
    if (pieces.instanceColor) pieces.instanceColor.needsUpdate = true;
    drones.count = Math.min(8, flying.length);
    flying.slice(0, 8).forEach((dr, k) => {
      e.set(0, now * 3, 0);
      matrix.compose(v3.set(...dr.point), q.setFromEuler(e), scale.setScalar(1));
      drones.setMatrixAt(k, matrix);
    });
    drones.material.emissiveIntensity = flying.some(dr => dr.blink) ? 1.2 : 0.1;
    drones.instanceMatrix.needsUpdate = true;

    // Dust drifts in the lamps.
    const motes = updateDust(world, center, Math.min(0.1, now - lastTime));
    lastTime = now;
    const attr = dustGeometry.attributes.position;
    motes.forEach((m, k) => attr.setXYZ(k, ...(m.life > 0 && m.p ? m.p : [0, -9999, 0])));
    attr.needsUpdate = true;
    dust.material.opacity = 0.45 * light[0];

    renderer.render(scene, camera);
    drawOverlay(s, now, pos, outside, d, chains);
  };

  // The 2D layer: laser and sparks, fracture grit, chains and the cockpit drill.
  function project(point) {
    v3.set(...point).project(camera);
    if (v3.z > 1 || v3.z < -1) return null;
    return [(v3.x + 1) / 2 * w, (1 - v3.y) / 2 * h];
  }
  function line(x, y, a, b, colour, width = 1) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(a, b);
    ctx.strokeStyle = colour;
    ctx.lineWidth = width;
    ctx.stroke();
  }
  function drawOverlay(s, now, pos, outside, d, chains) {
    const {contact, light, working, anchors} = s;
    ctx.clearRect(0, 0, w, h);
    const f = Math.min(w, h) * 0.82;
    if (contact && light[0] > 0) {
      const at = project(contact.point);
      if (at) {
        const [x, y] = at, heat = contact.heat;
        const distance = Math.hypot(...contact.point.map((v, i) => v - pos[i]));
        const size = f * (0.045 + 0.14 * heat) / Math.max(0.25, distance);
        if (!outside) {
          line(w * 0.71, h, x, y, 'rgba(253,106,52,0.28)', 3);
          line(w * 0.71, h, x, y, '#ffce87', 0.85);
        }
        for (let i = 0; i < 6; i++) {
          const life = (now * 2.8 + i / 6) % 1, angle = i * 2.4;
          const sx = x + Math.cos(angle) * life * size * 1.8, sy = y + Math.sin(angle) * life * size * 1.8;
          line(sx, sy, sx + Math.cos(angle) * size * 0.15, sy + Math.sin(angle) * size * 0.15, 'rgba(255,211,139,' + ((1 - life) * heat) + ')');
        }
      }
    }
    if (s.fracture && s.age - s.fracture.at < 0.5) {
      const life = (s.age - s.fracture.at) * 2;
      for (let i = 0; i < 12; i++) {
        const at = project(s.fracture.point.map((v, j) => v + Math.sin(i * 2.4 + j * 7.1) * life * 0.32));
        if (!at) continue;
        ctx.fillStyle = 'rgba(166,139,104,' + (1 - life) + ')';
        ctx.fillRect(...at, i % 3 + 1, i % 2 + 1);
      }
    }
    for (const c of chains) {
      if (c.reach <= 0) continue;
      const tip = project(c.from.map((v, i) => v + (c.to[i] - v) * c.reach));
      const start = outside ? project(c.from) : [w * (c.side > 0 ? 0.82 : 0.18), h];
      if (!tip || !start) continue;
      ctx.setLineDash([2, 1]);
      line(...start, ...tip, '#a9aa9c', 1.6);
      ctx.setLineDash([]);
      ctx.fillStyle = c.reach >= 1 ? '#d4d1bb' : '#7d7d72';
      ctx.beginPath();
      ctx.arc(...tip, c.reach >= 1 ? 2.2 : 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
    // From the cockpit the drill sits low on the screen, as before.
    if (s.mounted && !outside) {
      const cx = w * 0.54, cy = h * 0.98, length = Math.min(w, h) * 0.25;
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
        line(cx - length, cy - length + (j * length) / 7 + spin, cx + length, cy - length + ((j + 3) * length) / 7 + spin, '#83857a', 2);
      ctx.restore();
    }
  }
}
