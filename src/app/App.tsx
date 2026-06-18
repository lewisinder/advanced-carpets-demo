import { useState } from "react";
import {
  Armchair,
  Bug,
  ChevronRight,
  Droplets,
  Hammer,
  Home,
  Leaf,
  Menu,
  Paintbrush,
  Phone,
  Sparkles,
  SprayCan,
  Sun,
  X,
} from "lucide-react";
import { HashRouter, Link, Navigate, Route, Routes, useParams } from "react-router";
import imgLogo from "@/imports/DesktopHomepage1440/27fdfb19f860981af5dfa6da2b876ad38777fe56.png";
import imgHeroOverlay from "@/imports/DesktopHomepage1440/fbeb92e3dde6c5fe1d99ad0c211ca63fab6f10d0.png";
import { getServiceBySlug, services, type Service } from "./data/services";

const brand = {
  blue: "#08abe6",
  green: "#39ba62",
  orange: "#ff4d00",
  charcoal: "#0e1215",
  ink: "#1e2326",
  muted: "#475259",
  line: "#dbe0e3",
  soft: "#fbfcfc",
};

const locations = [
  { city: "Cromwell / Alexandra", phone: "03 445 3329" },
  { city: "Queenstown", phone: "03 442 6803" },
  { city: "Wanaka", phone: "03 443 4162" },
  { city: "Mobile", phone: "021 333 354" },
];

const serviceIconMap = {
  "carpet-cleaning": Paintbrush,
  "upholstery-cleaning": Armchair,
  "stain-treatment": SprayCan,
  "flood-restoration": Droplets,
  "gutter-cleaning": Leaf,
  "hard-floor-cleaning-polish": Sparkles,
  "carpet-repair": Hammer,
  "pest-control": Bug,
  "solar-panel-cleaning": Sun,
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function ServiceIcon({ service, size = "md" }: { service: Service; size?: "sm" | "md" | "lg" }) {
  const Icon = serviceIconMap[service.slug as keyof typeof serviceIconMap] ?? Sparkles;
  const sizeClass = size === "lg" ? "h-12 w-12" : size === "sm" ? "h-6 w-6" : "h-9 w-9";

  return (
    <div
      className={cx(
        "flex items-center justify-center rounded-[8px] bg-[#eaf8fe] text-[#07518a]",
        size === "lg" ? "h-20 w-20" : size === "sm" ? "h-11 w-11" : "h-14 w-14",
      )}
    >
      <Icon className={sizeClass} strokeWidth={2.15} />
    </div>
  );
}

function ButtonLink({
  to,
  children,
  variant = "primary",
}: {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "dark" | "outline" | "light";
}) {
  return (
    <Link
      to={to}
      className={cx(
        "inline-flex h-[48px] items-center justify-center gap-2 rounded-[6px] px-6 font-['Inter',sans-serif] text-[15px] font-semibold transition-colors",
        variant === "primary" && "bg-[#ff4d00] text-white hover:bg-[#e04400]",
        variant === "dark" && "bg-[#0e1215] text-white hover:bg-[#1e2326]",
        variant === "outline" && "border-[1.5px] border-white text-white hover:bg-white/10",
        variant === "light" && "bg-white text-[#0e1215] hover:bg-[#f4f7f9]",
      )}
    >
      {children}
    </Link>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(219,224,227,0.8)] bg-white">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 lg:h-[92px] lg:px-[88px]">
        <Link to="/" className="h-[52px] w-[110px] flex-shrink-0 lg:h-[68px] lg:w-[145px]" aria-label="Advanced Carpets home">
          <img src={imgLogo} alt="Advanced Carpets" className="h-full w-full object-contain" />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          <div className="group relative">
            <Link
              to="/services"
              className="inline-flex h-[92px] items-center gap-1 font-['Inter',sans-serif] text-[15px] font-medium text-[#1e2326] transition-colors hover:text-[#08abe6]"
            >
              Services
              <ChevronRight className="h-3.5 w-3.5 rotate-90 transition-transform group-hover:-rotate-90" />
            </Link>
            <div className="invisible absolute left-1/2 top-full w-[620px] -translate-x-1/2 translate-y-2 rounded-[10px] border border-[#dbe0e3] bg-white p-4 opacity-0 shadow-[0_20px_60px_rgba(14,18,21,0.14)] transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="mb-3 flex items-center justify-between border-b border-[#dbe0e3] pb-3">
                <div>
                  <p className="font-['Inter',sans-serif] text-[14px] font-bold text-[#0e1215]">All services</p>
                  <p className="mt-0.5 font-['Inter',sans-serif] text-[12px] font-normal text-[#9aa3a8]">Cleaning, restoration, specialist work, and repairs.</p>
                </div>
                <Link to="/services" className="font-['Inter',sans-serif] text-[13px] font-semibold text-[#08abe6] hover:underline">
                  Overview
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="group/item flex items-center gap-3 rounded-[8px] p-3 transition-colors hover:bg-[#f5fbfe]"
                  >
                    <ServiceIcon service={service} size="sm" />
                    <span className="font-['Inter',sans-serif] text-[13px] font-semibold leading-[1.25] text-[#1e2326] transition-colors group-hover/item:text-[#08abe6]">
                      {service.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="font-['Inter',sans-serif] text-[15px] font-medium text-[#1e2326] transition-colors hover:text-[#08abe6]"
            >
              {item.label}
            </Link>
          ))}
          <a className="ml-4 font-['Inter',sans-serif] text-[15px] font-semibold text-[#0e1215]" href="tel:034453329">
            03 445 3329
          </a>
          <ButtonLink to="/contact">Get a Quote</ButtonLink>
        </nav>
        <button
          className="p-2 text-[#0e1215] lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle menu"
          type="button"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {mobileOpen && (
        <div className="flex flex-col gap-4 border-t border-[#dbe0e3] bg-white px-6 py-4 lg:hidden">
          <Link
            to="/services"
            onClick={() => setMobileOpen(false)}
            className="font-['Inter',sans-serif] text-[15px] font-medium text-[#1e2326]"
          >
            Services
          </Link>
          <div className="grid grid-cols-1 gap-2 border-l border-[#dbe0e3] pl-4">
            {services.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                onClick={() => setMobileOpen(false)}
                className="font-['Inter',sans-serif] text-[13px] font-medium text-[#475259]"
              >
                {service.name}
              </Link>
            ))}
          </div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-['Inter',sans-serif] text-[15px] font-medium text-[#1e2326]"
            >
              {item.label}
            </Link>
          ))}
          <a className="font-['Inter',sans-serif] text-[15px] font-semibold text-[#0e1215]" href="tel:034453329">
            03 445 3329
          </a>
          <ButtonLink to="/contact">Get a Quote</ButtonLink>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0e1215] py-14 lg:py-16">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-5 inline-block rounded-[8px] border border-[rgba(219,224,227,0.45)] bg-white p-3">
              <img src={imgLogo} alt="Advanced Carpets" className="h-[50px] w-[120px] object-contain" />
            </div>
            <p className="max-w-[280px] font-['Inter',sans-serif] text-[15px] font-normal leading-[23px] text-[#fbfcfc] opacity-76">
              Professional carpet cleaning and restoration across Central Otago and the Southern Lakes.
            </p>
          </div>
          <div>
            <p className="mb-4 font-['Inter',sans-serif] text-[14px] font-bold text-white">Services</p>
            <ul className="space-y-1">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="font-['Inter',sans-serif] text-[14px] font-normal leading-[25px] text-[#fbfcfc] opacity-75 transition-opacity hover:opacity-100"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-['Inter',sans-serif] text-[14px] font-bold text-white">Locations</p>
            <ul className="space-y-1">
              {["Cromwell", "Alexandra", "Queenstown", "Wanaka", "Central Otago"].map((location) => (
                <li key={location}>
                  <span className="font-['Inter',sans-serif] text-[14px] font-normal leading-[25px] text-[#fbfcfc] opacity-75">{location}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-['Inter',sans-serif] text-[14px] font-bold text-white">Contact</p>
            <ul className="space-y-1">
              {["021 333 354", "office@advancedcarpet.co.nz", "Privacy policy"].map((item) => (
                <li key={item}>
                  <span className="font-['Inter',sans-serif] text-[14px] font-normal leading-[25px] text-[#fbfcfc] opacity-75">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

function PageHero({
  title,
  copy,
  dark = false,
}: {
  title: string;
  copy: string;
  dark?: boolean;
}) {
  return (
    <section className={cx("border-b border-[#dbe0e3] py-16 lg:py-20", dark ? "bg-[#0e1215]" : "bg-white")}>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
        <div className="max-w-[760px]">
          <h1 className={cx("font-['Inter',sans-serif] text-[38px] font-extrabold leading-[1.08] lg:text-[56px]", dark ? "text-white" : "text-[#0e1215]")}>
            {title}
          </h1>
          <p className={cx("mt-5 max-w-[620px] font-['Inter',sans-serif] text-[17px] font-normal leading-[1.65] lg:text-[19px]", dark ? "text-white/78" : "text-[#475259]")}>
            {copy}
          </p>
        </div>
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[620px] overflow-hidden bg-[#0e1215] lg:min-h-[720px]">
      <img src={imgHeroOverlay} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.18]" />
      <div className="absolute inset-0 bg-[rgba(14,18,21,0.37)]" />
      <div className="absolute bottom-0 left-0 top-0 w-2 bg-[#08abe6]" />
      <div className="relative mx-auto max-w-[1440px] px-6 py-16 lg:px-[88px] lg:py-24">
        <h1 className="max-w-[680px] font-['Inter',sans-serif] text-[40px] font-extrabold leading-[1.1] text-white lg:text-[64px] lg:leading-[67px]">
          Carpet Cleaning &amp; Restoration Across Central Otago and the Southern Lakes
        </h1>
        <p className="mb-10 mt-6 max-w-[560px] font-['Inter',sans-serif] text-[17px] font-normal leading-[1.55] text-[#fbfcfc] opacity-86 lg:text-[20px]">
          Professional carpet cleaning, upholstery care, stain treatment, repairs, and restoration work handled by trained local technicians.
        </p>
        <div className="mb-12 flex flex-wrap gap-4">
          <ButtonLink to="/contact">Get a Quote</ButtonLink>
          <ButtonLink to="/services" variant="outline">View Services</ButtonLink>
        </div>
        <div className="mb-12 w-fit max-w-full border-y border-white/10">
          <div className="flex items-center gap-3 border-b border-white/10 py-4">
            <StarRating rating={4.8} />
            <span className="font-['Inter',sans-serif] text-[15px] font-bold text-white">4.8</span>
            <span className="font-['Inter',sans-serif] text-[13px] font-normal text-white/60">94 Google reviews</span>
          </div>
          <div className="flex flex-wrap items-center gap-5 py-4 lg:gap-8">
            <span className="font-['Inter',sans-serif] text-[11px] font-semibold uppercase tracking-[1.1px] text-white/40">
              Trusted by
            </span>
            {["IICRC", "MASTER CLEANERS NZ", "QUEENSTOWN CHAMBER", "CENTRAL OTAGO BUSINESS"].map((label) => (
              <span key={label} className="font-['Inter',sans-serif] text-[11px] font-bold uppercase tracking-[0.6px] text-white/40">
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="grid max-w-[820px] gap-4 sm:grid-cols-3">
          {[
            ["7 Days", "Cleaners available all week long"],
            ["6,000+", "Cleaning jobs completed"],
            ["IICRC", "Certified technicians"],
          ].map(([metric, label]) => (
            <div key={metric} className="border-l border-white/20 pl-4">
              <p className="font-['Inter',sans-serif] text-[28px] font-extrabold leading-[28px] text-white">{metric}</p>
              <p className="mt-1 font-['Inter',sans-serif] text-[13px] font-medium text-white opacity-75">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, featured = false }: { service: Service; featured?: boolean }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className={cx(
        "group flex h-full flex-col rounded-[8px] border border-[#dbe0e3] bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#08abe6] hover:shadow-[0_16px_40px_rgba(14,18,21,0.08)]",
        featured && "lg:p-7",
      )}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <ServiceIcon service={service} />
        <ChevronRight className="mt-2 h-5 w-5 text-[#9aa3a8] transition-colors group-hover:text-[#08abe6]" />
      </div>
      <p className="mb-2 font-['Inter',sans-serif] text-[12px] font-semibold uppercase tracking-[0.8px] text-[#9aa3a8]">{service.category}</p>
      <h3 className="mb-3 font-['Inter',sans-serif] text-[22px] font-bold leading-[1.15] text-[#0e1215]">{service.name}</h3>
      <p className="font-['Inter',sans-serif] text-[15px] font-normal leading-[22px] text-[#475259]">{service.summary}</p>
    </Link>
  );
}

function ServicesSection() {
  const primary = services.slice(0, 4);

  return (
    <section className="bg-[#fbfcfc] py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="mb-3 font-['Inter',sans-serif] text-[13px] font-semibold uppercase tracking-[1.04px] text-[#08abe6]">Services</p>
            <h2 className="max-w-[520px] font-['Inter',sans-serif] text-[30px] font-extrabold leading-[1.1] text-[#0e1215] lg:text-[36px]">
              Core cleaning and restoration services
            </h2>
            <p className="mt-4 max-w-[580px] font-['Inter',sans-serif] text-[16px] font-normal leading-[1.55] text-[#475259] lg:text-[17px]">
              Lead with the highest-intent services, then make the wider service list easy to scan.
            </p>
          </div>
          <ButtonLink to="/services">View all services</ButtonLink>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {primary.map((service) => (
            <ServiceCard key={service.slug} service={service} featured />
          ))}
        </div>
        <div className="mt-10 border-t border-[#dbe0e3] pt-8">
          <p className="mb-6 font-['Inter',sans-serif] text-[13px] font-medium uppercase tracking-[0.8px] text-[#9aa3a8]">Also available</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {services.slice(4).map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group flex items-center gap-3 rounded-[8px] border border-transparent p-3 transition-colors hover:border-[#dbe0e3] hover:bg-white"
              >
                <ServiceIcon service={service} size="sm" />
                <span className="font-['Inter',sans-serif] text-[13px] font-semibold leading-[1.25] text-[#475259] transition-colors group-hover:text-[#08abe6]">
                  {service.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GoogleG() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} star rating`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? "#ff4d00" : "none"} stroke="#ff4d00" strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

const reviews = [
  {
    name: "Rachel T.",
    time: "2 days ago",
    rating: 5,
    text: "Kevin did a fantastic job on our lounge carpet. Stains we thought were permanent came out completely. Would highly recommend to anyone in the area.",
    initials: "RT",
    color: "#4285F4",
  },
  {
    name: "Mark Sinclair",
    time: "1 week ago",
    rating: 5,
    text: "Used Advanced Carpets after a water leak in our hallway. Fast response, professional gear, and the carpet dried out perfectly.",
    initials: "MS",
    color: "#34A853",
  },
  {
    name: "Jo Blackwell",
    time: "2 weeks ago",
    rating: 5,
    text: "Had the upholstery done on our couch and two armchairs. Came up looking brand new. Great service from a friendly local operator.",
    initials: "JB",
    color: "#EA4335",
  },
];

const beforeAfterItems = [
  { label: "Lounge carpet", beforeColor: "#9e8e78", afterColor: "#d4cfc9" },
  { label: "Stair runner", beforeColor: "#6b6460", afterColor: "#8c8580" },
  { label: "Wine stain", beforeColor: "#7a5c6a", afterColor: "#c8c2be" },
];

function BeforeAfterSlider({ label, beforeColor, afterColor }: { label: string; beforeColor: string; afterColor: string }) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative h-full min-h-[320px] overflow-hidden rounded-[12px]">
      <div className="absolute inset-0" style={{ backgroundColor: afterColor }} />
      <div className="absolute inset-0" style={{ width: `${pos}%`, backgroundColor: beforeColor }} />
      <div className="absolute bottom-4 left-4 rounded-[6px] bg-[#0e1215]/80 px-3 py-1.5 font-['Inter',sans-serif] text-[13px] font-semibold text-white">
        Before
      </div>
      <div className="absolute bottom-4 right-4 rounded-[6px] bg-[#0e1215]/80 px-3 py-1.5 font-['Inter',sans-serif] text-[13px] font-semibold text-white">
        After
      </div>
      <div className="absolute left-0 right-0 top-4 flex justify-center">
        <span className="rounded-full bg-[#0e1215]/60 px-3 py-1 font-['Inter',sans-serif] text-[12px] font-medium text-white/80">{label}</span>
      </div>
      <div
        className="pointer-events-none absolute bottom-0 top-0 w-px bg-white/80"
        style={{ left: `${pos}%` }}
      />
      <div
        className="pointer-events-none absolute top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(14,18,21,0.25)]"
        style={{ left: `${pos}%` }}
      >
        <ChevronRight className="h-4 w-4 rotate-180 text-[#475259]" />
        <ChevronRight className="-ml-2 h-4 w-4 text-[#475259]" />
      </div>
      <input
        aria-label={`${label} before and after comparison`}
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(event) => setPos(Number(event.target.value))}
        className="absolute inset-0 z-20 h-full w-full cursor-col-resize opacity-0"
      />
    </div>
  );
}

function BeforeAfterSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="overflow-hidden bg-[#0e1215] py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 font-['Inter',sans-serif] text-[13px] font-semibold uppercase tracking-[1.04px] text-[#08abe6]">Results</p>
            <h2 className="font-['Inter',sans-serif] text-[30px] font-extrabold leading-[1.1] text-white lg:text-[36px]">Before &amp; after</h2>
            <p className="mt-2 max-w-[420px] font-['Inter',sans-serif] text-[16px] font-normal leading-[1.55] text-white/60">
              Drag the handle to compare. Real job imagery can replace these placeholders once final photos are chosen.
            </p>
          </div>
          <div className="flex gap-2 pb-1 lg:hidden">
            {beforeAfterItems.map((item, i) => (
              <button
                key={item.label}
                onClick={() => setActive(i)}
                className={cx("h-2 rounded-full transition-all", i === active ? "w-5 bg-white" : "w-2 bg-white/30")}
                aria-label={`Show ${item.label}`}
                type="button"
              />
            ))}
          </div>
        </div>
        <div className="hidden h-[400px] grid-cols-3 gap-4 lg:grid">
          {beforeAfterItems.map((item) => (
            <BeforeAfterSlider key={item.label} {...item} />
          ))}
        </div>
        <div className="h-[340px] lg:hidden">
          <BeforeAfterSlider {...beforeAfterItems[active]} />
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className="border-y border-[#dbe0e3] bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-16">
          <div className="flex-shrink-0 lg:w-[240px]">
            <div className="mb-4 flex items-center gap-2">
              <GoogleG />
              <span className="font-['Inter',sans-serif] text-[14px] font-medium text-[#475259]">Google Reviews</span>
            </div>
            <h2 className="mb-6 font-['Inter',sans-serif] text-[28px] font-extrabold leading-[1.15] text-[#0e1215] lg:text-[32px]">
              What customers say about us
            </h2>
            <div className="flex items-center gap-3">
              <span className="font-['Inter',sans-serif] text-[48px] font-extrabold leading-none text-[#0e1215]">4.8</span>
              <div>
                <StarRating rating={4.8} />
                <p className="mt-1 font-['Inter',sans-serif] text-[13px] font-normal text-[#475259]">Based on 94 reviews</p>
              </div>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
            {reviews.map((review) => (
              <div key={review.name} className="flex flex-col gap-3 rounded-[10px] border border-[#dbe0e3] p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-['Inter',sans-serif] text-[13px] font-semibold text-white" style={{ backgroundColor: review.color }}>
                      {review.initials}
                    </div>
                    <div>
                      <p className="font-['Inter',sans-serif] text-[14px] font-semibold leading-tight text-[#0e1215]">{review.name}</p>
                      <p className="mt-0.5 font-['Inter',sans-serif] text-[12px] font-normal text-[#475259]">{review.time}</p>
                    </div>
                  </div>
                  <GoogleG />
                </div>
                <StarRating rating={review.rating} />
                <p className="font-['Inter',sans-serif] text-[14px] font-normal leading-[22px] text-[#475259]">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const points = [
    {
      title: "Local coverage",
      description: "Cromwell, Alexandra, Queenstown, Wanaka, Central Otago, and the Southern Lakes.",
      accent: brand.orange,
    },
    {
      title: "Trained technicians",
      description: "IICRC training and practical restoration experience can sit as a credibility point.",
      accent: brand.green,
    },
    {
      title: "Cleaning + restoration",
      description: "Carpet, upholstery, stain, flood, repair, hard floor, solar, gutter, and pest support.",
      accent: brand.orange,
    },
  ];

  return (
    <section className="bg-[#0e1215] py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 lg:grid-cols-2 lg:px-[88px]">
        <div>
          <p className="mb-3 font-['Inter',sans-serif] text-[13px] font-semibold uppercase tracking-[1.04px] text-[#ff4d00]">Why Advanced Carpets</p>
          <h2 className="mb-4 max-w-[520px] font-['Inter',sans-serif] text-[30px] font-extrabold leading-[1.1] text-white lg:text-[36px]">
            Straightforward service from trained local technicians
          </h2>
          <p className="max-w-[520px] font-['Inter',sans-serif] text-[16px] font-normal leading-[1.6] text-white/78 lg:text-[17px]">
            The site should sound competent and local, with proof points that feel useful rather than over-claimed.
          </p>
        </div>
        <div className="flex flex-col gap-7">
          {points.map((point) => (
            <div key={point.title} className="flex items-start gap-4">
              <div className="mt-1 h-[42px] w-[10px] flex-shrink-0 rounded-[5px]" style={{ backgroundColor: point.accent }} />
              <div>
                <h3 className="mb-1 font-['Inter',sans-serif] text-[20px] font-bold leading-[24px] text-white">{point.title}</h3>
                <p className="font-['Inter',sans-serif] text-[15px] font-normal leading-[22px] text-white/78">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPreviewSection() {
  return (
    <section className="border-t border-[#dbe0e3] bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-[88px]">
        <div className="relative order-2 lg:order-1">
          <div className="relative h-[320px] overflow-hidden rounded-[12px] bg-[#1e2326] lg:h-[460px]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#212e33,#0e1215)]" />
            <div className="absolute bottom-5 left-5 right-5 rounded-[8px] border border-white/10 bg-[#0e1215]/75 px-4 py-3">
              <p className="font-['Inter',sans-serif] text-[13px] font-medium text-white/60">Team photo in front of equipment to be added in final version</p>
            </div>
          </div>
          <div className="absolute -bottom-5 -right-4 rounded-[10px] bg-[#ff4d00] px-5 py-4 shadow-xl lg:-right-8">
            <p className="font-['Inter',sans-serif] text-[28px] font-extrabold leading-none text-white">6,000+</p>
            <p className="mt-1 font-['Inter',sans-serif] text-[12px] font-medium text-white/80">Jobs completed</p>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="mb-3 font-['Inter',sans-serif] text-[13px] font-semibold uppercase tracking-[1.04px] text-[#08abe6]">About us</p>
          <h2 className="mb-6 font-['Inter',sans-serif] text-[30px] font-extrabold leading-[1.1] text-[#0e1215] lg:text-[38px]">
            Local people, proper gear, honest work
          </h2>
          <div className="space-y-4 font-['Inter',sans-serif] text-[16px] font-normal leading-[1.65] text-[#475259] lg:text-[17px]">
            <p>
              Advanced Carpets has been serving Central Otago and the Southern Lakes with reliable cleaning, restoration, and practical property support.
            </p>
            <p>
              The final site can use Kevin's real photos and wording here, but this section gives the client the intended layout, confidence, and tone.
            </p>
            <p>
              Based around Cromwell and covering Alexandra, Queenstown, Wanaka, and the wider region, the site should feel local from the first scan.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink to="/about" variant="dark">Meet the team</ButtonLink>
            <div className="flex items-center gap-2">
              <StarRating rating={5} />
              <span className="font-['Inter',sans-serif] text-[14px] font-semibold text-[#0e1215]">4.8</span>
              <span className="font-['Inter',sans-serif] text-[13px] font-normal text-[#9aa3a8]">on Google</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationsSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
        <p className="mb-3 font-['Inter',sans-serif] text-[13px] font-semibold uppercase tracking-[1.04px] text-[#08abe6]">Locations</p>
        <h2 className="mb-4 max-w-[540px] font-['Inter',sans-serif] text-[30px] font-extrabold leading-[1.1] text-[#0e1215] lg:text-[36px]">
          Built around the areas already serviced
        </h2>
        <p className="mb-10 max-w-[560px] font-['Inter',sans-serif] text-[16px] font-normal leading-[1.55] text-[#475259] lg:text-[17px]">
          The main towns are easy to find, with wider Central Otago and Southern Lakes coverage handled through direct enquiries.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {locations.map((location) => (
            <div key={location.city} className="overflow-hidden rounded-[8px] border border-[#dbe0e3] bg-[#fbfcfc]">
              <div className="h-[5px] w-full bg-[#08abe6]" />
              <div className="px-6 py-6">
                <p className="mb-3 font-['Inter',sans-serif] text-[24px] font-bold leading-[26px] text-[#0e1215]">{location.city}</p>
                <p className="font-['Inter',sans-serif] text-[15px] font-medium leading-[18px] text-[#475259]">{location.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={cx("bg-[#fbfcfc]", compact ? "py-12" : "py-16 lg:py-24")}>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
        <div className="grid gap-8 rounded-[10px] bg-[#0e1215] p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
          <div>
            <h2 className="max-w-[620px] font-['Inter',sans-serif] text-[30px] font-extrabold leading-[1.1] text-white lg:text-[36px]">
              Tell us what needs cleaning or restoring
            </h2>
            <p className="mt-4 max-w-[600px] font-['Inter',sans-serif] text-[16px] font-normal leading-[1.6] text-white/78">
              Send the job details, photos if useful, and the best way to reach you. The team can reply with practical advice or a quote.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/contact">Get a Quote</ButtonLink>
            <a
              href="tel:034453329"
              className="inline-flex h-[48px] items-center justify-center gap-2 rounded-[6px] border-[1.5px] border-white px-6 font-['Inter',sans-serif] text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              Call now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    title: "Fill out our form",
    description: "Share your address, job description, and any photos to help us understand the work needed.",
  },
  {
    title: "We review and quote",
    description: "We'll assess your request and send back a clear, no-obligation quote.",
  },
  {
    title: "Book a time that suits",
    description: "Pick a day and time that works for you across Central Otago and the Southern Lakes.",
  },
  {
    title: "We come to you",
    description: "Your technician arrives ready to work, handles the job, and leaves the space clean.",
  },
];

function HowItWorksSection() {
  return (
    <section className="border-t border-[#dbe0e3] bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
        <h2 className="mb-12 text-center font-['Inter',sans-serif] text-[26px] font-extrabold leading-[1.1] text-[#0e1215] lg:text-[32px]">
          Getting a quote in 4 simple steps
        </h2>
        <div className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#08abe6] font-['Inter',sans-serif] text-[16px] font-extrabold text-white">
                {index + 1}
              </div>
              <p className="mb-2 font-['Inter',sans-serif] text-[16px] font-bold text-[#0e1215]">{step.title}</p>
              <p className="font-['Inter',sans-serif] text-[14px] font-normal leading-[1.6] text-[#475259]">{step.description}</p>
              {index === 0 && (
                <Link to="/contact" className="mt-3 inline-flex h-[34px] items-center gap-1.5 rounded-[6px] bg-[#ff4d00] px-4 font-['Inter',sans-serif] text-[13px] font-semibold text-white transition-colors hover:bg-[#e04400]">
                  Fill out the form
                  <ChevronRight className="h-3 w-3" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteSection() {
  return (
    <section id="quote" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
        <div className="overflow-hidden rounded-[10px] bg-[#0e1215]">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-14">
              <p className="mb-3 font-['Inter',sans-serif] text-[13px] font-semibold uppercase tracking-[1.04px] text-[#ff4d00]">Get a Quote</p>
              <h2 className="mb-4 max-w-[420px] font-['Inter',sans-serif] text-[30px] font-extrabold leading-[1.1] text-white lg:text-[36px]">
                Tell us what needs cleaning or restoring
              </h2>
              <p className="mb-10 max-w-[430px] font-['Inter',sans-serif] text-[16px] font-normal leading-[1.55] text-[#fbfcfc] opacity-82 lg:text-[17px]">
                The priority is a quick enquiry, not a heavy booking flow. In Webflow this can become the final form or Tradeify embed.
              </p>
              <div className="space-y-1 font-['Inter',sans-serif] text-[16px] font-medium text-[#fbfcfc] opacity-86">
                <p>Cromwell / Alexandra &nbsp; 03 445 3329</p>
                <p>Queenstown &nbsp; 03 442 6803</p>
                <p>Wanaka &nbsp; 03 443 4162</p>
                <p>Mobile &nbsp; 021 333 354</p>
                <p>office@advancedcarpet.co.nz</p>
              </div>
            </div>
            <TradeifyEmbedMock cta="Open contact page" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TradeifyEmbedMock({ cta }: { cta?: string }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-b-[10px] bg-white lg:rounded-b-none lg:rounded-r-[10px]">
      <div className="flex items-center gap-2 border-b border-[#dbe0e3] bg-[#f5f8ff] px-6 py-2.5">
        <div className="flex h-4 w-4 items-center justify-center rounded-[3px] bg-[#08abe6]">
          <span className="font-['Inter',sans-serif] text-[13px] font-bold leading-none text-white">+</span>
        </div>
        <span className="font-['Inter',sans-serif] text-[11px] font-medium uppercase tracking-[0.4px] text-[#9aa3a8]">
          Embedded form area - replace with final Webflow or Tradeify form
        </span>
      </div>
      <div className="flex flex-col gap-5 p-6 lg:p-8">
        {["Name", "Email address", "Phone number", "Job address"].map((label) => (
          <div key={label} className="flex flex-col gap-1.5">
            <label className="font-['Inter',sans-serif] text-[14px] font-semibold text-[#1e2326]">
              {label}
              <span className="text-[#ff4d00]">*</span>
            </label>
            <div className="h-[44px] rounded-[6px] border border-[#d0d5d9] bg-white" />
          </div>
        ))}
        <div className="flex flex-col gap-1.5">
          <label className="font-['Inter',sans-serif] text-[14px] font-semibold text-[#1e2326]">
            Job description<span className="text-[#ff4d00]">*</span>
          </label>
          <div className="h-[110px] rounded-[6px] border border-[#d0d5d9] bg-white" />
        </div>
        <div className="rounded-[6px] border border-dashed border-[#d0d5d9] bg-[#fafbfc] px-4 py-4">
          <div className="flex items-center gap-4">
            <span className="rounded-[5px] bg-[#9aa3a8] px-4 py-2 font-['Inter',sans-serif] text-[13px] font-medium text-white">Upload files</span>
            <div>
              <p className="font-['Inter',sans-serif] text-[13px] font-normal text-[#475259]">Or drag files here to upload</p>
              <p className="font-['Inter',sans-serif] text-[12px] font-normal text-[#9aa3a8]">Max size: 20MB</p>
            </div>
          </div>
        </div>
        {cta && (
          <Link to="/contact" className="inline-flex h-[46px] w-fit items-center rounded-[6px] bg-[#ff4d00] px-6 font-['Inter',sans-serif] text-[15px] font-semibold text-white transition-colors hover:bg-[#e04400]">
            {cta}
          </Link>
        )}
      </div>
    </div>
  );
}

const faqs = [
  {
    q: "What areas do you service?",
    a: "Cromwell, Alexandra, Queenstown, Wanaka, and the wider Central Otago and Southern Lakes region.",
  },
  {
    q: "How long does carpet cleaning take to dry?",
    a: "Most carpets are dry within a few hours under normal conditions. Good airflow helps speed this up.",
  },
  {
    q: "Can you treat pet stains and odours?",
    a: "Yes. Pet marks and odours can be assessed and treated with a targeted approach.",
  },
  {
    q: "Do I need to move furniture before you arrive?",
    a: "Move smaller items where practical. Larger items can be discussed when booking.",
  },
  {
    q: "How quickly can you respond to flood or water damage?",
    a: "Call directly for urgent jobs. Fast action is important with water damage.",
  },
];

function FAQSection() {
  return (
    <section className="border-t border-[#dbe0e3] bg-[#fbfcfc] py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1440px] items-start gap-12 px-6 lg:grid-cols-[1fr_2fr] lg:gap-20 lg:px-[88px]">
        <div className="lg:sticky lg:top-28">
          <p className="mb-3 font-['Inter',sans-serif] text-[13px] font-semibold uppercase tracking-[1.04px] text-[#08abe6]">FAQ</p>
          <h2 className="mb-4 font-['Inter',sans-serif] text-[30px] font-extrabold leading-[1.1] text-[#0e1215] lg:text-[36px]">Common questions</h2>
          <p className="font-['Inter',sans-serif] text-[16px] font-normal leading-[1.55] text-[#475259] lg:text-[17px]">
            Can't find what you're looking for? Get in touch and we'll answer directly.
          </p>
          <Link to="/contact" className="mt-6 inline-block font-['Inter',sans-serif] text-[15px] font-semibold text-[#08abe6] hover:underline">
            Contact us →
          </Link>
        </div>
        <div className="divide-y divide-[#dbe0e3]">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-['Inter',sans-serif] text-[16px] font-semibold text-[#0e1215] transition-colors hover:text-[#08abe6] lg:text-[17px]">
                {faq.q}
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-[#dbe0e3] text-[#475259] transition-all group-open:rotate-45 group-open:border-[#08abe6] group-open:bg-[#08abe6] group-open:text-white">
                  +
                </span>
              </summary>
              <p className="max-w-[680px] pb-1 pt-4 font-['Inter',sans-serif] text-[15px] font-normal leading-[1.65] text-[#475259] lg:text-[16px]">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <BeforeAfterSection />
      <ReviewsSection />
      <TrustSection />
      <AboutPreviewSection />
      <LocationsSection />
      <HowItWorksSection />
      <QuoteSection />
      <FAQSection />
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <PageHero
        title="Cleaning, restoration, and specialist property services"
        copy="A practical service overview for homes, rentals, commercial spaces, and urgent restoration work across Central Otago and the Southern Lakes."
      />
      <section className="bg-[#fbfcfc] py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>
      <CTASection compact />
    </>
  );
}

function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const serviceAreas = ["Cromwell", "Alexandra", "Queenstown", "Wanaka", "Central Otago", "Southern Lakes"];

  return (
    <>
      <section className="border-b border-[#dbe0e3] bg-[#0e1215] py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-6 lg:grid-cols-[1fr_360px] lg:px-[88px]">
          <div>
            <p className="mb-4 font-['Inter',sans-serif] text-[13px] font-semibold uppercase tracking-[1.04px] text-[#ff4d00]">{service.category}</p>
            <h1 className="max-w-[760px] font-['Inter',sans-serif] text-[40px] font-extrabold leading-[1.08] text-white lg:text-[60px]">{service.name}</h1>
            <p className="mt-5 max-w-[650px] font-['Inter',sans-serif] text-[17px] font-normal leading-[1.65] text-white/78 lg:text-[19px]">{service.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink to="/contact">Request a Quote</ButtonLink>
              <ButtonLink to="/services" variant="outline">All Services</ButtonLink>
            </div>
          </div>
          <div className="rounded-[10px] border border-white/10 bg-white/5 p-7">
            <ServiceIcon service={service} size="lg" />
            <p className="mt-6 font-['Inter',sans-serif] text-[15px] font-normal leading-[1.6] text-white/78">{service.summary}</p>
          </div>
        </div>
      </section>
      <section className="border-b border-[#dbe0e3] bg-white py-12">
        <div className="mx-auto grid max-w-[1440px] gap-4 px-6 sm:grid-cols-3 lg:px-[88px]">
          {[
            ["Fast local response", "Direct contact with the team that does the work."],
            ["Practical advice", "Clear guidance before the job is booked."],
            ["Right method for the surface", "Cleaning approach matched to the service and condition."],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-[8px] border border-[#dbe0e3] bg-[#fbfcfc] p-5">
              <p className="font-['Inter',sans-serif] text-[16px] font-bold text-[#0e1215]">{title}</p>
              <p className="mt-2 font-['Inter',sans-serif] text-[14px] font-normal leading-[1.55] text-[#475259]">{copy}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 lg:grid-cols-[1fr_1fr] lg:px-[88px]">
          <InfoList title="Why book this service" items={service.benefits} />
          <InfoList title="Suitable for" items={service.useCases} />
        </div>
      </section>
      <section className="bg-[#0e1215] py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-[88px]">
          <div>
            <p className="mb-3 font-['Inter',sans-serif] text-[13px] font-semibold uppercase tracking-[1.04px] text-[#ff4d00]">Service detail</p>
            <h2 className="max-w-[620px] font-['Inter',sans-serif] text-[30px] font-extrabold leading-[1.1] text-white lg:text-[40px]">
              A clear page template for every service
            </h2>
            <div className="mt-6 space-y-4 font-['Inter',sans-serif] text-[16px] font-normal leading-[1.7] text-white/78">
              <p>
                This area is where the Webflow CMS template can carry the main explanation for each service: what is included, what customers should expect, and when to book.
              </p>
              <p>
                For the final site, each service can use client-supplied photos, service-specific FAQs, and any stronger proof points Kevin wants to include.
              </p>
            </div>
          </div>
          <div className="rounded-[12px] border border-white/10 bg-white/5 p-6">
            <div className="flex min-h-[300px] items-end rounded-[8px] bg-[linear-gradient(135deg,#233238,#11171b)] p-5">
              <p className="font-['Inter',sans-serif] text-[13px] font-medium leading-[1.5] text-white/55">
                Service-specific photo placeholder: technician, equipment, finished result, or before/after detail.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="border-y border-[#dbe0e3] bg-[#fbfcfc] py-16 lg:py-24">
        <div className="mx-auto max-w-[1040px] px-6 lg:px-[88px]">
          <h2 className="mb-10 font-['Inter',sans-serif] text-[30px] font-extrabold leading-[1.1] text-[#0e1215] lg:text-[36px]">What to expect</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.process.map((step, index) => (
              <div key={step} className="rounded-[8px] border border-[#dbe0e3] bg-white p-6">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#08abe6] font-['Inter',sans-serif] text-[15px] font-extrabold text-white">
                  {index + 1}
                </div>
                <p className="font-['Inter',sans-serif] text-[17px] font-bold leading-[1.35] text-[#0e1215]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-[88px]">
          <div>
            <p className="mb-3 font-['Inter',sans-serif] text-[13px] font-semibold uppercase tracking-[1.04px] text-[#08abe6]">Where we work</p>
            <h2 className="font-['Inter',sans-serif] text-[30px] font-extrabold leading-[1.1] text-[#0e1215] lg:text-[36px]">
              Available across the main service areas
            </h2>
            <p className="mt-4 font-['Inter',sans-serif] text-[16px] font-normal leading-[1.65] text-[#475259]">
              This service page can support local SEO by making coverage clear without creating a separate page for every town at this stage.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {serviceAreas.map((area) => (
              <div key={area} className="rounded-[8px] border border-[#dbe0e3] bg-[#fbfcfc] px-4 py-4">
                <p className="font-['Inter',sans-serif] text-[15px] font-bold text-[#0e1215]">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 lg:grid-cols-[360px_1fr] lg:px-[88px]">
          <div>
            <h2 className="font-['Inter',sans-serif] text-[30px] font-extrabold leading-[1.1] text-[#0e1215]">Service FAQs</h2>
            <p className="mt-4 font-['Inter',sans-serif] text-[16px] font-normal leading-[1.6] text-[#475259]">Useful questions for this CMS template. Each service can carry its own answers.</p>
          </div>
          <div className="divide-y divide-[#dbe0e3]">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="py-6 first:pt-0">
                <h3 className="font-['Inter',sans-serif] text-[18px] font-bold leading-[1.35] text-[#0e1215]">{faq.question}</h3>
                <p className="mt-2 font-['Inter',sans-serif] text-[15px] font-normal leading-[1.65] text-[#475259]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#0e1215] py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-[88px]">
          <div>
            <h2 className="max-w-[700px] font-['Inter',sans-serif] text-[30px] font-extrabold leading-[1.1] text-white lg:text-[38px]">
              Ready to talk through {service.name.toLowerCase()}?
            </h2>
            <p className="mt-4 max-w-[620px] font-['Inter',sans-serif] text-[16px] font-normal leading-[1.6] text-white/75">
              Send a few details and the team can advise what is practical, what to expect, and whether photos would help with quoting.
            </p>
          </div>
          <ButtonLink to="/contact">Request a Quote</ButtonLink>
        </div>
      </section>
      <section className="bg-[#fbfcfc] py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
          <h2 className="mb-8 font-['Inter',sans-serif] text-[28px] font-extrabold leading-[1.1] text-[#0e1215]">Related services</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((item) => (
              <ServiceCard key={item.slug} service={item} />
            ))}
          </div>
        </div>
      </section>
      <CTASection compact />
    </>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="mb-6 font-['Inter',sans-serif] text-[30px] font-extrabold leading-[1.1] text-[#0e1215] lg:text-[36px]">{title}</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#ff4d00]" />
            <p className="font-['Inter',sans-serif] text-[16px] font-normal leading-[1.6] text-[#475259]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutPage() {
  const values = [
    {
      title: "Straight answers",
      copy: "Customers should know what is realistic before work begins, especially with stains, odours, water damage, or older carpet.",
    },
    {
      title: "Proper equipment",
      copy: "The site can show that the team uses trade equipment and service-specific methods rather than generic one-size-fits-all cleaning.",
    },
    {
      title: "Local service",
      copy: "Phone numbers, locations, and regional wording should make the business feel easy to reach and grounded in the area.",
    },
  ];

  const aboutStats = [
    ["6,000+", "Cleaning jobs completed"],
    ["4.8", "Google review rating"],
    ["7 Days", "Available through the week"],
    ["IICRC", "Training and certification cue"],
  ];

  return (
    <>
      <PageHero
        title="Local people, proper gear, honest work"
        copy="Advanced Carpets is built around practical cleaning, restoration know-how, and direct local service across Central Otago and the Southern Lakes."
      />
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 lg:grid-cols-[1fr_1fr] lg:px-[88px]">
          <div className="rounded-[12px] bg-[#1e2326] p-8 lg:min-h-[420px]">
            <div className="flex h-full min-h-[300px] items-end rounded-[8px] border border-white/10 bg-[linear-gradient(135deg,#212e33,#0e1215)] p-6">
              <p className="max-w-[360px] font-['Inter',sans-serif] text-[14px] font-medium leading-[1.5] text-white/60">
                Team and equipment photography can sit here once final client media is selected.
              </p>
            </div>
          </div>
          <div>
            <h2 className="mb-6 font-['Inter',sans-serif] text-[32px] font-extrabold leading-[1.1] text-[#0e1215] lg:text-[40px]">
              Built for local homes, rentals, and businesses
            </h2>
            <div className="space-y-4 font-['Inter',sans-serif] text-[16px] font-normal leading-[1.75] text-[#475259] lg:text-[17px]">
              <p>
                The site should make Advanced Carpets feel reliable, direct, and established without drifting into generic sales copy.
              </p>
              <p>
                The client can expand this page with a real business story, team image, restoration training, equipment notes, and practical details about the areas serviced.
              </p>
              <p>
                For the Webflow version, this page stays static. It does not need CMS unless there is a future team, awards, or case-study section.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {["Local operator", "IICRC-trained", "7-day service"].map((item) => (
                <div key={item} className="rounded-[8px] border border-[#dbe0e3] bg-[#fbfcfc] p-4">
                  <p className="font-['Inter',sans-serif] text-[14px] font-bold text-[#0e1215]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="border-y border-[#dbe0e3] bg-[#fbfcfc] py-12">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-4 px-6 lg:grid-cols-4 lg:px-[88px]">
          {aboutStats.map(([metric, label]) => (
            <div key={metric} className="rounded-[8px] border border-[#dbe0e3] bg-white p-5">
              <p className="font-['Inter',sans-serif] text-[30px] font-extrabold leading-none text-[#0e1215]">{metric}</p>
              <p className="mt-2 font-['Inter',sans-serif] text-[13px] font-medium leading-[1.4] text-[#475259]">{label}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
          <div className="mb-10 max-w-[760px]">
            <p className="mb-3 font-['Inter',sans-serif] text-[13px] font-semibold uppercase tracking-[1.04px] text-[#08abe6]">How we work</p>
            <h2 className="font-['Inter',sans-serif] text-[30px] font-extrabold leading-[1.1] text-[#0e1215] lg:text-[38px]">
              The practical standards behind the service
            </h2>
            <p className="mt-4 font-['Inter',sans-serif] text-[16px] font-normal leading-[1.65] text-[#475259] lg:text-[17px]">
              About pages on service sites usually need to answer a simple question: can I trust these people in my home or business? This layout gives the final Webflow page room for proof, process, and real local context.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-[8px] border border-[#dbe0e3] bg-[#fbfcfc] p-6">
                <div className="mb-5 h-1 w-14 rounded-full bg-[#ff4d00]" />
                <h3 className="font-['Inter',sans-serif] text-[22px] font-bold leading-[1.2] text-[#0e1215]">{value.title}</h3>
                <p className="mt-3 font-['Inter',sans-serif] text-[15px] font-normal leading-[1.65] text-[#475259]">{value.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TrustSection />
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-[88px]">
          <div>
            <p className="mb-3 font-['Inter',sans-serif] text-[13px] font-semibold uppercase tracking-[1.04px] text-[#08abe6]">Service area</p>
            <h2 className="font-['Inter',sans-serif] text-[30px] font-extrabold leading-[1.1] text-[#0e1215] lg:text-[38px]">
              Based around Central Otago and the Southern Lakes
            </h2>
            <p className="mt-4 font-['Inter',sans-serif] text-[16px] font-normal leading-[1.65] text-[#475259]">
              This section helps the client see how the About page can support local trust and practical contact information, not just brand story.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {locations.map((location) => (
              <div key={location.city} className="rounded-[8px] border border-[#dbe0e3] bg-[#fbfcfc] p-5">
                <p className="font-['Inter',sans-serif] text-[20px] font-bold text-[#0e1215]">{location.city}</p>
                <p className="mt-2 font-['Inter',sans-serif] text-[15px] font-semibold text-[#475259]">{location.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#fbfcfc] py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-6 lg:grid-cols-[1fr_1fr] lg:px-[88px]">
          <div className="rounded-[12px] bg-[#0e1215] p-7">
            <div className="flex min-h-[340px] items-end rounded-[8px] border border-white/10 bg-[linear-gradient(135deg,#24343a,#11171b)] p-5">
              <p className="font-['Inter',sans-serif] text-[13px] font-medium leading-[1.5] text-white/55">
                Workshop, van, equipment, or team image placeholder. Use real client media here for the final site.
              </p>
            </div>
          </div>
          <div className="rounded-[12px] border border-[#dbe0e3] bg-white p-7 lg:p-9">
            <p className="mb-3 font-['Inter',sans-serif] text-[13px] font-semibold uppercase tracking-[1.04px] text-[#ff4d00]">What to show next</p>
            <h2 className="font-['Inter',sans-serif] text-[30px] font-extrabold leading-[1.1] text-[#0e1215] lg:text-[36px]">
              Proof that feels useful, not over-polished
            </h2>
            <div className="mt-6 space-y-4 font-['Inter',sans-serif] text-[16px] font-normal leading-[1.7] text-[#475259]">
              <p>
                Good service-site About pages usually include the operator's story, training, equipment, response area, and what customers can expect when they call.
              </p>
              <p>
                The final Webflow version can replace this placeholder copy with Kevin's real business history and use client-supplied photos instead of generic imagery.
              </p>
            </div>
            <div className="mt-8">
              <ButtonLink to="/contact">Request a Quote</ButtonLink>
            </div>
          </div>
        </div>
      </section>
      <CTASection compact />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHero
        title="Request a quote or ask a question"
        copy="Keep the contact flow short. The final Webflow build can connect this to the preferred form, email, or Tradeify workflow."
      />
      <section className="bg-[#fbfcfc] py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-6 lg:grid-cols-[1fr_420px] lg:px-[88px]">
          <div className="overflow-hidden rounded-[10px] border border-[#dbe0e3] bg-white">
            <TradeifyEmbedMock />
          </div>
          <aside className="rounded-[10px] bg-[#0e1215] p-7">
            <h2 className="font-['Inter',sans-serif] text-[26px] font-extrabold leading-[1.15] text-white">Contact details</h2>
            <div className="mt-6 space-y-5">
              {locations.map((location) => (
                <div key={location.city} className="border-b border-white/10 pb-4 last:border-b-0">
                  <p className="font-['Inter',sans-serif] text-[14px] font-semibold text-white/55">{location.city}</p>
                  <p className="mt-1 font-['Inter',sans-serif] text-[18px] font-bold text-white">{location.phone}</p>
                </div>
              ))}
              <div>
                <p className="font-['Inter',sans-serif] text-[14px] font-semibold text-white/55">Email</p>
                <p className="mt-1 font-['Inter',sans-serif] text-[16px] font-bold text-white">office@advancedcarpet.co.nz</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function NotFoundPage() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[900px] px-6 text-center">
        <Home className="mx-auto h-10 w-10 text-[#08abe6]" />
        <h1 className="mt-5 font-['Inter',sans-serif] text-[36px] font-extrabold text-[#0e1215]">Page not found</h1>
        <p className="mt-3 font-['Inter',sans-serif] text-[16px] text-[#475259]">This prototype route does not exist.</p>
        <div className="mt-8">
          <ButtonLink to="/" variant="dark">Back home</ButtonLink>
        </div>
      </div>
    </section>
  );
}

function AppShell() {
  return (
    <div className="min-h-screen bg-[#fbfcfc] font-['Inter',sans-serif]">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}
