"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { useMotionSetting } from "./motion-settings";
import type { BlockAnimation } from "@/lib/blocks";

const VARIANTS: Record<Exclude<BlockAnimation, "none">, Variants> = {
  "fade-up": { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } },
  pop: { hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } },
  "slide-left": { hidden: { opacity: 0, x: -60 }, show: { opacity: 1, x: 0 } },
  "slide-right": { hidden: { opacity: 0, x: 60 }, show: { opacity: 1, x: 0 } },
};

/** Wraps a page-builder block with its chosen scroll-in animation. */
export function BlockReveal({ animation, children }: { animation: BlockAnimation; children: ReactNode }) {
  const reduce = useMotionSetting();

  if (animation === "none" || reduce) return <>{children}</>;

  return (
    <motion.div
      variants={VARIANTS[animation]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={
        animation === "pop"
          ? { type: "spring", stiffness: 220, damping: 18 }
          : { duration: 0.6, ease: [0.21, 0.65, 0.35, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
