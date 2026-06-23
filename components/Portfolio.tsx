"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Boxes,
  Check,
  ChevronDown,
  Cloud,
  Code2,
  Database,
  Download,
  ExternalLink,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Moon,
  Phone,
  Server,
  Sparkles,
  Sun,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import SmoothScroll from "./SmoothScroll";
import AnimatedCounter from "./ui/AnimatedCounter";
import MagneticButton from "./ui/MagneticButton";
import Reveal, { RevealItem, RevealStagger } from "./ui/Reveal";
import Tilt from "./ui/Tilt";

type Theme = "light" | "dark";

/* ──────────────────────────────────────────────────────────────
   Content — driven entirely by config, sourced from the résumé.
   ────────────────────────────────────────────────────────────── */

const PROFILE = {
  name: "Ajit Kumar",
  role: "Full Stack Software Engineer",
  tagline:
    "Product-focused engineer with 3.5+ years building scalable SaaS and healthcare platforms — end-to-end ownership from system design to production.",
  location: "Gurugram, India",
  email: "mail.ajkumarray@gmail.com",
  phone: "+91-6299294533",
  github: "https://github.com/ajkumarray",
  linkedin: "https://www.linkedin.com/in/ajkumarray",
  resumeUrl: "/resume.pdf",
};

const HERO_BADGES = ["3.5+ YEARS", "JAVA · SPRING BOOT", "ANGULAR · REACT", "AWS · MICROSERVICES"];

const RING_LABELS = ["Java", "Spring", "Angular", "React", "AWS", "Docker"];

const STATS: { to: number; prefix?: string; suffix?: string; decimals?: number; label: string }[] = [
  { to: 3.5, suffix: "+", decimals: 1, label: "Years building production products" },
  { to: 20, suffix: "+", label: "Pharma clients supported" },
  { to: 45, prefix: "~", suffix: "k", label: "Patients served by platforms" },
  { to: 50, suffix: "+", label: "Healthcare programs powered" },
];

type Experience = {
  id: string;
  company: string;
  period: string;
  role: string;
  title: string;
  tags: string[];
  accent: string;
  points: string[];
};

const EXPERIENCE: Experience[] = [
  {
    id: "pap",
    company: "Docquity · Gurugram",
    period: "JAN 2023 — PRESENT",
    role: "SDE",
    title: "Patient Assistance Program (PAP)",
    accent: "#8f6b1f",
    tags: ["Angular 20", "NgRx", "RxJS", "Reactive Forms", "RBAC"],
    points: [
      "Led the frontend redesign of a multi-tenant PAP platform, modernizing a legacy Angular 10 app to support 20+ pharma clients, 40–50 active programs, and workflows serving 30k–45k patients and 4.5k doctors.",
      "Designed a metadata-driven dynamic form engine with 20+ configurable field types, powering configuration-driven onboarding, enrollment, consent management, and benefit delivery.",
      "Implemented nested/recursive forms, API-driven dropdowns, file uploads, consent workflows, configurable validations, and conditional rendering.",
      "Architected a scalable frontend with Angular 20 standalone components, lazy-loaded modules, route-level DI, and NgRx state — improving maintainability and reducing bundle size.",
      "Built an RBAC framework with route guards, HTTP interceptors, and permission-driven UI across patients, doctors, pharma admins, approvers, and ops teams.",
    ],
  },
  {
    id: "onboarding",
    company: "Docquity · Gurugram",
    period: "JAN 2023 — PRESENT",
    role: "SDE",
    title: "Onboarding & Authentication Platform",
    accent: "#007c75",
    tags: ["TypeScript", "npm package", "PostgreSQL", "OTP / SSO", "Webpack"],
    points: [
      "Led a configurable onboarding & auth platform used across 4 Angular apps, supporting 15–20 pharma clients, 30+ programs, and multi-country/multi-language flows.",
      "Built an Angular admin portal with PostgreSQL-backed config management — letting product & ops teams manage journeys, attributes, branding, and login methods without deployments.",
      "Developed a reusable npm package (TypeScript, SCSS, Webpack) that dynamically renders onboarding and auth experiences across client apps.",
      "Implemented customizable login/signup with OTP, MPIN, Password, Google, Microsoft, and Meta SSO — cutting onboarding turnaround from release cycles to 5–10 minutes.",
      "Designed scalable REST APIs and configuration services for low-latency access and reliable production performance.",
    ],
  },
  {
    id: "survey",
    company: "Docquity · Gurugram",
    period: "JAN 2023 — PRESENT",
    role: "SDE",
    title: "Survey, CME Quiz & Poll Engine",
    accent: "#8c4fb3",
    tags: ["Java", "Spring Boot", "PostgreSQL", "MongoDB", "Redis"],
    points: [
      "Led configurable Survey, CME Quiz, and Poll modules with 12+ question types, validations, conditional visibility, and scoring rules.",
      "Built a dynamic form rendering and conditional-logic engine (Angular Reactive Forms, NgRx, RxJS) supporting configurable sections and workflows without code changes.",
      "Developed backend services in Java/Spring Boot with PostgreSQL, MongoDB, and Redis for content config, responses, analytics, and CME scoring.",
      "Designed a normalized config model — PostgreSQL for form metadata, MongoDB for responses — enabling flexible schema evolution with efficient analytics.",
      "Enabled question-level analytics, participation tracking, and compliance reporting integrated with webinar-based learning workflows.",
    ],
  },
  {
    id: "hcp",
    company: "Docquity · Gurugram",
    period: "JAN 2023 — PRESENT",
    role: "SDE",
    title: "HCP Groups & Content Targeting",
    accent: "#b84f2c",
    tags: ["Neo4j", "Microservices", "Angular", "Graph queries"],
    points: [
      "Developed a group-based audience segmentation and content-targeting platform for Healthcare Professionals, with reusable audience definitions across surveys, CMEs, polls, and webinars.",
      "Built Angular admin modules for community/group management — public/private groups, role-based memberships, dynamic enrollment, and configurable access policies.",
      "Enabled ops teams to define reusable segments via pharma, community, association, country, segment, and role filters — eliminating repetitive targeting logic.",
      "Contributed to migration from a MySQL monolith to a Neo4j-powered microservices architecture for graph-based relationship queries and personalized recommendations.",
    ],
  },
];

type Project = {
  title: string;
  blurb: string;
  tags: string[];
  links: { label: string; href: string }[];
};

const PROJECTS: Project[] = [
  {
    title: "Nirdeshak — URL Shortener",
    blurb:
      "Production-ready full-stack URL shortening platform with authenticated & anonymous link creation, expiration-based lifecycle, JWT auth, role-aware management, and click analytics. Fully automated CI/CD from dev to production.",
    tags: ["React", "TypeScript", "Spring Boot", "PostgreSQL", "Docker", "GitHub Actions", "AWS EC2"],
    links: [
      { label: "Live Demo", href: "#" },
      { label: "Backend", href: "https://github.com/ajkumarray" },
      { label: "Frontend", href: "https://github.com/ajkumarray" },
    ],
  },
];

const SKILLS: { icon: LucideIcon; label: string; items: string[] }[] = [
  { icon: Code2, label: "Languages", items: ["Java", "TypeScript", "JavaScript", "Python", "C++"] },
  {
    icon: Server,
    label: "Backend",
    items: ["Spring Boot", "Spring Security", "JPA/Hibernate", "REST APIs", "JWT", "Express.js", "NestJS", "Node.js", "gRPC"],
  },
  {
    icon: Layers,
    label: "Frontend",
    items: ["Angular", "React", "Next.js", "RxJS", "NgRx", "Bootstrap", "PrimeNG", "Tailwind CSS", "HTML5", "SCSS"],
  },
  { icon: Database, label: "Databases & Caching", items: ["PostgreSQL", "MySQL", "MongoDB", "Neo4j", "Redis"] },
  {
    icon: Cloud,
    label: "Cloud & DevOps",
    items: ["AWS (EC2, S3, Secrets Manager)", "Docker", "Kubernetes", "GitHub Actions", "Jenkins", "CI/CD", "Git", "Maven"],
  },
  {
    icon: Boxes,
    label: "Architecture & Concepts",
    items: ["Microservices", "Distributed Systems", "RBAC", "OAuth/SSO", "Config-Driven Systems", "System Design", "DSA"],
  },
  { icon: Wrench, label: "Tools & Build", items: ["Webpack", "npm", "Swagger/OpenAPI"] },
];

const EDUCATION = {
  school: "Birla Institute of Technology, Mesra",
  degree: "B.Tech — Information Technology",
  period: "July 2019 — May 2023",
  detail: "CGPA 8.14 / 10 · Mesra, Ranchi",
};

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

/* ── brand glyphs (lucide has no brand marks in this version) ── */
function GithubGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.57.1.78-.25.78-.55v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.79.55A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedinGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

function Monogram({ size = 30 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="inline-flex items-center justify-center rounded-md bg-[var(--site-gold)] font-serif font-bold leading-none text-[var(--site-gold-ink)]"
      style={{ width: size, height: size, fontSize: size * 0.46 }}
    >
      AK
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────
   Chrome — theme toggle, nav, headings, ambient backdrop
   ────────────────────────────────────────────────────────────── */

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("ajit-theme") === "light" ? "light" : "dark";
    const frame = window.requestAnimationFrame(() => {
      setTheme(stored);
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (hydrated) window.localStorage.setItem("ajit-theme", theme);
  }, [hydrated, theme]);

  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition hover:-translate-y-0.5"
      style={{ borderColor: "var(--site-border)", background: "var(--site-card)", color: "var(--site-text)" }}
    >
      <Icon size={18} aria-hidden />
    </button>
  );
}

function PortfolioNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.3);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="sticky top-0 z-[100] h-14 border-b transition-all duration-300 md:h-16"
      style={{
        background: scrolled ? "var(--site-nav-solid)" : "var(--site-nav-glass)",
        borderColor: scrolled ? "var(--site-gold-soft)" : "transparent",
        backdropFilter: "blur(18px)",
      }}
    >
      <div className="mx-auto flex h-full w-[min(92vw,1560px)] items-center justify-between gap-4">
        <a href="#hero" className="flex min-w-0 shrink-0 items-center gap-2 text-[var(--site-gold)]">
          <Monogram size={30} />
          <span className="font-serif text-xl font-semibold">Ajit Kumar</span>
        </a>

        <div className="hidden flex-1 justify-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--site-muted)] transition hover:text-[var(--site-gold)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <ThemeToggle />
          <a
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-[var(--site-gold)] px-4 font-mono text-xs font-semibold uppercase text-[var(--site-gold-ink)] shadow-[0_14px_36px_-24px_rgba(0,0,0,0.7)] transition hover:-translate-y-0.5 hover:bg-[var(--site-gold-bright)] md:px-5"
          >
            <Download size={15} aria-hidden />
            <span className="hidden sm:inline">Résumé</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={clsx("mb-9 md:mb-12", align === "center" && "mx-auto max-w-3xl text-center")}>
      <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--site-teal)]">{eyebrow}</p>
      <h2 className="font-serif text-4xl font-bold leading-tight text-[var(--site-text)] md:text-6xl">{title}</h2>
      {copy ? <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--site-muted)] md:text-xl">{copy}</p> : null}
    </Reveal>
  );
}

function CircuitBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="ai-circuit-grid absolute inset-0" />
      <div className="ai-hero-glow ai-hero-glow-teal absolute right-[-16%] top-[-18%] h-[54vmax] w-[54vmax]" />
      <div className="ai-hero-glow ai-hero-glow-gold absolute bottom-[-30%] left-[-18%] h-[48vmax] w-[48vmax]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--site-hero-shade),transparent_52%,var(--site-hero-shade-soft))]" />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Hero
   ────────────────────────────────────────────────────────────── */

function CodeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, x: 36 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 0.61, 0.36, 1] }}
      className="relative hidden min-h-[520px] items-center justify-center lg:flex"
      aria-hidden
    >
      <motion.div
        className="absolute h-[420px] w-[420px] rounded-full border border-[var(--site-gold-soft)]"
        animate={{ scale: [1, 1.045, 1], opacity: [0.34, 0.7, 0.34] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-[340px] w-[340px] rounded-full border border-[var(--site-teal-soft)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {RING_LABELS.map((label, index) => (
          <span
            key={label}
            className="absolute rounded-full border border-[var(--site-border)] bg-[var(--site-card)] px-3 py-1 font-mono text-xs font-semibold text-[var(--site-text)]"
            style={{
              left: `${50 + Math.cos((index / RING_LABELS.length) * Math.PI * 2) * 49}%`,
              top: `${50 + Math.sin((index / RING_LABELS.length) * Math.PI * 2) * 49}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {label}
          </span>
        ))}
      </motion.div>

      <motion.div
        whileHover={{ y: -6, rotate: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
        className="relative w-[460px] overflow-hidden rounded-[16px] border border-[var(--site-gold-soft)] bg-[#0a0e1a] shadow-[0_30px_90px_-58px_rgba(201,168,76,0.75)]"
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#e05c3a]" />
          <span className="h-3 w-3 rounded-full bg-[#c9a84c]" />
          <span className="h-3 w-3 rounded-full bg-[#25c4b2]" />
          <span className="ml-3 font-mono text-[11px] text-[#8a8478]">engineer.ts</span>
        </div>
        <pre className="overflow-hidden px-5 py-5 font-mono text-[12.5px] leading-6 text-[#cfc9bd]">
          <span className="text-[#c580e8]">const</span> <span className="text-[#7eb8f7]">engineer</span> = {"{"}
          {"\n"}  name: <span className="text-[#4caf7d]">&quot;Ajit Kumar&quot;</span>,
          {"\n"}  role: <span className="text-[#4caf7d]">&quot;Full Stack Engineer&quot;</span>,
          {"\n"}  stack: [<span className="text-[#4caf7d]">&quot;Java&quot;</span>, <span className="text-[#4caf7d]">&quot;Spring&quot;</span>, <span className="text-[#4caf7d]">&quot;Angular&quot;</span>],
          {"\n"}  focus: <span className="text-[#4caf7d]">&quot;platform engineering&quot;</span>,
          {"\n"}  shipping: <span className="text-[#e8c96a]">true</span>,
          {"\n"}{"}"};
        </pre>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100svh-56px)] items-center overflow-hidden border-b border-[var(--site-border)] md:min-h-[calc(100svh-64px)]"
    >
      <CircuitBackdrop />
      <div className="relative mx-auto w-[min(92vw,1560px)] py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.6fr)]"
        >
          <div className="max-w-5xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--site-gold-soft)] bg-[var(--site-card)] px-4 py-2 font-mono text-xs font-semibold uppercase text-[var(--site-teal)]">
              <Sparkles size={15} aria-hidden />
              {PROFILE.role}
            </div>
            <h1 className="font-serif text-[clamp(2.6rem,8vw,6rem)] font-bold leading-[0.92] text-[var(--site-gold)]">
              {PROFILE.name}.
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-medium leading-8 text-[var(--site-text)] md:text-2xl">
              {PROFILE.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {HERO_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-[var(--site-border)] bg-[var(--site-pill)] px-4 py-2 font-mono text-xs font-semibold uppercase text-[var(--site-text)]"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <MagneticButton href="#contact" className="min-h-13 px-8 text-sm">
                Get in touch
              </MagneticButton>
              <MagneticButton href="#projects" variant="outline" className="min-h-13 px-8 text-sm">
                View work
                <ArrowUpRight size={17} aria-hidden />
              </MagneticButton>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-[var(--site-muted)]">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-xs uppercase transition hover:text-[var(--site-gold)]">
                <GithubGlyph size={16} /> GitHub
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-xs uppercase transition hover:text-[var(--site-gold)]">
                <LinkedinGlyph size={16} /> LinkedIn
              </a>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase">
                <MapPin size={15} aria-hidden /> {PROFILE.location}
              </span>
            </div>
          </div>
          <CodeCard />
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   Stats
   ────────────────────────────────────────────────────────────── */

function StatsStrip() {
  return (
    <section id="stats" className="section-band">
      <div className="mx-auto w-[min(92vw,1560px)]">
        <RevealStagger className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[var(--site-border)] bg-[var(--site-border)] lg:grid-cols-4">
          {STATS.map((stat) => (
            <RevealItem key={stat.label}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group relative min-h-[210px] overflow-hidden bg-[var(--site-card-strong)] p-6 text-center md:p-8"
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[var(--site-gold-soft)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60" />
                <div className="font-serif text-5xl font-bold leading-none text-[var(--site-gold)] md:text-6xl">
                  <AnimatedCounter to={stat.to} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
                </div>
                <div className="mx-auto mt-4 max-w-[230px] font-mono text-xs font-semibold uppercase leading-5 text-[var(--site-muted)]">
                  {stat.label}
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   About + Education
   ────────────────────────────────────────────────────────────── */

function About() {
  return (
    <section id="about" className="section-wide">
      <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--site-teal)]">About</p>
          <h2 className="font-serif text-4xl font-bold leading-tight text-[var(--site-text)] md:text-6xl">
            I build platforms that scale — from schema to screen.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--site-muted)] md:text-xl">
            Full Stack Software Engineer with 3.5+ years building scalable SaaS and healthcare platforms using Java,
            Spring Boot, Angular, PostgreSQL, MongoDB, Redis, and AWS. I specialise in platform engineering,
            microservices, dynamic workflows, RBAC, and system design — owning features end-to-end from design to
            production.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["Platform Engineering", "Microservices", "Dynamic Form Engines", "RBAC", "System Design"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[var(--site-border)] bg-[var(--site-pill)] px-4 py-2 font-mono text-xs font-semibold text-[var(--site-text)]"
              >
                {chip}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Tilt intensity={5} className="relative rounded-lg">
            <article className="course-card p-7 md:p-8">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--site-pill)]">
                <GraduationCap size={28} className="text-[var(--site-gold)]" strokeWidth={1.8} aria-hidden />
              </div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--site-teal)]">
                Education
              </p>
              <h3 className="mt-3 font-serif text-3xl font-bold leading-tight text-[var(--site-text)]">
                {EDUCATION.school}
              </h3>
              <p className="mt-3 text-lg font-semibold text-[var(--site-gold)]">{EDUCATION.degree}</p>
              <p className="mt-2 text-base text-[var(--site-muted)]">{EDUCATION.period}</p>
              <p className="mt-1 font-mono text-sm text-[var(--site-muted)]">{EDUCATION.detail}</p>
            </article>
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   Experience (expandable cards)
   ────────────────────────────────────────────────────────────── */

function ExperienceSection() {
  const [openId, setOpenId] = useState("");

  return (
    <section id="experience" className="section-band">
      <div className="mx-auto w-[min(92vw,1560px)]">
        <SectionHeading
          eyebrow="Experience"
          title="What I've shipped at Docquity."
          copy="Three and a half years owning multi-tenant healthcare platforms end-to-end. Tap a project to expand the detail."
        />
        <RevealStagger className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {EXPERIENCE.map((exp) => {
            const isOpen = openId === exp.id;
            return (
              <RevealItem key={exp.id}>
                <Tilt intensity={3.5} className="relative rounded-lg">
                  <motion.article
                    layout
                    className={clsx("course-card overflow-hidden p-0", isOpen && "course-card-active")}
                    style={{ "--accent": exp.accent } as React.CSSProperties}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? "" : exp.id)}
                      className="w-full p-6 text-left md:p-8"
                      aria-expanded={isOpen}
                    >
                      <div className="mb-6 flex items-center justify-between gap-4">
                        <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--accent)]">
                          {exp.period}
                        </span>
                        <span className="rounded-full border px-3 py-1 font-mono text-xs font-semibold uppercase text-[color:var(--accent)] [border-color:color-mix(in_srgb,var(--accent)_45%,transparent)]">
                          {exp.role}
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-serif text-3xl font-bold leading-tight text-[var(--site-text)] md:text-4xl">
                            {exp.title}
                          </h3>
                          <p className="mt-2 font-mono text-sm text-[var(--site-muted)]">{exp.company}</p>
                        </div>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--site-pill)] text-[var(--site-gold)]"
                          aria-hidden
                        >
                          <ChevronDown size={20} />
                        </motion.span>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[var(--site-pill)] px-3 py-1.5 font-mono text-xs font-semibold text-[var(--site-muted)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          key="points"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-[var(--site-border)] px-6 pb-7 pt-2 md:px-8">
                            {exp.points.map((point) => (
                              <p key={point} className="mt-4 flex gap-3 text-base leading-7 text-[var(--site-muted)]">
                                <Check size={18} className="mt-1 shrink-0 text-[color:var(--accent)]" aria-hidden />
                                <span>{point}</span>
                              </p>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.article>
                </Tilt>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   Projects
   ────────────────────────────────────────────────────────────── */

function ProjectsSection() {
  return (
    <section id="projects" className="section-wide">
      <SectionHeading
        eyebrow="Personal projects"
        title="Things I build on my own time."
        copy="Side projects taken from idea to production with full CI/CD — not just demos."
      />
      <RevealStagger className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <RevealItem key={project.title}>
            <Tilt intensity={5} className="relative h-full rounded-lg">
              <article className="course-card group relative flex h-full flex-col overflow-hidden p-7 md:p-8">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--site-teal-soft)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--site-pill)]">
                  <GithubGlyph size={26} />
                </div>
                <h3 className="relative font-serif text-3xl font-bold leading-tight text-[var(--site-text)]">
                  {project.title}
                </h3>
                <p className="relative mt-4 text-base leading-7 text-[var(--site-muted)] md:text-lg">{project.blurb}</p>
                <div className="relative mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[var(--site-pill)] px-3 py-1.5 font-mono text-xs font-semibold text-[var(--site-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="relative mt-auto flex flex-wrap gap-4 pt-7">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--site-gold)] transition hover:gap-2.5"
                    >
                      {link.label}
                      <ExternalLink size={14} aria-hidden />
                    </a>
                  ))}
                </div>
              </article>
            </Tilt>
          </RevealItem>
        ))}

        <RevealItem>
          <Tilt intensity={5} className="relative h-full rounded-lg">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="course-card group flex h-full min-h-[260px] flex-col items-center justify-center gap-4 p-8 text-center"
            >
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--site-pill)] text-[var(--site-gold)]">
                <GithubGlyph size={30} />
              </span>
              <h3 className="font-serif text-3xl font-bold text-[var(--site-text)]">More on GitHub</h3>
              <p className="max-w-xs text-base text-[var(--site-muted)]">
                Explore the rest of my repositories, experiments, and open-source work.
              </p>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--site-gold)] transition group-hover:gap-2.5">
                @ajkumarray <ArrowUpRight size={14} aria-hidden />
              </span>
            </a>
          </Tilt>
        </RevealItem>
      </RevealStagger>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   Skills
   ────────────────────────────────────────────────────────────── */

function SkillsSection() {
  return (
    <section id="skills" className="section-band">
      <div className="mx-auto w-[min(92vw,1560px)]">
        <SectionHeading
          eyebrow="Toolbox"
          title="The stack I work with."
          copy="A full-stack toolkit spanning JVM backends, modern frontend frameworks, polyglot data stores, and cloud-native DevOps."
        />
        <RevealStagger className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SKILLS.map((group) => {
            const Icon = group.icon;
            return (
              <RevealItem key={group.label}>
                <Tilt intensity={4} className="relative h-full rounded-lg">
                  <article className="course-card group h-full overflow-hidden p-7">
                    <div className="mb-6 flex items-center gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--site-pill)]">
                        <Icon size={22} className="text-[var(--site-gold)]" strokeWidth={1.8} aria-hidden />
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-[var(--site-text)]">{group.label}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[var(--site-border)] bg-[var(--site-pill)] px-3 py-1.5 font-mono text-xs font-semibold text-[var(--site-muted)] transition group-hover:text-[var(--site-text)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                </Tilt>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   Contact (dark CTA)
   ────────────────────────────────────────────────────────────── */

function ContactSection() {
  const channels = [
    { icon: <Mail size={20} aria-hidden />, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: <Phone size={20} aria-hidden />, label: "Phone", value: PROFILE.phone, href: `tel:${PROFILE.phone}` },
    { icon: <LinkedinGlyph size={20} />, label: "LinkedIn", value: "ajkumarray", href: PROFILE.linkedin },
    { icon: <GithubGlyph size={20} />, label: "GitHub", value: "ajkumarray", href: PROFILE.github },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--site-contact-bg)] py-20 text-[var(--site-text)] md:py-28">
      <div className="absolute inset-0 ai-circuit-grid opacity-35" aria-hidden />
      <div
        className="absolute left-[-10%] top-[-30%] h-[40vmax] w-[40vmax] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--site-gold) 16%, transparent), transparent 66%)" }}
        aria-hidden
      />
      <div className="relative mx-auto w-[min(92vw,1100px)] text-center">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--site-teal)]">Contact</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight text-[var(--site-gold-bright)] md:text-6xl">
            Let&apos;s build something solid.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--site-muted)]">
            Open to full-stack and platform engineering roles. The fastest way to reach me is email — I usually reply
            within a day.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MagneticButton href={`mailto:${PROFILE.email}`} className="min-h-13 px-8 text-sm">
              <Mail size={18} aria-hidden />
              Email me
            </MagneticButton>
            <MagneticButton href={PROFILE.resumeUrl} target="_blank" variant="ghost" className="min-h-13 px-8 text-sm">
              <Download size={18} aria-hidden />
              Download résumé
            </MagneticButton>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex flex-col items-center gap-2 rounded-lg border border-[var(--site-border)] bg-[var(--site-card)] p-5 transition hover:-translate-y-1 hover:border-[var(--site-gold-soft)]"
              >
                <span className="text-[var(--site-gold)]">{channel.icon}</span>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--site-muted)]">
                  {channel.label}
                </span>
                <span className="break-all text-sm text-[var(--site-text)]">{channel.value}</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PortfolioFooter() {
  return (
    <footer className="border-t border-[var(--site-border)] bg-[var(--site-footer)] py-8 text-[var(--site-muted)]">
      <div className="mx-auto flex w-[min(92vw,1560px)] flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
        <p className="text-sm">© {new Date().getFullYear()} Ajit Kumar</p>
        <a href="#hero" className="flex items-center gap-2 font-serif text-xl font-semibold text-[var(--site-gold)]">
          <Monogram size={26} />
          Ajit Kumar
        </a>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-1.5 hover:text-[var(--site-gold)]">
            <Mail size={15} aria-hidden /> Email
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[var(--site-gold)]">
            <LinkedinGlyph size={15} /> LinkedIn
          </a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-[var(--site-gold)]">
            <GithubGlyph size={15} /> GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[var(--site-page-bg)] text-[var(--site-text)]">
      <SmoothScroll />
      <PortfolioNav />
      <main id="main">
        <Hero />
        <StatsStrip />
        <About />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <PortfolioFooter />
    </div>
  );
}
