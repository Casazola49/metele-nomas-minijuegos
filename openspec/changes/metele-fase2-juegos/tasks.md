# Tasks: Metele Fase 2 — Juegos

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~1,300–1,600 total (wave 1 ≈ 280, wave 2 ≈ 300, wave 3 ≈ 380, wave 4 ≈ 320; GameGrid ≈ 18) |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 → PR 2 → PR 3 → PR 4 |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

> Shared per-wave test command: `npm run build && npx tsc --noEmit && npm run lint`

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Wave 1: quien-lo-dijo, guerra-criticas | PR 1 | shared command | Browser: grid + both routes | Revert PR 1 → restore 2 cards, delete routes + data |
| 2 | Wave 2: noticia-o-fake, polemica-total | PR 2 | shared command | Browser: grid + both routes (static majority) | Revert PR 2 (same boundary) |
| 3 | Wave 3: face-mashup, ahorcado-funable, ingredientes | PR 3 | shared command | Browser: grid + 3 routes (lives, emoji fallback) | Revert PR 3 |
| 4 | Wave 4: color-correcto, mundo-girado | PR 4 | shared command | Browser: grid + 2 routes (SVG) | Revert PR 4 |

## Wave 1 — quien-lo-dijo, guerra-criticas

- [ ] Create `data/quotes.ts`: `Quote` (`id, text, author, category?, emoji?`) + ≥12. <!-- sdd-owner: implementation -->
- [ ] Create `app/games/quien-lo-dijo/page.tsx`: GameShell + useGameTurn quiz; 4 author options (1 correct, same category first). <!-- sdd-owner: implementation -->
- [ ] Create `data/ratings.ts`: `RatingScores` (`imdb` 0–10, `rottenTomatoes` 0–100, numeric) + ≥10 pairs. <!-- sdd-owner: implementation -->
- [ ] Create `app/games/guerra-criticas/page.tsx`: A/B duel; winner = higher normalized average; point only on real winner. <!-- sdd-owner: implementation -->
- [ ] Flip `quien-lo-dijo` + `guerra-criticas` cards in `components/home/GameGrid.tsx`: `comingSoon: false` + `href`. <!-- sdd-owner: implementation -->
- [ ] Verify wave 1: shared test command passes. <!-- sdd-owner: implementation -->

## Wave 2 — noticia-o-fake, polemica-total

- [ ] Create `data/headlines.ts`: `Headline` (`id, text, isReal, source, image?, emoji?`) + ≥16. <!-- sdd-owner: implementation -->
- [ ] Create `app/games/noticia-o-fake/page.tsx`: Real/Fake vs `isReal`; reveal `source` in feedback; `onError` emoji fallback. <!-- sdd-owner: implementation -->
- [ ] Create `data/opinions.ts`: `Opinion` (`id, text, majority: "a_favor"\|"en_contra", emoji?`) + ≥12. <!-- sdd-owner: implementation -->
- [ ] Create `app/games/polemica-total/page.tsx`: A favor/En contra vs static `majority`; no API calls. <!-- sdd-owner: implementation -->
- [ ] Flip `noticia-o-fake` + `polemica-total` cards in `components/home/GameGrid.tsx`: `comingSoon: false` + `href`. <!-- sdd-owner: implementation -->
- [ ] Verify wave 2: shared test command passes. <!-- sdd-owner: implementation -->

## Wave 3 — face-mashup, ahorcado-funable, ingredientes

- [ ] Create `data/faces.ts`: `FaceMashup` (`id, image, celebA, celebB, distractorPairs, emoji?`) + ≥10; distractors share ≥1 name. <!-- sdd-owner: implementation -->
- [ ] Create `app/games/face-mashup/page.tsx`: 4 celeb-pair options; placeholder image + emoji fallback. <!-- sdd-owner: implementation -->
- [ ] Create `data/hangman.ts`: `HangmanEntry` (`id, word, trapWord, image, hint, emoji?`) + ≥12. <!-- sdd-owner: implementation -->
- [ ] Create `app/games/ahorcado-funable/page.tsx`: keyboard + 3 lives; `disableFeedbackOverlay`; `isGameOver` at 0 lives. <!-- sdd-owner: implementation -->
- [ ] Create `data/ingredients.ts`: `Dish` (`id, name, image, mainIngredient, options, emoji?`) + ≥12; options share mainIngredient. <!-- sdd-owner: implementation -->
- [ ] Create `app/games/ingredientes/page.tsx`: ingredient photo → 4 dishes; placeholder + emoji fallback. <!-- sdd-owner: implementation -->
- [ ] Flip `face-mashup` + `ahorcado-funable` + `ingredientes` cards in `components/home/GameGrid.tsx`: `comingSoon: false` + `href`. <!-- sdd-owner: implementation -->
- [ ] Verify wave 3: shared test command passes. <!-- sdd-owner: implementation -->

## Wave 4 — color-correcto, mundo-girado

- [x] Create `data/brand-colors.ts`: `BrandColor` (`id, brand, logoPath, correctHex, palette[4], emoji?`); palette holds correctHex once. <!-- sdd-owner: implementation -->
- [x] Create `app/games/color-correcto/page.tsx`: grayscale inline logo (`grayscale(1)`) + 4 hex swatches. <!-- sdd-owner: implementation -->
- [x] Create `data/countries.ts`: `Country` (`id, name, svgPath, rotation, distractorNames[3], emoji?`); inline path, no geo API. <!-- sdd-owner: implementation -->
- [x] Create `app/games/mundo-girado/page.tsx`: inline SVG rotated `rotation` deg + 4 country names. <!-- sdd-owner: implementation -->
- [x] Flip `color-correcto` + `mundo-girado` cards in `components/home/GameGrid.tsx`: `comingSoon: false` + `href`. <!-- sdd-owner: implementation -->
- [x] Verify wave 4: shared test command passes. <!-- sdd-owner: implementation -->

## Post-apply Review (parent)

- [ ] Start or reuse bounded review for PR 1. <!-- sdd-owner: parent -->
- [ ] Start or reuse bounded review for PR 2. <!-- sdd-owner: parent -->
- [ ] Start or reuse bounded review for PR 3. <!-- sdd-owner: parent -->
- [ ] Start or reuse bounded review for PR 4. <!-- sdd-owner: parent -->