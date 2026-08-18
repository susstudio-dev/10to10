import { getContentMap, parseList } from "@/lib/content";
import { ContactPageClient } from "./contact-page-client";

const faqsDefault = [
  {
    q: "How fast do you reply?",
    a: "On WhatsApp during business hours we typically respond in under 5 minutes. Email replies within a few hours. Phone calls are answered live.",
  },
  {
    q: "Can I just walk in without booking?",
    a: "Absolutely — drop-ins are always welcome. Booking ahead just guarantees your slot during peak hours and weekends.",
  },
  {
    q: "Do you take group / school bookings?",
    a: "Yes. We host school field trips, birthday parties, and corporate family days. Drop us a message with your group size and we'll send a custom quote.",
  },
];

const hoursTableDefault = [
  { day: "Monday", open: 10, close: 22 },
  { day: "Tuesday", open: 10, close: 22 },
  { day: "Wednesday", open: 10, close: 22 },
  { day: "Thursday", open: 10, close: 22 },
  { day: "Friday", open: 10, close: 22 },
  { day: "Saturday", open: 10, close: 22 },
  { day: "Sunday", open: 10, close: 22 },
];

export default async function ContactPage() {
  const c = await getContentMap("contact");
  const badge = c["contact.badge"] ?? "Get in touch";
  const subheading =
    c["contact.subheading"] ??
    "No boring forms here — just tap a few bubbles below and we'll take it from there on WhatsApp. Or call, email, drop by. We reply in minutes.";
  const faqs = parseList(c["contact.faqs"], faqsDefault);
  const hoursTable = parseList(c["contact.hoursTable"], hoursTableDefault);

  return <ContactPageClient badge={badge} subheading={subheading} faqs={faqs} hoursTable={hoursTable} />;
}
