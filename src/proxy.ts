import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/auth";

// Optimistic check only (Edge runtime can't use Node's crypto to verify the
// HMAC signature) — the real, cryptographically-verified check happens in
// the dashboard page and in every mutating API route via getIsAdminAuthenticated().
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSessionCookie = Boolean(
    request.cookies.get(ADMIN_COOKIE_NAME)?.value
  );

  if (pathname.startsWith("/admin/dashboard") && !hasSessionCookie) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/admin/login" && hasSessionCookie) {
    const dashboardUrl = new URL("/admin/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/login"],
};
