import { NextRequest, NextResponse } from "next/server";
import { getDB, nowIso } from "@/lib/db";
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
  const db = getDB();
  const row = await db.prepare("SELECT * FROM SiteSettings WHERE id = 'default'").first();
  return NextResponse.json({ settings: row ?? { id: "default", ...DEFAULT_SETTINGS } });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  for (const field of COLOR_FIELDS) {
    if (body[field] !== undefined && !HEX_RE.test(body[field])) {
      return NextResponse.json({ error: `${field} must be a hex color like #2c3873.` }, { status: 400 });
    }
  }

  const data: Record<string, string | number> = {};
  for (const field of COLOR_FIELDS) {
    if (body[field] !== undefined) data[field] = body[field];
  }
  if (typeof body.animationsEnabled === "boolean") {
    data.animationsEnabled = body.animationsEnabled ? 1 : 0;
  }

  const db = getDB();

  // Ensure the singleton row exists before updating individual fields.
  await db
    .prepare(
      `INSERT OR IGNORE INTO SiteSettings
        (id, colorPrimary, colorTurquoise, colorYellow, colorOrange, colorGrape, colorMint, colorSky, colorInk, colorCloud, animationsEnabled, updatedAt)
       VALUES ('default', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      DEFAULT_SETTINGS.colorPrimary,
      DEFAULT_SETTINGS.colorTurquoise,
      DEFAULT_SETTINGS.colorYellow,
      DEFAULT_SETTINGS.colorOrange,
      DEFAULT_SETTINGS.colorGrape,
      DEFAULT_SETTINGS.colorMint,
      DEFAULT_SETTINGS.colorSky,
      DEFAULT_SETTINGS.colorInk,
      DEFAULT_SETTINGS.colorCloud,
      1,
      nowIso()
    )
    .run();

  const fields = Object.keys(data);
  if (fields.length > 0) {
    const setClause = fields.map((f) => `${f} = ?`).join(", ");
    await db
      .prepare(`UPDATE SiteSettings SET ${setClause}, updatedAt = ? WHERE id = 'default'`)
      .bind(...fields.map((f) => data[f]), nowIso())
      .run();
  }

  const settings = await db.prepare("SELECT * FROM SiteSettings WHERE id = 'default'").first();
  return NextResponse.json({ settings });
}
