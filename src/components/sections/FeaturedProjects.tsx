"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, GitFork } from "lucide-react";
import { projects } from "@/content/projects";
import type { Project } from "@/content/projects";
import Reveal from "@/components/ui/Reveal";
import Chip from "@/components/ui/Chip";
import BrowserMockup from "@/components/ui/BrowserMockup";
import { cn } from "@/lib/utils";


function screenshotSrc(url: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&colorScheme=dark&meta=false&embed=screenshot.url`;
}

function stripProtocol(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function CardLinks({ links }: { links: Project["links"] }) {
  const items = [
    links.live && { href: links.live, icon: ExternalLink, label: "Live site" },
    links.repo && { href: links.repo, icon: GitFork, label: "Repository" },
  ].filter((item): item is { href: string; icon: typeof ExternalLink; label: string } =>
    Boolean(item),
  );
  if (!items.length) return null;
  return (
    <div className="flex items-center gap-4">
      {items.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-fg"
        >
          <Icon size={14} />
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
}

function MobileStack() {
  return (
    <div className="px-4 py-16 sm:px-6">
      <Reveal>
        <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-muted">
          {String(projects.length).padStart(2, "0")} projects
        </p>
        <h3 className="mt-2 font-display text-4xl tracking-tight text-fg">Featured Projects</h3>
      </Reveal>

      <div className="mt-10 space-y-6">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.06}>
            <article className="overflow-hidden rounded-2xl border border-border bg-surface">
              <div
                className="relative aspect-video overflow-hidden"
                style={{
                  background: `radial-gradient(ellipse 100% 80% at 50% 50%, ${project.previewBg}30 0%, transparent 80%), var(--bg)`,
                }}
              >
                {project.links.live ? (
                  <div className="absolute inset-x-4 top-4">
                    <BrowserMockup
                      src={screenshotSrc(project.links.live)}
                      alt={project.title}
                      domain={stripProtocol(project.links.live)}
                      sizes="(max-width: 640px) 90vw, 540px"
                    />
                  </div>
                ) : project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 640px"
                    className="object-cover"
                  />
                ) : null}
              </div>

              <div className="space-y-3 p-5">
                <div className="flex items-center gap-2 font-mono text-[0.65rem] tracking-widest uppercase">
                  <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-border">·</span>
                  <span className="text-muted">
                    {project.role}&thinsp;·&thinsp;{project.year}
                  </span>
                </div>
                <h4 className="font-display text-2xl tracking-tight text-fg">{project.title}</h4>
                <p className="text-sm leading-relaxed text-muted">{project.summary}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.stack.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
                <CardLinks links={project.links} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

interface PreviewContentProps {
  project: Project;
  index: number;
}

function PreviewContent({ project, index }: PreviewContentProps) {
  const liveUrl = project.links.live;
  return (
    <div
      className="relative h-full overflow-hidden bg-bg"
      style={{
        background: `radial-gradient(ellipse 80% 70% at 50% 55%, ${project.previewBg}28 0%, transparent 75%), var(--bg)`,
      }}
    >
      {liveUrl ? (
        <BrowserMockup
          src={screenshotSrc(liveUrl)}
          alt={project.title}
          domain={stripProtocol(liveUrl)}
          tilt
          sizes="58vw"
        />
      ) : project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="58vw"
          className="object-cover"
        />
      ) : null}
    </div>
  );
}

interface ListAndPreviewProps {
  reduced: boolean | null;
}

function ListAndPreview({ reduced }: ListAndPreviewProps) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(0);
  const lockedRef = useRef(false);

  useEffect(() => {
    const calculate = () => {
      if (lockedRef.current) return;
      const mid = window.innerHeight / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      if (bestIdx !== activeRef.current) {
        activeRef.current = bestIdx;
        lockedRef.current = true;
        setActive(bestIdx);
        setTimeout(() => {
          lockedRef.current = false;
        }, 450);
      }
    };

    calculate();
    window.addEventListener("scroll", calculate, { passive: true });
    return () => window.removeEventListener("scroll", calculate);
  }, []);

  const project = projects[active] ?? projects[0];

  return (
    <div className="flex">
      <div className="w-[42%] border-r border-border">
        <div className="px-10 py-20 lg:px-14">
          <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-muted">
            {String(projects.length).padStart(2, "0")} projects
          </p>
          <h3 className="mt-3 font-display text-4xl tracking-tight text-fg lg:text-5xl">
            Featured
            <br />
            Projects
          </h3>
        </div>

        {projects.map((p, i) => (
          <div
            key={p.slug}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={cn(
              "relative flex min-h-[55vh] flex-col justify-center",
              "border-t border-border px-10 py-16 lg:px-14",
              "transition-opacity duration-500",
              active === i ? "opacity-100" : "opacity-25",
            )}
          >
            <span
              className={cn(
                "absolute left-0 top-0 h-full w-0.5 origin-top bg-accent transition-transform duration-500",
                active === i ? "scale-y-100" : "scale-y-0",
              )}
            />

            <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-accent">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h4 className="mt-3 font-display text-3xl tracking-tight text-fg lg:text-4xl">
              {p.title}
            </h4>
            <p className="mt-2 font-mono text-xs text-muted">
              {p.role}&thinsp;·&thinsp;{p.year}
            </p>

            <AnimatePresence>
              {active === i && (
                <motion.div
                  key="detail"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 space-y-4">
                    <p className="max-w-xs text-sm leading-relaxed text-muted">{p.summary}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </div>
                    <CardLinks links={p.links} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        <div className="h-[50vh]" />
      </div>

      <div
        className="w-[58%]"
        style={{
          position: "sticky",
          top: "var(--nav-h)",
          height: "calc(100dvh - var(--nav-h))",
        }}
      >
        <div className="relative h-full overflow-hidden">
          {reduced ? (
            <div className="absolute inset-0 flex flex-col">
              <PreviewContent project={project} index={active} />
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                key={project.slug}
                className="absolute inset-0 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <PreviewContent project={project} index={active} />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  const reduced = useReducedMotion();
  if (!projects.length) return null;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-t border-border"
    >
      <h2 id="projects-heading" className="sr-only">
        Featured Projects
      </h2>

      <div className="md:hidden">
        <MobileStack />
      </div>

      <div className="hidden md:block">
        <ListAndPreview reduced={reduced} />
      </div>
    </section>
  );
}
