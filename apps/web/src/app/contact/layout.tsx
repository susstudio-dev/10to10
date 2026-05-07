import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Khammam Family Playground — Visit, Call, WhatsApp",
  description:
    "Get in touch with 10to10 Adventures, Khammam. Call, WhatsApp, email or visit us at Mamatha College Road, Above Just Bake. Open 7 days a week, 10 AM – 10 PM.",
  path: "/contact",
  keywords: [
    "10to10 Adventures contact",
    "play area Khammam contact",
    "play school admission contact Khammam",
  ],
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
