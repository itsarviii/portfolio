"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type RevealTag = Extract<
  keyof typeof motion,
  "div" | "section" | "article" | "p" | "ul" | "li" | "span"
>;

type RevealProps = {
  as?: RevealTag;
  delay?: number;
  y?: number;
  children?: React.ReactNode;
} & Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "transition" | "animate" | "children">;

export default function Reveal({ as = "div", delay = 0, y = 12, className, children, ...rest }: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = as;

  if (reduced) {
    return (
      <Tag className={className} {...(rest as React.HTMLAttributes<HTMLElement>)}>
        {children}
      </Tag>
    );
  }

  const MotionEl = motion[Tag] as React.ComponentType<HTMLMotionProps<"div">>;

  return (
    <MotionEl
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className={className}
      {...rest}
    >
      {children}
    </MotionEl>
  );
}
