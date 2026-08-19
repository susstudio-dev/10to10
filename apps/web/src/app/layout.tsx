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
import { AmbientDoodles } from "@/components/ambient-doodles";
import { SiteChrome } from "@/components/site-chrome";
import { MotionSettingsProvider } from "@/components/motion-settings";
import { siteConfig } from "@/lib/utils";
import { localBusinessJsonLd } from "@/lib/seo";
import { getSiteSettings, hexToRgbTriplet } from "@/lib/settings";

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

// Every route reads CMS data from D1 (this layout pulls SiteSettings for the
// theme), so nothing can be prerendered at build time — there is no real
// database there, and `getCloudflareContext()` throws in sync mode during
// SSG. Rendering per-request also means admin edits show up immediately.
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const themeVars = `:root{
    --brand-primary-rgb: ${hexToRgbTriplet(settings.colorPrimary)};
    --brand-turquoise-rgb: ${hexToRgbTriplet(settings.colorTurquoise)};
    --brand-yellow-rgb: ${hexToRgbTriplet(settings.colorYellow)};
    --brand-orange-rgb: ${hexToRgbTriplet(settings.colorOrange)};
    --brand-grape-rgb: ${hexToRgbTriplet(settings.colorGrape)};
    --brand-mint-rgb: ${hexToRgbTriplet(settings.colorMint)};
    --brand-sky-rgb: ${hexToRgbTriplet(settings.colorSky)};
    --brand-ink-rgb: ${hexToRgbTriplet(settings.colorInk)};
    --brand-cloud-rgb: ${hexToRgbTriplet(settings.colorCloud)};
  }`;

  return (
    <html
      lang="en-IN"
      className={`${displayFont.variable} ${bodyFont.variable} ${playfulFont.variable}`}
      data-motion={settings.animationsEnabled ? undefined : "off"}
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeVars }} />
      </head>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <a href="#main" className="skip-link">Skip to main content</a>
        <MotionSettingsProvider animationsEnabled={settings.animationsEnabled}>
          <SiteChrome>
            <AmbientDoodles />
          </SiteChrome>
          <SmoothScroll>
            <BookingProvider>
              <SiteChrome>
                <ScrollProgress />
              </SiteChrome>
              <RouteScrollTop />
              <SiteChrome>
                <Navbar />
              </SiteChrome>
              <main id="main" className="flex-1">{children}</main>
              <SiteChrome>
                <Footer />
                <WhatsappFab />
                <BackToTop />
                <StickyMobileCta />
              </SiteChrome>
            </BookingProvider>
          </SmoothScroll>
        </MotionSettingsProvider>
      </body>
    </html>
  );
}
