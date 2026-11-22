import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const source=readFileSync(new URL('../src/shopProtection.ts',import.meta.url),'utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const module={exports:{}};new Function('module','exports',js)(module,module.exports);
const {overlapsProtectedArea,legacyShopAreas,isProtectedVoxel,chunkCoordinate,chunkKey}=module.exports;
test('boundary and voxel overlap protect shop',()=>{
 const area={x:0,z:0,radius:10};
 assert.equal(overlapsProtectedArea(10,0,.5,area),true);
 assert.equal(overlapsProtectedArea(10.01,0,.5,area),false);
 assert.equal(overlapsProtectedArea(9.9,-.25,.5,area),true);
});
test('legacy shops do not lock the centre of the mine',()=>{
 const areas=legacyShopAreas(16);
 assert.equal(isProtectedVoxel(8,8,.5,areas),false);
 assert.equal(isProtectedVoxel(4,-1,.5,areas),true);
});
test('negative world positions have stable chunk keys',()=>{
 assert.equal(chunkCoordinate(-.1),-1);
 assert.equal(chunkCoordinate(-16),-1);
 assert.equal(chunkCoordinate(-16.1),-2);
 assert.equal(chunkKey(-.1,16),' -1,1'.trim(),true);
});
