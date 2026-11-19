# P8 exploration design (draft)

Goal: excavation, surprise, discovery, upgrades, deeper exploration. Preserve existing v1/v2 saves, ore IDs and inventory reconstruction.

## Sequence
B deterministic cave candidates; C crystal clusters; D relics; E caches; F biomes; G journal; H regression and release.

## Compatibility
Do not insert natural voids into profile.mines removed indices: those indices award ore and unlock travel. Introduce separate deterministic feature descriptors; initial caves require a separate occupancy mask and collision/render agreement. Existing profiles without explicit world-generation version retain old terrain; new generation must opt in via a versioned field. No retrofit that deletes terrain, changes existing ore values, or invalidates saves. Discovery claims derived from stable feature IDs, persisted atomically with rewards under existing SAVE lock. Validate IDs, bounds and uniqueness; old saves default to empty journal. No monetized random rewards.

## Provisional depth bands (meters)
0–3 ordinary ores; 3–6 small caverns; 6–9 clusters and caches; 9–12 relics; 12–18 crystal chambers; 18–24 special strata and rare relics. Actual accessibility depends on mine height. All values subject to balancing.

## Release gates
Determinism, bounds, no impossible spawn, no ore attribution to natural voids, no progression credit from natural voids, no duplicate claims, save failures and old saves, mobile reachability and browser regression. Main stays unchanged until review. Physical GPU performance remains unverified.
