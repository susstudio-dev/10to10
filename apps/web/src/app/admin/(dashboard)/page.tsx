import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ADMIN_PAGES } from "@/lib/admin-pages";

export default async function AdminDashboardPage() {
  const [mediaCount, paymentCount, customPageCount] = await Promise.all([
    prisma.mediaAsset.count(),
    prisma.paymentRecord.count(),
    prisma.page.count(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">
        Pick a page to edit its text, or manage images and payments below.
      </p>

      <h2 className="mt-8 text-xs font-bold uppercase tracking-wider text-slate-400">Pages</h2>
      <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ADMIN_PAGES.map((p) => (
          <Link
            key={p.slug}
            href={`/admin/pages/${p.slug}`}
            className="rounded-xl border border-slate-200 bg-white p-5 hover:border-brand-primary/40 transition"
          >
            <div className="text-sm font-semibold text-slate-800">{p.label}</div>
            <div className="mt-1 text-xs text-slate-500">Edit heading, badge & copy</div>
          </Link>
        ))}
      </div>

      <h2 className="mt-8 text-xs font-bold uppercase tracking-wider text-slate-400">Site</h2>
      <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/admin/custom-pages"
          className="rounded-xl border border-slate-200 bg-white p-6 hover:border-brand-primary/40 transition"
        >
          <div className="text-3xl font-bold text-slate-900">{customPageCount}</div>
          <div className="mt-1 text-sm font-semibold text-slate-700">Custom pages</div>
          <div className="mt-1 text-xs text-slate-500">Pages you've added yourself</div>
        </Link>
        <Link
          href="/admin/media"
          className="rounded-xl border border-slate-200 bg-white p-6 hover:border-brand-primary/40 transition"
        >
          <div className="text-3xl font-bold text-slate-900">{mediaCount}</div>
          <div className="mt-1 text-sm font-semibold text-slate-700">Media files</div>
          <div className="mt-1 text-xs text-slate-500">Uploaded images</div>
        </Link>
        <Link
          href="/admin/payments"
          className="rounded-xl border border-slate-200 bg-white p-6 hover:border-brand-primary/40 transition"
        >
          <div className="text-3xl font-bold text-slate-900">{paymentCount}</div>
          <div className="mt-1 text-sm font-semibold text-slate-700">Payments</div>
          <div className="mt-1 text-xs text-slate-500">No payment provider connected yet</div>
        </Link>
      </div>
    </div>
  );
}
