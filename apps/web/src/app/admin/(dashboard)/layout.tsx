import Link from "next/link";
import type { ReactNode } from "react";
import { LogoutButton } from "./logout-button";
import { ADMIN_PAGES } from "@/lib/admin-pages";
import { getDB } from "@/lib/db";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const db = getDB();
  const { results: customPages } = await db
    .prepare("SELECT id, title FROM Page ORDER BY title ASC")
    .all<{ id: string; title: string }>();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <aside className="w-56 shrink-0 border-r border-slate-200 bg-white px-4 py-6 flex flex-col overflow-y-auto">
        <div className="text-sm font-bold text-brand-primary px-2">10to10 Admin</div>

        <nav className="mt-6 flex flex-col gap-1">
          <Link
            href="/admin"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            Dashboard
          </Link>
        </nav>

        <div className="mt-6 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Pages
        </div>
        <nav className="mt-2 flex flex-col gap-1">
          {ADMIN_PAGES.map((p) => (
            <Link
              key={p.slug}
              href={`/admin/pages/${p.slug}`}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
            >
              {p.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 flex items-center justify-between px-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Custom pages
          </span>
          <Link href="/admin/custom-pages/new" className="text-xs font-bold text-brand-primary" title="New page">
            +
          </Link>
        </div>
        <nav className="mt-2 flex flex-col gap-1">
          {customPages.length === 0 ? (
            <Link
              href="/admin/custom-pages"
              className="rounded-lg px-3 py-2 text-xs text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            >
              None yet — add one
            </Link>
          ) : (
            <>
              {customPages.map((p) => (
                <Link
                  key={p.id}
                  href={`/admin/custom-pages/${p.id}`}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition truncate"
                >
                  {p.title}
                </Link>
              ))}
              <Link
                href="/admin/custom-pages"
                className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-400 hover:text-slate-600 transition"
              >
                Manage all →
              </Link>
            </>
          )}
        </nav>

        <div className="mt-6 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Site
        </div>
        <nav className="mt-2 flex flex-col gap-1">
          <Link
            href="/admin/appearance"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            Appearance
          </Link>
          <Link
            href="/admin/media"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            Media
          </Link>
          <Link
            href="/admin/payments"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            Payments
          </Link>
        </nav>

        <div className="mt-auto pt-6">
          <Link href="/" className="block px-3 py-2 text-xs text-slate-400 hover:text-slate-600">
            ← Back to site
          </Link>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 px-8 py-8">{children}</main>
    </div>
  );
}
