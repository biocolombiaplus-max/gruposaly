import { getDb } from "./firebaseAdmin";
import {
  DEFAULT_SITE_SETTINGS,
  SOCIAL_PLATFORMS,
  type LogoAlign,
  type LogoSize,
  type SiteSettings,
  type SocialLinks,
} from "./siteSettingsTypes";

export type { SiteSettings, LogoSize, LogoAlign, SocialLinks, SocialPlatform } from "./siteSettingsTypes";
export {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_ANNOUNCEMENTS,
  LOGO_SIZE_LABELS,
  LOGO_ALIGN_LABELS,
  SOCIAL_PLATFORMS,
  SOCIAL_PLATFORM_LABELS,
  SOCIAL_PLATFORM_PLACEHOLDERS,
} from "./siteSettingsTypes";

const COLLECTION = "siteSettings";
const DOC_ID = "general";

function parseSocialLinks(value: unknown): SocialLinks {
  if (!value || typeof value !== "object") return {};
  const links: SocialLinks = {};
  for (const platform of SOCIAL_PLATFORMS) {
    const url = (value as Record<string, unknown>)[platform];
    if (typeof url === "string" && url.trim()) links[platform] = url.trim();
  }
  return links;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const doc = await getDb().collection(COLLECTION).doc(DOC_ID).get();
  const data = doc.data();
  if (!data) return DEFAULT_SITE_SETTINGS;
  return {
    logoSize: (data.logoSize as LogoSize) || DEFAULT_SITE_SETTINGS.logoSize,
    logoAlign: (data.logoAlign as LogoAlign) || DEFAULT_SITE_SETTINGS.logoAlign,
    logoShowWordmark:
      typeof data.logoShowWordmark === "boolean"
        ? data.logoShowWordmark
        : DEFAULT_SITE_SETTINGS.logoShowWordmark,
    announcements: Array.isArray(data.announcements)
      ? data.announcements.filter((a: unknown) => typeof a === "string")
      : DEFAULT_SITE_SETTINGS.announcements,
    socialLinks: parseSocialLinks(data.socialLinks),
  };
}

export async function updateSiteSettings(partial: Partial<SiteSettings>) {
  const fields = Object.keys(partial);
  if (fields.length === 0) return;
  // mergeFields (rather than a blanket merge:true) makes each updated field
  // — socialLinks in particular — a full replacement instead of a deep
  // merge, so clearing a social link actually removes it instead of the
  // old value lingering underneath the new one.
  await getDb()
    .collection(COLLECTION)
    .doc(DOC_ID)
    .set(partial, { mergeFields: fields });
}
