import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Esperienze",
  description: `Esperienze, spiagge, borghi, degustazioni e itinerari per un soggiorno a ${siteConfig.locality}.`,
};

const experiences = [
  [
    "Spiagge e riserve",
    "Mattine lente tra mare chiaro, sentieri costieri e rientri al tramonto.",
  ],
  [
    "Borghi storici",
    "Pietra, piazze, caffe all'aperto e botteghe che raccontano il territorio piu autentico.",
  ],
  [
    "Degustazioni",
    "Cantine, olio, mandorle e tavole locali selezionate per ospiti curiosi.",
  ],
  [
    "Campagna",
    "Strade bianche, ulivi, muretti a secco e silenzi che restano addosso.",
  ],
];

export default function ExperiencesPage() {
  return (
    <main>
      <section className="bg-forest px-6 pb-20 pt-36 text-white md:px-[88px] md:pb-28 md:pt-48 fxl:px-[140px]">
        <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-white/60">
          Esperienze
        </p>
        <h1 className="max-w-[980px] font-serif text-[clamp(3rem,6vw,6.8rem)] font-normal leading-[0.95] tracking-[-0.01em] fxl:text-[5.5rem]">
          Il territorio non fa da sfondo.
        </h1>
        <p className="mt-6 max-w-[720px] text-base leading-7 text-white/72">
          Una pagina dedicata a cosa fare vicino alla struttura: mare, borghi,
          degustazioni, itinerari e momenti da proporre prima della
          prenotazione.
        </p>
      </section>
      <section className="bg-ivory px-6 py-20 md:px-[88px] md:py-28 fxl:px-[140px] fxl:py-36">
        <div className="grid items-center gap-10 md:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[360px] overflow-hidden md:min-h-[620px]">
            <Image
              src="/images/coast-town.png"
              alt={`Borghi e costa vicino a ${siteConfig.locality}`}
              fill
              sizes="(max-width: 980px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="border-t border-ink/15">
            {experiences.map(([title, text]) => (
              <article
                className="grid gap-4 border-b border-ink/15 py-6 md:grid-cols-[0.65fr_1fr]"
                key={title}
              >
                <h2 className="font-serif text-[clamp(1.5rem,2vw,2.4rem)] leading-[1]">
                  {title}
                </h2>
                <p className="text-base leading-7 text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
