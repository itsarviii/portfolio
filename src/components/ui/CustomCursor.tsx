"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { usePointerFine } from "@/hooks/usePointerFine";

export default function CustomCursor() {
  const pointerFine = usePointerFine();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const x = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.5 });
  const y = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.5 });

  useEffect(() => {
    if (!pointerFine || reduced) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
      if (!(e.target as Element).closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovering(false);
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onClick = () => setHovering(false);

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovering(true);
      }
    };

    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovering(false);
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("click", onClick);
    document.body.classList.add("cursor-none");

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("click", onClick);
      document.body.classList.remove("cursor-none");
    };
  }, [pointerFine, reduced, mouseX, mouseY]);

  if (!pointerFine || reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-9999">
      {/* Dot — instant follow */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ left: mouseX, top: mouseY }}
        animate={{
          width: hovering ? 0 : 7,
          height: hovering ? 0 : 7,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring — spring follow */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent"
        style={{
          left: x,
          top: y,
          boxShadow: hovering
            ? "0 0 16px color-mix(in srgb, var(--accent) 50%, transparent)"
            : "none",
        }}
        animate={{
          width: hovering ? 44 : 32,
          height: hovering ? 44 : 32,
          backgroundColor: hovering
            ? "color-mix(in srgb, var(--accent) 12%, transparent)"
            : "transparent",
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
