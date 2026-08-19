import type { D1Database, R2Bucket } from "@cloudflare/workers-types";

export {};

declare global {
  interface CloudflareEnv {
    DB: D1Database;
    MEDIA: R2Bucket;
    ADMIN_USERNAME: string;
    ADMIN_PASSWORD: string;
    SESSION_SECRET: string;
  }
}
