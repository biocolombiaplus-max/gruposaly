import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logAnalyticsEvent } from "@/lib/analytics";

export const dynamic = "force-dynamic";

const VALID_TYPES = ["pageview", "whatsapp_click"];

function str(value: unknown, max: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : undefined;
}

// Public, unauthenticated — fired from every visitor's browser. Never throws
// back a meaningful error to the client; tracking must never block or break
// the page for a real visitor.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || !VALID_TYPES.includes(body.type) || typeof body.path !== "string") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await logAnalyticsEvent({
    type: body.type,
    path: str(body.path, 300) ?? "/",
    label: str(body.label, 200),
    message: str(body.message, 500),
    referrer: str(body.referrer, 300),
    utmSource: str(body.utmSource, 100),
    utmMedium: str(body.utmMedium, 100),
    utmCampaign: str(body.utmCampaign, 150),
    utmContent: str(body.utmContent, 150),
  }).catch(() => undefined);

  return NextResponse.json({ ok: true });
}
