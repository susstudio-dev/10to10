import { NextRequest, NextResponse } from "next/server";
import { getDB, getMediaBucket } from "@/lib/db";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDB();
  const asset = await db
    .prepare("SELECT * FROM MediaAsset WHERE id = ?")
    .bind(id)
    .first<{ id: string; path: string }>();
  if (!asset) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  await db.prepare("DELETE FROM MediaAsset WHERE id = ?").bind(id).run();

  const objectKey = asset.path.replace(/^\/media\//, "");
  try {
    await getMediaBucket().delete(objectKey);
  } catch {
    // R2 object already gone — the DB row is the source of truth for the UI
  }
  return NextResponse.json({ ok: true });
}
