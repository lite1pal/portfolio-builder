import type { Profile } from "../types/Profile";

type PortfolioDisplayProps = {
  portfolio: Profile;
};

export default function PortfolioDisplay({ portfolio }: PortfolioDisplayProps) {
  return (
    <div className="mockup-phone max-w-sm border-[#ff8938]">
      <div className="mockup-phone-camera"></div>
      <div className="mockup-phone-display p-5">
        <div className="text-xl font-semibold">{portfolio.name}</div>
        {/* <img
          alt="wallpaper"
          src="https://img.daisyui.com/images/stock/453966.webp"
        /> */}
      </div>
    </div>
  );
}
