"use client";

import { SOCIAL_LINKS, SocialIcon, TICKER_PHRASES } from "@/data/ticker";

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metele-pink focus-visible:ring-offset-2 focus-visible:ring-offset-comic-black";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-comic-black px-4 py-20 text-white" aria-label="Pie de página de Metele Nomás">
      <div className="landing-light-line absolute top-0 left-0 w-full" />
      <div className="mx-auto max-w-6xl">
        <div className="landing-glass overflow-hidden rounded-2xl">
          <div className="overflow-hidden border-b border-white/10 py-4" aria-hidden="true">
            <div className="landing-marquee flex w-max gap-8 whitespace-nowrap font-display uppercase tracking-widest landing-marquee-pause">
              {[...TICKER_PHRASES, ...TICKER_PHRASES].map((phrase, index) => (
                <span key={`${phrase}-${index}`} className="flex items-center gap-8">★ {phrase}</span>
              ))}
            </div>
          </div>
          <div className="p-8 text-center md:p-14">
            <p className="landing-gradient-text font-display text-5xl md:text-7xl">¡SÍGUENOS!</p>
            <p className="mt-3 text-lg font-bold text-white/70 md:text-2xl">De lunes a viernes desde las 10:30 AM 🎙️</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Metele Nomás en ${social.label}`} className={`landing-glass landing-glass-hover flex items-center gap-3 rounded-lg px-5 py-3 font-display text-lg ${focusRing}`}>
                  <SocialIcon name={social.icon} />{social.label}
                </a>
              ))}
            </div>
            <a href="https://metelenomas.lat" target="_blank" rel="noopener noreferrer" className={`mt-10 inline-block font-display text-2xl text-metele-orange underline decoration-white/30 underline-offset-4 hover:text-metele-pink ${focusRing}`}>
              metelenomas.lat
            </a>
            <p className="mt-6 text-sm text-white/50">© 2025 Metele Nomás — Minijuegos. Hecho con cariño en Bolivia 🇧🇴</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
