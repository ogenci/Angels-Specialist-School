import { Reveal, StaggerGroup, StaggerItem } from "../motion/Reveal";
import { SECTIONS } from "./data";

export function JourneyTimeline() {
  return (
    <section id="academics" className="py-28 lg:py-40 bg-white">
      <div className="mx-auto max-w-[1250px] px-6 lg:px-12">
        <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
                The Academic Journey
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] text-balance text-[var(--ink)]">
              From first words to <span className="italic">first university offers.</span>
            </h2>
          </div>
          <p className="text-[var(--muted-foreground)] max-w-sm">
            A continuous Cambridge pathway from age one through A Level - with BECE optionality and
            full boarding from age nine.
          </p>
        </Reveal>

        <StaggerGroup stagger={0.07} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SECTIONS.map((s, i) => (
            <StaggerItem key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (s.id === "boarding") {
                    window.dispatchEvent(
                      new CustomEvent("open-admissions", { detail: { mode: "enquire" } }),
                    );
                  } else {
                    window.dispatchEvent(
                      new CustomEvent("open-curriculum", { detail: { stageId: s.id } }),
                    );
                  }
                }}
                className="group block relative overflow-hidden rounded-[8px] bg-[var(--ink)] cursor-pointer"
              >
                <div className="aspect-[4/5.75] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.name}
                    loading={i > 2 ? "lazy" : "eager"}
                    className="h-full w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1200ms] ease-out"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-[var(--gold)] mb-2">
                    <span>{s.age}</span>
                    <span className="h-px w-4 bg-[var(--gold)]" />
                    <span>{s.qual}</span>
                  </div>
                  <h3 className="font-display text-3xl text-white">{s.name}</h3>
                  <p className="mt-2 text-sm text-white/75 max-w-xs leading-relaxed">{s.blurb}</p>
                  <div className="mt-5 flex items-center gap-2 text-white text-sm">
                    Explore Details
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
