import { convertMineralFuel, type PropulsionState } from './miningMachinePropulsion.ts';

/** Transaction planning only. Caller must atomically persist the ore debit before
 * applying returned propulsion state. Never mutate a saved inventory here.
 */
export type FuelConversionPlan = Readonly<{
  ore: string;
  units: number;
  remaining: number;
  nextPropulsion: PropulsionState;
}>;
export function planMineralFuelConversion(
  propulsion: PropulsionState,
  ore: string,
  availableUnits: number,
  requestedUnits: number,
): FuelConversionPlan | null {
  if (!ore || !Number.isSafeInteger(availableUnits) || availableUnits < 0 ||
      !Number.isSafeInteger(requestedUnits) || requestedUnits <= 0) {
    throw Error('Invalid fuel conversion request');
  }
  if (!Number.isFinite(propulsion.energy) || propulsion.energy < 0 ||
      propulsion.energy > 100) throw Error('Invalid propulsion energy');
  if (requestedUnits > availableUnits) return null;
  const capacity = Math.floor((100 - propulsion.energy) / 10);
  if (requestedUnits > capacity) return null;
  return {
    ore, units: requestedUnits, remaining: availableUnits - requestedUnits,
    nextPropulsion: convertMineralFuel(propulsion, requestedUnits),
  };
}
