import { NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  hasLocale,
  localeCookieName,
  locales,
  type Locale,
} from "@/i18n/routing";

function getPreferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(localeCookieName)?.value;
  if (cookieLocale && hasLocale(cookieLocale)) return cookieLocale;

  const preferences = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((entry) => {
      const [tag, quality = "q=1"] = entry.trim().split(";");
      return {
        locale: tag.toLowerCase().split("-")[0],
        quality: Number(quality.replace("q=", "")) || 0,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  const match = preferences.find((preference) => hasLocale(preference.locale));
  return match?.locale && hasLocale(match.locale)
    ? match.locale
    : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) return NextResponse.next();

  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
