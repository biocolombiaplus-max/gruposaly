import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import MetaPixel from "@/components/MetaPixel";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { getSiteImage } from "@/lib/siteImages";
import { getSiteSettings } from "@/lib/siteSettings";
import { DEFAULT_SITE_SETTINGS } from "@/lib/siteSettingsTypes";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const [logoUrl, settings] = await Promise.all([
    getSiteImage("logo").catch(() => null),
    getSiteSettings().catch(() => DEFAULT_SITE_SETTINGS),
  ]);

  return (
    <>
      <MetaPixel />
      <AnalyticsTracker />
      <AnnouncementBar messages={settings.announcements} />
      <Header
        logoUrl={logoUrl}
        logoSize={settings.logoSize}
        logoAlign={settings.logoAlign}
        logoShowWordmark={settings.logoShowWordmark}
      />
      <main className="flex-1">{children}</main>
      <Footer
        logoUrl={logoUrl}
        logoSize={settings.logoSize}
        logoShowWordmark={settings.logoShowWordmark}
        socialLinks={settings.socialLinks}
      />
      <WhatsAppFloatingButton />
    </>
  );
}
