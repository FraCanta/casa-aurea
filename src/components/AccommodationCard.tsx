import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import type { Accommodation } from "@/data/accommodations";

const availabilityLabel = {
  available: "Disponibile",
  unavailable: "Non disponibile",
  request: "Su richiesta"
};

export function AccommodationCard({ accommodation }: { accommodation: Accommodation }) {
  return (
    <article className="grid items-end gap-8 md:grid-cols-[1.08fr_0.92fr] md:gap-14 fxl:gap-20">
      <Link className="relative min-h-[330px] overflow-hidden md:min-h-[560px]" href={`/alloggi/${accommodation.slug}`}>
        <Image
          src={accommodation.featuredImage}
          alt={`${accommodation.name}, ${accommodation.type} a ${accommodation.location}`}
          fill
          sizes="(max-width: 900px) 100vw, 58vw"
          className="object-cover transition-transform duration-700 hover:scale-[1.03]"
        />
      </Link>
      <div className="pb-4">
        <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">{accommodation.type}</p>
        <h2 className="font-serif text-[clamp(2rem,3.5vw,4rem)] font-normal leading-[1] tracking-[-0.01em]">{accommodation.name}</h2>
        <p className="mt-5 font-serif text-[clamp(1.25rem,1.8vw,2rem)] leading-[1.12]">{accommodation.claim}</p>
        <p className="mt-4 max-w-[520px] text-base leading-7 text-muted">{accommodation.summary}</p>
        <div className="my-7 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 border-b border-ink/15 pb-1 text-[0.78rem] uppercase tracking-[0.08em] text-muted">
            <Icon icon="ph:users" className="text-base text-olive" />
            {accommodation.guests} ospiti
          </span>
          <span className="inline-flex items-center gap-2 border-b border-ink/15 pb-1 text-[0.78rem] uppercase tracking-[0.08em] text-muted">
            <Icon icon="ph:bed" className="text-base text-olive" />
            {accommodation.bedrooms} camere
          </span>
          <span className="inline-flex items-center gap-2 border-b border-ink/15 pb-1 text-[0.78rem] uppercase tracking-[0.08em] text-muted">
            <Icon icon="ph:bathtub" className="text-base text-olive" />
            {accommodation.bathrooms} bagni
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <span className="text-[0.76rem] font-black uppercase tracking-[0.1em] text-muted">
            {availabilityLabel[accommodation.availability]}
          </span>
          <Link className="btn btn-link text-olive" href={`/alloggi/${accommodation.slug}`}>
            Esplora la dimora
            <Icon icon="ph:arrow-right" />
          </Link>
        </div>
      </div>
    </article>
  );
}
