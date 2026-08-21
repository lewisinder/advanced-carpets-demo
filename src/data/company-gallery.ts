export type CompanyGalleryImage = {
  /** Default public asset path. */
  src: string;
  /** Larger WebP candidate for high-density and wider displays. */
  largeSrc: string;
  /** Describe the work shown; leave decorative wording out of the alt text. */
  alt: string;
  /** Optional CSS object-position value used to protect the subject during the pan. */
  position?: string;
};

export const companyGalleryImages: CompanyGalleryImage[] = [
  {
    src: "/assets/work-gallery/carpet-cleaning-in-progress-640.webp",
    largeSrc: "/assets/work-gallery/carpet-cleaning-in-progress-1280.webp",
    alt: "Technician using a hot water extraction wand to clean carpet",
    position: "50% 54%",
  },
  {
    src: "/assets/work-gallery/service-van-640.webp",
    largeSrc: "/assets/work-gallery/service-van-1280.webp",
    alt: "Advanced Carpets and Restoration service van in Central Otago",
    position: "50% 50%",
  },
  {
    src: "/assets/work-gallery/upholstery-cleaning-640.webp",
    largeSrc: "/assets/work-gallery/upholstery-cleaning-1280.webp",
    alt: "Upholstery cleaning tool on a fabric armchair",
    position: "48% 52%",
  },
  {
    src: "/assets/work-gallery/solar-panel-cleaning-640.webp",
    largeSrc: "/assets/work-gallery/solar-panel-cleaning-1280.webp",
    alt: "Solar panel cleaning on a Central Otago property",
    position: "50% 54%",
  },
  {
    src: "/assets/work-gallery/residential-carpet-cleaning-640.webp",
    largeSrc: "/assets/work-gallery/residential-carpet-cleaning-1280.webp",
    alt: "Carpet cleaning wand and extraction hoses in a residential living room",
    position: "54% 54%",
  },
  {
    src: "/assets/work-gallery/van-mounted-equipment-640.webp",
    largeSrc: "/assets/work-gallery/van-mounted-equipment-1280.webp",
    alt: "Van-mounted carpet cleaning equipment and hose reels",
    position: "50% 50%",
  },
  {
    src: "/assets/work-gallery/hard-floor-cleaning-640.webp",
    largeSrc: "/assets/work-gallery/hard-floor-cleaning-1280.webp",
    alt: "Hard floor before specialist cleaning",
    position: "56% 50%",
  },
  {
    src: "/assets/work-gallery/commercial-carpet-cleaning-640.webp",
    largeSrc: "/assets/work-gallery/commercial-carpet-cleaning-1280.webp",
    alt: "Commercial carpet cleaning in a local hospitality venue",
    position: "54% 54%",
  },
];
