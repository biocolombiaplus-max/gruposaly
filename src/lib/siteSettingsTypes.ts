export type LogoSize = "md" | "lg" | "xl";
export type LogoAlign = "left" | "center" | "right";

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "linkedin"
  | "twitter";

export type SocialLinks = Partial<Record<SocialPlatform, string>>;

export interface SiteSettings {
  logoSize: LogoSize;
  logoAlign: LogoAlign;
  logoShowWordmark: boolean;
  announcements: string[];
  socialLinks: SocialLinks;
}

export const DEFAULT_ANNOUNCEMENTS: string[] = [
  "Cotización y visita técnica 100% gratis",
  "+120 proyectos entregados en toda Colombia",
  "Respuesta inmediata por WhatsApp",
  "Garantía por escrito en cada obra",
  "Nuevos inmuebles disponibles — aparta el tuyo hoy",
];

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  logoSize: "lg",
  logoAlign: "left",
  logoShowWordmark: false,
  announcements: DEFAULT_ANNOUNCEMENTS,
  socialLinks: {},
};

export const LOGO_SIZE_LABELS: Record<LogoSize, string> = {
  md: "Mediano",
  lg: "Grande",
  xl: "Extra grande",
};

export const LOGO_ALIGN_LABELS: Record<LogoAlign, string> = {
  left: "Izquierda",
  center: "Centro",
  right: "Derecha",
};

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  "facebook",
  "instagram",
  "tiktok",
  "youtube",
  "linkedin",
  "twitter",
];

export const SOCIAL_PLATFORM_LABELS: Record<SocialPlatform, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  twitter: "X (Twitter)",
};

export const SOCIAL_PLATFORM_PLACEHOLDERS: Record<SocialPlatform, string> = {
  facebook: "https://facebook.com/gruposaly",
  instagram: "https://instagram.com/gruposaly",
  tiktok: "https://tiktok.com/@gruposaly",
  youtube: "https://youtube.com/@gruposaly",
  linkedin: "https://linkedin.com/company/gruposaly",
  twitter: "https://x.com/gruposaly",
};
