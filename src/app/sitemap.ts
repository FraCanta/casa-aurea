import type { MetadataRoute } from "next";
import { accommodations } from "@/data/accommodations";
import { locales } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  "",
  "/alloggi",
  "/esperienze",
  "/territorio",
  "/chi-siamo",
  "/contatti",
  "/privacy",
  "/cookie",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date();
  const routes = [
    ...staticRoutes,
    ...accommodations.map((accommodation) => `/alloggi/${accommodation.slug}`),
  ];

  return routes.flatMap((pathname) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${pathname}`,
      lastModified: updatedAt,
      changeFrequency: pathname === "" ? "weekly" : "monthly",
      priority: pathname === "" ? 1 : pathname === "/alloggi" ? 0.9 : 0.7,
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((alternateLocale) => [
              alternateLocale,
              `${siteConfig.url}/${alternateLocale}${pathname}`,
            ]),
          ),
          "x-default": `${siteConfig.url}/it${pathname}`,
        },
      },
    })),
  );
}
