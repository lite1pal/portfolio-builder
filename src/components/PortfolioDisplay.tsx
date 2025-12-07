import type { Portfolio } from "../types/Portfolio";

type PortfolioDisplayProps = {
  portfolio: Portfolio;
};

export default function PortfolioDisplay({ portfolio }: PortfolioDisplayProps) {
  return (
    <div className="mockup-phone max-w-sm border-[#ff8938]">
      <div className="mockup-phone-camera"></div>
      <div className="mockup-phone-display p-5 flex flex-col gap-3">
        <div className="text-xl font-semibold">{portfolio.name}</div>
        <div className="font-semibold">{portfolio.description}</div>
      </div>
    </div>
  );
}
