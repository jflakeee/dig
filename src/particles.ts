import * as T from 'three';
export class Debris {
 private readonly mesh:T.InstancedMesh;
 private readonly slots=Array.from({length:96},()=>({p:new T.Vector3(),v:new T.Vector3(),life:0,max:1,size:0}));
 private readonly dummy=new T.Object3D();private cursor=0;
 constructor(scene:T.Scene){this.mesh=new T.InstancedMesh(new T.BoxGeometry(1,1,1),new T.MeshBasicMaterial({color:0xb58a61}),this.slots.length);this.mesh.frustumCulled=false;this.mesh.instanceMatrix.setUsage(T.DynamicDrawUsage);scene.add(this.mesh);this.update(0)}
 burst(point:T.Vector3,normal:T.Vector3,removed:number){for(let i=0;i<Math.min(16,Math.max(4,removed));i++){const s=this.slots[this.cursor++%this.slots.length];s.p.copy(point).addScaledVector(normal,.07);s.v.set(Math.random()-.5,Math.random()-.3,Math.random()-.5).multiplyScalar(2).addScaledVector(normal,1.7);s.life=s.max=.3+Math.random()*.4;s.size=.035+Math.random()*.055}}
 update(dt:number){for(let i=0;i<this.slots.length;i++){const s=this.slots[i];s.life=Math.max(0,s.life-dt);if(s.life){s.v.y-=6*dt;s.p.addScaledVector(s.v,dt)}this.dummy.position.copy(s.p);this.dummy.scale.setScalar(s.life?s.size*Math.min(1,s.life/.15):0);this.dummy.updateMatrix();this.mesh.setMatrixAt(i,this.dummy.matrix)}this.mesh.instanceMatrix.needsUpdate=true}
}
