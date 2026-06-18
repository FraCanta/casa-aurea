import { Icon } from "@iconify/react";
import type { Metadata } from "next";
import Image from "next/image";
import { LocalizedLink } from "@/components/LocalizedLink";
import { LocalizedText } from "@/components/LocalizedText";
import {
  Reveal,
  SoftScale,
  StaggerItem,
  StaggerReveal,
} from "@/components/Motion";
import { siteConfig } from "@/lib/site";
import { createLocalizedMetadata, type LocalizedPageProps } from "@/i18n/metadata";

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { lang } = await params;
  return createLocalizedMetadata({ lang, pathname: "/territorio", titleKey: "territoryMetaTitle", descriptionKey: "territoryMetaDescription" });
}

const places = [
  ["territoryPlaceOneTitle", "territoryPlaceOneText"],
  ["territoryPlaceTwoTitle", "territoryPlaceTwoText"],
  ["territoryPlaceThreeTitle", "territoryPlaceThreeText"],
];

export default function TerritoryPage() {
  return (
    <main>
      <section className="grid min-h-[720px] items-end bg-paper px-6 pb-16 pt-36 md:grid-cols-2 md:px-[88px] md:pb-24 md:pt-48 fxl:px-[140px]">
        <Reveal>
          <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">
            <LocalizedText namespace="pages" label="territoryEyebrow" />
          </p>
          <h1 className="max-w-[860px] font-serif text-[clamp(3rem,6vw,6.8rem)] font-normal leading-[0.95] tracking-[-0.01em] fxl:text-[5.5rem]">
            <LocalizedText namespace="pages" label="territoryTitle" />
          </h1>
          <p className="mt-6 max-w-[620px] text-base leading-7 text-muted ">
            <LocalizedText namespace="pages" label="territoryIntro" />
          </p>
        </Reveal>
        <SoftScale className="relative mt-10 min-h-[360px] overflow-hidden md:mt-0 md:min-h-[560px]">
          <Image
            src="/images/coast-town.webp"
            alt={`Vista del territorio vicino a ${siteConfig.locality}`}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 52vw"
            className="object-cover"
          />
        </SoftScale>
      </section>

      <section className="bg-ivory px-6 py-20 md:px-[88px] md:py-28 fxl:px-[140px] fxl:py-36">
        <StaggerReveal className="grid gap-8 md:grid-cols-3">
          {places.map(([title, text]) => (
            <StaggerItem key={title} className="border-t border-ink/15 pt-6">
              <Icon
                icon="ph:map-trifold"
                className="mb-5 text-2xl text-olive"
              />
              <h2 className="font-serif text-[clamp(2rem,3vw,3.2rem)] leading-none">
                <LocalizedText namespace="pages" label={title} />
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted">
                <LocalizedText namespace="pages" label={text} />
              </p>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>

      <section className="grid items-center gap-10 bg-paper px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:px-[88px] md:py-28 fxl:px-[140px] fxl:py-36">
        <SoftScale className="relative min-h-[360px] overflow-hidden md:min-h-[520px]">
          <Image
            src="/images/clear-cove.webp"
            alt={`Mare e calette vicino a ${siteConfig.locality}`}
            fill
            sizes="(max-width: 900px) 100vw, 52vw"
            className="object-cover"
          />
        </SoftScale>
        <Reveal>
          <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">
            <LocalizedText namespace="pages" label="territoryItinerariesEyebrow" />
          </p>
          <h2 className="font-serif text-[clamp(2.4rem,4vw,4.8rem)] leading-[1]">
            <LocalizedText namespace="pages" label="territoryItinerariesTitle" />
          </h2>
          <p className="mt-6 text-base leading-7 text-muted">
            <LocalizedText namespace="pages" label="territoryItinerariesText" />
          </p>
          <LocalizedLink
            href="/esperienze"
            className="mt-7 inline-flex items-center gap-3 text-[0.68rem] font-black uppercase tracking-[0.13em]"
          >
            <LocalizedText namespace="home" label="experiencesCta" /> <Icon icon="ph:arrow-right" />
          </LocalizedLink>
        </Reveal>
      </section>
    </main>
  );
}
