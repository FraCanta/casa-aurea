"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CurrencyCode } from "@/lib/currency";
import { fallbackExchangeRatesFromEur } from "@/lib/currency";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/routing";

export type LocaleCode = Locale;
export type { CurrencyCode } from "@/lib/currency";

const localeFormatMap: Record<LocaleCode, string> = {
  it: "it-IT",
  en: "en-US",
  es: "es-ES",
};

type Namespace = keyof Dictionary;
type MessageKey<N extends Namespace> = keyof Dictionary[N];
export type AlloggiMessageKey = MessageKey<"alloggi">;

type LocaleCurrencyState = {
  locale: LocaleCode;
  currency: CurrencyCode;
  setCurrency: (value: CurrencyCode) => void;
  t: <N extends Namespace>(namespace: N, key: MessageKey<N>) => string;
  formatPrice: (amountInEur: number, options?: { maximumFractionDigits?: number }) => string;
  ratesUpdatedAt: string | null;
};

const LocaleCurrencyContext = createContext<LocaleCurrencyState | null>(null);

export function LocaleCurrencyProvider({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: LocaleCode;
  messages: Dictionary;
}) {
  const [currency, setCurrency] = useState<CurrencyCode>("EUR");
  const [rates, setRates] = useState<Record<CurrencyCode, number>>(
    fallbackExchangeRatesFromEur,
  );
  const [ratesUpdatedAt, setRatesUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    const storedCurrency = window.localStorage.getItem("casa-aurea-currency") as CurrencyCode | null;

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
    window.localStorage.setItem("casa-aurea-currency", currency);
  }, [currency]);

  const value = useMemo<LocaleCurrencyState>(
    () => ({
      locale,
      currency,
      setCurrency,
      t: (namespace, key) => String(messages[namespace][key] ?? key),
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
    [currency, locale, messages, rates, ratesUpdatedAt],
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
