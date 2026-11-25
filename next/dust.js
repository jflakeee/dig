import { entrance, exitMouth } from './world.js';

// Dust occupies the same empty voxels as the machine. A blocked component
// loses speed while the tangential components continue along the rock face.
export function createDust() {
  let currentWorld,
    motes = [];
  return (world, origin, dt) => {
    if (currentWorld !== world) {
      currentWorld = world;
      motes = [];
    }
    while (motes.length < 64) motes.push({ life: 0 });
    for (const mote of motes) {
      mote.life -= dt;
      if (mote.life <= 0) {
        const source =
          world.mouth && !world.tutorial && Math.random() < 0.4
            ? exitMouth
            : origin;
        mote.p = source.map(
          (v, i) =>
            v +
            (source === exitMouth && i === 2
              ? 0.1
              : (Math.random() - 0.5) * 1.8),
        );
        if (world.solid(...mote.p.map(Math.floor))) continue;
        mote.v = mote.p.map(
          (_, i) =>
            (Math.random() - 0.5) * 0.32 +
            (source === exitMouth && i === 2 ? 1.2 : 0),
        );
        mote.life = 1 + Math.random() * 3;
      }
      const gap = entrance.map((v, i) => v - mote.p[i]);
      const distance = Math.hypot(...gap);
      if (world.tutorial && distance < 0.28) {
        mote.life = 0;
        continue;
      }
      const accel =
        world.mouth && world.tutorial ? 12 / (1 + distance * distance) : 0;
      for (let i = 0; i < 3; i++) {
        mote.v[i] +=
          dt * ((accel * gap[i]) / Math.max(0.2, distance) - 0.12 * mote.v[i]);
        const next = mote.p.slice();
        next[i] += dt * mote.v[i];
        if (world.solid(...next.map(Math.floor))) mote.v[i] = 0;
        else mote.p = next;
      }
    }
    return motes;
  };
}
