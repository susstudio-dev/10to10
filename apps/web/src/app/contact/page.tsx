"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  MessageCircle,
  Navigation,
  Languages,
  Timer,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import { siteConfig } from "@/lib/utils";
import { submitLead } from "@/lib/lead";
import { Bunting, Float, Tape, SunDoodle, CloudDoodle, SmileDoodle } from "@/components/playful";

// Single source of truth: 10 AM – 10 PM, every day — it's in the name. 10 to 10!
type DayHour = { day: string; open: number; close: number };
const hoursTable: DayHour[] = [
  { day: "Monday", open: 10, close: 22 },
  { day: "Tuesday", open: 10, close: 22 },
  { day: "Wednesday", open: 10, close: 22 },
  { day: "Thursday", open: 10, close: 22 },
  { day: "Friday", open: 10, close: 22 },
  { day: "Saturday", open: 10, close: 22 },
  { day: "Sunday", open: 10, close: 22 },
];

// JS Date.getDay(): 0 = Sunday → our table starts Monday, so map:
const dayNameForJsDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function fmtHour(h: number) {
  if (h === 0) return "12 AM";
  if (h === 12) return "12 PM";
  return h < 12 ? `${h} AM` : `${h - 12} PM`;
}

const contactFaqs = [
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: contactFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

// ——— Conversational flow ———————————————————————————————————————
const topics = [
  { emoji: "🎂", label: "Plan a birthday party" },
  { emoji: "🏫", label: "Play school admission" },
  { emoji: "☀️", label: "Summer camp" },
  { emoji: "🎟️", label: "Memberships & passes" },
  { emoji: "🧸", label: "Just coming to play" },
  { emoji: "💬", label: "Something else" },
] as const;

const timings = ["Today", "This weekend", "Next week", "Just exploring"] as const;

const topicReplies: Record<string, string> = {
  "Plan a birthday party": "Yay, birthdays are our favourite! 🎉 When are you thinking of celebrating?",
  "Play school admission": "Lovely! Our little classroom would love to meet your little one. When would you like to visit?",
  "Summer camp": "Sunshine mode! ☀️ When would you like to drop by and see the camp space?",
  "Memberships & passes": "Smart move — members save up to 50%. When can you come by for a tour?",
  "Just coming to play": "The ball pit is ready! 🧸 When are you planning to come?",
  "Something else": "No problem — we're all ears. When works for you to connect or visit?",
};

export default function ContactPage() {
  // chat state
  const [topic, setTopic] = useState<string | null>(null);
  const [timing, setTiming] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const [waOpened, setWaOpened] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // keep the newest bubble in view as the conversation grows — but not on
  // first mount (else the page jumps past the hero straight to the chat card)
  useEffect(() => {
    if (!topic && !timing && !sent) return;
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [topic, timing, sent]);

  // compute "open now" status on the client only
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const i = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(i);
  }, []);

  const status = useMemo(() => {
    if (!now) return null;
    const todayName = dayNameForJsDay[now.getDay()];
    const today = hoursTable.find((h) => h.day === todayName);
    if (!today) return null;
    const hr = now.getHours() + now.getMinutes() / 60;
    const isOpen = hr >= today.open && hr < today.close;
    return {
      isOpen,
      todayName,
      closes: fmtHour(today.close),
      opens: fmtHour(today.open),
    };
  }, [now]);

  const restart = () => {
    setTopic(null);
    setTiming(null);
    setNote("");
    setSent(false);
    setWaUrl(null);
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !name || !phone) return;
    setSubmitting(true);
    try {
      const result = await submitLead(
        "Contact Page",
        {
          name,
          phone,
          topic: topic ?? "General",
          when: timing ?? "Flexible",
          message: note,
        },
        {
          whatsappBody:
            `Hi 10to10! I'm ${name} 👋\n` +
            `• Interested in: ${topic ?? "General inquiry"}\n` +
            `• When: ${timing ?? "Flexible"}\n` +
            (note ? `• Note: ${note}\n` : "") +
            `• My number: ${phone}`,
        }
      );
      setWaUrl(result.whatsappUrl);
      setWaOpened(result.whatsapp);
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  const directions =
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent("10to10 Adventures, Mamatha College Road, Near SBI Bank, Khammam");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* HERO — Contact theme: friendly chat-bubble palette, fades into body */}
      <section className="relative pt-28 md:pt-32 pb-12 md:pb-16 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -top-32 -left-24 w-[600px] h-[600px] rounded-full bg-brand-turquoise/22 blur-3xl" />
          <div className="absolute -top-10 right-0 w-[520px] h-[520px] rounded-full bg-brand-yellow/26 blur-3xl" />
          <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full bg-brand-grape/16 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 w-[440px] h-[440px] rounded-full bg-rose-300/26 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 10% 26%, #00d4c8 1.4px, transparent 2px), radial-gradient(circle at 64% 14%, #ffd93d 1.4px, transparent 2px), radial-gradient(circle at 88% 56%, #8b5cf6 1.4px, transparent 2px), radial-gradient(circle at 32% 78%, #ff5a8a 1.4px, transparent 2px)",
              backgroundSize: "180px 180px",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#fdfbf7]" />
        </div>

        <Float className="top-28 left-[7%] w-12 text-brand-yellow opacity-70 hidden md:block" speed="slow">
          <SunDoodle className="w-full" />
        </Float>
        <Float className="top-40 right-[8%] w-14 text-brand-turquoise opacity-60 hidden md:block" speed="fast">
          <CloudDoodle className="w-full" />
        </Float>
        <Float className="bottom-10 left-[16%] w-9 text-brand-grape opacity-60 hidden md:block" speed="wiggle">
          <SmileDoodle className="w-full" />
        </Float>

        <div className="container relative max-w-4xl text-center">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="sticker">
              <MessageCircle className="h-3.5 w-3.5 text-brand-turquoise" /> Get in touch
            </span>
            {status && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`sticker ${status.isOpen ? "!border-emerald-600" : ""}`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    status.isOpen ? "bg-emerald-500 animate-pulse" : "bg-brand-ink/30"
                  }`}
                />
                {status.isOpen ? `Open now · closes ${status.closes}` : `Closed · opens ${status.opens}`}
              </motion.span>
            )}
          </div>

          <h1 className="heading-xl mt-6">
            Come say{" "}
            <span className="relative inline-block">
              <span className="gradient-text">hi</span>
              <span className="absolute -top-3 -right-8 text-3xl select-none rotate-12">👋</span>
            </span>
            .
          </h1>
          <p className="mt-5 text-lg md:text-xl text-brand-ink/75 leading-relaxed max-w-2xl mx-auto">
            No boring forms here — just tap a few bubbles below and we&apos;ll take it
            from there on WhatsApp. Or call, email, drop by. We reply in minutes.
          </p>
        </div>
      </section>

      {/* MAIN GRID: chat first, info beside */}
      <section className="pb-20">
        <div className="container grid lg:grid-cols-5 gap-6">
          {/* CHAT CARD */}
          <div className="lg:col-span-3 order-1">
            <Bunting className="mx-auto mb-3 w-44 md:w-56" />
            <div className="relative rounded-[2rem] bg-white border-2 border-brand-ink/10 shadow-lifted overflow-hidden">
              {/* chat header */}
              <div className="flex items-center gap-3 px-5 md:px-7 py-4 bg-gradient-to-r from-brand-primary to-brand-primary-deep text-white">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-xl">
                    🦁
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-brand-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-display font-bold leading-tight">Sunny from 10to10</div>
                  <div className="text-[11px] text-white/70">
                    {status?.isOpen ? "Online · replies in ~5 min" : "We'll reply first thing tomorrow"}
                  </div>
                </div>
                {(topic || sent) && (
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-white/10 hover:bg-white/20 rounded-full px-3 py-1.5 transition"
                  >
                    <RotateCcw className="h-3 w-3" /> Start over
                  </button>
                )}
              </div>

              {/* chat body */}
              <div className="px-4 md:px-7 py-6 space-y-4 min-h-[380px] bg-[radial-gradient(circle_at_20%_20%,rgba(0,212,200,0.05),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.05),transparent_50%)]">
                <BotBubble>
                  Hey! 👋 Welcome to 10to10 Adventures. What brings you in today?
                </BotBubble>

                {/* Step 1 — topic */}
                {!topic ? (
                  <ChipRow>
                    {topics.map((t) => (
                      <Chip key={t.label} onClick={() => setTopic(t.label)}>
                        <span className="mr-1">{t.emoji}</span>
                        {t.label}
                      </Chip>
                    ))}
                  </ChipRow>
                ) : (
                  <UserBubble>
                    {topics.find((t) => t.label === topic)?.emoji} {topic}
                  </UserBubble>
                )}

                {/* Step 2 — timing */}
                {topic && (
                  <>
                    <BotBubble delay={0.15}>{topicReplies[topic]}</BotBubble>
                    {!timing ? (
                      <ChipRow>
                        {timings.map((t) => (
                          <Chip key={t} onClick={() => setTiming(t)}>
                            {t}
                          </Chip>
                        ))}
                      </ChipRow>
                    ) : (
                      <UserBubble>{timing}</UserBubble>
                    )}
                  </>
                )}

                {/* Step 3 — details + send */}
                {topic && timing && !sent && (
                  <>
                    <BotBubble delay={0.15}>
                      Perfect! Last step — who should we say hi to? We&apos;ll
                      continue this chat on WhatsApp. 💬
                    </BotBubble>
                    <motion.form
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      onSubmit={send}
                      className="ml-10 md:ml-12 rounded-2xl rounded-tl-md bg-brand-cloud border-2 border-brand-ink/10 p-4 space-y-3 max-w-md"
                    >
                      <div className="grid sm:grid-cols-2 gap-3">
                        <input
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="input !py-2.5 text-sm"
                          placeholder="Your name"
                          autoComplete="name"
                          aria-label="Your name"
                        />
                        <input
                          required
                          type="tel"
                          inputMode="tel"
                          pattern="[0-9+\s\-]{10,15}"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="input !py-2.5 text-sm"
                          placeholder="WhatsApp number"
                          autoComplete="tel"
                          aria-label="WhatsApp number"
                        />
                      </div>
                      <input
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="input !py-2.5 text-sm"
                        placeholder="Anything else? (optional)"
                        aria-label="Anything else? (optional)"
                      />
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-primary w-full disabled:cursor-wait"
                      >
                        {submitting ? (
                          <>
                            <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                            Opening WhatsApp…
                          </>
                        ) : (
                          <>
                            <MessageCircle className="h-4 w-4" />
                            Continue on WhatsApp
                          </>
                        )}
                      </button>
                      <p className="text-[11px] text-brand-ink/70 text-center">
                        Free · no spam · we only message you back about this
                      </p>
                    </motion.form>
                  </>
                )}

                {/* Step 4 — sent */}
                {sent && (
                  <>
                    <UserBubble>
                      {name} · {phone}
                      {note ? ` · ${note}` : ""}
                    </UserBubble>
                    <BotBubble delay={0.15}>
                      <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700">
                        <CheckCircle2 className="h-4 w-4" /> Done!
                      </span>{" "}
                      {waOpened
                        ? "WhatsApp opened with your message — just hit send and a real human will reply in minutes. 🎉"
                        : "One more tap: open WhatsApp below to send your message — a real human will reply in minutes. 🎉"}
                      {waUrl && (
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`${waOpened ? "btn-ghost" : "btn-primary"} !py-2 !px-4 text-xs mt-3 flex w-fit`}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          {waOpened ? "WhatsApp didn't open?" : "Open WhatsApp"}
                        </a>
                      )}
                    </BotBubble>
                  </>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* chat footer — escape hatches */}
              <div className="px-5 md:px-7 py-3.5 border-t border-brand-ink/5 bg-white flex items-center justify-center gap-4 flex-wrap text-xs font-semibold text-brand-ink/60">
                Prefer the classics?
                <a href={siteConfig.phoneHref} className="inline-flex items-center gap-1.5 text-brand-primary hover:underline">
                  <Phone className="h-3.5 w-3.5" /> {siteConfig.phone}
                </a>
                <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-1.5 text-brand-primary hover:underline">
                  <Mail className="h-3.5 w-3.5" /> Email us
                </a>
              </div>
            </div>

            {/* Quick channel tiles */}
            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
              <ChannelCard
                href={`${siteConfig.whatsapp}?text=Hi%2010to10!`}
                icon={MessageCircle}
                label="WhatsApp"
                sub="Fastest reply"
                tint="from-emerald-100 to-teal-50"
                accent="bg-emerald-500 text-white"
                ring="ring-emerald-300/60"
                external
              />
              <ChannelCard
                href={siteConfig.phoneHref}
                icon={Phone}
                label="Call us"
                sub={siteConfig.phone}
                tint="from-indigo-100 to-blue-50"
                accent="bg-brand-primary text-white"
                ring="ring-brand-primary/40"
              />
              <ChannelCard
                href={`mailto:${siteConfig.email}`}
                icon={Mail}
                label="Email"
                sub="Replies in hours"
                tint="from-purple-100 to-violet-50"
                accent="bg-brand-grape text-white"
                ring="ring-brand-grape/40"
              />
              <ChannelCard
                href={directions}
                icon={Navigation}
                label="Directions"
                sub="Open in Maps"
                tint="from-amber-100 to-orange-50"
                accent="bg-brand-orange text-white"
                ring="ring-brand-orange/40"
                external
              />
            </div>

            {/* Mini FAQ */}
            <div className="mt-6 space-y-2">
              {contactFaqs.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-2xl bg-white border-2 border-brand-ink/5 hover:border-brand-primary/20 transition overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 p-4 cursor-pointer list-none font-semibold text-sm">
                    <span>{f.q}</span>
                    <span className="w-7 h-7 rounded-full bg-brand-ink/5 flex items-center justify-center text-lg group-open:rotate-45 transition shrink-0">
                      +
                    </span>
                  </summary>
                  <p className="px-4 pb-4 text-sm text-brand-ink/65 leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* RIGHT — info + hours */}
          <div className="lg:col-span-2 space-y-6 order-2">
            {/* VISIT US */}
            <div className="relative">
            <Tape className="-top-3 left-8 -rotate-6 z-10" />
            <div className="relative rounded-3xl bg-white border-2 border-brand-ink/5 p-6 md:p-8 shadow-lifted space-y-5 overflow-hidden">
              <span className="absolute inset-x-0 top-0 h-1.5 rainbow-strip" />
              <span className="absolute -top-12 -right-10 w-32 h-32 rounded-full bg-brand-primary/8 blur-2xl pointer-events-none" />
              <h2 className="font-display text-lg font-bold flex items-center gap-2 relative">
                <MapPin className="h-5 w-5 text-brand-primary" />
                Visit us
              </h2>
              <InfoRow icon={MapPin} label="Address" tint="bg-brand-primary/10 text-brand-primary">
                {siteConfig.address}
              </InfoRow>
              <InfoRow icon={Phone} label="Phone" tint="bg-emerald-100 text-emerald-700">
                <a href={siteConfig.phoneHref} className="hover:text-brand-primary transition">
                  {siteConfig.phone}
                </a>
              </InfoRow>
              <InfoRow icon={Mail} label="Email" tint="bg-brand-grape/15 text-brand-grape">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-brand-primary break-all transition"
                >
                  {siteConfig.email}
                </a>
              </InfoRow>
              <InfoRow icon={Instagram} label="Instagram" tint="bg-rose-100 text-rose-600">
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-primary transition"
                >
                  @10to10play
                </a>
              </InfoRow>
            </div>
            </div>

            {/* HOURS */}
            <div className="relative rounded-3xl bg-white border-2 border-brand-ink/5 p-6 md:p-8 shadow-lifted overflow-hidden">
              <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-400 via-brand-orange to-rose-400" />
              <span className="absolute -bottom-16 -left-10 w-40 h-40 rounded-full bg-brand-yellow/12 blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between mb-4 relative">
                <h2 className="font-display text-lg font-bold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-600" />
                  Opening hours
                </h2>
                {status && (
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
                      status.isOpen
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-brand-ink/5 text-brand-ink/55"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${status.isOpen ? "bg-emerald-500 animate-pulse" : "bg-brand-ink/30"}`} />
                    {status.isOpen ? "Open" : "Closed"}
                  </span>
                )}
              </div>
              <p className="text-sm text-brand-ink/70 relative">
                It&apos;s in the name — we&apos;re open{" "}
                <strong className="text-brand-ink">10 AM to 10 PM</strong>, every
                single day of the week.
              </p>
              <ul className="space-y-1 text-sm relative mt-3">
                {hoursTable.map((h) => {
                  const isToday = status?.todayName === h.day;
                  return (
                    <li
                      key={h.day}
                      className={`flex justify-between items-center px-3 py-2 rounded-xl transition ${
                        isToday
                          ? "bg-gradient-to-r from-amber-100 to-rose-50 font-bold text-amber-800 ring-1 ring-amber-200"
                          : "hover:bg-brand-ink/5"
                      }`}
                    >
                      <span>
                        {h.day}
                        {isToday && (
                          <span className="ml-2 inline-flex items-center gap-1 chip bg-amber-500 text-white !text-[10px] !py-0 !px-1.5">
                            <Sparkles className="h-2.5 w-2.5" />
                            Today
                          </span>
                        )}
                      </span>
                      <span className={isToday ? "" : "text-brand-ink/65"}>
                        {fmtHour(h.open)} – {fmtHour(h.close)}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="text-xs text-brand-ink/60 mt-4 px-3">
                Holiday hours may vary — call ahead on festivals.
              </p>
            </div>

            {/* MINI STATS */}
            <div className="grid grid-cols-3 gap-2">
              <MiniStat icon={Timer}     value="<5 min"   label="Avg. reply"  tint="from-emerald-100 to-teal-50"  iconColor="text-emerald-700" tilt="rotate-[-1deg]" />
              <MiniStat icon={Languages} value="EN·TE·HI" label="Spoken"      tint="from-purple-100 to-violet-50" iconColor="text-brand-grape" tilt="rotate-[1deg]" />
              <MiniStat icon={Sparkles}  value="7 days"   label="Always open" tint="from-amber-100 to-orange-50"  iconColor="text-brand-orange" tilt="rotate-[-1deg]" />
            </div>
          </div>
        </div>

        {/* MAP */}
        <div className="container mt-8">
          <div className="relative rounded-3xl overflow-hidden shadow-lifted border-2 border-brand-ink/5 h-[400px] md:h-[500px] bg-brand-ink/5">
            <iframe
              title="10to10 Adventures location"
              className="w-full h-full"
              src="https://www.google.com/maps?q=Mamatha+College+Road+Khammam&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <motion.div
              initial={{ scale: 0, rotate: -25 }}
              animate={{ scale: 1, rotate: -8 }}
              transition={{ type: "spring", damping: 10, delay: 0.2 }}
              className="absolute top-5 left-5 hidden sm:block pointer-events-none"
            >
              <div className="bg-white rounded-2xl px-4 py-2.5 shadow-lifted border-2 border-brand-yellow flex items-center gap-2.5">
                <span className="relative flex">
                  <span className="absolute inset-0 rounded-full bg-rose-400 animate-ping opacity-60" />
                  <MapPin className="h-5 w-5 text-rose-500 relative" fill="currentColor" />
                </span>
                <div>
                  <div className="font-display text-sm font-bold leading-none">10to10 Adventures</div>
                  <div className="text-[10px] text-brand-ink/60 mt-0.5">Mamatha College Road · drop in any time</div>
                </div>
              </div>
            </motion.div>

            <a
              href={directions}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-4 right-4 btn-primary !py-2.5 !px-5 text-sm shadow-lifted"
            >
              <Navigation className="h-4 w-4" />
              Get directions
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

// ——— Chat primitives ———————————————————————————————————————————

function BotBubble({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: "spring", damping: 22 }}
      className="flex items-end gap-2.5"
    >
      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-brand-yellow/60 border-2 border-brand-ink/10 flex items-center justify-center text-base shrink-0">
        🦁
      </div>
      <div className="rounded-2xl rounded-bl-md bg-white border-2 border-brand-ink/10 px-4 py-3 text-sm leading-relaxed max-w-md shadow-sm">
        {children}
      </div>
    </motion.div>
  );
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", damping: 22 }}
      className="flex justify-end"
    >
      <div className="rounded-2xl rounded-br-md bg-gradient-to-br from-brand-primary to-brand-primary-deep text-white px-4 py-3 text-sm leading-relaxed max-w-md shadow-sm">
        {children}
      </div>
    </motion.div>
  );
}

function ChipRow({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-wrap gap-2 ml-10 md:ml-12"
    >
      {children}
    </motion.div>
  );
}

function Chip({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full bg-white border-2 border-brand-primary/25 px-4 py-2 text-sm font-semibold text-brand-ink hover:border-brand-primary hover:bg-brand-primary/5 hover:-translate-y-0.5 active:scale-95 transition shadow-sm"
    >
      {children}
    </button>
  );
}

// ——— Shared cards ———————————————————————————————————————————————

function ChannelCard({
  href,
  icon: Icon,
  label,
  sub,
  tint,
  accent,
  ring,
  external,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sub: string;
  tint: string;
  accent: string;
  ring: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`group relative rounded-3xl bg-gradient-to-br ${tint} border-2 border-white/70 backdrop-blur p-5 hover:-translate-y-1 hover:shadow-lifted transition active:scale-[0.98] hover:ring-4 ${ring}`}
    >
      <div className={`hover-wiggle group-hover:animate-wiggle inline-flex w-11 h-11 rounded-2xl items-center justify-center shadow-sm ${accent}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4">
        <div className="font-display font-bold text-brand-ink">{label}</div>
        <div className="text-xs text-brand-ink/65 mt-0.5">{sub}</div>
      </div>
      <ArrowRight className="absolute top-5 right-5 h-4 w-4 text-brand-ink/40 group-hover:text-brand-ink group-hover:translate-x-0.5 transition" />
    </a>
  );
}

function MiniStat({
  icon: Icon,
  value,
  label,
  tint,
  iconColor,
  tilt = "",
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  tint: string;
  iconColor: string;
  tilt?: string;
}) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${tint} border-2 border-white/70 p-3 text-center shadow-sm ${tilt} hover:rotate-0 transition`}>
      <Icon className={`h-4 w-4 mx-auto ${iconColor}`} />
      <div className="font-bold text-xs mt-1.5 text-brand-ink">{value}</div>
      <div className="text-[10px] text-brand-ink/60 uppercase tracking-wider mt-0.5">
        {label}
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
  tint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
  tint: string;
}) {
  return (
    <div className="flex gap-4 relative">
      <div className={`shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center ${tint}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs uppercase tracking-wider font-bold text-brand-ink/50">
          {label}
        </div>
        <div className="font-medium mt-1 text-sm md:text-base">{children}</div>
      </div>
    </div>
  );
}
