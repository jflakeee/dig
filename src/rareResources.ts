import {veinHash} from './veins.ts';
import {volcanicMask} from './volcanicTerrain.ts';
export const rareKinds=['obsidian-heart','ember-crystal','ancient-core'] as const;
export function rareAt(i:number){if(!Number.isInteger(i)||i<0||i>=196608)return null;const r=veinHash(91473,i%64,Math.floor(i/4096),Math.floor(i/64)%64);return r<.0001?rareKinds[2]:r<.0006?rareKinds[1]:r<.0026?rareKinds[0]:null}
export function rareDistribution(){const mask=volcanicMask(),counts={[rareKinds[0]]:0,[rareKinds[1]]:0,[rareKinds[2]]:0};let solid=0;for(let i=0;i<mask.length;i++){if(mask[i])continue;solid++;const k=rareAt(i);if(k)counts[k]++}return {solid,counts,value:counts[rareKinds[0]]*150+counts[rareKinds[1]]*500+counts[rareKinds[2]]*2000}}

export function rareInventory(indices:readonly number[]){const mask=volcanicMask(),counts={'obsidian-heart':0,'ember-crystal':0,'ancient-core':0};for(const i of new Set(indices)){if(mask[i])continue;const k=rareAt(i);if(k)counts[k]++}return counts}
