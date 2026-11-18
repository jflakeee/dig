export function terrainTint(x:number,y:number,z:number){
 const wave=Math.sin(x*2.1+Math.sin(z*1.7))*Math.cos(z*2.4+y*.8);
 const grain=Math.sin(x*19.7+y*31.3+z*17.1);
 const depth=12-y;
 const layer=depth<.25?'grass':depth<2.8+wave*.45?'soil':depth<6.5+wave*.7?'clay':'rock';
 return {layer,tint:1+.09*wave+.045*grain+.035*Math.sin(y*13+x*.4)} as const;
}
