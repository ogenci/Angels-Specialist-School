import { Reveal, StaggerGroup, StaggerItem } from "../motion/Reveal";

const PILLARS = [
  {
    n: "01",
    t: "Treasured Uniqueness",
    d: "Your child blooms in an environment that celebrates each learner's gift, pace and voice.",
    img: "/gallery/img1.webp",
  },
  {
    n: "02",
    t: "A Global Community",
    d: "Pupils from over ten nationalities - a school where the world meets in one classroom.",
    img: "/gallery/img2.webp",
  },
  {
    n: "03",
    t: "Open-Door Leadership",
    d: "The Principal's door is always open - to parents, staff and pupils alike.",
    img: "/gallery/img3.webp",
  },
  {
    n: "04",
    t: "Faith & Character",
    d: "Excellence rooted in Christian values that shape thinking, behaviour and life.",
    img: "/gallery/img4.webp",
  },
];

export function Pillars() {
  return (
    <section className="py-28 lg:py-40 bg-[var(--ivory)]">
      <div className="mx-auto max-w-[1250px] px-6 lg:px-12">
        <Reveal className="max-w-3xl mb-16 lg:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
              The Angels Difference
            </span>
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] text-balance text-[var(--ink)]">
            Four convictions that shape <span className="italic">every Angel.</span>
          </h2>
        </Reveal>

        <StaggerGroup className="grid md:grid-cols-2 gap-6 mt-16">
          {PILLARS.map((p) => (
            <StaggerItem
              key={p.n}
              className="relative overflow-hidden rounded-[8px] bg-[var(--ink)] min-h-[423px] lg:min-h-[503px] group cursor-pointer flex flex-col"
            >
              <div className="absolute inset-0">
                <img
                  src={p.img}
                  alt={p.t}
                  className="h-full w-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-[1200ms] ease-out"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="relative z-10 p-6 sm:p-10 lg:p-14 flex-1 flex flex-col justify-end">
                <div className="font-display text-sm text-[var(--gold)] tracking-widest mb-3">
                  {p.n}
                </div>
                <h3 className="font-display text-3xl lg:text-4xl text-white text-balance transition-colors duration-500">
                  {p.t}
                </h3>
                <p className="mt-4 text-white/75 text-lg leading-relaxed max-w-md transition-colors duration-500">
                  {p.d}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
