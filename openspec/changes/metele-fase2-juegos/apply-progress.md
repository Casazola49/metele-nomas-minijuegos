# Apply Progress — metele-fase2-juegos

## Status

- **Phase:** apply — all 4 waves complete
- **Change:** metele-fase2-juegos
- **artifactStore:** openspec
- **Delivery:** stacked-to-main, 4 wave PRs (PR #1..#4)
- **Strict TDD:** disabled (no test runner installed)
- **Verification:** `npm run build` + `npx tsc --noEmit` + `npm run lint` all pass (exit 0)

## Waves

### Wave 1 — quien-lo-dijo, guerra-criticas (PR #1)
- `data/quotes.ts` — 14 frases célebres bolivianas/internacionales
- `data/ratings.ts` — 10 duelos IMDb/RT normalizados
- `app/games/quien-lo-dijo/page.tsx` — quiz 4 autores (distractores por categoría)
- `app/games/guerra-criticas/page.tsx` — duelo A/B por promedio normalizado

### Wave 2 — noticia-o-fake, polemica-total (PR #2)
- `data/headlines.ts` — 16 titulares real/fake
- `data/opinions.ts` — 14 opiniones impopulares con mayoría estática
- `app/games/noticia-o-fake/page.tsx` — real/fake con reveal de fuente
- `app/games/polemica-total/page.tsx` — mayoría estática precomputada

### Wave 3 — face-mashup, ahorcado-funable, ingredientes (PR #3)
- `data/faces.ts` — 10 fusiones de famosos
- `data/hangman.ts` — 12 pares palabra trampa/correcta
- `data/ingredients.ts` — 12 platos con ingredientes diferenciadores
- `app/games/face-mashup/page.tsx` — quiz de parejas (corregido: opción correcta siempre presente)
- `app/games/ahorcado-funable/page.tsx` — 6 vidas + teclado propio + disableFeedbackOverlay
- `app/games/ingredientes/page.tsx` — quiz de platos por ingredientes

### Wave 4 — color-correcto, mundo-girado (PR #4)
- `data/brand-colors.ts` — 12 marcas con hex + distractores cercanos
- `data/countries.ts` — 12 países con silueta SVG inline + rotación
- `app/games/color-correcto/page.tsx` — swatches hex, logo grayscale placeholder
- `app/games/mundo-girado/page.tsx` — silueta SVG rotada

## GameGrid

15 cards activas (`comingSoon: false`), 0 restantes. Las 9 nuevas con sus rutas.

## Verification Evidence

| Command | Result |
|---|---|
| `npm run build` | passed — 15 static routes generated |
| `npx tsc --noEmit` | passed, no output |
| `npm run lint` | passed, 0 errors, pre-existing `<img>` warnings only |
