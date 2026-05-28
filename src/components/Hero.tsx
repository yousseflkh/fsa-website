"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const STAGGER = 0.08;
const RISE = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: crest drifts up & slightly fades as you scroll past hero
  const crestY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const crestOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  // Subtle counter-parallax on the ghosted "FSA"
  const ghostX = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={ref}
      className="hero-bg relative min-h-screen w-full overflow-hidden flex items-center"
    >
      <div className="diagonal-lines absolute inset-0 pointer-events-none" />

      {/* Giant ghosted FSA */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{ x: ghostX }}
        className="absolute -right-10 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
      >
        <span className="font-display text-[28rem] leading-none text-fsa-bone tracking-tighter">
          FSA
        </span>
      </motion.div>

      {/* Crest with scroll parallax */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: crestY, opacity: crestOpacity }}
        className="absolute top-28 right-6 lg:right-16 w-32 h-32 md:w-44 md:h-44 crest-glow z-10"
      >
        <Image
          src="/logo.png"
          alt="FSA crest"
          fill
          sizes="(min-width: 768px) 176px, 128px"
          className="object-contain"
          priority
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 w-full pt-32 pb-20">
        <motion.div
          initial="hidden"
          animate="show"
          variants={RISE}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-10"
        >
          <span className="h-px w-12 bg-fsa-gold" />
          <span className="eyebrow text-fsa-gold">
            Nova Scotia · Est. [TBD]
          </span>
        </motion.div>

        <h1 className="headline text-fsa-bone text-[clamp(3.5rem,11vw,11rem)] max-w-6xl">
          <motion.span
            initial="hidden"
            animate="show"
            variants={RISE}
            transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            Farias
          </motion.span>
          <motion.span
            initial="hidden"
            animate="show"
            variants={RISE}
            transition={{ duration: 1, delay: 0.45 + STAGGER, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            Soccer
          </motion.span>
          <motion.span
            initial="hidden"
            animate="show"
            variants={RISE}
            transition={{ duration: 1, delay: 0.45 + STAGGER * 2, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            <span className="text-gold-gradient">Academy.</span>
          </motion.span>
        </h1>

        <motion.p
          initial="hidden"
          animate="show"
          variants={RISE}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 max-w-xl text-lg md:text-xl text-fsa-bone-muted leading-relaxed"
        >
          Developing the next generation of footballers in Nova Scotia. Discipline,
          craft, and the beautiful game — every session, every season.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={RISE}
          transition={{ duration: 1, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <a
            href="#programs"
            className="group relative inline-flex items-center gap-3 bg-fsa-gold hover:bg-fsa-gold-bright text-fsa-black px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-sm transition-colors duration-300"
          >
            Explore Programs
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#academy"
            className="group inline-flex items-center gap-3 border border-fsa-bone/30 hover:border-fsa-bone hover:bg-fsa-bone/5 text-fsa-bone px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-sm transition-all duration-300"
          >
            Our Story
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-20 flex items-center gap-3"
        >
          {[0, 1, 2].map((i) => (
            <svg
              key={i}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-fsa-gold"
            >
              <path d="M12 .587l3.668 7.568L24 9.75l-6 5.85 1.417 8.265L12 19.771l-7.417 4.094L6 15.6 0 9.75l8.332-1.595z" />
            </svg>
          ))}
          <span className="eyebrow text-fsa-bone-dim ml-3">
            NSSL Premier · MSMSL
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="eyebrow text-fsa-bone-dim text-[0.65rem]">Scroll</span>
        <div className="scroll-cue relative w-px h-12 bg-fsa-bone/10 overflow-hidden" />
      </motion.div>
    </section>
  );
}
