import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.contentItem.findMany({
    orderBy: [{ section: "asc" }, { key: "asc" }],
  });
  return NextResponse.json({ items });
}

export async function PUT(req: NextRequest) {
  const { key, value } = await req.json();
  if (!key || typeof value !== "string") {
    return NextResponse.json({ error: "key and value are required." }, { status: 400 });
  }
  const item = await prisma.contentItem.update({ where: { key }, data: { value } });
  return NextResponse.json({ item });
}
