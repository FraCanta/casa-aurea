export const locales = ["it", "en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "it";
export const localeCookieName = "casa-aurea-locale";

export function hasLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const segment = pathname.split("/")[1];
  return segment && hasLocale(segment) ? segment : null;
}

export function stripLocaleFromPathname(pathname: string) {
  const locale = getLocaleFromPathname(pathname);
  if (!locale) return pathname || "/";

  const stripped = pathname.slice(locale.length + 1);
  return stripped || "/";
}

export function localizePathname(pathname: string, locale: Locale) {
  if (!pathname.startsWith("/") || pathname.startsWith("//")) {
    return pathname;
  }

  const normalized = stripLocaleFromPathname(pathname);
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function localizeHref(href: string, locale: Locale) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;

  const hashIndex = href.indexOf("#");
  const queryIndex = href.indexOf("?");
  const suffixIndex = [hashIndex, queryIndex]
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0];
  const pathname = suffixIndex === undefined ? href : href.slice(0, suffixIndex);
  const suffix = suffixIndex === undefined ? "" : href.slice(suffixIndex);

  return `${localizePathname(pathname, locale)}${suffix}`;
}
