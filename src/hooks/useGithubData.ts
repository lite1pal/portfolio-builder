import { useState } from "react";
import toast from "react-hot-toast";
import {
  extractGithubUsernameFromUrl,
  fetchPublicRepos,
  fetchGithubProfile,
} from "../services/github";
import {
  savePortfolioToStorage,
  getStoredGithubUrl,
} from "../utils/localStorage";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";
import type { Repo } from "../types/Repo";
import type { Profile } from "../types/Profile";

interface UseGithubDataReturn {
  isFetchingRepos: boolean;
  fetchGithubRepos: (
    githubUrl: string | null,
    onSuccess: (repos: Repo[], profile: Profile) => void
  ) => Promise<void>;
}

export function useGithubData(): UseGithubDataReturn {
  const [isFetchingRepos, setIsFetchingRepos] = useState(false);

  const fetchGithubRepos = async (
    githubUrl: string | null,
    onSuccess: (repos: Repo[], profile: Profile) => void
  ) => {
    if (getStoredGithubUrl() === githubUrl) {
      toast.error(ERROR_MESSAGES.ALREADY_FETCHED);
      return;
    }

    if (!githubUrl) {
      toast.error(ERROR_MESSAGES.NO_GITHUB_URL);
      return;
    }

    const username = extractGithubUsernameFromUrl(githubUrl);

    if (!username) {
      toast.error(ERROR_MESSAGES.NO_USERNAME);
      return;
    }

    setIsFetchingRepos(true);
    try {
      toast.success(SUCCESS_MESSAGES.FETCHING_REPOS);
      const [repos, profile] = await Promise.all([
        fetchPublicRepos(username),
        fetchGithubProfile(username),
      ]);

      if (repos.length > 0) {
        savePortfolioToStorage(repos, profile, githubUrl);
        onSuccess(repos, profile);
      } else {
        toast.error(ERROR_MESSAGES.NO_PUBLIC_REPOS);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        toast.error(err.message);
      } else {
        console.error("Unknown error", err);
      }
    } finally {
      setIsFetchingRepos(false);
    }
  };

  return { isFetchingRepos, fetchGithubRepos };
}
