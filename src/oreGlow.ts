import * as T from 'three';
import type {Ore} from './ores';
export function glowStrength(ore:Ore|null){return ore==='gem'?.75:ore==='gold'?.24:ore==='iron'?.035:0}
export function installOreGlow(mat:T.MeshStandardMaterial){
 mat.onBeforeCompile=shader=>{
 shader.vertexShader='attribute vec3 oreGlow; varying vec3 vOreGlow;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvOreGlow = oreGlow;');
 shader.fragmentShader='varying vec3 vOreGlow;\n'+shader.fragmentShader.replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ntotalEmissiveRadiance += vOreGlow;');
 };
 mat.customProgramCacheKey=()=> 'dig-ore-glow-v1';
}
