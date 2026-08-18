"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { BLOCK_ANIMATIONS, type Block, type BlockAnimation } from "@/lib/blocks";

let counter = 0;
function newId() {
  counter += 1;
  return `b${Date.now()}${counter}`;
}

function emptyBlock(type: Block["type"]): Block {
  const id = newId();
  const animation: BlockAnimation = "fade-up";
  if (type === "heading") return { id, type, text: "", animation };
  if (type === "paragraph") return { id, type, text: "", animation };
  return { id, type: "image", url: "", alt: "", animation };
}

export function BlockEditor({ value, onChange }: { value: Block[]; onChange: (blocks: Block[]) => void }) {
  function addBlock(type: Block["type"]) {
    onChange([...value, emptyBlock(type)]);
  }

  function updateBlock(id: string, patch: Partial<Block>) {
    onChange(value.map((b) => (b.id === id ? ({ ...b, ...patch } as Block) : b)));
  }

  function removeBlock(id: string) {
    onChange(value.filter((b) => b.id !== id));
  }

  function moveBlock(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className="space-y-4">
      {value.length === 0 && (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-400">
          No blocks yet. Add a heading, paragraph, or image below to start building the page.
        </p>
      )}

      {value.map((block, i) => (
        <BlockCard
          key={block.id}
          block={block}
          isFirst={i === 0}
          isLast={i === value.length - 1}
          onChange={(patch) => updateBlock(block.id, patch)}
          onRemove={() => removeBlock(block.id)}
          onMoveUp={() => moveBlock(i, -1)}
          onMoveDown={() => moveBlock(i, 1)}
        />
      ))}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => addBlock("heading")}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-brand-primary/40"
        >
          + Heading
        </button>
        <button
          type="button"
          onClick={() => addBlock("paragraph")}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-brand-primary/40"
        >
          + Paragraph
        </button>
        <button
          type="button"
          onClick={() => addBlock("image")}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-brand-primary/40"
        >
          + Image
        </button>
      </div>
    </div>
  );
}

const TYPE_LABEL: Record<Block["type"], string> = {
  heading: "Heading",
  paragraph: "Paragraph",
  image: "Image",
};

function BlockCard({
  block,
  isFirst,
  isLast,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  block: Block;
  isFirst: boolean;
  isLast: boolean;
  onChange: (patch: Partial<Block>) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onPickImage() {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/media", { method: "POST", body: formData });
    setUploading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setUploadError(data.error ?? "Upload failed.");
      return;
    }
    const { asset } = await res.json();
    onChange({ url: asset.path } as Partial<Block>);
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-500">
          {TYPE_LABEL[block.type]}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={isFirst}
            className="rounded-md px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100 disabled:opacity-30"
            title="Move up"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={isLast}
            className="rounded-md px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100 disabled:opacity-30"
            title="Move down"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="rounded-md px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="mt-3">
        {block.type === "heading" && (
          <input
            value={block.text}
            onChange={(e) => onChange({ text: e.target.value } as Partial<Block>)}
            placeholder="Section heading"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
        )}

        {block.type === "paragraph" && (
          <textarea
            value={block.text}
            onChange={(e) => onChange({ text: e.target.value } as Partial<Block>)}
            placeholder="Paragraph text"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm min-h-24 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
        )}

        {block.type === "image" && (
          <div className="space-y-3">
            {block.url ? (
              <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-lg bg-slate-100">
                <Image src={block.url} alt={block.alt} fill unoptimized className="object-cover" />
              </div>
            ) : (
              <div className="flex aspect-video w-full max-w-sm items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400">
                No image yet
              </div>
            )}
            <div className="flex items-center gap-2">
              <input ref={fileRef} type="file" accept="image/*" className="text-xs" />
              <button
                type="button"
                onClick={onPickImage}
                disabled={uploading}
                className="rounded-lg bg-brand-primary text-white text-xs font-semibold px-3 py-1.5 disabled:opacity-50"
              >
                {uploading ? "Uploading…" : block.url ? "Replace" : "Upload"}
              </button>
            </div>
            {uploadError && <p className="text-xs text-red-600">{uploadError}</p>}
            <input
              value={block.alt}
              onChange={(e) => onChange({ alt: e.target.value } as Partial<Block>)}
              placeholder="Alt text (for accessibility & SEO)"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
            />
          </div>
        )}
      </div>

      <label className="mt-3 flex items-center gap-2 text-xs">
        <span className="font-medium text-slate-500">Scroll animation</span>
        <select
          value={block.animation}
          onChange={(e) => onChange({ animation: e.target.value as BlockAnimation })}
          className="rounded-lg border border-slate-300 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
        >
          {BLOCK_ANIMATIONS.map((a) => (
            <option key={a.value} value={a.value}>
              {a.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
