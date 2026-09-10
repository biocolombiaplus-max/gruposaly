import { redirect } from "next/navigation";
import { getIsAdminAuthenticated } from "@/lib/auth";
import { getAllServiceImages } from "@/lib/serviceImages";
import { getAllProperties } from "@/lib/properties";
import { getAllSiteImages } from "@/lib/siteImages";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  if (!(await getIsAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const [serviceImages, properties, siteImages] = await Promise.all([
    getAllServiceImages(),
    getAllProperties(),
    getAllSiteImages(),
  ]);

  return (
    <AdminDashboard
      initialServiceImages={serviceImages}
      initialProperties={properties}
      initialSiteImages={siteImages}
    />
  );
}
