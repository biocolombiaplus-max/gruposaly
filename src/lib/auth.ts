import { cookies } from "next/headers";
import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "gs_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

function getSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "gruposaly-dev-secret-change-me"
  );
}

function sign(value: string) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken() {
  const issuedAt = Date.now().toString();
  const signature = sign(issuedAt);
  return `${issuedAt}.${signature}`;
}

export function isValidSessionToken(token: string | undefined | null) {
  if (!token) return false;
  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature) return false;
  const expected = sign(issuedAt);
  const validSignature =
    expected.length === signature.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  if (!validSignature) return false;
  const age = Date.now() - Number(issuedAt);
  return age >= 0 && age <= SESSION_MAX_AGE_SECONDS * 1000;
}

export async function getIsAdminAuthenticated() {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  return isValidSessionToken(token);
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "123456";
}

export const SESSION_COOKIE_MAX_AGE = SESSION_MAX_AGE_SECONDS;
