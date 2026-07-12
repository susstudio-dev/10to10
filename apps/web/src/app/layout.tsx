import type { Metadata, Viewport } from "next";
import { Baloo_2, Inter, Fredoka } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookingProvider } from "@/components/booking-modal";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/scroll-progress";
import { BackToTop } from "@/components/back-to-top";
import { RouteScrollTop } from "@/components/route-scroll-top";
import { StickyMobileCta } from "@/components/sticky-mobile-cta";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { siteConfig } from "@/lib/utils";
import { localBusinessJsonLd } from "@/lib/seo";

// Baloo 2 — chunky, rounded, joyful display face (headings)
const displayFont = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
// Inter — clean, professional body text
const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});
// Fredoka — retained for the playful "10" digits in the logo
const playfulFont = Fredoka({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playful",
  display: "swap",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const withBasePath = (path: string) => `${basePath}${path}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Play School, Kids Play Area & Birthday Venue in Khammam`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  keywords: [
    "10to10 Adventures",
    "play school in Khammam",
    "preschool Khammam",
    "kids play area Khammam",
    "indoor playground Khammam",
    "birthday party venue Khammam",
    "kids birthday party hall Khammam",
    "summer camp Khammam",
    "soft play Khammam",
    "family entertainment Telangana",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: `${siteConfig.name} — Play School, Kids Play Area & Birthday Venue in Khammam`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "10to10 Adventures — Play School, Kids Play Area & Birthday Venue in Khammam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: withBasePath("/icon.svg"), type: "image/svg+xml" }],
    shortcut: [{ url: withBasePath("/icon.svg"), type: "image/svg+xml" }],
    apple: [{ url: withBasePath("/apple-icon.svg"), type: "image/svg+xml" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#2c3873",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${displayFont.variable} ${bodyFont.variable} ${playfulFont.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <a href="#main" className="skip-link">Skip to main content</a>
        <SmoothScroll>
          <BookingProvider>
            <ScrollProgress />
            <RouteScrollTop />
            <Navbar />
            <main id="main" className="flex-1">{children}</main>
            <Footer />
            <WhatsappFab />
            <BackToTop />
            <StickyMobileCta />
          </BookingProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
