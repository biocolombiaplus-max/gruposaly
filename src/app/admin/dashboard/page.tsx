import { redirect } from "next/navigation";
import { getIsAdminAuthenticated } from "@/lib/auth";
import { getAllServiceImages } from "@/lib/serviceImages";
import { getAllProperties } from "@/lib/properties";
import { getAllSiteImages } from "@/lib/siteImages";
import { getSiteSettings } from "@/lib/siteSettings";
import { getBillingReminder } from "@/lib/billingReminder";
import AdminDashboard from "@/components/admin/AdminDashboard";
import PaymentReminderModal from "@/components/admin/PaymentReminderModal";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  if (!(await getIsAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const [serviceImages, properties, siteImages, siteSettings, billingReminder] =
    await Promise.all([
      getAllServiceImages(),
      getAllProperties(),
      getAllSiteImages(),
      getSiteSettings(),
      getBillingReminder(),
    ]);

  return (
    <>
      <PaymentReminderModal reminder={billingReminder} />
      <AdminDashboard
        initialServiceImages={serviceImages}
        initialProperties={properties}
        initialSiteImages={siteImages}
        initialSiteSettings={siteSettings}
      />
    </>
  );
}
