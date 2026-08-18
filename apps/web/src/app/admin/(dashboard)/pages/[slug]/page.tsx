import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminPage } from "@/lib/admin-pages";
import { ContentEditor } from "../../content/content-editor";

export default async function AdminPageEditor({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getAdminPage(slug);
  if (!page) notFound();

  const items = await prisma.contentItem.findMany({
    where: { section: page.section },
    orderBy: { key: "asc" },
  });

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
