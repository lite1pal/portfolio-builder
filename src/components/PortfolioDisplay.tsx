import { extractGithubUsernameFromUrl } from "../services/github";
import type { Portfolio } from "../types/Portfolio";
import { PortfolioImage } from "./PortfolioImage";
import { RepoCard } from "./RepoCard";

type PortfolioDisplayProps = {
  portfolio: Portfolio;
};

function sortReposByPushedDate<T extends { pushed_at: Date }>(repos: T[]): T[] {
  return [...repos].sort(
    (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
  );
}

export default function PortfolioDisplay({ portfolio }: PortfolioDisplayProps) {
  const username =
    extractGithubUsernameFromUrl(portfolio.githubUrl)?.toLowerCase() ??
    "portfolio-builder";
  const sortedRepos = sortReposByPushedDate(portfolio.repos);

  return (
    <div className="mockup-browser border border-base-300 w-full">
      <div className="mockup-browser-toolbar">
        <div className="input">https://{username}.com</div>
      </div>
      <div className="grid place-content-center p-5 gap-3">
        <div className="flex items-center gap-3">
          <PortfolioImage img={portfolio.img} name={portfolio.name} />
          <div className="text-xl font-semibold">{portfolio.name}</div>
        </div>
        <div className="font-semibold">{portfolio.description}</div>

        <div className="overflow-y-auto mt-5 h-96 flex flex-col gap-3">
          {sortedRepos.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
}
