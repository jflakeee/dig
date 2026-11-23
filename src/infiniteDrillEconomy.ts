/** Infinite-mode drill economy. No dependency on legacy inventory or saves. */
export type Mineral='stone'|'copper'|'iron'|'crystal';
export type Stock=Record<Mineral,number>;
export type DrillTier=0|1|2|3;
export type DrillState={tier:DrillTier;durability:number};
export const MINERALS:readonly Mineral[]=['stone','copper','iron','crystal'];
export const MINING_MS:Readonly<Record<Mineral,number>>={stone:350,copper:650,iron:1100,crystal:1800};
export const DRILLS=[
  {name:'Starter',durability:30,craftMs:1000,recipe:{stone:0,copper:0,iron:0,crystal:0}},
  {name:'Copper',durability:75,craftMs:3500,recipe:{stone:15,copper:8,iron:0,crystal:0}},
  {name:'Iron',durability:150,craftMs:8000,recipe:{stone:20,copper:12,iron:12,crystal:0}},
  {name:'Crystal',durability:300,craftMs:16000,recipe:{stone:25,copper:15,iron:20,crystal:8}},
] as const;
export const emptyStock=():Stock=>({stone:0,copper:0,iron:0,crystal:0});
export function mineralAt(seed:number,x:number,y:number,z:number):Mineral{
  // Roll on first exposure; the coordinate hash makes revisits deterministic.
  let h=(seed|0)^Math.imul(x,73856093)^Math.imul(y,19349663)^Math.imul(z,83492791);
  h=Math.imul(h^(h>>>16),0x7feb352d);
  h=Math.imul(h^(h>>>15),0x846ca68b);
  const roll=(h^(h>>>16))>>>0;
  if(roll%97===0)return 'crystal';
  if(roll%17===0)return 'iron';
  if(roll%7===0)return 'copper';
  return 'stone';
}
export function miningDuration(mineral:Mineral,tier:DrillTier):number{
  return Math.max(120,Math.ceil(MINING_MS[mineral]/(1+tier*.55)));
}
export function canCraft(stock:Stock,tier:DrillTier):boolean{
  return MINERALS.every(m=>stock[m]>=DRILLS[tier].recipe[m]);
}
export function craft(stock:Stock,tier:DrillTier):{stock:Stock;drill:DrillState}|null{
  if(!canCraft(stock,tier))return null;
  const next={...stock};
  for(const m of MINERALS)next[m]-=DRILLS[tier].recipe[m];
  return {stock:next,drill:{tier,durability:DRILLS[tier].durability}};
}
export function bestCraftable(stock:Stock,maxTier:DrillTier=3):DrillTier{
  for(let tier=maxTier;tier>=1;tier--)if(canCraft(stock,tier as DrillTier))return tier as DrillTier;
  return 0;
}
export function useDrill(drill:DrillState):DrillState{
  return {...drill,durability:Math.max(0,drill.durability-1)};
}
export function drillCountCost(count:number):Stock{
  if(!Number.isInteger(count)||count<2||count>4)throw Error('Drill count out of range');
  return {stone:count*12,copper:count*6,iron:(count-1)*4,crystal:0};
}
export function rangeCost(range:number):Stock{
  if(!Number.isInteger(range)||range<1||range>3)throw Error('Range out of bounds');
  return {stone:range*10,copper:range*5,iron:range*5,crystal:range===3?2:0};
}
