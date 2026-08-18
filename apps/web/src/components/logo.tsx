import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Brand logo — the real "10 TO 10" brush-mark artwork, background removed.
 * `mark` is the icon only (for tight navbar space, paired with a text
 * wordmark); `full` is the complete icon + "10 TO 10" lockup (for the
 * footer, where there's room and a dark background to set the white
 * strokes against).
 */

const MARK_RATIO = 700 / 315;
const FULL_RATIO = 800 / 650;

export function Logo({
  size = "md",
  variant = "mark",
  onLight = false,
  className,
}: {
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "mark" | "full";
  /** Use the ink-recolored artwork (the "PLAY" / "TO" brush strokes are
   *  white in the original) so it reads directly on a light or
   *  transparent surface, with no backdrop needed. */
  onLight?: boolean;
  className?: string;
}) {
  if (variant === "full") {
    const h = size === "lg" ? 120 : size === "sm" ? 76 : size === "xs" ? 76 : 96;
    return (
      <Image
        src={onLight ? "/logo-full-onlight.png" : "/logo-full.png"}
        alt="10to10 Adventures"
        width={Math.round(h * FULL_RATIO)}
        height={h}
        style={{ height: h, width: "auto" }}
        className={cn("select-none", className)}
      />
    );
  }

  const h = size === "lg" ? 56 : size === "sm" ? 32 : 40;
  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      <Image
        src="/logo-mark.png"
        alt="10to10 Adventures"
        width={Math.round(h * MARK_RATIO)}
        height={h}
        style={{ height: h, width: "auto" }}
        priority
      />
      <span className="hidden sm:flex flex-col leading-none">
        <span className="font-display font-extrabold text-lg text-brand-primary tracking-tight">
          10to10
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-ink/45">
          Adventures
        </span>
      </span>
    </div>
  );
}
