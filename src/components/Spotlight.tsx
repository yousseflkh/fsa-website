"use client";

import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  size?: number;
  color?: string;
};

export function Spotlight({
  children,
  className = "",
  size = 400,
  color = "rgba(212, 164, 55, 0.12)",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`relative group/spot ${className}`}
      style={{
        ["--mx" as string]: "50%",
        ["--my" as string]: "50%",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover/spot:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(${size}px circle at var(--mx) var(--my), ${color}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
