import { NextRequest, NextResponse } from "next/server";
import { getDB, getMediaBucket, newId, nowIso } from "@/lib/db";

const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "image/gif"];
const MAX_SIZE = 8 * 1024 * 1024;

export async function GET() {
  const db = getDB();
  const { results } = await db
    .prepare("SELECT * FROM MediaAsset ORDER BY uploadedAt DESC")
    .all();
  return NextResponse.json({ assets: results });
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");
  const altText = String(formData.get("altText") ?? "");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: "Unsupported file type." }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large (max 8MB)." }, { status: 400 });
  }

  const ext = file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".")) : "";
  const objectKey = `uploads/${newId()}${ext}`;

  const bucket = getMediaBucket();
  await bucket.put(objectKey, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type },
  });

  const id = newId();
  const uploadedAt = nowIso();
  const publicPath = `/media/${objectKey}`;

  const db = getDB();
  await db
    .prepare("INSERT INTO MediaAsset (id, filename, path, altText, uploadedAt) VALUES (?, ?, ?, ?, ?)")
    .bind(id, file.name, publicPath, altText, uploadedAt)
    .run();

  const asset = { id, filename: file.name, path: publicPath, altText, uploadedAt };
  return NextResponse.json({ asset }, { status: 201 });
}
