import { defineConfig } from "tinacms";

const branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.HEAD || "main";

const textField = (name: string, label: string, required = true) => ({
  type: "string" as const,
  name,
  label,
  required,
});

const longTextField = (name: string, label: string, required = true) => ({
  ...textField(name, label, required),
  ui: { component: "textarea" },
});

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "assets/uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "site",
        label: "Business details",
        path: "content/global",
        format: "json",
        match: { include: "site" },
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          textField("name", "Business name"),
          textField("url", "Website URL"),
          textField("email", "Email"),
          textField("primaryPhone", "Primary phone"),
          {
            type: "object",
            name: "phones",
            label: "Phone numbers",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label || "Phone number" }) },
            fields: [textField("label", "Location label"), textField("value", "Phone number")],
          },
          { type: "string", name: "areas", label: "Service areas", list: true, required: true },
        ],
      },
      {
        name: "home",
        label: "Homepage",
        path: "content/pages",
        format: "json",
        match: { include: "home" },
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => "/",
        },
        fields: [
          longTextField("seoDescription", "SEO description"),
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              textField("title", "Heading"),
              longTextField("intro", "Introduction"),
              textField("primaryAction", "Primary button label"),
              textField("secondaryAction", "Secondary button label"),
              textField("rating", "Google rating"),
              textField("reviewCount", "Review count label"),
              { type: "string", name: "trustedBy", label: "Trust marks", list: true },
              {
                type: "object",
                name: "metrics",
                label: "Hero proof points",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.value || "Proof point" }) },
                fields: [textField("value", "Value"), textField("label", "Description")],
              },
            ],
          },
          {
            type: "object",
            name: "reviews",
            label: "Customer reviews",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name || "Review" }) },
            fields: [
              textField("name", "Customer name"),
              textField("source", "Source"),
              textField("initials", "Initials"),
              {
                ...textField("avatarColor", "Avatar colour"),
                ui: { component: "color" },
              },
              longTextField("text", "Review"),
            ],
          },
          {
            type: "object",
            name: "trust",
            label: "Why Advanced Carpets",
            fields: [
              textField("title", "Heading"),
              longTextField("intro", "Introduction"),
              {
                type: "object",
                name: "points",
                label: "Trust points",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title || "Trust point" }) },
                fields: [textField("title", "Heading"), longTextField("text", "Description")],
              },
            ],
          },
          {
            type: "object",
            name: "about",
            label: "About preview",
            fields: [
              textField("title", "Heading"),
              { type: "string", name: "paragraphs", label: "Paragraphs", list: true, ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "steps",
            label: "Booking steps",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "Step" }) },
            fields: [textField("title", "Heading"), longTextField("text", "Description")],
          },
          {
            type: "object",
            name: "faqs",
            label: "FAQs",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.question || "Question" }) },
            fields: [textField("question", "Question"), longTextField("answer", "Answer")],
          },
        ],
      },
      {
        name: "services",
        label: "Services",
        path: "content/services",
        format: "json",
        match: { include: "services" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "services",
            label: "Services",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name || "Service" }) },
            fields: [
              textField("name", "Service name"),
              textField("slug", "URL slug"),
              {
                type: "string",
                name: "category",
                label: "Category",
                required: true,
                options: ["Core cleaning", "Restoration", "Specialist cleaning", "Repair and pest"],
              },
              longTextField("summary", "Short summary"),
              textField("seoTitle", "Search title"),
              longTextField("seoDescription", "Search description"),
              textField("heroHeading", "Main page heading"),
              textField("localHeading", "Service area heading"),
              longTextField("localCopy", "Service area paragraph"),
              longTextField("intro", "Page introduction"),
              longTextField("overview", "Who the service suits"),
              {
                type: "object",
                name: "sections",
                label: "Service detail sections",
                list: true,
                required: false,
                ui: { itemProps: (item) => ({ label: item?.heading || "Service detail" }) },
                fields: [
                  textField("heading", "Heading"),
                  { type: "string", name: "paragraphs", label: "Paragraphs", list: true, required: false, ui: { component: "textarea" } },
                  { type: "string", name: "bullets", label: "Bullet points", list: true, required: false, ui: { component: "textarea" } },
                ],
              },
              longTextField("whyAdvanced", "Why Advanced Carpets"),
              { type: "string", name: "reasons", label: "Reasons to arrange", list: true, required: true },
              { type: "string", name: "included", label: "Included work", list: true, required: true },
              { type: "string", name: "exclusions", label: "Important limits", list: true, required: false },
              {
                type: "object", name: "facts", label: "Service facts", list: true,
                ui: { itemProps: (item) => ({ label: item?.label || "Service fact" }) },
                fields: [
                  textField("label", "Fact"),
                  { type: "string", name: "icon", label: "Lucide icon", options: ["award", "building", "clock", "droplets", "map", "phone", "search", "shield", "sparkles", "truck", "wrench"] },
                  { type: "string", name: "tone", label: "Colour", options: ["clay", "water", "sage", "taupe"] },
                ],
              },
              {
                type: "object", name: "process", label: "Four process steps", list: true,
                ui: { itemProps: (item) => ({ label: item?.title || "Step" }) },
                fields: [textField("title", "Step title"), longTextField("copy", "Step description")],
              },
              { type: "string", name: "useCases", label: "Suitable for", list: true, required: true },
              textField("resultsHeading", "Results heading"),
              longTextField("resultsCopy", "Results section introduction"),
              {
                type: "object", name: "media", label: "Service photos",
                fields: [
                  textField("hero", "Hero image path"),
                  textField("work", "Work image path"),
                  textField("heroAlt", "Hero image description"),
                  textField("workAlt", "Work image description"),
                  { type: "string", name: "heroRotation", label: "Hero image rotation", options: ["clockwise", "counterclockwise"] },
                  { type: "string", name: "workRotation", label: "Work image rotation", options: ["clockwise", "counterclockwise"] },
                ],
              },
              {
                type: "object", name: "comparison", label: "Before and after", required: false,
                fields: [textField("before", "Before image path"), textField("after", "After image path"), longTextField("caption", "Caption")],
              },
              textField("reviewName", "Approved homepage reviewer name", false),
              { type: "string", name: "relatedSlugs", label: "Related service slugs", list: true },
              longTextField("enquiryCopy", "Enquiry instructions"),
              {
                type: "object",
                name: "faqs",
                label: "FAQs",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.question || "Question" }) },
                fields: [textField("question", "Question"), longTextField("answer", "Answer")],
              },
            ],
          },
        ],
      },
    ],
  },
});
