import {repairDrill} from './infiniteDrillRepair.ts';
import type {Stock} from './infiniteDrillEconomy.ts';
import type {EquipmentDrop} from './infiniteEquipmentDrops.ts';

/** Repair a recovered drill without touching the currently equipped drill. */
export function repairRecoveredDrill(stock:Stock,equipment:EquipmentDrop[],index:number):
  {stock:Stock;equipment:EquipmentDrop[]}|null{
  if(!Number.isInteger(index)||index<0||index>=equipment.length)return null;
  const item=equipment[index];
  if(item.kind!=='drill')return null;
  const result=repairDrill(stock,{tier:item.tier as 0|1|2|3,durability:item.durability});
  if(!result)return null;
  return {stock:result.stock,equipment:equipment.map((e,i)=>i===index?{...e,durability:result.drill.durability}:e)};
}
