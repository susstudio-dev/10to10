"use client";

import { useState } from "react";
import { AutoList, type Row } from "./auto-list";

type Item = { id: string; section: string; key: string; label: string; type: string; value: string };

function parseListValue(value: string): Row[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as Row[]) : [];
  } catch {
    return [];
  }
}

export function ContentEditor({ initialItems }: { initialItems: Item[] }) {
  const [items, setItems] = useState(initialItems);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [savedKey, setSavedKey] = useState<string | null>(null);

  const sections = Array.from(new Set(items.map((i) => i.section)));

  function update(key: string, value: string) {
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, value } : i)));
  }

  async function save(item: Item) {
    setSavingKey(item.key);
    setSavedKey(null);
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: item.key, value: item.value }),
    });
    setSavingKey(null);
    if (res.ok) {
      setSavedKey(item.key);
      setTimeout(() => setSavedKey((k) => (k === item.key ? null : k)), 1500);
    }
  }

  if (items.length === 0) {
    return (
      <p className="text-sm text-slate-400">
        No content items yet — run <code className="text-slate-600">npm run db:seed</code> in apps/web.
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <div key={section}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">{section}</h2>
          <div className="mt-3 space-y-4">
            {items
              .filter((i) => i.section === section)
              .map((item) => (
                <div key={item.key} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700">{item.label}</label>
                    <span className="text-[11px] text-slate-400">{item.key}</span>
                  </div>
                  {item.type === "list" ? (
                    <div className="mt-2">
                      <AutoList
                        items={parseListValue(item.value)}
                        onChange={(next) => update(item.key, JSON.stringify(next))}
                      />
                    </div>
                  ) : item.type === "richtext" ? (
                    <textarea
                      className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm min-h-24 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                      value={item.value}
                      onChange={(e) => update(item.key, e.target.value)}
                    />
                  ) : (
                    <input
                      className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                      value={item.value}
                      onChange={(e) => update(item.key, e.target.value)}
                    />
                  )}
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      onClick={() => save(item)}
                      disabled={savingKey === item.key}
                      className="rounded-lg bg-brand-primary text-white text-xs font-semibold px-3 py-1.5 disabled:opacity-50"
                    >
                      {savingKey === item.key ? "Saving…" : "Save"}
                    </button>
                    {savedKey === item.key && <span className="text-xs text-emerald-600">Saved</span>}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
