import {test} from 'node:test';
import assert from 'node:assert/strict';
import {decode,encode,excavateSphere,index} from '../src/terrain.ts';
import {emptyInventory,collectIndices,inventoryFromTerrain} from '../src/inventory.ts';
import {oreAt} from '../src/ores.ts';
test('incremental inventory equals restored terrain inventory',()=>{const data=decode(null),inv=emptyInventory();for(const p of [{x:4,y:2,z:4},{x:4.5,y:2,z:4},{x:4,y:2,z:4}]){const r=excavateSphere(data,p,1.1);collectIndices(inv,r.indices);assert.equal(r.indices.length,r.removed)}assert.deepEqual(inv,inventoryFromTerrain(decode(encode(data))));assert.ok(Object.values(inv).some(n=>n>0))});
test('repeat excavation cannot award twice',()=>{const data=decode(null),p={x:4,y:2,z:4};excavateSphere(data,p,1.1);assert.deepEqual(excavateSphere(data,p,1.1).indices,[])});
test('legacy removed index saves restore ore',()=>{let seen=false;for(let x=0;x<32;x++){const ore=oreAt(x,3,2);if(ore){const data=decode(JSON.stringify({version:1,removed:[index(x,3,2),index(x,3,2)]}));assert.equal(inventoryFromTerrain(data)[ore],1);seen=true;break}}assert.ok(seen)});
