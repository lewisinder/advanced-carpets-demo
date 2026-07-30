export type EstimatorChoice = {
  label: string;
  value: string;
  hint?: string;
  multiplier?: number;
  addition?: number;
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
  minimumCharge: number;
  variance: number;
  quantityHint: string;
  conditionLabel: string;
  conditions: EstimatorChoice[];
  optionLabel: string;
  options: EstimatorChoice[];
  counter?: EstimatorCounter;
  toggle?: EstimatorToggle;
  note: string;
  actionLabel?: string;
  actionHref?: string;
};

const standardConditions: EstimatorChoice[] = [
  { label: "Light", value: "light", hint: "Well maintained", multiplier: 0.9 },
  { label: "Normal", value: "normal", hint: "Average use", multiplier: 1 },
  { label: "Heavy", value: "heavy", hint: "Extra time needed", multiplier: 1.3 },
];

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
    unitRate: 4.2,
    baseCharge: 65,
    minimumCharge: 150,
    variance: 0.12,
    quantityHint: "Measure only the carpeted rooms and hallways.",
    conditionLabel: "Carpet condition",
    conditions: standardConditions,
    optionLabel: "Property type",
    options: [
      { label: "Home", value: "home", multiplier: 1 },
      { label: "Rental", value: "rental", multiplier: 0.95 },
      { label: "Commercial", value: "commercial", multiplier: 1.15 },
    ],
    counter: {
      label: "Flights of stairs",
      unit: "flight",
      min: 0,
      max: 5,
      step: 1,
      defaultValue: 0,
      rate: 24,
      hint: "One flight is approximately 12–14 steps.",
    },
    toggle: {
      label: "Add targeted stain treatment",
      hint: "For common spots in the area being cleaned.",
      amount: 30,
    },
    note: "Some permanent stains, pet contamination and delicate fibres need an on-site assessment.",
  },
  {
    slug: "pest-control",
    name: "Pest Control",
    description: "Estimate a standard residential treatment by property size and pest type.",
    quantityLabel: "Bedrooms",
    quantityUnit: "bedrooms",
    quantityMin: 1,
    quantityMax: 8,
    quantityStep: 1,
    quantityDefault: 3,
    unitRate: 32,
    baseCharge: 90,
    minimumCharge: 160,
    variance: 0.18,
    quantityHint: "Include bedrooms used as offices or storage.",
    conditionLabel: "Level of activity",
    conditions: [
      { label: "Early signs", value: "early", hint: "Occasional activity", multiplier: 0.9 },
      { label: "Active", value: "active", hint: "Regular sightings", multiplier: 1 },
      { label: "Established", value: "established", hint: "Widespread activity", multiplier: 1.4 },
    ],
    optionLabel: "Main pest",
    options: [
      { label: "Spiders / flies", value: "general", addition: 0 },
      { label: "Fleas / ants", value: "fleas", addition: 30 },
      { label: "Rodents", value: "rodents", addition: 55 },
      { label: "Bed bugs", value: "bed-bugs", addition: 140 },
    ],
    counter: {
      label: "Additional treatment areas",
      unit: "area",
      min: 0,
      max: 8,
      step: 1,
      defaultValue: 0,
      rate: 28,
      hint: "Garages, sheds and detached work areas.",
    },
    note: "Borer, wasp nests, severe infestations and repeat visits may need a tailored treatment plan.",
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
    minimumCharge: 150,
    variance: 0.14,
    quantityHint: "Count each sofa seating position as one item.",
    conditionLabel: "Fabric condition",
    conditions: standardConditions,
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
      label: "Add targeted stain treatment",
      hint: "For suitable spills and high-use areas.",
      amount: 25,
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
    minimumCharge: 120,
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
    counter: {
      label: "Large affected patches",
      unit: "patch",
      min: 0,
      max: 6,
      step: 1,
      defaultValue: 0,
      rate: 35,
      hint: "Use this for patches larger than an A4 sheet.",
    },
    note: "Removal cannot be guaranteed. Household products already used on a mark can change the likely result.",
  },
  {
    slug: "flood-restoration",
    name: "Flood Restoration",
    description: "Create a broad early-stage allowance for extraction and drying support.",
    quantityLabel: "Affected floor area",
    quantityUnit: "m²",
    quantityMin: 5,
    quantityMax: 200,
    quantityStep: 5,
    quantityDefault: 25,
    unitRate: 18,
    baseCharge: 180,
    minimumCharge: 280,
    variance: 0.28,
    quantityHint: "A rough measurement is enough for this early indication.",
    conditionLabel: "Time since water entered",
    conditions: [
      { label: "Under 6 hours", value: "recent", hint: "Early response", multiplier: 0.9 },
      { label: "6–24 hours", value: "day", hint: "Drying risk rising", multiplier: 1.15 },
      { label: "Over 24 hours", value: "older", hint: "Further assessment likely", multiplier: 1.5 },
    ],
    optionLabel: "Water source",
    options: [
      { label: "Clean supply", value: "clean", multiplier: 1 },
      { label: "Appliance leak", value: "appliance", multiplier: 1.08 },
      { label: "Used water", value: "grey", multiplier: 1.4 },
      { label: "External flood", value: "external", multiplier: 1.75 },
    ],
    counter: {
      label: "Affected rooms",
      unit: "room",
      min: 1,
      max: 12,
      step: 1,
      defaultValue: 1,
      rate: 30,
      hint: "Include rooms where carpet, underlay or walls feel damp.",
    },
    note: "This is not a final restoration price. Moisture readings, contamination, materials and drying time can change the work substantially.",
    actionLabel: "Call about water damage",
    actionHref: "tel:021333354",
  },
  {
    slug: "gutter-cleaning",
    name: "Gutter Cleaning",
    description: "Estimate debris removal using approximate gutter length and access.",
    quantityLabel: "Gutter length",
    quantityUnit: "linear m",
    quantityMin: 10,
    quantityMax: 180,
    quantityStep: 5,
    quantityDefault: 45,
    unitRate: 5.5,
    baseCharge: 80,
    minimumCharge: 150,
    variance: 0.16,
    quantityHint: "A typical compact home may have 35–55 metres of gutter.",
    conditionLabel: "Level of blockage",
    conditions: [
      { label: "Light", value: "light", hint: "Loose leaves", multiplier: 0.9 },
      { label: "Blocked", value: "blocked", hint: "Built-up debris", multiplier: 1.2 },
      { label: "Heavy", value: "heavy", hint: "Packed or growing", multiplier: 1.5 },
    ],
    optionLabel: "Building height",
    options: [
      { label: "Single storey", value: "single", multiplier: 1 },
      { label: "Two storey", value: "double", multiplier: 1.38 },
      { label: "Three+", value: "high", multiplier: 1.75 },
    ],
    counter: {
      label: "Downpipes to flush",
      unit: "downpipe",
      min: 0,
      max: 12,
      step: 1,
      defaultValue: 2,
      rate: 18,
      hint: "Include downpipes showing slow flow or blockage.",
    },
    toggle: {
      label: "Gutter guards fitted",
      hint: "Allow extra time to lift and work around guards.",
      amount: 65,
    },
    note: "Very steep roofs, fragile roofing and restricted access need to be checked before work starts.",
  },
  {
    slug: "hard-floor-cleaning-polish",
    name: "Hard Floor Cleaning & Polish",
    description: "Estimate deeper cleaning for suitable hard-floor surfaces.",
    quantityLabel: "Floor area",
    quantityUnit: "m²",
    quantityMin: 10,
    quantityMax: 300,
    quantityStep: 5,
    quantityDefault: 55,
    unitRate: 9,
    baseCharge: 95,
    minimumCharge: 160,
    variance: 0.16,
    quantityHint: "Measure the open floor area that needs machine cleaning.",
    conditionLabel: "Floor condition",
    conditions: standardConditions,
    optionLabel: "Floor material",
    options: [
      { label: "Tile", value: "tile", multiplier: 1 },
      { label: "Vinyl", value: "vinyl", multiplier: 0.9 },
      { label: "Concrete", value: "concrete", multiplier: 1.1 },
      { label: "Stone", value: "stone", multiplier: 1.32 },
    ],
    counter: {
      label: "Small rooms / tight areas",
      unit: "area",
      min: 0,
      max: 10,
      step: 1,
      defaultValue: 0,
      rate: 20,
      hint: "Bathrooms and confined rooms take additional setup time.",
    },
    toggle: {
      label: "Include suitable polish",
      hint: "Placeholder allowance; the finish depends on floor type.",
      ratePerPrimaryUnit: 3.5,
    },
    note: "The existing coating, floor type and required finish must be confirmed before polishing.",
  },
  {
    slug: "carpet-repair",
    name: "Carpet Repair",
    description: "Create a broad allowance for small, localised carpet repairs.",
    quantityLabel: "Repair areas",
    quantityUnit: "areas",
    quantityMin: 1,
    quantityMax: 8,
    quantityStep: 1,
    quantityDefault: 1,
    unitRate: 85,
    baseCharge: 120,
    minimumCharge: 180,
    variance: 0.25,
    quantityHint: "Count each separate damaged or lifting area.",
    conditionLabel: "Repair complexity",
    conditions: [
      { label: "Simple", value: "simple", hint: "Easy access", multiplier: 0.9 },
      { label: "Typical", value: "typical", hint: "Standard repair", multiplier: 1 },
      { label: "Complex", value: "complex", hint: "Pattern or access issues", multiplier: 1.45 },
    ],
    optionLabel: "Repair type",
    options: [
      { label: "Small patch", value: "patch", multiplier: 1 },
      { label: "Join / seam", value: "seam", multiplier: 1.12 },
      { label: "Re-stretch", value: "stretch", multiplier: 1.35 },
      { label: "Edge / doorway", value: "edge", multiplier: 1.2 },
    ],
    counter: {
      label: "Doorways involved",
      unit: "doorway",
      min: 0,
      max: 8,
      step: 1,
      defaultValue: 0,
      rate: 35,
      hint: "Count transitions or joins at doorways.",
    },
    toggle: {
      label: "Matching donor carpet needed",
      hint: "A suitable matching piece may need to be sourced.",
      amount: 45,
    },
    note: "Photos and a material check are needed before confirming whether a repair is practical.",
  },
  {
    slug: "solar-panel-cleaning",
    name: "Solar Panel Cleaning",
    description: "Estimate non-abrasive cleaning by panel count and roof access.",
    quantityLabel: "Solar panels",
    quantityUnit: "panels",
    quantityMin: 4,
    quantityMax: 100,
    quantityStep: 1,
    quantityDefault: 16,
    unitRate: 10.5,
    baseCharge: 90,
    minimumCharge: 150,
    variance: 0.14,
    quantityHint: "Count each individual panel in the array.",
    conditionLabel: "Build-up",
    conditions: [
      { label: "Light dust", value: "light", hint: "Routine clean", multiplier: 0.9 },
      { label: "Normal", value: "normal", hint: "Dust and pollen", multiplier: 1 },
      { label: "Heavy", value: "heavy", hint: "Stubborn build-up", multiplier: 1.35 },
    ],
    optionLabel: "Panel access",
    options: [
      { label: "Ground mounted", value: "ground", multiplier: 0.85 },
      { label: "Single storey", value: "single", multiplier: 1 },
      { label: "Two storey", value: "double", multiplier: 1.4 },
      { label: "Difficult roof", value: "difficult", multiplier: 1.65 },
    ],
    counter: {
      label: "Separate arrays",
      unit: "array",
      min: 1,
      max: 8,
      step: 1,
      defaultValue: 1,
      rate: 18,
      hint: "Count groups of panels requiring separate access.",
    },
    toggle: {
      label: "Heavy bird droppings",
      hint: "Allow extra time for careful removal.",
      amount: 40,
    },
    note: "Roof pitch, edge protection and safe access must be checked before the job is confirmed.",
  },
  {
    slug: "window-cleaning",
    name: "Window Cleaning",
    description: "Estimate residential or commercial glass cleaning by pane count.",
    quantityLabel: "Window panes",
    quantityUnit: "panes",
    quantityMin: 5,
    quantityMax: 160,
    quantityStep: 1,
    quantityDefault: 28,
    unitRate: 4.5,
    baseCharge: 70,
    minimumCharge: 140,
    variance: 0.15,
    quantityHint: "Count each separate piece of glass as one pane.",
    conditionLabel: "Glass condition",
    conditions: standardConditions,
    optionLabel: "Sides to clean",
    options: [
      { label: "Exterior", value: "exterior", multiplier: 1 },
      { label: "Interior", value: "interior", multiplier: 0.9 },
      { label: "Both sides", value: "both", multiplier: 1.65 },
    ],
    counter: {
      label: "Upper-storey panes",
      unit: "pane",
      min: 0,
      max: 80,
      step: 1,
      defaultValue: 0,
      rate: 3.5,
      hint: "Count panes above normal ground-floor reach.",
    },
    toggle: {
      label: "Detail tracks and sills",
      hint: "Adds a detailed wipe to accessible tracks and sills.",
      ratePerPrimaryUnit: 2,
    },
    note: "Oversized glass, difficult access, screens and post-construction residue can change the final work.",
  },
];

export const estimatorLocations = [
  { label: "Cromwell", value: "cromwell", amount: 0 },
  { label: "Alexandra or Clyde", value: "alexandra-clyde", amount: 25 },
  { label: "Queenstown", value: "queenstown", amount: 55 },
  { label: "Wanaka", value: "wanaka", amount: 55 },
  { label: "Hāwea", value: "hawea", amount: 70 },
  { label: "Ranfurly or Maniototo", value: "maniototo", amount: 95 },
  { label: "Elsewhere in the region", value: "other", amount: 120 },
];
