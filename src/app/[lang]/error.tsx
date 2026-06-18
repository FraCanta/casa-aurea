"use client";

import { useEffect } from "react";
import { LocalizedLink } from "@/components/LocalizedLink";
import { useLocaleCurrency } from "@/components/LocaleCurrencyProvider";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLocaleCurrency();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <section className="bg-paper px-6 pb-20 pt-36 text-ink md:px-[88px] md:pb-28 md:pt-48 fxl:px-[140px]">
        <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">
          Error
        </p>
        <h1 className="max-w-[900px] font-serif text-[clamp(3rem,6vw,6.8rem)] font-normal leading-[0.95] tracking-[-0.01em]">
          {t("common", "errorTitle")}
        </h1>
        <p className="mt-6 max-w-[620px] text-base leading-7 text-muted">
          {t("common", "errorText")}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button className="btn btn-primary" type="button" onClick={reset}>
            {t("common", "retry")}
          </button>
          <LocalizedLink className="btn btn-secondary" href="/">
            {t("pages", "notFoundHome")}
          </LocalizedLink>
        </div>
      </section>
    </main>
  );
}
