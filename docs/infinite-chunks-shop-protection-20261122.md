> **SUPERSEDED (2026-11-22):** 매점 건물·보호구역을 제거하고 메뉴형 상점으로 변경했습니다. 최신 설계: [무한 지하 월드](infinite-underground-world-20261122.md). 이 문서는 이전 설계 이력으로만 보존합니다.

# Infinite chunks and shop protection — implementation contract (2026-11-22)

Status: design specification; runtime implementation and validation pending. Branch: `feat/infinite-chunks-shop-protection-20261122`.

## Confirmed gameplay constraints
- Player height: 1 metre (world-unit calibration required before changing movement/collision).
- Minimum mineable voxel edge: 0.5 metres.
- Mining action duration: 3× existing baseline; apply once at the shared mining timer, preserving upgrade modifiers.
- Procedural world is unbounded horizontally; only nearby chunks reside in memory.
- Shop is a non-mineable safe zone.

## Proposed technical defaults (subject to profiling)
- Horizontal chunk footprint: 16m × 16m; use integer world voxel coordinates and floor division for negative positions.
- Active chunks: 3×3 around player; separate preload/unload hysteresis to prevent oscillation.
- Shop protection: 10m horizontal radius from each shop centre, **plus supporting ground/structure**. Treat any voxel whose bounding box intersects the protected cylinder as protected; this prevents half-block exploits.
- For any mining request, verify world and chunk ID, protected-zone overlap, mining duration, and whether voxel is still present **immediately before committing removal**. Do not rely on UI disabled state.
- Do not apply a protected-zone test only to loaded chunks: safe-zone geometry is world metadata.
- Persist only edited voxel deltas per stable world seed and chunk key; generation remains deterministic. Keep existing save schema readable, introduce optional fields and migrate lazily.
- Before unloading a dirty chunk, commit edits to the save queue and retain them until durable persistence succeeds; failed writes must not silently discard changes.
- Keep generated chunks and geometry in a bounded cache; dispose Three.js geometries/material resources when no longer referenced. Spread generation over frames.

## Required tests before merge
1. Mine attempt at shop centre, boundary, below shop and across chunk boundary is rejected.
2. Mine attempt just outside the zone succeeds when tool requirements are met.
3. Crossing negative coordinates yields unique, stable chunk keys.
4. Re-entering an unloaded chunk restores mined voxels, including after reload.
5. Save failure preserves pending changes and old saves still load.
6. Fast movement does not generate stale visible chunks or duplicate geometry.
7. Mobile portrait/landscape controls, rendering and FPS are checked separately.

## Rollout
1. Inspect `src/main.ts` and existing world/save modules; record actual coordinate scale and shop placement.
2. Add pure coordinate/protection functions and unit tests.
3. Integrate with mining commit path and chunk lifecycle.
4. Validate locally (TypeScript build, Node tests, Playwright Chromium smoke).
5. Merge only after passing tests; confirm GitHub Actions deployment and actual Pages playability.

Do not label implementation, tests or deployment complete until separately verified.
