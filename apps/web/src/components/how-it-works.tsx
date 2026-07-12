"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Sparkles, Trophy, MessageCircle } from "lucide-react";
import { BookButton } from "./book-button";
import { WaveDivider, Float, PaperPlaneDoodle, AbcBlocksDoodle } from "@/components/playful";

const badges = [
  "bg-brand-yellow/60 rotate-[-4deg]",
  "bg-brand-turquoise/30 rotate-[3deg]",
  "bg-brand-grape/20 rotate-[-3deg]",
  "bg-brand-orange/30 rotate-[4deg]",
];

const steps = [
  {
    n: "01",
    icon: MessageCircle,
    title: "Tell us when",
    desc: "WhatsApp your preferred day and time. We confirm in minutes.",
  },
  {
    n: "02",
    icon: CalendarCheck,
    title: "Show up",
    desc: "Walk in, scan the QR at reception. Everything is ready.",
  },
  {
    n: "03",
    icon: Sparkles,
    title: "Play freely",
    desc: "Hop between zones for the full session. Staff on hand if you need anything.",
  },
  {
    n: "04",
    icon: Trophy,
    title: "Leave smiling",
    desc: "Collect a small souvenir on the way out. Book the next visit for priority slots.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative">
      <WaveDivider fillClass="fill-white" />
      <div className="relative overflow-hidden bg-white py-20 md:py-28">
        <Float speed="fast" className="top-12 right-[6%] w-11 text-brand-sky opacity-80 hidden md:block">
          <PaperPlaneDoodle className="w-full" />
        </Float>
        <Float speed="wiggle" className="bottom-16 left-[4%] w-11 text-brand-orange opacity-60 hidden lg:block">
          <AbcBlocksDoodle className="w-full" />
        </Float>

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mb-12 md:mb-16"
          >
            <span className="eyebrow">How it works</span>
            <h2 className="heading-lg mt-3">
              From tap to tap dance,<br className="hidden md:inline" />{" "}
              <span className="accent">in four steps.</span>
            </h2>
            <p className="mt-5 text-brand-ink/60 text-sm md:text-base leading-relaxed">
              No phone-tag, no paperwork. Planning a visit takes under two minutes.
            </p>
          </motion.div>

          <div className="relative">
            {/* hand-drawn dotted path linking the four steps */}
            <svg
              aria-hidden
              className="pointer-events-none absolute -top-9 left-0 hidden md:block w-full h-10 text-brand-turquoise"
              viewBox="0 0 1200 60"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M 30 42 C 160 8, 320 52, 470 30 C 620 8, 760 50, 910 32 C 1030 18, 1120 32, 1170 24"
                stroke="currentColor"
                strokeOpacity="0.5"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="0.5 11"
              />
            </svg>

            <div className="grid md:grid-cols-4 gap-4">
              {steps.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="card card-hover p-6 h-full group"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-display text-sm font-bold text-brand-ink ${badges[i % badges.length]}`}
                    >
                      <span className="sr-only">Step </span>
                      {s.n}
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                      <s.icon className="h-4 w-4" strokeWidth={2} />
                    </div>
                  </div>
                  <h3 className="font-display text-base font-bold text-brand-ink">{s.title}</h3>
                  <p className="text-sm text-brand-ink/60 mt-2 leading-relaxed">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <BookButton>Plan your first visit</BookButton>
          </div>
        </div>
      </div>
      {/* melt straight into the dark membership strip below */}
      <WaveDivider fillClass="fill-[#1a1033]" className="bg-white -scale-x-100" />
    </section>
  );
}
