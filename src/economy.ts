import {emptyInventory,inventoryFromTerrain,type Inventory} from './inventory.ts';
import {ores,type Ore} from './ores.ts';
export const oreKeys=Object.keys(ores) as Ore[];
export function wallet(sold:Inventory){return oreKeys.reduce((sum,k)=>sum+sold[k]*ores[k].value,0)}
export function available(total:Inventory,sold:Inventory):Inventory{const result=emptyInventory();for(const k of oreKeys)result[k]=total[k]-sold[k];return result}
export function validateSold(data:Uint8Array,value:unknown):Inventory{const total=inventoryFromTerrain(data),sold=emptyInventory();if(!value||typeof value!=='object')throw Error('Invalid ledger');const v=value as Record<string,unknown>;for(const k of oreKeys){const n=v[k];if(typeof n!=='number'||!Number.isSafeInteger(n)||n<0||n>total[k])throw Error('Invalid sold quantity');sold[k]=n}return sold}
export function sellAll(total:Inventory,sold:Inventory){return {...total}}
