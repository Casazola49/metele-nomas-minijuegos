# Apply Progress: metele-fase2-juegos

## Structured status consumed

- Schema: `gentle-ai.sdd-status` v2 / `spec-driven`
- Change: `metele-fase2-juegos`
- Artifact store: `openspec`
- Apply state: `ready` at start; action context `repo-local`
- Workspace root and allowed edit root: `/home/raymond/Work/gentle_ai/podcast`
- Delivery: stacked-to-main, Wave 2 / PR 2 slice
- Runtime attempt: continued under the orchestrator-provided active token; no new acquire was issued.
- Warnings: native status reported the workload forecast as high/pending, while the delegated prompt resolved the delivery path to `stacked-to-main`; implementation stayed limited to Wave 2.

## Completed tasks

- [x] Create `data/headlines.ts`: typed `Headline` dataset with 16 static headlines, real/fake classification, sources, placeholders, and emoji fallbacks.
- [x] Create `app/games/noticia-o-fake/page.tsx`: Real/Fake quiz using `isReal`, source reveal, and image `onError` emoji fallback.
- [x] Create `data/opinions.ts`: typed static opinion dataset with 14 entries, majority side, precomputed percentage, and emoji.
- [x] Create `app/games/polemica-total/page.tsx`: A favor/En contra quiz using static majority data, percentage reveal, and majority-match scoring.
- [x] Flip the Wave 2 GameGrid cards to live routes with `comingSoon: false`.
- [x] Verify Wave 2 with the shared build, type-check, and lint command.

## Persisted task checkbox updates

The six Wave 2 implementation-owned rows in `tasks.md` were changed from `[ ]` to `[x]`. Wave 1, Wave 3, Wave 4, and parent-owned review rows were left unchanged.

## Files changed

| File | Action | Notes |
|---|---|---|
| `data/headlines.ts` | Created | 16 mixed Bolivian/international real and fake headlines. All `La Voz de Bolivia` entries are fake. |
| `data/opinions.ts` | Created | 14 opinions with static majority strings and percentages. |
| `app/games/noticia-o-fake/page.tsx` | Created | GameShell/useGameTurn flow, local feedback source reveal, and fallback image behavior. |
| `app/games/polemica-total/page.tsx` | Created | Static majority game with percentage feedback and no network/backend calls. |
| `components/home/GameGrid.tsx` | Modified | Activated only `noticia-o-fake` and `polemica-total`. |
| `openspec/changes/metele-fase2-juegos/tasks.md` | Modified | Checked only Wave 2 implementation rows. |

## Verification evidence

### Focused test command

`npm run build && npx tsc --noEmit && npm run lint`

Result: passed. Next.js production build compiled and prerendered successfully; TypeScript emitted no errors; ESLint exited successfully with 26 pre-existing warnings, including existing warnings in other routes and shared components plus the expected `<img>` warning in the new news route.

### Runtime harness

N/A — this repository has no configured browser/E2E runtime harness (`testing.status: none`). The production build exercised route compilation and static generation for both new routes.

### Rollback boundary

Revert the Wave 2 changes to `data/headlines.ts`, `data/opinions.ts`, both Wave 2 route files, and the two corresponding GameGrid card fields; restore those cards to `href: "#"` and `comingSoon: true`.

## Deviations from design

The requested implementation extends `Opinion` with `percentage: number` and uses the user-specified display values. The task/spec snapshots described underscore enum values (`a_favor`/`en_contra`), while the delegated scope and UI requirements explicitly requested the display strings `"a favor"`/`"en contra"`; the implementation follows the delegated scope. No other design deviations.

## Remaining tasks

Wave 1 remains unchecked:
- [ ] Create `data/quotes.ts`: `Quote` (`id, text, author, category?, emoji?`) + ≥12. <!-- sdd-owner: implementation -->
- [ ] Create `app/games/quien-lo-dijo/page.tsx`: GameShell + useGameTurn quiz; 4 author options (1 correct, same category first). <!-- sdd-owner: implementation -->
- [ ] Create `data/ratings.ts`: `RatingScores` (`imdb` 0–10, `rottenTomatoes` 0–100, numeric) + ≥10 pairs. <!-- sdd-owner: implementation -->
- [ ] Create `app/games/guerra-criticas/page.tsx`: A/B duel; winner = higher normalized average; point only on real winner. <!-- sdd-owner: implementation -->
- [ ] Flip `quien-lo-dijo` + `guerra-criticas` cards in `components/home/GameGrid.tsx`: `comingSoon: false` + `href`. <!-- sdd-owner: implementation -->
- [ ] Verify wave 1: shared test command passes. <!-- sdd-owner: implementation -->

Wave 3 remains unchecked:
- [ ] Create `data/faces.ts`: `FaceMashup` (`id, image, celebA, celebB, distractorPairs, emoji?`) + ≥10; distractors share ≥1 name. <!-- sdd-owner: implementation -->
- [ ] Create `app/games/face-mashup/page.tsx`: 4 celeb-pair options; placeholder image + emoji fallback. <!-- sdd-owner: implementation -->
- [ ] Create `data/hangman.ts`: `HangmanEntry` (`id, word, trapWord, image, hint, emoji?`) + ≥12. <!-- sdd-owner: implementation -->
- [ ] Create `app/games/ahorcado-funable/page.tsx`: keyboard + 3 lives; `disableFeedbackOverlay`; `isGameOver` at 0 lives. <!-- sdd-owner: implementation -->
- [ ] Create `data/ingredients.ts`: `Dish` (`id, name, image, mainIngredient, options, emoji?`) + ≥12; options share mainIngredient. <!-- sdd-owner: implementation -->
- [ ] Create `app/games/ingredientes/page.tsx`: ingredient photo → 4 dishes; placeholder + emoji fallback. <!-- sdd-owner: implementation -->
- [ ] Flip `face-mashup` + `ahorcado-funable` + `ingredientes` cards in `components/home/GameGrid.tsx`: `comingSoon: false` + `href`. <!-- sdd-owner: implementation -->
- [ ] Verify wave 3: shared test command passes. <!-- sdd-owner: implementation -->

Wave 4 remains unchecked:
- [ ] Create `data/brand-colors.ts`: `BrandColor` (`id, brand, logoPath, correctHex, palette[4], emoji?`); palette holds correctHex once. <!-- sdd-owner: implementation -->
- [ ] Create `app/games/color-correcto/page.tsx`: grayscale inline logo (`grayscale(1)`) + 4 hex swatches. <!-- sdd-owner: implementation -->
- [ ] Create `data/countries.ts`: `Country` (`id, name, svgPath, rotation, distractorNames[3], emoji?`); inline path, no geo API. <!-- sdd-owner: implementation -->
- [ ] Create `app/games/mundo-girado/page.tsx`: inline SVG rotated `rotation` deg + 4 country names. <!-- sdd-owner: implementation -->
- [ ] Flip `color-correcto` + `mundo-girado` cards in `components/home/GameGrid.tsx`: `comingSoon: false` + `href`. <!-- sdd-owner: implementation -->
- [ ] Verify wave 4: shared test command passes. <!-- sdd-owner: implementation -->

Deferred parent-owned lifecycle actions remain unchanged:
- [ ] Start or reuse bounded review for PR 1. <!-- sdd-owner: parent -->
- [ ] Start or reuse bounded review for PR 2. <!-- sdd-owner: parent -->
- [ ] Start or reuse bounded review for PR 3. <!-- sdd-owner: parent -->
- [ ] Start or reuse bounded review for PR 4. <!-- sdd-owner: parent -->

## Status

6 of 30 implementation tasks are complete in the persisted task artifact. Wave 2 is ready for parent lifecycle/independent verification; apply must not start review or delivery gates.
