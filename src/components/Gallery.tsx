"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type Tile = {
  span: string;
  src: string;
  alt: string;
  label: string;
  caption: string;
  focal?: string; // CSS object-position to control crop
  tint: "crimson" | "gold" | "dark";
};

const TILES: Tile[] = [
  {
    span: "md:col-span-2 md:row-span-2",
    src: "/Team_Huddle.png",
    alt: "FSA squad in a pre-match huddle on the pitch",
    label: "Match Day",
    caption: "Pre-match huddle · One badge",
    focal: "center 35%",
    tint: "crimson",
  },
  {
    span: "md:col-span-2 md:row-span-1",
    src: "/Youth_Programs.png",
    alt: "Coaches addressing the FSA youth squads in the indoor dome",
    label: "Youth Programs",
    caption: "Training session · The dome",
    focal: "center 45%",
    tint: "dark",
  },
  {
    span: "md:col-span-1 md:row-span-1",
    src: "/Performance_Training.png",
    alt: "FSA coach running a one-on-one performance drill with a player",
    label: "Training Performance",
    caption: "One-on-one development",
    focal: "center 40%",
    tint: "dark",
  },
  {
    span: "md:col-span-1 md:row-span-1",
    src: "/Winning_Title.png",
    alt: "FSA Senior AAA Women holding the Nova Scotia indoor title banner",
    label: "Title",
    caption: "Senior AAA Women · NS champions",
    focal: "center 30%",
    tint: "gold",
  },
];

const TINTS: Record<Tile["tint"], string> = {
  crimson:
    "radial-gradient(ellipse 100% 60% at 50% 100%, rgba(139,26,26,0.55) 0%, rgba(10,9,8,0) 70%)",
  gold:
    "radial-gradient(ellipse 100% 60% at 50% 100%, rgba(212,164,55,0.22) 0%, rgba(10,9,8,0) 70%)",
  dark:
    "radial-gradient(ellipse 100% 60% at 50% 100%, rgba(28,24,21,0.6) 0%, rgba(10,9,8,0) 70%)",
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

function GalleryTile({ tile, index }: { tile: Tile; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 40, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative overflow-hidden border border-fsa-bone/10 hover:border-fsa-gold/40 transition-all duration-500 aspect-[4/3] md:aspect-auto md:min-h-[18rem] ${tile.span}`}
    >
      {/* Photo */}
      <Image
        src={tile.src}
        alt={tile.alt}
        fill
        sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover scale-105 group-hover:scale-110 transition-transform duration-[1500ms] ease-out"
        style={{ objectPosition: tile.focal ?? "center" }}
      />

      {/* Color tint over photo */}
      <div
        className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-700 mix-blend-multiply"
        style={{ background: TINTS[tile.tint] }}
      />
      {/* Slight dark wash so text stays legible */}
      <div className="absolute inset-0 bg-fsa-black/15 group-hover:bg-fsa-black/5 transition-colors duration-500" />
      {/* Diagonal lines texture */}
      <div className="diagonal-lines absolute inset-0 opacity-25 mix-blend-overlay" />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-7 z-10">
        <div className="font-display text-fsa-bone text-xl lg:text-3xl tracking-wide leading-none drop-shadow-lg">
          {tile.label.toUpperCase()}
        </div>
        <div className="mt-2 text-fsa-bone text-xs lg:text-sm opacity-90 drop-shadow">
          {tile.caption}
        </div>
      </div>

      {/* Bottom fade for caption legibility */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,9,8,0) 0%, rgba(10,9,8,0.5) 50%, rgba(10,9,8,0.9) 100%)",
        }}
      />
    </motion.div>
  );
}

export function Gallery() {
  return (
    <section className="relative bg-fsa-black border-t border-fsa-bone/5 py-32 lg:py-44 overflow-hidden">
      <div className="absolute -top-8 right-6 lg:right-10 pointer-events-none select-none">
        <span className="font-display text-[10rem] lg:text-[16rem] leading-none text-fsa-bone/[0.03]">
          06
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex items-center gap-4 mb-12">
          <span className="h-px w-12 bg-fsa-gold" />
          <span className="eyebrow text-fsa-gold">In Motion</span>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-16">
          <Reveal delay={0.05}>
            <h2 className="headline text-fsa-bone text-[clamp(2.5rem,7vw,6rem)]">
              The academy,
              <br />
              <span className="text-gold-gradient">on the pitch.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-fsa-bone-muted text-lg leading-relaxed">
              Match days, training nights, championship runs. A glimpse at FSA
              when our players are doing what they love.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4 md:[grid-auto-flow:dense]">
          {TILES.map((t, i) => (
            <GalleryTile key={i} tile={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
