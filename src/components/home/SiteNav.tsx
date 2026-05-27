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
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-4 left-0 right-0 mx-auto w-[90%] max-w-[1125px] z-50 transition-all duration-500 ${
        open ? "rounded-t-3xl rounded-b-none" : "rounded-full"
      } bg-primary/45 backdrop-blur-2xl border border-white/30 shadow-[0_4px_24px_rgba(0,0,0,0.07)]`}
    >
      <div className="mx-auto max-w-[1125px] px-6 lg:px-6 flex items-center justify-between transition-all duration-500 h-16">
        <a href="#top" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Angels Specialist School International"
            className={`rounded-full bg-white object-contain shadow-sm ring-1 ring-black/5 transition-all duration-500 ${scrolled ? "h-9 w-9" : "h-12 w-12"}`}
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
            className="lg:hidden p-2 text-white"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--ink)]/95 backdrop-blur-2xl lg:hidden flex flex-col"
            onClick={() => setOpen(false)}
          >
            <div
              className="flex-1 flex flex-col items-center justify-center gap-6 px-8"
              onClick={(e) => e.stopPropagation()}
            >
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-white/90 text-3xl font-display tracking-tight hover:text-white transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.06 + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => {
                  setOpen(false);
                  triggerAdmissions("enrol");
                }}
                className="mt-4 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--primary)] text-white font-semibold text-lg active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-lg hover:bg-[var(--primary)]/80"
              >
                Enrol Today
                <span aria-hidden>→</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
