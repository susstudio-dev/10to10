"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * VenueIllustration — a custom illustrated isometric 3D venue scene.
 *
 * Pure SVG vector art (no images, no 3D library). Built from primitives:
 *  - A 3-storey isometric building (parallelogram floors + rectangle walls)
 *  - Each floor is a different zone with peek-through windows showing icons
 *  - Floating balloons that rise and reset (looped)
 *  - Kid silhouettes hopping at the entrance
 *  - Sun, clouds, sparkles in the sky layer
 *  - Parallax: 5 layers move at different rates on cursor + scroll
 *  - Whole building gently sways on Y-axis (continuous, very slow)
 *
 * Mobile (< 1024): smaller, locked-perspective version — no cursor parallax.
 * Reduced-motion: all animations frozen, static illustration only.
 */
export function VenueIllustration() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const disable3D = reduce || isMobile;

  // Cursor parallax (desktop only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), {
    stiffness: 80,
    damping: 22,
  });
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), {
    stiffness: 80,
    damping: 22,
  });

  // Per-layer parallax offsets driven by mouse
  const skyX = useSpring(useTransform(mx, [-0.5, 0.5], [12, -12]), { stiffness: 60, damping: 20 });
  const farX = useSpring(useTransform(mx, [-0.5, 0.5], [22, -22]), { stiffness: 70, damping: 20 });
  const midX = useSpring(useTransform(mx, [-0.5, 0.5], [40, -40]), { stiffness: 80, damping: 22 });
  const nearX = useSpring(useTransform(mx, [-0.5, 0.5], [60, -60]), { stiffness: 90, damping: 22 });
  const skyY = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 60, damping: 20 });
  const midY = useSpring(useTransform(my, [-0.5, 0.5], [18, -18]), { stiffness: 80, damping: 22 });

  // Scroll-driven entrance + slight rise
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const enterY = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const enterOp = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  useEffect(() => {
    if (disable3D) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        mx.set(Math.max(-0.5, Math.min(0.5, x)));
        my.set(Math.max(-0.5, Math.min(0.5, y)));
        raf = 0;
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [disable3D, mx, my]);

  return (
    <section className="relative section overflow-hidden">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <span className="eyebrow">A peek inside</span>
          <h2 className="heading-lg mt-3">
            Three <span className="accent">floors</span> of fun.{" "}
            <span className="text-brand-turquoise">One unforgettable visit.</span>
          </h2>
          <p className="mt-5 text-brand-ink/65 leading-relaxed">
            From the ball pit on the ground floor to the private theatre at the top —
            every level of 10to10 Adventures was designed to make you stay just a
            little longer.
          </p>
        </div>

        <motion.div
          ref={ref}
          style={{
            y: enterY,
            opacity: enterOp,
            perspective: 1600,
          }}
          className="relative mx-auto max-w-5xl aspect-[5/4] md:aspect-[16/10]"
        >
          <motion.div
            style={{
              rotateX: disable3D ? 0 : tiltX,
              rotateY: disable3D ? 0 : tiltY,
              transformStyle: "preserve-3d",
            }}
            className="absolute inset-0"
          >
            {/* Sky gradient backdrop */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-[2rem] overflow-hidden border border-black/[0.06]"
              style={{
                background:
                  "linear-gradient(180deg, #fff8e8 0%, #fff5db 38%, #fffbef 100%)",
              }}
            />

            <svg
              viewBox="0 0 800 500"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7ce2b5" />
                  <stop offset="100%" stopColor="#5fd0a0" />
                </linearGradient>
                <linearGradient id="wallBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4a5fb3" />
                  <stop offset="100%" stopColor="#2c3873" />
                </linearGradient>
                <linearGradient id="wallTeal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3ee5d8" />
                  <stop offset="100%" stopColor="#00d4c8" />
                </linearGradient>
                <linearGradient id="wallYellow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffd93d" />
                  <stop offset="100%" stopColor="#ffb020" />
                </linearGradient>
                <linearGradient id="wallSide" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a2354" />
                  <stop offset="100%" stopColor="#0f1632" />
                </linearGradient>
                <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stopColor="#fff5b8" />
                  <stop offset="60%" stopColor="#ffd93d" />
                  <stop offset="100%" stopColor="#ffb020" />
                </radialGradient>
                <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>

              {/* ============ LAYER 1 — SKY ============ */}
              <motion.g
                style={{ x: disable3D ? 0 : skyX, y: disable3D ? 0 : skyY }}
              >
                {/* Sun */}
                <motion.g
                  animate={reduce ? {} : { rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  style={{ originX: "650px", originY: "90px" }}
                >
                  <circle cx="650" cy="90" r="36" fill="url(#sun)" />
                  {[...Array(8)].map((_, i) => {
                    const a = (i / 8) * Math.PI * 2;
                    const x1 = 650 + Math.cos(a) * 46;
                    const y1 = 90 + Math.sin(a) * 46;
                    const x2 = 650 + Math.cos(a) * 58;
                    const y2 = 90 + Math.sin(a) * 58;
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#ffb020"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    );
                  })}
                </motion.g>

                {/* Clouds */}
                <motion.g
                  animate={reduce ? {} : { x: [0, 30, 0] }}
                  transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                >
                  <g fill="white" opacity="0.85">
                    <ellipse cx="120" cy="80" rx="36" ry="14" />
                    <ellipse cx="148" cy="72" rx="26" ry="14" />
                    <ellipse cx="100" cy="76" rx="20" ry="10" />
                  </g>
                </motion.g>
                <motion.g
                  animate={reduce ? {} : { x: [0, -24, 0] }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                >
                  <g fill="white" opacity="0.9">
                    <ellipse cx="500" cy="50" rx="30" ry="11" />
                    <ellipse cx="525" cy="44" rx="20" ry="10" />
                    <ellipse cx="485" cy="46" rx="14" ry="7" />
                  </g>
                </motion.g>

                {/* Stars / sparkles in sky */}
                {[
                  { x: 250, y: 60, s: 4 },
                  { x: 380, y: 110, s: 3 },
                  { x: 580, y: 30, s: 5 },
                  { x: 720, y: 180, s: 4 },
                  { x: 80, y: 180, s: 3 },
                ].map((p, i) => (
                  <motion.g
                    key={i}
                    animate={
                      reduce
                        ? {}
                        : { scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }
                    }
                    transition={{
                      duration: 3 + i * 0.4,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                    style={{ originX: `${p.x}px`, originY: `${p.y}px` }}
                  >
                    <path
                      d={`M${p.x} ${p.y - p.s} L${p.x + p.s * 0.4} ${p.y - p.s * 0.4} L${p.x + p.s} ${p.y} L${p.x + p.s * 0.4} ${p.y + p.s * 0.4} L${p.x} ${p.y + p.s} L${p.x - p.s * 0.4} ${p.y + p.s * 0.4} L${p.x - p.s} ${p.y} L${p.x - p.s * 0.4} ${p.y - p.s * 0.4} Z`}
                      fill="#ffd93d"
                    />
                  </motion.g>
                ))}
              </motion.g>

              {/* ============ LAYER 2 — FAR (back hills) ============ */}
              <motion.g style={{ x: disable3D ? 0 : farX }}>
                <ellipse cx="150" cy="430" rx="280" ry="50" fill="#a3e9cf" opacity="0.6" />
                <ellipse cx="650" cy="430" rx="260" ry="44" fill="#a3e9cf" opacity="0.55" />
              </motion.g>

              {/* ============ LAYER 3 — MID (the building, isometric) ============ */}
              <motion.g
                style={{ x: disable3D ? 0 : midX, y: disable3D ? 0 : midY }}
              >
                <motion.g
                  animate={reduce ? {} : { y: [0, -4, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Building shadow */}
                  <ellipse
                    cx="400"
                    cy="430"
                    rx="180"
                    ry="20"
                    fill="rgba(17,12,35,0.18)"
                    filter="url(#softShadow)"
                  />

                  {/* === Right side wall (depth) === */}
                  <polygon points="500,140 540,165 540,425 500,400" fill="url(#wallSide)" />
                  {/* Top roof slab (isometric top) */}
                  <polygon points="300,140 500,140 540,165 340,165" fill="#3a4ba0" />
                  {/* Roof party setup on top */}
                  <g>
                    {/* cake */}
                    <rect x="380" y="115" width="40" height="22" rx="3" fill="#ff8a3d" />
                    <rect x="385" y="100" width="30" height="18" rx="2" fill="#ff5a8a" />
                    <rect x="395" y="92" width="10" height="10" rx="1" fill="#fff5b8" />
                    <line x1="400" y1="92" x2="400" y2="86" stroke="#ff8a3d" strokeWidth="2" />
                    <motion.circle
                      cx="400"
                      cy="84"
                      r="2"
                      fill="#ffd93d"
                      animate={reduce ? {} : { scale: [1, 1.6, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    {/* Balloons on roof */}
                    <g transform="translate(330, 100)">
                      <circle cx="0" cy="0" r="12" fill="#ff5a8a" />
                      <line x1="0" y1="12" x2="-2" y2="38" stroke="#444" strokeWidth="1" />
                    </g>
                    <g transform="translate(465, 105)">
                      <circle cx="0" cy="0" r="10" fill="#00d4c8" />
                      <line x1="0" y1="10" x2="3" y2="34" stroke="#444" strokeWidth="1" />
                    </g>
                  </g>

                  {/* === FLOOR 3 — Theatre (top) === */}
                  <rect x="300" y="140" width="200" height="80" fill="url(#wallBlue)" />
                  {/* big window — movie screen */}
                  <rect x="320" y="160" width="160" height="48" rx="3" fill="#0f1632" />
                  <rect x="328" y="166" width="144" height="36" rx="2" fill="#1a8a8a" />
                  {/* film roll motif */}
                  <circle cx="400" cy="184" r="10" fill="none" stroke="#ffd93d" strokeWidth="1.5" />
                  <path d="M395 180l5-3 5 3 0 6-5 3-5-3z" fill="#ffd93d" />
                  {/* label */}
                  <rect x="400" y="212" width="80" height="6" rx="2" fill="#1a2354" />

                  {/* === FLOOR 2 — Gaming === */}
                  <rect x="300" y="220" width="200" height="80" fill="url(#wallTeal)" />
                  <rect x="540" y="245" width="0" height="55" fill="url(#wallSide)" />
                  <polygon points="500,220 540,245 540,300 500,275" fill="#0a8b87" />
                  {/* gaming windows */}
                  <rect x="320" y="240" width="68" height="44" rx="3" fill="#0f1632" />
                  <rect x="412" y="240" width="68" height="44" rx="3" fill="#0f1632" />
                  {/* TV screens */}
                  <motion.rect
                    x="326"
                    y="246"
                    width="56"
                    height="32"
                    rx="2"
                    fill="#ff5a8a"
                    animate={reduce ? {} : { fill: ["#ff5a8a", "#8b5cf6", "#00d4c8", "#ff5a8a"] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.rect
                    x="418"
                    y="246"
                    width="56"
                    height="32"
                    rx="2"
                    fill="#8b5cf6"
                    animate={reduce ? {} : { fill: ["#8b5cf6", "#00d4c8", "#ff5a8a", "#8b5cf6"] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  />
                  {/* controllers as little dots */}
                  <circle cx="354" cy="294" r="3" fill="#1a2354" />
                  <circle cx="446" cy="294" r="3" fill="#1a2354" />

                  {/* === FLOOR 1 — Soft play (ground) === */}
                  <rect x="300" y="300" width="200" height="120" fill="url(#wallYellow)" />
                  <polygon points="500,300 540,325 540,425 500,400" fill="#cc8a1a" />
                  {/* Big window — slide visible */}
                  <rect x="320" y="320" width="80" height="80" rx="4" fill="#fff5db" />
                  <path
                    d="M324 396 Q360 350 396 320"
                    stroke="#ff5a8a"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* ball pit dots */}
                  <circle cx="333" cy="385" r="5" fill="#ff5a8a" />
                  <circle cx="346" cy="390" r="5" fill="#00d4c8" />
                  <circle cx="358" cy="382" r="5" fill="#ffd93d" />
                  <circle cx="371" cy="392" r="5" fill="#8b5cf6" />
                  <circle cx="338" cy="395" r="4" fill="#ff8a3d" />

                  {/* Door */}
                  <rect x="420" y="350" width="50" height="70" rx="4" fill="#2c3873" />
                  <circle cx="462" cy="385" r="2.5" fill="#ffd93d" />
                  {/* "10to10" sign */}
                  <rect x="408" y="320" width="76" height="22" rx="4" fill="white" stroke="#2c3873" strokeWidth="2" />
                  <text
                    x="446"
                    y="336"
                    textAnchor="middle"
                    fontFamily="var(--font-playful), sans-serif"
                    fontSize="12"
                    fontWeight="700"
                    fill="#2c3873"
                  >
                    10 ∞ 10
                  </text>

                  {/* Ground floor strip */}
                  <rect x="280" y="420" width="240" height="14" fill="#1a2354" />
                </motion.g>
              </motion.g>

              {/* ============ LAYER 4 — Grass + characters ============ */}
              <motion.g style={{ x: disable3D ? 0 : nearX }}>
                {/* grass band */}
                <path d="M0 430 Q200 422 400 430 Q600 438 800 430 L800 500 L0 500 Z" fill="url(#grass)" />

                {/* Kid 1 — left, hopping */}
                <motion.g
                  animate={reduce ? {} : { y: [0, -8, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ originX: "200px", originY: "440px" }}
                >
                  <g transform="translate(200, 410)">
                    {/* head */}
                    <circle cx="0" cy="0" r="12" fill="#ffcc99" />
                    <path d="M-12 -4 Q0 -16 12 -4" fill="#2c3873" />
                    {/* body — t-shirt */}
                    <rect x="-10" y="10" width="20" height="22" rx="3" fill="#ff5a8a" />
                    {/* pants */}
                    <rect x="-9" y="30" width="8" height="14" rx="2" fill="#2c3873" />
                    <rect x="1" y="30" width="8" height="14" rx="2" fill="#2c3873" />
                    {/* arms */}
                    <rect x="-16" y="14" width="6" height="12" rx="2" fill="#ffcc99" transform="rotate(-15 -13 20)" />
                    <rect x="10" y="14" width="6" height="12" rx="2" fill="#ffcc99" transform="rotate(15 13 20)" />
                  </g>
                </motion.g>

                {/* Kid 2 — right, holding balloon */}
                <motion.g
                  animate={reduce ? {} : { y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                >
                  <g transform="translate(580, 410)">
                    <circle cx="0" cy="0" r="11" fill="#e6b88a" />
                    <path d="M-11 -3 Q0 -14 11 -3" fill="#3a4ba0" />
                    {/* pigtails */}
                    <circle cx="-12" cy="-2" r="3" fill="#3a4ba0" />
                    <circle cx="12" cy="-2" r="3" fill="#3a4ba0" />
                    <rect x="-9" y="9" width="18" height="22" rx="3" fill="#00d4c8" />
                    <rect x="-8" y="29" width="7" height="14" rx="2" fill="#2c3873" />
                    <rect x="1" y="29" width="7" height="14" rx="2" fill="#2c3873" />
                    {/* balloon */}
                    <line x1="14" y1="12" x2="22" y2="-30" stroke="#444" strokeWidth="1" />
                    <motion.g
                      animate={reduce ? {} : { y: [0, -3, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <circle cx="22" cy="-32" r="10" fill="#ff5a8a" />
                      <path d="M22 -22 L20 -19 L24 -19 Z" fill="#ff5a8a" />
                    </motion.g>
                  </g>
                </motion.g>

                {/* Kid 3 — center-front, smaller, sitting */}
                <g transform="translate(400, 445)">
                  <circle cx="0" cy="-8" r="9" fill="#ffcc99" />
                  <path d="M-9 -10 Q0 -18 9 -10" fill="#2c3873" />
                  <rect x="-9" y="0" width="18" height="14" rx="3" fill="#ffd93d" />
                  <rect x="-12" y="14" width="24" height="6" rx="3" fill="#2c3873" />
                  {/* a tiny block in front */}
                  <rect x="-3" y="2" width="8" height="8" rx="1" fill="#ff5a8a" />
                </g>
              </motion.g>

              {/* ============ LAYER 5 — Foreground floating balloons ============ */}
              {!reduce && [
                { x: 100, color: "#ff5a8a", delay: 0 },
                { x: 260, color: "#00d4c8", delay: 1.5 },
                { x: 540, color: "#ffd93d", delay: 0.8 },
                { x: 700, color: "#8b5cf6", delay: 2.2 },
              ].map((b, i) => (
                <motion.g
                  key={i}
                  initial={{ y: 600, opacity: 0 }}
                  animate={{ y: -100, opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    delay: b.delay,
                    ease: "easeOut",
                    times: [0, 0.1, 0.85, 1],
                  }}
                >
                  <line x1={b.x} y1="430" x2={b.x - 2} y2="380" stroke="#444" strokeWidth="1" />
                  <circle cx={b.x} cy="380" r="14" fill={b.color} />
                  <circle cx={b.x - 4} cy="376" r="3" fill="white" opacity="0.5" />
                  <path d={`M${b.x} 394 L${b.x - 2} 397 L${b.x + 2} 397 Z`} fill={b.color} />
                </motion.g>
              ))}
            </svg>
          </motion.div>

          {/* Floor labels — anchored beside the building */}
          <div className="hidden md:block">
            <FloorLabel
              top="22%"
              left="0"
              color="text-brand-grape"
              label="Floor 03"
              name="Private Theatre"
            />
            <FloorLabel
              top="46%"
              left="0"
              color="text-brand-turquoise"
              label="Floor 02"
              name="Gaming Arena"
            />
            <FloorLabel
              top="70%"
              left="0"
              color="text-amber-700"
              label="Floor 01"
              name="Soft Play & Party"
            />
          </div>
        </motion.div>

        <p className="text-center text-xs text-brand-ink/45 mt-4 font-medium">
          Move your cursor across the scene · drag the world a little
        </p>
      </div>
    </section>
  );
}

function FloorLabel({
  top,
  left,
  color,
  label,
  name,
}: {
  top: string;
  left: string;
  color: string;
  label: string;
  name: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="absolute"
      style={{ top, left }}
    >
      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-bold uppercase tracking-widest ${color}`}>
          {label}
        </span>
        <span className="h-px w-12 bg-current opacity-30" />
      </div>
      <div className="text-sm font-semibold text-brand-ink mt-0.5">{name}</div>
    </motion.div>
  );
}
