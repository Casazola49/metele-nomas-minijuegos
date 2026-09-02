import type { Metadata } from "next";
import { Black_Han_Sans, Bebas_Neue, Nunito } from "next/font/google";
import "./globals.css";

const blackHanSans = Black_Han_Sans({
  weight: "400",
  variable: "--font-black-han",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

// TODO: actualizar al dominio definitivo de los minijuegos (p. ej. https://minijuegos.metelenomas.lat)
// una vez confirmado el deploy. Por ahora se usa el dominio oficial del podcast.
export const metadata: Metadata = {
  metadataBase: new URL("https://metelenomas.lat"),
  title: {
    default: "Metele Nomás — Minijuegos",
    template: "%s — Metele Nomás",
  },
  description:
    "Minijuegos oficiales de Metele Nomás, el podcast y streaming de Bolivia. Jugá Pelimojis, ¿Cuál fue primero?, ¿Adivina la edad?, Pixel Chef, ¿A cuánto case? y ¿Real o IA?, en vivo con El Carda y El Yeison.",
  keywords: [
    "minijuegos",
    "Metele Nomás",
    "juegos de preguntas",
    "El Carda",
    "El Yeison",
    "La Mosca",
    "Bolivia",
    "podcast",
    "streaming",
    "Pelimojis",
    "Cuál fue primero",
    "Adivina la edad",
    "Pixel Chef",
    "A cuánto case",
    "Real o IA",
  ],
  authors: [{ name: "Metele Nomás" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_BO",
    url: "https://metelenomas.lat",
    siteName: "Metele Nomás — Minijuegos",
    title: "Metele Nomás — Minijuegos",
    description:
      "Minijuegos oficiales de Metele Nomás. Pelimojis, ¿Cuál fue primero?, Pixel Chef, ¿A cuánto case? y más, en vivo con El Carda y El Yeison.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Metele Nomás — Minijuegos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Metele Nomás — Minijuegos",
    description:
      "Minijuegos oficiales de Metele Nomás. Pelimojis, ¿Cuál fue primero?, Pixel Chef, ¿A cuánto case? y más.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-BO">
      <body
        className={`${blackHanSans.variable} ${bebasNeue.variable} ${nunito.variable} antialiased font-sans bg-comic-black text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
