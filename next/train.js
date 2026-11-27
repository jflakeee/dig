import { working } from './equipment.js';
// Cargo train (docs/dig-4d-train-cargo-chunk-transition-detail-20261125.md).
// Mined minerals are the cargo; specimens, finds and elements ride in the
// drone hold and storage and do not count. All numbers are trial values.
export const machineLength = 2;      // metres
export const wagonLength = 3;
export const safeLength = 16;        // one chunk side
export const baseCapacity = 120;     // mineral pieces the machine carries
export const wagonCapacity = 80;
export const wagonCost = {iron: 3, rock: 10};
export const wagonClearance = 1.2;   // smallest portal radius a wagon passes
export const trainLength = s => machineLength + wagonLength * (s?.wagons?.length ?? 0);
export const capacity = s => baseCapacity + wagonCapacity * (s?.wagons?.length ?? 0);
export const load = s => (s?.rocks ?? 0) + Object.values(s?.minerals ?? {}).reduce((n, k) => n + k, 0);
export const canCouple = s => !!working(s, 'coupler');
// Driving speed falls with how full the hold is and how many wagons are towed.
export function speedFactor(s) {
  const fill = Math.min(1, load(s) / capacity(s));
  return Math.max(0.6, 1 - 0.25 * fill - 0.03 * (s?.wagons?.length ?? 0));
}
// How full each car is, front first: the machine's hold, then each wagon in order.
export function carFill(s) {
  let left = load(s);
  return [baseCapacity, ...(s?.wagons ?? []).map(() => wagonCapacity)].map(room => {
    const used = Math.min(room, left);
    left -= used;
    return used / room;
  });
}
// Wagons whose rear end lies more than 16 m behind the machine's front.
export function wagonsBeyondSafe(s) {
  return (s?.wagons ?? []).filter((_, i) => machineLength + wagonLength * (i + 1) > safeLength);
}
