import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Patrones intencionales en la UI de los juegos:
      // - react-hooks/purity: barajado de opciones con Math.random al montar/reiniciar.
      // - react-hooks/set-state-in-effect: sincronización de puntaje derivado del
      //   jugador actual. Deliberados en juegos pass-and-play; no rompen el build
      //   (Next 16 no corre lint durante `next build`).
      "react-hooks/purity": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]);

export default eslintConfig;
