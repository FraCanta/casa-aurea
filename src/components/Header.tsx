"use client";

import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BookingDrawer } from "@/components/BookingDrawer";
import { accommodations } from "@/data/accommodations";
import { navigation, siteConfig } from "@/lib/site";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomeTop = pathname === "/" && !scrolled;
  const isLight = !isHomeTop;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 56);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 grid grid-cols-[1fr_auto] items-center px-5 py-4 transition-all duration-500 lg:grid-cols-[260px_1fr_260px] lg:px-[88px] lg:py-7 fxl:grid-cols-[330px_1fr_330px] fxl:px-[140px] ${
        isLight
          ? "border-b border-ink/10 bg-paper/92 text-ink shadow-[0_18px_60px_rgba(23,27,20,0.06)] backdrop-blur-md"
          : "bg-transparent text-white"
      }`}
    >
      <Link
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
          Boutique stays
        </span>
      </Link>

      <nav
        className="hidden justify-center gap-9 text-[0.75rem] font-extrabold uppercase tracking-[0.13em] lg:flex fxl:gap-14"
        aria-label="Navigazione principale"
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="transition-opacity hover:opacity-65"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center justify-end gap-5">
        <BookingDrawer
          accommodations={accommodations}
          trigger={
            <span className="btn btn-accent hidden lg:inline-flex">
              Prenota ora
            </span>
          }
        />
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
              aria-label="Chiudi menu"
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
              aria-label="Navigazione mobile"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-12 flex items-start justify-between gap-6">
                <Link
                  href="/"
                  className="grid gap-1 leading-none"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="font-serif text-[0.98rem] font-medium uppercase tracking-[0.23em]">
                    {siteConfig.name}
                  </span>
                  <span className="font-sans text-[0.5rem] font-extrabold uppercase tracking-[0.38em] text-ink/55">
                    Boutique stays
                  </span>
                </Link>
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center border border-ink/10"
                  onClick={() => setIsOpen(false)}
                  aria-label="Chiudi menu"
                >
                  <Icon icon="ph:x" className="text-xl" />
                </button>
              </div>

              <div className="grid gap-1 text-[0.86rem] font-black uppercase tracking-[0.12em]">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="border-b border-ink/10 py-4"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <BookingDrawer
                  accommodations={accommodations}
                  onOpen={() => setIsOpen(false)}
                  trigger={
                    <span className="btn btn-accent w-full">Prenota ora</span>
                  }
                />
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
