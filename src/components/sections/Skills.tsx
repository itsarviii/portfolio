"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  SiTypescript,
  SiPython,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiPostgresql,
  SiPrisma,
  SiGithub,
  SiDocker,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { skills } from "@/content/skills";
import Container from "@/components/layout/Container";
import { usePointerFine } from "@/hooks/usePointerFine";

const iconMap: Record<string, IconType> = {
  TypeScript:     SiTypescript,
  Python:         SiPython,
  "Next.js":      SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  "Express.js":   SiExpress,
  PostgreSQL:     SiPostgresql,
  Prisma:         SiPrisma,
  GitHub:         SiGithub,
  Docker:         SiDocker,
};

export default function Skills() {
  const reduced = useReducedMotion();
  const pointerFine = usePointerFine();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-t border-border py-20 md:py-28"
    >
      <Container>
        <motion.h2
          id="skills-heading"
          className="font-display text-4xl tracking-tight text-fg md:text-5xl"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Skills
        </motion.h2>

        <div
          className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8"
          onMouseLeave={pointerFine ? () => setHovered(null) : undefined}
        >
          {skills.map(({ group, items }, gi) => (
            <motion.div
              key={group}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: gi * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-4 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-accent">
                {group}
              </p>
              <div className="flex flex-col gap-2">
                {items.map((item, ii) => {
                  const Icon = iconMap[item];
                  const isHovered = hovered === item;
                  const isDimmed = hovered !== null && !isHovered;

                  return (
                    <motion.div
                      key={item}
                      className="flex cursor-default items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3"
                      initial={reduced ? false : { opacity: 0, scale: 0.85, y: 12 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.4,
                        delay: gi * 0.1 + ii * 0.07,
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                      }}
                      animate={pointerFine ? { opacity: isDimmed ? 0.25 : 1, y: isHovered ? -4 : 0 } : {}}
                      onMouseEnter={pointerFine ? () => setHovered(item) : undefined}
                    >
                      {Icon && (
                        <motion.div
                          animate={pointerFine ? { scale: isHovered ? 1.4 : 1 } : {}}
                          transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        >
                          <Icon
                            className={`text-xl transition-colors duration-200 ${isHovered ? "text-accent" : "text-muted"}`}
                          />
                        </motion.div>
                      )}
                      <span
                        className={`text-sm transition-colors duration-200 ${isHovered ? "text-fg" : "text-fg/70"}`}
                      >
                        {item}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
