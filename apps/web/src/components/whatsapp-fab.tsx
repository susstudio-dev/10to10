"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/utils";

/**
 * Desktop-only floating WhatsApp button (mobile gets the sticky CTA bar).
 * WhatsApp is the highest-converting channel for Indian family venues, so
 * it stays one click away on every page.
 */
export function WhatsappFab() {
  const href = `${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hi 10to10! I have a question."
  )}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring", damping: 15 }}
      whileHover={{ scale: 1.08, rotate: 6 }}
      whileTap={{ scale: 0.92 }}
      className="hidden lg:flex fixed bottom-6 right-6 z-[70] w-14 h-14 rounded-full bg-[#25D366] text-white items-center justify-center shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
      {/* WhatsApp glyph */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 relative" aria-hidden>
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.13.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29z" />
      </svg>
      <span className="absolute right-full mr-3 whitespace-nowrap rounded-full bg-brand-ink text-white text-xs font-bold px-3.5 py-2 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition pointer-events-none">
        Chat with us — replies in ~5 min
      </span>
    </motion.a>
  );
}
