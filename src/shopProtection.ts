/** Pure geometry guard; call at the voxel-removal commit point. */
export type ProtectedArea = {x:number;z:number;radius:number};
export const SHOP_SAFE_RADIUS_METRES=10;
/** Nearest-point AABB/circle overlap; touching the boundary is protected. */
export function overlapsProtectedArea(x:number,z:number,size:number,area:ProtectedArea):boolean{
 if(!Number.isFinite(x)||!Number.isFinite(z)||!Number.isFinite(size)||size<=0||!Number.isFinite(area.radius)||area.radius<0)throw Error('Invalid protection geometry');
 const nearestX=Math.max(x,Math.min(area.x,x+size));
 const nearestZ=Math.max(z,Math.min(area.z,z+size));
 return (nearestX-area.x)**2+(nearestZ-area.z)**2<=area.radius**2;
}
/** Existing 16m mine: shop is located on the outside platform at z=-2. */
export function legacyShopAreas(mineWidthMetres:number):ProtectedArea[]{
 return [{x:mineWidthMetres*.25,z:-2,radius:1.75},{x:mineWidthMetres*.75,z:-2,radius:1.75}];
}
export function isProtectedVoxel(x:number,z:number,size:number,areas:readonly ProtectedArea[]):boolean{
 return areas.some(area=>overlapsProtectedArea(x,z,size,area));
}
export function chunkCoordinate(worldMetres:number,chunkSizeMetres=16):number{
 if(!Number.isFinite(worldMetres)||!Number.isFinite(chunkSizeMetres)||chunkSizeMetres<=0)throw Error('Invalid chunk coordinate');
 return Math.floor(worldMetres/chunkSizeMetres);
}
export function chunkKey(x:number,z:number,chunkSizeMetres=16):string{
 return chunkCoordinate(x,chunkSizeMetres)+','+chunkCoordinate(z,chunkSizeMetres);
}
