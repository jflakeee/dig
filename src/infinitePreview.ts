import {REPAIR_COST,repairDrill} from './infiniteDrillRepair.ts';
import {discardMinerals,type DiscardAmount} from './infiniteCargoActions.ts';
import {FUSION_RECIPES,fuseMinerals} from './infiniteMineralFusion.ts';
import * as T from 'three';
import {loadMachine,saveMachine} from './infiniteMachineSave.ts';
import {createCargoTrain} from './infiniteCargoTrainView.ts';
import {cargoAmount,cargoCapacity,cargoSpeed,canStore,wagonCost,engineCost,MAX_WAGONS,MAX_ENGINE} from './infiniteCargoTrain.ts';
import {mineralAt,miningDuration,DRILLS,emptyStock,craft,bestCraftable,drillCountCost,rangeCost,canCraft,type DrillTier,type DrillState,type Stock} from './infiniteDrillEconomy.ts';
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
  status.textContent='Infinite world preview · WASD move · Q/E vertical · drag to look · mining machine autosave (F/Drill)';
  document.body.append(status);
  let collected=[...save.edits.values()].reduce((total,indices)=>total+indices.size,0);
  let stock:Stock=emptyStock();
  let drill:DrillState={tier:0,durability:DRILLS[0].durability};
  let drillCount=1,drillRange=0;
  let wagons=1,engineLevel=0;
  const cargoTrain=createCargoTrain(scene);
  cargoTrain.setWagons(wagons);
  let miningTarget='',miningStartedAt=0;
  let crafting:{tier:DrillTier;readyAt:number;paid:boolean}|null=null;
  const queue:DrillState[]=[];
  const restored=loadMachine(localStorage,20261123,performance.now());
  if(restored){
    stock=restored.stock;drill=restored.drill;drillCount=restored.drillCount;drillRange=restored.drillRange;
    wagons=restored.wagons;engineLevel=restored.engineLevel;queue.push(...restored.queue);
    crafting=restored.crafting;cargoTrain.setWagons(wagons);
  }
  const persistMachine=()=>saveMachine(localStorage,20261123,{stock,drill,drillCount,drillRange,wagons,engineLevel,queue,crafting},performance.now());
  const ensureDrill=(now:number)=>{
    if(crafting&&now>=crafting.readyAt){
      const result=crafting.paid?{stock,drill:{tier:crafting.tier,durability:DRILLS[crafting.tier].durability}}:craft(stock,crafting.tier);
      if(result){stock=result.stock;queue.push(result.drill)}
      crafting=null;
    }
    if(drill.durability===0&&queue.length)drill=queue.shift()!;
    if(drill.durability===0&&!crafting){
      crafting={tier:bestCraftable(stock),readyAt:now+DRILLS[bestCraftable(stock)].craftMs,paid:false};
    }
  };
  let saveFailed=false;
  let nextSaveRetryAt=0;
  const flushOnExit=()=>{
    try{save.flush();persistMachine();saveFailed=false}catch{saveFailed=true}
  };
  addEventListener('pagehide',flushOnExit);
  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='hidden')flushOnExit();
  });
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
    const wx=coord[0]*32+x,wy=coord[1]*32+y,wz=coord[2]*32+z;
    const mineral=mineralAt(20261123,wx,wy,wz);
    const target=key+':'+index;
    const now=performance.now();
    ensureDrill(now);
    if(drill.durability<=0||!canStore(stock,wagons))return false;
    if(miningTarget!==target){miningTarget=target;miningStartedAt=now;return true}
    if(now-miningStartedAt<miningDuration(mineral,drill.tier))return true;
    miningTarget='';
    drill={...drill,durability:drill.durability-1};
    stock[mineral]++;
    record.terrain[index]=0;
    save.mark(coord,index);
    collected++;
    try{save.flush();persistMachine();saveFailed=false}catch{saveFailed=true;nextSaveRetryAt=performance.now()+2000}
    scene.remove(mesh);disposeInfiniteChunkMesh(mesh);
    const replacement=infiniteChunkMesh(record.terrain,coord);
    stream.meshes.set(key,replacement);scene.add(replacement);
    return true;
  };
  const workshop=document.createElement('div');
  workshop.style.cssText='display:none;position:fixed;right:12px;top:60px;max-width:min(350px,90vw);max-height:65vh;overflow:auto;background:#172630;color:white;padding:12px;z-index:10;border:1px solid #577';
  document.body.append(workshop);
  const workshopButton=document.createElement('button');
  workshopButton.textContent='Drill Workshop';
  workshopButton.style.cssText='position:fixed;right:16px;top:12px;z-index:10;min-height:44px';
  document.body.append(workshopButton);
  const spend=(cost:Stock):boolean=>{
    if(!(['stone','copper','iron','crystal'] as const).every(m=>stock[m]>=cost[m]))return false;
    for(const m of ['stone','copper','iron','crystal'] as const)stock[m]-=cost[m];
    try{persistMachine();saveFailed=false}catch{saveFailed=true}
    return true;
  };
  const refreshWorkshop=()=>{
    workshop.replaceChildren();
    const heading=document.createElement('h3');
    heading.textContent='Drill workshop · '+DRILLS[drill.tier].name+' '+drill.durability+'/'+DRILLS[drill.tier].durability;
    workshop.append(heading);
    const repair=document.createElement('button');
    const repairCost=REPAIR_COST[drill.tier];
    repair.textContent='Repair drill +50% · '+Object.entries(repairCost).filter(([,n])=>n>0).map(([m,n])=>n+' '+m).join(', ');
    const missingRepair=Object.entries(repairCost).filter(([m,n])=>n>stock[m as keyof Stock]);
    repair.disabled=drill.durability>=DRILLS[drill.tier].durability||missingRepair.length>0;
    repair.title=drill.durability>=DRILLS[drill.tier].durability?'Drill already fully repaired':
      missingRepair.length?'Missing: '+missingRepair.map(([m,n])=>m+' '+(n-stock[m as keyof Stock])).join(', '):
      'Restore up to half the drill maximum durability';
    repair.onclick=()=>{
      const result=repairDrill(stock,drill);
      if(!result)return;
      const previousStock=stock,previousDrill=drill,previousCrafting=crafting;
      stock=result.stock;drill=result.drill;
      // A repaired drill takes priority over a pending unpaid auto-replacement.
      if(crafting&&!crafting.paid)crafting=null;
      try{persistMachine();saveFailed=false}
      catch{
        stock=previousStock;drill=previousDrill;crafting=previousCrafting;saveFailed=true;
        nextSaveRetryAt=performance.now()+2000;
        const error=document.createElement('p');
        error.setAttribute('role','alert');
        error.textContent='Repair cancelled: unable to save.';
        workshop.prepend(error);
        return;
      }
      refreshWorkshop();
    };
    workshop.append(repair);
    const repairHint=document.createElement('p');
    repairHint.style.cssText='font-size:13px;margin:4px 0 10px;color:#cbd5e1';
    repairHint.textContent=repair.disabled?repair.title:'Repair available · restores up to 50% durability';
    workshop.append(repairHint);
    const inventory=document.createElement('p');
    inventory.textContent=Object.entries(stock).map(([m,n])=>m+': '+n).join(' · ');
    workshop.append(inventory);
    // A full hold must never permanently block progression when upgrade recipes
    // require a mineral that the player has not yet collected.
    const discard=document.createElement('div');
    discard.style.cssText='display:flex;flex-wrap:wrap;gap:4px;margin:8px 0';
    for(const mineral of ['stone','copper','iron','crystal'] as const){
      for(const amount of [1,10,'all'] as const satisfies readonly DiscardAmount[]){
        const button=document.createElement('button');
        button.textContent='Discard '+amount+' '+mineral;
        button.disabled=stock[mineral]===0;
        button.title='Permanently remove minerals to free cargo capacity';
        button.onclick=()=>{
          const next=discardMinerals(stock,mineral,amount);
          if(!next)return;
          stock=next;
          try{persistMachine();saveFailed=false}catch{saveFailed=true;nextSaveRetryAt=performance.now()+2000}
          refreshWorkshop();
        };
        discard.append(button);
      }
    }
    workshop.append(discard);
    const fusionHeading=document.createElement('p');
    fusionHeading.textContent='Chance fusion · materials consumed even on failure';
    workshop.append(fusionHeading);
    for(const recipe of FUSION_RECIPES){
      const button=document.createElement('button');
      button.textContent=recipe.cost+' '+recipe.from+' → 1 '+recipe.to+' ('+Math.round(recipe.chance*100)+'%)';
      button.disabled=stock[recipe.from]<recipe.cost;
      button.onclick=()=>{
        const result=fuseMinerals(stock,recipe,Math.random());
        if(!result)return;
        // Commit the random result to durable storage before showing it as settled.
        const previous=stock;
        stock=result.stock;
        try{
          persistMachine();
          saveFailed=false;
        }catch{
          stock=previous;
          saveFailed=true;
          nextSaveRetryAt=performance.now()+2000;
          const error=document.createElement('p');
          error.setAttribute('role','alert');
          error.textContent='Storage unavailable: fusion cancelled, no minerals consumed.';
          workshop.prepend(error);
          return;
        }
        refreshWorkshop();
        const notice=document.createElement('p');
        notice.setAttribute('role','status');
        notice.textContent=result.success?'Fusion success: +1 '+recipe.to:'Fusion failed: '+recipe.cost+' '+recipe.from+' consumed';
        workshop.insertBefore(notice,fusionHeading.nextSibling);
      };
      workshop.append(button);
    }
    for(let tier=0;tier<DRILLS.length;tier++){
      const t=tier as DrillTier;
      const button=document.createElement('button');
      button.textContent='Precraft '+DRILLS[t].name+' ('+(DRILLS[t].craftMs/1000)+'s)';
      button.disabled=!!crafting||!canCraft(stock,t);
      button.onclick=()=>{
        if(crafting||!spend({...DRILLS[t].recipe}))return;
        crafting={tier:t,readyAt:performance.now()+DRILLS[t].craftMs,paid:true};
        refreshWorkshop();
      };
      workshop.append(button);
    }
    const count=document.createElement('button');
    count.textContent='Drill count: '+drillCount+' → '+Math.min(4,drillCount+1);
    count.disabled=drillCount>=4||!(['stone','copper','iron','crystal'] as const).every(m=>stock[m]>=drillCountCost(drillCount+1)[m]);
    count.onclick=()=>{if(drillCount<4&&spend(drillCountCost(drillCount+1))){drillCount++;refreshWorkshop()}};
    workshop.append(count);
    const range=document.createElement('button');
    range.textContent='Installation range: '+drillRange+' → '+Math.min(3,drillRange+1);
    range.disabled=drillRange>=3||!(['stone','copper','iron','crystal'] as const).every(m=>stock[m]>=rangeCost(drillRange+1)[m]);
    range.onclick=()=>{if(drillRange<3&&spend(rangeCost(drillRange+1))){drillRange++;refreshWorkshop()}};
    workshop.append(range);
    const cargo=document.createElement('p');
    cargo.textContent='Cargo train: '+wagons+' wagons · '+cargoAmount(stock)+'/'+cargoCapacity(wagons)+' · engine '+engineLevel+' · max '+cargoSpeed(stock,wagons,engineLevel).toFixed(1)+'m/s';
    workshop.append(cargo);
    const wagonButton=document.createElement('button');
    wagonButton.textContent='Add cargo wagon ('+'40 capacity'+')';
    wagonButton.disabled=wagons>=MAX_WAGONS||!(['stone','copper','iron','crystal'] as const).every(m=>stock[m]>=wagonCost(wagons+1)[m]);
    wagonButton.onclick=()=>{if(wagons<MAX_WAGONS&&spend(wagonCost(wagons+1))){wagons++;cargoTrain.setWagons(wagons);refreshWorkshop()}};
    workshop.append(wagonButton);
    const engineButton=document.createElement('button');
    engineButton.textContent='Upgrade engine '+engineLevel+' → '+Math.min(MAX_ENGINE,engineLevel+1);
    engineButton.disabled=engineLevel>=MAX_ENGINE||!(['stone','copper','iron','crystal'] as const).every(m=>stock[m]>=engineCost(engineLevel+1)[m]);
    engineButton.onclick=()=>{if(engineLevel<MAX_ENGINE&&spend(engineCost(engineLevel+1))){engineLevel++;refreshWorkshop()}};
    workshop.append(engineButton);
    const note=document.createElement('p');
    note.textContent='Extra drill mounts and installation range are reserved upgrades; only the center drill mines in this preview.';
    workshop.append(note);
    if(crafting){const p=document.createElement('p');p.textContent='Crafting '+DRILLS[crafting.tier].name+'…';workshop.append(p)}
  };
  workshopButton.onclick=()=>{const show=workshop.style.display==='none';workshop.style.display=show?'block':'none';if(show)refreshWorkshop()};
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
  mineButton.textContent='Drill';
  mineButton.style.cssText='position:fixed;right:16px;bottom:20px;min-height:52px;min-width:80px;z-index:7;touch-action:manipulation';
  mineButton.addEventListener('click',()=>mine());
  document.body.append(mineButton);
  const keys=new Set<string>();
  const down=(e:KeyboardEvent)=>{if(e.key.toLowerCase()==='f'&&!e.repeat)mine();if(e.key.toLowerCase()==='r'&&!e.repeat)toggleAutoMine();if(e.key.toLowerCase()==='t'&&!e.repeat)toggleAdvance();keys.add(e.key.toLowerCase());if(['w','a','s','d','q','e'].includes(e.key.toLowerCase()))e.preventDefault()};
  const up=(e:KeyboardEvent)=>keys.delete(e.key.toLowerCase());
  addEventListener('keydown',down);addEventListener('keyup',up);
  const touchPad=document.createElement('div');
  touchPad.style.cssText='position:fixed;left:16px;bottom:20px;display:grid;grid-template-columns:repeat(3,44px);gap:8px;z-index:6;touch-action:none';
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
    // Auto-forward is a single deliberate direction; manual reverse takes priority.
    const forward=keys.has('s')?-1:(keys.has('w')||autoAdvance?1:0);
    const strafe=Number(keys.has('d'))-Number(keys.has('a'));
    const vertical=Number(keys.has('e'))-Number(keys.has('q'));
    const length=Math.hypot(forward,strafe,vertical)||1;
    const speed=cargoSpeed(stock,wagons,engineLevel)*dt/length;
    const moveX=(Math.sin(yaw)*-forward+Math.cos(yaw)*strafe)*speed;
    const moveZ=(-Math.cos(yaw)*forward-Math.sin(yaw)*strafe)*speed;
    const moveY=vertical*speed;
    // Probe a small player-width tunnel, not only a single center ray.
    let blocked=false;
    if(autoAdvance&&forward>0){
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
    if(!autoAdvance||forward<=0||(!blocked&&chunkReady)){
      camera.position.x+=moveX;
      camera.position.z+=moveZ;
    }
    camera.position.y+=moveY;
    // Automatically mine only the closest block directly ahead, at a bounded rate.
    ensureDrill(now);
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
      nextAutoMineAt=now+100;
    }
    if(frame%60===0){try{persistMachine()}catch{saveFailed=true;nextSaveRetryAt=now+2000}}
    // Retry transient storage errors without requiring another block to be mined.
    if(saveFailed&&now>=nextSaveRetryAt){
      try{save.flush();persistMachine();saveFailed=false}catch{nextSaveRetryAt=now+2000}
    }
    // Throttle expensive chunk generation to once every four frames.
    if(frame++%4===0){
      stream.update([camera.position.x,camera.position.y,camera.position.z]);
      status.textContent='Infinite preview · '+stream.meshes.size+' chunks · '+camera.position.toArray().map(n=>n.toFixed(1)).join(', ')+'m · collected '+collected+' · drill '+DRILLS[drill.tier].name+' '+drill.durability+'/'+DRILLS[drill.tier].durability+(drill.durability===0?' · REPAIR IN WORKSHOP':'')+' · auto mine '+(autoMine?'ON':'OFF')+' (R) · forward '+(autoAdvance?'ON':'OFF')+' (T)'+(saveFailed?' · ⚠ SAVE FAILED — storage unavailable':'');
    }
    cargoTrain.update(camera.position,yaw,dt);
    renderer.render(scene,camera);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
  addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
}
