// Activity energy (docs/dig-4d-activity-energy-recovery-detail-20261125.md).
// A capped buffer for active work: heating, analysis, research, decomposing,
// building a portal. Driving, lights, sensors, the drill's advance and the
// emergency laser never draw on it, so an empty buffer never strands the
// machine. Breaking rock recovers it: drilling breaks blocks to dust
// (+0.5 a block), the laser breaks a block down whole (+2). Trial values.
export const energyCap = 100;
export const energyCost = {'fire-ceramic': 10, research: 15, automate: 20, decompose: 5, 'build-portal': 50};
export const energyGain = {drill: 0.5, laser: 2};
// Gains past the cap are lost; the stored value stays a multiple of 0.5.
export const addEnergy = (s, n) => { s.energy = Math.min(energyCap, Math.round(((s.energy ?? energyCap) + n) * 2) / 2); };
export const validEnergy = e => Number.isFinite(e) && e >= 0 && e <= energyCap && Number.isInteger(e * 2);
