"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { MouseEvent, ReactNode, useRef } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "gold" | "outline" | "ghost";
  className?: string;
  strength?: number;
};

export default function MagneticButton({
  children,
  href,
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
      "bg-gold text-navy-deep font-semibold hover:bg-gold-2",
    variant === "outline" &&
      "border border-gold text-gold hover:bg-[rgba(201,168,76,0.08)]",
    variant === "ghost" &&
      "border border-[rgba(37,196,178,0.4)] text-teal-2 hover:bg-[rgba(37,196,178,0.08)]",
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
