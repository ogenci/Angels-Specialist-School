import { NAV_LINKS } from "./data";
import { ArrowUp, MapPin, Phone, Mail, Award, GraduationCap, Globe } from "lucide-react";

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[var(--ink)] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.03)_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative mx-auto max-w-[1250px] px-6 lg:px-12 pt-20 pb-8">
        <div className="grid lg:grid-cols-12 gap-12 pb-14 border-b border-white/5">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Angels"
                className="h-11 w-11 rounded-full bg-white object-contain ring-1 ring-white/10"
              />
              <div>
                <div className="font-display text-lg text-white">Angels</div>
                <div className="text-[9px] uppercase tracking-[0.18em] text-white/40">
                  Specialist School Int.
                </div>
              </div>
            </div>
            <p className="mt-5 text-white/45 text-sm leading-relaxed max-w-xs">
              Shaping character, thinking and behaviour through excellent education rooted in Christian values.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-white/35 uppercase tracking-[0.15em]">
                <Award size={13} className="text-[var(--gold)]" />
                Cambridge Int.
              </span>
              <span className="h-3 w-px bg-white/5" />
              <span className="inline-flex items-center gap-1.5 text-[11px] text-white/35 uppercase tracking-[0.15em]">
                <GraduationCap size={13} className="text-[var(--gold)]" />
                British Council
              </span>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="text-[9px] uppercase tracking-[0.22em] text-[var(--gold)] mb-5">
              Explore
            </div>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-white/45 hover:text-white transition-colors text-sm"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className="text-white/45 hover:text-white transition-colors text-sm"
                >
                  Student Portal
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-[9px] uppercase tracking-[0.22em] text-[var(--gold)] mb-5">
              Contact
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-white/30 mt-0.5 shrink-0" />
                <span className="text-white/45">Community 12, Tema, Ghana</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={14} className="text-white/30 mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+233303309301" className="text-white/45 hover:text-white transition-colors">
                    (+233) 030 330 9301
                  </a>
                  <a href="tel:+233277588808" className="text-white/45 hover:text-white transition-colors">
                    (+233) 027 758 8808
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={14} className="text-white/30 mt-0.5 shrink-0" />
                <a href="mailto:admissions@angelsschool.com" className="text-white/45 hover:text-white transition-colors">
                  admissions@angelsschool.com
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="text-[9px] uppercase tracking-[0.22em] text-[var(--gold)] mb-5">
              Accreditation
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-white/45">
                <Globe size={14} className="text-white/30 shrink-0" />
                <span>Cambridge Assessment<br />International Education</span>
              </div>
              <div className="flex items-center gap-3 text-white/45">
                <Award size={14} className="text-white/30 shrink-0" />
                <span>British Council Partner<br />Schools Award 2022/23</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[11px] text-white/25">
            &copy; {new Date().getFullYear()} Angels Specialist School International. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-[11px] text-white/25 hover:text-white transition-colors uppercase tracking-[0.15em] cursor-pointer"
          >
            Back to top
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
