"use client";

import { motion } from "framer-motion";

type Props = {
  items?: string[];
  speed?: number;
  variant?: "default" | "muted";
};

const DEFAULT_ITEMS = [
  "FARIAS SOCCER ACADEMY",
  "THE BEAUTIFUL GAME",
  "FARIAS SOCCER ACADEMY",
  "NOVA SCOTIA",
  "FARIAS SOCCER ACADEMY",
  "EST. [TBD]",
];

function Star() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-fsa-gold shrink-0"
    >
      <path d="M12 .587l3.668 7.568L24 9.75l-6 5.85 1.417 8.265L12 19.771l-7.417 4.094L6 15.6 0 9.75l8.332-1.595z" />
    </svg>
  );
}

export function Marquee({ items = DEFAULT_ITEMS, speed = 40, variant = "default" }: Props) {
  const all = [...items, ...items];
  const bg = variant === "muted" ? "bg-fsa-black" : "bg-fsa-ink";

  return (
    <div
      className={`relative overflow-hidden border-y border-fsa-bone/8 py-6 ${bg}`}
    >
      <div className="diagonal-lines absolute inset-0 opacity-30 pointer-events-none" />
      <motion.div
        className="relative flex items-center gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {all.map((item, i) => (
          <div key={i} className="flex items-center gap-10 shrink-0">
            <span className="font-display text-2xl md:text-3xl tracking-[0.2em] text-fsa-bone">
              {item}
            </span>
            <Star />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
