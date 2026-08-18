"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Hides the marketing chrome (navbar, footer, ambient doodles, floating
 * CTAs) on /admin routes, which have their own dashboard layout.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
