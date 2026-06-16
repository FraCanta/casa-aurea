import { Icon } from "@iconify/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Reveal,
  SoftScale,
  StaggerItem,
  StaggerReveal,
} from "@/components/Motion";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Il Territorio",
  description: `Territorio, mare, borghi e campagne intorno a ${siteConfig.locality}.`,
};

const places = [
  [
    "Calette e mare lento",
    "Acque chiare, sentieri costieri e giornate da vivere senza programmi rigidi.",
  ],
  [
    "Borghi storici",
    "Piazze, pietra chiara, botteghe e piccoli ristoranti per assaggiare il ritmo locale.",
  ],
  [
    "Campagne e natura",
    "Ulivi, muretti a secco, tramonti morbidi e strade secondarie da percorrere piano.",
  ],
];

export default function TerritoryPage() {
  return (
    <main>
      <section className="grid min-h-[720px] items-end bg-paper px-6 pb-16 pt-36 md:grid-cols-2 md:px-[88px] md:pb-24 md:pt-48 fxl:px-[140px]">
        <Reveal>
          <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">
            Il territorio
          </p>
          <h1 className="max-w-[860px] font-serif text-[clamp(3rem,6vw,6.8rem)] font-normal leading-[0.95] tracking-[-0.01em] fxl:text-[5.5rem]">
            Fuori dalla porta, il viaggio continua.
          </h1>
          <p className="mt-6 max-w-[620px] text-base leading-7 text-muted ">
            Una pagina pensata per raccontare cosa rende speciale un soggiorno
            vicino a {siteConfig.locality}: mare, borghi, natura, sapori e
            itinerari su misura.
          </p>
        </Reveal>
        <SoftScale className="relative mt-10 min-h-[360px] overflow-hidden md:mt-0 md:min-h-[560px]">
          <Image
            src="/images/coast-town.png"
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
                {title}
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted">{text}</p>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>

      <section className="grid items-center gap-10 bg-paper px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:px-[88px] md:py-28 fxl:px-[140px] fxl:py-36">
        <SoftScale className="relative min-h-[360px] overflow-hidden md:min-h-[520px]">
          <Image
            src="/images/clear-cove.png"
            alt={`Mare e calette vicino a ${siteConfig.locality}`}
            fill
            sizes="(max-width: 900px) 100vw, 52vw"
            className="object-cover"
          />
        </SoftScale>
        <Reveal>
          <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">
            Itinerari
          </p>
          <h2 className="font-serif text-[clamp(2.4rem,4vw,4.8rem)] leading-[1]">
            Esperienze leggere, costruite intorno al tuo tempo.
          </h2>
          <p className="mt-6 text-base leading-7 text-muted">
            Il template puo ospitare consigli locali, distanze, mappe, partner,
            guide e percorsi consigliati: dalla spiaggia al borgo, dalla
            degustazione alla cena privata.
          </p>
          <Link
            href="/esperienze"
            className="mt-7 inline-flex items-center gap-3 text-[0.68rem] font-black uppercase tracking-[0.13em]"
          >
            Scopri le esperienze <Icon icon="ph:arrow-right" />
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
