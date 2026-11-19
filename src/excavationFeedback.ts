import {ores,type Ore} from './ores.ts';
export function excavationFeedback(removed:number,counts:Partial<Record<Ore,number>>){if(removed<=0)return null;const found=(Object.keys(ores) as Ore[]).reverse().filter(k=>(counts[k]??0)>0);return {text:found.length?found.map(k=>`+${counts[k]} ${k}`).join(' · '):`Dug ${removed} blocks`,rare:found.includes('gem')||found.includes('gold')};}
