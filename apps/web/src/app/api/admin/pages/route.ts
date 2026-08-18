import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
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
  const pages = await prisma.page.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json({ pages });
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

  const existing = await prisma.page.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: "A page with that slug already exists." }, { status: 409 });
  }

  const page = await prisma.page.create({
    data: {
      title,
      slug,
      content: typeof content === "string" ? content : "",
      blocks: serializeBlocks(blocks),
      published: published ?? true,
    },
  });
  return NextResponse.json({ page }, { status: 201 });
}
