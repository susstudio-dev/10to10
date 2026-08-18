import {
  Palette,
  Music,
  Heart,
  Trophy,
  Sparkles,
  Calendar,
  Clock,
  Users,
  ShieldCheck,
  Utensils,
  Bus,
  Check,
  Sun,
  Pencil,
} from "lucide-react";
import { BookButton } from "@/components/book-button";
import {
  WaveDivider,
  Bunting,
  Tape,
  Float,
  SunDoodle,
  CloudDoodle,
  RainbowDoodle,
  PaperPlaneDoodle,
  StarDoodle,
} from "@/components/playful";
import { Reveal, PopIn } from "@/components/reveal";
import { PageHeroBackdrop } from "@/components/page-hero-backdrop";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { getContentMap, parseList } from "@/lib/content";
import type { ComponentType } from "react";

// Icon fields in DB-editable lists (activities, included) store a lucide
// icon NAME string (content must be JSON-serializable), resolved here.
const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  Heart,
  Palette,
  Music,
  Pencil,
  Trophy,
  Sparkles,
  Utensils,
  ShieldCheck,
  Users,
  Bus,
};
function resolveIcon(name: string) {
  return ICONS[name] ?? Sparkles;
}

export const metadata = pageMetadata({
  title: "Summer Camp Khammam 2026 — Ages 3-12",
  description:
    "Khammam's most loved summer camp for kids ages 3–12. Two months of dance, art, sports, brain games, yoga and more. Daily snacks, trained staff, 1:8 ratio. Limited seats.",
  path: "/summer-camp",
  keywords: [
    "summer camp Khammam",
    "kids summer camp 2027",
    "kids holiday camp Khammam",
    "summer activities for kids Khammam",
    "summer classes Khammam",
  ],
});

const activitiesDefault = [
  {
    icon: "Heart",
    title: "Meditation",
    desc: "Kid-friendly mindfulness, gentle breathing, and quiet-time stories to start the day grounded.",
    color: "bg-brand-mint/20 text-brand-turquoise",
  },
  {
    icon: "Palette",
    title: "Art & Craft",
    desc: "Painting, clay, origami, recycled crafts, and themed projects to spark creative confidence.",
    color: "bg-brand-primary/10 text-brand-primary",
  },
  {
    icon: "Music",
    title: "Storytelling & Dance",
    desc: "Two daily sessions — narrative play and freestyle moves with a closing showcase for parents.",
    color: "bg-brand-grape/10 text-brand-grape",
  },
  {
    icon: "Pencil",
    title: "Drawing",
    desc: "Mark-making, doodling, sketching, and turning imagination into colour on the page.",
    color: "bg-brand-turquoise/10 text-brand-turquoise",
  },
  {
    icon: "Trophy",
    title: "Fun Sessions & Games",
    desc: "Indoor sports, relay races, obstacle courses, team challenges and daily soft-play.",
    color: "bg-brand-orange/10 text-brand-orange",
  },
  {
    icon: "Sparkles",
    title: "Theme Celebrations",
    desc: "Pyjama day, superhero day, cultural day, water day, movie day and a grand finale.",
    color: "bg-brand-yellow/20 text-brand-orange",
  },
];

const scheduleDefault = [
  { time: "09:30 – 10:10", activity: "Meditation", tag: "Morning" },
  { time: "10:10 – 10:50", activity: "Art & Craft", tag: "Morning" },
  { time: "10:50 – 11:10", activity: "Snacks break", tag: "Break" },
  { time: "11:10 – 11:40", activity: "Storytelling / Dance", tag: "Morning" },
  { time: "11:40 – 12:30", activity: "Drawing", tag: "Morning" },
  { time: "12:30 – 14:00", activity: "Lunch break", tag: "Lunch" },
  { time: "14:00 – 14:40", activity: "Fun session (Games)", tag: "Noon" },
  { time: "14:40 – 15:20", activity: "Dance / Storytelling", tag: "Noon" },
  { time: "15:20 – 15:40", activity: "Snacks break", tag: "Break" },
  { time: "15:40 – 16:20", activity: "Phoenix", tag: "Noon" },
  { time: "16:20 – 17:00", activity: "Theme celebration", tag: "Noon" },
];

/* Playful timeline dots — one hand-tilted colour per schedule stop */
const dotStyles = [
  "bg-brand-yellow rotate-[-8deg]",
  "bg-brand-turquoise rotate-[6deg]",
  "bg-brand-orange rotate-[-6deg]",
  "bg-brand-grape rotate-[8deg]",
  "bg-brand-mint rotate-[-8deg]",
  "bg-brand-sky rotate-[6deg]",
];

const ageGroupsDefault = [
  {
    name: "Little Explorers",
    age: "3 – 5 yrs",
    desc: "Sensory play, basic craft, music & movement, gentle yoga and loads of free play.",
    color: "from-brand-yellow/30 to-brand-orange/10",
    ring: "border-brand-orange/30",
  },
  {
    name: "Young Adventurers",
    age: "6 – 9 yrs",
    desc: "Structured art, dance, brain games, team sports, coding intro and themed workshops.",
    color: "from-brand-primary/20 to-brand-grape/10",
    ring: "border-brand-primary/30",
    highlight: true,
  },
  {
    name: "Teen Creators",
    age: "10 – 12 yrs",
    desc: "Advanced craft, chess, cube solving, gaming challenges, photography basics and leadership games.",
    color: "from-brand-turquoise/25 to-brand-grape/10",
    ring: "border-brand-turquoise/30",
  },
];

const pricingDefault = [
  {
    name: "Weekly Pass",
    price: "₹2,499",
    period: "/ week",
    popular: false,
    perks: ["5 days of fun", "All activities", "Daily snacks", "Certificate"],
  },
  {
    name: "Monthly Pass",
    price: "₹8,999",
    period: "/ month",
    popular: true,
    perks: [
      "20 days of fun",
      "All activities + special days",
      "Daily snacks & one hot meal",
      "Camp kit (t-shirt, cap, bag)",
      "Certificate + photo album",
      "Free trial session",
    ],
  },
  {
    name: "Full Camp",
    price: "₹15,999",
    period: "/ 2 months",
    popular: false,
    perks: [
      "40 days of non-stop joy",
      "All monthly perks",
      "2 field trips",
      "Premium camp kit",
      "Grand finale performance",
      "10% sibling discount",
    ],
  },
];

const faqsDefault = [
  {
    q: "What are the camp dates?",
    a: "April 1 – May 31, 2026. Monday to Friday, 9:30 AM – 5 PM with a 90-minute lunch break (12:30 – 2 PM). Weekends off. You can join weekly, monthly, or for the full 2 months.",
  },
  {
    q: "Is food provided?",
    a: "Yes. All passes include a healthy snack break. The Monthly and Full Camp passes also include one hot meal daily. Please inform us of any allergies during enrollment.",
  },
  {
    q: "Is there transportation?",
    a: "Pick-up and drop-off can be arranged within a 5 km radius of Khammam for an additional fee of ₹999/month. Please confirm availability when booking.",
  },
  {
    q: "Can my child join mid-week?",
    a: "Absolutely! We prorate the weekly fee so your child can join any day. Reach out on WhatsApp and we'll get you sorted in minutes.",
  },
  {
    q: "Is a trial session available?",
    a: "Yes — we offer a free 2-hour trial session for Monthly and Full Camp enrollments so your child can meet the team before committing.",
  },
  {
    q: "How many kids per batch?",
    a: "We cap each age group at 20 kids with a 1:8 staff-to-child ratio, so every child gets personal attention and stays safe.",
  },
  {
    q: "What should my child bring?",
    a: "Just a water bottle, a change of clothes, and a spare pair of socks. We provide all art supplies, games, mats, and the camp kit.",
  },
  {
    q: "Are there any hidden fees?",
    a: "None. The listed price includes everything except optional transportation. Field trip costs are covered in the Full Camp pass.",
  },
];

const includedDefault = [
  { icon: "Utensils", label: "Snacks & meals" },
  { icon: "ShieldCheck", label: "Trained staff" },
  { icon: "Users", label: "1:8 ratio" },
  { icon: "Bus", label: "Pickup (optional)" },
];

export default async function SummerCampPage() {
  const c = await getContentMap("summer-camp");
  const badge = c["summer-camp.badge"] ?? "Summer Camp 2027 · waitlist open";
  const headingPre = c["summer-camp.heading_pre"] ?? "Where summer turns into";
  const headingEmphasis = c["summer-camp.heading_emphasis"] ?? "unforgettable";
  const subheading =
    c["summer-camp.subheading"] ??
    "Two months of meditation, art, dance, games, drawing and theme celebrations — for kids aged 3 to 12. Two-session days with a long lunch break, small batches, trained mentors.";

  const activities = parseList(c["summer-camp.activities"], activitiesDefault);
  const schedule = parseList(c["summer-camp.schedule"], scheduleDefault);
  const ageGroups = parseList(c["summer-camp.ageGroups"], ageGroupsDefault);
  const pricing = parseList(c["summer-camp.pricing"], pricingDefault);
  const faqs = parseList(c["summer-camp.faqs"], faqsDefault);
  const included = parseList(c["summer-camp.included"], includedDefault);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      {/* HERO — Summer Camp theme: sunlit outdoor (sun + grass), fades into body */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <PageHeroBackdrop tintFrom="from-[#fff7df]/85" objectPosition="center 58%" />
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          {/* sun in the top-right */}
          <div className="absolute -top-32 -right-24 w-[640px] h-[640px] rounded-full bg-brand-yellow/35 blur-3xl" />
          {/* coral warmth on the left */}
          <div className="absolute -top-10 -left-32 w-[520px] h-[520px] rounded-full bg-brand-orange/22 blur-3xl" />
          {/* mint grass underline at the bottom */}
          <div className="absolute -bottom-32 left-0 w-[80%] h-[440px] rounded-full bg-brand-mint/30 blur-3xl" />
          <div className="absolute -bottom-32 right-0 w-[60%] h-[380px] rounded-full bg-brand-turquoise/15 blur-3xl" />
          {/* a few sun-ray streaks */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(115deg, transparent, transparent 90px, rgba(255,184,61,0.7) 90px, rgba(255,184,61,0.7) 92px)",
            }}
          />
          {/* bottom fade to body cream */}
          <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-b from-transparent to-[#fdfbf7]" />
        </div>

        {/* crayon sunshine doodles */}
        <Float className="top-24 right-[8%] w-16 text-brand-orange opacity-70 hidden md:block" speed="spin">
          <SunDoodle className="w-full" />
        </Float>
        <Float className="top-48 right-[22%] w-14 text-brand-sky opacity-60 hidden lg:block" speed="slow">
          <CloudDoodle className="w-full" />
        </Float>
        <Float className="bottom-24 right-[10%] w-12 text-brand-turquoise opacity-60 hidden md:block" speed="wiggle">
          <PaperPlaneDoodle className="w-full" />
        </Float>

        <div className="container relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 chip bg-white/80 backdrop-blur border-2 border-brand-primary/20 font-bold text-brand-primary">
              <Sun className="h-3.5 w-3.5" />
              {badge}
            </span>
            <h1 className="heading-xl mt-5">
              {headingPre}{" "}
              <span className="gradient-text">{headingEmphasis}</span>.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-brand-ink/75 leading-relaxed max-w-2xl">
              {subheading}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <BookButton preset="Summer Camp" className="text-base">
                Join the 2027 waitlist
              </BookButton>
              <a href="#schedule" className="btn-ghost text-base">
                See the daily schedule
              </a>
            </div>

            {/* Quick facts row */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Calendar, label: "Apr 1 – May 31", sub: "2026" },
                { icon: Clock, label: "9:30 AM – 5 PM", sub: "Mon – Fri" },
                { icon: Users, label: "Ages 3 – 12", sub: "3 batches" },
                { icon: ShieldCheck, label: "Limited seats", sub: "Waitlist first" },
              ].map((f, i) => (
                <div
                  key={f.label}
                  className={`rounded-2xl bg-white/80 backdrop-blur border-2 border-white p-4 shadow-lifted transition hover:rotate-0 ${
                    i % 2 ? "rotate-[1deg]" : "rotate-[-1deg]"
                  }`}
                >
                  <f.icon className="h-5 w-5 text-brand-primary mb-2" />
                  <div className="font-bold text-sm">{f.label}</div>
                  <div className="text-xs text-brand-ink/55 mt-0.5">{f.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section className="section relative">
        <Float className="top-14 left-[4%] w-16 opacity-70 hidden md:block" speed="slow">
          <RainbowDoodle className="w-full" />
        </Float>
        <Float className="top-24 right-[5%] w-12 text-brand-sky opacity-60 hidden md:block" speed="fast">
          <CloudDoodle className="w-full" />
        </Float>
        <div className="container">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow">
              <span className="h-px w-8 bg-brand-primary" /> What's inside
            </span>
            <h2 className="heading-lg mt-4">
              Six activity tracks. <span className="gradient-text">Zero boring days.</span>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {activities.map((a, i) => {
              const Icon = resolveIcon(a.icon);
              return (
                <Reveal key={a.title} delay={Math.min(i * 0.06, 0.3)}>
                  <div
                    className={`group h-full rounded-3xl border-2 border-brand-ink/5 bg-white p-7 hover:-translate-y-1 hover:shadow-lifted transition hover:rotate-0 ${
                      i % 3 === 0 ? "rotate-[-1deg]" : i % 3 === 2 ? "rotate-[1deg]" : ""
                    }`}
                  >
                    <div
                      className={`inline-flex w-12 h-12 rounded-2xl items-center justify-center transition group-hover:rotate-6 group-hover:scale-110 ${a.color}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-xl font-bold mt-5">{a.title}</h3>
                    <p className="text-sm text-brand-ink/70 mt-2 leading-relaxed">
                      {a.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* AGE GROUPS */}
      <WaveDivider fillClass="fill-white/50" />
      <section className="section bg-white/50 relative">
        <Float className="top-16 right-[6%] w-10 text-brand-yellow opacity-70 hidden md:block" speed="wiggle">
          <StarDoodle className="w-full" />
        </Float>
        <div className="container">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow">
              <span className="h-px w-8 bg-brand-primary" /> Age-based batches
            </span>
            <h2 className="heading-lg mt-4">
              A camp that grows with your child
            </h2>
            <p className="mt-4 text-brand-ink/65">
              Every age group gets its own curriculum, mentor, and pace — because
              a 4-year-old and a 10-year-old need very different kinds of fun.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {ageGroups.map((g, i) => (
              <Reveal key={g.name} delay={Math.min(i * 0.08, 0.3)}>
                <div
                  className={`relative h-full rounded-3xl border-2 p-8 bg-gradient-to-br transition ${g.color} ${g.ring} ${
                    g.highlight
                      ? "md:scale-105 shadow-glow"
                      : `hover:rotate-0 ${i === 0 ? "rotate-[-1.5deg]" : "rotate-[1.5deg]"}`
                  }`}
                >
                  {g.highlight && (
                    <PopIn delay={0.25} className="absolute -top-3 inset-x-0 flex justify-center">
                      <span className="chip bg-brand-primary text-white font-bold">
                        Most popular
                      </span>
                    </PopIn>
                  )}
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-ink/55">
                    {g.age}
                  </div>
                  <h3 className="font-display text-2xl font-bold mt-2">{g.name}</h3>
                  <p className="text-sm text-brand-ink/75 mt-3 leading-relaxed">
                    {g.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <WaveDivider flip fillClass="fill-white/50" />

      {/* DAILY SCHEDULE */}
      <section id="schedule" className="section">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <Reveal>
                <span className="eyebrow">A day at camp <span aria-hidden="true">☀️</span></span>
                <h2 className="heading-lg mt-4">
                  Two sessions of <span className="gradient-text">pure magic</span>
                </h2>
                <p className="mt-5 text-brand-ink/70 leading-relaxed">
                  Mornings focus on meditation, art, storytelling and drawing.
                  Afternoons bring games, dance, Phoenix and theme celebrations.
                  Drop off at 9:30 AM, lunch break 12:30–2 PM, pick up at 5 PM.
                </p>
              </Reveal>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {included.map((i) => {
                  const Icon = resolveIcon(i.icon);
                  return (
                    <div
                      key={i.label}
                      className="flex items-center gap-3 rounded-2xl bg-white border-2 border-brand-ink/5 p-3"
                    >
                      <Icon className="h-5 w-5 text-brand-primary shrink-0 hover-wiggle" />
                      <span className="text-sm font-semibold">{i.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-3">
              <ol className="relative border-l-2 border-dashed border-brand-primary/30 ml-4 space-y-5">
                {schedule.map((s, i) => (
                  <li key={s.time} className="relative pl-6">
                    <span
                      aria-hidden
                      className={`absolute -left-[11px] top-2 w-5 h-5 rounded-[35%] ring-4 ring-white ${dotStyles[i % dotStyles.length]}`}
                    />
                    <Reveal delay={Math.min(i * 0.05, 0.3)}>
                      <div className="rounded-2xl bg-white border-2 border-brand-ink/5 p-5 hover:border-brand-primary/30 transition">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-xs font-bold text-brand-primary">
                            {s.time}
                          </div>
                          <span className="chip bg-brand-ink/5 text-brand-ink/60">
                            {s.tag}
                          </span>
                        </div>
                        <div className="font-semibold mt-1">{s.activity}</div>
                      </div>
                    </Reveal>
                    {i === 0 && (
                      <>
                        <span className="hidden lg:block absolute -left-20 top-3 text-xs font-bold text-brand-primary">
                          START
                        </span>
                        <Float className="-left-[4.5rem] top-9 w-9 text-brand-yellow opacity-70 hidden lg:block" speed="spin">
                          <SunDoodle className="w-full" />
                        </Float>
                      </>
                    )}
                    {i === schedule.length - 1 && (
                      <Float className="-left-16 top-4 w-7 text-brand-grape opacity-60 hidden lg:block" speed="wiggle">
                        <StarDoodle className="w-full" />
                      </Float>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <WaveDivider fillClass="fill-[#1a1033]" />
      <section className="section bg-brand-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-dark opacity-50" />
        <Float className="top-20 left-[5%] w-14 text-white/30 hidden md:block" speed="spin">
          <SunDoodle className="w-full" />
        </Float>
        <Float className="top-36 right-[7%] w-12 text-white/25 hidden md:block" speed="slow">
          <CloudDoodle className="w-full" />
        </Float>
        <Float className="bottom-24 left-[10%] w-10 text-white/25 hidden lg:block" speed="wiggle">
          <PaperPlaneDoodle className="w-full" />
        </Float>
        <div className="container relative">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">
              Pricing
            </span>
            <h2 className="heading-lg mt-4">
              Pick a pass.{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-primary">
                Pack the sunscreen.
              </span>
            </h2>
            <div aria-hidden className="flex justify-center mt-4">
              <Bunting />
            </div>
            <p className="mt-4 text-white/70">
              All passes include every activity, daily snacks, trained mentors,
              and access to the full 10to10 Adventures playground. 2026-season
              pricing shown — 2027 rates are announced with the dates, and
              waitlisted families lock in early-bird prices.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map((p, i) => (
              <Reveal key={p.name} delay={Math.min(i * 0.08, 0.3)}>
                <div
                  className={`relative h-full rounded-3xl p-8 border ${
                    p.popular
                      ? "bg-gradient-to-br from-brand-primary to-brand-grape border-transparent shadow-glow md:scale-105"
                      : "glass-dark"
                  }`}
                >
                  {p.popular && (
                    <>
                      <Tape className="-top-3 -left-4 -rotate-12" />
                      <PopIn delay={0.25} className="absolute -top-3 inset-x-0 flex justify-center">
                        <span className="chip bg-brand-yellow text-brand-ink font-bold">
                          Best value
                        </span>
                      </PopIn>
                    </>
                  )}
                  <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold">
                    {p.price}
                  </span>
                  <span className="text-white/60 text-sm">{p.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex gap-3 text-sm">
                      <Check className="h-5 w-5 shrink-0 text-brand-yellow" />
                      <span className="text-white/85">{perk}</span>
                    </li>
                  ))}
                </ul>
                <BookButton
                  preset="Summer Camp"
                  variant={p.popular ? "white" : "ghost"}
                  className="w-full mt-8"
                >
                    Reserve {p.name}
                  </BookButton>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="text-center text-white/50 text-sm mt-8">
            Sibling discount: 10% off the second child. Members get an additional
            discount — see the memberships page for details.
          </p>
        </div>
      </section>
      <WaveDivider flip fillClass="fill-[#1a1033]" />

      {/* FAQ */}
      <section className="section">
        <div className="container max-w-3xl">
          <Reveal className="text-center mb-12">
            <span className="eyebrow">
              <span className="h-px w-8 bg-brand-primary" /> Parent questions
            </span>
            <h2 className="heading-lg mt-4">Everything parents ask us</h2>
          </Reveal>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={i} delay={Math.min(i * 0.04, 0.24)}>
                <details
                  className={`group bg-white border-2 border-brand-ink/5 hover:border-brand-primary/20 transition overflow-hidden ${
                    i % 2 ? "crayon-card-alt" : "crayon-card"
                  }`}
                >
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-semibold">
                    <span>{f.q}</span>
                    <span className="w-8 h-8 rounded-full bg-brand-ink/5 flex items-center justify-center text-xl group-open:rotate-45 transition shrink-0">
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-5 text-brand-ink/70 leading-relaxed">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="section">
        <div className="container">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-primary via-brand-primary-deep to-brand-grape p-10 md:p-16 text-white text-center shadow-glow">
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-brand-yellow/30 blur-3xl" />
            <Float className="top-10 left-[7%] w-12 text-white/30 hidden md:block" speed="slow">
              <CloudDoodle className="w-full" />
            </Float>
            <Float className="bottom-10 right-[8%] w-10 text-white/30 hidden md:block" speed="wiggle">
              <PaperPlaneDoodle className="w-full" />
            </Float>
            <div className="relative max-w-2xl mx-auto">
              <div className="text-5xl mb-4" aria-hidden="true">☀️</div>
              <h2 className="heading-lg">
                The 2026 camp sold out. 2027 will too.
              </h2>
              <div aria-hidden className="flex justify-center mt-3">
                <Bunting />
              </div>
              <p className="mt-4 text-white/85">
                This year's camp filled up 3 weeks before the start date. Join
                the 2027 waitlist now — waitlisted families get first pick of
                batches and early-bird pricing before public booking opens.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <BookButton preset="Summer Camp" variant="white">
                  Join the waitlist — it's free
                </BookButton>
                <a href="tel:+919256787788" className="btn-ghost bg-white/10 !text-white !border-white/30">
                  Talk to us first
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
