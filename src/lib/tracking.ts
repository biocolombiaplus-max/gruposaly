// Client-side tracking helpers — fire-and-forget, never block navigation or
// throw if they fail. Feeds two destinations at once: our own in-house
// analytics (Firestore, via /api/track/event — shown in /admin) and the Meta
// Pixel (fbq), which is what actually lets Meta build a remarketing audience.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function utmFromLocation() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") ?? undefined,
    utmMedium: params.get("utm_medium") ?? undefined,
    utmCampaign: params.get("utm_campaign") ?? undefined,
    utmContent: params.get("utm_content") ?? undefined,
  };
}

function sendEvent(body: Record<string, unknown>) {
  fetch("/api/track/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify(body),
  }).catch(() => undefined);
}

export function trackPageView() {
  if (typeof window === "undefined") return;
  sendEvent({
    type: "pageview",
    path: window.location.pathname,
    referrer: document.referrer || undefined,
    ...utmFromLocation(),
  });
}

export function trackWhatsAppClick(label: string, message: string) {
  if (typeof window === "undefined") return;
  sendEvent({
    type: "whatsapp_click",
    path: window.location.pathname,
    label,
    message,
    ...utmFromLocation(),
  });
  window.fbq?.("track", "Contact", { content_name: label });
}
