import serviceContent from "../../content/services/services.json";

export type Service = {
  name: string;
  slug: string;
  category: "Core cleaning" | "Restoration" | "Specialist cleaning" | "Repair and pest";
  summary: string;
  intro: string;
  benefits: string[];
  process: string[];
  useCases: string[];
  faqs: Array<{ question: string; answer: string }>;
};

export const services = serviceContent.services as Service[];

export function getServiceBySlug(slug: string | undefined) {
  return services.find((service) => service.slug === slug);
}
