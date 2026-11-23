import {DROP_KINDS,type EquipmentDrop} from './infiniteEquipmentDrops.ts';
import {DRILLS,MINERALS,type DrillState,type DrillTier,type Stock} from './infiniteDrillEconomy.ts';
import {MAX_ENGINE,MAX_WAGONS,cargoCapacity,cargoAmount} from './infiniteCargoTrain.ts';

export type MachineState={
  stock:Stock;drill:DrillState;drillCount:number;drillRange:number;
  wagons:number;engineLevel:number;queue:DrillState[];
  crafting:{tier:DrillTier;readyAt:number;paid:boolean}|null;
  collected?:number;
  foundEquipment?:EquipmentDrop[];
};
export const MACHINE_SAVE_KEY='dig:infinite-preview:machine:v1';
const validDrill=(v:any):v is DrillState=>
  !!v&&Number.isInteger(v.tier)&&v.tier>=0&&v.tier<DRILLS.length&&
  Number.isInteger(v.durability)&&v.durability>=0&&v.durability<=DRILLS[v.tier as DrillTier].durability;
export function loadMachine(storage:Pick<Storage,'getItem'>,seed:number,now:number):MachineState|null{
  try{
    const raw=storage.getItem(MACHINE_SAVE_KEY);
    if(!raw)return null;
    const value=JSON.parse(raw);
    if(value?.version!==1||value.seed!==seed)return null;
    const state=value.state as MachineState;
    if(!state||!validDrill(state.drill)||!Array.isArray(state.queue)||state.queue.length>64||
      !state.queue.every(validDrill))return null;
    if(!state.stock||!MINERALS.every(m=>Number.isSafeInteger(state.stock[m])&&state.stock[m]>=0))return null;
    if(!Number.isInteger(state.wagons)||state.wagons<1||state.wagons>MAX_WAGONS||
      cargoAmount(state.stock)>cargoCapacity(state.wagons))return null;
    if(!Number.isInteger(state.engineLevel)||state.engineLevel<0||state.engineLevel>MAX_ENGINE||
      !Number.isInteger(state.drillCount)||state.drillCount<1||state.drillCount>4||
      !Number.isInteger(state.drillRange)||state.drillRange<0||state.drillRange>3)return null;
    if(state.collected!==undefined&&(!Number.isSafeInteger(state.collected)||state.collected<0))return null;
    if(state.foundEquipment!==undefined&&(!Array.isArray(state.foundEquipment)||state.foundEquipment.length>1000||!state.foundEquipment.every(e=>e&&DROP_KINDS.includes(e.kind)&&e.kind!=='mineral-pile'&&Number.isInteger(e.tier)&&e.tier>=0&&e.tier<DRILLS.length&&Number.isInteger(e.maxDurability)&&e.maxDurability===(e.kind==='drill'?DRILLS[e.tier as DrillTier].durability:100)&&Number.isInteger(e.durability)&&e.durability>=1&&e.durability<=e.maxDurability)))return null;
    const job=state.crafting;
    if(job!==null&&(!job||!Number.isInteger(job.tier)||job.tier<0||job.tier>=DRILLS.length||
      typeof job.paid!=='boolean'||!Number.isFinite(job.readyAt)))return null;
    // Persist remaining crafting duration, never an old performance.now() absolute timestamp.
    return {...state,collected:state.collected??0,foundEquipment:state.foundEquipment?.map(e=>({...e}))??[],stock:{...state.stock},drill:{...state.drill},queue:state.queue.map(d=>({...d})),
      crafting:job?{...job,readyAt:now+Math.max(0,Math.min(DRILLS[job.tier].craftMs,job.readyAt))}:null};
  }catch{return null}
}
export function saveMachine(storage:Pick<Storage,'setItem'>,seed:number,state:MachineState,now:number):void{
  const job=state.crafting;
  const snapshot={...state,crafting:job?{...job,readyAt:Math.max(0,job.readyAt-now)}:null};
  storage.setItem(MACHINE_SAVE_KEY,JSON.stringify({version:1,seed,state:snapshot}));
}
