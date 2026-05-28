"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { href: "#academy", label: "Academy" },
  { href: "#programs", label: "Programs" },
  { href: "#coaches", label: "Coaches" },
  { href: "#teams", label: "Teams" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "bg-fsa-black/70 backdrop-blur-xl border-b border-fsa-bone/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.png"
                alt="FSA crest"
                fill
                sizes="40px"
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display text-base tracking-wider text-fsa-bone">
                FARIAS
              </span>
              <span className="eyebrow text-[0.6rem] text-fsa-gold mt-0.5">
                Soccer Academy
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-fsa-bone/80 hover:text-fsa-gold transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-fsa-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 bg-fsa-crimson hover:bg-fsa-crimson-bright text-fsa-bone px-5 py-2.5 text-sm font-semibold rounded-sm transition-colors duration-300 group"
          >
            Join FSA
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden text-fsa-bone p-2 relative z-[60]"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-40 bg-fsa-black/95 backdrop-blur-xl"
          >
            <div className="diagonal-lines absolute inset-0 opacity-50" />
            <div className="relative h-full flex flex-col justify-center px-8 pt-20">
              <nav className="flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-baseline justify-between border-b border-fsa-bone/10 py-5"
                  >
                    <span className="font-display text-4xl text-fsa-bone group-hover:text-fsa-gold transition-colors tracking-wide">
                      {link.label.toUpperCase()}
                    </span>
                    <span className="eyebrow text-[0.65rem] text-fsa-bone-dim group-hover:text-fsa-gold transition-colors">
                      0{i + 1}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-12 inline-flex items-center justify-center gap-3 bg-fsa-gold hover:bg-fsa-gold-bright text-fsa-black px-8 py-5 text-sm font-bold uppercase tracking-widest rounded-sm transition-colors"
              >
                Join FSA →
              </motion.a>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 flex items-center gap-2"
              >
                {[0, 1, 2].map((i) => (
                  <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-fsa-gold">
                    <path d="M12 .587l3.668 7.568L24 9.75l-6 5.85 1.417 8.265L12 19.771l-7.417 4.094L6 15.6 0 9.75l8.332-1.595z" />
                  </svg>
                ))}
                <span className="eyebrow text-fsa-bone-dim ml-3">Our passion is the beautiful game</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
