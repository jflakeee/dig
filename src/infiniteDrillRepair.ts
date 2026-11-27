import {DRILLS,MINERALS,type DrillState,type Stock} from './infiniteDrillEconomy.ts';
export const REPAIR_COST:readonly Stock[]=[
 {stone:6,copper:0,iron:0,crystal:0},
 {stone:8,copper:3,iron:0,crystal:0},
 {stone:10,copper:4,iron:3,crystal:0},
 {stone:12,copper:5,iron:5,crystal:2},
];
/** One repair restores 50% of max durability (capped at max). */
export function repairDrill(stock:Stock,drill:DrillState):{stock:Stock;drill:DrillState}|null{
 const tier=drill?.tier;
 if(!Number.isInteger(tier)||tier<0||tier>=DRILLS.length||
 !Number.isInteger(drill.durability)||drill.durability<0||drill.durability>=DRILLS[tier].durability||
 !MINERALS.every(m=>Number.isSafeInteger(stock[m])&&stock[m]>=0&&stock[m]>=REPAIR_COST[tier][m]))return null;
 const next={...stock};
 for(const mineral of MINERALS)next[mineral]-=REPAIR_COST[tier][mineral];
 return {stock:next,drill:{tier,durability:Math.min(DRILLS[tier].durability,drill.durability+Math.ceil(DRILLS[tier].durability/2))}};
}
