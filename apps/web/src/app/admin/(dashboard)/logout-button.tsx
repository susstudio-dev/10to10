"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function onClick() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={onClick}
      className="mt-1 w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50"
    >
      Log out
    </button>
  );
}
