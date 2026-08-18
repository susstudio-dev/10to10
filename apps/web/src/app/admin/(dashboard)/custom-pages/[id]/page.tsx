import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageForm } from "../page-form";

export default async function EditCustomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });
  if (!page) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit page</h1>
      <p className="mt-1 text-sm text-slate-500">/pages/{page.slug}</p>
      <div className="mt-8">
        <PageForm initial={page} />
      </div>
    </div>
  );
}
