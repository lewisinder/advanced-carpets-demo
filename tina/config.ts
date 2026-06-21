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
              longTextField("intro", "Page introduction"),
              { type: "string", name: "benefits", label: "Benefits", list: true, required: true },
              { type: "string", name: "process", label: "Process steps", list: true, required: true },
              { type: "string", name: "useCases", label: "Suitable for", list: true, required: true },
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
