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

export type PortalGravityField = Readonly<{
  center: readonly [number, number, number];
  end: PortalEnd;
  normalIntoPassage: Direction3;
  influenceRadiusMeters: number;
  accelerationMetersPerSecondSquared: number;
}>;

/**
 * Sum temporary passage fields around the machine. The field fades smoothly
 * to zero at its configured radius; a chunk with no fields stays zero-G.
 */
export function portalGravityAcceleration(
  position: readonly [number, number, number],
  fields: readonly PortalGravityField[],
): Direction3 {
  if (!position.every(Number.isFinite)) throw new Error('Position must be finite');
  let ax = 0;
  let ay = 0;
  let az = 0;

  for (const field of fields) {
    const [cx, cy, cz] = field.center;
    const radius = field.influenceRadiusMeters;
    const strength = field.accelerationMetersPerSecondSquared;
    if (![cx, cy, cz, radius, strength].every(Number.isFinite) || radius <= 0 || strength < 0) {
      throw new Error('Invalid portal gravity field');
    }

    const dx = position[0] - cx;
    const dy = position[1] - cy;
    const dz = position[2] - cz;
    const distance = Math.hypot(dx, dy, dz);
    if (distance >= radius) continue;

    const direction = portalGravityDirection(field.end, field.normalIntoPassage);
    const remaining = 1 - distance / radius;
    const magnitude = strength * remaining * remaining;
    ax += direction[0] * magnitude;
    ay += direction[1] * magnitude;
    az += direction[2] * magnitude;
  }
  return [ax, ay, az];
}
