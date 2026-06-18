import type { Metadata } from "next";
import { LocalizedText } from "@/components/LocalizedText";
import { createLocalizedMetadata, type LocalizedPageProps } from "@/i18n/metadata";

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { lang } = await params;
  return createLocalizedMetadata({ lang, pathname: "/privacy", titleKey: "privacyMetaTitle", descriptionKey: "privacyMetaDescription" });
}

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
