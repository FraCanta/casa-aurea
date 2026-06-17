"use client";

import { useLocaleCurrency } from "@/components/LocaleCurrencyProvider";

export function PriceText({
  amount,
  suffix,
  perNight = false,
  className,
}: {
  amount: number;
  suffix?: string;
  perNight?: boolean;
  className?: string;
}) {
  const { formatPrice, t } = useLocaleCurrency();

  return (
    <span className={className}>
      {formatPrice(amount)}
      {perNight ? t("common", "perNight") : suffix ? suffix : ""}
    </span>
  );
}
