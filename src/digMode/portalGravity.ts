export type PortalEnd = 'inlet' | 'outlet';
export type Direction3 = readonly [number, number, number];

export const ZERO_GRAVITY: Direction3 = [0, 0, 0];

/**
 * normalIntoPassage points from the surrounding chunk into the passage.
 * Inlet gravity follows that direction; outlet gravity points away from it.
 * This resolves direction only; the spatial falloff/range is still a design decision.
 */
export function portalGravityDirection(
  end: PortalEnd,
  normalIntoPassage: Direction3,
): Direction3 {
  if (!normalIntoPassage.every(Number.isFinite)) {
    throw new Error('Portal direction must be finite');
  }
  const length = Math.hypot(...normalIntoPassage);
  if (length === 0) throw new Error('Portal direction cannot be zero');
  const sign = end === 'inlet' ? 1 : -1;
  return [
    sign * normalIntoPassage[0] / length,
    sign * normalIntoPassage[1] / length,
    sign * normalIntoPassage[2] / length,
  ];
}

/** A chunk without a discovered 4D passage has no gravity direction. */
export function gravityWithoutPassage(): Direction3 {
  return ZERO_GRAVITY;
}
