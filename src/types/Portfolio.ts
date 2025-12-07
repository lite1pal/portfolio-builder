import type { Repo } from "./Repo";

export type Portfolio = {
  name: string;
  description: string;
  githubUrl: string;
  imgUrl: File | null;
  repos: Repo[];
};
