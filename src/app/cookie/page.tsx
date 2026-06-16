import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Informativa cookie del sito per case vacanza, ville e appartamenti turistici.",
};

export default function CookiePage() {
  return (
    <main className="page-hero">
      <p className="eyebrow">Cookie</p>
      <h1>Cookie Policy</h1>
      <p className="lead">
        Area predisposta per descrivere cookie tecnici, strumenti analytics,
        preferenze di consenso e integrazioni esterne di booking o mappe.
      </p>
    </main>
  );
}
