import { getDb } from "./firebaseAdmin";

// Deliberately its own Firestore collection, separate from `siteSettings`
// (which is readable by the public, unauthenticated GET /api/site-settings) —
// this is an internal, agency-only billing note and must never be exposed
// over a public endpoint.
const COLLECTION = "internal";
const DOC_ID = "billingReminder";

export interface BillingReminder {
  active: boolean;
  amountUsd: number;
  dueDate: string; // ISO date, e.g. "2026-11-01"
}

export const DEFAULT_BILLING_REMINDER: BillingReminder = {
  active: false,
  amountUsd: 25,
  dueDate: "2026-11-01",
};

export async function getBillingReminder(): Promise<BillingReminder> {
  const doc = await getDb().collection(COLLECTION).doc(DOC_ID).get();
  const data = doc.data();
  if (!data) return DEFAULT_BILLING_REMINDER;
  return {
    active: typeof data.active === "boolean" ? data.active : DEFAULT_BILLING_REMINDER.active,
    amountUsd: Number.isFinite(Number(data.amountUsd))
      ? Number(data.amountUsd)
      : DEFAULT_BILLING_REMINDER.amountUsd,
    dueDate:
      typeof data.dueDate === "string" && data.dueDate
        ? data.dueDate
        : DEFAULT_BILLING_REMINDER.dueDate,
  };
}

export async function updateBillingReminder(partial: Partial<BillingReminder>) {
  const fields = Object.keys(partial);
  if (fields.length === 0) return;
  await getDb().collection(COLLECTION).doc(DOC_ID).set(partial, { mergeFields: fields });
}
