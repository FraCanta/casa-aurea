import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { BookingProvider } from "@/components/BookingState";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LocaleCurrencyProvider } from "@/components/LocaleCurrencyProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale, locales } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

const siteUrl = "https://www.casaaurea.it";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const dictionary = await getDictionary(lang);
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${siteUrl}/${locale}`]),
  );

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dictionary.pages.siteMetaTitle,
      template: `%s | ${siteConfig.name}`,
    },
    description: dictionary.pages.siteMetaDescription,
    alternates: {
      canonical: `/${lang}`,
      languages,
    },
    openGraph: {
      title: dictionary.pages.siteMetaOgTitle,
      description: dictionary.pages.siteMetaOgDescription,
      type: "website",
      locale: lang === "en" ? "en_US" : lang === "es" ? "es_ES" : "it_IT",
      alternateLocale: locales
        .filter((locale) => locale !== lang)
        .map((locale) =>
          locale === "en" ? "en_US" : locale === "es" ? "es_ES" : "it_IT",
        ),
      url: `/${lang}`,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body>
        <LocaleCurrencyProvider locale={lang} messages={dictionary}>
          <BookingProvider>
            <SmoothScroll>
              <Header />
              {children}
              <Footer />
            </SmoothScroll>
          </BookingProvider>
        </LocaleCurrencyProvider>
      </body>
    </html>
  );
}
