"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Quote() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-fsa-black border-y border-fsa-bone/5 py-32 lg:py-48 overflow-hidden">
      <div className="diagonal-lines absolute inset-0 opacity-40 pointer-events-none" />

      {/* Huge ghosted quotation mark — design element */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 0.07, scale: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -top-20 left-4 lg:left-16 pointer-events-none select-none"
      >
        <span className="font-display text-[28rem] leading-none text-fsa-gold">
          &ldquo;
        </span>
      </motion.div>

      <div className="relative mx-auto max-w-5xl px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-2 mb-10"
        >
          {[0, 1, 2].map((i) => (
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
        </motion.div>

        <motion.blockquote
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="headline text-fsa-bone text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-tight"
        >
          We don&apos;t lower our standards
          <br />
          to meet the player.
          <br />
          <span className="text-gold-gradient">
            We raise the player to meet ours.
          </span>
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-12 flex flex-col items-center gap-3"
        >
          <span className="h-px w-12 bg-fsa-gold" />
          <span className="eyebrow text-fsa-bone-muted">
            Eduardo Farias · Head Coach
          </span>
          <span className="text-fsa-bone-dim text-xs italic">
            [Quote TBD — example placeholder]
          </span>
        </motion.div>
      </div>
    </section>
  );
}
