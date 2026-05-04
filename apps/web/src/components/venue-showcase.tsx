"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, Pause, Play } from "lucide-react";
import { zones, type Accent } from "@/content/zones";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 5500;

type Token = {
  bgFrom: string;
  bgTo: string;
  bgGlow: string;     // radial accent inside the stage
  chip: string;
  dot: string;
  bar: string;
  arrow: string;
  textOn: string;     // foreground text color used on overlay chips
};

/**
 * Palette philosophy — premium kid-venue, not candy-pastel.
 *
 * Brand spine: deep indigo #2c3873 + turquoise #00d4c8 + warm yellow.
 * Stages all sit on a warm cream → tinted-cream gradient (so illustrations
 * pop), and each zone gets a generous **radial glow** in its hero color
 * behind the illustration. That gives every world its own mood without
 * fragmenting the brand into seven themes. Chips/dots/bars use deeper,
 * saturated tones (amber-500 not 400, emerald-600, etc) so the accents feel
 * premium and confident — not nursery-pastel.
 */
const tokens: Record<Accent, Token> = {
  // Soft Play — cream → coral blush, hero glow coral-pink
  primary:   { bgFrom: "#fff4e3", bgTo: "#ffe0d2", bgGlow: "rgba(255,90,138,0.35)",   chip: "bg-brand-primary/10 text-brand-primary",     dot: "bg-brand-primary",   bar: "bg-brand-primary",   arrow: "text-brand-primary",   textOn: "text-brand-primary" },
  // Gaming Arena — pale aqua cream → mint, hero glow turquoise (the dark monitor inside provides the "neon" contrast)
  turquoise: { bgFrom: "#eafbf9", bgTo: "#bdf0ea", bgGlow: "rgba(0,212,200,0.35)",    chip: "bg-brand-turquoise/15 text-brand-turquoise", dot: "bg-brand-turquoise", bar: "bg-brand-turquoise", arrow: "text-brand-turquoise", textOn: "text-brand-turquoise" },
  // Party Room — sunshine cream → marigold, hero glow tangerine (warm, celebratory)
  yellow:    { bgFrom: "#fff4cf", bgTo: "#ffd98a", bgGlow: "rgba(255,138,61,0.32)",   chip: "bg-brand-yellow/30 text-amber-800",          dot: "bg-amber-500",       bar: "bg-amber-500",       arrow: "text-amber-700",       textOn: "text-amber-700" },
  // Play School / Theatre — lavender mist → dusty plum, hero glow grape
  grape:     { bgFrom: "#f1eaff", bgTo: "#d8c6ff", bgGlow: "rgba(139,92,246,0.34)",   chip: "bg-brand-grape/15 text-brand-grape",         dot: "bg-brand-grape",     bar: "bg-brand-grape",     arrow: "text-brand-grape",     textOn: "text-brand-grape" },
  // Refreshment — peach cream → apricot, hero glow tangerine (premium café)
  orange:    { bgFrom: "#fff0dd", bgTo: "#ffcfa0", bgGlow: "rgba(255,138,61,0.32)",   chip: "bg-brand-orange/15 text-brand-orange",       dot: "bg-brand-orange",    bar: "bg-brand-orange",    arrow: "text-brand-orange",    textOn: "text-brand-orange" },
  // Stalls — pistachio cream → mint leaf, hero glow turquoise (boutique market)
  mint:      { bgFrom: "#e7f9ee", bgTo: "#aee7c7", bgGlow: "rgba(16,185,129,0.30)",   chip: "bg-emerald-100 text-emerald-800",            dot: "bg-emerald-600",     bar: "bg-emerald-600",     arrow: "text-emerald-700",     textOn: "text-emerald-700" },
  // Sky — denim cloud (kept for parity)
  sky:       { bgFrom: "#e6f3ff", bgTo: "#b3d6ff", bgGlow: "rgba(56,135,255,0.30)",   chip: "bg-sky-100 text-sky-800",                    dot: "bg-sky-600",         bar: "bg-sky-600",         arrow: "text-sky-700",         textOn: "text-sky-700" },
};

const facts = [
  { label: "Sq ft of play", value: "2,400" },
  { label: "Curated activities", value: "75+" },
  { label: "Hours / day", value: "12" },
  { label: "Hourly cleaning cycles", value: "Every 60 min" },
  { label: "Child-to-staff ratio", value: "1 : 8" },
  { label: "Years in Khammam", value: "Since 2024" },
];

const spinOrigin: CSSProperties = {
  transformBox: "fill-box",
  transformOrigin: "center",
};

function Sparkle({ x, y, size = 6, color = "#ffd93d", delay = 0, reduce = false }: {
  x: number; y: number; size?: number; color?: string; delay?: number; reduce?: boolean;
}) {
  const d = `M${x} ${y - size}L${x + size * 0.3} ${y - size * 0.3}L${x + size} ${y}L${x + size * 0.3} ${y + size * 0.3}L${x} ${y + size}L${x - size * 0.3} ${y + size * 0.3}L${x - size} ${y}L${x - size * 0.3} ${y - size * 0.3}Z`;
  return (
    <motion.g
      style={spinOrigin}
      animate={reduce ? {} : { scale: [0.7, 1.2, 0.7], opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 2.2, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <path d={d} fill={color} />
    </motion.g>
  );
}

/* ============================================================
 *   ZONE 01 — Soft Play Arena
 * ============================================================ */
function SoftPlayScene({ reduce }: { reduce: boolean }) {
  const balls = [
    { x: 200, y: 410, r: 16, c: "#ff5a8a", d: 0 },
    { x: 245, y: 422, r: 14, c: "#ffd93d", d: 0.3 },
    { x: 290, y: 408, r: 18, c: "#00d4c8", d: 0.6 },
    { x: 340, y: 422, r: 15, c: "#8b5cf6", d: 0.9 },
    { x: 390, y: 410, r: 17, c: "#ff8a3d", d: 1.2 },
    { x: 440, y: 422, r: 14, c: "#7ce2b5", d: 1.5 },
    { x: 488, y: 408, r: 16, c: "#7cc5ff", d: 1.8 },
    { x: 220, y: 432, r: 12, c: "#ffd93d", d: 0.4 },
    { x: 320, y: 438, r: 13, c: "#ff5a8a", d: 0.8 },
    { x: 420, y: 438, r: 12, c: "#00d4c8", d: 1.4 },
  ];
  return (
    <svg viewBox="0 0 600 480" className="w-full h-full">
      <defs>
        <linearGradient id="sp-slide" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff5a8a" />
          <stop offset="100%" stopColor="#ff8a3d" />
        </linearGradient>
      </defs>

      {/* dotted grid backdrop */}
      <g opacity="0.1">
        {Array.from({ length: 11 }).map((_, r) =>
          Array.from({ length: 16 }).map((__, c) => (
            <circle key={`${r}-${c}`} cx={20 + c * 38} cy={30 + r * 36} r="1.5" fill="#2c3873" />
          ))
        )}
      </g>

      {/* climbing net (right) */}
      <g stroke="#2c3873" strokeWidth="1.5" opacity="0.4" fill="none">
        {[440, 480, 520, 560].map((x) => <line key={x} x1={x} y1="60" x2={x} y2="320" />)}
        {[100, 160, 220, 280].map((y) => <line key={y} x1="440" y1={y} x2="560" y2={y} />)}
        {[440, 480, 520, 560].flatMap((x) =>
          [100, 160, 220, 280].map((y) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" fill="#2c3873" />
          ))
        )}
      </g>

      {/* slide ladder (left) */}
      <g stroke="#1a2354" strokeWidth="3" opacity="0.55">
        <line x1="78" y1="80" x2="78" y2="280" />
        <line x1="105" y1="80" x2="105" y2="280" />
        {[110, 150, 190, 230, 270].map((y) => (
          <line key={y} x1="78" y1={y} x2="105" y2={y} />
        ))}
      </g>

      {/* slide curve */}
      <path d="M105 70 Q 200 200 240 360" stroke="#1a2354" strokeWidth="44" strokeLinecap="round" fill="none" />
      <path d="M105 70 Q 200 200 240 360" stroke="url(#sp-slide)" strokeWidth="34" strokeLinecap="round" fill="none" />
      <path d="M105 70 Q 200 200 240 360" stroke="#ffd0e0" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.55" />

      {/* teddy on slide top */}
      <motion.g
        style={spinOrigin}
        animate={reduce ? {} : { y: [0, -3, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <g transform="translate(105, 50)">
          <circle cx="-14" cy="-14" r="9" fill="#a06c3d" />
          <circle cx="14" cy="-14" r="9" fill="#a06c3d" />
          <circle cx="-14" cy="-14" r="4" fill="#d4a574" />
          <circle cx="14" cy="-14" r="4" fill="#d4a574" />
          <circle r="22" fill="#a06c3d" />
          <ellipse cx="0" cy="6" rx="11" ry="9" fill="#d4a574" />
          <circle cx="-7" cy="-3" r="2.5" fill="#1a1033" />
          <circle cx="7" cy="-3" r="2.5" fill="#1a1033" />
          <circle cx="-6" cy="-4" r="0.8" fill="#fff" />
          <circle cx="8" cy="-4" r="0.8" fill="#fff" />
          <ellipse cx="0" cy="2" rx="3" ry="2" fill="#1a1033" />
          <path d="M-4 8 Q0 11 4 8" stroke="#1a1033" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* bow tie */}
          <path d="M-4 16 L-12 12 L-12 22 Z" fill="#ff5a8a" />
          <path d="M4 16 L12 12 L12 22 Z" fill="#ff5a8a" />
          <circle cx="0" cy="17" r="2" fill="#ff5a8a" />
        </g>
      </motion.g>

      {/* ball pit container */}
      <ellipse cx="350" cy="438" rx="220" ry="32" fill="#fff" stroke="#1a2354" strokeWidth="2" opacity="0.7" />
      <ellipse cx="350" cy="432" rx="218" ry="26" fill="#fff" />

      {balls.map((b, i) => (
        <motion.circle
          key={i}
          cx={b.x}
          cy={b.y}
          r={b.r}
          fill={b.c}
          animate={reduce ? {} : { y: [0, -5, 0] }}
          transition={{ duration: 2 + (i % 3) * 0.5, repeat: Infinity, delay: b.d, ease: "easeInOut" }}
        />
      ))}
      {/* highlights on balls */}
      {balls.slice(0, 7).map((b, i) => (
        <circle key={`hl-${i}`} cx={b.x - b.r * 0.35} cy={b.y - b.r * 0.35} r={b.r * 0.25} fill="#fff" opacity="0.5" />
      ))}

      <Sparkle x={70} y={120} size={5} color="#ffd93d" delay={0} reduce={reduce} />
      <Sparkle x={400} y={120} size={6} color="#ff5a8a" delay={1} reduce={reduce} />
      <Sparkle x={330} y={250} size={4} color="#00d4c8" delay={0.5} reduce={reduce} />
    </svg>
  );
}

/* ============================================================
 *   ZONE 02 — Play School
 * ============================================================ */
function PlaySchoolScene({ reduce }: { reduce: boolean }) {
  return (
    <svg viewBox="0 0 600 480" className="w-full h-full">
      <defs>
        <linearGradient id="ps-board" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f4e3d" />
          <stop offset="100%" stopColor="#0f2e22" />
        </linearGradient>
      </defs>

      {/* striped wallpaper (classroom feel — deeper indigo on lavender) */}
      <g opacity="0.09">
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={i} x={i * 44} y="0" width="22" height="480" fill="#2c3873" />
        ))}
      </g>

      {/* chalkboard */}
      <rect x="100" y="60" width="320" height="200" rx="8" fill="#a06c3d" />
      <rect x="108" y="68" width="304" height="184" rx="4" fill="url(#ps-board)" />

      {/* chalk content */}
      <g fontFamily="var(--font-playful), 'Fredoka', sans-serif">
        <text x="135" y="120" fontSize="38" fontWeight="700" fill="#fff">A</text>
        <text x="180" y="120" fontSize="38" fontWeight="700" fill="#ffd93d">B</text>
        <text x="225" y="120" fontSize="38" fontWeight="700" fill="#ff5a8a">C</text>
        <text x="280" y="120" fontSize="22" fontWeight="600" fill="#fff">123</text>
        <text x="335" y="120" fontSize="22" fontWeight="600" fill="#7cc5ff">do!</text>

        {/* sun doodle */}
        <g stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none">
          <circle cx="155" cy="190" r="14" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
            const r = (a * Math.PI) / 180;
            const x1 = 155 + Math.cos(r) * 18, y1 = 190 + Math.sin(r) * 18;
            const x2 = 155 + Math.cos(r) * 26, y2 = 190 + Math.sin(r) * 26;
            return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>

        {/* heart */}
        <path d="M260 200 Q255 188 245 188 Q235 188 235 200 Q235 210 260 230 Q285 210 285 200 Q285 188 275 188 Q265 188 260 200" fill="#ff5a8a" />

        {/* equation */}
        <text x="320" y="210" fontSize="22" fontWeight="600" fill="#fff">1 + 1 =</text>
        <motion.text
          x="402" y="210" fontSize="26" fontWeight="700" fill="#ffd93d"
          animate={reduce ? {} : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >2</motion.text>
      </g>

      {/* floating books (right) */}
      <motion.g
        style={spinOrigin}
        animate={reduce ? {} : { y: [0, -8, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <g transform="translate(470, 150)">
          <rect x="-30" y="-10" width="60" height="14" rx="2" fill="#ff5a8a" />
          <rect x="-2" y="-8" width="2" height="10" fill="#fff" opacity="0.4" />
          <rect x="-32" y="-22" width="60" height="14" rx="2" fill="#ffd93d" />
          <rect x="-28" y="-34" width="56" height="14" rx="2" fill="#00d4c8" />
          <rect x="-26" y="-44" width="52" height="12" rx="2" fill="#8b5cf6" />
        </g>
      </motion.g>

      {/* apple on shelf */}
      <g transform="translate(515, 220)">
        <ellipse cx="0" cy="0" rx="14" ry="15" fill="#ff5a8a" />
        <ellipse cx="-4" cy="-4" rx="3" ry="2" fill="#ffb3c8" />
        <path d="M0 -16 Q0 -22 5 -22" stroke="#3a4a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="6" cy="-19" rx="4" ry="2.5" fill="#5fa867" transform="rotate(-30 6 -19)" />
      </g>

      {/* desk */}
      <rect x="60" y="320" width="480" height="14" rx="2" fill="#a06c3d" />
      <rect x="60" y="334" width="480" height="6" fill="#7a4f29" />
      <rect x="100" y="340" width="10" height="80" fill="#7a4f29" />
      <rect x="490" y="340" width="10" height="80" fill="#7a4f29" />

      {/* crayons */}
      {[
        { x: 110, c: "#ff5a8a" },
        { x: 145, c: "#ffd93d" },
        { x: 180, c: "#00d4c8" },
        { x: 215, c: "#8b5cf6" },
        { x: 250, c: "#ff8a3d" },
      ].map((cr, i) => (
        <g key={i} transform={`translate(${cr.x}, 296)`}>
          <rect x="0" y="0" width="22" height="22" rx="2" fill={cr.c} />
          <polygon points="0,0 22,0 11,-10" fill={cr.c} opacity="0.7" />
          <rect x="2" y="6" width="18" height="3" rx="1" fill="#fff" opacity="0.4" />
        </g>
      ))}

      {/* notebook + pencil */}
      <g transform="translate(370, 304)">
        <rect x="0" y="0" width="84" height="26" rx="2" fill="#fff" stroke="#1a1033" strokeWidth="1" />
        <line x1="6" y1="9" x2="78" y2="9" stroke="#8b5cf6" strokeWidth="1" opacity="0.4" />
        <line x1="6" y1="15" x2="78" y2="15" stroke="#8b5cf6" strokeWidth="1" opacity="0.4" />
        <line x1="6" y1="21" x2="78" y2="21" stroke="#8b5cf6" strokeWidth="1" opacity="0.4" />
        <g transform="translate(58, -2) rotate(20)">
          <rect x="0" y="0" width="50" height="6" fill="#ffd93d" />
          <polygon points="50,0 56,3 50,6" fill="#1a1033" />
          <rect x="-6" y="0" width="6" height="6" fill="#ff8a3d" />
        </g>
      </g>

      <Sparkle x={70} y={100} size={5} color="#8b5cf6" delay={0} reduce={reduce} />
      <Sparkle x={530} y={80} size={4} color="#ffd93d" delay={1.2} reduce={reduce} />
      <Sparkle x={470} y={290} size={5} color="#ff5a8a" delay={0.6} reduce={reduce} />
    </svg>
  );
}

/* ============================================================
 *   ZONE 03 — Gaming Arena
 * ============================================================ */
function GamingScene({ reduce }: { reduce: boolean }) {
  return (
    <svg viewBox="0 0 600 480" className="w-full h-full">
      <defs>
        <linearGradient id="gm-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a8a8a" />
          <stop offset="100%" stopColor="#0f2e3e" />
        </linearGradient>
      </defs>

      {/* graph-paper grid (deep teal so it reads on the pale-aqua stage) */}
      <g opacity="0.18" stroke="#0f6e6c" strokeWidth="1">
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 35} y1="0" x2={i * 35} y2="480" />
        ))}
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 35} x2="600" y2={i * 35} />
        ))}
      </g>

      {/* monitor stand */}
      <rect x="270" y="290" width="60" height="14" rx="2" fill="#1a2354" />
      <rect x="220" y="304" width="160" height="8" rx="3" fill="#2c3873" />

      {/* monitor frame */}
      <rect x="80" y="60" width="440" height="240" rx="14" fill="#1a1033" />
      <rect x="92" y="72" width="416" height="216" rx="6" fill="url(#gm-screen)" />

      {/* mountain landscape */}
      <polygon points="92,250 160,180 220,220 280,170 340,210 400,160 460,200 508,240 508,288 92,288" fill="#0a3a4e" />
      <polygon points="92,260 200,200 280,230 360,180 460,220 508,260 508,288 92,288" fill="#0a5466" />

      {/* moon */}
      <circle cx="430" cy="120" r="26" fill="#ffd93d" />
      <circle cx="420" cy="116" r="6" fill="#ffb020" opacity="0.5" />
      <circle cx="438" cy="130" r="4" fill="#ffb020" opacity="0.5" />

      {/* twinkling stars */}
      {[
        { x: 130, y: 100 }, { x: 200, y: 140 }, { x: 290, y: 90 },
        { x: 360, y: 130 }, { x: 480, y: 95 },
      ].map((s, i) => (
        <motion.circle
          key={i} cx={s.x} cy={s.y} r="1.8" fill="#fff"
          animate={reduce ? {} : { opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      {/* hero pixel sprite */}
      <motion.g
        style={spinOrigin}
        animate={reduce ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 0.95, repeat: Infinity, ease: "easeInOut" }}
      >
        <g transform="translate(190, 220)">
          <rect x="0" y="0" width="22" height="22" fill="#ff5a8a" />
          <rect x="4" y="4" width="4" height="4" fill="#fff" />
          <rect x="14" y="4" width="4" height="4" fill="#fff" />
          <rect x="4" y="4" width="2" height="2" fill="#1a1033" />
          <rect x="14" y="4" width="2" height="2" fill="#1a1033" />
          <rect x="6" y="14" width="10" height="3" fill="#1a1033" />
          <rect x="-4" y="22" width="8" height="14" fill="#2c3873" />
          <rect x="18" y="22" width="8" height="14" fill="#2c3873" />
        </g>
      </motion.g>

      {/* spinning coin */}
      <motion.g
        style={spinOrigin}
        animate={reduce ? {} : { scaleX: [1, 0.1, 1, 0.1, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <g transform="translate(380, 200)">
          <circle r="12" fill="#ffd93d" stroke="#ff8a3d" strokeWidth="2" />
          <text textAnchor="middle" y="5" fontSize="14" fontWeight="900" fill="#ff8a3d">$</text>
        </g>
      </motion.g>

      {/* HUD */}
      <rect x="100" y="80" width="92" height="20" rx="3" fill="#1a1033" opacity="0.7" />
      <text x="108" y="94" fontSize="11" fontWeight="700" fill="#ffd93d" fontFamily="monospace">SCORE 1250</text>
      <rect x="420" y="80" width="80" height="20" rx="3" fill="#1a1033" opacity="0.7" />
      <text x="428" y="94" fontSize="11" fontWeight="700" fill="#7ce2b5" fontFamily="monospace">LIVES x3</text>

      {/* ground hint */}
      <rect x="0" y="385" width="600" height="95" fill="#fff" opacity="0.4" />

      {/* controller */}
      <g transform="translate(180, 365) rotate(-6)">
        <path d="M-70 0 Q-80 30 -50 40 L-20 35 L20 35 L50 40 Q80 30 70 0 Q60 -10 30 -8 L0 -10 L-30 -8 Q-60 -10 -70 0 Z" fill="#2c3873" />
        <rect x="-50" y="0" width="22" height="6" rx="1" fill="#1a1033" />
        <rect x="-42" y="-8" width="6" height="22" rx="1" fill="#1a1033" />
        <circle cx="40" cy="-2" r="4" fill="#ff5a8a" />
        <circle cx="50" cy="8" r="4" fill="#00d4c8" />
        <circle cx="30" cy="8" r="4" fill="#ffd93d" />
        <circle cx="40" cy="18" r="4" fill="#8b5cf6" />
        <circle cx="-22" cy="20" r="6" fill="#1a1033" />
        <circle cx="22" cy="20" r="6" fill="#1a1033" />
      </g>

      {/* VR headset */}
      <g transform="translate(450, 385)">
        <path d="M-44 -10 Q-50 0 -44 10 L-30 14 L30 14 L44 10 Q50 0 44 -10 L30 -14 L-30 -14 Z" fill="#1a1033" />
        <ellipse cx="-18" cy="0" rx="10" ry="7" fill="#00d4c8" />
        <ellipse cx="18" cy="0" rx="10" ry="7" fill="#00d4c8" />
        <ellipse cx="-18" cy="0" rx="6" ry="4" fill="#1a8a8a" />
        <ellipse cx="18" cy="0" rx="6" ry="4" fill="#1a8a8a" />
        <path d="M-44 -10 Q-44 -30 0 -30 Q44 -30 44 -10" stroke="#2c3873" strokeWidth="3" fill="none" />
      </g>

      <Sparkle x={70} y={350} size={5} color="#00d4c8" delay={0} reduce={reduce} />
      <Sparkle x={540} y={150} size={4} color="#ffd93d" delay={0.8} reduce={reduce} />
      <Sparkle x={300} y={420} size={4} color="#ff5a8a" delay={1.4} reduce={reduce} />
    </svg>
  );
}

/* ============================================================
 *   ZONE 04 — Private Theatre
 * ============================================================ */
function TheatreScene({ reduce }: { reduce: boolean }) {
  return (
    <svg viewBox="0 0 600 480" className="w-full h-full">
      <defs>
        <linearGradient id="th-curtain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a8324a" />
          <stop offset="100%" stopColor="#5e1a28" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="600" height="380" fill="#2a1f4e" />
      <rect x="0" y="380" width="600" height="100" fill="#1a1033" />

      {/* spotlights */}
      <motion.g
        animate={reduce ? {} : { opacity: [0.18, 0.32, 0.18] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <polygon points="120,0 180,0 260,300 210,300" fill="#ffd93d" opacity="0.18" />
        <polygon points="480,0 420,0 340,300 390,300" fill="#ff5a8a" opacity="0.18" />
      </motion.g>

      {/* movie screen */}
      <rect x="150" y="80" width="300" height="180" rx="6" fill="#1a1033" />
      <rect x="158" y="88" width="284" height="164" rx="3" fill="#7cc5ff" />
      {/* screen content: landscape */}
      <circle cx="380" cy="140" r="22" fill="#ffd93d" />
      <polygon points="158,212 220,160 280,190 340,150 400,180 442,170 442,212" fill="#5fa867" />
      <polygon points="158,225 240,180 320,205 400,175 442,195 442,225" fill="#3d8049" />
      <rect x="158" y="225" width="284" height="27" fill="#2d5d35" />

      {/* projection beam */}
      <motion.path
        d="M158 170 L60 380 L72 380 L168 170 Z"
        fill="#fff"
        animate={reduce ? {} : { opacity: [0.08, 0.22, 0.08] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* curtains */}
      <path d="M0 60 L0 380 L130 380 Q120 300 130 220 Q140 140 130 60 Z" fill="url(#th-curtain)" />
      {[20, 50, 80, 105].map((x, i) => (
        <path key={i} d={`M${x} 60 Q${x + 4} 220 ${x} 380`} stroke="#3d0e1a" strokeWidth="2" fill="none" opacity="0.4" />
      ))}
      <path d="M600 60 L600 380 L470 380 Q480 300 470 220 Q460 140 470 60 Z" fill="url(#th-curtain)" />
      {[580, 550, 520, 495].map((x, i) => (
        <path key={i} d={`M${x} 60 Q${x - 4} 220 ${x} 380`} stroke="#3d0e1a" strokeWidth="2" fill="none" opacity="0.4" />
      ))}
      {/* valance */}
      <path d="M0 60 L600 60 L600 90 Q500 75 400 90 Q300 70 200 90 Q100 75 0 90 Z" fill="#7a1f30" />
      {[100, 200, 300, 400, 500].map((x) => (
        <circle key={x} cx={x} cy="92" r="4" fill="#ffd93d" />
      ))}

      {/* seat silhouettes */}
      <g fill="#0a0418">
        {[
          { x: 90, y: 350 }, { x: 200, y: 360 }, { x: 320, y: 360 }, { x: 440, y: 350 },
        ].map((s, i) => (
          <g key={i} transform={`translate(${s.x}, ${s.y})`}>
            <rect x="-32" y="0" width="64" height="38" rx="6" />
            <rect x="-26" y="-22" width="52" height="30" rx="6" />
            <rect x="-32" y="-12" width="6" height="20" rx="2" />
            <rect x="26" y="-12" width="6" height="20" rx="2" />
          </g>
        ))}
      </g>

      {/* popcorn bucket */}
      <g transform="translate(300, 405)">
        <path d="M-26 0 L26 0 L22 50 L-22 50 Z" fill="#ff5a8a" />
        <rect x="-26" y="-3" width="52" height="6" fill="#fff" />
        {[-16, -6, 4, 14].map((x, i) => (
          <line key={i} x1={x} y1="0" x2={x * 0.85} y2="50" stroke="#fff" strokeWidth="2" />
        ))}
        {/* popcorn */}
        {[
          { x: -14, y: -4, r: 7 },
          { x: -2, y: -10, r: 8 },
          { x: 10, y: -8, r: 7 },
          { x: -20, y: 0, r: 6 },
          { x: 18, y: -2, r: 6 },
          { x: 4, y: -14, r: 6 },
        ].map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={p.r} fill="#fff" />
            <circle cx={p.x - 1.5} cy={p.y - 1.5} r={p.r * 0.5} fill="#fff5b8" />
          </g>
        ))}
      </g>

      {/* film reel */}
      <motion.g
        style={spinOrigin}
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <g transform="translate(80, 130)">
          <circle r="26" fill="#1a1033" stroke="#ffd93d" strokeWidth="2" />
          <circle r="6" fill="#ffd93d" />
          {[0, 60, 120, 180, 240, 300].map((a) => {
            const r = (a * Math.PI) / 180;
            return <circle key={a} cx={Math.cos(r) * 16} cy={Math.sin(r) * 16} r="4" fill="#ffd93d" />;
          })}
        </g>
      </motion.g>

      <Sparkle x={520} y={130} size={5} color="#ffd93d" delay={0} reduce={reduce} />
      <Sparkle x={560} y={300} size={4} color="#ff5a8a" delay={0.7} reduce={reduce} />
      <Sparkle x={50} y={300} size={4} color="#8b5cf6" delay={1.2} reduce={reduce} />
    </svg>
  );
}

/* ============================================================
 *   ZONE 05 — Party Room
 * ============================================================ */
function PartyScene({ reduce }: { reduce: boolean }) {
  const balloons = [
    { x: 100, y: 230, c: "#ff5a8a", d: 0 },
    { x: 70, y: 280, c: "#00d4c8", d: 0.4 },
    { x: 130, y: 290, c: "#ffd93d", d: 0.8 },
    { x: 470, y: 230, c: "#8b5cf6", d: 0.2 },
    { x: 510, y: 270, c: "#ff8a3d", d: 0.6 },
    { x: 530, y: 220, c: "#7cc5ff", d: 1.0 },
  ];
  const flagColors = ["#ff5a8a", "#ffd93d", "#00d4c8", "#8b5cf6", "#ff8a3d", "#7cc5ff", "#7ce2b5"];
  return (
    <svg viewBox="0 0 600 480" className="w-full h-full">
      {/* polka dot wallpaper */}
      <g opacity="0.15">
        {Array.from({ length: 24 }).map((_, i) => {
          const x = (i % 6) * 100 + 50;
          const y = Math.floor(i / 6) * 100 + 30;
          const colors = ["#ff5a8a", "#00d4c8", "#8b5cf6", "#ff8a3d", "#7cc5ff", "#7ce2b5"];
          return <circle key={i} cx={x} cy={y} r="6" fill={colors[i % 6]} />;
        })}
      </g>

      {/* banner string */}
      <path d="M30 60 Q300 30 570 60" stroke="#1a2354" strokeWidth="2" fill="none" strokeDasharray="3 3" />
      {flagColors.map((c, i) => {
        const t = i / (flagColors.length - 1);
        const px = 30 + t * 540;
        const py = 60 + Math.sin(t * Math.PI) * -15 + 5;
        return (
          <g key={i} transform={`translate(${px}, ${py})`}>
            <polygon points="-16,0 16,0 0,30" fill={c} />
            <polygon points="-16,0 -8,15 0,0" fill={c} opacity="0.7" />
          </g>
        );
      })}

      {/* falling confetti */}
      {!reduce && Array.from({ length: 14 }).map((_, i) => {
        const x = (i * 47 + 20) % 580;
        const colors = ["#ff5a8a", "#00d4c8", "#8b5cf6", "#ffd93d", "#ff8a3d", "#7cc5ff"];
        return (
          <motion.rect
            key={i}
            x={x}
            y={0}
            width="6"
            height="10"
            fill={colors[i % colors.length]}
            initial={{ y: -20, rotate: 0, opacity: 0 }}
            animate={{ y: 460, rotate: 540, opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 6 + (i % 4),
              repeat: Infinity,
              delay: (i % 7) * 0.6,
              ease: "linear",
              times: [0, 0.1, 0.85, 1],
            }}
          />
        );
      })}

      {/* balloons */}
      {balloons.map((b, i) => (
        <motion.g
          key={i}
          style={spinOrigin}
          animate={reduce ? {} : { y: [0, -10, 0] }}
          transition={{ duration: 3 + (i % 3) * 0.5, repeat: Infinity, ease: "easeInOut", delay: b.d }}
        >
          <line x1={b.x} y1={b.y + 26} x2={b.x - 4} y2="400" stroke="#444" strokeWidth="1" />
          <ellipse cx={b.x} cy={b.y} rx="22" ry="26" fill={b.c} />
          <ellipse cx={b.x - 6} cy={b.y - 8} rx="5" ry="3" fill="#fff" opacity="0.45" />
          <path d={`M${b.x - 4} ${b.y + 24} L${b.x + 4} ${b.y + 24} L${b.x} ${b.y + 30} Z`} fill={b.c} />
        </motion.g>
      ))}

      {/* table */}
      <rect x="180" y="380" width="240" height="14" rx="3" fill="#a06c3d" />
      <rect x="220" y="394" width="8" height="80" fill="#7a4f29" />
      <rect x="372" y="394" width="8" height="80" fill="#7a4f29" />
      <ellipse cx="300" cy="380" rx="120" ry="6" fill="#fff" opacity="0.4" />

      {/* CAKE */}
      <g transform="translate(300, 380)">
        {/* bottom tier */}
        <rect x="-65" y="-50" width="130" height="50" rx="6" fill="#ff5a8a" />
        <rect x="-65" y="-50" width="130" height="6" fill="#ff8aa8" />
        <path d="M-65 -44 Q-55 -30 -45 -44 Q-35 -28 -25 -44 Q-15 -32 -5 -44 Q 5 -28 15 -44 Q 25 -32 35 -44 Q 45 -28 55 -44 Q 65 -30 65 -44 L65 -50 L-65 -50 Z" fill="#fff" />
        {/* mid tier */}
        <rect x="-45" y="-100" width="90" height="50" rx="5" fill="#ffd93d" />
        <rect x="-45" y="-100" width="90" height="5" fill="#fff5b8" />
        {/* top tier */}
        <rect x="-25" y="-140" width="50" height="40" rx="4" fill="#00d4c8" />
        {/* sprinkles */}
        {[-15, -5, 5, 15].map((x, i) => (
          <rect key={i} x={x - 1} y={-128 + (i % 2) * 4} width="2" height="6" fill="#8b5cf6" transform={`rotate(${i * 23} ${x} ${-126})`} />
        ))}
        {/* candle */}
        <rect x="-3" y="-160" width="6" height="22" rx="1" fill="#fff" />
        <rect x="-3" y="-160" width="6" height="3" fill="#ff5a8a" />
        {/* flame */}
        <motion.g
          style={spinOrigin}
          animate={reduce ? {} : { scale: [1, 1.18, 1], y: [0, -1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M0 -168 Q-5 -176 0 -184 Q5 -176 0 -168 Z" fill="#ff8a3d" />
          <path d="M0 -170 Q-3 -176 0 -181 Q3 -176 0 -170 Z" fill="#ffd93d" />
        </motion.g>
        <motion.circle
          cx="0" cy="-178" r="8" fill="#ffd93d"
          animate={reduce ? {} : { opacity: [0.15, 0.4, 0.15], scale: [1, 1.2, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          opacity="0.3"
          style={spinOrigin}
        />
      </g>

      {/* gift box */}
      <g transform="translate(450, 350)">
        <rect x="-30" y="0" width="60" height="50" rx="3" fill="#8b5cf6" />
        <rect x="-30" y="0" width="60" height="10" fill="#7c4dff" />
        <rect x="-4" y="0" width="8" height="50" fill="#ffd93d" />
        <rect x="-30" y="-2" width="60" height="6" fill="#ffd93d" />
        <ellipse cx="-8" cy="-2" rx="8" ry="6" fill="#ffd93d" transform="rotate(-30 -8 -2)" />
        <ellipse cx="8" cy="-2" rx="8" ry="6" fill="#ffd93d" transform="rotate(30 8 -2)" />
        <circle cx="0" cy="-2" r="3" fill="#ff8a3d" />
      </g>

      <Sparkle x={70} y={120} size={6} color="#ffd93d" delay={0} reduce={reduce} />
      <Sparkle x={540} y={130} size={5} color="#ff5a8a" delay={0.6} reduce={reduce} />
      <Sparkle x={300} y={155} size={4} color="#8b5cf6" delay={1.2} reduce={reduce} />
    </svg>
  );
}

/* ============================================================
 *   ZONE 06 — Refreshment Zone
 * ============================================================ */
function RefreshmentScene({ reduce }: { reduce: boolean }) {
  return (
    <svg viewBox="0 0 600 480" className="w-full h-full">
      {/* warm vertical stripes (deep amber on peach for retro café feel) */}
      <g opacity="0.11">
        {Array.from({ length: 24 }).map((_, i) => (
          <rect key={i} x={i * 26} y="0" width="13" height="480" fill="#a8431d" />
        ))}
      </g>

      {/* shelf */}
      <rect x="40" y="320" width="520" height="10" rx="2" fill="#a06c3d" />
      <rect x="40" y="330" width="520" height="6" fill="#7a4f29" />
      <rect x="60" y="320" width="6" height="100" fill="#a06c3d" opacity="0.3" />
      <rect x="534" y="320" width="6" height="100" fill="#a06c3d" opacity="0.3" />

      {/* counter */}
      <rect x="0" y="420" width="600" height="60" fill="#fff" opacity="0.5" />

      {/* COFFEE CUP (left) */}
      <g transform="translate(140, 280)">
        <path d="M-40 0 Q-44 50 -30 60 L30 60 Q44 50 40 0 Z" fill="#fff" stroke="#1a1033" strokeWidth="2" />
        <path d="M-40 0 L40 0" stroke="#1a1033" strokeWidth="2" />
        <ellipse cx="0" cy="0" rx="38" ry="6" fill="#6b3e1d" />
        <ellipse cx="0" cy="-2" rx="35" ry="5" fill="#f5e6d3" />
        {/* heart latte art */}
        <path d="M-6 -3 Q-12 -9 -6 -11 Q0 -9 0 -3 Q0 -9 6 -11 Q12 -9 6 -3 Q0 3 -6 -3 Z" fill="#a06c3d" opacity="0.7" />
        {/* handle */}
        <path d="M40 10 Q60 10 60 30 Q60 50 40 50" stroke="#1a1033" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* steam */}
        {[-10, 0, 10].map((dx, i) => (
          <motion.path
            key={i}
            d={`M${dx} -10 Q${dx - 4} -25 ${dx} -40 Q${dx + 4} -55 ${dx} -70`}
            stroke="#fff"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ opacity: 0, y: 0 }}
            animate={reduce ? {} : { opacity: [0, 0.6, 0], y: [0, -20, -40] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
          />
        ))}
      </g>

      {/* POPCORN BUCKET (center) */}
      <g transform="translate(300, 280)">
        <path d="M-44 0 L44 0 L36 60 L-36 60 Z" fill="#ff5a8a" />
        <rect x="-44" y="-2" width="88" height="6" fill="#fff" />
        {[-30, -15, 0, 15, 30].map((x, i) => (
          <line key={i} x1={x} y1="0" x2={x * 0.82} y2="60" stroke="#fff" strokeWidth="3" />
        ))}
        {[
          { x: -20, y: -8, r: 8 },
          { x: -8, y: -14, r: 9 },
          { x: 6, y: -16, r: 8 },
          { x: 20, y: -10, r: 9 },
          { x: -28, y: -2, r: 7 },
          { x: 28, y: -2, r: 7 },
          { x: 0, y: -22, r: 7 },
          { x: 14, y: -22, r: 7 },
        ].map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={p.r} fill="#fff" />
            <circle cx={p.x - 2} cy={p.y - 2} r={p.r * 0.55} fill="#fff5b8" />
          </g>
        ))}
      </g>

      {/* JUICE GLASS (right) */}
      <g transform="translate(460, 280)">
        <path d="M-26 -10 L26 -10 L22 60 L-22 60 Z" fill="#fff" stroke="#1a1033" strokeWidth="2" opacity="0.85" />
        <path d="M-24 0 L24 0 L21 56 L-21 56 Z" fill="#ff8a3d" />
        <ellipse cx="0" cy="0" rx="24" ry="3" fill="#ff5a8a" opacity="0.6" />
        {[
          { x: -10, y: 38, d: 0 },
          { x: 4, y: 30, d: 0.5 },
          { x: 12, y: 42, d: 1 },
          { x: -4, y: 22, d: 1.5 },
        ].map((b, i) => (
          <motion.circle
            key={i}
            cx={b.x}
            cy={b.y}
            r="2.5"
            fill="#fff"
            opacity="0.8"
            animate={reduce ? {} : { y: [0, -25], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: b.d, ease: "easeOut" }}
          />
        ))}
        {/* straw */}
        <rect x="8" y="-20" width="6" height="28" rx="1" fill="#ff5a8a" />
        <rect x="8" y="-20" width="3" height="28" rx="1" fill="#ff8aa8" />
      </g>

      {/* apple */}
      <g transform="translate(85, 305)">
        <ellipse cx="0" cy="0" rx="12" ry="13" fill="#ff5a8a" />
        <path d="M0 -13 Q0 -18 4 -18" stroke="#3a4a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <ellipse cx="5" cy="-15" rx="3" ry="2" fill="#5fa867" transform="rotate(-30 5 -15)" />
      </g>

      {/* donut */}
      <g transform="translate(540, 305)">
        <circle r="14" fill="#ffd9b8" />
        <circle r="6" fill="#fff" />
        <path d="M-14 0 Q-10 4 -8 0 Q-4 6 0 0 Q4 6 8 0 Q10 4 14 0 L14 -2 L-14 -2 Z" fill="#ff8aa8" />
        {[
          { x: -8, y: -2, c: "#ff5a8a" },
          { x: 4, y: -8, c: "#00d4c8" },
          { x: 10, y: 2, c: "#8b5cf6" },
          { x: -4, y: 8, c: "#ffd93d" },
          { x: 0, y: -10, c: "#ff8a3d" },
        ].map((s, i) => (
          <rect key={i} x={s.x - 1} y={s.y - 1} width="3" height="2" fill={s.c} transform={`rotate(${i * 30} ${s.x} ${s.y})`} />
        ))}
      </g>

      <Sparkle x={100} y={150} size={5} color="#ffd93d" delay={0} reduce={reduce} />
      <Sparkle x={520} y={170} size={4} color="#ff5a8a" delay={0.8} reduce={reduce} />
      <Sparkle x={300} y={130} size={4} color="#00d4c8" delay={1.4} reduce={reduce} />
    </svg>
  );
}

/* ============================================================
 *   ZONE 07 — Curated Stalls
 * ============================================================ */
function StallsScene({ reduce }: { reduce: boolean }) {
  return (
    <svg viewBox="0 0 600 480" className="w-full h-full">
      {/* tile pattern (deep emerald on mint — boutique-market feel) */}
      <g opacity="0.11">
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 8 }).map((__, c) => (
            <rect key={`${r}-${c}`} x={20 + c * 75} y={20 + r * 75} width="20" height="20" fill="#0f6e4f" rx="3" />
          ))
        )}
      </g>

      {/* awning */}
      <path d="M40 60 L560 60 L580 130 L20 130 Z" fill="#7ce2b5" />
      {Array.from({ length: 8 }).map((_, i) => {
        const x = 40 + i * 65;
        return (
          <path
            key={i}
            d={`M${x} 60 L${x + 65} 60 L${x + 70} 130 L${x + 5} 130 Z`}
            fill={i % 2 === 0 ? "#fff" : "#7ce2b5"}
          />
        );
      })}
      <path d="M20 130 L580 130" stroke="#1a2354" strokeWidth="2" />

      {/* sign */}
      <rect x="220" y="80" width="160" height="34" rx="6" fill="#fff" stroke="#1a2354" strokeWidth="2" />
      <text x="300" y="103" textAnchor="middle" fontFamily="var(--font-playful), 'Fredoka', sans-serif" fontSize="18" fontWeight="700" fill="#2c3873">
        TINY WONDERS
      </text>

      {/* shelf 1 */}
      <rect x="60" y="220" width="480" height="8" rx="2" fill="#a06c3d" />

      {/* book stack */}
      <g transform="translate(120, 220)">
        <rect x="-30" y="-22" width="60" height="22" rx="2" fill="#ff5a8a" />
        <rect x="-32" y="-44" width="60" height="22" rx="2" fill="#ffd93d" />
        <rect x="-28" y="-66" width="56" height="22" rx="2" fill="#00d4c8" />
        <text x="-1" y="-29" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily="var(--font-playful), 'Fredoka', sans-serif">123</text>
        <text x="-2" y="-50" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1a2354" fontFamily="var(--font-playful), 'Fredoka', sans-serif">ABC</text>
      </g>

      {/* plush teddy */}
      <motion.g
        style={spinOrigin}
        animate={reduce ? {} : { y: [0, -3, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <g transform="translate(230, 198)">
          <ellipse cx="0" cy="0" rx="22" ry="20" fill="#a06c3d" />
          <ellipse cx="0" cy="2" rx="14" ry="12" fill="#d4a574" />
          <circle cx="0" cy="-22" r="18" fill="#a06c3d" />
          <circle cx="-12" cy="-32" r="7" fill="#a06c3d" />
          <circle cx="12" cy="-32" r="7" fill="#a06c3d" />
          <circle cx="-12" cy="-32" r="3" fill="#d4a574" />
          <circle cx="12" cy="-32" r="3" fill="#d4a574" />
          <ellipse cx="0" cy="-18" rx="8" ry="6" fill="#d4a574" />
          <circle cx="-5" cy="-25" r="2" fill="#1a1033" />
          <circle cx="5" cy="-25" r="2" fill="#1a1033" />
          <ellipse cx="0" cy="-19" rx="2" ry="1.5" fill="#1a1033" />
          <path d="M-3 -16 Q0 -14 3 -16" stroke="#1a1033" strokeWidth="1.2" fill="none" />
          <ellipse cx="-22" cy="-2" rx="8" ry="6" fill="#a06c3d" transform="rotate(-30 -22 -2)" />
          <ellipse cx="22" cy="-2" rx="8" ry="6" fill="#a06c3d" transform="rotate(30 22 -2)" />
          <rect x="-12" y="-14" width="24" height="4" fill="#ff5a8a" />
          <polygon points="-12,-12 -18,-16 -18,-8" fill="#ff5a8a" />
          <polygon points="12,-12 18,-16 18,-8" fill="#ff5a8a" />
          <circle cx="0" cy="-12" r="2" fill="#ff8aa8" />
        </g>
      </motion.g>

      {/* gift box */}
      <g transform="translate(330, 200)">
        <rect x="-26" y="-22" width="52" height="42" rx="3" fill="#7cc5ff" />
        <rect x="-26" y="-22" width="52" height="8" fill="#5ba8e6" />
        <rect x="-3" y="-22" width="6" height="42" fill="#ffd93d" />
        <rect x="-26" y="-25" width="52" height="6" fill="#ffd93d" />
        <ellipse cx="-7" cy="-25" rx="6" ry="4" fill="#ffd93d" transform="rotate(-30 -7 -25)" />
        <ellipse cx="7" cy="-25" rx="6" ry="4" fill="#ffd93d" transform="rotate(30 7 -25)" />
        <circle cx="0" cy="-25" r="3" fill="#ff8a3d" />
      </g>

      {/* ABC blocks */}
      <g transform="translate(430, 220)">
        <rect x="-40" y="-32" width="32" height="32" rx="3" fill="#ff5a8a" />
        <rect x="-40" y="-32" width="32" height="6" fill="#fff" opacity="0.25" />
        <text x="-24" y="-10" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff" fontFamily="var(--font-playful), 'Fredoka', sans-serif">A</text>
        <rect x="-4" y="-32" width="32" height="32" rx="3" fill="#ffd93d" />
        <rect x="-4" y="-32" width="32" height="6" fill="#fff" opacity="0.35" />
        <text x="12" y="-10" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a2354" fontFamily="var(--font-playful), 'Fredoka', sans-serif">B</text>
        <rect x="-22" y="-64" width="32" height="32" rx="3" fill="#00d4c8" />
        <rect x="-22" y="-64" width="32" height="6" fill="#fff" opacity="0.3" />
        <text x="-6" y="-42" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff" fontFamily="var(--font-playful), 'Fredoka', sans-serif">C</text>
      </g>

      {/* shelf 2 */}
      <rect x="60" y="350" width="480" height="8" rx="2" fill="#a06c3d" />

      {/* toy car */}
      <g transform="translate(160, 350)">
        <path d="M-40 0 L-30 -20 L20 -20 L30 -10 L40 -10 L40 0 Z" fill="#ff8a3d" />
        <rect x="-22" y="-16" width="20" height="10" rx="2" fill="#7cc5ff" />
        <rect x="2" y="-16" width="14" height="10" rx="2" fill="#7cc5ff" />
        <circle cx="-22" cy="0" r="8" fill="#1a1033" />
        <circle cx="-22" cy="0" r="3" fill="#666" />
        <circle cx="22" cy="0" r="8" fill="#1a1033" />
        <circle cx="22" cy="0" r="3" fill="#666" />
      </g>

      {/* paint palette */}
      <g transform="translate(330, 340)">
        <ellipse cx="0" cy="0" rx="40" ry="14" fill="#fff" stroke="#1a1033" strokeWidth="1.5" />
        <ellipse cx="-22" cy="-2" rx="6" ry="4" fill="#ff5a8a" />
        <ellipse cx="-7" cy="-2" rx="6" ry="4" fill="#ffd93d" />
        <ellipse cx="8" cy="-2" rx="6" ry="4" fill="#00d4c8" />
        <ellipse cx="22" cy="-2" rx="6" ry="4" fill="#8b5cf6" />
        <circle cx="0" cy="0" r="6" fill="#fff" stroke="#1a1033" strokeWidth="1.2" />
      </g>

      {/* plush star */}
      <motion.g
        style={spinOrigin}
        animate={reduce ? {} : { rotate: [0, 8, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <g transform="translate(490, 350)">
          <path d="M0 -22 L7 -7 L22 -7 L10 4 L14 19 L0 11 L-14 19 L-10 4 L-22 -7 L-7 -7 Z" fill="#ffd93d" stroke="#ff8a3d" strokeWidth="1.5" />
          <circle cx="-3" cy="-2" r="1.4" fill="#1a1033" />
          <circle cx="3" cy="-2" r="1.4" fill="#1a1033" />
          <path d="M-3 4 Q0 7 3 4" stroke="#1a1033" strokeWidth="1.2" fill="none" />
        </g>
      </motion.g>

      <Sparkle x={70} y={170} size={5} color="#7ce2b5" delay={0} reduce={reduce} />
      <Sparkle x={520} y={150} size={4} color="#ffd93d" delay={0.7} reduce={reduce} />
      <Sparkle x={400} y={300} size={4} color="#ff5a8a" delay={1.3} reduce={reduce} />
    </svg>
  );
}

function ZoneScene({ slug, reduce }: { slug: string; reduce: boolean }) {
  switch (slug) {
    case "soft-play-area":      return <SoftPlayScene reduce={reduce} />;
    case "play-school":          return <PlaySchoolScene reduce={reduce} />;
    case "gaming-area":          return <GamingScene reduce={reduce} />;
    case "private-theatre-room": return <TheatreScene reduce={reduce} />;
    case "party-room":           return <PartyScene reduce={reduce} />;
    case "refreshment-zone":     return <RefreshmentScene reduce={reduce} />;
    case "stalls":               return <StallsScene reduce={reduce} />;
    default:                     return null;
  }
}

/**
 * VenueShowcase — "Worlds Carousel"
 *
 * Pro-level interactive zone explorer: a stage on the left crossfades through
 * 7 hand-illustrated SVG worlds (one per zone), while a sticky navigator on
 * the right lets you hop between them. Auto-tour every 5.5s, pauses on hover,
 * play/pause toggle, click-to-jump dots. Each scene has zone-appropriate motifs
 * with subtle ambient animation (steam, popcorn, ball pit, pixel game, etc).
 *
 * Replaces the previous broken 3D-circle implementation where rotateY caused
 * cards to face backwards (hence the mirrored text issue).
 */
export function VenueShowcase() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || !autoplay || paused) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % zones.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [autoplay, paused, reduce]);

  const select = useCallback((i: number) => setActive(i), []);

  const zone = zones[active];
  const t = tokens[zone.accent];
  const barRunning = autoplay && !paused && !reduce;

  return (
    <section className="relative section overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] rounded-full bg-brand-primary/[0.03] blur-3xl pointer-events-none" />

      <div className="container">
        {/* HEADING */}
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <span className="eyebrow">Step inside</span>
          <h2 className="heading-lg mt-3">
            One venue.{" "}
            <span className="accent">Seven worlds.</span>{" "}
            <span className="text-brand-turquoise">Zero limits.</span>
          </h2>
          <p className="mt-5 text-brand-ink/65 leading-relaxed">
            Each zone is a tiny universe with its own colors, sounds, and
            secrets. Tap through the worlds, peek inside, and find your
            family&apos;s favourite.
          </p>
        </div>

        {/* SHOWCASE */}
        <div
          className="grid grid-cols-12 gap-6 lg:gap-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* STAGE */}
          <div className="col-span-12 lg:col-span-7">
            <motion.div
              key={`stage-${zone.accent}`}
              initial={false}
              animate={{
                background: `linear-gradient(135deg, ${t.bgFrom} 0%, ${t.bgTo} 100%)`,
              }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl border border-black/[0.07] overflow-hidden shadow-lifted"
              style={{ aspectRatio: "5 / 4" }}
            >
              {/* zone-tinted radial spotlight behind the illustration */}
              <motion.div
                key={`glow-${zone.accent}`}
                aria-hidden
                initial={false}
                animate={{
                  background: `radial-gradient(ellipse 70% 60% at 50% 55%, ${t.bgGlow} 0%, transparent 70%)`,
                }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 pointer-events-none"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={zone.slug}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.03 }}
                  transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <ZoneScene slug={zone.slug} reduce={!!reduce} />
                </motion.div>
              </AnimatePresence>

              {/* top-left: Now showing */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur-sm px-3 py-1.5 border border-black/[0.06] shadow-sm">
                <motion.span
                  className={cn("inline-block w-2 h-2 rounded-full", t.dot)}
                  animate={reduce ? {} : { scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-ink/60">
                  Now showing · World 0{active + 1}
                </span>
              </div>

              {/* top-right: zone icon ribbon */}
              <div className="absolute top-4 right-4 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/85 backdrop-blur-sm border border-black/[0.06] shadow-sm text-2xl">
                <motion.span
                  key={`icon-${zone.slug}`}
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4, type: "spring", damping: 12 }}
                >
                  {zone.icon}
                </motion.span>
              </div>

              {/* bottom-left: progress dots */}
              <div className="absolute bottom-4 left-4 flex gap-1.5 items-center">
                {zones.map((z, i) => (
                  <button
                    key={z.slug}
                    type="button"
                    onClick={() => select(i)}
                    aria-label={`Show ${z.name}`}
                    className={cn(
                      "relative h-1.5 rounded-full overflow-hidden transition-all",
                      i === active
                        ? "w-10 bg-black/15"
                        : "w-1.5 bg-black/15 hover:bg-black/30 hover:w-3"
                    )}
                  >
                    {i === active && (
                      <motion.span
                        key={`bar-${active}-${barRunning ? 1 : 0}`}
                        className={cn("absolute inset-y-0 left-0", tokens[z.accent].bar)}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: barRunning ? AUTOPLAY_MS / 1000 : 0.4,
                          ease: "linear",
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* bottom-right: play/pause */}
              <button
                type="button"
                onClick={() => setAutoplay((p) => !p)}
                className="absolute bottom-4 right-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border border-black/10 shadow-sm hover:scale-110 active:scale-95 transition"
                aria-label={autoplay ? "Pause auto-tour" : "Play auto-tour"}
              >
                {autoplay ? (
                  <Pause className="w-3.5 h-3.5 text-brand-ink" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-brand-ink ml-0.5" />
                )}
              </button>
            </motion.div>

            {/* details under stage */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`details-${zone.slug}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="mt-6"
              >
                <div className="flex items-end justify-between gap-4 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest",
                        t.chip
                      )}
                    >
                      <span className="text-base leading-none">{zone.icon}</span>
                      {zone.ages}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold mt-3 text-brand-ink">
                      {zone.name}
                    </h3>
                    <p className="mt-2 text-brand-ink/65 leading-relaxed max-w-xl">
                      {zone.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                      {zone.highlights.slice(0, 4).map((h) => (
                        <span
                          key={h}
                          className="text-xs font-medium text-brand-ink/65 inline-flex items-center gap-1.5"
                        >
                          <span className={cn("w-1.5 h-1.5 rounded-full", t.dot)} />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/zones/${zone.slug}`}
                    className="btn btn-ghost group shrink-0"
                  >
                    Explore zone{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* NAVIGATOR */}
          <div className="col-span-12 lg:col-span-5">
            <ul className="flex flex-col gap-1.5">
              {zones.map((z, i) => {
                const at = tokens[z.accent];
                const isActive = i === active;
                return (
                  <li key={z.slug}>
                    <button
                      type="button"
                      onClick={() => select(i)}
                      onMouseEnter={() => select(i)}
                      onFocus={() => select(i)}
                      className={cn(
                        "group w-full text-left rounded-2xl border transition-all duration-300 relative overflow-hidden",
                        isActive
                          ? "border-black/10 bg-white shadow-sm"
                          : "border-transparent hover:border-black/[0.07] hover:bg-white/60"
                      )}
                    >
                      <div className="flex items-center gap-4 p-3.5 pl-4 relative">
                        {/* number */}
                        <span
                          className={cn(
                            "absolute top-1.5 left-2 text-[9px] font-bold uppercase tracking-widest transition-opacity",
                            isActive ? "text-brand-ink/45" : "text-brand-ink/25"
                          )}
                        >
                          0{i + 1}
                        </span>

                        {/* icon tile */}
                        <div
                          className={cn(
                            "relative shrink-0 w-14 h-14 rounded-xl grid place-items-center text-2xl transition-all duration-300 mt-1",
                            isActive ? "scale-110 shadow-sm" : "group-hover:scale-105"
                          )}
                          style={{
                            background: `linear-gradient(135deg, ${at.bgFrom} 0%, ${at.bgTo} 100%)`,
                          }}
                        >
                          <span
                            className={cn(
                              "transition-transform duration-500",
                              isActive ? "scale-110 -rotate-6" : ""
                            )}
                          >
                            {z.icon}
                          </span>
                        </div>

                        {/* text */}
                        <div className="flex-1 min-w-0 mt-1">
                          <h4
                            className={cn(
                              "font-display font-bold leading-tight transition-colors",
                              isActive ? "text-brand-ink" : "text-brand-ink/80"
                            )}
                          >
                            {z.name}
                          </h4>
                          <p className="text-xs text-brand-ink/55 mt-0.5 truncate">
                            {z.tagline}
                          </p>
                        </div>

                        {/* arrow */}
                        <ArrowRight
                          className={cn(
                            "w-4 h-4 shrink-0 transition-all mt-1",
                            isActive
                              ? cn("translate-x-1", at.arrow)
                              : "text-brand-ink/30 group-hover:translate-x-1"
                          )}
                        />
                      </div>

                      {/* bottom sweep on active */}
                      {isActive && (
                        <motion.span
                          key={`sweep-${active}-${barRunning ? 1 : 0}`}
                          className={cn("absolute bottom-0 left-0 h-[2px]", at.bar)}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{
                            duration: barRunning ? AUTOPLAY_MS / 1000 : 0.4,
                            ease: "linear",
                          }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Footnote under nav */}
            <p className="mt-4 text-[11px] text-brand-ink/45 leading-relaxed pl-1">
              Auto-touring through worlds · hover the showcase to pause · click any
              tile to jump in.
            </p>
          </div>
        </div>

        {/* FACTS RIBBON */}
        <div className="mt-14 md:mt-16 relative overflow-hidden border-y border-black/[0.07] py-5 bg-white/40">
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={reduce ? {} : { x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...facts, ...facts].map((f, i) => (
              <div key={i} className="flex items-baseline gap-3 shrink-0 font-display">
                <span className="text-2xl md:text-3xl font-bold text-brand-primary tabular-nums">
                  {f.value}
                </span>
                <span className="text-sm font-medium text-brand-ink/55 uppercase tracking-wider">
                  {f.label}
                </span>
                <span className="text-brand-ink/15 ml-3">●</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
