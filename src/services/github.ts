import type { Repo } from "../types/Repo";

export async function fetchPublicRepos(username: string): Promise<Repo[]> {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  if (!res.ok) throw new Error(`Github API error: ${res.status}`);
  return res.json();
}
