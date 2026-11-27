(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=t(a);fetch(a.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ds="179",ic=0,Bs=1,ac=2,tl=1,rc=2,nn=3,mn=0,St=1,an=2,fn=0,ii=1,zs=2,ks=3,Gs=4,sc=5,An=100,oc=101,lc=102,cc=103,hc=104,dc=200,uc=201,fc=202,pc=203,gr=204,_r=205,mc=206,vc=207,gc=208,_c=209,xc=210,yc=211,wc=212,Mc=213,Sc=214,xr=0,yr=1,wr=2,si=3,Mr=4,Sr=5,br=6,Er=7,nl=0,bc=1,Ec=2,pn=0,Tc=1,Ac=2,Rc=3,Cc=4,Pc=5,Dc=6,Lc=7,il=300,oi=301,li=302,Tr=303,Ar=304,Da=306,Rr=1e3,Cn=1001,Cr=1002,Ct=1003,Uc=1004,Wi=1005,Vt=1006,Oa=1007,Pn=1008,Yt=1009,al=1010,rl=1011,Li=1012,us=1013,Dn=1014,Wt=1015,zi=1016,fs=1017,ps=1018,Ui=1020,sl=35902,ol=1021,ll=1022,Bt=1023,Ii=1026,Ni=1027,ms=1028,vs=1029,cl=1030,gs=1031,_s=1033,ya=33776,wa=33777,Ma=33778,Sa=33779,Pr=35840,Dr=35841,Lr=35842,Ur=35843,Ir=36196,Nr=37492,Fr=37496,Or=37808,qr=37809,Br=37810,zr=37811,kr=37812,Gr=37813,Hr=37814,Vr=37815,Wr=37816,Xr=37817,Yr=37818,Zr=37819,Jr=37820,Kr=37821,ba=36492,$r=36494,jr=36495,hl=36283,Qr=36284,es=36285,ts=36286,Ic=3200,Nc=3201,dl=0,Fc=1,un="",Ut="srgb",ci="srgb-linear",Ta="linear",et="srgb",On=7680,Hs=519,Oc=512,qc=513,Bc=514,ul=515,zc=516,kc=517,Gc=518,Hc=519,Vs=35044,E3=35048,Ws="300 es",Xt=2e3,Aa=2001;class fi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const a=n[e];if(a!==void 0){const r=a.indexOf(t);r!==-1&&a.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const a=n.slice(0);for(let r=0,s=a.length;r<s;r++)a[r].call(this,e);e.target=null}}}const vt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Xs=1234567;const Ri=Math.PI/180,hi=180/Math.PI;function In(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(vt[i&255]+vt[i>>8&255]+vt[i>>16&255]+vt[i>>24&255]+"-"+vt[e&255]+vt[e>>8&255]+"-"+vt[e>>16&15|64]+vt[e>>24&255]+"-"+vt[t&63|128]+vt[t>>8&255]+"-"+vt[t>>16&255]+vt[t>>24&255]+vt[n&255]+vt[n>>8&255]+vt[n>>16&255]+vt[n>>24&255]).toLowerCase()}function Ye(i,e,t){return Math.max(e,Math.min(t,i))}function xs(i,e){return(i%e+e)%e}function Vc(i,e,t,n,a){return n+(i-e)*(a-n)/(t-e)}function Wc(i,e,t){return i!==e?(t-i)/(e-i):0}function Ci(i,e,t){return(1-t)*i+t*e}function Xc(i,e,t,n){return Ci(i,e,1-Math.exp(-t*n))}function Yc(i,e=1){return e-Math.abs(xs(i,e*2)-e)}function Zc(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Jc(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Kc(i,e){return i+Math.floor(Math.random()*(e-i+1))}function $c(i,e){return i+Math.random()*(e-i)}function jc(i){return i*(.5-Math.random())}function Qc(i){i!==void 0&&(Xs=i);let e=Xs+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function eh(i){return i*Ri}function th(i){return i*hi}function nh(i){return(i&i-1)===0&&i!==0}function ih(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function ah(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function rh(i,e,t,n,a){const r=Math.cos,s=Math.sin,o=r(t/2),l=s(t/2),c=r((e+n)/2),h=s((e+n)/2),d=r((e-n)/2),p=s((e-n)/2),f=r((n-e)/2),g=s((n-e)/2);switch(a){case"XYX":i.set(o*h,l*d,l*p,o*c);break;case"YZY":i.set(l*p,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*p,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+a)}}function Qn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function yt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const T3={DEG2RAD:Ri,RAD2DEG:hi,generateUUID:In,clamp:Ye,euclideanModulo:xs,mapLinear:Vc,inverseLerp:Wc,lerp:Ci,damp:Xc,pingpong:Yc,smoothstep:Zc,smootherstep:Jc,randInt:Kc,randFloat:$c,randFloatSpread:jc,seededRandom:Qc,degToRad:eh,radToDeg:th,isPowerOfTwo:nh,ceilPowerOfTwo:ih,floorPowerOfTwo:ah,setQuaternionFromProperEuler:rh,normalize:yt,denormalize:Qn};class pe{constructor(e=0,t=0){pe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,a=e.elements;return this.x=a[0]*t+a[3]*n+a[6],this.y=a[1]*t+a[4]*n+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ye(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),a=Math.sin(t),r=this.x-e.x,s=this.y-e.y;return this.x=r*n-s*a+e.x,this.y=r*a+s*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ki{constructor(e=0,t=0,n=0,a=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=a}static slerpFlat(e,t,n,a,r,s,o){let l=n[a+0],c=n[a+1],h=n[a+2],d=n[a+3];const p=r[s+0],f=r[s+1],g=r[s+2],w=r[s+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=p,e[t+1]=f,e[t+2]=g,e[t+3]=w;return}if(d!==w||l!==p||c!==f||h!==g){let m=1-o;const u=l*p+c*f+h*g+d*w,T=u>=0?1:-1,S=1-u*u;if(S>Number.EPSILON){const C=Math.sqrt(S),E=Math.atan2(C,u*T);m=Math.sin(m*E)/C,o=Math.sin(o*E)/C}const v=o*T;if(l=l*m+p*v,c=c*m+f*v,h=h*m+g*v,d=d*m+w*v,m===1-o){const C=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=C,c*=C,h*=C,d*=C}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,a,r,s){const o=n[a],l=n[a+1],c=n[a+2],h=n[a+3],d=r[s],p=r[s+1],f=r[s+2],g=r[s+3];return e[t]=o*g+h*d+l*f-c*p,e[t+1]=l*g+h*p+c*d-o*f,e[t+2]=c*g+h*f+o*p-l*d,e[t+3]=h*g-o*d-l*p-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,a){return this._x=e,this._y=t,this._z=n,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,a=e._y,r=e._z,s=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(a/2),d=o(r/2),p=l(n/2),f=l(a/2),g=l(r/2);switch(s){case"XYZ":this._x=p*h*d+c*f*g,this._y=c*f*d-p*h*g,this._z=c*h*g+p*f*d,this._w=c*h*d-p*f*g;break;case"YXZ":this._x=p*h*d+c*f*g,this._y=c*f*d-p*h*g,this._z=c*h*g-p*f*d,this._w=c*h*d+p*f*g;break;case"ZXY":this._x=p*h*d-c*f*g,this._y=c*f*d+p*h*g,this._z=c*h*g+p*f*d,this._w=c*h*d-p*f*g;break;case"ZYX":this._x=p*h*d-c*f*g,this._y=c*f*d+p*h*g,this._z=c*h*g-p*f*d,this._w=c*h*d+p*f*g;break;case"YZX":this._x=p*h*d+c*f*g,this._y=c*f*d+p*h*g,this._z=c*h*g-p*f*d,this._w=c*h*d-p*f*g;break;case"XZY":this._x=p*h*d-c*f*g,this._y=c*f*d-p*h*g,this._z=c*h*g+p*f*d,this._w=c*h*d+p*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,a=Math.sin(n);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],a=t[4],r=t[8],s=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],p=n+o+d;if(p>0){const f=.5/Math.sqrt(p+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(s-a)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(a+s)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(a+s)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(s-a)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const a=Math.min(1,t/n);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,a=e._y,r=e._z,s=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+s*o+a*c-r*l,this._y=a*h+s*l+r*o-n*c,this._z=r*h+s*c+n*l-a*o,this._w=s*h-n*o-a*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,a=this._y,r=this._z,s=this._w;let o=s*e._w+n*e._x+a*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=s,this._x=n,this._y=a,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*s+t*this._w,this._x=f*n+t*this._x,this._y=f*a+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-t)*h)/c,p=Math.sin(t*h)/c;return this._w=s*d+this._w*p,this._x=n*d+this._x*p,this._y=a*d+this._y*p,this._z=r*d+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),a=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(a*Math.sin(e),a*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,n=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ys.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ys.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,a=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*a,this.y=r[1]*t+r[4]*n+r[7]*a,this.z=r[2]*t+r[5]*n+r[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,a=this.z,r=e.elements,s=1/(r[3]*t+r[7]*n+r[11]*a+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*a+r[12])*s,this.y=(r[1]*t+r[5]*n+r[9]*a+r[13])*s,this.z=(r[2]*t+r[6]*n+r[10]*a+r[14])*s,this}applyQuaternion(e){const t=this.x,n=this.y,a=this.z,r=e.x,s=e.y,o=e.z,l=e.w,c=2*(s*a-o*n),h=2*(o*t-r*a),d=2*(r*n-s*t);return this.x=t+l*c+s*d-o*h,this.y=n+l*h+o*c-r*d,this.z=a+l*d+r*h-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,a=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*a,this.y=r[1]*t+r[5]*n+r[9]*a,this.z=r[2]*t+r[6]*n+r[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,a=e.y,r=e.z,s=t.x,o=t.y,l=t.z;return this.x=a*l-r*o,this.y=r*s-n*l,this.z=n*o-a*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return qa.copy(this).projectOnVector(e),this.sub(qa)}reflect(e){return this.sub(qa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ye(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,a=this.z-e.z;return t*t+n*n+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const a=Math.sin(t)*e;return this.x=a*Math.sin(n),this.y=Math.cos(t)*e,this.z=a*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=a,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const qa=new L,Ys=new ki;class Ve{constructor(e,t,n,a,r,s,o,l,c){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,a,r,s,o,l,c)}set(e,t,n,a,r,s,o,l,c){const h=this.elements;return h[0]=e,h[1]=a,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=s,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,a=t.elements,r=this.elements,s=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],p=n[2],f=n[5],g=n[8],w=a[0],m=a[3],u=a[6],T=a[1],S=a[4],v=a[7],C=a[2],E=a[5],A=a[8];return r[0]=s*w+o*T+l*C,r[3]=s*m+o*S+l*E,r[6]=s*u+o*v+l*A,r[1]=c*w+h*T+d*C,r[4]=c*m+h*S+d*E,r[7]=c*u+h*v+d*A,r[2]=p*w+f*T+g*C,r[5]=p*m+f*S+g*E,r[8]=p*u+f*v+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],a=e[2],r=e[3],s=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*s*h-t*o*c-n*r*h+n*o*l+a*r*c-a*s*l}invert(){const e=this.elements,t=e[0],n=e[1],a=e[2],r=e[3],s=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*s-o*c,p=o*l-h*r,f=c*r-s*l,g=t*d+n*p+a*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/g;return e[0]=d*w,e[1]=(a*c-h*n)*w,e[2]=(o*n-a*s)*w,e[3]=p*w,e[4]=(h*t-a*l)*w,e[5]=(a*r-o*t)*w,e[6]=f*w,e[7]=(n*l-c*t)*w,e[8]=(s*t-n*r)*w,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,a,r,s,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*s+c*o)+s+e,-a*c,a*l,-a*(-c*s+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ba.makeScale(e,t)),this}rotate(e){return this.premultiply(Ba.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ba.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let a=0;a<9;a++)if(t[a]!==n[a])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ba=new Ve;function fl(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ra(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function sh(){const i=Ra("canvas");return i.style.display="block",i}const Zs={};function ai(i){i in Zs||(Zs[i]=!0,console.warn(i))}function oh(i,e,t){return new Promise(function(n,a){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:a();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Js=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ks=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function lh(){const i={enabled:!0,workingColorSpace:ci,spaces:{},convert:function(a,r,s){return this.enabled===!1||r===s||!r||!s||(this.spaces[r].transfer===et&&(a.r=rn(a.r),a.g=rn(a.g),a.b=rn(a.b)),this.spaces[r].primaries!==this.spaces[s].primaries&&(a.applyMatrix3(this.spaces[r].toXYZ),a.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===et&&(a.r=ri(a.r),a.g=ri(a.g),a.b=ri(a.b))),a},workingToColorSpace:function(a,r){return this.convert(a,this.workingColorSpace,r)},colorSpaceToWorking:function(a,r){return this.convert(a,r,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===un?Ta:this.spaces[a].transfer},getLuminanceCoefficients:function(a,r=this.workingColorSpace){return a.fromArray(this.spaces[r].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,r,s){return a.copy(this.spaces[r].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,r){return ai("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(a,r)},toWorkingColorSpace:function(a,r){return ai("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(a,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ci]:{primaries:e,whitePoint:n,transfer:Ta,toXYZ:Js,fromXYZ:Ks,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ut},outputColorSpaceConfig:{drawingBufferColorSpace:Ut}},[Ut]:{primaries:e,whitePoint:n,transfer:et,toXYZ:Js,fromXYZ:Ks,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ut}}}),i}const $e=lh();function rn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ri(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let qn;class ch{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{qn===void 0&&(qn=Ra("canvas")),qn.width=e.width,qn.height=e.height;const a=qn.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),n=qn}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ra("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const a=n.getImageData(0,0,e.width,e.height),r=a.data;for(let s=0;s<r.length;s++)r[s]=rn(r[s]/255)*255;return n.putImageData(a,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(rn(t[n]/255)*255):t[n]=rn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let hh=0;class ys{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:hh++}),this.uuid=In(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},a=this.data;if(a!==null){let r;if(Array.isArray(a)){r=[];for(let s=0,o=a.length;s<o;s++)a[s].isDataTexture?r.push(za(a[s].image)):r.push(za(a[s]))}else r=za(a);n.url=r}return t||(e.images[this.uuid]=n),n}}function za(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ch.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let dh=0;const ka=new L;class _t extends fi{constructor(e=_t.DEFAULT_IMAGE,t=_t.DEFAULT_MAPPING,n=Cn,a=Cn,r=Vt,s=Pn,o=Bt,l=Yt,c=_t.DEFAULT_ANISOTROPY,h=un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dh++}),this.uuid=In(),this.name="",this.source=new ys(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=a,this.magFilter=r,this.minFilter=s,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new pe(0,0),this.repeat=new pe(1,1),this.center=new pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ka).x}get height(){return this.source.getSize(ka).y}get depth(){return this.source.getSize(ka).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}a&&n&&a.isVector2&&n.isVector2||a&&n&&a.isVector3&&n.isVector3||a&&n&&a.isMatrix3&&n.isMatrix3?a.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==il)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Rr:e.x=e.x-Math.floor(e.x);break;case Cn:e.x=e.x<0?0:1;break;case Cr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Rr:e.y=e.y-Math.floor(e.y);break;case Cn:e.y=e.y<0?0:1;break;case Cr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}_t.DEFAULT_IMAGE=null;_t.DEFAULT_MAPPING=il;_t.DEFAULT_ANISOTROPY=1;class tt{constructor(e=0,t=0,n=0,a=1){tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,a){return this.x=e,this.y=t,this.z=n,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,a=this.z,r=this.w,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*a+s[12]*r,this.y=s[1]*t+s[5]*n+s[9]*a+s[13]*r,this.z=s[2]*t+s[6]*n+s[10]*a+s[14]*r,this.w=s[3]*t+s[7]*n+s[11]*a+s[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,a,r;const l=e.elements,c=l[0],h=l[4],d=l[8],p=l[1],f=l[5],g=l[9],w=l[2],m=l[6],u=l[10];if(Math.abs(h-p)<.01&&Math.abs(d-w)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+p)<.1&&Math.abs(d+w)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,v=(f+1)/2,C=(u+1)/2,E=(h+p)/4,A=(d+w)/4,D=(g+m)/4;return S>v&&S>C?S<.01?(n=0,a=.707106781,r=.707106781):(n=Math.sqrt(S),a=E/n,r=A/n):v>C?v<.01?(n=.707106781,a=0,r=.707106781):(a=Math.sqrt(v),n=E/a,r=D/a):C<.01?(n=.707106781,a=.707106781,r=0):(r=Math.sqrt(C),n=A/r,a=D/r),this.set(n,a,r,t),this}let T=Math.sqrt((m-g)*(m-g)+(d-w)*(d-w)+(p-h)*(p-h));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(d-w)/T,this.z=(p-h)/T,this.w=Math.acos((c+f+u-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this.w=Ye(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this.w=Ye(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ye(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class uh extends fi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new tt(0,0,e,t),this.scissorTest=!1,this.viewport=new tt(0,0,e,t);const a={width:e,height:t,depth:n.depth},r=new _t(a);this.textures=[];const s=n.count;for(let o=0;o<s;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Vt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let a=0,r=this.textures.length;a<r;a++)this.textures[a].image.width=e,this.textures[a].image.height=t,this.textures[a].image.depth=n,this.textures[a].isArrayTexture=this.textures[a].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const a=Object.assign({},e.textures[t].image);this.textures[t].source=new ys(a)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ln extends uh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class pl extends _t{constructor(e=null,t=1,n=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:a},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class fh extends _t{constructor(e=null,t=1,n=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:a},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Nn{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Nt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Nt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Nt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=r.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,Nt):Nt.fromBufferAttribute(r,s),Nt.applyMatrix4(e.matrixWorld),this.expandByPoint(Nt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Xi.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Xi.copy(n.boundingBox)),Xi.applyMatrix4(e.matrixWorld),this.union(Xi)}const a=e.children;for(let r=0,s=a.length;r<s;r++)this.expandByObject(a[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Nt),Nt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(_i),Yi.subVectors(this.max,_i),Bn.subVectors(e.a,_i),zn.subVectors(e.b,_i),kn.subVectors(e.c,_i),sn.subVectors(zn,Bn),on.subVectors(kn,zn),xn.subVectors(Bn,kn);let t=[0,-sn.z,sn.y,0,-on.z,on.y,0,-xn.z,xn.y,sn.z,0,-sn.x,on.z,0,-on.x,xn.z,0,-xn.x,-sn.y,sn.x,0,-on.y,on.x,0,-xn.y,xn.x,0];return!Ga(t,Bn,zn,kn,Yi)||(t=[1,0,0,0,1,0,0,0,1],!Ga(t,Bn,zn,kn,Yi))?!1:(Zi.crossVectors(sn,on),t=[Zi.x,Zi.y,Zi.z],Ga(t,Bn,zn,kn,Yi))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Nt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Nt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:($t[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$t[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$t[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$t[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$t[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$t[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$t[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$t[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($t),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const $t=[new L,new L,new L,new L,new L,new L,new L,new L],Nt=new L,Xi=new Nn,Bn=new L,zn=new L,kn=new L,sn=new L,on=new L,xn=new L,_i=new L,Yi=new L,Zi=new L,yn=new L;function Ga(i,e,t,n,a){for(let r=0,s=i.length-3;r<=s;r+=3){yn.fromArray(i,r);const o=a.x*Math.abs(yn.x)+a.y*Math.abs(yn.y)+a.z*Math.abs(yn.z),l=e.dot(yn),c=t.dot(yn),h=n.dot(yn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const ph=new Nn,xi=new L,Ha=new L;class pi{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):ph.setFromPoints(e).getCenter(n);let a=0;for(let r=0,s=e.length;r<s;r++)a=Math.max(a,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;xi.subVectors(e,this.center);const t=xi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),a=(n-this.radius)*.5;this.center.addScaledVector(xi,a/n),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ha.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(xi.copy(e.center).add(Ha)),this.expandByPoint(xi.copy(e.center).sub(Ha))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const jt=new L,Va=new L,Ji=new L,ln=new L,Wa=new L,Ki=new L,Xa=new L;class ws{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,jt)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=jt.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(jt.copy(this.origin).addScaledVector(this.direction,t),jt.distanceToSquared(e))}distanceSqToSegment(e,t,n,a){Va.copy(e).add(t).multiplyScalar(.5),Ji.copy(t).sub(e).normalize(),ln.copy(this.origin).sub(Va);const r=e.distanceTo(t)*.5,s=-this.direction.dot(Ji),o=ln.dot(this.direction),l=-ln.dot(Ji),c=ln.lengthSq(),h=Math.abs(1-s*s);let d,p,f,g;if(h>0)if(d=s*l-o,p=s*o-l,g=r*h,d>=0)if(p>=-g)if(p<=g){const w=1/h;d*=w,p*=w,f=d*(d+s*p+2*o)+p*(s*d+p+2*l)+c}else p=r,d=Math.max(0,-(s*p+o)),f=-d*d+p*(p+2*l)+c;else p=-r,d=Math.max(0,-(s*p+o)),f=-d*d+p*(p+2*l)+c;else p<=-g?(d=Math.max(0,-(-s*r+o)),p=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+p*(p+2*l)+c):p<=g?(d=0,p=Math.min(Math.max(-r,-l),r),f=p*(p+2*l)+c):(d=Math.max(0,-(s*r+o)),p=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+p*(p+2*l)+c);else p=s>0?-r:r,d=Math.max(0,-(s*p+o)),f=-d*d+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),a&&a.copy(Va).addScaledVector(Ji,p),f}intersectSphere(e,t){jt.subVectors(e.center,this.origin);const n=jt.dot(this.direction),a=jt.dot(jt)-n*n,r=e.radius*e.radius;if(a>r)return null;const s=Math.sqrt(r-a),o=n-s,l=n+s;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,a,r,s,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,p=this.origin;return c>=0?(n=(e.min.x-p.x)*c,a=(e.max.x-p.x)*c):(n=(e.max.x-p.x)*c,a=(e.min.x-p.x)*c),h>=0?(r=(e.min.y-p.y)*h,s=(e.max.y-p.y)*h):(r=(e.max.y-p.y)*h,s=(e.min.y-p.y)*h),n>s||r>a||((r>n||isNaN(n))&&(n=r),(s<a||isNaN(a))&&(a=s),d>=0?(o=(e.min.z-p.z)*d,l=(e.max.z-p.z)*d):(o=(e.max.z-p.z)*d,l=(e.min.z-p.z)*d),n>l||o>a)||((o>n||n!==n)&&(n=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(n>=0?n:a,t)}intersectsBox(e){return this.intersectBox(e,jt)!==null}intersectTriangle(e,t,n,a,r){Wa.subVectors(t,e),Ki.subVectors(n,e),Xa.crossVectors(Wa,Ki);let s=this.direction.dot(Xa),o;if(s>0){if(a)return null;o=1}else if(s<0)o=-1,s=-s;else return null;ln.subVectors(this.origin,e);const l=o*this.direction.dot(Ki.crossVectors(ln,Ki));if(l<0)return null;const c=o*this.direction.dot(Wa.cross(ln));if(c<0||l+c>s)return null;const h=-o*ln.dot(Xa);return h<0?null:this.at(h/s,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class nt{constructor(e,t,n,a,r,s,o,l,c,h,d,p,f,g,w,m){nt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,a,r,s,o,l,c,h,d,p,f,g,w,m)}set(e,t,n,a,r,s,o,l,c,h,d,p,f,g,w,m){const u=this.elements;return u[0]=e,u[4]=t,u[8]=n,u[12]=a,u[1]=r,u[5]=s,u[9]=o,u[13]=l,u[2]=c,u[6]=h,u[10]=d,u[14]=p,u[3]=f,u[7]=g,u[11]=w,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new nt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,a=1/Gn.setFromMatrixColumn(e,0).length(),r=1/Gn.setFromMatrixColumn(e,1).length(),s=1/Gn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*s,t[9]=n[9]*s,t[10]=n[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,a=e.y,r=e.z,s=Math.cos(n),o=Math.sin(n),l=Math.cos(a),c=Math.sin(a),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const p=s*h,f=s*d,g=o*h,w=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=p-w*c,t[9]=-o*l,t[2]=w-p*c,t[6]=g+f*c,t[10]=s*l}else if(e.order==="YXZ"){const p=l*h,f=l*d,g=c*h,w=c*d;t[0]=p+w*o,t[4]=g*o-f,t[8]=s*c,t[1]=s*d,t[5]=s*h,t[9]=-o,t[2]=f*o-g,t[6]=w+p*o,t[10]=s*l}else if(e.order==="ZXY"){const p=l*h,f=l*d,g=c*h,w=c*d;t[0]=p-w*o,t[4]=-s*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=s*h,t[9]=w-p*o,t[2]=-s*c,t[6]=o,t[10]=s*l}else if(e.order==="ZYX"){const p=s*h,f=s*d,g=o*h,w=o*d;t[0]=l*h,t[4]=g*c-f,t[8]=p*c+w,t[1]=l*d,t[5]=w*c+p,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=s*l}else if(e.order==="YZX"){const p=s*l,f=s*c,g=o*l,w=o*c;t[0]=l*h,t[4]=w-p*d,t[8]=g*d+f,t[1]=d,t[5]=s*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+g,t[10]=p-w*d}else if(e.order==="XZY"){const p=s*l,f=s*c,g=o*l,w=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=p*d+w,t[5]=s*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*h,t[10]=w*d+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(mh,e,vh)}lookAt(e,t,n){const a=this.elements;return Tt.subVectors(e,t),Tt.lengthSq()===0&&(Tt.z=1),Tt.normalize(),cn.crossVectors(n,Tt),cn.lengthSq()===0&&(Math.abs(n.z)===1?Tt.x+=1e-4:Tt.z+=1e-4,Tt.normalize(),cn.crossVectors(n,Tt)),cn.normalize(),$i.crossVectors(Tt,cn),a[0]=cn.x,a[4]=$i.x,a[8]=Tt.x,a[1]=cn.y,a[5]=$i.y,a[9]=Tt.y,a[2]=cn.z,a[6]=$i.z,a[10]=Tt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,a=t.elements,r=this.elements,s=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],p=n[9],f=n[13],g=n[2],w=n[6],m=n[10],u=n[14],T=n[3],S=n[7],v=n[11],C=n[15],E=a[0],A=a[4],D=a[8],M=a[12],x=a[1],R=a[5],O=a[9],q=a[13],k=a[2],Y=a[6],V=a[10],$=a[14],G=a[3],le=a[7],ve=a[11],fe=a[15];return r[0]=s*E+o*x+l*k+c*G,r[4]=s*A+o*R+l*Y+c*le,r[8]=s*D+o*O+l*V+c*ve,r[12]=s*M+o*q+l*$+c*fe,r[1]=h*E+d*x+p*k+f*G,r[5]=h*A+d*R+p*Y+f*le,r[9]=h*D+d*O+p*V+f*ve,r[13]=h*M+d*q+p*$+f*fe,r[2]=g*E+w*x+m*k+u*G,r[6]=g*A+w*R+m*Y+u*le,r[10]=g*D+w*O+m*V+u*ve,r[14]=g*M+w*q+m*$+u*fe,r[3]=T*E+S*x+v*k+C*G,r[7]=T*A+S*R+v*Y+C*le,r[11]=T*D+S*O+v*V+C*ve,r[15]=T*M+S*q+v*$+C*fe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],a=e[8],r=e[12],s=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],p=e[10],f=e[14],g=e[3],w=e[7],m=e[11],u=e[15];return g*(+r*l*d-a*c*d-r*o*p+n*c*p+a*o*f-n*l*f)+w*(+t*l*f-t*c*p+r*s*p-a*s*f+a*c*h-r*l*h)+m*(+t*c*d-t*o*f-r*s*d+n*s*f+r*o*h-n*c*h)+u*(-a*o*h-t*l*d+t*o*p+a*s*d-n*s*p+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=t,a[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],a=e[2],r=e[3],s=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],p=e[10],f=e[11],g=e[12],w=e[13],m=e[14],u=e[15],T=d*m*c-w*p*c+w*l*f-o*m*f-d*l*u+o*p*u,S=g*p*c-h*m*c-g*l*f+s*m*f+h*l*u-s*p*u,v=h*w*c-g*d*c+g*o*f-s*w*f-h*o*u+s*d*u,C=g*d*l-h*w*l-g*o*p+s*w*p+h*o*m-s*d*m,E=t*T+n*S+a*v+r*C;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/E;return e[0]=T*A,e[1]=(w*p*r-d*m*r-w*a*f+n*m*f+d*a*u-n*p*u)*A,e[2]=(o*m*r-w*l*r+w*a*c-n*m*c-o*a*u+n*l*u)*A,e[3]=(d*l*r-o*p*r-d*a*c+n*p*c+o*a*f-n*l*f)*A,e[4]=S*A,e[5]=(h*m*r-g*p*r+g*a*f-t*m*f-h*a*u+t*p*u)*A,e[6]=(g*l*r-s*m*r-g*a*c+t*m*c+s*a*u-t*l*u)*A,e[7]=(s*p*r-h*l*r+h*a*c-t*p*c-s*a*f+t*l*f)*A,e[8]=v*A,e[9]=(g*d*r-h*w*r-g*n*f+t*w*f+h*n*u-t*d*u)*A,e[10]=(s*w*r-g*o*r+g*n*c-t*w*c-s*n*u+t*o*u)*A,e[11]=(h*o*r-s*d*r-h*n*c+t*d*c+s*n*f-t*o*f)*A,e[12]=C*A,e[13]=(h*w*a-g*d*a+g*n*p-t*w*p-h*n*m+t*d*m)*A,e[14]=(g*o*a-s*w*a-g*n*l+t*w*l+s*n*m-t*o*m)*A,e[15]=(s*d*a-h*o*a+h*n*l-t*d*l-s*n*p+t*o*p)*A,this}scale(e){const t=this.elements,n=e.x,a=e.y,r=e.z;return t[0]*=n,t[4]*=a,t[8]*=r,t[1]*=n,t[5]*=a,t[9]*=r,t[2]*=n,t[6]*=a,t[10]*=r,t[3]*=n,t[7]*=a,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,a))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),a=Math.sin(t),r=1-n,s=e.x,o=e.y,l=e.z,c=r*s,h=r*o;return this.set(c*s+n,c*o-a*l,c*l+a*o,0,c*o+a*l,h*o+n,h*l-a*s,0,c*l-a*o,h*l+a*s,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,a,r,s){return this.set(1,n,r,0,e,1,s,0,t,a,1,0,0,0,0,1),this}compose(e,t,n){const a=this.elements,r=t._x,s=t._y,o=t._z,l=t._w,c=r+r,h=s+s,d=o+o,p=r*c,f=r*h,g=r*d,w=s*h,m=s*d,u=o*d,T=l*c,S=l*h,v=l*d,C=n.x,E=n.y,A=n.z;return a[0]=(1-(w+u))*C,a[1]=(f+v)*C,a[2]=(g-S)*C,a[3]=0,a[4]=(f-v)*E,a[5]=(1-(p+u))*E,a[6]=(m+T)*E,a[7]=0,a[8]=(g+S)*A,a[9]=(m-T)*A,a[10]=(1-(p+w))*A,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,t,n){const a=this.elements;let r=Gn.set(a[0],a[1],a[2]).length();const s=Gn.set(a[4],a[5],a[6]).length(),o=Gn.set(a[8],a[9],a[10]).length();this.determinant()<0&&(r=-r),e.x=a[12],e.y=a[13],e.z=a[14],Ft.copy(this);const c=1/r,h=1/s,d=1/o;return Ft.elements[0]*=c,Ft.elements[1]*=c,Ft.elements[2]*=c,Ft.elements[4]*=h,Ft.elements[5]*=h,Ft.elements[6]*=h,Ft.elements[8]*=d,Ft.elements[9]*=d,Ft.elements[10]*=d,t.setFromRotationMatrix(Ft),n.x=r,n.y=s,n.z=o,this}makePerspective(e,t,n,a,r,s,o=Xt,l=!1){const c=this.elements,h=2*r/(t-e),d=2*r/(n-a),p=(t+e)/(t-e),f=(n+a)/(n-a);let g,w;if(l)g=r/(s-r),w=s*r/(s-r);else if(o===Xt)g=-(s+r)/(s-r),w=-2*s*r/(s-r);else if(o===Aa)g=-s/(s-r),w=-s*r/(s-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=p,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=w,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,a,r,s,o=Xt,l=!1){const c=this.elements,h=2/(t-e),d=2/(n-a),p=-(t+e)/(t-e),f=-(n+a)/(n-a);let g,w;if(l)g=1/(s-r),w=s/(s-r);else if(o===Xt)g=-2/(s-r),w=-(s+r)/(s-r);else if(o===Aa)g=-1/(s-r),w=-r/(s-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=p,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=w,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let a=0;a<16;a++)if(t[a]!==n[a])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Gn=new L,Ft=new nt,mh=new L(0,0,0),vh=new L(1,1,1),cn=new L,$i=new L,Tt=new L,$s=new nt,js=new ki;class Zt{constructor(e=0,t=0,n=0,a=Zt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,a=this._order){return this._x=e,this._y=t,this._z=n,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const a=e.elements,r=a[0],s=a[4],o=a[8],l=a[1],c=a[5],h=a[9],d=a[2],p=a[6],f=a[10];switch(t){case"XYZ":this._y=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-s,r)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ye(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(p,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ye(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return $s.makeRotationFromQuaternion(e),this.setFromRotationMatrix($s,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return js.setFromEuler(this),this.setFromQuaternion(js,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Zt.DEFAULT_ORDER="XYZ";class Ms{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let gh=0;const Qs=new L,Hn=new ki,Qt=new nt,ji=new L,yi=new L,_h=new L,xh=new ki,eo=new L(1,0,0),to=new L(0,1,0),no=new L(0,0,1),io={type:"added"},yh={type:"removed"},Vn={type:"childadded",child:null},Ya={type:"childremoved",child:null};class dt extends fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gh++}),this.uuid=In(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=dt.DEFAULT_UP.clone();const e=new L,t=new Zt,n=new ki,a=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function s(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new nt},normalMatrix:{value:new Ve}}),this.matrix=new nt,this.matrixWorld=new nt,this.matrixAutoUpdate=dt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ms,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Hn.setFromAxisAngle(e,t),this.quaternion.multiply(Hn),this}rotateOnWorldAxis(e,t){return Hn.setFromAxisAngle(e,t),this.quaternion.premultiply(Hn),this}rotateX(e){return this.rotateOnAxis(eo,e)}rotateY(e){return this.rotateOnAxis(to,e)}rotateZ(e){return this.rotateOnAxis(no,e)}translateOnAxis(e,t){return Qs.copy(e).applyQuaternion(this.quaternion),this.position.add(Qs.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(eo,e)}translateY(e){return this.translateOnAxis(to,e)}translateZ(e){return this.translateOnAxis(no,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Qt.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ji.copy(e):ji.set(e,t,n);const a=this.parent;this.updateWorldMatrix(!0,!1),yi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Qt.lookAt(yi,ji,this.up):Qt.lookAt(ji,yi,this.up),this.quaternion.setFromRotationMatrix(Qt),a&&(Qt.extractRotation(a.matrixWorld),Hn.setFromRotationMatrix(Qt),this.quaternion.premultiply(Hn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(io),Vn.child=e,this.dispatchEvent(Vn),Vn.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(yh),Ya.child=e,this.dispatchEvent(Ya),Ya.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Qt.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Qt.multiply(e.parent.matrixWorld)),e.applyMatrix4(Qt),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(io),Vn.child=e,this.dispatchEvent(Vn),Vn.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,a=this.children.length;n<a;n++){const s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const a=this.children;for(let r=0,s=a.length;r<s;r++)a[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yi,e,_h),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yi,xh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,a=t.length;n<a;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,a=t.length;n<a;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,a=t.length;n<a;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const a=this.children;for(let r=0,s=a.length;r<s;r++)a[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(e),a.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));a.material=o}else a.material=r(e.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(r(e.animations,l))}}if(t){const o=s(e.geometries),l=s(e.materials),c=s(e.textures),h=s(e.images),d=s(e.shapes),p=s(e.skeletons),f=s(e.animations),g=s(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),p.length>0&&(n.skeletons=p),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=a,n;function s(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const a=e.children[n];this.add(a.clone())}return this}}dt.DEFAULT_UP=new L(0,1,0);dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ot=new L,en=new L,Za=new L,tn=new L,Wn=new L,Xn=new L,ao=new L,Ja=new L,Ka=new L,$a=new L,ja=new tt,Qa=new tt,er=new tt;class qt{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,a){a.subVectors(n,t),Ot.subVectors(e,t),a.cross(Ot);const r=a.lengthSq();return r>0?a.multiplyScalar(1/Math.sqrt(r)):a.set(0,0,0)}static getBarycoord(e,t,n,a,r){Ot.subVectors(a,t),en.subVectors(n,t),Za.subVectors(e,t);const s=Ot.dot(Ot),o=Ot.dot(en),l=Ot.dot(Za),c=en.dot(en),h=en.dot(Za),d=s*c-o*o;if(d===0)return r.set(0,0,0),null;const p=1/d,f=(c*l-o*h)*p,g=(s*h-o*l)*p;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,a){return this.getBarycoord(e,t,n,a,tn)===null?!1:tn.x>=0&&tn.y>=0&&tn.x+tn.y<=1}static getInterpolation(e,t,n,a,r,s,o,l){return this.getBarycoord(e,t,n,a,tn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,tn.x),l.addScaledVector(s,tn.y),l.addScaledVector(o,tn.z),l)}static getInterpolatedAttribute(e,t,n,a,r,s){return ja.setScalar(0),Qa.setScalar(0),er.setScalar(0),ja.fromBufferAttribute(e,t),Qa.fromBufferAttribute(e,n),er.fromBufferAttribute(e,a),s.setScalar(0),s.addScaledVector(ja,r.x),s.addScaledVector(Qa,r.y),s.addScaledVector(er,r.z),s}static isFrontFacing(e,t,n,a){return Ot.subVectors(n,t),en.subVectors(e,t),Ot.cross(en).dot(a)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,a){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,t,n,a){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ot.subVectors(this.c,this.b),en.subVectors(this.a,this.b),Ot.cross(en).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return qt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return qt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,a,r){return qt.getInterpolation(e,this.a,this.b,this.c,t,n,a,r)}containsPoint(e){return qt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return qt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,a=this.b,r=this.c;let s,o;Wn.subVectors(a,n),Xn.subVectors(r,n),Ja.subVectors(e,n);const l=Wn.dot(Ja),c=Xn.dot(Ja);if(l<=0&&c<=0)return t.copy(n);Ka.subVectors(e,a);const h=Wn.dot(Ka),d=Xn.dot(Ka);if(h>=0&&d<=h)return t.copy(a);const p=l*d-h*c;if(p<=0&&l>=0&&h<=0)return s=l/(l-h),t.copy(n).addScaledVector(Wn,s);$a.subVectors(e,r);const f=Wn.dot($a),g=Xn.dot($a);if(g>=0&&f<=g)return t.copy(r);const w=f*c-l*g;if(w<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Xn,o);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return ao.subVectors(r,a),o=(d-h)/(d-h+(f-g)),t.copy(a).addScaledVector(ao,o);const u=1/(m+w+p);return s=w*u,o=p*u,t.copy(n).addScaledVector(Wn,s).addScaledVector(Xn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const ml={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hn={h:0,s:0,l:0},Qi={h:0,s:0,l:0};function tr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Je{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ut){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.colorSpaceToWorking(this,t),this}setRGB(e,t,n,a=$e.workingColorSpace){return this.r=e,this.g=t,this.b=n,$e.colorSpaceToWorking(this,a),this}setHSL(e,t,n,a=$e.workingColorSpace){if(e=xs(e,1),t=Ye(t,0,1),n=Ye(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,s=2*n-r;this.r=tr(s,r,e+1/3),this.g=tr(s,r,e),this.b=tr(s,r,e-1/3)}return $e.colorSpaceToWorking(this,a),this}setStyle(e,t=Ut){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const s=a[1],o=a[2];switch(s){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=a[1],s=r.length;if(s===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ut){const n=ml[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=rn(e.r),this.g=rn(e.g),this.b=rn(e.b),this}copyLinearToSRGB(e){return this.r=ri(e.r),this.g=ri(e.g),this.b=ri(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ut){return $e.workingToColorSpace(gt.copy(this),e),Math.round(Ye(gt.r*255,0,255))*65536+Math.round(Ye(gt.g*255,0,255))*256+Math.round(Ye(gt.b*255,0,255))}getHexString(e=Ut){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.workingToColorSpace(gt.copy(this),t);const n=gt.r,a=gt.g,r=gt.b,s=Math.max(n,a,r),o=Math.min(n,a,r);let l,c;const h=(o+s)/2;if(o===s)l=0,c=0;else{const d=s-o;switch(c=h<=.5?d/(s+o):d/(2-s-o),s){case n:l=(a-r)/d+(a<r?6:0);break;case a:l=(r-n)/d+2;break;case r:l=(n-a)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=$e.workingColorSpace){return $e.workingToColorSpace(gt.copy(this),t),e.r=gt.r,e.g=gt.g,e.b=gt.b,e}getStyle(e=Ut){$e.workingToColorSpace(gt.copy(this),e);const t=gt.r,n=gt.g,a=gt.b;return e!==Ut?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(a*255)})`}offsetHSL(e,t,n){return this.getHSL(hn),this.setHSL(hn.h+e,hn.s+t,hn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(hn),e.getHSL(Qi);const n=Ci(hn.h,Qi.h,t),a=Ci(hn.s,Qi.s,t),r=Ci(hn.l,Qi.l,t);return this.setHSL(n,a,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,a=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*a,this.g=r[1]*t+r[4]*n+r[7]*a,this.b=r[2]*t+r[5]*n+r[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const gt=new Je;Je.NAMES=ml;let wh=0;class mi extends fi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:wh++}),this.uuid=In(),this.name="",this.type="Material",this.blending=ii,this.side=mn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=gr,this.blendDst=_r,this.blendEquation=An,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=si,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hs,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=On,this.stencilZFail=On,this.stencilZPass=On,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(n):a&&a.isVector3&&n&&n.isVector3?a.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ii&&(n.blending=this.blending),this.side!==mn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==gr&&(n.blendSrc=this.blendSrc),this.blendDst!==_r&&(n.blendDst=this.blendDst),this.blendEquation!==An&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==si&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Hs&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==On&&(n.stencilFail=this.stencilFail),this.stencilZFail!==On&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==On&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function a(r){const s=[];for(const o in r){const l=r[o];delete l.metadata,s.push(l)}return s}if(t){const r=a(e.textures),s=a(e.images);r.length>0&&(n.textures=r),s.length>0&&(n.images=s)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const a=t.length;n=new Array(a);for(let r=0;r!==a;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class vl extends mi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zt,this.combine=nl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ht=new L,ea=new pe;let Mh=0;class kt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Mh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Vs,this.updateRanges=[],this.gpuType=Wt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let a=0,r=this.itemSize;a<r;a++)this.array[e+a]=t.array[n+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ea.fromBufferAttribute(this,t),ea.applyMatrix3(e),this.setXY(t,ea.x,ea.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyMatrix3(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyMatrix4(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyNormalMatrix(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.transformDirection(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Qn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=yt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Qn(t,this.array)),t}setX(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Qn(t,this.array)),t}setY(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Qn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Qn(t,this.array)),t}setW(e,t){return this.normalized&&(t=yt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,a){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),a=yt(a,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=a,this}setXYZW(e,t,n,a,r){return e*=this.itemSize,this.normalized&&(t=yt(t,this.array),n=yt(n,this.array),a=yt(a,this.array),r=yt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=a,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Vs&&(e.usage=this.usage),e}}class gl extends kt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class _l extends kt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class mt extends kt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Sh=0;const Lt=new nt,nr=new dt,Yn=new L,At=new Nn,wi=new Nn,pt=new L;class It extends fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sh++}),this.uuid=In(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(fl(e)?_l:gl)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ve().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Lt.makeRotationFromQuaternion(e),this.applyMatrix4(Lt),this}rotateX(e){return Lt.makeRotationX(e),this.applyMatrix4(Lt),this}rotateY(e){return Lt.makeRotationY(e),this.applyMatrix4(Lt),this}rotateZ(e){return Lt.makeRotationZ(e),this.applyMatrix4(Lt),this}translate(e,t,n){return Lt.makeTranslation(e,t,n),this.applyMatrix4(Lt),this}scale(e,t,n){return Lt.makeScale(e,t,n),this.applyMatrix4(Lt),this}lookAt(e){return nr.lookAt(e),nr.updateMatrix(),this.applyMatrix4(nr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yn).negate(),this.translate(Yn.x,Yn.y,Yn.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let a=0,r=e.length;a<r;a++){const s=e[a];n.push(s.x,s.y,s.z||0)}this.setAttribute("position",new mt(n,3))}else{const n=Math.min(e.length,t.count);for(let a=0;a<n;a++){const r=e[a];t.setXYZ(a,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Nn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,a=t.length;n<a;n++){const r=t[n];At.setFromBufferAttribute(r),this.morphTargetsRelative?(pt.addVectors(this.boundingBox.min,At.min),this.boundingBox.expandByPoint(pt),pt.addVectors(this.boundingBox.max,At.max),this.boundingBox.expandByPoint(pt)):(this.boundingBox.expandByPoint(At.min),this.boundingBox.expandByPoint(At.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(At.setFromBufferAttribute(e),t)for(let r=0,s=t.length;r<s;r++){const o=t[r];wi.setFromBufferAttribute(o),this.morphTargetsRelative?(pt.addVectors(At.min,wi.min),At.expandByPoint(pt),pt.addVectors(At.max,wi.max),At.expandByPoint(pt)):(At.expandByPoint(wi.min),At.expandByPoint(wi.max))}At.getCenter(n);let a=0;for(let r=0,s=e.count;r<s;r++)pt.fromBufferAttribute(e,r),a=Math.max(a,n.distanceToSquared(pt));if(t)for(let r=0,s=t.length;r<s;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)pt.fromBufferAttribute(o,c),l&&(Yn.fromBufferAttribute(e,c),pt.add(Yn)),a=Math.max(a,n.distanceToSquared(pt))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,a=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new kt(new Float32Array(4*n.count),4));const s=this.getAttribute("tangent"),o=[],l=[];for(let D=0;D<n.count;D++)o[D]=new L,l[D]=new L;const c=new L,h=new L,d=new L,p=new pe,f=new pe,g=new pe,w=new L,m=new L;function u(D,M,x){c.fromBufferAttribute(n,D),h.fromBufferAttribute(n,M),d.fromBufferAttribute(n,x),p.fromBufferAttribute(r,D),f.fromBufferAttribute(r,M),g.fromBufferAttribute(r,x),h.sub(c),d.sub(c),f.sub(p),g.sub(p);const R=1/(f.x*g.y-g.x*f.y);isFinite(R)&&(w.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(R),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(R),o[D].add(w),o[M].add(w),o[x].add(w),l[D].add(m),l[M].add(m),l[x].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let D=0,M=T.length;D<M;++D){const x=T[D],R=x.start,O=x.count;for(let q=R,k=R+O;q<k;q+=3)u(e.getX(q+0),e.getX(q+1),e.getX(q+2))}const S=new L,v=new L,C=new L,E=new L;function A(D){C.fromBufferAttribute(a,D),E.copy(C);const M=o[D];S.copy(M),S.sub(C.multiplyScalar(C.dot(M))).normalize(),v.crossVectors(E,M);const R=v.dot(l[D])<0?-1:1;s.setXYZW(D,S.x,S.y,S.z,R)}for(let D=0,M=T.length;D<M;++D){const x=T[D],R=x.start,O=x.count;for(let q=R,k=R+O;q<k;q+=3)A(e.getX(q+0)),A(e.getX(q+1)),A(e.getX(q+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new kt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,f=n.count;p<f;p++)n.setXYZ(p,0,0,0);const a=new L,r=new L,s=new L,o=new L,l=new L,c=new L,h=new L,d=new L;if(e)for(let p=0,f=e.count;p<f;p+=3){const g=e.getX(p+0),w=e.getX(p+1),m=e.getX(p+2);a.fromBufferAttribute(t,g),r.fromBufferAttribute(t,w),s.fromBufferAttribute(t,m),h.subVectors(s,r),d.subVectors(a,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,w),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(w,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let p=0,f=t.count;p<f;p+=3)a.fromBufferAttribute(t,p+0),r.fromBufferAttribute(t,p+1),s.fromBufferAttribute(t,p+2),h.subVectors(s,r),d.subVectors(a,r),h.cross(d),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)pt.fromBufferAttribute(e,t),pt.normalize(),e.setXYZ(t,pt.x,pt.y,pt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,p=new c.constructor(l.length*h);let f=0,g=0;for(let w=0,m=l.length;w<m;w++){o.isInterleavedBufferAttribute?f=l[w]*o.data.stride+o.offset:f=l[w]*h;for(let u=0;u<h;u++)p[g++]=c[f++]}return new kt(p,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new It,n=this.index.array,a=this.attributes;for(const o in a){const l=a[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const p=c[h],f=e(p,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,l=s.length;o<l;o++){const c=s[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const a={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,p=c.length;d<p;d++){const f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(a[l]=h,r=!0)}r&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const a=e.attributes;for(const c in a){const h=a[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],d=r[c];for(let p=0,f=d.length;p<f;p++)h.push(d[p].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let c=0,h=s.length;c<h;c++){const d=s[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ro=new nt,wn=new ws,ta=new pi,so=new L,na=new L,ia=new L,aa=new L,ir=new L,ra=new L,oo=new L,sa=new L;class zt extends dt{constructor(e=new It,t=new vl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const a=t[n[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=a.length;r<s;r++){const o=a[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,a=n.attributes.position,r=n.morphAttributes.position,s=n.morphTargetsRelative;t.fromBufferAttribute(a,e);const o=this.morphTargetInfluences;if(r&&o){ra.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(ir.fromBufferAttribute(d,e),s?ra.addScaledVector(ir,h):ra.addScaledVector(ir.sub(t),h))}t.add(ra)}return t}raycast(e,t){const n=this.geometry,a=this.material,r=this.matrixWorld;a!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ta.copy(n.boundingSphere),ta.applyMatrix4(r),wn.copy(e.ray).recast(e.near),!(ta.containsPoint(wn.origin)===!1&&(wn.intersectSphere(ta,so)===null||wn.origin.distanceToSquared(so)>(e.far-e.near)**2))&&(ro.copy(r).invert(),wn.copy(e.ray).applyMatrix4(ro),!(n.boundingBox!==null&&wn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,wn)))}_computeIntersections(e,t,n){let a;const r=this.geometry,s=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,p=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(s))for(let g=0,w=p.length;g<w;g++){const m=p[g],u=s[m.materialIndex],T=Math.max(m.start,f.start),S=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let v=T,C=S;v<C;v+=3){const E=o.getX(v),A=o.getX(v+1),D=o.getX(v+2);a=oa(this,u,e,n,c,h,d,E,A,D),a&&(a.faceIndex=Math.floor(v/3),a.face.materialIndex=m.materialIndex,t.push(a))}}else{const g=Math.max(0,f.start),w=Math.min(o.count,f.start+f.count);for(let m=g,u=w;m<u;m+=3){const T=o.getX(m),S=o.getX(m+1),v=o.getX(m+2);a=oa(this,s,e,n,c,h,d,T,S,v),a&&(a.faceIndex=Math.floor(m/3),t.push(a))}}else if(l!==void 0)if(Array.isArray(s))for(let g=0,w=p.length;g<w;g++){const m=p[g],u=s[m.materialIndex],T=Math.max(m.start,f.start),S=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=T,C=S;v<C;v+=3){const E=v,A=v+1,D=v+2;a=oa(this,u,e,n,c,h,d,E,A,D),a&&(a.faceIndex=Math.floor(v/3),a.face.materialIndex=m.materialIndex,t.push(a))}}else{const g=Math.max(0,f.start),w=Math.min(l.count,f.start+f.count);for(let m=g,u=w;m<u;m+=3){const T=m,S=m+1,v=m+2;a=oa(this,s,e,n,c,h,d,T,S,v),a&&(a.faceIndex=Math.floor(m/3),t.push(a))}}}}function bh(i,e,t,n,a,r,s,o){let l;if(e.side===St?l=n.intersectTriangle(s,r,a,!0,o):l=n.intersectTriangle(a,r,s,e.side===mn,o),l===null)return null;sa.copy(o),sa.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(sa);return c<t.near||c>t.far?null:{distance:c,point:sa.clone(),object:i}}function oa(i,e,t,n,a,r,s,o,l,c){i.getVertexPosition(o,na),i.getVertexPosition(l,ia),i.getVertexPosition(c,aa);const h=bh(i,e,t,n,na,ia,aa,oo);if(h){const d=new L;qt.getBarycoord(oo,na,ia,aa,d),a&&(h.uv=qt.getInterpolatedAttribute(a,o,l,c,d,new pe)),r&&(h.uv1=qt.getInterpolatedAttribute(r,o,l,c,d,new pe)),s&&(h.normal=qt.getInterpolatedAttribute(s,o,l,c,d,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const p={a:o,b:l,c,normal:new L,materialIndex:0};qt.getNormal(na,ia,aa,p.normal),h.face=p,h.barycoord=d}return h}class Gi extends It{constructor(e=1,t=1,n=1,a=1,r=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:a,heightSegments:r,depthSegments:s};const o=this;a=Math.floor(a),r=Math.floor(r),s=Math.floor(s);const l=[],c=[],h=[],d=[];let p=0,f=0;g("z","y","x",-1,-1,n,t,e,s,r,0),g("z","y","x",1,-1,n,t,-e,s,r,1),g("x","z","y",1,1,e,n,t,a,s,2),g("x","z","y",1,-1,e,n,-t,a,s,3),g("x","y","z",1,-1,e,t,n,a,r,4),g("x","y","z",-1,-1,e,t,-n,a,r,5),this.setIndex(l),this.setAttribute("position",new mt(c,3)),this.setAttribute("normal",new mt(h,3)),this.setAttribute("uv",new mt(d,2));function g(w,m,u,T,S,v,C,E,A,D,M){const x=v/A,R=C/D,O=v/2,q=C/2,k=E/2,Y=A+1,V=D+1;let $=0,G=0;const le=new L;for(let ve=0;ve<V;ve++){const fe=ve*R-q;for(let Ce=0;Ce<Y;Ce++){const Xe=Ce*x-O;le[w]=Xe*T,le[m]=fe*S,le[u]=k,c.push(le.x,le.y,le.z),le[w]=0,le[m]=0,le[u]=E>0?1:-1,h.push(le.x,le.y,le.z),d.push(Ce/A),d.push(1-ve/D),$+=1}}for(let ve=0;ve<D;ve++)for(let fe=0;fe<A;fe++){const Ce=p+fe+Y*ve,Xe=p+fe+Y*(ve+1),ze=p+(fe+1)+Y*(ve+1),W=p+(fe+1)+Y*ve;l.push(Ce,Xe,W),l.push(Xe,ze,W),G+=6}o.addGroup(f,G,M),f+=G,p+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function di(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const a=i[t][n];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=a.clone():Array.isArray(a)?e[t][n]=a.slice():e[t][n]=a}}return e}function wt(i){const e={};for(let t=0;t<i.length;t++){const n=di(i[t]);for(const a in n)e[a]=n[a]}return e}function Eh(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function xl(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const Th={clone:di,merge:wt};var Ah=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Rh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vn extends mi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ah,this.fragmentShader=Rh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=di(e.uniforms),this.uniformsGroups=Eh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const a in this.uniforms){const s=this.uniforms[a].value;s&&s.isTexture?t.uniforms[a]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[a]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[a]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[a]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[a]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[a]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[a]={type:"m4",value:s.toArray()}:t.uniforms[a]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const a in this.extensions)this.extensions[a]===!0&&(n[a]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class yl extends dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new nt,this.projectionMatrix=new nt,this.projectionMatrixInverse=new nt,this.coordinateSystem=Xt,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const dn=new L,lo=new pe,co=new pe;class Rt extends yl{constructor(e=50,t=1,n=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=a,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=hi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ri*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return hi*2*Math.atan(Math.tan(Ri*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){dn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(dn.x,dn.y).multiplyScalar(-e/dn.z),dn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(dn.x,dn.y).multiplyScalar(-e/dn.z)}getViewSize(e,t){return this.getViewBounds(e,lo,co),t.subVectors(co,lo)}setViewOffset(e,t,n,a,r,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=a,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ri*.5*this.fov)/this.zoom,n=2*t,a=this.aspect*n,r=-.5*a;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,c=s.fullHeight;r+=s.offsetX*a/l,t-=s.offsetY*n/c,a*=s.width/l,n*=s.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+a,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Zn=-90,Jn=1;class Ch extends dt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Rt(Zn,Jn,e,t);a.layers=this.layers,this.add(a);const r=new Rt(Zn,Jn,e,t);r.layers=this.layers,this.add(r);const s=new Rt(Zn,Jn,e,t);s.layers=this.layers,this.add(s);const o=new Rt(Zn,Jn,e,t);o.layers=this.layers,this.add(o);const l=new Rt(Zn,Jn,e,t);l.layers=this.layers,this.add(l);const c=new Rt(Zn,Jn,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,a,r,s,o,l]=t;for(const c of t)this.remove(c);if(e===Xt)n.up.set(0,1,0),n.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Aa)n.up.set(0,-1,0),n.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,s,o,l,c,h]=this.children,d=e.getRenderTarget(),p=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const w=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,a),e.render(t,r),e.setRenderTarget(n,1,a),e.render(t,s),e.setRenderTarget(n,2,a),e.render(t,o),e.setRenderTarget(n,3,a),e.render(t,l),e.setRenderTarget(n,4,a),e.render(t,c),n.texture.generateMipmaps=w,e.setRenderTarget(n,5,a),e.render(t,h),e.setRenderTarget(d,p,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class wl extends _t{constructor(e=[],t=oi,n,a,r,s,o,l,c,h){super(e,t,n,a,r,s,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ph extends Ln{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},a=[n,n,n,n,n,n];this.texture=new wl(a),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new Gi(5,5,5),r=new vn({name:"CubemapFromEquirect",uniforms:di(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:St,blending:fn});r.uniforms.tEquirect.value=t;const s=new zt(a,r),o=t.minFilter;return t.minFilter===Pn&&(t.minFilter=Vt),new Ch(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,n=!0,a=!0){const r=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,n,a);e.setRenderTarget(r)}}class la extends dt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Dh={type:"move"};class ar{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new la,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new la,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new la,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let a=null,r=null,s=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){s=!0;for(const w of e.hand.values()){const m=t.getJointPose(w,n),u=this._getHandJoint(c,w);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],p=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&p>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&p<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(a=t.getPose(e.targetRaySpace,n),a===null&&r!==null&&(a=r),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Dh)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new la;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Ml{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Je(e),this.density=t}clone(){return new Ml(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Sl{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Je(e),this.near=t,this.far=n}clone(){return new Sl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class A3 extends dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Zt,this.environmentIntensity=1,this.environmentRotation=new Zt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Lh extends _t{constructor(e=null,t=1,n=1,a,r,s,o,l,c=Ct,h=Ct,d,p){super(null,s,o,l,c,h,a,r,d,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ho extends kt{constructor(e,t,n,a=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=a}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Kn=new nt,uo=new nt,ca=[],fo=new Nn,Uh=new nt,Mi=new zt,Si=new pi;class R3 extends zt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ho(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let a=0;a<n;a++)this.setMatrixAt(a,Uh)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Nn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Kn),fo.copy(e.boundingBox).applyMatrix4(Kn),this.boundingBox.union(fo)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new pi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Kn),Si.copy(e.boundingSphere).applyMatrix4(Kn),this.boundingSphere.union(Si)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,a=this.morphTexture.source.data.data,r=n.length+1,s=e*r+1;for(let o=0;o<n.length;o++)n[o]=a[s+o]}raycast(e,t){const n=this.matrixWorld,a=this.count;if(Mi.geometry=this.geometry,Mi.material=this.material,Mi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Si.copy(this.boundingSphere),Si.applyMatrix4(n),e.ray.intersectsSphere(Si)!==!1))for(let r=0;r<a;r++){this.getMatrixAt(r,Kn),uo.multiplyMatrices(n,Kn),Mi.matrixWorld=uo,Mi.raycast(e,ca);for(let s=0,o=ca.length;s<o;s++){const l=ca[s];l.instanceId=r,l.object=this,t.push(l)}ca.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ho(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,a=n.length+1;this.morphTexture===null&&(this.morphTexture=new Lh(new Float32Array(a*this.count),a,this.count,ms,Wt));const r=this.morphTexture.source.data.data;let s=0;for(let c=0;c<n.length;c++)s+=n[c];const o=this.geometry.morphTargetsRelative?1:1-s,l=a*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const rr=new L,Ih=new L,Nh=new Ve;class En{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,a){return this.normal.set(e,t,n),this.constant=a,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const a=rr.subVectors(n,t).cross(Ih.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(rr),a=this.normal.dot(n);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/a;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Nh.getNormalMatrix(e),a=this.coplanarPoint(rr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-a.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Mn=new pi,Fh=new pe(.5,.5),ha=new L;class Ss{constructor(e=new En,t=new En,n=new En,a=new En,r=new En,s=new En){this.planes=[e,t,n,a,r,s]}set(e,t,n,a,r,s){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(a),o[4].copy(r),o[5].copy(s),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Xt,n=!1){const a=this.planes,r=e.elements,s=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],p=r[6],f=r[7],g=r[8],w=r[9],m=r[10],u=r[11],T=r[12],S=r[13],v=r[14],C=r[15];if(a[0].setComponents(c-s,f-h,u-g,C-T).normalize(),a[1].setComponents(c+s,f+h,u+g,C+T).normalize(),a[2].setComponents(c+o,f+d,u+w,C+S).normalize(),a[3].setComponents(c-o,f-d,u-w,C-S).normalize(),n)a[4].setComponents(l,p,m,v).normalize(),a[5].setComponents(c-l,f-p,u-m,C-v).normalize();else if(a[4].setComponents(c-l,f-p,u-m,C-v).normalize(),t===Xt)a[5].setComponents(c+l,f+p,u+m,C+v).normalize();else if(t===Aa)a[5].setComponents(l,p,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Mn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Mn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Mn)}intersectsSprite(e){Mn.center.set(0,0,0);const t=Fh.distanceTo(e.center);return Mn.radius=.7071067811865476+t,Mn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Mn)}intersectsSphere(e){const t=this.planes,n=e.center,a=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<a)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const a=t[n];if(ha.x=a.normal.x>0?e.max.x:e.min.x,ha.y=a.normal.y>0?e.max.y:e.min.y,ha.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(ha)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Oh extends mi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const po=new nt,ns=new ws,da=new pi,ua=new L;class C3 extends dt{constructor(e=new It,t=new Oh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,a=this.matrixWorld,r=e.params.Points.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),da.copy(n.boundingSphere),da.applyMatrix4(a),da.radius+=r,e.ray.intersectsSphere(da)===!1)return;po.copy(a).invert(),ns.copy(e.ray).applyMatrix4(po);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const p=Math.max(0,s.start),f=Math.min(c.count,s.start+s.count);for(let g=p,w=f;g<w;g++){const m=c.getX(g);ua.fromBufferAttribute(d,m),mo(ua,m,l,a,e,t,this)}}else{const p=Math.max(0,s.start),f=Math.min(d.count,s.start+s.count);for(let g=p,w=f;g<w;g++)ua.fromBufferAttribute(d,g),mo(ua,g,l,a,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const a=t[n[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=a.length;r<s;r++){const o=a[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function mo(i,e,t,n,a,r,s){const o=ns.distanceSqToPoint(i);if(o<t){const l=new L;ns.closestPointToPoint(i,l),l.applyMatrix4(n);const c=a.ray.origin.distanceTo(l);if(c<a.near||c>a.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:s})}}class P3 extends _t{constructor(e,t,n,a,r,s,o,l,c){super(e,t,n,a,r,s,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class bl extends _t{constructor(e,t,n=Dn,a,r,s,o=Ct,l=Ct,c,h=Ii,d=1){if(h!==Ii&&h!==Ni)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const p={width:e,height:t,depth:d};super(p,a,r,s,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ys(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class bs extends It{constructor(e=1,t=1,n=1,a=32,r=1,s=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:a,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:l};const c=this;a=Math.floor(a),r=Math.floor(r);const h=[],d=[],p=[],f=[];let g=0;const w=[],m=n/2;let u=0;T(),s===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new mt(d,3)),this.setAttribute("normal",new mt(p,3)),this.setAttribute("uv",new mt(f,2));function T(){const v=new L,C=new L;let E=0;const A=(t-e)/n;for(let D=0;D<=r;D++){const M=[],x=D/r,R=x*(t-e)+e;for(let O=0;O<=a;O++){const q=O/a,k=q*l+o,Y=Math.sin(k),V=Math.cos(k);C.x=R*Y,C.y=-x*n+m,C.z=R*V,d.push(C.x,C.y,C.z),v.set(Y,A,V).normalize(),p.push(v.x,v.y,v.z),f.push(q,1-x),M.push(g++)}w.push(M)}for(let D=0;D<a;D++)for(let M=0;M<r;M++){const x=w[M][D],R=w[M+1][D],O=w[M+1][D+1],q=w[M][D+1];(e>0||M!==0)&&(h.push(x,R,q),E+=3),(t>0||M!==r-1)&&(h.push(R,O,q),E+=3)}c.addGroup(u,E,0),u+=E}function S(v){const C=g,E=new pe,A=new L;let D=0;const M=v===!0?e:t,x=v===!0?1:-1;for(let O=1;O<=a;O++)d.push(0,m*x,0),p.push(0,x,0),f.push(.5,.5),g++;const R=g;for(let O=0;O<=a;O++){const k=O/a*l+o,Y=Math.cos(k),V=Math.sin(k);A.x=M*V,A.y=m*x,A.z=M*Y,d.push(A.x,A.y,A.z),p.push(0,x,0),E.x=Y*.5+.5,E.y=V*.5*x+.5,f.push(E.x,E.y),g++}for(let O=0;O<a;O++){const q=C+O,k=R+O;v===!0?h.push(k,k+1,q):h.push(k+1,k,q),D+=3}c.addGroup(u,D,v===!0?1:2),u+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bs(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class El extends bs{constructor(e=1,t=1,n=32,a=1,r=!1,s=0,o=Math.PI*2){super(0,e,t,n,a,r,s,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:a,openEnded:r,thetaStart:s,thetaLength:o}}static fromJSON(e){return new El(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Es extends It{constructor(e=[],t=[],n=1,a=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:a};const r=[],s=[];o(a),c(n),h(),this.setAttribute("position",new mt(r,3)),this.setAttribute("normal",new mt(r.slice(),3)),this.setAttribute("uv",new mt(s,2)),a===0?this.computeVertexNormals():this.normalizeNormals();function o(T){const S=new L,v=new L,C=new L;for(let E=0;E<t.length;E+=3)f(t[E+0],S),f(t[E+1],v),f(t[E+2],C),l(S,v,C,T)}function l(T,S,v,C){const E=C+1,A=[];for(let D=0;D<=E;D++){A[D]=[];const M=T.clone().lerp(v,D/E),x=S.clone().lerp(v,D/E),R=E-D;for(let O=0;O<=R;O++)O===0&&D===E?A[D][O]=M:A[D][O]=M.clone().lerp(x,O/R)}for(let D=0;D<E;D++)for(let M=0;M<2*(E-D)-1;M++){const x=Math.floor(M/2);M%2===0?(p(A[D][x+1]),p(A[D+1][x]),p(A[D][x])):(p(A[D][x+1]),p(A[D+1][x+1]),p(A[D+1][x]))}}function c(T){const S=new L;for(let v=0;v<r.length;v+=3)S.x=r[v+0],S.y=r[v+1],S.z=r[v+2],S.normalize().multiplyScalar(T),r[v+0]=S.x,r[v+1]=S.y,r[v+2]=S.z}function h(){const T=new L;for(let S=0;S<r.length;S+=3){T.x=r[S+0],T.y=r[S+1],T.z=r[S+2];const v=m(T)/2/Math.PI+.5,C=u(T)/Math.PI+.5;s.push(v,1-C)}g(),d()}function d(){for(let T=0;T<s.length;T+=6){const S=s[T+0],v=s[T+2],C=s[T+4],E=Math.max(S,v,C),A=Math.min(S,v,C);E>.9&&A<.1&&(S<.2&&(s[T+0]+=1),v<.2&&(s[T+2]+=1),C<.2&&(s[T+4]+=1))}}function p(T){r.push(T.x,T.y,T.z)}function f(T,S){const v=T*3;S.x=e[v+0],S.y=e[v+1],S.z=e[v+2]}function g(){const T=new L,S=new L,v=new L,C=new L,E=new pe,A=new pe,D=new pe;for(let M=0,x=0;M<r.length;M+=9,x+=6){T.set(r[M+0],r[M+1],r[M+2]),S.set(r[M+3],r[M+4],r[M+5]),v.set(r[M+6],r[M+7],r[M+8]),E.set(s[x+0],s[x+1]),A.set(s[x+2],s[x+3]),D.set(s[x+4],s[x+5]),C.copy(T).add(S).add(v).divideScalar(3);const R=m(C);w(E,x+0,T,R),w(A,x+2,S,R),w(D,x+4,v,R)}}function w(T,S,v,C){C<0&&T.x===1&&(s[S]=T.x-1),v.x===0&&v.z===0&&(s[S]=C/2/Math.PI+.5)}function m(T){return Math.atan2(T.z,-T.x)}function u(T){return Math.atan2(-T.y,Math.sqrt(T.x*T.x+T.z*T.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Es(e.vertices,e.indices,e.radius,e.details)}}class Jt{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,a=this.getPoint(0),r=0;t.push(0);for(let s=1;s<=e;s++)n=this.getPoint(s/e),r+=n.distanceTo(a),t.push(r),a=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let a=0;const r=n.length;let s;t?s=t:s=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(a=Math.floor(o+(l-o)/2),c=n[a]-s,c<0)o=a+1;else if(c>0)l=a-1;else{l=a;break}if(a=l,n[a]===s)return a/(r-1);const h=n[a],p=n[a+1]-h,f=(s-h)/p;return(a+f)/(r-1)}getTangent(e,t){let a=e-1e-4,r=e+1e-4;a<0&&(a=0),r>1&&(r=1);const s=this.getPoint(a),o=this.getPoint(r),l=t||(s.isVector2?new pe:new L);return l.copy(o).sub(s).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new L,a=[],r=[],s=[],o=new L,l=new nt;for(let f=0;f<=e;f++){const g=f/e;a[f]=this.getTangentAt(g,new L)}r[0]=new L,s[0]=new L;let c=Number.MAX_VALUE;const h=Math.abs(a[0].x),d=Math.abs(a[0].y),p=Math.abs(a[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),p<=c&&n.set(0,0,1),o.crossVectors(a[0],n).normalize(),r[0].crossVectors(a[0],o),s[0].crossVectors(a[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),s[f]=s[f-1].clone(),o.crossVectors(a[f-1],a[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ye(a[f-1].dot(a[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}s[f].crossVectors(a[f],r[f])}if(t===!0){let f=Math.acos(Ye(r[0].dot(r[e]),-1,1));f/=e,a[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(a[g],f*g)),s[g].crossVectors(a[g],r[g])}return{tangents:a,normals:r,binormals:s}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Ts extends Jt{constructor(e=0,t=0,n=1,a=1,r=0,s=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=a,this.aStartAngle=r,this.aEndAngle=s,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new pe){const n=t,a=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const s=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=a;for(;r>a;)r-=a;r<Number.EPSILON&&(s?r=0:r=a),this.aClockwise===!0&&!s&&(r===a?r=-a:r=r-a);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),p=l-this.aX,f=c-this.aY;l=p*h-f*d+this.aX,c=p*d+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class qh extends Ts{constructor(e,t,n,a,r,s){super(e,t,n,n,a,r,s),this.isArcCurve=!0,this.type="ArcCurve"}}function As(){let i=0,e=0,t=0,n=0;function a(r,s,o,l){i=r,e=o,t=-3*r+3*s-2*o-l,n=2*r-2*s+o+l}return{initCatmullRom:function(r,s,o,l,c){a(s,o,c*(o-r),c*(l-s))},initNonuniformCatmullRom:function(r,s,o,l,c,h,d){let p=(s-r)/c-(o-r)/(c+h)+(o-s)/h,f=(o-s)/h-(l-s)/(h+d)+(l-o)/d;p*=h,f*=h,a(s,o,p,f)},calc:function(r){const s=r*r,o=s*r;return i+e*r+t*s+n*o}}}const fa=new L,sr=new As,or=new As,lr=new As;class Bh extends Jt{constructor(e=[],t=!1,n="centripetal",a=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=a}getPoint(e,t=new L){const n=t,a=this.points,r=a.length,s=(r-(this.closed?0:1))*e;let o=Math.floor(s),l=s-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=a[(o-1)%r]:(fa.subVectors(a[0],a[1]).add(a[0]),c=fa);const d=a[o%r],p=a[(o+1)%r];if(this.closed||o+2<r?h=a[(o+2)%r]:(fa.subVectors(a[r-1],a[r-2]).add(a[r-1]),h=fa),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),f),w=Math.pow(d.distanceToSquared(p),f),m=Math.pow(p.distanceToSquared(h),f);w<1e-4&&(w=1),g<1e-4&&(g=w),m<1e-4&&(m=w),sr.initNonuniformCatmullRom(c.x,d.x,p.x,h.x,g,w,m),or.initNonuniformCatmullRom(c.y,d.y,p.y,h.y,g,w,m),lr.initNonuniformCatmullRom(c.z,d.z,p.z,h.z,g,w,m)}else this.curveType==="catmullrom"&&(sr.initCatmullRom(c.x,d.x,p.x,h.x,this.tension),or.initCatmullRom(c.y,d.y,p.y,h.y,this.tension),lr.initCatmullRom(c.z,d.z,p.z,h.z,this.tension));return n.set(sr.calc(l),or.calc(l),lr.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const a=e.points[t];this.points.push(a.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const a=this.points[t];e.points.push(a.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const a=e.points[t];this.points.push(new L().fromArray(a))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function vo(i,e,t,n,a){const r=(n-e)*.5,s=(a-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+s)*l+(-3*t+3*n-2*r-s)*o+r*i+t}function zh(i,e){const t=1-i;return t*t*e}function kh(i,e){return 2*(1-i)*i*e}function Gh(i,e){return i*i*e}function Pi(i,e,t,n){return zh(i,e)+kh(i,t)+Gh(i,n)}function Hh(i,e){const t=1-i;return t*t*t*e}function Vh(i,e){const t=1-i;return 3*t*t*i*e}function Wh(i,e){return 3*(1-i)*i*i*e}function Xh(i,e){return i*i*i*e}function Di(i,e,t,n,a){return Hh(i,e)+Vh(i,t)+Wh(i,n)+Xh(i,a)}class Tl extends Jt{constructor(e=new pe,t=new pe,n=new pe,a=new pe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=a}getPoint(e,t=new pe){const n=t,a=this.v0,r=this.v1,s=this.v2,o=this.v3;return n.set(Di(e,a.x,r.x,s.x,o.x),Di(e,a.y,r.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Yh extends Jt{constructor(e=new L,t=new L,n=new L,a=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=a}getPoint(e,t=new L){const n=t,a=this.v0,r=this.v1,s=this.v2,o=this.v3;return n.set(Di(e,a.x,r.x,s.x,o.x),Di(e,a.y,r.y,s.y,o.y),Di(e,a.z,r.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Al extends Jt{constructor(e=new pe,t=new pe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new pe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new pe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Zh extends Jt{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Rl extends Jt{constructor(e=new pe,t=new pe,n=new pe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new pe){const n=t,a=this.v0,r=this.v1,s=this.v2;return n.set(Pi(e,a.x,r.x,s.x),Pi(e,a.y,r.y,s.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Jh extends Jt{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){const n=t,a=this.v0,r=this.v1,s=this.v2;return n.set(Pi(e,a.x,r.x,s.x),Pi(e,a.y,r.y,s.y),Pi(e,a.z,r.z,s.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Cl extends Jt{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new pe){const n=t,a=this.points,r=(a.length-1)*e,s=Math.floor(r),o=r-s,l=a[s===0?s:s-1],c=a[s],h=a[s>a.length-2?a.length-1:s+1],d=a[s>a.length-3?a.length-1:s+2];return n.set(vo(o,l.x,c.x,h.x,d.x),vo(o,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const a=e.points[t];this.points.push(a.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const a=this.points[t];e.points.push(a.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const a=e.points[t];this.points.push(new pe().fromArray(a))}return this}}var is=Object.freeze({__proto__:null,ArcCurve:qh,CatmullRomCurve3:Bh,CubicBezierCurve:Tl,CubicBezierCurve3:Yh,EllipseCurve:Ts,LineCurve:Al,LineCurve3:Zh,QuadraticBezierCurve:Rl,QuadraticBezierCurve3:Jh,SplineCurve:Cl});class Kh extends Jt{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new is[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),a=this.getCurveLengths();let r=0;for(;r<a.length;){if(a[r]>=n){const s=a[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-s/l;return o.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,a=this.curves.length;n<a;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let a=0,r=this.curves;a<r.length;a++){const s=r[a],o=s.isEllipseCurve?e*2:s.isLineCurve||s.isLineCurve3?1:s.isSplineCurve?e*s.points.length:e,l=s.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const a=e.curves[t];this.curves.push(a.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const a=this.curves[t];e.curves.push(a.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const a=e.curves[t];this.curves.push(new is[a.type]().fromJSON(a))}return this}}class go extends Kh{constructor(e){super(),this.type="Path",this.currentPoint=new pe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Al(this.currentPoint.clone(),new pe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,a){const r=new Rl(this.currentPoint.clone(),new pe(e,t),new pe(n,a));return this.curves.push(r),this.currentPoint.set(n,a),this}bezierCurveTo(e,t,n,a,r,s){const o=new Tl(this.currentPoint.clone(),new pe(e,t),new pe(n,a),new pe(r,s));return this.curves.push(o),this.currentPoint.set(r,s),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Cl(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,a,r,s){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,a,r,s),this}absarc(e,t,n,a,r,s){return this.absellipse(e,t,n,n,a,r,s),this}ellipse(e,t,n,a,r,s,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,a,r,s,o,l),this}absellipse(e,t,n,a,r,s,o,l){const c=new Ts(e,t,n,a,r,s,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class $h extends go{constructor(e){super(e),this.uuid=In(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,a=this.holes.length;n<a;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const a=e.holes[t];this.holes.push(a.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const a=this.holes[t];e.holes.push(a.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const a=e.holes[t];this.holes.push(new go().fromJSON(a))}return this}}function jh(i,e,t=2){const n=e&&e.length,a=n?e[0]*t:i.length;let r=Pl(i,0,a,t,!0);const s=[];if(!r||r.next===r.prev)return s;let o,l,c;if(n&&(r=i0(i,e,r,t)),i.length>80*t){o=1/0,l=1/0;let h=-1/0,d=-1/0;for(let p=t;p<a;p+=t){const f=i[p],g=i[p+1];f<o&&(o=f),g<l&&(l=g),f>h&&(h=f),g>d&&(d=g)}c=Math.max(h-o,d-l),c=c!==0?32767/c:0}return Fi(r,s,t,o,l,c,0),s}function Pl(i,e,t,n,a){let r;if(a===p0(i,e,t,n)>0)for(let s=e;s<t;s+=n)r=_o(s/n|0,i[s],i[s+1],r);else for(let s=t-n;s>=e;s-=n)r=_o(s/n|0,i[s],i[s+1],r);return r&&ui(r,r.next)&&(qi(r),r=r.next),r}function Un(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(ui(t,t.next)||lt(t.prev,t,t.next)===0)){if(qi(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Fi(i,e,t,n,a,r,s){if(!i)return;!s&&r&&l0(i,n,a,r);let o=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(r?e0(i,n,a,r):Qh(i)){e.push(l.i,i.i,c.i),qi(i),i=c.next,o=c.next;continue}if(i=c,i===o){s?s===1?(i=t0(Un(i),e),Fi(i,e,t,n,a,r,2)):s===2&&n0(i,e,t,n,a,r):Fi(Un(i),e,t,n,a,r,1);break}}}function Qh(i){const e=i.prev,t=i,n=i.next;if(lt(e,t,n)>=0)return!1;const a=e.x,r=t.x,s=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(a,r,s),d=Math.min(o,l,c),p=Math.max(a,r,s),f=Math.max(o,l,c);let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=p&&g.y>=d&&g.y<=f&&Ti(a,o,r,l,s,c,g.x,g.y)&&lt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function e0(i,e,t,n){const a=i.prev,r=i,s=i.next;if(lt(a,r,s)>=0)return!1;const o=a.x,l=r.x,c=s.x,h=a.y,d=r.y,p=s.y,f=Math.min(o,l,c),g=Math.min(h,d,p),w=Math.max(o,l,c),m=Math.max(h,d,p),u=as(f,g,e,t,n),T=as(w,m,e,t,n);let S=i.prevZ,v=i.nextZ;for(;S&&S.z>=u&&v&&v.z<=T;){if(S.x>=f&&S.x<=w&&S.y>=g&&S.y<=m&&S!==a&&S!==s&&Ti(o,h,l,d,c,p,S.x,S.y)&&lt(S.prev,S,S.next)>=0||(S=S.prevZ,v.x>=f&&v.x<=w&&v.y>=g&&v.y<=m&&v!==a&&v!==s&&Ti(o,h,l,d,c,p,v.x,v.y)&&lt(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;S&&S.z>=u;){if(S.x>=f&&S.x<=w&&S.y>=g&&S.y<=m&&S!==a&&S!==s&&Ti(o,h,l,d,c,p,S.x,S.y)&&lt(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;v&&v.z<=T;){if(v.x>=f&&v.x<=w&&v.y>=g&&v.y<=m&&v!==a&&v!==s&&Ti(o,h,l,d,c,p,v.x,v.y)&&lt(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function t0(i,e){let t=i;do{const n=t.prev,a=t.next.next;!ui(n,a)&&Ll(n,t,t.next,a)&&Oi(n,a)&&Oi(a,n)&&(e.push(n.i,t.i,a.i),qi(t),qi(t.next),t=i=a),t=t.next}while(t!==i);return Un(t)}function n0(i,e,t,n,a,r){let s=i;do{let o=s.next.next;for(;o!==s.prev;){if(s.i!==o.i&&d0(s,o)){let l=Ul(s,o);s=Un(s,s.next),l=Un(l,l.next),Fi(s,e,t,n,a,r,0),Fi(l,e,t,n,a,r,0);return}o=o.next}s=s.next}while(s!==i)}function i0(i,e,t,n){const a=[];for(let r=0,s=e.length;r<s;r++){const o=e[r]*n,l=r<s-1?e[r+1]*n:i.length,c=Pl(i,o,l,n,!1);c===c.next&&(c.steiner=!0),a.push(h0(c))}a.sort(a0);for(let r=0;r<a.length;r++)t=r0(a[r],t);return t}function a0(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),a=(e.next.y-e.y)/(e.next.x-e.x);t=n-a}return t}function r0(i,e){const t=s0(i,e);if(!t)return e;const n=Ul(t,i);return Un(n,n.next),Un(t,t.next)}function s0(i,e){let t=e;const n=i.x,a=i.y;let r=-1/0,s;if(ui(i,t))return t;do{if(ui(i,t.next))return t.next;if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const d=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,s=t.x<t.next.x?t:t.next,d===n))return s}t=t.next}while(t!==e);if(!s)return null;const o=s,l=s.x,c=s.y;let h=1/0;t=s;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Dl(a<c?n:r,a,l,c,a<c?r:n,a,t.x,t.y)){const d=Math.abs(a-t.y)/(n-t.x);Oi(t,i)&&(d<h||d===h&&(t.x>s.x||t.x===s.x&&o0(s,t)))&&(s=t,h=d)}t=t.next}while(t!==o);return s}function o0(i,e){return lt(i.prev,i,e.prev)<0&&lt(e.next,i,i.next)<0}function l0(i,e,t,n){let a=i;do a.z===0&&(a.z=as(a.x,a.y,e,t,n)),a.prevZ=a.prev,a.nextZ=a.next,a=a.next;while(a!==i);a.prevZ.nextZ=null,a.prevZ=null,c0(a)}function c0(i){let e,t=1;do{let n=i,a;i=null;let r=null;for(e=0;n;){e++;let s=n,o=0;for(let c=0;c<t&&(o++,s=s.nextZ,!!s);c++);let l=t;for(;o>0||l>0&&s;)o!==0&&(l===0||!s||n.z<=s.z)?(a=n,n=n.nextZ,o--):(a=s,s=s.nextZ,l--),r?r.nextZ=a:i=a,a.prevZ=r,r=a;n=s}r.nextZ=null,t*=2}while(e>1);return i}function as(i,e,t,n,a){return i=(i-t)*a|0,e=(e-n)*a|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function h0(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Dl(i,e,t,n,a,r,s,o){return(a-s)*(e-o)>=(i-s)*(r-o)&&(i-s)*(n-o)>=(t-s)*(e-o)&&(t-s)*(r-o)>=(a-s)*(n-o)}function Ti(i,e,t,n,a,r,s,o){return!(i===s&&e===o)&&Dl(i,e,t,n,a,r,s,o)}function d0(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!u0(i,e)&&(Oi(i,e)&&Oi(e,i)&&f0(i,e)&&(lt(i.prev,i,e.prev)||lt(i,e.prev,e))||ui(i,e)&&lt(i.prev,i,i.next)>0&&lt(e.prev,e,e.next)>0)}function lt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function ui(i,e){return i.x===e.x&&i.y===e.y}function Ll(i,e,t,n){const a=ma(lt(i,e,t)),r=ma(lt(i,e,n)),s=ma(lt(t,n,i)),o=ma(lt(t,n,e));return!!(a!==r&&s!==o||a===0&&pa(i,t,e)||r===0&&pa(i,n,e)||s===0&&pa(t,i,n)||o===0&&pa(t,e,n))}function pa(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function ma(i){return i>0?1:i<0?-1:0}function u0(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Ll(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Oi(i,e){return lt(i.prev,i,i.next)<0?lt(i,e,i.next)>=0&&lt(i,i.prev,e)>=0:lt(i,e,i.prev)<0||lt(i,i.next,e)<0}function f0(i,e){let t=i,n=!1;const a=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&a<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Ul(i,e){const t=rs(i.i,i.x,i.y),n=rs(e.i,e.x,e.y),a=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=a,a.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function _o(i,e,t,n){const a=rs(i,e,t);return n?(a.next=n.next,a.prev=n,n.next.prev=a,n.next=a):(a.prev=a,a.next=a),a}function qi(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function rs(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function p0(i,e,t,n){let a=0;for(let r=e,s=t-n;r<t;r+=n)a+=(i[s]-i[r])*(i[r+1]+i[s+1]),s=r;return a}class m0{static triangulate(e,t,n=2){return jh(e,t,n)}}class ti{static area(e){const t=e.length;let n=0;for(let a=t-1,r=0;r<t;a=r++)n+=e[a].x*e[r].y-e[r].x*e[a].y;return n*.5}static isClockWise(e){return ti.area(e)<0}static triangulateShape(e,t){const n=[],a=[],r=[];xo(e),yo(n,e);let s=e.length;t.forEach(xo);for(let l=0;l<t.length;l++)a.push(s),s+=t[l].length,yo(n,t[l]);const o=m0.triangulate(n,a);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function xo(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function yo(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Il extends It{constructor(e=new $h([new pe(.5,.5),new pe(-.5,.5),new pe(-.5,-.5),new pe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,a=[],r=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];s(c)}this.setAttribute("position",new mt(a,3)),this.setAttribute("uv",new mt(r,2)),this.computeVertexNormals();function s(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1;let p=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,w=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const u=t.extrudePath,T=t.UVGenerator!==void 0?t.UVGenerator:v0;let S,v=!1,C,E,A,D;u&&(S=u.getSpacedPoints(h),v=!0,p=!1,C=u.computeFrenetFrames(h,!1),E=new L,A=new L,D=new L),p||(m=0,f=0,g=0,w=0);const M=o.extractPoints(c);let x=M.shape;const R=M.holes;if(!ti.isClockWise(x)){x=x.reverse();for(let j=0,Z=R.length;j<Z;j++){const te=R[j];ti.isClockWise(te)&&(R[j]=te.reverse())}}function q(j){const te=10000000000000001e-36;let J=j[0];for(let he=1;he<=j.length;he++){const ne=he%j.length,de=j[ne],ke=de.x-J.x,Be=de.y-J.y,b=ke*ke+Be*Be,_=Math.max(Math.abs(de.x),Math.abs(de.y),Math.abs(J.x),Math.abs(J.y)),F=te*_*_;if(b<=F){j.splice(ne,1),he--;continue}J=de}}q(x),R.forEach(q);const k=R.length,Y=x;for(let j=0;j<k;j++){const Z=R[j];x=x.concat(Z)}function V(j,Z,te){return Z||console.error("THREE.ExtrudeGeometry: vec does not exist"),j.clone().addScaledVector(Z,te)}const $=x.length;function G(j,Z,te){let J,he,ne;const de=j.x-Z.x,ke=j.y-Z.y,Be=te.x-j.x,b=te.y-j.y,_=de*de+ke*ke,F=de*b-ke*Be;if(Math.abs(F)>Number.EPSILON){const H=Math.sqrt(_),ee=Math.sqrt(Be*Be+b*b),X=Z.x-ke/H,Ae=Z.y+de/H,ce=te.x-b/ee,be=te.y+Be/ee,Ee=((ce-X)*b-(be-Ae)*Be)/(de*b-ke*Be);J=X+de*Ee-j.x,he=Ae+ke*Ee-j.y;const ae=J*J+he*he;if(ae<=2)return new pe(J,he);ne=Math.sqrt(ae/2)}else{let H=!1;de>Number.EPSILON?Be>Number.EPSILON&&(H=!0):de<-Number.EPSILON?Be<-Number.EPSILON&&(H=!0):Math.sign(ke)===Math.sign(b)&&(H=!0),H?(J=-ke,he=de,ne=Math.sqrt(_)):(J=de,he=ke,ne=Math.sqrt(_/2))}return new pe(J/ne,he/ne)}const le=[];for(let j=0,Z=Y.length,te=Z-1,J=j+1;j<Z;j++,te++,J++)te===Z&&(te=0),J===Z&&(J=0),le[j]=G(Y[j],Y[te],Y[J]);const ve=[];let fe,Ce=le.concat();for(let j=0,Z=k;j<Z;j++){const te=R[j];fe=[];for(let J=0,he=te.length,ne=he-1,de=J+1;J<he;J++,ne++,de++)ne===he&&(ne=0),de===he&&(de=0),fe[J]=G(te[J],te[ne],te[de]);ve.push(fe),Ce=Ce.concat(fe)}let Xe;if(m===0)Xe=ti.triangulateShape(Y,R);else{const j=[],Z=[];for(let te=0;te<m;te++){const J=te/m,he=f*Math.cos(J*Math.PI/2),ne=g*Math.sin(J*Math.PI/2)+w;for(let de=0,ke=Y.length;de<ke;de++){const Be=V(Y[de],le[de],ne);Me(Be.x,Be.y,-he),J===0&&j.push(Be)}for(let de=0,ke=k;de<ke;de++){const Be=R[de];fe=ve[de];const b=[];for(let _=0,F=Be.length;_<F;_++){const H=V(Be[_],fe[_],ne);Me(H.x,H.y,-he),J===0&&b.push(H)}J===0&&Z.push(b)}}Xe=ti.triangulateShape(j,Z)}const ze=Xe.length,W=g+w;for(let j=0;j<$;j++){const Z=p?V(x[j],Ce[j],W):x[j];v?(A.copy(C.normals[0]).multiplyScalar(Z.x),E.copy(C.binormals[0]).multiplyScalar(Z.y),D.copy(S[0]).add(A).add(E),Me(D.x,D.y,D.z)):Me(Z.x,Z.y,0)}for(let j=1;j<=h;j++)for(let Z=0;Z<$;Z++){const te=p?V(x[Z],Ce[Z],W):x[Z];v?(A.copy(C.normals[j]).multiplyScalar(te.x),E.copy(C.binormals[j]).multiplyScalar(te.y),D.copy(S[j]).add(A).add(E),Me(D.x,D.y,D.z)):Me(te.x,te.y,d/h*j)}for(let j=m-1;j>=0;j--){const Z=j/m,te=f*Math.cos(Z*Math.PI/2),J=g*Math.sin(Z*Math.PI/2)+w;for(let he=0,ne=Y.length;he<ne;he++){const de=V(Y[he],le[he],J);Me(de.x,de.y,d+te)}for(let he=0,ne=R.length;he<ne;he++){const de=R[he];fe=ve[he];for(let ke=0,Be=de.length;ke<Be;ke++){const b=V(de[ke],fe[ke],J);v?Me(b.x,b.y+S[h-1].y,S[h-1].x+te):Me(b.x,b.y,d+te)}}}Q(),ie();function Q(){const j=a.length/3;if(p){let Z=0,te=$*Z;for(let J=0;J<ze;J++){const he=Xe[J];Ne(he[2]+te,he[1]+te,he[0]+te)}Z=h+m*2,te=$*Z;for(let J=0;J<ze;J++){const he=Xe[J];Ne(he[0]+te,he[1]+te,he[2]+te)}}else{for(let Z=0;Z<ze;Z++){const te=Xe[Z];Ne(te[2],te[1],te[0])}for(let Z=0;Z<ze;Z++){const te=Xe[Z];Ne(te[0]+$*h,te[1]+$*h,te[2]+$*h)}}n.addGroup(j,a.length/3-j,0)}function ie(){const j=a.length/3;let Z=0;Le(Y,Z),Z+=Y.length;for(let te=0,J=R.length;te<J;te++){const he=R[te];Le(he,Z),Z+=he.length}n.addGroup(j,a.length/3-j,1)}function Le(j,Z){let te=j.length;for(;--te>=0;){const J=te;let he=te-1;he<0&&(he=j.length-1);for(let ne=0,de=h+m*2;ne<de;ne++){const ke=$*ne,Be=$*(ne+1),b=Z+J+ke,_=Z+he+ke,F=Z+he+Be,H=Z+J+Be;Re(b,_,F,H)}}}function Me(j,Z,te){l.push(j),l.push(Z),l.push(te)}function Ne(j,Z,te){De(j),De(Z),De(te);const J=a.length/3,he=T.generateTopUV(n,a,J-3,J-2,J-1);P(he[0]),P(he[1]),P(he[2])}function Re(j,Z,te,J){De(j),De(Z),De(J),De(Z),De(te),De(J);const he=a.length/3,ne=T.generateSideWallUV(n,a,he-6,he-3,he-2,he-1);P(ne[0]),P(ne[1]),P(ne[3]),P(ne[1]),P(ne[2]),P(ne[3])}function De(j){a.push(l[j*3+0]),a.push(l[j*3+1]),a.push(l[j*3+2])}function P(j){r.push(j.x),r.push(j.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return g0(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,s=e.shapes.length;r<s;r++){const o=t[e.shapes[r]];n.push(o)}const a=e.options.extrudePath;return a!==void 0&&(e.options.extrudePath=new is[a.type]().fromJSON(a)),new Il(n,e.options)}}const v0={generateTopUV:function(i,e,t,n,a){const r=e[t*3],s=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[a*3],h=e[a*3+1];return[new pe(r,s),new pe(o,l),new pe(c,h)]},generateSideWallUV:function(i,e,t,n,a,r){const s=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],d=e[n*3+2],p=e[a*3],f=e[a*3+1],g=e[a*3+2],w=e[r*3],m=e[r*3+1],u=e[r*3+2];return Math.abs(o-h)<Math.abs(s-c)?[new pe(s,1-l),new pe(c,1-d),new pe(p,1-g),new pe(w,1-u)]:[new pe(o,1-l),new pe(h,1-d),new pe(f,1-g),new pe(m,1-u)]}};function g0(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,a=i.length;n<a;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Nl extends Es{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,a=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(a,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Nl(e.radius,e.detail)}}class La extends It{constructor(e=1,t=1,n=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:a};const r=e/2,s=t/2,o=Math.floor(n),l=Math.floor(a),c=o+1,h=l+1,d=e/o,p=t/l,f=[],g=[],w=[],m=[];for(let u=0;u<h;u++){const T=u*p-s;for(let S=0;S<c;S++){const v=S*d-r;g.push(v,-T,0),w.push(0,0,1),m.push(S/o),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let T=0;T<o;T++){const S=T+c*u,v=T+c*(u+1),C=T+1+c*(u+1),E=T+1+c*u;f.push(S,v,E),f.push(v,C,E)}this.setIndex(f),this.setAttribute("position",new mt(g,3)),this.setAttribute("normal",new mt(w,3)),this.setAttribute("uv",new mt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new La(e.width,e.height,e.widthSegments,e.heightSegments)}}class Fl extends It{constructor(e=1,t=32,n=16,a=0,r=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:a,phiLength:r,thetaStart:s,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(s+o,Math.PI);let c=0;const h=[],d=new L,p=new L,f=[],g=[],w=[],m=[];for(let u=0;u<=n;u++){const T=[],S=u/n;let v=0;u===0&&s===0?v=.5/t:u===n&&l===Math.PI&&(v=-.5/t);for(let C=0;C<=t;C++){const E=C/t;d.x=-e*Math.cos(a+E*r)*Math.sin(s+S*o),d.y=e*Math.cos(s+S*o),d.z=e*Math.sin(a+E*r)*Math.sin(s+S*o),g.push(d.x,d.y,d.z),p.copy(d).normalize(),w.push(p.x,p.y,p.z),m.push(E+v,1-S),T.push(c++)}h.push(T)}for(let u=0;u<n;u++)for(let T=0;T<t;T++){const S=h[u][T+1],v=h[u][T],C=h[u+1][T],E=h[u+1][T+1];(u!==0||s>0)&&f.push(S,v,E),(u!==n-1||l<Math.PI)&&f.push(v,C,E)}this.setIndex(f),this.setAttribute("position",new mt(g,3)),this.setAttribute("normal",new mt(w,3)),this.setAttribute("uv",new mt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fl(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class D3 extends mi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dl,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class _0 extends mi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ic,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class x0 extends mi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Ua extends dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class L3 extends Ua{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const cr=new nt,wo=new L,Mo=new L;class Rs{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new pe(512,512),this.mapType=Yt,this.map=null,this.mapPass=null,this.matrix=new nt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ss,this._frameExtents=new pe(1,1),this._viewportCount=1,this._viewports=[new tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;wo.setFromMatrixPosition(e.matrixWorld),t.position.copy(wo),Mo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Mo),t.updateMatrixWorld(),cr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(cr,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(cr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class y0 extends Rs{constructor(){super(new Rt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=hi*2*e.angle*this.focus,a=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||a!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=a,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class U3 extends Ua{constructor(e,t,n=0,a=Math.PI/3,r=0,s=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.distance=n,this.angle=a,this.penumbra=r,this.decay=s,this.map=null,this.shadow=new y0}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const So=new nt,bi=new L,hr=new L;class w0 extends Rs{constructor(){super(new Rt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new pe(4,2),this._viewportCount=6,this._viewports=[new tt(2,1,1,1),new tt(0,1,1,1),new tt(3,1,1,1),new tt(1,1,1,1),new tt(3,0,1,1),new tt(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,a=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),bi.setFromMatrixPosition(e.matrixWorld),n.position.copy(bi),hr.copy(n.position),hr.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(hr),n.updateMatrixWorld(),a.makeTranslation(-bi.x,-bi.y,-bi.z),So.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(So,n.coordinateSystem,n.reversedDepth)}}class I3 extends Ua{constructor(e,t,n=0,a=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=a,this.shadow=new w0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Ol extends yl{constructor(e=-1,t=1,n=1,a=-1,r=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=a,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,a,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=a,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let r=n-e,s=n+e,o=a+t,l=a-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,s=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,s,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class M0 extends Rs{constructor(){super(new Ol(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class N3 extends Ua{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.shadow=new M0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class S0 extends Rt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const bo=new nt;class F3{constructor(e,t,n=0,a=1/0){this.ray=new ws(e,t),this.near=n,this.far=a,this.camera=null,this.layers=new Ms,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return bo.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(bo),this}intersectObject(e,t=!0,n=[]){return ss(e,this,n,t),n.sort(Eo),n}intersectObjects(e,t=!0,n=[]){for(let a=0,r=e.length;a<r;a++)ss(e[a],this,n,t);return n.sort(Eo),n}}function Eo(i,e){return i.distance-e.distance}function ss(i,e,t,n){let a=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(a=!1),a===!0&&n===!0){const r=i.children;for(let s=0,o=r.length;s<o;s++)ss(r[s],e,t,!0)}}function To(i,e,t,n){const a=b0(n);switch(t){case ol:return i*e;case ms:return i*e/a.components*a.byteLength;case vs:return i*e/a.components*a.byteLength;case cl:return i*e*2/a.components*a.byteLength;case gs:return i*e*2/a.components*a.byteLength;case ll:return i*e*3/a.components*a.byteLength;case Bt:return i*e*4/a.components*a.byteLength;case _s:return i*e*4/a.components*a.byteLength;case ya:case wa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ma:case Sa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Dr:case Ur:return Math.max(i,16)*Math.max(e,8)/4;case Pr:case Lr:return Math.max(i,8)*Math.max(e,8)/2;case Ir:case Nr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Fr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Or:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case qr:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Br:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case zr:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case kr:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Gr:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Hr:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Vr:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Wr:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Xr:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Yr:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Zr:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Jr:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Kr:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ba:case $r:case jr:return Math.ceil(i/4)*Math.ceil(e/4)*16;case hl:case Qr:return Math.ceil(i/4)*Math.ceil(e/4)*8;case es:case ts:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function b0(i){switch(i){case Yt:case al:return{byteLength:1,components:1};case Li:case rl:case zi:return{byteLength:2,components:1};case fs:case ps:return{byteLength:2,components:4};case Dn:case us:case Wt:return{byteLength:4,components:1};case sl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ds}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ds);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function ql(){let i=null,e=!1,t=null,n=null;function a(r,s){t(r,s),n=i.requestAnimationFrame(a)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(a),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function E0(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,d=c.byteLength,p=i.createBuffer();i.bindBuffer(l,p),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let p=0;for(let f=1;f<d.length;f++){const g=d[p],w=d[f];w.start<=g.start+g.count+1?g.count=Math.max(g.count,w.start+w.count-g.start):(++p,d[p]=w)}d.length=p+1;for(let f=0,g=d.length;f<g;f++){const w=d[f];i.bufferSubData(c,w.start*h.BYTES_PER_ELEMENT,h,w.start,w.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function s(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:a,remove:r,update:s}}var T0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,A0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,R0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,C0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,P0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,D0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,L0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,U0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,I0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,N0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,F0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,O0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,q0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,B0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,z0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,k0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,G0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,H0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,V0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,W0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,X0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Y0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Z0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,J0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,K0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,$0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,j0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Q0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ed=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,td=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,nd="gl_FragColor = linearToOutputTexel( gl_FragColor );",id=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ad=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,rd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,sd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,od=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ld=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,cd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ud=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,fd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,pd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,md=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,_d=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,xd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,yd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Md=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Sd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,bd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ed=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Td=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ad=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Rd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Cd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ld=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ud=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Id=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Nd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Od=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Bd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Gd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Vd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Wd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Zd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Jd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Kd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$d=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Qd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,eu=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,tu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,nu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,iu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,au=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ru=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,su=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ou=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSEDEPTHBUF
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSEDEPTHBUF
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare , distribution.x );
		#endif
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,lu=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,cu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,hu=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,du=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,uu=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,fu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,pu=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,mu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gu=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_u=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,xu=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,yu=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,wu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Su=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,bu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Eu=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Tu=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Au=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ru=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pu=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Du=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Lu=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSEDEPTHBUF
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Uu=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Iu=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Nu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Fu=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ou=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qu=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bu=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,zu=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ku=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gu=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hu=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Vu=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wu=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Xu=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Yu=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zu=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ju=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ku=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$u=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ju=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qu=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ef=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,af=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,rf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:T0,alphahash_pars_fragment:A0,alphamap_fragment:R0,alphamap_pars_fragment:C0,alphatest_fragment:P0,alphatest_pars_fragment:D0,aomap_fragment:L0,aomap_pars_fragment:U0,batching_pars_vertex:I0,batching_vertex:N0,begin_vertex:F0,beginnormal_vertex:O0,bsdfs:q0,iridescence_fragment:B0,bumpmap_pars_fragment:z0,clipping_planes_fragment:k0,clipping_planes_pars_fragment:G0,clipping_planes_pars_vertex:H0,clipping_planes_vertex:V0,color_fragment:W0,color_pars_fragment:X0,color_pars_vertex:Y0,color_vertex:Z0,common:J0,cube_uv_reflection_fragment:K0,defaultnormal_vertex:$0,displacementmap_pars_vertex:j0,displacementmap_vertex:Q0,emissivemap_fragment:ed,emissivemap_pars_fragment:td,colorspace_fragment:nd,colorspace_pars_fragment:id,envmap_fragment:ad,envmap_common_pars_fragment:rd,envmap_pars_fragment:sd,envmap_pars_vertex:od,envmap_physical_pars_fragment:_d,envmap_vertex:ld,fog_vertex:cd,fog_pars_vertex:hd,fog_fragment:dd,fog_pars_fragment:ud,gradientmap_pars_fragment:fd,lightmap_pars_fragment:pd,lights_lambert_fragment:md,lights_lambert_pars_fragment:vd,lights_pars_begin:gd,lights_toon_fragment:xd,lights_toon_pars_fragment:yd,lights_phong_fragment:wd,lights_phong_pars_fragment:Md,lights_physical_fragment:Sd,lights_physical_pars_fragment:bd,lights_fragment_begin:Ed,lights_fragment_maps:Td,lights_fragment_end:Ad,logdepthbuf_fragment:Rd,logdepthbuf_pars_fragment:Cd,logdepthbuf_pars_vertex:Pd,logdepthbuf_vertex:Dd,map_fragment:Ld,map_pars_fragment:Ud,map_particle_fragment:Id,map_particle_pars_fragment:Nd,metalnessmap_fragment:Fd,metalnessmap_pars_fragment:Od,morphinstance_vertex:qd,morphcolor_vertex:Bd,morphnormal_vertex:zd,morphtarget_pars_vertex:kd,morphtarget_vertex:Gd,normal_fragment_begin:Hd,normal_fragment_maps:Vd,normal_pars_fragment:Wd,normal_pars_vertex:Xd,normal_vertex:Yd,normalmap_pars_fragment:Zd,clearcoat_normal_fragment_begin:Jd,clearcoat_normal_fragment_maps:Kd,clearcoat_pars_fragment:$d,iridescence_pars_fragment:jd,opaque_fragment:Qd,packing:eu,premultiplied_alpha_fragment:tu,project_vertex:nu,dithering_fragment:iu,dithering_pars_fragment:au,roughnessmap_fragment:ru,roughnessmap_pars_fragment:su,shadowmap_pars_fragment:ou,shadowmap_pars_vertex:lu,shadowmap_vertex:cu,shadowmask_pars_fragment:hu,skinbase_vertex:du,skinning_pars_vertex:uu,skinning_vertex:fu,skinnormal_vertex:pu,specularmap_fragment:mu,specularmap_pars_fragment:vu,tonemapping_fragment:gu,tonemapping_pars_fragment:_u,transmission_fragment:xu,transmission_pars_fragment:yu,uv_pars_fragment:wu,uv_pars_vertex:Mu,uv_vertex:Su,worldpos_vertex:bu,background_vert:Eu,background_frag:Tu,backgroundCube_vert:Au,backgroundCube_frag:Ru,cube_vert:Cu,cube_frag:Pu,depth_vert:Du,depth_frag:Lu,distanceRGBA_vert:Uu,distanceRGBA_frag:Iu,equirect_vert:Nu,equirect_frag:Fu,linedashed_vert:Ou,linedashed_frag:qu,meshbasic_vert:Bu,meshbasic_frag:zu,meshlambert_vert:ku,meshlambert_frag:Gu,meshmatcap_vert:Hu,meshmatcap_frag:Vu,meshnormal_vert:Wu,meshnormal_frag:Xu,meshphong_vert:Yu,meshphong_frag:Zu,meshphysical_vert:Ju,meshphysical_frag:Ku,meshtoon_vert:$u,meshtoon_frag:ju,points_vert:Qu,points_frag:ef,shadow_vert:tf,shadow_frag:nf,sprite_vert:af,sprite_frag:rf},me={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},Ht={basic:{uniforms:wt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:wt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Je(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:wt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:wt([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:wt([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Je(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:wt([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:wt([me.points,me.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:wt([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:wt([me.common,me.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:wt([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:wt([me.sprite,me.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:wt([me.common,me.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:wt([me.lights,me.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};Ht.physical={uniforms:wt([Ht.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const va={r:0,b:0,g:0},Sn=new Zt,sf=new nt;function of(i,e,t,n,a,r,s){const o=new Je(0);let l=r===!0?0:1,c,h,d=null,p=0,f=null;function g(S){let v=S.isScene===!0?S.background:null;return v&&v.isTexture&&(v=(S.backgroundBlurriness>0?t:e).get(v)),v}function w(S){let v=!1;const C=g(S);C===null?u(o,l):C&&C.isColor&&(u(C,1),v=!0);const E=i.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,s):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(S,v){const C=g(v);C&&(C.isCubeTexture||C.mapping===Da)?(h===void 0&&(h=new zt(new Gi(1,1,1),new vn({name:"BackgroundCubeMaterial",uniforms:di(Ht.backgroundCube.uniforms),vertexShader:Ht.backgroundCube.vertexShader,fragmentShader:Ht.backgroundCube.fragmentShader,side:St,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,A,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(h)),Sn.copy(v.backgroundRotation),Sn.x*=-1,Sn.y*=-1,Sn.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Sn.y*=-1,Sn.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(sf.makeRotationFromEuler(Sn)),h.material.toneMapped=$e.getTransfer(C.colorSpace)!==et,(d!==C||p!==C.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,d=C,p=C.version,f=i.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new zt(new La(2,2),new vn({name:"BackgroundMaterial",uniforms:di(Ht.background.uniforms),vertexShader:Ht.background.vertexShader,fragmentShader:Ht.background.fragmentShader,side:mn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=$e.getTransfer(C.colorSpace)!==et,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(d!==C||p!==C.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,d=C,p=C.version,f=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function u(S,v){S.getRGB(va,xl(i)),n.buffers.color.setClear(va.r,va.g,va.b,v,s)}function T(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,v=1){o.set(S),l=v,u(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,u(o,l)},render:w,addToRenderList:m,dispose:T}}function lf(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},a=p(null);let r=a,s=!1;function o(x,R,O,q,k){let Y=!1;const V=d(q,O,R);r!==V&&(r=V,c(r.object)),Y=f(x,q,O,k),Y&&g(x,q,O,k),k!==null&&e.update(k,i.ELEMENT_ARRAY_BUFFER),(Y||s)&&(s=!1,v(x,R,O,q),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function l(){return i.createVertexArray()}function c(x){return i.bindVertexArray(x)}function h(x){return i.deleteVertexArray(x)}function d(x,R,O){const q=O.wireframe===!0;let k=n[x.id];k===void 0&&(k={},n[x.id]=k);let Y=k[R.id];Y===void 0&&(Y={},k[R.id]=Y);let V=Y[q];return V===void 0&&(V=p(l()),Y[q]=V),V}function p(x){const R=[],O=[],q=[];for(let k=0;k<t;k++)R[k]=0,O[k]=0,q[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:O,attributeDivisors:q,object:x,attributes:{},index:null}}function f(x,R,O,q){const k=r.attributes,Y=R.attributes;let V=0;const $=O.getAttributes();for(const G in $)if($[G].location>=0){const ve=k[G];let fe=Y[G];if(fe===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(fe=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(fe=x.instanceColor)),ve===void 0||ve.attribute!==fe||fe&&ve.data!==fe.data)return!0;V++}return r.attributesNum!==V||r.index!==q}function g(x,R,O,q){const k={},Y=R.attributes;let V=0;const $=O.getAttributes();for(const G in $)if($[G].location>=0){let ve=Y[G];ve===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(ve=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(ve=x.instanceColor));const fe={};fe.attribute=ve,ve&&ve.data&&(fe.data=ve.data),k[G]=fe,V++}r.attributes=k,r.attributesNum=V,r.index=q}function w(){const x=r.newAttributes;for(let R=0,O=x.length;R<O;R++)x[R]=0}function m(x){u(x,0)}function u(x,R){const O=r.newAttributes,q=r.enabledAttributes,k=r.attributeDivisors;O[x]=1,q[x]===0&&(i.enableVertexAttribArray(x),q[x]=1),k[x]!==R&&(i.vertexAttribDivisor(x,R),k[x]=R)}function T(){const x=r.newAttributes,R=r.enabledAttributes;for(let O=0,q=R.length;O<q;O++)R[O]!==x[O]&&(i.disableVertexAttribArray(O),R[O]=0)}function S(x,R,O,q,k,Y,V){V===!0?i.vertexAttribIPointer(x,R,O,k,Y):i.vertexAttribPointer(x,R,O,q,k,Y)}function v(x,R,O,q){w();const k=q.attributes,Y=O.getAttributes(),V=R.defaultAttributeValues;for(const $ in Y){const G=Y[$];if(G.location>=0){let le=k[$];if(le===void 0&&($==="instanceMatrix"&&x.instanceMatrix&&(le=x.instanceMatrix),$==="instanceColor"&&x.instanceColor&&(le=x.instanceColor)),le!==void 0){const ve=le.normalized,fe=le.itemSize,Ce=e.get(le);if(Ce===void 0)continue;const Xe=Ce.buffer,ze=Ce.type,W=Ce.bytesPerElement,Q=ze===i.INT||ze===i.UNSIGNED_INT||le.gpuType===us;if(le.isInterleavedBufferAttribute){const ie=le.data,Le=ie.stride,Me=le.offset;if(ie.isInstancedInterleavedBuffer){for(let Ne=0;Ne<G.locationSize;Ne++)u(G.location+Ne,ie.meshPerAttribute);x.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Ne=0;Ne<G.locationSize;Ne++)m(G.location+Ne);i.bindBuffer(i.ARRAY_BUFFER,Xe);for(let Ne=0;Ne<G.locationSize;Ne++)S(G.location+Ne,fe/G.locationSize,ze,ve,Le*W,(Me+fe/G.locationSize*Ne)*W,Q)}else{if(le.isInstancedBufferAttribute){for(let ie=0;ie<G.locationSize;ie++)u(G.location+ie,le.meshPerAttribute);x.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let ie=0;ie<G.locationSize;ie++)m(G.location+ie);i.bindBuffer(i.ARRAY_BUFFER,Xe);for(let ie=0;ie<G.locationSize;ie++)S(G.location+ie,fe/G.locationSize,ze,ve,fe*W,fe/G.locationSize*ie*W,Q)}}else if(V!==void 0){const ve=V[$];if(ve!==void 0)switch(ve.length){case 2:i.vertexAttrib2fv(G.location,ve);break;case 3:i.vertexAttrib3fv(G.location,ve);break;case 4:i.vertexAttrib4fv(G.location,ve);break;default:i.vertexAttrib1fv(G.location,ve)}}}}T()}function C(){D();for(const x in n){const R=n[x];for(const O in R){const q=R[O];for(const k in q)h(q[k].object),delete q[k];delete R[O]}delete n[x]}}function E(x){if(n[x.id]===void 0)return;const R=n[x.id];for(const O in R){const q=R[O];for(const k in q)h(q[k].object),delete q[k];delete R[O]}delete n[x.id]}function A(x){for(const R in n){const O=n[R];if(O[x.id]===void 0)continue;const q=O[x.id];for(const k in q)h(q[k].object),delete q[k];delete O[x.id]}}function D(){M(),s=!0,r!==a&&(r=a,c(r.object))}function M(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:D,resetDefaultState:M,dispose:C,releaseStatesOfGeometry:E,releaseStatesOfProgram:A,initAttributes:w,enableAttribute:m,disableUnusedAttributes:T}}function cf(i,e,t){let n;function a(c){n=c}function r(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function s(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),t.update(h,n,d))}function o(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];t.update(f,n,1)}function l(c,h,d,p){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)s(c[g],h[g],p[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,p,0,d);let g=0;for(let w=0;w<d;w++)g+=h[w]*p[w];t.update(g,n,1)}}this.setMode=a,this.render=r,this.renderInstances=s,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function hf(i,e,t,n){let a;function r(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");a=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function s(A){return!(A!==Bt&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const D=A===zi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Yt&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Wt&&!D)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,p=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),u=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:p,maxTextures:f,maxVertexTextures:g,maxTextureSize:w,maxCubemapSize:m,maxAttributes:u,maxVertexUniforms:T,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:C,maxSamples:E}}function df(i){const e=this;let t=null,n=0,a=!1,r=!1;const s=new En,o=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,p){const f=d.length!==0||p||n!==0||a;return a=p,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,p){t=h(d,p,0)},this.setState=function(d,p,f){const g=d.clippingPlanes,w=d.clipIntersection,m=d.clipShadows,u=i.get(d);if(!a||g===null||g.length===0||r&&!m)r?h(null):c();else{const T=r?0:n,S=T*4;let v=u.clippingState||null;l.value=v,v=h(g,p,S,f);for(let C=0;C!==S;++C)v[C]=t[C];u.clippingState=v,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,p,f,g){const w=d!==null?d.length:0;let m=null;if(w!==0){if(m=l.value,g!==!0||m===null){const u=f+w*4,T=p.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<u)&&(m=new Float32Array(u));for(let S=0,v=f;S!==w;++S,v+=4)s.copy(d[S]).applyMatrix4(T,o),s.normal.toArray(m,v),m[v+3]=s.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=w,e.numIntersection=0,m}}function uf(i){let e=new WeakMap;function t(s,o){return o===Tr?s.mapping=oi:o===Ar&&(s.mapping=li),s}function n(s){if(s&&s.isTexture){const o=s.mapping;if(o===Tr||o===Ar)if(e.has(s)){const l=e.get(s).texture;return t(l,s.mapping)}else{const l=s.image;if(l&&l.height>0){const c=new Ph(l.height);return c.fromEquirectangularTexture(i,s),e.set(s,c),s.addEventListener("dispose",a),t(c.texture,s.mapping)}else return null}}return s}function a(s){const o=s.target;o.removeEventListener("dispose",a);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const ni=4,Ao=[.125,.215,.35,.446,.526,.582],Rn=20,dr=new Ol,Ro=new Je;let ur=null,fr=0,pr=0,mr=!1;const Tn=(1+Math.sqrt(5))/2,$n=1/Tn,Co=[new L(-Tn,$n,0),new L(Tn,$n,0),new L(-$n,0,Tn),new L($n,0,Tn),new L(0,Tn,-$n),new L(0,Tn,$n),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],ff=new L;class Po{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,a=100,r={}){const{size:s=256,position:o=ff}=r;ur=this._renderer.getRenderTarget(),fr=this._renderer.getActiveCubeFace(),pr=this._renderer.getActiveMipmapLevel(),mr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,a,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Uo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ur,fr,pr),this._renderer.xr.enabled=mr,e.scissorTest=!1,ga(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===oi||e.mapping===li?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ur=this._renderer.getRenderTarget(),fr=this._renderer.getActiveCubeFace(),pr=this._renderer.getActiveMipmapLevel(),mr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Vt,minFilter:Vt,generateMipmaps:!1,type:zi,format:Bt,colorSpace:ci,depthBuffer:!1},a=Do(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Do(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=pf(r)),this._blurMaterial=mf(r,e,t)}return a}_compileMaterial(e){const t=new zt(this._lodPlanes[0],e);this._renderer.compile(t,dr)}_sceneToCubeUV(e,t,n,a,r){const l=new Rt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,p=d.autoClear,f=d.toneMapping;d.getClearColor(Ro),d.toneMapping=pn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(a),d.clearDepth(),d.setRenderTarget(null));const w=new vl({name:"PMREM.Background",side:St,depthWrite:!1,depthTest:!1}),m=new zt(new Gi,w);let u=!1;const T=e.background;T?T.isColor&&(w.color.copy(T),e.background=null,u=!0):(w.color.copy(Ro),u=!0);for(let S=0;S<6;S++){const v=S%3;v===0?(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[S],r.y,r.z)):v===1?(l.up.set(0,0,c[S]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[S],r.z)):(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[S]));const C=this._cubeSize;ga(a,v*C,S>2?C:0,C,C),d.setRenderTarget(a),u&&d.render(m,l),d.render(e,l)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=f,d.autoClear=p,e.background=T}_textureToCubeUV(e,t){const n=this._renderer,a=e.mapping===oi||e.mapping===li;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Uo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lo());const r=a?this._cubemapMaterial:this._equirectMaterial,s=new zt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;ga(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(s,dr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const a=this._lodPlanes.length;for(let r=1;r<a;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Co[(a-r-1)%Co.length];this._blur(e,r-1,r,s,o)}t.autoClear=n}_blur(e,t,n,a,r){const s=this._pingPongRenderTarget;this._halfBlur(e,s,t,n,a,"latitudinal",r),this._halfBlur(s,e,n,n,a,"longitudinal",r)}_halfBlur(e,t,n,a,r,s,o){const l=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new zt(this._lodPlanes[a],c),p=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Rn-1),w=r/g,m=isFinite(r)?1+Math.floor(h*w):Rn;m>Rn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Rn}`);const u=[];let T=0;for(let A=0;A<Rn;++A){const D=A/w,M=Math.exp(-D*D/2);u.push(M),A===0?T+=M:A<m&&(T+=2*M)}for(let A=0;A<u.length;A++)u[A]=u[A]/T;p.envMap.value=e.texture,p.samples.value=m,p.weights.value=u,p.latitudinal.value=s==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:S}=this;p.dTheta.value=g,p.mipInt.value=S-n;const v=this._sizeLods[a],C=3*v*(a>S-ni?a-S+ni:0),E=4*(this._cubeSize-v);ga(t,C,E,3*v,2*v),l.setRenderTarget(t),l.render(d,dr)}}function pf(i){const e=[],t=[],n=[];let a=i;const r=i-ni+1+Ao.length;for(let s=0;s<r;s++){const o=Math.pow(2,a);t.push(o);let l=1/o;s>i-ni?l=Ao[s-i+ni-1]:s===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,p=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,w=3,m=2,u=1,T=new Float32Array(w*g*f),S=new Float32Array(m*g*f),v=new Float32Array(u*g*f);for(let E=0;E<f;E++){const A=E%3*2/3-1,D=E>2?0:-1,M=[A,D,0,A+2/3,D,0,A+2/3,D+1,0,A,D,0,A+2/3,D+1,0,A,D+1,0];T.set(M,w*g*E),S.set(p,m*g*E);const x=[E,E,E,E,E,E];v.set(x,u*g*E)}const C=new It;C.setAttribute("position",new kt(T,w)),C.setAttribute("uv",new kt(S,m)),C.setAttribute("faceIndex",new kt(v,u)),e.push(C),a>ni&&a--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Do(i,e,t){const n=new Ln(i,e,t);return n.texture.mapping=Da,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ga(i,e,t,n,a){i.viewport.set(e,t,n,a),i.scissor.set(e,t,n,a)}function mf(i,e,t){const n=new Float32Array(Rn),a=new L(0,1,0);return new vn({name:"SphericalGaussianBlur",defines:{n:Rn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:Cs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:fn,depthTest:!1,depthWrite:!1})}function Lo(){return new vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Cs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:fn,depthTest:!1,depthWrite:!1})}function Uo(){return new vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Cs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:fn,depthTest:!1,depthWrite:!1})}function Cs(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function vf(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Tr||l===Ar,h=l===oi||l===li;if(c||h){let d=e.get(o);const p=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return t===null&&(t=new Po(i)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&a(f)?(t===null&&(t=new Po(i)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function a(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:s}}function gf(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let a;switch(n){case"WEBGL_depth_texture":a=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=i.getExtension(n)}return e[n]=a,a}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const a=t(n);return a===null&&ai("THREE.WebGLRenderer: "+n+" extension not supported."),a}}}function _f(i,e,t,n){const a={},r=new WeakMap;function s(d){const p=d.target;p.index!==null&&e.remove(p.index);for(const g in p.attributes)e.remove(p.attributes[g]);p.removeEventListener("dispose",s),delete a[p.id];const f=r.get(p);f&&(e.remove(f),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function o(d,p){return a[p.id]===!0||(p.addEventListener("dispose",s),a[p.id]=!0,t.memory.geometries++),p}function l(d){const p=d.attributes;for(const f in p)e.update(p[f],i.ARRAY_BUFFER)}function c(d){const p=[],f=d.index,g=d.attributes.position;let w=0;if(f!==null){const T=f.array;w=f.version;for(let S=0,v=T.length;S<v;S+=3){const C=T[S+0],E=T[S+1],A=T[S+2];p.push(C,E,E,A,A,C)}}else if(g!==void 0){const T=g.array;w=g.version;for(let S=0,v=T.length/3-1;S<v;S+=3){const C=S+0,E=S+1,A=S+2;p.push(C,E,E,A,A,C)}}else return;const m=new(fl(p)?_l:gl)(p,1);m.version=w;const u=r.get(d);u&&e.remove(u),r.set(d,m)}function h(d){const p=r.get(d);if(p){const f=d.index;f!==null&&p.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function xf(i,e,t){let n;function a(p){n=p}let r,s;function o(p){r=p.type,s=p.bytesPerElement}function l(p,f){i.drawElements(n,f,r,p*s),t.update(f,n,1)}function c(p,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,p*s,g),t.update(f,n,g))}function h(p,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,p,0,g);let m=0;for(let u=0;u<g;u++)m+=f[u];t.update(m,n,1)}function d(p,f,g,w){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<p.length;u++)c(p[u]/s,f[u],w[u]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,p,0,w,0,g);let u=0;for(let T=0;T<g;T++)u+=f[T]*w[T];t.update(u,n,1)}}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function yf(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,s,o){switch(t.calls++,s){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:a,update:n}}function wf(i,e,t){const n=new WeakMap,a=new tt;function r(s,o,l){const c=s.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let p=n.get(o);if(p===void 0||p.count!==d){let M=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",M)};p!==void 0&&p.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,w=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],u=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let S=0;f===!0&&(S=1),g===!0&&(S=2),w===!0&&(S=3);let v=o.attributes.position.count*S,C=1;v>e.maxTextureSize&&(C=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);const E=new Float32Array(v*C*4*d),A=new pl(E,v,C,d);A.type=Wt,A.needsUpdate=!0;const D=S*4;for(let x=0;x<d;x++){const R=m[x],O=u[x],q=T[x],k=v*C*4*x;for(let Y=0;Y<R.count;Y++){const V=Y*D;f===!0&&(a.fromBufferAttribute(R,Y),E[k+V+0]=a.x,E[k+V+1]=a.y,E[k+V+2]=a.z,E[k+V+3]=0),g===!0&&(a.fromBufferAttribute(O,Y),E[k+V+4]=a.x,E[k+V+5]=a.y,E[k+V+6]=a.z,E[k+V+7]=0),w===!0&&(a.fromBufferAttribute(q,Y),E[k+V+8]=a.x,E[k+V+9]=a.y,E[k+V+10]=a.z,E[k+V+11]=q.itemSize===4?a.w:1)}}p={count:d,texture:A,size:new pe(v,C)},n.set(o,p),o.addEventListener("dispose",M)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let f=0;for(let w=0;w<c.length;w++)f+=c[w];const g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function Mf(i,e,t,n){let a=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=e.get(l,h);if(a.get(d)!==c&&(e.update(d),a.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),a.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),a.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;a.get(p)!==c&&(p.update(),a.set(p,c))}return d}function s(){a=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:s}}const Bl=new _t,Io=new bl(1,1),zl=new pl,kl=new fh,Gl=new wl,No=[],Fo=[],Oo=new Float32Array(16),qo=new Float32Array(9),Bo=new Float32Array(4);function vi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const a=e*t;let r=No[a];if(r===void 0&&(r=new Float32Array(a),No[a]=r),e!==0){n.toArray(r,0);for(let s=1,o=0;s!==e;++s)o+=t,i[s].toArray(r,o)}return r}function ut(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function ft(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ia(i,e){let t=Fo[e];t===void 0&&(t=new Int32Array(e),Fo[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Sf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function bf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ut(t,e))return;i.uniform2fv(this.addr,e),ft(t,e)}}function Ef(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ut(t,e))return;i.uniform3fv(this.addr,e),ft(t,e)}}function Tf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ut(t,e))return;i.uniform4fv(this.addr,e),ft(t,e)}}function Af(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ut(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),ft(t,e)}else{if(ut(t,n))return;Bo.set(n),i.uniformMatrix2fv(this.addr,!1,Bo),ft(t,n)}}function Rf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ut(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),ft(t,e)}else{if(ut(t,n))return;qo.set(n),i.uniformMatrix3fv(this.addr,!1,qo),ft(t,n)}}function Cf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ut(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),ft(t,e)}else{if(ut(t,n))return;Oo.set(n),i.uniformMatrix4fv(this.addr,!1,Oo),ft(t,n)}}function Pf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Df(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ut(t,e))return;i.uniform2iv(this.addr,e),ft(t,e)}}function Lf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ut(t,e))return;i.uniform3iv(this.addr,e),ft(t,e)}}function Uf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ut(t,e))return;i.uniform4iv(this.addr,e),ft(t,e)}}function If(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Nf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ut(t,e))return;i.uniform2uiv(this.addr,e),ft(t,e)}}function Ff(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ut(t,e))return;i.uniform3uiv(this.addr,e),ft(t,e)}}function Of(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ut(t,e))return;i.uniform4uiv(this.addr,e),ft(t,e)}}function qf(i,e,t){const n=this.cache,a=t.allocateTextureUnit();n[0]!==a&&(i.uniform1i(this.addr,a),n[0]=a);let r;this.type===i.SAMPLER_2D_SHADOW?(Io.compareFunction=ul,r=Io):r=Bl,t.setTexture2D(e||r,a)}function Bf(i,e,t){const n=this.cache,a=t.allocateTextureUnit();n[0]!==a&&(i.uniform1i(this.addr,a),n[0]=a),t.setTexture3D(e||kl,a)}function zf(i,e,t){const n=this.cache,a=t.allocateTextureUnit();n[0]!==a&&(i.uniform1i(this.addr,a),n[0]=a),t.setTextureCube(e||Gl,a)}function kf(i,e,t){const n=this.cache,a=t.allocateTextureUnit();n[0]!==a&&(i.uniform1i(this.addr,a),n[0]=a),t.setTexture2DArray(e||zl,a)}function Gf(i){switch(i){case 5126:return Sf;case 35664:return bf;case 35665:return Ef;case 35666:return Tf;case 35674:return Af;case 35675:return Rf;case 35676:return Cf;case 5124:case 35670:return Pf;case 35667:case 35671:return Df;case 35668:case 35672:return Lf;case 35669:case 35673:return Uf;case 5125:return If;case 36294:return Nf;case 36295:return Ff;case 36296:return Of;case 35678:case 36198:case 36298:case 36306:case 35682:return qf;case 35679:case 36299:case 36307:return Bf;case 35680:case 36300:case 36308:case 36293:return zf;case 36289:case 36303:case 36311:case 36292:return kf}}function Hf(i,e){i.uniform1fv(this.addr,e)}function Vf(i,e){const t=vi(e,this.size,2);i.uniform2fv(this.addr,t)}function Wf(i,e){const t=vi(e,this.size,3);i.uniform3fv(this.addr,t)}function Xf(i,e){const t=vi(e,this.size,4);i.uniform4fv(this.addr,t)}function Yf(i,e){const t=vi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Zf(i,e){const t=vi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Jf(i,e){const t=vi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Kf(i,e){i.uniform1iv(this.addr,e)}function $f(i,e){i.uniform2iv(this.addr,e)}function jf(i,e){i.uniform3iv(this.addr,e)}function Qf(i,e){i.uniform4iv(this.addr,e)}function ep(i,e){i.uniform1uiv(this.addr,e)}function tp(i,e){i.uniform2uiv(this.addr,e)}function np(i,e){i.uniform3uiv(this.addr,e)}function ip(i,e){i.uniform4uiv(this.addr,e)}function ap(i,e,t){const n=this.cache,a=e.length,r=Ia(t,a);ut(n,r)||(i.uniform1iv(this.addr,r),ft(n,r));for(let s=0;s!==a;++s)t.setTexture2D(e[s]||Bl,r[s])}function rp(i,e,t){const n=this.cache,a=e.length,r=Ia(t,a);ut(n,r)||(i.uniform1iv(this.addr,r),ft(n,r));for(let s=0;s!==a;++s)t.setTexture3D(e[s]||kl,r[s])}function sp(i,e,t){const n=this.cache,a=e.length,r=Ia(t,a);ut(n,r)||(i.uniform1iv(this.addr,r),ft(n,r));for(let s=0;s!==a;++s)t.setTextureCube(e[s]||Gl,r[s])}function op(i,e,t){const n=this.cache,a=e.length,r=Ia(t,a);ut(n,r)||(i.uniform1iv(this.addr,r),ft(n,r));for(let s=0;s!==a;++s)t.setTexture2DArray(e[s]||zl,r[s])}function lp(i){switch(i){case 5126:return Hf;case 35664:return Vf;case 35665:return Wf;case 35666:return Xf;case 35674:return Yf;case 35675:return Zf;case 35676:return Jf;case 5124:case 35670:return Kf;case 35667:case 35671:return $f;case 35668:case 35672:return jf;case 35669:case 35673:return Qf;case 5125:return ep;case 36294:return tp;case 36295:return np;case 36296:return ip;case 35678:case 36198:case 36298:case 36306:case 35682:return ap;case 35679:case 36299:case 36307:return rp;case 35680:case 36300:case 36308:case 36293:return sp;case 36289:case 36303:case 36311:case 36292:return op}}class cp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Gf(t.type)}}class hp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=lp(t.type)}}class dp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const a=this.seq;for(let r=0,s=a.length;r!==s;++r){const o=a[r];o.setValue(e,t[o.id],n)}}}const vr=/(\w+)(\])?(\[|\.)?/g;function zo(i,e){i.seq.push(e),i.map[e.id]=e}function up(i,e,t){const n=i.name,a=n.length;for(vr.lastIndex=0;;){const r=vr.exec(n),s=vr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&s+2===a){zo(t,c===void 0?new cp(o,i,e):new hp(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new dp(o),zo(t,d)),t=d}}}class Ea{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const r=e.getActiveUniform(t,a),s=e.getUniformLocation(t,r.name);up(r,s,this)}}setValue(e,t,n,a){const r=this.map[t];r!==void 0&&r.setValue(e,n,a)}setOptional(e,t,n){const a=t[n];a!==void 0&&this.setValue(e,n,a)}static upload(e,t,n,a){for(let r=0,s=t.length;r!==s;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,a)}}static seqWithValue(e,t){const n=[];for(let a=0,r=e.length;a!==r;++a){const s=e[a];s.id in t&&n.push(s)}return n}}function ko(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const fp=37297;let pp=0;function mp(i,e){const t=i.split(`
`),n=[],a=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let s=a;s<r;s++){const o=s+1;n.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return n.join(`
`)}const Go=new Ve;function vp(i){$e._getMatrix(Go,$e.workingColorSpace,i);const e=`mat3( ${Go.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(i)){case Ta:return[e,"LinearTransferOETF"];case et:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Ho(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+mp(i.getShaderSource(e),o)}else return r}function gp(i,e){const t=vp(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function _p(i,e){let t;switch(e){case Tc:t="Linear";break;case Ac:t="Reinhard";break;case Rc:t="Cineon";break;case Cc:t="ACESFilmic";break;case Dc:t="AgX";break;case Lc:t="Neutral";break;case Pc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const _a=new L;function xp(){$e.getLuminanceCoefficients(_a);const i=_a.x.toFixed(4),e=_a.y.toFixed(4),t=_a.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function yp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ai).join(`
`)}function wp(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Mp(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let a=0;a<n;a++){const r=i.getActiveAttrib(e,a),s=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[s]={type:r.type,location:i.getAttribLocation(e,s),locationSize:o}}return t}function Ai(i){return i!==""}function Vo(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Wo(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Sp=/^[ \t]*#include +<([\w\d./]+)>/gm;function os(i){return i.replace(Sp,Ep)}const bp=new Map;function Ep(i,e){let t=We[e];if(t===void 0){const n=bp.get(e);if(n!==void 0)t=We[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return os(t)}const Tp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xo(i){return i.replace(Tp,Ap)}function Ap(i,e,t,n){let a="";for(let r=parseInt(e);r<parseInt(t);r++)a+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return a}function Yo(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Rp(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===tl?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===rc?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===nn&&(e="SHADOWMAP_TYPE_VSM"),e}function Cp(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case oi:case li:e="ENVMAP_TYPE_CUBE";break;case Da:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Pp(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case li:e="ENVMAP_MODE_REFRACTION";break}return e}function Dp(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case nl:e="ENVMAP_BLENDING_MULTIPLY";break;case bc:e="ENVMAP_BLENDING_MIX";break;case Ec:e="ENVMAP_BLENDING_ADD";break}return e}function Lp(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Up(i,e,t,n){const a=i.getContext(),r=t.defines;let s=t.vertexShader,o=t.fragmentShader;const l=Rp(t),c=Cp(t),h=Pp(t),d=Dp(t),p=Lp(t),f=yp(t),g=wp(r),w=a.createProgram();let m,u,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ai).join(`
`),m.length>0&&(m+=`
`),u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ai).join(`
`),u.length>0&&(u+=`
`)):(m=[Yo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ai).join(`
`),u=[Yo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==pn?"#define TONE_MAPPING":"",t.toneMapping!==pn?We.tonemapping_pars_fragment:"",t.toneMapping!==pn?_p("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,gp("linearToOutputTexel",t.outputColorSpace),xp(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ai).join(`
`)),s=os(s),s=Vo(s,t),s=Wo(s,t),o=os(o),o=Vo(o,t),o=Wo(o,t),s=Xo(s),o=Xo(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,u=["#define varying in",t.glslVersion===Ws?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ws?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const S=T+m+s,v=T+u+o,C=ko(a,a.VERTEX_SHADER,S),E=ko(a,a.FRAGMENT_SHADER,v);a.attachShader(w,C),a.attachShader(w,E),t.index0AttributeName!==void 0?a.bindAttribLocation(w,0,t.index0AttributeName):t.morphTargets===!0&&a.bindAttribLocation(w,0,"position"),a.linkProgram(w);function A(R){if(i.debug.checkShaderErrors){const O=a.getProgramInfoLog(w)||"",q=a.getShaderInfoLog(C)||"",k=a.getShaderInfoLog(E)||"",Y=O.trim(),V=q.trim(),$=k.trim();let G=!0,le=!0;if(a.getProgramParameter(w,a.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(a,w,C,E);else{const ve=Ho(a,C,"vertex"),fe=Ho(a,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(w,a.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+Y+`
`+ve+`
`+fe)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(V===""||$==="")&&(le=!1);le&&(R.diagnostics={runnable:G,programLog:Y,vertexShader:{log:V,prefix:m},fragmentShader:{log:$,prefix:u}})}a.deleteShader(C),a.deleteShader(E),D=new Ea(a,w),M=Mp(a,w)}let D;this.getUniforms=function(){return D===void 0&&A(this),D};let M;this.getAttributes=function(){return M===void 0&&A(this),M};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=a.getProgramParameter(w,fp)),x},this.destroy=function(){n.releaseStatesOfProgram(this),a.deleteProgram(w),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=pp++,this.cacheKey=e,this.usedTimes=1,this.program=w,this.vertexShader=C,this.fragmentShader=E,this}let Ip=0;class Np{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,a=this._getShaderStage(t),r=this._getShaderStage(n),s=this._getShaderCacheForMaterial(e);return s.has(a)===!1&&(s.add(a),a.usedTimes++),s.has(r)===!1&&(s.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Fp(e),t.set(e,n)),n}}class Fp{constructor(e){this.id=Ip++,this.code=e,this.usedTimes=0}}function Op(i,e,t,n,a,r,s){const o=new Ms,l=new Np,c=new Set,h=[],d=a.logarithmicDepthBuffer,p=a.vertexTextures;let f=a.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function w(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,x,R,O,q){const k=O.fog,Y=q.geometry,V=M.isMeshStandardMaterial?O.environment:null,$=(M.isMeshStandardMaterial?t:e).get(M.envMap||V),G=$&&$.mapping===Da?$.image.height:null,le=g[M.type];M.precision!==null&&(f=a.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const ve=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,fe=ve!==void 0?ve.length:0;let Ce=0;Y.morphAttributes.position!==void 0&&(Ce=1),Y.morphAttributes.normal!==void 0&&(Ce=2),Y.morphAttributes.color!==void 0&&(Ce=3);let Xe,ze,W,Q;if(le){const je=Ht[le];Xe=je.vertexShader,ze=je.fragmentShader}else Xe=M.vertexShader,ze=M.fragmentShader,l.update(M),W=l.getVertexShaderID(M),Q=l.getFragmentShaderID(M);const ie=i.getRenderTarget(),Le=i.state.buffers.depth.getReversed(),Me=q.isInstancedMesh===!0,Ne=q.isBatchedMesh===!0,Re=!!M.map,De=!!M.matcap,P=!!$,j=!!M.aoMap,Z=!!M.lightMap,te=!!M.bumpMap,J=!!M.normalMap,he=!!M.displacementMap,ne=!!M.emissiveMap,de=!!M.metalnessMap,ke=!!M.roughnessMap,Be=M.anisotropy>0,b=M.clearcoat>0,_=M.dispersion>0,F=M.iridescence>0,H=M.sheen>0,ee=M.transmission>0,X=Be&&!!M.anisotropyMap,Ae=b&&!!M.clearcoatMap,ce=b&&!!M.clearcoatNormalMap,be=b&&!!M.clearcoatRoughnessMap,Ee=F&&!!M.iridescenceMap,ae=F&&!!M.iridescenceThicknessMap,xe=H&&!!M.sheenColorMap,Oe=H&&!!M.sheenRoughnessMap,Pe=!!M.specularMap,ge=!!M.specularColorMap,He=!!M.specularIntensityMap,U=ee&&!!M.transmissionMap,oe=ee&&!!M.thicknessMap,ue=!!M.gradientMap,we=!!M.alphaMap,re=M.alphaTest>0,K=!!M.alphaHash,Te=!!M.extensions;let Ge=pn;M.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Ge=i.toneMapping);const at={shaderID:le,shaderType:M.type,shaderName:M.name,vertexShader:Xe,fragmentShader:ze,defines:M.defines,customVertexShaderID:W,customFragmentShaderID:Q,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Ne,batchingColor:Ne&&q._colorsTexture!==null,instancing:Me,instancingColor:Me&&q.instanceColor!==null,instancingMorph:Me&&q.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:ie===null?i.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:ci,alphaToCoverage:!!M.alphaToCoverage,map:Re,matcap:De,envMap:P,envMapMode:P&&$.mapping,envMapCubeUVHeight:G,aoMap:j,lightMap:Z,bumpMap:te,normalMap:J,displacementMap:p&&he,emissiveMap:ne,normalMapObjectSpace:J&&M.normalMapType===Fc,normalMapTangentSpace:J&&M.normalMapType===dl,metalnessMap:de,roughnessMap:ke,anisotropy:Be,anisotropyMap:X,clearcoat:b,clearcoatMap:Ae,clearcoatNormalMap:ce,clearcoatRoughnessMap:be,dispersion:_,iridescence:F,iridescenceMap:Ee,iridescenceThicknessMap:ae,sheen:H,sheenColorMap:xe,sheenRoughnessMap:Oe,specularMap:Pe,specularColorMap:ge,specularIntensityMap:He,transmission:ee,transmissionMap:U,thicknessMap:oe,gradientMap:ue,opaque:M.transparent===!1&&M.blending===ii&&M.alphaToCoverage===!1,alphaMap:we,alphaTest:re,alphaHash:K,combine:M.combine,mapUv:Re&&w(M.map.channel),aoMapUv:j&&w(M.aoMap.channel),lightMapUv:Z&&w(M.lightMap.channel),bumpMapUv:te&&w(M.bumpMap.channel),normalMapUv:J&&w(M.normalMap.channel),displacementMapUv:he&&w(M.displacementMap.channel),emissiveMapUv:ne&&w(M.emissiveMap.channel),metalnessMapUv:de&&w(M.metalnessMap.channel),roughnessMapUv:ke&&w(M.roughnessMap.channel),anisotropyMapUv:X&&w(M.anisotropyMap.channel),clearcoatMapUv:Ae&&w(M.clearcoatMap.channel),clearcoatNormalMapUv:ce&&w(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&w(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Ee&&w(M.iridescenceMap.channel),iridescenceThicknessMapUv:ae&&w(M.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&w(M.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&w(M.sheenRoughnessMap.channel),specularMapUv:Pe&&w(M.specularMap.channel),specularColorMapUv:ge&&w(M.specularColorMap.channel),specularIntensityMapUv:He&&w(M.specularIntensityMap.channel),transmissionMapUv:U&&w(M.transmissionMap.channel),thicknessMapUv:oe&&w(M.thicknessMap.channel),alphaMapUv:we&&w(M.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(J||Be),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!Y.attributes.uv&&(Re||we),fog:!!k,useFog:M.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Le,skinning:q.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:fe,morphTextureStride:Ce,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ge,decodeVideoTexture:Re&&M.map.isVideoTexture===!0&&$e.getTransfer(M.map.colorSpace)===et,decodeVideoTextureEmissive:ne&&M.emissiveMap.isVideoTexture===!0&&$e.getTransfer(M.emissiveMap.colorSpace)===et,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===an,flipSided:M.side===St,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Te&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Te&&M.extensions.multiDraw===!0||Ne)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return at.vertexUv1s=c.has(1),at.vertexUv2s=c.has(2),at.vertexUv3s=c.has(3),c.clear(),at}function u(M){const x=[];if(M.shaderID?x.push(M.shaderID):(x.push(M.customVertexShaderID),x.push(M.customFragmentShaderID)),M.defines!==void 0)for(const R in M.defines)x.push(R),x.push(M.defines[R]);return M.isRawShaderMaterial===!1&&(T(x,M),S(x,M),x.push(i.outputColorSpace)),x.push(M.customProgramCacheKey),x.join()}function T(M,x){M.push(x.precision),M.push(x.outputColorSpace),M.push(x.envMapMode),M.push(x.envMapCubeUVHeight),M.push(x.mapUv),M.push(x.alphaMapUv),M.push(x.lightMapUv),M.push(x.aoMapUv),M.push(x.bumpMapUv),M.push(x.normalMapUv),M.push(x.displacementMapUv),M.push(x.emissiveMapUv),M.push(x.metalnessMapUv),M.push(x.roughnessMapUv),M.push(x.anisotropyMapUv),M.push(x.clearcoatMapUv),M.push(x.clearcoatNormalMapUv),M.push(x.clearcoatRoughnessMapUv),M.push(x.iridescenceMapUv),M.push(x.iridescenceThicknessMapUv),M.push(x.sheenColorMapUv),M.push(x.sheenRoughnessMapUv),M.push(x.specularMapUv),M.push(x.specularColorMapUv),M.push(x.specularIntensityMapUv),M.push(x.transmissionMapUv),M.push(x.thicknessMapUv),M.push(x.combine),M.push(x.fogExp2),M.push(x.sizeAttenuation),M.push(x.morphTargetsCount),M.push(x.morphAttributeCount),M.push(x.numDirLights),M.push(x.numPointLights),M.push(x.numSpotLights),M.push(x.numSpotLightMaps),M.push(x.numHemiLights),M.push(x.numRectAreaLights),M.push(x.numDirLightShadows),M.push(x.numPointLightShadows),M.push(x.numSpotLightShadows),M.push(x.numSpotLightShadowsWithMaps),M.push(x.numLightProbes),M.push(x.shadowMapType),M.push(x.toneMapping),M.push(x.numClippingPlanes),M.push(x.numClipIntersection),M.push(x.depthPacking)}function S(M,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),x.gradientMap&&o.enable(22),M.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reversedDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),M.push(o.mask)}function v(M){const x=g[M.type];let R;if(x){const O=Ht[x];R=Th.clone(O.uniforms)}else R=M.uniforms;return R}function C(M,x){let R;for(let O=0,q=h.length;O<q;O++){const k=h[O];if(k.cacheKey===x){R=k,++R.usedTimes;break}}return R===void 0&&(R=new Up(i,x,M,r),h.push(R)),R}function E(M){if(--M.usedTimes===0){const x=h.indexOf(M);h[x]=h[h.length-1],h.pop(),M.destroy()}}function A(M){l.remove(M)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:v,acquireProgram:C,releaseProgram:E,releaseShaderCache:A,programs:h,dispose:D}}function qp(){let i=new WeakMap;function e(s){return i.has(s)}function t(s){let o=i.get(s);return o===void 0&&(o={},i.set(s,o)),o}function n(s){i.delete(s)}function a(s,o,l){i.get(s)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:a,dispose:r}}function Bp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Zo(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Jo(){const i=[];let e=0;const t=[],n=[],a=[];function r(){e=0,t.length=0,n.length=0,a.length=0}function s(d,p,f,g,w,m){let u=i[e];return u===void 0?(u={id:d.id,object:d,geometry:p,material:f,groupOrder:g,renderOrder:d.renderOrder,z:w,group:m},i[e]=u):(u.id=d.id,u.object=d,u.geometry=p,u.material=f,u.groupOrder=g,u.renderOrder=d.renderOrder,u.z=w,u.group=m),e++,u}function o(d,p,f,g,w,m){const u=s(d,p,f,g,w,m);f.transmission>0?n.push(u):f.transparent===!0?a.push(u):t.push(u)}function l(d,p,f,g,w,m){const u=s(d,p,f,g,w,m);f.transmission>0?n.unshift(u):f.transparent===!0?a.unshift(u):t.unshift(u)}function c(d,p){t.length>1&&t.sort(d||Bp),n.length>1&&n.sort(p||Zo),a.length>1&&a.sort(p||Zo)}function h(){for(let d=e,p=i.length;d<p;d++){const f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:a,init:r,push:o,unshift:l,finish:h,sort:c}}function zp(){let i=new WeakMap;function e(n,a){const r=i.get(n);let s;return r===void 0?(s=new Jo,i.set(n,[s])):a>=r.length?(s=new Jo,r.push(s)):s=r[a],s}function t(){i=new WeakMap}return{get:e,dispose:t}}function kp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Je};break;case"SpotLight":t={position:new L,direction:new L,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function Gp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Hp=0;function Vp(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Wp(i){const e=new kp,t=Gp(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const a=new L,r=new nt,s=new nt;function o(c){let h=0,d=0,p=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,g=0,w=0,m=0,u=0,T=0,S=0,v=0,C=0,E=0,A=0;c.sort(Vp);for(let M=0,x=c.length;M<x;M++){const R=c[M],O=R.color,q=R.intensity,k=R.distance,Y=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=O.r*q,d+=O.g*q,p+=O.b*q;else if(R.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(R.sh.coefficients[V],q);A++}else if(R.isDirectionalLight){const V=e.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const $=R.shadow,G=t.get(R);G.shadowIntensity=$.intensity,G.shadowBias=$.bias,G.shadowNormalBias=$.normalBias,G.shadowRadius=$.radius,G.shadowMapSize=$.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=Y,n.directionalShadowMatrix[f]=R.shadow.matrix,T++}n.directional[f]=V,f++}else if(R.isSpotLight){const V=e.get(R);V.position.setFromMatrixPosition(R.matrixWorld),V.color.copy(O).multiplyScalar(q),V.distance=k,V.coneCos=Math.cos(R.angle),V.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),V.decay=R.decay,n.spot[w]=V;const $=R.shadow;if(R.map&&(n.spotLightMap[C]=R.map,C++,$.updateMatrices(R),R.castShadow&&E++),n.spotLightMatrix[w]=$.matrix,R.castShadow){const G=t.get(R);G.shadowIntensity=$.intensity,G.shadowBias=$.bias,G.shadowNormalBias=$.normalBias,G.shadowRadius=$.radius,G.shadowMapSize=$.mapSize,n.spotShadow[w]=G,n.spotShadowMap[w]=Y,v++}w++}else if(R.isRectAreaLight){const V=e.get(R);V.color.copy(O).multiplyScalar(q),V.halfWidth.set(R.width*.5,0,0),V.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=V,m++}else if(R.isPointLight){const V=e.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),V.distance=R.distance,V.decay=R.decay,R.castShadow){const $=R.shadow,G=t.get(R);G.shadowIntensity=$.intensity,G.shadowBias=$.bias,G.shadowNormalBias=$.normalBias,G.shadowRadius=$.radius,G.shadowMapSize=$.mapSize,G.shadowCameraNear=$.camera.near,G.shadowCameraFar=$.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=R.shadow.matrix,S++}n.point[g]=V,g++}else if(R.isHemisphereLight){const V=e.get(R);V.skyColor.copy(R.color).multiplyScalar(q),V.groundColor.copy(R.groundColor).multiplyScalar(q),n.hemi[u]=V,u++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=me.LTC_FLOAT_1,n.rectAreaLTC2=me.LTC_FLOAT_2):(n.rectAreaLTC1=me.LTC_HALF_1,n.rectAreaLTC2=me.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=p;const D=n.hash;(D.directionalLength!==f||D.pointLength!==g||D.spotLength!==w||D.rectAreaLength!==m||D.hemiLength!==u||D.numDirectionalShadows!==T||D.numPointShadows!==S||D.numSpotShadows!==v||D.numSpotMaps!==C||D.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=w,n.rectArea.length=m,n.point.length=g,n.hemi.length=u,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=v+C-E,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=A,D.directionalLength=f,D.pointLength=g,D.spotLength=w,D.rectAreaLength=m,D.hemiLength=u,D.numDirectionalShadows=T,D.numPointShadows=S,D.numSpotShadows=v,D.numSpotMaps=C,D.numLightProbes=A,n.version=Hp++)}function l(c,h){let d=0,p=0,f=0,g=0,w=0;const m=h.matrixWorldInverse;for(let u=0,T=c.length;u<T;u++){const S=c[u];if(S.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(S.matrixWorld),a.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(a),v.direction.transformDirection(m),d++}else if(S.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(S.matrixWorld),a.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(a),v.direction.transformDirection(m),f++}else if(S.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),s.identity(),r.copy(S.matrixWorld),r.premultiply(m),s.extractRotation(r),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(s),v.halfHeight.applyMatrix4(s),g++}else if(S.isPointLight){const v=n.point[p];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),p++}else if(S.isHemisphereLight){const v=n.hemi[w];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(m),w++}}}return{setup:o,setupView:l,state:n}}function Ko(i){const e=new Wp(i),t=[],n=[];function a(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function s(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:s}}function Xp(i){let e=new WeakMap;function t(a,r=0){const s=e.get(a);let o;return s===void 0?(o=new Ko(i),e.set(a,[o])):r>=s.length?(o=new Ko(i),s.push(o)):o=s[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Yp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Zp=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Jp(i,e,t){let n=new Ss;const a=new pe,r=new pe,s=new tt,o=new _0({depthPacking:Nc}),l=new x0,c={},h=t.maxTextureSize,d={[mn]:St,[St]:mn,[an]:an},p=new vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new pe},radius:{value:4}},vertexShader:Yp,fragmentShader:Zp}),f=p.clone();f.defines.HORIZONTAL_PASS=1;const g=new It;g.setAttribute("position",new kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new zt(g,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tl;let u=this.type;this.render=function(E,A,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const M=i.getRenderTarget(),x=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),O=i.state;O.setBlending(fn),O.buffers.depth.getReversed()?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const q=u!==nn&&this.type===nn,k=u===nn&&this.type!==nn;for(let Y=0,V=E.length;Y<V;Y++){const $=E[Y],G=$.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;a.copy(G.mapSize);const le=G.getFrameExtents();if(a.multiply(le),r.copy(G.mapSize),(a.x>h||a.y>h)&&(a.x>h&&(r.x=Math.floor(h/le.x),a.x=r.x*le.x,G.mapSize.x=r.x),a.y>h&&(r.y=Math.floor(h/le.y),a.y=r.y*le.y,G.mapSize.y=r.y)),G.map===null||q===!0||k===!0){const fe=this.type!==nn?{minFilter:Ct,magFilter:Ct}:{};G.map!==null&&G.map.dispose(),G.map=new Ln(a.x,a.y,fe),G.map.texture.name=$.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const ve=G.getViewportCount();for(let fe=0;fe<ve;fe++){const Ce=G.getViewport(fe);s.set(r.x*Ce.x,r.y*Ce.y,r.x*Ce.z,r.y*Ce.w),O.viewport(s),G.updateMatrices($,fe),n=G.getFrustum(),v(A,D,G.camera,$,this.type)}G.isPointLightShadow!==!0&&this.type===nn&&T(G,D),G.needsUpdate=!1}u=this.type,m.needsUpdate=!1,i.setRenderTarget(M,x,R)};function T(E,A){const D=e.update(w);p.defines.VSM_SAMPLES!==E.blurSamples&&(p.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,p.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Ln(a.x,a.y)),p.uniforms.shadow_pass.value=E.map.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(A,null,D,p,w,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(A,null,D,f,w,null)}function S(E,A,D,M){let x=null;const R=D.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)x=R;else if(x=D.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const O=x.uuid,q=A.uuid;let k=c[O];k===void 0&&(k={},c[O]=k);let Y=k[q];Y===void 0&&(Y=x.clone(),k[q]=Y,A.addEventListener("dispose",C)),x=Y}if(x.visible=A.visible,x.wireframe=A.wireframe,M===nn?x.side=A.shadowSide!==null?A.shadowSide:A.side:x.side=A.shadowSide!==null?A.shadowSide:d[A.side],x.alphaMap=A.alphaMap,x.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,x.map=A.map,x.clipShadows=A.clipShadows,x.clippingPlanes=A.clippingPlanes,x.clipIntersection=A.clipIntersection,x.displacementMap=A.displacementMap,x.displacementScale=A.displacementScale,x.displacementBias=A.displacementBias,x.wireframeLinewidth=A.wireframeLinewidth,x.linewidth=A.linewidth,D.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const O=i.properties.get(x);O.light=D}return x}function v(E,A,D,M,x){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&x===nn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,E.matrixWorld);const q=e.update(E),k=E.material;if(Array.isArray(k)){const Y=q.groups;for(let V=0,$=Y.length;V<$;V++){const G=Y[V],le=k[G.materialIndex];if(le&&le.visible){const ve=S(E,le,M,x);E.onBeforeShadow(i,E,A,D,q,ve,G),i.renderBufferDirect(D,null,q,ve,E,G),E.onAfterShadow(i,E,A,D,q,ve,G)}}}else if(k.visible){const Y=S(E,k,M,x);E.onBeforeShadow(i,E,A,D,q,Y,null),i.renderBufferDirect(D,null,q,Y,E,null),E.onAfterShadow(i,E,A,D,q,Y,null)}}const O=E.children;for(let q=0,k=O.length;q<k;q++)v(O[q],A,D,M,x)}function C(E){E.target.removeEventListener("dispose",C);for(const D in c){const M=c[D],x=E.target.uuid;x in M&&(M[x].dispose(),delete M[x])}}}const Kp={[xr]:yr,[wr]:br,[Mr]:Er,[si]:Sr,[yr]:xr,[br]:wr,[Er]:Mr,[Sr]:si};function $p(i,e){function t(){let U=!1;const oe=new tt;let ue=null;const we=new tt(0,0,0,0);return{setMask:function(re){ue!==re&&!U&&(i.colorMask(re,re,re,re),ue=re)},setLocked:function(re){U=re},setClear:function(re,K,Te,Ge,at){at===!0&&(re*=Ge,K*=Ge,Te*=Ge),oe.set(re,K,Te,Ge),we.equals(oe)===!1&&(i.clearColor(re,K,Te,Ge),we.copy(oe))},reset:function(){U=!1,ue=null,we.set(-1,0,0,0)}}}function n(){let U=!1,oe=!1,ue=null,we=null,re=null;return{setReversed:function(K){if(oe!==K){const Te=e.get("EXT_clip_control");K?Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.ZERO_TO_ONE_EXT):Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.NEGATIVE_ONE_TO_ONE_EXT),oe=K;const Ge=re;re=null,this.setClear(Ge)}},getReversed:function(){return oe},setTest:function(K){K?ie(i.DEPTH_TEST):Le(i.DEPTH_TEST)},setMask:function(K){ue!==K&&!U&&(i.depthMask(K),ue=K)},setFunc:function(K){if(oe&&(K=Kp[K]),we!==K){switch(K){case xr:i.depthFunc(i.NEVER);break;case yr:i.depthFunc(i.ALWAYS);break;case wr:i.depthFunc(i.LESS);break;case si:i.depthFunc(i.LEQUAL);break;case Mr:i.depthFunc(i.EQUAL);break;case Sr:i.depthFunc(i.GEQUAL);break;case br:i.depthFunc(i.GREATER);break;case Er:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}we=K}},setLocked:function(K){U=K},setClear:function(K){re!==K&&(oe&&(K=1-K),i.clearDepth(K),re=K)},reset:function(){U=!1,ue=null,we=null,re=null,oe=!1}}}function a(){let U=!1,oe=null,ue=null,we=null,re=null,K=null,Te=null,Ge=null,at=null;return{setTest:function(je){U||(je?ie(i.STENCIL_TEST):Le(i.STENCIL_TEST))},setMask:function(je){oe!==je&&!U&&(i.stencilMask(je),oe=je)},setFunc:function(je,Kt,Gt){(ue!==je||we!==Kt||re!==Gt)&&(i.stencilFunc(je,Kt,Gt),ue=je,we=Kt,re=Gt)},setOp:function(je,Kt,Gt){(K!==je||Te!==Kt||Ge!==Gt)&&(i.stencilOp(je,Kt,Gt),K=je,Te=Kt,Ge=Gt)},setLocked:function(je){U=je},setClear:function(je){at!==je&&(i.clearStencil(je),at=je)},reset:function(){U=!1,oe=null,ue=null,we=null,re=null,K=null,Te=null,Ge=null,at=null}}}const r=new t,s=new n,o=new a,l=new WeakMap,c=new WeakMap;let h={},d={},p=new WeakMap,f=[],g=null,w=!1,m=null,u=null,T=null,S=null,v=null,C=null,E=null,A=new Je(0,0,0),D=0,M=!1,x=null,R=null,O=null,q=null,k=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,$=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(G)[1]),V=$>=1):G.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),V=$>=2);let le=null,ve={};const fe=i.getParameter(i.SCISSOR_BOX),Ce=i.getParameter(i.VIEWPORT),Xe=new tt().fromArray(fe),ze=new tt().fromArray(Ce);function W(U,oe,ue,we){const re=new Uint8Array(4),K=i.createTexture();i.bindTexture(U,K),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Te=0;Te<ue;Te++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(oe,0,i.RGBA,1,1,we,0,i.RGBA,i.UNSIGNED_BYTE,re):i.texImage2D(oe+Te,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,re);return K}const Q={};Q[i.TEXTURE_2D]=W(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=W(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=W(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=W(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),ie(i.DEPTH_TEST),s.setFunc(si),te(!1),J(Bs),ie(i.CULL_FACE),j(fn);function ie(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function Le(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function Me(U,oe){return d[U]!==oe?(i.bindFramebuffer(U,oe),d[U]=oe,U===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=oe),U===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=oe),!0):!1}function Ne(U,oe){let ue=f,we=!1;if(U){ue=p.get(oe),ue===void 0&&(ue=[],p.set(oe,ue));const re=U.textures;if(ue.length!==re.length||ue[0]!==i.COLOR_ATTACHMENT0){for(let K=0,Te=re.length;K<Te;K++)ue[K]=i.COLOR_ATTACHMENT0+K;ue.length=re.length,we=!0}}else ue[0]!==i.BACK&&(ue[0]=i.BACK,we=!0);we&&i.drawBuffers(ue)}function Re(U){return g!==U?(i.useProgram(U),g=U,!0):!1}const De={[An]:i.FUNC_ADD,[oc]:i.FUNC_SUBTRACT,[lc]:i.FUNC_REVERSE_SUBTRACT};De[cc]=i.MIN,De[hc]=i.MAX;const P={[dc]:i.ZERO,[uc]:i.ONE,[fc]:i.SRC_COLOR,[gr]:i.SRC_ALPHA,[xc]:i.SRC_ALPHA_SATURATE,[gc]:i.DST_COLOR,[mc]:i.DST_ALPHA,[pc]:i.ONE_MINUS_SRC_COLOR,[_r]:i.ONE_MINUS_SRC_ALPHA,[_c]:i.ONE_MINUS_DST_COLOR,[vc]:i.ONE_MINUS_DST_ALPHA,[yc]:i.CONSTANT_COLOR,[wc]:i.ONE_MINUS_CONSTANT_COLOR,[Mc]:i.CONSTANT_ALPHA,[Sc]:i.ONE_MINUS_CONSTANT_ALPHA};function j(U,oe,ue,we,re,K,Te,Ge,at,je){if(U===fn){w===!0&&(Le(i.BLEND),w=!1);return}if(w===!1&&(ie(i.BLEND),w=!0),U!==sc){if(U!==m||je!==M){if((u!==An||v!==An)&&(i.blendEquation(i.FUNC_ADD),u=An,v=An),je)switch(U){case ii:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case zs:i.blendFunc(i.ONE,i.ONE);break;case ks:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Gs:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case ii:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case zs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ks:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Gs:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}T=null,S=null,C=null,E=null,A.set(0,0,0),D=0,m=U,M=je}return}re=re||oe,K=K||ue,Te=Te||we,(oe!==u||re!==v)&&(i.blendEquationSeparate(De[oe],De[re]),u=oe,v=re),(ue!==T||we!==S||K!==C||Te!==E)&&(i.blendFuncSeparate(P[ue],P[we],P[K],P[Te]),T=ue,S=we,C=K,E=Te),(Ge.equals(A)===!1||at!==D)&&(i.blendColor(Ge.r,Ge.g,Ge.b,at),A.copy(Ge),D=at),m=U,M=!1}function Z(U,oe){U.side===an?Le(i.CULL_FACE):ie(i.CULL_FACE);let ue=U.side===St;oe&&(ue=!ue),te(ue),U.blending===ii&&U.transparent===!1?j(fn):j(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),s.setFunc(U.depthFunc),s.setTest(U.depthTest),s.setMask(U.depthWrite),r.setMask(U.colorWrite);const we=U.stencilWrite;o.setTest(we),we&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),ne(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ie(i.SAMPLE_ALPHA_TO_COVERAGE):Le(i.SAMPLE_ALPHA_TO_COVERAGE)}function te(U){x!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),x=U)}function J(U){U!==ic?(ie(i.CULL_FACE),U!==R&&(U===Bs?i.cullFace(i.BACK):U===ac?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Le(i.CULL_FACE),R=U}function he(U){U!==O&&(V&&i.lineWidth(U),O=U)}function ne(U,oe,ue){U?(ie(i.POLYGON_OFFSET_FILL),(q!==oe||k!==ue)&&(i.polygonOffset(oe,ue),q=oe,k=ue)):Le(i.POLYGON_OFFSET_FILL)}function de(U){U?ie(i.SCISSOR_TEST):Le(i.SCISSOR_TEST)}function ke(U){U===void 0&&(U=i.TEXTURE0+Y-1),le!==U&&(i.activeTexture(U),le=U)}function Be(U,oe,ue){ue===void 0&&(le===null?ue=i.TEXTURE0+Y-1:ue=le);let we=ve[ue];we===void 0&&(we={type:void 0,texture:void 0},ve[ue]=we),(we.type!==U||we.texture!==oe)&&(le!==ue&&(i.activeTexture(ue),le=ue),i.bindTexture(U,oe||Q[U]),we.type=U,we.texture=oe)}function b(){const U=ve[le];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function _(){try{i.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function F(){try{i.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function H(){try{i.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ee(){try{i.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ae(){try{i.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ce(){try{i.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function be(){try{i.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ee(){try{i.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ae(){try{i.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function xe(U){Xe.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),Xe.copy(U))}function Oe(U){ze.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),ze.copy(U))}function Pe(U,oe){let ue=c.get(oe);ue===void 0&&(ue=new WeakMap,c.set(oe,ue));let we=ue.get(U);we===void 0&&(we=i.getUniformBlockIndex(oe,U.name),ue.set(U,we))}function ge(U,oe){const we=c.get(oe).get(U);l.get(oe)!==we&&(i.uniformBlockBinding(oe,we,U.__bindingPointIndex),l.set(oe,we))}function He(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),s.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},le=null,ve={},d={},p=new WeakMap,f=[],g=null,w=!1,m=null,u=null,T=null,S=null,v=null,C=null,E=null,A=new Je(0,0,0),D=0,M=!1,x=null,R=null,O=null,q=null,k=null,Xe.set(0,0,i.canvas.width,i.canvas.height),ze.set(0,0,i.canvas.width,i.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:ie,disable:Le,bindFramebuffer:Me,drawBuffers:Ne,useProgram:Re,setBlending:j,setMaterial:Z,setFlipSided:te,setCullFace:J,setLineWidth:he,setPolygonOffset:ne,setScissorTest:de,activeTexture:ke,bindTexture:Be,unbindTexture:b,compressedTexImage2D:_,compressedTexImage3D:F,texImage2D:Ee,texImage3D:ae,updateUBOMapping:Pe,uniformBlockBinding:ge,texStorage2D:ce,texStorage3D:be,texSubImage2D:H,texSubImage3D:ee,compressedTexSubImage2D:X,compressedTexSubImage3D:Ae,scissor:xe,viewport:Oe,reset:He}}function jp(i,e,t,n,a,r,s){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new pe,h=new WeakMap;let d;const p=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,_){return f?new OffscreenCanvas(b,_):Ra("canvas")}function w(b,_,F){let H=1;const ee=Be(b);if((ee.width>F||ee.height>F)&&(H=F/Math.max(ee.width,ee.height)),H<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const X=Math.floor(H*ee.width),Ae=Math.floor(H*ee.height);d===void 0&&(d=g(X,Ae));const ce=_?g(X,Ae):d;return ce.width=X,ce.height=Ae,ce.getContext("2d").drawImage(b,0,0,X,Ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+X+"x"+Ae+")."),ce}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),b;return b}function m(b){return b.generateMipmaps}function u(b){i.generateMipmap(b)}function T(b){return b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?i.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(b,_,F,H,ee=!1){if(b!==null){if(i[b]!==void 0)return i[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let X=_;if(_===i.RED&&(F===i.FLOAT&&(X=i.R32F),F===i.HALF_FLOAT&&(X=i.R16F),F===i.UNSIGNED_BYTE&&(X=i.R8)),_===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.R8UI),F===i.UNSIGNED_SHORT&&(X=i.R16UI),F===i.UNSIGNED_INT&&(X=i.R32UI),F===i.BYTE&&(X=i.R8I),F===i.SHORT&&(X=i.R16I),F===i.INT&&(X=i.R32I)),_===i.RG&&(F===i.FLOAT&&(X=i.RG32F),F===i.HALF_FLOAT&&(X=i.RG16F),F===i.UNSIGNED_BYTE&&(X=i.RG8)),_===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.RG8UI),F===i.UNSIGNED_SHORT&&(X=i.RG16UI),F===i.UNSIGNED_INT&&(X=i.RG32UI),F===i.BYTE&&(X=i.RG8I),F===i.SHORT&&(X=i.RG16I),F===i.INT&&(X=i.RG32I)),_===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.RGB8UI),F===i.UNSIGNED_SHORT&&(X=i.RGB16UI),F===i.UNSIGNED_INT&&(X=i.RGB32UI),F===i.BYTE&&(X=i.RGB8I),F===i.SHORT&&(X=i.RGB16I),F===i.INT&&(X=i.RGB32I)),_===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),F===i.UNSIGNED_INT&&(X=i.RGBA32UI),F===i.BYTE&&(X=i.RGBA8I),F===i.SHORT&&(X=i.RGBA16I),F===i.INT&&(X=i.RGBA32I)),_===i.RGB&&F===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),_===i.RGBA){const Ae=ee?Ta:$e.getTransfer(H);F===i.FLOAT&&(X=i.RGBA32F),F===i.HALF_FLOAT&&(X=i.RGBA16F),F===i.UNSIGNED_BYTE&&(X=Ae===et?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function v(b,_){let F;return b?_===null||_===Dn||_===Ui?F=i.DEPTH24_STENCIL8:_===Wt?F=i.DEPTH32F_STENCIL8:_===Li&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Dn||_===Ui?F=i.DEPTH_COMPONENT24:_===Wt?F=i.DEPTH_COMPONENT32F:_===Li&&(F=i.DEPTH_COMPONENT16),F}function C(b,_){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==Ct&&b.minFilter!==Vt?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function E(b){const _=b.target;_.removeEventListener("dispose",E),D(_),_.isVideoTexture&&h.delete(_)}function A(b){const _=b.target;_.removeEventListener("dispose",A),x(_)}function D(b){const _=n.get(b);if(_.__webglInit===void 0)return;const F=b.source,H=p.get(F);if(H){const ee=H[_.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&M(b),Object.keys(H).length===0&&p.delete(F)}n.remove(b)}function M(b){const _=n.get(b);i.deleteTexture(_.__webglTexture);const F=b.source,H=p.get(F);delete H[_.__cacheKey],s.memory.textures--}function x(b){const _=n.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),n.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(_.__webglFramebuffer[H]))for(let ee=0;ee<_.__webglFramebuffer[H].length;ee++)i.deleteFramebuffer(_.__webglFramebuffer[H][ee]);else i.deleteFramebuffer(_.__webglFramebuffer[H]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[H])}else{if(Array.isArray(_.__webglFramebuffer))for(let H=0;H<_.__webglFramebuffer.length;H++)i.deleteFramebuffer(_.__webglFramebuffer[H]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let H=0;H<_.__webglColorRenderbuffer.length;H++)_.__webglColorRenderbuffer[H]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[H]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const F=b.textures;for(let H=0,ee=F.length;H<ee;H++){const X=n.get(F[H]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),s.memory.textures--),n.remove(F[H])}n.remove(b)}let R=0;function O(){R=0}function q(){const b=R;return b>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+a.maxTextures),R+=1,b}function k(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function Y(b,_){const F=n.get(b);if(b.isVideoTexture&&de(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&F.__version!==b.version){const H=b.image;if(H===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Q(F,b,_);return}}else b.isExternalTexture&&(F.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+_)}function V(b,_){const F=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&F.__version!==b.version){Q(F,b,_);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+_)}function $(b,_){const F=n.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&F.__version!==b.version){Q(F,b,_);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+_)}function G(b,_){const F=n.get(b);if(b.version>0&&F.__version!==b.version){ie(F,b,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+_)}const le={[Rr]:i.REPEAT,[Cn]:i.CLAMP_TO_EDGE,[Cr]:i.MIRRORED_REPEAT},ve={[Ct]:i.NEAREST,[Uc]:i.NEAREST_MIPMAP_NEAREST,[Wi]:i.NEAREST_MIPMAP_LINEAR,[Vt]:i.LINEAR,[Oa]:i.LINEAR_MIPMAP_NEAREST,[Pn]:i.LINEAR_MIPMAP_LINEAR},fe={[Oc]:i.NEVER,[Hc]:i.ALWAYS,[qc]:i.LESS,[ul]:i.LEQUAL,[Bc]:i.EQUAL,[Gc]:i.GEQUAL,[zc]:i.GREATER,[kc]:i.NOTEQUAL};function Ce(b,_){if(_.type===Wt&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Vt||_.magFilter===Oa||_.magFilter===Wi||_.magFilter===Pn||_.minFilter===Vt||_.minFilter===Oa||_.minFilter===Wi||_.minFilter===Pn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,le[_.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,le[_.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,le[_.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,ve[_.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,ve[_.minFilter]),_.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,fe[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ct||_.minFilter!==Wi&&_.minFilter!==Pn||_.type===Wt&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(b,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,a.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Xe(b,_){let F=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",E));const H=_.source;let ee=p.get(H);ee===void 0&&(ee={},p.set(H,ee));const X=k(_);if(X!==b.__cacheKey){ee[X]===void 0&&(ee[X]={texture:i.createTexture(),usedTimes:0},s.memory.textures++,F=!0),ee[X].usedTimes++;const Ae=ee[b.__cacheKey];Ae!==void 0&&(ee[b.__cacheKey].usedTimes--,Ae.usedTimes===0&&M(_)),b.__cacheKey=X,b.__webglTexture=ee[X].texture}return F}function ze(b,_,F){return Math.floor(Math.floor(b/F)/_)}function W(b,_,F,H){const X=b.updateRanges;if(X.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,F,H,_.data);else{X.sort((ae,xe)=>ae.start-xe.start);let Ae=0;for(let ae=1;ae<X.length;ae++){const xe=X[Ae],Oe=X[ae],Pe=xe.start+xe.count,ge=ze(Oe.start,_.width,4),He=ze(xe.start,_.width,4);Oe.start<=Pe+1&&ge===He&&ze(Oe.start+Oe.count-1,_.width,4)===ge?xe.count=Math.max(xe.count,Oe.start+Oe.count-xe.start):(++Ae,X[Ae]=Oe)}X.length=Ae+1;const ce=i.getParameter(i.UNPACK_ROW_LENGTH),be=i.getParameter(i.UNPACK_SKIP_PIXELS),Ee=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let ae=0,xe=X.length;ae<xe;ae++){const Oe=X[ae],Pe=Math.floor(Oe.start/4),ge=Math.ceil(Oe.count/4),He=Pe%_.width,U=Math.floor(Pe/_.width),oe=ge,ue=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,He),i.pixelStorei(i.UNPACK_SKIP_ROWS,U),t.texSubImage2D(i.TEXTURE_2D,0,He,U,oe,ue,F,H,_.data)}b.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ce),i.pixelStorei(i.UNPACK_SKIP_PIXELS,be),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ee)}}function Q(b,_,F){let H=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(H=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(H=i.TEXTURE_3D);const ee=Xe(b,_),X=_.source;t.bindTexture(H,b.__webglTexture,i.TEXTURE0+F);const Ae=n.get(X);if(X.version!==Ae.__version||ee===!0){t.activeTexture(i.TEXTURE0+F);const ce=$e.getPrimaries($e.workingColorSpace),be=_.colorSpace===un?null:$e.getPrimaries(_.colorSpace),Ee=_.colorSpace===un||ce===be?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);let ae=w(_.image,!1,a.maxTextureSize);ae=ke(_,ae);const xe=r.convert(_.format,_.colorSpace),Oe=r.convert(_.type);let Pe=S(_.internalFormat,xe,Oe,_.colorSpace,_.isVideoTexture);Ce(H,_);let ge;const He=_.mipmaps,U=_.isVideoTexture!==!0,oe=Ae.__version===void 0||ee===!0,ue=X.dataReady,we=C(_,ae);if(_.isDepthTexture)Pe=v(_.format===Ni,_.type),oe&&(U?t.texStorage2D(i.TEXTURE_2D,1,Pe,ae.width,ae.height):t.texImage2D(i.TEXTURE_2D,0,Pe,ae.width,ae.height,0,xe,Oe,null));else if(_.isDataTexture)if(He.length>0){U&&oe&&t.texStorage2D(i.TEXTURE_2D,we,Pe,He[0].width,He[0].height);for(let re=0,K=He.length;re<K;re++)ge=He[re],U?ue&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,ge.width,ge.height,xe,Oe,ge.data):t.texImage2D(i.TEXTURE_2D,re,Pe,ge.width,ge.height,0,xe,Oe,ge.data);_.generateMipmaps=!1}else U?(oe&&t.texStorage2D(i.TEXTURE_2D,we,Pe,ae.width,ae.height),ue&&W(_,ae,xe,Oe)):t.texImage2D(i.TEXTURE_2D,0,Pe,ae.width,ae.height,0,xe,Oe,ae.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){U&&oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,we,Pe,He[0].width,He[0].height,ae.depth);for(let re=0,K=He.length;re<K;re++)if(ge=He[re],_.format!==Bt)if(xe!==null)if(U){if(ue)if(_.layerUpdates.size>0){const Te=To(ge.width,ge.height,_.format,_.type);for(const Ge of _.layerUpdates){const at=ge.data.subarray(Ge*Te/ge.data.BYTES_PER_ELEMENT,(Ge+1)*Te/ge.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,Ge,ge.width,ge.height,1,xe,at)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,ge.width,ge.height,ae.depth,xe,ge.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,re,Pe,ge.width,ge.height,ae.depth,0,ge.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?ue&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,ge.width,ge.height,ae.depth,xe,Oe,ge.data):t.texImage3D(i.TEXTURE_2D_ARRAY,re,Pe,ge.width,ge.height,ae.depth,0,xe,Oe,ge.data)}else{U&&oe&&t.texStorage2D(i.TEXTURE_2D,we,Pe,He[0].width,He[0].height);for(let re=0,K=He.length;re<K;re++)ge=He[re],_.format!==Bt?xe!==null?U?ue&&t.compressedTexSubImage2D(i.TEXTURE_2D,re,0,0,ge.width,ge.height,xe,ge.data):t.compressedTexImage2D(i.TEXTURE_2D,re,Pe,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?ue&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,ge.width,ge.height,xe,Oe,ge.data):t.texImage2D(i.TEXTURE_2D,re,Pe,ge.width,ge.height,0,xe,Oe,ge.data)}else if(_.isDataArrayTexture)if(U){if(oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,we,Pe,ae.width,ae.height,ae.depth),ue)if(_.layerUpdates.size>0){const re=To(ae.width,ae.height,_.format,_.type);for(const K of _.layerUpdates){const Te=ae.data.subarray(K*re/ae.data.BYTES_PER_ELEMENT,(K+1)*re/ae.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,ae.width,ae.height,1,xe,Oe,Te)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,xe,Oe,ae.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Pe,ae.width,ae.height,ae.depth,0,xe,Oe,ae.data);else if(_.isData3DTexture)U?(oe&&t.texStorage3D(i.TEXTURE_3D,we,Pe,ae.width,ae.height,ae.depth),ue&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,xe,Oe,ae.data)):t.texImage3D(i.TEXTURE_3D,0,Pe,ae.width,ae.height,ae.depth,0,xe,Oe,ae.data);else if(_.isFramebufferTexture){if(oe)if(U)t.texStorage2D(i.TEXTURE_2D,we,Pe,ae.width,ae.height);else{let re=ae.width,K=ae.height;for(let Te=0;Te<we;Te++)t.texImage2D(i.TEXTURE_2D,Te,Pe,re,K,0,xe,Oe,null),re>>=1,K>>=1}}else if(He.length>0){if(U&&oe){const re=Be(He[0]);t.texStorage2D(i.TEXTURE_2D,we,Pe,re.width,re.height)}for(let re=0,K=He.length;re<K;re++)ge=He[re],U?ue&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,xe,Oe,ge):t.texImage2D(i.TEXTURE_2D,re,Pe,xe,Oe,ge);_.generateMipmaps=!1}else if(U){if(oe){const re=Be(ae);t.texStorage2D(i.TEXTURE_2D,we,Pe,re.width,re.height)}ue&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,xe,Oe,ae)}else t.texImage2D(i.TEXTURE_2D,0,Pe,xe,Oe,ae);m(_)&&u(H),Ae.__version=X.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function ie(b,_,F){if(_.image.length!==6)return;const H=Xe(b,_),ee=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+F);const X=n.get(ee);if(ee.version!==X.__version||H===!0){t.activeTexture(i.TEXTURE0+F);const Ae=$e.getPrimaries($e.workingColorSpace),ce=_.colorSpace===un?null:$e.getPrimaries(_.colorSpace),be=_.colorSpace===un||Ae===ce?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const Ee=_.isCompressedTexture||_.image[0].isCompressedTexture,ae=_.image[0]&&_.image[0].isDataTexture,xe=[];for(let K=0;K<6;K++)!Ee&&!ae?xe[K]=w(_.image[K],!0,a.maxCubemapSize):xe[K]=ae?_.image[K].image:_.image[K],xe[K]=ke(_,xe[K]);const Oe=xe[0],Pe=r.convert(_.format,_.colorSpace),ge=r.convert(_.type),He=S(_.internalFormat,Pe,ge,_.colorSpace),U=_.isVideoTexture!==!0,oe=X.__version===void 0||H===!0,ue=ee.dataReady;let we=C(_,Oe);Ce(i.TEXTURE_CUBE_MAP,_);let re;if(Ee){U&&oe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,we,He,Oe.width,Oe.height);for(let K=0;K<6;K++){re=xe[K].mipmaps;for(let Te=0;Te<re.length;Te++){const Ge=re[Te];_.format!==Bt?Pe!==null?U?ue&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Te,0,0,Ge.width,Ge.height,Pe,Ge.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Te,He,Ge.width,Ge.height,0,Ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Te,0,0,Ge.width,Ge.height,Pe,ge,Ge.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Te,He,Ge.width,Ge.height,0,Pe,ge,Ge.data)}}}else{if(re=_.mipmaps,U&&oe){re.length>0&&we++;const K=Be(xe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,we,He,K.width,K.height)}for(let K=0;K<6;K++)if(ae){U?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,xe[K].width,xe[K].height,Pe,ge,xe[K].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,He,xe[K].width,xe[K].height,0,Pe,ge,xe[K].data);for(let Te=0;Te<re.length;Te++){const at=re[Te].image[K].image;U?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Te+1,0,0,at.width,at.height,Pe,ge,at.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Te+1,He,at.width,at.height,0,Pe,ge,at.data)}}else{U?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Pe,ge,xe[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,He,Pe,ge,xe[K]);for(let Te=0;Te<re.length;Te++){const Ge=re[Te];U?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Te+1,0,0,Pe,ge,Ge.image[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Te+1,He,Pe,ge,Ge.image[K])}}}m(_)&&u(i.TEXTURE_CUBE_MAP),X.__version=ee.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function Le(b,_,F,H,ee,X){const Ae=r.convert(F.format,F.colorSpace),ce=r.convert(F.type),be=S(F.internalFormat,Ae,ce,F.colorSpace),Ee=n.get(_),ae=n.get(F);if(ae.__renderTarget=_,!Ee.__hasExternalTextures){const xe=Math.max(1,_.width>>X),Oe=Math.max(1,_.height>>X);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,X,be,xe,Oe,_.depth,0,Ae,ce,null):t.texImage2D(ee,X,be,xe,Oe,0,Ae,ce,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),ne(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,H,ee,ae.__webglTexture,0,he(_)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,H,ee,ae.__webglTexture,X),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Me(b,_,F){if(i.bindRenderbuffer(i.RENDERBUFFER,b),_.depthBuffer){const H=_.depthTexture,ee=H&&H.isDepthTexture?H.type:null,X=v(_.stencilBuffer,ee),Ae=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=he(_);ne(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ce,X,_.width,_.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,ce,X,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,X,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ae,i.RENDERBUFFER,b)}else{const H=_.textures;for(let ee=0;ee<H.length;ee++){const X=H[ee],Ae=r.convert(X.format,X.colorSpace),ce=r.convert(X.type),be=S(X.internalFormat,Ae,ce,X.colorSpace),Ee=he(_);F&&ne(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ee,be,_.width,_.height):ne(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ee,be,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,be,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ne(b,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const H=n.get(_.depthTexture);H.__renderTarget=_,(!H.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Y(_.depthTexture,0);const ee=H.__webglTexture,X=he(_);if(_.depthTexture.format===Ii)ne(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0);else if(_.depthTexture.format===Ni)ne(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Re(b){const _=n.get(b),F=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){const H=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),H){const ee=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,H.removeEventListener("dispose",ee)};H.addEventListener("dispose",ee),_.__depthDisposeCallback=ee}_.__boundDepthTexture=H}if(b.depthTexture&&!_.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");const H=b.texture.mipmaps;H&&H.length>0?Ne(_.__webglFramebuffer[0],b):Ne(_.__webglFramebuffer,b)}else if(F){_.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[H]),_.__webglDepthbuffer[H]===void 0)_.__webglDepthbuffer[H]=i.createRenderbuffer(),Me(_.__webglDepthbuffer[H],b,!1);else{const ee=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=_.__webglDepthbuffer[H];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,X)}}else{const H=b.texture.mipmaps;if(H&&H.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Me(_.__webglDepthbuffer,b,!1);else{const ee=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,X)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function De(b,_,F){const H=n.get(b);_!==void 0&&Le(H.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Re(b)}function P(b){const _=b.texture,F=n.get(b),H=n.get(_);b.addEventListener("dispose",A);const ee=b.textures,X=b.isWebGLCubeRenderTarget===!0,Ae=ee.length>1;if(Ae||(H.__webglTexture===void 0&&(H.__webglTexture=i.createTexture()),H.__version=_.version,s.memory.textures++),X){F.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer[ce]=[];for(let be=0;be<_.mipmaps.length;be++)F.__webglFramebuffer[ce][be]=i.createFramebuffer()}else F.__webglFramebuffer[ce]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer=[];for(let ce=0;ce<_.mipmaps.length;ce++)F.__webglFramebuffer[ce]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(Ae)for(let ce=0,be=ee.length;ce<be;ce++){const Ee=n.get(ee[ce]);Ee.__webglTexture===void 0&&(Ee.__webglTexture=i.createTexture(),s.memory.textures++)}if(b.samples>0&&ne(b)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ce=0;ce<ee.length;ce++){const be=ee[ce];F.__webglColorRenderbuffer[ce]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[ce]);const Ee=r.convert(be.format,be.colorSpace),ae=r.convert(be.type),xe=S(be.internalFormat,Ee,ae,be.colorSpace,b.isXRRenderTarget===!0),Oe=he(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,Oe,xe,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.RENDERBUFFER,F.__webglColorRenderbuffer[ce])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),Me(F.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture),Ce(i.TEXTURE_CUBE_MAP,_);for(let ce=0;ce<6;ce++)if(_.mipmaps&&_.mipmaps.length>0)for(let be=0;be<_.mipmaps.length;be++)Le(F.__webglFramebuffer[ce][be],b,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,be);else Le(F.__webglFramebuffer[ce],b,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);m(_)&&u(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ae){for(let ce=0,be=ee.length;ce<be;ce++){const Ee=ee[ce],ae=n.get(Ee);let xe=i.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(xe=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(xe,ae.__webglTexture),Ce(xe,Ee),Le(F.__webglFramebuffer,b,Ee,i.COLOR_ATTACHMENT0+ce,xe,0),m(Ee)&&u(xe)}t.unbindTexture()}else{let ce=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ce=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ce,H.__webglTexture),Ce(ce,_),_.mipmaps&&_.mipmaps.length>0)for(let be=0;be<_.mipmaps.length;be++)Le(F.__webglFramebuffer[be],b,_,i.COLOR_ATTACHMENT0,ce,be);else Le(F.__webglFramebuffer,b,_,i.COLOR_ATTACHMENT0,ce,0);m(_)&&u(ce),t.unbindTexture()}b.depthBuffer&&Re(b)}function j(b){const _=b.textures;for(let F=0,H=_.length;F<H;F++){const ee=_[F];if(m(ee)){const X=T(b),Ae=n.get(ee).__webglTexture;t.bindTexture(X,Ae),u(X),t.unbindTexture()}}}const Z=[],te=[];function J(b){if(b.samples>0){if(ne(b)===!1){const _=b.textures,F=b.width,H=b.height;let ee=i.COLOR_BUFFER_BIT;const X=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ae=n.get(b),ce=_.length>1;if(ce)for(let Ee=0;Ee<_.length;Ee++)t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer);const be=b.texture.mipmaps;be&&be.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let Ee=0;Ee<_.length;Ee++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),ce){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[Ee]);const ae=n.get(_[Ee]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ae,0)}i.blitFramebuffer(0,0,F,H,0,0,F,H,ee,i.NEAREST),l===!0&&(Z.length=0,te.length=0,Z.push(i.COLOR_ATTACHMENT0+Ee),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Z.push(X),te.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,te)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Z))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ce)for(let Ee=0;Ee<_.length;Ee++){t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[Ee]);const ae=n.get(_[Ee]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,ae,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const _=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function he(b){return Math.min(a.maxSamples,b.samples)}function ne(b){const _=n.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function de(b){const _=s.render.frame;h.get(b)!==_&&(h.set(b,_),b.update())}function ke(b,_){const F=b.colorSpace,H=b.format,ee=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||F!==ci&&F!==un&&($e.getTransfer(F)===et?(H!==Bt||ee!==Yt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),_}function Be(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=q,this.resetTextureUnits=O,this.setTexture2D=Y,this.setTexture2DArray=V,this.setTexture3D=$,this.setTextureCube=G,this.rebindTextures=De,this.setupRenderTarget=P,this.updateRenderTargetMipmap=j,this.updateMultisampleRenderTarget=J,this.setupDepthRenderbuffer=Re,this.setupFrameBufferTexture=Le,this.useMultisampledRTT=ne}function Qp(i,e){function t(n,a=un){let r;const s=$e.getTransfer(a);if(n===Yt)return i.UNSIGNED_BYTE;if(n===fs)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ps)return i.UNSIGNED_SHORT_5_5_5_1;if(n===sl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===al)return i.BYTE;if(n===rl)return i.SHORT;if(n===Li)return i.UNSIGNED_SHORT;if(n===us)return i.INT;if(n===Dn)return i.UNSIGNED_INT;if(n===Wt)return i.FLOAT;if(n===zi)return i.HALF_FLOAT;if(n===ol)return i.ALPHA;if(n===ll)return i.RGB;if(n===Bt)return i.RGBA;if(n===Ii)return i.DEPTH_COMPONENT;if(n===Ni)return i.DEPTH_STENCIL;if(n===ms)return i.RED;if(n===vs)return i.RED_INTEGER;if(n===cl)return i.RG;if(n===gs)return i.RG_INTEGER;if(n===_s)return i.RGBA_INTEGER;if(n===ya||n===wa||n===Ma||n===Sa)if(s===et)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ya)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ya)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Sa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Pr||n===Dr||n===Lr||n===Ur)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Pr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Dr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Lr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ur)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ir||n===Nr||n===Fr)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ir||n===Nr)return s===et?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Fr)return s===et?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Or||n===qr||n===Br||n===zr||n===kr||n===Gr||n===Hr||n===Vr||n===Wr||n===Xr||n===Yr||n===Zr||n===Jr||n===Kr)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Or)return s===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===qr)return s===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Br)return s===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===zr)return s===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===kr)return s===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Gr)return s===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Hr)return s===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Vr)return s===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Wr)return s===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Xr)return s===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Yr)return s===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Zr)return s===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Jr)return s===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Kr)return s===et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ba||n===$r||n===jr)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ba)return s===et?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===$r)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===jr)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===hl||n===Qr||n===es||n===ts)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===ba)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Qr)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===es)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ts)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ui?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class Hl extends _t{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}}const em=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,tm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class nm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Hl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new vn({vertexShader:em,fragmentShader:tm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new zt(new La(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class im extends fi{constructor(e,t){super();const n=this;let a=null,r=1,s=null,o="local-floor",l=1,c=null,h=null,d=null,p=null,f=null,g=null;const w=new nm,m={},u=t.getContextAttributes();let T=null,S=null;const v=[],C=[],E=new pe;let A=null;const D=new Rt;D.viewport=new tt;const M=new Rt;M.viewport=new tt;const x=[D,M],R=new S0;let O=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let Q=v[W];return Q===void 0&&(Q=new ar,v[W]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(W){let Q=v[W];return Q===void 0&&(Q=new ar,v[W]=Q),Q.getGripSpace()},this.getHand=function(W){let Q=v[W];return Q===void 0&&(Q=new ar,v[W]=Q),Q.getHandSpace()};function k(W){const Q=C.indexOf(W.inputSource);if(Q===-1)return;const ie=v[Q];ie!==void 0&&(ie.update(W.inputSource,W.frame,c||s),ie.dispatchEvent({type:W.type,data:W.inputSource}))}function Y(){a.removeEventListener("select",k),a.removeEventListener("selectstart",k),a.removeEventListener("selectend",k),a.removeEventListener("squeeze",k),a.removeEventListener("squeezestart",k),a.removeEventListener("squeezeend",k),a.removeEventListener("end",Y),a.removeEventListener("inputsourceschange",V);for(let W=0;W<v.length;W++){const Q=C[W];Q!==null&&(C[W]=null,v[W].disconnect(Q))}O=null,q=null,w.reset();for(const W in m)delete m[W];e.setRenderTarget(T),f=null,p=null,d=null,a=null,S=null,ze.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return p!==null?p:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(W){if(a=W,a!==null){if(T=e.getRenderTarget(),a.addEventListener("select",k),a.addEventListener("selectstart",k),a.addEventListener("selectend",k),a.addEventListener("squeeze",k),a.addEventListener("squeezestart",k),a.addEventListener("squeezeend",k),a.addEventListener("end",Y),a.addEventListener("inputsourceschange",V),u.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(E),typeof XRWebGLBinding<"u"&&(d=new XRWebGLBinding(a,t)),d!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,Le=null,Me=null;u.depth&&(Me=u.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=u.stencil?Ni:Ii,Le=u.stencil?Ui:Dn);const Ne={colorFormat:t.RGBA8,depthFormat:Me,scaleFactor:r};p=d.createProjectionLayer(Ne),a.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),S=new Ln(p.textureWidth,p.textureHeight,{format:Bt,type:Yt,depthTexture:new bl(p.textureWidth,p.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:u.stencil,colorSpace:e.outputColorSpace,samples:u.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const ie={antialias:u.antialias,alpha:!0,depth:u.depth,stencil:u.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(a,t,ie),a.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new Ln(f.framebufferWidth,f.framebufferHeight,{format:Bt,type:Yt,colorSpace:e.outputColorSpace,stencilBuffer:u.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await a.requestReferenceSpace(o),ze.setContext(a),ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return w.getDepthTexture()};function V(W){for(let Q=0;Q<W.removed.length;Q++){const ie=W.removed[Q],Le=C.indexOf(ie);Le>=0&&(C[Le]=null,v[Le].disconnect(ie))}for(let Q=0;Q<W.added.length;Q++){const ie=W.added[Q];let Le=C.indexOf(ie);if(Le===-1){for(let Ne=0;Ne<v.length;Ne++)if(Ne>=C.length){C.push(ie),Le=Ne;break}else if(C[Ne]===null){C[Ne]=ie,Le=Ne;break}if(Le===-1)break}const Me=v[Le];Me&&Me.connect(ie)}}const $=new L,G=new L;function le(W,Q,ie){$.setFromMatrixPosition(Q.matrixWorld),G.setFromMatrixPosition(ie.matrixWorld);const Le=$.distanceTo(G),Me=Q.projectionMatrix.elements,Ne=ie.projectionMatrix.elements,Re=Me[14]/(Me[10]-1),De=Me[14]/(Me[10]+1),P=(Me[9]+1)/Me[5],j=(Me[9]-1)/Me[5],Z=(Me[8]-1)/Me[0],te=(Ne[8]+1)/Ne[0],J=Re*Z,he=Re*te,ne=Le/(-Z+te),de=ne*-Z;if(Q.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(de),W.translateZ(ne),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),Me[10]===-1)W.projectionMatrix.copy(Q.projectionMatrix),W.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const ke=Re+ne,Be=De+ne,b=J-de,_=he+(Le-de),F=P*De/Be*ke,H=j*De/Be*ke;W.projectionMatrix.makePerspective(b,_,F,H,ke,Be),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function ve(W,Q){Q===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(Q.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(a===null)return;let Q=W.near,ie=W.far;w.texture!==null&&(w.depthNear>0&&(Q=w.depthNear),w.depthFar>0&&(ie=w.depthFar)),R.near=M.near=D.near=Q,R.far=M.far=D.far=ie,(O!==R.near||q!==R.far)&&(a.updateRenderState({depthNear:R.near,depthFar:R.far}),O=R.near,q=R.far),R.layers.mask=W.layers.mask|6,D.layers.mask=R.layers.mask&3,M.layers.mask=R.layers.mask&5;const Le=W.parent,Me=R.cameras;ve(R,Le);for(let Ne=0;Ne<Me.length;Ne++)ve(Me[Ne],Le);Me.length===2?le(R,D,M):R.projectionMatrix.copy(D.projectionMatrix),fe(W,R,Le)};function fe(W,Q,ie){ie===null?W.matrix.copy(Q.matrixWorld):(W.matrix.copy(ie.matrixWorld),W.matrix.invert(),W.matrix.multiply(Q.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(Q.projectionMatrix),W.projectionMatrixInverse.copy(Q.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=hi*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(p===null&&f===null))return l},this.setFoveation=function(W){l=W,p!==null&&(p.fixedFoveation=W),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=W)},this.hasDepthSensing=function(){return w.texture!==null},this.getDepthSensingMesh=function(){return w.getMesh(R)},this.getCameraTexture=function(W){return m[W]};let Ce=null;function Xe(W,Q){if(h=Q.getViewerPose(c||s),g=Q,h!==null){const ie=h.views;f!==null&&(e.setRenderTargetFramebuffer(S,f.framebuffer),e.setRenderTarget(S));let Le=!1;ie.length!==R.cameras.length&&(R.cameras.length=0,Le=!0);for(let De=0;De<ie.length;De++){const P=ie[De];let j=null;if(f!==null)j=f.getViewport(P);else{const te=d.getViewSubImage(p,P);j=te.viewport,De===0&&(e.setRenderTargetTextures(S,te.colorTexture,te.depthStencilTexture),e.setRenderTarget(S))}let Z=x[De];Z===void 0&&(Z=new Rt,Z.layers.enable(De),Z.viewport=new tt,x[De]=Z),Z.matrix.fromArray(P.transform.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.projectionMatrix.fromArray(P.projectionMatrix),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert(),Z.viewport.set(j.x,j.y,j.width,j.height),De===0&&(R.matrix.copy(Z.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),Le===!0&&R.cameras.push(Z)}const Me=a.enabledFeatures;if(Me&&Me.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&d){const De=d.getDepthInformation(ie[0]);De&&De.isValid&&De.texture&&w.init(De,a.renderState)}if(Me&&Me.includes("camera-access")&&(e.state.unbindTexture(),d))for(let De=0;De<ie.length;De++){const P=ie[De].camera;if(P){let j=m[P];j||(j=new Hl,m[P]=j);const Z=d.getCameraImage(P);j.sourceTexture=Z}}}for(let ie=0;ie<v.length;ie++){const Le=C[ie],Me=v[ie];Le!==null&&Me!==void 0&&Me.update(Le,Q,c||s)}Ce&&Ce(W,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}const ze=new ql;ze.setAnimationLoop(Xe),this.setAnimationLoop=function(W){Ce=W},this.dispose=function(){}}}const bn=new Zt,am=new nt;function rm(i,e){function t(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function n(m,u){u.color.getRGB(m.fogColor.value,xl(i)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function a(m,u,T,S,v){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(m,u):u.isMeshToonMaterial?(r(m,u),d(m,u)):u.isMeshPhongMaterial?(r(m,u),h(m,u)):u.isMeshStandardMaterial?(r(m,u),p(m,u),u.isMeshPhysicalMaterial&&f(m,u,v)):u.isMeshMatcapMaterial?(r(m,u),g(m,u)):u.isMeshDepthMaterial?r(m,u):u.isMeshDistanceMaterial?(r(m,u),w(m,u)):u.isMeshNormalMaterial?r(m,u):u.isLineBasicMaterial?(s(m,u),u.isLineDashedMaterial&&o(m,u)):u.isPointsMaterial?l(m,u,T,S):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,t(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===St&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,t(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===St&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,t(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,t(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const T=e.get(u),S=T.envMap,v=T.envMapRotation;S&&(m.envMap.value=S,bn.copy(v),bn.x*=-1,bn.y*=-1,bn.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(bn.y*=-1,bn.z*=-1),m.envMapRotation.value.setFromMatrix4(am.makeRotationFromEuler(bn)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,m.aoMapTransform))}function s(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform))}function o(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,T,S){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*T,m.scale.value=S*.5,u.map&&(m.map.value=u.map,t(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function h(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function d(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function p(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function f(m,u,T){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===St&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,u){u.matcap&&(m.matcap.value=u.matcap)}function w(m,u){const T=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:a}}function sm(i,e,t,n){let a={},r={},s=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,S){const v=S.program;n.uniformBlockBinding(T,v)}function c(T,S){let v=a[T.id];v===void 0&&(g(T),v=h(T),a[T.id]=v,T.addEventListener("dispose",m));const C=S.program;n.updateUBOMapping(T,C);const E=e.render.frame;r[T.id]!==E&&(p(T),r[T.id]=E)}function h(T){const S=d();T.__bindingPointIndex=S;const v=i.createBuffer(),C=T.__size,E=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,C,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,v),v}function d(){for(let T=0;T<o;T++)if(s.indexOf(T)===-1)return s.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(T){const S=a[T.id],v=T.uniforms,C=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let E=0,A=v.length;E<A;E++){const D=Array.isArray(v[E])?v[E]:[v[E]];for(let M=0,x=D.length;M<x;M++){const R=D[M];if(f(R,E,M,C)===!0){const O=R.__offset,q=Array.isArray(R.value)?R.value:[R.value];let k=0;for(let Y=0;Y<q.length;Y++){const V=q[Y],$=w(V);typeof V=="number"||typeof V=="boolean"?(R.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,O+k,R.__data)):V.isMatrix3?(R.__data[0]=V.elements[0],R.__data[1]=V.elements[1],R.__data[2]=V.elements[2],R.__data[3]=0,R.__data[4]=V.elements[3],R.__data[5]=V.elements[4],R.__data[6]=V.elements[5],R.__data[7]=0,R.__data[8]=V.elements[6],R.__data[9]=V.elements[7],R.__data[10]=V.elements[8],R.__data[11]=0):(V.toArray(R.__data,k),k+=$.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(T,S,v,C){const E=T.value,A=S+"_"+v;if(C[A]===void 0)return typeof E=="number"||typeof E=="boolean"?C[A]=E:C[A]=E.clone(),!0;{const D=C[A];if(typeof E=="number"||typeof E=="boolean"){if(D!==E)return C[A]=E,!0}else if(D.equals(E)===!1)return D.copy(E),!0}return!1}function g(T){const S=T.uniforms;let v=0;const C=16;for(let A=0,D=S.length;A<D;A++){const M=Array.isArray(S[A])?S[A]:[S[A]];for(let x=0,R=M.length;x<R;x++){const O=M[x],q=Array.isArray(O.value)?O.value:[O.value];for(let k=0,Y=q.length;k<Y;k++){const V=q[k],$=w(V),G=v%C,le=G%$.boundary,ve=G+le;v+=le,ve!==0&&C-ve<$.storage&&(v+=C-ve),O.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=v,v+=$.storage}}}const E=v%C;return E>0&&(v+=C-E),T.__size=v,T.__cache={},this}function w(T){const S={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(S.boundary=4,S.storage=4):T.isVector2?(S.boundary=8,S.storage=8):T.isVector3||T.isColor?(S.boundary=16,S.storage=12):T.isVector4?(S.boundary=16,S.storage=16):T.isMatrix3?(S.boundary=48,S.storage=48):T.isMatrix4?(S.boundary=64,S.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),S}function m(T){const S=T.target;S.removeEventListener("dispose",m);const v=s.indexOf(S.__bindingPointIndex);s.splice(v,1),i.deleteBuffer(a[S.id]),delete a[S.id],delete r[S.id]}function u(){for(const T in a)i.deleteBuffer(a[T]);s=[],a={},r={}}return{bind:l,update:c,dispose:u}}class O3{constructor(e={}){const{canvas:t=sh(),context:n=null,depth:a=!0,stencil:r=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=s;const g=new Uint32Array(4),w=new Int32Array(4);let m=null,u=null;const T=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=pn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let C=!1;this._outputColorSpace=Ut;let E=0,A=0,D=null,M=-1,x=null;const R=new tt,O=new tt;let q=null;const k=new Je(0);let Y=0,V=t.width,$=t.height,G=1,le=null,ve=null;const fe=new tt(0,0,V,$),Ce=new tt(0,0,V,$);let Xe=!1;const ze=new Ss;let W=!1,Q=!1;const ie=new nt,Le=new L,Me=new tt,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Re=!1;function De(){return D===null?G:1}let P=n;function j(y,I){return t.getContext(y,I)}try{const y={alpha:!0,depth:a,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ds}`),t.addEventListener("webglcontextlost",ue,!1),t.addEventListener("webglcontextrestored",we,!1),t.addEventListener("webglcontextcreationerror",re,!1),P===null){const I="webgl2";if(P=j(I,y),P===null)throw j(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Z,te,J,he,ne,de,ke,Be,b,_,F,H,ee,X,Ae,ce,be,Ee,ae,xe,Oe,Pe,ge,He;function U(){Z=new gf(P),Z.init(),Pe=new Qp(P,Z),te=new hf(P,Z,e,Pe),J=new $p(P,Z),te.reversedDepthBuffer&&p&&J.buffers.depth.setReversed(!0),he=new yf(P),ne=new qp,de=new jp(P,Z,J,ne,te,Pe,he),ke=new uf(v),Be=new vf(v),b=new E0(P),ge=new lf(P,b),_=new _f(P,b,he,ge),F=new Mf(P,_,b,he),ae=new wf(P,te,de),ce=new df(ne),H=new Op(v,ke,Be,Z,te,ge,ce),ee=new rm(v,ne),X=new zp,Ae=new Xp(Z),Ee=new of(v,ke,Be,J,F,f,l),be=new Jp(v,F,te),He=new sm(P,he,te,J),xe=new cf(P,Z,he),Oe=new xf(P,Z,he),he.programs=H.programs,v.capabilities=te,v.extensions=Z,v.properties=ne,v.renderLists=X,v.shadowMap=be,v.state=J,v.info=he}U();const oe=new im(v,P);this.xr=oe,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const y=Z.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Z.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(y){y!==void 0&&(G=y,this.setSize(V,$,!1))},this.getSize=function(y){return y.set(V,$)},this.setSize=function(y,I,B=!0){if(oe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=y,$=I,t.width=Math.floor(y*G),t.height=Math.floor(I*G),B===!0&&(t.style.width=y+"px",t.style.height=I+"px"),this.setViewport(0,0,y,I)},this.getDrawingBufferSize=function(y){return y.set(V*G,$*G).floor()},this.setDrawingBufferSize=function(y,I,B){V=y,$=I,G=B,t.width=Math.floor(y*B),t.height=Math.floor(I*B),this.setViewport(0,0,y,I)},this.getCurrentViewport=function(y){return y.copy(R)},this.getViewport=function(y){return y.copy(fe)},this.setViewport=function(y,I,B,z){y.isVector4?fe.set(y.x,y.y,y.z,y.w):fe.set(y,I,B,z),J.viewport(R.copy(fe).multiplyScalar(G).round())},this.getScissor=function(y){return y.copy(Ce)},this.setScissor=function(y,I,B,z){y.isVector4?Ce.set(y.x,y.y,y.z,y.w):Ce.set(y,I,B,z),J.scissor(O.copy(Ce).multiplyScalar(G).round())},this.getScissorTest=function(){return Xe},this.setScissorTest=function(y){J.setScissorTest(Xe=y)},this.setOpaqueSort=function(y){le=y},this.setTransparentSort=function(y){ve=y},this.getClearColor=function(y){return y.copy(Ee.getClearColor())},this.setClearColor=function(){Ee.setClearColor(...arguments)},this.getClearAlpha=function(){return Ee.getClearAlpha()},this.setClearAlpha=function(){Ee.setClearAlpha(...arguments)},this.clear=function(y=!0,I=!0,B=!0){let z=0;if(y){let N=!1;if(D!==null){const se=D.texture.format;N=se===_s||se===gs||se===vs}if(N){const se=D.texture.type,_e=se===Yt||se===Dn||se===Li||se===Ui||se===fs||se===ps,Se=Ee.getClearColor(),ye=Ee.getClearAlpha(),Fe=Se.r,qe=Se.g,Ue=Se.b;_e?(g[0]=Fe,g[1]=qe,g[2]=Ue,g[3]=ye,P.clearBufferuiv(P.COLOR,0,g)):(w[0]=Fe,w[1]=qe,w[2]=Ue,w[3]=ye,P.clearBufferiv(P.COLOR,0,w))}else z|=P.COLOR_BUFFER_BIT}I&&(z|=P.DEPTH_BUFFER_BIT),B&&(z|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ue,!1),t.removeEventListener("webglcontextrestored",we,!1),t.removeEventListener("webglcontextcreationerror",re,!1),Ee.dispose(),X.dispose(),Ae.dispose(),ne.dispose(),ke.dispose(),Be.dispose(),F.dispose(),ge.dispose(),He.dispose(),H.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",Gt),oe.removeEventListener("sessionend",Us),gn.stop()};function ue(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function we(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const y=he.autoReset,I=be.enabled,B=be.autoUpdate,z=be.needsUpdate,N=be.type;U(),he.autoReset=y,be.enabled=I,be.autoUpdate=B,be.needsUpdate=z,be.type=N}function re(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function K(y){const I=y.target;I.removeEventListener("dispose",K),Te(I)}function Te(y){Ge(y),ne.remove(y)}function Ge(y){const I=ne.get(y).programs;I!==void 0&&(I.forEach(function(B){H.releaseProgram(B)}),y.isShaderMaterial&&H.releaseShaderCache(y))}this.renderBufferDirect=function(y,I,B,z,N,se){I===null&&(I=Ne);const _e=N.isMesh&&N.matrixWorld.determinant()<0,Se=$l(y,I,B,z,N);J.setMaterial(z,_e);let ye=B.index,Fe=1;if(z.wireframe===!0){if(ye=_.getWireframeAttribute(B),ye===void 0)return;Fe=2}const qe=B.drawRange,Ue=B.attributes.position;let Ze=qe.start*Fe,Qe=(qe.start+qe.count)*Fe;se!==null&&(Ze=Math.max(Ze,se.start*Fe),Qe=Math.min(Qe,(se.start+se.count)*Fe)),ye!==null?(Ze=Math.max(Ze,0),Qe=Math.min(Qe,ye.count)):Ue!=null&&(Ze=Math.max(Ze,0),Qe=Math.min(Qe,Ue.count));const ct=Qe-Ze;if(ct<0||ct===1/0)return;ge.setup(N,z,Se,B,ye);let rt,it=xe;if(ye!==null&&(rt=b.get(ye),it=Oe,it.setIndex(rt)),N.isMesh)z.wireframe===!0?(J.setLineWidth(z.wireframeLinewidth*De()),it.setMode(P.LINES)):it.setMode(P.TRIANGLES);else if(N.isLine){let Ie=z.linewidth;Ie===void 0&&(Ie=1),J.setLineWidth(Ie*De()),N.isLineSegments?it.setMode(P.LINES):N.isLineLoop?it.setMode(P.LINE_LOOP):it.setMode(P.LINE_STRIP)}else N.isPoints?it.setMode(P.POINTS):N.isSprite&&it.setMode(P.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)ai("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),it.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Z.get("WEBGL_multi_draw"))it.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Ie=N._multiDrawStarts,st=N._multiDrawCounts,Ke=N._multiDrawCount,bt=ye?b.get(ye).bytesPerElement:1,Fn=ne.get(z).currentProgram.getUniforms();for(let Et=0;Et<Ke;Et++)Fn.setValue(P,"_gl_DrawID",Et),it.render(Ie[Et]/bt,st[Et])}else if(N.isInstancedMesh)it.renderInstances(Ze,ct,N.count);else if(B.isInstancedBufferGeometry){const Ie=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,st=Math.min(B.instanceCount,Ie);it.renderInstances(Ze,ct,st)}else it.render(Ze,ct)};function at(y,I,B){y.transparent===!0&&y.side===an&&y.forceSinglePass===!1?(y.side=St,y.needsUpdate=!0,Vi(y,I,B),y.side=mn,y.needsUpdate=!0,Vi(y,I,B),y.side=an):Vi(y,I,B)}this.compile=function(y,I,B=null){B===null&&(B=y),u=Ae.get(B),u.init(I),S.push(u),B.traverseVisible(function(N){N.isLight&&N.layers.test(I.layers)&&(u.pushLight(N),N.castShadow&&u.pushShadow(N))}),y!==B&&y.traverseVisible(function(N){N.isLight&&N.layers.test(I.layers)&&(u.pushLight(N),N.castShadow&&u.pushShadow(N))}),u.setupLights();const z=new Set;return y.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const se=N.material;if(se)if(Array.isArray(se))for(let _e=0;_e<se.length;_e++){const Se=se[_e];at(Se,B,N),z.add(Se)}else at(se,B,N),z.add(se)}),u=S.pop(),z},this.compileAsync=function(y,I,B=null){const z=this.compile(y,I,B);return new Promise(N=>{function se(){if(z.forEach(function(_e){ne.get(_e).currentProgram.isReady()&&z.delete(_e)}),z.size===0){N(y);return}setTimeout(se,10)}Z.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let je=null;function Kt(y){je&&je(y)}function Gt(){gn.stop()}function Us(){gn.start()}const gn=new ql;gn.setAnimationLoop(Kt),typeof self<"u"&&gn.setContext(self),this.setAnimationLoop=function(y){je=y,oe.setAnimationLoop(y),y===null?gn.stop():gn.start()},oe.addEventListener("sessionstart",Gt),oe.addEventListener("sessionend",Us),this.render=function(y,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(I),I=oe.getCamera()),y.isScene===!0&&y.onBeforeRender(v,y,I,D),u=Ae.get(y,S.length),u.init(I),S.push(u),ie.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),ze.setFromProjectionMatrix(ie,Xt,I.reversedDepth),Q=this.localClippingEnabled,W=ce.init(this.clippingPlanes,Q),m=X.get(y,T.length),m.init(),T.push(m),oe.enabled===!0&&oe.isPresenting===!0){const se=v.xr.getDepthSensingMesh();se!==null&&Na(se,I,-1/0,v.sortObjects)}Na(y,I,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(le,ve),Re=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,Re&&Ee.addToRenderList(m,y),this.info.render.frame++,W===!0&&ce.beginShadows();const B=u.state.shadowsArray;be.render(B,y,I),W===!0&&ce.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=m.opaque,N=m.transmissive;if(u.setupLights(),I.isArrayCamera){const se=I.cameras;if(N.length>0)for(let _e=0,Se=se.length;_e<Se;_e++){const ye=se[_e];Ns(z,N,y,ye)}Re&&Ee.render(y);for(let _e=0,Se=se.length;_e<Se;_e++){const ye=se[_e];Is(m,y,ye,ye.viewport)}}else N.length>0&&Ns(z,N,y,I),Re&&Ee.render(y),Is(m,y,I);D!==null&&A===0&&(de.updateMultisampleRenderTarget(D),de.updateRenderTargetMipmap(D)),y.isScene===!0&&y.onAfterRender(v,y,I),ge.resetDefaultState(),M=-1,x=null,S.pop(),S.length>0?(u=S[S.length-1],W===!0&&ce.setGlobalState(v.clippingPlanes,u.state.camera)):u=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function Na(y,I,B,z){if(y.visible===!1)return;if(y.layers.test(I.layers)){if(y.isGroup)B=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(I);else if(y.isLight)u.pushLight(y),y.castShadow&&u.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||ze.intersectsSprite(y)){z&&Me.setFromMatrixPosition(y.matrixWorld).applyMatrix4(ie);const _e=F.update(y),Se=y.material;Se.visible&&m.push(y,_e,Se,B,Me.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||ze.intersectsObject(y))){const _e=F.update(y),Se=y.material;if(z&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Me.copy(y.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Me.copy(_e.boundingSphere.center)),Me.applyMatrix4(y.matrixWorld).applyMatrix4(ie)),Array.isArray(Se)){const ye=_e.groups;for(let Fe=0,qe=ye.length;Fe<qe;Fe++){const Ue=ye[Fe],Ze=Se[Ue.materialIndex];Ze&&Ze.visible&&m.push(y,_e,Ze,B,Me.z,Ue)}}else Se.visible&&m.push(y,_e,Se,B,Me.z,null)}}const se=y.children;for(let _e=0,Se=se.length;_e<Se;_e++)Na(se[_e],I,B,z)}function Is(y,I,B,z){const N=y.opaque,se=y.transmissive,_e=y.transparent;u.setupLightsView(B),W===!0&&ce.setGlobalState(v.clippingPlanes,B),z&&J.viewport(R.copy(z)),N.length>0&&Hi(N,I,B),se.length>0&&Hi(se,I,B),_e.length>0&&Hi(_e,I,B),J.buffers.depth.setTest(!0),J.buffers.depth.setMask(!0),J.buffers.color.setMask(!0),J.setPolygonOffset(!1)}function Ns(y,I,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[z.id]===void 0&&(u.state.transmissionRenderTarget[z.id]=new Ln(1,1,{generateMipmaps:!0,type:Z.has("EXT_color_buffer_half_float")||Z.has("EXT_color_buffer_float")?zi:Yt,minFilter:Pn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace}));const se=u.state.transmissionRenderTarget[z.id],_e=z.viewport||R;se.setSize(_e.z*v.transmissionResolutionScale,_e.w*v.transmissionResolutionScale);const Se=v.getRenderTarget(),ye=v.getActiveCubeFace(),Fe=v.getActiveMipmapLevel();v.setRenderTarget(se),v.getClearColor(k),Y=v.getClearAlpha(),Y<1&&v.setClearColor(16777215,.5),v.clear(),Re&&Ee.render(B);const qe=v.toneMapping;v.toneMapping=pn;const Ue=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),u.setupLightsView(z),W===!0&&ce.setGlobalState(v.clippingPlanes,z),Hi(y,B,z),de.updateMultisampleRenderTarget(se),de.updateRenderTargetMipmap(se),Z.has("WEBGL_multisampled_render_to_texture")===!1){let Ze=!1;for(let Qe=0,ct=I.length;Qe<ct;Qe++){const rt=I[Qe],it=rt.object,Ie=rt.geometry,st=rt.material,Ke=rt.group;if(st.side===an&&it.layers.test(z.layers)){const bt=st.side;st.side=St,st.needsUpdate=!0,Fs(it,B,z,Ie,st,Ke),st.side=bt,st.needsUpdate=!0,Ze=!0}}Ze===!0&&(de.updateMultisampleRenderTarget(se),de.updateRenderTargetMipmap(se))}v.setRenderTarget(Se,ye,Fe),v.setClearColor(k,Y),Ue!==void 0&&(z.viewport=Ue),v.toneMapping=qe}function Hi(y,I,B){const z=I.isScene===!0?I.overrideMaterial:null;for(let N=0,se=y.length;N<se;N++){const _e=y[N],Se=_e.object,ye=_e.geometry,Fe=_e.group;let qe=_e.material;qe.allowOverride===!0&&z!==null&&(qe=z),Se.layers.test(B.layers)&&Fs(Se,I,B,ye,qe,Fe)}}function Fs(y,I,B,z,N,se){y.onBeforeRender(v,I,B,z,N,se),y.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),N.onBeforeRender(v,I,B,z,y,se),N.transparent===!0&&N.side===an&&N.forceSinglePass===!1?(N.side=St,N.needsUpdate=!0,v.renderBufferDirect(B,I,z,N,y,se),N.side=mn,N.needsUpdate=!0,v.renderBufferDirect(B,I,z,N,y,se),N.side=an):v.renderBufferDirect(B,I,z,N,y,se),y.onAfterRender(v,I,B,z,N,se)}function Vi(y,I,B){I.isScene!==!0&&(I=Ne);const z=ne.get(y),N=u.state.lights,se=u.state.shadowsArray,_e=N.state.version,Se=H.getParameters(y,N.state,se,I,B),ye=H.getProgramCacheKey(Se);let Fe=z.programs;z.environment=y.isMeshStandardMaterial?I.environment:null,z.fog=I.fog,z.envMap=(y.isMeshStandardMaterial?Be:ke).get(y.envMap||z.environment),z.envMapRotation=z.environment!==null&&y.envMap===null?I.environmentRotation:y.envMapRotation,Fe===void 0&&(y.addEventListener("dispose",K),Fe=new Map,z.programs=Fe);let qe=Fe.get(ye);if(qe!==void 0){if(z.currentProgram===qe&&z.lightsStateVersion===_e)return qs(y,Se),qe}else Se.uniforms=H.getUniforms(y),y.onBeforeCompile(Se,v),qe=H.acquireProgram(Se,ye),Fe.set(ye,qe),z.uniforms=Se.uniforms;const Ue=z.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Ue.clippingPlanes=ce.uniform),qs(y,Se),z.needsLights=Ql(y),z.lightsStateVersion=_e,z.needsLights&&(Ue.ambientLightColor.value=N.state.ambient,Ue.lightProbe.value=N.state.probe,Ue.directionalLights.value=N.state.directional,Ue.directionalLightShadows.value=N.state.directionalShadow,Ue.spotLights.value=N.state.spot,Ue.spotLightShadows.value=N.state.spotShadow,Ue.rectAreaLights.value=N.state.rectArea,Ue.ltc_1.value=N.state.rectAreaLTC1,Ue.ltc_2.value=N.state.rectAreaLTC2,Ue.pointLights.value=N.state.point,Ue.pointLightShadows.value=N.state.pointShadow,Ue.hemisphereLights.value=N.state.hemi,Ue.directionalShadowMap.value=N.state.directionalShadowMap,Ue.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Ue.spotShadowMap.value=N.state.spotShadowMap,Ue.spotLightMatrix.value=N.state.spotLightMatrix,Ue.spotLightMap.value=N.state.spotLightMap,Ue.pointShadowMap.value=N.state.pointShadowMap,Ue.pointShadowMatrix.value=N.state.pointShadowMatrix),z.currentProgram=qe,z.uniformsList=null,qe}function Os(y){if(y.uniformsList===null){const I=y.currentProgram.getUniforms();y.uniformsList=Ea.seqWithValue(I.seq,y.uniforms)}return y.uniformsList}function qs(y,I){const B=ne.get(y);B.outputColorSpace=I.outputColorSpace,B.batching=I.batching,B.batchingColor=I.batchingColor,B.instancing=I.instancing,B.instancingColor=I.instancingColor,B.instancingMorph=I.instancingMorph,B.skinning=I.skinning,B.morphTargets=I.morphTargets,B.morphNormals=I.morphNormals,B.morphColors=I.morphColors,B.morphTargetsCount=I.morphTargetsCount,B.numClippingPlanes=I.numClippingPlanes,B.numIntersection=I.numClipIntersection,B.vertexAlphas=I.vertexAlphas,B.vertexTangents=I.vertexTangents,B.toneMapping=I.toneMapping}function $l(y,I,B,z,N){I.isScene!==!0&&(I=Ne),de.resetTextureUnits();const se=I.fog,_e=z.isMeshStandardMaterial?I.environment:null,Se=D===null?v.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:ci,ye=(z.isMeshStandardMaterial?Be:ke).get(z.envMap||_e),Fe=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,qe=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Ue=!!B.morphAttributes.position,Ze=!!B.morphAttributes.normal,Qe=!!B.morphAttributes.color;let ct=pn;z.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(ct=v.toneMapping);const rt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,it=rt!==void 0?rt.length:0,Ie=ne.get(z),st=u.state.lights;if(W===!0&&(Q===!0||y!==x)){const xt=y===x&&z.id===M;ce.setState(z,y,xt)}let Ke=!1;z.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==st.state.version||Ie.outputColorSpace!==Se||N.isBatchedMesh&&Ie.batching===!1||!N.isBatchedMesh&&Ie.batching===!0||N.isBatchedMesh&&Ie.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Ie.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Ie.instancing===!1||!N.isInstancedMesh&&Ie.instancing===!0||N.isSkinnedMesh&&Ie.skinning===!1||!N.isSkinnedMesh&&Ie.skinning===!0||N.isInstancedMesh&&Ie.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Ie.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Ie.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Ie.instancingMorph===!1&&N.morphTexture!==null||Ie.envMap!==ye||z.fog===!0&&Ie.fog!==se||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==ce.numPlanes||Ie.numIntersection!==ce.numIntersection)||Ie.vertexAlphas!==Fe||Ie.vertexTangents!==qe||Ie.morphTargets!==Ue||Ie.morphNormals!==Ze||Ie.morphColors!==Qe||Ie.toneMapping!==ct||Ie.morphTargetsCount!==it)&&(Ke=!0):(Ke=!0,Ie.__version=z.version);let bt=Ie.currentProgram;Ke===!0&&(bt=Vi(z,I,N));let Fn=!1,Et=!1,gi=!1;const ot=bt.getUniforms(),Pt=Ie.uniforms;if(J.useProgram(bt.program)&&(Fn=!0,Et=!0,gi=!0),z.id!==M&&(M=z.id,Et=!0),Fn||x!==y){J.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),ot.setValue(P,"projectionMatrix",y.projectionMatrix),ot.setValue(P,"viewMatrix",y.matrixWorldInverse);const Mt=ot.map.cameraPosition;Mt!==void 0&&Mt.setValue(P,Le.setFromMatrixPosition(y.matrixWorld)),te.logarithmicDepthBuffer&&ot.setValue(P,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ot.setValue(P,"isOrthographic",y.isOrthographicCamera===!0),x!==y&&(x=y,Et=!0,gi=!0)}if(N.isSkinnedMesh){ot.setOptional(P,N,"bindMatrix"),ot.setOptional(P,N,"bindMatrixInverse");const xt=N.skeleton;xt&&(xt.boneTexture===null&&xt.computeBoneTexture(),ot.setValue(P,"boneTexture",xt.boneTexture,de))}N.isBatchedMesh&&(ot.setOptional(P,N,"batchingTexture"),ot.setValue(P,"batchingTexture",N._matricesTexture,de),ot.setOptional(P,N,"batchingIdTexture"),ot.setValue(P,"batchingIdTexture",N._indirectTexture,de),ot.setOptional(P,N,"batchingColorTexture"),N._colorsTexture!==null&&ot.setValue(P,"batchingColorTexture",N._colorsTexture,de));const Dt=B.morphAttributes;if((Dt.position!==void 0||Dt.normal!==void 0||Dt.color!==void 0)&&ae.update(N,B,bt),(Et||Ie.receiveShadow!==N.receiveShadow)&&(Ie.receiveShadow=N.receiveShadow,ot.setValue(P,"receiveShadow",N.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Pt.envMap.value=ye,Pt.flipEnvMap.value=ye.isCubeTexture&&ye.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&I.environment!==null&&(Pt.envMapIntensity.value=I.environmentIntensity),Et&&(ot.setValue(P,"toneMappingExposure",v.toneMappingExposure),Ie.needsLights&&jl(Pt,gi),se&&z.fog===!0&&ee.refreshFogUniforms(Pt,se),ee.refreshMaterialUniforms(Pt,z,G,$,u.state.transmissionRenderTarget[y.id]),Ea.upload(P,Os(Ie),Pt,de)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Ea.upload(P,Os(Ie),Pt,de),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ot.setValue(P,"center",N.center),ot.setValue(P,"modelViewMatrix",N.modelViewMatrix),ot.setValue(P,"normalMatrix",N.normalMatrix),ot.setValue(P,"modelMatrix",N.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const xt=z.uniformsGroups;for(let Mt=0,Fa=xt.length;Mt<Fa;Mt++){const _n=xt[Mt];He.update(_n,bt),He.bind(_n,bt)}}return bt}function jl(y,I){y.ambientLightColor.needsUpdate=I,y.lightProbe.needsUpdate=I,y.directionalLights.needsUpdate=I,y.directionalLightShadows.needsUpdate=I,y.pointLights.needsUpdate=I,y.pointLightShadows.needsUpdate=I,y.spotLights.needsUpdate=I,y.spotLightShadows.needsUpdate=I,y.rectAreaLights.needsUpdate=I,y.hemisphereLights.needsUpdate=I}function Ql(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(y,I,B){const z=ne.get(y);z.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),ne.get(y.texture).__webglTexture=I,ne.get(y.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:B,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,I){const B=ne.get(y);B.__webglFramebuffer=I,B.__useDefaultFramebuffer=I===void 0};const ec=P.createFramebuffer();this.setRenderTarget=function(y,I=0,B=0){D=y,E=I,A=B;let z=!0,N=null,se=!1,_e=!1;if(y){const ye=ne.get(y);if(ye.__useDefaultFramebuffer!==void 0)J.bindFramebuffer(P.FRAMEBUFFER,null),z=!1;else if(ye.__webglFramebuffer===void 0)de.setupRenderTarget(y);else if(ye.__hasExternalTextures)de.rebindTextures(y,ne.get(y.texture).__webglTexture,ne.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Ue=y.depthTexture;if(ye.__boundDepthTexture!==Ue){if(Ue!==null&&ne.has(Ue)&&(y.width!==Ue.image.width||y.height!==Ue.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");de.setupDepthRenderbuffer(y)}}const Fe=y.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(_e=!0);const qe=ne.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(qe[I])?N=qe[I][B]:N=qe[I],se=!0):y.samples>0&&de.useMultisampledRTT(y)===!1?N=ne.get(y).__webglMultisampledFramebuffer:Array.isArray(qe)?N=qe[B]:N=qe,R.copy(y.viewport),O.copy(y.scissor),q=y.scissorTest}else R.copy(fe).multiplyScalar(G).floor(),O.copy(Ce).multiplyScalar(G).floor(),q=Xe;if(B!==0&&(N=ec),J.bindFramebuffer(P.FRAMEBUFFER,N)&&z&&J.drawBuffers(y,N),J.viewport(R),J.scissor(O),J.setScissorTest(q),se){const ye=ne.get(y.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+I,ye.__webglTexture,B)}else if(_e){const ye=I;for(let Fe=0;Fe<y.textures.length;Fe++){const qe=ne.get(y.textures[Fe]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Fe,qe.__webglTexture,B,ye)}}else if(y!==null&&B!==0){const ye=ne.get(y.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ye.__webglTexture,B)}M=-1},this.readRenderTargetPixels=function(y,I,B,z,N,se,_e,Se=0){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=ne.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&_e!==void 0&&(ye=ye[_e]),ye){J.bindFramebuffer(P.FRAMEBUFFER,ye);try{const Fe=y.textures[Se],qe=Fe.format,Ue=Fe.type;if(!te.textureFormatReadable(qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!te.textureTypeReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=y.width-z&&B>=0&&B<=y.height-N&&(y.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Se),P.readPixels(I,B,z,N,Pe.convert(qe),Pe.convert(Ue),se))}finally{const Fe=D!==null?ne.get(D).__webglFramebuffer:null;J.bindFramebuffer(P.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(y,I,B,z,N,se,_e,Se=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=ne.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&_e!==void 0&&(ye=ye[_e]),ye)if(I>=0&&I<=y.width-z&&B>=0&&B<=y.height-N){J.bindFramebuffer(P.FRAMEBUFFER,ye);const Fe=y.textures[Se],qe=Fe.format,Ue=Fe.type;if(!te.textureFormatReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!te.textureTypeReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ze=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Ze),P.bufferData(P.PIXEL_PACK_BUFFER,se.byteLength,P.STREAM_READ),y.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Se),P.readPixels(I,B,z,N,Pe.convert(qe),Pe.convert(Ue),0);const Qe=D!==null?ne.get(D).__webglFramebuffer:null;J.bindFramebuffer(P.FRAMEBUFFER,Qe);const ct=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await oh(P,ct,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Ze),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,se),P.deleteBuffer(Ze),P.deleteSync(ct),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,I=null,B=0){const z=Math.pow(2,-B),N=Math.floor(y.image.width*z),se=Math.floor(y.image.height*z),_e=I!==null?I.x:0,Se=I!==null?I.y:0;de.setTexture2D(y,0),P.copyTexSubImage2D(P.TEXTURE_2D,B,0,0,_e,Se,N,se),J.unbindTexture()};const tc=P.createFramebuffer(),nc=P.createFramebuffer();this.copyTextureToTexture=function(y,I,B=null,z=null,N=0,se=null){se===null&&(N!==0?(ai("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),se=N,N=0):se=0);let _e,Se,ye,Fe,qe,Ue,Ze,Qe,ct;const rt=y.isCompressedTexture?y.mipmaps[se]:y.image;if(B!==null)_e=B.max.x-B.min.x,Se=B.max.y-B.min.y,ye=B.isBox3?B.max.z-B.min.z:1,Fe=B.min.x,qe=B.min.y,Ue=B.isBox3?B.min.z:0;else{const Dt=Math.pow(2,-N);_e=Math.floor(rt.width*Dt),Se=Math.floor(rt.height*Dt),y.isDataArrayTexture?ye=rt.depth:y.isData3DTexture?ye=Math.floor(rt.depth*Dt):ye=1,Fe=0,qe=0,Ue=0}z!==null?(Ze=z.x,Qe=z.y,ct=z.z):(Ze=0,Qe=0,ct=0);const it=Pe.convert(I.format),Ie=Pe.convert(I.type);let st;I.isData3DTexture?(de.setTexture3D(I,0),st=P.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(de.setTexture2DArray(I,0),st=P.TEXTURE_2D_ARRAY):(de.setTexture2D(I,0),st=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,I.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,I.unpackAlignment);const Ke=P.getParameter(P.UNPACK_ROW_LENGTH),bt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Fn=P.getParameter(P.UNPACK_SKIP_PIXELS),Et=P.getParameter(P.UNPACK_SKIP_ROWS),gi=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,rt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,rt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Fe),P.pixelStorei(P.UNPACK_SKIP_ROWS,qe),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ue);const ot=y.isDataArrayTexture||y.isData3DTexture,Pt=I.isDataArrayTexture||I.isData3DTexture;if(y.isDepthTexture){const Dt=ne.get(y),xt=ne.get(I),Mt=ne.get(Dt.__renderTarget),Fa=ne.get(xt.__renderTarget);J.bindFramebuffer(P.READ_FRAMEBUFFER,Mt.__webglFramebuffer),J.bindFramebuffer(P.DRAW_FRAMEBUFFER,Fa.__webglFramebuffer);for(let _n=0;_n<ye;_n++)ot&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,ne.get(y).__webglTexture,N,Ue+_n),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,ne.get(I).__webglTexture,se,ct+_n)),P.blitFramebuffer(Fe,qe,_e,Se,Ze,Qe,_e,Se,P.DEPTH_BUFFER_BIT,P.NEAREST);J.bindFramebuffer(P.READ_FRAMEBUFFER,null),J.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(N!==0||y.isRenderTargetTexture||ne.has(y)){const Dt=ne.get(y),xt=ne.get(I);J.bindFramebuffer(P.READ_FRAMEBUFFER,tc),J.bindFramebuffer(P.DRAW_FRAMEBUFFER,nc);for(let Mt=0;Mt<ye;Mt++)ot?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Dt.__webglTexture,N,Ue+Mt):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Dt.__webglTexture,N),Pt?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,xt.__webglTexture,se,ct+Mt):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,xt.__webglTexture,se),N!==0?P.blitFramebuffer(Fe,qe,_e,Se,Ze,Qe,_e,Se,P.COLOR_BUFFER_BIT,P.NEAREST):Pt?P.copyTexSubImage3D(st,se,Ze,Qe,ct+Mt,Fe,qe,_e,Se):P.copyTexSubImage2D(st,se,Ze,Qe,Fe,qe,_e,Se);J.bindFramebuffer(P.READ_FRAMEBUFFER,null),J.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else Pt?y.isDataTexture||y.isData3DTexture?P.texSubImage3D(st,se,Ze,Qe,ct,_e,Se,ye,it,Ie,rt.data):I.isCompressedArrayTexture?P.compressedTexSubImage3D(st,se,Ze,Qe,ct,_e,Se,ye,it,rt.data):P.texSubImage3D(st,se,Ze,Qe,ct,_e,Se,ye,it,Ie,rt):y.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,se,Ze,Qe,_e,Se,it,Ie,rt.data):y.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,se,Ze,Qe,rt.width,rt.height,it,rt.data):P.texSubImage2D(P.TEXTURE_2D,se,Ze,Qe,_e,Se,it,Ie,rt);P.pixelStorei(P.UNPACK_ROW_LENGTH,Ke),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,bt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Fn),P.pixelStorei(P.UNPACK_SKIP_ROWS,Et),P.pixelStorei(P.UNPACK_SKIP_IMAGES,gi),se===0&&I.generateMipmaps&&P.generateMipmap(st),J.unbindTexture()},this.copyTextureToTexture3D=function(y,I,B=null,z=null,N=0){return ai('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(y,I,B,z,N)},this.initRenderTarget=function(y){ne.get(y).__webglFramebuffer===void 0&&de.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?de.setTextureCube(y,0):y.isData3DTexture?de.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?de.setTexture2DArray(y,0):de.setTexture2D(y,0),J.unbindTexture()},this.resetState=function(){E=0,A=0,D=null,J.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Xt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}var om={vary:.6,varyF:1,varyG:1,layers:[{wave:"noise",bp:3500,q:3,a:.001,d:.006,shape:-6,gain:.7},{wave:"sine",freq:1900,to:900,a:.001,d:.07,shape:-4,drive:1},{wave:"modal",freq:1400,modes:[1,2.3],a:.001,d:.06,shape:-4,gain:.6},{wave:"noise",bp:2500,q:5,at:.03,a:.001,d:.006,shape:-6,gain:.5}],gain:.458},lm={varyF:1,varyG:1,layers:[{wave:"noise",bp:2800,q:3,a:.001,d:.004,shape:-6,gain:.6},{wave:"triangle",freq:880,to:560,a:.002,d:.05,shape:-4,lp:3200,gain:.7},{wave:"pink",bp:2e3,q:4,at:.014,a:.001,d:.006,shape:-6,gain:.35}],limit:1,gain:2.04},cm={layers:[{wave:"sine",freq:2400,to:1100,a:.001,h:.004,d:.018,shape:4,drive:3},{wave:"noise",bp:3500,q:1.5,a:.001,d:.008,shape:3,drive:2,gain:.5},{wave:"sine",freq:420,to:260,at:.002,a:.001,d:.035,shape:3,drive:1,gain:.5}],gain:.508},hm={layers:[{wave:"sine",freq:520,to:260,a:.001,d:.06,shape:4,curve:2}],limit:1,gain:1.42},dm={vary:.8,layers:[{wave:"sine",freq:2600,a:.001,d:.025,shape:3,hp:1200}],limit:1,gain:1.41},um={layers:[{wave:"triangle",freq:660,arp:[0,7],arpRate:.045,a:.002,d:.11,shape:2.5},{wave:"sine",freq:1320,arp:[0,7],arpRate:.045,a:.002,d:.08,shape:3,gain:.3}],gain:.78},fm={layers:[{wave:"triangle",freq:990,arp:[0,-7],arpRate:.045,a:.002,d:.11,shape:2.5},{wave:"sine",freq:1980,arp:[0,-7],arpRate:.045,a:.002,d:.08,shape:3,gain:.3}],gain:.731},pm={verb:[.2,.15],layers:[{wave:"triangle",freq:784,arp:[0,4,7],arpRate:.05,a:.002,h:.02,d:.22,shape:2},{wave:"sine",freq:1568,arp:[0,4,7],arpRate:.05,a:.002,d:.2,shape:2.5,gain:.35}],gain:.395},mm={layers:[{wave:"square",duty:.4,freq:520,to:330,a:.002,d:.13,shape:2,lp:1800},{wave:"sine",freq:260,to:165,a:.002,d:.12,gain:.5}],gain:.415},vm={vary:.2,layers:[{wave:"saw",freq:155,a:.003,h:.05,d:.04,shape:1.5,lp:1300,drive:.6},{wave:"saw",freq:155,at:.13,a:.003,h:.06,d:.06,shape:1.5,lp:1300,drive:.6},{wave:"square",freq:77.5,a:.003,h:.17,d:.08,lp:500,gain:.5}],gain:.224},gm={layers:[{wave:"square",freq:120,to:90,a:.002,d:.12,lp:700,drive:1},{wave:"noise",lp:1500,a:.001,d:.03,gain:.3}],gain:.367},_m={verb:[.3,.2],layers:[{wave:"sine",freq:1319,fm:[3.5,1.6,.12],a:.002,d:.45,shape:2.5},{wave:"sine",freq:1760,fm:[3.5,1.6,.12],at:.1,a:.002,d:.6,shape:2.5}],gain:.154},xm={layers:[{wave:"sine",freq:380,to:1250,curve:3,a:.002,d:.07,shape:3}],gain:.898},ym={layers:[{wave:"sine",freq:1100,to:330,curve:3,a:.002,d:.08,shape:3}],gain:.834},wm={layers:[{wave:"noise",bp:1400,bpTo:5200,q:1.4,a:.04,d:.1,shape:2},{wave:"pink",bp:700,bpTo:2e3,a:.04,d:.08,gain:.5}],gain:1.31},Mm={vary:1.5,layers:[{wave:"noise",bp:3e3,q:1.5,a:.001,h:.004,d:.012,shape:3,drive:4},{wave:"sine",freq:520,to:300,at:.002,a:.001,d:.03,shape:3,drive:1,gain:.5},{wave:"noise",bp:4500,q:2,at:.02,a:.001,d:.008,gain:.25}],gain:.574},Sm={vary:1,varyF:1,layers:[{wave:"noise",bp:4500,q:2,a:.001,d:.004,shape:-6,gain:.6},{wave:"sine",freq:3200,a:.001,d:.035,shape:-6,drive:1}],gain:.728},bm={layers:[{wave:"triangle",freq:330,to:880,a:.004,d:.12,shape:2,lp:3e3},{wave:"noise",bp:2500,bpTo:5e3,a:.03,d:.06,gain:.25}],gain:.721},Em={layers:[{wave:"triangle",freq:880,to:330,a:.004,d:.12,shape:2,lp:3e3},{wave:"noise",bp:5e3,bpTo:2500,a:.03,d:.06,gain:.25}],gain:.699},Tm={layers:[{wave:"square",duty:.125,freq:1047,arp:[0,12],arpRate:.035,a:.001,d:.1,shape:2,lp:5500}],gain:.585},Am={layers:[{wave:"sine",freq:1175,fm:[2,.8,.03],a:.002,d:.08,shape:3}],gain:.618},Rm={verb:[.2,.1],layers:[{wave:"sine",freq:880,arp:[0,5,12],arpRate:.055,a:.003,d:.2,shape:2,vib:[7,.1]}],gain:.43},Cm={verb:[.35,.22],vary:.3,layers:[{wave:"sine",freq:1050,to:2150,curve:4,sweep:.05,a:.001,d:.32,shape:3},{wave:"sine",freq:3150,fm:[1.41,1.2,.04],a:.001,d:.12,shape:4,gain:.25},{wave:"triangle",freq:525,to:1075,curve:4,sweep:.05,a:.001,d:.15,shape:3,gain:.25}],gain:.281},Pm={vary:.6,varyF:1,layers:[{wave:"sine",freq:500,to:800,a:.002,d:.08,shape:-4},{wave:"noise",bp:3e3,q:3,a:.001,d:.004,shape:-6,gain:.4}],gain:.882},Dm={vary:.6,varyF:1,layers:[{wave:"sine",freq:700,to:380,a:.002,d:.1,shape:-4},{wave:"noise",bp:2200,q:3,a:.001,d:.005,shape:-6,gain:.5},{wave:"pink",lp:600,a:.001,d:.04,shape:-5,gain:.3}],gain:.826},Lm={vary:.1,verb:[.25,.15],layers:[{wave:"sine",freq:1047,fm:[2,.8,.06],arp:[0,7],arpRate:.08,a:.002,h:.06,d:.35,shape:-4},{wave:"triangle",freq:523,arp:[0,7],arpRate:.08,a:.002,h:.06,d:.25,shape:-4,gain:.3}],gain:.204},Um={vary:.4,varyF:1,layers:[{wave:"sine",freq:400,to:900,curve:.8,a:.01,d:.1,shape:-3,gain:.6},{wave:"noise",bp:1500,bpTo:4e3,q:1.5,a:.03,d:.07,shape:-3,gain:.25}],gain:1.15},Im={vary:.4,varyF:1,layers:[{wave:"sine",freq:900,to:400,curve:2,a:.005,d:.1,shape:-3,gain:.6},{wave:"noise",bp:4e3,bpTo:1500,q:1.5,a:.01,d:.08,shape:-3,gain:.25}],gain:1.17},Nm={vary:.1,verb:[.2,.12],layers:[{wave:"triangle",freq:660,arp:[0,-3,5],arpRate:.08,a:.002,h:.12,d:.15,shape:-3},{wave:"sine",freq:1320,arp:[0,-3,5],arpRate:.08,a:.002,h:.12,d:.12,shape:-3,gain:.25}],gain:.277},Fm={vary:.3,varyF:1,layers:[{wave:"noise",bp:1200,bpTo:6e3,q:1.5,a:.05,d:.08,shape:-3,gain:.5},{wave:"sine",freq:600,to:1500,curve:1.5,a:.01,d:.1,shape:-3,gain:.5}],gain:1.26},Om={vary:.5,varyF:2,layers:[{wave:"noise",bp:2500,q:1.5,at:0,a:.001,d:.025,shape:-5,gain:.6},{wave:"noise",bp:2900,q:1.5,at:.025,a:.001,d:.025,shape:-5,gain:.6},{wave:"noise",bp:3300,q:1.5,at:.045,a:.001,d:.025,shape:-5,gain:.6},{wave:"noise",bp:3700,q:1.5,at:.08,a:.001,d:.025,shape:-5,gain:.6},{wave:"noise",bp:4100,q:1.5,at:.1,a:.001,d:.025,shape:-5,gain:.6},{wave:"sine",freq:500,to:150,curve:2,at:.12,a:.002,d:.1,shape:-4,gain:.5},{wave:"pink",lp:800,at:.2,a:.001,d:.05,shape:-5,gain:.4}],gain:1.49},qm={vary:.6,varyF:3,varyG:1.5,layers:[{wave:"noise",bp:2e3,bpTo:5e3,q:.9,a:.08,d:.12,shape:-3,gain:.6},{wave:"pink",bp:1200,q:1,a:.06,d:.1,shape:-3,gain:.3},{wave:"noise",bp:3500,q:2,at:.2,a:.001,d:.02,shape:-5,gain:.4}],gain:1.46},Bm={verb:[.2,.12],layers:[{wave:"square",duty:.25,freq:988,arp:[0,5],arpRate:.07,a:.001,h:.05,d:.3,shape:2.5,lp:7e3},{wave:"sine",freq:1976,arp:[0,5],arpRate:.07,a:.001,d:.22,shape:3,gain:.5}],gain:.272},zm={verb:[.25,.15],layers:[{wave:"triangle",freq:1175,arp:[0,5],arpRate:.065,a:.002,h:.04,d:.3,shape:2.5},{wave:"sine",freq:2350,fm:[2,.7,.05],arp:[0,5],arpRate:.065,a:.002,d:.25,shape:3,gain:.35}],gain:.478},km={verb:[.2,.12],layers:[{wave:"square",duty:.25,freq:988,arp:[0,5],arpRate:.05,a:.001,d:.1,shape:2,lp:7e3},{wave:"square",duty:.25,freq:1175,arp:[0,5],arpRate:.05,at:.1,a:.001,h:.04,d:.28,shape:2.5,lp:7e3},{wave:"sine",freq:2350,arp:[0,5],arpRate:.05,at:.1,a:.001,d:.2,shape:3,gain:.4}],gain:.278},Gm={vary:.6,varyG:3,verb:[.25,.15],layers:[{wave:"modal",freq:2600,modes:[1,1.73,2.33,3.91],at:0,a:.001,d:.16,shape:-5,gain:.8},{wave:"modal",freq:3100,modes:[1,1.73,2.33,3.91],at:.05,a:.001,d:.18,shape:-5,gain:.74},{wave:"modal",freq:2800,modes:[1,1.73,2.33,3.91],at:.09,a:.001,d:.2,shape:-5,gain:.68},{wave:"modal",freq:3500,modes:[1,1.73,2.33,3.91],at:.15,a:.001,d:.22,shape:-5,gain:.6200000000000001},{wave:"modal",freq:2950,modes:[1,1.73,2.33,3.91],at:.19,a:.001,d:.24,shape:-5,gain:.56},{wave:"modal",freq:3300,modes:[1,1.73,2.33,3.91],at:.26,a:.001,d:.26,shape:-5,gain:.5},{wave:"pink",bp:1500,q:1,a:.01,d:.3,shape:-4,gain:.3},{wave:"pink",lp:600,a:.002,d:.06,shape:-5,drive:1,gain:.5}],gain:.463},Hm={verb:[.45,.25],layers:[{wave:"sine",freq:2093,fm:[3.01,2.2,.08],a:.001,d:.5,shape:3},{wave:"sine",freq:3136,fm:[2.01,1.5,.06],at:.07,a:.001,d:.55,shape:3,gain:.7},{wave:"sine",freq:4186,at:.12,a:.001,d:.3,shape:3,gain:.25}],gain:.286},Vm={layers:[{wave:"square",duty:.5,freq:523,arp:[0,4,7,12],arpRate:.032,a:.001,h:.06,d:.1,shape:2,lp:4500},{wave:"triangle",freq:1046,arp:[0,4,7,12],arpRate:.032,a:.001,h:.06,d:.1,gain:.5}],gain:.346},Wm={verb:[.2,.12],layers:[{wave:"sine",freq:420,to:1100,curve:3,sweep:.04,a:.001,d:.06,shape:3},{wave:"sine",freq:1568,fm:[2,.6,.05],at:.035,a:.001,d:.22,shape:3,gain:.6}],gain:.826},Xm={layers:[{wave:"square",duty:.25,freq:330,to:990,curve:2,a:.001,h:.02,d:.12,shape:2,lp:5e3},{wave:"sine",freq:165,to:495,curve:2,a:.001,d:.1,gain:.4}],limit:1,gain:.572},Ym={verb:[.3,.15],layers:[{wave:"modal",freq:2400,modes:[1,2.76,5.4],a:.001,d:.09,shape:-5,gain:.45},{wave:"modal",freq:2850,modes:[1,2.76,5.4],at:.06,a:.001,d:.12,shape:-5,gain:.35},{wave:"noise",hp:4e3,lp:1e4,a:.001,d:.01,shape:-6,gain:.2},{wave:"triangle",freq:1319,arp:[0,7,12],arpRate:.06,at:.04,a:.002,d:.3,shape:2.5,gain:.7}],gain:.83},Zm={verb:[.3,.15],layers:[{wave:"triangle",freq:523,arp:[0,4,7,12],arpRate:.06,a:.003,h:.1,d:.25,shape:2,vib:[6,.15]},{wave:"sine",freq:1046,arp:[0,4,7,12],arpRate:.06,a:.003,h:.1,d:.2,gain:.35}],gain:.402},Jm={layers:[{wave:"noise",bp:2500,q:1.2,a:.001,d:.02,shape:3,drive:2,gain:.7},{wave:"metal",freq:700,bp:2800,q:2,a:.001,d:.07,shape:3,drive:1},{wave:"sine",freq:260,to:150,a:.001,d:.06,shape:2.5,drive:1,gain:.7},{wave:"noise",bp:1800,q:1.2,at:.07,a:.001,d:.02,shape:3,drive:2,gain:.7},{wave:"metal",freq:560,bp:2200,q:2,at:.07,a:.001,d:.1,shape:3,drive:1},{wave:"sine",freq:200,to:110,at:.07,a:.001,d:.09,shape:2.5,drive:1,gain:.9}],limit:1,gain:.715},Km={verb:[.25,.12],layers:[{wave:"noise",bp:3e3,q:1,a:.001,d:.05,gain:.5},{wave:"metal",freq:520,bp:2400,q:2,a:.001,d:.08,gain:.5},{wave:"sine",freq:2637,fm:[2.76,3,.15],at:.07,a:.001,d:.7,shape:2.5},{wave:"sine",freq:3951,fm:[2.76,2,.1],at:.07,a:.001,d:.5,shape:3,gain:.5}],gain:.265},$m={vary:2,echo:[.07,.3,.25],layers:[{wave:"sine",freq:1250,to:2500,curve:2,sweep:.04,a:.001,d:.09,shape:3}],limit:1,gain:.963},jm={echo:[.09,.35,.3],layers:[{wave:"triangle",freq:1047,arp:[0,4,7,12,16,19,24],arpRate:.03,a:.001,h:.18,d:.2,shape:2},{wave:"sine",freq:2093,arp:[0,4,7,12,16,19,24],arpRate:.03,a:.001,h:.18,d:.15,gain:.3}],gain:.25},Qm={verb:[.3,.2],layers:[{wave:"square",duty:.5,freq:1568,arp:[0,4],arpRate:.045,a:.001,h:.04,d:.4,shape:3,lp:6e3,gain:.6},{wave:"sine",freq:3136,arp:[0,4],arpRate:.045,fm:[1.5,.7,.1],a:.001,d:.45,shape:3,gain:.7}],gain:.313},ev={vary:.6,layers:[{wave:"sine",freq:260,to:520,curve:3,vib:[30,1],at:0,a:.005,d:.09,shape:-3,lp:1200,gain:.8},{wave:"sine",freq:240,to:520,curve:3,vib:[30,1],at:.14,a:.005,d:.09,shape:-3,lp:1200,gain:.8},{wave:"sine",freq:220,to:520,curve:3,vib:[30,1],at:.28,a:.005,d:.09,shape:-3,lp:1200,gain:.8},{wave:"noise",lp:1e3,a:.01,h:.35,d:.1,gain:.08},{wave:"sine",freq:2093,fm:[3.5,1.5,.1],arp:[0,4,7],arpRate:.05,at:.42,a:.002,d:.3,shape:-4,gain:.25}],gain:.904},tv={vary:.8,varyF:2,varyG:2,layers:[{wave:"crunch",freq:5e3,bp:2500,q:.8,at:0,a:.002,d:.08,shape:-3,drive:1},{wave:"pink",lp:900,at:0,a:.002,d:.06,shape:-4,gain:.5},{wave:"noise",bp:3500,q:2,at:.02,a:.001,d:.01,shape:-5,gain:.4},{wave:"noise",bp:3500,q:2,at:.045,a:.001,d:.01,shape:-5,gain:.4},{wave:"crunch",freq:5e3,bp:2500,q:.8,at:.18,a:.002,d:.08,shape:-3,drive:1},{wave:"pink",lp:900,at:.18,a:.002,d:.06,shape:-4,gain:.5},{wave:"noise",bp:3500,q:2,at:.19999999999999998,a:.001,d:.01,shape:-5,gain:.4},{wave:"noise",bp:3500,q:2,at:.22499999999999998,a:.001,d:.01,shape:-5,gain:.4}],limit:1,gain:.789},nv={vary:.05,verb:[.5,.25],echo:[.1,.3,.2],layers:[{wave:"saw",freq:220,to:880,curve:.8,bp:1e3,bpTo:5e3,q:4,a:.2,d:.2,shape:-3,gain:.3},{wave:"sine",freq:1319,fm:[3.5,1.6,.15],at:.25,a:.002,h:.1,d:.8,shape:-3},{wave:"sine",freq:1661,fm:[3.5,1.6,.15],at:.25,a:.002,h:.1,d:.8,shape:-3,gain:.7},{wave:"sine",freq:1976,fm:[3.5,1.6,.15],at:.25,a:.002,h:.1,d:.8,shape:-3,gain:.6},{wave:"metal",freq:4e3,hp:7e3,at:.25,a:.01,d:.6,shape:-3,gain:.1}],gain:.164},iv={vary:.6,varyF:2,varyG:1.5,layers:[{wave:"pink",bp:1800,q:1,a:.02,d:.12,shape:-3,gain:.9},{wave:"metal",freq:1100,hp:2500,lp:7e3,at:.08,a:.001,d:.06,shape:-5,gain:.5},{wave:"metal",freq:1350,hp:2500,lp:7e3,at:.13,a:.001,d:.08,shape:-5,gain:.4},{wave:"noise",bp:900,q:1.5,at:.08,a:.001,d:.03,shape:-5,gain:.4}],limit:1,gain:3.07},av={layers:[{wave:"square",duty:.5,freq:250,to:640,curve:1.5,a:.002,h:.03,d:.15,shape:2,lp:3500},{wave:"sine",freq:125,to:320,curve:1.5,a:.002,d:.14,gain:.5}],gain:.426},rv={layers:[{wave:"sine",freq:290,to:720,curve:2,a:.003,d:.15,shape:2},{wave:"triangle",freq:580,to:1440,curve:2,a:.003,d:.1,shape:3,gain:.3}],limit:1,gain:.846},sv={layers:[{wave:"square",duty:.25,freq:220,to:880,curve:1.2,a:.002,h:.05,d:.25,shape:2,lp:4e3},{wave:"triangle",freq:110,to:440,curve:1.2,a:.002,h:.05,d:.22,gain:.6},{wave:"noise",bp:800,bpTo:3e3,a:.02,d:.12,gain:.15}],gain:.364},ov={layers:[{wave:"square",duty:.25,freq:440,to:1100,curve:2,a:.002,d:.14,shape:2,lp:4500},{wave:"noise",bp:1800,bpTo:5e3,q:1.2,a:.015,d:.12,gain:.35}],limit:1,gain:.677},lv={layers:[{wave:"sine",freq:180,to:760,curve:1.3,vib:[14,1.2],a:.003,h:.05,d:.25,shape:1.8}],gain:.478},cv={vary:1,layers:[{wave:"triangle",freq:520,to:900,a:.002,h:.02,d:.08,shape:2}],limit:1,gain:1.06},hv={vary:1,varyF:3,varyG:1,layers:[{wave:"pink",lp:1200,lpTo:350,a:.001,d:.16,shape:-3,drive:3},{wave:"noise",bp:1800,q:1.2,at:.006,a:.001,d:.05,shape:-4,drive:1,gain:.3},{wave:"noise",bp:260,q:2,a:.001,d:.1,shape:-4,drive:1,gain:.8},{wave:"sine",freq:150,to:75,a:.001,d:.14,shape:-4,drive:1,gain:.6},{wave:"brown",lp:250,a:.002,d:.2,shape:-4,gain:.3}],limit:1,gain:.724},dv={vary:.8,varyF:3,varyG:1,verb:[.2,.1],layers:[{wave:"noise",bp:1500,q:.8,a:.001,d:.012,shape:-6,gain:.4},{wave:"pink",lp:900,lpTo:250,a:.001,d:.2,shape:-4,drive:2},{wave:"noise",bp:320,q:2,a:.001,d:.16,shape:-4,drive:1,gain:1},{wave:"sine",freq:110,to:55,a:.001,d:.3,shape:-5,drive:1,gain:.3},{wave:"noise",bp:1300,q:3,at:.035,a:.001,d:.02,shape:-5,gain:.3},{wave:"noise",bp:900,q:3,at:.07,a:.001,d:.02,shape:-5,gain:.24},{wave:"noise",bp:1700,q:3,at:.11,a:.001,d:.02,shape:-5,gain:.18},{wave:"brown",lp:300,a:.002,d:.35,shape:-4,gain:.35}],limit:1,gain:.918},uv={layers:[{wave:"triangle",freq:160,to:460,vib:[22,2.5],a:.002,h:.05,d:.4,shape:1.8},{wave:"sine",freq:80,to:230,vib:[22,2.5],a:.002,d:.3,gain:.4}],gain:.502},fv={layers:[{wave:"noise",bp:1200,q:1.5,a:.001,d:.04,shape:2,gain:.7},{wave:"square",duty:.3,freq:330,to:780,curve:2,at:.02,a:.002,d:.12,shape:2,lp:3500}],gain:.688},pv={vary:.5,varyF:1.5,varyG:1,layers:[{wave:"noise",bp:1800,bpTo:1e3,q:1,a:.02,h:.2,d:.15,shape:-3,drive:.5},{wave:"brown",lp:400,a:.02,h:.2,d:.15,gain:.4}],gain:.606},mv={vary:.3,layers:[{wave:"sine",freq:2e3,to:500,curve:.7,vib:[6,.3],a:.02,h:.8,d:.1,shape:1.5,gain:.7},{wave:"noise",bp:2e3,bpTo:500,q:8,kt:0,a:.02,h:.8,d:.1,gain:.1}],gain:.271},vv={varyF:2,varyG:1.5,verb:[.15,.08],layers:[{wave:"noise",bp:1800,a:.001,d:.01,shape:-5,gain:.8},{wave:"pink",lp:1500,lpTo:300,at:.002,a:.001,d:.09,shape:-6,drive:2},{wave:"sine",freq:160,to:70,at:.003,a:.001,d:.22,shape:-5,drive:1,gain:.8},{wave:"brown",lp:250,at:.01,a:.002,d:.35,shape:-5,gain:.25}],limit:1,gain:.777},gv={varyF:2,varyG:1.5,layers:[{wave:"noise",bp:2200,q:1,a:.001,d:.008,shape:-6,drive:2,gain:.6},{wave:"pink",bp:1500,bpTo:600,q:.9,at:.001,a:.001,d:.11,shape:-3,drive:3},{wave:"triangle",freq:300,to:150,at:.002,a:.001,d:.08,shape:-4,drive:1,gain:.5},{wave:"brown",lp:300,at:.005,a:.002,d:.12,shape:-5,gain:.15}],limit:1,gain:1.04},_v={varyF:2,varyG:1.5,verb:[.35,.15],layers:[{wave:"noise",bp:1600,q:.8,a:.001,d:.012,shape:-5,gain:.7},{wave:"crunch",freq:2600,to:300,a:.001,d:.18,shape:-4,lp:4e3,drive:1,gain:.8},{wave:"pink",bp:500,bpTo:180,q:.9,at:.002,a:.001,d:.25,shape:-5,drive:2.5},{wave:"sine",freq:120,to:55,at:.003,a:.001,d:.3,shape:-5,drive:1.5,gain:.7},{wave:"brown",lp:300,at:.01,a:.002,d:.45,shape:-4,gain:.3}],limit:1,gain:.658},xv={varyF:2,varyG:1.5,verb:[.15,.08],layers:[{wave:"noise",bp:1400,a:.001,d:.012,shape:-5,gain:.6},{wave:"pink",bp:1e3,bpTo:350,q:.9,at:.002,a:.001,d:.16,shape:-6,drive:2},{wave:"sine",freq:140,to:60,at:.004,a:.001,d:.25,shape:-5,drive:1.5,gain:.9},{wave:"brown",lp:250,at:.01,a:.002,d:.3,shape:-5,gain:.25}],limit:1,gain:.764},yv={verb:[.15,.12],layers:[{wave:"noise",bp:3e3,q:.8,a:.001,h:.01,d:.05,shape:3,drive:4},{wave:"pink",bp:1100,q:.9,a:.001,d:.08,shape:2.5,drive:1.5,gain:.5},{wave:"sine",freq:240,to:140,at:.003,a:.001,d:.05,shape:3,drive:1,gain:.3}],gain:.494},wv={layers:[{wave:"square",duty:.5,freq:520,to:180,curve:1.5,a:.001,h:.03,d:.17,shape:2,lp:3e3,drive:.8},{wave:"crunch",freq:1600,to:500,a:.001,d:.12,gain:.35,lp:3e3}],gain:.398},Mv={layers:[{wave:"square",duty:.25,freq:900,to:450,a:.001,h:.02,d:.09,shape:2,lp:5e3,gain:.8},{wave:"noise",bp:3e3,a:.001,d:.05,shape:3,drive:2},{wave:"sine",freq:220,to:110,a:.001,d:.07,shape:2.5,drive:1,gain:.6}],limit:1,gain:.464},Sv={rate:11025,layers:[{wave:"square",duty:.5,freq:680,to:70,curve:1.2,a:.001,h:.03,d:.34,shape:1.5,lp:3e3},{wave:"crunch",freq:3e3,to:200,a:.001,d:.3,gain:.4}],gain:.347},bv={vary:.8,varyF:2,varyG:1.5,verb:[.3,.18],layers:[{wave:"noise",hp:2e3,a:.001,d:.006,shape:-6,gain:.8},{wave:"modal",freq:1550,modes:[1,2.76,5.4,8.93],a:.001,d:.7,shape:-4},{wave:"modal",freq:2300,modes:[1,1.47,2.09,2.56],a:.001,d:.45,shape:-4,gain:.7},{wave:"noise",bp:700,q:3,a:.001,d:.05,shape:-6,drive:1,gain:.6},{wave:"noise",bp:5e3,bpTo:2800,q:3,at:.01,a:.005,d:.25,shape:-4,gain:.25}],limit:1,gain:.415},Ev={verb:[.2,.12],layers:[{wave:"metal",freq:420,bp:1600,q:1.5,a:.001,d:.25,shape:3,drive:1},{wave:"noise",lp:2e3,a:.001,d:.05,shape:3,drive:1.5,gain:.6},{wave:"sine",freq:180,to:100,a:.001,d:.14,drive:1,gain:.7}],limit:1,gain:.827},Tv={varyF:2,varyG:1.5,verb:[.25,.15],layers:[{wave:"noise",bp:2200,q:.8,a:.001,d:.01,shape:-5,gain:.7},{wave:"pink",bp:900,bpTo:300,q:.9,at:.002,a:.001,d:.12,shape:-6,drive:2},{wave:"sine",freq:150,to:65,at:.003,a:.001,d:.2,shape:-5,drive:1,gain:.6},{wave:"square",duty:.25,freq:1760,arp:[0,12],arpRate:.05,at:.02,a:.001,d:.3,shape:-4,lp:6e3,kt:1,gain:.35}],limit:1,gain:.918},Av={layers:[{wave:"noise",lp:1400,lpTo:300,q:3,a:.004,d:.18,shape:2,drive:1.5},{wave:"sine",freq:300,to:110,vib:[30,2],a:.003,d:.14,gain:.5}],limit:1,gain:.972},Rv={layers:[{wave:"sine",freq:920,to:330,curve:2,a:.001,d:.12,shape:2},{wave:"triangle",freq:460,to:165,curve:2,a:.001,d:.1,gain:.5},{wave:"noise",bp:1500,a:.001,d:.02,gain:.4}],limit:1,gain:.994},Cv={layers:[{wave:"sine",freq:520,to:140,curve:2,a:.001,d:.08,shape:2.5,drive:1},{wave:"pink",lp:1600,lpTo:400,a:.001,d:.06,shape:3,drive:1.5,gain:.7},{wave:"square",duty:.25,freq:440,to:1100,curve:2,at:.05,a:.002,d:.09,shape:2,lp:4e3,gain:.35}],limit:1,gain:.87},Pv={varyF:2,varyG:1,layers:[{wave:"noise",bp:1800,q:2,a:.001,d:.008,shape:-5,drive:2,gain:.6},{wave:"modal",freq:210,modes:[1,2.32,4.25,6.63],at:.002,a:.001,d:.25,shape:-4,drive:1.5},{wave:"noise",bp:320,q:3,a:.001,d:.1,shape:-4,drive:1,gain:.8},{wave:"pluck",freq:160,at:.005,a:.001,d:.35,shape:-3,damp:.993,blend:.45,lp:1500,gain:.5},{wave:"brown",lp:300,a:.002,d:.12,shape:-5,gain:.3}],limit:1,gain:.907},Dv={varyF:2,varyG:1.5,layers:[{wave:"noise",bp:2500,bpTo:1200,q:1.2,a:.035,d:.02,shape:1,gain:.4},{wave:"noise",bp:3200,q:2,at:.04,a:.001,d:.01,shape:-6,gain:.3},{wave:"pink",lp:1e3,lpTo:300,at:.04,a:.001,d:.09,shape:-6,drive:2},{wave:"sine",freq:160,to:70,at:.04,a:.001,d:.16,shape:-5,drive:1},{wave:"brown",lp:250,at:.045,a:.002,d:.22,shape:-5,gain:.3}],limit:1,gain:.677},Lv={vary:.8,varyF:2,varyG:1.5,layers:[{wave:"noise",bp:3500,q:2,a:.001,d:.015,shape:-5,gain:.6},{wave:"noise",lp:1500,lpTo:400,q:3,a:.002,d:.14,shape:-4,drive:1.5},{wave:"sine",freq:180,to:90,a:.001,d:.1,shape:-5,gain:.5}],limit:1,gain:.911},Uv={vary:.6,varyF:1.5,verb:[.35,.2],layers:[{wave:"noise",hp:2500,lp:9e3,a:.001,d:.03,shape:-5,drive:.5},{wave:"modal",freq:1450,modes:[1,2.756,5.404],a:.001,d:.8,shape:-3,gain:.6},{wave:"metal",freq:1100,hp:3e3,lp:8e3,a:.001,d:.5,shape:-4,gain:.6},{wave:"sine",freq:3300,fm:[1.41,2,.15],vib:[7,.1],a:.001,d:.7,shape:-3,gain:.2}],limit:1,gain:.66},Iv={vary:.4,verb:[.3,.15],layers:[{wave:"noise",bp:4e3,bpTo:6500,q:4,a:.05,h:.2,d:.1,shape:-3,gain:.7},{wave:"metal",freq:2200,hp:4e3,a:.05,h:.2,d:.1,gain:.25},{wave:"modal",freq:1700,modes:[1,2.756,5.404],at:.3,a:.001,d:.7,shape:-3,gain:.4}],gain:.893},Nv={varyF:2,varyG:1.5,verb:[.25,.1],layers:[{wave:"pink",lp:900,a:.001,d:.1,shape:-5,drive:1.5},{wave:"sine",freq:95,to:40,a:.001,d:.25,shape:-4,drive:1},{wave:"pink",lp:700,at:.13,a:.001,d:.07,shape:-5,gain:.5},{wave:"noise",bp:1600,q:1,at:.13,a:.001,d:.02,shape:-5,gain:.3}],limit:1,gain:.739},Fv={verb:[.45,.22],layers:[{wave:"noise",hp:1500,a:.001,d:.06,shape:3,gain:.6},{wave:"brown",lp:1100,lpTo:140,a:.002,d:1.1,shape:2.5,drive:1.2,gain:1.4},{wave:"sine",freq:110,to:36,curve:3,a:.001,d:.5,shape:2,drive:1},{wave:"crunch",freq:3e3,to:300,a:.001,d:.35,shape:3,lp:5e3,gain:.4}],gain:.299},Ov={verb:[.3,.15],layers:[{wave:"noise",hp:1200,a:.001,d:.03,shape:3,gain:.35},{wave:"brown",lp:2500,lpTo:200,a:.001,d:.5,shape:2.5,drive:1.5,gain:1.4},{wave:"noise",lp:4e3,lpTo:500,a:.001,d:.3,shape:3,drive:1,gain:.5},{wave:"sine",freq:150,to:45,curve:3,at:.004,a:.001,d:.3,shape:2,drive:1.5,gain:.8}],limit:1,gain:.533},qv={verb:[.75,.3],layers:[{wave:"noise",hp:1e3,a:.001,d:.1,shape:3,gain:.5},{wave:"brown",lp:900,lpTo:80,a:.003,h:.1,d:2,shape:2.2,drive:2,gain:1.6},{wave:"sine",freq:80,to:28,curve:3,a:.001,d:.9,shape:1.8,drive:1.5},{wave:"crunch",freq:2e3,to:120,a:.001,d:.8,shape:2.5,lp:3e3,gain:.5},{wave:"pink",bp:400,bpTo:120,a:.2,d:1.4,shape:2,gain:.5}],gain:.229},Bv={rate:22050,layers:[{wave:"crunch",freq:1800,to:60,curve:1.5,a:.001,h:.05,d:.7,shape:1.8}],gain:.567},zv={verb:[.8,.4],layers:[{wave:"brown",lp:380,lpTo:90,a:.015,d:1.4,shape:2.2,gain:1.6},{wave:"sine",freq:60,to:30,a:.01,d:.8,shape:2}],limit:1,gain:.742},kv={verb:[.5,.25],layers:[{wave:"noise",lp:3e3,lpTo:600,a:.001,d:.25,shape:3},{wave:"sine",freq:120,to:45,a:.001,d:.2,drive:1},{wave:"noise",hp:3e3,at:.18,a:.001,d:.012,shape:2,gain:.5},{wave:"noise",hp:3e3,at:.23,a:.001,d:.012,shape:2,gain:.5},{wave:"noise",hp:3e3,at:.26,a:.001,d:.012,shape:2,gain:.5},{wave:"noise",hp:3e3,at:.31,a:.001,d:.012,shape:2,gain:.5},{wave:"noise",hp:3e3,at:.37,a:.001,d:.012,shape:2,gain:.5},{wave:"noise",hp:3e3,at:.4,a:.001,d:.012,shape:2,gain:.5},{wave:"noise",hp:3e3,at:.46,a:.001,d:.012,shape:2,gain:.5},{wave:"noise",hp:3e3,at:.55,a:.001,d:.012,shape:2,gain:.5}],limit:1,gain:.668},Gv={verb:[.3,.15],layers:[{wave:"noise",lp:300,lpTo:6e3,a:.45,d:.03,shape:1,gain:.6},{wave:"sine",freq:40,to:200,a:.45,d:.02,gain:.5},{wave:"sine",freq:120,to:40,at:.47,a:.001,d:.25,drive:1.5}],gain:.539},Hv={layers:[{wave:"brown",lp:1200,lpTo:300,a:.002,d:.6,shape:2,drive:1,gain:.9},{wave:"noise",bp:900,q:2,at:0,a:.001,d:.04,shape:3,drive:1.5,gain:.7},{wave:"noise",bp:1400,q:2,at:.07,a:.001,d:.04,shape:3,drive:1.5,gain:.6299999999999999},{wave:"noise",bp:700,q:2,at:.12,a:.001,d:.04,shape:3,drive:1.5,gain:.5599999999999999},{wave:"noise",bp:1800,q:2,at:.2,a:.001,d:.04,shape:3,drive:1.5,gain:.48999999999999994},{wave:"noise",bp:1100,q:2,at:.26,a:.001,d:.04,shape:3,drive:1.5,gain:.41999999999999993},{wave:"noise",bp:600,q:2,at:.35,a:.001,d:.04,shape:3,drive:1.5,gain:.3499999999999999},{wave:"noise",bp:1300,q:2,at:.47,a:.001,d:.04,shape:3,drive:1.5,gain:.2799999999999999},{wave:"sine",freq:160,to:70,at:0,a:.001,d:.08,shape:2.5,drive:1,gain:.5},{wave:"sine",freq:160,to:70,at:.12,a:.001,d:.08,shape:2.5,drive:1,gain:.5},{wave:"sine",freq:160,to:70,at:.26,a:.001,d:.08,shape:2.5,drive:1,gain:.5}],limit:1,gain:.968},Vv={verb:[.5,.2],layers:[{wave:"sine",freq:70,to:30,a:.002,d:.8,shape:2,drive:1},{wave:"noise",bp:3e3,bpTo:200,q:2,a:.002,d:.6,shape:2},{wave:"saw",freq:220,to:55,lp:1500,lpTo:200,a:.002,d:.5,shape:2,gain:.4}],gain:.417},Wv={varyF:2,varyG:1,layers:[{wave:"noise",freq:1e3,arp:[0,19,7,24,3,14,0,22],arpRate:.037,loop:!0,kt:1,lp:2600,hp:2e3,a:.03,h:.85,d:.12,shape:-3,gain:.8},{wave:"noise",freq:1e3,arp:[12,0,17,5,24,9],arpRate:.023,loop:!0,kt:1,lp:3e3,hp:2500,a:.03,h:.85,d:.12,shape:-3,gain:.5},{wave:"crunch",freq:70,hp:3e3,a:.03,h:.9,d:.1,shape:-3,gain:.35}],gain:.894},Xv={layers:[{wave:"square",duty:.5,freq:392,arp:[0,4,7,12,16,19,24],arpRate:.045,a:.002,h:.25,d:.15,shape:2,lp:5e3},{wave:"triangle",freq:196,arp:[0,4,7,12,16,19,24],arpRate:.045,a:.002,h:.25,d:.15,gain:.5}],gain:.184},Yv={bits:6,layers:[{wave:"square",duty:.25,freq:200,to:1300,vib:[18,1],a:.002,h:.3,d:.15,shape:2}],gain:.201},Zv={verb:[.45,.25],layers:[{wave:"triangle",freq:523,arp:[0,4,7,12],arpRate:.08,a:.003,h:.35,d:.45,shape:2,vib:[5.5,.12]},{wave:"square",duty:.25,freq:1046,arp:[0,4,7,12],arpRate:.08,a:.003,h:.3,d:.4,lp:4e3,gain:.3},{wave:"sine",freq:2093,fm:[2,1,.2],at:.32,a:.002,d:.6,shape:3,gain:.35}],gain:.223},Jv={layers:[{wave:"square",duty:.5,freq:659,arp:[0,3,12,8,10,15],arpRate:.085,a:.002,h:.45,d:.1,shape:2,lp:5e3},{wave:"triangle",freq:330,arp:[0,3,12,8,10,15],arpRate:.085,a:.002,h:.45,d:.1,gain:.4}],gain:.154},Kv={verb:[.3,.15],layers:[{wave:"saw",freq:110,to:220,lp:300,lpTo:4500,q:3,a:.01,h:.15,d:.25,shape:2},{wave:"sine",freq:440,to:880,vib:[9,.3],a:.01,h:.15,d:.25,gain:.5}],gain:.283},$v={layers:[{wave:"saw",freq:220,to:90,lp:4e3,lpTo:300,q:3,a:.005,d:.4,shape:2},{wave:"noise",bp:3e3,bpTo:600,a:.005,d:.3,gain:.3}],limit:1,gain:.618},jv={layers:[{wave:"square",duty:.3,freq:300,to:1500,vib:[28,.8],a:.003,h:.1,d:.2,shape:2,lp:5e3},{wave:"noise",bp:1e3,bpTo:6e3,a:.05,d:.25,gain:.3}],gain:.299},Qv={verb:[.6,.3],layers:[{wave:"sine",freq:523,arp:[0,4,7,11,14],arpRate:.09,a:.01,h:.35,d:.5,shape:2,vib:[5,.1]},{wave:"sine",freq:1568,fm:[2,1.2,.3],arp:[0,4,7,11,14],arpRate:.09,a:.01,h:.3,d:.4,gain:.3}],gain:.179},eg={layers:[{wave:"saw",freq:90,to:720,curve:.7,lp:400,lpTo:6e3,q:4,a:.6,h:.3,d:.08,shape:1},{wave:"sine",freq:180,to:1440,curve:.7,vib:[12,.3],a:.6,h:.3,d:.08,gain:.4}],gain:.215},tg={layers:[{wave:"square",duty:.5,freq:784,arp:[0,-3,-7,-12,-15,-19],arpRate:.055,a:.002,h:.28,d:.1,shape:2,lp:4e3},{wave:"triangle",freq:392,arp:[0,-3,-7,-12,-15,-19],arpRate:.055,a:.002,h:.28,d:.1,gain:.4}],gain:.188},ng={verb:[.4,.22],layers:[{wave:"metal",freq:900,bp:3e3,a:.001,d:.06,gain:.5},{wave:"triangle",freq:659,arp:[0,7,12,19],arpRate:.07,at:.05,a:.002,h:.2,d:.4,shape:2},{wave:"sine",freq:2637,fm:[2,1,.2],at:.26,a:.002,d:.5,shape:3,gain:.3}],gain:.267},ig={layers:[{wave:"square",duty:.25,freq:784,arp:[0,4,7,12],arpRate:.035,loop:!0,a:.002,h:.6,d:.3,shape:1.5,lp:6e3},{wave:"triangle",freq:392,arp:[0,7],arpRate:.07,loop:!0,a:.002,h:.6,d:.3,gain:.5}],gain:.159},ag={vary:.8,varyF:2,varyG:1.5,layers:[{wave:"square",duty:.5,freq:1500,to:220,curve:3,a:.001,d:.2,shape:1.8,lp:7500,kt:1},{wave:"saw",freq:750,to:110,curve:3,a:.001,d:.17,lp:3500,kt:1,gain:.4}],gain:.497},rg={layers:[{wave:"sine",freq:1400,to:300,curve:3,a:.001,d:.16,shape:2,fm:[.5,1.5,.08]}],gain:.79},sg={verb:[.25,.12],echo:[.07,.3,.18],layers:[{wave:"saw",freq:900,to:70,curve:2.5,a:.001,d:.4,shape:1.8,lp:4e3,lpTo:500,drive:1.5},{wave:"square",duty:.3,freq:450,to:35,curve:2.5,a:.001,d:.35,lp:1500,gain:.6},{wave:"noise",hp:2500,a:.001,d:.05,gain:.3}],gain:.319},og={echo:[.07,.3,.18],layers:[{wave:"square",duty:.25,freq:950,to:160,curve:2.5,a:.001,d:.14,shape:2,lp:5e3,kt:1},{wave:"noise",bp:3e3,q:.8,a:.001,d:.05,shape:3,gain:.6},{wave:"sine",freq:180,to:60,a:.001,d:.08,gain:.6}],limit:1,gain:.689},lg={vary:1,varyF:2,varyG:1.5,layers:[{wave:"crunch",freq:6e3,to:1500,hp:1200,lp:9e3,a:.001,d:.15,shape:-3,drive:3,gain:.8},{wave:"saw",freq:2600,to:500,vib:[60,3],hp:400,lp:6e3,kt:1,a:.001,d:.1,shape:-4,gain:.5},{wave:"square",duty:.1,freq:120,bp:1500,q:2,a:.001,d:.12,shape:-4,gain:.5}],limit:1,gain:.722},cg={vary:1,varyF:2,varyG:1.5,layers:[{wave:"square",duty:.25,freq:2100,to:600,curve:4,a:.001,d:.08,shape:2,hp:150,lp:7e3,kt:1}],limit:1,gain:.785},hg={varyF:2,varyG:1.5,verb:[.25,.2],layers:[{wave:"noise",bp:2500,q:.7,a:.001,d:.02,shape:-6,drive:3,gain:.6},{wave:"noise",bp:1100,q:1,a:.001,d:.1,shape:-4,drive:3},{wave:"noise",hp:150,lp:7e3,lpTo:1200,a:.001,d:.18,shape:-5,drive:2},{wave:"sine",freq:180,to:80,curve:3,a:.001,d:.1,shape:-5,drive:2,gain:.5},{wave:"pink",bp:1400,q:1,a:.001,d:.22,shape:-4,gain:.3}],limit:1,gain:.477},dg={verb:[.45,.22],layers:[{wave:"noise",hp:300,lp:8e3,lpTo:1500,a:.001,d:.4,shape:3.5,drive:2.5,gain:1.2},{wave:"sine",freq:120,to:40,curve:3,a:.001,d:.22,drive:2},{wave:"brown",lp:600,a:.001,d:.35,gain:.7}],gain:.273},ug={rate:16e3,layers:[{wave:"crunch",freq:3e3,to:600,a:.001,d:.14,shape:2,drive:1},{wave:"square",freq:600,to:150,a:.001,d:.1,drive:1,gain:.6}],gain:.428},fg={echo:[.09,.3,.15],verb:[.4,.2],layers:[{wave:"sine",freq:600,to:3200,a:.25,d:.02,shape:1,gain:.35},{wave:"saw",freq:3200,to:140,curve:3,at:.26,a:.001,d:.35,shape:2,lp:7e3,lpTo:800},{wave:"noise",hp:2e3,at:.26,a:.001,d:.2,gain:.5},{wave:"sine",freq:100,to:40,at:.26,a:.001,d:.2,drive:1}],gain:.36},pg={layers:[{wave:"sine",freq:900,to:300,fm:[.5,6,.3],vib:[11,1],a:.004,h:.15,d:.25,shape:2}],gain:.291},mg={layers:[{wave:"saw",freq:300,to:120,lp:3e3,lpTo:600,q:4,vib:[25,1],a:.003,d:.3,shape:2},{wave:"noise",bp:2400,bpTo:800,q:2,a:.003,d:.2,gain:.4}],limit:1,gain:.598},vg={layers:[{wave:"noise",bp:600,bpTo:3500,q:1.2,a:.02,h:.3,d:.4,shape:2,drive:.5},{wave:"brown",lp:400,a:.002,d:.5,gain:.7},{wave:"sine",freq:300,to:900,a:.05,h:.25,d:.3,gain:.15}],gain:.608},gg={verb:[.3,.15],layers:[{wave:"noise",bp:3e3,q:1,a:.001,d:.012,shape:3,drive:2,gain:.6},{wave:"metal",freq:1800,hp:3e3,a:.001,d:.05,shape:3,gain:.35},{wave:"sine",freq:3400,to:1500,curve:.8,vib:[28,.25],at:.008,a:.004,d:.4,shape:2},{wave:"triangle",freq:1700,to:750,curve:.8,vib:[28,.25],at:.008,a:.004,d:.3,shape:2.5,gain:.25}],gain:.333},_g={verb:[.15,.1],layers:[{wave:"metal",freq:1200,bp:3500,q:2,a:.001,h:.006,d:.03,shape:3,drive:4},{wave:"sine",freq:320,to:200,at:.002,a:.001,d:.04,shape:3,drive:1,gain:.4},{wave:"metal",freq:1500,bp:4e3,q:2,at:.06,a:.001,d:.02,shape:3,drive:2,gain:.5}],limit:1,gain:.987},xg={layers:[{wave:"metal",freq:1100,bp:3500,q:2,a:.001,d:.06,shape:3,drive:2},{wave:"noise",bp:1500,q:2,at:.005,a:.001,d:.03,gain:.4},{wave:"metal",freq:800,bp:2400,q:2,at:.22,a:.001,d:.09,shape:3,drive:2},{wave:"noise",bp:1100,q:2,at:.225,a:.001,d:.04,gain:.5},{wave:"sine",freq:200,to:140,at:.22,a:.001,d:.05,gain:.4}],limit:1,gain:.829},yg={vary:1,varyF:2,layers:[{wave:"pluck",freq:98,a:.001,d:.45,shape:-3,damp:.994,blend:.46,lp:2200},{wave:"noise",bp:1500,a:.001,d:.012,shape:-5,gain:.5},{wave:"noise",bp:900,bpTo:2600,q:2,at:.02,a:.03,d:.12,shape:-3,gain:.25}],limit:1,gain:2.14},wg={vary:.3,varyF:1.5,verb:[.3,.12],layers:[{wave:"noise",hp:300,lp:6e3,lpTo:1500,at:0,a:.001,d:.05,shape:-5,drive:2,gain:.9},{wave:"sine",freq:150,to:60,at:0,a:.001,d:.06,shape:-5,drive:1.5,gain:.7},{wave:"brown",lp:600,at:0,a:.001,d:.08,shape:-4,gain:.4},{wave:"noise",hp:300,lp:6e3,lpTo:1500,at:.075,a:.001,d:.05,shape:-5,drive:2,gain:.8},{wave:"sine",freq:150,to:60,at:.075,a:.001,d:.06,shape:-5,drive:1.5,gain:.7},{wave:"brown",lp:600,at:.075,a:.001,d:.08,shape:-4,gain:.4},{wave:"noise",hp:300,lp:6e3,lpTo:1500,at:.15,a:.001,d:.05,shape:-5,drive:2,gain:.9},{wave:"sine",freq:150,to:60,at:.15,a:.001,d:.06,shape:-5,drive:1.5,gain:.7},{wave:"brown",lp:600,at:.15,a:.001,d:.08,shape:-4,gain:.4},{wave:"noise",hp:300,lp:6e3,lpTo:1500,at:.225,a:.001,d:.05,shape:-5,drive:2,gain:.8},{wave:"sine",freq:150,to:60,at:.225,a:.001,d:.06,shape:-5,drive:1.5,gain:.7},{wave:"brown",lp:600,at:.225,a:.001,d:.08,shape:-4,gain:.4},{wave:"noise",hp:300,lp:6e3,lpTo:1500,at:.3,a:.001,d:.05,shape:-5,drive:2,gain:.9},{wave:"sine",freq:150,to:60,at:.3,a:.001,d:.06,shape:-5,drive:1.5,gain:.7},{wave:"brown",lp:600,at:.3,a:.001,d:.08,shape:-4,gain:.4}],gain:.534},Mg={vary:1,varyF:2,varyG:2,layers:[{wave:"modal",freq:3200,modes:[1,2.756,5.404],at:0,a:.001,d:.12,shape:-5,gain:1},{wave:"modal",freq:3450,modes:[1,2.756,5.404],at:.08,a:.001,d:.12,shape:-5,gain:.7},{wave:"modal",freq:3700,modes:[1,2.756,5.404],at:.13,a:.001,d:.12,shape:-5,gain:.4}],gain:.527},Sg={vary:.3,varyF:2,layers:[{wave:"noise",bp:1200,q:.7,a:.05,h:.5,d:.3,shape:-3,drive:1.5},{wave:"brown",lp:500,a:.05,h:.5,d:.3,shape:-3,drive:1,gain:.8},{wave:"noise",bp:3e3,q:2,at:.06,a:.001,d:.01,shape:-5,gain:.3},{wave:"noise",bp:3e3,q:2,at:.15,a:.001,d:.01,shape:-5,gain:.3},{wave:"noise",bp:3e3,q:2,at:.24,a:.001,d:.01,shape:-5,gain:.3},{wave:"noise",bp:3e3,q:2,at:.33,a:.001,d:.01,shape:-5,gain:.3},{wave:"noise",bp:3e3,q:2,at:.42,a:.001,d:.01,shape:-5,gain:.3},{wave:"noise",bp:3e3,q:2,at:.51,a:.001,d:.01,shape:-5,gain:.3},{wave:"noise",bp:3e3,q:2,at:.6000000000000001,a:.001,d:.01,shape:-5,gain:.3},{wave:"noise",bp:3e3,q:2,at:.69,a:.001,d:.01,shape:-5,gain:.3}],gain:.289},bg={vary:.5,varyF:1.5,verb:[.3,.12],layers:[{wave:"sine",freq:220,to:70,curve:2,a:.001,d:.2,shape:-4,drive:1.5},{wave:"noise",bp:700,q:2,a:.001,d:.08,shape:-5,drive:1},{wave:"noise",bp:2500,bpTo:1e3,q:1.5,at:.04,a:.01,d:.25,shape:-3,gain:.3}],gain:.601},Eg={vary:1.5,varyF:4,varyG:2,layers:[{wave:"pink",lp:450,lpTo:225,a:.001,d:.08,shape:-6,drive:.5,gain:.8},{wave:"pink",bp:1100,q:.8,a:.008,d:.14,shape:-4,gain:.55},{wave:"pink",hp:2e3,lp:5e3,at:.01,a:.01,d:.12,shape:-4,gain:.25},{wave:"crunch",freq:7e3,hp:3e3,at:.012,a:.01,d:.08,shape:-4,gain:.1},{wave:"brown",lp:220,a:.002,d:.24,shape:-4,gain:.3}],limit:1,gain:2.3},Tg={vary:1.5,varyF:4,varyG:2,layers:[{wave:"pink",lp:600,lpTo:300,a:.001,d:.07,shape:-6,drive:.5,gain:1},{wave:"noise",bp:1800,q:1.2,at:.004,a:.001,d:.03,shape:-5,drive:1,gain:.35},{wave:"noise",bp:520,q:10,a:.001,d:.06,shape:-5,gain:.5},{wave:"brown",lp:220,a:.002,d:.24,shape:-4,gain:.25}],limit:1,gain:1.76},Ag={vary:1.5,varyF:3,varyG:1.2,layers:[{wave:"pink",lp:500,lpTo:250,a:.001,d:.08,shape:-6,drive:.5,gain:.8},{wave:"modal",freq:180,modes:[1,2.3,4.1],a:.001,d:.16,shape:-4,drive:1,gain:.8},{wave:"noise",bp:350,q:2,a:.001,d:.08,shape:-4,drive:1,gain:.7},{wave:"noise",bp:1800,q:1.2,at:.006,a:.001,d:.025,shape:-5,gain:.25},{wave:"brown",lp:220,a:.002,d:.24,shape:-4,gain:.2}],limit:1,gain:.874},Rg={vary:1.5,varyF:4,varyG:2,verb:[.2,.15],layers:[{wave:"pink",lp:550,lpTo:275,a:.001,d:.07,shape:-6,drive:.5,gain:.8},{wave:"modal",freq:420,modes:[1,2.76,5.4,8.93],a:.001,d:.3,shape:-4,gain:.35},{wave:"metal",freq:600,hp:1800,a:.001,d:.12,shape:-5,gain:.35},{wave:"noise",bp:1500,a:.001,d:.03,shape:-5,gain:.4}],limit:1,gain:1.52},Cg={vary:1.5,varyF:4,varyG:2,layers:[{wave:"pink",lp:400,lpTo:200,a:.001,d:.08,shape:-6,drive:.5,gain:.6},{wave:"crunch",freq:9e3,hp:1200,lp:7e3,a:.02,d:.15,shape:-3,gain:.8},{wave:"pink",lp:1500,a:.02,d:.12,shape:-4,gain:.5}],limit:1,gain:.747},Pg={vary:1.5,varyF:4,varyG:2,layers:[{wave:"pink",lp:500,lpTo:250,a:.001,d:.08,shape:-6,drive:.5,gain:.8},{wave:"crunch",freq:3e3,hp:900,lp:4500,a:.005,d:.12,shape:-4,drive:1,gain:.6},{wave:"noise",bp:1400,q:3,at:.02,a:.001,d:.02,shape:-5,gain:.45},{wave:"noise",bp:2200,q:3,at:.045,a:.001,d:.02,shape:-5,gain:.38},{wave:"noise",bp:1700,q:3,at:.07,a:.001,d:.02,shape:-5,gain:.31},{wave:"noise",bp:2600,q:3,at:.1,a:.001,d:.02,shape:-5,gain:.24},{wave:"brown",lp:220,a:.002,d:.24,shape:-4,gain:.2}],limit:1,gain:1.16},Dg={vary:1.5,varyF:4,varyG:2,layers:[{wave:"pink",lp:450,lpTo:225,a:.001,d:.07,shape:-6,drive:.5,gain:.6},{wave:"noise",bp:1300,bpTo:500,q:1.5,a:.004,d:.15,shape:-3},{wave:"sine",freq:350,to:900,curve:3,at:.03,a:.002,d:.06,shape:3,gain:.35}],limit:1,gain:1.78},Lg={vary:1.5,varyF:4,varyG:2,layers:[{wave:"pink",lp:400,lpTo:200,a:.001,d:.09,shape:-6,drive:.5,gain:.7},{wave:"pink",hp:400,lp:2600,a:.015,d:.14,shape:-3},{wave:"noise",hp:3e3,lp:7e3,at:.02,a:.02,d:.08,shape:-4,gain:.12}],limit:1,gain:1.65},Ug={vary:2,bits:4,layers:[{wave:"crunch",freq:4e3,a:.001,d:.035,shape:2}],gain:.773},Ig={vary:1,varyF:3,varyG:1.5,verb:[.2,.12],layers:[{wave:"pink",lp:700,lpTo:300,a:.001,d:.15,shape:-5,drive:1.5},{wave:"noise",bp:240,q:2.5,a:.001,d:.14,shape:-4,drive:1,gain:1.2},{wave:"noise",bp:520,q:2,a:.001,d:.07,shape:-5,gain:.6},{wave:"sine",freq:90,to:45,a:.002,d:.25,shape:-5,drive:1,gain:.3},{wave:"noise",bp:900,a:.001,d:.04,shape:-5,gain:.3},{wave:"brown",lp:220,a:.002,d:.24,shape:-4,gain:.35}],limit:1,gain:.973},Ng={vary:1.5,varyF:4,varyG:2,layers:[{wave:"pink",lp:400,lpTo:200,a:.004,d:.08,shape:-6},{wave:"noise",bp:1200,q:1,a:.004,d:.04,shape:-5,gain:.25},{wave:"brown",lp:200,a:.004,d:.15,shape:-4,gain:.3}],limit:1,gain:2.12},Fg={vary:1.5,varyF:2,varyG:1.5,layers:[{wave:"pink",lp:500,a:.003,d:.08,shape:-6},{wave:"noise",lp:1200,lpTo:300,q:4,a:.01,d:.15,shape:-3,drive:1,gain:.6},{wave:"sine",freq:220,to:120,vib:[28,2],at:.04,a:.005,d:.1,shape:-3,gain:.3}],gain:1.05},Og={echo:[.11,.4,.35],layers:[{wave:"sine",freq:2637,arp:[0,7,12,19,24,19],arpRate:.035,a:.001,h:.18,d:.15,shape:2,fm:[1.5,.6,.1]},{wave:"noise",hp:7e3,lp:12e3,a:.01,h:.15,d:.15,gain:.12}],gain:.205},qg={verb:[.55,.3],layers:[{wave:"saw",freq:220,to:440,lp:400,lpTo:5e3,q:3,a:.15,d:.35,shape:2,vib:[6,.2]},{wave:"noise",bp:1500,bpTo:6e3,q:2,a:.15,d:.3,gain:.35},{wave:"sine",freq:1760,fm:[2,1,.2],at:.15,a:.002,d:.5,shape:3,gain:.3}],gain:.309},Bg={verb:[.3,.15],layers:[{wave:"noise",bp:700,bpTo:2200,q:.8,a:.05,h:.1,d:.4,shape:2,drive:1.5},{wave:"brown",lp:600,a:.02,d:.5,gain:.8,drive:1},{wave:"crunch",freq:180,hp:2500,a:.05,d:.45,gain:.25}],gain:.465},zg={verb:[.5,.3],layers:[{wave:"noise",hp:4e3,a:.001,d:.04,gain:.6},{wave:"sine",freq:3520,fm:[1.41,3,.15],a:.001,d:.6,shape:3},{wave:"sine",freq:4699,fm:[1.73,2,.1],at:.04,a:.001,d:.5,shape:3,gain:.6},{wave:"metal",freq:3e3,hp:6e3,a:.001,d:.3,shape:3,gain:.2}],gain:.277},kg={echo:[.06,.4,.3],layers:[{wave:"sine",freq:220,to:2200,vib:[24,2],a:.005,h:.15,d:.15,shape:2},{wave:"triangle",freq:440,to:4400,vib:[24,2],a:.005,h:.15,d:.12,gain:.25}],gain:.33},Gg={verb:[.6,.3],layers:[{wave:"saw",freq:55,vib:[3,.6],lp:200,lpTo:1800,q:5,a:.4,h:.4,d:.6,shape:2},{wave:"saw",freq:55.8,vib:[3.3,.6],lp:250,lpTo:2200,q:5,a:.4,h:.4,d:.6,shape:2},{wave:"sine",freq:880,vib:[6,1],a:.3,h:.4,d:.6,gain:.15}],gain:.192},Hg={verb:[.7,.3],layers:[{wave:"crunch",freq:9e3,hp:2e3,a:.001,d:.12,shape:2},{wave:"noise",hp:1200,at:.03,a:.001,d:.2,shape:3,gain:.7},{wave:"brown",lp:400,lpTo:100,at:.05,a:.01,d:1.4,shape:2,gain:1.5,drive:1}],gain:.4},Vg={varyF:1,verb:[.6,.3],layers:[{wave:"saw",freq:82,to:70,vib:[4,.4],formant:[300,870,2240],a:.1,h:.3,d:.6,shape:-3},{wave:"saw",freq:87,to:74,vib:[4.4,.4],formant:[570,840,2410],a:.1,h:.3,d:.6,shape:-3,gain:.8},{wave:"brown",lp:200,a:.2,h:.3,d:.6,gain:.4}],gain:.979},Wg={verb:[.6,.3],layers:[{wave:"sine",freq:1319,fm:[3.5,1.5,.15],arp:[0,3,7,10,14],arpRate:.07,a:.002,h:.28,d:.5,shape:2.5},{wave:"sine",freq:659,arp:[0,3,7,10,14],arpRate:.07,a:.002,h:.28,d:.4,gain:.3}],gain:.157},Xg={verb:[.5,.25],layers:[{wave:"noise",hp:3e3,hpTo:800,a:.005,d:.45,shape:2,gain:.5},{wave:"sine",freq:2400,to:400,fm:[1.5,2,.2],a:.005,d:.45,shape:2}],gain:.314},Yg={verb:[.7,.3],layers:[{wave:"triangle",freq:110,to:220,a:.3,h:.2,d:.5,shape:2},{wave:"triangle",freq:165,to:330,a:.35,h:.2,d:.5,shape:2,gain:.7},{wave:"sine",freq:880,fm:[2,1,.3],at:.5,a:.002,d:.6,shape:3,gain:.4},{wave:"noise",bp:300,bpTo:3e3,a:.4,d:.2,gain:.25}],gain:.237},Zg={echo:[.05,.3,.25],layers:[{wave:"sine",freq:1700,to:900,vib:[35,1.5],a:.002,d:.22,shape:2},{wave:"noise",bp:4e3,q:3,a:.002,d:.15,gain:.25}],gain:.542},Jg={vary:.05,verb:[.6,.3],layers:[{wave:"pluck",freq:392,at:0,a:.001,d:1.1,shape:-3,damp:.999,blend:.47,lp:4e3,gain:.8},{wave:"pluck",freq:440.0051229372742,at:.055,a:.001,d:1.1,shape:-3,damp:.999,blend:.47,lp:4e3,gain:.8},{wave:"pluck",freq:493.8890515587903,at:.11,a:.001,d:1.1,shape:-3,damp:.999,blend:.47,lp:4e3,gain:.8},{wave:"pluck",freq:587.3363741356592,at:.165,a:.001,d:1.1,shape:-3,damp:.999,blend:.47,lp:4e3,gain:.8},{wave:"pluck",freq:659.2627895589121,at:.22,a:.001,d:1.1,shape:-3,damp:.999,blend:.47,lp:4e3,gain:.8},{wave:"pluck",freq:784,at:.275,a:.001,d:1.1,shape:-3,damp:.999,blend:.47,lp:4e3,gain:.8},{wave:"pluck",freq:880.0102458745484,at:.33,a:.001,d:1.1,shape:-3,damp:.999,blend:.47,lp:4e3,gain:.8},{wave:"pluck",freq:987.7781031175806,at:.385,a:.001,d:1.1,shape:-3,damp:.999,blend:.47,lp:4e3,gain:.8}],gain:1.29},Kg={vary:.1,layers:[{wave:"square",duty:.5,freq:880,arp:[0,-5],arpRate:.16,loop:!0,a:.005,h:.6,d:.02,shape:1,lp:3500}],gain:.132},$g={vary:.1,layers:[{wave:"sine",freq:1e3,a:.004,h:.08,d:.03,shape:1}],gain:.371},jg={vary:.1,layers:[{wave:"saw",freq:440,at:0,a:.003,h:.07,d:.03,shape:1,lp:2400},{wave:"saw",freq:440,at:.14,a:.003,h:.07,d:.03,shape:1,lp:2400},{wave:"saw",freq:440,at:.28,a:.003,h:.07,d:.03,shape:1,lp:2400}],gain:.306},Qg={vary:.1,layers:[{wave:"triangle",freq:880,a:.003,h:.06,d:.04,shape:1},{wave:"triangle",freq:880,at:.16,a:.003,h:.06,d:.04,shape:1}],gain:.364},e1={vary:.3,varyG:1,layers:[{wave:"sine",freq:70,to:45,a:.004,d:.12,shape:2,drive:.5},{wave:"pink",bp:380,q:1.2,a:.003,d:.05,shape:-5,drive:2,gain:.8},{wave:"triangle",freq:140,to:90,a:.004,d:.07,shape:2.5,gain:.35},{wave:"sine",freq:60,to:40,at:.2,a:.004,d:.14,shape:2,gain:.7},{wave:"pink",bp:320,q:1.2,at:.2,a:.003,d:.06,shape:-5,drive:2,gain:.55},{wave:"triangle",freq:120,to:80,at:.2,a:.004,d:.08,shape:2.5,gain:.25}],limit:1,gain:.703},t1={vary:.05,layers:[{wave:"sine",freq:880,fm:[2,.6,.05],a:.002,h:.05,d:.12,shape:2}],gain:.369},n1={vary:.05,layers:[{wave:"sine",freq:1760,fm:[2,.6,.1],a:.002,h:.25,d:.25,shape:2},{wave:"square",duty:.25,freq:880,a:.002,h:.25,d:.2,lp:3e3,gain:.25}],gain:.137},i1={vary:.1,layers:[{wave:"saw",freq:700,vib:[1.6,5],a:.05,h:1.1,d:.15,shape:1,lp:3e3}],gain:.23},a1={vary:.1,echo:[.32,.4,.35],verb:[.4,.2],layers:[{wave:"sine",freq:1500,a:.002,d:.35,shape:3}],gain:.391},r1={verb:[.45,.25],layers:[{wave:"triangle",freq:587,arp:[0,5,7],arpRate:.11,a:.003,h:.3,d:.3,shape:2},{wave:"sine",freq:1175,fm:[2,.7,.2],arp:[0,5,7],arpRate:.11,a:.003,h:.3,d:.3,gain:.35}],gain:.195},s1={vary:.05,layers:[{wave:"saw",freq:110,a:.005,h:.45,d:.08,shape:1,lp:2e3,drive:1.5},{wave:"square",freq:111.5,a:.005,h:.45,d:.08,shape:1,lp:1200,gain:.6}],gain:.133},o1={vary:.05,verb:[.3,.18],layers:[{wave:"sine",freq:1760,fm:[3.5,1.4,.1],at:0,a:.002,d:.5,shape:-4},{wave:"sine",freq:1760,fm:[3.5,1.4,.1],at:.16,a:.002,d:.5,shape:-4}],gain:.216},l1={vary:.05,layers:[{wave:"metal",freq:2600,bp:3500,q:2,at:0,a:.001,d:.045,shape:-4,gain:.6},{wave:"metal",freq:2600,bp:3500,q:2,at:.05,a:.001,d:.045,shape:-4,gain:.6},{wave:"metal",freq:2600,bp:3500,q:2,at:.1,a:.001,d:.045,shape:-4,gain:.6},{wave:"metal",freq:2600,bp:3500,q:2,at:.15000000000000002,a:.001,d:.045,shape:-4,gain:.6},{wave:"metal",freq:2600,bp:3500,q:2,at:.2,a:.001,d:.045,shape:-4,gain:.6},{wave:"metal",freq:2600,bp:3500,q:2,at:.25,a:.001,d:.045,shape:-4,gain:.6},{wave:"metal",freq:2600,bp:3500,q:2,at:.30000000000000004,a:.001,d:.045,shape:-4,gain:.6},{wave:"metal",freq:2600,bp:3500,q:2,at:.35000000000000003,a:.001,d:.045,shape:-4,gain:.6},{wave:"metal",freq:2600,bp:3500,q:2,at:.4,a:.001,d:.045,shape:-4,gain:.6},{wave:"metal",freq:2600,bp:3500,q:2,at:.45,a:.001,d:.045,shape:-4,gain:.6},{wave:"sine",freq:3500,a:.002,h:.45,d:.1,gain:.15}],gain:.765},c1={vary:.05,verb:[.45,.2],layers:[{wave:"square",duty:.5,freq:523,arp:[0,0,0,4,7,7,12,12],arpRate:.1,a:.003,h:.75,d:.35,shape:2,lp:4e3},{wave:"triangle",freq:262,arp:[0,0,0,4,7,7,12,12],arpRate:.1,a:.003,h:.75,d:.35,gain:.6}],gain:.104},h1={vary:.05,verb:[.5,.25],layers:[{wave:"square",duty:.25,freq:392,arp:[0,4,7,12,16,19],arpRate:.07,a:.003,h:.6,d:.5,shape:2,lp:4500},{wave:"triangle",freq:196,arp:[0,0,7,7,12,12],arpRate:.07,a:.003,h:.6,d:.5,gain:.6},{wave:"sine",freq:1568,fm:[2,1,.3],at:.42,a:.003,d:.8,gain:.3}],gain:.129},d1={vary:.05,verb:[.5,.25],layers:[{wave:"triangle",freq:392,arp:[0,-1,-2,-3],arpRate:.28,a:.01,h:1,d:.5,shape:2,vib:[5,.25]},{wave:"square",duty:.5,freq:196,arp:[0,-1,-2,-3],arpRate:.28,a:.01,h:1,d:.5,lp:1200,gain:.35}],gain:.2},u1={vary:.05,layers:[{wave:"saw",freq:330,arp:[0,-1,-2],arpRate:.22,lp:600,lpTo:2500,q:3,a:.01,h:.5,d:.3,shape:2,vib:[6,.3]}],gain:.188},f1={vary:.05,verb:[.4,.2],layers:[{wave:"square",duty:.25,freq:784,arp:[0,-1,-9,-14,-13,-5,-1,4],arpRate:.075,a:.002,h:.55,d:.25,shape:2,lp:5e3},{wave:"sine",freq:1568,arp:[0,-1,-9,-14,-13,-5,-1,4],arpRate:.075,a:.002,h:.55,d:.2,gain:.25}],gain:.137},p1={vary:.05,verb:[.5,.25],layers:[{wave:"noise",bp:2500,q:1.5,a:.001,d:.006,shape:-6,gain:.3},{wave:"pluck",freq:523,at:0,a:.001,d:.6,shape:-3,damp:.998,blend:.48,lp:5e3,gain:.6},{wave:"pluck",freq:784,at:.08,a:.001,d:.6,shape:-3,damp:.998,blend:.48,lp:5e3,gain:.6},{wave:"pluck",freq:1047,at:.16,a:.001,d:.6,shape:-3,damp:.998,blend:.48,lp:5e3,gain:.6},{wave:"modal",freq:523,modes:[1,2,2.4,3,4],at:.24,a:.001,d:1,shape:-3,gain:.8},{wave:"noise",hp:7e3,lp:12e3,at:.24,a:.002,d:.4,shape:-4,gain:.06}],gain:.347},m1={vary:.05,verb:[.45,.22],layers:[{wave:"triangle",freq:659,arp:[0,5,9,12],arpRate:.06,a:.002,h:.3,d:.45,shape:2},{wave:"sine",freq:1319,arp:[0,5,9,12],arpRate:.06,fm:[2,.8,.2],a:.002,h:.3,d:.4,gain:.4}],gain:.188},v1={vary:.05,verb:[.4,.2],layers:[{wave:"sine",freq:784,fm:[4,1.5,.03],at:0,a:.001,d:.25,shape:3,gain:.8},{wave:"sine",freq:1047,fm:[4,1.5,.03],at:.07,a:.001,d:.25,shape:3,gain:.8},{wave:"sine",freq:1319,fm:[4,1.5,.03],at:.14,a:.001,d:.25,shape:3,gain:.8},{wave:"sine",freq:1568,fm:[3.5,1.2,.15],at:.21,a:.002,d:.9,shape:2.5},{wave:"triangle",freq:523,at:.21,a:.003,h:.1,d:.5,gain:.35}],gain:.244},g1={vary:.05,layers:[{wave:"square",duty:.5,freq:440,arp:[0,0,12],arpRate:.12,a:.003,h:.3,d:.2,shape:2,lp:3500},{wave:"sine",freq:110,arp:[0,0,12],arpRate:.12,a:.003,h:.3,d:.2,gain:.6}],gain:.151},_1={vary:.05,verb:[.35,.2],layers:[{wave:"square",duty:.25,freq:523,arp:[0,4,7,12,7,12,16,19,24],arpRate:.08,a:.002,h:.75,d:.4,shape:2,lp:5e3,gain:.6},{wave:"triangle",freq:262,arp:[0,0,7,7,5,5,7,7,12],arpRate:.08,a:.002,h:.75,d:.4,shape:2}],gain:.165},x1={vary:.05,verb:[.7,.3],layers:[{wave:"saw",freq:73.4,lp:1200,lpTo:400,at:0,a:.01,h:.15,d:.3,shape:-3,drive:1.5},{wave:"saw",freq:110,lp:1500,lpTo:500,at:0,a:.01,h:.15,d:.3,shape:-3,gain:.6},{wave:"brown",lp:200,at:0,a:.001,d:.4,shape:-4,gain:.6},{wave:"saw",freq:69.3,lp:1200,lpTo:400,at:.35,a:.01,h:.15,d:.3,shape:-3,drive:1.5},{wave:"saw",freq:103.8,lp:1500,lpTo:500,at:.35,a:.01,h:.15,d:.3,shape:-3,gain:.6},{wave:"brown",lp:200,at:.35,a:.001,d:.4,shape:-4,gain:.6},{wave:"saw",freq:65.4,lp:1200,lpTo:400,at:.7,a:.01,h:.4,d:.3,shape:-3,drive:1.5},{wave:"saw",freq:98,lp:1500,lpTo:500,at:.7,a:.01,h:.4,d:.3,shape:-3,gain:.6},{wave:"brown",lp:200,at:.7,a:.001,d:.4,shape:-4,gain:.6}],gain:.146},y1={vary:1.5,varyF:2,varyG:1.5,verb:[.4,.2],layers:[{wave:"noise",bp:2500,q:2,a:.001,d:.008,shape:-6,gain:.3},{wave:"modal",freq:1700,modes:[1,2.76,5.4],a:.001,d:.06,shape:-5,gain:.15},{wave:"saw",freq:26,to:40,vib:[2.3,4],formant:[620,1150,2300],at:.05,a:.12,h:.35,d:.3,shape:-3},{wave:"saw",freq:33,to:24,vib:[3.7,5],formant:[450,900,1750],at:.12,a:.1,h:.25,d:.3,shape:-3,gain:.6}],limit:1,gain:1.82},w1={varyF:2,varyG:1,verb:[.35,.18],layers:[{wave:"noise",bp:1500,q:1.5,a:.001,d:.012,shape:-5,gain:.35},{wave:"pink",lp:700,lpTo:200,a:.001,d:.14,shape:-4,drive:2,gain:1.2},{wave:"noise",bp:220,q:4,a:.001,d:.15,shape:-4,drive:1,gain:1.2},{wave:"noise",bp:480,q:3,a:.001,d:.08,shape:-4,drive:1,gain:.9},{wave:"modal",freq:160,modes:[1,2.32,4.25],a:.001,d:.2,shape:-5,gain:.5},{wave:"modal",freq:1500,modes:[1,2.76,5.4],at:.04,a:.001,d:.05,shape:-5,gain:.25}],limit:1,gain:.842},M1={varyF:2,varyG:1,verb:[.7,.3],layers:[{wave:"saw",freq:22,to:34,vib:[2.1,4],formant:[300,700,1400],a:.1,h:.3,d:.15,shape:-3,gain:.8},{wave:"noise",bp:1200,at:.55,a:.001,d:.015,shape:-5,gain:.5},{wave:"noise",bp:160,q:5,at:.55,a:.001,d:.4,shape:-5,gain:1.3},{wave:"noise",bp:340,q:4,at:.55,a:.001,d:.25,shape:-5,gain:.8},{wave:"modal",freq:95,modes:[1,2.32,4.25,6.63],at:.55,a:.001,d:.5,shape:-4,gain:.6},{wave:"sine",freq:60,to:35,at:.55,a:.001,d:.5,shape:-5,gain:.4},{wave:"brown",lp:300,at:.56,a:.002,d:.6,shape:-4,gain:.4},{wave:"modal",freq:1300,modes:[1,2.76,5.4],at:.6,a:.001,d:.08,shape:-5,gain:.15}],limit:1,gain:1.07},S1={layers:[{wave:"metal",freq:1300,bp:3500,q:2,a:.001,d:.03,shape:3},{wave:"metal",freq:900,bp:2500,q:2,at:.09,a:.001,d:.06,shape:3},{wave:"noise",bp:1500,q:1.5,at:.09,a:.001,d:.03,gain:.5},{wave:"sine",freq:220,to:140,at:.09,a:.001,d:.05,shape:2.5,drive:1,gain:.5}],limit:1,gain:1.29},b1={layers:[{wave:"metal",freq:700,bp:2200,q:2,at:0,a:.001,d:.05,shape:3,gain:1},{wave:"pink",lp:600,at:0,a:.001,d:.04,shape:3,drive:1,gain:.4},{wave:"metal",freq:760,bp:2200,q:2,at:.06,a:.001,d:.05,shape:3,gain:.85},{wave:"pink",lp:600,at:.06,a:.001,d:.04,shape:3,drive:1,gain:.33},{wave:"metal",freq:820,bp:2200,q:2,at:.12,a:.001,d:.05,shape:3,gain:.7},{wave:"pink",lp:600,at:.12,a:.001,d:.04,shape:3,drive:1,gain:.26},{wave:"metal",freq:880,bp:2200,q:2,at:.2,a:.001,d:.05,shape:3,gain:.55},{wave:"pink",lp:600,at:.2,a:.001,d:.04,shape:3,drive:1,gain:.19}],limit:1,gain:1.98},E1={vary:1,varyF:2,varyG:1.5,verb:[.35,.18],layers:[{wave:"saw",freq:30,to:48,vib:[3.1,4],formant:[520,1300,2600],a:.05,h:.25,d:.15,shape:-3},{wave:"saw",freq:41,to:33,vib:[4.6,3],formant:[380,980],at:.08,a:.05,h:.15,d:.15,shape:-3,gain:.5},{wave:"noise",bp:900,q:2,at:.42,a:.001,d:.05,shape:-5,gain:.6},{wave:"modal",freq:200,modes:[1,2.32,4.25],at:.42,a:.001,d:.12,shape:-5,gain:.5},{wave:"sine",freq:2093,fm:[3.01,1.5,.2],at:.45,a:.002,d:.6,shape:-4,gain:.35}],gain:.887},T1={verb:[.3,.15],layers:[{wave:"noise",bp:700,q:1.5,a:.02,d:.08,gain:.5},{wave:"metal",freq:380,bp:1400,q:2,at:.09,a:.001,d:.15,shape:3},{wave:"sine",freq:120,to:70,at:.09,a:.001,d:.12,gain:.8}],limit:1,gain:1.13},A1={varyF:1.5,varyG:1,layers:[{wave:"noise",bp:2e3,q:2,a:.001,d:.008,shape:-5,gain:.4},{wave:"modal",freq:240,modes:[1,2.32,4.25],a:.001,d:.12,shape:-4,drive:1,gain:1.2},{wave:"pink",lp:1200,lpTo:300,a:.001,d:.07,shape:-5,drive:1.5},{wave:"noise",bp:2600,q:3,at:.06,a:.001,d:.006,shape:-6,gain:.4},{wave:"modal",freq:900,modes:[1,2.32],at:.06,a:.001,d:.03,shape:-5,gain:.3}],limit:1,gain:.688},R1={varyF:1.5,varyG:2,layers:[{wave:"noise",bp:3200,q:3,at:0,a:.001,d:.02,shape:-5,drive:1},{wave:"noise",bp:900,q:2,at:0,a:.001,d:.015,shape:-5,gain:.5},{wave:"modal",freq:2600,modes:[1,2.76,5.4],at:0,a:.001,d:.03,shape:-5,gain:.3},{wave:"noise",bp:2400,q:3,at:.045,a:.001,d:.02,shape:-5,drive:1},{wave:"noise",bp:900,q:2,at:.045,a:.001,d:.015,shape:-5,gain:.5},{wave:"modal",freq:2600,modes:[1,2.76,5.4],at:.045,a:.001,d:.03,shape:-5,gain:.3},{wave:"noise",bp:3200,q:3,at:.09,a:.001,d:.02,shape:-5,drive:1},{wave:"noise",bp:900,q:2,at:.09,a:.001,d:.015,shape:-5,gain:.5},{wave:"modal",freq:2600,modes:[1,2.76,5.4],at:.09,a:.001,d:.03,shape:-5,gain:.3},{wave:"noise",bp:2400,q:3,at:.135,a:.001,d:.02,shape:-5,drive:1},{wave:"noise",bp:900,q:2,at:.135,a:.001,d:.015,shape:-5,gain:.5},{wave:"modal",freq:2600,modes:[1,2.76,5.4],at:.135,a:.001,d:.03,shape:-5,gain:.3},{wave:"noise",bp:3200,q:3,at:.18,a:.001,d:.02,shape:-5,drive:1},{wave:"noise",bp:900,q:2,at:.18,a:.001,d:.015,shape:-5,gain:.5},{wave:"modal",freq:2600,modes:[1,2.76,5.4],at:.18,a:.001,d:.03,shape:-5,gain:.3},{wave:"noise",bp:2400,q:3,at:.225,a:.001,d:.02,shape:-5,drive:1},{wave:"noise",bp:900,q:2,at:.225,a:.001,d:.015,shape:-5,gain:.5},{wave:"modal",freq:2600,modes:[1,2.76,5.4],at:.225,a:.001,d:.03,shape:-5,gain:.3},{wave:"noise",bp:3200,q:3,at:.27,a:.001,d:.02,shape:-5,drive:1},{wave:"noise",bp:900,q:2,at:.27,a:.001,d:.015,shape:-5,gain:.5},{wave:"modal",freq:2600,modes:[1,2.76,5.4],at:.27,a:.001,d:.03,shape:-5,gain:.3}],gain:.882},C1={vary:.6,varyF:2,varyG:1,layers:[{wave:"saw",freq:30,to:110,curve:.6,lp:600,a:.2,h:.6,d:.3,shape:2},{wave:"square",duty:.2,freq:60,to:220,curve:.6,bp:900,q:3,kt:.5,a:.25,h:.55,d:.3,shape:2,gain:1},{wave:"sine",freq:240,to:880,curve:.6,a:.3,h:.5,d:.3,gain:.2},{wave:"crunch",freq:400,to:1500,curve:.6,hp:1500,lp:5e3,a:.3,h:.5,d:.3,gain:.08}],gain:.339},P1={loop:!0,vary:0,varyF:1.5,varyG:.8,layers:[{wave:"square",freq:31,duty:.3,lp:240,drive:1.5,vib:[2,.25],a:.02,h:3.48,d:0},{wave:"saw",freq:62,lp:420,vib:[2,.25],a:.02,h:3.48,d:0,gain:.45},{wave:"crunch",freq:124,lp:1400,hp:300,a:.02,h:3.48,d:0,gain:.12},{wave:"brown",lp:160,a:.02,h:3.48,d:0,gain:.5}],gain:.347},D1={loop:!0,vary:0,varyF:1.5,varyG:.8,layers:[{wave:"sine",freq:60,drive:.6,a:.02,h:3.48,d:0},{wave:"saw",freq:120,lp:900,vib:[1,.04],a:.02,h:3.48,d:0,gain:.3},{wave:"triangle",freq:180,vib:[3,.03],a:.02,h:3.48,d:0,gain:.25},{wave:"noise",bp:3200,q:3,a:.02,h:3.48,d:0,gain:.05}],gain:.234},L1={varyF:3,varyG:1.5,layers:[{wave:"pink",bp:450,bpTo:1800,q:1.6,a:.13,d:.02,shape:1},{wave:"pink",bp:1800,bpTo:500,q:1.6,at:.13,a:.01,d:.3,shape:-4},{wave:"noise",bp:3e3,bpTo:6e3,a:.12,d:.12,gain:.2},{wave:"brown",lp:300,a:.12,d:.15,gain:.3}],limit:1,gain:1.84},U1={vary:1,varyF:3,varyG:1.5,layers:[{wave:"noise",bp:900,bpTo:3500,q:2.5,a:.06,d:.1,shape:2},{wave:"noise",bp:3e3,bpTo:900,q:2,at:.08,a:.02,d:.22,shape:-4,gain:.45}],limit:1,gain:2.76},I1={layers:[{wave:"noise",bp:1200,bpTo:5e3,q:1.2,a:.01,d:.18,shape:2},{wave:"sine",freq:200,to:600,a:.005,d:.1,gain:.3}],limit:1,gain:1.79},N1={verb:[.25,.12],layers:[{wave:"noise",lp:4e3,lpTo:800,a:.003,d:.4,shape:2.5},{wave:"sine",freq:220,to:70,a:.002,d:.1,gain:.6},{wave:"sine",freq:600,to:1400,curve:3,at:.12,a:.002,d:.05,gain:.3},{wave:"sine",freq:800,to:1800,curve:3,at:.2,a:.002,d:.04,gain:.2}],limit:1,gain:.917},F1={verb:[.4,.2],vary:1,layers:[{wave:"sine",freq:900,to:2100,curve:4,sweep:.06,a:.001,d:.1,shape:3}],gain:.836},O1={vary:1,layers:[{wave:"sine",freq:400,to:900,curve:3,at:0,a:.002,d:.05,shape:3,gain:1},{wave:"sine",freq:520,to:1200,curve:3,at:.07,a:.002,d:.05,shape:3,gain:.88},{wave:"sine",freq:460,to:1e3,curve:3,at:.11,a:.002,d:.05,shape:3,gain:.76},{wave:"sine",freq:600,to:1400,curve:3,at:.19,a:.002,d:.05,shape:3,gain:.64},{wave:"sine",freq:700,to:1600,curve:3,at:.24,a:.002,d:.05,shape:3,gain:.52}],gain:.864},q1={layers:[{wave:"pink",bp:350,bpTo:1100,q:2.5,a:.5,d:.25,shape:1.5},{wave:"pink",bp:1100,bpTo:450,q:2.5,at:.55,a:.05,d:.9,shape:2},{wave:"noise",bp:2500,bpTo:4e3,q:4,a:.45,d:.6,shape:2,gain:.12},{wave:"brown",lp:250,a:.4,h:.3,d:.7,gain:.3}],gain:1.44},B1={vary:.8,varyF:2,varyG:3,verb:[.35,.2],layers:[{wave:"noise",hp:2500,lp:11e3,a:.001,d:.03,shape:-6},{wave:"noise",bp:1800,q:.8,a:.001,d:.03,shape:-6,drive:1,gain:.6},{wave:"noise",bp:600,q:1.5,a:.001,d:.04,shape:-5,gain:.3},{wave:"modal",freq:2900,modes:[1,1.59,2.14,2.65],at:.01,a:.001,d:.15,shape:-5,gain:.5},{wave:"modal",freq:3700,modes:[1,1.59,2.14,2.65],at:.04,a:.001,d:.12,shape:-5,gain:.46},{wave:"modal",freq:4400,modes:[1,1.59,2.14,2.65],at:.07,a:.001,d:.1,shape:-5,gain:.42},{wave:"modal",freq:3300,modes:[1,1.59,2.14,2.65],at:.11,a:.001,d:.13,shape:-5,gain:.38},{wave:"modal",freq:5200,modes:[1,1.59,2.14,2.65],at:.16,a:.001,d:.09,shape:-5,gain:.33999999999999997},{wave:"modal",freq:4100,modes:[1,1.59,2.14,2.65],at:.22,a:.001,d:.11,shape:-5,gain:.3},{wave:"modal",freq:6100,modes:[1,1.59,2.14,2.65],at:.3,a:.001,d:.08,shape:-5,gain:.26},{wave:"noise",hp:4e3,lp:11e3,a:.002,d:.35,shape:-4,gain:.25}],gain:.689},z1={vary:.8,varyF:2,varyG:1,layers:[{wave:"noise",bp:1200,q:1,a:.001,d:.008,shape:-6,gain:.3},{wave:"pink",lp:900,lpTo:250,a:.001,d:.18,shape:-3,drive:3},{wave:"modal",freq:140,modes:[1,2.32,4.25,6.63],a:.001,d:.25,shape:-4,drive:1,gain:.9},{wave:"noise",bp:380,q:3,a:.001,d:.1,shape:-4,drive:1,gain:.9},{wave:"sine",freq:90,to:50,a:.001,d:.18,shape:-4,drive:1,gain:.5},{wave:"pink",lp:1100,lpTo:300,at:.09,a:.001,d:.06,shape:-5,drive:2,gain:.45},{wave:"modal",freq:150,modes:[1,2.32,4.25,6.63],at:.09,a:.001,d:.12,shape:-5,gain:.4}],limit:1,gain:.518},k1={vary:1,varyF:3,varyG:1.5,layers:[{wave:"noise",bp:500,bpTo:1400,q:1.5,a:.06,d:.03,shape:1,drive:1},{wave:"noise",bp:1400,bpTo:500,q:1.5,at:.06,a:.01,d:.25,shape:-4,drive:1}],limit:1,gain:1.23},G1={layers:[{wave:"brown",lp:800,a:.1,h:.6,d:.3,gain:.5},{wave:"noise",bp:2500,q:2,at:.05,a:.001,d:.012,shape:2,gain:.8},{wave:"noise",bp:2800,q:2,at:.13,a:.001,d:.012,shape:2,gain:.8},{wave:"noise",bp:3100,q:2,at:.17,a:.001,d:.012,shape:2,gain:.8},{wave:"noise",bp:3400,q:2,at:.3,a:.001,d:.012,shape:2,gain:.8},{wave:"noise",bp:3700,q:2,at:.42,a:.001,d:.012,shape:2,gain:.8},{wave:"noise",bp:4e3,q:2,at:.48,a:.001,d:.012,shape:2,gain:.8},{wave:"noise",bp:4300,q:2,at:.61,a:.001,d:.012,shape:2,gain:.8},{wave:"noise",bp:4600,q:2,at:.74,a:.001,d:.012,shape:2,gain:.8},{wave:"noise",bp:4900,q:2,at:.8,a:.001,d:.012,shape:2,gain:.8}],limit:1,gain:1.76},H1={varyF:2,varyG:1.5,verb:[.25,.12],layers:[{wave:"noise",bp:1800,q:1,a:.001,d:.02,shape:-5,drive:2},{wave:"modal",freq:240,modes:[1,2.32,4.25,6.63],at:0,a:.001,d:.12,shape:-5,gain:1},{wave:"modal",freq:295,modes:[1,2.32,4.25,6.63],at:.03,a:.001,d:.12,shape:-5,gain:.85},{wave:"modal",freq:350,modes:[1,2.32,4.25,6.63],at:.07,a:.001,d:.12,shape:-5,gain:.7},{wave:"modal",freq:405,modes:[1,2.32,4.25,6.63],at:.12,a:.001,d:.12,shape:-5,gain:.55},{wave:"modal",freq:460,modes:[1,2.32,4.25,6.63],at:.18,a:.001,d:.12,shape:-5,gain:.4},{wave:"sine",freq:110,to:50,a:.001,d:.15,shape:-5,gain:.6},{wave:"pink",lp:1500,a:.001,d:.25,shape:-4,gain:.4}],limit:1,gain:.555},V1={varyF:2,varyG:1.5,verb:[.25,.12],layers:[{wave:"noise",bp:2500,q:.8,a:.001,d:.06,shape:-4,drive:1.5},{wave:"modal",freq:650,modes:[1,2.1,3.4,5.2],a:.001,d:.1,shape:-5},{wave:"modal",freq:1200,modes:[1,2.1,3.4],at:.04,a:.001,d:.06,shape:-5,gain:.5},{wave:"modal",freq:1430,modes:[1,2.1,3.4],at:.08,a:.001,d:.06,shape:-5,gain:.5},{wave:"modal",freq:1660,modes:[1,2.1,3.4],at:.13,a:.001,d:.06,shape:-5,gain:.5},{wave:"modal",freq:1890,modes:[1,2.1,3.4],at:.19,a:.001,d:.06,shape:-5,gain:.5}],limit:1,gain:.574},W1={vary:.8,varyF:1.5,varyG:1,verb:[.35,.18],layers:[{wave:"noise",bp:3e3,q:1,a:.001,d:.015,shape:-5,gain:.6},{wave:"modal",freq:620,modes:[1,2.756,5.404,8.933],a:.001,d:.7,shape:-3},{wave:"metal",freq:500,bp:2e3,q:1.5,a:.001,d:.3,shape:-4,gain:.4},{wave:"modal",freq:640,modes:[1,2.756,5.404],at:.15,a:.001,d:.4,shape:-4,gain:.35}],limit:1,gain:.487},X1={varyF:2,varyG:1.5,verb:[.4,.18],layers:[{wave:"brown",lp:700,lpTo:200,a:.01,h:.2,d:.6,shape:-3,drive:1},{wave:"modal",freq:300,modes:[1,2.6,4.9],at:0,a:.002,d:.06,shape:-6,gain:.8},{wave:"modal",freq:473,modes:[1,2.6,4.9],at:.072,a:.002,d:.06,shape:-6,gain:.75},{wave:"modal",freq:646,modes:[1,2.6,4.9],at:.144,a:.002,d:.06,shape:-6,gain:.7000000000000001},{wave:"modal",freq:319,modes:[1,2.6,4.9],at:.18,a:.002,d:.06,shape:-6,gain:.65},{wave:"modal",freq:492,modes:[1,2.6,4.9],at:.252,a:.002,d:.06,shape:-6,gain:.6000000000000001},{wave:"modal",freq:665,modes:[1,2.6,4.9],at:.324,a:.002,d:.06,shape:-6,gain:.55},{wave:"modal",freq:338,modes:[1,2.6,4.9],at:.36,a:.002,d:.06,shape:-6,gain:.5},{wave:"modal",freq:511,modes:[1,2.6,4.9],at:.432,a:.002,d:.06,shape:-6,gain:.45},{wave:"modal",freq:684,modes:[1,2.6,4.9],at:.504,a:.002,d:.06,shape:-6,gain:.4},{wave:"modal",freq:357,modes:[1,2.6,4.9],at:.54,a:.002,d:.06,shape:-6,gain:.35000000000000003}],gain:.585},Y1={vary:.5,varyF:2,layers:[{wave:"pink",bp:400,bpTo:1500,q:1,a:.04,d:.4,shape:-3,drive:1},{wave:"brown",lp:400,a:.03,h:.15,d:.5,shape:-3,gain:.8},{wave:"sine",freq:90,to:50,a:.02,d:.2,shape:-4,gain:.5},{wave:"noise",bp:2500,q:3,at:.08,a:.001,d:.008,shape:-5,gain:.45},{wave:"noise",bp:3400,q:3,at:.15,a:.001,d:.008,shape:-5,gain:.42000000000000004},{wave:"noise",bp:4300,q:3,at:.21,a:.001,d:.008,shape:-5,gain:.39},{wave:"noise",bp:2500,q:3,at:.3,a:.001,d:.008,shape:-5,gain:.36},{wave:"noise",bp:3400,q:3,at:.36,a:.001,d:.008,shape:-5,gain:.33},{wave:"noise",bp:4300,q:3,at:.45,a:.001,d:.008,shape:-5,gain:.30000000000000004},{wave:"noise",bp:2500,q:3,at:.52,a:.001,d:.008,shape:-5,gain:.27},{wave:"noise",bp:3400,q:3,at:.6,a:.001,d:.008,shape:-5,gain:.24000000000000002}],limit:1,gain:.833},Z1={vary:1,varyF:3,varyG:1.5,layers:[{wave:"pink",bp:900,q:1.5,at:0,a:.006,d:.04,shape:-4,gain:1},{wave:"pink",bp:960,q:1.5,at:.05,a:.006,d:.04,shape:-4,gain:.85},{wave:"pink",bp:1020,q:1.5,at:.1,a:.006,d:.04,shape:-4,gain:.7},{wave:"pink",bp:1080,q:1.5,at:.15,a:.006,d:.04,shape:-4,gain:.55},{wave:"pink",bp:1140,q:1.5,at:.2,a:.006,d:.04,shape:-4,gain:.4}],limit:1,gain:3.87},J1={varyF:2,layers:[{wave:"sine",freq:180,to:90,vib:[11,3],a:.004,d:.28,shape:-3},{wave:"noise",lp:1100,lpTo:250,q:4,a:.003,d:.2,shape:-4,drive:1,gain:.5}],gain:.616},K1={vary:1.5,layers:[{wave:"sine",freq:2600,to:3800,fm:[2,.5,.03],a:.002,d:.05,shape:-3},{wave:"sine",freq:2900,to:4200,fm:[2,.5,.03],at:.08,a:.002,d:.06,shape:-3,gain:.8}],gain:.632},$1={vary:1,varyF:2,layers:[{wave:"saw",freq:95,to:80,vib:[7,.8],formant:[570,840,2410],a:.06,h:.25,d:.3,shape:-3,drive:1.5},{wave:"brown",lp:400,a:.08,h:.2,d:.3,gain:.4}],gain:.64},j1={vary:.25,verb:[.75,.35],layers:[{wave:"sine",freq:290,to:250,vib:[5,.7],formant:[300,870,2240],a:.4,h:.4,d:.8,shape:-3},{wave:"triangle",freq:290,to:250,vib:[5,.7],formant:[300,870,2240],a:.4,h:.4,d:.8,shape:-3,gain:.6}],gain:.15},Q1={vary:.8,layers:[{wave:"saw",freq:210,to:240,vib:[6,.5],bp:900,bpTo:1300,q:2,a:.15,h:.4,d:.3,shape:-3},{wave:"saw",freq:212,to:243,vib:[6.6,.5],bp:2400,q:3,a:.15,h:.4,d:.3,shape:-3,gain:.4}],gain:.761},e_={vary:1.5,layers:[{wave:"saw",freq:420,to:250,curve:2,formant:[730,1090,2440],kt:1,a:.005,h:.04,d:.2,shape:-3,drive:1},{wave:"noise",bp:2e3,a:.001,d:.02,shape:-5,gain:.4}],gain:1.07},t_={vary:1,verb:[.4,.2],layers:[{wave:"saw",freq:330,to:80,curve:.8,vib:[9,.6],formant:[730,1090,2440],kt:1,a:.01,h:.1,d:.6,shape:-2.5,drive:.8}],gain:.57},n_={vary:2,layers:[{wave:"square",duty:.3,freq:280,arp:[0,4,-2,7,2,5],arpRate:.07,formant:[270,2290,3010],a:.005,h:.36,d:.06,shape:-3}],gain:.384},i_={vary:1.2,varyF:2,verb:[.35,.15],layers:[{wave:"saw",freq:110,to:85,vib:[5,1.2],formant:[570,840,2410],kt:1,a:.1,h:.4,d:.4,shape:-3,drive:2},{wave:"saw",freq:111,to:84,vib:[4,1],formant:[730,1090,2440],kt:1,a:.15,h:.3,d:.4,shape:-3,gain:.5},{wave:"noise",formant:[730,1090,2440],a:.1,h:.4,d:.3,shape:-3,gain:.2}],gain:.444},a_={vary:.8,varyF:2,verb:[.6,.25],layers:[{wave:"saw",freq:90,to:70,vib:[9,1.5],formant:[730,1090,2440],kt:1,a:.08,h:.6,d:.5,shape:-3,drive:3},{wave:"saw",freq:45,to:36,vib:[7,1],lp:400,a:.08,h:.6,d:.5,shape:-3,drive:2},{wave:"noise",bp:1200,q:.8,a:.05,h:.6,d:.4,shape:-3,drive:1.5,gain:.35}],gain:.185},r_={vary:1.5,varyF:2,verb:[.25,.1],layers:[{wave:"saw",freq:520,to:320,curve:2,formant:[730,1090,2440],kt:1,at:0,a:.004,d:.12,shape:-4,drive:2},{wave:"noise",bp:1500,q:1,at:0,a:.002,d:.06,shape:-4,gain:.3},{wave:"saw",freq:520,to:320,curve:2,formant:[730,1090,2440],kt:1,at:.22,a:.004,d:.12,shape:-4,drive:2},{wave:"noise",bp:1500,q:1,at:.22,a:.002,d:.06,shape:-4,gain:.3}],gain:.822},s_={vary:1.5,layers:[{wave:"saw",freq:600,to:900,sweep:.2,curve:.8,vib:[5,.3],formant:[270,2290,3010],kt:1,a:.04,h:.1,d:.3,shape:-3},{wave:"saw",freq:900,to:550,at:.25,sweep:.3,formant:[300,870,2240],kt:1,a:.04,d:.3,shape:-3,gain:.7}],gain:.867},o_={loop:!0,vary:.6,varyF:2,layers:[{wave:"pink",hp:500,lp:7e3,a:.02,h:3.48,d:0,gain:.7},{wave:"noise",bp:4200,q:.7,a:.02,h:3.48,d:0,gain:.22},{wave:"brown",lp:350,a:.02,h:3.48,d:0,gain:.35},{wave:"noise",bp:2600,q:1.5,at:.07,a:.001,d:.012,shape:-5,gain:.55},{wave:"noise",bp:3200,q:1.5,at:.31,a:.001,d:.012,shape:-5,gain:.7000000000000001},{wave:"noise",bp:3800,q:1.5,at:.46,a:.001,d:.012,shape:-5,gain:.8500000000000001},{wave:"noise",bp:4400,q:1.5,at:.62,a:.001,d:.012,shape:-5,gain:.55},{wave:"noise",bp:2600,q:1.5,at:.9,a:.001,d:.012,shape:-5,gain:.7000000000000001},{wave:"noise",bp:3200,q:1.5,at:1.13,a:.001,d:.012,shape:-5,gain:.8500000000000001},{wave:"noise",bp:3800,q:1.5,at:1.27,a:.001,d:.012,shape:-5,gain:.55},{wave:"noise",bp:4400,q:1.5,at:1.55,a:.001,d:.012,shape:-5,gain:.7000000000000001},{wave:"noise",bp:2600,q:1.5,at:1.71,a:.001,d:.012,shape:-5,gain:.8500000000000001},{wave:"noise",bp:3200,q:1.5,at:1.98,a:.001,d:.012,shape:-5,gain:.55},{wave:"noise",bp:3800,q:1.5,at:2.2,a:.001,d:.012,shape:-5,gain:.7000000000000001},{wave:"noise",bp:4400,q:1.5,at:2.36,a:.001,d:.012,shape:-5,gain:.8500000000000001},{wave:"noise",bp:2600,q:1.5,at:2.61,a:.001,d:.012,shape:-5,gain:.55},{wave:"noise",bp:3200,q:1.5,at:2.83,a:.001,d:.012,shape:-5,gain:.7000000000000001},{wave:"noise",bp:3800,q:1.5,at:3.05,a:.001,d:.012,shape:-5,gain:.8500000000000001}],gain:.53},l_={loop:!0,vary:.5,varyF:2,layers:[{wave:"pink",bp:520,q:1.2,a:.02,h:3.48,d:0,gain:.8},{wave:"brown",lp:220,a:.02,h:3.48,d:0,gain:.45},{wave:"pink",bp:600,bpTo:1400,q:2.5,at:.15,a:.9,d:1,shape:1.5,gain:.7},{wave:"pink",bp:1300,bpTo:650,q:2.5,at:1.6,a:.7,d:1.1,shape:1.5,gain:.6},{wave:"noise",bp:2300,bpTo:2900,q:7,at:.5,a:1,d:1.2,shape:2,gain:.1}],gain:.913},c_={vary:.5,varyF:3,varyG:1.5,verb:[.7,.4],layers:[{wave:"brown",lp:320,lpTo:90,a:.25,h:.25,d:1.5,shape:-3,gain:1.6,drive:.8},{wave:"brown",lp:900,lpTo:300,at:.1,a:.01,d:.35,shape:-4,gain:.7},{wave:"brown",lp:900,lpTo:300,at:.22,a:.01,d:.35,shape:-4,gain:.5499999999999999},{wave:"brown",lp:900,lpTo:300,at:.4,a:.01,d:.35,shape:-4,gain:.39999999999999997}],gain:.332},h_={vary:2,varyF:2,layers:[{wave:"noise",hp:3e3,a:.001,d:.008,shape:-5,gain:.6},{wave:"sine",freq:1400,to:2600,curve:4,sweep:.03,at:.002,a:.001,d:.05,shape:-4}],gain:.778},d_={vary:1.5,verb:[.3,.15],layers:[{wave:"sine",freq:3200,to:4400,fm:[2,.4,.02],vib:[40,.6],at:0,a:.003,d:.06,shape:-3,gain:1},{wave:"sine",freq:3500,to:4700,fm:[2,.4,.02],vib:[40,.6],at:.09,a:.003,d:.06,shape:-3,gain:.9},{wave:"sine",freq:3e3,to:3900,fm:[2,.4,.02],vib:[40,.6],at:.17,a:.003,d:.06,shape:-3,gain:.8}],gain:.43},u_={vary:1,layers:[{wave:"saw",freq:120,formant:[400,1200],at:0,a:.004,d:.04,shape:-3,drive:1,gain:1},{wave:"saw",freq:120,formant:[400,1200],at:.045,a:.004,d:.04,shape:-3,drive:1,gain:.88},{wave:"saw",freq:120,formant:[400,1200],at:.09,a:.004,d:.04,shape:-3,drive:1,gain:.76},{wave:"saw",freq:120,formant:[400,1200],at:.135,a:.004,d:.04,shape:-3,drive:1,gain:.64}],limit:1,gain:2.81},f_={varyF:3,varyG:1.5,layers:[{wave:"pink",bp:3e3,q:.8,a:.05,h:.1,d:.25,shape:-3,gain:.6},{wave:"noise",bp:3500,q:2,at:.02,a:.001,d:.015,shape:-5,gain:.5},{wave:"noise",bp:4200,q:2,at:.06,a:.001,d:.015,shape:-5,gain:.5},{wave:"noise",bp:4900,q:2,at:.09,a:.001,d:.015,shape:-5,gain:.5},{wave:"noise",bp:3500,q:2,at:.15,a:.001,d:.015,shape:-5,gain:.5},{wave:"noise",bp:4200,q:2,at:.19,a:.001,d:.015,shape:-5,gain:.5},{wave:"noise",bp:4900,q:2,at:.26,a:.001,d:.015,shape:-5,gain:.5},{wave:"noise",bp:3500,q:2,at:.31,a:.001,d:.015,shape:-5,gain:.5}],gain:1.43},p_={vary:1.5,varyF:2,varyG:1.5,layers:[{wave:"noise",bp:2500,a:.001,d:.006,shape:-5,gain:.4},{wave:"pink",bp:700,q:1.5,a:.001,d:.03,shape:-6,gain:.5},{wave:"modal",freq:1100,modes:[1,2.6,4.9,7.3],a:.001,d:.15,shape:-4,drive:1},{wave:"noise",bp:2800,at:.16,a:.001,d:.005,shape:-5,gain:.4},{wave:"pink",bp:750,q:1.5,at:.16,a:.001,d:.02,shape:-6,gain:.3},{wave:"modal",freq:1150,modes:[1,2.6,4.9,7.3],at:.16,a:.001,d:.08,shape:-5,gain:.5}],gain:.655},m_={vary:.5,varyF:2,verb:[.7,.3],layers:[{wave:"noise",hp:1500,a:.001,d:.12,shape:-4,drive:2},{wave:"brown",lp:1200,lpTo:150,a:.005,h:.2,d:1.6,shape:-3,drive:1.5,gain:1.2},{wave:"sine",freq:60,to:30,a:.01,d:1,shape:-3,drive:1},{wave:"brown",lp:400,at:.3,a:.02,d:.4,shape:-3,gain:.5},{wave:"brown",lp:400,at:.55,a:.02,d:.4,shape:-3,gain:.38},{wave:"brown",lp:400,at:.8,a:.02,d:.4,shape:-3,gain:.26}],gain:.207},v_={vary:.3,varyF:2,layers:[{wave:"pink",lp:600,lpTo:3e3,a:.7,d:.2,shape:1.5},{wave:"noise",bp:3e3,q:.7,at:.65,a:.05,d:1.2,shape:-3,gain:.5},{wave:"brown",lp:300,a:.6,h:.3,d:.9,gain:.5}],gain:.56},g_={vary:.2,varyF:2,layers:[{wave:"pink",bp:2500,q:.6,a:.2,h:.8,d:.4,gain:.6},{wave:"noise",bp:2e3,q:3,at:.05,a:.001,d:.012,shape:-5,gain:.3},{wave:"noise",bp:2397,q:3,at:.113,a:.001,d:.012,shape:-5,gain:.4},{wave:"noise",bp:2794,q:3,at:.17600000000000002,a:.001,d:.012,shape:-5,gain:.5},{wave:"noise",bp:3191,q:3,at:.2,a:.001,d:.012,shape:-5,gain:.6000000000000001},{wave:"noise",bp:3588,q:3,at:.263,a:.001,d:.012,shape:-5,gain:.3},{wave:"noise",bp:3985,q:3,at:.326,a:.001,d:.012,shape:-5,gain:.4},{wave:"noise",bp:4382,q:3,at:.35000000000000003,a:.001,d:.012,shape:-5,gain:.5},{wave:"noise",bp:4779,q:3,at:.41300000000000003,a:.001,d:.012,shape:-5,gain:.6000000000000001},{wave:"noise",bp:2176,q:3,at:.47600000000000003,a:.001,d:.012,shape:-5,gain:.3},{wave:"noise",bp:2573,q:3,at:.5,a:.001,d:.012,shape:-5,gain:.4},{wave:"noise",bp:2970,q:3,at:.5630000000000001,a:.001,d:.012,shape:-5,gain:.5},{wave:"noise",bp:3367,q:3,at:.6260000000000001,a:.001,d:.012,shape:-5,gain:.6000000000000001},{wave:"noise",bp:3764,q:3,at:.6500000000000001,a:.001,d:.012,shape:-5,gain:.3},{wave:"noise",bp:4161,q:3,at:.7130000000000001,a:.001,d:.012,shape:-5,gain:.4},{wave:"noise",bp:4558,q:3,at:.7760000000000001,a:.001,d:.012,shape:-5,gain:.5},{wave:"noise",bp:4955,q:3,at:.8,a:.001,d:.012,shape:-5,gain:.6000000000000001},{wave:"noise",bp:2352,q:3,at:.8630000000000001,a:.001,d:.012,shape:-5,gain:.3},{wave:"noise",bp:2749,q:3,at:.9260000000000002,a:.001,d:.012,shape:-5,gain:.4},{wave:"noise",bp:3146,q:3,at:.9500000000000001,a:.001,d:.012,shape:-5,gain:.5},{wave:"noise",bp:3543,q:3,at:1.013,a:.001,d:.012,shape:-5,gain:.6000000000000001},{wave:"noise",bp:3940,q:3,at:1.076,a:.001,d:.012,shape:-5,gain:.3},{wave:"noise",bp:4337,q:3,at:1.1,a:.001,d:.012,shape:-5,gain:.4},{wave:"noise",bp:4734,q:3,at:1.163,a:.001,d:.012,shape:-5,gain:.5},{wave:"noise",bp:2131,q:3,at:1.2260000000000002,a:.001,d:.012,shape:-5,gain:.6000000000000001}],gain:.831},__={varyF:2,verb:[.3,.12],layers:[{wave:"noise",lp:5e3,lpTo:600,a:.002,d:.5,shape:-3,drive:1},{wave:"sine",freq:150,to:50,a:.002,d:.25,shape:-4,drive:1},{wave:"sine",freq:350,to:900,curve:3,at:.25,a:.002,d:.05,shape:3,lp:1800,gain:.4},{wave:"sine",freq:410,to:1e3,curve:3,at:.32,a:.002,d:.05,shape:3,lp:1800,gain:.4},{wave:"sine",freq:470,to:1100,curve:3,at:.4,a:.002,d:.05,shape:3,lp:1800,gain:.4},{wave:"sine",freq:530,to:1200,curve:3,at:.46,a:.002,d:.05,shape:3,lp:1800,gain:.4},{wave:"sine",freq:590,to:1300,curve:3,at:.55,a:.002,d:.05,shape:3,lp:1800,gain:.4}],gain:.345},x_={vary:1,varyF:3,varyG:1.5,layers:[{wave:"noise",bp:2600,bpTo:4200,q:1.2,a:.012,d:.035,shape:-4,gain:.7},{wave:"noise",bp:3800,q:2.5,at:.045,a:.002,d:.012,shape:-6,gain:.6},{wave:"pink",bp:900,q:1.5,at:.046,a:.001,d:.03,shape:-5,gain:.4}],limit:1,gain:2.82},y_={vary:1,varyF:3,varyG:1.5,layers:[{wave:"noise",bp:1800,bpTo:4500,q:1.4,a:.05,d:.03,shape:1},{wave:"noise",bp:3e3,q:1.5,at:.08,a:.002,d:.02,shape:-6,gain:.7},{wave:"pink",lp:1200,at:.08,a:.001,d:.04,shape:-5,gain:.5}],limit:1,gain:1.72},w_={vary:.8,varyF:2,varyG:1,layers:[{wave:"pink",bp:1400,q:1,a:.002,d:.09,shape:-5},{wave:"noise",bp:3500,q:2,a:.001,d:.008,shape:-6,gain:.25},{wave:"pink",lp:600,a:.002,d:.12,shape:-4,gain:.5}],limit:1,gain:2.52},M_={vary:.5,varyF:2,layers:[{wave:"noise",bp:2800,q:2,at:0,a:.001,d:.012,shape:-5,gain:.5},{wave:"noise",bp:3300,q:2,at:.026,a:.001,d:.012,shape:-5,gain:.5794677323180245},{wave:"noise",bp:3800,q:2,at:.044,a:.001,d:.012,shape:-5,gain:.6557673369234602},{wave:"noise",bp:2800,q:2,at:.07,a:.001,d:.012,shape:-5,gain:.7258569893580141},{wave:"noise",bp:3300,q:2,at:.088,a:.001,d:.012,shape:-5,gain:.7869424363598092},{wave:"noise",bp:3800,q:2,at:.11399999999999999,a:.001,d:.012,shape:-5,gain:.8365883939231586},{wave:"noise",bp:2800,q:2,at:.132,a:.001,d:.012,shape:-5,gain:.8728156343868905},{wave:"noise",bp:3300,q:2,at:.158,a:.001,d:.012,shape:-5,gain:.8941798919953841},{wave:"noise",bp:3800,q:2,at:.176,a:.001,d:.012,shape:-5,gain:.8998294412166021},{wave:"noise",bp:2800,q:2,at:.20199999999999999,a:.001,d:.012,shape:-5,gain:.8895390523512781},{wave:"noise",bp:3300,q:2,at:.21999999999999997,a:.001,d:.012,shape:-5,gain:.8637189707302727},{wave:"noise",bp:3800,q:2,at:.246,a:.001,d:.012,shape:-5,gain:.8233985615278361},{wave:"noise",bp:2800,q:2,at:.264,a:.001,d:.012,shape:-5,gain:.7701852722204604},{wave:"noise",bp:3300,q:2,at:.29,a:.001,d:.012,shape:-5,gain:.7062005487285856},{wave:"noise",bp:3800,q:2,at:.308,a:.001,d:.012,shape:-5,gain:.6339952600623621},{wave:"noise",bp:2800,q:2,at:.33399999999999996,a:.001,d:.012,shape:-5,gain:.5564480032239469},{wave:"pink",bp:2e3,q:.8,a:.05,h:.2,d:.12,gain:.25}],limit:1,gain:1.91},S_={vary:.6,varyF:2,varyG:1.5,layers:[{wave:"modal",freq:1900,modes:[1,1.59,2.14,2.65],at:0,a:.001,d:.06,shape:-6,gain:1},{wave:"noise",bp:4500,q:2,at:0,a:.001,d:.006,shape:-6,gain:.5},{wave:"modal",freq:2020,modes:[1,1.59,2.14,2.65],at:.035,a:.001,d:.06,shape:-6,gain:.8},{wave:"noise",bp:4500,q:2,at:.035,a:.001,d:.006,shape:-6,gain:.5},{wave:"modal",freq:2140,modes:[1,1.59,2.14,2.65],at:.06,a:.001,d:.06,shape:-6,gain:.6},{wave:"noise",bp:4500,q:2,at:.06,a:.001,d:.006,shape:-6,gain:.5}],limit:1,gain:.794},b_={vary:.8,varyF:2,varyG:2,layers:[{wave:"modal",freq:900,modes:[1,2.32,4.25,6.63],at:0,a:.001,d:.05,shape:-6,gain:1},{wave:"noise",bp:3e3,q:2,at:0,a:.001,d:.006,shape:-6,gain:.4},{wave:"modal",freq:1080,modes:[1,2.32,4.25,6.63],at:.07,a:.001,d:.05,shape:-6,gain:.9},{wave:"noise",bp:3e3,q:2,at:.07,a:.001,d:.006,shape:-6,gain:.36000000000000004},{wave:"modal",freq:1260,modes:[1,2.32,4.25,6.63],at:.13,a:.001,d:.05,shape:-6,gain:.8},{wave:"noise",bp:3e3,q:2,at:.13,a:.001,d:.006,shape:-6,gain:.32},{wave:"modal",freq:900,modes:[1,2.32,4.25,6.63],at:.2,a:.001,d:.05,shape:-6,gain:.7},{wave:"noise",bp:3e3,q:2,at:.2,a:.001,d:.006,shape:-6,gain:.28},{wave:"modal",freq:1080,modes:[1,2.32,4.25,6.63],at:.25,a:.001,d:.05,shape:-6,gain:.6},{wave:"noise",bp:3e3,q:2,at:.25,a:.001,d:.006,shape:-6,gain:.24000000000000002},{wave:"modal",freq:1260,modes:[1,2.32,4.25,6.63],at:.31,a:.001,d:.05,shape:-6,gain:.5},{wave:"noise",bp:3e3,q:2,at:.31,a:.001,d:.006,shape:-6,gain:.2},{wave:"modal",freq:900,modes:[1,2.32,4.25,6.63],at:.36,a:.001,d:.05,shape:-6,gain:.3999999999999999},{wave:"noise",bp:3e3,q:2,at:.36,a:.001,d:.006,shape:-6,gain:.16000000000000003},{wave:"modal",freq:1080,modes:[1,2.32,4.25,6.63],at:.4,a:.001,d:.05,shape:-6,gain:.29999999999999993},{wave:"noise",bp:3e3,q:2,at:.4,a:.001,d:.006,shape:-6,gain:.12}],limit:1,gain:1.01},E_={vary:.4,varyF:1.5,layers:[{wave:"square",duty:.25,freq:1400,at:0,a:.001,d:.02,shape:3,lp:4e3,gain:.5},{wave:"square",duty:.25,freq:1400,at:.04,a:.001,d:.02,shape:3,lp:4e3,gain:.5},{wave:"square",duty:.25,freq:1400,at:.08,a:.001,d:.02,shape:3,lp:4e3,gain:.5},{wave:"square",duty:.25,freq:1400,at:.12,a:.001,d:.02,shape:3,lp:4e3,gain:.5},{wave:"square",duty:.25,freq:1400,at:.16,a:.001,d:.02,shape:3,lp:4e3,gain:.5},{wave:"square",duty:.25,freq:1400,at:.2,a:.001,d:.02,shape:3,lp:4e3,gain:.5},{wave:"square",duty:.25,freq:1400,at:.24,a:.001,d:.02,shape:3,lp:4e3,gain:.5},{wave:"square",duty:.25,freq:1400,at:.28,a:.001,d:.02,shape:3,lp:4e3,gain:.5},{wave:"square",duty:.25,freq:1400,at:.32,a:.001,d:.02,shape:3,lp:4e3,gain:.5},{wave:"square",duty:.25,freq:1400,at:.36,a:.001,d:.02,shape:3,lp:4e3,gain:.5},{wave:"square",duty:.25,freq:1400,at:.4,a:.001,d:.02,shape:3,lp:4e3,gain:.5},{wave:"square",duty:.25,freq:1400,at:.44,a:.001,d:.02,shape:3,lp:4e3,gain:.5},{wave:"square",duty:.25,freq:1400,at:.48,a:.001,d:.02,shape:3,lp:4e3,gain:.5},{wave:"square",duty:.25,freq:1400,at:.52,a:.001,d:.02,shape:3,lp:4e3,gain:.5},{wave:"square",duty:.25,freq:1400,at:.56,a:.001,d:.02,shape:3,lp:4e3,gain:.5},{wave:"square",duty:.25,freq:1400,at:.6,a:.001,d:.02,shape:3,lp:4e3,gain:.5},{wave:"square",duty:.25,freq:1400,at:.64,a:.001,d:.02,shape:3,lp:4e3,gain:.5},{wave:"square",duty:.25,freq:1400,at:.68,a:.001,d:.02,shape:3,lp:4e3,gain:.5},{wave:"noise",bp:2500,q:1,a:.05,h:.6,d:.1,gain:.08}],gain:.904},T_={vary:.2,verb:[.25,.12],layers:[{wave:"noise",bp:1200,q:1.5,a:.001,d:.02,shape:-5,drive:1},{wave:"sine",freq:150,to:90,a:.001,d:.08,shape:-5,gain:.7},{wave:"sine",freq:1568,fm:[3.5,1.4,.1],at:.04,a:.002,d:.4,shape:-4,gain:.4}],limit:1,gain:.852},A_={vary:.05,verb:[.4,.2],echo:[.08,.3,.2],layers:[{wave:"square",duty:.25,freq:784,arp:[0,4,7,12,16,19,24,19,24],arpRate:.07,a:.002,h:.55,d:.4,shape:2,lp:5e3,gain:.5},{wave:"sine",freq:2093,fm:[3.5,1.6,.1],at:.1,a:.002,d:.35,shape:-4,gain:.3},{wave:"sine",freq:2637,fm:[3.5,1.6,.1],at:.25,a:.002,d:.35,shape:-4,gain:.3},{wave:"sine",freq:2093,fm:[3.5,1.6,.1],at:.4,a:.002,d:.35,shape:-4,gain:.3},{wave:"sine",freq:2637,fm:[3.5,1.6,.1],at:.55,a:.002,d:.35,shape:-4,gain:.3},{wave:"sine",freq:2093,fm:[3.5,1.6,.1],at:.7,a:.002,d:.35,shape:-4,gain:.3},{wave:"sine",freq:2637,fm:[3.5,1.6,.1],at:.85,a:.002,d:.35,shape:-4,gain:.3},{wave:"metal",freq:5e3,hp:7e3,a:.01,h:.8,d:.4,gain:.06}],gain:.23},R_={vary:.3,layers:[{wave:"saw",freq:40,to:30,lp:500,at:0,a:.01,d:.09,shape:-3,drive:1.5,gain:.6},{wave:"saw",freq:40,to:30,lp:500,at:.12,a:.01,d:.09,shape:-3,drive:1.5,gain:.6},{wave:"saw",freq:40,to:30,lp:500,at:.24,a:.01,d:.09,shape:-3,drive:1.5,gain:.6},{wave:"saw",freq:30,to:70,curve:3,vib:[14,1],lp:900,at:.36,a:.01,h:.5,d:.4,shape:-3,drive:2},{wave:"square",freq:35,to:72,curve:3,lp:400,at:.36,a:.01,h:.5,d:.4,shape:-3,gain:.5},{wave:"brown",lp:400,at:.36,a:.02,h:.5,d:.4,gain:.3}],gain:.256},C_={vary:.5,layers:[{wave:"saw",freq:60,to:210,curve:.7,sweep:.35,lp:1500,kt:.5,a:.02,h:.3,d:.5,shape:-3,drive:2},{wave:"saw",freq:121,to:425,curve:.7,sweep:.35,bp:1800,q:2,kt:1,a:.02,h:.3,d:.4,shape:-3,gain:.3},{wave:"brown",lp:500,a:.02,h:.3,d:.5,gain:.3}],gain:.241},P_={vary:.6,varyF:2,layers:[{wave:"noise",bp:2400,bpTo:2100,q:12,a:.04,h:.45,d:.25,shape:-3,gain:1.2},{wave:"saw",freq:1150,to:1e3,vib:[18,.4],bp:2300,q:6,a:.04,h:.45,d:.25,shape:-3,gain:.25},{wave:"pink",lp:800,a:.04,h:.4,d:.2,gain:.2}],gain:1.21},D_={varyF:2,varyG:1.5,verb:[.35,.15],layers:[{wave:"noise",hp:1500,a:.001,d:.05,shape:-4,drive:2},{wave:"metal",freq:380,bp:1500,q:1.2,a:.001,d:.5,shape:-4,drive:2},{wave:"sine",freq:95,to:35,curve:2,a:.001,d:.35,shape:-4,drive:2},{wave:"brown",lp:900,lpTo:200,a:.001,d:.6,shape:-4,drive:1,gain:.8},{wave:"metal",freq:1400,hp:3500,at:.12,a:.001,d:.08,shape:-5,gain:.3},{wave:"metal",freq:1700,hp:3500,at:.2,a:.001,d:.08,shape:-5,gain:.3},{wave:"metal",freq:2e3,hp:3500,at:.31,a:.001,d:.08,shape:-5,gain:.3},{wave:"metal",freq:2300,hp:3500,at:.42,a:.001,d:.08,shape:-5,gain:.3}],gain:.223},L_={vary:.15,layers:[{wave:"square",freq:415,a:.01,h:.3,d:.08,shape:-3,bp:1200,q:1.2,drive:1.5},{wave:"square",freq:523,a:.01,h:.3,d:.08,shape:-3,bp:1500,q:1.2,drive:1.5,gain:.8}],gain:.225},U_={vary:.4,varyF:2,layers:[{wave:"noise",bp:800,bpTo:3500,q:1,a:.03,h:.3,d:.4,shape:-3},{wave:"saw",freq:300,to:1200,curve:.8,bp:2e3,q:3,kt:1,a:.05,h:.3,d:.3,shape:-3,gain:.25},{wave:"brown",lp:300,a:.01,d:.4,shape:-3,drive:1,gain:.6},{wave:"sine",freq:90,to:45,a:.001,d:.2,shape:-5,gain:.6}],gain:.763},I_={vary:.02,layers:[{wave:"square",duty:.5,freq:880,a:.002,h:.18,d:.05,shape:1,lp:3500},{wave:"sine",freq:1760,a:.002,h:.18,d:.05,shape:1,gain:.3}],gain:.226},N_={vary:.3,verb:[.6,.3],layers:[{wave:"saw",freq:1200,to:900,vib:[11,1.5],formant:[270,2290,3010],a:.002,h:.25,d:.5,shape:-3,drive:2},{wave:"saw",freq:1265,to:950,vib:[13,1.5],bp:3e3,q:3,a:.002,h:.25,d:.5,shape:-3,gain:.5},{wave:"noise",hp:2e3,a:.001,d:.15,shape:-4,gain:.6},{wave:"sine",freq:70,to:30,curve:2,a:.001,d:.6,shape:-3,drive:2}],gain:.17},F_={vary:.2,verb:[.65,.3],layers:[{wave:"saw",freq:55,to:58,lp:400,lpTo:1200,a:.9,h:.25,d:.5,shape:-3},{wave:"saw",freq:55.8,to:61,lp:400,lpTo:1200,a:.9,h:.25,d:.5,shape:-3},{wave:"sine",freq:880,to:932,vib:[5,.3],a:1,h:.2,d:.45,shape:-3,gain:.08},{wave:"brown",lp:200,a:.8,h:.3,d:.5,shape:-3,gain:.4}],gain:.247},O_={vary:1,varyF:2,verb:[.5,.25],layers:[{wave:"noise",formant:[730,1090,2440],a:.06,h:.12,d:.15,shape:-3,gain:.8},{wave:"noise",formant:[270,2290,3010],at:.28,a:.04,h:.1,d:.12,shape:-3,gain:.7},{wave:"noise",formant:[300,870,2240],at:.5,a:.05,h:.08,d:.2,shape:-3,gain:.6},{wave:"noise",bp:6e3,q:2,at:.2,a:.01,d:.05,shape:-4,gain:.3}],gain:1.35},q_={vary:.1,verb:[.75,.35],layers:[{wave:"saw",freq:220,lp:2500,lpTo:600,a:.005,h:.05,d:1.2,shape:-3,drive:1},{wave:"saw",freq:233,lp:2500,lpTo:600,a:.005,h:.05,d:1.2,shape:-3,drive:1},{wave:"saw",freq:311,lp:2500,lpTo:600,a:.005,h:.05,d:1.2,shape:-3,gain:.7},{wave:"brown",lp:300,a:.001,d:.8,shape:-4,gain:.7},{wave:"metal",freq:600,hp:3e3,a:.001,d:1,shape:-3,gain:.15}],gain:.154},B_={vary:.6,varyF:2,varyG:2,verb:[.5,.2],layers:[{wave:"metal",freq:900,hp:2200,at:0,a:.001,d:.06,shape:-5,gain:.7},{wave:"noise",bp:4e3,q:2,at:0,a:.001,d:.01,shape:-6,gain:.3},{wave:"metal",freq:1130,hp:2200,at:.05,a:.001,d:.06,shape:-5,gain:.7},{wave:"noise",bp:4e3,q:2,at:.05,a:.001,d:.01,shape:-6,gain:.3},{wave:"metal",freq:1360,hp:2200,at:.09,a:.001,d:.06,shape:-5,gain:.7},{wave:"noise",bp:4e3,q:2,at:.09,a:.001,d:.01,shape:-6,gain:.3},{wave:"metal",freq:900,hp:2200,at:.16,a:.001,d:.06,shape:-5,gain:.7},{wave:"noise",bp:4e3,q:2,at:.16,a:.001,d:.01,shape:-6,gain:.3},{wave:"metal",freq:1130,hp:2200,at:.21,a:.001,d:.06,shape:-5,gain:.7},{wave:"noise",bp:4e3,q:2,at:.21,a:.001,d:.01,shape:-6,gain:.3},{wave:"metal",freq:1360,hp:2200,at:.27,a:.001,d:.06,shape:-5,gain:.7},{wave:"noise",bp:4e3,q:2,at:.27,a:.001,d:.01,shape:-6,gain:.3},{wave:"metal",freq:900,hp:2200,at:.34,a:.001,d:.06,shape:-5,gain:.7},{wave:"noise",bp:4e3,q:2,at:.34,a:.001,d:.01,shape:-6,gain:.3},{wave:"metal",freq:1130,hp:2200,at:.38,a:.001,d:.06,shape:-5,gain:.7},{wave:"noise",bp:4e3,q:2,at:.38,a:.001,d:.01,shape:-6,gain:.3}],gain:1.05},z_={vary:.5,varyF:3,bits:6,layers:[{wave:"noise",hp:400,lp:8e3,a:.005,h:.25,d:.08,shape:1},{wave:"crunch",freq:6e3,bp:2500,q:1,a:.005,h:.25,d:.08,shape:1,gain:.6},{wave:"square",freq:60,lp:300,a:.005,h:.25,d:.08,shape:1,gain:.3}],gain:.291},k_={vary:.05,verb:[.6,.3],layers:[{wave:"modal",freq:1568,modes:[1,3.9,8.1],at:0,a:.001,d:.5,shape:-3,gain:1},{wave:"sine",freq:3136,at:0,a:.001,d:.15,shape:-5,gain:.12},{wave:"modal",freq:1385.7537565236994,modes:[1,3.9,8.1],at:.28,a:.001,d:.5,shape:-3,gain:.94},{wave:"sine",freq:2793.858380088104,at:.28,a:.001,d:.15,shape:-5,gain:.12},{wave:"modal",freq:1174.6727482713184,modes:[1,3.9,8.1],at:.56,a:.001,d:.5,shape:-3,gain:.88},{wave:"sine",freq:2349.3454965426367,at:.56,a:.001,d:.15,shape:-5,gain:.12},{wave:"modal",freq:924.8796711368362,modes:[1,3.9,8.1],at:.8400000000000001,a:.001,d:.5,shape:-3,gain:.8200000000000001},{wave:"sine",freq:1864.6767563242665,at:.8400000000000001,a:.001,d:.15,shape:-5,gain:.12},{wave:"modal",freq:1046.514445669307,modes:[1,3.9,8.1],at:1.12,a:.001,d:.5,shape:-3,gain:.76},{wave:"sine",freq:2093.028891338614,at:1.12,a:.001,d:.15,shape:-5,gain:.12},{wave:"modal",freq:777.728,modes:[1,3.9,8.1],at:1.4000000000000001,a:.001,d:.7,shape:-3,gain:.7},{wave:"sine",freq:1568,at:1.4000000000000001,a:.001,d:.15,shape:-5,gain:.12}],gain:.375},G_={vary:.8,varyF:2,varyG:1.5,verb:[.2,.1],layers:[{wave:"noise",bp:2200,q:1.5,a:.001,d:.012,shape:-5,drive:2},{wave:"modal",freq:190,modes:[1,2.32,4.25,6.63],a:.001,d:.2,shape:-5,drive:1},{wave:"pink",lp:1200,a:.001,d:.08,shape:-6,drive:1.5,gain:.7},{wave:"sine",freq:120,to:60,a:.001,d:.12,shape:-5,gain:.5}],limit:1,gain:.68},H_={vary:.4,verb:[.5,.25],layers:[{wave:"saw",freq:40,to:70,vib:[3,3],bp:900,q:5,a:.03,h:.65,d:.2,shape:1.5,gain:.6},{wave:"pink",bp:2e3,q:.8,at:.9,a:.01,d:.6,shape:-3,gain:.6},{wave:"brown",lp:400,at:.95,a:.001,d:.8,shape:-4,drive:1.5,gain:1.4},{wave:"sine",freq:70,to:30,at:.95,a:.001,d:.5,shape:-4,drive:1.5}],gain:.339},V_={vary:.8,varyF:2,varyG:1.5,verb:[.25,.12],layers:[{wave:"metal",freq:1200,hp:2500,a:.001,d:.3,shape:-5,gain:.5},{wave:"noise",bp:2600,q:1,a:.001,d:.03,shape:-5,drive:1,gain:.7},{wave:"modal",freq:700,modes:[1,2.6,4.9,7.3],a:.001,d:.25,shape:-5},{wave:"pink",lp:900,a:.001,d:.1,shape:-5,gain:.5},{wave:"noise",bp:3500,q:3,at:.05,a:.001,d:.008,shape:-6,gain:.3},{wave:"noise",bp:3500,q:3,at:.09,a:.001,d:.008,shape:-6,gain:.3},{wave:"noise",bp:3500,q:3,at:.14,a:.001,d:.008,shape:-6,gain:.3}],limit:1,gain:.636},W_={vary:.8,varyF:3,varyG:2,layers:[{wave:"noise",bp:1500,bpTo:600,q:.8,a:.01,d:.18,shape:-4,drive:1},{wave:"brown",lp:400,a:.005,d:.2,shape:-4,gain:.7},{wave:"pink",bp:2e3,q:2,at:.12,a:.001,d:.02,shape:-5,gain:.3},{wave:"pink",bp:2e3,q:2,at:.17,a:.001,d:.02,shape:-5,gain:.3},{wave:"pink",bp:2e3,q:2,at:.22,a:.001,d:.02,shape:-5,gain:.3}],limit:1,gain:1.33},X_={vary:.8,layers:[{wave:"pink",lp:900,a:.001,d:.06,shape:-5},{wave:"sine",freq:600,to:1200,curve:2,at:.06,a:.002,d:.08,shape:-4,gain:.4},{wave:"sine",freq:1760,fm:[3.5,1,.08],at:.1,a:.002,d:.25,shape:-4,gain:.2}],limit:1,gain:1.92},Y_={vary:.4,varyF:2,layers:[{wave:"noise",bp:2500,q:.9,a:.1,h:.5,d:.25,shape:-3,gain:.6},{wave:"sine",freq:700,to:1600,curve:3,at:.08,a:.001,d:.03,shape:3,gain:.25},{wave:"sine",freq:837,to:1811,curve:3,at:.15000000000000002,a:.001,d:.03,shape:3,gain:.25},{wave:"sine",freq:974,to:2022,curve:3,at:.22000000000000003,a:.001,d:.03,shape:3,gain:.25},{wave:"sine",freq:1111,to:2233,curve:3,at:.29000000000000004,a:.001,d:.03,shape:3,gain:.25},{wave:"sine",freq:1248,to:1644,curve:3,at:.36000000000000004,a:.001,d:.03,shape:3,gain:.25},{wave:"sine",freq:785,to:1855,curve:3,at:.43000000000000005,a:.001,d:.03,shape:3,gain:.25},{wave:"sine",freq:922,to:2066,curve:3,at:.5,a:.001,d:.03,shape:3,gain:.25},{wave:"sine",freq:1059,to:2277,curve:3,at:.5700000000000001,a:.001,d:.03,shape:3,gain:.25},{wave:"sine",freq:1196,to:1688,curve:3,at:.64,a:.001,d:.03,shape:3,gain:.25},{wave:"sine",freq:733,to:1899,curve:3,at:.7100000000000001,a:.001,d:.03,shape:3,gain:.25}],gain:.709},Z_={vary:.6,varyF:2,layers:[{wave:"noise",bp:3e3,q:1,a:.02,d:.1,shape:-4,gain:.4},{wave:"sine",freq:220,to:660,curve:2,at:.08,a:.002,d:.08,shape:-4,gain:.7},{wave:"triangle",freq:1047,arp:[0,7],arpRate:.05,at:.14,a:.002,d:.15,shape:-3,gain:.4}],limit:1,gain:1.47},J_={vary:.5,layers:[{wave:"noise",bp:1500,bpTo:5e3,q:2,a:.08,d:.05,shape:1,gain:.7},{wave:"noise",bp:4200,q:4,at:.1,a:.001,d:.01,shape:-5,gain:.25},{wave:"noise",bp:4200,q:4,at:.13,a:.001,d:.01,shape:-5,gain:.25},{wave:"noise",bp:4200,q:4,at:.16,a:.001,d:.01,shape:-5,gain:.25},{wave:"noise",bp:4200,q:4,at:.19,a:.001,d:.01,shape:-5,gain:.25},{wave:"noise",bp:4200,q:4,at:.22,a:.001,d:.01,shape:-5,gain:.25},{wave:"noise",bp:4200,q:4,at:.25,a:.001,d:.01,shape:-5,gain:.25},{wave:"noise",bp:4200,q:4,at:.28,a:.001,d:.01,shape:-5,gain:.25},{wave:"noise",bp:4200,q:4,at:.31,a:.001,d:.01,shape:-5,gain:.25},{wave:"noise",bp:4200,q:4,at:.33999999999999997,a:.001,d:.01,shape:-5,gain:.25},{wave:"noise",bp:4200,q:4,at:.37,a:.001,d:.01,shape:-5,gain:.25},{wave:"sine",freq:500,to:1300,curve:3,at:.5,a:.002,d:.06,shape:3,gain:.6},{wave:"noise",lp:2e3,at:.5,a:.002,d:.12,shape:-4,gain:.3}],limit:1,gain:1.93},K_={vary:.3,layers:[{wave:"sine",freq:700,to:300,curve:2,a:.002,d:.08,shape:-4},{wave:"noise",lp:1500,a:.002,d:.08,shape:-4,gain:.4},{wave:"square",duty:.25,freq:1319,arp:[0,5],arpRate:.09,at:.08,a:.002,h:.12,d:.06,shape:2,lp:4e3,gain:.35}],gain:.648},$_={vary:2,layers:[{wave:"square",duty:.25,freq:1400,arp:[0,7,3,12,5,10,0,15],arpRate:.035,a:.002,h:.26,d:.03,shape:2,lp:5e3,gain:.6}],gain:.266},j_={vary:.3,echo:[.12,.3,.25],layers:[{wave:"saw",freq:300,to:1200,curve:.8,bp:800,bpTo:4e3,q:6,a:.05,h:.4,d:.1,shape:1.5,gain:.4},{wave:"sine",freq:2400,at:.55,a:.002,d:.3,shape:-4,gain:.5}],gain:.817},Q_={vary:.05,layers:[{wave:"sine",freq:1320,arp:[0,5],arpRate:.09,a:.002,h:.14,d:.06,shape:1.5},{wave:"square",duty:.25,freq:2640,arp:[0,5],arpRate:.09,a:.002,h:.14,d:.06,shape:1.5,lp:5e3,gain:.15}],gain:.24},e3={vary:.1,layers:[{wave:"square",freq:220,a:.003,h:.08,d:.03,shape:1,lp:1500,drive:1},{wave:"square",freq:220,at:.14,a:.003,h:.12,d:.08,shape:-3,lp:1500,drive:1},{wave:"crunch",freq:4e3,at:.14,a:.003,d:.1,shape:-4,gain:.15}],gain:.18},t3={vary:.3,varyF:2,verb:[.3,.12],layers:[{wave:"noise",bp:4e3,bpTo:2e3,q:1.2,a:.01,d:.35,shape:-3,gain:.6},{wave:"saw",freq:80,to:140,lp:600,a:.02,h:.2,d:.15,shape:-3,gain:.5},{wave:"noise",bp:900,q:2,at:.33,a:.001,d:.04,shape:-5,gain:.6},{wave:"sine",freq:110,to:60,at:.33,a:.001,d:.1,shape:-5,gain:.5}],gain:.649},n3={vary:2,layers:[{wave:"sine",freq:900,arp:[0,9,4,14,-3,7],arpRate:.06,vib:[24,1.5],a:.003,h:.33,d:.05,shape:2},{wave:"square",duty:.3,freq:450,arp:[0,9,4,14,-3,7],arpRate:.06,lp:2500,a:.003,h:.33,d:.05,shape:2,gain:.25}],gain:.169},i3={vary:.2,layers:[{wave:"saw",freq:900,to:40,curve:.7,lp:3e3,kt:1,a:.005,h:.1,d:.7,shape:1.5,gain:.7},{wave:"sine",freq:450,to:20,curve:.7,a:.005,h:.1,d:.7,shape:1.5,gain:.5},{wave:"noise",bp:1200,at:.8,a:.001,d:.02,shape:-5,gain:.4}],gain:.325},a3={vary:2,varyF:3,rate:8e3,bits:5,layers:[{wave:"square",freq:300,arp:[0,17,-5,24,3,12],arpRate:.025,a:.001,h:.13,d:.03,shape:1,gain:.5},{wave:"crunch",freq:2e3,to:9e3,a:.001,h:.1,d:.04,shape:1,gain:.5}],gain:.367},r3={vary:.5,varyF:2,layers:[{wave:"sine",freq:600,to:900,a:.002,d:.06,shape:-4,gain:.5},{wave:"sine",freq:900,to:600,at:.05,a:.002,d:.06,shape:-4,gain:.5},{wave:"noise",bp:2500,bpTo:4e3,q:1.5,a:.03,d:.06,shape:-3,gain:.25}],limit:1,gain:2.31},s3={vary:.3,verb:[.25,.15],layers:[{wave:"sine",freq:1047,fm:[2,1.2,.05],arp:[0,7,12],arpRate:.035,a:.001,d:.25,shape:-4},{wave:"noise",bp:5e3,q:2,a:.001,d:.03,shape:-5,gain:.3},{wave:"metal",freq:3e3,hp:6e3,at:.05,a:.002,d:.2,shape:-4,gain:.1}],gain:.505},o3={vary:.05,echo:[.07,.3,.25],layers:[{wave:"triangle",freq:784,arp:[0,4,7,12],arpRate:.04,a:.002,h:.1,d:.25,shape:-3},{wave:"sine",freq:1568,fm:[3.5,1.2,.1],arp:[0,4,7,12],arpRate:.04,a:.002,h:.1,d:.25,shape:-3,gain:.35}],gain:.333},l3={vary:.1,verb:[.3,.15],layers:[{wave:"square",duty:.25,freq:400,to:1600,curve:.8,lp:5e3,a:.002,h:.12,d:.08,shape:2,gain:.45},{wave:"noise",bp:2e3,bpTo:7e3,q:1.5,a:.01,d:.2,shape:-3,gain:.3},{wave:"sine",freq:2093,fm:[3.5,1.5,.1],at:.18,a:.002,d:.45,shape:-4,gain:.45}],gain:.488},c3={vary:.4,varyF:1.5,varyG:1,layers:[{wave:"noise",bp:2500,q:2,a:.001,d:.006,shape:-6,gain:.6},{wave:"square",freq:180,to:110,lp:900,a:.001,d:.06,shape:-5,drive:1},{wave:"sine",freq:120,to:70,a:.001,d:.08,shape:-5,gain:.6},{wave:"brown",lp:300,a:.002,d:.12,shape:-5,gain:.3}],limit:1,gain:.897},h3={vary:.4,verb:[.3,.15],layers:[{wave:"sine",freq:180,to:520,curve:2,a:.003,d:.12,shape:-4,drive:.5},{wave:"pink",bp:600,bpTo:2400,q:1.5,a:.02,d:.1,shape:-3,gain:.3},{wave:"sine",freq:1568,fm:[3.5,1.3,.1],arp:[0,7],arpRate:.05,at:.1,a:.002,d:.3,shape:-4,gain:.4}],gain:.665};const d3=Object.freeze(Object.defineProperty({__proto__:null,accessDenied:e3,accessGranted:Q_,achievement:p1,alarm:Kg,ammo:Jm,arrowHit:Pv,axeChop:G_,batFlap:Z1,beeBuzz:Q1,beep:$g,birdChirp:d_,blaster:og,block:Ev,bodyFall:Nv,bombFuse:Wv,bonk:Rv,boost:U_,bossIntro:x1,bowTwang:yg,bubble:O1,button:A1,buzzerWrong:s1,cancel:mm,carCrash:D_,carHorn:L_,cardDeal:y_,cardFlip:x_,cardPlace:w_,cardShuffle:M_,catMeow:s_,chainsRattle:B_,chargeUp:eg,checkpoint:v1,chestOpen:E1,chipStack:S_,chirp:K1,click:om,clickHard:cm,clickSoft:lm,coin:Bm,coinBag:Gm,coinDouble:km,coinSoft:zm,comboChain:o3,computerBeep:$_,confirm:pm,countdown:t1,countdownGo:n1,crateBreak:H1,creatureDie:t_,creatureHurt:e_,crit:Tv,curse:Vg,dash:I1,debris:Hv,deny:gm,diceRoll:b_,dig:W_,dingCorrect:o1,dispel:Xg,diveSplash:__,dogBark:r_,doorClose:w1,doorHeavy:M1,doorOpen:y1,doorSlide:t3,dragStart:Pm,dreadDrone:F_,drop:Dm,dryFire:_g,eat:tv,enchant:Wg,enemyDie:Sv,enemyHit:Mv,engineIdle:P1,engineRev:C_,engineStart:R_,equip:iv,error:vm,explosion:Fv,explosionBig:qv,explosionDistant:zv,explosionRetro:Bv,explosionSmall:Ov,extraLife:Jv,fallWhistle:mv,fireCrackle:G1,fireball:Bg,firework:kv,fishBite:K_,fishingCast:J_,flamethrower:Sg,forceField:D1,frogCroak:u_,gameOver:d1,gem:Hm,ghostMoan:j1,glassBreak:B1,glitch:a3,grenadeLaunch:bg,growlSmall:$1,gunshot:hg,harp:Jg,harvest:Z_,heal:Qv,heart:Zm,heartbeat:e1,highscore:_1,hit:vv,hitHeavy:_v,hitLight:gv,hop:cv,horrorSting:q_,hover:dm,hurt:wv,ice:zg,ignite:Y1,implosion:Gv,invincible:ig,jackpot:A_,jump:av,jumpCartoon:lv,jumpDouble:ov,jumpHigh:sv,jumpSoft:rv,jumpscare:N_,kaChing:Km,key:Ym,kick:Dv,land:hv,landHeavy:dv,laser:ag,laserHeavy:sg,laserSoft:rg,leafRustle:f_,levelComplete:h1,levelUp:Zv,lever:T1,lightning:Hg,lineClear:l3,lockOpen:S1,locked:b1,lootRare:nv,lose:u1,lowHealth:Qg,machine:C1,machineGun:wg,magicMissile:Zg,match:s3,maximize:Um,menuClose:Em,menuOpen:bm,merge:h3,message:Rm,messageSend:Fm,metalClang:W1,minimize:Im,missile:vg,musicBox:k_,notify:_m,oceanWave:v_,pageTurn:qm,pew:cg,pickaxeMine:V_,pickup:Vm,pickupItem:Xm,pickupSoft:Wm,pieceLock:c3,plantSeed:X_,plasma:mg,plink:Cm,pop:xm,popDown:ym,portal:Gg,potBreak:V1,potionDrink:ev,powerDown:tg,powerup:Xv,powerupRetro:Yv,punch:xv,puzzleSolved:m1,questNew:r1,question:Nm,raceLight:I_,radarPing:a1,railgun:fg,rainBurst:g_,rainDrop:h_,rainLoop:o_,ratchet:R1,ray:pg,reload:xg,ricochet:gg,ring:Qm,roar:a_,robotChatter:n3,rockCrumble:X1,roundStart:g1,scan:j_,secretFound:f1,select:Tm,selectSoft:Am,shellCasing:Mg,shieldOff:$v,shieldOn:Kv,shockwave:Vv,shootRetro:ug,shotgun:dg,shutdown:i3,siren:i1,slap:yv,slide:pv,slimeBlob:J1,slotSpin:E_,slotStop:T_,sparkle:Og,speedUp:jv,spellCast:qg,splash:N1,spring:uv,squish:Av,stab:Lv,star:jm,staticBurst:z_,stepCarpet:Ng,stepGrass:Eg,stepGravel:Pg,stepHeavy:Ig,stepMetal:Rg,stepMud:Fg,stepRetro:Ug,stepSand:Lg,stepSnow:Cg,stepStone:Tg,stepWater:Dg,stepWood:Ag,stomp:Cv,stoneDrop:p_,success:Lm,summon:Yg,swap:r3,swing:U1,swipe:wm,swordClash:Uv,swordDraw:Iv,swordHit:bv,tap:hm,teleport:kg,thud:z1,thunderCrack:m_,thunderFar:c_,tick:Sm,timerDone:l1,tireScreech:P_,toggleOff:fm,toggleOn:um,toss:k1,trash:Om,treeFall:H_,type:Mm,unlock:ng,victory:c1,voiceBabble:n_,wallJump:fv,warning:jg,waterDrop:F1,wateringCan:Y_,whisper:O_,whoosh:L1,wind:q1,windLoop:l_,xpOrb:$m,zap:lg,zombieGroan:i_},Symbol.toStringTag,{value:"Module"}));var ei=Math.PI*2,xa=[1,1.483,1.8,2.546,2.63,3.897],$o=i=>()=>{i=i+1831565813|0;let e=Math.imul(i^i>>>15,1|i);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Ei=(i,e)=>i<e?(i/=e,i+i-i*i-1):i>1-e?(i=(i-1)/e,i*i+i+i+1):0,jo=(i,e,t)=>{let n=0,a=0;const r=1/e;return(s,o)=>{const l=Math.tan(Math.PI*Math.min(Math.max(o,10),i*.45)/i),c=1/(1+l*(l+r)),h=l*c,d=s-a,p=c*n+h*d,f=a+h*n+l*h*d;return n=2*p-n,a=2*f-a,t?t<2?r*p:s-r*p-f:f}},u3=(i,e,t,n,a,r,s=1,o=1)=>{const l=i.wave||"sine",c=(i.freq||440)*n,h=Math.max(i.a??.002,.001),d=i.h||0,p=(i.d??.2)*a,f=h+d+p,g=i.sweep||f,w=i.curve||1,m=i.shape||2,u=i.duty||.5,T=i.arpRate||.06,S=(i.gain??1)*o,v=i.drive||0,C=i.fm,E=Math.round((i.at||0)*t),A=Math.min(Math.round(f*t),e.length-E),D=i.q||.707,M=[];["lp","bp","hp"].forEach((fe,Ce)=>i[fe]&&M.push([jo(t,D,Ce),i[fe]*s,(i[`${fe}To`]||i[fe])*s]));let x=0,R=0,O=0,q=0,k=0,Y=0,V=0;const $=[...xa,0,0].map(()=>r()),G=(i.modes||[1,2.756,5.404,8.933]).slice(0,8),le=l=="pluck"?new Float32Array(A+1):$,ve=(i.formant||[]).map(fe=>[jo(t,8,1),fe*s]);for(let fe=0;fe<A;fe++){const Ce=fe/t;let Xe=c;if(i.to){let Re=Math.min(Ce/g,1);w!=1&&(Re=1-(1-Re)**w),Xe*=(i.to/(i.freq||440))**Re}if(i.arp){const Re=Math.floor(Ce/T);Xe*=2**(i.arp[i.loop?Re%i.arp.length:Math.min(Re,i.arp.length-1)]/12)}i.vib&&(Xe*=2**(i.vib[1]*Math.sin(ei*i.vib[0]*Ce)/12));const ze=Xe/t;let W=x;C&&(W+=C[1]*Math.exp(-Ce/(C[2]||9))*Math.sin(ei*R)/ei,R=(R+ze*C[0])%1,W-=Math.floor(W));let Q;const ie=r()*2-1;switch(l){case"triangle":Q=1-4*Math.abs((W+.25)%1-.5);break;case"saw":Q=2*W-1-Ei(W,ze);break;case"square":Q=(W<u?1:-1)+Ei(W,ze)-Ei((W+1-u)%1,ze);break;case"pluck":{const Re=fe-t/Xe,De=Re|0,P=Re-De;Q=De<1?ie:(i.blend??.5)*((1-P)*(le[De]+le[De-1])+P*(le[De+1]+le[De]))*(i.damp??.998),le[fe]=Q;break}case"noise":Q=ie;break;case"pink":q=.99765*q+ie*.099046,k=.963*k+ie*.2965164,Y=.57*Y+ie*1.0526913,Q=(q+k+Y+ie*.1848)*.25;break;case"brown":V=(V+.02*ie)/1.02,Q=V*3.5;break;case"crunch":(x+ze>=1||!fe)&&(O=ie),Q=O;break;case"modal":Q=0;for(let Re=0;Re<G.length;Re++)$[Re]=($[Re]+ze*G[Re])%1,Q+=Math.sin(ei*$[Re])*Math.exp(-Ce*G[Re]*4/p)/(Re+1);break;case"metal":Q=0;for(let Re=0;Re<6;Re++)$[Re]=($[Re]+ze*xa[Re])%1,Q+=($[Re]<.5?1:-1)+Ei($[Re],ze*xa[Re])-Ei(($[Re]+.5)%1,ze*xa[Re]);Q/=6;break;default:Q=Math.sin(ei*W)}x=(x+ze)%1;const Le=fe/A,Me=i.kt?(Xe/c)**i.kt:1;for(const[Re,De,P]of M)Q=Re(Q,De*(P/De)**Le*Me);if(ve.length){let Re=0;for(const[De,P]of ve)Re+=De(Q,P*Me);Q=Re}const Ne=Ce<h?Ce/h:Ce<h+d?1:m<0?(Math.exp(m*(Ce-h-d)/p)-Math.exp(m))/(1-Math.exp(m)):(1-(Ce-h-d)/p)**m;Q*=Ne,v&&(Q=Math.tanh(Q*(1+v))/Math.tanh(1+v)),e[E+fe]+=Q*S}};function f3(i,e={}){const t=e.sampleRate||44100,n=e.seed||0,a=$o(n*7919+17),r=n?2**((a()*2-1)*(i.vary??.4)/12):1,s=v=>n&&v.d?1+(a()*2-1)*.07:1,o=i.varyF??0,l=i.layers.map(v=>[v,s(v),n?r*2**((a()*2-1)*o/12):1,n?10**((a()*2-1)*(i.varyG??0)/20):1]);let c=0;for(const[v,C]of l)c=Math.max(c,(v.at||0)+Math.max(v.a??.002,.001)+(v.h||0)+(v.d??.2)*C);const h=i.echo,d=i.verb,p=(h?Math.min(h[0]*Math.ceil(Math.log(.001)/Math.log(h[1]||.01)),1.5):0)+(d?.2+d[0]*1.8:0);let f=new Float32Array(Math.ceil((c+p)*t)+1);if(l.forEach(([v,C,E,A],D)=>u3(v,f,t,r,C,$o(n*1009+D*31+7),E,A)),i.rate||i.bits){const v=i.rate?t/i.rate:1,C=i.bits?2**(i.bits-1):0;let E=0,A=0;for(let D=0;D<f.length;D++)(++E>=v||!D)&&(E-=v>1?v:E,A=f[D]),f[D]=C?Math.round(A*C)/C:A}if(h){const v=Math.round(h[0]*t),C=new Float32Array(f.length);let E=0;for(let A=v;A<f.length;A++)E+=.5*(f[A-v]+h[1]*C[A-v]-E),C[A]=E;for(let A=0;A<f.length;A++)f[A]+=C[A]*h[2]}if(d){const v=t/44100,C=.7+d[0]*.28,E=new Float32Array(f.length);for(const A of[1116,1188,1277,1356]){const D=Math.round(A*v),M=new Float32Array(D);let x=0,R=0;for(let O=0;O<f.length;O++){const q=M[x];R+=.6*(q-R),M[x]=f[O]+R*C,E[O]+=q/4,x=(x+1)%D}}for(const A of[556,441]){const D=Math.round(A*v),M=new Float32Array(D);let x=0;for(let R=0;R<f.length;R++){const O=M[x],q=E[R];M[x]=q+O*.5,E[R]=O-q,x=(x+1)%D}}for(let A=0;A<f.length;A++)f[A]+=E[A]*d[1]}const g=1-ei*20/t,w=i.gain??1;let m=0,u=0,T=0;for(let v=0;v<f.length;v++)u=f[v]-m+g*u,m=f[v],f[v]=u*w,Math.abs(f[v])>3e-4&&(T=v);if(i.limit){const v=new Float32Array(f.length),C=t*.0015,E=t*.05;for(let A=f.length;A--;)v[A]=Math.min(.84/Math.max(Math.abs(f[A]),1e-9),1,A+1<f.length?v[A+1]+1/C:1);for(let A=0;A<f.length;A++)f[A]*=v[A]=Math.min(v[A],A?v[A-1]+1/E:1)}if(i.loop){const v=Math.round(t/4),C=Math.round(c*t)-2*v;for(let E=0;E<v;E++)f[E]=f[E]*(E/v)**.75+f[E+C]*(1-E/v)**.75;return f.slice(0,C)}f=f.slice(0,T+1);const S=Math.min(Math.round(t*.005),f.length);for(let v=0;v<S;v++)f[f.length-1-v]*=v/S;return f}var Ca=4,jn,Bi,Pa=1,ls=!1,Qo=new WeakMap,Vl=i=>Qo.get(i)||Qo.set(i,{b:[],v:Math.random()*Ca|0,t:-9,on:[]}).get(i),cs=new Set,Ps=()=>typeof AudioContext<"u";function Ds(){if(!jn){jn=new AudioContext,Bi=jn.createGain(),Wl(Pa);const i=jn.createDynamicsCompressor();i.threshold.value=-3,i.knee.value=3,i.ratio.value=20,i.release.value=.1,Bi.connect(i).connect(jn.destination)}return jn}function Wl(i){Pa=Math.max(0,Number.isFinite(i)?i:1),Bi&&(Bi.gain.value=ls?0:Pa)}function hs(i){return i!=null&&(ls=i,Wl(Pa)),ls}function q3(){if(!Ps()||typeof addEventListener>"u")return;const i=()=>{const e=Ds();e.state!="running"&&e.resume();const t=navigator.audioSession;t&&(t.type="playback");for(const n of el)removeEventListener(n,i,!0)};for(const e of el)addEventListener(e,i,!0)}var el=["pointerdown","keydown","touchend"];function Xl(i,e=0){const t=Ds(),n=Vl(i).b;if(!n[e]){const a=f3(i,{sampleRate:t.sampleRate,seed:e});(n[e]=t.createBuffer(1,a.length,t.sampleRate)).getChannelData(0).set(a)}return n[e]}function p3(i,e=Ca){if(!Ps())return Promise.resolve();const t=i.flatMap(a=>Array.from({length:e},(r,s)=>()=>Xl(a,s))),n=globalThis.requestIdleCallback||(a=>setTimeout(a,1));return new Promise(a=>{const r=()=>{const s=performance.now();for(;t.length&&performance.now()-s<8;)t.shift()();t.length?n(r):a()};n(r)})}function m3(i,e={}){var p;if(!Ps())return;const t=Ds();if(t.state!="running"&&(t.resume(),((p=navigator.userActivation)==null?void 0:p.isActive)==!1))return;const n=t.currentTime+Math.max(0,e.delay||0),a=e.loop??!!i.loop,r=Vl(i);if(!a&&Math.abs(n-r.t)<(e.cooldown??.03))return;r.t=n;const s=r.v=e.variant??(r.v+1+(Math.random()*(Ca-1)|0))%Ca;for(;r.on.length>=(e.voices||4);)r.on[0].stop();const o=t.createBufferSource(),l=t.createGain(),c=()=>(cs.delete(h),r.on.splice(r.on.indexOf(h)>>>0,1)),h={node:o,stop(f=.01){const g=t.currentTime;l.gain.setTargetAtTime(0,g,f/5+.001),o.stop(g+f+.01),c()},rate:f=>o.playbackRate.setTargetAtTime(f,t.currentTime,.02)};let d=o.connect(l);if(o.buffer=Xl(i,s),o.loop=a,o.playbackRate.value=e.rate??1,l.gain.value=e.volume??1,e.pan){const f=t.createStereoPanner();f.pan.value=e.pan,d=d.connect(f)}return d.connect(Bi),cs.add(h),r.on.push(h),o.onended=c,o.start(n),h}function Yl(){for(const i of cs)i.stop(0)}var Zl=d3,v3=i=>i.replace(/-(\w)/g,(e,t)=>t.toUpperCase()),g3=(i,e)=>{const t=Array.from({length:e.length+1},(n,a)=>a);for(let n=1;n<=i.length;n++){let a=t[0];t[0]=n;for(let r=1;r<=e.length;r++){const s=t[r];t[r]=Math.min(t[r]+1,t[r-1]+1,a+(i[n-1]==e[r-1]?0:1)),a=s}}return t[e.length]};function _3(i){const e=Zl[v3(i)];if(!e){const t=y3.filter(n=>g3(n,i)<=2||n.includes(i)).slice(0,4);throw new Error(`plinkfx: no sound called "${i}"${t.length?`. Did you mean ${t.join(", ")}?`:""}`)}return e}var Jl=i=>typeof i=="string"?_3(i):i,Ls=(i,e)=>m3(Jl(i),e),x3=(i,e)=>p3(i.map(Jl),e),y3=Object.keys(Zl).map(i=>i.replace(/[A-Z]/g,e=>"-"+e.toLowerCase()));const w3={shovel:{name:"hit",volume:.22,rate:.8,cooldown:.15},pickaxe:{name:"hit-heavy",volume:.28,rate:1.05,cooldown:.25},drill:{name:"ratchet",volume:.16,rate:1.5,cooldown:.08}};function B3(i,e=1){const{name:t,...n}=w3[i],a=Number.isFinite(e)?Math.max(0,Math.min(2,e)):1;Ls(t,{...n,volume:n.volume*a,voices:2})}function z3(i){Ls(i,{volume:.16,voices:1})}function k3(){x3(["hit","hit-heavy","ratchet","click","confirm","error","toggle-on"]);try{hs(localStorage.getItem("dig-muted")==="1")}catch{}}function G3(){const i=!hs();hs(i),i&&Yl();try{localStorage.setItem("dig-muted",i?"1":"0")}catch{}return i}function H3(){Yl()}function V3(){Ls("confirm",{volume:.33,rate:1.3,voices:1})}const Kl=i=>{if(i.maximum<=0||i.current<=0)return 0;const e=100*i.current/i.maximum;return e>70?1:e>40?.9:e>10?.7:.5};function M3(i,e,t){if(!(i>0)||!Number.isInteger(e)||e<0||e>5)throw Error("Invalid mining configuration");const n=Kl(t);return n===0?1/0:3*i*(1-[0,.08,.16,.24,.32,.4][e])/n}function S3(i,e){if(!Number.isInteger(i)||i<0||i>5)throw Error("Invalid enhancement");const t=Kl(e);if(t===0)return 0;const n=[1,1,1,2,2,3][i];return Math.max(1,Math.floor(1+(n-1)*t))}const W3=()=>({progressSeconds:0,mode:"paused"});function X3(i,e){if(!Number.isFinite(e.deltaSeconds)||e.deltaSeconds<0)throw Error("Invalid deltaSeconds");if(!(!e.safety.menuOpen&&e.safety.appFocused&&e.safety.chunksReady&&e.safety.saveHealthy&&e.safety.fallSafe))return{state:{mode:"paused",progressSeconds:0},moveForward:!1,mineBlocks:0};const n=M3(e.baseMineSeconds,e.enhancement,e.tool);if(!Number.isFinite(n))return{state:{mode:"blocked",progressSeconds:0},moveForward:!1,mineBlocks:0};if(!e.solidAhead)return{state:{mode:"moving",progressSeconds:0},moveForward:!0,mineBlocks:0};const a=i.mode==="mining"?i.progressSeconds+e.deltaSeconds:e.deltaSeconds;return a<n?{state:{mode:"mining",progressSeconds:a},moveForward:!1,mineBlocks:0}:{state:{mode:"mining",progressSeconds:0},moveForward:!1,mineBlocks:S3(e.enhancement,e.tool)}}function b3(i,e){if(!Number.isFinite(i)||!Number.isFinite(e))throw Error("Invalid camera orientation");const t=Math.cos(e);return[-Math.sin(i)*t,Math.sin(e),-Math.cos(i)*t]}function Y3(i,e,t,n,a,r,s){if(![t,n,a,r,s].every(Number.isFinite)||r<0||s<0)throw Error("Invalid movement input");const[o,l,c]=b3(i,e),h=Math.cos(i),d=-Math.sin(i),p=o*t+h*n,f=l*t+a,g=c*t+d*n,w=Math.hypot(p,f,g);if(w===0)return[0,0,0];const m=r*s/Math.max(1,w);return[p*m,f*m,g*m]}function Z3(i,e,t=48,n=.15){const a=Math.hypot(i,e);if(a<=t*n)return{x:0,y:0};const r=Math.min(1,(a/t-n)/(1-n));return{x:i/a*r,y:e/a*r}}export{V3 as $,Cc as A,It as B,Je as C,an as D,Il as E,Sl as F,la as G,L3 as H,Nl as I,E3 as J,k3 as K,hs as L,zt as M,G3 as N,dt as O,Rt as P,Ml as Q,F3 as R,A3 as S,N3 as T,U3 as U,L as V,O3 as W,z3 as X,T3 as Y,H3 as Z,b3 as _,mt as a,Fl as b,nt as c,Ss as d,pi as e,D3 as f,Ut as g,I3 as h,W3 as i,Z3 as j,El as k,kt as l,C3 as m,Oh as n,Gi as o,vl as p,B3 as q,pe as r,X3 as s,bs as t,q3 as u,P3 as v,La as w,$h as x,R3 as y,Y3 as z};
