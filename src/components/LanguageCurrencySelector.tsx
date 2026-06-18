"use client";

import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  CurrencyCode,
  LocaleCode,
  useLocaleCurrency,
} from "@/components/LocaleCurrencyProvider";
import { localeCookieName, localizePathname } from "@/i18n/routing";
import { currencyLabels } from "@/lib/currency";

const languages: Array<{
  value: LocaleCode;
  labelKey: "italian" | "english" | "spanish";
}> = [
  { value: "it", labelKey: "italian" },
  { value: "en", labelKey: "english" },
  { value: "es", labelKey: "spanish" },
];

const currencies: CurrencyCode[] = ["EUR", "USD", "GBP", "MXN"];

export function LanguageCurrencySelector({
  mobile = false,
}: {
  mobile?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { locale, currency, setCurrency, t, ratesUpdatedAt } =
    useLocaleCurrency();
  const [open, setOpen] = useState(false);
  const [draftLocale, setDraftLocale] = useState<LocaleCode>(locale);
  const [draftCurrency, setDraftCurrency] = useState<CurrencyCode>(currency);

  function openModal() {
    setDraftLocale(locale);
    setDraftCurrency(currency);
    setOpen(true);
  }

  function saveSettings() {
    setCurrency(draftCurrency);
    setOpen(false);

    if (draftLocale !== locale) {
      document.cookie = `${localeCookieName}=${draftLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
      const nextPathname = localizePathname(pathname, draftLocale);
      router.replace(`${nextPathname}${window.location.search}${window.location.hash}`, {
        scroll: false,
      });
    }
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={
          mobile
            ? "btn btn-secondary !text-[0.8rem] w-full"
            : "btn btn-accent !text-[0.8rem] hidden lg:inline-flex"
        }
        onClick={openModal}
        aria-label={t("common", "languageCurrency")}
      >
        {locale.toUpperCase()} / {currency}
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[10000] grid place-items-center overflow-y-auto p-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby="language-currency-title"
              >
                <motion.button
                  type="button"
                  className="absolute inset-0 bg-ink/45"
                  onClick={() => setOpen(false)}
                  aria-label={t("common", "cancel")}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <motion.div
                  className="relative z-10 my-auto w-full max-w-[420px] bg-paper text-ink shadow-2xl"
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.96 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                >
              <div className="flex items-center justify-between px-5 py-4 border-b border-ink/10">
                <h2
                  id="language-currency-title"
                  className="text-base font-medium"
                >
                  {t("common", "languageCurrency")}
                </h2>
                <button
                  type="button"
                  className="grid border h-9 w-9 place-items-center border-ink/10"
                  onClick={() => setOpen(false)}
                  aria-label={t("common", "cancel")}
                >
                  <Icon icon="ph:x" />
                </button>
              </div>

              <div className="grid gap-6 px-5 py-6">
                <ChoiceGroup
                  title={t("common", "language")}
                  items={languages.map((item) => ({
                    value: item.value,
                    label: t("common", item.labelKey),
                  }))}
                  selected={draftLocale}
                  onSelect={(value) => setDraftLocale(value as LocaleCode)}
                />
                <ChoiceGroup
                  title={t("common", "currency")}
                  items={currencies.map((value) => ({
                    value,
                    label: currencyLabels[value],
                  }))}
                  selected={draftCurrency}
                  onSelect={(value) => setDraftCurrency(value as CurrencyCode)}
                />
                <p className="text-xs leading-5 text-muted">
                  {t("common", "ratesNote")}
                  {ratesUpdatedAt
                    ? ` ${t("common", "ratesSource")}: ${new Intl.DateTimeFormat(
                        locale === "en"
                          ? "en-US"
                          : locale === "es"
                            ? "es-ES"
                            : "it-IT",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        },
                      ).format(new Date(ratesUpdatedAt))}.`
                    : ""}
                </p>
              </div>

              <div className="flex justify-end gap-3 px-5 py-4 border-t border-ink/10">
                <button
                  type="button"
                  className="btn btn-secondary !text-[0.8rem]"
                  onClick={() => setOpen(false)}
                >
                  {t("common", "cancel")}
                </button>
                <button
                  type="button"
                  className="btn btn-primary !text-[0.8rem]"
                  onClick={saveSettings}
                >
                  {t("common", "saveSettings")}
                </button>
              </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

function ChoiceGroup({
  title,
  items,
  selected,
  onSelect,
}: {
  title: string;
  items: Array<{ value: string; label: string }>;
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-bold text-muted">{title}</p>
      <div className="grid gap-2">
        {items.map((item) => (
          <button
            type="button"
            key={item.value}
            className={`flex min-h-12 items-center gap-3 border px-4 text-left text-sm transition ${
              selected === item.value
                ? "border-terracotta bg-ivory"
                : "border-ink/12 bg-white/40"
            }`}
            onClick={() => onSelect(item.value)}
          >
            <span
              className={`grid h-4 w-4 place-items-center rounded-full border ${
                selected === item.value
                  ? "border-terracotta"
                  : "border-muted/50"
              }`}
            >
              {selected === item.value && (
                <span className="w-2 h-2 rounded-full bg-terracotta" />
              )}
            </span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
