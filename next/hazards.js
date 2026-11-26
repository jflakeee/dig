// Positions and radii use the same half-metre cells as the hull.
export function arrivalHazard(random) {
  if (random() >= 0.3) return null;
  return {point:[-1.5+Math.floor(random()*5),0.5,3.5+Math.floor(random()*4)],
    kind:null, seed:random(), fuse:null, spent:false};
}

export function senseHazard(h, pos, dt, trace, shock = false) {
  const result = {visible:false, damage:0, blast:false};
  if (!h || h.spent) return result;
  const ray = h.point.map((v,i) => v-pos[i]);
  const distance = Math.hypot(...ray);
  if (distance <= 7) {
    const hit = trace(pos,...ray,1);
    result.visible = !hit || [hit.x,hit.y,hit.z].every((v,i) => v===Math.floor(h.point[i]));
  }
  if (result.visible) {
    h.kind ??= h.seed < 0.5 ? 'volatile' : 'lava';
    if (h.kind === 'lava' && distance <= 1.7) result.damage = 42*dt;
    if (h.kind === 'volatile' && distance <= 2.5 && h.fuse === null) h.fuse = 3;
  }
  if (h.fuse !== null) {
    h.fuse = Math.max(0,h.fuse-dt);
    if (!h.fuse || (shock && result.visible && distance <= 1.7)) {
      h.spent = true;
      result.blast = true;
      result.damage = result.visible ? Math.max(0,150*(1-distance/5)) : 0;
    }
  }
  return result;
}

// One unit of each stocked type occupies an outer rack. Bulk stock is inside.
export function cargoLoss(cause, origin, pos, yaw, pitch) {
  const rear = [-Math.sin(yaw)*Math.cos(pitch),-Math.sin(pitch),-Math.cos(yaw)*Math.cos(pitch)];
  const right = [Math.cos(yaw),0,-Math.sin(yaw)];
  const reach = {impact:0.85,blast:3.2,lava:1.45}[cause];
  return [0,1,2].map(i => {
    const vulnerable = cause === 'lava' ? i !== 2 : i === 0;
    const rack = pos.map((v,j) => v+0.7*rear[j]+(i-1)*0.42*right[j]);
    return Number(vulnerable && Math.hypot(...rack.map((v,j) => v-origin[j])) <= reach);
  });
}
