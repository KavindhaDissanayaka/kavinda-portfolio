type IconProps = { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const ArrowRight = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export const Plus = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

export const Send = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M22 2L11 13" />
    <path d="M22 2l-7 20-4-9-9-4z" />
  </svg>
);

export const Youtube = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <path d="M9.75 15.02l5.75-3.27-5.75-3.27z" />
  </svg>
);

export const Facebook = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const Github = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export const Linkedin = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Cpu = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
  </svg>
);

export const Mail = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
);


export const Home = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M3 10.5L12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
    <path d="M10 21v-6h4v6" />
  </svg>
);

export const Star = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const GitFork = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <circle cx="6" cy="4" r="2" />
    <circle cx="18" cy="4" r="2" />
    <circle cx="12" cy="20" r="2" />
    <path d="M6 6v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V6M12 12v6" />
  </svg>
);

export const Play = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M7 4.5v15l13-7.5z" />
  </svg>
);

export const NAV_ICONS = { home: Home, youtube: Youtube, facebook: Facebook, github: Github, linkedin: Linkedin, cpu: Cpu, mail: Mail } as const;
export type NavIconName = keyof typeof NAV_ICONS;
