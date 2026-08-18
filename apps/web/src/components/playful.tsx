"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotionSetting } from "@/components/motion-settings";
import type { ReactNode } from "react";

/**
 * Playschool design kit — decorations shared by every page. Static pieces
 * (WaveDivider, Bunting, Tape, the doodle SVGs) stay plain markup so pages
 * that render them don't need a client boundary. Float is the one client
 * leaf: it pops each doodle in as it scrolls into view, then hands off to
 * the Tailwind idle-loop keyframes (float, float-slow, wiggle, bounce2,
 * spin-slow), which are disabled globally for prefers-reduced-motion users.
 */

// ——— Section transitions ————————————————————————————————————————

/**
 * Soft wave between two section backgrounds. Place immediately BEFORE the
 * section it melts into and set `fillClass` to that section's bg:
 *   <WaveDivider fillClass="fill-white" />
 *   <section className="bg-white">…</section>
 * Use `flip` for the wave leaving that section back to cream.
 */
export function WaveDivider({
  fillClass = "fill-white",
  flip = false,
  className,
}: {
  fillClass?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("-mb-px leading-none", flip && "rotate-180 -mt-px -mb-0", className)}>
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        className="block w-full h-8 md:h-12"
      >
        <path
          className={fillClass}
          d="M0,28 C180,52 360,4 560,20 C760,36 900,52 1100,32 C1250,17 1360,24 1440,30 L1440,56 L0,56 Z"
        />
      </svg>
    </div>
  );
}

/** A string of colourful party-flag bunting. Great under section headings. */
export function Bunting({ className }: { className?: string }) {
  const colors = ["#ff5a8a", "#ffd93d", "#00d4c8", "#8b5cf6", "#ff8a3d", "#7ce2b5", "#7cc5ff"];
  return (
    <svg aria-hidden viewBox="0 0 280 34" className={cn("h-7 w-auto", className)} fill="none">
      <path
        d="M2 4 Q 140 30 278 4"
        stroke="#1a1033"
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {colors.map((c, i) => {
        const x = 18 + i * 36;
        // flags hang from the dipping string — approximate the curve
        const t = (x - 2) / 276;
        const y = 4 + 26 * (4 * t * (1 - t)) * 0.95;
        return (
          <path
            key={i}
            d={`M ${x - 8} ${y} L ${x + 8} ${y} L ${x} ${y + 14} Z`}
            fill={c}
            transform={`rotate(${i % 2 ? 3 : -3} ${x} ${y})`}
          />
        );
      })}
    </svg>
  );
}

/** Washi-tape strip — stick it on a card corner: absolute + rotate. */
export function Tape({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute h-6 w-24 bg-brand-yellow/60 shadow-sm",
        "[mask-image:linear-gradient(90deg,transparent_0,black_6px,black_calc(100%-6px),transparent_100%)]",
        className
      )}
    />
  );
}

/**
 * Absolute, animated wrapper for corner doodles. Pops in with a springy
 * bounce the moment its section scrolls into view, then settles into its
 * continuous idle loop. Always decorative.
 */
export function Float({
  className,
  speed = "slow",
  children,
}: {
  className?: string;
  speed?: "slow" | "fast" | "wiggle" | "spin";
  children: ReactNode;
}) {
  const reduce = useMotionSetting();
  const anim =
    speed === "fast" ? "animate-float" :
    speed === "wiggle" ? "animate-wiggle" :
    speed === "spin" ? "animate-spin-slow" :
    "animate-float-slow";
  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none absolute select-none", className)}
      initial={reduce ? undefined : { opacity: 0, scale: 0.3, rotate: -20 }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.4, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 260, damping: 14, mass: 0.6 }}
    >
      <div className={anim}>{children}</div>
    </motion.div>
  );
}

// ——— Crayon doodles (stroke = currentColor, tint via text-*) ————————

type DoodleProps = { className?: string };
const stroke = {
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

export function SunDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="24" cy="24" r="9" {...stroke} />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        const x1 = 24 + Math.cos(a) * 13.5;
        const y1 = 24 + Math.sin(a) * 13.5;
        const x2 = 24 + Math.cos(a) * 19;
        const y2 = 24 + Math.sin(a) * 19;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} {...stroke} />;
      })}
    </svg>
  );
}

export function CloudDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 56 32" className={className} aria-hidden>
      <path
        d="M 10 24 Q 4 24 5 18 Q 6 12 13 13 Q 14 5 23 6 Q 31 6 32 12 Q 40 10 42 16 Q 50 16 49 22 Q 48 26 42 26 L 12 26 Q 10 26 10 24 Z"
        {...stroke}
      />
    </svg>
  );
}

export function RainbowDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 64 36" className={className} aria-hidden>
      <path d="M 6 32 A 26 26 0 0 1 58 32" stroke="#ff5a8a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M 12 32 A 20 20 0 0 1 52 32" stroke="#ffd93d" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M 18 32 A 14 14 0 0 1 46 32" stroke="#00d4c8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M 24 32 A 8 8 0 0 1 40 32" stroke="#8b5cf6" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function BalloonDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 32 48" className={className} aria-hidden>
      <ellipse cx="16" cy="14" rx="10" ry="12" {...stroke} />
      <path d="M 14 26 L 18 26 L 16 30" {...stroke} />
      <path d="M 16 30 Q 12 36 16 40 Q 20 44 17 47" {...stroke} />
    </svg>
  );
}

export function PaperPlaneDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 52 40" className={className} aria-hidden>
      <path d="M 4 18 L 46 6 L 30 34 L 22 24 Z" {...stroke} />
      <path d="M 22 24 L 24 32" {...stroke} />
      <path d="M 4 30 Q 10 28 14 30" {...stroke} strokeDasharray="3 4" />
    </svg>
  );
}

export function CrayonDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 20" className={className} aria-hidden>
      <path d="M 6 10 L 12 5 L 40 5 L 44 10 L 40 15 L 12 15 Z" {...stroke} />
      <line x1="16" y1="5" x2="16" y2="15" {...stroke} />
    </svg>
  );
}

export function SwirlDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M 20 34 C 8 34 4 24 8 16 C 12 8 24 6 29 13 C 33 19 28 26 21 25 C 16 24 15 18 19 16" {...stroke} />
    </svg>
  );
}

export function PuzzleDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden>
      <path
        d="M 8 12 H 18 Q 16 4 22 4 Q 28 4 26 12 H 36 V 22 Q 44 20 44 26 Q 44 32 36 30 V 40 H 8 Z"
        {...stroke}
        transform="scale(0.92) translate(1 1)"
      />
    </svg>
  );
}

export function AbcBlocksDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 52 40" className={className} aria-hidden>
      <rect x="6" y="20" width="16" height="16" rx="2" {...stroke} />
      <rect x="26" y="20" width="16" height="16" rx="2" {...stroke} />
      <rect x="16" y="3" width="16" height="16" rx="2" {...stroke} transform="rotate(-4 24 11)" />
      <text x="11" y="32.5" fontSize="10" fontWeight="700" fill="currentColor" stroke="none">A</text>
      <text x="31" y="32.5" fontSize="10" fontWeight="700" fill="currentColor" stroke="none">B</text>
      <text x="20.5" y="15.5" fontSize="10" fontWeight="700" fill="currentColor" stroke="none" transform="rotate(-4 24 11)">C</text>
    </svg>
  );
}

export function SmileDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="15" {...stroke} />
      <circle cx="14.5" cy="16" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="25.5" cy="16" r="1.6" fill="currentColor" stroke="none" />
      <path d="M 13 24 Q 20 30 27 24" {...stroke} />
    </svg>
  );
}

export function HeartDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 40 36" className={className} aria-hidden>
      <path
        d="M 20 31 C 6 22 2 12 9 7 C 14 4 19 7 20 11 C 21 7 26 4 31 7 C 38 12 34 22 20 31 Z"
        {...stroke}
      />
    </svg>
  );
}

export function StarDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path
        d="M 20 4 L 24.5 15 L 36 15.5 L 27 23 L 30 35 L 20 28.5 L 10 35 L 13 23 L 4 15.5 L 15.5 15 Z"
        {...stroke}
      />
    </svg>
  );
}

// ——— Playing-kid doodles — actual children figures, mid-stride/mid-jump ———

export function RunningKidDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden>
      <circle cx="23" cy="9" r="6" {...stroke} />
      <path d="M 23 15 L 19 27" {...stroke} />
      <path d="M 19 18 L 31 12" {...stroke} />
      <path d="M 20 19 L 9 25" {...stroke} />
      <path d="M 19 27 L 28 31 L 25 41" {...stroke} />
      <path d="M 19 27 L 11 33 L 14 41" {...stroke} />
      <path d="M 2 30 Q 6 28 10 29" {...stroke} strokeDasharray="2.5 4" />
    </svg>
  );
}

export function JumpingKidDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 40 44" className={className} aria-hidden>
      <circle cx="20" cy="9" r="6" {...stroke} />
      <path d="M 20 15 L 20 26" {...stroke} />
      <path d="M 20 17 L 8 6" {...stroke} />
      <path d="M 20 17 L 32 6" {...stroke} />
      <path d="M 20 26 L 12 34 L 15 41" {...stroke} />
      <path d="M 20 26 L 26 35 L 23 41" {...stroke} />
      <path d="M 10 41 Q 13 43 16 41" {...stroke} strokeDasharray="2 3" />
      <path d="M 24 41 Q 27 43 30 41" {...stroke} strokeDasharray="2 3" />
    </svg>
  );
}

// ——— Playground-scene doodles — bigger set-piece illustrations for the hero ———

/** Ladder + curved slide, matching the crayon-stroke doodle style. */
export function SlideDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 84 100" className={className} aria-hidden>
      {/* ladder */}
      <path d="M 12 94 L 18 30" {...stroke} />
      <path d="M 26 94 L 30 30" {...stroke} />
      {[42, 54, 66, 78].map((y) => (
        <line key={y} x1={13.5 + ((94 - y) / 64) * 4.5} y1={y} x2={27.5 + ((94 - y) / 64) * 2.5} y2={y} {...stroke} />
      ))}
      {/* platform */}
      <path d="M 16 30 Q 24 24 34 28 L 34 34 L 16 34 Z" {...stroke} />
      {/* slide chute */}
      <path
        d="M 33 29 C 55 32 62 44 58 56 C 54 68 40 66 38 78 C 37 85 44 88 52 86"
        {...stroke}
      />
      <path
        d="M 33 34 C 52 37 58 47 55 57 C 51 68 38 67 36 78"
        {...stroke}
        strokeDasharray="1 5"
      />
    </svg>
  );
}

/** Round ball pit — rim with a scatter of multicolour balls inside. */
export function BallPitDoodle({ className }: DoodleProps) {
  const balls = [
    { x: 14, y: 30, c: "#ff5a8a" },
    { x: 30, y: 22, c: "#ffd93d" },
    { x: 47, y: 28, c: "#00d4c8" },
    { x: 63, y: 24, c: "#8b5cf6" },
    { x: 22, y: 40, c: "#7cc5ff" },
    { x: 40, y: 36, c: "#ff8a3d" },
    { x: 57, y: 40, c: "#7ce2b5" },
    { x: 72, y: 34, c: "#ff5a8a" },
    { x: 33, y: 48, c: "#ffd93d" },
    { x: 50, y: 48, c: "#8b5cf6" },
  ];
  return (
    <svg viewBox="0 0 86 62" className={className} aria-hidden>
      <path d="M 4 30 Q 4 12 43 12 Q 82 12 82 30" {...stroke} />
      {balls.map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r="6" fill={b.c} stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.35" />
      ))}
      <path d="M 2 30 Q 43 44 84 30 L 84 46 Q 43 60 2 46 Z" {...stroke} />
    </svg>
  );
}

/** Slanted climbing wall with staggered grip holds. */
export function ClimbingWallDoodle({ className }: DoodleProps) {
  const holds = [
    [16, 20, "#ff5a8a"],
    [34, 14, "#ffd93d"],
    [50, 24, "#00d4c8"],
    [14, 42, "#8b5cf6"],
    [32, 38, "#7cc5ff"],
    [50, 46, "#ff8a3d"],
    [16, 64, "#7ce2b5"],
    [34, 60, "#ff5a8a"],
    [50, 68, "#ffd93d"],
  ] as const;
  return (
    <svg viewBox="0 0 68 90" className={className} aria-hidden>
      <path d="M 6 88 L 30 4 L 62 4 L 62 88 Z" {...stroke} />
      {holds.map(([x, y, c], i) => (
        <circle key={i} cx={x} cy={y} r="4.2" fill={c} stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.35" />
      ))}
    </svg>
  );
}

/**
 * Full-width wavy ground/grass band — sits along the bottom of a scene so
 * standalone doodles (slide, climbing wall, kids) read as one continuous
 * illustrated backdrop instead of scattered icons. Fill colour via
 * `text-*` on the wrapper (uses currentColor).
 */
export function GroundBandDoodle({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 1600 140"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <path
        d="M0,60 C120,20 260,90 420,55 C580,20 720,85 880,50 C1040,15 1180,80 1340,48 C1440,28 1520,55 1600,40 L1600,140 L0,140 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Little party-room tent with a pennant flag on top and bunting-style door. */
export function PartyTentDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 72 68" className={className} aria-hidden>
      <path d="M 6 66 L 6 34 L 36 10 L 66 34 L 66 66 Z" {...stroke} />
      <path d="M 36 10 L 36 2" {...stroke} />
      <path d="M 36 2 L 48 6 L 36 10 Z" fill="#ff5a8a" stroke="currentColor" strokeWidth="1.3" />
      <path d="M 24 66 L 24 44 Q 24 38 30 38 L 42 38 Q 48 38 48 44 L 48 66" {...stroke} />
      <path d="M 6 34 L 66 34" {...stroke} strokeDasharray="2 5" />
    </svg>
  );
}
