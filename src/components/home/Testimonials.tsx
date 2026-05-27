import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "../motion/Reveal";
import { Play, X } from "lucide-react";

const QUOTES = [
  {
    q: "Choosing Angels was the most consequential decision we made for our daughter. The teachers see her as a whole person, not just a student.",
    name: "Mrs. Adwoa Mensah",
    role: "Parent · Secondary",
    img: "/gallery/img1.webp",
    video: "https://videos.pexels.com/video-files/6773871/6773871-hd_1920_1080_30fps.mp4",
  },
  {
    q: "I left Angels with three A* at A Level and an offer from Imperial. But what I truly carry is the character the school built in me.",
    name: "Kwame O.",
    role: "Alumnus, Class of 2022",
    img: "/gallery/img2.webp",
    video: "https://videos.pexels.com/video-files/3247623/3247623-hd_1920_1080_25fps.mp4",
  },
  {
    q: "Our boys came from Beijing speaking little English. Within a year they were thriving - academically and socially. ASSI is genuinely international.",
    name: "Lin Family",
    role: "Parents · Primary & JHS",
    img: "/gallery/img3.webp",
    video: "https://videos.pexels.com/video-files/4806370/4806370-hd_1920_1080_24fps.mp4",
  },
];

export function Testimonials() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const close = useCallback(() => setActiveVideo(null), []);

  useEffect(() => {
    if (!activeVideo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeVideo, close]);

  const handleMouseEnter = useCallback((idx: number) => {
    setHoveredIdx(idx);
    const el = videoRefs.current[idx];
    if (el) {
      el.muted = true;
      el.playsInline = true;
      el.play().catch(() => {});
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    videoRefs.current.forEach((el) => {
      if (el) { el.pause(); el.currentTime = 0; }
    });
    setHoveredIdx(null);
  }, []);

  return (
    <section className="relative py-28 lg:py-40 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--stone)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative mx-auto max-w-[1250px] px-6 lg:px-12">
        <Reveal className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
              Voices of Angels
            </span>
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] text-[var(--ink)] text-balance">
            What our families <span className="italic">say.</span>
          </h2>
        </Reveal>

        <div
          className="flex gap-6 w-full h-[528px] lg:h-[616px]"
          onMouseLeave={handleMouseLeave}
        >
          {QUOTES.map((q, idx) => {
            const isHovered = hoveredIdx === idx;
            const isCollapsed = hoveredIdx !== null && !isHovered;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.32, 0.72, 0, 1] }}
                className={`relative overflow-hidden rounded-[8px] bg-[var(--ink)] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] h-full ${
                  isHovered ? "flex-[18]" : isCollapsed ? "flex-[11]" : "flex-1"
                }`}
                onMouseEnter={() => handleMouseEnter(idx)}
                onClick={() => setActiveVideo(q.video)}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <video
                    ref={(el) => { videoRefs.current[idx] = el; }}
                    muted
                    playsInline
                    loop
                    preload="auto"
                    className={`h-full w-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      isHovered ? "scale-105" : "scale-100"
                    }`}
                  >
                    <source src={q.video} type="video/mp4" />
                  </video>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent pointer-events-none" />

                <div className="absolute top-5 left-5 h-9 w-9 rounded-full border border-white/25 grid place-items-center transition-all duration-500 hover:bg-white/10">
                  <Play className="text-white ml-0.5" size={14} />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="overflow-hidden">
                    <p className={`text-white/65 text-sm leading-relaxed transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] pb-3 mb-3 border-b border-white/10 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}>
                      &ldquo;{q.q}&rdquo;
                    </p>
                  </div>
                  <div className="font-display text-white text-base lg:text-lg leading-tight">
                    {q.name}
                  </div>
                  <div className="text-[10px] text-white/45 uppercase tracking-[0.22em] mt-1.5">
                    {q.role}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl grid place-items-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-[8px] overflow-hidden shadow-2xl"
            >
              {activeVideo.endsWith(".mp4") ? (
                <video
                  className="w-full h-full"
                  src={activeVideo}
                  controls
                  autoPlay
                  muted
                  playsInline
                />
              ) : (
                <iframe
                  src={`${activeVideo}?autoplay=1`}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Testimonial Video"
                />
              )}
              <button
                onClick={close}
                className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 grid place-items-center text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
