import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Notice from "@/components/Notice";
import GithubProfile from "@/components/GithubProfile";
import RepoExplorer from "@/components/RepoExplorer";
import { getGithub } from "@/lib/github";
import { fullName, socials } from "@/data/profile";

export const revalidate = 1800; // refresh the repository list at most every 30 minutes

export const metadata: Metadata = { title: `GitHub — ${fullName}` };

const profileUrl = `https://github.com/${socials.github.username}`;

const MESSAGES = {
  "rate-limit": "GitHub is limiting how often this page can ask for data. It will refresh on its own shortly.",
  "not-found": `No GitHub account named "${socials.github.username}" was found.`,
  network: "GitHub isn't reachable right now.",
} as const;

export default async function GithubPage() {
  const result = await getGithub();

  return (
    <PageShell
      eyebrow="[ CHANNEL 02 ] — GitHub"
      title="Source"
      accent="repositories."
      intro="Every public repository, straight from GitHub. Search, filter by language, and open any project."
      actions={
        <a href={profileUrl} target="_blank" rel="noreferrer" className="pill pillGhost">
          Open on GitHub ↗
        </a>
      }
    >
      {result.ok ? (
        <>
          <GithubProfile user={result.user} />
          {result.repos.length > 0 ? (
            <RepoExplorer repos={result.repos} />
          ) : (
            <Notice code="REPO // EMPTY" title="No public repositories yet">
              <p>Nothing public to show at the moment.</p>
            </Notice>
          )}
        </>
      ) : (
        <Notice code="LINK // OFFLINE" title="Couldn't load the repositories">
          <p>{MESSAGES[result.reason]}</p>
          <a href={profileUrl} target="_blank" rel="noreferrer" className="pill pillAccent">
            View on GitHub ↗
          </a>
        </Notice>
      )}
    </PageShell>
  );
}
