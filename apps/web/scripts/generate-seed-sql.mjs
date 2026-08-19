// Generates migrations/0002_seed.sql from the same content/*.ts arrays the
// pages fall back to, so the D1 database ships pre-populated with the
// site's real copy. Run with `npx tsx scripts/generate-seed-sql.mjs`
// whenever the seed data needs regenerating, then re-run migrations.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const playschool = await import("../src/content/playschool.ts");
const parties = await import("../src/content/parties.ts");
const memberships = await import("../src/content/memberships.ts");

function esc(v) {
  return String(v).replace(/'/g, "''");
}

const rows = [];
function text(section, key, label, value, type = "text") {
  rows.push({ section, key: `${section}.${key}`, label, type, value });
}
function list(section, key, label, value) {
  rows.push({ section, key: `${section}.${key}`, label, type: "list", value: JSON.stringify(value) });
}

// Hero
text("hero", "badge", "Badge text", "Open 10 AM – 10 PM · 7 days a week");
text("hero", "heading_pre", "Heading — first part", "Seven zones of");
text("hero", "heading_emphasis", "Heading — highlighted word", "play");
text("hero", "heading_line2", "Heading — second line", "one unforgettable day.");
text(
  "hero",
  "subheading",
  "Subheading paragraph",
  "Khammam's all-in-one family playground. Soft play, play school, gaming, private theatre, party rooms and more — thoughtfully designed under one roof.",
  "richtext"
);

// About
text("about", "badge", "Badge text", "Our story");
text("about", "heading_pre", "Heading — first part", "We built");
text("about", "heading_emphasis", "Heading — highlighted words", "the playground");
text("about", "heading_post", "Heading — last part", "we wished we had.");
text(
  "about",
  "subheading",
  "Subheading paragraph",
  "10to10 Adventures started with a simple idea: every kid in Khammam deserves a place that's safe, vibrant, and genuinely fun — and every parent deserves a break without the guilt.",
  "richtext"
);
list("about", "values", "Our values", [
  { icon: "Heart", title: "Joy first", desc: "Every decision we make starts with the question: will this make a kid smile? If the answer is yes, it's in." },
  { icon: "Shield", title: "Safety, always", desc: "Trained staff, sanitised equipment, padded everything, and eyes on every corner. Your child is in good hands." },
  { icon: "Users", title: "Family feels", desc: "We're not a factory — we know kids by name. Parents are friends. Staff stick around for years." },
  { icon: "Sparkles", title: "Wonder fuel", desc: "We believe play is learning, celebration is memory, and the best childhood is the one kids remember forever." },
]);

// Play School
text("play-school", "badge", "Badge text", "Admissions open for 2026–27 · limited seats");
text("play-school", "heading_pre", "Heading — first part", "Where curiosity");
text("play-school", "heading_emphasis", "Heading — highlighted words", "beats curriculum");
text(
  "play-school",
  "subheading",
  "Subheading paragraph",
  "A play-first preschool in Khammam. No worksheets, no homework, no rote drills — children read through stories, count through cooking, and learn science by getting their hands dirty. With trained educators, a 1:8 ratio, daily reports to your phone, and an open-door policy.",
  "richtext"
);
list("play-school", "programs", "Programs (age groups)", playschool.programs);
list("play-school", "curriculum", "Curriculum pillars", playschool.curriculum);
list("play-school", "dailySchedule", "Daily schedule", playschool.dailySchedule);
list("play-school", "snacksMenu", "Snacks menu", playschool.snacksMenu);
list("play-school", "events", "Yearly events", playschool.events);
list("play-school", "fees", "Fees", playschool.fees);
list("play-school", "admissionSteps", "Admission steps", playschool.admissionSteps);
list("play-school", "whyUs", "Why choose us", playschool.whyUs);
list("play-school", "faqs", "FAQs", playschool.playSchoolFaqs);
list("play-school", "parentStories", "Parent testimonials", playschool.parentStories);

// Summer Camp
text("summer-camp", "badge", "Badge text", "Summer Camp 2027 · waitlist open");
text("summer-camp", "heading_pre", "Heading — first part", "Where summer turns into");
text("summer-camp", "heading_emphasis", "Heading — highlighted word", "unforgettable");
text(
  "summer-camp",
  "subheading",
  "Subheading paragraph",
  "Two months of meditation, art, dance, games, drawing and theme celebrations — for kids aged 3 to 12. Two-session days with a long lunch break, small batches, trained mentors.",
  "richtext"
);
list("summer-camp", "activities", "Activity tracks", [
  { icon: "Heart", title: "Meditation", desc: "Kid-friendly mindfulness, gentle breathing, and quiet-time stories to start the day grounded.", color: "bg-brand-mint/20 text-brand-turquoise" },
  { icon: "Palette", title: "Art & Craft", desc: "Painting, clay, origami, recycled crafts, and themed projects to spark creative confidence.", color: "bg-brand-primary/10 text-brand-primary" },
  { icon: "Music", title: "Storytelling & Dance", desc: "Two daily sessions — narrative play and freestyle moves with a closing showcase for parents.", color: "bg-brand-grape/10 text-brand-grape" },
  { icon: "Pencil", title: "Drawing", desc: "Mark-making, doodling, sketching, and turning imagination into colour on the page.", color: "bg-brand-turquoise/10 text-brand-turquoise" },
  { icon: "Trophy", title: "Fun Sessions & Games", desc: "Indoor sports, relay races, obstacle courses, team challenges and daily soft-play.", color: "bg-brand-orange/10 text-brand-orange" },
  { icon: "Sparkles", title: "Theme Celebrations", desc: "Pyjama day, superhero day, cultural day, water day, movie day and a grand finale.", color: "bg-brand-yellow/20 text-brand-orange" },
]);
list("summer-camp", "schedule", "Daily schedule", [
  { time: "09:30 – 10:10", activity: "Meditation", tag: "Morning" },
  { time: "10:10 – 10:50", activity: "Art & Craft", tag: "Morning" },
  { time: "10:50 – 11:10", activity: "Snacks break", tag: "Break" },
  { time: "11:10 – 11:40", activity: "Storytelling / Dance", tag: "Morning" },
  { time: "11:40 – 12:30", activity: "Drawing", tag: "Morning" },
  { time: "12:30 – 14:00", activity: "Lunch break", tag: "Lunch" },
  { time: "14:00 – 14:40", activity: "Fun session (Games)", tag: "Noon" },
  { time: "14:40 – 15:20", activity: "Dance / Storytelling", tag: "Noon" },
  { time: "15:20 – 15:40", activity: "Snacks break", tag: "Break" },
  { time: "15:40 – 16:20", activity: "Phoenix", tag: "Noon" },
  { time: "16:20 – 17:00", activity: "Theme celebration", tag: "Noon" },
]);
list("summer-camp", "ageGroups", "Age groups", [
  { name: "Little Explorers", age: "3 – 5 yrs", desc: "Sensory play, basic craft, music & movement, gentle yoga and loads of free play.", color: "from-brand-yellow/30 to-brand-orange/10", ring: "border-brand-orange/30" },
  { name: "Young Adventurers", age: "6 – 9 yrs", desc: "Structured art, dance, brain games, team sports, coding intro and themed workshops.", color: "from-brand-primary/20 to-brand-grape/10", ring: "border-brand-primary/30" },
  { name: "Teen Creators", age: "10 – 12 yrs", desc: "Advanced craft, chess, cube solving, gaming challenges, photography basics and leadership games.", color: "from-brand-turquoise/25 to-brand-grape/10", ring: "border-brand-turquoise/30" },
]);
list("summer-camp", "pricing", "Camp pricing", [
  { name: "Weekly Pass", price: "₹2,499", period: "/ week", popular: false, perks: ["5 days of fun", "All activities", "Daily snacks", "Certificate"] },
  { name: "Monthly Pass", price: "₹8,999", period: "/ month", popular: true, perks: ["20 days of fun", "All activities + special days", "Daily snacks & one hot meal", "Camp kit (t-shirt, cap, bag)", "Certificate + photo album", "Free trial session"] },
  { name: "Full Camp", price: "₹15,999", period: "/ 2 months", popular: false, perks: ["40 days of non-stop joy", "All monthly perks", "2 field trips", "Premium camp kit", "Grand finale performance", "10% sibling discount"] },
]);
list("summer-camp", "faqs", "FAQs", [
  { q: "What are the camp dates?", a: "April 1 – May 31, 2026. Monday to Friday, 9:30 AM – 5 PM with a 90-minute lunch break (12:30 – 2 PM). Weekends off. You can join weekly, monthly, or for the full 2 months." },
  { q: "Is food provided?", a: "Yes. All passes include a healthy snack break. The Monthly and Full Camp passes also include one hot meal daily. Please inform us of any allergies during enrollment." },
  { q: "Is there transportation?", a: "Pick-up and drop-off can be arranged within a 5 km radius of Khammam for an additional fee of ₹999/month. Please confirm availability when booking." },
  { q: "Can my child join mid-week?", a: "Absolutely! We prorate the weekly fee so your child can join any day. Reach out on WhatsApp and we'll get you sorted in minutes." },
  { q: "Is a trial session available?", a: "Yes — we offer a free 2-hour trial session for Monthly and Full Camp enrollments so your child can meet the team before committing." },
  { q: "How many kids per batch?", a: "We cap each age group at 20 kids with a 1:8 staff-to-child ratio, so every child gets personal attention and stays safe." },
  { q: "What should my child bring?", a: "Just a water bottle, a change of clothes, and a spare pair of socks. We provide all art supplies, games, mats, and the camp kit." },
  { q: "Are there any hidden fees?", a: "None. The listed price includes everything except optional transportation. Field trip costs are covered in the Full Camp pass." },
]);
list("summer-camp", "included", "What's included strip", [
  { icon: "Utensils", label: "Snacks & meals" },
  { icon: "ShieldCheck", label: "Trained staff" },
  { icon: "Users", label: "1:8 ratio" },
  { icon: "Bus", label: "Pickup (optional)" },
]);

// Party Planner
text("party-planner", "badge", "Badge text", "Birthday parties & private events");
text("party-planner", "heading_pre", "Heading — first part", "Throw the party they'll");
text("party-planner", "heading_emphasis", "Heading — highlighted words", "never forget");
text(
  "party-planner",
  "subheading",
  "Subheading paragraph",
  "Private venue, themed decor, cake, hosts, games, photography — we handle every tiny detail so you can actually enjoy your kid's big day. Private theatre from ₹1,000, party packages from ₹10,000.",
  "richtext"
);
list("party-planner", "packages", "Packages", parties.packages);
list("party-planner", "themes", "Party themes", parties.themes);
list("party-planner", "steps", "How it works steps", parties.steps);
list("party-planner", "addons", "Add-ons", parties.addons);
list("party-planner", "faqs", "FAQs", parties.partyFaqs);
list("party-planner", "testimonials", "Testimonials", parties.partyTestimonials);

// Memberships
text("memberships", "badge", "Badge text", "Memberships & passes");
text("memberships", "heading_pre", "Heading — first part", "Pick your");
text("memberships", "heading_emphasis", "Heading — highlighted words", "play plan");
text(
  "memberships",
  "subheading",
  "Subheading paragraph",
  "Three tiers and a multi-member family add-on. Free play hours, private movie screenings, birthday perks. Upgrade any time.",
  "richtext"
);
list("memberships", "tiers", "Membership tiers", memberships.tiers);
list("memberships", "sessionPricing", "Single-session pricing", memberships.sessionPricing);
list("memberships", "multiPlan", "Multi-member plan", [memberships.multiPlan]);
list("memberships", "compare", "Tier comparison table", [
  { feature: "Price", silver: "₹599 / mo", gold: "₹2,000 / 6 mo", platinum: "₹3,499 / yr" },
  { feature: "Free play hours", silver: "1 hour", gold: "6 hours", platinum: "12 hours" },
  { feature: "Free private movie screenings", silver: "1 theatre hour", gold: "1 screening", platinum: "2 screenings" },
  { feature: "Discount on play hours", silver: "25%", gold: "extra 30%", platinum: "40%" },
  { feature: "Discount on snacks", silver: "10%", gold: "10%", platinum: "10%" },
  { feature: "Discount on gaming", silver: "10%", gold: "10%", platinum: "10%" },
  { feature: "Discount on theatre & parties", silver: "—", gold: "10%", platinum: "10%" },
  { feature: "Birthday surprise gift", silver: false, gold: true, platinum: true },
  { feature: "Birthday party-area discount", silver: "—", gold: "20%", platinum: "20%" },
  { feature: "Multi-member family add-on", silver: "50% off", gold: "50% off", platinum: "50% off" },
]);
list("memberships", "faqs", "FAQs", [
  { q: "How do I sign up for a membership?", a: "Tap any 'Choose plan' button or send us a WhatsApp message with your preferred tier. We'll activate your membership within 30 minutes. Payment via UPI, card, or cash at the venue." },
  { q: "Can I upgrade mid-plan?", a: "Absolutely. Upgrade any time — we credit your remaining balance toward the new tier. Downgrades take effect at the next renewal." },
  { q: "How does the Multi Members Plan work?", a: "Add cousins, siblings, or friends to any base plan and the extra members pay 50% of the plan price. Each linked member gets the same benefits as the primary member. Example: 1st child on annual Platinum is ₹3,499; 2nd child on the same plan is ₹1,749." },
  { q: "Do membership perks include the party room?", a: "Yes. Gold and Platinum members get 10% off theatre and party bookings plus a 20% birthday party-area discount and a birthday surprise gift. Silver focuses on play & gaming perks." },
  { q: "What counts as a 'free play hour'?", a: "One hour of soft-play access at the play area. Silver includes 1 hour, Gold includes 6 hours, and Platinum includes 12 hours. Use them whenever — they don't roll over after the plan period ends." },
]);

// Contact
text("contact", "badge", "Badge text", "Get in touch");
text(
  "contact",
  "subheading",
  "Subheading paragraph",
  "No boring forms here — just tap a few bubbles below and we'll take it from there on WhatsApp. Or call, email, drop by. We reply in minutes.",
  "richtext"
);
list("contact", "faqs", "FAQs", [
  { q: "How fast do you reply?", a: "On WhatsApp during business hours we typically respond in under 5 minutes. Email replies within a few hours. Phone calls are answered live." },
  { q: "Can I just walk in without booking?", a: "Absolutely — drop-ins are always welcome. Booking ahead just guarantees your slot during peak hours and weekends." },
  { q: "Do you take group / school bookings?", a: "Yes. We host school field trips, birthday parties, and corporate family days. Drop us a message with your group size and we'll send a custom quote." },
]);
list("contact", "hoursTable", "Business hours", [
  { day: "Monday", open: 10, close: 22 },
  { day: "Tuesday", open: 10, close: 22 },
  { day: "Wednesday", open: 10, close: 22 },
  { day: "Thursday", open: 10, close: 22 },
  { day: "Friday", open: 10, close: 22 },
  { day: "Saturday", open: 10, close: 22 },
  { day: "Sunday", open: 10, close: 22 },
]);

const now = "2026-01-01T00:00:00.000Z";
const lines = [
  "-- Generated by scripts/generate-seed-sql.mjs — do not hand-edit, regenerate instead.",
  "INSERT OR IGNORE INTO SiteSettings (id, colorPrimary, colorTurquoise, colorYellow, colorOrange, colorGrape, colorMint, colorSky, colorInk, colorCloud, animationsEnabled, updatedAt) VALUES ('default', '#2c3873', '#00d4c8', '#ffd93d', '#ff8a3d', '#8b5cf6', '#7ce2b5', '#7cc5ff', '#1a1033', '#fff9f2', 1, '" + now + "');",
];
for (const r of rows) {
  const id = `seed_${esc(r.key).replace(/[^a-zA-Z0-9]/g, "_")}`;
  lines.push(
    `INSERT OR IGNORE INTO ContentItem (id, section, key, label, type, value, updatedAt) VALUES ('${id}', '${esc(r.section)}', '${esc(r.key)}', '${esc(r.label)}', '${esc(r.type)}', '${esc(r.value)}', '${now}');`
  );
}

const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "migrations", "0002_seed.sql");
writeFileSync(outPath, lines.join("\n") + "\n");
console.log(`Wrote ${rows.length + 1} rows to ${outPath}`);
