# P5 integration review — 2026-11-19
Baseline reviewed: bf5f65a.
- Integration CI 44466088387: 68/68 tests, build successful.
- Browser smoke 44466088255: desktop and iPhone 13 emulation in Chromium/SwiftShader passed gameplay and corrupt-save protection.
- Mine 3 idle 120 rAF samples: desktop mean 56.169 ms, p95 133.3 ms, max 150 ms; mobile mean 55.198 ms, p95 116.7 ms, max 383.3 ms.
- Initial P5 baseline mean 64.371/57.468 ms. Single CI samples are not controlled benchmarks; no real-device FPS claims.
- Remaining: physical mobile GPU, actual multitouch, visual screenshot inspection, repeat performance samples, latest dependency audit, cross-session legacy migration conflict and full excavation return behavior.
- Main and public Pages remain unchanged. Do not label production-ready or merge solely on smoke results.
- P5 implementation complete; real-device acceptance remains open. Target 30 FPS mobile, 60 FPS desktop, not demonstrated.
