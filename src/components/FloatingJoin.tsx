"use client";

import { motion } from "framer-motion";

export function FloatingJoin() {
  return (
    <motion.a
      href="https://www.rampregistrations.com/login?v3=4b98782753"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 left-5 z-50 md:hidden inline-flex items-center gap-2 bg-fsa-crimson hover:bg-fsa-crimson-bright text-fsa-bone text-sm font-bold uppercase tracking-widest px-5 py-3 rounded-full shadow-lg transition-colors duration-300"
    >
      Join FSA
      <span>→</span>
    </motion.a>
  );
}
