import { MICRO_GRAVITY_DIRECTION_THRESHOLD } from './chunkMicroGravity.ts';
import type { Vec3 } from './zeroGravityMovement.ts';
export type GravityOrientation = Readonly<{ yaw: number; pitch: number }>;
/** Turn the machine's forward (-Z) axis toward the local gravity vector. */
export function faceMicroGravity(
  current: GravityOrientation, gravity: Vec3, dt: number,
): GravityOrientation {
  if (![current.yaw,current.pitch,...gravity,dt].every(Number.isFinite)||dt<0||dt>0.1)
    throw Error('Invalid orientation input');
  const length=Math.hypot(...gravity);
  if(length<MICRO_GRAVITY_DIRECTION_THRESHOLD||dt===0)return current;
  // Near vertical gravity has no meaningful yaw; retain heading to prevent spinning.
  const horizontal=Math.hypot(gravity[0],gravity[2]);
  const targetYaw=horizontal<length*0.05?current.yaw:Math.atan2(-gravity[0],-gravity[2]);
  const targetPitch=Math.max(-1.5,Math.min(1.5,Math.asin(Math.max(-1,Math.min(1,gravity[1]/length)))));
  const shortest=Math.atan2(Math.sin(targetYaw-current.yaw),Math.cos(targetYaw-current.yaw));
  // Exponential smoothing keeps the turn rate consistent across 30/60/120 FPS.
  const turn=-Math.expm1(-1.2*dt);
  // A hard angular cap prevents sudden camera swings at a chunk transition.
  const maxTurn=0.9*dt;
  const desiredYawStep=shortest*turn;
  const desiredPitchStep=(targetPitch-current.pitch)*turn;
  // Cap the combined yaw/pitch change, not each axis independently.
  const requestedTurn=Math.hypot(desiredYawStep,desiredPitchStep);
  const scale=requestedTurn>maxTurn?maxTurn/requestedTurn:1;
  const yawStep=desiredYawStep*scale;
  const pitchStep=desiredPitchStep*scale;
  return {
    yaw:current.yaw+yawStep,
    pitch:Math.max(-1.5,Math.min(1.5,current.pitch+pitchStep)),
  };
}
