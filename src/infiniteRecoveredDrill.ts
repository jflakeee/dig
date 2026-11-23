import type {EquipmentDrop} from './infiniteEquipmentDrops.ts';
import type {DrillState} from './infiniteDrillEconomy.ts';

/** Equipping recovered drills swaps the current drill into recovered inventory. */
export function equipRecoveredDrill(current:DrillState,equipment:EquipmentDrop[],index:number):
  {drill:DrillState;equipment:EquipmentDrop[]}|null{
  if(!Number.isInteger(index)||index<0||index>=equipment.length)return null;
  const found=equipment[index];
  if(found.kind!=='drill'||found.durability<=0)return null;
  return {
    drill:{tier:found.tier as DrillState['tier'],durability:found.durability},
    equipment:equipment.map((item,i)=>i===index?{
      kind:'drill',tier:current.tier,durability:current.durability,
      maxDurability:item.maxDurability===0?0:current.tier===0?30:current.tier===1?75:current.tier===2?150:300,
    }:item),
  };
}
