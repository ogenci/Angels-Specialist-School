import { Reveal } from "../motion/Reveal";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section id="resources" className="bg-[var(--ink)] text-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1250px] px-6 lg:px-12 grid lg:grid-cols-12 gap-12 items-center">
        <Reveal className="lg:col-span-7">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs uppercase tracking-[0.28em] text-white/70">Stay in touch</span>
          </div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] text-balance">
            School updates,{" "}
            <span className="italic text-[var(--gold)]">straight to your inbox.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSent(true);
            }}
            className="flex items-center border-b border-white/30 focus-within:border-[var(--gold)] transition-colors py-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent text-white placeholder:text-white/40 py-3 outline-none text-lg"
            />
            <button
              type="submit"
              className="ml-4 px-5 py-3 rounded-full bg-[var(--gold)] text-[var(--ink)] text-sm font-medium hover:bg-white transition-colors"
            >
              {sent ? "Subscribed ✓" : "Subscribe"}
            </button>
          </form>
          <p className="mt-3 text-xs text-white/50">
            We respect your inbox. Newsletters monthly. Unsubscribe anytime.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
