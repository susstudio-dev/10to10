import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const isStaticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const config: NextConfig = {
  reactStrictMode: true,
  ...(isStaticExport && {
    output: "export",
    trailingSlash: true,
    basePath,
    assetPrefix: basePath || undefined,
  }),
  images: {
    ...(isStaticExport && { unoptimized: true }),
    remotePatterns: [
      { protocol: "https", hostname: "10to10adventures.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default config;

// Wires local `next dev` up to Miniflare-emulated D1/R2 bindings so
// getCloudflareContext() resolves the same way it will on Cloudflare
// Workers in production. Async internally, but intentionally not awaited
// here (per @opennextjs/cloudflare's own docs) — awaiting would require
// top-level await, which breaks Next's CJS config transpilation.
// Dev-only: `next build` also evaluates this config (in several worker
// processes at once), and booting Miniflare there is useless — no route
// prerenders — and crashes workerd on Windows.
if (!isStaticExport && process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}
