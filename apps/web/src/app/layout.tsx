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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Play School, Kids Play Area & Birthday Venue in Khammam`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#2c3873",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["EntertainmentBusiness", "LocalBusiness"],
  "@id": `${siteConfig.url}/#business`,
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mamatha College Road, Above Just Bake, Near SBI Bank",
    addressLocality: "Khammam",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "22:00",
    },
  ],
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("10to10 Adventures, Mamatha College Road, Khammam"),
  areaServed: { "@type": "City", name: "Khammam" },
  priceRange: "₹₹",
  sameAs: [siteConfig.instagram],
  department: {
    "@type": "Preschool",
    name: "10to10 Adventures Play School",
    url: `${siteConfig.url}/play-school`,
    telephone: siteConfig.phone,
  },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
