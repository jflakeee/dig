import {prepareExpansion,parseExpandedProfile,expansionMine,type ExpandedProfile} from './expandedProfile.ts';
import {volcanicTerrain,volcanicMask} from './volcanicTerrain.ts';
import {terrainFor,unlocked} from './expedition.ts';
import {parseProfile} from './mineProfile.ts';
function legacyView(p:ExpandedProfile){return parseProfile(JSON.stringify({...p,version:2,active:Math.min(p.active,3),mines:p.mines.slice(0,3)}))}
export function openExpansionPreview(raw:string){const p=JSON.parse(raw)?.version===3?parseExpandedProfile(raw):prepareExpansion(raw);const mask=volcanicMask();if(p.mines[3].some(i=>mask[i]))throw Error('Natural volcanic void in excavation');return p}
export function expandedUnlocked(p:ExpandedProfile,id:number){const old=legacyView(p);if(id!==4)return unlocked(old,id);return unlocked(old,3)&&old.mines[2].length>=Math.ceil(expansionMine.n**2*expansionMine.h*expansionMine.unlockFraction)}
export function expandedTerrain(p:ExpandedProfile,id:number){if(!expandedUnlocked(p,id))throw Error('Locked mine');return id===4?volcanicTerrain(p):terrainFor(legacyView(p),id)}
export function expandedTravel(p:ExpandedProfile,id:number,onSurface:boolean):ExpandedProfile|null{return onSurface&&expandedUnlocked(p,id)?{...p,active:id}:null}
