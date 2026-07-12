import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Playschool design kit — server-safe decorations shared by every page.
 * All pieces are pure SVG/CSS (no framer-motion) so server components can
 * use them directly. Motion comes from the Tailwind keyframes (float,
 * float-slow, wiggle, bounce2, spin-slow) which are disabled globally for
 * prefers-reduced-motion users.
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

/** Absolute, animated wrapper for corner doodles. Always decorative. */
export function Float({
  className,
  speed = "slow",
  children,
}: {
  className?: string;
  speed?: "slow" | "fast" | "wiggle" | "spin";
  children: ReactNode;
}) {
  const anim =
    speed === "fast" ? "animate-float" :
    speed === "wiggle" ? "animate-wiggle" :
    speed === "spin" ? "animate-spin-slow" :
    "animate-float-slow";
  return (
    <div aria-hidden className={cn("pointer-events-none absolute select-none", anim, className)}>
      {children}
    </div>
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
