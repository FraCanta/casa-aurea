import type { Metadata } from "next";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AccommodationBookingCard } from "@/components/AccommodationBookingCard";
import { BookingSearchHydrator } from "@/components/BookingSearchHydrator";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { LocalizedText } from "@/components/LocalizedText";
import { MobileAccommodationBar } from "@/components/MobileAccommodationBar";
import { Reveal, SoftScale, StaggerItem, StaggerReveal } from "@/components/Motion";
import { LodgingStructuredData } from "@/components/StructuredData";
import { accommodations, getAccommodation } from "@/data/accommodations";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedAlternates, localizedPath } from "@/i18n/metadata";
import { hasLocale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

const accommodationFaqs = [
  {
    question: "faqAvailabilityQuestion",
    answer: "faqAvailabilityAnswer",
  },
  {
    question: "faqPriceQuestion",
    answer: "faqPriceAnswer",
  },
  {
    question: "faqTimesQuestion",
    answer: "faqTimesAnswer",
  },
  {
    question: "faqExtrasQuestion",
    answer: "faqExtrasAnswer",
  },
];

type PageProps = {
  params: Promise<{ lang: string; slug: string }>;
  searchParams?: Promise<{
    checkin?: string;
    checkout?: string;
    guests?: string;
  }>;
};

export function generateStaticParams() {
  return accommodations.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const accommodation = getAccommodation(slug);

  if (!accommodation || !hasLocale(lang)) {
    return {};
  }

  const dictionary = await getDictionary(lang);
  const type = dictionary.alloggi[`${accommodation.slug}.type`] ?? accommodation.type;
  const summary = dictionary.alloggi[`${accommodation.slug}.summary`] ?? accommodation.summary;
  const pathname = `/alloggi/${accommodation.slug}`;
  const title = `${accommodation.name} | ${type}`;

  return {
    title,
    description: summary,
    alternates: localizedAlternates(lang, pathname),
    openGraph: {
      title,
      description: summary,
      images: [accommodation.featuredImage],
      type: "website",
      url: localizedPath(lang, pathname),
    },
  };
}

export default async function AccommodationDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const bookingSearch = await searchParams;
  const accommodation = getAccommodation(slug);

  if (!accommodation) {
    notFound();
  }

  return (
    <main className="pb-24 md:pb-0">
      <BookingSearchHydrator
        selectedSlug={accommodation.slug}
        checkin={bookingSearch?.checkin}
        checkout={bookingSearch?.checkout}
        guests={bookingSearch?.guests}
      />
      <LodgingStructuredData accommodation={accommodation} />
      <section className="bg-ivory px-5 pb-0 pt-28 md:px-[88px] md:pt-48 fxl:px-[140px]">
        <GalleryLightbox
          images={[accommodation.featuredImage, ...accommodation.gallery]}
          altBase={`${accommodation.name}, ${accommodation.type} vicino a ${siteConfig.locality}`}
          translationPrefix={accommodation.slug}
        />
        <Reveal className="border-b border-ink/15 py-7 md:py-10">
          <p className="mb-3 text-[0.56rem] font-black uppercase tracking-[0.16em] text-olive md:text-[0.62rem]">
            <LocalizedText namespace="alloggi" label={`${accommodation.slug}.type`} />
          </p>
          <h1 className="max-w-[980px] font-serif text-[2.35rem] font-normal leading-[1] tracking-[-0.01em] md:text-[clamp(3.6rem,5vw,4.5rem)]">
            {accommodation.name}
          </h1>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.66rem] font-bold uppercase tracking-[0.08em] text-muted md:text-[0.72rem]">
            <span className="inline-flex items-center gap-1.5">
              <Icon icon="ph:users" className="text-[0.9rem] text-olive" />
              {accommodation.guests} <LocalizedText namespace="common" label="guests" />
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon icon="ph:bed" className="text-[0.9rem] text-olive" />
              {accommodation.bedrooms} <LocalizedText namespace="common" label="bedrooms" />
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon icon="ph:bathtub" className="text-[0.9rem] text-olive" />
              {accommodation.bathrooms} <LocalizedText namespace="common" label="bathrooms" />
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon icon="ph:ruler" className="text-[0.9rem] text-olive" />
              {accommodation.size}
            </span>
          </div>
        </Reveal>
      </section>

      <section className="bg-ivory px-5 md:px-[88px] fxl:px-[140px]">
        <div className="mb-12 grid gap-8 border-b border-ink/15 py-9 md:mb-16 md:grid-cols-[1fr_320px] md:items-start md:gap-10 fxl:grid-cols-[1fr_390px]">
          <Reveal>
            <p className="max-w-[840px] text-[0.98rem] leading-7 text-muted md:text-[1.02rem] md:leading-8">
              <LocalizedText namespace="alloggi" label={`${accommodation.slug}.description`} />
            </p>
            <div className="mt-8 grid max-w-[880px] gap-6 text-sm text-muted md:grid-cols-2">
              <div>
                <p className="mb-3 text-[0.56rem] font-black uppercase tracking-[0.14em] text-olive">
                  <LocalizedText namespace="pages" label="detailAmenities" />
                </p>
                <ul className="grid gap-2">
                  {accommodation.amenities.map((item, index) => (
                    <li className="flex items-center gap-2" key={item}>
                      <Icon
                        icon="ph:check-circle"
                        className="text-sm shrink-0 text-olive"
                      />
                      <span>
                        <LocalizedText namespace="alloggi" label={`${accommodation.slug}.amenity.${index}`} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-[0.56rem] font-black uppercase tracking-[0.14em] text-olive">
                  <LocalizedText namespace="pages" label="detailExtras" />
                </p>
                <ul className="grid gap-2">
                  {accommodation.extras.map((item, index) => (
                    <li className="flex items-center gap-2" key={item}>
                      <Icon
                        icon="ph:sparkle"
                        className="text-sm shrink-0 text-olive"
                      />
                      <span>
                        <LocalizedText namespace="alloggi" label={`${accommodation.slug}.extra.${index}`} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <SoftScale>
            <AccommodationBookingCard
              accommodation={accommodation}
              accommodations={accommodations}
            />
          </SoftScale>
        </div>
      </section>

      <section className="grid items-center gap-10 bg-forest px-5 py-16 text-white md:grid-cols-[0.86fr_1.14fr] md:px-[88px] md:py-20 fxl:px-[140px]">
        <Reveal>
          <p className="mb-3 text-[0.56rem] font-black uppercase tracking-[0.16em] text-white/55 md:mb-4 md:text-[0.68rem]">
            <LocalizedText namespace="pages" label="detailScene" />
          </p>
          <h2 className="font-serif text-[2rem] font-normal leading-[1.04] md:text-[clamp(2.8rem,4vw,4.1rem)]">
            <LocalizedText namespace="alloggi" label={`${accommodation.slug}.claim`} />
          </h2>
          <p className="mt-6 max-w-[520px] text-base leading-7 text-white/72">
            <LocalizedText namespace="pages" label="detailSceneText" />
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

      <section className="bg-ivory px-5 py-16 md:px-[88px] md:py-24 fxl:px-[140px] fxl:py-32">
        <div className="grid gap-10 md:grid-cols-[0.82fr_1.18fr]">
          <div className="border-t border-ink/15 pt-7">
            <p className="mb-3 text-[0.56rem] font-black uppercase tracking-[0.16em] text-olive md:mb-4 md:text-[0.68rem]">
              <LocalizedText namespace="pages" label="detailRulesEyebrow" />
            </p>
            <h2 className="font-serif text-[1.9rem] font-normal leading-[1.04] md:text-[clamp(2.6rem,3.5vw,3.8rem)]">
              <LocalizedText namespace="pages" label="detailRulesTitle" />
            </h2>
            <ul className="grid gap-3 mt-6 text-muted">
              {accommodation.rules.map((item, index) => (
                <li className="flex items-center gap-3" key={item}>
                  <Icon
                    icon="ph:info"
                    className="text-lg shrink-0 text-olive"
                  />
                  <LocalizedText namespace="alloggi" label={`${accommodation.slug}.rule.${index}`} />
                </li>
              ))}
            </ul>
          </div>
          <div className="grid min-h-[320px] place-items-center bg-[linear-gradient(135deg,rgba(126,145,136,0.18),rgba(159,93,73,0.08)),repeating-linear-gradient(45deg,rgba(24,35,31,0.08)_0_1px,transparent_1px_22px)] p-8 text-center">
            <div>
              <p className="mb-3 text-[0.56rem] font-black uppercase tracking-[0.16em] text-olive md:mb-4 md:text-[0.68rem]">
                <LocalizedText namespace="pages" label="detailPosition" />
              </p>
              <h2 className="font-serif text-[1.8rem] font-normal leading-[1.08] md:text-[clamp(2.3rem,3vw,3.3rem)]">
                <LocalizedText namespace="alloggi" label={`${accommodation.slug}.location`} />
              </h2>
              <p className="inline-flex items-center justify-center gap-2 mt-5 text-muted">
                <Icon
                  icon="ph:navigation-arrow"
                  className="text-lg text-olive"
                />
                <LocalizedText namespace="pages" label="detailCoordinates" />: {accommodation.coordinates.latitude},{" "}
                {accommodation.coordinates.longitude}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper px-5 py-16 md:px-[88px] md:py-24 fxl:px-[140px] fxl:py-32">
        <Reveal>
          <p className="mb-3 text-[0.56rem] font-black uppercase tracking-[0.16em] text-olive md:mb-4 md:text-[0.68rem]">
            <LocalizedText namespace="pages" label="detailFaqEyebrow" />
          </p>
          <h2 className="font-serif text-[1.9rem] font-normal leading-[1.04] md:text-[clamp(2.6rem,3.5vw,3.8rem)]">
            <LocalizedText namespace="pages" label="detailFaqTitle" />
          </h2>
        </Reveal>
        <StaggerReveal className="grid gap-3 mt-8 md:grid-cols-2">
          {accommodationFaqs.map((item) => (
            <StaggerItem key={item.question} className="p-5 border border-ink/10 bg-white/40">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-sm font-black uppercase tracking-[0.08em]">
                  <LocalizedText namespace="pages" label={item.question} />
                </h3>
                <Icon icon="ph:caret-down" className="mt-1 shrink-0 text-olive" />
              </div>
              <p className="mt-4 text-sm leading-7 text-muted">
                <LocalizedText namespace="pages" label={item.answer} />
              </p>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>
      <MobileAccommodationBar
        accommodation={accommodation}
        accommodations={accommodations}
      />
    </main>
  );
}
