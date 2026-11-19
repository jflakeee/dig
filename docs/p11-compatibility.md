# P11-B1 compatibility audit
Current v2 codec explicitly accepts exactly three mines and active 1–3; retain this contract until migration is implemented. New catalog extraction is behavior-preserving, not a fourth mine release.
- expedition: unlock range and loops use catalog; migration must distinguish old and expanded profile.
- mineOres: cache and inventory loops follow catalog; old profile arrays need normalization before iteration.
- worldSession: commits compare both legacy source and raw profile; preserve single-writer lock and failure protection.
- profileEconomy: reconstructed ore totals must remain identical for old mines.
- journal: catalog explicitly enumerates 2,3; append new IDs only, never regenerate old IDs.
- objectives/travel: derive new targets only once expanded profile exists.
- cave masking: natural voids must remain separate from excavation rewards.
Next: version codec/migration and fixture tests before enabling Mine 4. Old clients must reject expanded payload rather than overwrite it. Keep existing storage key for conflict detection. Actual device and cave claim tests outstanding.
