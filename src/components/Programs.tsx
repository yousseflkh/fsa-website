"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Spotlight } from "./Spotlight";

type Squad = {
  age: string;
  label: string;
  streams: string[];
  flagship?: boolean;
};

const SQUADS: Squad[] = [
  { age: "U12", label: "Under 12", streams: ["Boys", "Girls"] },
  { age: "U13", label: "Under 13", streams: ["Boys", "Girls"] },
  { age: "U15", label: "Under 15", streams: ["Boys", "Girls"] },
  { age: "U17", label: "Under 17", streams: ["Boys", "Girls"] },
  { age: "U18", label: "Under 18", streams: ["Boys", "Girls"] },
  {
    age: "Seniors",
    label: "Senior Squad",
    streams: ["Men's", "Women's"],
    flagship: true,
  },
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

function SquadCard({ squad, index }: { squad: Squad; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const borderClass = squad.flagship
    ? "border-fsa-gold/30 hover:border-fsa-gold/70"
    : "border-fsa-bone/8 hover:border-fsa-gold/40";

  return (
    <motion.div
      ref={ref}
      initial={{ y: 40, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative border transition-colors duration-500 ${borderClass}`}
    >
      <Spotlight className="overflow-hidden bg-fsa-ink" size={500}>
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(139,26,26,0.4) 0%, rgba(10,9,8,0) 60%)",
          }}
        />
        {squad.flagship ? (
          <div
            className="absolute inset-0 opacity-60 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(212,164,55,0.07) 0%, rgba(10,9,8,0) 70%)",
            }}
          />
        ) : null}
        <div className="diagonal-lines absolute inset-0 opacity-30 pointer-events-none" />

        <div className="relative p-7 lg:p-9 h-full flex flex-col min-h-[16rem]">
          <div className="flex items-baseline justify-between">
            <span className="font-display text-fsa-bone text-7xl lg:text-8xl leading-none tracking-tight">
              {squad.age}
            </span>
          </div>

          <div className="mt-3 eyebrow text-fsa-gold">{squad.label}</div>

          <div className="mt-auto pt-8 flex flex-wrap gap-2">
            {squad.streams.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-2 border border-fsa-bone/15 group-hover:border-fsa-gold/40 px-3 py-1.5 text-xs uppercase tracking-widest text-fsa-bone/80 transition-colors duration-500"
              >
                <span className="w-1 h-1 rounded-full bg-fsa-gold" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </Spotlight>
    </motion.div>
  );
}

export function Programs() {
  return (
    <section
      id="programs"
      className="relative bg-fsa-ink border-t border-fsa-bone/5 py-32 lg:py-44 overflow-hidden"
    >
      <div className="absolute -top-8 right-6 lg:right-10 pointer-events-none select-none">
        <span className="font-display text-[10rem] lg:text-[16rem] leading-none text-fsa-bone/[0.03]">
          02
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex items-center gap-4 mb-12">
          <span className="h-px w-12 bg-fsa-gold" />
          <span className="eyebrow text-fsa-gold">Programs</span>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-20">
          <Reveal delay={0.05}>
            <h2 className="headline text-fsa-bone text-[clamp(2.5rem,7vw,6rem)]">
              Train.
              <br />
              Compete.
              <br />
              <span className="text-gold-gradient">Grow.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-fsa-bone-muted text-lg leading-relaxed">
              FSA fields squads from U12 through our senior teams competing in
              the NSSL Premier League. Boys and girls programs run side-by-side
              at every age, developing technical players ready for the next
              level.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-fsa-bone/5">
          {SQUADS.map((s, i) => (
            <SquadCard key={s.age} squad={s} index={i} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 pt-10 border-t border-fsa-bone/10 grid sm:grid-cols-2 gap-8 lg:gap-16">
            <div>
              <div className="eyebrow text-fsa-gold mb-3">Also offered</div>
              <div className="font-display text-fsa-bone text-2xl lg:text-3xl tracking-wide">
                SEASONAL CAMPS · PRIVATE TRAINING
              </div>
            </div>
            <p className="text-fsa-bone-muted text-base leading-relaxed">
              Spring break, summer, and holiday intensives, plus one-on-one
              sessions with FSA coaches for players targeting specific technical
              or tactical development.
              <span className="block mt-2 text-fsa-bone-dim text-sm">
                [TBD — schedule & pricing details]
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
