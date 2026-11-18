import {N,H,index} from './terrain.ts';
import {oreAt,type Ore} from './ores.ts';
export type Inventory=Record<Ore,number>;
export function emptyInventory():Inventory{return {coal:0,copper:0,iron:0,gold:0,gem:0}}
export function collectIndices(inv:Inventory,indices:readonly number[]){for(const i of indices){const x=i%N,z=Math.floor(i/N)%N,y=Math.floor(i/(N*N));const ore=oreAt(x,y,z);if(ore)inv[ore]++}}
export function inventoryFromTerrain(data:Uint8Array){const inv=emptyInventory();for(let y=0;y<H;y++)for(let z=0;z<N;z++)for(let x=0;x<N;x++)if(data[index(x,y,z)]===0){const ore=oreAt(x,y,z);if(ore)inv[ore]++}return inv}
