export type EstimatorChoice = {
  label: string;
  value: string;
  hint?: string;
  multiplier?: number;
  addition?: number;
  unitRate?: number;
};

export type EstimatorCounter = {
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  rate: number;
  hint: string;
};

export type EstimatorToggle = {
  label: string;
  hint: string;
  amount?: number;
  ratePerPrimaryUnit?: number;
};

export type EstimatorService = {
  slug: string;
  name: string;
  description: string;
  quantityLabel: string;
  quantityUnit: string;
  quantityMin: number;
  quantityMax: number;
  quantityStep: number;
  quantityDefault: number;
  unitRate: number;
  baseCharge: number;
  minimumCharge?: number;
  variance: number;
  quantityHint: string;
  conditionLabel?: string;
  conditions?: EstimatorChoice[];
  optionLabel?: string;
  options?: EstimatorChoice[];
  counter?: EstimatorCounter;
  toggle?: EstimatorToggle;
  note: string;
  actionLabel?: string;
  actionHref?: string;
};

export const estimatorServices: EstimatorService[] = [
  {
    slug: "carpet-cleaning",
    name: "Carpet Cleaning",
    description: "Estimate hot water extraction cleaning by carpeted floor area.",
    quantityLabel: "Carpeted area",
    quantityUnit: "m²",
    quantityMin: 10,
    quantityMax: 250,
    quantityStep: 5,
    quantityDefault: 45,
    unitRate: 4.25,
    baseCharge: 0,
    variance: 0,
    quantityHint: "Measure only the carpeted rooms and hallways.",
    conditionLabel: "Carpet condition",
    conditions: [
      { label: "Normal", value: "normal", hint: "$4.25 per m²", unitRate: 4.25 },
      { label: "Heavy", value: "heavy", hint: "$4.75 per m²", unitRate: 4.75 },
    ],
    counter: {
      label: "Flights of stairs",
      unit: "flight",
      min: 0,
      max: 5,
      step: 1,
      defaultValue: 0,
      rate: 60,
      hint: "$60 per flight of stairs.",
    },
    note: "Pet contamination, difficult stains and delicate fibres may need an on-site assessment.",
  },
  {
    slug: "pest-control",
    name: "Pest Control",
    description: "Estimate indoor or outdoor pest treatment from the total floor area of the house.",
    quantityLabel: "Whole house floor area",
    quantityUnit: "m²",
    quantityMin: 40,
    quantityMax: 450,
    quantityStep: 10,
    quantityDefault: 150,
    unitRate: 1,
    baseCharge: 0,
    variance: 0,
    quantityHint: "Use the approximate total floor area of the home, not the land area.",
    optionLabel: "Treatment area",
    options: [
      { label: "Outside", value: "outside", hint: "$1 per m²", unitRate: 1 },
      { label: "Inside", value: "inside", hint: "$0.75 per m²", unitRate: 0.75 },
      { label: "Inside & outside", value: "both", hint: "$1.75 per m²", unitRate: 1.75 },
    ],
    note: "This assumes a standard treatment. Borer, bed bugs, severe infestations and repeat visits need a tailored assessment.",
  },
  {
    slug: "upholstery-cleaning",
    name: "Upholstery Cleaning",
    description: "Estimate fabric furniture cleaning by seat or item count.",
    quantityLabel: "Seats or items",
    quantityUnit: "items",
    quantityMin: 1,
    quantityMax: 16,
    quantityStep: 1,
    quantityDefault: 5,
    unitRate: 42,
    baseCharge: 45,
    variance: 0.14,
    quantityHint: "Count each sofa seating position as one item.",
    optionLabel: "Furniture type",
    options: [
      { label: "Lounge suite", value: "lounge", multiplier: 1 },
      { label: "Dining chairs", value: "dining", multiplier: 0.58 },
      { label: "Mattress", value: "mattress", multiplier: 1.75 },
      { label: "Office seating", value: "office", multiplier: 0.82 },
    ],
    counter: {
      label: "Loose cushions",
      unit: "cushion",
      min: 0,
      max: 20,
      step: 1,
      defaultValue: 0,
      rate: 11,
      hint: "Count cushions that need cleaning on both sides.",
    },
    toggle: {
      label: "Add fabric protection",
      hint: "$70 per seating position.",
      ratePerPrimaryUnit: 70,
    },
    note: "Fabric type and construction must be checked before cleaning. Leather and delicate fabrics are excluded.",
  },
  {
    slug: "stain-treatment",
    name: "Stain Treatment",
    description: "Estimate a targeted visit for isolated carpet or upholstery marks.",
    quantityLabel: "Visible marks",
    quantityUnit: "marks",
    quantityMin: 1,
    quantityMax: 12,
    quantityStep: 1,
    quantityDefault: 2,
    unitRate: 24,
    baseCharge: 85,
    variance: 0.22,
    quantityHint: "Count separate marks or small affected patches.",
    conditionLabel: "How long has it been there?",
    conditions: [
      { label: "Recent", value: "recent", hint: "Under 48 hours", multiplier: 0.85 },
      { label: "Settled", value: "settled", hint: "Several days or weeks", multiplier: 1 },
      { label: "Older", value: "older", hint: "Age unknown", multiplier: 1.35 },
    ],
    optionLabel: "Likely cause",
    options: [
      { label: "Food / drink", value: "food", addition: 0 },
      { label: "Pet mark", value: "pet", addition: 35 },
      { label: "Oil / grease", value: "oil", addition: 25 },
      { label: "Unknown", value: "unknown", addition: 18 },
    ],
    note: "Removal cannot be guaranteed. Household products already used on a mark can change the likely result.",
  },
  {
    slug: "gutter-cleaning",
    name: "Gutter Cleaning",
    description: "Estimate debris removal using approximate gutter length.",
    quantityLabel: "Gutter length",
    quantityUnit: "linear m",
    quantityMin: 10,
    quantityMax: 180,
    quantityStep: 5,
    quantityDefault: 45,
    unitRate: 4.5,
    baseCharge: 0,
    variance: 0,
    quantityHint: "A typical compact home may have 35–55 metres of gutter.",
    note: "Very steep roofs, fragile roofing and restricted access need to be checked before work starts.",
  },
  {
    slug: "hard-floor-cleaning-polish",
    name: "Hard Floor Cleaning & Polish",
    description: "Estimate hard-floor, tiled-wall, or vinyl stripping work by area.",
    quantityLabel: "Surface area",
    quantityUnit: "m²",
    quantityMin: 10,
    quantityMax: 300,
    quantityStep: 5,
    quantityDefault: 55,
    unitRate: 5,
    baseCharge: 0,
    variance: 0,
    quantityHint: "Measure the floor or tiled-wall area that needs cleaning.",
    optionLabel: "Surface and service",
    options: [
      { label: "Hard floor cleaning", value: "hard-floor", hint: "$5 per m²", unitRate: 5 },
      { label: "Tile walls", value: "tile-walls", hint: "$8 per m²", unitRate: 8 },
      { label: "Vinyl strip & polish", value: "vinyl", hint: "$17 per m²", unitRate: 17 },
    ],
    note: "The floor type and existing coating still need to be checked before work is confirmed.",
  },
  {
    slug: "solar-panel-cleaning",
    name: "Solar Panel Cleaning",
    description: "Estimate non-abrasive cleaning by panel count.",
    quantityLabel: "Solar panels",
    quantityUnit: "panels",
    quantityMin: 4,
    quantityMax: 100,
    quantityStep: 1,
    quantityDefault: 16,
    unitRate: 10,
    baseCharge: 0,
    minimumCharge: 150,
    variance: 0,
    quantityHint: "Count each individual panel in the array.",
    note: "Roof pitch, edge protection and safe access must be checked before the job is confirmed.",
  },
  {
    slug: "window-cleaning",
    name: "Window Cleaning",
    description: "Estimate window cleaning from the total floor area of the house.",
    quantityLabel: "Whole house floor area",
    quantityUnit: "m²",
    quantityMin: 40,
    quantityMax: 450,
    quantityStep: 10,
    quantityDefault: 150,
    unitRate: 1,
    baseCharge: 0,
    variance: 0,
    quantityHint: "Use the approximate total floor area of the home, not the glass area.",
    optionLabel: "Sides to clean",
    options: [
      { label: "Outside", value: "outside", hint: "$1 per m²", unitRate: 1 },
      { label: "Inside", value: "inside", hint: "$0.75 per m²", unitRate: 0.75 },
      { label: "Inside & outside", value: "both", hint: "$1.75 per m²", unitRate: 1.75 },
    ],
    note: "Oversized glass, difficult access, screens and post-construction residue can change the final work.",
  },
];

export const estimatorLocations = [
  { label: "Cromwell", value: "cromwell", minimumCharge: 120 },
  { label: "Alexandra or Clyde", value: "alexandra-clyde", minimumCharge: 120 },
  { label: "Queenstown", value: "queenstown", minimumCharge: 140 },
  { label: "Wanaka", value: "wanaka", minimumCharge: 140 },
  { label: "Hāwea", value: "hawea", minimumCharge: 140 },
  { label: "Ranfurly or Maniototo", value: "maniototo", minimumCharge: 140 },
  { label: "Elsewhere in the region", value: "other", minimumCharge: 140 },
];
