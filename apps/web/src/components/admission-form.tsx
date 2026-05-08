"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, MessageCircle } from "lucide-react";
import { submitLead } from "@/lib/lead";
import { ConfettiBurst } from "./confetti-burst";

const programs = ["Playgroup (1.5–2.5)", "Nursery (2.5–3.5)", "LKG (3.5–4.5)", "UKG (4.5–5.5)"];
const months = ["June 2026", "July 2026", "August 2026", "September 2026", "Later"];
const sources = ["Google search", "Friend/family", "Instagram", "Walked past", "Other"];

export function AdmissionForm() {
  const [form, setForm] = useState({
    parentName: "",
    phone: "",
    email: "",
    childName: "",
    childDob: "",
    program: programs[1],
    startMonth: months[0],
    heardFrom: sources[0],
    notes: "",
    company: "", // honeypot
  });
  const [state, setState] = useState<"idle" | "submitting" | "sent">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const today = new Date();
  const todayIso = today.toISOString().split("T")[0];
  const minDob = new Date(today.getFullYear() - 7, today.getMonth(), today.getDate())
    .toISOString()
    .split("T")[0];

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.company) return; // bot detected
    if (state === "submitting") return;
    const digitCount = form.phone.replace(/\D/g, "").length;
    if (digitCount < 10) {
      setErrorMsg("Please enter a valid phone number with at least 10 digits.");
      return;
    }
    setErrorMsg(null);
    setState("submitting");
    try {
      await submitLead("Play School Admission", {
        parent_name: form.parentName,
        phone: form.phone,
        email: form.email,
        child_name: form.childName,
        child_dob: form.childDob,
        program: form.program,
        preferred_start: form.startMonth,
        heard_from: form.heardFrom,
        notes: form.notes,
      });
      setState("sent");
    } catch {
      setErrorMsg("Something went wrong. Please try again or call us directly.");
      setState("idle");
    }
  };

  if (state === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl bg-white border border-black/[0.07] p-8 text-center overflow-hidden"
      >
        <ConfettiBurst />
        <div className="relative inline-flex w-14 h-14 rounded-full bg-brand-primary/10 text-brand-primary items-center justify-center mb-4 z-10">
          <Check className="h-7 w-7" strokeWidth={2.5} />
        </div>
        <h3 className="font-display text-2xl font-bold text-brand-ink">Inquiry received!</h3>
        <p className="text-brand-ink/65 mt-2 max-w-md mx-auto">
          We&apos;ve emailed your details to our admissions team and opened
          WhatsApp so you can chat with us directly. We respond within 4 hours
          on weekdays.
        </p>
        <button
          type="button"
          onClick={() => {
            setState("idle");
            setForm((f) => ({ ...f, notes: "" }));
          }}
          className="btn-ghost mt-6"
        >
          Send another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl bg-white border border-black/[0.07] p-6 md:p-8"
    >
      <h3 className="font-display text-xl md:text-2xl font-bold text-brand-ink">
        Admission inquiry
      </h3>
      <p className="text-sm text-brand-ink/60 mt-1.5">
        Takes under a minute. We&apos;ll reply within 4 hours on weekdays.
      </p>

      {/* honeypot */}
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        className="absolute -left-[9999px]"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="mt-5 grid sm:grid-cols-2 gap-4">
        <Field label="Parent's name">
          <input
            required
            minLength={2}
            maxLength={80}
            value={form.parentName}
            onChange={(e) => setForm({ ...form, parentName: e.target.value })}
            className="input"
            placeholder="Priya Kumar"
            autoComplete="name"
          />
        </Field>
        <Field label="Phone (WhatsApp)">
          <input
            required
            type="tel"
            inputMode="tel"
            pattern="\+?[0-9][0-9\s\-]{9,14}"
            title="Enter a valid phone number with at least 10 digits"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input"
            placeholder="+91 98765 43210"
            autoComplete="tel"
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            maxLength={120}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input"
            placeholder="priya@example.com"
            autoComplete="email"
          />
        </Field>
        <Field label="Child's name">
          <input
            required
            minLength={2}
            maxLength={80}
            value={form.childName}
            onChange={(e) => setForm({ ...form, childName: e.target.value })}
            className="input"
            placeholder="Anaya Kumar"
          />
        </Field>
        <Field label="Child's date of birth">
          <input
            required
            type="date"
            min={minDob}
            max={todayIso}
            value={form.childDob}
            onChange={(e) => setForm({ ...form, childDob: e.target.value })}
            className="input"
          />
        </Field>
        <Field label="Preferred program">
          <select
            value={form.program}
            onChange={(e) => setForm({ ...form, program: e.target.value })}
            className="input"
          >
            {programs.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </Field>
        <Field label="Preferred start month">
          <select
            value={form.startMonth}
            onChange={(e) => setForm({ ...form, startMonth: e.target.value })}
            className="input"
          >
            {months.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </Field>
        <Field label="How did you hear about us?">
          <select
            value={form.heardFrom}
            onChange={(e) => setForm({ ...form, heardFrom: e.target.value })}
            className="input"
          >
            {sources.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Anything we should know? (allergies, preferences, questions)">
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={3}
            maxLength={1000}
            className="input resize-none"
            placeholder="Optional"
          />
        </Field>
      </div>

      {errorMsg && (
        <p role="alert" className="mt-4 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="btn-primary w-full mt-6"
      >
        {state === "submitting" ? (
          <>Submitting…</>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Submit inquiry
          </>
        )}
      </button>

      <p className="mt-3 text-xs text-brand-ink/50 text-center flex items-center justify-center gap-1.5">
        <MessageCircle className="h-3.5 w-3.5" />
        We&apos;ll also open WhatsApp so you can chat with us right away
      </p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-brand-ink/55">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
