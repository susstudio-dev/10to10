import { NextRequest, NextResponse } from "next/server";
import { getMediaBucket } from "@/lib/db";

// Streams an admin-uploaded image straight out of the R2 bucket, so
// <Image src="/media/uploads/xyz.png"> works the same way a public/
// static file would, without needing a separate R2 public domain.
export async function GET(_req: NextRequest, { params }: { params: Promise<{ key: string[] }> }) {
  const { key } = await params;
  const objectKey = key.join("/");

  const object = await getMediaBucket().get(objectKey);
  if (!object) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  // Read fully rather than piping object.body — the streamed body doesn't
  // survive the local dev Miniflare<->Next.js RPC boundary intact.
  const buffer = await object.arrayBuffer();
  const headers = new Headers();
  headers.set("content-type", object.httpMetadata?.contentType ?? "application/octet-stream");
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");

  return new NextResponse(buffer, { headers });
}
