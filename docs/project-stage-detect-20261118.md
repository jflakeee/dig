# DIG stage detection — 2026-11-18

Stage: Prototype (manual source audit; CCGS CLI not executed). Concept and pre-production are preliminary, not approved gates.

Evidence: src/main.ts, package.json, project.yaml, .github/workflows/build.yml on chore/toolchain-integration. Main Actions runs 44289976937 and 44290098053 completed successfully; integration branch build and real device behavior not verified.

Implemented in source: first-person rendering, block voxel chunks, digging, movement/gravity, sampled occupancy collision, touch direction buttons/look, localStorage v1 removed indices, plinkfx hook (integration only). Missing: smooth density terrain, joystick, escape/jump, ores, inventory, economy, upgrades, caves, regression tests.

P0 risks: storage failures and multiple tabs, no escape route, collision/mesh consistency, synchronous remeshing and writes, pointer cancellation, underground lighting. Preserve v1 saves and public main. Next: map systems, isolate terrain/save/input logic, add tests and branch-only CI, prototype smooth local meshing and collision, device verification. Do not claim deployment of integration branch or real play until measured.
