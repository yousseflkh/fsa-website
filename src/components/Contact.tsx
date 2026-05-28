"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const AGE_GROUPS = ["U12", "U13", "U15", "U17", "U18", "Senior Men", "Senior Women", "Not sure yet"];
const INTERESTS = ["Academy", "Tryouts", "Camps", "Private Training", "General enquiry"];

// Replace with your Formspree form ID after creating a free account at formspree.io
// Until then, the form will simulate a successful submission for the demo.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
const DEMO_MODE = true; // flip to false once Formspree ID is filled in

type FormState = {
  name: string;
  email: string;
  phone: string;
  ageGroup: string;
  interests: string[];
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  ageGroup: "",
  interests: [],
  message: "",
};

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ y: 40, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Field({
  label,
  required,
  children,
  error,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow text-fsa-gold text-[0.65rem] flex items-center gap-2">
        {label}
        {required && <span className="text-fsa-crimson-bright">*</span>}
      </span>
      <div className="mt-2">{children}</div>
      {error && (
        <span className="mt-1 block text-xs text-fsa-crimson-bright">
          {error}
        </span>
      )}
    </label>
  );
}

const fieldClass =
  "w-full bg-fsa-ink border border-fsa-bone/15 focus:border-fsa-gold focus:outline-none text-fsa-bone placeholder:text-fsa-bone-dim px-4 py-3 transition-colors duration-200";

export function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleInterest = (label: string) => {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(label)
        ? f.interests.filter((i) => i !== label)
        : [...f.interests, label],
    }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.message.trim()) next.message = "Tell us briefly what you're looking for";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    try {
      if (DEMO_MODE) {
        await new Promise((r) => setTimeout(r, 900));
        setStatus("success");
        return;
      }
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="hero-bg relative border-t border-fsa-bone/5 py-32 lg:py-44 overflow-hidden"
    >
      <div className="diagonal-lines absolute inset-0 pointer-events-none" />
      <div className="absolute -top-8 right-6 lg:right-10 pointer-events-none select-none">
        <span className="font-display text-[10rem] lg:text-[16rem] leading-none text-fsa-bone/[0.03]">
          09
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex items-center gap-4 mb-12">
          <span className="h-px w-12 bg-fsa-gold" />
          <span className="eyebrow text-fsa-gold">Join Us</span>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left: pitch */}
          <div className="lg:col-span-5">
            <Reveal delay={0.05}>
              <h2 className="headline text-fsa-bone text-[clamp(3rem,8vw,7rem)]">
                Ready to
                <br />
                <span className="text-gold-gradient">play?</span>
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-10 max-w-md text-fsa-bone-muted text-lg lg:text-xl leading-relaxed">
                Tryouts, registration, or a question. Fill out the form and a
                member of the FSA staff will be back to you within 48 hours.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-12 grid grid-cols-1 gap-px bg-fsa-bone/8 border-y border-fsa-bone/8">
                {[
                  { label: "Location", value: "Nova Scotia" },
                  { label: "Email", value: "[TBD]@fariassoccer.ca" },
                  { label: "Reply Time", value: "Within 48 hours" },
                ].map((info) => (
                  <div key={info.label} className="bg-fsa-black p-6">
                    <div className="eyebrow text-fsa-gold text-[0.6rem]">
                      {info.label}
                    </div>
                    <div className="mt-2 font-display text-fsa-bone text-lg tracking-wide">
                      {info.value}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: the form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <div className="relative bg-fsa-ink border border-fsa-bone/10 p-8 lg:p-10">
                <div className="diagonal-lines absolute inset-0 opacity-30 pointer-events-none" />

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="relative flex flex-col items-center text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-20 h-20 mb-8"
                      >
                        <div className="absolute inset-0 rounded-full bg-fsa-gold/20 blur-xl" />
                        <div className="relative w-full h-full rounded-full border-2 border-fsa-gold flex items-center justify-center">
                          <motion.svg
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-fsa-gold"
                          >
                            <motion.polyline
                              points="20 6 9 17 4 12"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                            />
                          </motion.svg>
                        </div>
                      </motion.div>
                      <h3 className="headline text-fsa-bone text-3xl lg:text-4xl">
                        We&apos;ve got it.
                      </h3>
                      <p className="mt-4 text-fsa-bone-muted max-w-md">
                        Thanks for reaching out, {form.name.split(" ")[0] || "player"}. The FSA staff
                        will be in touch within 48 hours.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setForm(initial);
                          setStatus("idle");
                        }}
                        className="mt-8 eyebrow text-fsa-gold hover:text-fsa-gold-bright transition-colors"
                      >
                        ← Send another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={onSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="relative space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Field label="Your Name" required error={errors.name}>
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) => set("name", e.target.value)}
                            placeholder="e.g. Alex Smith"
                            className={fieldClass}
                          />
                        </Field>
                        <Field label="Email" required error={errors.email}>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => set("email", e.target.value)}
                            placeholder="you@example.com"
                            className={fieldClass}
                          />
                        </Field>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Field label="Phone (optional)">
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => set("phone", e.target.value)}
                            placeholder="(902) 555-0123"
                            className={fieldClass}
                          />
                        </Field>
                        <Field label="Age Group">
                          <select
                            value={form.ageGroup}
                            onChange={(e) => set("ageGroup", e.target.value)}
                            className={`${fieldClass} appearance-none cursor-pointer pr-10`}
                            style={{
                              backgroundImage:
                                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23d4a437' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>\")",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 1rem center",
                            }}
                          >
                            <option value="">Select age group…</option>
                            {AGE_GROUPS.map((g) => (
                              <option key={g} value={g}>
                                {g}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>

                      <Field label="I'm interested in">
                        <div className="flex flex-wrap gap-2">
                          {INTERESTS.map((label) => {
                            const active = form.interests.includes(label);
                            return (
                              <button
                                key={label}
                                type="button"
                                onClick={() => toggleInterest(label)}
                                className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all duration-200 ${
                                  active
                                    ? "border-fsa-gold bg-fsa-gold/10 text-fsa-gold"
                                    : "border-fsa-bone/15 text-fsa-bone-muted hover:border-fsa-bone/40 hover:text-fsa-bone"
                                }`}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      </Field>

                      <Field label="Message" required error={errors.message}>
                        <textarea
                          rows={5}
                          value={form.message}
                          onChange={(e) => set("message", e.target.value)}
                          placeholder="Tell us a bit about the player and what you're looking for..."
                          className={`${fieldClass} resize-none`}
                        />
                      </Field>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                        <p className="text-fsa-bone-dim text-xs">
                          By submitting, you agree to be contacted by FSA staff.
                        </p>
                        <button
                          type="submit"
                          disabled={status === "submitting"}
                          className="group relative inline-flex items-center justify-center gap-3 bg-fsa-gold hover:bg-fsa-gold-bright disabled:opacity-60 disabled:cursor-wait text-fsa-black px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-sm transition-colors duration-300 min-w-[12rem]"
                        >
                          {status === "submitting" ? (
                            <>
                              <span className="w-3 h-3 border-2 border-fsa-black border-r-transparent rounded-full animate-spin" />
                              Sending…
                            </>
                          ) : (
                            <>
                              Send Message
                              <span className="transition-transform duration-300 group-hover:translate-x-1">
                                →
                              </span>
                            </>
                          )}
                        </button>
                      </div>

                      {status === "error" && (
                        <p className="text-sm text-fsa-crimson-bright">
                          Something went wrong. Please email us directly or try again.
                        </p>
                      )}
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
