"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import type { IconType } from "react-icons";
import { site } from "@/content/site";
import Container from "@/components/layout/Container";

const socialIcons: Record<string, IconType> = {
  Github: SiGithub,
  Linkedin: FaLinkedin,
};

const headingWords = ["Let's", "work", "together."];

export default function Contact() {
  const reduced = useReducedMotion();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative border-t border-border overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle, color-mix(in srgb, var(--color-border) 60%, transparent) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <Container>
        <div className="grid min-h-[80vh] items-center py-24 md:grid-cols-2 md:gap-16">
          <div>
            <motion.p
              className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-accent"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Contact
            </motion.p>

            <h2
              id="contact-heading"
              className="mt-4 font-display text-4xl tracking-tight text-fg md:text-5xl lg:text-6xl"
            >
              {headingWords.map((word, i) => (
                <motion.span
                  key={word}
                  className="block"
                  initial={reduced ? false : { opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            <motion.p
              className="mt-6 text-sm text-muted"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              {site.location} · Open to remote
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col gap-8 pt-16 md:pt-0"
            initial={reduced ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href={`mailto:${site.email}`}
              className="group flex items-end justify-between border-b border-border pb-6 transition-colors duration-200 hover:border-accent/50"
            >
              <div>
                <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-muted">
                  Email
                </p>
                <p className="mt-2 font-display text-2xl tracking-tight text-fg transition-colors duration-200 group-hover:text-accent lg:text-3xl">
                  {site.email}
                </p>
              </div>
              <ArrowUpRight
                size={20}
                className="mb-1 shrink-0 text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              />
            </a>

            <div className="flex items-center gap-6">
              {site.socials.map(({ label, href, icon }) => {
                const Icon = socialIcons[icon];
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-muted transition-colors duration-200 hover:text-fg"
                  >
                    {Icon && <Icon className="text-base" />}
                    {label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
