import { getDB } from "@/lib/db";
import { ContentEditor } from "./content-editor";

export default async function ContentPage() {
  const db = getDB();
  const { results: items } = await db
    .prepare("SELECT * FROM ContentItem ORDER BY section ASC, key ASC")
    .all<{ id: string; section: string; key: string; label: string; type: string; value: string }>();

  return (
    <div>
      <h1 className="text-2xl font-bold">Content</h1>
      <p className="mt-1 text-sm text-slate-500">
        Edit text shown on the live site. Changes save immediately and show up on refresh.
      </p>
      <div className="mt-8">
        <ContentEditor initialItems={items} />
      </div>
    </div>
  );
}
