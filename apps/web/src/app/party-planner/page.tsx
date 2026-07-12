import {
  Cake,
  Sparkles,
  Clock,
  Users,
  Calendar,
  Check,
  Star,
  PartyPopper,
} from "lucide-react";
import { BookButton } from "@/components/book-button";
import {
  WaveDivider,
  Bunting,
  Tape,
  Float,
  BalloonDoodle,
  StarDoodle,
  HeartDoodle,
  SwirlDoodle,
} from "@/components/playful";
import { Reveal, PopIn } from "@/components/reveal";
import {
  packages,
  themes,
  steps,
  addons,
  partyFaqs,
  partyTestimonials,
} from "@/content/parties";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

const stepTints = [
  "bg-brand-yellow/50",
  "bg-brand-turquoise/30",
  "bg-brand-grape/20",
  "bg-brand-orange/30",
  "bg-brand-mint/50",
];

export const metadata = pageMetadata({
  title: "Birthday Party Venue Khammam — Kids Party Hall",
  description:
    "Khammam's premier birthday party venue for kids. Pick a private party room (₹10,000 / 15 kids), a private theatre, or the full combo (₹15,000 / 30 kids). Themed decor, hosts, cake, photos, photography included.",
  path: "/party-planner",
  keywords: [
    "birthday party venue Khammam",
    "kids party hall Khammam",
    "birthday venue near me",
    "kids birthday party Khammam",
    "themed birthday Khammam",
  ],
});

export default function PartyPlannerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(partyFaqs)) }}
      />
      {/* HERO — Parties theme: celebratory (rose + sunshine + lavender), fades into body */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          {/* rose-pink balloon glow top-left */}
          <div className="absolute -top-32 -left-24 w-[600px] h-[600px] rounded-full bg-rose-300/35 blur-3xl" />
          {/* warm sunshine top-right */}
          <div className="absolute -top-20 -right-24 w-[560px] h-[560px] rounded-full bg-brand-yellow/30 blur-3xl" />
          {/* lavender at the centre to bridge */}
          <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-brand-grape/14 blur-3xl" />
          {/* turquoise lower-left for cool balance */}
          <div className="absolute -bottom-24 -left-16 w-[440px] h-[440px] rounded-full bg-brand-turquoise/14 blur-3xl" />
          {/* confetti dot pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18% 22%, #ff5a8a 2px, transparent 3px), radial-gradient(circle at 62% 14%, #ffd93d 2px, transparent 3px), radial-gradient(circle at 84% 64%, #00d4c8 2px, transparent 3px), radial-gradient(circle at 32% 76%, #8b5cf6 2px, transparent 3px), radial-gradient(circle at 70% 36%, #ff8a3d 1.5px, transparent 2.5px)",
              backgroundSize: "180px 180px",
            }}
          />
          {/* bottom fade to body cream */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#fdfbf7]" />
        </div>

        {/* celebratory corner doodles */}
        <Float className="top-28 right-[9%] w-12 text-rose-400/70 hidden md:block" speed="slow">
          <BalloonDoodle className="w-full" />
        </Float>
        <Float className="top-56 right-[18%] w-8 text-brand-grape/60 hidden lg:block" speed="fast">
          <BalloonDoodle className="w-full" />
        </Float>
        <Float className="bottom-20 right-[7%] w-9 text-brand-yellow/80 hidden md:block" speed="wiggle">
          <StarDoodle className="w-full" />
        </Float>

        <div className="container relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 chip bg-white/80 backdrop-blur border-2 border-brand-primary/20 font-bold text-brand-primary">
              <Cake className="h-3.5 w-3.5" />
              Birthday parties & private events
            </span>
            <h1 className="heading-xl mt-5">
              Throw the party they'll{" "}
              <span className="gradient-text">never forget</span>.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-brand-ink/75 leading-relaxed max-w-2xl">
              Private venue, themed decor, cake, hosts, games, photography — we
              handle every tiny detail so you can actually enjoy your kid&apos;s big
              day. Private theatre from ₹1,000, party packages from ₹10,000.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <BookButton preset="Birthday Party" className="text-base">
                Plan my party <PartyPopper className="h-4 w-4" />
              </BookButton>
              <a href="#packages" className="btn-ghost text-base">
                See packages
              </a>
            </div>

            {/* Quick facts */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Users, label: "Up to 40 kids", sub: "or more on request" },
                { icon: Clock, label: "2 – 4 hours", sub: "per package" },
                { icon: Sparkles, label: "8+ themes", sub: "fully customisable" },
                { icon: Calendar, label: "7 days / week", sub: "10 AM – 8 PM start" },
              ].map((f) => (
                <div
                  key={f.label}
                  className="rounded-2xl bg-white/80 backdrop-blur border-2 border-white p-4 shadow-lifted"
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

      {/* PACKAGES */}
      <section id="packages" className="section">
        <div className="container">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="eyebrow">
                <span className="h-px w-8 bg-brand-primary" /> Party packages
              </span>
              <h2 className="heading-lg mt-4">
                Three ways to <span className="gradient-text">celebrate big</span>
              </h2>
              <Bunting className="block mx-auto mt-4" />
              <p className="mt-4 text-brand-ink/65">
                All packages include private venue, party host, decor, and full setup
                &amp; cleanup &mdash; and every one is{" "}
                <strong className="font-semibold text-brand-ink">fully customisable</strong>.
                Pick your theme, swap the decor, mix in add-ons. Pick the package that
                fits your headcount; we&apos;ll tailor the rest.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.slug} delay={i * 0.08} className="h-full">
              <div
                className={`relative h-full rounded-3xl p-8 border-2 transition hover:-translate-y-1 ${
                  pkg.highlight
                    ? "bg-gradient-to-br from-brand-primary to-brand-grape border-transparent shadow-glow md:scale-105 text-white"
                    : `bg-white border-brand-ink/5 hover:border-brand-primary/20 shadow-lifted hover:rotate-0 ${
                        i === 0 ? "md:rotate-[-1.5deg]" : "md:rotate-[1.5deg]"
                      }`
                }`}
              >
                {pkg.highlight && (
                  <>
                    <Tape className="-top-3 left-6 -rotate-6" />
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 chip bg-brand-yellow text-brand-ink font-bold">
                      Most popular
                    </span>
                  </>
                )}
                <h3 className="font-display text-2xl font-bold">{pkg.name}</h3>
                <p className={`text-sm mt-1 min-h-[2.5rem] ${pkg.highlight ? "text-white/80" : "text-brand-ink/60"}`}>
                  {pkg.tagline}
                </p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold">{pkg.price}</span>
                </div>
                <div className={`mt-2 flex items-center gap-3 text-xs font-semibold ${pkg.highlight ? "text-white/75" : "text-brand-ink/55"}`}>
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> {pkg.guests}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {pkg.duration}
                  </span>
                </div>
                <ul className="mt-6 space-y-2.5">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm">
                      <Check className={`h-4 w-4 shrink-0 mt-0.5 ${pkg.highlight ? "text-brand-yellow" : "text-brand-turquoise"}`} />
                      <span className={pkg.highlight ? "text-white/90" : "text-brand-ink/75"}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <BookButton
                  preset="Birthday Party"
                  variant={pkg.highlight ? "white" : "primary"}
                  className="w-full mt-8"
                >
                  Pick {pkg.name}
                </BookButton>
              </div>
              </Reveal>
            ))}
          </div>

          <p className="text-center mt-10">
            <span className="sticker rotate-[-1deg]">
              <span aria-hidden="true">🎁</span> Gold &amp; Platinum members: 10% off party packages, 20% off party-area on birthday, plus a surprise gift.{" "}
              <a href="/memberships" className="text-brand-primary font-semibold hover:underline">See memberships</a>.
            </span>
          </p>
        </div>
      </section>

      {/* THEMES */}
      <WaveDivider fillClass="fill-white/50" />
      <section className="section bg-white/50 relative">
        <Float className="top-16 left-[4%] w-10 text-brand-turquoise/70 hidden md:block" speed="spin">
          <SwirlDoodle className="w-full" />
        </Float>
        <Float className="bottom-14 right-[5%] w-10 text-brand-orange/70 hidden md:block" speed="slow">
          <StarDoodle className="w-full" />
        </Float>
        <div className="container">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="eyebrow">
                <span className="h-px w-8 bg-brand-primary" /> Choose your theme
              </span>
              <h2 className="heading-lg mt-4">
                Pick a vibe. <span className="gradient-text">We'll set the scene.</span>
              </h2>
              <p className="mt-4 text-brand-ink/65">
                Decor, playlist, activities and photo corner — all styled around your
                chosen theme. Have something else in mind? We'll build a custom one
                for you.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {themes.map((t, i) => (
              <PopIn key={t.name} delay={Math.min(i * 0.05, 0.3)}>
                <div
                  className={`group relative rounded-3xl bg-gradient-to-br ${t.color} p-6 aspect-square flex flex-col items-center justify-center text-center border-2 border-white shadow-lifted hover:-translate-y-1 hover:scale-[1.02] transition cursor-pointer`}
                >
                  <div
                    className="text-5xl md:text-6xl mb-3 hover-wiggle transition group-hover:scale-110"
                    style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" }}
                  >
                    {t.icon}
                  </div>
                  <div className="font-display font-bold text-sm md:text-base text-brand-ink">
                    {t.name}
                  </div>
                </div>
              </PopIn>
            ))}
          </div>
        </div>
      </section>
      <WaveDivider fillClass="fill-white/50" flip />

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="eyebrow">
                <span className="h-px w-8 bg-brand-primary" /> How it works
              </span>
              <h2 className="heading-lg mt-4">
                From idea to party in <span className="gradient-text">5 simple steps</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-5 gap-5 relative">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={Math.min(i * 0.07, 0.3)} className="relative">
                <div className="rounded-3xl bg-white border-2 border-brand-ink/5 p-6 h-full hover:border-brand-primary/30 hover:-translate-y-1 transition">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-display text-xl font-bold text-brand-primary ${
                      stepTints[i % stepTints.length]
                    } ${i % 2 ? "rotate-[3deg]" : "rotate-[-3deg]"}`}
                  >
                    {s.n}
                  </div>
                  <h3 className="font-display text-lg font-bold mt-3">{s.title}</h3>
                  <p className="text-sm text-brand-ink/65 mt-2 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <svg
                    aria-hidden
                    viewBox="0 0 40 20"
                    fill="none"
                    className="hidden md:block absolute top-9 -right-[26px] w-8 z-10 pointer-events-none text-brand-primary/50"
                  >
                    <path
                      d="M2 14 Q 11 4 20 10 T 38 8"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="crayon-dash"
                    />
                    <path
                      d="M32 4 L 38 8 L 33 14"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ADD-ONS */}
      <WaveDivider fillClass="fill-brand-ink" />
      <section className="section bg-brand-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-dark opacity-50" />
        <Float className="top-14 left-[6%] w-10 text-white/25 hidden md:block" speed="slow">
          <BalloonDoodle className="w-full" />
        </Float>
        <Float className="bottom-12 right-[7%] w-9 text-white/25 hidden md:block" speed="wiggle">
          <StarDoodle className="w-full" />
        </Float>
        <div className="container relative">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">
                <Sparkles className="h-3.5 w-3.5" /> Level it up
              </span>
              <h2 className="heading-lg mt-4">
                À la carte <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-primary">add-ons</span>
              </h2>
              <p className="mt-4 text-white/70">
                Mix and match any of these to elevate your package. All add-ons can
                be booked up to 48 hours before the event.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-5 max-w-4xl mx-auto">
            {addons.map((a, i) => (
              <PopIn key={a.name} delay={Math.min(i * 0.05, 0.3)}>
                <div
                  className={`sticker text-sm px-5 py-2.5 gap-2.5 transition hover:rotate-0 hover:-translate-y-0.5 ${
                    i % 2 ? "rotate-[1.5deg]" : "rotate-[-1.5deg]"
                  }`}
                >
                  <span className="text-xl hover-wiggle">{a.icon}</span>
                  <span>{a.name}</span>
                  <span className="text-brand-primary font-display text-base">
                    {a.price}
                  </span>
                </div>
              </PopIn>
            ))}
          </div>
        </div>
      </section>
      <WaveDivider fillClass="fill-brand-ink" flip />

      {/* TESTIMONIALS */}
      <section className="section relative">
        <Float className="top-20 right-[6%] w-9 text-rose-400/60 hidden md:block" speed="slow">
          <HeartDoodle className="w-full" />
        </Float>
        <div className="container">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="eyebrow">
                <span className="h-px w-8 bg-brand-primary" /> Parent stories
              </span>
              <h2 className="heading-lg mt-4">
                Parties that became <span className="gradient-text">family legends</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {partyTestimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08} className="h-full">
              <div
                className={`relative h-full rounded-3xl bg-white border-2 border-brand-ink/5 p-8 shadow-lifted hover:border-brand-primary/20 transition hover:rotate-0 ${
                  i % 2 ? "md:rotate-[1.5deg]" : "md:rotate-[-1.5deg]"
                }`}
              >
                <Tape
                  className={
                    i % 2 ? "-top-3 right-8 rotate-6" : "-top-3 left-8 -rotate-6"
                  }
                />
                <div className="flex gap-1 text-brand-yellow mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-brand-ink/80 leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="mt-6 pt-6 border-t border-brand-ink/5">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-brand-ink/50 mt-0.5">{t.role}</div>
                  <div className="text-xs font-semibold text-brand-primary mt-1">
                    Booked: {t.package}
                  </div>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white/50">
        <div className="container max-w-3xl">
          <Reveal>
            <div className="text-center mb-12">
              <span className="eyebrow">
                <span className="h-px w-8 bg-brand-primary" /> Party questions
              </span>
              <h2 className="heading-lg mt-4">Everything parents ask</h2>
            </div>
          </Reveal>

          <div className="space-y-3">
            {partyFaqs.map((f, i) => (
              <details
                key={i}
                className={`group ${
                  i % 2 ? "crayon-card-alt" : "crayon-card"
                } bg-white border-2 border-brand-ink/5 hover:border-brand-primary/20 transition overflow-hidden`}
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
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="section">
        <div className="container">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-primary via-brand-primary-deep to-brand-grape p-10 md:p-16 text-white text-center shadow-glow">
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-brand-yellow/30 blur-3xl" />
            <div className="absolute -bottom-16 -left-10 w-80 h-80 rounded-full bg-brand-turquoise/20 blur-3xl" />
            <Float className="top-10 left-[7%] w-10 text-white/30 hidden md:block" speed="slow">
              <BalloonDoodle className="w-full" />
            </Float>
            <Float className="bottom-10 right-[8%] w-9 text-white/30 hidden md:block" speed="wiggle">
              <StarDoodle className="w-full" />
            </Float>
            <div className="relative max-w-2xl mx-auto">
              <PopIn className="inline-block">
                <div className="text-5xl mb-4">🎂</div>
              </PopIn>
              <Bunting className="block mx-auto mb-5 h-8" />
              <h2 className="heading-lg">
                Let's make their day{" "}
                <span className="text-brand-yellow">magical</span>.
              </h2>
              <p className="mt-4 text-white/85">
                Tell us the date and we'll confirm availability in minutes. ₹2,000
                deposit reserves the slot — fully refundable up to 7 days before.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <BookButton preset="Birthday Party" variant="white">
                  Reserve my date
                </BookButton>
                <a href="tel:+919256787788" className="btn-ghost bg-white/10 !text-white !border-white/30">
                  Call us instead
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
