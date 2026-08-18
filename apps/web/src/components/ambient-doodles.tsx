"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  SunDoodle,
  CloudDoodle,
  BalloonDoodle,
  HeartDoodle,
  PaperPlaneDoodle,
  AbcBlocksDoodle,
  RunningKidDoodle,
  JumpingKidDoodle,
} from "./playful";
import { cn } from "@/lib/utils";

/**
 * AmbientDoodles — persistent, page-wide layer of the same crayon-doodle
 * cast used in the hero. Mounted once in the root layout (fixed, negative
 * z-index) so it sits in the cream negative space behind every section,
 * never on top of text or cards, keeping the hero's playful vibe alive
 * for the whole scroll instead of resetting per section.
 *
 * Two motion layers per doodle:
 *  - a continuous CSS keyframe loop (float/wiggle/spin) for an "alive" idle
 *  - a slow scroll-linked sine drift (framer) so the whole cast breathes
 *    gently as the page scrolls, instead of staying perfectly static
 */

const WAVE_STOPS = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1];

type Loop =
  | "animate-float"
  | "animate-float-slow"
  | "animate-wiggle"
  | "animate-spin-slow"
  | "animate-run-bob"
  | "animate-bounce2";

type Anchor = {
  Icon: typeof SunDoodle;
  position: string;
  size: string;
  color: string;
  loop: Loop;
  delay: number;
  amplitude: number;
  phase: number;
  mobile?: boolean;
};

const ANCHORS: Anchor[] = [
  // The two playing kids anchor the whole layer — bigger, bolder, and
  // visible on mobile too, so the "children playing" read is immediate.
  { Icon: RunningKidDoodle, position: "top-[38%] left-[2%]", size: "w-11 md:w-14", color: "text-brand-primary/65", loop: "animate-run-bob", delay: 0.3, amplitude: 10, phase: 0.32, mobile: true },
  { Icon: JumpingKidDoodle, position: "bottom-[26%] right-[3%]", size: "w-11 md:w-14", color: "text-brand-orange/65", loop: "animate-bounce2", delay: 0.6, amplitude: 8, phase: 0.66, mobile: true },

  { Icon: SunDoodle, position: "top-[9%] left-[2.5%]", size: "w-9 md:w-11", color: "text-brand-yellow/60", loop: "animate-spin-slow", delay: 0, amplitude: 14, phase: 0 },
  { Icon: CloudDoodle, position: "top-[15%] right-[3%]", size: "w-12 md:w-16", color: "text-brand-sky/60", loop: "animate-float-slow", delay: 0.15, amplitude: 10, phase: 0.15 },
  { Icon: BalloonDoodle, position: "top-[62%] left-[2.5%]", size: "w-7 md:w-9", color: "text-brand-grape/45", loop: "animate-float", delay: 0.45, amplitude: 16, phase: 0.5 },
  { Icon: HeartDoodle, position: "bottom-[46%] right-[2.5%]", size: "w-7 md:w-9", color: "text-[#ff5a8a]/50", loop: "animate-float", delay: 0.75, amplitude: 12, phase: 0.8 },
  { Icon: PaperPlaneDoodle, position: "top-[24%] right-[8%]", size: "w-8 md:w-10", color: "text-brand-turquoise/50", loop: "animate-float-slow", delay: 0.9, amplitude: 18, phase: 0.9 },
  { Icon: AbcBlocksDoodle, position: "bottom-[9%] left-[2.5%]", size: "w-10 md:w-12", color: "text-brand-yellow/50", loop: "animate-wiggle", delay: 1.05, amplitude: 10, phase: 1 },
];

export function AmbientDoodles() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
    >
      {ANCHORS.map((anchor, i) => (
        <DoodleAnchor
          key={i}
          anchor={anchor}
          reduce={!!reduce}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function DoodleAnchor({
  anchor,
  reduce,
  scrollYProgress,
}: {
  anchor: Anchor;
  reduce: boolean;
  scrollYProgress: MotionValue<number>;
}) {
  const outputs = WAVE_STOPS.map(
    (t) => anchor.amplitude * Math.sin(2 * Math.PI * (t * 2 + anchor.phase))
  );
  const y = useTransform(scrollYProgress, WAVE_STOPS, outputs);
  const rotate = useTransform(scrollYProgress, WAVE_STOPS, outputs.map((v) => v * 0.35));

  return (
    <motion.div
      className={cn("absolute", anchor.position, anchor.mobile ? "block" : "hidden md:block")}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25 + anchor.delay, ease: [0.16, 1, 0.3, 1] }}
      style={reduce ? undefined : { y, rotate }}
    >
      <div className={cn(anchor.size, anchor.color, !reduce && anchor.loop)}>
        <anchor.Icon className="w-full" />
      </div>
    </motion.div>
  );
}
