const directions = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
const step = 0.05;
function sample(cell, tick) {
  let h = Math.imul(cell+1, 0x85ebca6b) ^ Math.imul(tick+1, 0xc2b2ae35);
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

export function hitHull(part, pos, speed, anchored) {
  const gap = pos.map((v,i) => v-part.point[i]);
  const distance = Math.hypot(...gap);
  if (!distance || distance > 1.3) return [0,0,0];
  const normal = gap.map(v => v/distance);
  const approach = normal.reduce((sum,n,i) => sum+n*(part.speed[i]-speed[i]),0);
  if (approach <= 0) return [0,0,0];
  // `anchored` is true (48) or the anchored mass itself when a chain winder helps.
  const hullMass = anchored ? (anchored === true ? 48 : anchored) : 8;
  const impulse = 1.15*approach/(1/part.mass + 1/hullMass);
  part.speed = part.speed.map((v,i) => v-normal[i]*impulse/part.mass);
  return normal.map(n => n*impulse/hullMass);
}

export function contactDamage(body, pos, speed, field, dt, blocked) {
  const gap = pos.map((v,i) => v-body.point[i]);
  const distance = Math.hypot(...gap);
  if (distance < 0.0001 || distance > 1.3) return 0;
  const normal = gap.map(v => v/distance);
  const closing = normal.reduce((sum,n,i) => sum+n*(body.speed[i]-speed[i]),0);
  const impact = Math.max(0, closing-2.5)**2 * body.mass;
  const load = normal.reduce((sum,n,i) => sum+n*field[i],0) * body.mass;
  const pinned = load > 0 && blocked(pos.map((v,i) => v+0.16*normal[i]));
  return impact + (pinned ? load*dt : 0);
}

export function simulate(state, dt, pos, speed, anchored, solid, remove, field, onContact) {
  const push = [0,0,0];
  state.time += dt;
  while (state.time + 1e-9 >= step) {
    state.time = Math.max(0,state.time-step);
    const tick = ++state.tick;
    function loosen(cell, impact = 0) {
      if (cell.some(v => v < -15 || v > 16) || !solid(...cell)) return;
      const id = cell.reduce((n,v) => n*32+v+15,0);
      const point = cell.map(v => v+0.5);
      const pull = field(point);
      const open = directions.filter(d => !solid(...cell.map((v,i) => v+d[i])));
      const chance = Math.hypot(...pull)*(open.length ? 0.32*open.length : 0.001) + impact;
      if (sample(id,tick) >= chance || !remove(...cell)) return;
      const direction = open[Math.floor(sample(id,0)*open.length)] ?? [0,0,0];
      state.parts.push({point, speed:pull.map((v,i) => v*0.4+direction[i]*1.7), mass:1+3*sample(id,1)});
    }
    // This odd stride visits every cell in the exit chunk before repeating.
    const index = (tick*7919)&32767;
    loosen([index>>10,(index>>5)&31,index&31].map(n => n-15));
    if (tick%4 === 0) {
      const d = directions[Math.floor(tick/4)%6];
      loosen(pos.map((v,i) => Math.floor(v+1.5*d[i])));
    }
    const count = state.parts.length;
    for (let j=0; j<count; j++) {
      const part = state.parts[j], pull = field(part.point);
      for (let i=0; i<3; i++) {
        part.speed[i] = (part.speed[i]+pull[i]*step)*0.997;
        const next = part.point.slice();
        next[i] += part.speed[i]*step;
        if (solid(...next.map(Math.floor))) {
          const magnitude = Math.abs(part.speed[i]);
          if (magnitude > 1.6) loosen(next.map(Math.floor),Math.min(0.6,magnitude*part.mass*0.03));
          part.speed[i] *= -0.25;
        } else part.point = next;
      }
      const relativeTo = speed.map((v,i) => v+push[i]);
      onContact?.(part,relativeTo,pull,step);
      const hit = hitHull(part,pos,relativeTo,anchored);
      for (let i=0; i<3; i++) push[i] += hit[i];
    }
  }
  return push;
}
