"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/tracking";

// Logs one "pageview" event (to our own in-house analytics, see
// /admin → Rendimiento) per route the visitor actually lands on, including
// the first load and every client-side navigation.
export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;
    trackPageView();
  }, [pathname]);

  return null;
}
