"use client";

import { ReactNode } from "react";
import { useLocaleCurrency } from "@/components/LocaleCurrencyProvider";

export function LocalizedText({
  namespace,
  label,
  children,
}: {
  namespace: "common" | "home" | "alloggi" | "checkout" | "pages";
  label: string;
  children?: ReactNode;
}) {
  const { t } = useLocaleCurrency();
  const text = t(namespace, label as never);

  return <>{text || children}</>;
}
