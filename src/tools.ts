export const tools=[
 {id:'shovel',name:'Shovel',radius:.85,reach:5,interval:180},
 {id:'pickaxe',name:'Pickaxe',radius:1.05,reach:4,interval:350},
 {id:'drill',name:'Drill',radius:.65,reach:4.5,interval:90}
] as const;
export function toolAt(i:number){return tools[Number.isInteger(i)&&i>=0&&i<tools.length?i:0]}
