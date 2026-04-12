"use client";

import { useRef } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { site } from "@/content/site";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import { gsap, registerGsap } from "@/lib/gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const greeting = site.hero?.greeting ?? "Hi, I'm";
  const subtitle = site.hero?.subtitle ?? site.tagline;
  const primaryCta = site.hero?.primaryCta ?? { label: "Get in touch", href: "#contact" };
  const secondaryCta = site.hero?.secondaryCta ?? { label: "View work", href: "#projects" };

  const namePieces = (site.name || "").trim().split(/\s+/);
  const firstName = namePieces[0] ?? site.name;
  const lastName = namePieces.slice(1).join(" ");

  useGSAP(
    () => {
      if (reduced !== false) return;
      registerGsap();

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        greetingRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4 },
      );

      tl.fromTo(
        "[data-name-char]",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: { each: 0.03, from: "center" },
          clearProps: "transform",
        },
        "-=0.15",
      );

      tl.fromTo(
        [roleRef.current, chipRef.current, subtitleRef.current, ctasRef.current].filter(Boolean),
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.07,
          clearProps: "transform",
        },
        "-=0.35",
      );
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Intro"
      className="relative flex w-full items-center overflow-hidden min-h-[calc(100dvh-var(--nav-h))] py-20 md:h-[calc(100dvh-var(--nav-h))] md:py-0"
    >
      <BackgroundGlow />

      <Container className="relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          <div className="inline-block text-left">
            {greeting && (
              <p
                ref={greetingRef}
                className="mb-4 ml-1 font-display text-[clamp(1.25rem,2.5vw,1.75rem)] italic leading-none text-muted md:mb-6 md:ml-2"
              >
                {greeting}
              </p>
            )}
            <h1 className="tracking-tight text-fg">
              <span className="block font-hero text-[clamp(3rem,12vw,10rem)] leading-[1.05]">
                {firstName.split("").map((char, i) => (
                  <span key={i} data-name-char className="inline-block">
                    {char}
                  </span>
                ))}
              </span>
              {lastName && (
                <span className="mt-2 block font-hero text-[clamp(3rem,12vw,10rem)] italic leading-[1.05] text-muted">
                  {lastName.split("").map((char, i) => (
                    <span key={i} data-name-char className="inline-block">
                      {char === " " ? " " : char}
                    </span>
                  ))}
                </span>
              )}
            </h1>
          </div>

          <p
            ref={roleRef}
            className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-muted md:mt-8"
          >
            {site.role}
          </p>

          {site.available && (
            <div
              ref={chipRef}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-medium text-muted backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Available for work
            </div>
          )}

          {subtitle && (
            <p
              ref={subtitleRef}
              className="mt-8 max-w-2xl text-[clamp(1.125rem,1.6vw,1.375rem)] leading-snug text-muted md:mt-10"
            >
              {subtitle}
            </p>
          )}

          <div
            ref={ctasRef}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 md:mt-12"
          >
            <MagneticButton>
              <Button as="a" href={primaryCta.href} variant="primary" size="lg">
                <Mail size={16} />
                {primaryCta.label}
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button as="a" href={secondaryCta.href} variant="secondary" size="lg">
                {secondaryCta.label}
                <ArrowUpRight size={16} />
              </Button>
            </MagneticButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

function BackgroundGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2 h-[80vh] w-[80vw] max-w-225 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl dark:opacity-40"
        style={{
          background: "radial-gradient(ellipse at center, var(--accent) 0%, transparent 60%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-bg" />
    </div>
  );
}
