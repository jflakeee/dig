import * as T from 'three';

/** Lightweight connected cargo pods behind the camera-controlled mining submersible. */
export function createCargoTrain(scene:T.Scene){
  const root=new T.Group();
  root.name='Connected cargo train';
  scene.add(root);
  const hull=new T.MeshStandardMaterial({color:0x506b7a,metalness:.75,roughness:.36});
  const seam=new T.MeshStandardMaterial({color:0x273b45,metalness:.6,roughness:.5});
  const glow=new T.MeshBasicMaterial({color:0x6ee7eb});
  const pods:T.Group[]=[];
  const history:T.Vector3[]=[];
  function setWagons(count:number){
    while(pods.length<count){
      const pod=new T.Group();
      const body=new T.Mesh(new T.SphereGeometry(.29,12,10),hull);
      body.scale.set(1, .85,1.18);
      pod.add(body);
      const ring=new T.Mesh(new T.TorusGeometry(.27,.035,6,16),seam);
      ring.rotation.x=Math.PI/2;pod.add(ring);
      const light=new T.Mesh(new T.SphereGeometry(.055,8,6),glow);
      light.position.set(0,.09,-.29);pod.add(light);
      root.add(pod);pods.push(pod);
    }
    while(pods.length>count){
      const pod=pods.pop()!;
      root.remove(pod);
      pod.traverse(o=>{if(o instanceof T.Mesh)o.geometry.dispose()});
    }
  }
  function update(position:T.Vector3,heading:number,dt:number){
    history.unshift(position.clone());
    if(history.length>600)history.length=600;
    for(let i=0;i<pods.length;i++){
      const pod=pods[i];
      const behind=1.1+i*.85;
      const target=history[Math.min(history.length-1,Math.floor(behind/Math.max(.04,dt*4)))]??position;
      const fallback=new T.Vector3(position.x+Math.sin(heading)*behind,position.y,position.z+Math.cos(heading)*behind);
      pod.position.copy(history.length>4?target:fallback);
      pod.rotation.y=heading;
    }
  }
  function dispose(){
    root.traverse(o=>{if(o instanceof T.Mesh)o.geometry.dispose()});
    scene.remove(root);hull.dispose();seam.dispose();glow.dispose();
  }
  return {setWagons,update,dispose};
}
