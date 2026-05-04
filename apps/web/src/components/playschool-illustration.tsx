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
 * PlaySchoolIllustration — a custom Montessori classroom-corner vector scene.
 *
 * Pure SVG. Layered like a stage:
 *  - back wall (dotted wallpaper + sun-rayed window)
 *  - chalkboard with chalk doodles (ABC, sun, "10 ∞ 10")
 *  - shelf with picture books and a plant
 *  - reading rug (concentric arcs) on the floor
 *  - one kid sitting cross-legged reading a book (page subtly turning)
 *  - another kid stacking ABC blocks
 *  - teacher silhouette kneeling, gesturing
 *  - floating crayons + sparkles + light dust
 *
 * Cursor parallax on desktop (5 depth layers). Reduced-motion + mobile
 * downgrade to the static illustration.
 */
export function PlaySchoolIllustration() {
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

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), { stiffness: 80, damping: 22 });
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), { stiffness: 80, damping: 22 });

  const skyX  = useSpring(useTransform(mx, [-0.5, 0.5], [10, -10]), { stiffness: 60, damping: 20 });
  const farX  = useSpring(useTransform(mx, [-0.5, 0.5], [20, -20]), { stiffness: 70, damping: 20 });
  const midX  = useSpring(useTransform(mx, [-0.5, 0.5], [34, -34]), { stiffness: 80, damping: 22 });
  const nearX = useSpring(useTransform(mx, [-0.5, 0.5], [50, -50]), { stiffness: 90, damping: 22 });
  const skyY  = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 60, damping: 20 });
  const midY  = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 80, damping: 22 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const enterY = useTransform(scrollYProgress, [0, 0.4], [40, 0]);
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
    <motion.div
      ref={ref}
      style={{ y: enterY, opacity: enterOp, perspective: 1600 }}
      className="relative mx-auto w-full aspect-[4/5] md:aspect-[5/6]"
    >
      <motion.div
        style={{
          rotateX: disable3D ? 0 : tiltX,
          rotateY: disable3D ? 0 : tiltY,
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0"
      >
        {/* Back panel */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-[2rem] overflow-hidden border border-black/[0.06]"
          style={{
            background:
              "linear-gradient(180deg, #fff8e1 0%, #fff3d0 45%, #fde8b8 100%)",
          }}
        />

        <svg
          viewBox="0 0 600 720"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="ps-board" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1f5b48" />
              <stop offset="100%" stopColor="#0e3826" />
            </linearGradient>
            <linearGradient id="ps-rug" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#ff8aa8" />
              <stop offset="100%" stopColor="#ff5a8a" />
            </linearGradient>
            <linearGradient id="ps-floor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e9d5b3" />
              <stop offset="100%" stopColor="#caa97a" />
            </linearGradient>
            <radialGradient id="ps-sun" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#fff5b8" />
              <stop offset="60%" stopColor="#ffd93d" />
              <stop offset="100%" stopColor="#ffb020" />
            </radialGradient>
            <linearGradient id="ps-window" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bee5ff" />
              <stop offset="100%" stopColor="#7cc5ff" />
            </linearGradient>
            <filter id="ps-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          {/* ============ LAYER 1 — back wall + ambient light ============ */}
          <motion.g style={{ x: disable3D ? 0 : skyX, y: disable3D ? 0 : skyY }}>
            {/* dotted wallpaper */}
            <g opacity="0.12">
              {Array.from({ length: 14 }).map((_, r) =>
                Array.from({ length: 12 }).map((__, c) => (
                  <circle
                    key={`${r}-${c}`}
                    cx={30 + c * 50}
                    cy={30 + r * 38}
                    r="2"
                    fill="#2c3873"
                  />
                ))
              )}
            </g>

            {/* WINDOW (top right) */}
            <g transform="translate(420, 60)">
              <rect x="0" y="0" width="140" height="170" rx="6" fill="#a06c3d" />
              <rect x="6" y="6" width="128" height="158" rx="3" fill="url(#ps-window)" />
              {/* sash bars */}
              <line x1="70" y1="6" x2="70" y2="164" stroke="#a06c3d" strokeWidth="4" />
              <line x1="6" y1="85" x2="134" y2="85" stroke="#a06c3d" strokeWidth="4" />
              {/* rolling clouds in window */}
              <motion.g
                animate={reduce ? {} : { x: [0, 12, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              >
                <ellipse cx="40" cy="40" rx="18" ry="6" fill="#fff" opacity="0.85" />
                <ellipse cx="50" cy="35" rx="10" ry="5" fill="#fff" opacity="0.85" />
              </motion.g>
              <motion.g
                animate={reduce ? {} : { x: [0, -10, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <ellipse cx="100" cy="60" rx="14" ry="5" fill="#fff" opacity="0.85" />
              </motion.g>
              {/* sun in window */}
              <motion.g
                animate={reduce ? {} : { rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                style={{ transformBox: "fill-box" as const, transformOrigin: "center" }}
              >
                <g transform="translate(95, 130)">
                  <circle r="20" fill="url(#ps-sun)" />
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
                    const r = (a * Math.PI) / 180;
                    const x1 = Math.cos(r) * 24;
                    const y1 = Math.sin(r) * 24;
                    const x2 = Math.cos(r) * 32;
                    const y2 = Math.sin(r) * 32;
                    return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffb020" strokeWidth="2.5" strokeLinecap="round" />;
                  })}
                </g>
              </motion.g>
            </g>

            {/* sunshine beams from window */}
            <motion.g
              animate={reduce ? {} : { opacity: [0.18, 0.32, 0.18] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <polygon
                points="430,230 600,230 600,520 360,520"
                fill="#fff5b8"
                opacity="0.35"
              />
              <polygon
                points="500,230 600,230 600,400 480,400"
                fill="#fff"
                opacity="0.25"
              />
            </motion.g>

            {/* alphabet poster on wall */}
            <g transform="translate(40, 60)">
              <rect width="120" height="80" rx="4" fill="#fff" stroke="#1a1033" strokeWidth="1.5" />
              <text x="60" y="34" textAnchor="middle" fontFamily="var(--font-playful), sans-serif" fontSize="18" fontWeight="700" fill="#2c3873">ALPHABET</text>
              <g fontFamily="var(--font-playful), sans-serif" fontSize="11" fontWeight="700">
                {["A","B","C","D","E","F","G","H"].map((l, i) => (
                  <text
                    key={l}
                    x={15 + (i % 4) * 26}
                    y={56 + Math.floor(i / 4) * 16}
                    fill={["#ff5a8a","#ffd93d","#00d4c8","#8b5cf6"][i % 4]}
                  >{l}</text>
                ))}
              </g>
            </g>

            {/* sparkles */}
            {[
              { x: 220, y: 55, c: "#ffd93d", d: 0 },
              { x: 365, y: 45, c: "#ff5a8a", d: 0.6 },
              { x: 560, y: 280, c: "#8b5cf6", d: 1.2 },
              { x: 100, y: 200, c: "#00d4c8", d: 0.4 },
            ].map((s, i) => (
              <motion.g
                key={i}
                style={{ transformBox: "fill-box" as const, transformOrigin: "center" }}
                animate={reduce ? {} : { scale: [0.6, 1.2, 0.6], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: s.d, ease: "easeInOut" }}
              >
                <path
                  d={`M${s.x} ${s.y - 5}L${s.x + 1.5} ${s.y - 1.5}L${s.x + 5} ${s.y}L${s.x + 1.5} ${s.y + 1.5}L${s.x} ${s.y + 5}L${s.x - 1.5} ${s.y + 1.5}L${s.x - 5} ${s.y}L${s.x - 1.5} ${s.y - 1.5}Z`}
                  fill={s.c}
                />
              </motion.g>
            ))}
          </motion.g>

          {/* ============ LAYER 2 — chalkboard ============ */}
          <motion.g style={{ x: disable3D ? 0 : farX }}>
            <g transform="translate(40, 170)">
              <rect width="320" height="180" rx="6" fill="#a06c3d" />
              <rect width="320" height="180" rx="6" fill="url(#ps-board)" />
              <rect x="0" y="-8" width="320" height="14" rx="3" fill="#7a4f29" />
              <rect x="-8" y="172" width="336" height="20" rx="4" fill="#7a4f29" />
              {/* chalk tray */}
              <rect x="40" y="178" width="40" height="6" rx="1" fill="#fff" opacity="0.85" />
              <rect x="100" y="178" width="30" height="6" rx="1" fill="#ff5a8a" opacity="0.85" />
              <rect x="160" y="178" width="30" height="6" rx="1" fill="#ffd93d" opacity="0.85" />

              {/* chalk content */}
              <g fontFamily="var(--font-playful), sans-serif">
                {/* big "10 ∞ 10" header */}
                <text x="160" y="44" textAnchor="middle" fontSize="26" fontWeight="700" fill="#fff">
                  10 ∞ 10
                </text>
                {/* ABC */}
                <text x="60" y="100" fontSize="40" fontWeight="700" fill="#fff">A</text>
                <text x="105" y="100" fontSize="40" fontWeight="700" fill="#ffd93d">B</text>
                <text x="150" y="100" fontSize="40" fontWeight="700" fill="#ff5a8a">C</text>
                <text x="200" y="100" fontSize="22" fontWeight="600" fill="#fff">123</text>

                {/* equation */}
                <text x="60" y="148" fontSize="18" fontWeight="600" fill="#fff">today</text>
                <motion.text
                  x="125" y="148" fontSize="18" fontWeight="700" fill="#7cc5ff"
                  animate={reduce ? {} : { opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                >
                  we play
                </motion.text>
                <text x="206" y="148" fontSize="18" fontWeight="700" fill="#ffd93d">+ learn</text>

                {/* sun doodle */}
                <g stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none">
                  <circle cx="270" cy="85" r="12" />
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
                    const r = (a * Math.PI) / 180;
                    const x1 = 270 + Math.cos(r) * 16;
                    const y1 = 85 + Math.sin(r) * 16;
                    const x2 = 270 + Math.cos(r) * 22;
                    const y2 = 85 + Math.sin(r) * 22;
                    return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} />;
                  })}
                </g>
                {/* heart */}
                <path d="M270 130 Q265 120 257 122 Q250 125 252 134 Q256 145 270 152 Q284 145 288 134 Q290 125 283 122 Q275 120 270 130 Z" fill="#ff5a8a" />
              </g>
            </g>
          </motion.g>

          {/* ============ LAYER 3 — shelf + plant + crayons ============ */}
          <motion.g style={{ x: disable3D ? 0 : midX, y: disable3D ? 0 : midY }}>
            {/* shelf below chalkboard */}
            <rect x="40" y="380" width="320" height="10" rx="2" fill="#a06c3d" />
            <rect x="40" y="390" width="320" height="6" fill="#7a4f29" />

            {/* picture books */}
            <g transform="translate(70, 380)">
              <rect x="-22" y="-44" width="44" height="44" rx="2" fill="#ff5a8a" />
              <rect x="-22" y="-44" width="44" height="6" fill="#ff8aa8" />
              <text x="0" y="-22" textAnchor="middle" fontFamily="var(--font-playful), sans-serif" fontSize="14" fontWeight="700" fill="#fff">A</text>
            </g>
            <g transform="translate(120, 380)">
              <rect x="-20" y="-50" width="40" height="50" rx="2" fill="#ffd93d" />
              <rect x="-20" y="-50" width="40" height="5" fill="#fff5b8" />
              <text x="0" y="-25" textAnchor="middle" fontFamily="var(--font-playful), sans-serif" fontSize="14" fontWeight="700" fill="#1a2354">B</text>
            </g>
            <g transform="translate(168, 380)">
              <rect x="-22" y="-46" width="44" height="46" rx="2" fill="#00d4c8" />
              <rect x="-22" y="-46" width="44" height="6" fill="#7ce2b5" />
              <text x="0" y="-23" textAnchor="middle" fontFamily="var(--font-playful), sans-serif" fontSize="14" fontWeight="700" fill="#fff">C</text>
            </g>

            {/* mini globe */}
            <g transform="translate(230, 380)">
              <circle cy="-22" r="22" fill="#7cc5ff" />
              <path d="M-22 -22 Q-12 -32 0 -28 Q12 -24 22 -28" fill="#5fa867" />
              <path d="M-18 -16 Q-8 -10 4 -14 Q14 -16 22 -10" fill="#5fa867" />
              <ellipse cy="-22" rx="22" ry="6" fill="#fff" opacity="0.18" />
              <rect x="-4" y="-2" width="8" height="6" fill="#a06c3d" />
            </g>

            {/* plant */}
            <g transform="translate(300, 380)">
              <path d="M-16 0 L16 0 L12 -22 L-12 -22 Z" fill="#a06c3d" />
              <rect x="-16" y="-22" width="32" height="4" fill="#7a4f29" />
              {/* leaves swaying */}
              <motion.g
                style={{ transformBox: "fill-box" as const, transformOrigin: "center bottom" }}
                animate={reduce ? {} : { rotate: [-3, 3, -3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ellipse cx="-8" cy="-44" rx="10" ry="20" fill="#5fa867" transform="rotate(-25 -8 -44)" />
                <ellipse cx="0" cy="-50" rx="9" ry="22" fill="#7ce2b5" />
                <ellipse cx="9" cy="-44" rx="10" ry="20" fill="#5fa867" transform="rotate(25 9 -44)" />
              </motion.g>
            </g>

            {/* floating crayons */}
            <motion.g
              style={{ transformBox: "fill-box" as const, transformOrigin: "center" }}
              animate={reduce ? {} : { y: [0, -8, 0], rotate: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <g transform="translate(395, 230) rotate(20)">
                <rect x="0" y="0" width="60" height="9" rx="2" fill="#ff5a8a" />
                <polygon points="60,0 70,4.5 60,9" fill="#3a1626" />
                <rect x="-10" y="0" width="10" height="9" fill="#ff8a3d" />
                <rect x="6" y="2.5" width="44" height="2" fill="#fff" opacity="0.4" />
              </g>
            </motion.g>
            <motion.g
              style={{ transformBox: "fill-box" as const, transformOrigin: "center" }}
              animate={reduce ? {} : { y: [0, -6, 0], rotate: [4, -4, 4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            >
              <g transform="translate(380, 280) rotate(-25)">
                <rect x="0" y="0" width="50" height="8" rx="2" fill="#ffd93d" />
                <polygon points="50,0 58,4 50,8" fill="#3a1626" />
                <rect x="-8" y="0" width="8" height="8" fill="#ff8a3d" />
              </g>
            </motion.g>
          </motion.g>

          {/* ============ LAYER 4 — floor + rug + characters ============ */}
          <motion.g style={{ x: disable3D ? 0 : nearX }}>
            {/* floor band */}
            <rect x="0" y="500" width="600" height="220" fill="url(#ps-floor)" />
            {/* floor planks */}
            <g stroke="#a8895a" strokeWidth="1.5" opacity="0.4">
              <line x1="0" y1="540" x2="600" y2="540" />
              <line x1="0" y1="600" x2="600" y2="600" />
              <line x1="0" y1="660" x2="600" y2="660" />
            </g>

            {/* big floor shadow under rug */}
            <ellipse cx="300" cy="640" rx="250" ry="20" fill="rgba(17,12,35,0.12)" filter="url(#ps-shadow)" />

            {/* concentric rug */}
            <g transform="translate(300, 600)">
              <ellipse rx="240" ry="60" fill="url(#ps-rug)" />
              <ellipse rx="200" ry="48" fill="#ffd93d" opacity="0.85" />
              <ellipse rx="160" ry="38" fill="#7cc5ff" opacity="0.85" />
              <ellipse rx="118" ry="28" fill="#7ce2b5" opacity="0.9" />
              <ellipse rx="80" ry="18" fill="#fff" opacity="0.6" />
              {/* rug fringe */}
              {Array.from({ length: 32 }).map((_, i) => {
                const a = (i / 32) * Math.PI * 2;
                const x = Math.cos(a) * 240;
                const y = Math.sin(a) * 60;
                return <line key={i} x1={x} y1={y} x2={x * 1.04} y2={y * 1.08} stroke="#fff" strokeWidth="2" />;
              })}
            </g>

            {/* ABC blocks on the rug */}
            <g transform="translate(180, 580)">
              <rect x="-16" y="-32" width="32" height="32" rx="3" fill="#ff5a8a" />
              <rect x="-16" y="-32" width="32" height="6" fill="#fff" opacity="0.3" />
              <text x="0" y="-12" textAnchor="middle" fontFamily="var(--font-playful), sans-serif" fontSize="18" fontWeight="700" fill="#fff">A</text>
              <rect x="20" y="-32" width="32" height="32" rx="3" fill="#ffd93d" />
              <rect x="20" y="-32" width="32" height="6" fill="#fff" opacity="0.4" />
              <text x="36" y="-12" textAnchor="middle" fontFamily="var(--font-playful), sans-serif" fontSize="18" fontWeight="700" fill="#1a2354">B</text>
              {/* stacked block */}
              <rect x="2" y="-64" width="32" height="32" rx="3" fill="#00d4c8" />
              <rect x="2" y="-64" width="32" height="6" fill="#fff" opacity="0.3" />
              <text x="18" y="-44" textAnchor="middle" fontFamily="var(--font-playful), sans-serif" fontSize="18" fontWeight="700" fill="#fff">C</text>
            </g>

            {/* KID 1 — sitting cross-legged with book (left) */}
            <motion.g
              style={{ transformBox: "fill-box" as const, transformOrigin: "center" }}
              animate={reduce ? {} : { y: [0, -1.5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <g transform="translate(245, 580)">
                {/* legs (crossed) */}
                <ellipse cx="-10" cy="20" rx="22" ry="9" fill="#2c3873" />
                <ellipse cx="10" cy="20" rx="22" ry="9" fill="#2c3873" />
                {/* shoes */}
                <ellipse cx="-30" cy="22" rx="6" ry="3" fill="#1a1033" />
                <ellipse cx="30" cy="22" rx="6" ry="3" fill="#1a1033" />
                {/* torso */}
                <path d="M-22 -8 Q-26 18 0 18 Q26 18 22 -8 Q22 -18 0 -20 Q-22 -18 -22 -8 Z" fill="#ff5a8a" />
                {/* arms holding book */}
                <ellipse cx="-22" cy="0" rx="6" ry="14" fill="#ff5a8a" transform="rotate(-30 -22 0)" />
                <ellipse cx="22" cy="0" rx="6" ry="14" fill="#ff5a8a" transform="rotate(30 22 0)" />
                <ellipse cx="-12" cy="-2" rx="5" ry="4" fill="#ffcc99" />
                <ellipse cx="12" cy="-2" rx="5" ry="4" fill="#ffcc99" />
                {/* book in hands (animated page flip) */}
                <g transform="translate(0, -8)">
                  <rect x="-22" y="-6" width="44" height="14" rx="1" fill="#fff" stroke="#1a1033" strokeWidth="1" />
                  <line x1="0" y1="-6" x2="0" y2="8" stroke="#1a1033" strokeWidth="0.8" />
                  <motion.path
                    d="M0 -6 L18 -6 L18 8 L0 8 Z"
                    fill="#fffbe8"
                    stroke="#1a1033"
                    strokeWidth="0.8"
                    style={{ transformBox: "fill-box" as const, transformOrigin: "left center" }}
                    animate={reduce ? {} : { rotateY: [0, -160, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </g>
                {/* head */}
                <g transform="translate(0, -38)">
                  <circle r="14" fill="#ffcc99" />
                  {/* hair */}
                  <path d="M-14 -6 Q-12 -18 0 -16 Q12 -18 14 -6 Q14 -10 0 -14 Q-14 -10 -14 -6 Z" fill="#3a2a1a" />
                  {/* eyes */}
                  <ellipse cx="-4" cy="-1" rx="1.4" ry="2" fill="#1a1033" />
                  <ellipse cx="4" cy="-1" rx="1.4" ry="2" fill="#1a1033" />
                  {/* smile */}
                  <path d="M-3 5 Q0 8 3 5" stroke="#1a1033" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  {/* cheek blush */}
                  <circle cx="-7" cy="3" r="1.5" fill="#ff8aa8" opacity="0.7" />
                  <circle cx="7" cy="3" r="1.5" fill="#ff8aa8" opacity="0.7" />
                </g>
              </g>
            </motion.g>

            {/* KID 2 — playing with blocks (center, smaller) */}
            <motion.g
              style={{ transformBox: "fill-box" as const, transformOrigin: "center" }}
              animate={reduce ? {} : { rotate: [-2, 2, -2] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <g transform="translate(150, 580)">
                {/* legs */}
                <ellipse cx="-10" cy="20" rx="20" ry="8" fill="#5fa867" />
                <ellipse cx="10" cy="20" rx="20" ry="8" fill="#5fa867" />
                {/* torso */}
                <path d="M-20 -6 Q-24 18 0 18 Q24 18 20 -6 Q20 -16 0 -18 Q-20 -16 -20 -6 Z" fill="#ffd93d" />
                {/* arm reaching to block */}
                <ellipse cx="22" cy="-8" rx="6" ry="14" fill="#ffd93d" transform="rotate(40 22 -8)" />
                <ellipse cx="-22" cy="0" rx="6" ry="12" fill="#ffd93d" transform="rotate(-30 -22 0)" />
                <circle cx="32" cy="-18" r="4" fill="#e6b88a" />
                <circle cx="-26" cy="6" r="4" fill="#e6b88a" />
                {/* head */}
                <g transform="translate(0, -36)">
                  <circle r="13" fill="#e6b88a" />
                  {/* pigtails */}
                  <circle cx="-12" cy="-2" r="4" fill="#3a2a1a" />
                  <circle cx="12" cy="-2" r="4" fill="#3a2a1a" />
                  <path d="M-12 -10 Q0 -18 12 -10" fill="#3a2a1a" />
                  {/* eyes */}
                  <ellipse cx="-4" cy="-1" rx="1.3" ry="1.8" fill="#1a1033" />
                  <ellipse cx="4" cy="-1" rx="1.3" ry="1.8" fill="#1a1033" />
                  <path d="M-3 4 Q0 7 3 4" stroke="#1a1033" strokeWidth="1.1" fill="none" strokeLinecap="round" />
                  <circle cx="-7" cy="3" r="1.4" fill="#ff8aa8" opacity="0.7" />
                  <circle cx="7" cy="3" r="1.4" fill="#ff8aa8" opacity="0.7" />
                </g>
              </g>
            </motion.g>

            {/* TEACHER — kneeling on right, gesturing toward chalkboard */}
            <motion.g
              style={{ transformBox: "fill-box" as const, transformOrigin: "center" }}
              animate={reduce ? {} : { rotate: [-1, 1, -1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <g transform="translate(420, 568)">
                {/* skirt/legs (kneeling) */}
                <path d="M-28 -10 Q-30 30 30 30 Q32 -10 0 -16 Q-28 -16 -28 -10 Z" fill="#8b5cf6" />
                <ellipse cx="-26" cy="30" rx="6" ry="3" fill="#1a1033" />
                {/* torso */}
                <path d="M-22 -34 Q-24 -8 0 -8 Q24 -8 22 -34 Q22 -46 0 -48 Q-22 -46 -22 -34 Z" fill="#7cc5ff" />
                {/* arm gesturing left */}
                <ellipse cx="-30" cy="-30" rx="6" ry="18" fill="#7cc5ff" transform="rotate(-50 -30 -30)" />
                <circle cx="-46" cy="-44" r="5" fill="#d4a574" />
                <ellipse cx="22" cy="-22" rx="6" ry="14" fill="#7cc5ff" transform="rotate(20 22 -22)" />
                {/* head */}
                <g transform="translate(0, -64)">
                  <circle r="15" fill="#d4a574" />
                  {/* bun hair */}
                  <circle cx="0" cy="-12" r="6" fill="#2c1a0e" />
                  <path d="M-15 -4 Q-14 -14 0 -16 Q14 -14 15 -4 Q15 -8 0 -12 Q-15 -8 -15 -4 Z" fill="#2c1a0e" />
                  <ellipse cx="-5" cy="0" rx="1.4" ry="2" fill="#1a1033" />
                  <ellipse cx="5" cy="0" rx="1.4" ry="2" fill="#1a1033" />
                  <path d="M-4 6 Q0 9 4 6" stroke="#1a1033" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  <circle cx="-8" cy="3" r="1.5" fill="#ff8aa8" opacity="0.6" />
                  <circle cx="8" cy="3" r="1.5" fill="#ff8aa8" opacity="0.6" />
                </g>
                {/* "name tag" */}
                <rect x="-12" y="-30" width="24" height="6" rx="1" fill="#fff" />
              </g>
            </motion.g>
          </motion.g>

          {/* ============ LAYER 5 — foreground floating pencil ============ */}
          {!reduce && (
            <motion.g
              initial={{ y: 720, opacity: 0 }}
              animate={{ y: -100, opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 12,
                repeat: Infinity,
                delay: 1.4,
                ease: "easeInOut",
                times: [0, 0.1, 0.85, 1],
              }}
            >
              <g transform="translate(540, 0) rotate(45)">
                <rect x="0" y="0" width="60" height="9" rx="2" fill="#00d4c8" />
                <polygon points="60,0 70,4.5 60,9" fill="#1a1033" />
                <rect x="-10" y="0" width="10" height="9" fill="#ff8a3d" />
              </g>
            </motion.g>
          )}
        </svg>

        {/* Floor cast shadow */}
        <div className="absolute inset-x-12 bottom-3 h-3 rounded-full bg-black/15 blur-md" />
      </motion.div>

      <p className="absolute -bottom-7 inset-x-0 text-center text-[11px] text-brand-ink/45 font-medium">
        Move your cursor across the room · they&apos;re waiting for you
      </p>
    </motion.div>
  );
}
