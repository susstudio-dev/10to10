import { NextRequest, NextResponse } from "next/server";
import { getDB, newId, nowIso } from "@/lib/db";
import { serializeBlocks } from "@/lib/blocks";

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// Reserved so a custom page can never shadow a real top-level route.
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

export async function GET() {
  const db = getDB();
  const { results } = await db.prepare("SELECT * FROM Page ORDER BY updatedAt DESC").all();
  return NextResponse.json({ pages: results });
}

export async function POST(req: NextRequest) {
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
  const existing = await db.prepare("SELECT id FROM Page WHERE slug = ?").bind(slug).first();
  if (existing) {
    return NextResponse.json({ error: "A page with that slug already exists." }, { status: 409 });
  }

  const id = newId();
  const timestamp = nowIso();
  const page = {
    id,
    slug,
    title,
    content: typeof content === "string" ? content : "",
    blocks: serializeBlocks(blocks),
    published: published ?? true,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  await db
    .prepare(
      "INSERT INTO Page (id, slug, title, content, blocks, published, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    )
    .bind(page.id, page.slug, page.title, page.content, page.blocks, page.published ? 1 : 0, page.createdAt, page.updatedAt)
    .run();

  return NextResponse.json({ page }, { status: 201 });
}
