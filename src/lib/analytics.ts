import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "./firebaseAdmin";

const COLLECTION = "analyticsEvents";

export interface AnalyticsEventInput {
  type: "pageview" | "whatsapp_click";
  path: string;
  label?: string;
  message?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
}

export async function logAnalyticsEvent(event: AnalyticsEventInput) {
  await getDb()
    .collection(COLLECTION)
    .add({ ...event, createdAt: FieldValue.serverTimestamp() });
}

interface PathCounts {
  path: string;
  pageViews: number;
  whatsAppClicks: number;
}

interface CampaignCounts {
  campaign: string;
  pageViews: number;
  whatsAppClicks: number;
}

interface DayCounts {
  date: string;
  pageViews: number;
  whatsAppClicks: number;
}

export interface AnalyticsSummary {
  days: number;
  totalPageViews: number;
  totalWhatsAppClicks: number;
  byLabel: { label: string; count: number }[];
  byPath: PathCounts[];
  byCampaign: CampaignCounts[];
  byDay: DayCounts[];
}

export async function getAnalyticsSummary(days: number): Promise<AnalyticsSummary> {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const snapshot = await getDb()
    .collection(COLLECTION)
    .where("createdAt", ">=", since)
    .get();

  let totalPageViews = 0;
  let totalWhatsAppClicks = 0;
  const byLabel = new Map<string, number>();
  const byPath = new Map<string, { pageViews: number; whatsAppClicks: number }>();
  const byCampaign = new Map<string, { pageViews: number; whatsAppClicks: number }>();
  const byDay = new Map<string, { pageViews: number; whatsAppClicks: number }>();

  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    const type = data.type as string;
    const path = (data.path as string) || "(desconocida)";
    const campaign = (data.utmCampaign as string) || "(sin campaña)";
    const createdAt = (data.createdAt?.toDate?.() as Date | undefined) ?? new Date();
    const day = createdAt.toISOString().slice(0, 10);

    const pathEntry = byPath.get(path) ?? { pageViews: 0, whatsAppClicks: 0 };
    const campaignEntry = byCampaign.get(campaign) ?? { pageViews: 0, whatsAppClicks: 0 };
    const dayEntry = byDay.get(day) ?? { pageViews: 0, whatsAppClicks: 0 };

    if (type === "pageview") {
      totalPageViews += 1;
      pathEntry.pageViews += 1;
      campaignEntry.pageViews += 1;
      dayEntry.pageViews += 1;
    } else if (type === "whatsapp_click") {
      totalWhatsAppClicks += 1;
      pathEntry.whatsAppClicks += 1;
      campaignEntry.whatsAppClicks += 1;
      dayEntry.whatsAppClicks += 1;
      const label = (data.label as string) || "(sin etiqueta)";
      byLabel.set(label, (byLabel.get(label) ?? 0) + 1);
    }

    byPath.set(path, pathEntry);
    byCampaign.set(campaign, campaignEntry);
    byDay.set(day, dayEntry);
  });

  return {
    days,
    totalPageViews,
    totalWhatsAppClicks,
    byLabel: [...byLabel.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count),
    byPath: [...byPath.entries()]
      .map(([path, v]) => ({ path, ...v }))
      .sort((a, b) => b.pageViews + b.whatsAppClicks - (a.pageViews + a.whatsAppClicks)),
    byCampaign: [...byCampaign.entries()]
      .map(([campaign, v]) => ({ campaign, ...v }))
      .sort((a, b) => b.pageViews + b.whatsAppClicks - (a.pageViews + a.whatsAppClicks)),
    byDay: [...byDay.entries()]
      .map(([date, v]) => ({ date, ...v }))
      .sort((a, b) => a.date.localeCompare(b.date)),
  };
}
