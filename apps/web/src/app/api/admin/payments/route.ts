import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const payments = await prisma.paymentRecord.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ payments });
}
