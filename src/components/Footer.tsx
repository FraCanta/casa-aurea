"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useLocaleCurrency } from "@/components/LocaleCurrencyProvider";
import { accommodations } from "@/data/accommodations";
import { navigation, siteConfig } from "@/lib/site";

const navLabelKeys: Record<string, "navStays" | "navExperiences" | "navTerritory" | "navAbout" | "navContact"> = {
  "/alloggi": "navStays",
  "/esperienze": "navExperiences",
  "/territorio": "navTerritory",
  "/chi-siamo": "navAbout",
  "/contatti": "navContact",
};

export function Footer() {
  const { t } = useLocaleCurrency();

  return (
    <footer className="overflow-hidden bg-[#0e1a14] text-white">
      <div className="mx-auto px-6 py-14 md:px-22 md:py-18 fxl:px-35 fxl:py-14">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.25fr_.7fr_.95fr_.8fr_1fr] lg:gap-10 fxl:gap-16">
          <div>
            <Link href="/" className="inline-grid gap-2">
              <span className="font-serif text-[1rem] font-medium uppercase leading-none tracking-[0.23em]">
                {siteConfig.name}
              </span>
              <span className="font-sans text-[0.52rem] font-extrabold uppercase tracking-[0.34em] text-white/45">
                {t("common", "brandSubtitle")}
              </span>
            </Link>
            <p className="mt-8 font-serif text-base font-normal text-white fxl:text-lg">
              {t("common", "footerClaim")}
            </p>
            <div className="mt-9 flex gap-4 text-[1.15rem] text-white/62">
              <a className="transition-colors hover:text-white" href={siteConfig.socials.instagram} aria-label="Instagram">
                <Icon icon="ph:instagram-logo" />
              </a>
              <a className="transition-colors hover:text-white" href={siteConfig.socials.facebook} aria-label="Facebook">
                <Icon icon="ph:facebook-logo" />
              </a>
              <a className="transition-colors hover:text-white" href={`mailto:${siteConfig.email}`} aria-label="Email">
                <Icon icon="ph:envelope-simple" />
              </a>
            </div>
          </div>

          <div className="min-w-0">
            <p className="mb-5 font-sans text-[0.68rem] font-black uppercase tracking-[0.18em] text-white/45">
              {t("common", "footerMenu")}
            </p>
            {navigation.map((item) => (
              <Link className="mb-2 block text-[0.9rem] leading-6 text-white/72 transition-colors hover:text-white" href={item.href} key={item.href}>
                {t("common", navLabelKeys[item.href] ?? "navStays")}
              </Link>
            ))}
          </div>

          <div className="min-w-0">
            <p className="mb-5 font-sans text-[0.68rem] font-black uppercase tracking-[0.18em] text-white/45">
              {t("common", "footerStays")}
            </p>
            {accommodations.map((item) => (
              <Link className="mb-2 block text-[0.9rem] leading-6 text-white/72 transition-colors hover:text-white" key={item.slug} href={`/alloggi/${item.slug}`}>
                {item.name}
              </Link>
            ))}
          </div>

          <div className="min-w-0">
            <p className="mb-5 font-sans text-[0.68rem] font-black uppercase tracking-[0.18em] text-white/45">
              {t("common", "footerContacts")}
            </p>
            <a className="mb-2 block text-[0.9rem] leading-6 text-white/72 transition-colors hover:text-white" href={`tel:${siteConfig.phone}`}>
              {siteConfig.phone}
            </a>
            <a className="mb-2 block break-words text-[0.9rem] leading-6 text-white/72 transition-colors hover:text-white" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            <p className="text-[0.9rem] leading-6 text-white/55">{siteConfig.address}</p>
          </div>

          <div className="min-w-0">
            <p className="mb-5 font-sans text-[0.68rem] font-black uppercase tracking-[0.18em] text-white/45">
              {t("common", "footerNewsletter")}
            </p>
            <p className="max-w-[320px] text-[0.9rem] leading-6 text-white/62">
              {t("common", "newsletterText")}
            </p>
            <form className="relative mt-7 min-h-12 max-w-[340px] rounded-full border border-white/16">
              <input
                className="h-12 w-full border-0 bg-transparent px-5 pr-16 text-[0.88rem] text-white outline-none placeholder:text-white/35"
                type="email"
                placeholder={t("common", "newsletterPlaceholder")}
                aria-label="Email newsletter"
              />
              <button
                className="absolute right-1 top-1 grid h-10 w-10 place-items-center rounded-full bg-[#d8d0bd] text-[#111a15] transition-transform hover:scale-95"
                type="submit"
                aria-label={t("common", "subscribe")}
              >
                <Icon icon="ph:arrow-right" />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-[0.72rem] leading-5 text-white/38 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 {siteConfig.name}. {siteConfig.companyName} - {siteConfig.vatNumber} - CIN {siteConfig.cin} - CIR {siteConfig.cir}
          </p>
          <div className="flex gap-5">
            <Link className="transition-colors hover:text-white/70" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="transition-colors hover:text-white/70" href="/cookie">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
