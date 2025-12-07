export const ERROR_MESSAGES = {
  ALREADY_FETCHED: "You already fetched repos from here",
  NO_GITHUB_URL: "Github URL isn't provided",
  NO_USERNAME: "Github username isn't available in the provided URL",
  NO_PUBLIC_REPOS: "Your Github profile doesn't have any public repos :(",
  INVALID_GITHUB_URL: "Specify the correct Github profile URL",
  REQUIRED_FIELD: "This field is required",
} as const;

export const SUCCESS_MESSAGES = {
  FETCHING_REPOS: "Fetching your repos...",
} as const;

export const DEFAULT_PORTFOLIO = {
  NAME: "Spider-man",
  DESCRIPTION: "Your friendly neighborhood Spider-man!",
  DEFAULT_IMAGE:
    "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
} as const;
