# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`makepass` is a single-file Bun-native CLI password/token generator. All logic lives in `src/index.ts`.

## Commands

- Install deps: `bun install`
- Type-check: `bunx tsc --noEmit` (Bun performs the actual bundling/emit, `tsc` is type-check only — `noEmit` is set in `tsconfig.json`)
- Run from source: `bun run dev` (`bun run src/index.ts`)
- Build bundled JS: `bun run build` (`bun build ./src/index.ts --outdir build`, produces `build/index.js`)
- Run the built bundle: `bun run start`
- Compile a standalone native binary: `bun run compile` (`bun build --compile`, outputs `./makepass`)

There is no test suite configured.

## Architecture

- `src/index.ts` is the entire application. Flags are parsed once at module load with Node's built-in `node:util` `parseArgs` (`-l/--length`, `-s/--symbols`, `-C/--no-caps`, `-N/--no-numbers`, `-g/--secret`, `-i/--interactive`), then execution branches on `values.interactive`:
  - **Default (non-interactive)** (`runNonInteractive`): password generated straight from the parsed flags (or their defaults) and printed to stdout — used for scripting, and the default when no args are given.
  - **`-i`/`--interactive`** (`runInteractive`): uses `@clack/prompts` (`intro`/`group`/`text`/`confirm`/`outro`) to walk the user through the same options interactively.
  - Both paths converge on the shared `generatePassword()` function.
- `-g/--secret` is a shortcut in both paths that overrides other options to force a 32-character alphanumeric-with-caps secret (no symbols).
- The module uses top-level `await` (interactive path), which requires `module`/`target` set to ESNext in `tsconfig.json` and `"type": "module"` in `package.json`.
- `package.json` `bin.makepass` points at `build/index.js`, so publishing requires `bun run build` first (not needed for the standalone `bun run compile` binary, which is self-contained).
- The `Dockerfile` builds a multi-stage image on `oven/bun` that compiles a standalone binary via `bun build --compile` and copies just that binary into a distroless runtime — no Node/Bun runtime or `node_modules` needed at runtime.
