export type Repo = {
  name: string;
  description: string | null;
  homepage: string | null;
  pushed_at: Date;
  stargazers_count: number;
};
