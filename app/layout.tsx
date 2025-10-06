import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "Harfenzauber mit Lorena Wolfewicz",
    template: "%s | Harfenzauber",
  },
  description:
    "Harfenkonzerte und musikalische Begleitung von Festen und Feiern. Harfenunterricht für Kinder und Erwachsene im schönen Oberbergischen Land.",
  keywords: [
    "Harfe",
    "Harfenmusik",
    "Harfenunterricht",
    "Oberbergischer Kreis",
    "Wiehl",
    "Gummersbach",
    "Hochzeit",
    "Konzert",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <GoogleAnalytics gaId="G-LDH55R3TVL" />
      </body>
    </html>
  );
}
