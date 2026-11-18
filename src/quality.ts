export class AdaptiveQuality{
 scale:number;private elapsed=0;private frames=0;private slow=0;private fast=0;
 readonly ceiling:number;
 constructor(ceiling:number){this.ceiling=ceiling;this.scale=ceiling}
 sample(ms:number){if(!Number.isFinite(ms)||ms<=0||ms>250){this.reset();return false}this.elapsed+=ms;this.frames++;if(this.elapsed<1500)return false;const fps=this.frames*1000/this.elapsed;this.elapsed=0;this.frames=0;this.slow=fps<28?this.slow+1:0;this.fast=fps>52?this.fast+1:0;const old=this.scale;if(this.slow>=2){this.scale=Math.max(Math.min(.65,this.ceiling),this.scale-.15);this.slow=0}if(this.fast>=4){this.scale=Math.min(this.ceiling,this.scale+.1);this.fast=0}return old!==this.scale}
 reset(){this.elapsed=0;this.frames=0;this.slow=0;this.fast=0}
}
