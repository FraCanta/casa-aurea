"use client";

import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageCurrencySelector } from "@/components/LanguageCurrencySelector";
import { LocalizedLink } from "@/components/LocalizedLink";
import { useLocaleCurrency } from "@/components/LocaleCurrencyProvider";
import { navigation, siteConfig } from "@/lib/site";

const navLabelKeys: Record<string, "navStays" | "navExperiences" | "navTerritory" | "navAbout" | "navContact"> = {
  "/alloggi": "navStays",
  "/esperienze": "navExperiences",
  "/territorio": "navTerritory",
  "/chi-siamo": "navAbout",
  "/contatti": "navContact",
};

export function Header() {
  const { locale, t } = useLocaleCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomeTop = pathname === `/${locale}` && !scrolled;
  const isLight = !isHomeTop;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 56);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 grid grid-cols-[1fr_auto] items-center px-5 py-4 transition-all duration-500 lg:grid-cols-[260px_1fr_260px] lg:px-[88px] lg:py-7 fxl:grid-cols-[330px_1fr_330px] fxl:px-[140px] ${
        isLight
          ? "border-b border-ink/10 bg-paper/92 text-ink shadow-[0_18px_60px_rgba(23,27,20,0.06)] backdrop-blur-md"
          : "bg-transparent text-white"
      }`}
    >
      <LocalizedLink
        href="/"
        className="grid gap-1 leading-none"
        aria-label={`${siteConfig.name} home`}
      >
        <span className="font-serif text-[0.98rem] font-medium uppercase tracking-[0.23em] lg:text-[1.08rem]">
          {siteConfig.name}
        </span>
        <span
          className={`font-sans text-[0.5rem] font-extrabold uppercase tracking-[0.38em] transition-colors duration-500 ${
            isLight ? "text-ink/55" : "text-white/70"
          }`}
        >
          {t("common", "brandSubtitle")}
        </span>
      </LocalizedLink>

      <nav
        className="hidden justify-center gap-9 text-[0.75rem] font-extrabold uppercase tracking-[0.13em] lg:flex fxl:gap-14"
        aria-label={t("common", "mainNavigation")}
      >
        {navigation.map((item) => (
          <LocalizedLink
            key={item.href}
            href={item.href}
            className="transition-opacity hover:opacity-65"
          >
            {t("common", navLabelKeys[item.href] ?? "navStays")}
          </LocalizedLink>
        ))}
      </nav>

      <div className="flex items-center justify-end gap-5">
        <LanguageCurrencySelector />
        <button
          className="grid h-10 w-10 place-items-center lg:hidden"
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <Icon icon={isOpen ? "ph:x" : "ph:list"} className="text-2xl" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed inset-0 z-[9998] lg:hidden">
            <motion.button
              type="button"
              aria-label={t("common", "closeMenu")}
              className="absolute inset-0 bg-ink/35"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
            />
            <motion.nav
              id="mobile-navigation"
              className="absolute left-0 top-0 flex h-dvh w-screen flex-col bg-paper px-7 py-7 text-ink shadow-2xl"
              aria-label={t("common", "mobileNavigation")}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-12 flex items-start justify-between gap-6">
                <LocalizedLink
                  href="/"
                  className="grid gap-1 leading-none"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="font-serif text-[0.98rem] font-medium uppercase tracking-[0.23em]">
                    {siteConfig.name}
                  </span>
                  <span className="font-sans text-[0.5rem] font-extrabold uppercase tracking-[0.38em] text-ink/55">
                    {t("common", "brandSubtitle")}
                  </span>
                </LocalizedLink>
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center border border-ink/10"
                  onClick={() => setIsOpen(false)}
                  aria-label={t("common", "closeMenu")}
                >
                  <Icon icon="ph:x" className="text-xl" />
                </button>
              </div>

              <div className="grid gap-1 text-[0.86rem] font-black uppercase tracking-[0.12em]">
                {navigation.map((item) => (
                  <LocalizedLink
                    key={item.href}
                    href={item.href}
                    className="border-b border-ink/10 py-4"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("common", navLabelKeys[item.href] ?? "navStays")}
                  </LocalizedLink>
                ))}
              </div>
              <div className="mt-8">
                <LanguageCurrencySelector mobile />
              </div>

            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
