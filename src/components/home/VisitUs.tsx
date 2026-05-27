import { Reveal } from "../motion/Reveal";
import { Phone, MapPin, Mail } from "lucide-react";

export function VisitUs() {
  return (
    <section id="visit" className="py-28 lg:py-40 bg-white">
      <div className="mx-auto max-w-[1250px] px-6 lg:px-12 grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <Reveal className="flex items-center gap-3 mb-6">
            <span className="text-xs uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
              Visit Angels
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] text-balance text-[var(--ink)]">
              Come and <span className="italic">feel the difference.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 space-y-6">
            <div className="flex gap-4">
              <MapPin className="text-[var(--gold)] mt-1 shrink-0" size={20} />
              <div>
                <div className="font-display text-lg text-[var(--ink)]">Campus</div>
                <div className="text-[var(--ink-soft)]">Community 12, Tema, Ghana</div>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="text-[var(--gold)] mt-1 shrink-0" size={20} />
              <div>
                <div className="font-display text-lg text-[var(--ink)]">Call admissions</div>
                <a
                  href="tel:+233303309301"
                  className="block text-[var(--ink-soft)] hover:text-[var(--ink)]"
                >
                  (+233) 030 330 9301
                </a>
                <a
                  href="tel:+233277588808"
                  className="block text-[var(--ink-soft)] hover:text-[var(--ink)]"
                >
                  (+233) 027 758 8808
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="text-[var(--gold)] mt-1 shrink-0" size={20} />
              <div>
                <div className="font-display text-lg text-[var(--ink)]">Email</div>
                <a
                  href="mailto:admissions@angelsschool.com"
                  className="text-[var(--ink-soft)] hover:text-[var(--ink)]"
                >
                  admissions@angelsschool.com
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-10">
            <button
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("open-admissions", { detail: { mode: "tour" } }),
                )
              }
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[var(--gold)] text-[var(--ink)] font-medium hover:bg-[var(--ink)] hover:text-white transition-colors cursor-pointer"
            >
              Book a Campus Tour
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7 self-center">
          <div className="aspect-[4/3] rounded-[8px] overflow-hidden bg-[var(--muted)] relative">
            <iframe
              title="Angels Specialist School International, Tema"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.0166%2C5.6500%2C0.0166%2C5.6800&layer=mapnik&marker=5.6650%2C0.0000"
              className="w-full h-full"
              loading="lazy"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-[var(--gold)]/20 pointer-events-none" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
