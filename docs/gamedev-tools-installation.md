# Game-development tools

This repository includes three game-development toolsets:

1. **Awesome GameDev Agent Skills** — 18 selected skills are installed in `.claude/skills/` and routed by `.claude/skills/router/`. The selection and pinned upstream revision are documented in `docs/gamedev-skills.md`.
2. **Claude Code Game Studios** — tracked as a Git submodule at `third_party/Claude-Code-Game-Studios`. It is a standalone Claude Code project template, not a drop-in plugin. Keeping it separate prevents its agents, hooks, settings, and starter workflow from replacing DIG's existing `.claude/` setup.
3. **Claude GameDev Kit** — registered as a project marketplace and enabled in `.claude/settings.json`. Claude Code installs/loads the project plugin when opening the repository and accepting its marketplace trust prompt.

## Initialize the template source

```sh
git submodule update --init --recursive
```

## Install the plugin manually

If Claude Code does not offer to install the project plugin, run these commands from the repository root:

```sh
claude plugin marketplace add dudwns0921/claude-gamedev-kit
claude plugin install gamedev-kit@claude-gamedev-kit --scope project
```

The plugin requires Claude Code. Python 3, Bash, and Chrome/Chromium are listed by the Game Studios template for its full workflow. No dependency installation scripts were run as part of this setup.
