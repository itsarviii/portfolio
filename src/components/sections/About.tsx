"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type MotionProps,
} from "framer-motion";
import { about } from "@/content/about";
import Container from "@/components/layout/Container";
import { usePointerFine } from "@/hooks/usePointerFine";

const emojis = ["🛠️", "💡", "📦", "🚀", "🌍"];

const emojiAnimations: MotionProps[] = [
  { animate: { rotate: [-12, 12, -12] }, transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" } },
  { animate: { scale: [1, 1.2, 1] }, transition: { duration: 0.7, repeat: Infinity, ease: "easeInOut" } },
  { animate: { y: [0, -7, 0] }, transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" } },
  { animate: { y: [0, -10, 0], rotate: [-8, 8, -8] }, transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" } },
  { animate: { rotate: [0, 360] }, transition: { duration: 3, repeat: Infinity, ease: "linear" } },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type FadeProps = Pick<MotionProps, "initial" | "whileInView" | "viewport" | "transition">;

const fade = (delay = 0): FadeProps => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, delay, ease: EASE },
});

export default function About() {
  const reduced = useReducedMotion();
  const pointerFine = usePointerFine();
  const [hovered, setHovered] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 200, damping: 20 });
  const y = useSpring(rawY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-border py-20 md:py-28"
    >
      <Container>
        <motion.h2
          id="about-heading"
          className="font-display text-4xl tracking-tight text-fg md:text-5xl"
          {...(reduced ? {} : fade(0))}
        >
          About
        </motion.h2>

        <div className="mt-12 flex flex-col gap-12 md:flex-row md:gap-16 lg:gap-24">
          <motion.div className="shrink-0 md:w-56 lg:w-64" {...(reduced ? {} : fade(0.08))}>
            <p className="text-base leading-relaxed text-muted">{about.bio}</p>
            <div className="mt-8 hidden flex-col gap-5 border-t border-border pt-7 md:flex">
              {about.facts.map(({ label, value }) => (
                <div key={label}>
                  <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-muted">{label}</p>
                  <p className="mt-1 text-sm text-fg">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div
            ref={containerRef}
            className="relative flex-1 md:divide-y md:divide-border md:border-t md:border-border"
            onMouseMove={reduced || !pointerFine ? undefined : handleMouseMove}
            onMouseLeave={() => setHovered(null)}
          >
            {about.manifesto.map((line, i) => (
              <motion.div
                key={i}
                className="flex cursor-default items-start gap-4 py-4 md:gap-6 md:py-7"
                onMouseEnter={() => setHovered(i)}
                {...(reduced ? {} : fade(0.08 + i * 0.08))}
              >
                <span className="mt-1 shrink-0 font-mono text-[0.6rem] tracking-wide text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className={`flex-1 text-base leading-relaxed md:text-lg transition-colors duration-200 ${hovered === i ? "text-fg" : "text-fg/60"}`}
                >
                  {i % 2 === 1 ? <em>{line}</em> : line}
                </p>
              </motion.div>
            ))}

            {!reduced && pointerFine && (
              <AnimatePresence>
                {hovered !== null && (
                  <motion.div
                    className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: x, top: y }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.span
                      style={{ fontSize: "2.5rem", lineHeight: 1, display: "block" }}
                      {...emojiAnimations[hovered]}
                    >
                      {emojis[hovered]}
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>

        <div className="mt-10 flex gap-10 md:hidden">
          {about.facts.map(({ label, value }) => (
            <div key={label}>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-muted">{label}</p>
              <p className="mt-1 text-sm text-fg">{value}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
