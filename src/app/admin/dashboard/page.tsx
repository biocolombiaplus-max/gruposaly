import { redirect } from "next/navigation";
import { getIsAdminAuthenticated } from "@/lib/auth";
import { getAllServiceImages } from "@/lib/serviceImages";
import { getAllProperties } from "@/lib/properties";
import { getAllSiteImages } from "@/lib/siteImages";
import { getSiteSettings } from "@/lib/siteSettings";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  if (!(await getIsAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const [serviceImages, properties, siteImages, siteSettings] = await Promise.all([
    getAllServiceImages(),
    getAllProperties(),
    getAllSiteImages(),
    getSiteSettings(),
  ]);

  return (
    <AdminDashboard
      initialServiceImages={serviceImages}
      initialProperties={properties}
      initialSiteImages={siteImages}
      initialSiteSettings={siteSettings}
    />
  );
}
