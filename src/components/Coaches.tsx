"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Spotlight } from "./Spotlight";

type Coach = {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  photoPosition?: string;
};

const COACHES: Coach[] = [
  {
    name: "Eduardo Farias",
    role: "Head Coach",
    bio: "The heart of FSA. Eduardo founded the academy with a vision to bring elite-level football development to Nova Scotia. [TBD — coaching credentials, playing background, philosophy]",
  },
  {
    name: "Wendy Donaldson",
    role: "Director",
    bio: "Director of operations and program development at FSA. [TBD — background, role detail, what she brings to the academy]",
  },
  {
    name: "Colton Kaizer",
    role: "Coach",
    bio: "[TBD — coaching role, age groups, background]",
    photo: "/Colton_Kaizer.jpg",
    photoPosition: "center 10%",
  },
  {
    name: "Nick Bryden",
    role: "Coach",
    bio: "[TBD — coaching role, age groups, background]",
    photo: "/Nick_Bryden.jpg",
    photoPosition: "center center",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

function CoachCard({ coach, index }: { coach: Coach; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative border border-fsa-bone/8 hover:border-fsa-gold/40 transition-colors duration-500"
    >
      <Spotlight className="overflow-hidden bg-fsa-black" size={350}>
        <div className="relative overflow-hidden aspect-[4/5]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #1c1815 0%, #14110f 60%, #0a0908 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-2/3 opacity-60 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(139,26,26,0.35) 0%, rgba(10,9,8,0) 70%)",
            }}
          />
          <div className="diagonal-lines absolute inset-0 opacity-50" />

          {coach.photo ? (
            <>
              <Image
                src={coach.photo}
                alt={coach.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover scale-105 group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
                style={{ objectPosition: coach.photoPosition ?? "center top" }}
              />
              {/* Subtle dark vignette so card text + tint still reads */}
              <div className="absolute inset-0 bg-fsa-black/20 group-hover:bg-fsa-black/10 transition-colors duration-500" />
              <div
                className="absolute inset-x-0 bottom-0 h-1/3"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,9,8,0) 0%, rgba(10,9,8,0.85) 100%)",
                }}
              />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-[8rem] md:text-[12rem] leading-none text-fsa-bone/[0.06] tracking-tighter group-hover:text-fsa-gold/10 transition-colors duration-700">
                {initials(coach.name)}
              </span>
            </div>
          )}

          {!coach.photo && (
            <div className="absolute bottom-5 right-5">
              <span className="eyebrow text-[0.6rem] text-fsa-bone-dim">
                [Photo TBD]
              </span>
            </div>
          )}
        </div>

        <div className="p-6 lg:p-8">
          <h3 className="font-display text-fsa-bone leading-none tracking-wide text-2xl lg:text-3xl">
            {coach.name.toUpperCase()}
          </h3>
          <p className="mt-3 eyebrow text-fsa-gold">{coach.role}</p>
          <p className="mt-5 text-fsa-bone-muted text-sm leading-relaxed">
            {coach.bio}
          </p>
        </div>
      </Spotlight>
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

export function Coaches() {
  return (
    <section
      id="coaches"
      className="relative bg-fsa-black border-t border-fsa-bone/5 py-32 lg:py-44 overflow-hidden"
    >
      <div className="absolute -top-8 right-6 lg:right-10 pointer-events-none select-none">
        <span className="font-display text-[10rem] lg:text-[16rem] leading-none text-fsa-bone/[0.03]">
          04
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex items-center gap-4 mb-12">
          <span className="h-px w-12 bg-fsa-gold" />
          <span className="eyebrow text-fsa-gold">The Staff</span>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-20">
          <Reveal delay={0.05}>
            <h2 className="headline text-fsa-bone text-[clamp(2.5rem,7vw,6rem)]">
              Led by
              <br />
              <span className="text-gold-gradient">champions.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-fsa-bone-muted text-lg leading-relaxed">
              FSA is built by coaches who&apos;ve been there — competed at the
              highest levels, studied the modern game, and chosen to give that
              back to the next generation.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {COACHES.map((c, i) => (
            <CoachCard key={c.name} coach={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
