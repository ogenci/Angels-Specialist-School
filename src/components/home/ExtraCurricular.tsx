import { Reveal, StaggerGroup, StaggerItem } from "../motion/Reveal";
import { ASSET } from "./data";

const CLUBS = [
  "Spelling Bee",
  "Music",
  "Debate",
  "Football",
  "Coding",
  "Drama",
  "Choir",
  "Art",
  "Athletics",
  "Robotics",
  "Chess",
  "Dance",
];

export function ExtraCurricular() {
  return (
    <section className="relative py-28 lg:py-40 bg-[var(--ink)] text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${ASSET}/extra-co.JPG)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/80 to-[var(--ink)]/60" />

      <div className="relative mx-auto max-w-[1250px] px-6 lg:px-12 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-6">
          <Reveal className="flex items-center gap-3 mb-6">
            <span className="text-xs uppercase tracking-[0.28em] text-white/70">
              Beyond the classroom
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] text-balance">
              Play is how a child{" "}
              <span className="italic text-[var(--gold)]">tries the world on for size.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="mt-8 text-white/75 text-lg max-w-md">
            Clubs, choirs and competitions before and after school - every Angel finds the corner of
            the world that lights them up.
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:pt-16">
          <StaggerGroup stagger={0.04} className="flex flex-wrap gap-3">
            {CLUBS.map((c) => (
              <StaggerItem key={c}>
                <span className="inline-flex items-center px-5 py-3 rounded-full border border-white/20 text-white/90 text-sm hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors">
                  {c}
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
