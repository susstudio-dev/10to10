import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { unlink } from "fs/promises";
import path from "path";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const asset = await prisma.mediaAsset.findUnique({ where: { id } });
  if (!asset) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  await prisma.mediaAsset.delete({ where: { id } });
  try {
    await unlink(path.join(process.cwd(), "public", asset.path));
  } catch {
    // file already gone — the DB row is the source of truth for the UI
  }
  return NextResponse.json({ ok: true });
}
