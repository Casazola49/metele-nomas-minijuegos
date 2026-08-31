# Design: Fase 3 — Testing Foundation

## Technical Approach

Install Vitest + React Testing Library + jsdom. Co-locate test files next to protected units. Share a data-invariant helper (`test-helpers/data-invariants.ts`) so 15 data test files stay thin. Mock only `next/link` (client router breaks jsdom); framer-motion and lucide-react render pass-through in jsdom without mocking.

## Architecture Decisions

### Decision: Test Runner — Vitest

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Vitest | ESM-native, fast, Next 16 official docs recommend it | ✅ Chosen |
| Jest | Mature but needs Babel/SWC for ESM+TS, slower | Rejected |

**Rationale**: Next 16 + React 19 project is ESM throughout. Vitest handles TS + ESM natively with zero transpilation config.

### Decision: DOM Environment — jsdom

| Option | Tradeoff | Decision |
|--------|----------|----------|
| jsdom | Complete DOM API, RTL-compatible | ✅ Chosen |
| happy-dom | Faster but incomplete edge-case DOM | Rejected |

### Decision: Mocking Strategy — Minimal

| Module | Action | Reason |
|--------|--------|--------|
| `next/link` | Mock → renders children in `<a>` | Client-side router breaks jsdom |
| `framer-motion` | No mock | Pass-through rendering in jsdom |
| `lucide-react` | No mock | SVG output works in jsdom |

### Decision: Test Placement — Co-located

| Unit | Test file |
|------|-----------|
| `lib/useGameTurn.ts` | `lib/useGameTurn.test.ts` |
| `lib/utils.ts` | `lib/utils.test.ts` |
| `data/*.ts` (×15) | `data/*.test.ts` (×15) |
| `components/game/GameShell.tsx` | `components/game/GameShell.test.tsx` |
| Shared data assertions | `test-helpers/data-invariants.ts` |

## Configuration

### vitest.config.ts

```ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    globals: true,
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

### vitest.setup.ts

```ts
import "@testing-library/jest-dom/vitest";
```

`globals: true` avoids per-file `import { describe, it, expect }` imports. The `@/` alias mirrors `tsconfig.json` paths so test imports match production code.

## Data Flow

### useGameTurn Test Flow

```
renderHook(() => useGameTurn())
│
├─ Scenario: handleStart(4)
│    act → handleStart(4)
│    assert → players.length===4, unique ids, score 0,
│             names "JUGADOR 1..4", idx 0, !isGameOver
│
├─ Scenario: correct keeps turn
│    act → handleStart(2) → handleNext("correct")
│    assert → currentPlayerIndex===0, returns true
│
├─ Scenario: incorrect rotates turn
│    act → handleStart(3) → handleNext("incorrect")
│    assert → currentPlayerIndex===1, returns true
│
├─ Scenario: last incorrect → game over
│    act → handleStart(2), idx=1 → handleNext("incorrect")
│    assert → isGameOver===true, returns false
│
└─ Scenario: incrementScore
     act → handleStart(2) → incrementScore(1) → incrementScore(-2)
     assert → players[0].score === -1
     act → incrementScore()  (no arg → default 1)
     assert → players[0].score === 0
```

### GameShell Smoke Test Flow

```
render(<GameShell ...props />)
│
├─ State: "start"
│    assert → "¡Comenzar!" button visible
│    act → click player-count button → click "¡Comenzar!"
│    assert → onStart called with chosen count
│
├─ State: "playing"
│    assert → "Siguiente" button reachable (via feedback prop)
│    act → rerender with isGameOver=true
│
└─ State: "gameover"
     assert → "¡Juego Terminado!" heading visible
     act → click "Jugar de Nuevo"
     assert → onReset called
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `vitest.config.ts` | Create | Runner config: jsdom, setupFiles, `@/` alias |
| `vitest.setup.ts` | Create | jest-dom matcher registration |
| `test-helpers/data-invariants.ts` | Create | Shared: non-empty, unique IDs, required fields, custom checks |
| `lib/useGameTurn.test.ts` | Create | 5 hook scenarios via `renderHook`/`act` |
| `lib/utils.test.ts` | Create | 2 `cn()` scenarios (falsy drop, tw conflict) |
| `data/*.test.ts` (×15) | Create | Thin: import + `assertDataInvariants` + per-module custom |
| `components/game/GameShell.test.tsx` | Create | Smoke: start → playing → gameover |
| `package.json` | Modify | Add devDeps + `test`/`test:watch`/`test:coverage` scripts |
| `openspec/config.yaml` | Modify | `strict_tdd: true`, test_command, `unit: true` |

## Interfaces / Contracts

### Data Invariant Helper

```ts
interface InvariantOptions<T> {
  requiredFields: (keyof T)[];
  custom?: (entry: T, index: number) => void;
}

export function assertDataInvariants<T extends { id: string }>(
  data: T[],
  opts: InvariantOptions<T>
): void;
```

Each `data/*.test.ts` calls this with module-specific fields and optional custom assertions (ratings range `[0,10]`/`[0,100]`, `majority ∈ {"a favor","en contra"}`, hex format `^#[0-9A-Fa-f]{6}$`, `optionHexes` contains exactly one `hex`, non-empty string fields).

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit | `useGameTurn`, `cn()` | `renderHook`/`act`, direct function calls |
| Unit | 15 data modules | Shared invariant helper + per-module custom |
| Integration | `GameShell` lifecycle | RTL `render` + `userEvent`, mock `next/link` |

## Slice Strategy (400-line review budget)

| Slice | Content | Est. Lines |
|-------|---------|-----------|
| A — Setup | `vitest.config.ts`, `vitest.setup.ts`, `test-helpers/data-invariants.ts`, `package.json` | ~80 |
| B — Hook + Utils | `lib/useGameTurn.test.ts`, `lib/utils.test.ts` | ~110 |
| C — Data + Shell + Config | 15× `data/*.test.ts`, `GameShell.test.tsx`, `config.yaml` | ~210 |

**Decision needed before apply: Yes** — three chained PRs recommended.
**Chained PRs recommended: Yes**
**400-line budget risk: Medium** — Slice C is the largest; shared helper keeps data tests compact (~12 lines each).

## strict_tdd and verify.test_command

Current `verify.test_command: "npm run build"` duplicates `verify.build_command: "npm run build"`. The design proposes:

- Change `verify.test_command` → `"npm test"` (unit test entry point).
- Keep `verify.build_command: "npm run build"` unchanged.
- Set `testing.test_command: "npm test"`, `projects[0].test_command: "npm test"`, `projects[0].unit: true`.

This makes `npm test` the canonical test command across all config fields. Build verification remains via `build_command`.

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary.

## Migration / Rollout

No migration required. Test infrastructure is purely additive; no production code changes.

## Open Questions

- None.
