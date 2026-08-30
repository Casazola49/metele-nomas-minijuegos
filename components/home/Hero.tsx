"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Instagram, Youtube, ChevronDown } from "lucide-react";
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

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const decorRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const decorScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);

  // Comic action words (Metele Nomás palette)
  const actionWords = [
    { text: "¡POW!", color: "bg-comic-pink", x: "5%", y: "18%", rotate: -15, delay: 0 },
    { text: "¡ZAP!", color: "bg-comic-purple", x: "85%", y: "22%", rotate: 12, delay: 0.2 },
    { text: "¡BOOM!", color: "bg-comic-orange", x: "10%", y: "72%", rotate: -8, delay: 0.4 },
    { text: "¡WOW!", color: "bg-comic-green", x: "80%", y: "68%", rotate: 10, delay: 0.6 },
  ];

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative w-full min-h-screen bg-comic-purple flex flex-col justify-center items-center overflow-hidden pt-16">
        {/* Animated Background Rays */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ rotate: decorRotate, scale: decorScale }}
        >
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,_transparent_0deg,_rgba(255,255,255,0.1)_10deg,_transparent_20deg)] bg-center" />
        </motion.div>

        {/* Floating Comic Dots Pattern */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Animated Action Words */}
        {actionWords.map((word) => (
          <motion.div
            key={word.text}
            initial={{ scale: 0, rotate: word.rotate - 20 }}
            animate={{ scale: 1, rotate: word.rotate }}
            transition={{
              delay: word.delay + 0.5,
              duration: 0.6,
              type: "spring",
              stiffness: 200
            }}
            className={`absolute ${word.color} text-white font-display text-2xl md:text-4xl px-4 py-2 border-4 border-black shadow-comic z-20 select-none hidden md:block`}
            style={{ left: word.x, top: word.y }}
          >
            {word.text}
          </motion.div>
        ))}

        {/* Brand Title */}
        <div className="relative z-10 text-center px-4 mb-4">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
            className="font-[family-name:var(--font-black-han)] text-6xl md:text-8xl lg:text-9xl text-white text-stroke-2 leading-none"
          >
            METELE NOMÁS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-2 font-display text-2xl md:text-4xl text-comic-yellow tracking-[0.25em]"
          >
            PODCAST · STREAMING
          </motion.p>
        </div>

        {/* Main Hero Image with Parallax */}
        <motion.div
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="relative z-10 w-full flex justify-center px-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="relative"
          >
            {/* Glow Effect Behind Image */}
            <div className="absolute inset-0 bg-comic-pink/30 blur-3xl rounded-full scale-110 animate-pulse" />

            <Image
              src="/images/metele-logo.png"
              alt="Metele Nomás"
              width={1024}
              height={932}
              className="w-full h-auto max-w-2xl md:max-w-3xl object-contain drop-shadow-2xl relative z-10"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white"
          >
            <span className="font-bold uppercase tracking-widest text-sm">Scroll</span>
            <ChevronDown className="w-8 h-8 animate-bounce" />
          </motion.div>
        </motion.div>

        {/* Decorative radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)] z-0 pointer-events-none" />
      </section>

      {/* Ticker */}
      <div className="relative bg-comic-black py-3 overflow-hidden z-20">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap text-white font-display uppercase tracking-widest text-lg md:text-2xl"
        >
          {[...Array(2)].map((_, copy) => (
            <span key={copy} className="flex gap-8 items-center">
              {TICKER.map((phrase, i) => (
                <span key={i} className="flex items-center gap-8">
                  <span>{phrase}</span>
                  <span className="text-comic-yellow">★</span>
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Diagonal Divider */}
      <div className="relative h-24 bg-comic-purple z-20">
        <svg className="absolute bottom-0 w-full h-24" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon fill="#ff9343" points="0,100 100,0 100,100" />
        </svg>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black z-10" />
      </div>

      {/* "No te lo pierdas" Section */}
      <section className="relative bg-comic-orange py-20 overflow-hidden">
        {/* Animated Background Bubbles - Fixed positions to avoid hydration errors */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <motion.div
            className="absolute rounded-full bg-white/10 border-2 border-white/20"
            style={{ width: 80, height: 80, left: "10%", top: "20%" }}
            animate={{ y: [-15, 15] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full bg-white/10 border-2 border-white/20"
            style={{ width: 120, height: 120, left: "75%", top: "15%" }}
            animate={{ y: [10, -20] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full bg-white/10 border-2 border-white/20"
            style={{ width: 60, height: 60, left: "30%", top: "70%" }}
            animate={{ x: [-10, 20] }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full bg-white/10 border-2 border-white/20"
            style={{ width: 100, height: 100, left: "85%", top: "60%" }}
            animate={{ y: [20, -10] }}
            transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full bg-white/10 border-2 border-white/20"
            style={{ width: 70, height: 70, left: "50%", top: "40%" }}
            animate={{ scale: [1, 1.15] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </div>

        {/* Comic Burst Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100, rotate: -5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring" }}
            className="bg-comic-yellow border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_#000] transform max-w-4xl mx-auto text-center relative"
          >
            {/* "En Vivo" Stamp */}
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              whileInView={{ scale: 1, rotate: 12 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
              className="absolute -top-8 -right-8 z-20"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="bg-comic-red text-white font-display text-2xl md:text-4xl px-6 py-3 border-4 border-black shadow-comic"
              >
                ¡EN VIVO!
              </motion.div>
            </motion.div>

            {/* Speech Bubble Tail */}
            <div className="absolute -bottom-6 left-1/4 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[24px] border-t-comic-yellow z-10" />
            <div className="absolute -bottom-7 left-1/4 ml-[-2px] w-0 h-0 border-l-[22px] border-l-transparent border-r-[22px] border-r-transparent border-t-[26px] border-t-black -z-10" />

            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-7xl font-display text-comic-purple text-stroke shadow-comic mb-4"
            >
              ¡No te lo pierdas!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-3xl font-bold text-comic-black mb-8"
            >
              Transmite de lunes a viernes a partir de las 10:30 AM
            </motion.p>

            {/* Social Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4 md:gap-6"
            >
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Another Diagonal Divider */}
      <div className="relative h-24 bg-comic-orange z-20">
        <svg className="absolute bottom-0 w-full h-24" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon fill="#FFFFFF" points="0,0 0,100 100,100" />
        </svg>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black z-10" />
      </div>
    </div>
  );
}
