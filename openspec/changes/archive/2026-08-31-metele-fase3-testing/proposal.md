# Proposal: Fase 3 — Testing Foundation

## Intent

Add automated regression coverage before more game work. `useGameTurn` and `GameShell` currently lack executable coverage, allowing turn, score, lifecycle, and data bugs to reach verification. Runtime behavior remains unchanged.

## Scope

### In Scope
- Add Vitest, React Testing Library, jsdom, jest-dom, user-event, and V8 coverage as devDependencies.
- Add `vitest.config.ts`, jest-dom setup, and `test`, `test:watch`, and `test:coverage` scripts.
- Test `lib/useGameTurn.ts` for start/reset, correct-turn retention, incorrect rotation, last incorrect game-over, and score increments.
- Test `lib/utils.ts` `cn()`, all 15 `data/*.ts` exports for non-empty arrays, unique IDs, and required schema fields, and `GameShell`'s start → playing → gameover flow.
- Set `strict_tdd: true`, `testing.test_command: "npm test"`, and root `projects[].unit: true` in `openspec/config.yaml`.

### Out of Scope

Real assets, runtime game-logic changes, Playwright E2E, Vercel deployment, backend, persistence, network calls, and broad visual/accessibility coverage.

## Capabilities

### New Capabilities
- None; this is test infrastructure, not a user-facing behavior contract.

### Modified Capabilities
- None; existing minigame requirements remain unchanged.

## Approach

Run Vitest in jsdom with shared jest-dom setup. Exercise the hook with `renderHook`/`act`, simulate shell controls with user-event, and mock only framework-bound animation/router modules when necessary. Validate shared data invariants plus each module's required fields. Keep tests near protected units and make `npm test` canonical.

## Affected Areas

| Area | Impact |
|---|---|
| `package.json`, lockfile | Dependencies and scripts. |
| `vitest.config.ts`, setup file | Runner and DOM configuration. |
| `lib/*.test.ts`, `data/*.test.ts`, `components/game/GameShell.test.tsx` | Hook, utility, data, and shell coverage. |
| `openspec/config.yaml` | TDD and unit-test metadata. |

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| React 19/Next or animation imports complicate jsdom | Medium | Mock framework-bound modules; assert behavior. |
| Data schemas differ across modules | Medium | Shared checks plus per-module fields. |
| 400-line review budget may be exceeded | High | Forecast setup, unit/data, and component slices; ask before apply. |

## Rollback Plan

Revert implementation and lockfile changes, remove test files/config, and restore disabled TDD/unit metadata. No production migration is required.

## Success Criteria

- [ ] `npm test` passes deterministically for hook, utility, data, and shell tests.
- [ ] `npm run test:coverage` produces V8 coverage offline.
- [ ] `npm run lint`, `npx tsc --noEmit`, and `npm run build` still pass.
- [ ] OpenSpec reports root unit testing enabled with `npm test`.
