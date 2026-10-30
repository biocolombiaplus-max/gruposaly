import { NextResponse } from "next/server";
import { getAllProperties } from "@/lib/properties";
import { buildMetaFeedCsv } from "@/lib/catalog/metaFeed";

export const dynamic = "force-dynamic";

// Public, unauthenticated feed — Meta's Commerce Manager fetches this on a
// schedule (e.g. daily) with no credentials, the same way it would fetch any
// other hosted product feed.
export async function GET() {
  const properties = await getAllProperties();
  const csv = buildMetaFeedCsv(properties);

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Cache-Control": "public, max-age=1800",
    },
  });
}
