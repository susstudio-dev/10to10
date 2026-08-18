import { Hero } from "@/components/hero";
import { VenueIllustration } from "@/components/venue-illustration";
import { VenueShowcase } from "@/components/venue-showcase";
import { StatsStrip } from "@/components/stats-strip";
import { WhyUs } from "@/components/why-us";
import { HowItWorks } from "@/components/how-it-works";
import { MembershipStrip } from "@/components/membership-strip";
import { CtaBanner } from "@/components/cta-banner";
import { Testimonials } from "@/components/testimonials";
import { FinalCta } from "@/components/final-cta";
import { getContentMap, parseList } from "@/lib/content";
import { tiers as tiersDefault } from "@/content/memberships";

export default async function HomePage() {
  const hero = await getContentMap("hero");
  const memberships = await getContentMap("memberships");
  const tiers = parseList(memberships["memberships.tiers"], tiersDefault);

  return (
    <>
      <Hero
        badge={hero["hero.badge"]}
        headingPre={hero["hero.heading_pre"]}
        headingEmphasis={hero["hero.heading_emphasis"]}
        headingLine2={hero["hero.heading_line2"]}
        subheading={hero["hero.subheading"]}
      />
      <VenueIllustration />
      <VenueShowcase />
      <StatsStrip />
      <WhyUs />
      <HowItWorks />
      <MembershipStrip tiers={tiers} />
      <CtaBanner />
      <Testimonials />
      <FinalCta />
    </>
  );
}
