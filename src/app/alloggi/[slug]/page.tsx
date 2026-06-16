import type { Metadata } from "next";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BookingDrawer } from "@/components/BookingDrawer";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { Reveal, SoftScale, StaggerItem, StaggerReveal } from "@/components/Motion";
import { LodgingStructuredData } from "@/components/StructuredData";
import { accommodations, getAccommodation } from "@/data/accommodations";
import { siteConfig } from "@/lib/site";

const accommodationFaqs = [
  {
    question: "Come verifico la disponibilita?",
    answer:
      "Puoi usare il calendario interno e inviare una richiesta con date, ospiti e messaggio. La conferma finale arriva dopo controllo manuale della struttura.",
  },
  {
    question: "Il prezzo e definitivo?",
    answer:
      "Il prezzo mostrato e indicativo per notte. Il totale puo variare in base a periodo, durata del soggiorno, numero ospiti e servizi extra richiesti.",
  },
  {
    question: "Quali sono gli orari di check-in e check-out?",
    answer:
      "Gli orari sono indicati nelle regole della casa. Eventuali arrivi fuori orario possono essere valutati su richiesta.",
  },
  {
    question: "Sono ammessi animali o servizi extra?",
    answer:
      "Dipende dall'alloggio selezionato. Nella richiesta puoi indicare animali, bambini, transfer, chef privato o altre esigenze.",
  },
];

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return accommodations.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const accommodation = getAccommodation(slug);

  if (!accommodation) {
    return {};
  }

  return {
    title: `${accommodation.name} | ${accommodation.type} vicino a ${siteConfig.locality}`,
    description: `${accommodation.name}: ${accommodation.summary} Casa vacanza, villa in affitto o appartamento turistico a ${siteConfig.locality} con gallery, servizi e CTA prenotazione.`,
    alternates: {
      canonical: `/alloggi/${accommodation.slug}`,
    },
    openGraph: {
      title: `${accommodation.name} - ${accommodation.type}`,
      description: accommodation.summary,
      images: [accommodation.featuredImage],
      type: "website",
    },
  };
}

export default async function AccommodationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const accommodation = getAccommodation(slug);

  if (!accommodation) {
    notFound();
  }

  return (
    <main>
      <LodgingStructuredData accommodation={accommodation} />
      <section className="bg-ivory px-6 pb-0 pt-36 md:px-[88px] md:pt-48 fxl:px-[140px]">
        <div className="mb-12 grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <Reveal>
            <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">
              {accommodation.type}
            </p>
            <h1 className="max-w-[1000px] font-serif text-[clamp(3rem,6vw,6.8rem)] font-normal leading-[0.95] tracking-[-0.01em] fxl:text-[5rem]">
              {accommodation.name}
            </h1>
            <p className="mt-6 max-w-[680px] text-base leading-7 text-muted">
              {accommodation.claim}
            </p>
          </Reveal>
        </div>
        <GalleryLightbox
          images={[accommodation.featuredImage, ...accommodation.gallery]}
          altBase={`${accommodation.name}, ${accommodation.type} vicino a ${siteConfig.locality}`}
        />
      </section>

      <section className="bg-ivory px-6  md:px-[88px]  fxl:px-[140px] ">
        <div className="mb-16 grid gap-10 border-y border-ink/15 py-10 md:grid-cols-[1fr_340px] md:items-start fxl:grid-cols-[1fr_420px]">
          <Reveal>
            <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">
              Descrizione
            </p>
            <h2 className="font-serif text-[clamp(2.4rem,4vw,4.4rem)] font-normal leading-[1]">
              {accommodation.claim}
            </h2>
            <p className="mt-6 max-w-[820px] text-[1.05rem] leading-8 text-muted">
              {accommodation.description}
            </p>
          </Reveal>
          <SoftScale className="border border-ink/15 bg-paper p-6">
            <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">
              Prezzo
            </p>
            <p className="mt-4 font-serif text-5xl leading-none">
              Da EUR {accommodation.priceFrom}
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.12em] text-muted">
              per notte
            </p>
            <div className="mt-5 grid gap-3 border-y border-ink/10 py-5 text-sm text-muted">
              <span className="flex items-center gap-3">
                <Icon icon="ph:calendar-check" className="text-lg text-olive" />
                {accommodation.availability === "available" &&
                  "Disponibilita verificabile"}
                {accommodation.availability === "request" &&
                  "Disponibilita su richiesta"}
                {accommodation.availability === "unavailable" &&
                  "Non disponibile nelle date demo"}
              </span>
              <span className="flex items-center gap-3">
                <Icon icon="ph:map-pin" className="text-lg text-olive" />
                {accommodation.location}
              </span>
            </div>
            <p className="mt-5 text-sm leading-6 text-muted">
              Tariffa indicativa. Il prezzo finale dipende da date, durata,
              ospiti e servizi extra.
            </p>
            <BookingDrawer
              accommodations={accommodations}
              selectedSlug={accommodation.slug}
              trigger={
                <span className="btn btn-primary mt-6 w-full">
                  Prenota ora
                </span>
              }
            />
          </SoftScale>
        </div>

        <StaggerReveal className="grid border border-ink/15 md:grid-cols-4">
          <StaggerItem className="grid gap-3 border-b border-ink/15 p-5 md:border-b-0 md:border-r">
            <Icon icon="ph:users" className="text-2xl text-olive" />
            <strong className="block font-serif text-4xl font-normal">
              {accommodation.guests}
            </strong>
            <span>Ospiti</span>
          </StaggerItem>
          <StaggerItem className="grid gap-3 border-b border-ink/15 p-5 md:border-b-0 md:border-r">
            <Icon icon="ph:bed" className="text-2xl text-olive" />
            <strong className="block font-serif text-4xl font-normal">
              {accommodation.bedrooms}
            </strong>
            <span>Camere</span>
          </StaggerItem>
          <StaggerItem className="grid gap-3 border-b border-ink/15 p-5 md:border-b-0 md:border-r">
            <Icon icon="ph:bathtub" className="text-2xl text-olive" />
            <strong className="block font-serif text-4xl font-normal">
              {accommodation.bathrooms}
            </strong>
            <span>Bagni</span>
          </StaggerItem>
          <StaggerItem className="grid gap-3 p-5">
            <Icon icon="ph:ruler" className="text-2xl text-olive" />
            <strong className="block font-serif text-4xl font-normal">
              {accommodation.size}
            </strong>
            <span>Superficie</span>
          </StaggerItem>
        </StaggerReveal>
      </section>

      <section className="bg-ivory px-6 py-20 md:px-[88px] fxl:px-[140px] ">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal className="border-t border-ink/15 pt-7">
            <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">
              Servizi inclusi
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,3.5vw,4rem)] font-normal leading-[1]">
              Dotazioni dell'alloggio.
            </h2>
            <ul className="mt-6 grid gap-3 text-muted">
              {accommodation.amenities.map((item) => (
                <li className="flex items-center gap-3" key={item}>
                  <Icon
                    icon="ph:check-circle"
                    className="shrink-0 text-lg text-olive"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="border-t border-ink/15 pt-7" delay={0.08}>
            <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">
              Extra
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,3.5vw,4rem)] font-normal leading-[1]">
              Servizi su richiesta.
            </h2>
            <ul className="mt-6 grid gap-3 text-muted">
              {accommodation.extras.map((item) => (
                <li className="flex items-center gap-3" key={item}>
                  <Icon
                    icon="ph:sparkle"
                    className="shrink-0 text-lg text-olive"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="grid items-center gap-10 bg-forest px-6 py-20 text-white md:grid-cols-[0.86fr_1.14fr] md:px-[88px]  fxl:px-[140px] ">
        <Reveal>
          <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-white/55">
            La scena
          </p>
          <h2 className="font-serif text-[clamp(2.4rem,4vw,4.4rem)] font-normal leading-[1]">
            {accommodation.claim}
          </h2>
          <p className="mt-6 max-w-[520px] text-base leading-7 text-white/72">
            Una casa vacanza a {siteConfig.locality} deve lasciare spazio al
            soggiorno: mattine lente, rientri dal mare, silenzi di campagna o
            strade chiare del centro storico.
          </p>
        </Reveal>
        <SoftScale className="relative min-h-[360px] overflow-hidden md:min-h-[620px]">
          <Image
            className="object-cover"
            src={accommodation.gallery[2] ?? accommodation.featuredImage}
            alt={`${accommodation.name}, atmosfera e dettagli del soggiorno`}
            fill
            sizes="(max-width: 980px) 100vw, 52vw"
          />
        </SoftScale>
      </section>

      <section className="bg-ivory px-6 py-20 md:px-[88px] md:py-28 fxl:px-[140px] fxl:py-36">
        <div className="grid gap-10 md:grid-cols-[0.82fr_1.18fr]">
          <div className="border-t border-ink/15 pt-7">
            <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">
              Regole della casa
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,3.5vw,4rem)] font-normal leading-[1]">
              Informazioni utili prima di prenotare.
            </h2>
            <ul className="mt-6 grid gap-3 text-muted">
              {accommodation.rules.map((item) => (
                <li className="flex items-center gap-3" key={item}>
                  <Icon
                    icon="ph:info"
                    className="shrink-0 text-lg text-olive"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid min-h-[320px] place-items-center bg-[linear-gradient(135deg,rgba(126,145,136,0.18),rgba(159,93,73,0.08)),repeating-linear-gradient(45deg,rgba(24,35,31,0.08)_0_1px,transparent_1px_22px)] p-8 text-center">
            <div>
              <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">
                Posizione
              </p>
              <h2 className="font-serif text-[clamp(2rem,3vw,3.5rem)] font-normal leading-[1]">
                {accommodation.location}
              </h2>
              <p className="mt-5 inline-flex items-center justify-center gap-2 text-muted">
                <Icon
                  icon="ph:navigation-arrow"
                  className="text-lg text-olive"
                />
                Coordinate demo: {accommodation.coordinates.latitude},{" "}
                {accommodation.coordinates.longitude}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper px-6 py-20 md:px-[88px] md:py-28 fxl:px-[140px] fxl:py-36">
        <Reveal>
          <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">
            FAQ
          </p>
          <h2 className="font-serif text-[clamp(2.2rem,3.5vw,4rem)] font-normal leading-[1]">
            Domande prima di prenotare.
          </h2>
        </Reveal>
        <StaggerReveal className="mt-8 grid gap-3 md:grid-cols-2">
          {accommodationFaqs.map((item) => (
            <StaggerItem key={item.question} className="border border-ink/10 bg-white/40 p-5">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-sm font-black uppercase tracking-[0.08em]">{item.question}</h3>
                <Icon icon="ph:caret-down" className="mt-1 shrink-0 text-olive" />
              </div>
              <p className="mt-4 text-sm leading-7 text-muted">{item.answer}</p>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>
    </main>
  );
}
