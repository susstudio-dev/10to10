"use client";

import { useRef, useState, type FormEvent } from "react";
import Image from "next/image";

type Asset = { id: string; filename: string; path: string; altText: string };

export function MediaManager({ initialAssets }: { initialAssets: Asset[] }) {
  const [assets, setAssets] = useState(initialAssets);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onUpload(e: FormEvent) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/media", { method: "POST", body: formData });
    setUploading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Upload failed.");
      return;
    }
    const { asset } = await res.json();
    setAssets((prev) => [asset, ...prev]);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this image?")) return;
    const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    if (res.ok) setAssets((prev) => prev.filter((a) => a.id !== id));
  }

  function copyPath(path: string) {
    navigator.clipboard?.writeText(path);
  }

  return (
    <div>
      <form onSubmit={onUpload} className="flex items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white p-4">
        <input ref={fileRef} type="file" accept="image/*" className="text-sm" />
        <button
          type="submit"
          disabled={uploading}
          className="rounded-lg bg-brand-primary text-white text-xs font-semibold px-3 py-1.5 disabled:opacity-50"
        >
          {uploading ? "Uploading…" : "Upload"}
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {assets.map((a) => (
          <div key={a.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="relative aspect-square bg-slate-100">
              <Image src={a.path} alt={a.altText || a.filename} fill unoptimized className="object-cover" />
            </div>
            <div className="p-2">
              <div className="truncate text-[11px] text-slate-500">{a.filename}</div>
              <div className="mt-1 flex gap-2">
                <button onClick={() => copyPath(a.path)} className="text-[11px] font-semibold text-brand-primary">
                  Copy path
                </button>
                <button onClick={() => onDelete(a.id)} className="text-[11px] font-semibold text-red-600">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {assets.length === 0 && <p className="mt-4 text-sm text-slate-400">No images uploaded yet.</p>}
    </div>
  );
}
