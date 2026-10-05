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

  /** Used by the live clock in the header. Year is shown as 2100 by design. */
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
      category: "Digital Receipt · ASP.NET",
      year: "2026",
      summary: "A digital vehicle-emission receipt experience combining legacy enterprise data, certificate generation, vehicle imagery, QR/barcode handling and SMS delivery workflows.",
      href: "#",
    },
    {
      code: "P—02",
      title: "Performance Management Systems",
      category: "HR · Web API · SQL Server",
      year: "2026",
      summary: "Enterprise performance-management workflows involving employee dashboards, scoring, stages, goals, supervisors and bell-curve reporting.",
      href: "#",
    },
    {
      code: "P—03",
      title: "Employee & Member Management",
      category: "ASP.NET · React",
      year: "2026",
      summary: "Business applications for employee, contact and family-member information, built around structured APIs, reusable UI components and relational data.",
      href: "#",
    },
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
