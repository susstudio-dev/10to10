import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
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
  const page = await prisma.page.findUnique({ where: { id } });
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

  const conflict = await prisma.page.findUnique({ where: { slug } });
  if (conflict && conflict.id !== id) {
    return NextResponse.json({ error: "A page with that slug already exists." }, { status: 409 });
  }

  const page = await prisma.page.update({
    where: { id },
    data: {
      title,
      slug,
      content: typeof content === "string" ? content : "",
      blocks: serializeBlocks(blocks),
      published: !!published,
    },
  });
  return NextResponse.json({ page });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) return NextResponse.json({ error: "Not found." }, { status: 404 });
  await prisma.page.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
