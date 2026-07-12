import type { Metadata } from "next";
import {
  programs,
  curriculum,
  dailySchedule,
  fees,
  admissionSteps,
  whyUs,
  playSchoolFaqs,
  parentStories,
} from "@/content/playschool";
import { AdmissionForm } from "@/components/admission-form";
import { BookButton } from "@/components/book-button";
import { PlaySchoolIllustration } from "@/components/playschool-illustration";
import { Star, Check, ArrowRight, Clock, Users, Calendar } from "lucide-react";
import {
  BlocksIcon,
  PencilIcon,
  PaletteIcon,
  YogaIcon,
  HeartIcon,
  BookIcon,
  ShieldIcon,
  UsersIcon,
  UnderlineSquiggle,
} from "@/components/vectors";
import {
  WaveDivider,
  Bunting,
  Tape,
  Float,
  SunDoodle,
  CloudDoodle,
  AbcBlocksDoodle,
  CrayonDoodle,
  PaperPlaneDoodle,
  StarDoodle,
  HeartDoodle,
  BalloonDoodle,
} from "@/components/playful";
import { Reveal, PopIn } from "@/components/reveal";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Play School in Khammam — Montessori Preschool | Admissions Open 2026–27",
  description:
    "Looking for a play school in Khammam? 10to10 Adventures is a Montessori-inspired preschool for ages 1.5–5.5 — trained teachers, small class ratios (1:6–1:10), daily reports to your phone, CCTV, and a free trial day. Admissions open for 2026–27.",
  keywords: [
    "play school in Khammam",
    "play school Khammam",
    "preschool Khammam",
    "Montessori Khammam",
    "best play school Khammam",
    "kindergarten Khammam admission 2026-27",
    "nursery Khammam",
    "playgroup Khammam",
    "LKG UKG admission Khammam",
  ],
  openGraph: {
    title: "Play School in Khammam — Admissions Open 2026–27 | 10to10 Adventures",
    description:
      "Montessori-inspired preschool in Khammam. Small class ratios, trained teachers, daily reports, free trial day.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/play-school" },
};

const curriculumIcons = [
  { Icon: BlocksIcon, color: "bg-amber-100 text-amber-700" },
  { Icon: BookIcon, color: "bg-rose-100 text-rose-700" },
  { Icon: UsersIcon, color: "bg-teal-100 text-teal-700" },
  { Icon: YogaIcon, color: "bg-indigo-100 text-indigo-700" },
  { Icon: PaletteIcon, color: "bg-purple-100 text-purple-700" },
  { Icon: HeartIcon, color: "bg-pink-100 text-pink-700" },
];

// Playful tint rotations for clock tiles & step-number badges
const scheduleTints = [
  "bg-brand-yellow/40 text-brand-ink",
  "bg-brand-turquoise/20 text-brand-turquoise",
  "bg-brand-grape/15 text-brand-grape",
  "bg-brand-orange/20 text-brand-orange",
];

const stepTints = [
  "bg-brand-yellow/50 text-brand-ink",
  "bg-brand-turquoise/25 text-brand-primary",
  "bg-brand-grape/20 text-brand-grape",
  "bg-brand-orange/25 text-brand-orange",
];

const preschoolJsonLd = {
  "@context": "https://schema.org",
  "@type": "Preschool",
  "@id": `${siteConfig.url}/play-school#preschool`,
  name: "10to10 Adventures Play School",
  description:
    "Montessori-inspired play school in Khammam offering Playgroup, Nursery, LKG, and UKG programs for children aged 1.5 to 5.5 years.",
  url: `${siteConfig.url}/play-school`,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mamatha College Road, Above Just Bake, Near SBI Bank",
    addressLocality: "Khammam",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  areaServed: { "@type": "City", name: "Khammam" },
  openingHours: "Mo-Fr 09:00-12:30",
  hasCredential: "Montessori-certified educators",
  educationalLevel: "Preschool",
  parentOrganization: { "@id": `${siteConfig.url}/#business` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: playSchoolFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function PlaySchoolPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(preschoolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* HERO — Play School theme: warm butter-cream + scholarly accents, fades into body */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          {/* layered theme wash */}
          <div className="absolute -top-32 -left-32 w-[640px] h-[640px] rounded-full bg-brand-yellow/22 blur-3xl" />
          <div className="absolute -top-20 right-0 w-[520px] h-[520px] rounded-full bg-brand-grape/14 blur-3xl" />
          <div className="absolute top-40 left-1/3 w-[420px] h-[420px] rounded-full bg-brand-primary/8 blur-3xl" />
          {/* notebook-line underlay (subtle) */}
          <div
            className="absolute inset-0 opacity-[0.05] mix-blend-multiply"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 31px, #2c3873 31px, #2c3873 32px)",
            }}
          />
          {/* fade-out at the bottom so the hero blends into the page cream */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#fdfbf7]" />
        </div>

        {/* classroom corner doodles */}
        <Float className="top-24 right-[7%] w-12 text-brand-yellow opacity-70 hidden md:block" speed="slow">
          <SunDoodle className="w-full" />
        </Float>
        <Float className="bottom-12 left-[4%] w-14 text-brand-grape opacity-50 hidden lg:block" speed="wiggle">
          <AbcBlocksDoodle className="w-full" />
        </Float>

        <div className="container relative grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <PopIn>
              <span className="inline-flex items-center gap-2 rounded-full bg-white border border-black/[0.08] px-4 py-1.5 text-xs font-semibold text-brand-ink/70">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-brand-primary animate-ping opacity-60" />
                  <span className="relative h-2 w-2 rounded-full bg-brand-primary" />
                </span>
                Admissions open for 2026–27 · limited seats
              </span>
            </PopIn>
            <h1 className="heading-xl mt-5">
              Where little learners{" "}
              <span className="relative inline-block">
                <span className="gradient-text">find their spark</span>
                <UnderlineSquiggle className="absolute -bottom-2 left-0 w-full h-3 text-brand-yellow" />
              </span>
              .
            </h1>
            <p className="mt-6 text-base md:text-lg text-brand-ink/65 leading-relaxed max-w-xl">
              A Montessori-inspired play school in the heart of Khammam.
              Trained teachers, small class ratios, daily reports to your
              phone, and an open-door policy that means you can drop in any
              time.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#admission" className="btn-primary">
                Inquire about admission <ArrowRight className="h-4 w-4" />
              </a>
              <BookButton preset="Play School" variant="ghost">
                Book a campus visit
              </BookButton>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs font-medium text-brand-ink/50">
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-brand-primary" />
                1:6 – 1:10 child–teacher ratio
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldIcon className="h-4 w-4 text-brand-primary" />
                CCTV + biometric entry
              </span>
              <span className="inline-flex items-center gap-2">
                <Star className="h-4 w-4 text-brand-primary" />
                Montessori-certified teachers
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <PlaySchoolIllustration />
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="section relative">
        <Float className="top-16 right-[6%] w-16 text-brand-sky opacity-70 hidden md:block" speed="slow">
          <CloudDoodle className="w-full" />
        </Float>
        <div className="container">
          <Reveal className="max-w-xl mb-12">
            <span className="eyebrow">Our programs</span>
            <h2 className="heading-lg mt-3">
              A program for every <span className="accent">tiny milestone.</span>
            </h2>
            <p className="mt-4 text-brand-ink/60 leading-relaxed">
              Four progressive stages from confident toddler to school-ready learner.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {programs.map((p, i) => (
              <Reveal key={p.slug} delay={Math.min(i * 0.06, 0.3)} className="h-full">
                <div
                  className={`card card-hover p-6 h-full transition-transform ${
                    i % 2 ? "rotate-[1.2deg]" : "rotate-[-1.2deg]"
                  } hover:rotate-0`}
                >
                  <div className={`text-xs font-bold uppercase tracking-widest ${p.accent}`}>
                    {p.age}
                  </div>
                  <h3 className="font-display text-xl font-bold text-brand-ink mt-1">
                    {p.name}
                  </h3>
                  <p className="text-sm text-brand-ink/65 mt-3 leading-relaxed">{p.desc}</p>
                  <div className="mt-5 pt-5 border-t border-black/[0.07] grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <div className="text-brand-ink/45 font-medium">Timing</div>
                      <div className="font-semibold text-brand-ink mt-0.5">{p.duration}</div>
                    </div>
                    <div>
                      <div className="text-brand-ink/45 font-medium">Ratio</div>
                      <div className="font-semibold text-brand-ink mt-0.5">{p.ratio}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <WaveDivider fillClass="fill-white" />
      <section className="section bg-white relative">
        <Float className="top-16 right-[8%] w-10 text-brand-turquoise opacity-60 hidden lg:block" speed="fast">
          <PencilIcon className="w-full h-auto" />
        </Float>
        <Float className="bottom-10 right-[5%] w-16 text-brand-orange opacity-60 hidden md:block" speed="wiggle">
          <CrayonDoodle className="w-full" />
        </Float>
        <div className="container">
          <Reveal className="max-w-xl mb-12">
            <span className="eyebrow">Curriculum</span>
            <h2 className="heading-lg mt-3">
              Six pillars of <span className="accent">whole-child development.</span>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {curriculum.map((c, i) => {
              const { Icon, color } = curriculumIcons[i];
              return (
                <Reveal key={c.title} delay={Math.min(i * 0.06, 0.3)} className="h-full">
                  <div className="card card-hover p-6 h-full">
                    <div className={`inline-flex w-11 h-11 rounded-xl items-center justify-center hover-wiggle ${color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-brand-ink mt-5">
                      {c.title}
                    </h3>
                    <p className="text-sm text-brand-ink/60 mt-2 leading-relaxed">{c.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <WaveDivider fillClass="fill-white" flip />

      {/* A DAY AT 10TO10 */}
      <section className="section">
        <div className="container">
          <Reveal className="max-w-xl mb-12">
            <span className="eyebrow">A day at 10to10 <span aria-hidden="true">⏰</span></span>
            <h2 className="heading-lg mt-3">
              Structure with <span className="accent">space to play.</span>
            </h2>
          </Reveal>
          <div className="relative">
            {/* hand-drawn dashed thread linking the day's moments */}
            <svg
              aria-hidden
              viewBox="0 0 1200 40"
              preserveAspectRatio="none"
              fill="none"
              className="pointer-events-none absolute -top-9 left-2 w-[calc(100%-1rem)] h-9 text-brand-turquoise/60 hidden md:block"
            >
              <path
                d="M0 30 C 150 4, 300 36, 450 18 C 600 2, 750 34, 900 16 C 1020 3, 1120 26, 1200 14"
                stroke="currentColor"
                strokeWidth="3"
                className="crayon-dash"
              />
            </svg>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {dailySchedule.map((s, i) => (
                <Reveal key={i} delay={Math.min(i * 0.05, 0.3)} className="h-full">
                  <div className="card p-5 flex gap-4 items-start h-full">
                    <div
                      className={`shrink-0 w-12 h-12 rounded-full rotate-[-6deg] grid place-items-center ${scheduleTints[i % 4]}`}
                    >
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-brand-primary">
                        {s.time}
                      </div>
                      <div className="font-medium text-brand-ink mt-1 text-sm">{s.activity}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEES */}
      <WaveDivider fillClass="fill-white" />
      <section className="section bg-white">
        <div className="container">
          <Reveal className="max-w-xl mb-12">
            <span className="eyebrow">Fees & schedule</span>
            <h2 className="heading-lg mt-3">
              Transparent pricing, <span className="accent">zero surprises.</span>
            </h2>
            <p className="mt-4 text-brand-ink/60 leading-relaxed">
              All fees include curriculum materials, daily snack, uniform, and access
              to all 7 zones during play hours.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-4 max-w-5xl">
            {fees.map((f, i) => (
              <Reveal key={i} delay={Math.min(i * 0.08, 0.3)} className="h-full">
              <div
                className={`relative rounded-2xl p-7 h-full transition ${
                  f.popular
                    ? "bg-brand-ink text-white border border-brand-primary/40 ring-1 ring-brand-primary/30 rotate-[1.2deg] hover:rotate-0"
                    : "card"
                }`}
              >
                {f.popular && (
                  <>
                    <Tape className="-top-3 right-6 rotate-6" />
                    <span className="absolute -top-2.5 left-6 chip bg-brand-primary text-white !text-[11px]">
                      Best value
                    </span>
                  </>
                )}
                <div className={`text-xs font-bold uppercase tracking-widest ${f.popular ? "text-brand-primary" : "text-brand-ink/45"}`}>
                  {f.plan}
                </div>
                <div className={`font-display text-base mt-1 ${f.popular ? "text-white/80" : "text-brand-ink/70"}`}>
                  {f.program}
                </div>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className={`font-display text-4xl font-bold tabular-nums ${f.popular ? "text-white" : "text-brand-ink"}`}>
                    {f.price}
                  </span>
                  <span className={`text-sm ${f.popular ? "text-white/55" : "text-brand-ink/50"}`}>
                    {f.period}
                  </span>
                </div>
                <p className={`text-xs mt-3 ${f.popular ? "text-white/65" : "text-brand-ink/55"}`}>
                  {f.note}
                </p>
              </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-xs text-brand-ink/50">
            Sibling discount: 10% off second child. Annual fees can be paid in two installments.
          </p>
        </div>
      </section>
      <WaveDivider fillClass="fill-white" flip />

      {/* ADMISSION STEPS */}
      <section className="section relative">
        <Float className="top-16 right-[7%] w-14 text-brand-turquoise opacity-60 hidden md:block" speed="fast">
          <PaperPlaneDoodle className="w-full" />
        </Float>
        <div className="container">
          <Reveal className="max-w-xl mb-12">
            <span className="eyebrow">Admission process</span>
            <h2 className="heading-lg mt-3">
              From inquiry to enrollment <span className="accent">in 4 steps.</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-4">
            {admissionSteps.map((s, i) => (
              <Reveal key={s.n} delay={Math.min(i * 0.07, 0.3)} className="h-full">
                <div className="card card-hover p-6 h-full">
                  <div
                    className={`inline-grid w-11 h-11 place-items-center rounded-full rotate-[-4deg] font-display text-xl font-bold tabular-nums ${stepTints[i % 4]}`}
                  >
                    {s.n}
                  </div>
                  <h3 className="font-display text-lg font-bold text-brand-ink mt-3">
                    {s.title}
                  </h3>
                  <p className="text-sm text-brand-ink/60 mt-2 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <WaveDivider fillClass="fill-white" />
      <section className="section bg-white relative">
        <Float className="top-14 right-[6%] w-12 text-brand-grape opacity-50 hidden md:block" speed="slow">
          <HeartDoodle className="w-full" />
        </Float>
        <div className="container">
          <Reveal className="max-w-xl mb-12">
            <span className="eyebrow">Why parents choose us</span>
            <h2 className="heading-lg mt-3">
              Built for <span className="accent">trust.</span>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyUs.map((r, i) => (
              <Reveal key={r.title} delay={Math.min(i * 0.06, 0.3)} className="h-full">
                <div className="group card card-hover p-6 h-full">
                  <div className="inline-flex w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary items-center justify-center transition-transform group-hover:rotate-6 group-hover:scale-110">
                    <Check className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-brand-ink mt-5">
                    {r.title}
                  </h3>
                  <p className="text-sm text-brand-ink/60 mt-2 leading-relaxed">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <WaveDivider fillClass="fill-white" flip />

      {/* PARENT STORIES */}
      <section className="section">
        <div className="container">
          <Reveal className="max-w-xl mb-12">
            <span className="eyebrow">Parent stories</span>
            <h2 className="heading-lg mt-3">
              Trusted by Khammam <span className="accent">families.</span>
            </h2>
            <Bunting className="mt-4" />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-4">
            {parentStories.map((s, i) => (
              <Reveal key={s.name} delay={Math.min(i * 0.08, 0.3)} className="h-full">
                <blockquote
                  className={`relative card p-7 h-full transition-transform ${
                    i % 2 ? "rotate-[1deg]" : "rotate-[-1deg]"
                  } hover:rotate-0`}
                >
                  <Tape
                    className={`-top-3 left-1/2 -translate-x-1/2 ${i % 2 ? "rotate-2" : "-rotate-3"}`}
                  />
                  <div className="flex gap-0.5 text-brand-primary mb-5">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-brand-ink/85 leading-relaxed text-[15px]">
                    &ldquo;{s.quote}&rdquo;
                  </p>
                  <footer className="mt-6 pt-5 border-t border-black/[0.07]">
                    <div className="font-semibold text-sm text-brand-ink">{s.name}</div>
                    <div className="text-xs text-brand-ink/50 mt-0.5">{s.program}</div>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + ADMISSION FORM SIDE BY SIDE */}
      <WaveDivider fillClass="fill-white" />
      <section id="admission" className="section bg-white scroll-mt-24">
        <div className="container grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">Common questions</span>
              <h2 className="heading-lg mt-3">
                Before you <span className="accent">enroll.</span>
              </h2>
            </Reveal>
            <div className="mt-8 space-y-2.5">
              {playSchoolFaqs.map((f, i) => (
                <details
                  key={i}
                  className={`group ${
                    i % 2 ? "crayon-card-alt" : "crayon-card"
                  } bg-brand-cloud border border-black/[0.07] hover:border-black/15 transition overflow-hidden`}
                >
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-semibold text-sm text-brand-ink">
                    <span>{f.q}</span>
                    <span className="w-7 h-7 rounded-full bg-white border border-black/10 flex items-center justify-center text-lg group-open:rotate-45 transition shrink-0 text-brand-ink/60">
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-5 text-sm text-brand-ink/65 leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <AdmissionForm />
              <div className="mt-4 text-center text-xs text-brand-ink/55">
                Prefer to talk?{" "}
                <a href={siteConfig.phoneHref} className="text-brand-primary font-semibold hover:underline">
                  Call {siteConfig.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <WaveDivider fillClass="fill-white" flip />

      {/* LOCAL SEO — why Khammam parents pick us */}
      <section className="section pb-0">
        <div className="container max-w-3xl">
          <Reveal>
            <span className="eyebrow">Play school in Khammam</span>
            <h2 className="heading-lg mt-3">
              Searching for the best <span className="gradient-text">play school in Khammam?</span>
            </h2>
          </Reveal>
          <div className="mt-6 space-y-4 text-brand-ink/70 leading-relaxed">
            <p>
              10to10 Adventures Play School sits on Mamatha College Road in the
              heart of Khammam — a Montessori-inspired preschool with Playgroup,
              Nursery, LKG and UKG programs for children aged 18 months to 5.5
              years. Unlike standalone nurseries, our classrooms live inside
              Khammam&apos;s biggest indoor family playground, so learning days end
              with supervised play in a 2,400 sq ft soft-play arena.
            </p>
            <p>
              Every educator is Montessori- or ECE-certified, classes run on
              small ratios (1:6 for toddlers, up to 1:10 in KG), and parents get
              photo reports on their phone before pickup. Visit us any time —
              our open-door policy means no appointment needed — or book a{" "}
              <a href="#admission" className="text-brand-primary font-semibold hover:underline">
                free trial day
              </a>{" "}
              and let your child decide.
            </p>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="section">
        <div className="container">
          <div className="rounded-[2.5rem] bg-brand-ink p-10 md:p-14 text-white text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-primary/15 blur-3xl pointer-events-none" />
            <Float className="top-10 left-[8%] w-10 text-white/25 hidden md:block" speed="slow">
              <StarDoodle className="w-full" />
            </Float>
            <Float className="bottom-12 right-[9%] w-9 text-white/20 hidden md:block" speed="wiggle">
              <BalloonDoodle className="w-full" />
            </Float>
            <div className="relative max-w-2xl mx-auto">
              <Bunting className="mx-auto mb-5" />
              <span className="eyebrow text-brand-primary">First trial day on us</span>
              <h2 className="heading-lg mt-4">
                The best way to know is to <span className="text-brand-primary">visit.</span>
              </h2>
              <p className="mt-5 text-white/65 leading-relaxed">
                Bring your child for a free trial day. Watch them play, meet our
                teachers, ask everything. No commitment, no pressure.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <a href="#admission" className="btn-primary">
                  Inquire now <Calendar className="h-4 w-4" />
                </a>
                <BookButton preset="Play School" variant="ghost" className="!bg-white/5 !text-white !border-white/20 hover:!bg-white/10 hover:!border-white/30">
                  WhatsApp us instead
                </BookButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
