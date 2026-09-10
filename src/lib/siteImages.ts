import { getDb } from "./firebaseAdmin";
import type { SiteImageSlot, SiteImagesMap } from "./siteImageTypes";

export type { SiteImageSlot, SiteImagesMap } from "./siteImageTypes";
export { SITE_IMAGE_SLOTS } from "./siteImageTypes";

const COLLECTION = "siteImages";

function collection() {
  return getDb().collection(COLLECTION);
}

export async function getAllSiteImages(): Promise<SiteImagesMap> {
  const snapshot = await collection().get();
  const all: SiteImagesMap = {};
  snapshot.docs.forEach((doc) => {
    const url = doc.data().url;
    if (typeof url === "string" && url) {
      all[doc.id as SiteImageSlot] = url;
    }
  });
  return all;
}

export async function getSiteImage(slot: SiteImageSlot): Promise<string | null> {
  const doc = await collection().doc(slot).get();
  const url = doc.data()?.url;
  return typeof url === "string" && url ? url : null;
}

export async function setSiteImage(slot: SiteImageSlot, url: string) {
  await collection().doc(slot).set({ url });
}

export async function removeSiteImage(slot: SiteImageSlot) {
  await collection().doc(slot).delete();
}
