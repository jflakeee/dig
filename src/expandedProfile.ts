import {parseProfile,type Profile} from './mineProfile.ts';
export const expansionMine={id:4,n:64,h:48,unlockFraction:.20} as const;
export type ExpandedProfile=Omit<Profile,'version'>&{version:3;legendary?:import('./legendary.ts').LegendaryState};
export function prepareExpansion(raw:string):ExpandedProfile{
 const old=parseProfile(raw);
 return {...old,version:3,mines:[...old.mines,[]]};
}
export function parseExpandedProfile(raw:string):ExpandedProfile{
 const p=JSON.parse(raw);
 if(p?.version!==3||!Array.isArray(p.mines)||p.mines.length!==4||!Number.isInteger(p.active)||p.active<1||p.active>4)throw Error('Invalid expanded profile');
 const fourth=p.mines[3],size=expansionMine.n**2*expansionMine.h;
 if(!Array.isArray(fourth)||!fourth.every((v:unknown)=>typeof v==='number'&&Number.isInteger(v)&&v>=0&&v<size)||new Set(fourth).size!==fourth.length)throw Error('Invalid fourth mine');
 const old=parseProfile(JSON.stringify({...p,version:2,active:Math.min(p.active,3),mines:p.mines.slice(0,3)}));
 const unlocked=old.mines[0].length>=2458&&old.mines[1].length>=12442&&old.mines[2].length>=Math.ceil(64**2*48*expansionMine.unlockFraction);
 if((p.active===4||fourth.length>0)&&!unlocked)throw Error('Locked fourth mine');
 return p;
}
