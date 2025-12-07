import { expect, it, describe } from "vitest";
import { validateGithubUrl } from "./urlValidators";

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
