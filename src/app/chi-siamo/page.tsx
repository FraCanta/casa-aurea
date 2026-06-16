import { Icon } from "@iconify/react";
import type { Metadata } from "next";
import Image from "next/image";
import { Reveal, SoftScale, StaggerItem, StaggerReveal } from "@/components/Motion";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Chi Siamo",
  description: `La filosofia di ${siteConfig.name}: ospitalita autentica, design e cura dei dettagli.`,
};

const values = [
  ["Accoglienza discreta", "Presenza quando serve, liberta quando il soggiorno chiede silenzio."],
  ["Case con carattere", "Ogni dimora racconta materiali, luce, paesaggio e ritmo del luogo."],
  ["Cura operativa", "Informazioni chiare, calendario predisposto e richieste gestite con precisione."],
];

export default function AboutPage() {
  return (
    <main>
      <section className="grid min-h-[720px] items-end bg-paper px-6 pb-16 pt-36 md:grid-cols-[0.82fr_1.18fr] md:px-[88px] md:pb-24 md:pt-48 fxl:px-[140px]">
        <Reveal>
          <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">Chi siamo</p>
          <h1 className="max-w-[860px] font-serif text-[clamp(3rem,6vw,6.8rem)] font-normal leading-[0.95] tracking-[-0.01em] fxl:text-[5.5rem]">
            Ospitalità autentica, senza rumore.
          </h1>
          <p className="mt-6 max-w-[620px] text-base leading-7 text-muted">
            {siteConfig.name} e un template per raccontare strutture ricettive con tono boutique: poche parole, immagini importanti e un percorso di prenotazione chiaro.
          </p>
        </Reveal>
        <SoftScale className="relative mt-10 min-h-[360px] overflow-hidden md:mt-0 md:min-h-[560px]">
          <Image src="/images/stone-bath.png" alt={`Dettagli di ospitalita e materiali naturali di ${siteConfig.name}`} fill priority sizes="(max-width: 900px) 100vw, 52vw" className="object-cover" />
        </SoftScale>
      </section>

      <section className="grid items-center gap-10 bg-ivory px-6 py-20 md:grid-cols-[1fr_1fr] md:px-[88px] md:py-28 fxl:px-[140px] fxl:py-36">
        <SoftScale className="relative min-h-[380px] overflow-hidden md:min-h-[560px]">
          <Image src="/images/kitchen-sea.png" alt={`Spazi conviviali e vista nella struttura ${siteConfig.name}`} fill sizes="(max-width: 900px) 100vw, 52vw" className="object-cover" />
        </SoftScale>
        <Reveal>
          <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">La filosofia</p>
          <h2 className="font-serif text-[clamp(2.4rem,4vw,4.8rem)] leading-[1]">Non vendere una notte. Raccontare un modo di svegliarsi.</h2>
          <p className="mt-6 text-base leading-7 text-muted">
            Il sito e pensato per strutture che vogliono comunicare atmosfera prima ancora dei servizi: una casa vacanza a {siteConfig.locality}, una villa in affitto o un appartamento turistico devono sembrare luoghi da abitare, non prodotti in catalogo.
          </p>
        </Reveal>
      </section>

      <section className="bg-paper px-6 py-20 md:px-[88px] md:py-28 fxl:px-[140px] fxl:py-36">
        <StaggerReveal className="grid gap-8 md:grid-cols-3">
          {values.map(([title, text]) => (
            <StaggerItem key={title} className="border-t border-ink/15 pt-6">
              <Icon icon="ph:sparkle" className="mb-5 text-2xl text-olive" />
              <h2 className="font-serif text-[clamp(2rem,3vw,3.2rem)] leading-none">{title}</h2>
              <p className="mt-5 text-sm leading-7 text-muted">{text}</p>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </section>
    </main>
  );
}
