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
  // Distance-based trail prevents wagon spacing from changing with frame rate.
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
  function update(position:T.Vector3,heading:number,_dt:number){
    // Keep a spatial breadcrumb every ~0.15m, not one per rendered frame.
    if(!history.length||history[0].distanceTo(position)>=.15)history.unshift(position.clone());
    if(history.length>300)history.length=300;
    for(let i=0;i<pods.length;i++){
      const pod=pods[i];
      const behind=1.1+i*.85;
      let remaining=behind;
      let target=position.clone();
      let previous=position;
      for(const point of history){
        const distance=previous.distanceTo(point);
        if(distance>=remaining){
          target.copy(previous).lerp(point,distance>0?remaining/distance:0);
          remaining=0;
          break;
        }
        remaining-=distance;
        target.copy(point);
        previous=point;
      }
      // When standing still after spawning, arrange the wagons behind the craft.
      if(remaining>0)target.add(new T.Vector3(Math.sin(heading)*remaining,0,Math.cos(heading)*remaining));
      pod.position.copy(target);
      pod.rotation.y=heading;
    }
  }
  function dispose(){
    root.traverse(o=>{if(o instanceof T.Mesh)o.geometry.dispose()});
    scene.remove(root);hull.dispose();seam.dispose();glow.dispose();
  }
  return {setWagons,update,dispose};
}
