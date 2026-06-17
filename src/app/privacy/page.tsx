import type { Metadata } from "next";
import { LocalizedText } from "@/components/LocalizedText";

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
        <LocalizedText namespace="pages" label="privacyText" />
      </p>
    </main>
  );
}
