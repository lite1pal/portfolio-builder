import { useState } from "react";
import PortfolioDisplay from "./components/PortfolioDisplay";
import ProfileForm from "./components/ProfileForm";
import type { Profile } from "./types/Profile";

function App() {
  const [portfolio, setPortfolio] = useState<Profile>({
    name: "",
    description: "",
    githubUrl: "",
  });
  return (
    <div className="flex px-4 sm:px-8 items-center min-h-screen justify-center">
      <div className="grid sm:grid-cols-2 w-full items-center max-w-6xl gap-10">
        <div>
          <h1 className="text-6xl leading-[1.3] font-semibold mb-10">
            Create beautiful portfolio{" "}
            <span className="relative px-3">
              <span className="bg-primary -z-10 absolute rotate-2 rounded-lg top-0 left-0 w-full h-full"></span>
              in minutes
            </span>
          </h1>
          <ProfileForm onChange={setPortfolio} />
        </div>
        <PortfolioDisplay portfolio={portfolio} />
      </div>
    </div>
  );
}

export default App;
