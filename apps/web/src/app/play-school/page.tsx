import type { Metadata } from "next";
import {
  programs,
  curriculum,
  dailySchedule,
  snacksMenu,
  events,
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
import { siteConfig } from "@/lib/utils";
import Script from "next/script";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Play School in Khammam — Play-Based Preschool | Admissions Open 2026",
  description:
    "A play-first preschool in Khammam where children learn through play, not rote teaching. No worksheets, no homework. Trained teachers, 1:8 ratio, free trial day. Admissions open for 2026.",
  path: "/play-school",
  keywords: [
    "play school Khammam",
    "preschool Khammam",
    "play-based preschool Khammam",
    "activity-based learning Khammam",
    "best play school Khammam",
    "kindergarten Khammam admission 2026",
    "nursery Khammam",
  ],
});

const curriculumIcons = [
  { Icon: BlocksIcon, color: "bg-amber-100 text-amber-700" },
  { Icon: BookIcon, color: "bg-rose-100 text-rose-700" },
  { Icon: UsersIcon, color: "bg-teal-100 text-teal-700" },
  { Icon: YogaIcon, color: "bg-indigo-100 text-indigo-700" },
  { Icon: PaletteIcon, color: "bg-purple-100 text-purple-700" },
  { Icon: HeartIcon, color: "bg-pink-100 text-pink-700" },
];

const preschoolJsonLd = {
  "@context": "https://schema.org",
  "@type": "Preschool",
  "@id": `${siteConfig.url}/play-school#preschool`,
  name: "10to10 Adventures Play School",
  description:
    "Play school in Khammam offering Playgroup, Nursery, LKG, and UKG programs for children aged 1.5 to 5.5 years.",
  url: `${siteConfig.url}/play-school`,
  logo: `${siteConfig.url}/icon.svg`,
  image: `${siteConfig.url}/icon.svg`,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mamatha College Road, Above Just Bake, Near SBI Bank",
    addressLocality: "Khammam",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  hasCredential: "Certified educators",
  educationalLevel: "Preschool",
  areaServed: { "@type": "City", name: "Khammam" },
  parentOrganization: {
    "@type": "EntertainmentBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:30",
      closes: "15:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:30",
      closes: "12:30",
    },
  ],
};

export default function PlaySchoolPage() {
  return (
    <>
      <Script id="ld-preschool" type="application/ld+json">
        {JSON.stringify(preschoolJsonLd)}
      </Script>
      <Script id="ld-faq" type="application/ld+json">
        {JSON.stringify(faqJsonLd(playSchoolFaqs))}
      </Script>

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

        <div className="container relative grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-black/[0.08] px-4 py-1.5 text-xs font-semibold text-brand-ink/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-brand-primary animate-ping opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-brand-primary" />
              </span>
              Admissions open for 2026 · 12 seats remaining
            </span>
            <h1 className="heading-xl mt-5">
              Where curiosity{" "}
              <span className="relative inline-block">
                <span className="accent">beats curriculum</span>
                <UnderlineSquiggle className="absolute -bottom-2 left-0 w-full h-3 text-brand-yellow" />
              </span>
              .
            </h1>
            <p className="mt-6 text-base md:text-lg text-brand-ink/65 leading-relaxed max-w-xl">
              A play-first preschool in Khammam. No worksheets, no homework,
              no rote drills — children read through stories, count through
              cooking, and learn science by getting their hands dirty. With
              trained educators, a 1:8 ratio, daily reports to your phone,
              and an open-door policy.
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
                1:8 child–teacher ratio
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldIcon className="h-4 w-4 text-brand-primary" />
                CCTV monitoring
              </span>
              <span className="inline-flex items-center gap-2">
                <Star className="h-4 w-4 text-brand-primary" />
                Certified teachers
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <PlaySchoolIllustration />
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="section">
        <div className="container">
          <div className="max-w-xl mb-12">
            <span className="eyebrow">Our programs</span>
            <h2 className="heading-lg mt-3">
              A program for every <span className="accent">tiny milestone.</span>
            </h2>
            <p className="mt-4 text-brand-ink/60 leading-relaxed">
              Four progressive stages — each one play-first, each one age-right.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {programs.map((p) => (
              <div key={p.slug} className="card card-hover p-6 flex flex-col h-full">
                <div className={`text-xs font-bold uppercase tracking-widest ${p.accent}`}>
                  {p.age}
                </div>
                <h3 className="font-display text-xl font-bold text-brand-ink mt-1">
                  {p.name}
                </h3>
                <p className="text-sm text-brand-ink/65 mt-3 leading-relaxed">{p.desc}</p>
                <div className="mt-auto pt-5 border-t border-black/[0.07] grid grid-cols-2 gap-3 text-xs">
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
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="section bg-white border-y border-black/[0.07]">
        <div className="container">
          <div className="max-w-xl mb-12">
            <span className="eyebrow">Curriculum</span>
            <h2 className="heading-lg mt-3">
              Six pillars — every one of them <span className="accent">learned by doing.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {curriculum.map((c, i) => {
              const { Icon, color } = curriculumIcons[i];
              return (
                <div key={c.title} className="card card-hover p-6">
                  <div className={`inline-flex w-11 h-11 rounded-xl items-center justify-center ${color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-brand-ink mt-5">
                    {c.title}
                  </h3>
                  <p className="text-sm text-brand-ink/60 mt-2 leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* A DAY AT 10TO10 */}
      <section className="section">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow">A day at 10to10</span>
            <h2 className="heading-lg mt-3">
              Structure with <span className="accent">space to play.</span>
            </h2>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 chip bg-white border border-black/[0.08] font-semibold text-brand-ink">
                <Clock className="h-3.5 w-3.5 text-brand-primary" />
                Mon – Fri · 9:30 AM – 3:30 PM
              </span>
              <span className="inline-flex items-center gap-2 chip bg-white border border-black/[0.08] font-semibold text-brand-ink">
                <Clock className="h-3.5 w-3.5 text-brand-primary" />
                Saturday · half day · 9:30 AM – 12:30 PM
              </span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {dailySchedule.map((s, i) => (
              <div key={i} className="card p-5 flex gap-4 items-start">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary grid place-items-center">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-brand-primary">
                    {s.time}
                  </div>
                  <div className="font-medium text-brand-ink mt-1 text-sm">{s.activity}</div>
                </div>
              </div>
            ))}
          </div>

          {/* SNACKS MENU — small companion strip */}
          <div className="mt-10 rounded-3xl bg-white border border-black/[0.07] p-6 md:p-8">
            <div className="flex items-baseline justify-between flex-wrap gap-2 mb-5">
              <h3 className="font-display text-xl font-bold text-brand-ink">
                Snacks menu
              </h3>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-ink/45">
                Weekly rotation
              </span>
            </div>
            <p className="text-sm text-brand-ink/60 mb-5 max-w-2xl">
              Two fresh snacks daily — one mid-morning, one mid-afternoon — rotating across these three nutritionist-approved categories.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {snacksMenu.map((s) => (
                <div key={s.name} className="rounded-2xl bg-brand-cloud border border-black/[0.06] p-5">
                  <div className="font-display font-bold text-brand-ink">{s.name}</div>
                  <p className="text-sm text-brand-ink/65 mt-1.5 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS & CELEBRATIONS — festive card grid */}
      <section id="events" className="section">
        <div className="container">
          <div className="max-w-xl mb-12">
            <span className="eyebrow">Events &amp; celebrations</span>
            <h2 className="heading-lg mt-3">
              Every day worth marking, <span className="accent">we mark together.</span>
            </h2>
            <p className="mt-4 text-brand-ink/60 leading-relaxed">
              From national days to regional festivals, our calendar is built around
              the moments that matter — celebrated through stories, food, songs and
              crafts the kids will remember.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((e) => (
              <div
                key={e.name}
                className={`relative rounded-3xl bg-gradient-to-br ${e.color} p-6 border-2 border-white shadow-lifted hover:-translate-y-1 hover:scale-[1.01] transition`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="text-5xl"
                    style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.12))" }}
                  >
                    {e.icon}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-widest ${e.accent}`}>
                    {e.date}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-brand-ink">{e.name}</h3>
                <p className="text-sm text-brand-ink/75 mt-2 leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-brand-ink/50 text-xs mt-8">
            Plus regional days, themed weeks, and small in-class moments year-round.
          </p>
        </div>
      </section>

      {/* ADMISSION STEPS */}
      <section className="section">
        <div className="container">
          <div className="max-w-xl mb-12">
            <span className="eyebrow">Admission process</span>
            <h2 className="heading-lg mt-3">
              From inquiry to enrollment <span className="accent">in 4 steps.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {admissionSteps.map((s) => (
              <div key={s.n} className="card card-hover p-6 h-full">
                <div className="font-display text-3xl font-bold text-brand-primary tabular-nums">
                  {s.n}
                </div>
                <h3 className="font-display text-lg font-bold text-brand-ink mt-3">
                  {s.title}
                </h3>
                <p className="text-sm text-brand-ink/60 mt-2 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section bg-white border-y border-black/[0.07]">
        <div className="container">
          <div className="max-w-xl mb-12">
            <span className="eyebrow">Why we&apos;re different</span>
            <h2 className="heading-lg mt-3">
              A Khammam preschool where play <span className="accent">IS the curriculum.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyUs.map((r) => (
              <div key={r.title} className="card card-hover p-6">
                <div className="inline-flex w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary items-center justify-center">
                  <Check className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <h3 className="font-display text-lg font-bold text-brand-ink mt-5">
                  {r.title}
                </h3>
                <p className="text-sm text-brand-ink/60 mt-2 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARENT STORIES */}
      <section className="section">
        <div className="container">
          <div className="max-w-xl mb-12">
            <span className="eyebrow">Parent stories</span>
            <h2 className="heading-lg mt-3">
              Trusted by Khammam <span className="accent">families.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {parentStories.map((s) => (
              <blockquote key={s.name} className="card p-7">
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
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + ADMISSION FORM SIDE BY SIDE */}
      <section id="admission" className="section bg-white border-y border-black/[0.07] scroll-mt-24">
        <div className="container grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <span className="eyebrow">Common questions</span>
            <h2 className="heading-lg mt-3">
              Before you <span className="accent">enroll.</span>
            </h2>
            <div className="mt-8 space-y-2.5">
              {playSchoolFaqs.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-xl bg-brand-cloud border border-black/[0.07] hover:border-black/15 transition overflow-hidden"
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

      {/* CLOSING CTA */}
      <section className="section">
        <div className="container">
          <div className="rounded-3xl bg-brand-ink p-10 md:p-14 text-white text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-primary/15 blur-3xl pointer-events-none" />
            <div className="relative max-w-2xl mx-auto">
              <span className="eyebrow text-brand-primary">First trial day on us</span>
              <h2 className="heading-lg mt-4">
                The best way to know is to <span className="text-brand-primary">visit.</span>
              </h2>
              <p className="mt-5 text-white/65 leading-relaxed">
                Bring your child for a free trial day. Watch them play — and
                watch them learn. You&apos;ll see the difference in twenty
                minutes. No commitment, no pressure.
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
