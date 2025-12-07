import type { Repo } from "./Repo";

export type Portfolio = {
  name: string;
  description: string;
  githubUrl: string;
  img: string | File | null;
  repos: Repo[];
};
