import {test} from 'node:test';
import assert from 'node:assert/strict';
import {decode,density,excavateSphere,index,N,H,S} from '../src/terrain.ts';
import {meshChunk} from '../src/surface.ts';
test('sphere removes only centers within radius',()=>{const d=decode(null),p={x:4,y:4,z:4},r=.85;const a=excavateSphere(d,p,r);let n=0;for(let y=0;y<H;y++)for(let z=0;z<N;z++)for(let x=0;x<N;x++){const inside=Math.hypot((x+.5)*S-p.x,(y+.5)*S-p.y,(z+.5)*S-p.z)<=r;assert.equal(d[index(x,y,z)],inside?0:1);n+=Number(inside)}assert.equal(a.removed,n);assert.ok(a.dirty.has('0,0,0'));assert.ok(a.dirty.has('1,1,1'));assert.equal(excavateSphere(d,p,r).removed,0)});
test('density agrees with flat ground',()=>{const d=decode(null);assert.equal(density(d,8,12,8),.5);assert.ok(density(d,8,11.9,8)>.5);assert.ok(density(d,8,12.1,8)<.5)});
test('triangle vertices and centroids lie on density isosurface',()=>{const d=decode(null);excavateSphere(d,{x:4,y:4,z:4});for(let cx=0;cx<2;cx++)for(let cy=0;cy<2;cy++)for(let cz=0;cz<2;cz++){const p=meshChunk(d,cx,cy,cz);for(let i=0;i<p.length;i+=9){for(let j=0;j<9;j+=3)assert.ok(Math.abs(density(d,...p.slice(i+j,i+j+3))-.5)<1e-8);assert.ok(Math.abs(density(d,...[0,1,2].map(j=>(p[i+j]+p[i+j+3]+p[i+j+6])/3))-.5)<1e-8)}}});
