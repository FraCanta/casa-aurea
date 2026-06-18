"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLocaleCurrency } from "@/components/LocaleCurrencyProvider";
import { localizeHref } from "@/i18n/routing";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export function LocalizedLink({ href, ...props }: LocalizedLinkProps) {
  const { locale } = useLocaleCurrency();
  return <Link href={localizeHref(href, locale)} {...props} />;
}
