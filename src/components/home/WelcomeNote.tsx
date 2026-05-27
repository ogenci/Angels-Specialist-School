import { Reveal } from "../motion/Reveal";
import { ASSET } from "./data";

export function WelcomeNote() {
  return (
    <section id="about" className="py-28 lg:py-40 bg-[var(--ivory)]">
      <div className="mx-auto max-w-[1250px] px-6 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-20">
        <Reveal className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5.5] overflow-hidden rounded-[8px]">
            <img
              src={`${ASSET}/academics.JPG`}
              alt="A welcome from the Principal"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-[var(--gold)]/20" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden lg:block">
            <div className="bg-[var(--gold)] text-[var(--ink)] px-6 py-4 font-display italic text-lg">
              "Each child at a time."
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7 flex flex-col justify-center">
          <Reveal className="flex items-center gap-3 mb-6">
            <span className="text-xs uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
              A note from the Principal
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-display text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] text-balance text-[var(--ink)]">
              Greetings. <span className="italic">Wènhòu.</span>{" "}
              <span className="italic">Namaste.</span>
            </h2>
          </Reveal>

          <Reveal
            delay={0.1}
            className="mt-8 space-y-5 text-[var(--ink-soft)] text-lg leading-relaxed max-w-xl"
          >
            <p>
              A warm welcome from the Angels family. Considering our school for your child's journey
              is a decision we cherish - and one we meet with open arms.
            </p>
            <p>
              We believe in the power of faith, perseverance and a carefully blended academic
              programme. With God's guidance, there is no limit to what our Angels can achieve.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-[var(--primary)] text-white grid place-items-center font-display text-lg">
              JO
            </div>
            <div>
              <div className="font-display text-lg text-[var(--ink)]">Joyce Oduro</div>
              <div className="text-sm text-[var(--muted-foreground)] uppercase tracking-widest">
                Principal · ASSI
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
