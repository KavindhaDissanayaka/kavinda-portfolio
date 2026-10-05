import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Notice from "@/components/Notice";
import YoutubeGallery from "@/components/YoutubeGallery";
import UploadsPlayer from "@/components/UploadsPlayer";
import { channelUrl, getYoutube } from "@/lib/youtube";
import { fullName } from "@/data/profile";

export const revalidate = 1800; // refresh the video list at most every 30 minutes

export const metadata: Metadata = { title: `YouTube — ${fullName}` };

export default async function YoutubePage() {
  const result = await getYoutube();

  return (
    <PageShell
      eyebrow="[ CHANNEL 01 ] — YouTube"
      title="Your"
      accent="Kavinda"
      intro="The latest uploads from my channel. Pick one and it plays right here, without leaving the portfolio."
      actions={
        <>
          <a href={`${channelUrl}?sub_confirmation=1`} target="_blank" rel="noreferrer" className="pill pillAccent">
            Subscribe ↗
          </a>
          <a href={channelUrl} target="_blank" rel="noreferrer" className="pill pillGhost">
            Open full channel ↗
          </a>
        </>
      }
    >
      {result.ok && result.videos.length > 0 ? (
        <YoutubeGallery videos={result.videos} />
      ) : !result.ok && result.channelId ? (
        // The video list couldn't be fetched, but we know the channel: use YouTube's own uploads player.
        <UploadsPlayer channelId={result.channelId} />
      ) : (
        <Notice code="SIGNAL // WEAK" title={result.ok ? "No public videos yet" : "Couldn't load the video list"}>
          <p>
            {result.ok
              ? "The channel has no public uploads at the moment. Check back soon."
              : "The channel feed isn't reachable right now. You can still watch everything on YouTube."}
          </p>
          <a href={channelUrl} target="_blank" rel="noreferrer" className="pill pillAccent">
            Open the channel ↗
          </a>
        </Notice>
      )}
    </PageShell>
  );
}
