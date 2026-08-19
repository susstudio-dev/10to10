import { NextRequest, NextResponse } from "next/server";
import { getDB, nowIso } from "@/lib/db";
import { serializeBlocks } from "@/lib/blocks";

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const RESERVED_SLUGS = new Set([
  "about",
  "contact",
  "play-school",
  "summer-camp",
  "party-planner",
  "memberships",
  "privacy",
  "refund",
  "terms",
  "zones",
  "admin",
  "api",
  "pages",
]);

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDB();
  const page = await db.prepare("SELECT * FROM Page WHERE id = ?").bind(id).first();
  if (!page) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ page });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { title, slug, content, blocks, published } = await req.json();

  if (!title || typeof title !== "string") {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  if (!slug || typeof slug !== "string" || !SLUG_RE.test(slug)) {
    return NextResponse.json(
      { error: "Slug must be lowercase letters, numbers, and hyphens only." },
      { status: 400 }
    );
  }
  if (RESERVED_SLUGS.has(slug)) {
    return NextResponse.json({ error: `"${slug}" is reserved — pick another slug.` }, { status: 400 });
  }

  const db = getDB();
  const conflict = await db
    .prepare("SELECT id FROM Page WHERE slug = ?")
    .bind(slug)
    .first<{ id: string }>();
  if (conflict && conflict.id !== id) {
    return NextResponse.json({ error: "A page with that slug already exists." }, { status: 409 });
  }

  const updatedAt = nowIso();
  const contentValue = typeof content === "string" ? content : "";
  const blocksValue = serializeBlocks(blocks);
  const publishedValue = published ? 1 : 0;

  await db
    .prepare(
      "UPDATE Page SET title = ?, slug = ?, content = ?, blocks = ?, published = ?, updatedAt = ? WHERE id = ?"
    )
    .bind(title, slug, contentValue, blocksValue, publishedValue, updatedAt, id)
    .run();

  const page = await db.prepare("SELECT * FROM Page WHERE id = ?").bind(id).first();
  return NextResponse.json({ page });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDB();
  const page = await db.prepare("SELECT id FROM Page WHERE id = ?").bind(id).first();
  if (!page) return NextResponse.json({ error: "Not found." }, { status: 404 });
  await db.prepare("DELETE FROM Page WHERE id = ?").bind(id).run();
  return NextResponse.json({ ok: true });
}
