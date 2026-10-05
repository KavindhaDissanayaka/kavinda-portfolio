import type { Metadata } from "next";
import ExternalPortal from "@/components/ExternalPortal";
import FacebookEmbeds from "@/components/FacebookEmbeds";
import { fullName, socials } from "@/data/profile";

export const metadata: Metadata = { title: `Facebook — ${fullName}` };

export default function FacebookPage() {
  const { handle, url, posts, pageUrl } = socials.facebook;
  const hasEmbeds = posts.length > 0 || Boolean(pageUrl);

  return (
    <ExternalPortal
      eyebrow="[ CHANNEL 03 ] — Facebook"
      title="Social"
      accent="signal."
      intro={
        hasEmbeds
          ? "Selected public posts, shown right here. To see everything, open the full profile — Facebook opens in a new tab."
          : "Updates, photos and community. Facebook doesn't allow a whole profile to be shown inside other websites, so the link opens in a new tab."
      }
      network="Facebook"
      handle={handle}
      url={url}
      icon="facebook"
    >
      {hasEmbeds && <FacebookEmbeds posts={posts} pageUrl={pageUrl} />}
    </ExternalPortal>
  );
}
