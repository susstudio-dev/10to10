export type Tier = {
  slug: "silver" | "gold" | "platinum";
  name: string;
  price: string;
  period: string;
  tagline: string;
  highlight?: boolean;
  perks: string[];
};

export const tiers: Tier[] = [
  {
    slug: "silver",
    name: "Silver",
    price: "₹599",
    period: "/ month",
    tagline: "Dip your toes in. Great for occasional visits.",
    perks: [
      "1 free play hour",
      "1 free theatre hour",
      "25% off on play hours",
      "10% off on snacks",
      "10% off on gaming",
    ],
  },
  {
    slug: "gold",
    name: "Gold",
    price: "₹2,000",
    period: "/ half year",
    tagline: "For regulars who want more play and a private movie night.",
    highlight: true,
    perks: [
      "1 free private movie screening",
      "6 free play hours",
      "Extra 30% off on play hours",
      "10% off on snacks, gaming, theatre, parties",
      "Birthday perks: surprise gift + 20% off on party area",
    ],
  },
  {
    slug: "platinum",
    name: "Platinum",
    price: "₹3,499",
    period: "/ year",
    tagline: "The royal pass. Best value for families.",
    perks: [
      "12 free play hours",
      "2 free private movie screenings",
      "40% off on play hours",
      "10% off on snacks, gaming, theatre, parties",
      "Birthday perks: surprise gift + 20% off on party area",
    ],
  },
];

export const sessionPricing = [
  { label: "Single Pass", price: "₹499", note: "1 person" },
  { label: "Couple Pass", price: "₹799", note: "2 people" },
  { label: "Family Pass", price: "₹1,199", note: "Up to 4 people" },
];

export type MultiPlan = {
  name: string;
  tagline: string;
  perks: string[];
  example: string;
};

export const multiPlan: MultiPlan = {
  name: "Multi Members Plan",
  tagline:
    "Add cousins, siblings, or friends to any base plan and save 50% on every extra member.",
  perks: [
    "50% off any plan for additional child (siblings, cousins, friends)",
    "Each linked member gets the same benefits as the base plan",
    "Ideal for families with 2+ kids",
  ],
  example:
    "1st child on annual Platinum: ₹3,499 · 2nd child on the same plan: ₹1,749",
};
