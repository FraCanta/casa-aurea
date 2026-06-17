import type { Metadata } from "next";
import "./globals.css";
import { BookingProvider } from "@/components/BookingState";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dimoralevante.it"),
  title: {
    default: `${siteConfig.name} | Case vacanza boutique a ${siteConfig.locality}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    `Casa vacanza a ${siteConfig.locality}, villa in affitto e appartamento turistico per soggiorni nel centro storico, vicino al mare o nelle campagne.`,
  openGraph: {
    title: `${siteConfig.name} | Ospitalita boutique in ${siteConfig.region}`,
    description:
      "Template premium per case vacanza, ville, appartamenti turistici e B&B boutique con booking request, SEO locale e pagine alloggio.",
    type: "website",
    locale: "it_IT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>
        <BookingProvider>
          <SmoothScroll>
            <Header />
            {children}
            <Footer />
          </SmoothScroll>
        </BookingProvider>
      </body>
    </html>
  );
}
