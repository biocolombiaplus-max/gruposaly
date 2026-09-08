"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "No se pudo iniciar sesión.");
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100svh-73px)] items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-ink-900 p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-400/30 bg-brand-500/15 text-brand-300">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="mt-5 text-center font-display text-xl font-bold">
          Acceso Administrativo
        </h1>
        <p className="mt-2 text-center text-sm text-white/50">
          Ingresa la contraseña para gestionar servicios e inmuebles.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div>
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full rounded-xl border border-white/15 bg-ink-950 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand-500"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-brand-500 py-3 text-sm font-bold text-ink-950 transition-transform hover:scale-[1.01] disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
