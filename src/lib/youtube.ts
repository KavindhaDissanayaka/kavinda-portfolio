import { socials } from "@/data/profile";

export type YtVideo = { id: string; title: string; published: string; thumb: string };

export type YoutubeResult =
  | { ok: true; channelId: string; videos: YtVideo[] }
  | { ok: false; reason: "no-channel" | "feed-failed" | "network"; channelId: string | null };

export const channelUrl = `https://www.youtube.com/@${socials.youtube.handle}`;

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

/** Finds the "UC…" channel id from the @handle page (only used when channelId is not set in profile.ts). */
async function resolveChannelId(): Promise<string | null> {
  if (socials.youtube.channelId) return socials.youtube.channelId;

  const res = await fetch(channelUrl, {
    headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9", Cookie: "CONSENT=YES+1; SOCS=CAI" },
    next: { revalidate: 86400 },
  });
  if (!res.ok) return null;
  const html = await res.text();

  const patterns = [
    /<link rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/(UC[\w-]{22})"/,
    /"externalId":"(UC[\w-]{22})"/,
    /"channelId":"(UC[\w-]{22})"/,
    /channel_id=(UC[\w-]{22})/,
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m) return m[1];
  }
  return null;
}

const decode = (s: string) =>
  s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&");

export function parseFeed(xml: string): YtVideo[] {
  const videos: YtVideo[] = [];
  for (const m of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
    const block = m[1];
    const id = block.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/)?.[1];
    const title = block.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    const published = block.match(/<published>(.*?)<\/published>/)?.[1] ?? "";
    if (id && title) {
      videos.push({ id, title: decode(title.trim()), published, thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` });
    }
  }
  return videos;
}

export async function getYoutube(): Promise<YoutubeResult> {
  let channelId: string | null = socials.youtube.channelId || null;

  try {
    if (!channelId) channelId = await resolveChannelId();
    if (!channelId) {
      console.warn("[youtube] could not find the channel id — set socials.youtube.channelId");
      return { ok: false, reason: "no-channel", channelId: null };
    }

    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
      headers: { "User-Agent": UA },
      next: { revalidate: 1800 },
    });
    if (!res.ok) {
      console.warn(`[youtube] feed request failed with status ${res.status}`);
      return { ok: false, reason: "feed-failed", channelId };
    }

    return { ok: true, channelId, videos: parseFeed(await res.text()) };
  } catch (err) {
    console.warn("[youtube] network error", err);
    return { ok: false, reason: "network", channelId };
  }
}
