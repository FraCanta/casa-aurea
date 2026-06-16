import type { Accommodation } from "@/data/accommodations";
import { siteConfig } from "@/lib/site";

export function LodgingStructuredData({ accommodation }: { accommodation?: Accommodation }) {
  const data = accommodation
    ? {
        "@context": "https://schema.org",
        "@type": "VacationRental",
        name: accommodation.name,
        description: accommodation.description,
        image: [accommodation.featuredImage, ...accommodation.gallery],
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address,
          addressLocality: siteConfig.locality,
          addressRegion: siteConfig.region,
          addressCountry: "IT"
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: accommodation.coordinates.latitude,
          longitude: accommodation.coordinates.longitude
        },
        amenityFeature: accommodation.amenities.map((amenity) => ({
          "@type": "LocationFeatureSpecification",
          name: amenity,
          value: true
        })),
        numberOfRooms: accommodation.bedrooms,
        occupancy: {
          "@type": "QuantitativeValue",
          maxValue: accommodation.guests
        },
        url: `/alloggi/${accommodation.slug}`,
        priceRange: `Da EUR ${accommodation.priceFrom} a notte`
      }
    : {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        name: siteConfig.name,
        description:
          "Template moderno per casa vacanza, villa in affitto e appartamento vacanze con richiesta disponibilita e pagine SEO.",
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address,
          addressLocality: siteConfig.locality,
          addressRegion: siteConfig.region,
          addressCountry: "IT"
        },
        telephone: siteConfig.phone,
        email: siteConfig.email,
        identifier: [
          { "@type": "PropertyValue", name: "CIN", value: siteConfig.cin },
          { "@type": "PropertyValue", name: "CIR", value: siteConfig.cir }
        ]
      };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
