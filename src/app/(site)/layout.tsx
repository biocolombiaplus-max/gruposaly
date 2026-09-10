import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { getSiteImage } from "@/lib/siteImages";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const logoUrl = await getSiteImage("logo").catch(() => null);

  return (
    <>
      <Header logoUrl={logoUrl} />
      <main className="flex-1">{children}</main>
      <Footer logoUrl={logoUrl} />
      <WhatsAppFloatingButton />
    </>
  );
}
