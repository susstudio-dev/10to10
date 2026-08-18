import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CustomPagesList() {
  const pages = await prisma.page.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Custom pages</h1>
          <p className="mt-1 text-sm text-slate-500">
            Pages you create here are published at <code className="text-slate-600">/pages/&lt;slug&gt;</code>.
          </p>
        </div>
        <Link
          href="/admin/custom-pages/new"
          className="rounded-lg bg-brand-primary text-white text-sm font-semibold px-4 py-2 shrink-0"
        >
          + New page
        </Link>
      </div>

      {pages.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-400">
          No custom pages yet.
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pages.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3 font-medium text-slate-800">{p.title}</td>
                  <td className="px-4 py-3 text-slate-500">/pages/{p.slug}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        p.published ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-3 whitespace-nowrap">
                    {p.published && (
                      <a
                        href={`/pages/${p.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-slate-500 hover:text-slate-700"
                      >
                        View
                      </a>
                    )}
                    <Link
                      href={`/admin/custom-pages/${p.id}`}
                      className="text-xs font-semibold text-brand-primary"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
