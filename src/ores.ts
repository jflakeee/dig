import {N,H,S} from './terrain.ts';
export const ores={coal:{color:0x29292b,value:2},copper:{color:0xc77b46,value:5},iron:{color:0xaeb9bd,value:9},gold:{color:0xf4c744,value:25},gem:{color:0x46cde4,value:80}} as const;
export type Ore=keyof typeof ores;
function hash(x:number,y:number,z:number){let h=Math.imul(x+71,73856093)^Math.imul(y+37,19349663)^Math.imul(z+11,83492791);h=Math.imul(h^(h>>>16),0x45d9f3b);return ((h^(h>>>16))>>>0)/4294967296}
export function oreAt(x:number,y:number,z:number):Ore|null{
 if(!Number.isInteger(x)||!Number.isInteger(y)||!Number.isInteger(z)||x<0||x>=N||y<0||y>=H||z<0||z>=N)return null;
 const d=(H-y-.5)*S,r=hash(x,y,z);
 if(d>=8&&r<.008)return 'gem';
 if(d>=6&&r<.03)return 'gold';
 if(d>=4&&r<.075)return 'iron';
 if(d>=2&&r<.13)return 'copper';
 if(d>=1&&r<.2)return 'coal';
 return null;
}
