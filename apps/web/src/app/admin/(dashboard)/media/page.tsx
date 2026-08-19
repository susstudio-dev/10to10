import { getDB } from "@/lib/db";
import { MediaManager } from "./media-manager";

export default async function MediaPage() {
  const db = getDB();
  const { results: assets } = await db
    .prepare("SELECT * FROM MediaAsset ORDER BY uploadedAt DESC")
    .all<{ id: string; filename: string; path: string; altText: string }>();

  return (
    <div>
      <h1 className="text-2xl font-bold">Media</h1>
      <p className="mt-1 text-sm text-slate-500">
        Upload images here, then copy the path into a Content item or component.
      </p>
      <div className="mt-8">
        <MediaManager initialAssets={assets} />
      </div>
    </div>
  );
}
