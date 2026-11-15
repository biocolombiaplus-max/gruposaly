"use client";

import { useState, type FormEvent } from "react";
import { Lock, AlertTriangle } from "lucide-react";
import type { BillingReminder } from "@/lib/billingReminder";

export default function AgenciaPage() {
  const [key, setKey] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [reminder, setReminder] = useState<BillingReminder | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function handleUnlock(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/billing-reminder", {
        headers: { "x-agency-key": key },
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Clave incorrecta.");
      setReminder(data.reminder);
      setUnlocked(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!reminder) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/billing-reminder", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-agency-key": key },
        body: JSON.stringify(reminder),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "No se pudo guardar.");
      setReminder(data.reminder);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setSaving(false);
    }
  }

  if (!unlocked || !reminder) {
    return (
      <div className="mx-auto flex max-w-sm flex-col items-center px-5 py-24 text-center">
        <Lock className="h-7 w-7 text-white/30" />
        <h1 className="mt-4 font-display text-lg font-bold">Acceso restringido</h1>
        <p className="mt-1 text-sm text-white/45">
          Ingresa la clave de agencia para continuar.
        </p>
        <form onSubmit={handleUnlock} className="mt-6 w-full space-y-3">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Clave de agencia"
            autoFocus
            className="w-full rounded-xl border border-white/15 bg-ink-900 px-4 py-2.5 text-center text-sm outline-none focus:border-brand-500"
          />
          <button
            type="submit"
            disabled={!key || loading}
            className="w-full rounded-xl bg-brand-500 py-2.5 text-sm font-bold text-ink-950 transition-transform hover:scale-[1.01] disabled:opacity-50"
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
          {error && <p className="text-sm text-red-400">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-5 py-16 sm:px-8">
      <div className="mb-6 flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-brand-400" />
        <h1 className="font-display text-xl font-bold">
          Aviso de pago pendiente — control interno
        </h1>
      </div>
      <p className="mb-8 text-sm text-white/45">
        Esto controla el popup que ve Linda al entrar a{" "}
        <code className="text-white/70">/admin/dashboard</code>. No está
        enlazado desde ningún menú — solo tú tienes esta URL y la clave.
      </p>

      <div className="space-y-5 rounded-2xl border border-white/10 bg-ink-900/50 p-6">
        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-ink-950 px-4 py-3.5">
          <span className="text-sm font-semibold">
            {reminder.active ? "Popup activo" : "Popup desactivado"}
          </span>
          <input
            type="checkbox"
            checked={reminder.active}
            onChange={(e) => setReminder({ ...reminder, active: e.target.checked })}
            className="h-5 w-9 accent-brand-500"
          />
        </label>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/45">
            Monto (USD)
          </label>
          <input
            type="number"
            min={0}
            value={reminder.amountUsd}
            onChange={(e) =>
              setReminder({ ...reminder, amountUsd: Number(e.target.value) || 0 })
            }
            className="w-full rounded-xl border border-white/15 bg-ink-950 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/45">
            Fecha de vencimiento
          </label>
          <input
            type="date"
            value={reminder.dueDate}
            onChange={(e) => setReminder({ ...reminder, dueDate: e.target.value })}
            className="w-full rounded-xl border border-white/15 bg-ink-950 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
          />
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="w-full rounded-xl bg-brand-500 py-3 text-sm font-bold text-ink-950 transition-transform hover:scale-[1.01] disabled:opacity-50"
        >
          {saving ? "Guardando..." : saved ? "Guardado ✓" : "Guardar cambios"}
        </button>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    </div>
  );
}
