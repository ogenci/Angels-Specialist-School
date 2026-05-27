import { Reveal, StaggerGroup, StaggerItem } from "../motion/Reveal";
import { motion } from "framer-motion";
import { ArrowRight, School, Users, ClipboardCheck, GraduationCap } from "lucide-react";

const STEPS = [
  { n: "01", t: "Enquire", d: "Submit a brief enquiry and receive a personalised response within one working day.", icon: School },
  { n: "02", t: "Visit", d: "Experience the campus, meet our teachers and feel the warmth of the Angels community.", icon: Users },
  { n: "03", t: "Assess", d: "A friendly placement assessment carefully matched to your child's unique stage.", icon: ClipboardCheck },
  { n: "04", t: "Enrol", d: "Complete enrolment and welcome your child into a family that believes in them.", icon: GraduationCap },
];

export function Admissions() {
  return (
    <section id="admissions" className="relative py-28 lg:py-40 bg-[var(--ivory)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)/8_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.5%22/></svg>')]" />

      <div className="relative mx-auto max-w-[1250px] px-6 lg:px-12">
        <Reveal className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
              Admissions
            </span>
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] text-balance text-[var(--ink)]">
            Four steps to <span className="italic">becoming an Angel.</span>
          </h2>
        </Reveal>

        <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <StaggerItem
                key={s.n}
                className="relative bg-white rounded-[8px] p-8 lg:p-10 group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 cursor-default border border-[var(--border)]/40"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--gold)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[var(--gold)]/5 group-hover:bg-[var(--gold)]/10 transition-colors duration-500 blur-2xl" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-5xl lg:text-6xl text-[var(--gold)]/20 font-bold leading-none">
                      {s.n}
                    </span>
                    <div className="h-12 w-12 rounded-full bg-[var(--primary)]/5 grid place-items-center group-hover:bg-[var(--primary)]/10 transition-colors duration-500">
                      <Icon size={20} className="text-[var(--primary)]" />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl text-[var(--ink)] transition-colors group-hover:text-[var(--primary)]">
                    {s.t}
                  </h3>
                  <p className="mt-4 text-[var(--ink-soft)] leading-relaxed group-hover:text-[var(--ink)] transition-colors">
                    {s.d}
                  </p>
                  {idx < STEPS.length - 1 && (
                    <div className="mt-auto pt-6 text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex items-center gap-2">
                      Next: {STEPS[idx + 1].t}
                      <ArrowRight size={12} />
                    </div>
                  )}
                  {idx === STEPS.length - 1 && (
                    <div className="mt-auto pt-6 text-[10px] uppercase tracking-wider text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 font-medium">
                      Welcome to the family →
                    </div>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <Reveal className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
          <button
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("open-admissions", { detail: { mode: "enquire" } }),
              )
            }
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--ink)] text-white font-medium hover:bg-[var(--primary)] hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Begin your enquiry
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
          <button
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("open-admissions", { detail: { mode: "enquire" } }),
              )
            }
            className="inline-flex items-center gap-3 px-7 py-4 rounded-full border-2 border-[var(--border)] text-[var(--ink)] hover:border-[var(--ink)] hover:bg-white transition-all duration-300 cursor-pointer"
          >
            Speak to admissions
          </button>
        </Reveal>
      </div>
    </section>
  );
}
