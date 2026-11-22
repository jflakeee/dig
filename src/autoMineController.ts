import { miningSeconds, maxBlocksPerAction, type ToolDurability } from './miningDurability';

export type AutoMineMode = 'paused' | 'moving' | 'mining' | 'blocked';
export type AutoMineSafety = {
  menuOpen: boolean;
  appFocused: boolean;
  chunksReady: boolean;
  saveHealthy: boolean;
  fallSafe: boolean;
};
export type AutoMineInput = {
  deltaSeconds: number;
  solidAhead: boolean;
  safety: AutoMineSafety;
  tool: ToolDurability;
  enhancement: number;
  baseMineSeconds: number;
};
export type AutoMineState = { progressSeconds: number; mode: AutoMineMode };
export type AutoMineDecision = {
  state: AutoMineState;
  moveForward: boolean;
  mineBlocks: number;
};
export const initialAutoMineState = (): AutoMineState => ({ progressSeconds: 0, mode: 'paused' });

// A pure state transition. The caller must commit block removal/rewards/durability
// atomically before treating a mineBlocks request as a completed mining action.
export function stepAutoMine(state: AutoMineState, input: AutoMineInput): AutoMineDecision {
  if (!Number.isFinite(input.deltaSeconds) || input.deltaSeconds < 0) throw Error('Invalid deltaSeconds');
  const safe = !input.safety.menuOpen && input.safety.appFocused &&
    input.safety.chunksReady && input.safety.saveHealthy && input.safety.fallSafe;
  if (!safe) return { state: { mode: 'paused', progressSeconds: 0 }, moveForward: false, mineBlocks: 0 };
  const duration = miningSeconds(input.baseMineSeconds, input.enhancement, input.tool);
  if (!Number.isFinite(duration)) return { state: { mode: 'blocked', progressSeconds: 0 }, moveForward: false, mineBlocks: 0 };
  if (!input.solidAhead) return { state: { mode: 'moving', progressSeconds: 0 }, moveForward: true, mineBlocks: 0 };
  const progress = state.mode === 'mining' ? state.progressSeconds + input.deltaSeconds : input.deltaSeconds;
  if (progress < duration) return { state: { mode: 'mining', progressSeconds: progress }, moveForward: false, mineBlocks: 0 };
  return {
    state: { mode: 'mining', progressSeconds: 0 },
    moveForward: false,
    mineBlocks: maxBlocksPerAction(input.enhancement, input.tool),
  };
}
