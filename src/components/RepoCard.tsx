import type { Repo } from "../types/Repo";
import { stripHttpsPrefix } from "../utils/helpers";

type RepoCardProps = {
  repo: Repo;
};

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <div className="card w-full bg-base-100 card-md shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{repo.name}</h2>
        <p className="text-xs">{repo?.description}</p>

        {repo.homepage && (
          <a href={repo.homepage} className="link">
            {stripHttpsPrefix(repo.homepage)}
          </a>
        )}
      </div>
    </div>
  );
}
