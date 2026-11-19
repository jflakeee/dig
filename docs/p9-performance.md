# P9 mobile performance

Baseline P8 final software WebGL: desktop mean 161.88 ms, mobile 134.20 ms; previous P8 run 52.11/46.39 ms. Runner variation prevents causal attribution. Preserve save formats and gameplay.

- A: establish counters and repeatable workloads.
- B: cache deterministic biome palette and discovery descriptors.
- C: reduce terrain rebuild allocations; preserve mesh output.
- D: profile shadow, shader and draw-call costs before changing quality.
- E: verify mobile input, save compatibility, cave interactions and release.

Physical device FPS and direct visual checks remain outstanding. Main remains unchanged during development.
