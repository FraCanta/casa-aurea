import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale, locales, type Locale } from "@/i18n/routing";

export type LocalizedPageProps = {
  params: Promise<{ lang: string }>;
};

export function localizedPath(locale: Locale, pathname: string) {
  return pathname ? `/${locale}${pathname}` : `/${locale}`;
}

export function localizedAlternates(lang: Locale, pathname: string) {
  return {
    canonical: localizedPath(lang, pathname),
    languages: Object.fromEntries(
      locales.map((locale) => [locale, localizedPath(locale, pathname)]),
    ),
  };
}

export async function createLocalizedMetadata({
  lang,
  pathname,
  titleKey,
  descriptionKey,
  index = true,
}: {
  lang: string;
  pathname: string;
  titleKey: string;
  descriptionKey: string;
  index?: boolean;
}): Promise<Metadata> {
  if (!hasLocale(lang)) return {};

  const dictionary = await getDictionary(lang);
  const title = dictionary.pages[titleKey];
  const description = dictionary.pages[descriptionKey];
  const canonical = localizedPath(lang, pathname);

  return {
    title,
    description,
    alternates: localizedAlternates(lang, pathname),
    openGraph: {
      title,
      description,
      url: canonical,
    },
    robots: index ? undefined : { index: false, follow: false },
  };
}
