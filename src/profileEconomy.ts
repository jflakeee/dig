import {discoveryGold} from './journal.ts';
import {parseProfile,type Profile,PROFILE} from './mineProfile.ts';
import {expandedInventory,profileInventory} from './mineOres.ts';
import {openSave,SAVE,type Store} from './save.ts';
import {emptyInventory,type Inventory} from './inventory.ts';
import {initialLevels,validateLevels,type Levels} from './upgrades.ts';
import {initialCrafted,validateCrafted,type Crafted} from './crafting.ts';
import {oreKeys,wallet} from './economy.ts';
export type Ledger={sold:Inventory;levels:Levels;crafted:Crafted};
export type UnifiedProfile=Profile&{ledger?:Ledger};
export function ledgerFor(p:UnifiedProfile|(import('./expandedProfile.ts').ExpandedProfile&{ledger?:Ledger})):Ledger{
 const old=openSave({getItem:()=>p.legacy,setItem:()=>{throw Error('Read only')}});
 if(!old.readable)throw Error('Invalid legacy');
 const l=p.ledger??{sold:old.sold,levels:old.levels,crafted:old.crafted},total=p.version===3?expandedInventory(p):profileInventory(p),sold=emptyInventory();
 for(const k of oreKeys){const n=l.sold[k];if(!Number.isSafeInteger(n)||n<old.sold[k]||n>total[k])throw Error('Invalid sold');sold[k]=n}
 const levels=validateLevels(l.levels,wallet(sold)+discoveryGold(p.journal??[])),crafted=validateCrafted(l.crafted,total,sold);
 if(levels.some((n,i)=>n<old.levels[i])||crafted.some((n,i)=>n<old.crafted[i]))throw Error('Legacy regression');
 return {sold,levels,crafted};
}
export function writeLedger(store:Store,baseline:string,ledger:Ledger,legacySource:string|null){
 try{if(store.getItem(PROFILE)!==baseline||store.getItem(SAVE)!==legacySource)return 'conflict';const p=parseProfile(baseline) as UnifiedProfile,old=ledgerFor(p),next={...p,ledger},valid=ledgerFor(next);
 if(oreKeys.some(k=>valid.sold[k]<old.sold[k])||valid.levels.some((n,i)=>n<old.levels[i])||valid.crafted.some((n,i)=>n<old.crafted[i]))return 'failed';
 store.setItem(PROFILE,JSON.stringify({...next,ledger:valid}));return 'saved'}catch{return 'failed'}
}
