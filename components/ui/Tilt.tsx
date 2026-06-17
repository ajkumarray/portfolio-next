"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { MouseEvent, ReactNode, useRef } from "react";

export default function Tilt({
  children,
  className,
  intensity = 10,
  shine = true,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  shine?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 180, damping: 20 });
  const smy = useSpring(my, { stiffness: 180, damping: 20 });
  const rx = useTransform(smy, [0, 1], [intensity, -intensity]);
  const ry = useTransform(smx, [0, 1], [-intensity, intensity]);
  const shineX = useTransform(smx, [0, 1], ["0%", "100%"]);
  const shineY = useTransform(smy, [0, 1], ["0%", "100%"]);
  const shineBackground = useTransform(
    [shineX, shineY],
    ([x, y]) =>
      `radial-gradient(circle at ${x} ${y}, rgba(201,168,76,0.18), transparent 45%)`
  );
  const prefersReduced = useReducedMotion();

  const onMove = (e: MouseEvent) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        rotateX: prefersReduced ? 0 : rx,
        rotateY: prefersReduced ? 0 : ry,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
    >
      <div className="h-full" style={{ transform: "translateZ(0)" }}>{children}</div>
      {shine && !prefersReduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: shineBackground }}
        />
      )}
    </motion.div>
  );
}
