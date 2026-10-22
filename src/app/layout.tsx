import type { Metadata, Viewport } from "next";
import { fontPreloads } from "@/lib/visual-assets.json";
import "./fonts.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "FASON — Creative Hair Studio",
  description:
    "Formă. Culoare. Atitudine. Descoperă serviciile și colecțiile FASON: tuns personalizat, culoare, balayage și styling creativ.",
  applicationName: "FASON",
  openGraph: {
    title: "FASON — Mai mult tu.",
    description:
      "Salon FASON, București. Tunsori, culoare și styling. Descoperă colecțiile și pregătește o vizită în salon.",
    locale: "ro_RO",
    type: "website",
  },
  robots: { index: false, follow: false }, // Activează indexarea după completarea datelor reale.
};

export const viewport: Viewport = { themeColor: "#211d1b" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro">
      <head>
        {fontPreloads.map((href) => (
          <link
            key={href}
            rel="preload"
            href={href}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body>
        <a
          href="#continut"
          className="sr-only fixed top-4 left-4 z-60 rounded-full bg-cream px-5 py-3 text-xs text-ink focus:not-sr-only"
        >
          Sari la conținut
        </a>
        {children}
      </body>
    </html>
  );
}
