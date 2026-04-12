"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site, type NavItem } from "@/content/site";
import { cn } from "@/lib/utils";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
import { scrollToHash, stopScroll, startScroll } from "./SmoothScroll";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      stopScroll();
    } else {
      startScroll();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          open
            ? "border-transparent"
            : scrolled
              ? "border-border bg-bg/80 backdrop-blur-md"
              : "border-transparent",
        )}
        style={{ height: "var(--nav-h)" }}
      >
        <Container className="flex h-full items-center justify-between">
          <a
            href="#top"
            aria-label={`${site.name} — home`}
            className="font-mono text-sm font-medium uppercase tracking-widest text-fg transition-colors hover:text-accent"
          >
            {site.nickname ?? site.name}
          </a>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <MenuButton open={open} onClick={() => setOpen((v) => !v)} />
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open && (
          <FullScreenMenu
            nav={site.nav}
            resumeUrl={site.resumeUrl}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

interface MenuButtonProps {
  open: boolean;
  onClick: () => void;
}

function MenuButton({ open, onClick }: MenuButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="fullscreen-menu"
      whileTap={{ scale: 0.88 }}
      className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border text-fg transition-colors hover:bg-surface"
    >
      <AnimatePresence initial={false}>
        {open ? (
          <motion.span
            key="close"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute"
          >
            <X size={18} />
          </motion.span>
        ) : (
          <motion.span
            key="menu"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute"
          >
            <Menu size={18} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

interface FullScreenMenuProps {
  nav: NavItem[];
  resumeUrl: string;
  onClose: () => void;
}

function FullScreenMenu({ nav, resumeUrl, onClose }: FullScreenMenuProps) {
  return (
    <motion.div
      id="fullscreen-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-40 flex flex-col bg-bg"
    >
      <Container className="flex flex-1 flex-col items-center justify-center">
        <nav aria-label="Site navigation">
          <ul className="flex flex-col items-center gap-1">
            {nav.map((item, i) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  duration: 0.35,
                  delay: 0.05 + i * 0.055,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    setTimeout(() => scrollToHash(item.href.slice(1)), 300);
                  }}
                  className="group block py-1.5 font-display text-[clamp(2rem,6vw,4.5rem)] leading-tight tracking-tight text-fg transition-[color,transform] duration-200 hover:translate-x-2 hover:text-accent"
                >
                  {item.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.38 }}
          className="mt-10"
        >
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="inline-flex min-h-11 items-center rounded-full border border-border px-6 text-sm font-medium text-muted transition-colors hover:border-fg hover:text-fg"
          >
            Résumé
          </a>
        </motion.div>
      </Container>
    </motion.div>
  );
}
