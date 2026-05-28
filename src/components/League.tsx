"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

export function League() {
  return (
    <section
      id="teams"
      className="relative bg-fsa-black border-t border-fsa-bone/5 py-32 lg:py-44 overflow-hidden"
    >
      <div className="absolute -top-8 right-6 lg:right-10 pointer-events-none select-none">
        <span className="font-display text-[10rem] lg:text-[16rem] leading-none text-fsa-bone/[0.03]">
          03
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex items-center gap-4 mb-12">
          <span className="h-px w-12 bg-fsa-gold" />
          <span className="eyebrow text-fsa-gold">Where We Compete</span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="headline text-fsa-bone text-[clamp(2.5rem,7vw,6rem)] max-w-5xl">
            Among Nova Scotia&apos;s
            <br />
            <span className="text-gold-gradient">elite.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 relative overflow-hidden bg-fsa-ink border border-fsa-gold/30 p-10 lg:p-16">
            <div
              className="absolute inset-0 opacity-50 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(212,164,55,0.08) 0%, rgba(10,9,8,0) 70%)",
              }}
            />
            <div className="diagonal-lines absolute inset-0 opacity-40 pointer-events-none" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-fsa-gold">
                  <path d="M12 .587l3.668 7.568L24 9.75l-6 5.85 1.417 8.265L12 19.771l-7.417 4.094L6 15.6 0 9.75l8.332-1.595z" />
                </svg>
                <span className="eyebrow text-fsa-gold">Senior AAA</span>
              </div>

              <h3 className="font-display text-fsa-bone text-4xl lg:text-6xl leading-none tracking-tight">
                NSSL PREMIER
                <br />
                LEAGUE
              </h3>

              <p className="mt-6 text-fsa-bone-muted text-lg leading-relaxed max-w-2xl">
                Nova Scotia&apos;s top senior division, established in 1983.
                Provincial champions advance to the Canadian Nationals.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-px bg-fsa-bone/8 max-w-2xl">
                {[
                  { label: "Teams", value: "9" },
                  { label: "Format", value: "Summer + Playoffs" },
                  { label: "Established", value: "1983" },
                ].map((s) => (
                  <div key={s.label} className="bg-fsa-ink p-5">
                    <div className="font-display text-2xl lg:text-3xl text-gold-gradient leading-none">
                      {s.value}
                    </div>
                    <div className="mt-2 eyebrow text-fsa-bone-dim text-[0.6rem]">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
