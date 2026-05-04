import type { NextConfig } from "next";

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
