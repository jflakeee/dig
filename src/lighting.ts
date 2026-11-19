export function lighting(depth:number){const t=Math.max(0,Math.min(1,depth/6));const shade=t*t*(3-2*t);return {ambient:2-1.85*shade,sun:2-1.95*shade}}

export function caveAtmosphere(depth:number){const t=Math.max(0,Math.min(1,depth/7));const blend=t*t*(3-2*t);return {blend,fogDensity:.018+.022*blend,fill:1.1*blend,lampIntensity:35+8*blend}}
