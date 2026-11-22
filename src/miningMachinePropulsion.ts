/** Mining-machine propulsion: dust is reaction mass, not free energy.
 * The emergency drive guarantees basic mobility without spending saleable ore.
 * This module is deliberately independent of save/inventory accounting.
 */
export type PropulsionState = Readonly<{ dust: number; energy: number }>;
export const INITIAL_PROPULSION: PropulsionState = { dust: 0, energy: 100 };
export const BASE_SPEED = 3;
export function collectDust(state: PropulsionState, removedBlocks: number): PropulsionState {
  if (!Number.isFinite(removedBlocks) || removedBlocks < 0) throw Error('Invalid mined block count');
  return { ...state, dust: Math.min(100, state.dust + Math.floor(removedBlocks) * 0.5) };
}
export function propulsionStep(
  state: PropulsionState, deltaSeconds: number, boosting: boolean,
): { state: PropulsionState; speed: number; emergency: boolean } {
  if (!Number.isFinite(deltaSeconds) || deltaSeconds < 0) throw Error('Invalid elapsed time');
  const dt = Math.min(deltaSeconds, 0.1);
  // The backup system recharges slowly; basic movement never consumes inventory.
  const energy = Math.min(100, state.energy + dt * 2);
  if (!boosting || state.dust < dt * 4 || energy < dt * 8) {
    return { state: { dust: state.dust, energy }, speed: BASE_SPEED, emergency: true };
  }
  return {
    state: { dust: Math.max(0, state.dust - dt * 4), energy: Math.max(0, energy - dt * 8) },
    speed: BASE_SPEED * 1.5,
    emergency: false,
  };
}
