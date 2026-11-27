// A roll is a pure function of the world seed and a key naming the chunk
// coordinate, its generation and the purpose, so results do not depend on the
// order in which chunks, faces or blocks are created or drawn.
export function roll(seed, key) {
  let h = 2166136261 ^ seed;
  for (let i = 0; i < key.length; i++) h = Math.imul(h ^ key.charCodeAt(i), 16777619);
  h = Math.imul(h ^ (h >>> 16), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
