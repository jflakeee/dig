# P5 audit

Baseline: e61194a, Integration CI 44429016304 and Browser smoke 44429016456 successful. Three.js r179 retained. Applied performance-optimization and save-systems guidance to source review.

P0: openWorld startup exceptions currently leave blank game if storage is corrupt or blocked; show protected error and never overwrite. Migration not locked at initial startup; verify multi-tab. A fully excavated surface has no safe return; define recovery landing.

P1: measure frame time in largest mine before optimizing. Likely hotspots (not measured): repeated veinDensity per surface vertex, rebuilding dirty meshes synchronously, rescanning all removed ore in world.write, raycast over all meshes. Prioritize based on measurements. Add idle and excavation scenarios; target 33.3 ms mobile, 16.7 ms desktop on physical hardware. Headless SwiftShader timings are regression signals only. Camp geometry fixed at original size; verify expanded mine visuals. HUD and travel buttons need safe-area and touch checks.

P2: art direction and feedback review after safety. No engine upgrade or save reset. No public deploy until release review.
