import serviceContent from "../../content/services/services.json";
import type { ServiceFact } from "@/components/ServiceFacts.astro";

export type Service = {
  name: string;
  slug: string;
  category: "Core cleaning" | "Restoration" | "Specialist cleaning" | "Repair and pest";
  summary: string;
  seoTitle: string;
  seoDescription: string;
  heroHeading: string;
  localHeading: string;
  localCopy: string;
  intro: string;
  overview: string;
  sections?: Array<{ heading: string; paragraphs?: string[]; bullets?: string[] }>;
  whyAdvanced: string;
  reasons: string[];
  included: string[];
  exclusions?: string[];
  facts: ServiceFact[];
  process: Array<{ title: string; copy: string }>;
  useCases: string[];
  resultsHeading: string;
  resultsCopy: string;
  highlightStat?: { eyebrow: string; value: string; label: string; detail: string };
  media: {
    hero: string;
    work: string;
    technical?: string;
    heroAlt: string;
    workAlt: string;
    technicalAlt?: string;
    heroRotation?: "clockwise" | "counterclockwise";
    workRotation?: "clockwise" | "counterclockwise";
    technicalRotation?: "clockwise" | "counterclockwise";
  };
  comparison?: { before: string; after: string; caption: string };
  reviewName?: string;
  relatedSlugs: string[];
  enquiryCopy: string;
  faqs: Array<{ question: string; answer: string }>;
};

export const services = serviceContent.services as Service[];

export function getServiceBySlug(slug: string | undefined) {
  return services.find((service) => service.slug === slug);
}
