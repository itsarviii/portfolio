"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, registerGsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenis: Lenis | null = null;

export function scrollToHash(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;
  const navH = document.querySelector("header")?.clientHeight ?? 72;
  if (lenis) {
    lenis.scrollTo(target, { offset: -navH });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function stopScroll(): void {
  lenis?.stop();
}

export function startScroll(): void {
  lenis?.start();
}

export default function SmoothScroll() {
  useEffect(() => {
    registerGsap();

    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis!.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href")!.slice(1);
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      scrollToHash(id);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      gsap.ticker.remove(tick);
      lenis!.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
