/** Stable deterministic seed from a world identifier, including non-numeric IDs. */
export function microGravityWorldSeed(worldId: string | number): number {
  if (typeof worldId !== 'string' && !(typeof worldId === 'number' && Number.isSafeInteger(worldId)))
    throw Error('Invalid world identifier');
  const value=String(worldId);
  if (!value.length) throw Error('Empty world identifier');
  let hash=2166136261;
  for (let i=0;i<value.length;i++) {
    hash=Math.imul(hash ^ value.charCodeAt(i),16777619);
  }
  return (hash ^ 20261122) >>> 0;
}
