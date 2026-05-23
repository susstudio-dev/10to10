export type Accent = "primary" | "turquoise" | "yellow" | "grape" | "orange" | "mint" | "sky";

export type ZonePricing = {
  label: string;
  price: string;
  note?: string;
};

export type Zone = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  ages: string;
  highlights: string[];
  accent: Accent;
  icon: string;
  pricing?: ZonePricing[];
};

export const zones: Zone[] = [
  {
    slug: "soft-play-area",
    name: "Soft Play Arena",
    tagline: "2,400 sq ft of pure joy",
    description:
      "A vibrant, padded wonderland built for crawlers, walkers, and runners. Slides, ball pits, climbing nets, and sensory corners — all sanitized hourly.",
    ages: "0 – 10 yrs",
    highlights: ["Sensory zones", "Climbing structures", "Ball pit", "Toddler-safe"],
    accent: "primary",
    icon: "🧸",
    pricing: [
      { label: "1 hour", price: "₹300", note: "per child" },
      { label: "2 hours", price: "₹500", note: "per child" },
      { label: "3 hours", price: "₹600", note: "per child" },
      { label: "Monthly subscription", price: "₹5,000", note: "1 hour daily" },
      { label: "Annual subscription", price: "₹40,000", note: "all-year access" },
    ],
  },
  {
    slug: "play-school",
    name: "Play School",
    tagline: "We don't teach. Kids learn by playing.",
    description:
      "Khammam's only play-first preschool. No worksheets, no rote drills, no homework — children pick up reading, writing and numbers through stories, songs, and hands-on discovery. Trained educators, daily reports, open-door policy.",
    ages: "18 mo – 5 yrs",
    highlights: ["No worksheets, no homework", "Trained educators", "1:8 ratio", "Free trial day"],
    accent: "grape",
    icon: "✏️",
  },
  {
    slug: "gaming-area",
    name: "Gaming Arena",
    tagline: "PS5, VR, and couch co-op",
    description:
      "A next-gen gaming lounge for kids, teens, and families. PS5 titles, immersive VR experiences, racing rigs, and classic couch co-op on the big screen.",
    ages: "All ages",
    highlights: ["PS5 library", "VR headsets", "Racing rigs", "Tournaments"],
    accent: "turquoise",
    icon: "🎮",
    pricing: [
      { label: "PS4 / PS5 — Single Player", price: "₹200", note: "per 30 min" },
      { label: "PS4 / PS5 — Multi Player", price: "₹300", note: "per 30 min" },
      { label: "VR (one game)", price: "₹200", note: "up to 10 min" },
    ],
  },
  {
    slug: "private-theatre-room",
    name: "Private Theatre",
    tagline: "Your own cinema, your rules",
    description:
      "A private screening room for movie nights, birthdays, proposal surprises, or just a chilled-out family afternoon. Bring your own watchlist.",
    ages: "All ages",
    highlights: ["Dolby audio", "Custom playlists", "Snack service", "Dim lighting"],
    accent: "grape",
    icon: "🎬",
    pricing: [
      { label: "Movie booking", price: "₹1,000", note: "3 hours, room only" },
      { label: "Per person — with snacks", price: "₹250", note: "popcorn + drink" },
      { label: "Per person — without snacks", price: "₹200" },
      { label: "Decoration & photography", price: "Add-on", note: "ask at reception" },
    ],
  },
  {
    slug: "party-room",
    name: "Party Room",
    tagline: "Birthdays that become core memories",
    description:
      "A dedicated celebration space with theming, decor, cake, hosts, and a dozen ways to surprise the birthday star. We handle the chaos, you collect the hugs.",
    ages: "Up to 50 guests",
    highlights: ["Themed decor", "Party hosts", "Cake options", "Photo corner"],
    accent: "yellow",
    icon: "🎉",
  },
  {
    slug: "refreshment-zone",
    name: "Refreshment Zone",
    tagline: "Snack, sip, recharge",
    description:
      "A clean, kid-friendly pantry serving fresh snacks, fruit, beverages, and party platters — because nothing kills fun faster than a hungry toddler.",
    ages: "All ages",
    highlights: ["Fresh snacks", "Healthy options", "Party platters", "Coffee bar"],
    accent: "orange",
    icon: "🍿",
  },
  {
    slug: "stalls",
    name: "Curated Stalls",
    tagline: "Toys, books, and small wonders",
    description:
      "A rotating curation of local toys, books, and craft kits — perfect take-home souvenirs and thoughtful gifts for the little explorer in your life.",
    ages: "All ages",
    highlights: ["Local brands", "Books & toys", "Craft kits", "Gift wrap"],
    accent: "mint",
    icon: "🎁",
  },
];
