import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { D1Database, R2Bucket } from "@cloudflare/workers-types";

/** The D1 database binding (see wrangler.jsonc). */
export function getDB(): D1Database {
  return getCloudflareContext().env.DB;
}

/** The R2 bucket binding used for admin-uploaded media. */
export function getMediaBucket(): R2Bucket {
  return getCloudflareContext().env.MEDIA;
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function newId(): string {
  return crypto.randomUUID();
}
