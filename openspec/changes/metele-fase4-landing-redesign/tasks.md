# Tasks: Metele Fase 4 — Landing Redesign

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~804 (700–900; Slice 2 ~500) |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 Foundation → PR 2 Hero+GameGrid → PR 3 Footer |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Foundation: ticker data, CSS utilities, layout body, ComicButton variant | PR 1 | `npm test -- data/ticker.test.tsx` | `npm run build`; open home route and the pelimojis game route | Revert `data/ticker.tsx`, `app/globals.css`, `app/layout.tsx`, `components/ui/ComicButton.tsx` |
| 2 | Hero + GameGrid dark/glass redesign | PR 2 | `npm test` | `npm run build`; click JUGAR → `#games`; Tab cards | Revert `components/home/Hero.tsx`, `components/home/GameGrid.tsx` |
| 3 | Footer dark redesign + ticker + socials | PR 3 | `npm test` | `npm run build`; open footer; click 4 socials + metelenomas.lat | Revert `components/home/Footer.tsx` |

## Slice 1: Foundation (PR 1)

- [ ] RED: Create `data/ticker.test.tsx` asserting `TICKER_PHRASES` (≥11 non-empty unique strings) and `SOCIAL_LINKS` (4 items, `{label, href, icon}` shape, `https://` hrefs, icons spotify/instagram/tiktok/youtube). <!-- sdd-owner: implementation -->
- [ ] GREEN: Create `data/ticker.tsx` exporting `TICKER_PHRASES`, `SOCIAL_LINKS`, and `SocialIcon` (spotify/tiktok inline svg + lucide Instagram/Youtube), consolidating the Hero/Footer duplicates. <!-- sdd-owner: implementation -->
- [ ] RED: Add `components/ui/ComicButton.test.tsx` asserting `variant="landing"` renders `bg-white/10` + `border-white/20` glass classes and default renders unchanged `primary`. <!-- sdd-owner: implementation -->
- [ ] GREEN: Add `landing` to `ComicButton.tsx` variant union and variants map (`bg-white/10 text-white border-white/20 backdrop-blur-md hover:bg-white/20 hover:border-metele-pink/50 shadow-none border-2`); default stays `primary`. <!-- sdd-owner: implementation -->
- [ ] Append `@layer utilities` block in `app/globals.css`: `.landing-blob`, `.landing-blob-float-{a,b,c}`, `.landing-dot-grid`, `.landing-gradient-text`, `.landing-glass`, `.landing-glass-hover`, `.landing-marquee`, `.landing-marquee-pause`, `.landing-light-line`, `.landing-logo-ring` with `@keyframes blobFloat*/marqueeScroll`, plus `prefers-reduced-motion` block disabling blob/marquee/ring animations; touch no `comic-*` token. <!-- sdd-owner: implementation -->
- [ ] Change `app/layout.tsx` body class `bg-comic-yellow` → `bg-comic-black text-white` (keep `overflow-x-hidden`). <!-- sdd-owner: implementation -->
- [ ] Verify: `npm test`, `npm run lint`, `npx tsc --noEmit`, `npm run build` pass; the pelimojis game route still renders yellow GameShell. <!-- sdd-owner: implementation -->

## Slice 2: Hero + GameGrid (PR 2)

- [ ] Rewrite `components/home/Hero.tsx`: remove action words, parallax transforms, "No te lo pierdas" section, and dividers; add 3 `landing-blob-float-*` blobs, `landing-dot-grid`, top/bottom `landing-light-line`, `landing-logo-ring` around `public/images/metele-logo.png`, `landing-gradient-text` "METELE NOMÁS", tag "PODCAST · STREAMING · MINIJUEGOS", `<a href="#games">` JUGAR CTA. <!-- sdd-owner: implementation -->
- [ ] Import `TICKER_PHRASES` from `data/ticker.tsx`; render ticker via `landing-marquee` with `aria-hidden="true"` and static layout under reduced motion, keeping the phrase set identical. <!-- sdd-owner: implementation -->
- [ ] Rewrite `components/home/GameGrid.tsx` to dark bg with `landing-gradient-text` "MINIJUEGOS" title; remove comic floating shapes; keep all 15 entries, `id="games"`, hrefs, and `comingSoon` logic untouched. <!-- sdd-owner: implementation -->
- [ ] Restyle the 15 cards with `landing-glass` + `landing-glass-hover`; card CTA uses `ComicButton variant="landing"` with pink→orange gradient text; wrap `whileHover` scale in `useReducedMotion()` guard. <!-- sdd-owner: implementation -->
- [ ] Add `aria-label`s and `focus-visible:ring-2 ring-metele-pink ring-offset-2 ring-offset-comic-black` to CTA, card links, and social links. <!-- sdd-owner: implementation -->
- [ ] Verify: `npm test`, lint, typecheck, build pass; JUGAR smooth-scrolls to `#games`; exactly 15 cards with zero `comingSoon`; Tab reaches every card. <!-- sdd-owner: implementation -->

## Slice 3: Footer (PR 3)

- [ ] Rewrite `components/home/Footer.tsx`: dark surface, remove diagonal dividers, floating comic words, and unused parallax; import `TICKER_PHRASES`, `SOCIAL_LINKS`, `SocialIcon` from `data/ticker.tsx`; keep `final-bg.png` only if dark-surface decision allows. <!-- sdd-owner: implementation -->
- [ ] Render footer marquee with `landing-marquee` (aria-hidden, static under reduced motion) and 4 `landing-glass` social links with `target="_blank" rel="noopener noreferrer"` and `aria-label="Metele Nomás en {platform}"`. <!-- sdd-owner: implementation -->
- [ ] Keep `https://metelenomas.lat` link and `© 2025 Metele Nomás…` line with visible focus rings. <!-- sdd-owner: implementation -->
- [ ] Verify: `npm test`, lint, typecheck, build pass; socials open in new tab; marquee cycles phrases. <!-- sdd-owner: implementation -->

## Post-Apply Review

- [ ] Choose chain strategy (stacked-to-main / feature-branch-chain / size-exception) and confirm whether PR 2 splits into 2a/2b before apply. <!-- sdd-owner: parent -->
- [ ] Run bounded review over the chained PRs and re-confirm the pelimojis game route visual baseline unchanged after all slices. <!-- sdd-owner: parent -->
