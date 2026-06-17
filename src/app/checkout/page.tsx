import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/CheckoutFlow";
import { accommodations, getAccommodation } from "@/data/accommodations";

export const metadata: Metadata = {
  title: "Checkout soggiorno | Casa Aurea",
  description:
    "Checkout dimostrativo per richiesta disponibilità o pagamento simulato di una casa vacanza boutique.",
};

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
