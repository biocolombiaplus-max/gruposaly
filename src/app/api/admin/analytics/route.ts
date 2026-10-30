import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIsAdminAuthenticated } from "@/lib/auth";
import { getAnalyticsSummary } from "@/lib/analytics";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!(await getIsAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const requested = Number(searchParams.get("days"));
  const days = Number.isFinite(requested) ? Math.min(Math.max(requested, 1), 90) : 30;

  const summary = await getAnalyticsSummary(days);
  return NextResponse.json({ summary });
}
