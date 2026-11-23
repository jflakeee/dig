/** Deterministic drill hazards. Pure state transitions; caller owns visuals and damage. */
export type HazardKind = 'explosive' | 'acid';
export type HazardSide = 'front' | 'rear';
export type DrillHazard = Readonly<{
  kind: HazardKind; side: HazardSide; detectedAt: number; deadline: number;
  phase: 'warning' | 'clearing' | 'failed'; clearedAt?: number;
}>;
export const HAZARD_REACTION_MS = 5000;
export const HAZARD_CLEAR_MS = 1500;
export function discoverDrillHazard(kind: HazardKind, side: HazardSide, now: number): DrillHazard {
  if (!['explosive','acid'].includes(kind) || (kind === 'explosive' && side !== 'front') || (kind === 'acid' && side !== 'rear') || !Number.isFinite(now)) throw Error('Invalid hazard');
  return { kind, side, detectedAt: now, deadline: now + HAZARD_REACTION_MS, phase: 'warning' };
}
export function advanceDrillHazard(hazard: DrillHazard, now: number, drilling: boolean): DrillHazard {
  if (!Number.isFinite(now) || now < hazard.detectedAt) throw Error('Invalid hazard time');
  if (hazard.phase === 'failed') return hazard;
  if (hazard.phase === 'clearing') return hazard;
  if (now > hazard.deadline) return { ...hazard, phase: 'failed' };
  // Do not auto-clear in the same instant the hazard is discovered.
  if (!drilling && now > hazard.detectedAt) return { ...hazard, phase: 'clearing', clearedAt: now + HAZARD_CLEAR_MS };
  return hazard;
}
/** The UI can remove a clearing hazard after this timestamp. */
export function hazardResolved(hazard: DrillHazard, now: number): boolean {
  return hazard.phase === 'clearing' && hazard.clearedAt !== undefined && now >= hazard.clearedAt;
}
/** Caller supplies a deterministic [0,1) random roll, avoiding global RNG/save changes. */
export function rollDrillHazard(roll: number): { kind: HazardKind; side: HazardSide } | null {
  if (!Number.isFinite(roll) || roll < 0 || roll >= 1) throw Error('Invalid hazard roll');
  if (roll >= .008) return null;
  return roll < .003 ? { kind: 'explosive', side: 'front' } : { kind: 'acid', side: 'rear' };
}

/** A missed stop: explosion may damage the drill; rear acid destroys exposed cargo.
 * Returns an effect description only; the game must apply it exactly once.
 */
export type HazardFailureEffect = Readonly<{
  drillDurabilityLoss: number;
  cargoLost: boolean;
}>;
export function hazardFailureEffect(hazard: DrillHazard, roll: number, drillDurability: number): HazardFailureEffect {
  if (hazard.phase !== 'failed' || !Number.isFinite(roll) || roll < 0 || roll >= 1 ||
      !Number.isFinite(drillDurability) || drillDurability < 0) throw Error('Invalid hazard failure');
  if (hazard.kind === 'acid') return { drillDurabilityLoss: 0, cargoLost: true };
  // 65% chance of a hit; damage ranges from 15% to 45% of current durability.
  const loss = roll < .65 ? Math.min(drillDurability, Math.ceil(drillDurability * (.15 + .30 * roll / .65))) : 0;
  return { drillDurabilityLoss: loss, cargoLost: false };
}
