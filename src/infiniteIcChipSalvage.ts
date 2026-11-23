import {IC_CHIP_SALVAGE,type EquipmentDrop} from './infiniteEquipmentDrops.ts';
import {cargoAmount,cargoCapacity} from './infiniteCargoTrain.ts';
import type {Stock} from './infiniteDrillEconomy.ts';

/** Pure transaction: no chip is consumed unless its entire mineral yield fits. */
export function dismantleIcChip(stock:Stock,equipment:EquipmentDrop[],wagons:number):
  {stock:Stock;equipment:EquipmentDrop[]}|null{
  const index=equipment.findIndex(item=>item.kind==='ic-chip');
  if(index<0||cargoCapacity(wagons)-cargoAmount(stock)<IC_CHIP_SALVAGE.copper+IC_CHIP_SALVAGE.iron)return null;
  return {
    stock:{...stock,copper:stock.copper+IC_CHIP_SALVAGE.copper,iron:stock.iron+IC_CHIP_SALVAGE.iron},
    equipment:equipment.filter((_,i)=>i!==index),
  };
}
