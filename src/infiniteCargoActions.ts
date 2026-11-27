import type {Mineral,Stock} from './infiniteDrillEconomy.ts';
export type DiscardAmount=1|10|'all';
export function discardMinerals(stock:Stock,mineral:Mineral,amount:DiscardAmount):Stock|null{
 if(!['stone','copper','iron','crystal'].includes(mineral)||
 !Object.values(stock).every(n=>Number.isSafeInteger(n)&&n>=0)||
 (amount!==1&&amount!==10&&amount!=='all')||stock[mineral]===0)return null;
 const count=amount==='all'?stock[mineral]:Math.min(stock[mineral],amount);
 return {...stock,[mineral]:stock[mineral]-count};
}
