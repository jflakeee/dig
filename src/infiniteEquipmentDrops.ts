import {DRILLS,type DrillTier} from './infiniteDrillEconomy.ts';

export const DROP_KINDS=['drill','lamp','warehouse','wagon','engine','drill-mount','drill-range'] as const;
export type DropKind=typeof DROP_KINDS[number];
export type EquipmentDrop={kind:DropKind;tier:number;durability:number;maxDurability:number};
export const DROP_CHANCE=0.012;
export function rollEquipmentDrop(roll:number,kindRoll:number,wearRoll:number):EquipmentDrop|null{
  if(![roll,kindRoll,wearRoll].every(n=>Number.isFinite(n)&&n>=0&&n<1))return null;
  if(roll>=DROP_CHANCE)return null;
  const kind=DROP_KINDS[Math.floor(kindRoll*DROP_KINDS.length)];
  const tier=kind==='drill'?Math.floor(wearRoll*DRILLS.length):0;
  const maxDurability=kind==='drill'?DRILLS[tier as DrillTier].durability:100;
  // Found equipment is used: 10–90% durability remaining.
  const durability=Math.max(1,Math.floor(maxDurability*(.1+.8*((kindRoll*997)%1))));
  return {kind,tier,durability,maxDurability};
}
export const DISCOVERY_STORY='How was this equipment made down here? ... Strange. The thought fades almost immediately.';
