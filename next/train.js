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
// Wagons whose rear end lies more than 16 m behind the machine's front.
export function wagonsBeyondSafe(s) {
  return (s?.wagons ?? []).filter((_, i) => machineLength + wagonLength * (i + 1) > safeLength);
}
