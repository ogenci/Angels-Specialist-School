import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function BrandStamp() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.92, 1, 1, 0.92]);

  return (
    <section ref={ref} className="relative min-h-[30svh] lg:min-h-[35svh] bg-[var(--ink)] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)/20_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      <motion.div
        style={{ opacity, y, scale }}
        className="relative w-full max-w-[1250px] mx-auto px-6 lg:px-12"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-white text-[clamp(4rem,12vw,12rem)] leading-[0.9] font-light text-center uppercase tracking-[0.25em] lg:tracking-[0.35em]">
            ASSI
          </h2>
          <div className="mt-4 h-px max-w-[200px] mx-auto bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />
          <p className="mt-4 text-white/45 text-sm uppercase tracking-[0.28em] text-center">
            Est. Tema, Ghana · Cambridge International Education
          </p>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--ink)] to-transparent pointer-events-none" />
    </section>
  );
}
