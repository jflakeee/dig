import * as T from 'three';
import {crystalClusters} from './crystals';
import {relics} from './relics';
import {treasureCaches} from './caches';
import {S} from './terrain';
export function createExplorationModels(scene:T.Scene,mine:number,claimed:readonly string[]=[]){
 const models=new Map<string,T.Group>();
 const material=(color:number,emissive=0)=>new T.MeshStandardMaterial({color,emissive,roughness:.65});
 const group=(v:{id:string;x:number;y:number;z:number})=>{const g=new T.Group();g.position.set((v.x+.5)*S,v.y*S,(v.z+.5)*S);g.userData.discoveryId=v.id;models.set(v.id,g);scene.add(g);return g};
 const box=(g:T.Group,w:number,h:number,d:number,y:number,mat:T.Material)=>{const mesh=new T.Mesh(new T.BoxGeometry(w,h,d),mat);mesh.position.y=y;g.add(mesh);return mesh};
 for(const c of crystalClusters(mine)){if(claimed.includes(c.id))continue;const g=group(c),color={amethyst:0xa65cf1,azure:0x42b9ed,golden:0xffbd43,rainbow:0xf49bdb}[c.kind],mat=material(color,color);mat.emissiveIntensity=.25;for(let i=0;i<c.count;i++){const h=.24+(i%3)*.12,mesh=new T.Mesh(new T.CylinderGeometry(0,.09,h,5),mat);const a=i*2.399;mesh.position.set(Math.cos(a)*.12,h/2,Math.sin(a)*.12);mesh.rotation.z=Math.cos(a)*.22;g.add(mesh)}}
 for(const r of relics(mine)){if(claimed.includes(r.id))continue;const g=group(r),mat=material(r.kind==='tablet'?0xa49678:0xd3a449);if(r.kind==='tablet')box(g,.24,.4,.09,.2,mat);else if(r.kind==='idol'){box(g,.22,.1,.22,.05,mat);const head=new T.Mesh(new T.IcosahedronGeometry(.16,0),mat);head.position.y=.23;g.add(head)}else{const mesh=new T.Mesh(new T.CylinderGeometry(.15,.15,.07,12),mat);mesh.position.y=.13;g.add(mesh)}}
 for(const c of treasureCaches(mine)){if(claimed.includes(c.id))continue;const g=group(c),wood=material(0x754329),metal=material(c.tier==='ancient'?0xdec45f:0x99825a);box(g,.36,.22,.26,.11,wood);box(g,.39,.08,.29,.25,wood);box(g,.07,.08,.04,.19,metal).position.z=.15;for(const x of [-.13,.13])box(g,.035,.3,.28,.15,metal).position.x=x}
 return models;
}
