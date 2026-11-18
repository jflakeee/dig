# DIG system map — 2026-11-18
Manual source audit and proposed target architecture; CCGS CLI not executed.
Evidence: src/main.ts, index.html, package.json, project.yaml, .github/workflows/build.yml, docs/project-stage-detect-20261118.md.
Status: I=initial implementation, P=partial, N=not implemented; no status implies runtime verification.

| ID | System | Status | Priority |
|---|---|---|---|
| S01 | 3D rendering | I | P0 |
| S02 | Voxel terrain | I | P0 |
| S03 | Chunk remesh | I | P0 |
| S04 | Smooth terrain | N | P0 |
| S05 | Excavation | I | P0 |
| S06 | Collision | P | P0 |
| S07 | Caves | N | P2 |
| S08 | Camera | I | P0 |
| S09 | Movement/gravity | P | P0 |
| S10 | Touch input | P | P1 |
| S11 | Joystick | N | P1 |
| S12 | Jump/return | N | P0 |
| S13 | Tools | N | P1 |
| S14 | Lighting | N | P1 |
| S15 | Ore | N | P2 |
| S16 | Rare resources | N | P2 |
| S17 | Inventory | N | P2 |
| S18 | Economy | N | P2 |
| S19 | Upgrades | N | P2 |
| S20 | Crafting | N | P2 |
| S21 | Region unlock | N | P3 |
| S22 | Automation | N | P3 |
| S23 | Quests | N | P3 |
| S24 | Terrain materials | P | P1 |
| S25 | Particles | N | P1 |
| S26 | Models/animation | N | P3 |
| S27 | plinkfx | P | P1 |
| S28 | dream-loop | N | P3 |
| S29 | Environment FX | N | P3 |
| S30 | Save/restore | P | P0 |
| S31 | Save concurrency | N | P0 |
| S32 | Mobile optimization | N | P0 |
| S33 | Regression tests | N | P0 |
| S34 | Build/deploy | I | P0 |
| S35 | Native packaging | N | P3 |
| S36 | Settings | N | P1 |

## Dependency and acceptance gates
Shared terrain density/occupancy -> mesh and collision -> excavation -> resource accounting and persistence -> economy/progression. Resource changes and terrain changes must commit consistently. Preserve v1 removed-index saves.
- P0-A: branch-only CI; baseline tests for v1 decode, invalid saves, index boundaries, excavation and dirty neighbors.
- P0-B: isolate terrain/save logic; failure injection and stale writer tests; explicit save error, no silent overwrite.
- P0-C: smooth mesh prototype with boundary and occupancy agreement tests; tunnel/overhang checks.
- P0-D: safe surface return, input cancellation, mobile browser smoke tests and measured FPS.
- P1: joystick, headlamp, tools, feedback and audio.
- P2: ore, inventory, economy, upgrades and crafting.
- P3: visual iteration, expansion and packaging.
Main and public deployment preserved. Existing main CI succeeded; integration CI and device checks pending. No gameplay implementation in this documentation commit.
