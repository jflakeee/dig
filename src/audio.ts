import {play,preload,muted,stopAll} from 'plinkfx';
const profiles={shovel:{name:'hit',volume:.22,rate:.8,cooldown:.15},pickaxe:{name:'hit-heavy',volume:.28,rate:1.05,cooldown:.25},drill:{name:'ratchet',volume:.16,rate:1.5,cooldown:.08}} as const;
export function digSound(id:keyof typeof profiles){const {name,...options}=profiles[id];play(name,{...options,voices:2})}
export function uiSound(kind:'click'|'confirm'|'error'|'toggle-on'){play(kind,{volume:.16,voices:1})}
export function prepareAudio(){preload(['hit','hit-heavy','ratchet','click','confirm','error','toggle-on']);try{muted(localStorage.getItem('dig-muted')==='1')}catch{}}
export function toggleMute(){const off=!muted();muted(off);if(off)stopAll();try{localStorage.setItem('dig-muted',off?'1':'0')}catch{}return off}
export function suspendAudio(){stopAll()}

export function rareSound(){play('confirm',{volume:.33,rate:1.3,voices:1})}
