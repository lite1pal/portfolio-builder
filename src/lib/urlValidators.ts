export type StringValidator = (value: string) => boolean;

export const validateGithubUrl: StringValidator = (url) =>
  typeof url === "string" && url.startsWith("https://github.com/");
