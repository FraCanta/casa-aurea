"use client";

import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  CurrencyCode,
  LocaleCode,
  useLocaleCurrency,
} from "@/components/LocaleCurrencyProvider";
import { currencyLabels } from "@/lib/currency";

const languages: Array<{ value: LocaleCode; labelKey: "italian" | "english" | "spanish" }> = [
  { value: "it", labelKey: "italian" },
  { value: "en", labelKey: "english" },
  { value: "es", labelKey: "spanish" },
];

const currencies: CurrencyCode[] = ["EUR", "USD", "GBP", "MXN"];

export function LanguageCurrencySelector({ mobile = false }: { mobile?: boolean }) {
  const {
    locale,
    currency,
    setLocale,
    setCurrency,
    t,
    ratesUpdatedAt,
  } = useLocaleCurrency();
  const [open, setOpen] = useState(false);
  const [draftLocale, setDraftLocale] = useState<LocaleCode>(locale);
  const [draftCurrency, setDraftCurrency] = useState<CurrencyCode>(currency);

  function openModal() {
    setDraftLocale(locale);
    setDraftCurrency(currency);
    setOpen(true);
  }

  function saveSettings() {
    setLocale(draftLocale);
    setCurrency(draftCurrency);
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        className={mobile ? "btn btn-secondary w-full" : "btn btn-accent hidden lg:inline-flex"}
        onClick={openModal}
        aria-label={t("common", "languageCurrency")}
      >
        {locale.toUpperCase()} / {currency}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[10000]">
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
              className="absolute left-1/2 top-1/2 w-[min(420px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 bg-paper text-ink shadow-2xl"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
                <h2 className="text-base font-medium">
                  {t("common", "languageCurrency")}
                </h2>
                <button
                  type="button"
                  className="grid h-9 w-9 place-items-center border border-ink/10"
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
                        locale === "en" ? "en-US" : locale === "es" ? "es-ES" : "it-IT",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        },
                      ).format(new Date(ratesUpdatedAt))}.`
                    : ""}
                </p>
              </div>

              <div className="flex justify-end gap-3 border-t border-ink/10 px-5 py-4">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setOpen(false)}
                >
                  {t("common", "cancel")}
                </button>
                <button type="button" className="btn btn-primary" onClick={saveSettings}>
                  {t("common", "saveSettings")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
                selected === item.value ? "border-terracotta" : "border-muted/50"
              }`}
            >
              {selected === item.value && (
                <span className="h-2 w-2 rounded-full bg-terracotta" />
              )}
            </span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
