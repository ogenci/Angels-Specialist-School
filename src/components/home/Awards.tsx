import { Reveal } from "../motion/Reveal";
import { ASSET } from "./data";

export function Awards() {
  return (
    <section id="awards" className="py-28 lg:py-40 bg-[var(--ivory)]">
      <div className="mx-auto max-w-[1250px] px-6 lg:px-12 grid lg:grid-cols-12 gap-16 items-center">
        <Reveal className="lg:col-span-6">
          <div className="relative aspect-[4/4.14] bg-gradient-to-br from-[var(--primary)] to-[var(--ink)] rounded-[8px] overflow-hidden">
            <img
              src={`${ASSET}/building.jpg`}
              alt="British Council Best IGCSE School Award"
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 grid place-items-center p-10 text-center">
              <div>
                <div className="text-[var(--gold)] text-xs uppercase tracking-[0.3em] mb-4">
                  British Council · 2022/23
                </div>
                <div className="font-display text-white text-5xl lg:text-7xl leading-[0.95] text-balance">
                  Best IGCSE School in Ghana
                </div>
                <div className="mt-6 text-white/70 text-sm uppercase tracking-widest">
                  Cambridge Assessment International Education
                </div>
              </div>
            </div>
            <div className="absolute inset-0 ring-1 ring-inset ring-[var(--gold)]/30" />
          </div>
        </Reveal>

        <div className="lg:col-span-6">
          <Reveal className="flex items-center gap-3 mb-6">
            <span className="text-xs uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
              Awards & Recognition
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <blockquote className="font-display text-[clamp(1.75rem,3.5vw,3rem)] leading-tight text-[var(--ink)] text-balance">
              <span className="text-[var(--gold)]">"</span>
              An institution of academic distinction whose IGCSE outcomes set a national standard.
              <span className="text-[var(--gold)]">"</span>
            </blockquote>
          </Reveal>
          <Reveal
            delay={0.1}
            className="mt-8 text-[var(--muted-foreground)] text-sm uppercase tracking-widest"
          >
            - British Council Partner Schools Awards, 2022
          </Reveal>

          <Reveal delay={0.15} className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { k: "100%", v: "IGCSE pass rate" },
              { k: "A*–B", v: "majority of grades" },
              { k: "Top 1%", v: "in Ghana" },
            ].map((m) => (
              <div key={m.v} className="border-l border-[var(--border)] pl-4">
                <div className="font-display text-3xl text-[var(--ink)]">{m.k}</div>
                <div className="text-xs text-[var(--muted-foreground)] uppercase tracking-widest mt-1">
                  {m.v}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
