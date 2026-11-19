import * as T from 'three';
export class ViewTool {
 root=new T.Group();private models:T.Group[]=[];private swing=0;private selected=0;private bit:T.Group|null=null;
 constructor(camera:T.Camera){
 const wood=new T.MeshStandardMaterial({color:0x926038,roughness:.9}),metal=new T.MeshStandardMaterial({color:0x82929b,roughness:.42,metalness:.45}),yellow=new T.MeshStandardMaterial({color:0xe3ad35,roughness:.7}),rubber=new T.MeshStandardMaterial({color:0x292e32,roughness:.95});
 for(let i=0;i<3;i++){const group=new T.Group();
 const part=(g:T.BufferGeometry,x:number,y:number,z:number,m:T.Material)=>{const mesh=new T.Mesh(g,m);mesh.position.set(x,y,z);group.add(mesh);return mesh};
 const box=(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material)=>part(new T.BoxGeometry(w,h,d),x,y,z,m);
 if(i!==2){part(new T.CylinderGeometry(.025,.032,.45,8),0,0,0,wood);part(new T.CylinderGeometry(.039,.039,.15,8),0,-.15,0,rubber);part(new T.CylinderGeometry(.037,.037,.07,8),0,.19,0,metal)}
 if(i===0){const outline=new T.Shape();outline.moveTo(-.035,.17);outline.lineTo(-.13,.25);outline.lineTo(-.115,.38);outline.lineTo(0,.44);outline.lineTo(.115,.38);outline.lineTo(.13,.25);outline.lineTo(.035,.17);outline.closePath();part(new T.ExtrudeGeometry(outline,{depth:.025,bevelEnabled:true,bevelSize:.008,bevelThickness:.008,bevelSegments:1,steps:1}),0,0,-.0125,metal)}
 if(i===1){box(.27,.065,.065,0,.24,0,metal);for(const sign of [-1,1]){const tip=part(new T.ConeGeometry(.045,.16,4),sign*.17,.22,0,metal);tip.rotation.z=-sign*1.9}}
 if(i===2){box(.18,.19,.25,0,.12,0,yellow);box(.075,.22,.085,0,-.06,.055,rubber).rotation.x=-.22;box(.12,.05,.12,0,-.18,.075,metal);for(let n=0;n<3;n++)box(.185,.018,.015,0,.13+n*.035,.08,rubber);const chuck=part(new T.CylinderGeometry(.06,.06,.08,10),0,.12,-.155,metal);chuck.rotation.x=Math.PI/2;this.bit=new T.Group();this.bit.position.set(0,.12,-.24);const shaft=new T.Mesh(new T.CylinderGeometry(.026,.026,.17,8),metal);shaft.rotation.x=Math.PI/2;this.bit.add(shaft);for(let n=0;n<5;n++){const tooth=new T.Mesh(new T.BoxGeometry(.075,.018,.025),metal);tooth.position.z=.06-n*.03;tooth.rotation.z=n*.9;this.bit.add(tooth)}group.add(this.bit)}
 this.models.push(group);this.root.add(group)}
 this.root.position.set(.35,-.31,-.75);camera.add(this.root);this.select(0)}
 select(i:number){this.selected=i;this.models.forEach((m,j)=>m.visible=i===j)}
 hit(){this.swing=1}
 update(dt:number){this.swing=Math.max(0,this.swing-dt*5);const pulse=Math.sin(this.swing*Math.PI);this.root.rotation.set(-.35-pulse*(this.selected===2?.18:.8),0,-.38);this.root.position.y=-.31-pulse*.08;this.root.position.z=-.75-pulse*(this.selected===2?.08:0);if(this.bit&&this.selected===2&&this.swing>0)this.bit.rotation.z+=dt*24}
}
