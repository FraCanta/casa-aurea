"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { BookingDrawer } from "@/components/BookingDrawer";
import { useBookingState } from "@/components/BookingState";
import { useLocaleCurrency } from "@/components/LocaleCurrencyProvider";
import type { Accommodation } from "@/data/accommodations";

type AvailabilityUi =
  | "idle"
  | "missing"
  | "available"
  | "unavailable"
  | "request";

export function HeroBookingPanel({
  accommodations,
}: {
  accommodations: Accommodation[];
}) {
  const router = useRouter();
  const { t } = useLocaleCurrency();
  const [status, setStatus] = useState<AvailabilityUi>("idle");
  const {
    checkin,
    checkout,
    guests,
    selectedSlug,
    setGuests,
    setSelectedSlug,
  } = useBookingState();
  const activeSlug = selectedSlug || accommodations[0]?.slug || "";

  const selectedAccommodation = useMemo(
    () => accommodations.find((item) => item.slug === activeSlug),
    [accommodations, activeSlug],
  );

  function handleAvailability() {
    if (!checkin || !checkout || !selectedAccommodation) {
      setStatus("missing");
      return;
    }

    if (selectedAccommodation.availability === "available") {
      setStatus("available");
      router.push(buildAccommodationUrl(activeSlug, checkin, checkout, guests));
      return;
    }

    if (selectedAccommodation.availability === "unavailable") {
      setStatus("unavailable");
      router.push(buildAccommodationUrl(activeSlug, checkin, checkout, guests));
      return;
    }

    setStatus("request");
    router.push(buildAccommodationUrl(activeSlug, checkin, checkout, guests));
  }

  function continueToAccommodation(slug: string) {
    router.push(buildAccommodationUrl(slug, checkin, checkout, guests));
  }

  const statusText = {
    idle: t("common", "calendarHelp"),
    missing: t("common", "calendarMissing"),
    available: `${selectedAccommodation?.name} ${t("common", "heroAvailable")}`,
    unavailable: `${selectedAccommodation?.name} ${t("common", "heroUnavailable")}`,
    request: `${selectedAccommodation?.name} ${t("common", "heroRequest")}`,
  }[status];

  const statusClass =
    status === "available"
      ? "!text-emerald-700"
      : status === "unavailable"
        ? "!text-red-700"
        : "";

  return (
    <>
      <BookingDrawer
        accommodations={accommodations}
        selectedSlug={activeSlug}
        onComplete={continueToAccommodation}
        trigger={
          <span className="relative z-20 mx-8 mt-8 flex min-h-12 w-[calc(100%-4rem)] items-center justify-center gap-3 rounded-full bg-paper px-5 text-sm font-medium text-ink shadow-[0_18px_55px_rgba(23,27,20,0.22)] md:hidden">
            <Icon icon="ph:magnifying-glass" className="text-lg text-muted" />
            {t("common", "searchPlaceholder")}
          </span>
        }
      />

      <div
        className="relative z-20 mx-5 mt-7 hidden bg-paper p-4 text-ink shadow-[0_28px_90px_rgba(23,27,20,0.16)] md:absolute md:inset-x-[88px] md:bottom-[-64px] md:mx-0 md:mt-0 md:grid md:min-h-[150px] md:grid-cols-[1.15fr_1fr_1fr_.75fr_220px] md:p-[30px_44px_22px] fxl:inset-x-[140px] fxl:bottom-[-76px] fxl:min-h-[168px] fxl:grid-cols-[1.2fr_1fr_1fr_.75fr_240px] fxl:p-[36px_56px_28px]"
        aria-label="Ricerca disponibilità"
      >
        <BookingFields
          checkin={checkin}
          checkout={checkout}
          guests={guests}
          selectedSlug={activeSlug}
          accommodations={accommodations}
          onGuests={setGuests}
          onSelectedSlug={setSelectedSlug}
          t={t}
        />

        <button
          type="button"
          className="btn btn-primary !text-[0.8rem] md:mt-0 md:w-auto"
          onClick={handleAvailability}
        >
          {t("common", "checkAvailability")}
        </button>

        <p
          className={`mt-3 text-[0.56rem] leading-5 text-muted md:col-span-full ${statusClass}`}
          role="status"
          aria-live="polite"
        >
          {statusText}
        </p>
      </div>
    </>
  );
}

function BookingFields({
  checkin,
  checkout,
  guests,
  selectedSlug,
  accommodations,
  onGuests,
  onSelectedSlug,
  t,
}: {
  checkin: string;
  checkout: string;
  guests: string;
  selectedSlug: string;
  accommodations: Accommodation[];
  onGuests: (value: string) => void;
  onSelectedSlug: (value: string) => void;
  t: ReturnType<typeof useLocaleCurrency>["t"];
}) {
  const labelClass =
    "grid gap-1.5 border-b border-ink/10 py-2.5 md:min-h-[54px] md:border-b-0 md:border-r md:py-0 md:pr-8";
  const middleLabelClass =
    "grid gap-1.5 border-b border-ink/10 py-2.5 md:min-h-[54px] md:border-b-0 md:border-r md:py-0 md:px-4";
  const lastLabelClass =
    "grid gap-1.5 border-b border-ink/10 py-2.5 md:min-h-[54px] md:border-b-0 md:py-0 md:px-4";
  const inputClass =
    "min-h-6 border-0 bg-transparent p-0 text-[0.78rem] font-medium text-ink outline-none [color-scheme:light]";

  return (
    <>
      <label className={labelClass}>
        <span className="flex items-center gap-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-olive">
          {t("common", "accommodation")} <Icon icon="ph:map-pin" className="text-sm text-ink/45" />
        </span>
        <select
          value={selectedSlug}
          onChange={(event) => onSelectedSlug(event.target.value)}
          aria-label={t("common", "accommodation")}
          className={inputClass}
        >
          {accommodations.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      <label className={middleLabelClass}>
        <span className="flex items-center gap-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-olive">
          {t("common", "checkin")}{" "}
          <Icon icon="ph:calendar-blank" className="text-sm text-ink/45" />
        </span>
        <BookingDrawer
          accommodations={accommodations}
          selectedSlug={selectedSlug}
          trigger={
            <span className={`${inputClass} flex items-center`}>
              {formatDateForDisplay(checkin) || t("common", "datePlaceholder")}
            </span>
          }
        />
      </label>

      <label className={middleLabelClass}>
        <span className="flex items-center gap-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-olive">
          {t("common", "checkout")}{" "}
          <Icon icon="ph:calendar-blank" className="text-sm text-ink/45" />
        </span>
        <BookingDrawer
          accommodations={accommodations}
          selectedSlug={selectedSlug}
          trigger={
            <span className={`${inputClass} flex items-center`}>
              {formatDateForDisplay(checkout) || t("common", "datePlaceholder")}
            </span>
          }
        />
      </label>

      <label className={lastLabelClass}>
        <span className="flex items-center gap-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-olive">
          {t("common", "guests")} <Icon icon="ph:users" className="text-sm text-ink/45" />
        </span>
        <select
          value={guests}
          onChange={(event) => onGuests(event.target.value)}
          aria-label={t("common", "guests")}
          className={inputClass}
        >
          {[2, 4, 6, 8].map((value) => (
            <option key={value} value={String(value)}>
              {value} {t("common", "guests")}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}

function formatDateForDisplay(value: string) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  return `${day}/${Number(month)}/${year}`;
}

function buildAccommodationUrl(
  slug: string,
  checkin: string,
  checkout: string,
  guests: string,
) {
  const params = new URLSearchParams();
  if (checkin) params.set("checkin", checkin);
  if (checkout) params.set("checkout", checkout);
  if (guests) params.set("guests", guests);
  const query = params.toString();
  return `/alloggi/${slug}${query ? `?${query}` : ""}`;
}
