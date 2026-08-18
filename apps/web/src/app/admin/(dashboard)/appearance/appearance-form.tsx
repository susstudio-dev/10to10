"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { SiteSettingsData } from "@/lib/settings";
import { PALETTE_PRESETS } from "@/lib/settings";

const COLOR_FIELDS: { key: keyof SiteSettingsData; label: string }[] = [
  { key: "colorPrimary", label: "Primary" },
  { key: "colorTurquoise", label: "Turquoise" },
  { key: "colorYellow", label: "Yellow" },
  { key: "colorOrange", label: "Orange" },
  { key: "colorGrape", label: "Grape" },
  { key: "colorMint", label: "Mint" },
  { key: "colorSky", label: "Sky" },
  { key: "colorInk", label: "Ink (text)" },
  { key: "colorCloud", label: "Cloud (background)" },
];

export function AppearanceForm({ initial }: { initial: SiteSettingsData }) {
  const router = useRouter();
  const [values, setValues] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function setColor(key: keyof SiteSettingsData, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function applyPreset(colors: Record<string, string>) {
    setValues((v) => ({ ...v, ...colors }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong.");
      return;
    }
    setSaved(true);
    router.refresh();
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-8">
      {/* Live combined preview so the palette can be judged as a whole, not swatch-by-swatch */}
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <div className="flex h-16">
          {COLOR_FIELDS.slice(0, 7).map((f) => (
            <div key={f.key} className="flex-1" style={{ backgroundColor: values[f.key] as string }} />
          ))}
        </div>
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ backgroundColor: values.colorCloud, color: values.colorInk }}
        >
          <span className="text-sm font-semibold">Preview: text on background</span>
          <span
            className="rounded-full px-3 py-1 text-xs font-bold text-white"
            style={{ backgroundColor: values.colorPrimary }}
          >
            Button
          </span>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-slate-700">Presets</h2>
        <p className="mt-1 text-xs text-slate-500">Start from a curated combination, then fine-tune below.</p>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PALETTE_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => applyPreset(preset.colors)}
              className="rounded-xl border border-slate-200 bg-white p-3 text-left hover:border-brand-primary/40 transition"
            >
              <div className="flex h-6 overflow-hidden rounded-md">
                {[
                  preset.colors.colorPrimary,
                  preset.colors.colorTurquoise,
                  preset.colors.colorYellow,
                  preset.colors.colorOrange,
                  preset.colors.colorGrape,
                ].map((c, i) => (
                  <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                ))}
              </div>
              <div className="mt-2 text-xs font-semibold text-slate-700">{preset.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-slate-700">Brand colors</h2>
        <p className="mt-1 text-xs text-slate-500">Applied site-wide immediately, no rebuild needed.</p>
        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          {COLOR_FIELDS.map((f) => (
            <div key={f.key} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
              <input
                type="color"
                value={values[f.key] as string}
                onChange={(e) => setColor(f.key, e.target.value)}
                className="h-9 w-9 shrink-0 rounded-md border border-slate-200 cursor-pointer"
              />
              <span className="flex-1 text-sm font-medium text-slate-700">{f.label}</span>
              <input
                value={values[f.key] as string}
                onChange={(e) => setColor(f.key, e.target.value)}
                pattern="#[0-9a-fA-F]{6}"
                className="w-24 rounded-lg border border-slate-300 px-2 py-1 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-slate-700">Motion</h2>
        <label className="mt-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3">
          <input
            type="checkbox"
            checked={values.animationsEnabled}
            onChange={(e) => setValues((v) => ({ ...v, animationsEnabled: e.target.checked }))}
            className="rounded border-slate-300"
          />
          <span className="text-sm font-medium text-slate-700">
            Enable animations & scroll effects site-wide
          </span>
        </label>
        <p className="mt-1 text-xs text-slate-500">
          Turning this off freezes doodle pop-ins, floating icons, and other decorative
          motion across the whole site (independent of each visitor&apos;s own device settings).
        </p>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-brand-primary text-white text-sm font-semibold px-4 py-2 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        {saved && <span className="text-sm text-emerald-600">Saved</span>}
      </div>
    </form>
  );
}
