import { useEffect, useState } from "react";
import PortfolioDisplay from "./components/PortfolioDisplay";
import PortfolioForm from "./components/PortfolioForm";
import type { Portfolio } from "./types/Portfolio";
import type { Repo } from "./types/Repo";

function isLocalStorageReposValid(parsedRepos: unknown): parsedRepos is Repo[] {
  return (
    Array.isArray(parsedRepos) &&
    parsedRepos.every(
      (item) =>
        item &&
        typeof item === "object" &&
        "name" in item &&
        "description" in item &&
        "homepage" in item &&
        "pushed_at" in item &&
        "stargazers_count" in item
    )
  );
}

function App() {
  const [portfolio, setPortfolio] = useState<Portfolio>({
    name: "Spider-man",
    description: "Your friendly neighborhood Spider-man!",
    githubUrl: "",
    imgUrl: null,
    repos: [],
  });

  useEffect(() => {
    const localStoragePortfolio = localStorage.getItem("portfolio");

    if (!localStoragePortfolio) return;

    try {
      const parsed = JSON.parse(localStoragePortfolio) as unknown;

      if (isLocalStorageReposValid(parsed)) {
        setPortfolio((prev) => ({
          ...prev,
          repos: parsed,
        }));
      }
    } catch (err) {
      console.warn("Failed to parse portfolio from localStorage", err);
    }
  }, []);

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
          <PortfolioForm initialPortfolio={portfolio} onChange={setPortfolio} />
        </div>
        <PortfolioDisplay portfolio={portfolio} />
      </div>
    </div>
  );
}

export default App;
