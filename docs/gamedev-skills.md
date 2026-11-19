# GameDev Agent Skills integration

Upstream: https://github.com/gamedev-skills/awesome-gamedev-agent-skills
Pinned revision: c6ca6c41c839b68319ffc08430b99ab768debc32
License: Apache-2.0; see third_party/awesome-gamedev-agent-skills/.

Manual project-local installation: router plus 18 selected complete skill folders in .claude/skills/. Other engines and unrelated skills intentionally excluded. Upstream catalog paths map to flattened local folders by skill name. Router may suggest uninstalled skills; inspect upstream or install them before using. DIG uses Three.js 0.179.1 (r179), older than upstream r187; verify pinned APIs and keep the engine, save compatibility, existing mobile controls and deployment. Existing CCGS process, dream-loop visual workflow and PlinkFX remain in place. Do not run bundled scripts without review; no npm dependencies changed. Claude Code runtime discovery not tested. Codex can use copies under .agents/skills/ or upstream CLI.

Read selected skill and relevant references before implementation. For P4 release, prioritize save-systems, performance-optimization, threejs-scene-setup, input-systems and game-ui-ux. Verify actual tests, commits and deployment separately.
