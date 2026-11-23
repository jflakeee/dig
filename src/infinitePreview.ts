import * as T from 'three';
import {InfiniteChunkScene} from './infiniteChunkScene.ts';

/** Opt-in, read-only rendering preview. Does not open or write legacy saves. */
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
  const stream=new InfiniteChunkScene(scene,20261123,2);
  const status=document.createElement('div');
  status.style.cssText='position:fixed;top:12px;left:12px;background:#101820d9;padding:12px;border-radius:8px;color:white;pointer-events:none;z-index:5';
  status.textContent='Infinite world preview · WASD move · Q/E vertical · drag to look · no save';
  document.body.append(status);
  const keys=new Set<string>();
  const down=(e:KeyboardEvent)=>{keys.add(e.key.toLowerCase());if(['w','a','s','d','q','e'].includes(e.key.toLowerCase()))e.preventDefault()};
  const up=(e:KeyboardEvent)=>keys.delete(e.key.toLowerCase());
  addEventListener('keydown',down);addEventListener('keyup',up);
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
    const forward=Number(keys.has('w'))-Number(keys.has('s'));
    const strafe=Number(keys.has('d'))-Number(keys.has('a'));
    const vertical=Number(keys.has('e'))-Number(keys.has('q'));
    const length=Math.hypot(forward,strafe,vertical)||1;
    const speed=4*dt/length;
    camera.position.x+=(Math.sin(yaw)*-forward+Math.cos(yaw)*strafe)*speed;
    camera.position.z+=(-Math.cos(yaw)*forward-Math.sin(yaw)*strafe)*speed;
    camera.position.y+=vertical*speed;
    // Throttle expensive chunk generation to once every four frames.
    if(frame++%4===0){
      stream.update([camera.position.x,camera.position.y,camera.position.z]);
      status.textContent='Infinite preview · '+stream.meshes.size+' chunks · '+camera.position.toArray().map(n=>n.toFixed(1)).join(', ')+'m · WASD/QE · drag · no save';
    }
    renderer.render(scene,camera);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
  addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
}
