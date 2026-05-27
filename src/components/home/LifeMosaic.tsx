import { Reveal } from "../motion/Reveal";
import { GALLERY } from "./data";

export function LifeMosaic() {
  return (
    <section id="life" className="py-28 lg:py-40 bg-white">
      <div className="mx-auto max-w-[1250px] px-6 lg:px-12">
        <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
                Life at Angels
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] text-balance text-[var(--ink)]">
              A school in <span className="italic">full motion.</span>
            </h2>
          </div>
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-lightbox", { detail: { index: 0 } }))
            }
            className="group inline-flex items-center gap-2 text-[var(--ink)] border-b border-[var(--ink)] pb-1 cursor-pointer"
          >
            View the gallery
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </Reveal>

        <div className="grid grid-cols-12 gap-4 lg:gap-6 auto-rows-[140px] sm:auto-rows-[180px] lg:auto-rows-[220px]">
          {GALLERY.map((g, i) => {
            const layouts = [
              "col-span-12 md:col-span-8 row-span-2",
              "col-span-12 md:col-span-4 row-span-1",
              "col-span-12 md:col-span-4 row-span-1",
              "col-span-12 md:col-span-4 row-span-2",
              "col-span-12 md:col-span-8 row-span-1",
              "col-span-12 md:col-span-8 row-span-1",
            ];
            return (
              <Reveal
                key={i}
                delay={i * 0.06}
                className={`${layouts[i]} relative overflow-hidden group rounded-[8px] bg-[var(--ink)] cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-[var(--ink)]/20 hover:-translate-y-1 transition-all duration-700`}
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-lightbox", { detail: { index: i } }))
                }
              >
                <img
                  src={g.img}
                  alt={g.title}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.08] transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 lg:p-7">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold)] mb-1">
                    {g.date}
                  </div>
                  <div className="font-display text-xl lg:text-2xl text-white text-balance group-hover:text-[var(--gold)] transition-colors duration-300">
                    {g.title}
                  </div>
                  <div className="text-xs text-white/65 mt-1 flex justify-between items-center">
                    <span>{g.dept}</span>
                    <span className="text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold tracking-wider text-[10px] uppercase">
                      View event →
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
