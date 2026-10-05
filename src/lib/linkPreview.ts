/**
 * Server-side link previews (title / description / image), like the cards a
 * messaging app builds when you paste a link. Runs on the server only, so there
 * are no CORS problems; results are cached by Next.js and refreshed daily.
 */

export type LinkPreview = {
  url: string;
  host: string;
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  favicon?: string;
};

const MAX_HTML_BYTES = 300_000;

/** Returns a clean absolute http(s) URL, or null for empty values and "#" placeholders. */
export function cleanUrl(raw: string | undefined): string | null {
  const value = (raw ?? "").trim();
  if (!value || value === "#") return null;
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function decode(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m)
    .replace(/\s+/g, " ")
    .trim();
}

function attr(tag: string, name: string): string | undefined {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  const v = m?.[1] ?? m?.[2] ?? m?.[3];
  return v === undefined ? undefined : decode(v);
}

/** Collects <meta property|name="…" content="…"> pairs from the HTML. */
function readMeta(html: string): Map<string, string> {
  const out = new Map<string, string>();
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const key = (attr(tag, "property") ?? attr(tag, "name"))?.toLowerCase();
    const content = attr(tag, "content");
    if (key && content && !out.has(key)) out.set(key, content);
  }
  return out;
}

function readFavicon(html: string): string | undefined {
  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    const rel = attr(tag, "rel")?.toLowerCase() ?? "";
    if (rel.split(/\s+/).includes("icon") || rel === "shortcut icon") {
      const href = attr(tag, "href");
      if (href) return href;
    }
  }
  return undefined;
}

function absolute(value: string | undefined, base: string): string | undefined {
  if (!value) return undefined;
  try {
    const u = new URL(value, base);
    return u.protocol === "http:" || u.protocol === "https:" ? u.toString() : undefined;
  } catch {
    return undefined;
  }
}

export async function getLinkPreview(rawUrl: string | undefined): Promise<LinkPreview | null> {
  const url = cleanUrl(rawUrl);
  if (!url) return null;

  const host = new URL(url).hostname.replace(/^www\./, "");
  const fallback: LinkPreview = { url, host };

  try {
    const res = await fetch(url, {
      headers: {
        // Many sites only publish their preview tags for browser-like / crawler requests.
        "user-agent": "Mozilla/5.0 (compatible; PortfolioLinkPreview/1.0; +https://github.com)",
        accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(7000),
      next: { revalidate: 60 * 60 * 24 },
    });

    const type = res.headers.get("content-type") ?? "";
    if (!res.ok || !type.includes("html")) return fallback;

    const html = (await res.text()).slice(0, MAX_HTML_BYTES);
    const head = html.split(/<\/head>/i)[0] ?? html;
    const meta = readMeta(head);
    const base = res.url || url;

    const titleTag = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
    const title = meta.get("og:title") ?? meta.get("twitter:title") ?? (titleTag ? decode(titleTag) : undefined);
    const description = meta.get("og:description") ?? meta.get("twitter:description") ?? meta.get("description");
    const image = absolute(meta.get("og:image") ?? meta.get("twitter:image") ?? meta.get("twitter:image:src"), base);
    const favicon = absolute(readFavicon(head) ?? "/favicon.ico", base);

    return {
      url,
      host,
      title: title || undefined,
      description: description || undefined,
      image,
      siteName: meta.get("og:site_name"),
      favicon,
    };
  } catch {
    // Offline, blocked, timed out… the card still shows the domain.
    return fallback;
  }
}
