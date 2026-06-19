import { services } from "./services";

export const site = {
  name: "Advanced Carpets & Restoration",
  url: "https://www.advancedcarpet.co.nz",
  email: "office@advancedcarpet.co.nz",
  primaryPhone: "021 333 354",
  phones: [
    { label: "Cromwell / Alexandra", value: "03 445 3329" },
    { label: "Queenstown", value: "03 442 6803" },
    { label: "Wanaka", value: "03 443 4162" },
    { label: "Mobile", value: "021 333 354" },
  ],
  areas: ["Cromwell", "Alexandra", "Queenstown", "Wanaka", "Central Otago", "Southern Lakes"],
};

export function titleFor(pathname: string, serviceName?: string) {
  if (serviceName) return `${serviceName} | ${site.name}`;
  if (pathname === "/services") return `Cleaning & Restoration Services | ${site.name}`;
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
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.summary,
        url: `${site.url}/services/${service.slug}`,
      },
    })),
  };
}
