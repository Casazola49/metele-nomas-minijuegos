# Landing Specification

## Purpose

Defines the dark/glass home surface for Metele Nomás (Hero, Game Grid, Footer, root layout) plus its accessibility, motion, and isolation rules. Game routes and `GameShell` use a separate spec and stay untouched.

## Requirements

### Requirement: Landing Root Surface

The root layout MUST set the landing `<body>` background to `--color-comic-black` (#1D1D1B) with light foreground text, and MUST NOT mutate, rename, or remove any `comic-*` token in `app/globals.css`.

**Touches**: `app/layout.tsx`, `app/globals.css`.

#### Scenario: Dark landing, intact comic tokens

- GIVEN the redesign ships
- WHEN a visitor opens `/` and then any `/games/*` route
- THEN the landing body background is #1D1D1B with light text, and every `--color-comic-*` token still resolves to its pre-change value on the game route

### Requirement: Hero Section

The Hero MUST render on a dark surface with three animated blurred gradient blobs, a fixed dot-grid overlay, a circular logo ring with conic gradient, the title "METELE NOMÁS" with a pink→orange text gradient, the tag "PODCAST · STREAMING · MINIJUEGOS", top/bottom light-line accents, and a "JUGAR" CTA that smooth-scrolls to `#games`.

**Touches**: `components/home/Hero.tsx`, `app/globals.css`.

#### Scenario: JUGAR CTA scrolls to the games section

- GIVEN the Hero is rendered and the grid has `id="games"`
- WHEN the visitor activates the "JUGAR" CTA
- THEN the viewport smooth-scrolls to `#games` and a focusable element inside the grid receives focus

### Requirement: Game Grid

The Game Grid MUST render the 15 active cards on a dark section with glass styling (white/5 background, white/10 border, `backdrop-blur`) and a gradient section title. Each card MUST apply a glow + scale hover state and a pink→orange gradient "JUGAR" link. Zero cards MAY render a `comingSoon` flag.

**Touches**: `components/home/GameGrid.tsx`.

#### Scenario: All 15 cards render with zero comingSoon

- GIVEN the home page mounts
- WHEN the visitor scrolls to the grid
- THEN exactly 15 cards are visible, no `comingSoon` badge is shown, and each card links to its existing `/games/*` route

### Requirement: Footer

The Footer MUST render on a dark surface with a horizontal marquee cycling the podcast phrases from a single shared source, four social links (Spotify, Instagram, TikTok, YouTube) opening in a new tab, and a link to `https://metelenomas.lat`. It MUST reuse existing assets and MUST NOT introduce new image, audio, or video material.

**Touches**: `components/home/Footer.tsx`, shared ticker with `Hero.tsx`.

#### Scenario: Ticker and socials render correctly

- GIVEN the visitor reaches the footer
- WHEN the section enters the viewport
- THEN the marquee cycles the podcast phrases and the four social links open with `target="_blank"` and `rel="noopener noreferrer"`

### Requirement: Motion & Reduced Motion

All landing motion (blob drift, ticker scroll, card hover/scale, parallax) MUST honor `prefers-reduced-motion: reduce`: blob animations MUST stop or substantially slow, the ticker MUST pause or render as a static list, and parallax MUST be disabled.

**Touches**: `components/home/{Hero,GameGrid,Footer}.tsx`.

#### Scenario: Reduced-motion visitor

- GIVEN the OS reports `prefers-reduced-motion: reduce`
- WHEN the landing renders
- THEN no continuous blob animation runs, the ticker is static or paused, and the page remains fully readable

### Requirement: Accessibility

The landing MUST meet WCAG AA contrast on the dark surface, MUST expose visible focus rings on every interactive element (CTA, card link, social link), MUST provide `aria-label`s for icon-only buttons and social links, and MUST remain usable with keyboard navigation alone.

**Touches**: all landing components.

#### Scenario: Keyboard-only navigation

- GIVEN a keyboard-only visitor reaches the landing
- WHEN they Tab through the Hero CTA, grid cards, and social links
- THEN every interactive element receives a visible focus state and can be activated with Enter or Space

### Requirement: Landing/Game Isolation

Landing code MUST NOT import or mutate components, tokens, or styles owned by `components/game/GameShell.tsx`, the game routes, or the `comic-*` tokens. New visual utilities MUST use a landing-only prefix (e.g. `landing-*`) and `ComicButton` MUST only gain styling through an explicit opt-in variant whose default is unchanged.

**Touches**: `app/globals.css`, `components/ui/ComicButton.tsx`.

#### Scenario: No regression in representative game routes

- GIVEN the redesign ships
- WHEN the visitor opens a representative game route (e.g. `/games/pelimojis`)
- THEN the game shell, `ComicButton` defaults, and comic tokens are visually and behaviorally identical to the pre-change baseline
