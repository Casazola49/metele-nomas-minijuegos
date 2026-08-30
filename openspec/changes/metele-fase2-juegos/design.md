# Design: Metele Fase 2 — Juegos

## Technical Approach

Add nine static-data minigame routes that compose the existing `GameShell` + `useGameTurn` contract verbatim. Each game owns its round state locally (following the `pixel-chef` / `real-o-ia` pattern: `useState` for `currentItem`, `options`, `usedIds`, `feedback`). Two games (`ahorcado-funable`, `polemica-total`) adapt the shell locally via existing props (`disableFeedbackOverlay`, local `isGameOver`) without mutating the shared API. No new dependencies, no backend, no shared-component changes.

## Architecture Decisions

### Decision: Reuse GameShell + useGameTurn without mutation

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Mutate `useGameTurn` to support lives/voting | Breaks 6 existing games; wider review | **Rejected** |
| Fork GameShell per special game | Duplicates start/gameover screens | **Rejected** |
| Use existing props (`disableFeedbackOverlay`, local `isGameOver`) | Zero shared changes; each game self-contained | **Chosen** |

**Rationale**: `GameShell` already exposes `disableFeedbackOverlay` and reacts to `isGameOver` via `useEffect`. `ahorcado-funable` drives its own keyboard + lives UI as `children` and sets `isGameOver = true` when lives reach 0. `polemica-total` uses standard quiz flow (correct = match majority) through `useGameTurn` unchanged.

### Decision: Static precomputed majority for polemica-total

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Backend with live voting | New infra, deps, out of scope | **Rejected** |
| Precomputed `majority` field in `data/opinions.ts` | Deterministic, offline, zero deps | **Chosen** |

**Rationale**: The project is fully static. Precomputed data matches the existing `data/*.ts` pattern and satisfies the "no backend" constraint.

### Decision: Placeholder images + emoji fallback at launch

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Block until real assets produced | Stalls all image-dependent games | **Rejected** |
| Ship with `/images/coming-soon-*.png` + emoji fallback | Follows established precedent (`foods.ts`, `realOrAi.ts`) | **Chosen** |

**Rationale**: Three existing games already ship with placeholder covers. The `onError` → emoji pattern is proven in `pixel-chef` and `real-o-ia`.

### Decision: Local round state per game (no shared useRound hook)

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Extract shared `useRound` before building games | Premature abstraction across 9 different games; large first PR | **Rejected** |
| Each game manages `useState` for current item, options, usedIds | Follows existing pattern; each game is independent | **Chosen** |

**Rationale**: The 6 existing games already manage round state locally. The 9 new games have mechanically different round logic (quiz, duel, keyboard, numeric comparison); a shared hook would force unnatural abstraction.

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    GameShell (shared)                        │
│  start ──→ playing ──→ gameover                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  children (route-specific game screen)               │   │
│  │  ┌──────────────────────────────────────────────┐    │   │
│  │  │  Route Page (e.g. quien-lo-dijo/page.tsx)    │    │   │
│  │  │                                               │    │   │
│  │  │  useGameTurn() ──→ players, score, feedback   │    │   │
│  │  │  useState()    ──→ currentItem, options,      │    │   │
│  │  │                    usedIds, localFeedback      │    │   │
│  │  │                                               │    │   │
│  │  │  data/quotes.ts ──→ Quote[] (static import)   │    │   │
│  │  └──────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────┘   │
│  Scoreboard (top-right) ← turn.currentPlayer.score          │
│  FeedbackOverlay ← feedback (unless disableFeedbackOverlay) │
│  "Siguiente" button ← showNextButton (driven by feedback)   │
└─────────────────────────────────────────────────────────────┘
```

## Sequence Diagrams

### Turn Lifecycle (standard games: quien-lo-dijo, noticia-o-fake, face-mashup, ingredientes, color-correcto, mundo-girado)

```
Player          Route Page           useGameTurn         GameShell
  │                 │                     │                  │
  │── pick count ──→│                     │                  │
  │                 │── handleStart(n) ──→│                  │
  │                 │                     │── build roster   │
  │                 │←─── players ────────│                  │
  │                 │── startNewRound() ──│                  │
  │                 │   (pick item,       │                  │
  │                 │    build options)   │                  │
  │                 │── render ─────────────────────────────→│
  │                 │   (children +       │                  │
  │                 │    Scoreboard)      │                  │
  │── select answer→│                     │                  │
  │                 │── if correct:       │                  │
  │                 │   incrementScore(1)→│                  │
  │                 │   feedback="correct"│                  │
  │                 │── if incorrect:     │                  │
  │                 │   feedback="incorrect"                  │
  │                 │                     │                  │
  │                 │── feedback prop ───────────────────────→│
  │                 │                     │    show overlay + │
  │                 │                     │    "Siguiente"    │
  │── press Sig. ───────────────────────────────────────────→│
  │                 │←── onNext() ────────│──────────────────│
  │                 │── handleNext(fb) ──→│                  │
  │                 │   correct → keep    │── return true    │
  │                 │   incorrect → rotate│── (or false if   │
  │                 │                     │    last player)   │
  │                 │── if true:          │                  │
  │                 │   startNewRound()   │                  │
  │                 │── if false:         │                  │
  │                 │   isGameOver=true ────────────────────→│
  │                 │                     │    → gameover     │
```

### Ahorcado Funable (lives + keyboard + disableFeedbackOverlay)

```
Player          ahorcado-funable       GameShell          data/hangman
  │                 │                     │                  │
  │── start ───────→│                     │                  │
  │                 │── disableFeedbackOverlay=true ────────→│
  │                 │── render keyboard + lives UI ─────────→│
  │                 │                     │                  │
  │── press key ───→│                     │                  │
  │                 │── key in word?      │                  │
  │                 │   YES → reveal letter(s)              │
  │                 │   NO  → lives--     │                  │
  │                 │                     │                  │
  │                 │── lives === 0?      │                  │
  │                 │   YES → isGameOver=true ──────────────→│
  │                 │         (gameover screen)              │
  │                 │── word fully revealed?                  │
  │                 │   YES → feedback="correct" ───────────→│
  │                 │         incrementScore(1)              │
  │                 │         → "Siguiente" appears          │
  │                 │                     │                  │
  │── press Sig. ──→│                     │                  │
  │                 │── handleNext("correct")                │
  │                 │   (or local game-over if lives=0)      │
  │                 │── load next hangman entry              │
```

**Key point**: `GameShell`'s `FeedbackOverlay` is suppressed via `disableFeedbackOverlay`. The route renders its own keyboard, lives counter, and letter-reveal UI as `children`. Game-over is driven by the route setting `isGameOver={true}` when lives reach 0, which `GameShell` handles via its existing `useEffect`.

### Polemica Total (static majority)

```
Player          polemica-total         data/opinions
  │                 │                     │
  │── start ───────→│                     │
  │                 │── pick random opinion
  │                 │────────────────────→│
  │                 │←── { text, majority: "a_favor" }
  │                 │                     │
  │── "A favor" ───→│                     │
  │                 │── guess === majority?
  │                 │   "a_favor" === "a_favor" → YES
  │                 │   feedback="correct"
  │                 │   incrementScore(1)
  │                 │                     │
  │── "En contra" →│                     │
  │                 │── "en_contra" === "a_favor" → NO
  │                 │   feedback="incorrect"
  │                 │   (turn rotates on "Siguiente")
```

**Key point**: No API call. The `majority` field is a static enum in the data module. Scoring uses standard `useGameTurn` semantics: match majority = correct (keep turn), mismatch = incorrect (rotate).

### Guerra de Críticas (numeric rating duel)

```
Player          guerra-criticas        data/ratings
  │                 │                     │
  │── start ───────→│                     │
  │                 │── pick pair (A, B)  │
  │                 │────────────────────→│
  │                 │←── { titleA, scoreA: {imdb, rt},
  │                 │      titleB, scoreB: {imdb, rt} }
  │                 │                     │
  │                 │── compute winner:   │
  │                 │   avgA = (imdb/10*100 + rt) / 2
  │                 │   avgB = (imdb/10*100 + rt) / 2
  │                 │   winner = avgA > avgB ? A : B
  │                 │                     │
  │── pick title ──→│                     │
  │                 │── pick === winner?  │
  │                 │   YES → feedback="correct", +1
  │                 │   NO  → feedback="incorrect"
```

**Key point**: Winner is computed deterministically from numeric fields. Both IMDb (0–10) and Rotten Tomatoes (0–100) are normalized to a 0–100 scale and averaged. The data module MUST guarantee numeric values (enforced by TypeScript interface).

## Interfaces / Contracts

### data/quotes.ts

```typescript
export interface Quote {
  id: string;
  text: string;
  author: string;
  category?: string;
  emoji?: string;
}
export const quotes: Quote[] = [/* ... */];
```

### data/ratings.ts

```typescript
export interface RatingScores {
  imdb: number;         // 0–10
  rottenTomatoes: number; // 0–100
}
export interface Rating {
  id: string;
  titleA: string;
  scoreA: RatingScores;
  titleB: string;
  scoreB: RatingScores;
  year?: number;
  emoji?: string;
}
export const ratings: Rating[] = [/* ... */];
```

### data/headlines.ts

```typescript
export interface Headline {
  id: string;
  text: string;
  isReal: boolean;
  source: string;
  image?: string;
  emoji?: string;
}
export const headlines: Headline[] = [/* ... */];
```

### data/opinions.ts

```typescript
export interface Opinion {
  id: string;
  text: string;
  majority: "a_favor" | "en_contra";
  emoji?: string;
}
export const opinions: Opinion[] = [/* ... */];
```

### data/faces.ts

```typescript
export interface FaceMashupPair {
  a: string;
  b: string;
}
export interface FaceMashup {
  id: string;
  image: string;
  celebA: string;
  celebB: string;
  distractorPairs: FaceMashupPair[];
  emoji?: string;
}
export const faceMashups: FaceMashup[] = [/* ... */];
```

### data/hangman.ts

```typescript
export interface HangmanEntry {
  id: string;
  word: string;
  trapWord: string;
  image: string;
  hint: string;
  emoji?: string;
}
export const hangmanEntries: HangmanEntry[] = [/* ... */];
```

### data/ingredients.ts

```typescript
export interface Dish {
  id: string;
  name: string;
  image: string;
  mainIngredient: string;
  options: string[];   // 4 dish names sharing mainIngredient (1 correct + 3 distractors)
  emoji?: string;
}
export const dishes: Dish[] = [/* ... */];
```

### data/brand-colors.ts

```typescript
export interface BrandColor {
  id: string;
  brand: string;
  logoPath: string;       // inline SVG path or public/ SVG reference
  correctHex: string;     // e.g. "#E50914"
  palette: string[];      // exactly 4 hex values including correctHex
  emoji?: string;
}
export const brandColors: BrandColor[] = [/* ... */];
```

### data/countries.ts

```typescript
export interface Country {
  id: string;
  name: string;
  svgPath: string;        // inline SVG <path d="..."> data
  rotation: number;       // degrees (e.g. 45, 90, 180, 270)
  distractorNames: string[]; // 3 country names from same region if possible
  emoji?: string;
}
export const countries: Country[] = [/* ... */];
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `data/quotes.ts` | Create | Quote dataset for `quien-lo-dijo` |
| `data/ratings.ts` | Create | Rating dataset for `guerra-criticas` |
| `data/headlines.ts` | Create | Headline dataset for `noticia-o-fake` |
| `data/opinions.ts` | Create | Opinion dataset for `polemica-total` |
| `data/faces.ts` | Create | Face mashup dataset for `face-mashup` |
| `data/hangman.ts` | Create | Hangman dataset for `ahorcado-funable` |
| `data/ingredients.ts` | Create | Dish/ingredient dataset for `ingredientes` |
| `data/brand-colors.ts` | Create | Brand color dataset for `color-correcto` |
| `data/countries.ts` | Create | Country silhouette dataset for `mundo-girado` |
| `app/games/quien-lo-dijo/page.tsx` | Create | Quiz route: quote → 4 author options |
| `app/games/guerra-criticas/page.tsx` | Create | Duel route: 2 titles with IMDb/RT scores |
| `app/games/noticia-o-fake/page.tsx` | Create | Binary route: Real/Fake headline verdict |
| `app/games/polemica-total/page.tsx` | Create | Binary route: A favor/En contra vs. static majority |
| `app/games/face-mashup/page.tsx` | Create | Quiz route: hybrid face → 4 celeb pairs |
| `app/games/ahorcado-funable/page.tsx` | Create | Keyboard + lives route with `disableFeedbackOverlay` |
| `app/games/ingredientes/page.tsx` | Create | Quiz route: ingredient photo → 4 dish names |
| `app/games/color-correcto/page.tsx` | Create | Quiz route: grayscale logo → 4 hex swatches |
| `app/games/mundo-girado/page.tsx` | Create | Quiz route: rotated SVG silhouette → 4 country names |
| `components/home/GameGrid.tsx` | Modify | Flip 9 cards: `comingSoon: false`, `href: "/games/{id}"` |

**No changes to**: `GameShell.tsx`, `useGameTurn.ts`, `FeedbackOverlay.tsx`, `Scoreboard.tsx`, `ComicButton.tsx`.

## Wave-to-Slice Mapping (<400 lines each)

| Wave | Games | Est. lines | Rationale |
|------|-------|-----------|-----------|
| **1** | `quien-lo-dijo`, `guerra-criticas` | ~280 | Pure text/data, simplest quiz + numeric duel. Validates pattern. |
| **2** | `noticia-o-fake`, `polemica-total` | ~300 | Binary-choice games. `polemica-total` adds static-majority logic but same shape. |
| **3** | `face-mashup`, `ahorcado-funable`, `ingredientes` | ~380 | Image-dependent games. `ahorcado-funable` is the most complex (keyboard + lives). |
| **4** | `color-correcto`, `mundo-girado` | ~320 | SVG/asset games. Inline SVG paths + grayscale CSS. |
| **Grid activation** | `GameGrid.tsx` edits | ~18 | Distributed across waves (flip cards as each wave lands) or batch in wave 4. |

Each wave is an independent PR: data module + route page + GameGrid card flip for that wave's games. All waves pass `npm run build`, `npx tsc --noEmit`, and `npm run lint`.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Build | All routes compile and type-check | `npm run build` + `npx tsc --noEmit` per wave |
| Lint | No ESLint violations | `npm run lint` per wave |
| Manual | Each game plays start → rounds → gameover | Verify in browser per wave |
| Data integrity | Numeric fields, palette contains correctHex, distractor counts | TypeScript strict types + manual review |

**No automated test runner** is installed; this matches the project's current state (`testing.status: none`).

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary.

## Migration / Rollout

No migration required. Each wave is additive: new files + GameGrid card flips. Rollback = revert the wave PR (restore `comingSoon: true` + `href: "#"`, delete route and data module). No data migration, backend rollback, or dependency cleanup.

## Open Questions

None — all decisions confirmed:
- [x] Static precomputed majority for `polemica-total`
- [x] Placeholder images + emoji fallback for image-dependent games
- [x] No backend, no new dependencies
- [x] `ahorcado-funable` and `polemica-total` adapt locally without touching GameShell/useGameTurn
