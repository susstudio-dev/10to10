"use client";

import { motion } from "framer-motion";
import { ShieldCheck, HeartHandshake, Sparkles, Users2, Wifi, Coffee } from "lucide-react";
import { Bunting, Float, SunDoodle, PuzzleDoodle } from "@/components/playful";

const tints = [
  "bg-brand-primary/10 text-brand-primary",
  "bg-brand-turquoise/15 text-teal-600",
  "bg-brand-yellow/30 text-amber-600",
  "bg-brand-grape/15 text-violet-600",
  "bg-brand-orange/15 text-orange-600",
  "bg-brand-sky/25 text-sky-700",
];

const reasons = [
  {
    icon: ShieldCheck,
    title: "Sanitised every hour",
    desc: "Every play surface, ball pit and game controller wiped down on the hour.",
  },
  {
    icon: HeartHandshake,
    title: "Trained, friendly staff",
    desc: "Every team member is trained in child safety, first aid and engagement.",
  },
  {
    icon: Users2,
    title: "1:8 supervision ratio",
    desc: "One staff member for every eight children — no child goes unseen.",
  },
  {
    icon: Sparkles,
    title: "Fresh programming monthly",
    desc: "New themes, games and events every month so repeat visits stay novel.",
  },
  {
    icon: Coffee,
    title: "Parent lounge",
    desc: "Comfortable seating, complimentary tea and Wi-Fi — breathe and recharge.",
  },
  {
    icon: Wifi,
    title: "No hidden costs",
    desc: "Wi-Fi, water, invitation cards and trial sessions included with every membership.",
  },
];

export function WhyUs() {
  return (
    <section className="section relative">
      <Float speed="slow" className="top-16 right-[5%] w-10 text-brand-yellow opacity-70 hidden md:block">
        <SunDoodle className="w-full" />
      </Float>
      <Float speed="wiggle" className="bottom-14 left-[3%] w-9 text-brand-grape opacity-50 hidden lg:block">
        <PuzzleDoodle className="w-full" />
      </Float>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-12 md:mb-16"
        >
          <span className="eyebrow">Why families choose us</span>
          <h2 className="heading-lg mt-3">
            Built around <span className="accent">what matters.</span>
          </h2>
          <p className="mt-5 text-brand-ink/60 text-sm md:text-base leading-relaxed">
            A safe, well-run, thoughtfully-staffed venue that parents trust and children love.
          </p>
          <Bunting className="mt-6" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 0.8 : -0.8 }}
              whileHover={{ rotate: 0, y: -4 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className={`card card-hover p-6 group ${i % 2 ? "crayon-card-alt" : "crayon-card"}`}
            >
              <div
                className={`inline-flex w-10 h-10 rounded-xl items-center justify-center transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 ${tints[i % tints.length]}`}
              >
                <r.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="font-display text-lg font-bold mt-5 text-brand-ink">{r.title}</h3>
              <p className="text-sm text-brand-ink/60 mt-2 leading-relaxed">
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
