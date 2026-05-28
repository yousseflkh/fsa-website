"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Counter } from "./Counter";

// Placeholder values so the counter animation fires.
// TODO: swap for real numbers from FSA — kept conservative-but-confident.
const STATS: { value: number | string; label: string; suffix?: string }[] = [
  { value: 10, label: "Years developing players", suffix: "+" },
  { value: 200, label: "Players in the program", suffix: "+" },
  { value: 12, label: "Championships & titles" },
];

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

export function Academy() {
  return (
    <section
      id="academy"
      className="relative bg-fsa-black border-t border-fsa-bone/5 py-32 lg:py-44 overflow-hidden"
    >
      {/* Ghosted "01" section number */}
      <div className="absolute -top-8 right-6 lg:right-10 pointer-events-none select-none">
        <span className="font-display text-[10rem] lg:text-[16rem] leading-none text-fsa-bone/[0.03]">
          01
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex items-center gap-4 mb-12">
          <span className="h-px w-12 bg-fsa-gold" />
          <span className="eyebrow text-fsa-gold">The Academy</span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="headline text-fsa-bone text-[clamp(2.5rem,7vw,6rem)] max-w-5xl">
            We don&apos;t just train players.
            <br />
            <span className="text-gold-gradient">We build footballers.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-2 gap-12 lg:gap-20">
          <Reveal delay={0.15}>
            <p className="text-fsa-bone-muted text-lg lg:text-xl leading-relaxed">
              Founded with a single conviction: every player deserves
              coaching that takes them seriously. Farias Soccer Academy is built
              around the belief that technical mastery, tactical intelligence,
              and competitive character are skills — and skills can be taught.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="text-fsa-bone-muted text-lg lg:text-xl leading-relaxed">
              From our youngest mini-players to our senior squad competing in
              the NSSL Premier League, FSA carries one standard: the beautiful
              game, played the right way, every single training session.
              <span className="block mt-4 text-fsa-bone-dim text-sm">
                [TBD — replace with Coach Farias&apos;s actual founding story]
              </span>
            </p>
          </Reveal>
        </div>

        {/* Stats row */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 border-t border-fsa-bone/10">
          {STATS.map((stat, i) => (
            <Reveal
              key={i}
              delay={0.1 + i * 0.08}
              className={`py-10 ${
                i > 0 ? "md:border-l border-fsa-bone/10" : ""
              } ${i < STATS.length - 1 ? "border-b md:border-b-0 border-fsa-bone/10" : ""}`}
            >
              <div className="px-2 md:px-8">
                <div className="font-display text-6xl lg:text-7xl text-gold-gradient leading-none">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-4 text-fsa-bone-muted text-sm uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
