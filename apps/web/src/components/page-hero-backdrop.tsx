"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMotionSetting } from "./motion-settings";

/**
 * Reuses the same playground photo as the homepage hero, as a softened
 * backdrop for every other page's hero. There's only one real photo asset
 * for the venue right now, so every page shares it (desaturated + a
 * page-specific tint wash so each section still reads as its own "world"
 * rather than an identical repeat) instead of pretending to have unique
 * photography per page.
 */
export function PageHeroBackdrop({
  tintFrom = "from-white/70",
  objectPosition = "center 60%",
}: {
  /** Tailwind gradient-from class for the top wash, tinted per page. */
  tintFrom?: string;
  objectPosition?: string;
}) {
  const reduce = useMotionSetting();

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={reduce ? undefined : { scale: [1.05, 1.11, 1.05] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/images/hero-playground.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover saturate-[0.85] brightness-[1.03]"
          style={{ objectPosition }}
        />
      </motion.div>
      <div className={`absolute inset-0 bg-gradient-to-b ${tintFrom} via-white/25 to-[#fdfbf7]`} />
    </div>
  );
}
