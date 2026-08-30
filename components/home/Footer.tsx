"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

// Official Metele Nomás ticker phrases
const TICKER = [
  "METELE NOMÁS",
  "PODCAST",
  "EL CARDA",
  "LA MOSCA QUE TE PREGUNTO!",
  "¿ERES THERIAN?",
  "FAFA",
  "CHOCHITO",
  "PICHICOCACHO",
  "EL YEISON",
  "ÚLTIMA COSA, ÚLTIMA PALABRA",
  "PEDRO LUIS COLQUE MAMANI",
];

// Social links — TODO: replace href with the official Metele Nomás platform URLs once confirmed
const SOCIALS = [
  { label: "SPOTIFY", href: "https://metelenomas.lat", icon: "spotify" },
  { label: "INSTAGRAM", href: "https://metelenomas.lat", icon: "instagram" },
  { label: "TIKTOK", href: "https://metelenomas.lat", icon: "tiktok" },
  { label: "YOUTUBE", href: "https://metelenomas.lat", icon: "youtube" },
];

function SocialIcon({ name }: { name: string }) {
  if (name === "spotify") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.586 14.424a.622.622 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 11-.277-1.215c3.809-.871 7.077-.496 9.712 1.115a.623.623 0 01.207.857zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 11-.452-1.493c3.632-1.102 8.147-.568 11.234 1.328a.78.78 0 01.255 1.074zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.935.935 0 11-.543-1.79c3.532-1.072 9.404-.865 13.115 1.338a.936.936 0 01-.945 1.614z" />
      </svg>
    );
  }
  if (name === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
        <path d="M16.5 3c.4 2.2 1.7 3.9 3.8 4.2v3c-1.3.1-2.6-.3-3.8-1v6.3c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6c.3 0 .7 0 1 .1v3.1c-.3-.1-.7-.2-1-.2-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3V3h3.9z" />
      </svg>
    );
  }
  if (name === "instagram") return <Instagram className="w-7 h-7" aria-hidden="true" />;
  if (name === "youtube") return <Youtube className="w-7 h-7" aria-hidden="true" />;
  return null;
}

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [5, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div ref={containerRef} className="relative" role="contentinfo" aria-label="Pie de página de Metele Nomás">
      {/* Diagonal Divider from White to Yellow */}
      <div className="relative h-32 bg-white z-20">
        <svg className="absolute bottom-0 w-full h-32" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon fill="#FFD600" points="0,100 100,0 100,100" />
        </svg>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black z-10" />
      </div>

      {/* Footer Section */}
      <section className="bg-comic-yellow py-20 px-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-64 h-64 border-8 border-black/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-10 -left-10 w-48 h-48 border-8 border-black/10 rounded-full"
        />

        {/* Halftone Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, #000 1.5px, transparent 1.5px)',
          backgroundSize: '20px 20px'
        }} />

        {/* Floating Comic Words */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring" }}
          className="absolute top-10 left-10 bg-comic-blue text-white font-display text-2xl px-4 py-2 border-4 border-black shadow-comic transform -rotate-12 hidden lg:block"
        >
          ¡GRACIAS!
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: "spring" }}
          className="absolute top-20 right-10 bg-comic-pink text-white font-display text-2xl px-4 py-2 border-4 border-black shadow-comic transform rotate-6 hidden lg:block"
        >
          ¡NOS VEMOS!
        </motion.div>

        <div className="container mx-auto relative z-10">
          <motion.div
            style={{
              scale: imageScale,
              rotate: imageRotate,
              opacity: imageOpacity
            }}
            className="max-w-6xl mx-auto"
          >
            <motion.div
              whileHover={{ rotate: -1, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white border-4 border-black p-4 md:p-6 shadow-[16px_16px_0px_0px_#000] transform rotate-1"
            >
              <Image
                src="/images/final-bg.png"
                alt="Metele Nomás - Final"
                width={1920}
                height={800}
                className="w-full h-auto object-contain border-4 border-black"
              />
            </motion.div>
          </motion.div>

          {/* Footer Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-16"
          >
            <p className="font-display text-4xl md:text-6xl text-comic-purple text-stroke mb-4">
              ¡SÍGUENOS!
            </p>
            <p className="text-xl md:text-2xl font-bold text-comic-black mb-8">
              De lunes a viernes desde las 10:30 AM 🎙️
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-all duration-300 hover:scale-110 hover:-rotate-3 active:scale-95 flex items-center gap-3 bg-comic-purple text-white font-display text-lg md:text-xl px-6 py-4 border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#000]"
                >
                  <SocialIcon name={s.icon} />
                  {s.label}
                </a>
              ))}
            </div>

            {/* Official Site */}
            <a
              href="https://metelenomas.lat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transform transition-all duration-300 hover:scale-105 hover:-rotate-2 active:scale-95 bg-comic-black text-white font-display text-lg md:text-2xl px-8 py-3 border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#000]"
            >
              metelenomas.lat
            </a>

                <p className="text-sm font-bold text-comic-black/70 mt-6">
                  © 2025 Metele Nomás — Minijuegos. Hecho con cariño en Bolivia 🇧🇴
                </p>
          </motion.div>
        </div>

        {/* Bottom Comic Strip Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-black flex items-center justify-center overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 text-white font-bold uppercase tracking-widest whitespace-nowrap text-sm md:text-base"
          >
            {[...Array(2)].map((_, copy) => (
              <span key={copy} className="flex gap-8 items-center">
                {TICKER.map((phrase, i) => (
                  <span key={i} className="flex items-center gap-8">
                    <span>★ {phrase} ★</span>
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
