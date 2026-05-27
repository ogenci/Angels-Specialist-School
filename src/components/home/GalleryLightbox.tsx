import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Calendar, Tag, Layers } from "lucide-react";
import { GALLERY } from "./data";

export function GalleryLightbox() {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ index: number }>;
      const index = customEvent.detail?.index ?? 0;
      setCurrentIndex(index);
      setOpen(true);
    };

    window.addEventListener("open-lightbox", handleOpen);
    return () => window.removeEventListener("open-lightbox", handleOpen);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY.length) % GALLERY.length);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleNext, handlePrev]);

  if (!open) return null;

  const currentItem = GALLERY[currentIndex];
  // Convert thumbnail paths to high-res image paths by replacing "/thumbs/" with "/"
  const highResImg = currentItem.img.replace("/thumbs/", "/");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-2xl flex flex-col justify-between p-6 select-none"
      >
        {/* Top bar controls */}
        <div className="flex items-center justify-between text-white/80 z-10">
          <div className="font-display text-sm tracking-widest text-[var(--gold)]">
            ANGELS SCHOOL LIFE GALLERY · {currentIndex + 1} / {GALLERY.length}
          </div>
          <button
            onClick={handleClose}
            className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mid section: Carousel view */}
        <div className="relative flex-1 flex items-center justify-center max-h-[75vh]">
          {/* Arrow Left */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:left-4 p-3.5 bg-white/5 rounded-full hover:bg-white/15 text-white/80 z-20 transition-all cursor-pointer hidden sm:flex"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Swipeable Container */}
          <div className="w-full h-full max-w-5xl px-4 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.96, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.96, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative max-h-full max-w-full flex items-center justify-center"
              >
                <img
                  src={highResImg}
                  alt={currentItem.title}
                  className="max-h-[70vh] max-w-full object-contain rounded shadow-2xl border border-white/5"
                  // Fallback to thumbnail if high-res image has a loading issue
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== currentItem.img) {
                      target.src = currentItem.img;
                    }
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrow Right */}
          <button
            onClick={handleNext}
            className="absolute right-0 md:right-4 p-3.5 bg-white/5 rounded-full hover:bg-white/15 text-white/80 z-20 transition-all cursor-pointer hidden sm:flex"
            aria-label="Next Slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Bottom bar: Details & Quick Jump */}
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto z-10 border-t border-white/10 pt-6">
          <div className="grid md:grid-cols-3 gap-4 text-white/80">
            {/* Slide title */}
            <div className="md:col-span-2 space-y-1">
              <h3 className="font-display text-2xl lg:text-3xl font-light text-white tracking-tight leading-tight">
                {currentItem.title}
              </h3>
              <p className="text-xs text-white/60">
                Explore the vibrant culture and academic distinction at Angels.
              </p>
            </div>

            {/* Department & Date */}
            <div className="space-y-2 flex flex-col justify-end text-xs md:items-end">
              <div className="flex items-center gap-1.5 text-[var(--gold)] font-medium">
                <Layers size={13} />
                <span>{currentItem.dept}</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/50">
                <Calendar size={13} />
                <span>{currentItem.date}</span>
              </div>
            </div>
          </div>

          {/* Quick jumps thumbnails strip */}
          <div className="flex justify-center items-center gap-2 overflow-x-auto py-1">
            {GALLERY.map((g, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-11 w-16 bg-[var(--ink)] border overflow-hidden transition-all duration-300 rounded shrink-0 cursor-pointer ${
                  currentIndex === idx
                    ? "border-[var(--gold)] scale-110 shadow-[0_0_12px_rgba(255,255,255,0.15)] opacity-100"
                    : "border-transparent opacity-45 hover:opacity-75"
                }`}
              >
                <img src={g.img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
