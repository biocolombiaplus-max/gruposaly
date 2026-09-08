import { redirect } from "next/navigation";
import { getIsAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminIndexPage() {
  redirect((await getIsAdminAuthenticated()) ? "/admin/dashboard" : "/admin/login");
}
