import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import { getSiteImage } from "@/lib/siteImages";

export const metadata = {
  title: "Panel Administrativo",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const logoUrl = await getSiteImage("logo").catch(() => null);

  return (
    <div className="flex min-h-full flex-col bg-ink-950 font-body text-white">
      <header className="border-b border-white/10 bg-ink-900/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="text-white">
            <Logo src={logoUrl} />
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/50 sm:inline-block">
              Panel Administrativo
            </span>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition-colors hover:border-brand-400/50 hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al sitio
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
