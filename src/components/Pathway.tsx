"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Station = {
  step: string;
  age: string;
  title: string;
  description: string;
  side: "left" | "right";
};

const STATIONS: Station[] = [
  {
    step: "01",
    age: "U12 — U13",
    title: "Foundation",
    description:
      "First touch, ball mastery, and a love of the game. We build the technical foundation every great player stands on.",
    side: "left",
  },
  {
    step: "02",
    age: "U15",
    title: "Tactical Awareness",
    description:
      "Reading the game. Decision-making under pressure. Positional discipline. The transition from kid who can play to player who understands.",
    side: "right",
  },
  {
    step: "03",
    age: "U17 — U18",
    title: "High Performance",
    description:
      "Provincial-level competition. Physical preparation. Mental toughness. Players ready for university or senior football.",
    side: "left",
  },
  {
    step: "04",
    age: "Seniors",
    title: "NSSL Premier",
    description:
      "Senior Men's and Women's squads competing in Nova Scotia's top division. Where academy graduates earn the badge.",
    side: "right",
  },
];

const OUTCOMES = [
  { label: "University Soccer", note: "USports / NCAA pathway" },
  { label: "Pro Trials", note: "CPL · Northern Super League" },
  { label: "Coaching", note: "Give back to the game" },
];

/* -------- Chalk X mark -------- */
function ChalkX({
  delay = 0,
  size = 28,
  color = "#F5F2EC",
  className = "",
}: {
  delay?: number;
  size?: number;
  color?: string;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 30 30"
      className={`overflow-visible ${className}`}
    >
      <motion.line
        x1="4" y1="4" x2="26" y2="26"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="40"
        initial={{ strokeDashoffset: 40 }}
        animate={inView ? { strokeDashoffset: 0 } : { strokeDashoffset: 40 }}
        transition={{ duration: 0.4, delay, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.line
        x1="26" y1="4" x2="4" y2="26"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="40"
        initial={{ strokeDashoffset: 40 }}
        animate={inView ? { strokeDashoffset: 0 } : { strokeDashoffset: 40 }}
        transition={{ duration: 0.4, delay: delay + 0.12, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}

/* -------- Chalk O mark -------- */
function ChalkO({
  delay = 0,
  size = 18,
  color = "#F5F2EC",
  className = "",
  filled = false,
}: {
  delay?: number;
  size?: number;
  color?: string;
  className?: string;
  filled?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      className={`overflow-visible ${className}`}
    >
      <motion.circle
        cx="10" cy="10" r="7"
        fill={filled ? color : "none"}
        stroke={color}
        strokeWidth="2"
        strokeDasharray="50"
        initial={{ strokeDashoffset: 50, opacity: 0 }}
        animate={inView ? { strokeDashoffset: 0, opacity: 0.85 } : { strokeDashoffset: 50, opacity: 0 }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

/* -------- Clean branch arrow: spine → card -------- */
function BranchArrow({ side }: { side: "left" | "right" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = side === "left";

  // Symmetric horizontal arc — endpoints at same Y so the tangent at the tip
  // is purely horizontal, which lets the arrowhead point cleanly without rotation.
  const path = isLeft
    ? "M 96 28 Q 48 12, 4 28"   // card on left, arrow points LEFT
    : "M 0 28 Q 48 12, 92 28";  // card on right, arrow points RIGHT
  const arrowTip = isLeft ? { x: 4, y: 28 } : { x: 92, y: 28 };
  // Right-pointing arrowhead (tip at origin): M 0 0 L -10 -4 L -7 0 L -10 4 Z
  // Left-pointing arrowhead  (tip at origin): M 0 0 L 10 -4 L 7 0 L 10 4 Z
  const arrowPath = isLeft
    ? "M 0 0 L 10 -4 L 7 0 L 10 4 Z"
    : "M 0 0 L -10 -4 L -7 0 L -10 4 Z";

  return (
    <svg
      ref={ref}
      viewBox="0 0 96 56"
      className="overflow-visible w-24 h-10"
      aria-hidden
    >
      <motion.path
        d={path}
        fill="none"
        stroke="#F5F2EC"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="120"
        initial={{ strokeDashoffset: 120, opacity: 0 }}
        animate={
          inView
            ? { strokeDashoffset: 0, opacity: 0.9 }
            : { strokeDashoffset: 120, opacity: 0 }
        }
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d={arrowPath}
        fill="#F5F2EC"
        transform={`translate(${arrowTip.x}, ${arrowTip.y})`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3, delay: 0.85, ease: "backOut" }}
        style={{ transformOrigin: `${arrowTip.x}px ${arrowTip.y}px` }}
      />
    </svg>
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

function StationCard({ station }: { station: Station; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = station.side === "left";

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12 items-center"
    >
      {/* Mobile spine marker */}
      <div className="md:hidden absolute left-[6px] top-1/2 -translate-y-1/2 -translate-x-1/2 z-20">
        <div className="relative w-3 h-3">
          <div className="absolute inset-0 rounded-full bg-fsa-gold blur-md opacity-60" />
          <div className="relative w-full h-full rounded-full bg-fsa-gold border-2 border-fsa-black" />
        </div>
      </div>

      {/* Desktop spine marker — gold dot exactly on the spine */}
      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative w-4 h-4">
          <div className="absolute inset-0 rounded-full bg-fsa-gold blur-md opacity-70" />
          <div className="relative w-full h-full rounded-full bg-fsa-gold border-2 border-fsa-black" />
        </div>
      </div>

      {/* Card + branch arrow (desktop side that has the card) */}
      <motion.div
        initial={{ x: isLeft ? -30 : 30, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`relative ${
          isLeft
            ? "md:col-start-1 md:flex md:items-center md:justify-end"
            : "md:col-start-2 md:flex md:items-center"
        } pl-10 md:pl-0`}
      >
        {/* Branch arrow on the inner edge — desktop only */}
        {isLeft ? null : (
          <div className="hidden md:block shrink-0 -ml-2 mr-2">
            <BranchArrow side="right" />
          </div>
        )}

        <div
          className={`relative bg-fsa-black/40 border border-fsa-bone/15 p-7 md:p-9 max-w-xl ${
            isLeft ? "md:text-right" : ""
          }`}
        >
          {/* Chalk X mark in the outer top corner */}
          <div
            className={`absolute -top-4 ${
              isLeft ? "-left-4 md:-left-5" : "-right-4 md:-right-5"
            }`}
          >
            <ChalkX size={32} delay={0.05} />
          </div>

          {/* O dots near opposite corner */}
          <div
            className={`hidden md:flex absolute -top-3 ${
              isLeft ? "right-6" : "left-6"
            } items-center gap-2`}
          >
            <ChalkO size={12} delay={0.18} />
            <ChalkO size={10} delay={0.26} filled />
          </div>

          <div
            className={`flex items-baseline gap-4 mb-3 ${
              isLeft ? "md:justify-end" : ""
            }`}
          >
            <span
              className={`font-display text-fsa-gold/70 text-xl tracking-widest ${
                isLeft ? "md:order-2" : ""
              }`}
            >
              / {station.step}
            </span>
            <span className="eyebrow text-fsa-gold">{station.age}</span>
          </div>
          <h3 className="font-display text-fsa-bone text-3xl lg:text-5xl leading-none tracking-tight mb-4">
            {station.title}
          </h3>
          <p
            className={`text-fsa-bone-muted leading-relaxed text-base lg:text-lg ${
              isLeft ? "md:ml-auto" : ""
            } max-w-md`}
          >
            {station.description}
          </p>
        </div>

        {isLeft ? (
          <div className="hidden md:block shrink-0 -mr-2 ml-2">
            <BranchArrow side="left" />
          </div>
        ) : null}
      </motion.div>

      {/* Empty cell for the opposite side */}
      <div className={`hidden md:block ${isLeft ? "md:col-start-2" : "md:col-start-1"}`} />
    </div>
  );
}

export function Pathway() {
  // Scroll progress on the timeline body — drives the gold fill + indicator
  const spineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: spineRef,
    offset: ["start 70%", "end 60%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative bg-fsa-ink border-t border-fsa-bone/5 py-24 md:py-32 lg:py-44 overflow-hidden">
      {/* Subtle chalk grain */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-screen"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='4'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "240px",
        }}
      />

      <div className="absolute -top-8 right-6 lg:right-10 pointer-events-none select-none">
        <span className="font-display text-[8rem] md:text-[10rem] lg:text-[16rem] leading-none text-fsa-bone/[0.03]">
          05
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex items-center gap-4 mb-10 md:mb-12">
          <span className="h-px w-12 bg-fsa-gold" />
          <span className="eyebrow text-fsa-gold">The Pathway</span>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-end mb-16 md:mb-20">
          <Reveal delay={0.05}>
            <h2 className="headline text-fsa-bone text-[clamp(2.5rem,7vw,6rem)]">
              From first touch
              <br />
              <span className="text-gold-gradient">to the badge.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-fsa-bone-muted text-base md:text-lg leading-relaxed">
              Every FSA player follows a structured journey. Each station builds
              on the last — technically, tactically, and mentally — so the player
              who walks in at U12 can earn a senior cap at FSA, or beyond.
            </p>
          </Reveal>
        </div>

        {/* Timeline body with spine + indicator + stations */}
        <div ref={spineRef} className="relative">
          {/* Static dim spine */}
          <div className="absolute left-[6px] md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 bg-fsa-bone/10" />
          {/* Gold fill that grows with scroll */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[6px] md:left-1/2 top-0 w-px md:-translate-x-1/2 bg-gradient-to-b from-fsa-gold via-fsa-gold to-fsa-gold/30 origin-top"
          />

          {/* Stations */}
          <div className="flex flex-col gap-16 md:gap-28">
            {STATIONS.map((s, i) => (
              <StationCard key={s.step} station={s} index={i} />
            ))}
          </div>
        </div>

        {/* And Beyond */}
        <Reveal delay={0.1} className="mt-20 md:mt-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-10 md:mb-12">
              <span className="h-px w-8 bg-fsa-gold" />
              <span className="eyebrow text-fsa-gold">And Beyond</span>
              <span className="h-px w-8 bg-fsa-gold" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {OUTCOMES.map((o, i) => (
              <motion.div
                key={o.label}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-fsa-black border border-fsa-bone/8 hover:border-fsa-gold/40 p-7 md:p-8 transition-colors duration-500 text-center"
              >
                <div className="font-display text-fsa-bone text-xl md:text-2xl lg:text-3xl tracking-wide mb-3">
                  {o.label.toUpperCase()}
                </div>
                <div className="eyebrow text-fsa-gold">{o.note}</div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
