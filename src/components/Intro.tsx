"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const SEQUENCE_MS = 2000;
const EASE = [0.22, 1, 0.36, 1] as const;

export function Intro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = prev;
    }, SEQUENCE_MS);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-fsa-black overflow-hidden"
        >
          {/* Unified vertical composition — fades out as a single block */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            {/* Crest */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative w-[20vmin] h-[20vmin]"
            >
              <Image
                src="/logo.png"
                alt="FSA crest"
                fill
                sizes="20vmin"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Three stars */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
              className="mt-7 flex items-center gap-3"
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
            </motion.div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="mt-6 flex flex-col items-center gap-2"
            >
              <span className="font-display text-2xl md:text-3xl tracking-[0.3em] text-fsa-bone">
                FARIAS
              </span>
              <span className="eyebrow text-fsa-gold">Soccer Academy</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
