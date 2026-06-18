import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/CheckoutFlow";
import { accommodations, getAccommodation } from "@/data/accommodations";
import { createLocalizedMetadata } from "@/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return createLocalizedMetadata({
    lang,
    pathname: "/checkout",
    titleKey: "checkoutMetaTitle",
    descriptionKey: "checkoutMetaDescription",
    index: false,
  });
}

type CheckoutPageProps = {
  searchParams?: Promise<{
    slug?: string;
    checkin?: string;
    checkout?: string;
    guests?: string;
  }>;
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const params = await searchParams;
  const accommodation =
    getAccommodation(params?.slug ?? "") ?? accommodations[0];

  return (
    <CheckoutFlow
      accommodation={accommodation}
      checkin={params?.checkin}
      checkout={params?.checkout}
      guests={params?.guests}
    />
  );
}
