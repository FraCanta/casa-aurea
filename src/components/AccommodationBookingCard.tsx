"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BookingDrawer } from "@/components/BookingDrawer";
import { useBookingState } from "@/components/BookingState";
import { LocalizedText } from "@/components/LocalizedText";
import { useLocaleCurrency } from "@/components/LocaleCurrencyProvider";
import type { Accommodation } from "@/data/accommodations";
import { localizeHref } from "@/i18n/routing";

export function AccommodationBookingCard({
  accommodation,
  accommodations,
}: {
  accommodation: Accommodation;
  accommodations: Accommodation[];
}) {
  const router = useRouter();
  const { formatPrice, locale, t } = useLocaleCurrency();
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const {
    selectedSlug,
    checkin,
    checkout,
    guests,
    setSelectedSlug,
  } = useBookingState();

  useEffect(() => {
    if (!selectedSlug || selectedSlug !== accommodation.slug) {
      setSelectedSlug(accommodation.slug);
    }
  }, [accommodation.slug, selectedSlug, setSelectedSlug]);

  const nights = useMemo(() => getNights(checkin, checkout), [checkin, checkout]);
  const hasSearch = Boolean(checkin && checkout && nights > 0);
  const estimatedTotal = nights * accommodation.priceFrom;

  if (!hasSearch) {
    return (
      <div className="hidden p-5 border border-ink/15 bg-paper md:block md:p-6">
        <p className="text-[0.56rem] font-black uppercase tracking-[0.16em] text-olive md:text-[0.68rem]">
          {t("common", "price")}
        </p>
        <p className="mt-4 font-serif text-[2.25rem] leading-none md:text-[2.8rem]">
          {t("common", "from")} {formatPrice(accommodation.priceFrom)}
        </p>
        <p className="mt-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-muted">
          {t("common", "perNight").replace("/", "").trim()}
        </p>
        <div className="grid gap-3 py-5 mt-5 text-sm border-y border-ink/10 text-muted">
          <span className="flex items-center gap-3">
            <Icon icon="ph:calendar-check" className="text-lg text-olive" />
            {t("common", "calendarAvailability")}
          </span>
          <span className="flex items-center gap-3">
            <Icon icon="ph:map-pin" className="text-lg text-olive" />
            <LocalizedText namespace="alloggi" label={`${accommodation.slug}.location`} />
          </span>
        </div>
        <p className="mt-5 text-sm leading-6 text-muted">
          {t("common", "calendarMissing")}
        </p>
        <BookingDrawer
          accommodations={accommodations}
          selectedSlug={accommodation.slug}
          trigger={
            <span className="w-full mt-6 btn btn-primary">
              {t("common", "selectDates")}
            </span>
          }
        />
      </div>
    );
  }

  return (
    <div className="hidden p-5 border border-ink/15 bg-paper md:block md:p-6">
      <p className="text-[0.56rem] font-black uppercase tracking-[0.16em] text-olive md:text-[0.68rem]">
        {t("common", "yourSearch")}
      </p>
      <h2 className="mt-4 font-serif text-[1.5rem] leading-[1]">
        {formatDateForDisplay(checkin)} - {formatDateForDisplay(checkout)}
      </h2>
      <div className="grid gap-3 py-5 mt-5 text-sm border-y border-ink/10 text-muted">
        <span className="flex items-center gap-3">
          <Icon icon="ph:users" className="text-lg text-olive" />
          {guests} {t("common", "guests")}
        </span>
        <span className="flex items-center gap-3">
          <Icon icon="ph:moon" className="text-lg text-olive" />
          {nights} {nights === 1 ? t("common", "night") : t("common", "nights")}
        </span>
        <span className="flex items-center gap-3">
          <Icon icon="ph:house-line" className="text-lg text-olive" />
          {accommodation.name}
        </span>
      </div>
      <div className="flex items-end justify-between gap-4 mt-5">
        <div>
          <p className="text-[0.62rem] font-black uppercase tracking-[0.14em] text-muted">
            {t("common", "estimatedTotal")}
          </p>
          <p className="mt-2 font-serif text-[2rem] leading-none">
            {formatPrice(estimatedTotal)}
          </p>
        </div>
        <p className="max-w-[140px] text-right text-xs leading-5 text-muted">
          {t("common", "estimatedExcludesFees")}
        </p>
      </div>
      <div className="grid gap-3 mt-6">
        <button
          type="button"
          className="w-full btn btn-primary !text-[0.8rem]"
          onClick={() => {
            setStatus("sent");
            router.push(
              localizeHref(
                buildCheckoutUrl(accommodation.slug, checkin, checkout, guests),
                locale,
              ),
            );
          }}
        >
          {t("common", "continue")}
        </button>
        <BookingDrawer
          accommodations={accommodations}
          selectedSlug={accommodation.slug}
          trigger={
            <span className="w-full btn btn-secondary">
              {t("common", "editSearch")}
            </span>
          }
        />
      </div>
      <p className="py-1 pl-3 mt-4 text-xs leading-5 border-l-2 border-olive text-muted">
        {status === "sent"
          ? t("common", "bookingNextSent")
          : t("common", "bookingNextIdle")}
      </p>
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

function formatDateForDisplay(value: string) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  return `${day}/${Number(month)}/${year}`;
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
