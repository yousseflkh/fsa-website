"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "FSA didn't just make my son a better player. They made him a better teammate, a harder worker, and a kid who actually loves training.",
    name: "[Name TBD]",
    role: "Parent · U15 player",
  },
  {
    quote:
      "Would not be the player I am today without FSA. Thank you to everyone who has been part of this journey! ❤️",
    name: "Sydney Kennedy",
    role: "Former FSA Player · Halifax Tides",
  },
  {
    quote:
      "Three years at FSA and I went from a kid who could play to a player who reads the game. That's the academy's gift.",
    name: "[Name TBD]",
    role: "Senior squad player",
  },
];

function Card({ t, index }: { t: Testimonial; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 40, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden bg-fsa-ink border border-fsa-bone/8 hover:border-fsa-gold/40 transition-all duration-500 p-8 lg:p-10 flex flex-col"
    >
      <div className="diagonal-lines absolute inset-0 opacity-30 pointer-events-none" />

      {/* Big ghosted quote mark */}
      <div className="absolute -top-6 -right-2 pointer-events-none select-none opacity-60 group-hover:opacity-100 transition-opacity">
        <span className="font-display text-9xl leading-none text-fsa-gold/15 group-hover:text-fsa-gold/30 transition-colors duration-700">
          &rdquo;
        </span>
      </div>

      <div className="relative flex flex-col h-full">
        <div className="flex gap-1 mb-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <svg
              key={i}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-fsa-gold"
            >
              <path d="M12 .587l3.668 7.568L24 9.75l-6 5.85 1.417 8.265L12 19.771l-7.417 4.094L6 15.6 0 9.75l8.332-1.595z" />
            </svg>
          ))}
        </div>

        <blockquote className="text-fsa-bone text-base lg:text-lg leading-relaxed flex-1">
          &ldquo;{t.quote}&rdquo;
        </blockquote>

        <div className="mt-8 pt-6 border-t border-fsa-bone/10">
          <div className="font-display text-fsa-bone text-lg tracking-wide">
            {t.name.toUpperCase()}
          </div>
          <div className="mt-1 eyebrow text-fsa-gold">{t.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

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

export function Testimonials() {
  return (
    <section className="relative bg-fsa-ink border-t border-fsa-bone/5 py-32 lg:py-44 overflow-hidden">
      <div className="absolute -top-8 right-6 lg:right-10 pointer-events-none select-none">
        <span className="font-display text-[10rem] lg:text-[16rem] leading-none text-fsa-bone/[0.03]">
          07
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex items-center gap-4 mb-12">
          <span className="h-px w-12 bg-fsa-gold" />
          <span className="eyebrow text-fsa-gold">In Their Words</span>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-16">
          <Reveal delay={0.05}>
            <h2 className="headline text-fsa-bone text-[clamp(2.5rem,7vw,6rem)]">
              What FSA
              <br />
              <span className="text-gold-gradient">means.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-fsa-bone-muted text-lg leading-relaxed">
              The honest verdict from players, parents, and graduates of the
              program.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Card key={i} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
