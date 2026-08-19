import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET() {
  const db = getDB();
  const { results } = await db
    .prepare("SELECT * FROM PaymentRecord ORDER BY createdAt DESC")
    .all();
  return NextResponse.json({ payments: results });
}
