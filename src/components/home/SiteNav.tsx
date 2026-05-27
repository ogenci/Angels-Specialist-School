import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "./data";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Scroll Spy Setup
    const sections = NAV_LINKS.map((link) => document.querySelector(link.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-25% 0px -55% 0px",
      },
    );

    sections.forEach((sec) => {
      if (sec) observer.observe(sec);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      sections.forEach((sec) => {
        if (sec) observer.unobserve(sec);
      });
    };
  }, []);

  const triggerAdmissions = (mode: "enquire" | "tour" | "enrol") => {
    window.dispatchEvent(new CustomEvent("open-admissions", { detail: { mode } }));
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-4 left-0 right-0 mx-auto w-[90%] max-w-[1125px] z-50 rounded-full border transition-all duration-300 ${
          open
            ? "bg-transparent border-transparent shadow-none backdrop-blur-none"
            : "bg-primary/45 backdrop-blur-2xl border-white/30 shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
        }`}
      >
        <div className="mx-auto max-w-[1125px] px-6 lg:px-6 flex items-center justify-between transition-all duration-500 h-14">
          <a href="#top" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Angels Specialist School International"
              className="rounded-full bg-white object-contain shadow-sm ring-1 ring-black/5 transition-all duration-500 h-9 w-9"
            />
            <div className="leading-none">
              <div className="font-display text-xl tracking-tight text-white">
                ASSI
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((l) => {
              const isActive = activeLink === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm tracking-wide font-medium text-white/85 transition-colors relative group px-3 py-1.5 -mx-3 rounded-full hover:bg-[var(--primary)]/20"
                >
                  {l.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => triggerAdmissions("enrol")}
              className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary)]/80 transition-all duration-300 active:scale-[0.98] shadow-sm cursor-pointer"
            >
              Enrol Today
              <span aria-hidden>→</span>
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-2 text-white cursor-pointer"
              aria-label="Menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--ink)] lg:hidden flex flex-col pt-24 pb-6 px-6 overflow-y-auto"
            onClick={() => setOpen(false)}
          >
            {/* Ambient gold glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.06),transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.5%22/></svg>')]" />

            <div
              className="flex-1 flex flex-col justify-between items-center w-full max-w-md mx-auto relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Menu Links */}
              <div className="w-full flex flex-col gap-2 mt-6">
                <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold)] mb-1 px-5 opacity-60">
                  Navigation
                </div>
                {NAV_LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full px-5 py-2.5 rounded-full flex items-center justify-between text-white/80 hover:text-white transition-all duration-300 hover:bg-white/[0.06] active:bg-white/10 group cursor-pointer"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-xs text-[var(--gold)]/50 tracking-wider">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xl sm:text-2xl font-display font-light tracking-tight">
                        {l.label}
                      </span>
                    </div>
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[var(--gold)] text-sm">
                      →
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Bottom admissions call to action & contact info */}
              <div className="w-full flex flex-col gap-4 mt-6 pt-4 border-t border-white/10">
                <motion.button
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.05 + 0.1, duration: 0.4 }}
                  onClick={() => {
                    setOpen(false);
                    triggerAdmissions("enrol");
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[var(--primary)] text-white font-semibold text-base active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-lg hover:bg-[var(--primary)]/80"
                >
                  Enrol Today
                  <span aria-hidden>→</span>
                </motion.button>

                <div className="text-[10px] text-white/45 tracking-[0.18em] uppercase space-y-1 px-5 leading-normal">
                  <div>ASSI · EST. TEMA, GHANA</div>
                  <div>admissions@angelsschool.com</div>
                  <div>(+233) 030 330 9301</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
