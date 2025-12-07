import type { Portfolio } from "../types/Portfolio";
import type { Repo } from "../types/Repo";
import type { Profile } from "../types/Profile";

const STORAGE_KEYS = {
  GITHUB_URL: "githubUrl",
  REPOS: "repos",
  PROFILE: "profile",
} as const;

/**
 * Type guard to validate if parsed data matches Repo[] structure
 */
function isReposValid(parsedRepos: unknown): parsedRepos is Repo[] {
  return (
    Array.isArray(parsedRepos) &&
    parsedRepos.every(
      (item) =>
        item &&
        typeof item === "object" &&
        "name" in item &&
        "description" in item &&
        "homepage" in item &&
        "pushed_at" in item &&
        "stargazers_count" in item
    )
  );
}

/**
 * Type guard to validate if parsed data matches Profile structure
 */
function isProfileValid(parsedProfile: unknown): parsedProfile is Profile {
  return (
    parsedProfile !== null &&
    typeof parsedProfile === "object" &&
    "name" in parsedProfile &&
    "bio" in parsedProfile &&
    "avatar_url" in parsedProfile
  );
}

/**
 * Loads portfolio data from localStorage
 * @returns Partial portfolio data or null if invalid/missing
 */
export function loadPortfolioFromStorage(): Partial<Portfolio> | null {
  const storedRepos = localStorage.getItem(STORAGE_KEYS.REPOS);
  const storedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
  const storedGithubUrl = localStorage.getItem(STORAGE_KEYS.GITHUB_URL);

  if (!storedRepos || !storedProfile) return null;

  try {
    const parsedRepos = JSON.parse(storedRepos) as unknown;
    const parsedProfile = JSON.parse(storedProfile) as unknown;

    if (isReposValid(parsedRepos) && isProfileValid(parsedProfile)) {
      return {
        repos: parsedRepos,
        name: parsedProfile.name,
        description: parsedProfile.bio,
        img: parsedProfile.avatar_url,
        githubUrl: storedGithubUrl ?? "",
      };
    }
  } catch {
    // ignore invalid storage
  }

  return null;
}

/**
 * Saves portfolio data to localStorage
 */
export function savePortfolioToStorage(
  repos: Repo[],
  profile: Profile,
  githubUrl: string
): void {
  localStorage.setItem(STORAGE_KEYS.REPOS, JSON.stringify(repos));
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  localStorage.setItem(STORAGE_KEYS.GITHUB_URL, githubUrl);
}

/**
 * Gets the stored GitHub URL from localStorage
 * @returns The stored URL or null if not found
 */
export function getStoredGithubUrl(): string | null {
  return localStorage.getItem(STORAGE_KEYS.GITHUB_URL);
}
