// Standalone design-balance simulator; not wired into the game runtime.
// Run: node scripts/mining-balance.mjs --hours=1 --seeds=10
const upgrades = [
  { speed: 0, blocks: 1, bonus: .10 },
  { speed: .08, blocks: 1, bonus: .11 },
  { speed: .16, blocks: 1, bonus: .12 },
  { speed: .24, blocks: 2, bonus: .14 },
  { speed: .32, blocks: 2, bonus: .17 },
  { speed: .40, blocks: 3, bonus: .20 },
];
const ores = [
  { name: 'stone', weight: 65, price: 1, wear: 1 },
  { name: 'coal', weight: 18, price: 4, wear: 1 },
  { name: 'iron', weight: 10, price: 10, wear: 2 },
  { name: 'gold', weight: 5, price: 25, wear: 3 },
  { name: 'rare', weight: 2, price: 100, wear: 5 },
];
const equipment = [
  { name: 'basic', craft: 0, repair: 0 },
  { name: 'iron', craft: 300, repair: 100 },
  { name: 'gold', craft: 1500, repair: 400 },
  { name: 'rare', craft: 6000, repair: 1500 },
];
function random(seed) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}
function oreSample(rng) {
  let roll = rng() * 100;
  for (const ore of ores) {
    roll -= ore.weight;
    if (roll < 0) return ore;
  }
  return ores[ores.length - 1];
}
function performance(durability, maximum) {
  const pct = 100 * durability / maximum;
  return pct > 70 ? 1 : pct > 40 ? .9 : pct > 10 ? .7 : pct > 0 ? .5 : 0;
}
export function simulate({ tier = 0, upgrade = 0, hours = 1, seed = 1, baseMineSeconds = 1, autoRepair = true }) {
  if (!equipment[tier] || !upgrades[upgrade] || !(hours > 0) || !(baseMineSeconds > 0)) throw Error('Invalid simulation inputs');
  const rng = random(seed);
  const tool = equipment[tier], boost = upgrades[upgrade];
  let elapsed = 0, durability = 1000, maximum = 1000, repairs = 0, replacements = 0;
  let blocks = 0, grossGold = 0, repairGold = 0, craftGold = tool.craft, bonusDrops = 0;
  const counts = Object.fromEntries(ores.map(ore => [ore.name, 0]));
  const limit = hours * 3600;
  while (elapsed < limit) {
    const perf = performance(durability, maximum);
    if (!perf) {
      if (tier === 0) { durability = maximum = 1000; continue; }
      if (autoRepair && maximum > 500) {
        const damageRatio = 1;
        repairGold += Math.ceil(tool.repair * damageRatio * (1 + .25 * upgrade));
        maximum = Math.max(500, maximum - 10);
        durability = maximum;
        repairs++;
      } else {
        replacements++;
        craftGold += tool.craft;
        durability = maximum = 1000;
      }
      continue;
    }
    const seconds = 3 * baseMineSeconds * (1 - boost.speed) / perf;
    if (elapsed + seconds > limit) break;
    elapsed += seconds;
    const n = Math.max(1, Math.floor(1 + (boost.blocks - 1) * perf));
    for (let j = 0; j < n; j++) {
      const ore = oreSample(rng);
      counts[ore.name]++;
      grossGold += ore.price;
      blocks++;
      if (rng() < boost.bonus) bonusDrops++;
      durability = Math.max(0, durability - ore.wear);
      if (durability === 0) break;
    }
  }
  return { tier: tool.name, upgrade, hours, seed, blocks, counts, bonusDrops,
    grossGold, repairGold, craftGold, netGold: grossGold - repairGold - craftGold,
    repairs, replacements, remainingDurability: durability, maximumDurability: maximum };
}
function flag(name, fallback) {
  const match = process.argv.slice(2).find(a => a.startsWith('--' + name + '='));
  return match ? Number(match.slice(name.length + 3)) : fallback;
}
if (process.argv[1]?.endsWith('mining-balance.mjs')) {
  const hours = flag('hours', 1), seeds = flag('seeds', 10), baseMineSeconds = flag('base-seconds', 1);
  if (!Number.isInteger(seeds) || seeds < 1 || seeds > 1000) throw Error('seeds must be 1..1000');
  if (![1, 10, 100].includes(hours)) throw Error('hours must be 1, 10, or 100');
  const results = [];
  for (let tier = 0; tier < equipment.length; tier++)
    for (let upgrade = 0; upgrade < upgrades.length; upgrade++)
      for (let seed = 1; seed <= seeds; seed++)
        results.push(simulate({ tier, upgrade, hours, seed, baseMineSeconds }));
  console.log(JSON.stringify({ config: { hours, seeds, baseMineSeconds, scenarios: results.length }, results }));
}
