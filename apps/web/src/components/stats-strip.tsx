"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PopIn } from "@/components/reveal";
import { WaveDivider, Float, StarDoodle, SwirlDoodle } from "@/components/playful";

type Stat = { n: number; suffix?: string; label: string; color: string };

const stats: Stat[] = [
  { n: 7, label: "Themed zones", color: "text-brand-primary" },
  { n: 2400, label: "Sq ft of play", color: "text-brand-turquoise" },
  { n: 10000, suffix: "+", label: "Happy visits / yr", color: "text-amber-600" },
  { n: 4.9, label: "Google rating", color: "text-brand-grape" },
];

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1200;
    const isFloat = to % 1 !== 0;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = isFloat ? +(eased * to).toFixed(1) : Math.round(eased * to);
      setV(cur);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {v.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

export function StatsStrip() {
  return (
    <section className="relative">
      <WaveDivider fillClass="fill-white" />
      <div className="relative overflow-hidden bg-white py-12 md:py-16">
        {/* Playful colored dots scattered behind */}
        <span className="absolute top-6 left-[12%] h-2 w-2 rounded-full bg-brand-primary/40" aria-hidden />
        <span className="absolute bottom-8 left-[28%] h-2.5 w-2.5 rounded-full bg-brand-yellow" aria-hidden />
        <span className="absolute top-10 right-[18%] h-3 w-3 rounded-full bg-brand-turquoise/40" aria-hidden />
        <span className="absolute bottom-6 right-[8%] h-2 w-2 rounded-full bg-brand-grape/50" aria-hidden />

        <Float speed="spin" className="top-8 left-[4%] w-8 text-brand-yellow opacity-70 hidden md:block">
          <StarDoodle className="w-full" />
        </Float>
        <Float speed="slow" className="bottom-5 right-[3%] w-9 text-brand-turquoise opacity-60 hidden md:block">
          <SwirlDoodle className="w-full" />
        </Float>

        <div className="container relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {stats.map((s, i) => (
              <PopIn key={s.label} delay={Math.min(i * 0.08, 0.3)} className="h-full">
                <div
                  className={`h-full rounded-2xl border-2 border-brand-ink/10 bg-[#fdfbf7] px-4 py-6 md:py-7 text-center transition-transform duration-300 hover:rotate-0 ${
                    i % 2 ? "rotate-[1.2deg]" : "rotate-[-1.5deg]"
                  }`}
                >
                  <div className={`font-display text-3xl md:text-5xl font-bold tabular-nums ${s.color}`}>
                    <CountUp to={s.n} suffix={s.suffix} />
                  </div>
                  <div className="text-[11px] md:text-xs text-brand-ink/55 mt-2 font-semibold uppercase tracking-widest">
                    {s.label}
                  </div>
                </div>
              </PopIn>
            ))}
          </div>
        </div>
      </div>
      <WaveDivider fillClass="fill-[#fdfbf7]" className="bg-white -scale-x-100" />
    </section>
  );
}
