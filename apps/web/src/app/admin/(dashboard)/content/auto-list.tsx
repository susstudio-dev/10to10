"use client";

/**
 * Generic, schema-less editor for "list" ContentItems — arrays of plain
 * objects (curriculum items, FAQs, pricing tiers, zone data, ...). Infers
 * a field's input from its JS type, and recurses for nested arrays-of-objects
 * (e.g. each zone's own pricing rows) so one component covers every list
 * shape in the site without a hand-written schema per content key.
 */

export type Json = string | number | boolean | Json[] | { [k: string]: Json };
export type Row = Record<string, Json>;

function kindOf(v: Json): "string" | "number" | "boolean" | "stringArray" | "objectArray" {
  if (typeof v === "boolean") return "boolean";
  if (typeof v === "number") return "number";
  if (Array.isArray(v)) {
    return v.length > 0 && typeof v[0] === "object" && v[0] !== null && !Array.isArray(v[0])
      ? "objectArray"
      : "stringArray";
  }
  return "string";
}

function blankLike(v: Json): Json {
  switch (kindOf(v)) {
    case "boolean":
      return false;
    case "number":
      return 0;
    case "stringArray":
      return [];
    case "objectArray": {
      const template = (v as Json[])[0];
      return template && typeof template === "object" ? blankRow(template as Row) : [];
    }
    default:
      return "";
  }
}

function blankRow(row: Row): Row {
  const out: Row = {};
  for (const [k, v] of Object.entries(row)) out[k] = blankLike(v);
  return out;
}

export function AutoList({
  items,
  onChange,
  depth = 0,
}: {
  items: Row[];
  onChange: (items: Row[]) => void;
  depth?: number;
}) {
  function updateItem(idx: number, key: string, val: Json) {
    onChange(items.map((it, i) => (i === idx ? { ...it, [key]: val } : it)));
  }
  function removeItem(idx: number) {
    onChange(items.filter((_, i) => i !== idx));
  }
  function moveItem(idx: number, dir: -1 | 1) {
    const target = idx + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  }
  function addItem() {
    onChange([...items, items[0] ? blankRow(items[0]) : {}]);
  }

  return (
    <div className={depth === 0 ? "space-y-3" : "mt-2 space-y-2 border-l-2 border-slate-200 pl-3"}>
      {items.map((item, idx) => (
        <div key={idx} className="rounded-lg border border-slate-200 bg-white p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400">#{idx + 1}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => moveItem(idx, -1)}
                disabled={idx === 0}
                className="rounded px-1.5 py-0.5 text-xs hover:bg-slate-100 disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveItem(idx, 1)}
                disabled={idx === items.length - 1}
                className="rounded px-1.5 py-0.5 text-xs hover:bg-slate-100 disabled:opacity-30"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="rounded px-1.5 py-0.5 text-xs font-semibold text-red-600 hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          </div>
          {Object.entries(item).map(([key, val]) => (
            <AutoField key={key} label={key} value={val} depth={depth} onChange={(v) => updateItem(idx, key, v)} />
          ))}
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-brand-primary/40"
      >
        + Add {depth === 0 ? "item" : "row"}
      </button>
    </div>
  );
}

function AutoField({
  label,
  value,
  depth,
  onChange,
}: {
  label: string;
  value: Json;
  depth: number;
  onChange: (v: Json) => void;
}) {
  const kind = kindOf(value);

  if (kind === "objectArray") {
    return (
      <div>
        <span className="text-[11px] font-semibold capitalize text-slate-500">{label}</span>
        <AutoList items={value as Row[]} depth={depth + 1} onChange={(v) => onChange(v)} />
      </div>
    );
  }

  return (
    <label className="block">
      <span className="text-[11px] font-semibold capitalize text-slate-500">{label}</span>
      {kind === "boolean" && (
        <input
          type="checkbox"
          checked={value as boolean}
          onChange={(e) => onChange(e.target.checked)}
          className="ml-2 align-middle rounded border-slate-300"
        />
      )}
      {kind === "number" && (
        <input
          type="number"
          value={value as number}
          onChange={(e) => onChange(Number(e.target.value))}
          className="mt-0.5 w-full rounded-md border border-slate-300 px-2 py-1 text-xs"
        />
      )}
      {kind === "stringArray" && (
        <textarea
          value={(value as string[]).join("\n")}
          onChange={(e) => onChange(e.target.value.split("\n").filter((l) => l.length > 0))}
          placeholder="One per line"
          className="mt-0.5 w-full min-h-16 rounded-md border border-slate-300 px-2 py-1 text-xs"
        />
      )}
      {kind === "string" &&
        ((value as string).length > 70 || (value as string).includes("\n") ? (
          <textarea
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="mt-0.5 w-full min-h-16 rounded-md border border-slate-300 px-2 py-1 text-xs"
          />
        ) : (
          <input
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="mt-0.5 w-full rounded-md border border-slate-300 px-2 py-1 text-xs"
          />
        ))}
    </label>
  );
}
