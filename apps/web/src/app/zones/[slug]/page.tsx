import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { zones, type Accent } from "@/content/zones";
import { siteConfig } from "@/lib/utils";
import { BookButton } from "@/components/book-button";
import { Float, Tape, BalloonDoodle, StarDoodle, SwirlDoodle } from "@/components/playful";
import { Reveal, PopIn } from "@/components/reveal";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

/** Zone-accent tints for hero halos, doodles, and highlight check circles. */
const accentTint: Record<Accent, { doodle: string; halo: string; check: string }> = {
  primary:   { doodle: "text-brand-primary",   halo: "bg-brand-primary/10",   check: "bg-brand-primary/15 text-brand-primary" },
  turquoise: { doodle: "text-brand-turquoise", halo: "bg-brand-turquoise/15", check: "bg-brand-turquoise/20 text-teal-700" },
  yellow:    { doodle: "text-brand-yellow",    halo: "bg-brand-yellow/20",    check: "bg-brand-yellow/40 text-amber-700" },
  grape:     { doodle: "text-brand-grape",     halo: "bg-brand-grape/10",     check: "bg-brand-grape/15 text-brand-grape" },
  orange:    { doodle: "text-brand-orange",    halo: "bg-brand-orange/10",    check: "bg-brand-orange/20 text-brand-orange" },
  mint:      { doodle: "text-brand-mint",      halo: "bg-brand-mint/25",      check: "bg-brand-mint/40 text-emerald-700" },
  sky:       { doodle: "text-brand-sky",       halo: "bg-brand-sky/20",       check: "bg-brand-sky/40 text-sky-700" },
};

const checkTilts = ["-rotate-6", "rotate-3", "-rotate-3", "rotate-6"];

export function generateStaticParams() {
  return zones.map((z) => ({ slug: z.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const zone = zones.find((z) => z.slug === slug);
  if (!zone) return {};
  const path = `/zones/${zone.slug}`;
  const title = `${zone.name} Khammam`;
  return {
    title,
    description: zone.description,
    alternates: {
      // The play-school zone is a teaser; the full page is the canonical one
      canonical: slug === "play-school" ? "/play-school" : path,
    },
    openGraph: {
      title,
      description: zone.description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: zone.description,
    },
  };
}

export default async function ZonePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const zone = zones.find((z) => z.slug === slug);
  if (!zone) notFound();
  const path = `/zones/${zone.slug}`;
  const zoneJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${zone.name} at ${siteConfig.name}`,
    description: zone.description,
    url: absoluteUrl(path),
    provider: {
      "@type": "EntertainmentBusiness",
      "@id": `${siteConfig.url}/#business`,
      name: siteConfig.name,
    },
    areaServed: { "@type": "City", name: "Khammam" },
    audience: { "@type": "Audience", audienceType: zone.ages },
  };
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Zones", path: "/#zones" },
    { name: zone.name, path },
  ]);

  const tint = accentTint[zone.accent];

  return (
    <article className="relative">
      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(zoneJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Soft cream hero wash with a zone-tinted halo instead of the flat mesh strip */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-cloud via-brand-cloud/60 to-transparent" />
        <div className={`absolute -top-24 right-[-12%] h-[26rem] w-[26rem] rounded-full blur-3xl ${tint.halo}`} />
        <div className="absolute top-48 left-[-10%] h-72 w-72 rounded-full blur-3xl bg-brand-yellow/15" />
      </div>

      {/* Zone-tinted corner doodles drifting over the hero */}
      <Float className={`top-36 right-[7%] w-12 opacity-70 hidden md:block ${tint.doodle}`} speed="slow">
        <BalloonDoodle className="w-full" />
      </Float>
      <Float className="top-72 right-[18%] w-9 text-brand-yellow opacity-70 hidden lg:block" speed="wiggle">
        <StarDoodle className="w-full" />
      </Float>
      <Float className={`top-[27rem] right-[9%] w-10 opacity-50 hidden md:block ${tint.doodle}`} speed="spin">
        <SwirlDoodle className="w-full" />
      </Float>

      <div className="container pt-32 pb-20">
        <Link
          href="/#zones"
          className="inline-flex items-center gap-2 text-sm text-brand-ink/60 hover:text-brand-primary mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> All zones
        </Link>

        <div className="max-w-3xl">
          <PopIn className="inline-block">
            <div className="text-6xl mb-6 hover-wiggle select-none">{zone.icon}</div>
          </PopIn>
          <Reveal>
            <span className="chip bg-brand-primary/10 text-brand-primary font-bold">
              {zone.ages}
            </span>
            <h1 className="heading-xl mt-4">{zone.name}</h1>
            <p className="mt-4 text-xl text-brand-primary font-semibold">
              {zone.tagline}
            </p>
            <p className="mt-6 text-lg text-brand-ink/70 leading-relaxed">
              {zone.description}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="relative glass rounded-3xl p-8 shadow-lifted rotate-[-1deg] hover:rotate-0 transition-transform duration-300">
              <Tape className="-top-3 left-8 -rotate-6" />
              <h2 className="font-display text-2xl font-bold mb-6">What&apos;s inside</h2>
              <ul className="space-y-3">
                {zone.highlights.map((h, i) => (
                  <li key={h} className="flex items-start gap-3">
                    <span
                      className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${tint.check} ${checkTilts[i % checkTilts.length]}`}
                      aria-hidden
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-brand-ink/80">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-brand-primary via-brand-primary-deep to-brand-grape text-white shadow-glow rotate-[1deg] hover:rotate-0 transition-transform duration-300">
              <Float className="top-5 right-6 w-10 text-white/25" speed="wiggle">
                <StarDoodle className="w-full" />
              </Float>
              <h2 className="font-display text-2xl font-bold">Ready to visit?</h2>
              <p className="mt-2 text-white/85">
                Book a slot on WhatsApp or give us a call. We&apos;ll save you a spot and a warm welcome.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <BookButton preset={zone.name} variant="white">Book a Visit</BookButton>
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex items-center justify-center rounded-full border-2 border-white/40 py-3 font-bold hover:bg-white/10 transition"
                >
                  Call {siteConfig.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {zone.pricing && zone.pricing.length > 0 && (
          <div className="mt-12">
            <div className="rounded-3xl border-2 border-brand-ink/5 bg-white p-8 md:p-10 shadow-lifted">
              <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
                <h2 className="font-display text-2xl font-bold">Pricing</h2>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-ink/45">
                  Walk-in rates
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {zone.pricing.map((p) => (
                  <div
                    key={p.label}
                    className="flex items-center justify-between gap-4 rounded-2xl bg-brand-cloud border border-black/[0.06] px-5 py-4"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-brand-ink text-sm">{p.label}</div>
                      {p.note && (
                        <div className="text-xs text-brand-ink/55 mt-0.5">{p.note}</div>
                      )}
                    </div>
                    <div className="font-display font-bold text-brand-primary text-lg shrink-0 tabular-nums">
                      {p.price}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-brand-ink/50 mt-6">
                Members save up to 40% —{" "}
                <Link href="/memberships" className="text-brand-primary font-semibold hover:underline">
                  see membership perks
                </Link>
                .
              </p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
