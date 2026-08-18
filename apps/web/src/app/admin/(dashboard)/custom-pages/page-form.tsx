"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { BlockEditor } from "./block-editor";
import type { Block } from "@/lib/blocks";

type PageData = { id?: string; title: string; slug: string; blocks: string; published: boolean };

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseInitialBlocks(raw?: string): Block[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function PageForm({ initial }: { initial?: PageData }) {
  const router = useRouter();
  const isNew = !initial?.id;
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [blocks, setBlocks] = useState<Block[]>(() => parseInitialBlocks(initial?.blocks));
  const [published, setPublished] = useState(initial?.published ?? true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function onTitleChange(v: string) {
    setTitle(v);
    if (!slugTouched) setSlug(slugify(v));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const body = JSON.stringify({ title, slug, blocks, published });
    const res = isNew
      ? await fetch("/api/admin/pages", { method: "POST", headers: { "Content-Type": "application/json" }, body })
      : await fetch(`/api/admin/pages/${initial!.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body,
        });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong.");
      return;
    }
    router.push("/admin/custom-pages");
    router.refresh();
  }

  async function onDelete() {
    if (!initial?.id) return;
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    const res = await fetch(`/api/admin/pages/${initial.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/custom-pages");
      router.refresh();
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-6">
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">Title</span>
        <input
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          required
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-slate-700">Slug</span>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm text-slate-400">/pages/</span>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            required
          />
        </div>
      </label>

      <div>
        <span className="text-sm font-semibold text-slate-700">Content blocks</span>
        <p className="mt-1 text-xs text-slate-500">
          Build the page from headings, paragraphs, and images, top to bottom. Each block gets
          its own scroll-in animation.
        </p>
        <div className="mt-3">
          <BlockEditor value={blocks} onChange={setBlocks} />
        </div>
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="rounded border-slate-300"
        />
        <span className="text-sm font-medium text-slate-700">Published (visible on the live site)</span>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-brand-primary text-white text-sm font-semibold px-4 py-2 disabled:opacity-50"
        >
          {saving ? "Saving…" : isNew ? "Create page" : "Save changes"}
        </button>
        {!isNew && (
          <button
            type="button"
            onClick={onDelete}
            className="rounded-lg text-sm font-semibold text-red-600 px-3 py-2 hover:bg-red-50"
          >
            Delete page
          </button>
        )}
      </div>
    </form>
  );
}
