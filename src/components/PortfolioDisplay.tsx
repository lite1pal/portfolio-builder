import type { Portfolio } from "../types/Portfolio";

type PortfolioDisplayProps = {
  portfolio: Portfolio;
};

export default function PortfolioDisplay({ portfolio }: PortfolioDisplayProps) {
  const imgSrc = portfolio.imgUrl
    ? URL.createObjectURL(portfolio.imgUrl)
    : "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp";

  return (
    <div className="mockup-phone max-w-sm border-primary">
      <div className="mockup-phone-camera"></div>
      <div className="mockup-phone-display p-5 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <img
            src={imgSrc}
            alt="Portfolio image"
            className="size-16 rounded-full object-cover"
          />
          <div className="text-xl font-semibold">{portfolio.name}</div>
        </div>
        <div className="font-semibold">{portfolio.description}</div>

        <div className="overflow-y-auto mt-5 flex flex-col gap-3">
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
