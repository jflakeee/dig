import { DIG_4D_TRAIN_SAVE_KEY, DIG_4D_TRAIN_SAVE_VERSION } from './saveNamespace';
import type { SessionMineral } from './sessionChunks';

export type TrainSaveState = Readonly<{
  version: number;
  equipment: Readonly<{
    drillEnhancement: number;
    drillCount: number;
  }>;
  inventory: Readonly<Record<SessionMineral, number>>;
  research: readonly string[];
  codex: readonly string[];
}>;

export type TrainSaveResult = 'saved' | 'conflict' | 'failed' | 'protected';

export type TrainSaveStore = Readonly<{
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}>;

export function initialTrainSaveState(): TrainSaveState {
  return {
    version: DIG_4D_TRAIN_SAVE_VERSION,
    equipment: { drillEnhancement: 0, drillCount: 1 },
    inventory: { rock: 0, coal: 0, iron: 0, gold: 0, rare: 0 },
    research: [],
    codex: [],
  };
}

/**
 * Load only train-carried progress. Chunk terrain, world position, portal
 * links, and generation seeds are intentionally absent from this format.
 */
export function openTrainSave(store: TrainSaveStore) {
  let baseline: string | null = null;
  let state = initialTrainSaveState();
  let readable = true;
  let isReconnect = false;

  try {
    baseline = store.getItem(DIG_4D_TRAIN_SAVE_KEY);
    if (baseline !== null) {
      isReconnect = true;
      state = validateTrainSave(JSON.parse(baseline));
    }
  } catch {
    readable = false;
    state = initialTrainSaveState();
  }

  return {
    state,
    isReconnect,
    get readable() {
      return readable;
    },
    save(next: TrainSaveState): TrainSaveResult {
      if (!readable) return 'protected';
      try {
        const currentRaw = store.getItem(DIG_4D_TRAIN_SAVE_KEY);
        if (currentRaw !== baseline) return 'conflict';
        const validated = validateTrainSave(next);
        const raw = JSON.stringify(validated);
        store.setItem(DIG_4D_TRAIN_SAVE_KEY, raw);
        baseline = raw;
        state = validated;
        return 'saved';
      } catch {
        return 'failed';
      }
    },
    get current(): TrainSaveState {
      return state;
    },
  };
}

export function validateTrainSave(value: unknown): TrainSaveState {
  if (!isRecord(value) || value.version !== DIG_4D_TRAIN_SAVE_VERSION ||
      !isRecord(value.equipment) || !isRecord(value.inventory) ||
      !Array.isArray(value.research) || !Array.isArray(value.codex)) {
    throw new Error('Invalid train save structure');
  }

  const drillEnhancement = value.equipment.drillEnhancement;
  const drillCount = value.equipment.drillCount;
  if (!Number.isInteger(drillEnhancement) || drillEnhancement < 0 || drillEnhancement > 5 ||
      !Number.isInteger(drillCount) || drillCount < 1 || drillCount > 5) {
    throw new Error('Invalid train equipment');
  }

  const inventory = {} as Record<SessionMineral, number>;
  for (const mineral of ['rock', 'coal', 'iron', 'gold', 'rare'] as const) {
    const amount = value.inventory[mineral];
    if (!Number.isSafeInteger(amount) || amount < 0) throw new Error('Invalid train inventory');
    inventory[mineral] = amount;
  }

  const research = validateIds(value.research);
  const codex = validateIds(value.codex);
  return {
    version: DIG_4D_TRAIN_SAVE_VERSION,
    equipment: { drillEnhancement, drillCount },
    inventory,
    research,
    codex,
  };
}

function validateIds(value: unknown): string[] {
  if (!Array.isArray(value) || value.length > 10000 ||
      !value.every((entry) => typeof entry === 'string' && /^[a-zA-Z0-9._:-]{1,96}$/.test(entry))) {
    throw new Error('Invalid train progression identifiers');
  }
  return [...new Set(value)];
}

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
