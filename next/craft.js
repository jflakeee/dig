// Crafting from collected minerals and the automatic hull repair.
// Recipes and repair amounts are trial values.
export const craftRecipes = {
  drill_head: {iron: 2, wolframite: 1, rock: 5},
  aux_drill: {iron: 4, copper_ore: 2, rock: 6},
  focus_lamp: {quartz: 2, copper_ore: 1, rock: 3},
  chain_winder: {iron: 5, rock: 4},
  gravity_array: {nickel_ore: 1, quartz: 2, copper_ore: 2},
  cargo_coupler: {iron: 3, rock: 5},
  buffer_gripper: {copper_ore: 1, graphite: 2, rock: 3},
  seal_cartridge: {kaolinite: 2, chromite: 1, rock: 3},
};
// The hull mends itself from cargo below this mark, cheapest material first.
export const hullRepairBelow = 95;
export const hullRepairs = [{cost: {rock: 2}, gain: 5}, {cost: {iron: 1}, gain: 10}];
export const owned = (s, id) => id === 'rock' ? s?.rocks ?? 0 : s?.minerals?.[id] ?? 0;
export const affords = (s, cost) => Object.entries(cost).every(([id, n]) => owned(s, id) >= n);
// The repair the cargo can pay for now, or null.
export const hullRepairFor = s => hullRepairs.find(r => affords(s, r.cost)) ?? null;
