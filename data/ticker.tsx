import { Instagram, Youtube } from "lucide-react";

export const TICKER_PHRASES = [
  "METELE NOMÁS",
  "PODCAST",
  "EL CARDA",
  "LA MOSCA QUE TE PREGUNTO!",
  "¿ERES THERIAN?",
  "FAFA",
  "CHOCHITO",
  "PICHICOCACHO",
  "EL YEISON",
  "ÚLTIMA COSA, ÚLTIMA PALABRA",
  "PEDRO LUIS COLQUE MAMANI",
] as const;

export type SocialPlatform = "spotify" | "instagram" | "tiktok" | "youtube";

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialPlatform;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: "SPOTIFY", href: "https://metelenomas.lat", icon: "spotify" },
  { label: "INSTAGRAM", href: "https://metelenomas.lat", icon: "instagram" },
  { label: "TIKTOK", href: "https://metelenomas.lat", icon: "tiktok" },
  { label: "YOUTUBE", href: "https://metelenomas.lat", icon: "youtube" },
];

export function SocialIcon({ name }: { name: SocialPlatform }) {
  if (name === "spotify") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.586 14.424a.622.622 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 11-.277-1.215c3.809-.871 7.077-.496 9.712 1.115a.623.623 0 01.207.857zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 11-.452-1.493c3.632-1.102 8.147-.568 11.234 1.328a.78.78 0 01.255 1.074zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.935.935 0 11-.543-1.79c3.532-1.072 9.404-.865 13.115 1.338a.936.936 0 01-.945 1.614z" />
      </svg>
    );
  }
  if (name === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
        <path d="M16.5 3c.4 2.2 1.7 3.9 3.8 4.2v3c-1.3.1-2.6-.3-3.8-1v6.3c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6c.3 0 .7 0 1 .1v3.1c-.3-.1-.7-.2-1-.2-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3V3h3.9z" />
      </svg>
    );
  }
  if (name === "instagram") return <Instagram className="h-7 w-7" aria-hidden="true" />;
  return <Youtube className="h-7 w-7" aria-hidden="true" />;
}
