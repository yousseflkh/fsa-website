"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type Post = {
  photo: string | null; // set to e.g. "/ig_post1.jpg" once you have photos
  href: string;         // link to the specific IG post
  label: string;
  meta: string;
};

// ── Drop in real photos + post URLs here ────────────────────────────────────
const POSTS: Post[] = [
  {
    photo: null,
    href: "https://www.instagram.com/fsasoccer/",
    label: "Post 1",
    meta: "@fsasoccer",
  },
  {
    photo: null,
    href: "https://www.instagram.com/fsasoccer/",
    label: "Post 2",
    meta: "@fsasoccer",
  },
  {
    photo: null,
    href: "https://www.instagram.com/fsasoccer/",
    label: "Post 3",
    meta: "@fsasoccer",
  },
];
// ────────────────────────────────────────────────────────────────────────────

function PostCard({ post, index }: { post: Post; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.a
      ref={ref}
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ y: 30, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden aspect-square border border-fsa-bone/8 hover:border-fsa-gold/40 transition-all duration-500"
    >
      {/* Photo or placeholder */}
      {post.photo ? (
        <Image
          src={post.photo}
          alt={post.label}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 33vw, 100vw"
          className="object-cover scale-100 group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #1c1815 0%, #14110f 60%, #0a0908 100%)",
          }}
        />
      )}

      {/* Subtle dark wash */}
      <div className="absolute inset-0 bg-fsa-black/20 group-hover:bg-fsa-black/10 transition-colors duration-500" />
      <div className="diagonal-lines absolute inset-0 opacity-30" />

      {/* Instagram icon top-right */}
      <div className="absolute top-3 right-3 z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-fsa-bone">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-fsa-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col items-center justify-center gap-3">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-fsa-bone opacity-80">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
        <span className="eyebrow text-fsa-bone text-[0.65rem]">View on Instagram ↗</span>
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
            </p>
            <a
              href="https://www.instagram.com/fsasoccer/"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start inline-flex items-center gap-3 border border-fsa-bone/30 hover:border-fsa-gold hover:bg-fsa-bone/5 text-fsa-bone hover:text-fsa-gold px-6 py-3 text-sm font-bold uppercase tracking-widest rounded-sm transition-all duration-300"
            >
              Follow on Instagram ↗
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {POSTS.map((p, i) => (
            <PostCard key={i} post={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
