import * as T from 'three';
import type {Ore} from './ores';
export function glowStrength(ore:Ore|null){return ore==='gem'?.75:ore==='gold'?.24:ore==='iron'?.035:0}
export function installOreGlow(mat:T.MeshStandardMaterial){
 mat.onBeforeCompile=shader=>{
 shader.vertexShader='attribute vec3 oreGlow; varying vec3 vOreGlow; varying vec3 vDigPosition;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvOreGlow = oreGlow; vDigPosition = position;');
 shader.fragmentShader='varying vec3 vOreGlow; varying vec3 vDigPosition;\n'+shader.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\nfloat grain = sin(dot(vDigPosition, vec3(37.1, 53.7, 29.3))) * sin(dot(vDigPosition, vec3(19.7, -31.1, 41.3)));\nfloat strata = sin(vDigPosition.y * 18.0 + sin(vDigPosition.x * 1.7 + vDigPosition.z * 2.1) * 1.3);\nfloat detail = 1.0 - smoothstep(0.015, 0.09, length(fwidth(vDigPosition)));\ndiffuseColor.rgb *= 1.0 + detail * (0.075 * grain + 0.055 * strata);').replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ntotalEmissiveRadiance += vOreGlow;');
 };
 mat.customProgramCacheKey=()=> 'dig-ore-glow-terrain-v2';
}
