export type BlockAnimation = "none" | "fade-up" | "pop" | "slide-left" | "slide-right";

export type Block =
  | { id: string; type: "heading"; text: string; animation: BlockAnimation }
  | { id: string; type: "paragraph"; text: string; animation: BlockAnimation }
  | { id: string; type: "image"; url: string; alt: string; animation: BlockAnimation };

export const BLOCK_ANIMATIONS: { value: BlockAnimation; label: string }[] = [
  { value: "none", label: "None" },
  { value: "fade-up", label: "Fade up" },
  { value: "pop", label: "Pop in" },
  { value: "slide-left", label: "Slide from left" },
  { value: "slide-right", label: "Slide from right" },
];

const ANIMATIONS = new Set<BlockAnimation>(["none", "fade-up", "pop", "slide-left", "slide-right"]);

/** Parses and sanitizes the JSON `blocks` column; never throws. */
export function parseBlocks(raw: string): Block[] {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidBlock);
  } catch {
    return [];
  }
}

/** Validates a raw (already-parsed) array from an API request body and re-serializes it for storage. */
export function serializeBlocks(raw: unknown): string {
  if (!Array.isArray(raw)) return "[]";
  return JSON.stringify(raw.filter(isValidBlock));
}

function isValidBlock(b: unknown): b is Block {
  if (!b || typeof b !== "object") return false;
  const block = b as Record<string, unknown>;
  if (typeof block.id !== "string") return false;
  if (!ANIMATIONS.has(block.animation as BlockAnimation)) return false;
  if (block.type === "heading" || block.type === "paragraph") {
    return typeof block.text === "string";
  }
  if (block.type === "image") {
    return typeof block.url === "string" && typeof block.alt === "string";
  }
  return false;
}
