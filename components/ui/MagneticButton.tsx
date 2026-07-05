"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { MouseEvent, ReactNode, useRef } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  variant?: "gold" | "outline" | "ghost";
  className?: string;
  strength?: number;
};

export default function MagneticButton({
  children,
  href,
  target,
  rel,
  onClick,
  variant = "gold",
  className,
  strength = 0.25,
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const prefersReduced = useReducedMotion();

  const onMove = (e: MouseEvent) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = clsx(
    "relative inline-flex items-center justify-center px-7 py-3 font-mono text-[11px] tracking-[0.22em] uppercase rounded-full overflow-hidden cursor-pointer transition-colors",
    variant === "gold" &&
      "bg-[var(--site-gold)] text-[var(--site-gold-ink)] font-semibold hover:bg-[var(--site-gold-bright)]",
    variant === "outline" &&
      "border border-[var(--site-gold)] text-[var(--site-gold)] hover:bg-[var(--site-pill)]",
    variant === "ghost" &&
      "border border-[color-mix(in_srgb,var(--site-teal)_40%,transparent)] text-[var(--site-teal)] hover:bg-[var(--site-teal-soft)]",
    className
  );

  const content = (
    <motion.span
      style={{ x: sx, y: sy }}
      className="relative z-10 flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={target === "_blank" ? (rel ?? "noopener noreferrer") : rel}
        className={classes}
        onMouseMove={onMove}
        onMouseLeave={reset}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      className={classes}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {content}
    </button>
  );
}
