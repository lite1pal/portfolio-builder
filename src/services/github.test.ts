import { expect, it, describe } from "vitest";
import { extractGithubUsernameFromUrl, validateGithubUrl } from "./github";

describe("validate github url", () => {
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

describe("extract github username from url", () => {
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
