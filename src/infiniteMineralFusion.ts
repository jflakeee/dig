import type {Mineral,Stock} from './infiniteDrillEconomy.ts';
export type FusionRecipe={from:Mineral;to:Mineral;cost:number;chance:number};
export const FUSION_RECIPES:readonly FusionRecipe[]=[
 {from:'stone',to:'copper',cost:10,chance:.6},
 {from:'copper',to:'iron',cost:8,chance:.4},
 {from:'iron',to:'crystal',cost:6,chance:.25},
];
export function fuseMinerals(stock:Stock,recipe:FusionRecipe,roll:number):{stock:Stock;success:boolean}|null{
 if(!FUSION_RECIPES.includes(recipe)||!Number.isFinite(roll)||roll<0||roll>=1||
 !Number.isSafeInteger(stock[recipe.from])||stock[recipe.from]<recipe.cost||
 !Number.isSafeInteger(stock[recipe.to])||stock[recipe.to]<0||
 stock[recipe.to]>=Number.MAX_SAFE_INTEGER)return null;
 const next={...stock,[recipe.from]:stock[recipe.from]-recipe.cost};
 const success=roll<recipe.chance;
 if(success)next[recipe.to]++;
 return {stock:next,success};
}
