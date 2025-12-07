import { extractGithubUsernameFromUrl } from "../services/github";
import type { Portfolio } from "../types/Portfolio";

type PortfolioDisplayProps = {
  portfolio: Portfolio;
};

export default function PortfolioDisplay({ portfolio }: PortfolioDisplayProps) {
  let imgSrc = null;

  if (portfolio.img instanceof File) {
    imgSrc = URL.createObjectURL(portfolio.img);
  } else if (typeof portfolio.img === "string") {
    imgSrc = portfolio.img;
  } else {
    imgSrc =
      "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp";
  }

  return (
    <div className="mockup-browser border border-base-300 w-full">
      <div className="mockup-browser-toolbar">
        <div className="input">
          https://
          {extractGithubUsernameFromUrl(portfolio.githubUrl)?.toLowerCase() ??
            "portfolio-builder"}
          .com
        </div>
      </div>
      <div className="grid place-content-center p-5 gap-3">
        <div className="flex items-center gap-3">
          <img
            src={imgSrc}
            alt="Portfolio image"
            className="size-16 rounded-full object-cover"
          />
          <div className="text-xl font-semibold">{portfolio.name}</div>
        </div>
        <div className="font-semibold">{portfolio.description}</div>

        <div className="overflow-y-auto mt-5 h-96 flex flex-col gap-3">
          {portfolio.repos
            .sort(
              (a, b) =>
                new Date(b.pushed_at).getTime() -
                new Date(a.pushed_at).getTime()
            )
            .map((repo) => (
              <div
                key={repo.name}
                className="card w-full bg-base-100 card-md shadow-sm"
              >
                <div className="card-body">
                  <h2 className="card-title">{repo.name}</h2>
                  <p className="text-xs">{repo?.description}</p>

                  {repo.homepage && (
                    <a href={repo.homepage} className="link">
                      {repo.homepage.replaceAll("https://", "")}
                    </a>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
