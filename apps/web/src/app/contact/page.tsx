"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  MessageCircle,
  Send,
  Navigation,
  Languages,
  Timer,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/lib/utils";

type DayHour = { day: string; open: number; close: number };
const hoursTable: DayHour[] = [
  { day: "Monday", open: 10, close: 22 },
  { day: "Tuesday", open: 10, close: 22 },
  { day: "Wednesday", open: 10, close: 22 },
  { day: "Thursday", open: 10, close: 22 },
  { day: "Friday", open: 10, close: 23 },
  { day: "Saturday", open: 9, close: 23 },
  { day: "Sunday", open: 9, close: 23 },
];

// JS Date.getDay(): 0 = Sunday → our table starts Monday, so map:
const dayNameForJsDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function fmtHour(h: number) {
  if (h === 0) return "12 AM";
  if (h === 12) return "12 PM";
  return h < 12 ? `${h} AM` : `${h - 12} PM`;
}

const subjects = [
  "General inquiry",
  "Birthday party",
  "Play school admission",
  "Summer camp",
  "Membership",
  "Corporate / school visit",
  "Feedback",
];

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

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    subject: "General inquiry",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) return;
    setSubmitting(true);
    const { submitLead } = await import("@/lib/lead");
    await submitLead("Contact Page", {
      name: form.name,
      phone: form.phone,
      subject: form.subject,
      message: form.message,
    });
    setSubmitting(false);
    setSent(true);
  };

  const directions =
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent("10to10 Adventures, Mamatha College Road, Khammam");

  return (
    <>
      {/* HERO — Contact theme: friendly chat-bubble palette (turquoise/yellow/grape/coral), fades into body */}
      <section className="relative pt-28 md:pt-32 pb-16 md:pb-20 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          {/* turquoise (whatsapp / friendly chat) */}
          <div className="absolute -top-32 -left-24 w-[600px] h-[600px] rounded-full bg-brand-turquoise/22 blur-3xl" />
          {/* warm yellow (calling, sunshine) */}
          <div className="absolute -top-10 right-0 w-[520px] h-[520px] rounded-full bg-brand-yellow/26 blur-3xl" />
          {/* grape (email, calm) */}
          <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full bg-brand-grape/16 blur-3xl" />
          {/* coral (warmth, hi-five) */}
          <div className="absolute -bottom-24 -right-16 w-[440px] h-[440px] rounded-full bg-rose-300/26 blur-3xl" />

          {/* Floating speech-bubble silhouettes */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.08]" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
            <g fill="#2c3873">
              <path d="M 80 110 q 0 -28 28 -28 h 90 q 28 0 28 28 v 36 q 0 28 -28 28 h -55 l -16 18 v -18 h -19 q -28 0 -28 -28 z" />
              <circle cx="118" cy="130" r="3" />
              <circle cx="138" cy="130" r="3" />
              <circle cx="158" cy="130" r="3" />
            </g>
            <g fill="#00d4c8">
              <path d="M 980 70 q 0 -22 22 -22 h 110 q 22 0 22 22 v 30 q 0 22 -22 22 h 40 l 14 16 v -16 h -164 q -22 0 -22 -22 z" />
            </g>
            <g fill="#8b5cf6">
              <path d="M 1020 380 q 0 -22 22 -22 h 90 q 22 0 22 22 v 30 q 0 22 -22 22 h -40 l -16 18 v -18 h -34 q -22 0 -22 -22 z" />
            </g>
            <g fill="#ff8a3d">
              <path d="M 60 420 q 0 -22 22 -22 h 100 q 22 0 22 22 v 30 q 0 22 -22 22 h -50 l -14 16 v -16 h -36 q -22 0 -22 -22 z" />
            </g>
          </svg>

          {/* tiny dotted "calling" pattern */}
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

        <div className="container relative max-w-4xl">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 chip bg-white/85 backdrop-blur border-2 border-brand-primary/20 font-bold text-brand-primary shadow-sm">
              <MessageCircle className="h-3.5 w-3.5" /> Get in touch
            </span>
            {status && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`inline-flex items-center gap-2 chip border-2 font-bold shadow-sm ${
                  status.isOpen
                    ? "bg-brand-mint/40 text-emerald-700 border-emerald-400/40"
                    : "bg-white/85 text-brand-ink/65 border-brand-ink/15"
                }`}
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

          <h1 className="heading-xl mt-5">
            Come say{" "}
            <span className="relative inline-block">
              <span className="gradient-text">hi</span>
              {/* hand-drawn waving emphasis */}
              <span className="absolute -top-3 -right-7 text-3xl select-none rotate-12">👋</span>
            </span>
            .
          </h1>
          <p className="mt-6 text-lg md:text-xl text-brand-ink/75 leading-relaxed max-w-2xl">
            Drop by, call, WhatsApp, or email — whichever works for you. We
            usually reply within minutes during business hours.
          </p>

          {/* Quick channel cards — playful colored tiles */}
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3">
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
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="pb-20">
        <div className="container grid lg:grid-cols-5 gap-6">
          {/* LEFT — info + hours */}
          <div className="lg:col-span-2 space-y-6 lg:order-1 order-2">
            {/* VISIT US — indigo accent band */}
            <div className="relative rounded-3xl bg-white border-2 border-brand-ink/5 p-6 md:p-8 shadow-lifted space-y-5 overflow-hidden">
              <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-primary via-brand-grape to-brand-turquoise" />
              <span className="absolute -top-12 -right-10 w-32 h-32 rounded-full bg-brand-primary/8 blur-2xl pointer-events-none" />
              <h3 className="font-display text-lg font-bold flex items-center gap-2 relative">
                <MapPin className="h-5 w-5 text-brand-primary" />
                Visit us
              </h3>
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

            {/* HOURS — today highlighted */}
            <div className="relative rounded-3xl bg-white border-2 border-brand-ink/5 p-6 md:p-8 shadow-lifted overflow-hidden">
              <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-400 via-brand-orange to-rose-400" />
              <span className="absolute -bottom-16 -left-10 w-40 h-40 rounded-full bg-brand-yellow/12 blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between mb-4 relative">
                <h3 className="font-display text-lg font-bold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-600" />
                  Opening hours
                </h3>
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
              <ul className="space-y-1 text-sm relative">
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
              <p className="text-xs text-brand-ink/50 mt-4 px-3">
                Holiday hours may vary — call ahead on festivals.
              </p>
            </div>

            {/* MINI STATS — colored tiles */}
            <div className="grid grid-cols-3 gap-2">
              <MiniStat icon={Timer}     value="<5 min"      label="Avg. reply"   tint="from-emerald-100 to-teal-50"  iconColor="text-emerald-700" />
              <MiniStat icon={Languages} value="EN·TE·HI"     label="Spoken"       tint="from-purple-100 to-violet-50" iconColor="text-brand-grape" />
              <MiniStat icon={Sparkles}  value="7 days"       label="Always open"  tint="from-amber-100 to-orange-50"  iconColor="text-brand-orange" />
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="lg:col-span-3 lg:order-2 order-1">
            <div className="relative rounded-3xl bg-white border-2 border-brand-ink/5 p-6 md:p-10 shadow-lifted overflow-hidden">
              {/* playful corner accents */}
              <span className="absolute -top-12 -right-10 w-44 h-44 rounded-full bg-brand-yellow/14 blur-2xl pointer-events-none" />
              <span className="absolute -bottom-16 -left-12 w-48 h-48 rounded-full bg-brand-turquoise/12 blur-2xl pointer-events-none" />
              <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-400 via-brand-primary to-brand-grape" />
              <span aria-hidden className="absolute top-5 right-5 text-2xl select-none rotate-12">✉️</span>
              {!sent ? (
                <form onSubmit={submit} className="relative">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h2 className="font-display text-2xl md:text-3xl font-bold">
                        Send us a <span className="gradient-text">message</span>
                      </h2>
                      <p className="text-brand-ink/60 mt-1 text-sm">
                        Replies on WhatsApp within minutes during business hours.
                      </p>
                    </div>
                    <span className="chip bg-emerald-100 text-emerald-700 font-bold border border-emerald-200">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Free
                    </span>
                  </div>

                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    <Field label="Your name" required>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="input"
                        placeholder="Priya Kumar"
                        autoComplete="name"
                      />
                    </Field>
                    <Field label="Phone (WhatsApp)" required>
                      <input
                        required
                        type="tel"
                        inputMode="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="input"
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                      />
                    </Field>
                  </div>

                  <div className="mt-4">
                    <Field label="What is this about?">
                      <div className="flex flex-wrap gap-2">
                        {subjects.map((s, i) => {
                          // each subject gets its own accent so the chip strip feels playful
                          const palettes = [
                            { sel: "bg-brand-primary border-brand-primary",     un: "hover:border-brand-primary/40 hover:text-brand-primary" },
                            { sel: "bg-rose-500 border-rose-500",                un: "hover:border-rose-400/60 hover:text-rose-600" },
                            { sel: "bg-brand-grape border-brand-grape",          un: "hover:border-brand-grape/40 hover:text-brand-grape" },
                            { sel: "bg-amber-500 border-amber-500",              un: "hover:border-amber-400/60 hover:text-amber-700" },
                            { sel: "bg-emerald-500 border-emerald-500",          un: "hover:border-emerald-400/60 hover:text-emerald-700" },
                            { sel: "bg-brand-turquoise border-brand-turquoise",  un: "hover:border-brand-turquoise/50 hover:text-brand-turquoise" },
                            { sel: "bg-brand-orange border-brand-orange",        un: "hover:border-brand-orange/50 hover:text-brand-orange" },
                          ];
                          const p = palettes[i % palettes.length];
                          const active = form.subject === s;
                          return (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setForm({ ...form, subject: s })}
                              className={`chip border-2 transition active:scale-95 ${
                                active
                                  ? `text-white ${p.sel} shadow-sm`
                                  : `bg-white text-brand-ink/70 border-brand-ink/10 ${p.un}`
                              }`}
                            >
                              {s}
                            </button>
                          );
                        })}
                      </div>
                    </Field>
                  </div>

                  <div className="mt-4">
                    <Field label="Your message" required>
                      <textarea
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={5}
                        className="input resize-none"
                        placeholder="Tell us what you need — date, group size, anything we should know..."
                      />
                      <div className="text-xs text-brand-ink/45 mt-1.5 text-right">
                        {form.message.length} chars
                      </div>
                    </Field>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full mt-4 text-base disabled:cursor-wait"
                  >
                    {submitting ? (
                      <>
                        <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                        Opening WhatsApp…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send via WhatsApp
                      </>
                    )}
                  </button>
                  <p className="text-xs text-brand-ink/50 text-center mt-3">
                    By sending you agree to be contacted on the number above. We never spam.
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12 relative"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 10 }}
                    className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center mb-5 ring-4 ring-emerald-200/50"
                  >
                    <CheckCircle2 className="h-12 w-12 text-emerald-600" strokeWidth={2.5} />
                  </motion.div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold">
                    Message sent! 🎉
                  </h3>
                  <p className="text-brand-ink/65 mt-3 max-w-sm mx-auto">
                    We opened WhatsApp with your message — hit send and we'll
                    reply shortly.
                  </p>
                  <div className="flex gap-3 justify-center mt-8 flex-wrap">
                    <button
                      type="button"
                      className="btn-ghost"
                      onClick={() => {
                        setSent(false);
                        setForm({
                          name: "",
                          phone: "",
                          subject: "General inquiry",
                          message: "",
                        });
                      }}
                    >
                      Send another
                    </button>
                    <a href={siteConfig.phoneHref} className="btn-primary">
                      Or call us
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Mini FAQ under the form */}
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
            {/* Playful "you are here" pin sticker (top-left) */}
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
                  <div className="text-[10px] text-brand-ink/60 mt-0.5">You are here · drop in any time</div>
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
      <div className={`inline-flex w-11 h-11 rounded-2xl items-center justify-center shadow-sm ${accent}`}>
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
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  tint: string;
  iconColor: string;
}) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${tint} border-2 border-white/70 p-3 text-center shadow-sm`}>
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

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-brand-ink/55">
        {label}
        {required && <span className="text-brand-primary ml-0.5">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
