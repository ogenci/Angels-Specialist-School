import { Reveal, StaggerGroup, StaggerItem } from "../motion/Reveal";
import { Counter } from "../motion/Counter";
import { Award, Globe, Trophy, Layers } from "lucide-react";

const STATS = [
  { value: 25, suffix: "+", label: "Years of excellence", icon: Award },
  { value: 10, suffix: "+", label: "Nationalities on campus", icon: Globe },
  { value: 1, prefix: "#", label: "IGCSE School in Ghana 2022/23", icon: Trophy },
  { value: 6, suffix: "", label: "Academic sections", icon: Layers },
];

export function StatStrip() {
  return (
    <section className="relative bg-[var(--ink)] py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--primary)/12_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--gold)/5_0%,_transparent_50%)]" />
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.5%22/></svg>')]" />

      <div className="relative mx-auto max-w-[1250px] px-6 lg:px-12">
        <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <StaggerItem
                key={i}
                className="relative bg-white/[0.03] border border-white/[0.06] rounded-[8px] p-5 sm:p-8 lg:p-10 group hover:bg-white/[0.06] hover:border-[var(--gold)]/20 transition-all duration-500"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-10 w-10 rounded-full bg-[var(--gold)]/10 grid place-items-center group-hover:bg-[var(--gold)]/20 transition-colors duration-500">
                      <Icon size={16} className="text-[var(--gold)]" />
                    </div>
                    <div className="h-8 w-px bg-white/[0.06]" />
                    <div className="font-display text-4xl lg:text-5xl font-light text-[var(--gold)]">
                      <Counter to={s.value} suffix={s.suffix} prefix={s.prefix ?? ""} />
                    </div>
                  </div>
                  <div className="text-xs text-white/60 uppercase tracking-[0.22em] leading-relaxed">
                    {s.label}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}

