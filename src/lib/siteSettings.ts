import { getDb } from "./firebaseAdmin";
import {
  DEFAULT_SITE_SETTINGS,
  type LogoAlign,
  type LogoSize,
  type SiteSettings,
} from "./siteSettingsTypes";

export type { SiteSettings, LogoSize, LogoAlign } from "./siteSettingsTypes";
export {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_ANNOUNCEMENTS,
  LOGO_SIZE_LABELS,
  LOGO_ALIGN_LABELS,
} from "./siteSettingsTypes";

const COLLECTION = "siteSettings";
const DOC_ID = "general";

export async function getSiteSettings(): Promise<SiteSettings> {
  const doc = await getDb().collection(COLLECTION).doc(DOC_ID).get();
  const data = doc.data();
  if (!data) return DEFAULT_SITE_SETTINGS;
  return {
    logoSize: (data.logoSize as LogoSize) || DEFAULT_SITE_SETTINGS.logoSize,
    logoAlign: (data.logoAlign as LogoAlign) || DEFAULT_SITE_SETTINGS.logoAlign,
    announcements: Array.isArray(data.announcements)
      ? data.announcements.filter((a: unknown) => typeof a === "string")
      : DEFAULT_SITE_SETTINGS.announcements,
  };
}

export async function updateSiteSettings(partial: Partial<SiteSettings>) {
  await getDb().collection(COLLECTION).doc(DOC_ID).set(partial, { merge: true });
}
