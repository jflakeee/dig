import { gravityLevelRoll } from './microGravityCameraRoll';
import { faceMicroGravity } from './microGravityOrientation';
import { microGravityWorldSeed } from './microGravitySeed.ts';
import { microGravityAt, MICRO_GRAVITY_MAX, MICRO_GRAVITY_DIRECTION_THRESHOLD } from './chunkMicroGravity';
import { INITIAL_DRIFT, microGravityDrift } from './microGravityDrift';
import { INITIAL_MEMORY, advanceMemory, memoryMiningEvent } from './miningMachineMemory';
import { machineDropReaction } from './miningMachinePersonality';
import { createMiningMachineView } from './miningMachineView';
import { INITIAL_PROPULSION, collectDust, propulsionStep } from './miningMachinePropulsion';
import { lookDirection } from './zeroGravityMovement';
import { initialAutoMineState, stepAutoMine } from './autoMineController';
import type { AutoMineState } from './autoMineController';
import {legendaryIds,legendaryRecipes,legendaryAvailable,validateLegendary} from './legendary';
import {legendaryTool} from './legendaryTool';
import {rareSound} from './audio';
import {rareAt,rareInventory} from './rareResources';
import {expandedInventory} from './mineOres';
import {expansionMine} from './expandedProfile';
import {expandedUnlocked,openExpansionPreview} from './expandedWorld';
import {volcanicMaterial} from './volcanicTerrain';
import {upgradePreview} from './upgradePreview';
import {objectives} from './objectives';
import {discoveryFeedback} from './discoveryFeedback';
import {excavationFeedback} from './excavationFeedback';
import type {Ore} from './ores';
import {biomeAt} from './biomes';
import {enteredCave} from './caveDiscovery';
import {journalProgress} from './journal';
import {discoveryGold} from './journal';
import {createExplorationModels} from './explorationModels';
import {craftedTool,craftEffects} from './craftEffects';
import {AdaptiveQuality,renderCeiling} from './quality';
import {createCamp} from './camp';
import {installOreGlow,glowStrength} from './oreGlow';
import {ViewTool} from './viewTool';
import {recipes,craft,remaining,consumed} from './crafting';
import {cost,spent,upgrade} from './upgrades';
import {available,wallet,sellAll} from './economy';
import {inventoryFromTerrain,collectIndices} from './inventory';
import {oreAt,ores} from './ores';
import {solid} from './terrain';
import {terrainTint} from './materials';
import {digSound,uiSound,prepareAudio,toggleMute,suspendAudio} from './audio';
import {Debris} from './particles';
import {tools,toolAt} from './tools';
import {lighting,caveAtmosphere} from './lighting';
import {joystick} from './input';
import {meshChunk} from './surface';
import {SAVE} from './save';
import {openWorld} from './worldSession';
import {profileInventory,mineOre} from './mineOres';
import {mines,PROFILE} from './mineProfile';
import {unlocked} from './expedition';
import {S,density,excavateSphere,surfaceSpawn,rescueSpawn,rescueFloor} from './terrain';
import * as T from 'three';
import { discoverDrillHazard, advanceDrillHazard, hazardResolved, rollDrillHazard } from './drillHazards';
import type { DrillHazard } from './drillHazards';
import { unlockAudio, muted } from 'plinkfx';
async function boot(){
addEventListener('pointerdown',()=>{unlockAudio()},{once:true});
addEventListener('keydown',()=>{unlockAudio()},{once:true});
prepareAudio();const actions=document.createElement('div');actions.id='actions';document.body.append(actions);const muteButton=document.createElement('button');muteButton.textContent=muted()?'Sound off':'Sound on';muteButton.style.cssText='position:fixed;top:12px;right:12px;z-index:2';actions.append(muteButton);muteButton.onclick=()=>{const off=toggleMute();muteButton.textContent=off?'Sound off':'Sound on'};
const scene=new T.Scene();const debris=new Debris(scene);scene.background=new T.Color(0xadc7ce);scene.fog=new T.FogExp2(0xadc7ce,.018);
const camera=new T.PerspectiveCamera(70,innerWidth/innerHeight,.05,80);
const renderer=new T.WebGLRenderer({antialias:false});renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;const mobile=matchMedia('(pointer: coarse)').matches;let quality=new AdaptiveQuality(renderCeiling(innerWidth,innerHeight,devicePixelRatio,mobile));renderer.setPixelRatio(quality.scale);renderer.setSize(innerWidth,innerHeight);document.body.prepend(renderer.domElement);
const ambient=new T.HemisphereLight(0xffffff,0x725037,2);scene.add(ambient);const sun=new T.DirectionalLight(0xffffff,2);sun.position.set(5,10,3);scene.add(sun);
const lamp=new T.SpotLight(0xffecd0,35,13,Math.PI/5,.55,2);lamp.position.set(.1,-.08,0);lamp.target.position.set(0,0,-1);const fill=new T.PointLight(0xc9dcff,1.1,2.8,2);fill.position.set(0,.05,-.15);camera.add(fill);camera.add(lamp,lamp.target);scene.add(camera);const viewTool=new ViewTool(camera);const miningMachineView=createMiningMachineView(camera);let lampOn=true;const lampButton=document.createElement('button');lampButton.textContent='Lamp on';lampButton.style.cssText='position:fixed;right:12px;top:88px;z-index:2';actions.append(lampButton);function toggleLamp(){uiSound('toggle-on');lampOn=!lampOn;lamp.visible=lampOn;fill.visible=lampOn;lampButton.textContent=lampOn?'Lamp on':'Lamp off'}lampButton.onclick=toggleLamp;addEventListener('keydown',e=>{if(e.key.toLowerCase()==='l'&&!e.repeat)toggleLamp()});
const store={getItem:(k:string)=>localStorage.getItem(k),setItem:(k:string,v:string)=>localStorage.setItem(k,v)};
const world:ReturnType<typeof openWorld>=await (async()=>{try{return navigator.locks?await navigator.locks.request(SAVE,()=>openWorld(store)):openWorld(store)}catch{const hud=document.querySelector('#hud')!;hud.textContent='Save protected — reload after checking browser storage';hud.setAttribute('role','alert');throw Error('Save protected')}})();const shape=world.shape,N=shape.n,H=shape.h;
const microGravitySeed=microGravityWorldSeed(shape.id);createCamp(scene,shape);const rescue=new T.Mesh(new T.BoxGeometry(N*S,.3,3),new T.MeshStandardMaterial({color:0x77736c}));rescue.position.set(N*S/2,H*S-.15,-1.5);scene.add(rescue);
let ledger=world.ledger;
const session={readable:true,get sold(){return ledger.sold},get levels(){return ledger.levels},get crafted(){return ledger.crafted},write(data:Uint8Array,sold=ledger.sold,levels=ledger.levels,crafted=ledger.crafted){const result=world.write(data,{sold,levels,crafted});if(result==='saved')ledger=world.ledger;return result as 'saved'|'failed'|'conflict'|'protected'}};
const explorationModels=world.profile.worldgen===1?createExplorationModels(scene,shape.id,world.profile.journal??[]):new Map<string,T.Group>();
const data=world.terrain();const inventory=world.profile.version===3?expandedInventory(world.profile):profileInventory(world.profile);const bag=document.createElement('div');bag.id='inventory';bag.style.cssText='position:fixed;left:12px;top:64px;z-index:2;color:white;background:#18221cbb;padding:6px;border-radius:6px;font:12px system-ui;pointer-events:none';document.body.append(bag);function updateBag(){bag.textContent=Object.entries(remaining(inventory,session.sold,session.crafted)).map(([k,v])=>k+': '+v).join(' · ')+' · Gold '+((wallet(session.sold)+discoveryGold(world.profile.journal??[]))-spent(session.levels))}updateBag();let saveStatus=session.readable?'':' · Load failed (protected)';
let count=world.profile.mines[shape.id-1].length;
const rareLabels={'obsidian-heart':'Obsidian Heart','ember-crystal':'Ember Crystal','ancient-core':'Ancient Core'};const rareNotice=document.createElement('div');rareNotice.id='rare-feedback';rareNotice.setAttribute('role','status');rareNotice.style.cssText='position:fixed;top:32%;left:50%;transform:translateX(-50%);z-index:4;pointer-events:none;background:#25202a;color:#ffe18a;padding:12px;border-radius:8px;text-align:center';rareNotice.hidden=true;document.body.append(rareNotice);let rareUntil=0;const rareBag=document.createElement('div');rareBag.id='rare-inventory';rareBag.style.cssText='color:#ffe18a;font:12px system-ui';function refreshRare(){if(Number(shape.id)!==4)return;const indices=Array.from(data.keys()).filter(i=>data[i]===0);const counts=rareInventory(indices);rareBag.textContent=Object.entries(counts).map(([k,v])=>rareLabels[k as keyof typeof rareLabels]+': '+v).join(' · ');if(!rareBag.isConnected)bag.after(rareBag);rareBag.style.cssText+=';position:fixed;left:12px;bottom:8px;pointer-events:none';}refreshRare();

let saving=false,pending=false,trading=false;
async function save(){pending=true;if(saving)return;saving=true;try{while(pending){pending=false;const write=()=>session.write(data);let result:ReturnType<typeof session.write>='failed';if(navigator.locks){await navigator.locks.request(SAVE,()=>{result=write()})}else{result=write()}saveStatus=' · '+({saved:'Saved',failed:'Save failed',conflict:'Save conflict — reload',protected:'Save protected'}[result]);if(result==='conflict'||result==='protected'){pending=false;break}}}catch{saveStatus=' · Save failed'}finally{saving=false}}

const sellButton=document.createElement('button');sellButton.textContent='Sell all';sellButton.style.cssText='position:fixed;right:12px;top:126px;z-index:2';actions.append(sellButton);
sellButton.onclick=async()=>{if(trading||saving)return;if(camera.position.y<H*S+1.4){notice=' · Return to surface to sell';return}if(!Object.values(remaining(inventory,session.sold,session.crafted)).some(n=>n>0))return;trading=true;try{const write=()=>session.write(data,Object.fromEntries(Object.entries(inventory).map(([k,v])=>[k,v-consumed(session.crafted)[k as keyof typeof inventory]])) as typeof inventory);let result:ReturnType<typeof write>='failed';if(navigator.locks){await navigator.locks.request(SAVE,()=>{result=write()})}else result=write();notice=' · Sale '+result;updateBag();uiSound(result==='saved'?'confirm':'error')}catch{notice=' · Sale failed'}finally{trading=false}};
const craftPanel=document.createElement('div');craftPanel.id='craft-menu';craftPanel.style.cssText='position:fixed;left:12px;top:96px;z-index:4;background:#222;color:white;padding:8px;display:none';document.body.append(craftPanel);
const craftToggle=document.createElement('button');craftToggle.id='craft-toggle';craftToggle.textContent='Craft';craftToggle.style.cssText='position:fixed;left:12px;top:96px;z-index:3';document.body.append(craftToggle);
craftToggle.onclick=()=>{document.querySelector('#mine-menu')?.remove();craftPanel.style.display='block';refreshCraft()};
function refreshCraft(){craftPanel.replaceChildren();const close=document.createElement('button');close.textContent='Close';close.onclick=()=>craftPanel.style.display='none';craftPanel.append(close);recipes.forEach((r,i)=>{const b=document.createElement('button');b.style.display='block';b.textContent=r.name+' ['+['speed +2% (max 20%)','reach +2.5% (max 25%)','radius +2.5% (max 25%)','lamp range +15% (max 75%)'][i]+'] ×'+session.crafted[i]+' | '+Object.entries(r).filter(([k,v])=>k!=='name'&&Number(v)>0).map(([k,v])=>k+' '+v).join(', ');b.disabled=!craft(i,inventory,session.sold,session.crafted);b.onclick=async()=>{if(trading||saving)return;if(camera.position.y<H*S+1.4){notice=' · Return to surface to craft';return}const next=craft(i,inventory,session.sold,session.crafted);if(!next)return;trading=true;try{const write=()=>session.write(data,session.sold,session.levels,next);let result:ReturnType<typeof write>='failed';if(navigator.locks){await navigator.locks.request(SAVE,()=>{result=write()})}else result=write();notice=' · Craft '+result;updateBag();refreshCraft();uiSound(result==='saved'?'confirm':'error')}catch{notice=' · Craft failed'}finally{trading=false}};craftPanel.append(b)});if(world.profile.version===3){const state=validateLegendary(world.profile),available=legendaryAvailable(world.profile);const title=document.createElement('h3');title.textContent='Legendary equipment';craftPanel.append(title);for(const id of legendaryIds){const recipe=legendaryRecipes[id],owned=state.unlocked.includes(id),equipped=state.equipped===id;const b=document.createElement('button');b.style.cssText='display:block;width:100%;margin-top:5px';b.textContent=id+' · '+(equipped?'Equipped':owned?'Equip':Object.entries(recipe.cost).map(([k,v])=>k+' '+available[k as keyof typeof available]+'/'+v).join(' · '));b.disabled=equipped||(!owned&&(session.levels[recipe.tool]<5||Object.entries(recipe.cost).some(([k,v])=>available[k as keyof typeof available]<v)));b.onclick=async()=>{if(trading||saving)return;if(camera.position.y<H*S+1.4){notice=' · Return to surface for legendary equipment';return}trading=true;try{const write=()=>owned?world.equipLegendary(id):world.craftLegendary(id);const result=navigator.locks?await navigator.locks.request(SAVE,write):write();notice=' · Legendary '+result;if(result==='saved'){refreshRare();refreshCraft();uiSound('confirm')}else uiSound('error')}catch{notice=' · Legendary save failed'}finally{trading=false}};craftPanel.append(b)}if(state.equipped){const b=document.createElement('button');b.textContent='Unequip legendary';b.onclick=async()=>{if(trading||saving)return;trading=true;try{const write=()=>world.equipLegendary(null);const result=navigator.locks?await navigator.locks.request(SAVE,write):write();notice=' · Unequip '+result;if(result==='saved')refreshCraft()}catch{notice=' · Legendary save failed'}finally{trading=false}};craftPanel.append(b)}}}
const orePalette=Object.fromEntries(Object.entries(ores).map(([k,v])=>[k,new T.Color(v.color)]));const palette={grass:new T.Color(0x82a64d),soil:new T.Color(0xa67b51),clay:new T.Color(0x995c42),rock:new T.Color(0x706c68)};
const mat=new T.MeshStandardMaterial({vertexColors:true,flatShading:true,roughness:.94,metalness:0});installOreGlow(mat);const chunks=new Map<string,T.Mesh>();
const metrics={rebuilds:0,rebuildMs:0,collisionCalls:0,frames:0};const profiling=new URLSearchParams(location.search).has('perf');
const biomeColors={limestone:new T.Color(0xb7a58a),basalt:new T.Color(0x484452),crystal:new T.Color(0x776097),ancient:new T.Color(0x9a8152)};const biomeTint=new T.Color();const rareColors={'obsidian-heart':new T.Color(0xaa69ee),'ember-crystal':new T.Color(0xff7934),'ancient-core':new T.Color(0xffd56c)};const volcanicColors={ash:new T.Color(0x938c83),basalt:new T.Color(0x38343b),scoria:new T.Color(0x805044),obsidian:new T.Color(0x242032)};
function rebuild(cx:number,cy:number,cz:number){if(cx<0||cy<0||cz<0||cx>=N/8||cz>=N/8||cy>=Math.ceil(H/8))return;const key=[cx,cy,cz].join(',');const old=chunks.get(key);if(old){scene.remove(old);old.geometry.dispose();chunks.delete(key)}const started=profiling?performance.now():0;const p=meshChunk(data,cx,cy,cz,shape);if(profiling)metrics.rebuilds++;if(!p.length){if(profiling)metrics.rebuildMs+=performance.now()-started;return;}const c:number[]=[],emission:number[]=[],oreMask:number[]=[];for(let i=0;i<p.length;i+=3){const {layer,tint}=terrainTint(p[i],p[i+1]-H*S+12,p[i+2]);let color=palette[layer];const x=p[i],y=p[i+1],z=p[i+2];const ix=Math.floor(x/S),iy=Math.floor(y/S),iz=Math.floor(z/S);if(world.profile.worldgen===1){const biome=biomeAt(shape.id,Math.max(0,Math.min(N-1,ix)),Math.max(0,Math.min(H-1,iy)),Math.max(0,Math.min(N-1,iz)));if(biome&&biome!=='soil')color=biomeTint.copy(color).lerp(biomeColors[biome],.45)}if(Number(shape.id)===4){const material=volcanicMaterial(Math.max(0,Math.min(N-1,ix)),Math.max(0,Math.min(H-1,iy)),Math.max(0,Math.min(N-1,iz)));if(material)color=biomeTint.copy(color).lerp(volcanicColors[material],.85)}let found=false,glow=0;for(let dy=-1;dy<=0&&!found;dy++)for(let dz=-1;dz<=0&&!found;dz++)for(let dx=-1;dx<=0&&!found;dx++){const a=ix+dx,b=iy+dy,d=iz+dz;if(!solid(data,a,b,d,shape))continue;const distance=(x-(a+.5)*S)**2+(y-(b+.5)*S)**2+(z-(d+.5)*S)**2;if(distance>S*S*.76)continue;const rare=Number(shape.id)===4&&a>=0&&a<N&&b>=0&&b<H&&d>=0&&d<N?rareAt(a+d*N+b*N*N):null;if(rare){color=rareColors[rare];glow=1.1;found=true;continue}const ore=mineOre(shape.id,a,b,d);if(ore){color=orePalette[ore];glow=glowStrength(ore);found=true}}c.push(color.r*tint,color.g*tint,color.b*tint);emission.push(color.r*glow,color.g*glow,color.b*glow);oreMask.push(found?1:0)}const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('color',new T.Float32BufferAttribute(c,3));g.setAttribute('oreGlow',new T.Float32BufferAttribute(emission,3));g.setAttribute('oreMask',new T.Float32BufferAttribute(oreMask,1));g.computeVertexNormals();const m=new T.Mesh(g,mat);chunks.set(key,m);scene.add(m);if(profiling)metrics.rebuildMs+=performance.now()-started}
for(let x=0;x<N/8;x++)for(let y=0;y<Math.ceil(H/8);y++)for(let z=0;z<N/8;z++)rebuild(x,y,z);
const spawn=surfaceSpawn(data,shape)??rescueSpawn(shape);camera.position.set(count===0?N*S/2:spawn?.x??N*S/2,spawn.y,count===0?N*S/2:spawn?.z??N*S/2);let yaw=0,pitch=-.65;
let lastManualLookAt=-Infinity;
camera.rotation.order='YXZ';const keys=new Set<string>();addEventListener('keydown',e=>keys.add(e.key.toLowerCase()));addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));addEventListener('blur',()=>keys.clear());
const pad=document.querySelector<HTMLElement>('#move')!,stick=document.querySelector<HTMLElement>('#stick')!;let joyId=-1,joyX=0,joyY=0;
function resetJoy(){joyId=-1;joyX=joyY=0;stick.style.transform='translate(-50%,-50%)'}
function updateJoy(e:PointerEvent){const r=pad.getBoundingClientRect();const q=joystick(e.clientX-r.left-r.width/2,e.clientY-r.top-r.height/2);joyX=q.x;joyY=q.y;const travel=Math.max(0,(Math.min(r.width,r.height)-stick.offsetWidth)/2);stick.style.transform='translate(-50%,-50%) translate('+q.x*travel+'px,'+q.y*travel+'px)'}
pad.onpointerdown=e=>{if(joyId!==-1)return;joyId=e.pointerId;pad.setPointerCapture(joyId);updateJoy(e)};
pad.onpointermove=e=>{if(e.pointerId===joyId)updateJoy(e)};
pad.onpointerup=pad.onpointercancel=pad.onlostpointercapture=e=>{if(e.pointerId===joyId)resetJoy()};
addEventListener('blur',resetJoy);
let look=-1,lx=0,ly=0;renderer.domElement.onpointerdown=e=>{if(look!==-1)return;lastManualLookAt=performance.now();look=e.pointerId;lx=e.clientX;ly=e.clientY;renderer.domElement.setPointerCapture(look)};renderer.domElement.onpointermove=e=>{if(e.pointerId!==look)return;yaw-=(e.clientX-lx)*.005;pitch=T.MathUtils.clamp(pitch-(e.clientY-ly)*.005,-1.5,1.5);lx=e.clientX;ly=e.clientY;lastManualLookAt=performance.now()};renderer.domElement.onpointerup=renderer.domElement.onpointercancel=renderer.domElement.onlostpointercapture=e=>{
  if(e.pointerId===look){look=-1;lastManualLookAt=performance.now()}
};
addEventListener('blur',()=>{look=-1;lastManualLookAt=performance.now()});
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){look=-1;lastManualLookAt=performance.now()}
});
let selected=0;const bar=document.createElement('div');bar.id='tools';bar.style.cssText='position:fixed;bottom:max(12px,env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);display:flex;gap:4px;z-index:3';document.body.append(bar);
const toolButtons=tools.map((t,i)=>{const el=document.createElement('button');el.textContent=t.name;el.style.cssText='padding:8px 5px;font-size:12px';el.onclick=()=>{selectTool(i);uiSound('click')};bar.append(el);return el});
function selectTool(i:number){selected=i;viewTool.select(i);toolButtons.forEach((el,j)=>{el.setAttribute('aria-pressed',String(i===j));el.style.background=i===j?'#f6c56c':'#23332f'})}selectTool(0);
addEventListener('keydown',e=>{if(['1','2','3'].includes(e.key))selectTool(Number(e.key)-1)});
const upgradeButton=document.createElement('button');upgradeButton.style.cssText='position:fixed;right:12px;top:164px;z-index:2';actions.append(upgradeButton);const upgradeInfo=document.createElement('div');upgradeInfo.id='upgrade-preview';upgradeInfo.style.cssText='position:fixed;right:max(12px,env(safe-area-inset-right));bottom:max(118px,calc(env(safe-area-inset-bottom) + 110px));color:white;background:#18221cbb;padding:4px 6px;border-radius:5px;font:11px system-ui;pointer-events:none;z-index:2;max-width:120px';document.body.append(upgradeInfo);
function updateUpgrade(){const n=session.levels[selected];upgradeButton.textContent=n===5?'Max level':'Upgrade +'+(n+1)+' · '+cost(selected,n)+'G';upgradeButton.disabled=n===5;const p=upgradePreview(selected,session.levels,session.crafted);upgradeInfo.textContent=p?'Radius '+p.radius.toFixed(2)+' → '+p.nextRadius.toFixed(2)+'m · '+p.interval+' → '+p.nextInterval+'ms':'Equipment maxed';upgradeButton.title=upgradeInfo.textContent}
upgradeButton.onclick=async()=>{if(trading||saving)return;if(camera.position.y<H*S+1.4){notice=' · Return to surface to upgrade';return}const levels=upgrade(session.levels,selected,(wallet(session.sold)+discoveryGold(world.profile.journal??[])));if(!levels){notice=' · Not enough gold or max level';return}trading=true;try{const write=()=>session.write(data,session.sold,levels);let result:ReturnType<typeof write>='failed';if(navigator.locks){await navigator.locks.request(SAVE,()=>{result=write()})}else result=write();notice=' · Upgrade '+result;updateBag();updateUpgrade();uiSound(result==='saved'?'confirm':'error')}catch{notice=' · Upgrade failed'}finally{trading=false}};
updateUpgrade();addEventListener('keydown',()=>updateUpgrade());bar.addEventListener('click',()=>updateUpgrade());
const discoveryBanner=document.createElement('div');discoveryBanner.id='discovery-feedback';discoveryBanner.style.cssText='position:fixed;top:22%;left:50%;transform:translateX(-50%);max-width:46vw;text-align:center;pointer-events:none;z-index:4;background:#192320ee;border:1px solid #a5b9ad;padding:9px 15px;border-radius:9px;color:white;font:600 14px system-ui';discoveryBanner.setAttribute('role','status');discoveryBanner.hidden=true;document.body.append(discoveryBanner);let discoveryUntil=0;function showDiscovery(id:string){const f=discoveryFeedback(shape.id,id);if(!f||document.hidden)return;discoveryBanner.textContent=f.title+' · '+f.detail;discoveryBanner.style.color=f.rare?'#ffe18a':'#d8f1e8';discoveryBanner.hidden=false;discoveryUntil=performance.now()+3000}
const gain=document.createElement('div');gain.id='excavation-feedback';gain.style.cssText='position:fixed;left:50%;top:42%;transform:translate(-50%,-50%);max-width:48vw;text-align:center;pointer-events:none;z-index:3;color:white;background:#17211ddd;padding:6px 10px;border-radius:8px;font:600 13px system-ui';gain.hidden=true;document.body.append(gain);let gainUntil=0;
const machineVoice=document.createElement('div');
machineVoice.id='machine-voice';
machineVoice.setAttribute('role','status');
machineVoice.setAttribute('aria-live','polite');
machineVoice.style.cssText='position:fixed;left:50%;bottom:20%;transform:translateX(-50%);max-width:min(85vw,420px);padding:9px 14px;background:#101c25df;color:#b8f7fa;border:1px solid #456b74;border-radius:10px;text-align:center;font:600 14px system-ui;pointer-events:none;z-index:4';
machineVoice.hidden=true;
document.body.append(machineVoice);
let machineVoiceUntil=0,machineEvent=0;
const memoryLog:string[]=[];
const memoryLogButton=document.createElement('button');
memoryLogButton.textContent='Memory: 0';
memoryLogButton.setAttribute('aria-label','View recovered memory fragments');
memoryLogButton.style.cssText='position:fixed;left:12px;bottom:66px;z-index:5;min-height:44px;display:none';
actions.append(memoryLogButton);
const memoryLogPanel=document.createElement('div');
memoryLogPanel.style.cssText='position:fixed;left:12px;bottom:116px;z-index:5;max-width:min(85vw,360px);max-height:40vh;overflow:auto;background:#101c25ef;color:#e6f6fa;border:1px solid #456b74;border-radius:8px;padding:10px;font:13px system-ui;white-space:pre-line';
memoryLogPanel.hidden=true;
document.body.append(memoryLogPanel);
memoryLogButton.onclick=()=>{
  memoryLogPanel.hidden=!memoryLogPanel.hidden;
  memoryLogPanel.textContent=memoryLog.length
    ? '외부 관측 기록 (기계는 이 기록을 인식하지 못함)\n\n'+memoryLog.map((line,i)=>(i+1)+'. '+line).join('\n')
    : '아직 기록된 기억 파편이 없습니다.';
};
let memoryState=INITIAL_MEMORY;
function showMemoryLine(line:string,now:number){
  machineVoice.textContent=line;
  machineVoice.style.color='#ffdbb8';
  machineVoice.style.borderColor='#c78c6e';
  machineVoice.setAttribute('aria-label','기억 모듈 오류: '+line);
  machineVoice.hidden=false;
  machineVoiceUntil=now+3800;
}

const impact=document.createElement('div');impact.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:1;box-shadow:inset 0 0 65px 8px #b38b55;opacity:0';document.body.append(impact);let impactPower=0;const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');const ray=new T.Raycaster(),aimPoint=new T.Vector2();function dig(){if(trading||activeHazard)return;camera.updateMatrixWorld(true);ray.setFromCamera(aimPoint,camera);const tool=legendaryTool(selected,session.levels,session.crafted,world.profile.version===3?world.profile.legendary:undefined);ray.far=tool.reach;const hit=ray.intersectObjects([...chunks.values()])[0];const prop=ray.intersectObjects([...explorationModels.values()],true)[0];if(prop&&(!hit||prop.distance<hit.distance)&&!saving){let group=prop.object;while(group.parent&&!group.userData.discoveryId)group=group.parent;const id=group.userData.discoveryId as string;if(id){trading=true;const claim=()=>{if(world.claim(id)==='saved'){scene.remove(group);explorationModels.delete(id);updateBag();refreshJournal();notice=' · Discovery recorded';showDiscovery(id);uiSound('confirm')}else notice=' · Discovery save failed'};void (async()=>{try{if(navigator.locks)await navigator.locks.request(SAVE,claim);else claim()}catch{notice=' · Discovery save failed'}finally{trading=false}})();return}}if(!hit||!hit.face)return;const hazardRoll=rollDrillHazard(Math.random());if(hazardRoll){activeHazard=discoverDrillHazard(hazardRoll.kind,hazardRoll.side,performance.now());tickHazard(performance.now());return}const q=hit.point.clone().addScaledVector(hit.face.normal,-.28);const {dirty,removed,indices}=excavateSphere(data,q,tool.radius,shape);const gained:Partial<Record<Ore,number>>={};for(const i of indices){const ore=mineOre(shape.id,i%N,Math.floor(i/(N*N)),Math.floor(i/N)%N);if(ore){inventory[ore]++;gained[ore]=(gained[ore]??0)+1}}const rareHits=Number(shape.id)===4?indices.map(rareAt).filter(k=>k!==null):[];if(rareHits.length){rareSound();rareNotice.textContent=rareHits.map(k=>rareLabels[k]).join(' · ');rareNotice.hidden=false;rareUntil=performance.now()+3000;refreshRare();} if(removed>0&&zeroGravityEnabled){
  machineEvent++;
  const remembered=memoryMiningEvent(memoryState,performance.now());
  memoryState=remembered.state;
  if(remembered.line){
    showMemoryLine(remembered.line,performance.now());
    if(!memoryLog.includes(remembered.line))memoryLog.push(remembered.line);
    memoryLogButton.textContent='Memory: '+memoryLog.length;
  }
  const reaction=machineDropReaction(gained,rareHits.length,machineEvent);
  if(reaction&&performance.now()>=machineVoiceUntil){
    machineVoice.textContent=reaction.line;
    machineVoice.style.color=reaction.humanEcho?'#ffdbb8':reaction.tier===3?'#ffe18a':'#b8f7fa';
    machineVoice.style.borderColor=reaction.humanEcho?'#c78c6e':'#456b74';
    machineVoice.setAttribute('aria-label',reaction.humanEcho?'기억 모듈 오류: '+reaction.line:reaction.line);
    machineVoice.hidden=false;
    machineVoiceUntil=performance.now()+(reaction.humanEcho?3600:1900);
  }
}
const feedback=excavationFeedback(removed,gained);if(feedback){gain.textContent=feedback.text;gain.style.color=feedback.rare?'#ffe18a':'#ffffff';gain.hidden=false;gainUntil=performance.now()+1100}updateBag();count+=removed;for(const k of dirty){const [x,y,z]=k.split(',').map(Number);rebuild(x,y,z)}if(dirty.size){propulsion=collectDust(propulsion,removed);impactPower=.18;viewTool.hit();debris.burst(hit.point,hit.face.normal,removed,rareHits.length?rareColors[rareHits[0]].getHex():0xb58a61,rareHits.length>0);save();digSound(tool.id)}}
let activeHazard:DrillHazard|null=null;
let hazardMessageUntil=0;
const hazardAlert=document.createElement('div');
hazardAlert.setAttribute('role','alert');
hazardAlert.style.cssText='position:fixed;top:20%;left:50%;transform:translateX(-50%);z-index:8;background:#581717;color:white;border:2px solid #ffb33e;border-radius:10px;padding:14px;font:bold 16px system-ui;text-align:center;pointer-events:none;max-width:85vw';
hazardAlert.hidden=true;document.body.append(hazardAlert);
let hazardLastDrillAt=-Infinity;
function hazardDrilling(now:number){return held||keys.has(' ')||autoMineEnabled}
function tickHazard(now:number){
  if(!activeHazard){if(now>hazardMessageUntil)hazardAlert.hidden=true;return}
  activeHazard=advanceDrillHazard(activeHazard,now,hazardDrilling(now));
  const hazard=activeHazard;
  if(hazard.phase==='warning'){
    hazardAlert.hidden=false;
    hazardAlert.textContent=(hazard.kind==='explosive'?'⚠ FRONT EXPLOSIVE':'⚠ REAR ACID LEAK')+' — STOP DRILL! '+Math.max(0,(hazard.deadline-now)/1000).toFixed(1)+'s';
  }else if(hazard.phase==='clearing'){
    hazardAlert.hidden=false;
    hazardAlert.textContent=hazard.kind==='explosive'?'Removing explosive…':'Neutralizer spraying…';
    if(hazardResolved(hazard,now)){hazardAlert.textContent='Hazard cleared';hazardMessageUntil=now+1200;activeHazard=null}
  }else{
    hazardAlert.hidden=false;
    hazardAlert.textContent=hazard.kind==='explosive'?'EXPLOSION — drill damage risk!':'ACID BREACH — cargo loss!';
    hazardMessageUntil=now+1800;activeHazard=null;
  }
}
let held=false;const b=document.querySelector<HTMLButtonElement>('#dig')!;let digId=-1;b.onpointerdown=e=>{if(digId!==-1)return;digId=e.pointerId;b.setPointerCapture(e.pointerId);held=true};b.onpointerup=b.onpointercancel=e=>{if(e.pointerId===digId){digId=-1;held=false}};addEventListener('blur',()=>{held=false;digId=-1});
const horizontalSamples=[-.22,0,.22],verticalSamples=[-1.55,-1.25,-.95,-.65,-.35,-.05,.1];
function blocked(p:T.Vector3){if(profiling)metrics.collisionCalls++;if(p.x<.25||p.z< -2.75||p.x>N*S-.25||p.z>N*S-.25||p.y<1.6||(zeroGravityEnabled&&p.y>H*S-.25))return true;const floor=rescueFloor(p.x,p.z,shape);if(p.z<.25&&floor!==null&&p.y<floor+1.6)return true;for(const dx of horizontalSamples)for(const dz of horizontalSamples)for(const dy of verticalSamples)if(density(data,p.x+dx,p.y+dy,p.z+dz,shape)>.5)return true;return false}
// Experimental opt-in bridge. The legacy manual mining path remains the default.
let autoMineEnabled=false;
let propulsion=INITIAL_PROPULSION;
let boostHeld=false;
let zeroGravityEnabled=false;
let verticalTouch=0;
function makeVerticalButton(label:string,direction:-1|1,top:number){
  const button=document.createElement('button');
  button.textContent=label;
  button.setAttribute('aria-label',direction>0?'Ascend in zero gravity':'Descend in zero gravity');
  button.style.cssText='position:fixed;right:12px;top:'+top+'px;z-index:3;min-width:48px;min-height:44px;touch-action:none;display:none';
  actions.append(button);
  const stop=()=>{if(verticalTouch===direction)verticalTouch=0};
  button.onpointerdown=e=>{e.preventDefault();button.setPointerCapture(e.pointerId);verticalTouch=direction};
  button.onpointerup=stop;
  button.onpointercancel=stop;
  button.onlostpointercapture=stop;
  return button;
}
const boostButton=document.createElement('button');
boostButton.textContent='⚡ Boost';
boostButton.setAttribute('aria-label','Hold to boost mining machine propulsion');
boostButton.style.cssText='position:fixed;right:12px;top:290px;z-index:3;min-height:44px;touch-action:none;display:none';
actions.append(boostButton);
boostButton.onpointerdown=e=>{e.preventDefault();boostButton.setPointerCapture(e.pointerId);boostHeld=true};
boostButton.onpointerup=boostButton.onpointercancel=boostButton.onlostpointercapture=()=>{boostHeld=false};
const ascendButton=makeVerticalButton('↑',1,188);
const descendButton=makeVerticalButton('↓',-1,238);
addEventListener('blur',()=>{verticalTouch=0;boostHeld=false});
document.addEventListener('visibilitychange',()=>{if(document.hidden){verticalTouch=0;boostHeld=false}});
const gravityToggle=document.createElement('button');
gravityToggle.textContent='Gravity: On';
gravityToggle.style.cssText='position:fixed;right:12px;top:138px;z-index:3;min-height:44px';
actions.append(gravityToggle);
gravityToggle.onclick=()=>{zeroGravityEnabled=!zeroGravityEnabled;vy=0;verticalTouch=0;ascendButton.style.display=descendButton.style.display=zeroGravityEnabled?'block':'none';boostButton.style.display=zeroGravityEnabled?'block':'none';boostHeld=false;miningMachineView.setActive(zeroGravityEnabled);microGravityToggle.style.display=zeroGravityEnabled?'block':'none';microGravityIndicator.style.display=zeroGravityEnabled&&microGravityEnabled?'block':'none';gravityFaceToggle.style.display=zeroGravityEnabled&&microGravityEnabled?'block':'none';microDrift=INITIAL_DRIFT;gravityRoll=0;microGravityIndicatorAt=0;microGravityIndicator.textContent='Micro G · Scanning…';memoryLogButton.style.display=zeroGravityEnabled?'block':'none';if(!zeroGravityEnabled)memoryLogPanel.hidden=true;gravityToggle.textContent=zeroGravityEnabled?'Gravity: Off':'Gravity: On'};
let microGravityEnabled=false;
let gravityAutoFaceEnabled=true;
let gravityRoll=0;
let microDrift=INITIAL_DRIFT;
const microGravityIndicator=document.createElement('div');
microGravityIndicator.setAttribute('role','status');
microGravityIndicator.setAttribute('aria-label','Local microgravity');
microGravityIndicator.style.cssText='position:fixed;right:12px;top:230px;z-index:3;padding:5px 8px;background:#101c25d9;color:#b8f7fa;border:1px solid #456b74;border-radius:6px;font:12px system-ui;pointer-events:none;display:none';
document.body.append(microGravityIndicator);
let microGravityIndicatorAt=0;
const microGravityToggle=document.createElement('button');
microGravityToggle.textContent='Micro G: Off';
microGravityToggle.style.cssText='position:fixed;right:12px;top:182px;z-index:3;min-height:44px;display:none';
actions.append(microGravityToggle);
microGravityToggle.onclick=()=>{
  microGravityEnabled=!microGravityEnabled;
  microDrift=INITIAL_DRIFT;
  gravityRoll=0;
  microGravityIndicatorAt=0;
  microGravityIndicator.textContent='Micro G · Scanning…';
  microGravityToggle.textContent=microGravityEnabled?'Micro G: On':'Micro G: Off';
  microGravityIndicator.style.display=microGravityEnabled?'block':'none';
  gravityFaceToggle.style.display=zeroGravityEnabled&&microGravityEnabled?'block':'none';
};
const gravityFaceToggle=document.createElement('button');
gravityFaceToggle.textContent='Auto Align: On';
gravityFaceToggle.setAttribute('aria-label','Toggle camera forward and down alignment with microgravity');
gravityFaceToggle.style.cssText='position:fixed;right:12px;top:274px;z-index:3;min-height:44px;display:none';
actions.append(gravityFaceToggle);
gravityFaceToggle.onclick=()=>{
  gravityAutoFaceEnabled=!gravityAutoFaceEnabled;
  // Discard the old camera bank when auto-level is re-enabled after manual flight.
  // Otherwise the previous area's gravity can briefly tilt the view.
  gravityRoll=0;
  gravityFaceToggle.textContent=gravityAutoFaceEnabled?'Auto Align: On':'Auto Align: Off';
};
let autoMineState:AutoMineState=initialAutoMineState();
const autoMineToggle=document.createElement('button');
autoMineToggle.textContent='Auto: Off';
autoMineToggle.style.cssText='position:fixed;right:12px;top:94px;z-index:3;min-height:44px';
actions.append(autoMineToggle);
autoMineToggle.onclick=()=>{autoMineEnabled=!autoMineEnabled;autoMineState=initialAutoMineState();autoMineToggle.textContent=autoMineEnabled?'Auto: On':'Auto: Off'};
let last=performance.now(),next=0,vy=0;const hud=document.querySelector('#hud')!;let hudAt=0,notice='';const ret=document.createElement('button');ret.textContent='Surface';ret.style.cssText='position:fixed;right:12px;top:50px;z-index:2';actions.append(ret);function returnSurface(){const p=surfaceSpawn(data,shape)??rescueSpawn(shape);camera.position.set(p.x,p.y,p.z);vy=0;held=false;digId=-1;keys.clear();resetJoy();look=-1;notice=' · Returned';uiSound('confirm')}ret.onclick=returnSurface;addEventListener('keydown',e=>{if(e.key.toLowerCase()==='r'&&!e.repeat)returnSurface()});renderer.domElement.onlostpointercapture=e=>{if(e.pointerId===look)look=-1};b.onlostpointercapture=e=>{if(e.pointerId===digId){digId=-1;held=false}};addEventListener('blur',()=>{look=-1});const moveVec=new T.Vector3(),up=new T.Vector3(0,1,0),probe=new T.Vector3();let previousOpacity='';function frame(now:number){requestAnimationFrame(frame);const frameMs=now-last;const dt=Math.min(.04,frameMs/1000);last=now;tickHazard(now);if(!discoveryBanner.hidden&&now>=discoveryUntil)discoveryBanner.hidden=true;if(!gain.hidden&&now>=gainUntil)gain.hidden=true;if(!rareNotice.hidden&&now>=rareUntil)rareNotice.hidden=true;if(!machineVoice.hidden&&now>=machineVoiceUntil)machineVoice.hidden=true;if(zeroGravityEnabled&&!document.hidden){
  const fading=advanceMemory(memoryState,now);
  memoryState=fading.state;
  if(fading.line)showMemoryLine(fading.line,now);
}if(!document.hidden&&quality.sample(frameMs))renderer.setPixelRatio(quality.scale);impactPower=Math.max(0,impactPower-dt*1.7);const opacity=reducedMotion.matches||impactPower===0?'0':String(impactPower);if(opacity!==previousOpacity){impact.style.opacity=opacity;previousOpacity=opacity}if(zeroGravityEnabled&&microGravityEnabled&&gravityAutoFaceEnabled&&!document.hidden&&document.hasFocus()&&
  journalPanel.style.display==='none'&&memoryLogPanel.hidden&&!trading){
  const gravity=microGravityAt(microGravitySeed,[camera.position.x,camera.position.y,camera.position.z]);
  // Give touch/mouse look priority, then gradually point the machine into gravity.
  const manualLookIdle=look===-1&&now-lastManualLookAt>1800;
  if(manualLookIdle){
    const facing=faceMicroGravity({yaw,pitch},gravity,dt);
    yaw=facing.yaw;pitch=facing.pitch;
  }
  camera.rotation.set(pitch,yaw,0,'YXZ');
  // Roll assist must respect the same touch/mouse grace period as yaw and pitch.
  if(manualLookIdle){
    const localGravity=new T.Vector3(...gravity).applyQuaternion(camera.quaternion.clone().invert());
    gravityRoll=gravityLevelRoll(gravityRoll,localGravity.x,localGravity.y,dt);
  }
}else camera.rotation.set(pitch,yaw,0,'YXZ');
if(zeroGravityEnabled&&microGravityEnabled&&gravityAutoFaceEnabled)camera.rotateZ(gravityRoll);const drive=propulsionStep(propulsion,dt,zeroGravityEnabled&&(boostHeld||keys.has('shift')));propulsion=drive.state;const driveSpeed=zeroGravityEnabled?drive.speed:3;const d=moveVec.set(Number(keys.has('d'))-Number(keys.has('a'))+joyX,0,Number(keys.has('s'))-Number(keys.has('w'))+joyY);if(d.lengthSq()>1)d.normalize();d.applyAxisAngle(up,yaw).multiplyScalar(driveSpeed*dt);
if(autoMineEnabled){
  const [fx,fy,fz]=lookDirection(yaw,pitch);
  const forward=probe.set(fx,fy,fz);
  if(!zeroGravityEnabled)forward.y=0;
  const ahead=camera.position.clone().addScaledVector(forward,.5);
  const safe={menuOpen:journalPanel.style.display!=='none'||trading,
    appFocused:!document.hidden&&document.hasFocus(),chunksReady:chunks.size>0,
    saveHealthy:!saving,fallSafe:zeroGravityEnabled||Math.abs(vy)<.5};
  const decision=stepAutoMine(autoMineState,{
    deltaSeconds:dt,solidAhead:blocked(ahead),safety:safe,
    tool:{current:1000,maximum:1000,originalMaximum:1000},
    enhancement:0,baseMineSeconds:.35
  });
  autoMineState=decision.state;
  if(decision.moveForward) d.addScaledVector(forward,driveSpeed*dt);
  if(decision.mineBlocks>0) dig();
}if(zeroGravityEnabled){
  d.y+=(Number(keys.has('e'))-Number(keys.has('q'))+verticalTouch)*driveSpeed*dt;
  const vertical=probe.copy(camera.position);vertical.y+=d.y;
  if(!blocked(vertical))camera.position.copy(vertical);
  vy=0;
  d.y=0;
}for(const axis of ['x','z'] as const){if(d[axis]===0)continue;const p=probe.copy(camera.position);p[axis]+=d[axis];if(!blocked(p))camera.position.copy(p)}if(zeroGravityEnabled&&microGravityEnabled&&
  (document.hidden||!document.hasFocus()||journalPanel.style.display!=='none'||!memoryLogPanel.hidden||trading)){
  microDrift=INITIAL_DRIFT;
}
if(zeroGravityEnabled&&microGravityEnabled&&!document.hidden&&document.hasFocus()&&journalPanel.style.display==='none'&&memoryLogPanel.hidden&&!trading){
  if(now>=microGravityIndicatorAt){
    microGravityIndicatorAt=now+250;
    const g=microGravityAt(microGravitySeed,[camera.position.x,camera.position.y,camera.position.z]);
    const strength=Math.hypot(...g);
    const directions=['+X','−X','+Y','−Y','+Z','−Z'];
    const dominant=Math.abs(g[0])>=Math.abs(g[1])&&Math.abs(g[0])>=Math.abs(g[2])
      ?(g[0]>=0?0:1):Math.abs(g[1])>=Math.abs(g[2])
      ?(g[1]>=0?2:3):(g[2]>=0?4:5);
    microGravityIndicator.textContent=strength<MICRO_GRAVITY_DIRECTION_THRESHOLD?'Micro G '+(strength/MICRO_GRAVITY_MAX*100).toFixed(0)+'% · Neutral':'Micro G '+(strength/MICRO_GRAVITY_MAX*100).toFixed(0)+'% '+directions[dominant];
  }
  const drift=microGravityDrift(microDrift,microGravitySeed,
    [camera.position.x,camera.position.y,camera.position.z],dt);
  const offset=drift.displacement;
  const velocity=[...drift.state.velocity] as [number,number,number];
  for(const axis of [0,1,2] as const){
    const name=(['x','y','z'] as const)[axis];
    if(offset[axis]===0)continue;
    const p=probe.copy(camera.position);
    p[name]+=offset[axis];
    if(!blocked(p))camera.position.copy(p);
    else velocity[axis]=0;
  }
  microDrift={velocity};
}
if(!zeroGravityEnabled){vy=Math.max(-8,vy-9.8*dt);const p=probe.copy(camera.position);p.y+=vy*dt;if(!blocked(p))camera.position.copy(p);else{let lo=0,hi=1;for(let i=0;i<8;i++){const mid=(lo+hi)/2;const test=probe.copy(camera.position);test.y+=vy*dt*mid;if(blocked(test))hi=mid;else lo=mid}camera.position.y+=vy*dt*lo;vy=0;}}if((held||keys.has(' '))&&now>next){dig();next=now+legendaryTool(selected,session.levels,session.crafted,world.profile.version===3?world.profile.legendary:undefined).interval}if(now>=hudAt){hudAt=now+150;checkCave();hud.textContent='DIG '+shape.id+' · Removed '+count+' · Depth '+Math.max(0,H*S-camera.position.y+1.6).toFixed(1)+'m'+(zeroGravityEnabled?' · Machine '+(drive.emergency?'Cruise':'Boost')+' · Dust '+propulsion.dust.toFixed(0)+(microGravityEnabled?' · Micro G':''):'')+saveStatus+notice;}miningMachineView.update(zeroGravityEnabled&&(autoMineEnabled||d.lengthSq()>0||verticalTouch!==0||keys.has('e')||keys.has('q')),zeroGravityEnabled&&!drive.emergency,now/1000);const light=lighting(Math.max(0,H*S-camera.position.y+1.6));debris.update(dt);viewTool.update(dt);const atmosphere=caveAtmosphere(H*S-camera.position.y+1.6);fill.intensity=atmosphere.fill;lamp.intensity=atmosphere.lampIntensity;lamp.distance=13*craftEffects(session.crafted).lamp;ambient.intensity=light.ambient;sun.intensity=light.sun;const underground=atmosphere.blend;const fog=scene.fog as T.FogExp2;fog.density=atmosphere.fogDensity;fog.color.setRGB(.42*(1-underground)+.045*underground,.57*(1-underground)+.035*underground,.62*(1-underground)+.055*underground);(scene.background as T.Color).copy(fog.color);renderer.render(scene,camera);if(profiling){metrics.frames++;if(metrics.frames%30===1)hud.setAttribute('data-perf',JSON.stringify({...metrics,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,pixelRatio:renderer.getPixelRatio()}))}}requestAnimationFrame(frame);
window.addEventListener('touchcancel',()=>{resetJoy();look=-1;held=false;digId=-1;keys.clear()},{capture:true,passive:true});
document.addEventListener('visibilitychange',()=>{quality.reset();last=performance.now();if(document.hidden){discoveryBanner.hidden=true;gain.hidden=true;impactPower=0;suspendAudio();keys.clear();resetJoy();look=-1;held=false;digId=-1}});
addEventListener('resize',()=>{resetJoy();look=-1;held=false;digId=-1;keys.clear();camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();quality=new AdaptiveQuality(renderCeiling(innerWidth,innerHeight,devicePixelRatio,mobile));renderer.setPixelRatio(quality.scale);renderer.setSize(innerWidth,innerHeight)});

function checkCave(){if(world.profile.worldgen!==1||saving||trading)return;const p=camera.position,id=enteredCave(shape.id,p.x/S-.5,(p.y-.8)/S-.5,p.z/S-.5,world.profile.journal??[]);if(!id)return;trading=true;const claim=()=>{if(world.claim(id)==='saved'){notice=' · Cave discovered';refreshJournal();showDiscovery(id);uiSound('confirm')}};void (async()=>{try{if(navigator.locks)await navigator.locks.request(SAVE,claim);else claim()}catch{notice=' · Discovery save failed'}finally{trading=false}})()}
const journalButton=document.createElement('button');journalButton.id='journal-toggle';journalButton.textContent='Journal';journalButton.style.cssText='position:fixed;left:max(12px,env(safe-area-inset-left));top:206px;z-index:3;min-height:44px';const journalPanel=document.createElement('div');journalPanel.id='journal-panel';journalPanel.style.cssText='position:fixed;left:12px;top:60px;max-height:65vh;overflow:auto;z-index:6;background:#202522;color:white;padding:12px;border-radius:8px;display:none';document.body.append(journalButton,journalPanel);
function refreshJournal(){journalPanel.replaceChildren();const close=document.createElement('button');close.textContent='Close';close.onclick=()=>journalPanel.style.display='none';journalPanel.append(close);const p=journalProgress(world.profile.journal??[]);const title=document.createElement('h3');title.textContent=world.profile.worldgen===1?'Exploration '+p.found+' / '+p.total:'Expedition';journalPanel.append(title);for(const c of world.profile.worldgen===1?p.categories:[]){const line=document.createElement('p');line.textContent=c.category+' '+c.found+' / '+c.total;journalPanel.append(line)}const heading=document.createElement('h3');heading.textContent='Objectives';journalPanel.append(heading);for(const goal of objectives(world.profile.version===3?{...world.profile,version:2,mines:world.profile.mines.slice(0,3)}:world.profile)){const line=document.createElement('div');line.textContent=(goal.current>=goal.target?'✓ ':'')+goal.label+' · '+goal.current+' / '+goal.target;const progress=document.createElement('progress');progress.max=goal.target;progress.value=goal.current;progress.setAttribute('aria-label',goal.label);progress.style.cssText='display:block;width:100%;height:10px;margin:4px 0 8px';journalPanel.append(line,progress)}}
journalButton.onclick=()=>{if(journalPanel.style.display==='block'){journalPanel.style.display='none';return}document.querySelector('#mine-menu')?.remove();craftPanel.style.display='none';refreshJournal();journalPanel.style.display='block'};journalButton.hidden=false;const compactJournal=()=>{journalButton.style.top=innerHeight<=340?'196px':'206px';journalButton.style.left=innerHeight<=450?'max(138px,calc(env(safe-area-inset-left) + 126px))':'max(12px,env(safe-area-inset-left))'};compactJournal();addEventListener('resize',compactJournal);
const travelButton=document.createElement('button');travelButton.id='travel-toggle';travelButton.textContent='Mine '+shape.id;travelButton.style.cssText='position:fixed;left:12px;top:134px;z-index:3';document.body.append(travelButton);travelButton.onclick=()=>{const existing=document.querySelector('#mine-menu');if(existing){existing.remove();return}craftPanel.style.display='none';const panel=document.createElement('div');panel.id='mine-menu';panel.style.cssText='position:fixed;left:12px;top:134px;background:#222;padding:8px;z-index:5';document.body.append(panel);const close=document.createElement('button');close.textContent='Close';close.onclick=()=>panel.remove();panel.append(close);for(const m of [...mines,expansionMine]){const button=document.createElement('button');const p=world.profile;const goal=m.id===4?{current:p.mines[2].length,target:39322}:objectives({...p,version:2,mines:p.mines.slice(0,3)})[m.id-2];const allowed=expandedUnlocked(p.version===3?p:openExpansionPreview(JSON.stringify(p)),m.id);button.textContent='Mine '+m.id+(allowed?'':goal?' · '+goal.current+'/'+goal.target:' (locked)');button.disabled=m.id===shape.id||!allowed;button.onclick=async()=>{if(saving||trading)return;if(camera.position.y<H*S+1.4){notice=' · Return to surface to travel';return}trading=true;try{let result='failed';const move=()=>{if(session.write(data)==='saved')result=world.move(m.id,true)};if(navigator.locks)await navigator.locks.request(SAVE,move);else move();if(result==='saved')location.reload();else notice=' · Travel '+result}finally{trading=false}};panel.append(button)}};

}
void boot().catch(()=>{const hud=document.querySelector('#hud');if(hud)hud.textContent='Save protected — reload after checking browser storage'});
