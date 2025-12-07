import type { Repo } from "../types/Repo";

export async function fetchPublicRepos(username: string): Promise<Repo[]> {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  if (!res.ok) throw new Error(`Github API error: ${res.status}`);
  return res.json();
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
