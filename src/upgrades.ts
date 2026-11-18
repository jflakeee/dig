import {tools,toolAt} from './tools.ts';
export type Levels=[number,number,number];
export const initialLevels=():Levels=>[0,0,0];
export function cost(i:number,level:number){return [40,75,120][i]*(level+1)}
export function spent(levels:Levels){return levels.reduce((sum,n,i)=>sum+[40,75,120][i]*n*(n+1)/2,0)}
export function validateLevels(v:unknown,budget:number):Levels{if(!Array.isArray(v)||v.length!==3||!v.every(n=>Number.isInteger(n)&&n>=0&&n<=5))throw Error('Invalid levels');const l=[...v] as Levels;if(spent(l)>budget)throw Error('Insufficient gold');return l}
export function upgrade(levels:Levels,i:number,budget:number):Levels|null{if(!Number.isInteger(i)||i<0||i>=3||levels[i]>=5||budget-spent(levels)<cost(i,levels[i]))return null;const l=[...levels] as Levels;l[i]++;return l}
export function upgradedTool(i:number,levels:Levels){const t=toolAt(i),n=levels[tools.indexOf(t)];return {...t,radius:t.radius*(1+n*.08),interval:Math.round(t.interval*(1-n*.06))}}
