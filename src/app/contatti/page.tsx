import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { LocalizedText } from "@/components/LocalizedText";
import { accommodations } from "@/data/accommodations";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contatti",
  description: `Contatta ${siteConfig.name} per una casa vacanza a ${siteConfig.locality}, una villa in affitto o un appartamento turistico vicino al mare, al centro storico o alla campagna.`,
};

export default function ContactPage() {
  return (
    <main>
      <section className="bg-ivory px-6 py-20 md:px-[88px] md:py-28 fxl:px-[140px] fxl:py-36">
        <div className="grid gap-10 md:grid-cols-[0.82fr_1.18fr]">
          <aside className=" pt-7">
            <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">
              <LocalizedText namespace="pages" label="contactDetails" />
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,4vw,3rem)] font-normal leading-[1] pb-4">
              {siteConfig.name}
            </h2>
            <p>{siteConfig.address}</p>
            <p>
              <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
            </p>
            <p>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </p>
            <p>
              <a href={siteConfig.socials.instagram}>Instagram</a> -{" "}
              <a href={siteConfig.socials.facebook}>Facebook</a>
            </p>
            <p className="mt-6 text-sm leading-6 text-muted">
              {siteConfig.companyName}
              <br />
              {siteConfig.vatNumber}
              <br />
              CIN {siteConfig.cin} - CIR {siteConfig.cir}
            </p>
          </aside>
          <BookingForm accommodations={accommodations} />
        </div>
      </section>

      <section className="bg-paper px-6 pb-20 md:px-[88px] md:pb-28 fxl:px-[140px] fxl:pb-36">
        <div className="grid min-h-[420px] place-items-center bg-[linear-gradient(135deg,rgba(126,145,136,0.18),rgba(159,93,73,0.08)),repeating-linear-gradient(45deg,rgba(24,35,31,0.08)_0_1px,transparent_1px_22px)] p-8 text-center">
          <div>
            <p className="mb-4 text-[0.68rem] font-black uppercase tracking-[0.16em] text-olive">
              <LocalizedText namespace="pages" label="contactMap" />
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,4vw,4.5rem)] font-normal leading-[1]">
              {siteConfig.mapLabel}
            </h2>
            <p className="mx-auto mt-5 max-w-[520px] text-muted">
              <LocalizedText namespace="pages" label="contactMapText" />
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
