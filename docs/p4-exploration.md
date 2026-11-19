# P4 exploration design (proposal)
Preserve the released mine dimensions, ore hash and v1 localStorage key. Never reinterpret old removed indices or sold/crafted ledgers.
## Proposed progression
- Mine 1: original 16x16x12 m, unchanged.
- Mine 2: 24x24x18 m, unlock through a surface expedition gate.
- Mine 3: 32x32x24 m, deeper rare deposits.
- Each mine has a stable ID, independent terrain and deterministic ore generator version; shared economy only via a validated atomic profile migration.
- Keep original key intact until migration is verified. Never duplicate wallet on repeat migration.
## Discovery
New mines use deterministic clustered veins, rare geodes, and visible mineral hints; original mine distribution is unchanged.
## Delivery gates
A: deterministic vein generator and tests (not connected to released terrain).
B: per-mine dimensions and mesh/collision refactor.
C: versioned atomic multi-mine save migration, old-save and multi-tab tests.
D: expedition unlock and return UI.
E: crafted items utility, progression tuning and visual validation.
No real-device performance claim. Larger sizes and unlock economics are provisional.
