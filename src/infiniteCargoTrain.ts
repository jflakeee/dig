import type {Stock} from './infiniteDrillEconomy.ts';
export const MAX_WAGONS=8;
export const MAX_ENGINE=5;
export const WAGON_CAPACITY=40;
export function cargoAmount(stock:Stock):number{return stock.stone+stock.copper+stock.iron+stock.crystal}
export function cargoCapacity(wagons:number):number{
  if(!Number.isInteger(wagons)||wagons<1||wagons>MAX_WAGONS)throw Error('Invalid wagon count');
  return wagons*WAGON_CAPACITY;
}
export function wagonCost(next:number):Stock{
  if(!Number.isInteger(next)||next<2||next>MAX_WAGONS)throw Error('Invalid wagon level');
  return {stone:next*10,copper:next*4,iron:Math.max(0,next-2)*3,crystal:0};
}
export function engineCost(next:number):Stock{
  if(!Number.isInteger(next)||next<1||next>MAX_ENGINE)throw Error('Invalid engine level');
  return {stone:next*8,copper:next*8,iron:next*5,crystal:Math.max(0,next-2)*2};
}
export function cargoSpeed(stock:Stock,wagons:number,engine:number):number{
  if(!Number.isInteger(engine)||engine<0||engine>MAX_ENGINE)throw Error('Invalid engine level');
  const load=cargoAmount(stock);
  const capacity=cargoCapacity(wagons);
  const loadRatio=Math.min(1,load/capacity);
  const base=4+engine*1.25;
  return Math.max(1.1,base*(1-.65*loadRatio));
}
export function canStore(stock:Stock,wagons:number):boolean{
  return cargoAmount(stock)<cargoCapacity(wagons);
}
