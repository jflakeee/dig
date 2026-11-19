import {mines,parseProfile,PROFILE,type Profile} from './mineProfile.ts';
import {SAVE,type Store} from './save.ts';
export const unlockThresholds=[0,.1,.15] as const;
export function unlocked(p:Profile,id:number){if(!Number.isInteger(id)||id<1||id>3)return false;for(let i=1;i<id;i++){const m=mines[i-1];if(p.mines[i-1].length<Math.ceil(m.n*m.n*m.h*unlockThresholds[i]))return false}return true}
export function terrainFor(p:Profile,id:number){const m=mines[id-1];if(!m)throw Error('Unknown mine');const data=new Uint8Array(m.n*m.n*m.h).fill(1);for(const i of p.mines[id-1])data[i]=0;return data}
export function travel(p:Profile,id:number,onSurface:boolean):Profile|null{return onSurface&&unlocked(p,id)?{...p,active:id}:null}
export function writeExpedition(store:Store,baseline:string,next:Profile){
 try{const old=parseProfile(baseline);const raw=JSON.stringify(next);const valid=parseProfile(raw);if(valid.legacy!==old.legacy||store.getItem(SAVE)!==old.legacy||store.getItem(PROFILE)!==baseline)return 'conflict';if(!unlocked(valid,valid.active))return 'failed';for(let i=0;i<3;i++){const indices=new Set(valid.mines[i]);if(old.mines[i].some(n=>!indices.has(n))||(!unlocked(valid,i+1)&&indices.size))return 'failed'}store.setItem(PROFILE,raw);return 'saved'}catch{return 'failed'}
}
