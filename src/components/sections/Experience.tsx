"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { experience, type ExperienceEntry } from "@/content/experience";
import Container from "@/components/layout/Container";

function formatDate(str: string): string {
  if (str === "present") return "Present";
  const [year, month] = str.split("-");
  return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

interface MobileEntryProps {
  item: ExperienceEntry;
  i: number;
  reduced: boolean | null;
}

function MobileEntry({ item, i, reduced }: MobileEntryProps) {
  return (
    <motion.div
      className="border-t border-border pt-6"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-accent">
            {item.kind === "work" ? "Work" : "Education"}
          </p>
          <h3 className="mt-1 text-base font-medium text-fg">{item.role}</h3>
          <p className="mt-0.5 text-sm text-muted">
            {item.org} · {item.location}
          </p>
        </div>
        <p className="shrink-0 font-mono text-[0.6rem] text-muted">
          {formatDate(item.start)} – {formatDate(item.end)}
        </p>
      </div>
      {item.bullets.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2">
          {item.bullets.map((b, j) => (
            <li key={j} className="flex gap-2 text-sm text-muted">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {b}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

export default function Experience() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  registerGsap();

  useGSAP(
    () => {
      if (reduced) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (pointer: fine)", () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const panels = gsap.utils.toArray<HTMLElement>("[data-experience-panel]", section);
        const getDistance = () => track.scrollWidth - window.innerWidth;
        const getNavH = () =>
          (document.querySelector("nav") as HTMLElement | null)?.offsetHeight ?? 72;

        if (panels.length) gsap.set(panels, { opacity: 0.35 });

        let activeIndex = -1;

        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: () => `top top+=${getNavH()}`,
            end: () => `+=${getDistance()}`,
            invalidateOnRefresh: true,
            onUpdate(self) {
              const dist = getDistance();
              const viewportCenter = self.progress * dist + window.innerWidth / 2;
              const titleW = window.innerWidth * 0.4;
              const panelW = window.innerWidth * 0.6;
              const next = Math.max(
                0,
                Math.min(Math.floor((viewportCenter - titleW) / panelW), panels.length - 1),
              );
              if (next !== activeIndex) {
                activeIndex = next;
                panels.forEach((panel, i) =>
                  gsap.to(panel, {
                    opacity: i === next ? 1 : 0.35,
                    duration: 0.5,
                    ease: "power2.out",
                    overwrite: "auto",
                  }),
                );
              }
            },
          },
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experience-heading"
      className="border-t border-border overflow-x-clip"
    >
      <div ref={trackRef} className="hidden md:flex md:w-max md:flex-row md:items-stretch">
        <div className="flex min-h-dvh w-[40vw] shrink-0 items-center border-r border-border px-[max(2rem,calc((100vw-72rem)/2+2rem))]">
          <h2
            id="experience-heading"
            className="font-display text-5xl tracking-tight text-fg lg:text-6xl"
          >
            Experience
          </h2>
        </div>

        {experience.map((item, i) => (
          <div
            key={i}
            data-experience-panel
            className={`flex min-h-dvh w-[60vw] shrink-0 flex-col overflow-hidden border-r border-border p-16 lg:p-24${i % 2 === 1 ? " bg-surface" : ""}`}
          >
            <div className="flex items-start justify-between">
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-accent">
                {item.kind === "work" ? "Work" : "Education"}
              </p>
              <p className="font-mono text-[0.6rem] text-muted">
                {formatDate(item.start)} – {formatDate(item.end)}
              </p>
            </div>

            <div className="mt-20 lg:mt-28">
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-muted">
                {item.org} · {item.location}
              </p>
              <h3 className="mt-3 font-display text-4xl tracking-tight text-fg lg:text-5xl">
                {item.role}
              </h3>
              {item.bullets.length > 0 && (
                <ul className="mt-8 flex max-w-lg flex-col gap-3">
                  {item.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-base text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <p className="mt-auto text-right font-display text-[8rem] leading-none tracking-tight text-fg/5 lg:text-[10rem]">
              {String(i + 1).padStart(2, "0")}
            </p>
          </div>
        ))}
      </div>

      <div className="md:hidden">
        <Container>
          <div className="py-20">
            <h2
              id="experience-heading"
              className="font-display text-4xl tracking-tight text-fg"
            >
              Experience
            </h2>
            <div className="mt-12 flex flex-col gap-10">
              {experience.map((item, i) => (
                <MobileEntry key={i} item={item} i={i} reduced={reduced} />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
