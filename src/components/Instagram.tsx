"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Post = {
  type: "image" | "reel";
  label: string;
  meta: string;
  tint: "crimson" | "gold" | "dark";
};

const POSTS: Post[] = [
  { type: "reel", label: "Match Highlights", meta: "U17 vs HFX City", tint: "crimson" },
  { type: "image", label: "Training Tuesday", meta: "Evening session · 18:30", tint: "dark" },
  { type: "image", label: "Champions 🏆", meta: "Provincial title", tint: "gold" },
  { type: "image", label: "Squad Photo", meta: "Senior Men · 2026", tint: "dark" },
  { type: "reel", label: "Free Kick Goal", meta: "U18 · Provincial cup", tint: "crimson" },
  { type: "image", label: "Tryouts Open", meta: "Register now", tint: "gold" },
  { type: "image", label: "Coach Farias", meta: "Pre-match talk", tint: "dark" },
  { type: "reel", label: "Skills Session", meta: "1v1 mastery", tint: "crimson" },
  { type: "image", label: "FSA Family", meta: "End of season BBQ", tint: "dark" },
];

const TINTS: Record<Post["tint"], string> = {
  crimson:
    "radial-gradient(ellipse 100% 60% at 50% 100%, rgba(139,26,26,0.5) 0%, rgba(10,9,8,0) 70%)",
  gold:
    "radial-gradient(ellipse 100% 60% at 50% 100%, rgba(212,164,55,0.22) 0%, rgba(10,9,8,0) 70%)",
  dark:
    "radial-gradient(ellipse 100% 60% at 50% 100%, rgba(28,24,21,0.6) 0%, rgba(10,9,8,0) 70%)",
};

function PostCard({ post, index }: { post: Post; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.a
      ref={ref}
      href="https://www.instagram.com/fsasoccer/"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ y: 30, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden aspect-square border border-fsa-bone/8 hover:border-fsa-gold/40 transition-all duration-500"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #1c1815 0%, #14110f 60%, #0a0908 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-70 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: TINTS[post.tint] }}
      />
      <div className="diagonal-lines absolute inset-0 opacity-40" />

      {/* Reel icon */}
      {post.type === "reel" && (
        <div className="absolute top-3 right-3 z-10">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-fsa-bone">
            <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
          </svg>
        </div>
      )}

      {/* Hover overlay with view CTA */}
      <div className="absolute inset-0 bg-fsa-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col items-center justify-center text-center p-4">
        <span className="font-display text-fsa-bone text-base lg:text-lg tracking-wide leading-tight">
          {post.label.toUpperCase()}
        </span>
        <span className="mt-2 eyebrow text-fsa-gold text-[0.6rem]">{post.meta}</span>
        <span className="mt-4 eyebrow text-fsa-bone-dim text-[0.6rem]">
          View on Instagram ↗
        </span>
      </div>
    </motion.a>
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

export function Instagram() {
  return (
    <section className="relative bg-fsa-black border-t border-fsa-bone/5 py-32 lg:py-44 overflow-hidden">
      <div className="absolute -top-8 right-6 lg:right-10 pointer-events-none select-none">
        <span className="font-display text-[10rem] lg:text-[16rem] leading-none text-fsa-bone/[0.03]">
          08
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex items-center gap-4 mb-12">
          <span className="h-px w-12 bg-fsa-gold" />
          <span className="eyebrow text-fsa-gold">Follow Along</span>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-16">
          <Reveal delay={0.05}>
            <h2 className="headline text-fsa-bone text-[clamp(2.5rem,7vw,6rem)]">
              <span className="text-gold-gradient">@fsasoccer</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-col gap-4">
            <p className="text-fsa-bone-muted text-lg leading-relaxed">
              Match highlights, training nights, and the moments in between.
              Follow FSA on Instagram for everything happening at the academy.
              <span className="block mt-2 text-fsa-bone-dim text-sm">
                [Tiles below are placeholders — wire to Instagram API for live feed]
              </span>
            </p>
            <a
              href="https://www.instagram.com/fsasoccer/"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start inline-flex items-center gap-3 border border-fsa-bone/30 hover:border-fsa-gold hover:bg-fsa-bone/5 text-fsa-bone hover:text-fsa-gold px-6 py-3 text-sm font-bold uppercase tracking-widest rounded-sm transition-all duration-300"
            >
              Follow on Instagram
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {POSTS.map((p, i) => (
            <PostCard key={i} post={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
