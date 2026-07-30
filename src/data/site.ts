import { services } from "./services";
import siteContent from "../../content/global/site.json";

export const site = siteContent;

export function titleFor(pathname: string, serviceName?: string) {
  if (serviceName) return `${serviceName} | ${site.name}`;
  if (pathname === "/services") return `Cleaning & Restoration Services | ${site.name}`;
  if (pathname === "/estimator") return `Service Cost Estimator | ${site.name}`;
  if (pathname === "/about") return `About ${site.name}`;
  if (pathname === "/contact") return `Contact ${site.name}`;
  if (pathname === "/design-system") return `Design System | ${site.name}`;
  if (pathname === "/thank-you") return `Thank You | ${site.name}`;
  return `${site.name} | Central Otago & Southern Lakes`;
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#localbusiness`,
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.primaryPhone,
    contactPoint: site.phones.map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone.value,
      contactType: "customer service",
      areaServed: "NZ",
    })),
    areaServed: site.areas.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "https://schema.org/Monday",
        "https://schema.org/Tuesday",
        "https://schema.org/Wednesday",
        "https://schema.org/Thursday",
        "https://schema.org/Friday",
        "https://schema.org/Saturday",
        "https://schema.org/Sunday",
      ],
      opens: "09:00",
      closes: "17:00",
    },
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.summary,
        url: `${site.url}/services/${service.slug}/`,
      },
    })),
  };
}
