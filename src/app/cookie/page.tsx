import type { Metadata } from "next";
import { LocalizedText } from "@/components/LocalizedText";

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
        <LocalizedText namespace="pages" label="cookieText" />
      </p>
    </main>
  );
}
