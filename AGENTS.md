# AGENTS.md

Guidance for coding agents working in this repository.

## Project Snapshot
- Framework: SvelteKit 2 with Svelte 5 and Vite 7
- Language: TypeScript + Svelte components
- Styling: Tailwind CSS 4 (via @tailwindcss/vite)
- Tests: Vitest + Testing Library
- Package manager: npm is preferred (see scripts in package.json)

## Commands (pnpm)
- dev server: `pnpm dev`
- build: `pnpm build`
- preview production build: `pnpm preview`
- lint: `pnpm lint`
- typecheck: `pnpm check`
- typecheck (watch): `pnpm check:watch`
- tests (watch): `pnpm test`
- tests (run once): `pnpm test:run`
- tests (UI): `pnpm test:ui`

### Single Test Runs (Vitest)
Use pnpm with the Vitest passthrough `--`.
- run a single file: `pnpm test:run -- src/lib/clean-url.test.ts`
- run a single test by name: `pnpm test:run -- -t "cleans Amazon product URL"`
- watch a single file: `pnpm test -- src/lib/clean-url.test.ts`

Notes:
- Use pnpm for all commands.

## Repository Rules
- No Cursor rules found (.cursor/rules/ or .cursorrules not present).
- No GitHub Copilot instructions found (.github/copilot-instructions.md not present).

## Code Style and Conventions
Follow the local style of each file. The repo mixes tabs/spaces and quote styles.

### Formatting
- Svelte files commonly use tabs and single quotes in `<script>`.
- TypeScript files in `src/lib` mix two-space indenting and no semicolons.
- Prefer minimal formatting changes; match existing whitespace and quotes.
- Do not introduce Unicode unless the file already uses it.

### Imports
- Group imports by origin: external packages, Svelte/Kit, then local.
- Use path aliases where available:
  - `$lib` from `svelte.config.js` (`$lib/...`)
  - `$app` alias is set in `vitest.config.ts` for tests
- Use `type` imports for types when possible (see Button.svelte).

### Svelte 5 Runes
- Components use Svelte 5 runes like `$state`, `$derived`, `$props`, `$bindable`.
- Keep runes in `<script lang="ts">` blocks at top of component.
- Use `Snippet` and `{@render}` patterns for component slots.

### TypeScript
- Strict mode is enabled (`tsconfig.json`).
- Prefer explicit types for public APIs and store values.
- Avoid `any`; use `type` aliases and `as const` when appropriate.
- Use `ReturnType<typeof setTimeout>` for timer handles (see `+page.svelte`).

### Naming
- Functions: `camelCase` (e.g., `cleanUrl`, `resetCopyState`).
- Constants: `camelCase` or `SCREAMING_SNAKE` for true constants (see theme.ts).
- Types: `PascalCase` (e.g., `Theme`, `SiteConfig`).
- Svelte components: `PascalCase` file names (`Button.svelte`).

### Error Handling and Edge Cases
- Guard against browser-only APIs with `browser` checks (`$app/environment`).
- Use `try/catch` around clipboard and URL parsing operations.
- On errors, prefer non-throwing behavior and preserve user input where reasonable.
- Keep console error logging minimal and user-focused.

### Testing
- Tests live in `src/**/*.{test,spec}.{js,ts}`.
- Use Vitest globals (`describe`, `it`, `expect`).
- Keep test descriptions clear and scenario-focused.
- Prefer explicit expected URLs over snapshot testing.

### Tailwind + UI Utilities
- Tailwind class strings are long; keep them as single strings unless clarity suffers.
- Utility `cn` is available in `src/lib/utils.ts` for class merging.
- Use `class-variance-authority` for variant-driven components (see Button).

### SvelteKit Routes
- Routes live in `src/routes/` and use `+page.svelte`, `+layout.svelte`, etc.
- `+layout.ts` uses `export const prerender = true;` to keep site static.

### Config and Metadata
- Site metadata lives in `src/lib/site-config.ts`.
- When updating metadata, keep `as const` typing and `SiteConfig` export intact.

## Practical Editing Tips
- Avoid reformatting unrelated sections.
- Match existing indentation and quote style within each file.
- Keep linting expectations in mind (`eslint.config.mjs` uses Next rules, but
  SvelteKit is the runtime; do not try to "fix" this unless asked).

## File References (useful paths)
- Svelte entry: `src/routes/+page.svelte`
- Theme store: `src/lib/theme.ts`
- URL cleaner: `src/lib/clean-url.ts`
- Tests: `src/lib/clean-url.test.ts`
- UI components: `src/lib/components/ui/*.svelte`
- Tailwind/utility helpers: `src/lib/utils.ts`
- Configuration: `svelte.config.js`, `vite.config.ts`, `vitest.config.ts`

## When Adding New Code
- Follow Svelte 5 rune patterns used in existing components.
- Prefer `$lib` imports for internal modules.
- Keep DOM-access or `localStorage` guarded by `browser` checks.
- Update tests when altering URL cleaning behavior.

## When Running Checks
- Run `npm run lint` for style issues.
- Run `npm run check` for Svelte type checks.
- Use `npm run test:run` for CI-like test execution.

## Notes for Agents
- The codebase is small; read the target file first and mirror its style.
- Do not introduce new formatting or tooling unless requested.
