import type { Metadata } from "next";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How 10to10 Adventures, Khammam collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-20">
      <div className="container max-w-3xl">
        <h1 className="heading-lg">Privacy Policy</h1>
        <div className="mt-8 space-y-6 text-brand-ink/75 leading-relaxed">
          <p>
            10to10 Adventures (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your
            family&apos;s privacy. This page explains what we collect and why.
          </p>
          <h2 className="font-display text-xl font-bold text-brand-ink">What we collect</h2>
          <p>
            When you submit an inquiry or booking on this website, we collect the
            details you type in — typically your name, phone number, and message.
            Inquiries are delivered to us via WhatsApp and email. We do not sell
            or share this information with third parties for marketing.
          </p>
          <h2 className="font-display text-xl font-bold text-brand-ink">How we use it</h2>
          <p>
            Only to respond to your inquiry, confirm bookings, and share updates
            you have asked for (such as summer camp dates or admission windows).
            You can ask us to delete your details at any time.
          </p>
          <h2 className="font-display text-xl font-bold text-brand-ink">CCTV at the venue</h2>
          <p>
            Our premises are monitored by CCTV for child safety. Footage is
            retained for a limited period and viewed only for safety and
            security purposes.
          </p>
          <h2 className="font-display text-xl font-bold text-brand-ink">Contact</h2>
          <p>
            Questions? Reach us at{" "}
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
