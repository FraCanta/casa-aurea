import { Icon } from "@iconify/react";
import Image from "next/image";
import { LocalizedLink } from "@/components/LocalizedLink";
import { HeroBookingPanel } from "@/components/HeroBookingPanel";
import {
  Reveal,
  SoftScale,
  StaggerItem,
  StaggerReveal,
} from "@/components/Motion";
import { LocalizedText } from "@/components/LocalizedText";
import { PriceText } from "@/components/PriceText";
import { LodgingStructuredData } from "@/components/StructuredData";
import { StayFinder } from "@/components/StayFinder";
import { accommodations } from "@/data/accommodations";
import { hasLocale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

const stays = accommodations.slice(0, 3);

const experienceItems = [
  ["experienceSeaTitle", "experienceSeaText"],
  ["experienceVillagesTitle", "experienceVillagesText"],
  ["experienceTasteTitle", "experienceTasteText"],
  ["experienceSlowTitle", "experienceSlowText"],
  ["experienceTailorTitle", "experienceTailorText"],
];

const reviews = [
  ["reviewOne", "reviewOneAuthor"],
  ["reviewTwo", "reviewTwoAuthor"],
  ["reviewThree", "reviewThreeAuthor"],
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "it";

  return (
    <main className="noto-home">
      <LodgingStructuredData locale={locale} />

      <section className="relative flex min-h-svh flex-col justify-center overflow-visible bg-[#12150f] pb-20 text-white md:min-h-[720px] md:justify-start md:pb-0 fxl:min-h-[860px]">
        <Image
          src="/images/hero-pool-sea.webp"
          alt={`Dimora autentica con piscina e vista a ${siteConfig.locality}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.72] saturate-[0.85]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,15,12,0.32),rgba(12,15,12,0.14)_42%,rgba(12,15,12,0.48)),linear-gradient(90deg,rgba(12,15,12,0.64),rgba(12,15,12,0.34)_36%,rgba(12,15,12,0.08)_76%)]" />
        <Reveal className="relative z-10 mx-auto w-[min(430px,calc(100%-2rem))] pt-24 text-center md:w-[min(760px,calc(100%-11rem))] md:pt-[220px] fxl:w-[900px] fxl:pt-[290px]">
          <h1 className="mb-5 text-[0.8rem] font-black uppercase tracking-[0.22em] text-white/80">
            <LocalizedText namespace="home" label="eyebrow" />
          </h1>
          <h2 className="font-serif text-[2.4rem] font-normal md:text-[4.7rem] xl:text-[4rem] leading-none 2xl:text-[4.2rem] fxl:text-[5rem]">
            <LocalizedText namespace="home" label="title" />
          </h2>
          <p className="mx-auto mt-5 w-[min(390px,100%)] text-[0.9rem] leading-[1.55] text-white/85 2xl:w-[520px] 2xl:text-[1.05rem]">
            <LocalizedText namespace="home" label="subtitle" />
          </p>
        </Reveal>

        <HeroBookingPanel accommodations={accommodations} />
      </section>

      <section className="grid items-center gap-10 bg-[#fbf8f1] px-6 py-20 md:grid-cols-[0.82fr_1.18fr] md:px-22 md:py-28 fxl:px-35 fxl:py-36">
        <Reveal className="max-w-130">
          <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#8e8456]">
            <LocalizedText namespace="home" label="philosophyEyebrow" />
          </p>
          <h2 className="font-serif text-4xl font-normal 2xl:text-5xl fxl:text-6xl">
            <LocalizedText namespace="home" label="philosophyTitle" />
          </h2>
          <p className="mt-6 text-base  text-[#5d5a50]">
            <LocalizedText namespace="home" label="philosophyText" />
          </p>
          <LocalizedLink href="/chi-siamo" className="btn btn-link mt-7 text-[#171b14]">
            <LocalizedText namespace="home" label="learnMore" />{" "}
            <Icon icon="ph:arrow-right" />
          </LocalizedLink>
        </Reveal>
        <SoftScale className="relative overflow-hidden min-h-75 md:min-h-115">
          <Image
            src="/images/courtyard-pool.webp"
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
              <LocalizedText namespace="home" label="staysEyebrow" />
            </p>
            <h2 className="font-serif text-4xl font-normal 2xl:text-5xl fxl:text-6xl">
              <LocalizedText namespace="home" label="staysTitle" />
            </h2>
          </div>
          <LocalizedLink href="/alloggi" className="btn btn-link text-[#171b14]">
            <LocalizedText namespace="home" label="viewAll" />{" "}
            <Icon icon="ph:arrow-right" />
          </LocalizedLink>
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
              <LocalizedLink
                className="flex flex-col p-5 gap-x-4 gap-y-2"
                href={`/alloggi/${stay.slug}`}
              >
                <strong className="text-base font-black uppercase ">
                  {stay.name}
                </strong>
                <span className="text-sm text-[#5d5a50]">
                  <LocalizedText
                    namespace="alloggi"
                    label={`${stay.slug}.location`}
                  />
                </span>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-[#5d5a50]">
                  <span className="inline-flex items-center gap-1.5">
                    <Icon icon="ph:users" className="text-[#8e8456]" />
                    {stay.guests}{" "}
                    <LocalizedText namespace="common" label="guests" />
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Icon icon="ph:bed" className="text-[#8e8456]" />
                    {stay.bedrooms}{" "}
                    <LocalizedText namespace="common" label="bedrooms" />
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Icon icon="ph:bathtub" className="text-[#8e8456]" />
                    {stay.bathrooms}{" "}
                    <LocalizedText namespace="common" label="bathrooms" />
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between gap-4 border-t border-[#171b14]/10 pt-4">
                  <PriceText
                    amount={stay.priceFrom}
                    perNight
                    className="text-[0.62rem] font-black uppercase tracking-[0.12em] text-[#8e8456]"
                  />
                  <small className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#8e8456]">
                    <Icon icon="ph:arrow-right" />
                  </small>
                </div>
              </LocalizedLink>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>

      <StayFinder accommodations={accommodations} />

      <section className="grid bg-[#fbf8f1] px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:px-[88px] md:py-28 fxl:px-[140px] fxl:py-36">
        <SoftScale className="relative min-h-77.5 overflow-hidden md:min-h-117.5">
          <Image
            src="/images/coast-town.webp"
            alt={`Territorio, borghi e mare vicino a ${siteConfig.locality}`}
            fill
            sizes="(max-width: 900px) 100vw, 52vw"
          />
        </SoftScale>
        <Reveal className="pt-10 md:p-16 fxl:p-20">
          <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#8e8456]">
            <LocalizedText namespace="home" label="experiencesEyebrow" />
          </p>
          <h2 className="font-serif text-4xl font-normal 2xl:text-5xl fxl:text-6xl">
            <LocalizedText namespace="home" label="experiencesTitle" />
          </h2>
          <p className="mt-6 text-base leading-7 text-[#5d5a50]">
            <LocalizedText namespace="home" label="experiencesText" />
          </p>
          <LocalizedLink href="/esperienze" className="btn btn-link mt-7 text-[#171b14]">
            <LocalizedText namespace="home" label="experiencesCta" />{" "}
            <Icon icon="ph:arrow-right" />
          </LocalizedLink>
        </Reveal>
        <StaggerReveal className="grid mt-10 gap-7 md:col-span-2 md:grid-cols-5">
          {experienceItems.map(([title, text]) => (
            <StaggerItem className="grid gap-2" key={title}>
              <strong className="text-sm font-bold">
                <LocalizedText namespace="home" label={title} />
              </strong>
              <span className="text-sm leading-6 text-[#5d5a50]">
                <LocalizedText namespace="home" label={text} />
              </span>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>

      <section className="grid gap-10 bg-[#f0ebe2] px-6 py-20 md:grid-cols-[0.75fr_1.25fr] md:px-[88px] md:py-28 fxl:px-[140px] fxl:py-36">
        <Reveal>
          <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#8e8456]">
            <LocalizedText namespace="home" label="reviewsEyebrow" />
          </p>
          <h2 className="font-serif text-[clamp(2.4rem,4vw,4.4rem)] font-normal leading-[1] tracking-[-0.01em] 2xl:text-5xl fxl:text-6xl">
            <LocalizedText namespace="home" label="reviewsTitle" />
          </h2>
        </Reveal>
        <StaggerReveal className="grid gap-5 md:grid-cols-3">
          {reviews.map(([text, author]) => (
            <StaggerItem className="m-0 bg-white/60 p-7" key={author}>
              <p className="text-[0.95rem] leading-7 text-[#4f4d45]">
                <LocalizedText namespace="home" label={text} />
              </p>
              <strong className="mt-5 block text-[0.72rem] tracking-[0.08em]">
                <LocalizedText namespace="home" label={author} />
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
                  Richiedi disponibilità <Icon icon="ph:arrow-right" />
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
