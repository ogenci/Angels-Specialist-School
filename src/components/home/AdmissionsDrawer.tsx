import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Home,
  Check,
} from "lucide-react";
import { toast } from "sonner";

export type AdmissionsMode = "enquire" | "tour" | "enrol";

interface FormState {
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  childName: string;
  childAge: string;
  academicSection: string;
  enrolmentTerm: string;
  inquiryType: "enquiry" | "tour" | "callback";
  preferredDate: string;
  preferredTime: "morning" | "afternoon" | "";
}

const INITIAL_FORM: FormState = {
  parentName: "",
  parentEmail: "",
  parentPhone: "",
  childName: "",
  childAge: "",
  academicSection: "primary",
  enrolmentTerm: "Sept 2026",
  inquiryType: "enquiry",
  preferredDate: "",
  preferredTime: "",
};

export function AdmissionsDrawer() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode?: AdmissionsMode }>;
      const mode = customEvent.detail?.mode || "enquire";

      let inquiryType: FormState["inquiryType"] = "enquiry";
      if (mode === "tour") inquiryType = "tour";

      setForm((f) => ({
        ...f,
        inquiryType,
      }));
      setStep(1);
      setErrors({});
      setOpen(true);
    };

    window.addEventListener("open-admissions", handleOpen);
    return () => window.removeEventListener("open-admissions", handleOpen);
  }, []);

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (currentStep === 1) {
      if (!form.parentName.trim()) newErrors.parentName = "Parent name is required";
      if (!form.parentEmail.trim()) {
        newErrors.parentEmail = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(form.parentEmail)) {
        newErrors.parentEmail = "Invalid email format";
      }
      if (!form.parentPhone.trim()) {
        newErrors.parentPhone = "Phone number is required";
      } else if (form.parentPhone.replace(/\D/g, "").length < 8) {
        newErrors.parentPhone = "Invalid phone number";
      }
      if (!form.childName.trim()) newErrors.childName = "Child name is required";
      if (!form.childAge.trim() || isNaN(Number(form.childAge)) || Number(form.childAge) <= 0) {
        newErrors.childAge = "Provide a valid age";
      }
    } else if (currentStep === 2) {
      if (!form.academicSection) newErrors.academicSection = "Please select a section";
      if (!form.enrolmentTerm) newErrors.enrolmentTerm = "Please select a target term";
    } else if (currentStep === 3) {
      if (form.inquiryType === "tour") {
        if (!form.preferredDate) newErrors.preferredDate = "Select a visit date";
        if (!form.preferredTime) newErrors.preferredTime = "Select a preferred time slot";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      // Simulate API submit
      setTimeout(() => {
        toast.success("Enquiry submitted successfully!");
        setStep(4);
      }, 600);
    }
  };

  const handleClose = () => {
    setOpen(false);
    // Reset after transition finishes
    setTimeout(() => {
      setForm(INITIAL_FORM);
      setStep(1);
      setErrors({});
    }, 300);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
      }}
    >
      <DialogContent className="max-w-2xl bg-white/60 backdrop-blur-3xl text-[var(--ink)] border border-white/40 p-0 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl">
        <DialogHeader className="p-8 pb-4 bg-[var(--ink)] text-white relative">
          <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
            <Sparkles size={14} className="animate-pulse" />
            <span>Angels specialist school</span>
          </div>
          <DialogTitle className="font-display text-3xl font-light tracking-tight text-white">
            {step === 4 ? "Enquiry Confirmed" : "Admissions & Campus Tour Enquiry"}
          </DialogTitle>
          <DialogDescription className="text-white/70 text-sm mt-1">
            {step === 4
              ? "Your pathway to excellence begins today."
              : "Complete these quick steps, and our admissions team will reach out directly."}
          </DialogDescription>

          {/* Progress Indicator */}
          {step < 4 && (
            <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10">
              <motion.div
                className="h-full bg-[var(--gold)]"
                initial={{ width: "0%" }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}
        </DialogHeader>

        {/* Step Navigation Dots for visual cue */}
        {step < 4 && (
          <div className="flex justify-center gap-3 py-4 bg-white/50 border-b border-[var(--border)]">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  step === s ? "bg-[var(--gold)] w-6" : step > s ? "bg-[var(--ink)]" : "bg-black/10"
                }`}
              />
            ))}
          </div>
        )}

        <div className="p-8 max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="font-display text-xl font-medium mb-4 flex items-center gap-2">
                    <User size={18} className="text-[var(--gold-deep)]" />
                    Family Profile
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium">
                        Parent / Guardian Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-black/30" />
                        <Input
                          placeholder="e.g., Dr. Kofi Mensah"
                          value={form.parentName}
                          onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                          className={`pl-10 h-11 border-[var(--border)] bg-white/70 focus-visible:ring-[var(--gold)] ${errors.parentName ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        />
                      </div>
                      {errors.parentName && (
                        <p className="text-xs text-destructive font-medium">{errors.parentName}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium">
                        Contact Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-black/30" />
                        <Input
                          placeholder="e.g., +233 24 123 4567"
                          value={form.parentPhone}
                          onChange={(e) => setForm({ ...form, parentPhone: e.target.value })}
                          className={`pl-10 h-11 border-[var(--border)] bg-white/70 focus-visible:ring-[var(--gold)] ${errors.parentPhone ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        />
                      </div>
                      {errors.parentPhone && (
                        <p className="text-xs text-destructive font-medium">{errors.parentPhone}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-black/30" />
                      <Input
                        type="email"
                        placeholder="parent@example.com"
                        value={form.parentEmail}
                        onChange={(e) => setForm({ ...form, parentEmail: e.target.value })}
                        className={`pl-10 h-11 border-[var(--border)] bg-white/70 focus-visible:ring-[var(--gold)] ${errors.parentEmail ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      />
                    </div>
                    {errors.parentEmail && (
                      <p className="text-xs text-destructive font-medium">{errors.parentEmail}</p>
                    )}
                  </div>

                  <div className="border-t border-[var(--border)] pt-4 my-2" />

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium">
                        Scholar / Child's Name
                      </label>
                      <Input
                        placeholder="First and Last name"
                        value={form.childName}
                        onChange={(e) => setForm({ ...form, childName: e.target.value })}
                        className={`h-11 border-[var(--border)] bg-white/70 focus-visible:ring-[var(--gold)] ${errors.childName ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      />
                      {errors.childName && (
                        <p className="text-xs text-destructive font-medium">{errors.childName}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium">
                        Scholar's Current Age
                      </label>
                      <Input
                        type="number"
                        placeholder="e.g., 6"
                        value={form.childAge}
                        onChange={(e) => setForm({ ...form, childAge: e.target.value })}
                        className={`h-11 border-[var(--border)] bg-white/70 focus-visible:ring-[var(--gold)] ${errors.childAge ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      />
                      {errors.childAge && (
                        <p className="text-xs text-destructive font-medium">{errors.childAge}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="font-display text-xl font-medium mb-4 flex items-center gap-2">
                    <GraduationCap size={18} className="text-[var(--gold-deep)]" />
                    Academic Pathway
                  </h3>

                  <div className="space-y-3">
                    <label className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium block">
                      Target Academic Section
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { id: "preschool", label: "Pre-School", desc: "Age 1+" },
                        { id: "primary", label: "Primary", desc: "Age 6+" },
                        { id: "jhs", label: "Junior High", desc: "Age 12+" },
                        { id: "secondary", label: "Secondary (IGCSE)", desc: "Age 14+" },
                        { id: "college", label: "College (A Level)", desc: "Age 16+" },
                        { id: "boarding", label: "Boarding House", desc: "Age 9+" },
                      ].map((sec) => (
                        <button
                          key={sec.id}
                          type="button"
                          onClick={() => setForm({ ...form, academicSection: sec.id })}
                          className={`p-4 text-left border rounded-lg transition-all duration-300 ${
                            form.academicSection === sec.id
                              ? "border-[var(--gold)] bg-[var(--gold)]/10 ring-1 ring-[var(--gold)]"
                              : "border-[var(--border)] bg-white hover:border-black/30"
                          }`}
                        >
                          <div className="font-display font-medium text-sm text-[var(--ink)]">
                            {sec.label}
                          </div>
                          <div className="text-[10px] uppercase text-[var(--muted-foreground)] mt-1 tracking-wide">
                            {sec.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium">
                        Desired Enrollment Term
                      </label>
                      <select
                        value={form.enrolmentTerm}
                        onChange={(e) => setForm({ ...form, enrolmentTerm: e.target.value })}
                        className="w-full h-11 px-3 border border-[var(--border)] bg-white rounded-md shadow-sm outline-none focus:ring-1 focus:ring-[var(--gold)] font-medium text-sm text-[var(--ink)]"
                      >
                        <option value="Sept 2026">September 2026 (Upcoming Academic Year)</option>
                        <option value="Jan 2027">January 2027 (Mid-Year Entry)</option>
                        <option value="April 2027">April 2027</option>
                        <option value="Sept 2027">September 2027</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium">
                        Desired Scholar Status
                      </label>
                      <div className="grid grid-cols-2 gap-2 h-11 bg-white border border-[var(--border)] rounded-md p-1">
                        {["Day Student", "Boarding Scholar"].map((status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() =>
                              setForm({
                                ...form,
                                enrolmentTerm: `${form.enrolmentTerm.split(" (")[0]} (${status})`,
                              })
                            }
                            className={`flex items-center justify-center text-xs font-medium rounded transition-all duration-300 ${
                              form.enrolmentTerm.includes(status) ||
                              (!form.enrolmentTerm.includes("Scholar") &&
                                !form.enrolmentTerm.includes("Day") &&
                                status === "Day Student")
                                ? "bg-[var(--ink)] text-white"
                                : "text-[var(--ink-soft)] hover:bg-black/5"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="font-display text-xl font-medium mb-4 flex items-center gap-2">
                    <Calendar size={18} className="text-[var(--gold-deep)]" />
                    Tour & Inquiry Preference
                  </h3>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        id: "enquiry",
                        label: "General Enquiry",
                        icon: Mail,
                        blurb: "Ask about fees, subjects or curriculum.",
                      },
                      {
                        id: "tour",
                        label: "Book Campus Tour",
                        icon: Calendar,
                        blurb: "Experience our classrooms and campus live.",
                      },
                      {
                        id: "callback",
                        label: "Immediate Callback",
                        icon: Phone,
                        blurb: "A phone call from an admissions advisor.",
                      },
                    ].map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() =>
                            setForm({ ...form, inquiryType: type.id as FormState["inquiryType"] })
                          }
                          className={`p-5 text-center border rounded-lg transition-all duration-300 flex flex-col items-center justify-center ${
                            form.inquiryType === type.id
                              ? "border-[var(--gold)] bg-[var(--gold)]/10 ring-1 ring-[var(--gold)]"
                              : "border-[var(--border)] bg-white hover:border-black/30"
                          }`}
                        >
                          <Icon
                            size={22}
                            className={
                              form.inquiryType === type.id
                                ? "text-[var(--gold-deep)]"
                                : "text-black/50"
                            }
                          />
                          <div className="font-display font-medium text-sm text-[var(--ink)] mt-3 leading-tight">
                            {type.label}
                          </div>
                          <div className="text-[10px] text-[var(--muted-foreground)] mt-1.5 leading-normal max-w-[12ch] text-pretty">
                            {type.blurb}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {form.inquiryType === "tour" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-4 pt-2 border-t border-[var(--border)]"
                    >
                      <h4 className="font-display text-sm font-semibold text-[var(--ink)]">
                        Select Preferred Tour Date & Time
                      </h4>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium">
                            Tour Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-3 h-4 w-4 text-black/30" />
                            <Input
                              type="date"
                              min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                              value={form.preferredDate}
                              onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                              className={`pl-10 h-11 border-[var(--border)] bg-white/70 focus-visible:ring-[var(--gold)] ${errors.preferredDate ? "border-destructive focus-visible:ring-destructive" : ""}`}
                            />
                          </div>
                          {errors.preferredDate && (
                            <p className="text-xs text-destructive font-medium">
                              {errors.preferredDate}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-medium">
                            Session Slot
                          </label>
                          <div className="grid grid-cols-2 gap-2 h-11 bg-white border border-[var(--border)] rounded-md p-1">
                            {[
                              { id: "morning", label: "Morning", slot: "9:00 AM" },
                              { id: "afternoon", label: "Afternoon", slot: "2:00 PM" },
                            ].map((slot) => (
                              <button
                                key={slot.id}
                                type="button"
                                onClick={() =>
                                  setForm({
                                    ...form,
                                    preferredTime: slot.id as FormState["preferredTime"],
                                  })
                                }
                                className={`flex flex-col items-center justify-center rounded transition-all duration-300 ${
                                  form.preferredTime === slot.id
                                    ? "bg-[var(--ink)] text-white"
                                    : "text-[var(--ink-soft)] hover:bg-black/5"
                                }`}
                              >
                                <span className="text-[10px] font-medium leading-none">
                                  {slot.label}
                                </span>
                                <span className="text-[8px] opacity-75 mt-0.5 leading-none">
                                  {slot.slot}
                                </span>
                              </button>
                            ))}
                          </div>
                          {errors.preferredTime && (
                            <p className="text-xs text-destructive font-medium mt-1">
                              {errors.preferredTime}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="py-8 text-center space-y-6"
                >
                  <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-[var(--gold)]/10 text-[var(--gold-deep)] relative">
                    <CheckCircle2 size={48} className="relative z-10" />
                    <motion.div
                      className="absolute inset-0 bg-[var(--gold)]/20 rounded-full"
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-3xl font-light text-[var(--ink)]">
                      Welcome to the Family
                    </h3>
                    <p className="text-[var(--ink-soft)] max-w-md mx-auto leading-relaxed">
                      Thank you for your enquiry for{" "}
                      <strong className="text-[var(--ink)]">{form.childName}</strong>. An admissions
                      specialist has been assigned to your file and will contact you at{" "}
                      <span className="text-[var(--ink)] font-semibold">{form.parentEmail}</span> or{" "}
                      <span className="text-[var(--ink)] font-semibold">{form.parentPhone}</span>{" "}
                      within 24 business hours.
                    </p>
                  </div>

                  <div className="bg-white border border-[var(--border)] rounded-lg p-6 max-w-md mx-auto text-left space-y-3">
                    <h4 className="font-display font-medium text-sm uppercase tracking-wider text-[var(--gold-deep)]">
                      What's Next?
                    </h4>
                    <ul className="space-y-3 text-xs text-[var(--ink-soft)]">
                      <li className="flex gap-2">
                        <Check size={14} className="text-[var(--gold-deep)] shrink-0 mt-0.5" />
                        <span>
                          <strong>24 Hours:</strong> Receive your customized Prospectus booklet and
                          digital application form.
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <Check size={14} className="text-[var(--gold-deep)] shrink-0 mt-0.5" />
                        <span>
                          <strong>Personal Call:</strong> Speak with Joyce Oduro (Principal) or our
                          admissions representative to answer curriculum or boarding queries.
                        </span>
                      </li>
                      {form.inquiryType === "tour" && (
                        <li className="flex gap-2">
                          <Check size={14} className="text-[var(--gold-deep)] shrink-0 mt-0.5" />
                          <span>
                            <strong>Campus Tour Confirmed:</strong> Your visit is set for{" "}
                            <strong>{form.preferredDate}</strong> (
                            {form.preferredTime === "morning" ? "9:00 AM Slot" : "2:00 PM Slot"}).
                            We look forward to meeting you at the Main Gate!
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="button"
                      onClick={handleClose}
                      className="px-8 h-12 rounded-full bg-[var(--ink)] text-white hover:bg-[var(--gold-deep)] hover:text-white transition-colors text-sm font-medium"
                    >
                      Return to Website
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sticky Actions Footer */}
            {step < 4 && (
              <div className="border-t border-[var(--border)] pt-6 flex items-center justify-between gap-4 mt-6">
                <Button
                  type="button"
                  onClick={handleBack}
                  variant="ghost"
                  disabled={step === 1}
                  className="rounded-full px-6 h-11 text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)] hover:bg-black/5 disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                  Back
                </Button>

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="rounded-full px-8 h-11 text-xs font-semibold uppercase tracking-wider bg-[var(--gold)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-all flex items-center gap-1.5"
                  >
                    Continue
                    <ChevronRight size={16} />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="rounded-full px-8 h-11 text-xs font-semibold uppercase tracking-wider bg-[var(--ink)] text-white hover:bg-[var(--gold-deep)] hover:text-white transition-all flex items-center gap-1.5"
                  >
                    Submit Enquiry
                    <ChevronRight size={16} />
                  </Button>
                )}
              </div>
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
