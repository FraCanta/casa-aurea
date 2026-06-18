export type AvailabilityState = "available" | "unavailable" | "request";

export type Accommodation = {
  slug: string;
  name: string;
  type:
    | "Casa vacanza"
    | "Villa in affitto"
    | "Appartamento vacanze"
    | "Camera boutique";
  claim: string;
  summary: string;
  description: string;
  location: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  size: string;
  priceFrom: number;
  availability: AvailabilityState;
  externalBookingUrl: string;
  featuredImage: string;
  gallery: string[];
  amenities: string[];
  extras: string[];
  rules: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  matchProfile: {
    experiences: Array<
      "mare" | "centro-storico" | "relax" | "famiglia" | "food" | "natura"
    >;
    view: "mare" | "giardino" | "centro" | "campagna";
    hasPool: boolean;
    petsAllowed: boolean;
    proximity: Array<"mare" | "centro" | "natura">;
  };
  externalCalendar: {
    provider: "airbnb" | "booking" | "ical" | "manual";
    syncEnabled: boolean;
    calendarUrl?: string;
    lastSync?: string;
  };
};

export const accommodations: Accommodation[] = [
  {
    slug: "villa-aurora",
    name: "Villa Aurora",
    type: "Villa in affitto",
    claim: "Privacy, piscina e tramonti morbidi tra ulivi e mare.",
    summary:
      "Villa indipendente per famiglie e gruppi, con giardino privato, piscina panoramica e zona pranzo esterna.",
    description:
      "Villa Aurora è una villa in affitto pensata per chi cerca un soggiorno vicino alla località senza rinunciare a spazio, silenzio e comfort. Gli ambienti interni sono luminosi, la cucina è attrezzata e la zona notte garantisce privacy anche a due famiglie. All'esterno, piscina, veranda e giardino accompagnano giornate lente tra mare, borghi e cene sotto le stelle.",
    location: "Campagna panoramica, 8 minuti dal centro storico",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    size: "180 mq",
    priceFrom: 320,
    availability: "available",
    externalBookingUrl: "https://www.airbnb.com",
    featuredImage: "/images/courtyard-pool.webp",
    gallery: [
      "/images/hero-pool-sea.webp",
      "/images/kitchen-sea.webp",
      "/images/stone-bath.webp",
    ],
    amenities: [
      "Piscina privata",
      "Wi-Fi fibra",
      "Aria condizionata",
      "Parcheggio",
      "Cucina attrezzata",
      "Barbecue",
    ],
    extras: [
      "Chef privato",
      "Transfer aeroporto",
      "Noleggio bici",
      "Spesa in villa",
    ],
    rules: [
      "Check-in dalle 16:00",
      "Check-out entro le 10:00",
      "Non sono ammessi eventi",
      "Animali su richiesta",
    ],
    coordinates: { latitude: 36.891, longitude: 15.069 },
    matchProfile: {
      experiences: ["relax", "famiglia", "natura", "food"],
      view: "campagna",
      hasPool: true,
      petsAllowed: true,
      proximity: ["natura", "centro"],
    },
    externalCalendar: {
      provider: "ical",
      syncEnabled: false,
      calendarUrl: "",
      lastSync: undefined,
    },
  },
  {
    slug: "appartamento-scirocco-centro-storico",
    name: "Appartamento Scirocco",
    type: "Appartamento vacanze",
    claim: "Design essenziale nel cuore del centro storico.",
    summary:
      "Appartamento elegante per coppie o piccoli nuclei, a pochi passi da ristoranti, botteghe e monumenti.",
    description:
      "Appartamento Scirocco è un appartamento vacanze ideale per un soggiorno vicino alla località con tutto a portata di mano. La zona living è accogliente, la camera matrimoniale è silenziosa e il balcone affaccia sulle strade chiare del centro. Perfetto per chi vuole muoversi a piedi, scoprire la cucina locale e raggiungere il mare in pochi minuti di auto.",
    location: "Centro storico, zona pedonale",
    guests: 3,
    bedrooms: 1,
    bathrooms: 1,
    size: "58 mq",
    priceFrom: 145,
    availability: "request",
    externalBookingUrl: "https://www.booking.com",
    featuredImage: "/images/suite-sea-bedroom.webp",
    gallery: [
      "/images/suite-sea-bedroom.webp",
      "/images/vaulted-living.webp",
      "/images/stone-bath.webp",
    ],
    amenities: [
      "Wi-Fi",
      "Aria condizionata",
      "Smart TV",
      "Cucina",
      "Lavatrice",
      "Self check-in",
    ],
    extras: [
      "Colazione partner",
      "Tour guidati",
      "Late check-out",
      "Degustazioni",
    ],
    rules: [
      "Check-in dalle 15:00",
      "Check-out entro le 10:30",
      "No fumo",
      "Silenzio dopo le 23:00",
    ],
    coordinates: { latitude: 36.889, longitude: 15.073 },
    matchProfile: {
      experiences: ["centro-storico", "food"],
      view: "centro",
      hasPool: false,
      petsAllowed: false,
      proximity: ["centro"],
    },
    externalCalendar: {
      provider: "airbnb",
      syncEnabled: false,
      calendarUrl: "",
      lastSync: undefined,
    },
  },
  {
    slug: "casa-vacanza-maestrale",
    name: "Casa Maestrale",
    type: "Casa vacanza",
    claim: "Terrazza vista mare per giornate semplici e luminose.",
    summary:
      "Casa vacanza con terrazza, due camere e spazi comodi per famiglie che vogliono mare e relax.",
    description:
      "Casa Maestrale è una casa vacanza con vista mare, nata per ospitare famiglie e amici in un ambiente pratico ma curato. La terrazza è il cuore della casa: qui si fa colazione, si legge al rientro dalla spiaggia e si cena con la brezza della sera. Le spiagge sono vicine, mentre borghi, riserve naturali e cantine rendono ogni giornata diversa.",
    location: "Zona mare, 450 metri dalla spiaggia",
    guests: 5,
    bedrooms: 2,
    bathrooms: 2,
    size: "92 mq",
    priceFrom: 210,
    availability: "unavailable",
    externalBookingUrl: "https://www.lodgify.com",
    featuredImage: "/images/stone-entrance.webp",
    gallery: [
      "/images/stone-entrance.webp",
      "/images/breakfast-sea.webp",
      "/images/clear-cove.webp",
    ],
    amenities: [
      "Terrazza vista mare",
      "Posto auto",
      "Doccia esterna",
      "Wi-Fi",
      "Lavastoviglie",
      "Climatizzazione",
    ],
    extras: ["Ombrellone riservato", "Transfer", "Culla", "Pulizia extra"],
    rules: [
      "Check-in dalle 16:00",
      "Check-out entro le 10:00",
      "No feste",
      "Raccolta differenziata obbligatoria",
    ],
    coordinates: { latitude: 36.866, longitude: 15.118 },
    matchProfile: {
      experiences: ["mare", "famiglia", "relax", "natura"],
      view: "mare",
      hasPool: false,
      petsAllowed: true,
      proximity: ["mare", "natura"],
    },
    externalCalendar: {
      provider: "booking",
      syncEnabled: false,
      calendarUrl: "",
      lastSync: undefined,
    },
  },
];

export function getAccommodation(slug: string) {
  return accommodations.find((accommodation) => accommodation.slug === slug);
}
