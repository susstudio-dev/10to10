"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Tape, Float, HeartDoodle, SmileDoodle } from "@/components/playful";

const tapes = [
  "-top-3 left-7 -rotate-6",
  "-top-3 right-8 rotate-3",
  "-top-3 left-1/2 -translate-x-1/2 rotate-2",
];

const tilts = [-1.4, 1.2, -1];

const items = [
  {
    quote:
      "My daughter begs to come back every weekend. The staff know her name, the place is spotless, and she genuinely learns while she plays.",
    name: "Priya R.",
    role: "Parent of 4-year-old",
  },
  {
    quote:
      "Hosted my son's 6th birthday in the party room with the theatre add-on. 22 kids, zero stress, all memories. Best decision ever.",
    name: "Karthik M.",
    role: "Dad & repeat customer",
  },
  {
    quote:
      "The play school is Montessori done right — open-door, warm, thoughtful. Teachers actually care about each kid individually.",
    name: "Sushma V.",
    role: "Mom of twins",
  },
];

export function Testimonials() {
  return (
    <section className="section relative">
      <Float speed="wiggle" className="top-14 right-[6%] w-9 text-brand-grape opacity-60 hidden md:block">
        <HeartDoodle className="w-full" />
      </Float>
      <Float speed="slow" className="bottom-12 left-[4%] w-9 text-brand-yellow opacity-70 hidden md:block">
        <SmileDoodle className="w-full" />
      </Float>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-12 md:mb-16"
        >
          <span className="eyebrow">Testimonials</span>
          <h2 className="heading-lg mt-3">
            Trusted by families<br className="hidden md:inline" /> across <span className="accent">Khammam.</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-4">
          {items.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0, rotate: tilts[i % tilts.length] }}
              whileHover={{ rotate: 0, y: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="card p-7 relative"
            >
              <Tape className={tapes[i % tapes.length]} />
              <div className="flex gap-0.5 text-amber-500 mb-5">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="text-brand-ink/85 leading-relaxed text-[15px]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 pt-5 border-t border-black/[0.07]">
                <div className="font-semibold text-sm text-brand-ink">{t.name}</div>
                <div className="text-xs text-brand-ink/50 mt-0.5">{t.role}</div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
