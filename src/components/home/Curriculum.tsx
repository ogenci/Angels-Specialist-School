import { Reveal } from "../motion/Reveal";

const PATH = [
  { stage: "Foundation", from: "Pre-School", to: "Age 1+", note: "Early Years discovery" },
  { stage: "Primary", from: "Cambridge Primary", to: "Age 6+", note: "Foundational mastery" },
  {
    stage: "Lower Secondary",
    from: "B.E.C.E / Cambridge LS",
    to: "Age 12+",
    note: "Local + global pathways",
  },
  {
    stage: "IGCSE",
    from: "Cambridge IGCSE",
    to: "Age 14+",
    note: "Ghana's #1 - British Council 2022/23",
  },
  {
    stage: "Sixth Form",
    from: "AS & A Level",
    to: "Age 16+",
    note: "Direct route to top universities",
  },
];

export function Curriculum() {
  return (
    <section className="py-28 lg:py-40 bg-[var(--ivory)] border-y border-[var(--border)]">
      <div className="mx-auto max-w-[1250px] px-6 lg:px-12 grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
          <Reveal className="flex items-center gap-3 mb-6">
            <span className="text-xs uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
              Curriculum & Accreditation
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] text-balance text-[var(--ink)]">
              An unbroken <span className="italic">Cambridge</span> pathway.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-6 text-[var(--ink-soft)] text-lg leading-relaxed">
            <p>
              Angels is a recognised Cambridge International School and a British Council Partner.
              Our scholars graduate prepared for university - and for life.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center gap-6">
            <div className="px-4 py-3 border border-[var(--border)] bg-white text-xs uppercase tracking-widest text-[var(--ink-soft)]">
              Cambridge Assessment
            </div>
            <div className="px-4 py-3 border border-[var(--border)] bg-white text-xs uppercase tracking-widest text-[var(--ink-soft)]">
              British Council
            </div>
            <div className="px-4 py-3 border border-[var(--border)] bg-white text-xs uppercase tracking-widest text-[var(--ink-soft)]">
              IGCSE · A Level
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7 relative">
          {/* Elegant Hairline Timeline */}
          <div className="absolute left-[19px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-transparent via-[var(--border)] to-transparent" />
          <ul className="space-y-12">
            {PATH.map((p, i) => (
              <Reveal
                as="li"
                key={p.stage}
                delay={i * 0.06}
                className="relative pl-16 group cursor-pointer"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("open-curriculum", { detail: { stageId: p.stage } }),
                  )
                }
              >
                <div className="absolute left-0 top-1 h-10 w-10 rounded-full bg-[var(--ivory)] border-[0.5px] border-[var(--gold)] grid place-items-center font-display text-sm text-[var(--gold-deep)] group-hover:bg-[var(--ink)] group-hover:border-[var(--ink)] group-hover:text-white group-hover:scale-110 shadow-sm transition-all duration-500 ease-out">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-xs uppercase tracking-[0.25em] text-[var(--gold-deep)] mb-2 transition-transform duration-500 ease-out group-hover:translate-x-2">
                  {p.to}
                </div>
                <div className="font-display text-2xl lg:text-3xl text-[var(--ink)] group-hover:text-[var(--gold-deep)] transition-colors duration-300">
                  {p.stage} ·{" "}
                  <span className="italic font-light text-[var(--ink-soft)] group-hover:text-[var(--ink)] transition-colors">
                    {p.from}
                  </span>
                </div>
                <div className="mt-2 text-[var(--muted-foreground)] flex items-center gap-2">
                  <span>{p.note}</span>
                  <span className="text-[var(--gold-deep)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-semibold uppercase tracking-widest">
                    View Details →
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
