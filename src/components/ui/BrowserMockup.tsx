"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrowserMockupProps {
  src: string;
  alt: string;
  domain: string;
  tilt?: boolean;
  sizes?: string;
  className?: string;
}

function Chrome({ src, alt, domain, sizes, className }: Omit<BrowserMockupProps, "tilt">) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-black/20 dark:shadow-black/60 dark:ring-1 dark:ring-white/8", className)}>
      <div className="flex items-center gap-1.5 border-b border-border bg-surface px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-2 flex-1 truncate rounded-md bg-bg/80 px-2.5 py-0.5 font-mono text-[10px] text-muted">
          {domain}
        </div>
      </div>
      <div className="relative aspect-video">
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized={src.startsWith("http")}
          sizes={sizes ?? "800px"}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

export default function BrowserMockup({ src, alt, domain, tilt = false, sizes, className }: BrowserMockupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-6, 6]), { stiffness: 200, damping: 25 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mouseX.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    mouseY.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  if (!tilt) return <Chrome src={src} alt={alt} domain={domain} sizes={sizes} className={className} />;

  return (
    <div
      ref={ref}
      style={{ perspective: "1200px" }}
      className="flex h-full w-full items-center justify-center p-10 lg:p-14"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div style={{ rotateX, rotateY }} className="w-full">
        <Chrome src={src} alt={alt} domain={domain} sizes={sizes} className={className} />
      </motion.div>
    </div>
  );
}
