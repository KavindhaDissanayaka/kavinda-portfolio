/**
 * All site content lives here. Edit this file to update the portfolio —
 * components read from it, so you rarely need to touch the markup.
 */

export type Capability = { title: string; body: string; tags: string[] };
export type Milestone = { period: string; title: string; org: string; note: string; current?: boolean };
export type Project = {
  code: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  href: string;
  /** Path under /public, e.g. "/projects/atlas.jpg". Leave empty for a placeholder. */
  image?: string;
};
export type Stat = { value: string; suffix?: string; label: string };
export type NavItem = {
  label: string;
  hint: string;
  /** "/page" opens an in-site page, "/#section" jumps to a section of the home page,
   *  "https://…" opens in a new tab, "" shows the item as OFFLINE until you add a link. */
  href: string;
  icon: "home" | "youtube" | "facebook" | "github" | "linkedin" | "cpu" | "mail";
};
export type Link = { label: string; handle: string; href: string };

/**
 * One place for every outside account. The in-site pages (/youtube, /github,
 * /facebook, /linkedin) and the contact section all read from here.
 */
export const socials = {
  github: { username: "KavindhaDissanayaka" },
  youtube: {
    handle: "yourkavinda",
    /** Your channel id (YouTube Studio → Settings → Channel → Advanced). Set, so no lookup is needed. */
    channelId: "UCso63j0kzyhTLSvHthZ9ZIw",
  },
  facebook: {
    handle: "kavindu.dissanayaka.33",
    url: "https://www.facebook.com/kavindu.dissanayaka.33/",
    /**
     * Public posts/videos to show on the /facebook page. Paste each post's link
     * (post → "…" → Copy link). The post must be set to Public. Example:
     *   posts: ["https://www.facebook.com/kavindu.dissanayaka.33/posts/123456789"],
     */
    posts: [] as string[],
    /** Only if you have a Facebook *Page* (not a personal profile): its link shows the Page's timeline. */
    pageUrl: "",
  },
  linkedin: { handle: "kavindadissanayka", url: "https://www.linkedin.com/in/kavindadissanayka" },
};

export const profile = {
  firstName: "Kavinda",
  lastName: "Dissanayaka",
  initials: "KD",
  role: "ASP.NET Web API Engineer",
  focus: "building reliable backend systems and human-friendly business applications",
  portrait: "/portrait.webp",

  /** The CV offered by the "Download CV" button. Replace the file in /public to update it. */
  cv: { href: "/Kavinda_Dissanayaka_CV.pdf", fileName: "Kavinda_Dissanayaka_CV.pdf" },

  /** Used by the live clock in the header. The year shown is the real current year. */
  timezone: { offsetHours: 5.5, label: "UTC+05:30" },
  status: "Open to meaningful collaborations",

  marquee: [
    { text: "Building reliable systems", italic: false },
    { text: "calm by intent", italic: true },
    { text: "Human at the core", italic: false },
    { text: "backend first, always learning", italic: true },
  ],

  about: {
    who: "A backend-focused engineer who turns business requirements into practical APIs, data systems and software that people can actually use.",
    detail:
      "I work mainly with C#, ASP.NET and SQL Server, with a strong interest in clean architecture, maintainable APIs and real-world enterprise applications. I am also expanding into React so I can understand and build the complete path from interface to database.",
    currently: "Building and maintaining ASP.NET Web API solutions while deepening my React and modern full-stack engineering skills.",
    currentlyUpdated: "October, 2026",
    coordinates: ["Sri Lanka", "Sinhala · English", "BSc (Hons) IT · University of Sri Jayewardenepura"],
  },

  stats: [
    { value: "3", suffix: "+", label: "Years of industry experience" },
    { value: "Multiple", label: "Business systems shipped" },
  ] satisfies Stat[],

  capabilities: [
    {
      title: "ASP.NET & Web APIs",
      body: "Designing and developing business-focused APIs with C#, ASP.NET Core and REST principles, with attention to validation, dependency injection, maintainability and production-ready structure.",
      tags: ["C#", "ASP.NET Core", "REST API"],
    },
    {
      title: "Clean Architecture",
      body: "Structuring applications around clear responsibilities across Domain, Application, Infrastructure and API layers, using services, repositories, DTOs, validation and dependency injection where they add value.",
      tags: ["Clean Architecture", "DI", "EF Core"],
    },
    {
      title: "Data & Enterprise Systems",
      body: "Working with SQL Server, Entity Framework and existing enterprise databases, including stored procedures, reporting workflows, integrations and legacy applications that still matter to the business.",
      tags: ["SQL Server", "EF Core", "Enterprise Apps"],
    },
    {
      title: "Full-Stack Growth",
      body: "Expanding beyond backend development into React and modern frontend engineering, with the goal of understanding the complete user-to-database journey and building stronger end-to-end products.",
      tags: ["React", "TypeScript", "Full Stack"],
    },
  ] satisfies Capability[],

  timeline: [
    {
      period: "Academic",
      title: "BSc (Hons) in Information Technology",
      org: "University of Sri Jayewardenepura",
      note: "Graduated with Second Class Lower Division and built the foundation for a career in software engineering.",
    },
    {
      period: "Early career",
      title: "C# / WinForms Developer",
      org: "Software Development",
      note: "Started building business applications with C# and developed practical experience working with real-world requirements.",
    },
    {
      period: "Industry",
      title: "ASP.NET / Web API Development",
      org: "Enterprise Software",
      note: "Moved deeper into backend engineering, APIs, SQL Server, integrations and maintainable application architecture.",
    },
    {
      period: "Current",
      title: "ASP.NET Web API Engineer",
      org: "LAUGFS",
      note: "Building and supporting business systems while continuing to grow toward modern full-stack engineering.",
      current: true,
    },
  ] satisfies Milestone[],

projects: [
  {
    code: "P—01",
    title: "EcoSri Digital Receipt",
    category: "Vehicle Emission · ASP.NET · PDF · QR",
    year: "2026",
    summary:
      "A digital vehicle-emission certificate and receipt solution that transforms legacy testing data into customer-facing digital documents. The system handles vehicle information, certificate generation, QR/barcode processing, vehicle images and SMS-based access to digital receipts.",
    href: "https://mytest.laugfs.lk/?vin=wos-2zwHpp3vSeCSRphl7GUvlBIN4XthbjcpjUseCu41",
  },

  {
    code: "P—02",
    title: "Performance Management System",
    category: "HR · ASP.NET Web API · SQL Server",
    year: "2026",
    summary:
      "An enterprise performance-management platform supporting employee goals, performance stages, scoring, supervisor workflows and management reporting. Built around complex SQL reporting and business rules, including performance ratings and bell-curve analysis.",
    href: "https://pms.laugfs.lk/",
  },

  {
    code: "P—03",
    title: "Employee & Member Management",
    category: "ASP.NET · React · SQL Server",
    year: "2026",
    summary:
      "A collection of business management applications for maintaining employee, contact and family-member information. The solution combines structured Web APIs with reusable React components, modal workflows, data tables and relational database operations.",
    href: "#",
  },

  {
    code: "P—04",
    title: "Bell Curve Performance Reporting",
    category: "ASP.NET Web API · React · SQL Server",
    year: "2026",
    summary:
      "A performance-rating and bell-curve reporting system designed to analyse employee results across companies, departments and employee categories. Includes rating workflows, performance sections, PMS cycles and data-driven reporting.",
    href: "#",
  },

  {
    code: "P—05",
    title: "Document Management & eForms",
    category: "ASP.NET · SQL Server · Enterprise Workflow",
    year: "2026",
    summary:
      "Enterprise document and electronic-form workflows for managing document submissions, processing stages, assignments and service-level requirements. Includes workflow tracking, SLA-related processing, document uploads and operational reporting.",
    href: "https://eforms.laugfs.lk/  ",
  },

  {
    code: "P—06",
    title: "Employee Contact Management",
    category: "ASP.NET Core · Web API · EF Core",
    year: "2026",
    summary:
      "A structured employee contact-management API supporting multiple contact numbers and email addresses per employee. Designed with relational data modelling, composite keys, Entity Framework Core and a layered Web API architecture.",
    href: "#",
  },

  {
    code: "P—07",
    title: "Organization Management API",
    category: "ASP.NET Core · Clean Architecture · SQL Server",
    year: "2026",
    summary:
      "A modern organization-management API developed using ASP.NET Core and a layered architecture. The project demonstrates dependency injection, repository and service patterns, Entity Framework Core and separation of business logic from infrastructure concerns.",
    href: "#",
  },

  {
    code: "P—08",
    title: "GAS CRM",
    category: "Next.js · React · TypeScript · Prisma",
    year: "2026",
    summary:
      "A modern CRM application built around a React and Next.js frontend with TypeScript and Prisma-based data access. The project represents the transition from traditional ASP.NET business applications toward modern full-stack web development.",
    href: "#",
  },

  {
    code: "P—09",
    title: "Finance & Loan Tracker",
    category: "Flutter · Dart · SQLite",
    year: "2026",
    summary:
      "A standalone mobile finance-management application for tracking income, expenses, loans and partial repayments. Designed with local SQLite storage and accounting-oriented data structures including chart-of-accounts concepts and financial reporting.",
    href: "#",
  },

  {
    code: "P—10",
    title: "Employee Enrollment Management",
    category: "ASP.NET Core · React · Clean Architecture",
    year: "2026",
    summary:
      "A full-stack employee enrollment concept connecting companies, departments, positions, employees, user accounts and roles. Designed around Clean Architecture, Web APIs, role-based access control, authentication and audit-friendly business workflows.",
    href: "#",
  },
    {
    code: "P—11",
    title: "Export & Warehouse Management System",
    category: "ERP · ASP.NET WinForms · SQL Server",
    year: "FutureTeck",
    summary:
      "An enterprise export and warehouse management application covering tea auction purchases, blend creation, purchased-item allocation, internal and external blend operation management, shortage and excess quantity recording before packaging, blend packing, shipment allocation and final blend shipment processing.",
    href: "#",
  },

  {
    code: "P—12",
    title: "Timber Management System",
    category: "ERP · ASP.NET WinForms · SQL Server",
    year: "FutureTeck",
    summary:
      "An estate-focused timber management application supporting estate-wise timber inventory, tree-level height and girth recording, tree status maintenance, timber valuation, timber sale allocation and timber valuation reporting.",
    href: "#",
  },

  {
    code: "P—13",
    title: "Annual Detail Budget",
    category: "ERP · ASP.NET WinForms · Finance · SQL Server",
    year: "FutureTeck",
    summary:
      "A financial budgeting application supporting monthly budget allocation against chart-of-account structures, month-end detailed budget versus actual comparisons, budget-based reporting including P&L, NSA and trial balance reports, and alerts when expenditure exceeds allocated budgets.",
    href: "#",
  },

  {
    code: "P—14",
    title: "Centralized Store Management",
    category: "ERP · ASP.NET WinForms · Inventory · SQL Server",
    year: "FutureTeck",
    summary:
      "A centralized inventory management application supporting purchase order generation against purchase requisitions, GRN-based stock balance maintenance using FIFO principles, item issuing processes and estate-wise GRN tracking.",
    href: "#",
  }
] satisfies Project[],


  /** Items in the robotic navigation menu (the portrait button, top-left). Reorder or edit freely. */
  nav: [
    { label: "Portfolio", hint: "Back to the main page", href: "/", icon: "home" },
    { label: "YouTube", hint: "Videos, played right here", href: "/youtube", icon: "youtube" },
    { label: "Facebook", hint: "Updates & community", href: "/facebook", icon: "facebook" },
    { label: "Simulations", hint: "Projects I have built", href: "/#archive", icon: "cpu" },
    { label: "GitHub", hint: "All public repositories", href: "/github", icon: "github" },
    { label: "LinkedIn", hint: "Professional network", href: "/linkedin", icon: "linkedin" },
    { label: "Contact", hint: "Open a channel", href: "/#transmit", icon: "mail" },
  ] satisfies NavItem[],

  contact: {
    email: "[your@email.com]",
    intro: "Interested in backend engineering, ASP.NET, APIs, business applications, architecture or building something useful from the ground up? Let's open a channel.",
    links: [
      { label: "LinkedIn", handle: socials.linkedin.handle, href: socials.linkedin.url },
      { label: "GitHub", handle: socials.github.username, href: `https://github.com/${socials.github.username}` },
    ] satisfies Link[],
  },
};

export const fullName = `${profile.firstName} ${profile.lastName}`;
