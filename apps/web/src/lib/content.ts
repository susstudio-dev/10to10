import { getDB } from "@/lib/db";

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

/**
 * Loads all ContentItem rows for a section into a key→value map, falling
 * back to an empty map if D1 isn't reachable (e.g. before migrations have
 * been applied) so the marketing site never breaks because of the admin
 * layer.
 */
export async function getContentMap(section: string): Promise<Record<string, string>> {
  try {
    const db = getDB();
    const { results } = await db
      .prepare("SELECT key, value FROM ContentItem WHERE section = ?")
      .bind(section)
      .all<{ key: string; value: string }>();
    return Object.fromEntries(results.map((i) => [i.key, i.value]));
  } catch (err) {
    console.warn(`[content] failed to load section "${section}":`, err);
    return {};
  }
}
