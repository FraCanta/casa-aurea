import type { Metadata } from "next";
import { AccommodationCard } from "@/components/AccommodationCard";
import { LocalizedText } from "@/components/LocalizedText";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/Motion";
import { accommodations } from "@/data/accommodations";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Alloggi | Case vacanza, ville e appartamenti vicino a ${siteConfig.locality}`,
  description: `Scopri case vacanza, ville in affitto e appartamenti vacanze per un soggiorno vicino a ${siteConfig.locality}.`,
};

export default function AccommodationsPage() {
  return (
    <main>
      <section className="bg-paper px-6 pb-20 pt-36 text-ink md:px-[88px] md:pb-28 md:pt-48 fxl:px-[140px]">
        <Reveal>
          <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">
            <LocalizedText namespace="alloggi" label="archiveEyebrow" />
          </p>
          <h1 className="max-w-[1000px] font-serif text-[clamp(3rem,6vw,6.8rem)] font-normal leading-[0.95] tracking-[-0.01em] fxl:text-[5.5rem]">
            <LocalizedText namespace="alloggi" label="archiveTitle" />
          </h1>
          <p className="mt-6 max-w-[680px] text-base leading-7 text-muted">
            <LocalizedText namespace="alloggi" label="archiveText" />
          </p>
        </Reveal>
      </section>
      <section className="bg-ivory px-6 py-20 md:px-[88px] md:py-28 fxl:px-[140px] fxl:py-36">
        <StaggerReveal className="grid gap-16 fxl:gap-24">
          {accommodations.map((item) => (
            <StaggerItem key={item.slug}>
              <AccommodationCard accommodation={item} />
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>
    </main>
  );
}
