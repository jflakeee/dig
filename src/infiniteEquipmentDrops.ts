import {DRILLS,type DrillTier,type Mineral} from './infiniteDrillEconomy.ts';

export const DROP_KINDS=['drill','lamp','warehouse','wagon','engine','drill-mount','drill-range','mineral-pile','ic-chip'] as const;
export type DropKind=typeof DROP_KINDS[number];
export type EquipmentDrop={kind:Exclude<DropKind,'mineral-pile'>;tier:number;durability:number;maxDurability:number};
export type MineralPileDrop={kind:'mineral-pile';mineral:Mineral;amount:number};
export type MiningDrop=EquipmentDrop|MineralPileDrop;
export const DROP_CHANCE=0.012;
export function rollEquipmentDrop(roll:number,kindRoll:number,wearRoll:number):MiningDrop|null{
  if(![roll,kindRoll,wearRoll].every(n=>Number.isFinite(n)&&n>=0&&n<1))return null;
  if(roll>=DROP_CHANCE)return null;
  const kind=DROP_KINDS[Math.floor(kindRoll*DROP_KINDS.length)];
  if(kind==='mineral-pile'){
    const minerals=['stone','copper','iron','crystal'] as const;
    return {kind,mineral:minerals[Math.floor(wearRoll*minerals.length)],amount:3+Math.floor(((kindRoll*997)%1)*8)};
  }
  const tier=kind==='drill'?Math.floor(wearRoll*DRILLS.length):0;
  const maxDurability=kind==='drill'?DRILLS[tier as DrillTier].durability:100;
  // Found equipment is used: 10–90% durability remaining.
  const durability=Math.max(1,Math.floor(maxDurability*(.1+.8*((kindRoll*997)%1))));
  return {kind,tier,durability,maxDurability};
}
export const DISCOVERY_STORY='How was this equipment made down here? ... Strange. The thought fades almost immediately.';

/** IC chips cannot be equipped or crafted; dismantling yields only minerals. */
export const IC_CHIP_SALVAGE={copper:3,iron:2} as const;
