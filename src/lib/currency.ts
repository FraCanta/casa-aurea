export type CurrencyCode = "EUR" | "USD" | "GBP" | "MXN";

export const baseCurrency = "EUR";

export const fallbackExchangeRatesFromEur: Record<CurrencyCode, number> = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.85,
  MXN: 20.2,
};

export const currencyLabels: Record<CurrencyCode, string> = {
  EUR: "EUR - Euro",
  USD: "USD - US Dollar",
  GBP: "GBP - British Pound",
  MXN: "MXN - Mexican Peso",
};
