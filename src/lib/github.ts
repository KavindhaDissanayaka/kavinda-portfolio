import { socials } from "@/data/profile";

export type Repo = {
  id: number;
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  pushedAt: string;
  fork: boolean;
  archived: boolean;
  topics: string[];
};

export type GithubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar: string;
  url: string;
  followers: number;
  publicRepos: number;
};

export type GithubResult =
  | { ok: true; user: GithubUser; repos: Repo[] }
  | { ok: false; reason: "rate-limit" | "not-found" | "network" };

const API = "https://api.github.com";

function headers(): Record<string, string> {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "kavinda-portfolio",
  };
  // Optional: a token with NO scopes raises the limit from 60/hour to 5,000/hour. Public data only.
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

function get(path: string) {
  return fetch(`${API}${path}`, { headers: headers(), next: { revalidate: 1800 } });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getGithub(): Promise<GithubResult> {
  const username = socials.github.username;

  try {
    const userRes = await get(`/users/${username}`);
    if (userRes.status === 404) return { ok: false, reason: "not-found" };
    if (userRes.status === 403 || userRes.status === 429) return { ok: false, reason: "rate-limit" };
    if (!userRes.ok) return { ok: false, reason: "network" };
    const u: any = await userRes.json();

    const repos: Repo[] = [];
    for (let page = 1; page <= 5; page++) {
      const res = await get(`/users/${username}/repos?per_page=100&type=owner&sort=pushed&page=${page}`);
      if (!res.ok) {
        if (repos.length === 0) return { ok: false, reason: res.status === 403 || res.status === 429 ? "rate-limit" : "network" };
        break;
      }
      const batch: any[] = await res.json();
      for (const r of batch) {
        repos.push({
          id: r.id,
          name: r.name,
          description: r.description ?? null,
          url: r.html_url,
          language: r.language ?? null,
          stars: r.stargazers_count ?? 0,
          forks: r.forks_count ?? 0,
          pushedAt: r.pushed_at ?? r.updated_at ?? "",
          fork: Boolean(r.fork),
          archived: Boolean(r.archived),
          topics: Array.isArray(r.topics) ? r.topics : [],
        });
      }
      if (batch.length < 100) break;
    }

    return {
      ok: true,
      user: {
        login: u.login,
        name: u.name ?? null,
        bio: u.bio ?? null,
        avatar: u.avatar_url,
        url: u.html_url,
        followers: u.followers ?? 0,
        publicRepos: u.public_repos ?? repos.length,
      },
      repos,
    };
  } catch {
    return { ok: false, reason: "network" };
  }
}
