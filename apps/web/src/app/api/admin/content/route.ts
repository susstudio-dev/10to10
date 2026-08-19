import { NextRequest, NextResponse } from "next/server";
import { getDB, nowIso } from "@/lib/db";

export async function GET() {
  const db = getDB();
  const { results } = await db
    .prepare("SELECT * FROM ContentItem ORDER BY section ASC, key ASC")
    .all();
  return NextResponse.json({ items: results });
}

export async function PUT(req: NextRequest) {
  const { key, value } = await req.json();
  if (!key || typeof value !== "string") {
    return NextResponse.json({ error: "key and value are required." }, { status: 400 });
  }
  const db = getDB();
  await db
    .prepare("UPDATE ContentItem SET value = ?, updatedAt = ? WHERE key = ?")
    .bind(value, nowIso(), key)
    .run();
  const item = await db.prepare("SELECT * FROM ContentItem WHERE key = ?").bind(key).first();
  return NextResponse.json({ item });
}
