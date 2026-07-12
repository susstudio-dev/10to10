import { Check, X, Crown, Sparkles, Users } from "lucide-react";
import { MembershipStrip } from "@/components/membership-strip";
import { BookButton } from "@/components/book-button";
import { sessionPricing, multiPlan } from "@/content/memberships";
import { Reveal } from "@/components/reveal";
import {
  WaveDivider,
  Bunting,
  Float,
  StarDoodle,
  SwirlDoodle,
  SmileDoodle,
  HeartDoodle,
  BalloonDoodle,
} from "@/components/playful";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kids Play Area Memberships Khammam",
  description:
    "Silver (₹599/mo), Gold (₹2,000/6 mo) and Platinum (₹3,499/yr) memberships at 10to10 Adventures Khammam. Free play hours, private movie screenings, birthday perks. Multi-member add-on at 50% off.",
  path: "/memberships",
  keywords: [
    "play area membership Khammam",
    "kids play pass Khammam",
    "10to10 membership",
    "kids entertainment subscription Khammam",
  ],
});

/* hand-placed ticket tilts for the session-pass cards */
const ticketTilt = ["rotate-[-1.5deg]", "rotate-[1.5deg]", "rotate-[-1deg]"];

const compare = [
  { feature: "Price", silver: "₹599 / mo", gold: "₹2,000 / 6 mo", platinum: "₹3,499 / yr" },
  { feature: "Free play hours", silver: "1 hour", gold: "6 hours", platinum: "12 hours" },
  { feature: "Free private movie screenings", silver: "1 theatre hour", gold: "1 screening", platinum: "2 screenings" },
  { feature: "Discount on play hours", silver: "25%", gold: "extra 30%", platinum: "40%" },
  { feature: "Discount on snacks", silver: "10%", gold: "10%", platinum: "10%" },
  { feature: "Discount on gaming", silver: "10%", gold: "10%", platinum: "10%" },
  { feature: "Discount on theatre & parties", silver: "—", gold: "10%", platinum: "10%" },
  { feature: "Birthday surprise gift", silver: false, gold: true, platinum: true },
  { feature: "Birthday party-area discount", silver: "—", gold: "20%", platinum: "20%" },
  { feature: "Multi-member family add-on", silver: "50% off", gold: "50% off", platinum: "50% off" },
];

const faqs = [
  {
    q: "How do I sign up for a membership?",
    a: "Tap any 'Choose plan' button or send us a WhatsApp message with your preferred tier. We'll activate your membership within 30 minutes. Payment via UPI, card, or cash at the venue.",
  },
  {
    q: "Can I upgrade mid-plan?",
    a: "Absolutely. Upgrade any time — we credit your remaining balance toward the new tier. Downgrades take effect at the next renewal.",
  },
  {
    q: "How does the Multi Members Plan work?",
    a: "Add cousins, siblings, or friends to any base plan and the extra members pay 50% of the plan price. Each linked member gets the same benefits as the primary member. Example: 1st child on annual Platinum is ₹3,499; 2nd child on the same plan is ₹1,749.",
  },
  {
    q: "Do membership perks include the party room?",
    a: "Yes. Gold and Platinum members get 10% off theatre and party bookings plus a 20% birthday party-area discount and a birthday surprise gift. Silver focuses on play & gaming perks.",
  },
  {
    q: "What counts as a 'free play hour'?",
    a: "One hour of soft-play access at the play area. Silver includes 1 hour, Gold includes 6 hours, and Platinum includes 12 hours. Use them whenever — they don't roll over after the plan period ends.",
  },
];

export default function MembershipsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      {/* HERO — Memberships theme: premium indigo + turquoise tonal wash, fades into body */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -top-40 -left-32 w-[720px] h-[720px] rounded-full bg-brand-primary/14 blur-3xl" />
          <div className="absolute -top-20 right-0 w-[560px] h-[560px] rounded-full bg-brand-turquoise/14 blur-3xl" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[440px] h-[440px] rounded-full bg-brand-yellow/10 blur-3xl" />
          {/* gold-foil shimmer overlay (premium feel) */}
          <div
            className="absolute inset-0 opacity-[0.08] mix-blend-multiply"
            style={{
              backgroundImage:
                "linear-gradient(110deg, transparent 40%, rgba(255,217,61,0.6) 50%, transparent 60%)",
            }}
          />
          {/* tier dots scatter */}
          <div className="absolute inset-0 opacity-[0.07]" style={{
            backgroundImage:
              "radial-gradient(circle at 12% 22%, #2c3873 1.5px, transparent 2px), radial-gradient(circle at 78% 32%, #00d4c8 1.5px, transparent 2px), radial-gradient(circle at 42% 70%, #8b5cf6 1.5px, transparent 2px)",
            backgroundSize: "120px 120px",
          }} />
          {/* bottom fade to body cream */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#fdfbf7]" />
        </div>
        <Float className="top-24 left-[7%] w-10 text-brand-yellow opacity-70 hidden md:block" speed="slow">
          <StarDoodle className="w-full" />
        </Float>
        <Float className="top-40 right-[9%] w-12 text-brand-turquoise opacity-60 hidden md:block" speed="wiggle">
          <SwirlDoodle className="w-full" />
        </Float>
        <div className="container relative text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 chip bg-white/85 backdrop-blur border-2 border-brand-primary/20 font-bold text-brand-primary">
            <Crown className="h-3.5 w-3.5" /> Memberships & passes
          </span>
          <h1 className="heading-xl mt-5">
            Pick your <span className="gradient-text">play plan</span>.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-brand-ink/75 leading-relaxed">
            Three tiers and a multi-member family add-on. Free play hours,
            private movie screenings, birthday perks. Upgrade any time.
          </p>
        </div>
      </section>

      {/* SINGLE SESSION PASSES */}
      <section className="relative pb-20">
        <Float className="top-2 right-[6%] w-10 text-brand-orange opacity-70 hidden md:block" speed="slow">
          <StarDoodle className="w-full" />
        </Float>
        <div className="container">
          <Reveal>
            <div className="text-center mb-10">
              <span className="eyebrow">
                <span className="h-px w-8 bg-brand-primary" /> <span aria-hidden="true">🎟️</span> Drop-in pricing
              </span>
              <h2 className="heading-lg mt-4">Single session passes</h2>
              <p className="mt-3 text-brand-ink/60 max-w-xl mx-auto">
                No commitment, just fun. All passes include 1-hour play, 15-min
                theatre, games, and a snack pack.
              </p>
              <Bunting className="block mx-auto mt-5" />
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {sessionPricing.map((p, i) => (
              <Reveal key={p.label} delay={i * 0.08}>
                <div
                  className={`relative h-full rounded-3xl border-2 border-brand-ink/5 bg-white p-8 shadow-lifted text-center hover:-translate-y-1 hover:rotate-0 hover:border-brand-primary/20 transition ${ticketTilt[i % ticketTilt.length]}`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-ink/50">
                    {p.label}
                  </div>
                  <div className="font-display text-5xl font-bold mt-3 gradient-text">
                    {p.price}
                  </div>
                  <div className="text-sm text-brand-ink/60 mt-2">{p.note}</div>
                  {/* ticket perforation with punched notches */}
                  <div aria-hidden className="relative -mx-8 my-6 border-t-2 border-dashed border-brand-ink/10">
                    <span className="absolute -top-2.5 -left-2.5 h-5 w-5 rounded-full bg-[#fdfbf7]" />
                    <span className="absolute -top-2.5 -right-2.5 h-5 w-5 rounded-full bg-[#fdfbf7]" />
                  </div>
                  <BookButton preset="Play Session" className="w-full">
                    Book now
                  </BookButton>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIER CARDS */}
      <WaveDivider fillClass="fill-brand-ink" />
      <MembershipStrip />
      <WaveDivider fillClass="fill-brand-ink" flip />

      {/* MULTI MEMBERS PLAN */}
      <section className="pb-4 -mt-4">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border-2 border-brand-yellow/40 bg-gradient-to-br from-brand-yellow/15 via-brand-orange/10 to-brand-yellow/20 p-8 md:p-12 shadow-lifted">
            <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-brand-yellow/30 blur-3xl pointer-events-none" />
            <div className="relative grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3">
                <span className="inline-flex items-center gap-2 chip bg-white border-2 border-brand-orange/30 font-bold text-brand-orange">
                  <Users className="h-3.5 w-3.5" /> Family add-on
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-4">
                  {multiPlan.name}
                </h2>
                <p className="mt-3 text-brand-ink/75 leading-relaxed">
                  {multiPlan.tagline}
                </p>
                <ul className="mt-6 space-y-3">
                  {multiPlan.perks.map((p) => (
                    <li key={p} className="flex gap-3 text-sm md:text-base">
                      <Check className="h-5 w-5 shrink-0 text-brand-orange mt-0.5" strokeWidth={2.5} />
                      <span className="text-brand-ink/80">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-2">
                <div className="rounded-2xl bg-white border-2 border-white p-6 shadow-lifted">
                  <div className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                    Example
                  </div>
                  <p className="mt-3 text-brand-ink/85 leading-relaxed text-sm">
                    {multiPlan.example}
                  </p>
                  <BookButton preset="Play Session" className="w-full mt-5">
                    Add a family member
                  </BookButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="section relative">
        <Float className="top-16 right-[12%] w-9 text-brand-grape opacity-60 hidden lg:block" speed="wiggle">
          <SmileDoodle className="w-full" />
        </Float>
        <div className="container max-w-5xl">
          <Reveal>
            <div className="text-center mb-12">
              <span className="eyebrow">
                <span className="h-px w-8 bg-brand-primary" /> Compare every perk
              </span>
              <h2 className="heading-lg mt-4">
                Every perk, <span className="gradient-text">side by side</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
          <div className="rounded-3xl border-2 border-brand-ink/5 bg-white shadow-lifted overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm md:text-base">
                <thead>
                  <tr className="border-b-2 border-brand-ink/5">
                    <th className="p-4 md:p-5 font-semibold text-brand-ink/60">
                      Perk
                    </th>
                    <th className="p-4 md:p-5 font-display font-bold text-brand-ink/80 text-center">
                      Silver
                    </th>
                    <th className="p-4 md:p-5 font-display font-bold text-brand-primary text-center bg-brand-primary/5">
                      Gold
                    </th>
                    <th className="p-4 md:p-5 font-display font-bold text-brand-grape text-center">
                      Platinum
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compare.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={i % 2 ? "bg-brand-cloud/50" : ""}
                    >
                      <td className="p-4 md:p-5 font-medium">{row.feature}</td>
                      <td className="p-4 md:p-5 text-center text-brand-ink/70">
                        <CellValue v={row.silver} />
                      </td>
                      <td className="p-4 md:p-5 text-center bg-brand-primary/5 text-brand-primary font-semibold">
                        <CellValue v={row.gold} />
                      </td>
                      <td className="p-4 md:p-5 text-center text-brand-grape font-semibold">
                        <CellValue v={row.platinum} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </Reveal>

          <p className="text-center text-brand-ink/55 text-sm mt-6">
            Add siblings or cousins at <strong className="text-brand-ink">50% off</strong> via the Multi Members Plan above.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <WaveDivider fillClass="fill-white/50" />
      <section className="section relative bg-white/50">
        <Float className="bottom-16 left-[4%] w-10 text-brand-orange opacity-60 hidden md:block" speed="slow">
          <HeartDoodle className="w-full" />
        </Float>
        <div className="container max-w-3xl">
          <Reveal>
            <div className="text-center mb-12">
              <span className="eyebrow">
                <span className="h-px w-8 bg-brand-primary" /> Common questions
              </span>
              <h2 className="heading-lg mt-4">Before you pick a plan</h2>
            </div>
          </Reveal>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={i} delay={Math.min(i * 0.05, 0.3)}>
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
      <WaveDivider fillClass="fill-white/50" flip />

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-primary via-brand-primary-deep to-brand-grape p-10 md:p-16 text-white text-center shadow-glow">
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-brand-yellow/30 blur-3xl" />
            <Float className="top-10 left-10 w-12 text-white/25 hidden md:block" speed="slow">
              <StarDoodle className="w-full" />
            </Float>
            <Float className="bottom-10 right-12 w-14 text-white/20 hidden md:block" speed="wiggle">
              <SwirlDoodle className="w-full" />
            </Float>
            <Float className="top-14 right-[16%] w-9 text-white/25 hidden lg:block" speed="fast">
              <BalloonDoodle className="w-full" />
            </Float>
            <Reveal className="relative max-w-2xl mx-auto">
              <Bunting className="block mx-auto mb-6" />
              <div className="text-5xl mb-4">
                <Sparkles className="inline h-12 w-12 text-brand-yellow" />
              </div>
              <h2 className="heading-lg">
                Lock in the <span className="text-brand-yellow">best rates</span> today
              </h2>
              <p className="mt-4 text-white/85">
                Rates rise as new zones open — sign up now and your price stays
                locked for your full term, guaranteed.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <BookButton preset="Play Session" variant="white">
                  Start my membership
                </BookButton>
                <a href="tel:+919256787788" className="btn-ghost bg-white/10 !text-white !border-white/30 hover:!bg-white/20">
                  Have questions? Call us
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function CellValue({ v }: { v: string | boolean }) {
  if (v === true)
    return <Check className="inline h-5 w-5 text-brand-turquoise" />;
  if (v === false)
    return <X className="inline h-5 w-5 text-brand-ink/25" />;
  return <>{v}</>;
}
