import type { Metadata } from "next";
import { LocalizedText } from "@/components/LocalizedText";
import { createLocalizedMetadata, type LocalizedPageProps } from "@/i18n/metadata";

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { lang } = await params;
  return createLocalizedMetadata({ lang, pathname: "/cookie", titleKey: "cookieMetaTitle", descriptionKey: "cookieMetaDescription" });
}

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
