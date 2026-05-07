import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/utils";
import { zones } from "@/content/zones";
import { seoLastModified } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: seoLastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/play-school`, lastModified: seoLastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/memberships`, lastModified: seoLastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/party-planner`, lastModified: seoLastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/summer-camp`, lastModified: seoLastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/about`, lastModified: seoLastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: seoLastModified, changeFrequency: "monthly", priority: 0.7 },
  ];

  const zonePages: MetadataRoute.Sitemap = zones.map((z) => ({
    url: `${base}/zones/${z.slug}`,
    lastModified: seoLastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...zonePages];
}
