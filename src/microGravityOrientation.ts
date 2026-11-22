import type { Vec3 } from './zeroGravityMovement.ts';
export type GravityOrientation = Readonly<{ yaw: number; pitch: number }>;
/** Turn the machine's forward (-Z) axis toward the local gravity vector. */
export function faceMicroGravity(
  current: GravityOrientation, gravity: Vec3, dt: number,
): GravityOrientation {
  if (![current.yaw,current.pitch,...gravity,dt].every(Number.isFinite)||dt<0||dt>0.1)
    throw Error('Invalid orientation input');
  const length=Math.hypot(...gravity);
  if(length<0.008||dt===0)return current;
  const targetYaw=Math.atan2(-gravity[0],-gravity[2]);
  const targetPitch=Math.asin(Math.max(-1,Math.min(1,gravity[1]/length)));
  const shortest=Math.atan2(Math.sin(targetYaw-current.yaw),Math.cos(targetYaw-current.yaw));
  const turn=Math.min(1,dt*1.2);
  return {
    yaw:current.yaw+shortest*turn,
    pitch:Math.max(-1.5,Math.min(1.5,current.pitch+(targetPitch-current.pitch)*turn)),
  };
}
