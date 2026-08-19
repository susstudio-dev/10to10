import { notFound } from "next/navigation";
import { getDB } from "@/lib/db";
import { PageForm } from "../page-form";

type PageRow = { id: string; slug: string; title: string; blocks: string; published: number };

export default async function EditCustomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDB();
  const page = await db.prepare("SELECT * FROM Page WHERE id = ?").bind(id).first<PageRow>();
  if (!page) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit page</h1>
      <p className="mt-1 text-sm text-slate-500">/pages/{page.slug}</p>
      <div className="mt-8">
        <PageForm initial={{ ...page, published: !!page.published }} />
      </div>
    </div>
  );
}
