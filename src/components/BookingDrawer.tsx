"use client";

import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useMemo, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useBookingState } from "@/components/BookingState";
import { useLocaleCurrency } from "@/components/LocaleCurrencyProvider";
import type { Accommodation } from "@/data/accommodations";

type DrawerStatus = "idle" | "missing" | "available" | "unavailable" | "sent";

const weekdaysByLocale = {
  it: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  es: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
};

const emptySubscribe = () => () => {};

export function BookingDrawer({
  accommodations,
  selectedSlug,
  trigger,
  onOpen,
  onComplete,
}: {
  accommodations: Accommodation[];
  selectedSlug?: string;
  trigger?: ReactNode;
  onOpen?: () => void;
  onComplete?: (slug: string) => void;
}) {
  const { locale, t } = useLocaleCurrency();
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const [status, setStatus] = useState<DrawerStatus>("idle");
  const [calendarOffset, setCalendarOffset] = useState(0);
  const {
    selectedSlug: storedSlug,
    checkin,
    checkout,
    guests,
    setSelectedSlug,
    setCheckin,
    setCheckout,
    setGuests,
    resetBooking,
  } = useBookingState();
  const today = useMemo(() => new Date(), []);
  const todayString = useMemo(() => toDateValue(today), [today]);
  const months = useMemo(() => getUpcomingMonths(today, 12, locale), [locale, today]);
  const mobileMonths = months.slice(calendarOffset, calendarOffset + 2);
  const desktopMonths = months.slice(calendarOffset, calendarOffset + 3);
  const canGoBack = calendarOffset > 0;
  const canGoForward = calendarOffset < months.length - 2;

  const activeSlug =
    selectedSlug || storedSlug || accommodations[0]?.slug || "";

  const selectedAccommodation = useMemo(
    () => accommodations.find((item) => item.slug === activeSlug),
    [accommodations, activeSlug],
  );

  function openDrawer() {
    if (selectedSlug) setSelectedSlug(selectedSlug);
    if (!storedSlug && !selectedSlug && accommodations[0]) {
      setSelectedSlug(accommodations[0].slug);
    }
    onOpen?.();
    setOpen(true);
  }

  function selectDate(date: string) {
    if (date < todayString) return;

    setStatus("idle");

    if (!checkin || (checkin && checkout) || date <= checkin) {
      setCheckin(date);
      setCheckout("");
      return;
    }

    setCheckout(date);
  }

  function checkAvailability() {
    if (!checkin || !checkout || !selectedAccommodation) {
      setStatus("missing");
      return;
    }

    if (selectedAccommodation.availability === "available") {
      setStatus("available");
      onComplete?.(activeSlug);
      return;
    }

    if (selectedAccommodation.availability === "unavailable") {
      setStatus("unavailable");
      onComplete?.(activeSlug);
      return;
    }

    setStatus("sent");
    onComplete?.(activeSlug);
  }

  const statusText = {
    idle: t("common", "bookingStatusIdle"),
    missing: t("common", "bookingStatusMissing"),
    available: `${selectedAccommodation?.name} ${t("common", "bookingAvailable")}`,
    unavailable: `${selectedAccommodation?.name} ${t("common", "bookingUnavailable")}`,
    sent: t("common", "bookingStatusSent"),
  }[status];

  function goToPreviousMonths() {
    setCalendarOffset((value) => Math.max(0, value - 1));
  }

  function goToNextMonths() {
    setCalendarOffset((value) => Math.min(months.length - 2, value + 1));
  }

  return (
    <>
      <button
        type="button"
        onClick={openDrawer}
        className="inline-flex p-0 text-left bg-transparent border-0 cursor-pointer text-inherit"
      >
        {trigger ?? <span className="btn btn-accent">Prenota ora</span>}
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div className="fixed inset-0 z-[9999]">
                <motion.button
                  type="button"
                  aria-label={t("common", "close")}
                  className="absolute inset-0 bg-ink/45"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                />

                <motion.aside
                  className="absolute inset-0 overflow-y-auto h-dvh bg-paper text-ink"
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 24, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="px-5 py-4 border-b border-ink/10 md:hidden">
                    <div className="grid grid-cols-[44px_1fr_44px] items-center">
                      <button
                        type="button"
                        className="grid w-10 h-10 place-items-center"
                        onClick={() => setOpen(false)}
                        aria-label={t("common", "close")}
                      >
                        <Icon icon="ph:x" className="text-xl" />
                      </button>
                      <h2 className="text-base font-bold text-center">
                        {t("common", "selectDates")}
                      </h2>
                    </div>
                  </div>

                  <div className="hidden px-8 py-7 md:block fxl:px-[140px]">
                    <div className="flex items-center justify-between mb-7">
                      <div>
                        <p className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-olive">
                          {t("common", "bookingStay")}
                        </p>
                        <h2 className="mt-2 font-serif text-[clamp(2.5rem,5vw,3.5rem)] leading-[1]">
                          {t("common", "selectDates")}.
                        </h2>
                      </div>
                      <button
                        type="button"
                        className="grid w-12 h-12 border place-items-center border-ink/15"
                        onClick={() => setOpen(false)}
                        aria-label={t("common", "close")}
                      >
                        <Icon icon="ph:x" className="text-xl" />
                      </button>
                    </div>
                    <div className="grid grid-cols-[1fr_1fr_0.8fr_56px] items-center rounded-full bg-white shadow-[0_16px_42px_rgba(23,27,20,0.12)]">
                      <SearchField label={t("common", "accommodation")}>
                        <select
                          value={activeSlug}
                          onChange={(event) =>
                            setSelectedSlug(event.target.value)
                          }
                          className="w-full text-sm bg-transparent border-0 outline-none"
                        >
                          {accommodations.map((item) => (
                            <option key={item.slug} value={item.slug}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </SearchField>
                      <SearchField label={t("common", "dates")}>
                        <span className="text-sm">
                          {formatDateForDisplay(checkin) || t("common", "checkin")}{" "}
                          <span className="text-muted">-</span>{" "}
                          {formatDateForDisplay(checkout) || t("common", "checkout")}
                        </span>
                      </SearchField>
                      <SearchField label={t("common", "guests")}>
                        <select
                          value={guests}
                          onChange={(event) => setGuests(event.target.value)}
                          className="w-full text-sm bg-transparent border-0 outline-none"
                        >
                          {[2, 4, 6, 8].map((value) => (
                            <option key={value} value={String(value)}>
                              {value} {t("common", "guests")}
                            </option>
                          ))}
                        </select>
                      </SearchField>
                      <button
                        type="button"
                        className="grid w-12 h-12 mr-2 text-white rounded-full place-items-center bg-terracotta"
                        onClick={checkAvailability}
                        aria-label={t("common", "checkAvailability")}
                      >
                        <Icon icon="ph:magnifying-glass" className="text-xl" />
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-5 px-5 py-5 md:hidden">
                    <label className="grid gap-2">
                      <span className="text-xs font-bold">{t("common", "guests")}</span>
                      <span className="flex items-center gap-3 px-4 bg-white border min-h-12 border-ink/15">
                        <Icon icon="ph:users" className="text-muted" />
                        <select
                          value={guests}
                          onChange={(event) => setGuests(event.target.value)}
                          className="w-full bg-transparent border-0 outline-none"
                        >
                          {[2, 4, 6, 8].map((value) => (
                            <option key={value} value={String(value)}>
                              {value} {t("common", "guests")}
                            </option>
                          ))}
                        </select>
                      </span>
                    </label>
                    <label className="grid gap-2">
                      <span className="text-xs font-bold">{t("common", "accommodation")}</span>
                      <span className="flex items-center gap-3 px-4 bg-white border min-h-12 border-ink/15">
                        <Icon icon="ph:house-line" className="text-muted" />
                        <select
                          value={activeSlug}
                          onChange={(event) =>
                            setSelectedSlug(event.target.value)
                          }
                          className="w-full bg-transparent border-0 outline-none"
                        >
                          {accommodations.map((item) => (
                            <option key={item.slug} value={item.slug}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </span>
                    </label>
                  </div>

                  <div className="bg-white px-5 py-7 md:mx-8 md:px-10 md:py-10 fxl:mx-[140px]">
                    <div className="flex items-center justify-between mb-7">
                      <button
                        type="button"
                        className="grid w-10 h-10 border place-items-center border-ink/10 disabled:cursor-not-allowed disabled:opacity-30"
                        onClick={goToPreviousMonths}
                        disabled={!canGoBack}
                        aria-label={t("common", "previousMonths")}
                      >
                        <Icon icon="ph:arrow-left" />
                      </button>
                      <p className="text-center text-[0.62rem] font-black uppercase tracking-[0.14em] text-muted">
                        {t("common", "availabilityFromToday")}
                      </p>
                      <button
                        type="button"
                        className="grid w-10 h-10 border place-items-center border-ink/10 disabled:cursor-not-allowed disabled:opacity-30"
                        onClick={goToNextMonths}
                        disabled={!canGoForward}
                        aria-label={t("common", "nextMonths")}
                      >
                        <Icon icon="ph:arrow-right" />
                      </button>
                    </div>

                    <div className="grid gap-10 md:hidden">
                      {mobileMonths.map((month) => (
                        <CalendarMonth
                          key={month.label}
                          month={month.month}
                          year={month.year}
                          label={month.label}
                          checkin={checkin}
                          checkout={checkout}
                          minDate={todayString}
                          weekdays={weekdaysByLocale[locale]}
                          onSelect={selectDate}
                        />
                      ))}
                    </div>

                    <div className="hidden gap-10 md:grid md:grid-cols-3">
                      {desktopMonths.map((month) => (
                        <CalendarMonth
                          key={month.label}
                          month={month.month}
                          year={month.year}
                          label={month.label}
                          checkin={checkin}
                          checkout={checkout}
                          minDate={todayString}
                          weekdays={weekdaysByLocale[locale]}
                          onSelect={selectDate}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="sticky bottom-0 flex items-center justify-between gap-4 border-t border-ink/10 bg-paper px-5 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 md:px-8 md:pb-6 fxl:px-[140px]">
                    <button
                      type="button"
                      className="text-xs font-black underline underline-offset-4"
                      onClick={() => {
                        resetBooking();
                        setStatus("idle");
                      }}
                    >
                      {t("common", "clear")}
                    </button>
                    <p className="flex-1 hidden text-xs leading-5 text-muted md:block">
                      {statusText}
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={checkAvailability}
                    >
                      {t("common", "checkAvailability")}
                    </button>
                  </div>
                  <p
                    className="px-5 pb-4 text-xs leading-5 text-muted md:hidden"
                    role="status"
                    aria-live="polite"
                  >
                    {statusText}
                  </p>
                </motion.aside>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

function SearchField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-1 py-4 border-r border-ink/10 px-7 last:border-r-0">
      <span className="text-[0.58rem] font-black uppercase tracking-[0.12em] text-ink">
        {label}
      </span>
      {children}
    </label>
  );
}

function CalendarMonth({
  month,
  year,
  label,
  checkin,
  checkout,
  minDate,
  weekdays,
  onSelect,
}: {
  month: number;
  year: number;
  label: string;
  checkin: string;
  checkout: string;
  minDate: string;
  weekdays: string[];
  onSelect: (date: string) => void;
}) {
  const cells = getCalendarCells(year, month);

  return (
    <div>
      <h3 className="mb-5 text-base font-black text-center">{label}</h3>
      <div className="grid grid-cols-7 gap-1 text-xs text-center">
        {weekdays.map((day) => (
          <span className="mb-3 font-bold text-muted" key={day}>
            {day}
          </span>
        ))}
        {cells.map((cell, index) =>
          cell ? (
            <button
              key={cell}
              type="button"
              disabled={cell < minDate}
              onClick={() => onSelect(cell)}
              className={`grid h-10 place-items-center rounded-md text-sm transition ${
                cell < minDate
                  ? "cursor-not-allowed text-ink/20 line-through"
                  : isSelected(cell, checkin, checkout)
                    ? "bg-ivory text-ink ring-1 ring-olive/25"
                    : cell === checkin || cell === checkout
                      ? "bg-ivory text-ink ring-1 ring-olive/35"
                      : "hover:bg-ink/6"
              }`}
            >
              {Number(cell.slice(-2))}
            </button>
          ) : (
            <span key={`empty-${index}`} />
          ),
        )}
      </div>
    </div>
  );
}

function getCalendarCells(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const cells: Array<string | null> = Array.from(
    { length: mondayOffset },
    () => null,
  );

  for (let day = 1; day <= daysInMonth; day += 1) {
    const value = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    cells.push(value);
  }

  return cells;
}

function getUpcomingMonths(from: Date, count: number, locale: "it" | "en" | "es") {
  const formatterLocale =
    locale === "en" ? "en-US" : locale === "es" ? "es-ES" : "it-IT";

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(from.getFullYear(), from.getMonth() + index, 1);

    return {
      label: new Intl.DateTimeFormat(formatterLocale, {
        month: "long",
        year: "numeric",
      }).format(date),
      year: date.getFullYear(),
      month: date.getMonth(),
    };
  });
}

function toDateValue(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatDateForDisplay(value: string) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  return `${day}/${Number(month)}/${year}`;
}

function isSelected(date: string, checkin: string, checkout: string) {
  if (!checkin || !checkout) return false;
  return date >= checkin && date <= checkout;
}
