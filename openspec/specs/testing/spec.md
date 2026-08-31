# Testing Specification

## Purpose

Defines the automated regression coverage required for the Metele Nomás hub: a
jsdom-based Vitest runner with React Testing Library, plus unit tests for the
shared turn hook, the `cn` utility, every data module, and a smoke test for
`GameShell`. Lifts `openspec/config.yaml` into strict-TDD mode once the runner
lands.

## Requirements

### Requirement: Test Runner Stack

The project MUST install `vitest`, `@testing-library/react`, `jsdom`,
`@testing-library/jest-dom`, `@testing-library/user-event`, and
`@vitest/coverage-v8` as devDependencies. A `vitest.config.ts` MUST declare
`environment: "jsdom"` and load `./vitest.setup.ts`, which extends `expect`
with `@testing-library/jest-dom` matchers. `package.json` MUST expose
`test` → `vitest run`, `test:watch` → `vitest`, and
`test:coverage` → `vitest run --coverage`.

**Touches**: `package.json`, `package-lock.json`, `vitest.config.ts`,
`vitest.setup.ts`.

#### Scenario: Runner boots in jsdom

- GIVEN a clean clone with dependencies installed
- WHEN the developer runs `npm test`
- THEN Vitest executes every `*.test.ts` and `*.test.tsx` under the repo in
  a jsdom environment and exits zero when no test fails

#### Scenario: jest-dom matchers available

- GIVEN a component test calls `expect(el).toBeInTheDocument()`
- WHEN the test runs
- THEN the matcher resolves through the shared setup file; the test file
  MUST NOT need to import `@testing-library/jest-dom` directly

#### Scenario: Coverage report generation

- GIVEN `npm run test:coverage` is invoked
- WHEN the run finishes
- THEN a V8 coverage summary (text + html reporters) is emitted and the
  command exits zero

### Requirement: `useGameTurn` Hook Coverage

`lib/useGameTurn.ts` MUST be exercised through `@testing-library/react`'s
`renderHook` with `act` wrappers. Tests MUST cover roster build, turn
retention, turn rotation, game-over termination, and score increment
(including negative points).

**Touches**: `lib/useGameTurn.ts`.

#### Scenario: `handleStart` builds N players

- GIVEN a fresh hook instance
- WHEN `handleStart(4)` runs
- THEN `players.length === 4`, every `id` is unique, every entry starts at
  `score: 0`, the names follow `JUGADOR 1..4`, `currentPlayerIndex` is `0`,
  and `isGameOver` is `false`

#### Scenario: Correct feedback keeps the turn

- GIVEN `handleStart(2)` ran
- WHEN `handleNext("correct")` runs
- THEN `currentPlayerIndex` stays `0`, `handleNext` returns `true`, and
  `isGameOver` remains `false`

#### Scenario: Incorrect feedback rotates the turn

- GIVEN `handleStart(3)` ran and it is player 1's turn
- WHEN `handleNext("incorrect")` runs
- THEN `currentPlayerIndex` becomes `1` and `handleNext` returns `true`

#### Scenario: Last incorrect ends the game

- GIVEN `handleStart(2)` ran and `currentPlayerIndex === 1`
- WHEN `handleNext("incorrect")` runs
- THEN `isGameOver` becomes `true` and `handleNext` returns `false`

#### Scenario: `incrementScore` adds and penalises

- GIVEN `handleStart(2)` ran and it is player 0's turn
- WHEN `incrementScore(1)` and then `incrementScore(-2)` run
- THEN player 0's `score` equals `-1`; calling `incrementScore()` with no
  argument MUST add the default 1

### Requirement: `cn` Utility Coverage

`lib/utils.ts` `cn()` MUST round-trip `clsx` + `tailwind-merge` semantics:
falsy inputs are dropped and conflicting Tailwind utilities resolve to the
last-wins value.

**Touches**: `lib/utils.ts`.

#### Scenario: Falsy arguments are ignored

- GIVEN a mix of valid class strings, `false`, `null`, and `undefined`
- WHEN `cn(...)` is invoked
- THEN the result contains only the truthy tokens

#### Scenario: Tailwind conflicts resolve last-wins

- GIVEN inputs include `px-2` and later `px-4`
- WHEN `cn(...)` runs
- THEN the result includes `px-4` and excludes `px-2`

### Requirement: Data Module Invariants

Every `data/*.ts` module that exports a typed array MUST have a co-located
`*.test.ts` asserting: the export is a non-empty array, every entry has a
unique `id`, and every required field defined by that module's interface is
present on every entry. Per-module constraints MUST also hold:
`ratings.imdb ∈ [0,10]` and `rottenTomatoes ∈ [0,100]`;
`opinions.majority ∈ {"a favor", "en contra"}`; `brand-colors.hex` matches
`^#[0-9A-Fa-f]{6}$` and `optionHexes` contains exactly one instance of
`hex`; `quotes.author`, `headlines.source`, and `celebrities.name` are
non-empty strings.

**Touches**: `data/celebrities.ts`, `data/quotes.ts`, `data/headlines.ts`,
`data/faces.ts`, `data/ratings.ts`, `data/opinions.ts`,
`data/brand-colors.ts`, `data/countries.ts`, `data/foods.ts`,
`data/ingredients.ts`, `data/inventions.ts`, `data/movies.ts`,
`data/products.ts`, `data/realOrAi.ts`, `data/hangman.ts`.

#### Scenario: Each module passes its invariant battery

- GIVEN the 15 data modules listed under **Touches**
- WHEN `npm test` runs the `data/*.test.ts` files
- THEN every module's suite asserts non-empty arrays, unique ids, and
  per-module required-field constraints, and the whole run exits zero

### Requirement: `GameShell` Smoke Test

A single integration test MUST mount `GameShell` with stub `onStart` and
`onReset` handlers, simulate the start → playing → gameover transitions via
`@testing-library/user-event`, and assert the rendered markers for each
state (`¡Comenzar!` button, then `Siguiente` button, then
`¡Juego Terminado!` heading).

**Touches**: `components/game/GameShell.tsx`,
`components/ui/ComicButton.tsx`, `components/ui/FeedbackOverlay.tsx`,
`components/game/Scoreboard.tsx`.

#### Scenario: start → playing transition

- GIVEN a mounted `GameShell` with `isGameOver: false`
- WHEN the test selects a player count and clicks `¡Comenzar!`
- THEN `onStart` is called with the chosen count and the playing screen's
  `Siguiente` control becomes reachable

#### Scenario: playing → gameover transition

- GIVEN the playing state is mounted and `isGameOver` flips to `true`
- WHEN React commits the new props
- THEN the test observes the `¡Juego Terminado!` heading and the
  "Jugar de Nuevo" button calls `onReset`

### Requirement: Strict-TDD Config Activation

`openspec/config.yaml` MUST be updated so `strict_tdd: true`,
`testing.test_command: "npm test"`, and the root project entry sets
`unit: true`. The previous TDD-off rationale comment MUST be replaced with
a brief note pointing at `npm test`.

**Touches**: `openspec/config.yaml`.

#### Scenario: Config advertises strict TDD

- GIVEN the config has been edited by this change
- WHEN any SDD tool reads `openspec/config.yaml`
- THEN `strict_tdd` is `true`, `testing.test_command` is `"npm test"`, and
  `projects[0].unit` is `true`