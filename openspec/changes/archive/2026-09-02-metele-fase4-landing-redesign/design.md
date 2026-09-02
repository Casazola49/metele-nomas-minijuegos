# Design: Metele Fase 4 — Landing Redesign

## Technical Approach

Restyle the three home sections (Hero, GameGrid, Footer) from the current yellow/comic aesthetic to a dark/glass destination while preserving all game data, routes, and `comic-*` tokens. Add landing-only CSS utilities in `globals.css`, consolidate the duplicated TICKER into `data/ticker.ts`, and give `ComicButton` an opt-in `landing` variant. The body background switches to `--color-comic-black` in `layout.tsx`; GameShell already sets its own `bg-comic-yellow` on `min-h-screen` containers, so games remain unaffected.

## Architecture Decisions

### Decision: Landing tokens via `@layer utilities` with `landing-` prefix

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Add new `--color-landing-*` theme tokens | Clean but pollutes `@theme` namespace | **Rejected** — spec forbids touching `comic-*`; adding parallel theme vars is unnecessary for one-page styling |
| Inline Tailwind arbitrary values in components | No CSS changes but verbose, hard to maintain | **Rejected** — blobs, dot-grid, glass, marquee repeat across 3 components |
| `@layer utilities` with `landing-` prefixed classes | Isolated, composable, easy to remove | **Chosen** |

Utilities to add in `app/globals.css`:
- `.landing-blob` — base blurred circle (radial-gradient + filter blur)
- `.landing-blob-float-{a,b,c}` — three `@keyframes blobFloat*` animations
- `.landing-dot-grid` — fixed radial-gradient dot overlay
- `.landing-gradient-text` — `background: linear-gradient(…); -webkit-background-clip: text; color: transparent`
- `.landing-glass` — `bg-white/5 border border-white/10 backdrop-blur-md`
- `.landing-glass-hover` — adds `hover:bg-white/10 hover:border-white/20` transition
- `.landing-marquee` — `animation: marqueeScroll 25s linear infinite`
- `.landing-marquee-pause` — `animation-play-state: paused`
- `.landing-light-line` — 1px horizontal gradient accent line
- `.landing-logo-ring` — conic-gradient circular border

All wrapped in `@media (prefers-reduced-motion: reduce) { .landing-blob-float-*, .landing-marquee { animation: none; } }`.

### Decision: Ticker consolidation → `data/ticker.ts`

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Keep TICKER duplicated in Hero + Footer | Zero effort, drift risk | **Rejected** — already duplicated, spec requires single source |
| `lib/ticker.ts` | Works but `lib/` is for utilities | **Rejected** — project convention uses `data/` for content arrays |
| `data/ticker.ts` | Follows existing `data/*.ts` pattern | **Chosen** |

Export `TICKER_PHRASES: readonly string[]` and `SOCIAL_LINKS: readonly SocialLink[]` (also duplicated today). Both Hero and Footer import from `data/ticker.ts`. The `SocialIcon` component moves to `data/ticker.ts` as well (or a new `components/home/SocialIcon.tsx`) since both sections need it — decision: keep it in `data/ticker.tsx` as a co-located component export to avoid a new file.

### Decision: ComicButton `variant="landing"` (opt-in)

| Option | Tradeoff | Decision |
|--------|----------|----------|
| New `GlassButton` component | Full isolation but duplicates motion/size logic | **Rejected** — unnecessary new component for one visual variant |
| Conditional class on existing ComicButton | Fragile, no type safety | **Rejected** |
| `variant="landing"` in existing variants map | One-line addition, type-safe, games never use it | **Chosen** |

Add to `ComicButton.tsx` variants map:
```
landing: "bg-white/10 text-white border-white/20 backdrop-blur-md hover:bg-white/20 hover:border-metele-pink/50 shadow-none border-2"
```

Games use `primary | secondary | danger | success | outline` — the `landing` variant is never activated in game routes. Default remains `primary`.

### Decision: Body background in layout.tsx

Change `<body>` class from `bg-comic-yellow` → `bg-comic-black text-white`. GameShell wraps every game in `min-h-screen bg-comic-yellow` (confirmed at line 80, 124, 167), so the dark body is never visible in games. This avoids route-conditional logic or layout groups.

## Data Flow

```
app/layout.tsx (body: bg-comic-black text-white)
  └── app/page.tsx
        ├── Hero
        │     ├── blobs (CSS @keyframes)
        │     ├── dot-grid overlay
        │     ├── logo ring (conic-gradient)
        │     ├── gradient title + tag
        │     ├── JUGAR CTA → smooth scroll #games
        │     └── ticker marquee ← data/ticker.ts
        ├── GameGrid  (id="games")
        │     ├── gradient section title
        │     └── 15× glass cards ← data/*.ts (unchanged)
        └── Footer
              ├── ticker marquee ← data/ticker.ts
              ├── social links ← data/ticker.ts
              └── metelenomas.lat link
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `data/ticker.ts` | Create | Single source for `TICKER_PHRASES` and `SOCIAL_LINKS` arrays + `SocialIcon` component |
| `app/globals.css` | Modify | Add `@layer utilities` block with ~10 landing classes + `@keyframes` + reduced-motion media query |
| `app/layout.tsx` | Modify | Change body class: `bg-comic-yellow` → `bg-comic-black text-white` |
| `components/ui/ComicButton.tsx` | Modify | Add `landing` to variant union and variants map (~2 lines) |
| `components/home/Hero.tsx` | Modify | Rewrite: remove action words/parallax/"No te pierdas"/dividers; add blobs, dot-grid, logo ring, gradient title, JUGAR CTA, ticker import |
| `components/home/GameGrid.tsx` | Modify | Dark section bg, glass card styling, gradient title, remove comic floating shapes |
| `components/home/Footer.tsx` | Modify | Dark surface, ticker import, glass social links, remove diagonal dividers/comic words |

## Component Hierarchy (Post-Change)

```
<main class="min-h-screen">
  <Hero>
    <div.landing-blob × 3 />          ← animated blurred gradients
    <div.landing-dot-grid />           ← fixed overlay
    <div.landing-light-line />         ← top accent
    <div.landing-logo-ring>            ← conic-gradient circle
      <Image src="/images/metele-logo.png" />
    </div>
    <h1.landing-gradient-text>         ← "METELE NOMÁS"
    <p>                                ← "PODCAST · STREAMING · MINIJUEGOS"
    <a href="#games"> JUGAR </a>       ← smooth scroll CTA
    <TickerMarquee />                  ← from data/ticker.ts
    <div.landing-light-line />         ← bottom accent
  </Hero>

  <GameGrid id="games">
    <h2.landing-gradient-text> MINIJUEGOS
    <div.grid>
      <Link href="/games/*">           ← × 15
        <div.landing-glass>            ← glass card
          <Image /> <badges />
          <h3> title
          <p> description
          <ComicButton variant="landing"> ¡JUGAR AHORA!
        </div>
      </Link>
    </div>
  </GameGrid>

  <Footer>
    <TickerMarquee />                  ← shared component from data/ticker.ts
    <div.flex>                         ← social links
      <a.landing-glass × 4>            ← Spotify, Instagram, TikTok, YouTube
    </div>
    <a href="https://metelenomas.lat"> metelenomas.lat
    <p> © 2025 …
  </Footer>
</main>
```

## Reduced-Motion Strategy

| Animation | Normal | `prefers-reduced-motion: reduce` |
|-----------|--------|----------------------------------|
| Blob float (`blobFloat*`) | CSS `@keyframes` infinite | `animation: none` via media query |
| Ticker marquee | CSS `marqueeScroll` 25s linear | `animation: none`; phrases render as static flex wrap |
| Card hover scale | Framer Motion `whileHover` | Framer Motion auto-disables via `useReducedMotion()` — wrap hover in conditional |
| Logo ring pulse | CSS `animate-pulse` | Disabled via media query |
| Parallax (removed) | N/A — removed in redesign | N/A |

Implementation: add a single `@media (prefers-reduced-motion: reduce)` block in `globals.css` targeting `.landing-blob-float-*`, `.landing-marquee`, and `.landing-logo-ring`. For Framer Motion hover effects in GameGrid, use `useReducedMotion()` hook to conditionally skip `whileHover`.

## Accessibility

- All interactive elements (JUGAR CTA, card links, social links) receive `focus-visible:ring-2 focus-visible:ring-metele-pink focus-visible:ring-offset-2 focus-visible:ring-offset-comic-black`.
- Social links: `aria-label="Metele Nomás en {platform}"`.
- Ticker: `aria-hidden="true"` (decorative repetition).
- Contrast: white text on `#1D1D1B` = 17.4:1 ratio (AAA). Gradient text uses `metele-pink` (#ef1b77) and `metele-orange` (#ff9343) on dark — both pass AA for large text (title is `text-6xl+`).
- Keyboard: all links are native `<a>` elements; JUGAR CTA is `<a>` not `<button>` since it scrolls in-page.

## 400-Line Budget Forecast

| File | Estimated diff lines (add + del) |
|------|----------------------------------|
| `data/ticker.ts` | ~30 (new) |
| `app/globals.css` | ~65 (added utilities + keyframes + media query) |
| `app/layout.tsx` | ~5 (body class swap) |
| `components/ui/ComicButton.tsx` | ~4 (variant addition) |
| `components/home/Hero.tsx` | ~320 (heavy rewrite: ~140 added, ~180 deleted) |
| `components/home/GameGrid.tsx` | ~180 (glass cards: ~90 added, ~90 deleted) |
| `components/home/Footer.tsx` | ~200 (dark rewrite: ~100 added, ~100 deleted) |
| **Total** | **~804** |

**Decision needed before apply: Yes**
**Chained PRs recommended: Yes**
**400-line budget risk: High**

### Recommended Slices

| Slice | Scope | Est. lines | Verifiable independently |
|-------|-------|-----------|--------------------------|
| **PR 1: Foundation** | `data/ticker.ts`, `globals.css` utilities, `layout.tsx` body, `ComicButton` variant | ~104 | Build passes, no visual regression on games, ticker data importable |
| **PR 2: Hero + GameGrid** | Hero rewrite, GameGrid glass cards | ~500 | Dark hero renders, 15 glass cards visible, JUGAR scrolls to #games |
| **PR 3: Footer** | Footer dark rewrite, ticker + socials | ~200 | Ticker marquee cycles, 4 socials open `_blank`, metelenomas.lat link works |

PR 2 is still over 400 but is a single coherent visual unit (the main viewport). If stricter slicing is needed, Hero and GameGrid can split into PR 2a/2b.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | `data/ticker.ts` exports correct arrays | Vitest: array length, non-empty strings, SOCIAL_LINKS shape |
| Unit | ComicButton `landing` variant renders | Vitest + RTL: renders with glass classes, default variant unchanged |
| Visual | No game regression | Manual: open `/games/pelimojis`, verify yellow bg + comic tokens intact |
| A11y | Keyboard nav, focus rings, reduced-motion | Manual: Tab through landing; toggle OS reduced-motion |
| Build | `npm run build` passes | CI gate |

## Threat Matrix

N/A — no routing, shell, subprocess, VCS/PR automation, executable-file classification, or process-integration boundary.

## Migration / Rollout

No migration required. Pure CSS/component restyle. Rollback: revert the 7 files. No data, routes, dependencies, or game behavior affected.

## Open Questions

- [ ] Should PR 2 (Hero + GameGrid, ~500 lines) be split into PR 2a (Hero) and PR 2b (GameGrid) for stricter 400-line compliance?
- [ ] Confirm `final-bg.png` stays in Footer on dark surface (proposal question 3) — may need a dark-mode variant or removal.
