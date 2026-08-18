import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "image/gif"];
const MAX_SIZE = 8 * 1024 * 1024;

export async function GET() {
  const assets = await prisma.mediaAsset.findMany({ orderBy: { uploadedAt: "desc" } });
  return NextResponse.json({ assets });
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

  await mkdir(UPLOAD_DIR, { recursive: true });
  const ext = path.extname(file.name) || "";
  const filename = `${randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  const asset = await prisma.mediaAsset.create({
    data: { filename: file.name, path: `/uploads/${filename}`, altText },
  });
  return NextResponse.json({ asset }, { status: 201 });
}
