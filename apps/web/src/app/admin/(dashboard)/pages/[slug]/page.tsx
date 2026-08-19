import { notFound } from "next/navigation";
import { getDB } from "@/lib/db";
import { getAdminPage } from "@/lib/admin-pages";
import { ContentEditor } from "../../content/content-editor";

export default async function AdminPageEditor({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getAdminPage(slug);
  if (!page) notFound();

  const db = getDB();
  const { results: items } = await db
    .prepare("SELECT * FROM ContentItem WHERE section = ? ORDER BY key ASC")
    .bind(page.section)
    .all<{ id: string; section: string; key: string; label: string; type: string; value: string }>();

  return (
    <div>
      <h1 className="text-2xl font-bold">{page.label}</h1>
      <p className="mt-1 text-sm text-slate-500">
        Edit the text shown on the {page.label} page. Changes save immediately and show up on refresh.
      </p>
      <div className="mt-8">
        <ContentEditor initialItems={items} />
      </div>
    </div>
  );
}
