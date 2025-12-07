import { expect, it, describe, beforeEach, vi } from "vitest";
import {
  extractGithubUsernameFromUrl,
  fetchPublicRepos,
  validateGithubUrl,
} from "./github";

describe("fetchPublicRepos", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns mapped repo data when API succeeds", async () => {
    const mockRepos = [
      {
        name: "repo1",
        description: "desc",
        homepage: "https://example.com",
        pushed_at: "2024-01-01T00:00:00Z",
        stargazers_count: 10,
        otherField: "ignored",
      },
    ];

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockRepos,
    });

    const result = await fetchPublicRepos("test");

    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/users/test/repos"
    );

    expect(result).toEqual([
      {
        name: "repo1",
        description: "desc",
        homepage: "https://example.com",
        pushed_at: "2024-01-01T00:00:00Z",
        stargazers_count: 10,
      },
    ]);
  });

  it("throws an error when API returns non-OK status", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    await expect(fetchPublicRepos("unknown-user")).rejects.toThrow(
      "Github API error: 404"
    );
  });
});

describe("validateGithubUrl", () => {
  it("accepts valid Github profile URLs", () => {
    expect(validateGithubUrl("https://github.com/user/")).toBe(true);
    expect(validateGithubUrl("https://github.com/")).toBe(true);
  });

  it("rejects non-Github or malformed URLs", () => {
    expect(validateGithubUrl("")).toBe(false);
    expect(validateGithubUrl("   ")).toBe(false);
    expect(validateGithubUrl("http://github.com/user")).toBe(false);
    expect(validateGithubUrl("https://gitlab.com/user")).toBe(false);
    expect(validateGithubUrl("https://example.com/github.com/user")).toBe(
      false
    );
    expect(validateGithubUrl("github.com/user")).toBe(false);
  });
});

describe("extractGithubUsernameFromUrl", () => {
  it("returns a valid github username", () => {
    expect(extractGithubUsernameFromUrl("https://github.com/lite1pal")).toBe(
      "lite1pal"
    );
    expect(extractGithubUsernameFromUrl("https://github.com/leerob")).toBe(
      "leerob"
    );
  });

  it("returns null for malformed URLs", () => {
    expect(extractGithubUsernameFromUrl("github.com/lite1pal")).toBe(null);
    expect(extractGithubUsernameFromUrl("")).toBe(null);
    expect(extractGithubUsernameFromUrl(".  ")).toBe(null);
    expect(extractGithubUsernameFromUrl("   ")).toBe(null);
  });
});
