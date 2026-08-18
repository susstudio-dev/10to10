import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEFAULT_SETTINGS } from "@/lib/settings";

const HEX_RE = /^#[0-9a-fA-F]{6}$/;
const COLOR_FIELDS = [
  "colorPrimary",
  "colorTurquoise",
  "colorYellow",
  "colorOrange",
  "colorGrape",
  "colorMint",
  "colorSky",
  "colorInk",
  "colorCloud",
] as const;

export async function GET() {
  const row = await prisma.siteSettings.findUnique({ where: { id: "default" } });
  return NextResponse.json({ settings: row ?? { id: "default", ...DEFAULT_SETTINGS } });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  for (const field of COLOR_FIELDS) {
    if (body[field] !== undefined && !HEX_RE.test(body[field])) {
      return NextResponse.json({ error: `${field} must be a hex color like #2c3873.` }, { status: 400 });
    }
  }

  const data: Record<string, string | boolean> = {};
  for (const field of COLOR_FIELDS) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  if (typeof body.animationsEnabled === "boolean") {
    data.animationsEnabled = body.animationsEnabled;
  }

  const settings = await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: data,
    create: { id: "default", ...DEFAULT_SETTINGS, ...data },
  });
  return NextResponse.json({ settings });
}
