"use client";

import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useBookingState } from "@/components/BookingState";
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
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<AvailabilityUi>("idle");
  const {
    checkin,
    checkout,
    guests,
    selectedSlug,
    setCheckin,
    setCheckout,
    setGuests,
    setSelectedSlug,
    resetBooking,
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
      return;
    }

    if (selectedAccommodation.availability === "unavailable") {
      setStatus("unavailable");
      return;
    }

    setStatus("request");
  }

  const statusText = {
    idle: "Il calendario interno controlla date, ospiti e dimora selezionata.",
    missing: "Inserisci check-in e check-out per verificare la disponibilita.",
    available: `${selectedAccommodation?.name} risulta disponibile per ${guests} ospiti. Puoi inviare la richiesta.`,
    unavailable: `${selectedAccommodation?.name} non e disponibile: prova un'altra dimora o altre date.`,
    request: `${selectedAccommodation?.name} richiede conferma manuale: invia una richiesta e ti risponderemo.`,
  }[status];

  const statusClass =
    status === "available"
      ? "!text-emerald-700"
      : status === "unavailable"
        ? "!text-red-700"
        : "";

  return (
    <>
      <button
        type="button"
        className="relative z-20 mx-8 mt-8 flex min-h-12 w-[calc(100%-4rem)] items-center justify-center gap-3 rounded-full bg-paper px-5 text-sm font-medium text-ink shadow-[0_18px_55px_rgba(23,27,20,0.22)] md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Apri ricerca disponibilita"
      >
        <Icon icon="ph:magnifying-glass" className="text-lg text-muted" />
        Inizia la ricerca
      </button>

      <div
        className="relative z-20 mx-5 mt-7 hidden bg-paper p-4 text-ink shadow-[0_28px_90px_rgba(23,27,20,0.16)] md:absolute md:inset-x-[88px] md:bottom-[-64px] md:mx-0 md:mt-0 md:grid md:min-h-[150px] md:grid-cols-[1.15fr_1fr_1fr_.75fr_220px] md:p-[30px_44px_22px] fxl:inset-x-[140px] fxl:bottom-[-76px] fxl:min-h-[168px] fxl:grid-cols-[1.2fr_1fr_1fr_.75fr_240px] fxl:p-[36px_56px_28px]"
        aria-label="Ricerca disponibilita"
      >
        <BookingFields
          checkin={checkin}
          checkout={checkout}
          guests={guests}
          selectedSlug={activeSlug}
          accommodations={accommodations}
          onCheckin={setCheckin}
          onCheckout={setCheckout}
          onGuests={setGuests}
          onSelectedSlug={setSelectedSlug}
          compact={false}
        />

        <button
          type="button"
          onClick={handleAvailability}
          className="btn btn-primary !text-[0.8rem] md:mt-0 md:w-auto"
        >
          Verifica disponibilità
        </button>

        <p
          className={`mt-3 text-[0.56rem] leading-5 text-muted md:col-span-full ${statusClass}`}
          role="status"
          aria-live="polite"
        >
          {statusText}
        </p>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[9999] md:hidden">
            <motion.button
              type="button"
              aria-label="Chiudi ricerca"
              className="absolute inset-0 bg-ink/40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
            />
            <motion.aside
              className="absolute inset-x-0 bottom-0 max-h-[88dvh] overflow-y-auto rounded-t-[28px] bg-paper px-5 pb-6 pt-5 text-ink shadow-[0_-24px_80px_rgba(23,27,20,0.24)]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-5">
                <button
                  type="button"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white shadow-[0_8px_26px_rgba(23,27,20,0.12)]"
                  aria-label="Chiudi ricerca"
                  onClick={() => setOpen(false)}
                >
                  <Icon icon="ph:x" className="text-xl" />
                </button>
                <div className="inline-flex rounded-full bg-white p-1 text-[0.58rem] font-black uppercase tracking-[0.1em] shadow-[0_8px_26px_rgba(23,27,20,0.08)]">
                  <span className="px-4 py-2 rounded-full bg-paper">
                    Dimore
                  </span>
                  <span className="px-4 py-2 text-muted">Boutique stay</span>
                </div>
              </div>

              <div className="rounded-md bg-white shadow-[0_16px_48px_rgba(23,27,20,0.12)]">
                <div className="px-5 py-4 border-b border-ink/10">
                  <h2 className="font-serif text-2xl leading-none">
                    Dove vuoi soggiornare?
                  </h2>
                </div>
                <div className="grid gap-0 p-5">
                  <BookingFields
                    checkin={checkin}
                    checkout={checkout}
                    guests={guests}
                    selectedSlug={activeSlug}
                    accommodations={accommodations}
                    onCheckin={setCheckin}
                    onCheckout={setCheckout}
                    onGuests={setGuests}
                    onSelectedSlug={setSelectedSlug}
                    compact
                  />
                </div>
              </div>

              <p
                className={`mt-4 border-l-2 border-olive py-1 pl-3 text-xs leading-5 text-muted ${statusClass}`}
                role="status"
                aria-live="polite"
              >
                {statusText}
              </p>

              <div className="sticky bottom-0 flex items-center justify-between gap-4 pt-3 mt-5 bg-paper">
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
                <button
                  type="button"
                  className="btn btn-primary min-w-[140px]"
                  onClick={handleAvailability}
                >
                  <Icon icon="ph:magnifying-glass" className="text-sm" />
                  Cerca
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function BookingFields({
  checkin,
  checkout,
  guests,
  selectedSlug,
  accommodations,
  onCheckin,
  onCheckout,
  onGuests,
  onSelectedSlug,
  compact,
}: {
  checkin: string;
  checkout: string;
  guests: string;
  selectedSlug: string;
  accommodations: Accommodation[];
  onCheckin: (value: string) => void;
  onCheckout: (value: string) => void;
  onGuests: (value: string) => void;
  onSelectedSlug: (value: string) => void;
  compact: boolean;
}) {
  const labelClass = compact
    ? "grid gap-1.5 border-b border-ink/10 py-4"
    : "grid gap-1.5 border-b border-ink/10 py-2.5 md:min-h-[54px] md:border-b-0 md:border-r md:py-0 md:pr-8";
  const middleLabelClass = compact
    ? labelClass
    : "grid gap-1.5 border-b border-ink/10 py-2.5 md:min-h-[54px] md:border-b-0 md:border-r md:py-0 md:px-4";
  const lastLabelClass = compact
    ? labelClass
    : "grid gap-1.5 border-b border-ink/10 py-2.5 md:min-h-[54px] md:border-b-0 md:py-0 md:px-4";
  const inputClass = compact
    ? "min-h-8 border-0 bg-transparent p-0 text-base font-medium text-ink outline-none [color-scheme:light]"
    : "min-h-6 border-0 bg-transparent p-0 text-[0.78rem] font-medium text-ink outline-none [color-scheme:light]";

  return (
    <>
      <label className={labelClass}>
        <span className="flex items-center gap-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-olive">
          Dimora <Icon icon="ph:map-pin" className="text-sm text-ink/45" />
        </span>
        <select
          value={selectedSlug}
          onChange={(event) => onSelectedSlug(event.target.value)}
          aria-label="Alloggio"
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
          Check-in{" "}
          <Icon icon="ph:calendar-blank" className="text-sm text-ink/45" />
        </span>
        <input
          type="date"
          value={checkin}
          onChange={(event) => onCheckin(event.target.value)}
          aria-label="Data di arrivo"
          className={inputClass}
        />
      </label>

      <label className={middleLabelClass}>
        <span className="flex items-center gap-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-olive">
          Check-out{" "}
          <Icon icon="ph:calendar-blank" className="text-sm text-ink/45" />
        </span>
        <input
          type="date"
          value={checkout}
          onChange={(event) => onCheckout(event.target.value)}
          aria-label="Data di partenza"
          className={inputClass}
        />
      </label>

      <label className={lastLabelClass}>
        <span className="flex items-center gap-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-olive">
          Ospiti <Icon icon="ph:users" className="text-sm text-ink/45" />
        </span>
        <select
          value={guests}
          onChange={(event) => onGuests(event.target.value)}
          aria-label="Numero ospiti"
          className={inputClass}
        >
          <option value="2">2 ospiti</option>
          <option value="4">4 ospiti</option>
          <option value="6">6 ospiti</option>
          <option value="8">8 ospiti</option>
        </select>
      </label>
    </>
  );
}
