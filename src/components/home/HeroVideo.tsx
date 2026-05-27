import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ASSET } from "./data";

export function HeroVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden bg-[var(--ink)]">
      {/* Image background */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{ backgroundImage: `url(/hero-bg.webp)` }}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/30 via-transparent to-[var(--gold)]/10 mix-blend-overlay" />
      <div className="absolute inset-0 [background-image:radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.08),transparent_60%)]" />

      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.5%22/></svg>')]" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto max-w-[1250px] px-6 lg:px-12 min-h-[100svh] flex flex-col justify-end pb-24 pt-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="text-xs uppercase tracking-[0.28em] text-white/80">
            Est. Tema, Ghana · Cambridge International School
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-white text-[clamp(2.75rem,7.5vw,7rem)] leading-[0.95] font-light text-balance max-w-[24ch]"
        >
          Each child. <span className="italic font-normal text-[var(--gold)]">One world.</span>
          <br />
          Endless promise.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 max-w-xl text-white/80 text-lg leading-relaxed text-pretty"
        >
          A British-Council-recognised IGCSE school in Tema where faith, intellect and character
          meet - preparing scholars from over ten nationalities for the world ahead.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-admissions", { detail: { mode: "tour" } }))
            }
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--gold)] text-[var(--ink)] font-medium hover:bg-white hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl transition-all duration-300 ease-out cursor-pointer"
          >
            Book a Campus Tour
            <span className="transition-transform group-hover:translate-x-1.5">→</span>
          </button>
          <button
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("open-admissions", { detail: { mode: "enquire" } }),
              )
            }
            className="inline-flex items-center gap-3 px-7 py-4 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Download Prospectus
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
