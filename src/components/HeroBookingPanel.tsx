"use client";

import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";
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
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("2");
  const [selectedSlug, setSelectedSlug] = useState(
    accommodations[0]?.slug ?? "",
  );
  const [status, setStatus] = useState<AvailabilityUi>("idle");

  const selectedAccommodation = useMemo(
    () => accommodations.find((item) => item.slug === selectedSlug),
    [accommodations, selectedSlug],
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

  return (
    <div
      className="relative z-20 mx-5 mt-7 bottom-[-30px] grid bg-paper p-4 text-ink shadow-[0_28px_90px_rgba(23,27,20,0.16)] md:absolute md:inset-x-[88px] md:bottom-[-64px] md:mx-0 md:mt-0 md:min-h-[150px] md:grid-cols-[1fr_1fr_.75fr_1.15fr_220px] md:p-[30px_44px_22px] fxl:inset-x-[140px] fxl:bottom-[-76px] fxl:min-h-[168px] fxl:grid-cols-[1fr_1fr_.75fr_1.2fr_240px] fxl:p-[36px_56px_28px]"
      aria-label="Ricerca disponibilita"
    >
      <label className="grid gap-1.5 border-b border-ink/10 py-2.5 md:min-h-[54px] md:border-b-0 md:border-r md:py-0 md:pr-8">
        <span className="flex items-center gap-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-olive">
          Check-in{" "}
          <Icon icon="ph:calendar-blank" className="text-sm text-ink/45" />
        </span>
        <input
          type="date"
          value={checkin}
          onChange={(event) => setCheckin(event.target.value)}
          aria-label="Data di arrivo"
          className="min-h-6 border-0 bg-transparent p-0 text-[0.78rem] font-medium text-ink outline-none [color-scheme:light]"
        />
      </label>

      <label className="grid gap-1.5 border-b border-ink/10 py-2.5 md:min-h-[54px] md:border-b-0 md:border-r md:py-0 md:px-4">
        <span className="flex items-center gap-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-olive">
          Check-out{" "}
          <Icon icon="ph:calendar-blank" className="text-sm text-ink/45" />
        </span>
        <input
          type="date"
          value={checkout}
          onChange={(event) => setCheckout(event.target.value)}
          aria-label="Data di partenza"
          className="min-h-6 border-0 bg-transparent p-0 text-[0.78rem] font-medium text-ink outline-none [color-scheme:light]"
        />
      </label>

      <label className="grid gap-1.5 border-b border-ink/10 py-2.5 md:min-h-[54px] md:border-b-0 md:border-r md:py-0 md:px-4">
        <span className="flex items-center gap-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-olive">
          Ospiti <Icon icon="ph:users" className="text-sm text-ink/45" />
        </span>
        <select
          value={guests}
          onChange={(event) => setGuests(event.target.value)}
          aria-label="Numero ospiti"
          className="min-h-6 border-0 bg-transparent p-0 text-[0.78rem] font-medium text-ink outline-none"
        >
          <option value="2">2 ospiti</option>
          <option value="4">4 ospiti</option>
          <option value="6">6 ospiti</option>
          <option value="8">8 ospiti</option>
        </select>
      </label>

      <label className="grid gap-1.5 border-b border-ink/10 py-2.5 md:min-h-[54px] md:border-b-0 md:py-0 md:px-4">
        <span className="flex items-center gap-2 text-[0.5rem] font-black uppercase tracking-[0.15em] text-olive">
          Dove vuoi andare?{" "}
          <Icon icon="ph:map-pin" className="text-sm text-ink/45" />
        </span>
        <select
          value={selectedSlug}
          onChange={(event) => setSelectedSlug(event.target.value)}
          aria-label="Alloggio"
          className="min-h-6 border-0 bg-transparent p-0 text-[0.78rem] font-medium text-ink outline-none"
        >
          {accommodations.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={handleAvailability}
        className="btn btn-primary !text-[0.8rem] mt-3 w-full md:mt-0 md:w-auto"
      >
        Verifica disponibilità
      </button>

      <p
        className={`mt-3 text-[0.56rem] leading-5 text-muted md:col-span-full ${
          status === "available" ? "!text-emerald-700" : ""
        } ${status === "unavailable" ? "!text-red-700" : ""}`}
        role="status"
        aria-live="polite"
      >
        {status === "idle" &&
          "Il calendario interno controlla date, ospiti e dimora selezionata."}
        {status === "missing" &&
          "Inserisci check-in e check-out per verificare la disponibilita."}
        {status === "available" &&
          `${selectedAccommodation?.name} risulta disponibile per ${guests} ospiti. Puoi inviare la richiesta.`}
        {status === "unavailable" &&
          `${selectedAccommodation?.name} non e disponibile: prova un'altra dimora o altre date.`}
        {status === "request" &&
          `${selectedAccommodation?.name} richiede conferma manuale: invia una richiesta e ti risponderemo.`}
      </p>
    </div>
  );
}
