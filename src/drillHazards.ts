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
  if (!['explosive','acid'].includes(kind) || !['front','rear'].includes(side) || !Number.isFinite(now)) throw Error('Invalid hazard');
  return { kind, side, detectedAt: now, deadline: now + HAZARD_REACTION_MS, phase: 'warning' };
}
export function advanceDrillHazard(hazard: DrillHazard, now: number, drilling: boolean): DrillHazard {
  if (!Number.isFinite(now) || now < hazard.detectedAt) throw Error('Invalid hazard time');
  if (hazard.phase === 'failed') return hazard;
  if (hazard.phase === 'clearing') return hazard.clearedAt !== undefined && now >= hazard.clearedAt ? { ...hazard, clearedAt: now } : hazard;
  if (now > hazard.deadline) return { ...hazard, phase: 'failed' };
  if (!drilling) return { ...hazard, phase: 'clearing', clearedAt: now + HAZARD_CLEAR_MS };
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
  return { kind: roll < .003 ? 'explosive' : 'acid', side: roll % .002 < .001 ? 'front' : 'rear' };
}
