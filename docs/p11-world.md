# P11 — Beyond the deep mine (draft)
Baseline: P10 main ee62fa6, 90 tests, Pages deployment successful.
## Proposed progression
1. Existing Mine 1–3 unchanged.
2. Mine 4: volcanic ruins, obsidian formations, ancient machinery.
3. Mine 5: forgotten crystalline sanctuary, final relic and expedition ending.
4. Optional post-ending exploration; no mandatory reset or loss of equipment.
## Delivery gates
A. Audit all hardcoded three-mine assumptions, save codecs, unlock thresholds, ledger, journal, travel UI, worldgen, test fixtures. Document migration before implementation.
B. Introduce versioned extensible mine catalog and backward-compatible migration; initially ship one new mine behind progression. Bound active terrain memory and chunk mesh budget; prefer distinct content over larger dimensions.
C. Introduce new resources only after inventory, sale and craft compatibility analysis. Deterministic rarity; simulate supply and spending before setting prices.
D. Legendary equipment: sidegrades with meaningful tradeoffs; preserve +0–5 upgrades and existing crafted effects.
E. Ending and postgame: persistent completion marker, no forced reset or reward duplication.
F. Regression gates: old saves, migration failure, concurrent tabs, exploration claims, UI at 844x390 and smaller landscape, browser performance comparisons.
## Constraints
No destructive migration, no rewriting old mine terrain or rewards, no paid random rewards. Natural voids excluded from excavated indices. Maintain main until verified. Actual phone testing, direct cave claim browser tests and screenshot review remain outstanding. Prioritize those gaps before release. Mine themes, dimensions, unlock thresholds, new ore prices and ending are provisional; do not change economy without simulation.
