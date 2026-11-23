// Pure durability rules for the next DIG world mode.
// This module does not mutate legacy saves or activate the new mining loop.
export type ToolDurability = {
  current: number;
  maximum: number;
  originalMaximum: number;
};
export const wearMultiplier = (tool: ToolDurability): number => {
  if (tool.maximum <= 0 || tool.current <= 0) return 0;
  const percent = 100 * tool.current / tool.maximum;
  return percent > 70 ? 1 : percent > 40 ? .9 : percent > 10 ? .7 : .5;
};
export function miningSeconds(baseSeconds: number, enhancement: number, tool: ToolDurability): number {
  if (!(baseSeconds > 0) || !Number.isInteger(enhancement) || enhancement < 0 || enhancement > 5) throw Error('Invalid mining configuration');
  const performance = wearMultiplier(tool);
  return performance === 0 ? Infinity : 3 * baseSeconds * (1 - [0, .08, .16, .24, .32, .40][enhancement]) / performance;
}
export function maxBlocksPerAction(enhancement: number, tool: ToolDurability): number {
  if (!Number.isInteger(enhancement) || enhancement < 0 || enhancement > 5) throw Error('Invalid enhancement');
  const performance = wearMultiplier(tool);
  if (performance === 0) return 0;
  const max = [1, 1, 1, 2, 2, 3][enhancement];
  return Math.max(1, Math.floor(1 + (max - 1) * performance));
}
export function consumeDurability(tool: ToolDurability, blockWear: number): ToolDurability {
  if (!Number.isInteger(blockWear) || blockWear < 1) throw Error('Invalid block wear');
  return { ...tool, current: Math.max(0, tool.current - blockWear) };
}
export function repairDurability(tool: ToolDurability): ToolDurability | null {
  if (tool.current >= tool.maximum || tool.maximum <= tool.originalMaximum * .5) return null;
  const maximum = Math.max(tool.originalMaximum * .5, tool.maximum - tool.originalMaximum * .01);
  return { ...tool, maximum, current: maximum };
}
