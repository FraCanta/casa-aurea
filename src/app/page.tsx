import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { BookingDrawer } from "@/components/BookingDrawer";
import { BookingForm } from "@/components/BookingForm";
import { HeroBookingPanel } from "@/components/HeroBookingPanel";
import {
  Reveal,
  SoftScale,
  StaggerItem,
  StaggerReveal,
} from "@/components/Motion";
import { LodgingStructuredData } from "@/components/StructuredData";
import { StayFinder } from "@/components/StayFinder";
import { accommodations } from "@/data/accommodations";
import { siteConfig } from "@/lib/site";

const stays = accommodations.slice(0, 3);

const experienceItems = [
  ["Spiagge e mare", "Acque cristalline e calette nascoste a pochi minuti."],
  ["Borghi barocchi", "Architetture straordinarie e atmosfere uniche."],
  ["Degustazioni", "Vini locali, olio d'eccellenza e sapori autentici."],
  ["Ritmi rilassati", "Slow living, natura e tempo di qualita."],
  ["Attivita su misura", "Esperienze pensate per te, tra cultura e avventura."],
];

const reviews = [
  [
    "Un luogo che profuma di bellezza e autenticita. Ogni dettaglio e curato con amore.",
    "Martina, Milano",
  ],
  [
    "Posizione perfetta, dimora splendida e accoglienza impeccabile. Un'esperienza indimenticabile.",
    "Luca, Torino",
  ],
  [
    "Abbiamo amato la tranquillita, il design e la vicinanza al mare. Consigliatissimo.",
    "Chiara, Roma",
  ],
];

export default function HomePage() {
  return (
    <main className="noto-home">
      <LodgingStructuredData />

      <section className="relative flex min-h-svh flex-col justify-center overflow-visible bg-[#12150f] pb-20 text-white md:min-h-[720px] md:justify-start md:pb-0 fxl:min-h-[860px]">
        <Image
          src="/images/hero-pool-sea.png"
          alt={`Dimora autentica con piscina e vista a ${siteConfig.locality}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.72] saturate-[0.85]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,15,12,0.32),rgba(12,15,12,0.14)_42%,rgba(12,15,12,0.48)),linear-gradient(90deg,rgba(12,15,12,0.64),rgba(12,15,12,0.34)_36%,rgba(12,15,12,0.08)_76%)]" />
        <Reveal className="relative z-10 mx-auto w-[min(430px,calc(100%-2rem))] pt-24 text-center md:w-[min(760px,calc(100%-11rem))] md:pt-[220px] fxl:w-[900px] fxl:pt-[290px]">
          <h1 className="mb-5 text-[0.8rem] font-black uppercase tracking-[0.22em] text-white/80">
            Casa Aurea
          </h1>
          <h2 className="font-serif text-5xl font-normal md:text-[4.7rem] 2xl:text-[6rem] fxl:text-[5rem]">
            La tua prossima
            <br />
            vacanza comincia da qui.
          </h2>
          <p className="mx-auto mt-5 w-[min(390px,100%)] text-[0.9rem] leading-[1.55] text-white/85 2xl:w-[520px] 2xl:text-[1.05rem]">
            Dimore accoglienti, esperienze locali e disponibilita in tempo reale
            per scegliere subito il tuo soggiorno.
          </p>
        </Reveal>

        <HeroBookingPanel accommodations={accommodations} />
      </section>

      <section className="grid items-center gap-10 bg-[#fbf8f1] px-6 py-20 md:grid-cols-[0.82fr_1.18fr] md:px-22 md:py-28 fxl:px-35 fxl:py-36">
        <Reveal className="max-w-130">
          <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#8e8456]">
            La nostra filosofia
          </p>
          <h2 className="font-serif text-4xl font-normal 2xl:text-5xl fxl:text-6xl">
            Ospitalità che lascia il segno.
          </h2>
          <p className="mt-6 text-base  text-[#5d5a50]">
            Crediamo nei dettagli, nell'accoglienza sincera e nei luoghi che
            raccontano storie vere. Le nostre dimore sono spazi da vivere, non
            semplici posti in cui dormire.
          </p>
          <Link href="/chi-siamo" className="btn btn-link mt-7 text-[#171b14]">
            Scopri di più <Icon icon="ph:arrow-right" />
          </Link>
        </Reveal>
        <SoftScale className="relative overflow-hidden min-h-75 md:min-h-115">
          <Image
            src="/images/courtyard-pool.png"
            alt={`Corte con piscina e pietra naturale a ${siteConfig.locality}`}
            fill
            sizes="(max-width: 900px) 100vw, 52vw"
            className="object-cover aspect-video"
          />
        </SoftScale>
      </section>

      <section className="bg-[#f0ebe2] px-6 py-20 md:px-22 md:py-28 fxl:px-35 fxl:py-36">
        <div className="flex flex-col items-start gap-5 mb-9 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#8e8456]">
              Dove vorresti soggiornare?
            </p>
            <h2 className="font-serif text-4xl font-normal 2xl:text-5xl fxl:text-6xl">
              Le dimore
            </h2>
          </div>
          <Link href="/alloggi" className="btn btn-link text-[#171b14]">
            Vedi tutte <Icon icon="ph:arrow-right" />
          </Link>
        </div>
        <StaggerReveal className="grid gap-5 md:grid-cols-3">
          {stays.map((stay) => (
            <StaggerItem
              className="border border-[#171b14]/15 bg-white/35"
              key={stay.slug}
            >
              <div className="relative min-h-[260px] overflow-hidden fxl:min-h-[360px]">
                <Image
                  src={stay.featuredImage}
                  alt={`${stay.name}, ${stay.type} a ${siteConfig.locality}`}
                  fill
                  sizes="(max-width: 900px) 100vw, 31vw"
                />
              </div>
              <Link
                className="flex flex-col p-5 gap-x-4 gap-y-2"
                href={`/alloggi/${stay.slug}`}
              >
                <strong className="text-base font-black uppercase ">
                  {stay.name}
                </strong>
                <span className="text-sm text-[#5d5a50]">{stay.location}</span>
                <small className="mt-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#8e8456] self-end">
                  <Icon icon="ph:arrow-right" />
                </small>
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>

      <StayFinder accommodations={accommodations} />

      <section className="grid bg-[#fbf8f1] px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:px-[88px] md:py-28 fxl:px-[140px] fxl:py-36">
        <SoftScale className="relative min-h-77.5 overflow-hidden md:min-h-117.5">
          <Image
            src="/images/coast-town.png"
            alt={`Territorio, borghi e mare vicino a ${siteConfig.locality}`}
            fill
            sizes="(max-width: 900px) 100vw, 52vw"
          />
        </SoftScale>
        <Reveal className="pt-10 md:p-16 fxl:p-20">
          <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#8e8456]">
            Esperienze
          </p>
          <h2 className="font-serif text-4xl font-normal 2xl:text-5xl fxl:text-6xl">
            Il territorio, da vivere.
          </h2>
          <p className="mt-6 text-base leading-7 text-[#5d5a50]">
            Borghi barocchi, spiagge dorate, sapori autentici e tradizioni senza
            tempo.
          </p>
          <Link href="/esperienze" className="btn btn-link mt-7 text-[#171b14]">
            Scopri le esperienze <Icon icon="ph:arrow-right" />
          </Link>
        </Reveal>
        <StaggerReveal className="grid mt-10 gap-7 md:col-span-2 md:grid-cols-5">
          {experienceItems.map(([title, text]) => (
            <StaggerItem className="grid gap-2" key={title}>
              <strong className="text-sm font-bold">{title}</strong>
              <span className="text-sm leading-6 text-[#5d5a50]">{text}</span>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>

      <section className="grid gap-10 bg-[#f0ebe2] px-6 py-20 md:grid-cols-[0.75fr_1.25fr] md:px-[88px] md:py-28 fxl:px-[140px] fxl:py-36">
        <Reveal>
          <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#8e8456]">
            Parole di chi ci ha scelto
          </p>
          <h2 className="font-serif text-[clamp(2.4rem,4vw,4.4rem)] font-normal leading-[1] tracking-[-0.01em] 2xl:text-5xl fxl:text-6xl">
            Ospiti felici, ricordi autentici.
          </h2>
        </Reveal>
        <StaggerReveal className="grid gap-5 md:grid-cols-3">
          {reviews.map(([text, author]) => (
            <StaggerItem className="m-0 bg-white/60 p-7" key={author}>
              <p className="text-[0.95rem] leading-7 text-[#4f4d45]">{text}</p>
              <strong className="mt-5 block text-[0.72rem] tracking-[0.08em]">
                {author}
              </strong>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>

      {/* <section
        className="grid gap-10 bg-[#fbf8f1] px-6 py-20 md:grid-cols-[0.75fr_1.25fr] md:px-[88px] md:py-28 fxl:px-[140px] fxl:py-36"
        id="booking"
      >
        <Reveal>
          <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#8e8456]">
            Prenota il tuo soggiorno
          </p>
          <h2 className="font-serif text-[clamp(2.4rem,4vw,4.4rem)] font-normal leading-[1] tracking-[-0.01em] 2xl:text-5xl fxl:text-6xl">
            Richiedi disponibilità o prenota ora.
          </h2>
          <p className="mt-6 max-w-[440px] text-base leading-7 text-[#5d5a50]">
            Scegli la modalità che preferisci.
          </p>
          <div className="grid gap-3 mt-8">
            <BookingDrawer
              accommodations={accommodations}
              trigger={
                <span className="justify-between w-full btn btn-secondary">
                  Prenota ora <Icon icon="ph:arrow-right" />
                </span>
              }
            />
            <BookingDrawer
              accommodations={accommodations}
              trigger={
                <span className="justify-between w-full btn btn-secondary">
                  Richiedi disponibilita <Icon icon="ph:arrow-right" />
                </span>
              }
            />
          </div>
        </Reveal>
        <SoftScale>
          <BookingForm accommodations={accommodations} />
        </SoftScale>
      </section> */}
    </main>
  );
}
