import { prisma } from "@/lib/prisma";

/**
 * Loads all ContentItem rows for a section into a key→value map, falling
 * back to an empty map if the database isn't reachable (e.g. before
 * `prisma db push` / `db:seed` has been run) so the marketing site never
 * breaks because of the admin layer.
 */
/** Safely parses a JSON-encoded "list" ContentItem value, falling back if missing/invalid. */
export function parseList<T>(raw: string | undefined, fallback: T[]): T[] {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

export async function getContentMap(section: string): Promise<Record<string, string>> {
  try {
    const items = await prisma.contentItem.findMany({ where: { section } });
    return Object.fromEntries(items.map((i) => [i.key, i.value]));
  } catch (err) {
    console.warn(`[content] failed to load section "${section}":`, err);
    return {};
  }
}
