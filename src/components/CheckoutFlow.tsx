"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useBookingState } from "@/components/BookingState";
import { useLocaleCurrency } from "@/components/LocaleCurrencyProvider";
import type { Accommodation } from "@/data/accommodations";
import { siteConfig } from "@/lib/site";

type CheckoutMode = "request" | "payment";
type CheckoutStatus = "idle" | "sent" | "paid";

export function CheckoutFlow({
  accommodation,
  checkin: initialCheckin,
  checkout: initialCheckout,
  guests: initialGuests,
}: {
  accommodation: Accommodation;
  checkin?: string;
  checkout?: string;
  guests?: string;
}) {
  const [mode, setMode] = useState<CheckoutMode>("request");
  const [status, setStatus] = useState<CheckoutStatus>("idle");
  const { formatPrice, t } = useLocaleCurrency();
  const {
    checkin,
    checkout,
    guests,
    setSelectedSlug,
    setCheckin,
    setCheckout,
    setGuests,
  } = useBookingState();

  useEffect(() => {
    setSelectedSlug(accommodation.slug);
    if (initialCheckin) setCheckin(initialCheckin);
    if (initialCheckout) setCheckout(initialCheckout);
    if (initialGuests) setGuests(initialGuests);
  }, [
    accommodation.slug,
    initialCheckin,
    initialCheckout,
    initialGuests,
    setCheckin,
    setCheckout,
    setGuests,
    setSelectedSlug,
  ]);

  const activeCheckin = checkin || initialCheckin || "";
  const activeCheckout = checkout || initialCheckout || "";
  const activeGuests = guests || initialGuests || "2";
  const nights = useMemo(
    () => getNights(activeCheckin, activeCheckout),
    [activeCheckin, activeCheckout],
  );
  const subtotal = nights * accommodation.priceFrom;
  const serviceFee = nights > 0 ? Math.round(subtotal * 0.08) : 0;
  const total = subtotal + serviceFee;
  const hasDates = Boolean(activeCheckin && activeCheckout && nights > 0);

  function submitCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(mode === "payment" ? "paid" : "sent");
  }

  return (
    <main className="bg-ivory px-4 pb-12 pt-24 md:px-[88px] md:pb-20 md:pt-40 fxl:px-[140px]">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-6 mb-6 border-b border-ink/15 md:mb-10 md:gap-6 md:pb-8">
        <div>
          <p className="mb-2 text-[0.54rem] font-black uppercase tracking-[0.16em] text-olive md:mb-3 md:text-[0.58rem]">
            {t("common", "checkout")}
          </p>
          <h1 className="font-serif text-[2rem] font-normal leading-[1] md:text-[clamp(3rem,6vw,3rem)]">
            {t("common", "completeStay")}
          </h1>
          <p className="mt-3 max-w-[620px] text-xs leading-6 text-muted md:mt-4 md:text-base md:leading-7">
            {t("common", "checkoutIntro")}
          </p>
        </div>
        <Link className="btn btn-secondary" href={`/alloggi/${accommodation.slug}`}>
          <Icon icon="ph:arrow-left" />
          {t("common", "back")}
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_430px] lg:gap-8">
        <aside className="grid order-first gap-5 lg:order-none lg:col-start-2 lg:row-start-1 lg:gap-6">
          <SummaryCard
            accommodation={accommodation}
            activeCheckin={activeCheckin}
            activeCheckout={activeCheckout}
            activeGuests={activeGuests}
            hasDates={hasDates}
            nights={nights}
            subtotal={subtotal}
            serviceFee={serviceFee}
            total={total}
            formatPrice={formatPrice}
            t={t}
          />
          <MapCard accommodation={accommodation} t={t} />
        </aside>

        <form className="grid gap-5 md:gap-8 lg:col-start-1 lg:row-start-1" onSubmit={submitCheckout}>
          <section className="p-4 border border-ink/10 bg-paper md:p-7">
            <p className="mb-4 text-[0.54rem] font-black uppercase tracking-[0.16em] text-olive md:mb-5 md:text-[0.58rem]">
              {t("common", "payment")}
            </p>
            <div className="grid grid-cols-2 p-1 border border-ink/10 bg-white/40">
              <TabButton
                active={mode === "request"}
                icon="ph:envelope-simple"
                label={t("common", "request")}
                onClick={() => setMode("request")}
              />
              <TabButton
                active={mode === "payment"}
                icon="ph:credit-card"
                label={t("common", "payment")}
                onClick={() => setMode("payment")}
              />
            </div>
            <p className="mt-4 text-xs leading-5 text-muted md:text-sm md:leading-6">
              {mode === "request"
                ? t("common", "modeRequestText")
                : t("common", "modePaymentText")}
            </p>
          </section>

          <section className="p-4 border border-ink/10 bg-paper md:p-7">
            <p className="mb-4 text-[0.54rem] font-black uppercase tracking-[0.16em] text-olive md:mb-5 md:text-[0.58rem]">
              {t("common", "guestData")}
            </p>
            <div className="grid gap-3 md:grid-cols-2 md:gap-5">
              <Input label={t("common", "fullName")} placeholder="Es. Francesca Rossi" required />
              <Input label="Email" type="email" placeholder="nome@email.it" required />
              <Input label={t("common", "phone")} type="tel" placeholder="+39 333 123 4567" required />
              <Input label={t("common", "country")} placeholder="Italia" />
            </div>
            <label className="mt-3 grid gap-2 text-[0.58rem] font-black uppercase tracking-[0.1em] md:mt-5 md:text-[0.62rem]">
              {t("common", "message")}
              <textarea
                className="p-3 text-sm font-medium tracking-normal normal-case transition border outline-none min-h-24 border-ink/10 bg-white/50 focus:border-olive md:min-h-32 md:p-4"
                placeholder={t("common", "messagePlaceholder")}
              />
            </label>
          </section>

          {mode === "payment" && (
            <section className="p-4 border border-ink/10 bg-paper md:p-7">
              <p className="mb-4 text-[0.5rem] font-black uppercase tracking-[0.16em] text-olive md:mb-5 md:text-[0.4rem]">
                {t("common", "payment")}
              </p>
              <div className="grid gap-3 md:grid-cols-2 md:gap-5">
                <Input label={t("common", "cardNumber")} placeholder="4242 4242 4242 4242" />
                <Input label={t("common", "cardHolder")} placeholder="Francesca Rossi" />
                <Input label={t("common", "expiry")} placeholder="12/28" />
                <Input label="CVC" placeholder="123" />
              </div>
              <p className="mt-4 text-xs leading-5 text-muted">
                {t("common", "demoPaymentNote")}
              </p>
            </section>
          )}

          <button type="submit" className="w-full btn btn-primary !text-[0.8rem] md:w-auto">
            {mode === "payment" ? t("common", "simulatePayment") : t("common", "sendRequest")}
          </button>

          {status !== "idle" && (
            <div className="p-4 text-xs leading-6 border-l-2 border-olive bg-paper text-muted md:p-5 md:text-sm md:leading-7">
              <strong className="block text-ink">
                {status === "paid" ? t("common", "paymentDone") : t("common", "requestSent")}
              </strong>
              {t("common", "checkoutSuccessText")}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}

function SummaryCard({
  accommodation,
  activeCheckin,
  activeCheckout,
  activeGuests,
  hasDates,
  nights,
  subtotal,
  serviceFee,
  total,
  formatPrice,
  t,
}: {
  accommodation: Accommodation;
  activeCheckin: string;
  activeCheckout: string;
  activeGuests: string;
  hasDates: boolean;
  nights: number;
  subtotal: number;
  serviceFee: number;
  total: number;
  formatPrice: (amount: number) => string;
  t: ReturnType<typeof useLocaleCurrency>["t"];
}) {
  return (
    <section className="p-4 border border-ink/10 bg-paper md:p-7">
      <p className="mb-3 text-[0.54rem] font-black uppercase tracking-[0.16em] text-olive md:mb-4 md:text-[0.58rem]">
        {t("common", "summary")}
      </p>
      <h2 className="font-serif text-[1.65rem] leading-[1] md:text-[2.1rem]">
        {accommodation.name}
      </h2>
      <div className="grid gap-2 py-4 mt-4 text-xs border-y border-ink/10 text-muted md:mt-5 md:gap-3 md:py-5 md:text-sm">
        <SummaryRow icon="ph:calendar-blank" label={t("common", "checkin")} value={formatDateForDisplay(activeCheckin) || t("common", "toChoose")} />
        <SummaryRow icon="ph:calendar-check" label={t("common", "checkout")} value={formatDateForDisplay(activeCheckout) || t("common", "toChoose")} />
        <SummaryRow icon="ph:users" label={t("common", "guests")} value={`${activeGuests} ${t("common", "guests")}`} />
        <SummaryRow icon="ph:moon" label={t("common", "nights")} value={hasDates ? String(nights) : "-"} />
      </div>
      <div className="grid gap-2 mt-4 text-xs md:mt-5 md:gap-3 md:text-sm">
        <PriceRow label={`${nights || 0} ${t("common", "nights")} x ${formatPrice(accommodation.priceFrom)}`} value={formatPrice(subtotal)} />
        <PriceRow label={t("common", "serviceFee")} value={formatPrice(serviceFee)} />
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-ink/10">
          <span className="text-[0.58rem] font-black uppercase tracking-[0.14em] text-muted md:text-[0.62rem]">
            {t("common", "estimatedTotal")}
          </span>
          <strong className="font-serif text-2xl font-normal md:text-3xl">
            {formatPrice(total)}
          </strong>
        </div>
      </div>
    </section>
  );
}

function MapCard({
  accommodation,
  t,
}: {
  accommodation: Accommodation;
  t: ReturnType<typeof useLocaleCurrency>["t"];
}) {
  return (
    <section className="overflow-hidden border border-ink/10 bg-paper">
      <div className="grid min-h-[180px] place-items-center bg-[linear-gradient(135deg,rgba(126,145,136,0.22),rgba(159,93,73,0.08)),repeating-linear-gradient(45deg,rgba(24,35,31,0.08)_0_1px,transparent_1px_22px)] p-5 text-center md:min-h-[280px] md:p-6">
        <div>
          <span className="grid w-10 h-10 mx-auto text-white rounded-full shadow-xl place-items-center bg-terracotta md:h-12 md:w-12">
            <Icon icon="ph:map-pin" className="text-xl md:text-2xl" />
          </span>
          <h3 className="mt-4 font-serif text-2xl leading-[1] md:mt-5 md:text-3xl">
            {t("alloggi", `${accommodation.slug}.location` as never)}
          </h3>
          <p className="mt-3 text-xs leading-5 text-muted md:text-sm md:leading-6">
            {t("pages", "detailCoordinates")}: {accommodation.coordinates.latitude},{" "}
            {accommodation.coordinates.longitude}
          </p>
        </div>
      </div>
      <div className="p-4 text-xs leading-5 text-muted md:p-5 md:text-sm md:leading-6">
        <strong className="block text-ink">{siteConfig.address}</strong>
        {t("common", "mapReadyText")}
      </div>
    </section>
  );
}

function TabButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`inline-flex min-h-10 items-center justify-center gap-1.5 px-3 !text-[0.75rem] font-black uppercase tracking-[0.1em] transition md:min-h-11 md:!text-[0.8rem] ${
        active ? "bg-ivory text-ink shadow-sm" : "text-muted"
      }`}
      onClick={onClick}
    >
      <Icon icon={icon} className="text-base text-olive" />
      {label}
    </button>
  );
}

function Input({
  label,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-[0.58rem] font-black uppercase tracking-[0.1em] md:text-[0.62rem]">
      {label}
      <input
        className="px-3 text-sm font-medium tracking-normal normal-case transition border outline-none min-h-11 border-ink/10 bg-white/50 focus:border-olive md:min-h-12 md:px-4"
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="flex items-center gap-2">
        <Icon icon={icon} className="text-olive" />
        {label}
      </span>
      <strong className="font-medium text-right text-ink">{value}</strong>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-muted">
      <span>{label}</span>
      <span>{value}</span>
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
