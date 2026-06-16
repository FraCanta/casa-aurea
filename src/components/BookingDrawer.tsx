"use client";

import { Icon } from "@iconify/react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import type { Accommodation } from "@/data/accommodations";

type DrawerStatus = "idle" | "missing" | "available" | "unavailable" | "sent";

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
  const [selected, setSelected] = useState(selectedSlug ?? accommodations[0]?.slug ?? "");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("2");

  const selectedAccommodation = useMemo(
    () => accommodations.find((item) => item.slug === selected),
    [accommodations, selected]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  function checkAvailability() {
    if (!checkin || !checkout || !selectedAccommodation) {
      setStatus("missing");
      return;
    }

    if (selectedAccommodation.availability === "available") setStatus("available");
    if (selectedAccommodation.availability === "unavailable") setStatus("unavailable");
    if (selectedAccommodation.availability === "request") setStatus("idle");
  }

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sent");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onOpen?.();
          setOpen(true);
        }}
        className="inline-flex cursor-pointer border-0 bg-transparent p-0 text-left text-inherit"
      >
        {trigger ?? (
          <span className="btn btn-accent">
            Prenota ora
          </span>
        )}
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div className="fixed inset-0 z-[9999]">
                <motion.button
                  type="button"
                  aria-label="Chiudi drawer prenotazione"
                  className="absolute inset-0 bg-black/45"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
                <motion.aside
                  className="absolute right-0 top-0 h-full w-full max-w-[560px] overflow-y-auto bg-paper p-6 text-ink shadow-2xl md:p-10"
                  initial={{ x: "100%", opacity: 0.86 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "100%", opacity: 0.86 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="mb-3 text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">
                  Prenota il tuo soggiorno
                </p>
                <p className="font-serif text-[clamp(2.3rem,4vw,4rem)] leading-[1]">
                  Richiesta disponibilita.
                </p>
              </div>
              <button type="button" className="grid h-10 w-10 place-items-center border border-ink/15" onClick={() => setOpen(false)} aria-label="Chiudi">
                <Icon icon="ph:x" />
              </button>
            </div>

            <form className="mt-9 grid gap-5" onSubmit={submitRequest}>
              <label className="grid gap-2 text-[0.62rem] font-black uppercase tracking-[0.1em]">
                Alloggio
                <select className="border-0 border-b border-ink/15 bg-transparent py-3 outline-none" value={selected} onChange={(event) => setSelected(event.target.value)}>
                  {accommodations.map((item) => (
                    <option value={item.slug} key={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2 text-[0.62rem] font-black uppercase tracking-[0.1em]">
                  Check-in
                  <input className="border-0 border-b border-ink/15 bg-transparent py-3 outline-none" required type="date" value={checkin} onChange={(event) => setCheckin(event.target.value)} />
                </label>
                <label className="grid gap-2 text-[0.62rem] font-black uppercase tracking-[0.1em]">
                  Check-out
                  <input className="border-0 border-b border-ink/15 bg-transparent py-3 outline-none" required type="date" value={checkout} onChange={(event) => setCheckout(event.target.value)} />
                </label>
              </div>

              <label className="grid gap-2 text-[0.62rem] font-black uppercase tracking-[0.1em]">
                Ospiti
                <input className="border-0 border-b border-ink/15 bg-transparent py-3 outline-none" min="1" max="14" required type="number" value={guests} onChange={(event) => setGuests(event.target.value)} />
              </label>

              <label className="grid gap-2 text-[0.62rem] font-black uppercase tracking-[0.1em]">
                Messaggio
                <textarea className="min-h-28 border-0 border-b border-ink/15 bg-transparent py-3 outline-none" placeholder="Raccontaci esigenze, orario di arrivo, bambini, animali o richieste speciali." />
              </label>

              <div className="border-l-2 border-olive py-2 pl-4 text-sm leading-6 text-muted" role="status" aria-live="polite">
                {status === "idle" && "Inserisci date e ospiti per controllare la richiesta o inviala direttamente."}
                {status === "missing" && "Aggiungi check-in e check-out per verificare disponibilita."}
                {status === "available" && `${selectedAccommodation?.name} risulta disponibile: puoi inviare la richiesta.`}
                {status === "unavailable" && `${selectedAccommodation?.name} non risulta disponibile: prova altre date o un'altra dimora.`}
                {status === "sent" && "Richiesta inviata. Ti risponderemo con conferma, prezzo finale e dettagli del soggiorno."}
              </div>

              <div className="grid gap-3">
                <button type="button" className="btn btn-secondary w-full" onClick={checkAvailability}>
                  Verifica disponibilita
                </button>
                <button type="submit" className="btn btn-primary w-full">
                  Invia richiesta
                </button>
              </div>

            </form>
                </motion.aside>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
