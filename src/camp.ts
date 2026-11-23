import * as T from 'three';
import {S,originalShape,type MineShape} from './terrain';
export function createCamp(scene:T.Scene,shape:MineShape=originalShape){
 const {n:N,h:H}=shape;
 const root=new T.Group();scene.add(root);
 const wood=new T.MeshStandardMaterial({color:0x865b38}),roof=new T.MeshStandardMaterial({color:0x465b60}),stone=new T.MeshStandardMaterial({color:0x77736c}),grass=new T.MeshStandardMaterial({color:0x829359});
 const y=H*S;const trim=new T.MeshStandardMaterial({color:0xc29a69}),iron=new T.MeshStandardMaterial({color:0x42484a}),canvas=new T.MeshStandardMaterial({color:0xc7a365});
 function box(w:number,h:number,d:number,x:number,b:number,z:number,m:T.Material){const o=new T.Mesh(new T.BoxGeometry(w,h,d),m);o.position.set(x,b+h/2,z);root.add(o);return o}
 function sign(label:string,x:number,b:number,z:number){const c=document.createElement('canvas');c.width=256;c.height=64;const ctx=c.getContext('2d')!;ctx.fillStyle='#30271e';ctx.fillRect(0,0,256,64);ctx.fillStyle='#f5e5b5';ctx.font='bold 30px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(label,128,32);const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;const m=new T.Mesh(new T.PlaneGeometry(2.5,.625),new T.MeshBasicMaterial({map:tex,side:T.DoubleSide}));m.position.set(x,b,z);root.add(m)}
 const size=N*S;
 box(size+10,.3,4,size/2,y-.3,-2,grass);
 box(.16,2,.16,size/2,y,-.5,wood);sign('DIG SITE',size/2,y+1.7,-.4);
 for(const x of [1,size/2-1,size-1]){box(.65,.65,.65,x,y,-3,wood);box(.7,.09,.7,x,y+.38,-3,stone);box(.09,.65,.67,x-.21,y,-3,trim);box(.09,.65,.67,x+.21,y,-3,trim)}
 // Decorative props remain outside the excavation and collision volumes.\n for(const x of [size*.12,size*.88]){const barrel=new T.Mesh(new T.CylinderGeometry(.28,.30,.68,8),wood);barrel.position.set(x,y+.34,-3.45);root.add(barrel);for(const h of [.12,.52]){const band=new T.Mesh(new T.CylinderGeometry(.31,.31,.065,8),iron);band.position.set(x,y+h,-3.45);root.add(band)}}\n return root;
}
