import { Icon } from "@iconify/react";
import type { Metadata } from "next";
import Image from "next/image";
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
  return createLocalizedMetadata({ lang, pathname: "/chi-siamo", titleKey: "aboutMetaTitle", descriptionKey: "aboutMetaDescription" });
}

const values = [
  ["aboutValueOneTitle", "aboutValueOneText"],
  ["aboutValueTwoTitle", "aboutValueTwoText"],
  ["aboutValueThreeTitle", "aboutValueThreeText"],
];

export default function AboutPage() {
  return (
    <main>
      <section className="grid h-svh items-center bg-paper px-6 pb-16 pt-24 md:grid-cols-[0.82fr_1.18fr] md:px-22 md:pb-24 md:pt-32 fxl:px-35">
        <Reveal>
          <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">
            <LocalizedText namespace="pages" label="aboutEyebrow" />
          </p>
          <h1 className="max-w-[860px] font-serif text-[2.5rem] font-normal leading-[0.95] tracking-[-0.01em] xl:text-[4.5rem] fxl:text-[5.5rem]">
            <LocalizedText namespace="pages" label="aboutTitle" />
          </h1>
          <p className="mt-6 max-w-[620px] text-base leading-7 text-muted">
            <LocalizedText namespace="pages" label="aboutIntro" />
          </p>
        </Reveal>
        <SoftScale className="relative mt-10 min-h-[360px] overflow-hidden md:mt-0 md:min-h-[560px]">
          <Image
            src="/images/stone-bath.webp"
            alt={`Dettagli di ospitalità e materiali naturali di ${siteConfig.name}`}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 52vw"
            className="object-cover"
          />
        </SoftScale>
      </section>

      <section className="grid items-center gap-10 bg-ivory px-6 py-20 md:grid-cols-[1fr_1fr] md:px-[88px] md:py-28 fxl:px-[140px] fxl:py-36">
        <SoftScale className="relative min-h-[380px] overflow-hidden md:min-h-[560px]">
          <Image
            src="/images/kitchen-sea.webp"
            alt={`Spazi conviviali e vista nella struttura ${siteConfig.name}`}
            fill
            sizes="(max-width: 900px) 100vw, 52vw"
            className="object-cover"
          />
        </SoftScale>
        <Reveal>
          <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">
            <LocalizedText namespace="pages" label="aboutPhilosophyEyebrow" />
          </p>
          <h2 className="font-serif text-[clamp(2.4rem,4vw,4.8rem)] leading-[1]">
            <LocalizedText namespace="pages" label="aboutPhilosophyTitle" />
          </h2>
          <p className="mt-6 text-base leading-7 text-muted">
            <LocalizedText namespace="pages" label="aboutPhilosophyText" />
          </p>
        </Reveal>
      </section>

      <section className="bg-paper px-6 py-20 md:px-[88px] md:py-28 fxl:px-[140px] fxl:py-36">
        <StaggerReveal className="grid gap-8 md:grid-cols-3">
          {values.map(([title, text]) => (
            <StaggerItem key={title} className="border-t border-ink/15 pt-6">
              <Icon icon="ph:sparkle" className="mb-5 text-2xl text-olive" />
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
    </main>
  );
}
