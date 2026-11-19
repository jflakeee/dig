# P11-D1 Legendary equipment (draft)
Permanent unlocks, not replacements for existing +5 upgrades. Equip one modifier at a time, preserve original tool selection and levels. No random crafting failures or paid chance.
| Modifier | Required tool level | Obsidian heart | Ember crystal | Ancient core | Effect | Tradeoff |
|---|---:|---:|---:|---:|---|---|
| Seismic shovel | 5 | 12 | 3 | 1 | radius x1.25 | interval x1.20 |
| Ember pickaxe | 5 | 16 | 4 | 1 | reach x1.25 | interval x1.10 |
| Core drill | 5 | 20 | 6 | 2 | interval x0.80 | radius x0.90 |
Effects multiply existing craftedTool output; no extra excavation transaction, no bonus ore generation. Each unlock once, consumption computed from unlock IDs and immutable recipe table. Validate available rare resources from Mine 4 excavation records; atomic profile write under existing SAVE lock, reject duplicate unlock and stale baseline. Equip only unlocked matching tool, preserve on reload; no reset or downgrade. Optional absent extension means no unlocks. Keep v2 playable; only v3 can craft. Rare materials not cash-sellable until economy approved.
Test unlock prerequisites, exact cost, insufficient funds, duplicate, save failure, stale tab, legacy compatibility, equip, actual dig volume and mobile controls before deployment.
