import type { Repo } from "../types/Repo";

export async function fetchPublicRepos(username: string): Promise<Repo[]> {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  if (!res.ok) throw new Error(`Github API error: ${res.status}`);

  const data = (await res.json()) as Repo[];

  return data.map((repo: Repo) => ({
    name: repo.name,
    description: repo.description,
    homepage: repo.homepage,
    pushed_at: repo.pushed_at,
    stargazers_count: repo.stargazers_count,
  }));
}

export function extractGithubUsernameFromUrl(githubUrl: string): string | null {
  try {
    const url = new URL(githubUrl);
    if (url.hostname !== "github.com") return null;
    const segments = url.pathname.split("/").filter(Boolean);
    return segments[0] ?? null;
  } catch {
    return null;
  }
}

export type StringValidator = (value: string) => boolean;

export const validateGithubUrl: StringValidator = (url) =>
  typeof url === "string" && url.startsWith("https://github.com/");
