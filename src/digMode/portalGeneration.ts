export type PortalSize = 'small' | 'large';

export const SMALL_PASSAGE_CHANCE = 0.1;
export const LARGE_PASSAGE_CHANCE = 0.03;

export type PassagePresence = Readonly<{
  small: boolean;
  large: boolean;
}>;

/** Roll each passage size independently when a new chunk is generated. */
export function rollPassagePresence(random: () => number = Math.random): PassagePresence {
  const smallSample = randomSample(random);
  const largeSample = randomSample(random);
  return {
    small: smallSample < SMALL_PASSAGE_CHANCE,
    large: largeSample < LARGE_PASSAGE_CHANCE,
  };
}

function randomSample(random: () => number): number {
  const sample = random();
  if (!Number.isFinite(sample) || sample < 0 || sample >= 1) {
    throw new Error('Random source must return a number in [0, 1)');
  }
  return sample;
}
