"use client";

import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useBookingState } from "@/components/BookingState";
import type { Accommodation } from "@/data/accommodations";

type DrawerStatus = "idle" | "missing" | "available" | "unavailable" | "sent";

const months = [
  { label: "Giugno 2026", year: 2026, month: 5 },
  { label: "Luglio 2026", year: 2026, month: 6 },
];

const weekdays = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

export function BookingDrawer({
  accommodations,
  selectedSlug,
  trigger,
  onOpen,
}: {
  accommodations: Accommodation[];
  selectedSlug?: string;
  trigger?: ReactNode;
  onOpen?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<DrawerStatus>("idle");
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

  const activeSlug = selectedSlug || storedSlug || accommodations[0]?.slug || "";

  const selectedAccommodation = useMemo(
    () => accommodations.find((item) => item.slug === activeSlug),
    [accommodations, activeSlug],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  function openDrawer() {
    if (selectedSlug) setSelectedSlug(selectedSlug);
    if (!storedSlug && !selectedSlug && accommodations[0]) {
      setSelectedSlug(accommodations[0].slug);
    }
    onOpen?.();
    setOpen(true);
  }

  function selectDate(date: string) {
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
      return;
    }

    if (selectedAccommodation.availability === "unavailable") {
      setStatus("unavailable");
      return;
    }

    setStatus("sent");
  }

  const statusText = {
    idle: "Scegli dimora, ospiti e date: questi dati restano sincronizzati con il futuro booking engine.",
    missing: "Seleziona check-in e check-out per continuare.",
    available: `${selectedAccommodation?.name} risulta disponibile. Puoi inviare la richiesta.`,
    unavailable: `${selectedAccommodation?.name} non risulta disponibile per queste date.`,
    sent: "Richiesta pronta: quando collegherai booking engine o iCal, useremo gli stessi dati.",
  }[status];

  return (
    <>
      <button
        type="button"
        onClick={openDrawer}
        className="inline-flex cursor-pointer border-0 bg-transparent p-0 text-left text-inherit"
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
                  aria-label="Chiudi selezione date"
                  className="absolute inset-0 bg-ink/45"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                />

                <motion.aside
                  className="absolute inset-0 h-dvh overflow-y-auto bg-paper text-ink"
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 24, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="border-b border-ink/10 px-5 py-4 md:hidden">
                    <div className="grid grid-cols-[44px_1fr_44px] items-center">
                      <button
                        type="button"
                        className="grid h-10 w-10 place-items-center"
                        onClick={() => setOpen(false)}
                        aria-label="Chiudi"
                      >
                        <Icon icon="ph:x" className="text-xl" />
                      </button>
                      <h2 className="text-center text-base font-bold">
                        Seleziona date
                      </h2>
                    </div>
                  </div>

                  <div className="hidden px-8 py-7 md:block fxl:px-[140px]">
                    <div className="mb-7 flex items-center justify-between">
                      <div>
                        <p className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-olive">
                          Prenota il tuo soggiorno
                        </p>
                        <h2 className="mt-2 font-serif text-[clamp(2.4rem,4vw,4.4rem)] leading-[1]">
                          Seleziona le date.
                        </h2>
                      </div>
                      <button
                        type="button"
                        className="grid h-12 w-12 place-items-center border border-ink/15"
                        onClick={() => setOpen(false)}
                        aria-label="Chiudi"
                      >
                        <Icon icon="ph:x" className="text-xl" />
                      </button>
                    </div>
                    <div className="grid grid-cols-[1fr_1fr_0.8fr_56px] items-center rounded-full bg-white shadow-[0_16px_42px_rgba(23,27,20,0.12)]">
                      <SearchField label="Dimora">
                        <select
                          value={activeSlug}
                          onChange={(event) => setSelectedSlug(event.target.value)}
                          className="w-full border-0 bg-transparent text-sm outline-none"
                        >
                          {accommodations.map((item) => (
                            <option key={item.slug} value={item.slug}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </SearchField>
                      <SearchField label="Date">
                        <span className="text-sm">
                          {checkin || "Check-in"}{" "}
                          <span className="text-muted">-</span>{" "}
                          {checkout || "Check-out"}
                        </span>
                      </SearchField>
                      <SearchField label="Ospiti">
                        <select
                          value={guests}
                          onChange={(event) => setGuests(event.target.value)}
                          className="w-full border-0 bg-transparent text-sm outline-none"
                        >
                          <option value="2">2 ospiti</option>
                          <option value="4">4 ospiti</option>
                          <option value="6">6 ospiti</option>
                          <option value="8">8 ospiti</option>
                        </select>
                      </SearchField>
                      <button
                        type="button"
                        className="mr-2 grid h-12 w-12 place-items-center rounded-full bg-terracotta text-white"
                        onClick={checkAvailability}
                        aria-label="Verifica disponibilita"
                      >
                        <Icon icon="ph:magnifying-glass" className="text-xl" />
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-5 px-5 py-5 md:hidden">
                    <label className="grid gap-2">
                      <span className="text-xs font-bold">Ospiti</span>
                      <span className="flex min-h-12 items-center gap-3 border border-ink/15 bg-white px-4">
                        <Icon icon="ph:users" className="text-muted" />
                        <select
                          value={guests}
                          onChange={(event) => setGuests(event.target.value)}
                          className="w-full border-0 bg-transparent outline-none"
                        >
                          <option value="2">2 ospiti</option>
                          <option value="4">4 ospiti</option>
                          <option value="6">6 ospiti</option>
                          <option value="8">8 ospiti</option>
                        </select>
                      </span>
                    </label>
                    <label className="grid gap-2">
                      <span className="text-xs font-bold">Dimora</span>
                      <span className="flex min-h-12 items-center gap-3 border border-ink/15 bg-white px-4">
                        <Icon icon="ph:house-line" className="text-muted" />
                        <select
                          value={activeSlug}
                          onChange={(event) => setSelectedSlug(event.target.value)}
                          className="w-full border-0 bg-transparent outline-none"
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

                  <div className="bg-white px-5 py-7 md:mx-8 md:grid md:grid-cols-2 md:gap-12 md:px-10 md:py-10 fxl:mx-[140px]">
                    {months.map((month) => (
                      <CalendarMonth
                        key={month.label}
                        month={month.month}
                        year={month.year}
                        label={month.label}
                        checkin={checkin}
                        checkout={checkout}
                        onSelect={selectDate}
                      />
                    ))}
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
                      Cancella
                    </button>
                    <p className="hidden flex-1 text-xs leading-5 text-muted md:block">
                      {statusText}
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={checkAvailability}
                    >
                      Verifica disponibilita
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
    <label className="grid gap-1 border-r border-ink/10 px-7 py-4 last:border-r-0">
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
  onSelect,
}: {
  month: number;
  year: number;
  label: string;
  checkin: string;
  checkout: string;
  onSelect: (date: string) => void;
}) {
  const cells = getCalendarCells(year, month);

  return (
    <div>
      <h3 className="mb-5 text-center text-base font-black">{label}</h3>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
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
              onClick={() => onSelect(cell)}
              className={`grid h-10 place-items-center rounded-md text-sm transition ${
                isSelected(cell, checkin, checkout)
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
  const cells: Array<string | null> = Array.from({ length: mondayOffset }, () => null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    const value = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    cells.push(value);
  }

  return cells;
}

function isSelected(date: string, checkin: string, checkout: string) {
  if (!checkin || !checkout) return false;
  return date >= checkin && date <= checkout;
}
