"use client";

import { FormEvent, useMemo, useState } from "react";
import { useLocaleCurrency } from "@/components/LocaleCurrencyProvider";
import type { Accommodation } from "@/data/accommodations";

type BookingStatus = "idle" | "available" | "unavailable" | "sent";

export function BookingForm({
  accommodations,
  selectedSlug,
}: {
  accommodations: Accommodation[];
  selectedSlug?: string;
}) {
  const { t } = useLocaleCurrency();
  const [status, setStatus] = useState<BookingStatus>("idle");
  const [selected, setSelected] = useState(
    selectedSlug ?? accommodations[0]?.slug ?? "",
  );

  const selectedAccommodation = useMemo(
    () => accommodations.find((item) => item.slug === selected),
    [accommodations, selected],
  );

  function handleCheck() {
    if (!selectedAccommodation) return;
    if (selectedAccommodation.availability === "available")
      setStatus("available");
    if (selectedAccommodation.availability === "unavailable")
      setStatus("unavailable");
    if (selectedAccommodation.availability === "request") setStatus("idle");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sent");
  }

  return (
    <form
      className="bg-white/65 p-6 shadow-[0_20px_70px_rgba(23,27,20,0.06)] md:p-10"
      onSubmit={handleSubmit}
    >
      <div className="mb-3 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#8e8456]">
        {t("common", "stayRequest")}
      </div>
      <p className="font-serif text-[clamp(2rem,3vw,2rem)] leading-[1]">
        {t("common", "requestAvailability")}
      </p>
      <div className="grid gap-4 mt-7 md:grid-cols-2">
        <label className="grid gap-2 text-[0.62rem] font-black uppercase tracking-[0.1em] text-[#171b14]">
          Check-in
          <input
            className="border-0 border-b border-[#171b14]/15 bg-transparent py-3 outline-none"
            required
            type="date"
            name="checkin"
          />
        </label>
        <label className="grid gap-2 text-[0.62rem] font-black uppercase tracking-[0.1em] text-[#171b14]">
          Check-out
          <input
            className="border-0 border-b border-[#171b14]/15 bg-transparent py-3 outline-none"
            required
            type="date"
            name="checkout"
          />
        </label>
        <label className="grid gap-2 text-[0.62rem] font-black uppercase tracking-[0.1em] text-[#171b14]">
          {t("common", "guests")}
          <input
            className="border-0 border-b border-[#171b14]/15 bg-transparent py-3 outline-none"
            required
            type="number"
            name="guests"
            min="1"
            max="12"
            defaultValue="2"
          />
        </label>
        <label className="grid gap-2 text-[0.62rem] font-black uppercase tracking-[0.1em] text-[#171b14]">
          {t("common", "accommodation")}
          <select
            className="border-0 border-b border-[#171b14]/15 bg-transparent py-3 outline-none"
            name="accommodation"
            value={selected}
            onChange={(event) => setSelected(event.target.value)}
          >
            {accommodations.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="mt-5 grid gap-2 text-[0.62rem] font-black uppercase tracking-[0.1em] text-[#171b14]">
        {t("common", "message")}
        <textarea
          className="border-0 border-b border-[#171b14]/15 bg-transparent py-3 outline-none"
          name="message"
          rows={4}
          placeholder={t("common", "messagePlaceholder")}
        />
      </label>
      <div
        className={`my-6 border-l-2 border-[#8e8456] py-2 pl-4 text-sm text-[#5d5a50] status-${status}`}
        role="status"
        aria-live="polite"
      >
        {status === "idle" &&
          t("common", "availabilityIdle")}
        {status === "available" &&
          t("common", "availabilityAvailable")}
        {status === "unavailable" &&
          t("common", "availabilityUnavailable")}
        {status === "sent" &&
          t("common", "availabilitySent")}
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="btn btn-secondary !text-[0.8rem]"
          onClick={handleCheck}
        >
          {t("common", "checkDates")}
        </button>
        <button
          type="submit"
          className="btn btn-primary !text-[0.8rem]"
          disabled={status !== "available"}
        >
          {t("common", "bookingStay")}
        </button>
      </div>
    </form>
  );
}
