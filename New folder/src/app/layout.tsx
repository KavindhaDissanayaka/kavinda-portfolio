import type { Metadata, Viewport } from "next";
// Fonts are self-hosted from npm packages — no network needed at build time.
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import { fullName, profile } from "@/data/profile";
import "./globals.css";

export const metadata: Metadata = {
  title: `${fullName} — Human Interface 2100`,
  description: `${fullName} · ${profile.role}. Personal portfolio.`,
  openGraph: {
    title: fullName,
    description: `${profile.role} — portfolio`,
    images: [profile.portrait],
  },
};

export const viewport: Viewport = {
  themeColor: "#e9edee",
};

/** Applies the saved atmosphere before first paint, so there's no flash. */
const atmosphereScript = `
try {
  var a = localStorage.getItem('atmosphere');
  if (a === 'day' || a === 'dawn' || a === 'dusk') document.documentElement.dataset.atmosphere = a;
} catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-atmosphere="day"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: atmosphereScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
