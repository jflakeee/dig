export const terrainKinds = ['rock', 'cave', 'empty', 'warehouse'];
export const cargoNames = ['측량 렌즈', '금속 용기', '미확인 결정'];
const side = 32;

export function naturalSolid(c, x, y, z) {
  if (!c.kind || c.kind === 'rock') return true;
  if (c.kind !== 'cave') return false;
  const a = ((x + 15) & 31) - 15, b = ((y + 15) & 31) - 15, d = ((z + 15) & 31) - 15;
  const r = 3 + c.seed % 4;
  return Math.min(a*a+b*b, b*b+d*d, a*a+d*d) > r*r;
}

export function makeChunk(x, y, z, kind, seed) {
  const chunk = {x,y,z,kind,seed,air:new Set(),remaining:Array(6).fill(1024),faces:[]};
  if (kind === 'rock') return chunk;
  if (kind === 'cave') {
    for (let a = -15; a <= 16; a++)
      for (let b = -15; b <= 16; b++)
        if (!naturalSolid(chunk, a, b, -15))
          for (let i = 0; i < 6; i++) chunk.remaining[i]--;
    return chunk;
  }
  chunk.remaining.fill(0);
  if (kind === 'warehouse') {
    let state = seed;
    const coord = n => {
      state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
      return n * side - 12 + 26 * (state / 4294967296);
    };
    chunk.items = Array.from({length: 9}, (_,id) => ({
      id, point: [coord(x), coord(y), coord(z)], type: null,
    }));
  }
  return chunk;
}

export function identify(item, chunk) {
  if (item.type == null) item.type = ((chunk.seed >>> (item.id * 3)) + item.id) % cargoNames.length;
  return item.type;
}
