import * as T from 'three';
import {InfiniteChunkScene} from './infiniteChunkScene.ts';
import {InfiniteMiningSave} from './infiniteMiningSave.ts';
import {infiniteChunkMesh,disposeInfiniteChunkMesh} from './infiniteChunkMesh.ts';
import {chunkKey} from './infiniteChunkCoordinates.ts';
import {voxelIndex,VOXEL_METERS,CHUNK_VOXELS_PER_AXIS} from './infiniteChunkTerrain.ts';

/** Opt-in preview with isolated autosave; never opens or writes legacy saves. */
export function startInfinitePreview():void {
  document.body.replaceChildren();
  const scene=new T.Scene();
  scene.background=new T.Color(0x10151c);
  scene.fog=new T.FogExp2(0x10151c,.018);
  const camera=new T.PerspectiveCamera(75,innerWidth/innerHeight,.05,96);
  camera.position.set(0,1,0);
  const renderer=new T.WebGLRenderer({antialias:false});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  renderer.setSize(innerWidth,innerHeight);
  document.body.append(renderer.domElement);
  scene.add(new T.HemisphereLight(0x99b5d9,0x23232a,1.5));
  const lamp=new T.PointLight(0xffe5bd,25,30);
  camera.add(lamp);scene.add(camera);
  const save=new InfiniteMiningSave(localStorage,20261123);
  save.load();
  const stream=new InfiniteChunkScene(scene,20261123,2,(coord,terrain)=>save.apply(coord,terrain));
  const status=document.createElement('div');
  status.style.cssText='position:fixed;top:12px;left:12px;background:#101820d9;padding:12px;border-radius:8px;color:white;pointer-events:none;z-index:5';
  status.textContent='Infinite world preview · WASD move · Q/E vertical · drag to look · mining autosave (F/⛏)';
  document.body.append(status);
  let collected=[...save.edits.values()].reduce((total,indices)=>total+indices.size,0);
  let saveFailed=false;
  const raycaster=new T.Raycaster();
  raycaster.far=5;
  const mine=(horizontal=false):boolean=>{
    if(horizontal){
      raycaster.set(camera.position,new T.Vector3(-Math.sin(yaw),0,-Math.cos(yaw)));
    }else raycaster.setFromCamera(new T.Vector2(0,0),camera);
    const hit=raycaster.intersectObjects([...stream.meshes.values()],false)[0];
    if(!hit?.face)return false;
    const mesh=hit.object as T.Mesh;
    const coord:[number,number,number]=[
      Math.round(mesh.position.x/16),Math.round(mesh.position.y/16),Math.round(mesh.position.z/16)
    ];
    const key=chunkKey(coord);
    const record=stream.stream.loaded.get(key);
    if(!record)return false;
    // Step into the solid side of the selected face, avoiding boundary ambiguity.
    const p=hit.point.clone().addScaledVector(hit.face.normal,-.002).sub(mesh.position);
    const x=Math.floor(p.x/VOXEL_METERS),y=Math.floor(p.y/VOXEL_METERS),z=Math.floor(p.z/VOXEL_METERS);
    if([x,y,z].some(n=>n<0||n>=CHUNK_VOXELS_PER_AXIS))return false;
    const index=voxelIndex(x,y,z);
    if(record.terrain[index]!==1)return false;
    record.terrain[index]=0;
    save.mark(coord,index);
    collected++;
    try{save.flush();saveFailed=false}catch{saveFailed=true}
    scene.remove(mesh);disposeInfiniteChunkMesh(mesh);
    const replacement=infiniteChunkMesh(record.terrain,coord);
    stream.meshes.set(key,replacement);scene.add(replacement);
    return true;
  };
  let autoMine=false;
  let autoAdvance=false;
  let nextAutoMineAt=0;
  const autoButton=document.createElement('button');
  autoButton.textContent='Auto Mine: OFF';
  autoButton.setAttribute('aria-pressed','false');
  autoButton.style.cssText='position:fixed;right:16px;bottom:84px;min-height:52px;min-width:112px;z-index:7;touch-action:manipulation';
  const toggleAutoMine=()=>{
    autoMine=!autoMine;
    autoButton.textContent=autoMine?'Auto Mine: ON':'Auto Mine: OFF';
    autoButton.setAttribute('aria-pressed',String(autoMine));
    nextAutoMineAt=0;
  };
  autoButton.addEventListener('click',toggleAutoMine);
  document.body.append(autoButton);
  const advanceButton=document.createElement('button');
  advanceButton.textContent='Auto Forward: OFF';
  advanceButton.setAttribute('aria-pressed','false');
  advanceButton.style.cssText='position:fixed;right:16px;bottom:148px;min-height:52px;min-width:112px;z-index:7;touch-action:manipulation';
  const toggleAdvance=()=>{
    autoAdvance=!autoAdvance;
    advanceButton.textContent=autoAdvance?'Auto Forward: ON':'Auto Forward: OFF';
    advanceButton.setAttribute('aria-pressed',String(autoAdvance));
    if(autoAdvance&&!autoMine)toggleAutoMine();
  };
  advanceButton.addEventListener('click',toggleAdvance);
  document.body.append(advanceButton);
  const mineButton=document.createElement('button');
  mineButton.textContent='⛏ Mine';
  mineButton.style.cssText='position:fixed;right:16px;bottom:20px;min-height:52px;min-width:80px;z-index:7;touch-action:manipulation';
  mineButton.addEventListener('click',()=>mine());
  document.body.append(mineButton);
  const keys=new Set<string>();
  const down=(e:KeyboardEvent)=>{if(e.key.toLowerCase()==='f'&&!e.repeat)mine();if(e.key.toLowerCase()==='r'&&!e.repeat)toggleAutoMine();if(e.key.toLowerCase()==='t'&&!e.repeat)toggleAdvance();keys.add(e.key.toLowerCase());if(['w','a','s','d','q','e'].includes(e.key.toLowerCase()))e.preventDefault()};
  const up=(e:KeyboardEvent)=>keys.delete(e.key.toLowerCase());
  addEventListener('keydown',down);addEventListener('keyup',up);
  const touchPad=document.createElement('div');
  touchPad.style.cssText='position:fixed;left:16px;bottom:20px;display:flex;gap:8px;z-index:6;touch-action:none';
  const touchButtons:[string,string][]=[['◀','a'],['▲','w'],['▼','s'],['▶','d'],['↑','e'],['↓','q']];
  for(const [label,key] of touchButtons){
    const button=document.createElement('button');
    button.textContent=label;button.setAttribute('aria-label','Move '+key.toUpperCase());
    button.style.cssText='min-width:44px;min-height:52px;touch-action:none';
    button.addEventListener('pointerdown',e=>{e.preventDefault();keys.add(key);button.setPointerCapture(e.pointerId)});
    const release=()=>keys.delete(key);
    button.addEventListener('pointerup',release);
    button.addEventListener('pointercancel',release);
    button.addEventListener('lostpointercapture',release);
    touchPad.append(button);
  }
  document.body.append(touchPad);
  addEventListener('blur',()=>keys.clear());
  let yaw=0,pitch=0,drag=false,lastX=0,lastY=0;
  renderer.domElement.addEventListener('pointerdown',e=>{drag=true;lastX=e.clientX;lastY=e.clientY;renderer.domElement.setPointerCapture(e.pointerId)});
  renderer.domElement.addEventListener('pointerup',()=>drag=false);
  renderer.domElement.addEventListener('pointercancel',()=>drag=false);
  renderer.domElement.addEventListener('pointermove',e=>{
    if(!drag)return;
    yaw-=(e.clientX-lastX)*.003;pitch=Math.max(-1.5,Math.min(1.5,pitch-(e.clientY-lastY)*.003));
    lastX=e.clientX;lastY=e.clientY;
  });
  let last=performance.now(),frame=0;
  function tick(now:number){
    const dt=Math.min((now-last)/1000,.05);last=now;
    camera.rotation.order='YXZ';camera.rotation.set(pitch,yaw,0);
    const forward=Number(keys.has('w'))-Number(keys.has('s'))+Number(autoAdvance);
    const strafe=Number(keys.has('d'))-Number(keys.has('a'));
    const vertical=Number(keys.has('e'))-Number(keys.has('q'));
    const length=Math.hypot(forward,strafe,vertical)||1;
    const speed=4*dt/length;
    const moveX=(Math.sin(yaw)*-forward+Math.cos(yaw)*strafe)*speed;
    const moveZ=(-Math.cos(yaw)*forward-Math.sin(yaw)*strafe)*speed;
    const moveY=vertical*speed;
    // Probe a small player-width tunnel, not only a single center ray.
    let blocked=false;
    if(autoAdvance){
      const direction=new T.Vector3(-Math.sin(yaw),0,-Math.cos(yaw));
      const right=new T.Vector3(Math.cos(yaw),0,-Math.sin(yaw));
      const objects=[...stream.meshes.values()];
      for(const side of [-.25,0,.25]){
        for(const height of [-.35,0,.35]){
          const origin=camera.position.clone().addScaledVector(right,side);
          origin.y+=height;
          raycaster.set(origin,direction);
          raycaster.far=.85;
          if(raycaster.intersectObjects(objects,false).length){blocked=true;break}
        }
        if(blocked)break;
      }
      raycaster.far=5;
    }
    // Stop the automatic drill before crossing into unloaded or solid terrain.
    // Manual movement remains unchanged in this experimental preview.
    const candidate=new T.Vector3(camera.position.x+moveX,camera.position.y,camera.position.z+moveZ);
    const nextChunk=chunkKey([Math.floor(candidate.x/16),Math.floor(candidate.y/16),Math.floor(candidate.z/16)]);
    const chunkReady=stream.stream.loaded.has(nextChunk);
    if(!autoAdvance||(!blocked&&chunkReady)){
      camera.position.x+=moveX;
      camera.position.z+=moveZ;
    }
    camera.position.y+=moveY;
    // Automatically mine only the closest block directly ahead, at a bounded rate.
    if(autoMine&&now>=nextAutoMineAt){
      // Carve a full player-width passage before resuming forward movement.
      if(autoAdvance){
        const original=camera.position.clone();
        const right=new T.Vector3(Math.cos(yaw),0,-Math.sin(yaw));
        let mined=false;
        for(const side of [-.25,0,.25]){
          for(const height of [-.35,0,.35]){
            camera.position.copy(original).addScaledVector(right,side);
            camera.position.y+=height;
            if(mine(true)){mined=true;break}
          }
          if(mined)break;
        }
        camera.position.copy(original);
      }else mine(false);
      nextAutoMineAt=now+350;
    }
    // Throttle expensive chunk generation to once every four frames.
    if(frame++%4===0){
      stream.update([camera.position.x,camera.position.y,camera.position.z]);
      status.textContent='Infinite preview · '+stream.meshes.size+' chunks · '+camera.position.toArray().map(n=>n.toFixed(1)).join(', ')+'m · collected '+collected+' · auto mine '+(autoMine?'ON':'OFF')+' (R) · forward '+(autoAdvance?'ON':'OFF')+' (T)'+(saveFailed?' · ⚠ SAVE FAILED — storage unavailable':'');
    }
    renderer.render(scene,camera);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
  addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
}
