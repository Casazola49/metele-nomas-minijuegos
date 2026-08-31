# Tasks: Fase 3 — Testing Foundation

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~390–430 (A ~60, B ~110, C ~220) |
| 400-line budget risk | Medium |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 → PR 2 → PR 3 |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| A | Setup | PR 1 | `npx vitest run --passWithNoTests` | `npm run build` + `npx tsc --noEmit` | revert package.json/lock, delete vitest config + setup |
| B | Hook + utils | PR 2 | `npm test -- lib` | `npm test` | delete `lib/*.test.ts` |
| C | Data + shell + config | PR 3 | `npm test` | `npm run test:coverage` | delete `test-helpers/`, `data/*.test.ts`, `GameShell.test.tsx`; revert config.yaml |

## Slice A — Setup

- [ ] Install devDeps in `package.json` (locks `package-lock.json`): `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`, `@vitest/coverage-v8`. <!-- sdd-owner: implementation -->
- [ ] Add scripts to `package.json`: `test` → `vitest run`, `test:watch` → `vitest`, `test:coverage` → `vitest run --coverage`. <!-- sdd-owner: implementation -->
- [ ] Create `vitest.config.ts`: `environment: "jsdom"`, `setupFiles: ["./vitest.setup.ts"]`, `include: ["**/*.test.{ts,tsx}"]`, `globals: true`, alias `@` → repo root (mirrors `tsconfig.json` paths). <!-- sdd-owner: implementation -->
- [ ] Create `vitest.setup.ts` importing `@testing-library/jest-dom/vitest`. <!-- sdd-owner: implementation -->
- [ ] Verify: `npx vitest run --passWithNoTests` boots jsdom config; `npm run lint`, `npx tsc --noEmit`, `npm run build` still pass. <!-- sdd-owner: implementation -->

## Slice B — Hook + Utils

- [ ] Create `lib/useGameTurn.test.ts` via `renderHook`/`act`: `handleStart(4)` yields 4 players, unique ids, `score: 0`, names `JUGADOR 1..4`, idx 0, `isGameOver` false. <!-- sdd-owner: implementation -->
- [ ] Add scenarios: `handleNext("correct")` keeps idx 0 and returns `true`; `handleNext("incorrect")` from idx 0 of 3 rotates to idx 1 and returns `true`. <!-- sdd-owner: implementation -->
- [ ] Add scenarios: last player's `handleNext("incorrect")` sets `isGameOver` true and returns `false`; `incrementScore(1)` then `incrementScore(-2)` → `-1`, no-arg default adds 1. <!-- sdd-owner: implementation -->
- [ ] Create `lib/utils.test.ts`: `cn()` drops `false`/`null`/`undefined`; `cn("px-2","px-4")` keeps `px-4` only. <!-- sdd-owner: implementation -->
- [ ] Verify `npm test -- lib` green. <!-- sdd-owner: implementation -->

## Slice C — Data + Shell + Config

- [ ] Create `test-helpers/data-invariants.ts`: `assertDataInvariants<T extends {id:string}>(data, {requiredFields, custom?})` asserting non-empty, unique ids, required fields. <!-- sdd-owner: implementation -->
- [ ] Create 15 thin `data/*.test.ts` files (celebrities, quotes, headlines, faces, ratings, opinions, brand-colors, countries, foods, ingredients, inventions, movies, products, realOrAi, hangman) importing each export (`faceMashups`, `dishes`, `hangmanWords`, `realOrAiItems`, `brandColors`, …) and asserting invariants + customs: ratings imdb `[0,10]`/rottenTomatoes `[0,100]`; opinions `majority` ∈ {"a favor","en contra"}; brand-colors `hex` `^#[0-9A-Fa-f]{6}$` + `optionHexes` single `hex`; quotes.author, headlines.source, celebrities.name non-empty. <!-- sdd-owner: implementation -->
- [ ] Create `components/game/GameShell.test.tsx` (mock `next/link`; framer-motion/lucide pass through): mount stubs `onStart`/`onReset`, `score 0`, `isGameOver false`; click player-count 2 + `¡Comenzar!` → `onStart(2)`; rerender `feedback: "correct"` → `Siguiente` reachable; rerender `isGameOver: true` → `¡Juego Terminado!` heading, `Jugar de Nuevo` → `onReset`. <!-- sdd-owner: implementation -->
- [ ] Update `openspec/config.yaml`: `strict_tdd: true`, `testing.test_command: "npm test"`, `projects[0].test_command: "npm test"` + `unit: true`, `verify.test_command` → `"npm test"` (keep `build_command`), replace TDD-off rationale comment with note pointing to `npm test`. <!-- sdd-owner: implementation -->
- [ ] Verify `npm test` and `npm run test:coverage` green offline; `npm run lint`, `npx tsc --noEmit`, `npm run build` pass. <!-- sdd-owner: implementation -->

## Post-Apply Review Gates

- [ ] Start or reuse bounded review for PR 1 (Slice A). <!-- sdd-owner: parent -->
- [ ] Start or reuse bounded review for PR 2 (Slice B). <!-- sdd-owner: parent -->
- [ ] Start or reuse bounded review for PR 3 (Slice C). <!-- sdd-owner: parent -->