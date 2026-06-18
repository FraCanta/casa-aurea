const fallbackSiteUrl = "https://www.casaaurea.it";

function normalizeSiteUrl(value: string | undefined) {
  const url = value?.trim() || fallbackSiteUrl;
  return url.replace(/\/$/, "");
}

export const siteConfig = {
  name: "Casa Aurea",
  shortName: "Aurea",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  locality: "Località",
  region: "Italia",
  countryCode: "IT",
  address: "Via dell'Ospitalità 18",
  phone: "+39 333 123 4567",
  email: "info@casaaurea.it",
  cin: "IT089013B4SAMPLE01",
  cir: "19089013C200000",
  vatNumber: "P.IVA 01234567890",
  companyName: "Casa Aurea S.r.l.",
  mapLabel: "Località",
  bookingEngineUrl: "https://www.booking.com",
  defaultOgImage: "/opengraph-image.jpg",
  features: {
    demoBooking: true,
    currencySelector: true,
    newsletter: true,
  },
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com"
  },
};

export const navigation = [
  { href: "/alloggi", label: "Le Dimore" },
  { href: "/esperienze", label: "Esperienze" },
  { href: "/territorio", label: "Il Territorio" },
  { href: "/chi-siamo", label: "Chi Siamo" },
  { href: "/contatti", label: "Contatti" }
];
