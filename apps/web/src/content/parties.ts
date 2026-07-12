export type PartyPackage = {
  slug: string;
  name: string;
  price: string;
  guests: string;
  duration: string;
  tagline: string;
  highlight?: boolean;
  includes: string[];
};

export const packages: PartyPackage[] = [
  {
    slug: "theatre",
    name: "Private Theatre",
    price: "₹1,000+",
    guests: "Per-person rates",
    duration: "3 hours",
    tagline: "Movie booking + per-person snacks. A cosy, small-group celebration.",
    includes: [
      "Movie booking (3 hours, room only) — ₹1,000",
      "Per person with snacks (popcorn + drink) — ₹250",
      "Per person without snacks — ₹200",
      "Movie of your choice (kid-friendly catalogue)",
      "Themed entrance & decor of your choice (add-on)",
      "Photography (add-on at ₹1,000/hour)",
      "Cake cutting ceremony setup",
    ],
  },
  {
    slug: "combo",
    name: "Party + Theatre Combo",
    price: "₹15,000",
    guests: "Up to 30 members",
    duration: "3 hours",
    tagline: "Both rooms, 30 kids, the full experience — book together and save.",
    highlight: true,
    includes: [
      "Both rooms (party + theatre) — ₹8,000",
      "Decoration accessories (backdrop) — ₹3,000",
      "Photography (1 hour) — ₹1,000",
      "Snacks: welcome drink, cake & hot snacks — ₹3,000",
      "1 hour FREE play area on purchase",
      "Food customisation available at reception",
      "Ask about membership offers for extra discounts",
      "Cleaning charges applicable",
    ],
  },
  {
    slug: "party-place",
    name: "Party Place",
    price: "₹10,000",
    guests: "Up to 15 members",
    duration: "3 hours",
    tagline: "Decorated party room, 15 kids, host + photography + snacks.",
    includes: [
      "Decorated party room — ₹5,000",
      "Premium theme decoration of your choice — ₹2,500",
      "Photography (1 hour) — ₹1,000",
      "Snacks: welcome drink, cake & hot snacks — ₹1,500",
      "1 hour FREE play area on purchase",
      "Party host with games & activities",
      "Cake cutting ceremony setup",
      "Digital invitation card",
    ],
  },
];

export const themes = [
  { name: "Unicorn Magic", icon: "🦄", color: "from-pink-300 to-purple-300" },
  { name: "Superhero Squad", icon: "🦸", color: "from-blue-400 to-red-400" },
  { name: "Jungle Safari", icon: "🦁", color: "from-green-300 to-yellow-400" },
  { name: "Space Explorer", icon: "🚀", color: "from-indigo-400 to-purple-500" },
  { name: "Under the Sea", icon: "🐠", color: "from-cyan-300 to-blue-400" },
  { name: "Princess Palace", icon: "👑", color: "from-pink-400 to-rose-300" },
  { name: "Dino World", icon: "🦖", color: "from-emerald-400 to-lime-400" },
  { name: "Pick your own", icon: "✨", color: "from-brand-yellow to-brand-orange" },
];

export const steps = [
  {
    n: "01",
    title: "Pick a package & date",
    desc: "Tell us your preferred date, guest count, and package. We'll confirm availability within hours.",
  },
  {
    n: "02",
    title: "Choose your theme",
    desc: "Pick from our 8 themes or tell us your own — we'll match decor, playlist, and photo corner.",
  },
  {
    n: "03",
    title: "Pay 30% deposit",
    desc: "Secure the date with a refundable 30% deposit. Balance payable on event day.",
  },
  {
    n: "04",
    title: "Send the invites",
    desc: "We design a custom digital invitation card for you to share on WhatsApp within 24 hours.",
  },
  {
    n: "05",
    title: "Show up & celebrate",
    desc: "Arrive 30 min early to meet your party host. We handle setup, cleanup, and everything in between.",
  },
];

export const addons = [
  { name: "Extra cake (per kg)", price: "₹1,200", icon: "🎂" },
  { name: "Custom cake topper", price: "₹499", icon: "🧁" },
  { name: "Photography (per hour)", price: "₹1,000", icon: "📸" },
  { name: "Goodie bags (per child)", price: "₹199", icon: "🎁" },
  { name: "Extend theatre time (1 hr)", price: "₹2,499", icon: "🎬" },
  { name: "Extra decoration backdrop", price: "₹2,500", icon: "🎈" },
  { name: "Face painter (1 hr)", price: "₹1,799", icon: "🎨" },
  { name: "Food customisation", price: "Ask reception", icon: "🍽️" },
];

export const partyFaqs = [
  {
    q: "How far in advance should I book?",
    a: "We recommend booking at least 2 weeks ahead for weekends and holidays. Weekday slots can usually be confirmed within 48 hours. Peak months (Nov–Feb) fill up fast.",
  },
  {
    q: "Can I customise the theme and decor?",
    a: "Absolutely. Our 8 themes are starting points — share your vision, mood board, or a Pinterest link and we'll tailor the decor to match. Fully custom themes may have a small surcharge.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Cancellations more than 7 days before the event get a full deposit refund. Between 3–7 days, 50% refund. Less than 72 hours, the deposit is non-refundable but we'll happily reschedule within 90 days at no extra cost.",
  },
  {
    q: "Can you handle dietary restrictions?",
    a: "Yes. We offer vegetarian, Jain, eggless, and gluten-free options. Please inform us of any allergies or restrictions at least 48 hours before the event.",
  },
  {
    q: "Can parents stay during the party?",
    a: "Of course — we encourage it! Parents get their own seating area with complimentary tea/coffee in Party Place and Combo packages.",
  },
  {
    q: "Do you provide the cake or do we bring our own?",
    a: "Both options work. Our Party Place and Combo packages include the snacks bundle — welcome drink, cake and hot snacks. Private Theatre is per-person priced and the cake is an add-on (or bring your own, no cake-cutting fee). Extra cake (per kg) is always available as an add-on.",
  },
  {
    q: "Are cleaning charges separate?",
    a: "A small cleaning charge applies on top of the package amount — it covers floor mopping, balloon and decor removal, and full-room reset after your event.",
  },
  {
    q: "Can I customise the food and snacks?",
    a: "Yes — check with reception. We can swap items in the snacks bundle, accommodate dietary needs (Jain, eggless, gluten-free), and arrange larger platters. Allergies must be flagged at least 48 hours before the event.",
  },
  {
    q: "What is the earliest and latest start time?",
    a: "Parties can start any time between 10 AM and 8 PM, Monday to Sunday. Evening slots are most popular — book early.",
  },
];

export const partyTestimonials = [
  {
    quote:
      "We had our daughter's 5th birthday here and I can't stop raving about it. The decor was exactly as I'd pinned, the host was incredible with the kids, and I actually got to enjoy the party instead of running it. Worth every rupee.",
    name: "Sneha P.",
    role: "Mom of 5-year-old",
    package: "Party Place",
  },
  {
    quote:
      "Booked the Classic package for my twin boys' 7th birthday. 24 kids, zero stress, incredible food, and the private theatre show was the highlight. The staff treated us like family.",
    name: "Rakesh A.",
    role: "Dad of twins",
    package: "Party + Theatre Combo",
  },
  {
    quote:
      "First birthday party I've hosted where I didn't cry from exhaustion at the end. The team at 10to10 handled every tiny detail. Goodie bags, cake cutting, photos — all done. Booking them again next year.",
    name: "Divya K.",
    role: "Mom of 3-year-old",
    package: "Private Theatre",
  },
];
