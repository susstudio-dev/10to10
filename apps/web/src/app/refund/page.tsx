import type { Metadata } from "next";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Refund and cancellation policy for 10to10 Adventures, Khammam — parties, play school, summer camp, and memberships.",
  alternates: { canonical: "/refund" },
  robots: { index: false, follow: true },
};

export default function RefundPage() {
  return (
    <section className="pt-32 pb-20">
      <div className="container max-w-3xl">
        <h1 className="heading-lg">Refund &amp; Cancellation Policy</h1>
        <div className="mt-8 space-y-6 text-brand-ink/75 leading-relaxed">
          <h2 className="font-display text-xl font-bold text-brand-ink">Birthday parties</h2>
          <p>
            Cancellations more than 7 days before the event receive a full
            deposit refund. Between 3–7 days, 50% of the deposit is refunded.
            Within 72 hours the deposit is non-refundable, but we&apos;ll happily
            reschedule your party within 90 days at no extra cost.
          </p>
          <h2 className="font-display text-xl font-bold text-brand-ink">Play school</h2>
          <p>
            Full refund within 7 days of enrollment if your child has not
            attended a single session. After attendance begins, fees are
            non-refundable but transferable to a sibling.
          </p>
          <h2 className="font-display text-xl font-bold text-brand-ink">Summer camp</h2>
          <p>
            Deposits are fully refundable until the refund cut-off announced
            with each season&apos;s dates. After camp begins, unattended days are
            not refunded, but weekly passes can be rescheduled within the same
            season.
          </p>
          <h2 className="font-display text-xl font-bold text-brand-ink">Memberships</h2>
          <p>
            Monthly memberships can be cancelled anytime with no penalty.
            Quarterly and annual memberships can be cancelled within 7 days for
            a full refund; after that, prorated refunds apply.
          </p>
          <h2 className="font-display text-xl font-bold text-brand-ink">How refunds are paid</h2>
          <p>
            Refunds are returned to the original payment method (UPI, card, or
            cash) within 5–7 working days. To request one, message us on{" "}
            <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer" className="text-brand-primary font-semibold hover:underline">
              WhatsApp
            </a>{" "}
            or email{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-brand-primary font-semibold hover:underline">
              {siteConfig.email}
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
