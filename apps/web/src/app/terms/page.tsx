import type { Metadata } from "next";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use and house rules for 10to10 Adventures, Khammam — bookings, safety, and venue policies.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <section className="pt-32 pb-20">
      <div className="container max-w-3xl">
        <h1 className="heading-lg">Terms of Use</h1>
        <div className="mt-8 space-y-6 text-brand-ink/75 leading-relaxed">
          <h2 className="font-display text-xl font-bold text-brand-ink">Bookings</h2>
          <p>
            Bookings made through this website are confirmed on WhatsApp or by
            phone. A booking is final only after our team confirms availability
            and any applicable deposit is received.
          </p>
          <h2 className="font-display text-xl font-bold text-brand-ink">Safety &amp; supervision</h2>
          <p>
            Children must be accompanied by a parent or guardian in the play
            areas unless enrolled in a supervised program (play school or summer
            camp). Socks are required in the soft-play arena. Our staff may
            pause play for any child whose safety — or whose friends&apos;
            safety — is at risk.
          </p>
          <h2 className="font-display text-xl font-bold text-brand-ink">Health</h2>
          <p>
            To keep every family safe, children with fever, an active cough, or
            a contagious condition may be asked to visit another day.
          </p>
          <h2 className="font-display text-xl font-bold text-brand-ink">Pricing</h2>
          <p>
            Prices shown on this website are indicative and may change. The
            price confirmed by our team on WhatsApp or at the counter applies.
          </p>
          <h2 className="font-display text-xl font-bold text-brand-ink">Contact</h2>
          <p>
            Questions about these terms? Email{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-brand-primary font-semibold hover:underline">
              {siteConfig.email}
            </a>{" "}
            or call {siteConfig.phone}.
          </p>
        </div>
      </div>
    </section>
  );
}
