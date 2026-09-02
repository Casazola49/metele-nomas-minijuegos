"use client";

import Image from "next/image";
import { TICKER_PHRASES } from "@/data/ticker";

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-metele-pink focus-visible:ring-offset-2 focus-visible:ring-offset-comic-black";

function Ticker() {
  return (
    <div className="w-full overflow-hidden border-y border-white/10 py-3" aria-hidden="true">
      <div className="landing-marquee flex w-max gap-8 whitespace-nowrap font-display text-lg uppercase tracking-widest text-white landing-marquee-pause">
        {[...TICKER_PHRASES, ...TICKER_PHRASES].map((phrase, index) => (
          <span key={`${phrase}-${index}`} className="flex items-center gap-8">
            {phrase}<span className="text-metele-orange">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-comic-black px-4 pt-16">
      <div className="landing-blob landing-blob-float-a left-[-10%] top-[15%] h-72 w-72 bg-metele-pink" />
      <div className="landing-blob landing-blob-float-b right-[-8%] top-[35%] h-96 w-96 bg-metele-purple" />
      <div className="landing-blob landing-blob-float-c bottom-[-12%] left-[35%] h-80 w-80 bg-metele-orange" />
      <div className="landing-dot-grid absolute inset-0" />
      <div className="landing-light-line absolute top-16 left-0 w-full" />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
        <div className="landing-logo-ring flex h-52 w-52 items-center justify-center md:h-72 md:w-72">
          <Image src="/images/metele-logo.png" alt="Metele Nomás" width={1024} height={932} className="h-auto w-[88%] object-contain" priority />
        </div>
        <p className="mt-8 font-display text-lg tracking-[0.25em] text-white/70 md:text-2xl">PODCAST · STREAMING · MINIJUEGOS</p>
        <h1 className="landing-gradient-text mt-2 font-[family-name:var(--font-black-han)] text-6xl leading-none md:text-8xl lg:text-9xl">METELE NOMÁS</h1>
        <a href="#games" className={`mt-10 rounded-lg bg-gradient-to-r from-metele-pink to-metele-orange px-10 py-4 font-display text-2xl text-white transition-transform hover:scale-105 ${focusRing}`} aria-label="Jugar minijuegos">
          JUGAR
        </a>
      </div>

      <div className="relative z-10 mt-16 w-[calc(100%+2rem)]"><Ticker /></div>
      <div className="landing-light-line absolute bottom-0 left-0 w-full" />
    </section>
  );
}
