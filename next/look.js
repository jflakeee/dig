// Free look: turning never stops at a limit. Pitch wraps through straight up
// and down, so the view can keep turning the same way and roll over the top.
// Once past vertical the view is upside down, so a sideways drag turns yaw
// the other way and still moves the picture the way the finger went.
const tau = Math.PI * 2;
export const wrap = a => a - tau * Math.floor((a + Math.PI) / tau);
export function turn(yaw, pitch, dx, dy) {
  const upright = Math.cos(pitch) >= 0 ? 1 : -1;
  return [wrap(yaw + dx * upright), wrap(pitch + dy)];
}
// The same heading seen right way up: past vertical, turn half round and
// mirror the pitch, which keeps the forward vector and drops the roll.
export function upright(yaw, pitch) {
  return Math.cos(pitch) >= 0 ? [wrap(yaw), wrap(pitch)] : [wrap(yaw + Math.PI), wrap(Math.PI - pitch)];
}
// Holding a drag in the screen's edge band keeps turning: the deeper into the
// band, the faster, as a -1..1 rate on each axis. The band is a share of the
// shorter side so phones and desktops feel alike.
export const edge = {band: 0.1, speed: 1.8};
export function edgeRate(x, y, width, height, band = edge.band) {
  const size = Math.min(width, height) * band;
  if (!(size > 0)) return [0, 0];
  const axis = (v, max) => v < size ? -(1 - v / size) : v > max - size ? 1 - (max - v) / size : 0;
  const clamp = v => Math.max(-1, Math.min(1, v));
  return [clamp(axis(x, width)), clamp(axis(y, height))];
}
// Arrow keys turn continuously while held, at the edge speed.
export const turnKeys = {ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1]};
