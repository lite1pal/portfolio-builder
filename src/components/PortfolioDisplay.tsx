import type { Portfolio } from "../types/Portfolio";

type PortfolioDisplayProps = {
  portfolio: Portfolio;
};

export default function PortfolioDisplay({ portfolio }: PortfolioDisplayProps) {
  const imgSrc = portfolio.imgUrl
    ? URL.createObjectURL(portfolio.imgUrl)
    : undefined;

  return (
    <div className="mockup-phone max-w-sm border-primary">
      <div className="mockup-phone-camera"></div>
      <div className="mockup-phone-display p-5 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <img
            src={imgSrc}
            alt="Portfolio image"
            className="size-16 rounded-full"
          />
          <div className="text-xl font-semibold">{portfolio.name}</div>
        </div>
        <div className="font-semibold">{portfolio.description}</div>
      </div>
    </div>
  );
}
