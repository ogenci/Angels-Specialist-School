import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Layers,
  Calendar,
  MapPin,
  Check,
  Sparkles,
  ArrowRight,
  BookOpen,
  Languages,
  BadgeAlert,
  ArrowLeft,
} from "lucide-react";

interface CurriculumData {
  title: string;
  from: string;
  age: string;
  accreditation: string;
  blurb: string;
  subjects: string[];
  languages: string[];
  features: string[];
  boardingAvailable: boolean;
}

const CURRICULUM_DATA: Record<string, CurriculumData> = {
  preschool: {
    title: "Foundation Stage",
    from: "Pre-School Department",
    age: "Age 1 to 5 years",
    accreditation: "Early Years Foundation Stage (EYFS)",
    blurb:
      "Where wonder begins. We provide a nurturing, safe, and engaging environment with child-centered learning that prioritizes physical, sensory, emotional and early academic discovery.",
    subjects: [
      "Communication & Language",
      "Personal, Social & Emotional Development",
      "Physical Development (Sensory & Motor skills)",
      "Literacy & Jolly Phonics introduction",
      "Mathematical Development & Numeracy",
      "Understanding the World (Nature, Science play)",
      "Expressive Arts & Design (Music, Painting)",
    ],
    languages: [
      "English (Primary instruction)",
      "French (Oral & songs)",
      "Mandarin (Introduction & basic phrases)",
    ],
    features: [
      "Play-led discovery learning",
      "Low student-to-teacher ratio for individualized care",
      "Indoor play castle & outdoor play fields",
      "Creative arts & music integration",
    ],
    boardingAvailable: false,
  },
  primary: {
    title: "Primary Stage",
    from: "Cambridge Primary",
    age: "Age 6 to 11 years (Grades 1 - 6)",
    accreditation: "Cambridge Assessment International Education",
    blurb:
      "Foundational mastery in literacy, numeracy and critical thinking. We blend academic rigor with creative exploration, ensuring children build self-belief and intellectual curiosity.",
    subjects: [
      "Cambridge English (First Language)",
      "Mathematics",
      "Science (Biology, Chemistry, Physics foundations)",
      "Global Perspectives (Independent inquiry)",
      "Digital Literacy & Computing",
      "Art & Design",
      "Music & Instruments",
      "Physical Education & Swimming",
    ],
    languages: ["English", "French (Core language study)", "Twi (Ghanaian language option)"],
    features: [
      "Cambridge Progression & Checkpoint Tests",
      "Practical science experiments in modern junior labs",
      "Creative writing seminars & library times",
      "Weekly computing labs & physical sports",
    ],
    boardingAvailable: true,
  },
  jhs: {
    title: "Lower Secondary / Junior High",
    from: "BECE & Cambridge LS",
    age: "Age 12 to 14 years (Grades 7 - 9)",
    accreditation: "Cambridge Lower Secondary & West African Examinations Council (WAEC)",
    blurb:
      "A versatile, dual-curriculum pathway preparing students for both global high school programs and national (B.E.C.E) qualifications, fostering confidence and logical reasoning.",
    subjects: [
      "English & English Literature",
      "Mathematics (Pre-Algebra & Geometry)",
      "Science (Integrated Chemistry, Physics, Biology)",
      "Information & Communication Technology (ICT)",
      "Social Studies (WAEC pathway)",
      "Creative Arts & Design",
      "French & Ghanaian Languages",
    ],
    languages: ["English", "French", "Twi"],
    features: [
      "Dual curriculum optionality (BECE preparation or Cambridge Checkpoint)",
      "Advanced ICT labs & coding introductions",
      "Public speaking & competitive debate teams",
      "Preparation for senior high school elective tracks",
    ],
    boardingAvailable: true,
  },
  secondary: {
    title: "Secondary Stage",
    from: "Cambridge IGCSE",
    age: "Age 14 to 16 years (Grades 10 - 11)",
    accreditation: "Cambridge Assessment International Education (British Council #1)",
    blurb:
      "Adjudged Ghana's Best IGCSE School by the British Council (2022/23). Our Upper Secondary program is a rigorous, world-class path offering deep analytical challenges and broad elective choices.",
    subjects: [
      "First Language English & Literature in English",
      "Mathematics (Extended & Additional Mathematics)",
      "Physics, Chemistry, and Biology (Triple Sciences)",
      "Information & Communication Technology (ICT)",
      "Business Studies, Economics, and Accounting",
      "French & Global Perspectives",
    ],
    languages: ["English", "French"],
    features: [
      "100% past IGCSE pass rate",
      "Distinguished lab work (Physics, Chemistry, Biology standard labs)",
      "Analytical essay writing & exam skills bootcamps",
      "Individual tutor guidance & university progress plans",
    ],
    boardingAvailable: true,
  },
  college: {
    title: "Sixth Form / College",
    from: "Cambridge AS & A Level",
    age: "Age 16 to 18 years (Grades 12 - 13)",
    accreditation: "Cambridge Advanced Level (AS & A Level)",
    blurb:
      "The gold standard for pre-university qualification. Angels Sixth Form scholars are trained to work independently, complete rigorous coursework, and secure admissions to the world's most prestigious universities.",
    subjects: [
      "Mathematics & Further Mathematics",
      "Physics, Chemistry, Biology",
      "Economics, Accounting, Business",
      "Applied ICT & Computer Science",
      "English Language & Literature",
    ],
    languages: ["English", "French"],
    features: [
      "Comprehensive college advising & Ivy/global admissions support",
      "Integrated SAT, ACT, and IELTS prep tracks",
      "Seminars on personal statement writing & interview coaching",
      "Leadership camps & global university tours",
    ],
    boardingAvailable: true,
  },
};

export function CurriculumSheet() {
  const [open, setOpen] = useState(false);
  const [activeStageId, setActiveStageId] = useState<string>("");

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ stageId: string }>;
      const stageId = customEvent.detail?.stageId || "primary";

      // Map display name to key if needed
      let key = stageId.toLowerCase();
      if (key === "foundation" || key === "pre-school") key = "preschool";
      if (key === "lower secondary" || key === "junior high") key = "jhs";
      if (key === "igcse") key = "secondary";
      if (key === "sixth form") key = "college";

      if (CURRICULUM_DATA[key]) {
        setActiveStageId(key);
        setOpen(true);
      }
    };

    window.addEventListener("open-curriculum", handleOpen);
    return () => window.removeEventListener("open-curriculum", handleOpen);
  }, []);

  const handleOpenAdmissions = () => {
    setOpen(false);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("open-admissions", { detail: { mode: "enquire" } }));
    }, 450);
  };

  const data = CURRICULUM_DATA[activeStageId];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-xl bg-[var(--ivory)] text-[var(--ink)] border-[var(--border)] p-0 shadow-2xl overflow-y-auto">
        <AnimatePresence mode="wait">
          {data && (
            <motion.div
              key={activeStageId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col h-full min-h-screen"
            >
              {/* Header block with gold accent */}
              <div className="bg-[var(--ink)] text-white p-8 relative">
                <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
                  <GraduationCap size={14} />
                  <span>{data.from}</span>
                </div>
                <SheetTitle className="font-display text-3xl font-light text-white leading-tight tracking-tight">
                  {data.title}
                </SheetTitle>
                <SheetDescription className="text-white/70 text-xs mt-2 tracking-wide uppercase flex items-center gap-2">
                  <Calendar size={12} className="text-[var(--gold)]" /> {data.age}
                </SheetDescription>
              </div>

              {/* Main content body */}
              <div className="p-8 space-y-6 flex-1">
                {/* Accreditation & Boarding Badges */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="px-3.5 py-2 bg-white border border-[var(--border)] text-[10px] uppercase tracking-wider font-semibold text-[var(--ink)] rounded-sm">
                    Accredited: {data.accreditation}
                  </div>
                  {data.boardingAvailable ? (
                    <div className="px-3.5 py-2 bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[10px] uppercase tracking-wider font-semibold text-[var(--gold-deep)] rounded-sm">
                      Boarding Available
                    </div>
                  ) : (
                    <div className="px-3.5 py-2 bg-black/5 border border-black/5 text-[10px] uppercase tracking-wider font-semibold text-[var(--muted-foreground)] rounded-sm">
                      Day Student Only
                    </div>
                  )}
                </div>

                {/* Blurb */}
                <p className="text-[var(--ink-soft)] text-base leading-relaxed text-pretty">
                  {data.blurb}
                </p>

                {/* Subjects Area */}
                <div className="space-y-3">
                  <h4 className="font-display font-medium text-lg text-[var(--ink)] flex items-center gap-2 border-b border-[var(--border)] pb-2">
                    <BookOpen size={16} className="text-[var(--gold-deep)]" />
                    Key Subjects
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {data.subjects.map((sub) => (
                      <div
                        key={sub}
                        className="flex gap-2 text-sm text-[var(--ink-soft)] items-start"
                      >
                        <Check size={14} className="text-[var(--gold-deep)] shrink-0 mt-1" />
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Language Streams */}
                <div className="space-y-3">
                  <h4 className="font-display font-medium text-lg text-[var(--ink)] flex items-center gap-2 border-b border-[var(--border)] pb-2">
                    <Languages size={16} className="text-[var(--gold-deep)]" />
                    Language Options
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.languages.map((lang) => (
                      <div
                        key={lang}
                        className="px-3 py-1.5 bg-white border border-[var(--border)] text-xs text-[var(--ink-soft)] font-medium"
                      >
                        {lang}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features & Methodology */}
                <div className="space-y-3">
                  <h4 className="font-display font-medium text-lg text-[var(--ink)] flex items-center gap-2 border-b border-[var(--border)] pb-2">
                    <Sparkles size={16} className="text-[var(--gold-deep)]" />
                    Unique Pillars & Features
                  </h4>
                  <ul className="space-y-2.5">
                    {data.features.map((feat) => (
                      <li key={feat} className="flex gap-2 text-sm text-[var(--ink-soft)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] shrink-0 mt-2" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action footer */}
              <div className="p-8 bg-white border-t border-[var(--border)] mt-auto flex items-center justify-between gap-4 sticky bottom-0">
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="rounded-full px-6 h-11 text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)] hover:bg-black/5"
                  >
                    <ArrowLeft size={16} className="mr-1" />
                    Back
                  </Button>
                </SheetClose>
                <Button
                  onClick={handleOpenAdmissions}
                  className="rounded-full px-8 h-11 text-xs font-semibold uppercase tracking-wider bg-[var(--gold)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-all duration-300 flex items-center gap-1.5"
                >
                  Request admissions info
                  <ArrowRight size={16} />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
}
