import "server-only";
import type { Locale } from "@/i18n/routing";

export type Dictionary = {
  common: Record<string, string>;
  home: Record<string, string>;
  alloggi: Record<string, string>;
  checkout: Record<string, string>;
  pages: Record<string, string>;
};

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  it: async () => ({
    common: (await import("../../locales/it/common.json")).default,
    home: (await import("../../locales/it/home.json")).default,
    alloggi: (await import("../../locales/it/alloggi.json")).default,
    checkout: (await import("../../locales/it/checkout.json")).default,
    pages: (await import("../../locales/it/pages.json")).default,
  }),
  en: async () => ({
    common: (await import("../../locales/en/common.json")).default,
    home: (await import("../../locales/en/home.json")).default,
    alloggi: (await import("../../locales/en/alloggi.json")).default,
    checkout: (await import("../../locales/en/checkout.json")).default,
    pages: (await import("../../locales/en/pages.json")).default,
  }),
  es: async () => ({
    common: (await import("../../locales/es/common.json")).default,
    home: (await import("../../locales/es/home.json")).default,
    alloggi: (await import("../../locales/es/alloggi.json")).default,
    checkout: (await import("../../locales/es/checkout.json")).default,
    pages: (await import("../../locales/es/pages.json")).default,
  }),
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
