import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Informativa privacy del sito e gestione delle richieste di soggiorno.",
};

export default function PrivacyPage() {
  return (
    <main className="page-hero">
      <p className="eyebrow">Privacy</p>
      <h1>Privacy Policy</h1>
      <p className="lead">
        Template predisposto per inserire l'informativa sul trattamento dei dati personali,
        richieste di disponibilita, newsletter e comunicazioni con gli ospiti.
      </p>
    </main>
  );
}
