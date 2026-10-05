import type { Metadata } from "next";
import ExternalPortal from "@/components/ExternalPortal";
import { fullName, socials } from "@/data/profile";

export const metadata: Metadata = { title: `LinkedIn — ${fullName}` };

export default function LinkedinPage() {
  return (
    <ExternalPortal
      eyebrow="[ CHANNEL 04 ] — LinkedIn"
      title="Professional"
      accent="network."
      intro="Experience, education and recommendations. LinkedIn doesn't allow itself to be shown inside other websites, so the link opens in a new tab."
      network="LinkedIn"
      handle={socials.linkedin.handle}
      url={socials.linkedin.url}
      icon="linkedin"
    />
  );
}
