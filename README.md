# Metele Nomás — Minijuegos 🎮

Minijuegos oficiales de **Metele Nomás**, el podcast y streaming de Bolivia. Una colección de juegos de preguntas y reflejos pensados para jugar en vivo con El Carda, La Mosca y El Yeison.

> Rebrand de la base original (antes *Así Somos*) a la identidad visual de Metele Nomás: paleta comic, tipografía display y estilo de viñeta.

## ¿Qué es?

Una web de minijuegos tipo "pass-and-play" para 1 a 6 jugadores. Cada juego maneja turnos, puntaje y feedback visual desde un shell compartido (`components/game/GameShell.tsx`), y la lógica de turnos/puntaje se centraliza en el hook `lib/useGameTurn.ts`.

## Cómo correr

Requisitos: Node.js 18.18+ (probado con Node 20) y npm.

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo (http://localhost:3000)
npm run dev

# 3. Build de producción
npm run build

# 4. Servir el build
npm start
```

Scripts disponibles:

| Script           | Descripción                              |
| ---------------- | ---------------------------------------- |
| `npm run dev`    | Servidor de desarrollo con hot reload    |
| `npm run build`  | Build de producción de Next.js           |
| `npm run start`  | Sirve el build de producción             |
| `npm run lint`   | ESLint (flat config, core-web-vitals)    |

## Juegos activos (6)

| Juego             | Qué se juega                                                       |
| ----------------- | ------------------------------------------------------------------ |
| **Pelimojis**      | Adiviná la película o serie a partir de una secuencia de emojis.   |
| **¿Cuál fue primero?** | ¿Qué invento es más antiguo? Volteretas de historia.          |
| **¿Adivina la edad?**  | ¿La celebridad de la derecha es mayor o menor?                |
| **Pixel Chef**     | Adiviná el plato de comida, cada vez menos pixeleado.            |
| **¿A cuánto case?** | ¿El producto de la derecha cuesta más o menos que el de la izq? |
| **¿Real o IA?**     | ¿La imagen es real o fue generada por inteligencia artificial?    |

## Próximos juegos (9)

`quien-lo-dijo`, `face-mashup`, `color-correcto`, `mundo-girado`, `guerra-criticas`, `noticia-o-fake`, `polemica-total`, `ahorcado-funable`, `ingredientes`.

Están listados en `components/home/GameGrid.tsx` con `comingSoon: true` y bloqueados (sin ruta) hasta que se implementen.

## Stack

- [Next.js 16](https://nextjs.org) (App Router)
- React 19
- TypeScript (strict)
- Tailwind CSS v4 (paleta de marca en `app/globals.css`)
- Framer Motion (animaciones)
- `lucide-react` (íconos)
- `clsx` + `tailwind-merge` para la utilidad `cn`

## Estructura

```
app/
  layout.tsx              # Metadata SEO (OpenGraph, Twitter, canonical)
  page.tsx                # Home: Hero + GameGrid + Footer
  games/<juego>/page.tsx  # Cada minijuego
components/
  game/GameShell.tsx      # Shell compartido (start / playing / gameover)
  game/Scoreboard.tsx
  home/GameGrid.tsx       # Catálogo de juegos (activos + próximos)
  home/Hero.tsx, Footer.tsx
  ui/                     # ComicButton, ComicCard, FeedbackOverlay
lib/
  useGameTurn.ts          # Hook de turnos/puntaje (jugadores, feedback, usedIds)
  utils.ts                # cn()
data/                     # Datos de cada juego (movies, inventions, celebrities, foods, products, realOrAi)
```

## Deploy

Optimizado para [Vercel](https://vercel.com): importá el repo y `npm run build` se ejecuta automáticamente. No requiere variables de entorno.

> El dominio canónico en `app/layout.tsx` apunta hoy a `https://metelenomas.lat`. Actualizalo al subdominio definitivo de los minijuegos (por ej. `https://minijuegos.metelenomas.lat`) cuando se confirme el deploy.

## Seguridad

`npm audit` reporta vulnerabilidades residuales solo en dependencias internas de Next.js (`postcss` y `sharp` dentro de `next`), cuyo fix requiere `next@16.3.3` (fuera del rango fijado). No se aplicó `--force` para no romper el rango de dependencias. El resto de advertencias (toolchain de dev) ya fueron resueltas con `npm audit fix`.

## Créditos

- **Metele Nomás** — El Carda, La Mosca que te preguntó y El Yeison.
- Hecho con cariño en Bolivia 🇧🇴.

## Licencia

Uso interno / demostrativo del ecosistema Metele Nomás.
