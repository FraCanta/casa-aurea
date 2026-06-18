"use client";

import { Icon } from "@iconify/react";
import { BookingDrawer } from "@/components/BookingDrawer";
import { LocalizedLink } from "@/components/LocalizedLink";
import { useBookingState } from "@/components/BookingState";
import { useLocaleCurrency } from "@/components/LocaleCurrencyProvider";
import type { Accommodation } from "@/data/accommodations";

export function MobileAccommodationBar({
  accommodation,
  accommodations,
}: {
  accommodation: Accommodation;
  accommodations: Accommodation[];
}) {
  const { checkin, checkout, guests } = useBookingState();
  const { formatPrice, t } = useLocaleCurrency();
  const nights = getNights(checkin, checkout);
  const hasSearch = nights > 0;
  const total = nights * accommodation.priceFrom;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] border-t border-ink/10 bg-paper/95 px-4 pb-[calc(0.85rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-18px_50px_rgba(24,35,31,0.14)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="flex items-baseline gap-1 font-serif text-[1.35rem] leading-none text-ink">
            {formatPrice(hasSearch ? total : accommodation.priceFrom)}
            <span className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.08em] text-muted">
              {hasSearch ? t("common", "total") : t("common", "perNight")}
            </span>
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-olive">
            <Icon icon="ph:calendar-check" className="text-[0.85rem]" />
            {hasSearch
              ? `${nights} ${nights === 1 ? t("common", "night") : t("common", "nights")}`
              : t("common", "startingFrom")}
          </p>
        </div>
        {hasSearch ? (
          <LocalizedLink
            className="btn btn-primary shrink-0 !text-white"
            href={buildCheckoutUrl(accommodation.slug, checkin, checkout, guests)}
          >
            {t("common", "continue")}
          </LocalizedLink>
        ) : (
          <BookingDrawer
            accommodations={accommodations}
            selectedSlug={accommodation.slug}
            trigger={
              <span className="btn btn-primary shrink-0">{t("common", "selectDates")}</span>
            }
          />
        )}
      </div>
    </div>
  );
}

function getNights(checkin: string, checkout: string) {
  if (!checkin || !checkout) return 0;
  const start = new Date(`${checkin}T00:00:00`);
  const end = new Date(`${checkout}T00:00:00`);
  const diff = end.getTime() - start.getTime();
  return Math.max(0, Math.round(diff / 86400000));
}

function buildCheckoutUrl(
  slug: string,
  checkin: string,
  checkout: string,
  guests: string,
) {
  const params = new URLSearchParams({ slug });
  if (checkin) params.set("checkin", checkin);
  if (checkout) params.set("checkout", checkout);
  if (guests) params.set("guests", guests);
  return `/checkout?${params.toString()}`;
}
