"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Login failed.");
      return;
    }
    router.push(params.get("from") || "/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Admin sign in</h1>
        <p className="mt-1 text-sm text-slate-500">10to10 Adventures content admin</p>

        <label className="block mt-6 text-sm font-medium text-slate-700">
          Username
          <input
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </label>
        <label className="block mt-4 text-sm font-medium text-slate-700">
          Password
          <input
            type="password"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-brand-primary text-white text-sm font-semibold py-2.5 disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
