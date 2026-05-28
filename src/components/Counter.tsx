"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  value: number | string;
  duration?: number;
  suffix?: string;
  className?: string;
};

export function Counter({ value, duration = 1.8, suffix = "", className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (latest) => Math.round(latest).toString());

  const isNumeric = typeof value === "number";

  useEffect(() => {
    if (!inView || !isNumeric) return;
    const controls = animate(motionVal, value as number, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, motionVal, value, duration, isNumeric]);

  if (!isNumeric) {
    return <span ref={ref} className={className}>{value as string}</span>;
  }

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
