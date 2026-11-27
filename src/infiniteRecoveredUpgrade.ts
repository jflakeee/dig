import type {EquipmentDrop} from './infiniteEquipmentDrops.ts';
import {MAX_WAGONS,MAX_ENGINE} from './infiniteCargoTrain.ts';

/** Install salvaged machinery without charging a second crafting cost. */
export function installRecoveredUpgrade(equipment:EquipmentDrop[],index:number,wagons:number,engineLevel:number):
 {equipment:EquipmentDrop[];wagons:number;engineLevel:number}|null{
 if(!Number.isInteger(index)||index<0||index>=equipment.length)return null;
 const item=equipment[index];
 if(item.kind==='wagon'&&wagons>=MAX_WAGONS)return null;
 if(item.kind==='engine'&&engineLevel>=MAX_ENGINE)return null;
 if(item.kind!=='wagon'&&item.kind!=='engine')return null;
 return {
   equipment:equipment.filter((_,i)=>i!==index),
   wagons:wagons+(item.kind==='wagon'?1:0),
   engineLevel:engineLevel+(item.kind==='engine'?1:0),
 };
}
