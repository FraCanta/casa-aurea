"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import itCommon from "../../locales/it/common.json";
import itHome from "../../locales/it/home.json";
import itAlloggi from "../../locales/it/alloggi.json";
import itCheckout from "../../locales/it/checkout.json";
import itPages from "../../locales/it/pages.json";
import enCommon from "../../locales/en/common.json";
import enHome from "../../locales/en/home.json";
import enAlloggi from "../../locales/en/alloggi.json";
import enCheckout from "../../locales/en/checkout.json";
import enPages from "../../locales/en/pages.json";
import esCommon from "../../locales/es/common.json";
import esHome from "../../locales/es/home.json";
import esAlloggi from "../../locales/es/alloggi.json";
import esCheckout from "../../locales/es/checkout.json";
import esPages from "../../locales/es/pages.json";
import type { CurrencyCode } from "@/lib/currency";
import { fallbackExchangeRatesFromEur } from "@/lib/currency";

export type LocaleCode = "it" | "en" | "es";
export type { CurrencyCode } from "@/lib/currency";

const messages = {
  it: { common: itCommon, home: itHome, alloggi: itAlloggi, checkout: itCheckout, pages: itPages },
  en: { common: enCommon, home: enHome, alloggi: enAlloggi, checkout: enCheckout, pages: enPages },
  es: { common: esCommon, home: esHome, alloggi: esAlloggi, checkout: esCheckout, pages: esPages },
};

const localeFormatMap: Record<LocaleCode, string> = {
  it: "it-IT",
  en: "en-US",
  es: "es-ES",
};

type Namespace = keyof typeof messages.it;
type MessageKey<N extends Namespace> = keyof (typeof messages.it)[N];
export type AlloggiMessageKey = MessageKey<"alloggi">;

type LocaleCurrencyState = {
  locale: LocaleCode;
  currency: CurrencyCode;
  setLocale: (value: LocaleCode) => void;
  setCurrency: (value: CurrencyCode) => void;
  t: <N extends Namespace>(namespace: N, key: MessageKey<N>) => string;
  formatPrice: (amountInEur: number, options?: { maximumFractionDigits?: number }) => string;
  ratesUpdatedAt: string | null;
};

const LocaleCurrencyContext = createContext<LocaleCurrencyState | null>(null);

export function LocaleCurrencyProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<LocaleCode>("it");
  const [currency, setCurrency] = useState<CurrencyCode>("EUR");
  const [rates, setRates] = useState<Record<CurrencyCode, number>>(
    fallbackExchangeRatesFromEur,
  );
  const [ratesUpdatedAt, setRatesUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    const storedLocale = window.localStorage.getItem("casa-aurea-locale") as LocaleCode | null;
    const storedCurrency = window.localStorage.getItem("casa-aurea-currency") as CurrencyCode | null;

    if (storedLocale && storedLocale in messages) setLocale(storedLocale);
    if (storedCurrency && storedCurrency in fallbackExchangeRatesFromEur) {
      setCurrency(storedCurrency);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    fetch("/api/exchange-rates")
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => {
        if (ignore || !payload?.rates) return;
        setRates({ ...fallbackExchangeRatesFromEur, ...payload.rates });
        setRatesUpdatedAt(payload.updatedAt ?? null);
      })
      .catch(() => {
        setRates(fallbackExchangeRatesFromEur);
      });

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem("casa-aurea-locale", locale);
    window.localStorage.setItem("casa-aurea-currency", currency);
  }, [currency, locale]);

  const value = useMemo<LocaleCurrencyState>(
    () => ({
      locale,
      currency,
      setLocale,
      setCurrency,
      t: (namespace, key) => String(messages[locale][namespace][key] ?? key),
      formatPrice: (amountInEur, options) => {
        const converted = amountInEur * rates[currency];
        return new Intl.NumberFormat(localeFormatMap[locale], {
          style: "currency",
          currency,
          maximumFractionDigits: options?.maximumFractionDigits ?? 0,
        }).format(converted);
      },
      ratesUpdatedAt,
    }),
    [currency, locale, rates, ratesUpdatedAt],
  );

  return (
    <LocaleCurrencyContext.Provider value={value}>
      {children}
    </LocaleCurrencyContext.Provider>
  );
}

export function useLocaleCurrency() {
  const context = useContext(LocaleCurrencyContext);

  if (!context) {
    throw new Error("useLocaleCurrency must be used inside LocaleCurrencyProvider");
  }

  return context;
}
