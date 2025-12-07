import { useForm, type SubmitHandler } from "react-hook-form";
import type { Portfolio } from "../types/Portfolio";
import { useEffect, useState } from "react";
import {
  extractGithubUsernameFromUrl,
  fetchPublicRepos,
  fetchGithubProfile,
  validateGithubUrl,
} from "../services/github";
import { Loader, UserSearch } from "lucide-react";
import toast from "react-hot-toast";

type PortfolioFormProps = {
  initialPortfolio: Portfolio;
  onChange: React.Dispatch<React.SetStateAction<Portfolio>>;
};

export default function PortfolioForm({
  initialPortfolio,
  onChange,
}: PortfolioFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Portfolio>({
    defaultValues: {
      name: initialPortfolio.name,
      description: initialPortfolio.description,
      githubUrl: initialPortfolio.githubUrl,
      img: initialPortfolio.img,
      repos: initialPortfolio.repos,
    },
  });

  const [isFetchingRepos, setIsFetchingRepos] = useState(false);
  const [localPortfolio, setLocalPortfolio] = useState<Portfolio>({
    name: initialPortfolio.name,
    description: initialPortfolio.description,
    githubUrl: initialPortfolio.githubUrl,
    img: initialPortfolio.img,
    repos: initialPortfolio.repos,
  });

  const onSubmit: SubmitHandler<Portfolio> = async (data) => console.log(data);

  const fetchGithubRepos = async (githubUrl: string | null) => {
    if (localStorage.getItem("githubUrl") === githubUrl) {
      toast.error("You already fetched repos from here");
      return;
    }

    if (!githubUrl) {
      toast.error("Github URL isn't provided");
      return;
    }

    const username = extractGithubUsernameFromUrl(githubUrl);

    if (!username) {
      toast.error("Github username isn't available in the provided URL");
      return;
    }

    setIsFetchingRepos(true);
    try {
      toast.success("Fetching your repos...");
      const [repos, profile] = await Promise.all([
        fetchPublicRepos(username),
        fetchGithubProfile(username),
      ]);

      if (repos.length > 0) {
        localStorage.setItem("repos", JSON.stringify(repos));
        localStorage.setItem("githubUrl", githubUrl);
        localStorage.setItem("profile", JSON.stringify(profile));

        setLocalPortfolio((prev) => ({
          ...prev,
          img: profile.avatar_url,
          description: profile.bio,
          name: profile.name,
          repos,
        }));
      } else {
        toast.error("Your Github profile doesn't have any public repos :(");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        toast.error(err.message);
      } else {
        console.error("Unknown error", err);
      }
    } finally {
      setIsFetchingRepos(false);
    }
  };

  useEffect(() => {
    onChange(localPortfolio);
  }, [localPortfolio, onChange]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Github Profile URL</legend>
        <div className="flex gap-3 items-center">
          <input
            {...register("githubUrl", {
              required: true,

              validate: (value) => {
                return validateGithubUrl(value)
                  ? true
                  : "Specify the correct Github profile URL";
              },
            })}
            type="text"
            className="input"
            placeholder="https://github.com/your-username"
            onChange={(e) =>
              setLocalPortfolio((prev) => ({
                ...prev,
                githubUrl: e.target.value,
              }))
            }
          />
          <button
            onClick={() => fetchGithubRepos(getValues("githubUrl"))}
            type="button"
            className="btn btn-ghost"
            disabled={isFetchingRepos}
          >
            {isFetchingRepos ? <Loader size={16} /> : <UserSearch size={16} />}
          </button>
        </div>
        {errors.githubUrl && <span>{errors.githubUrl.message}</span>}
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Your picture</legend>
        <input
          {...register("img", { required: true })}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="file-input"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;

            setLocalPortfolio((prev) => ({
              ...prev,
              img: file,
            }));
          }}
        />
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Your name</legend>
        <input
          {...register("name", { required: true })}
          type="text"
          className="input"
          placeholder=""
          onChange={(e) =>
            setLocalPortfolio((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        {errors.name && <span>This field is required</span>}
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Description</legend>
        <textarea
          {...register("description", { required: true })}
          className="textarea"
          placeholder=""
          onChange={(e) =>
            setLocalPortfolio((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        ></textarea>
        {errors.description && <span>This field is required</span>}
      </fieldset>

      <div className="flex mt-5 flex-col gap-3 sm:flex-row">
        <button className="btn btn-primary">Publish a portfolio page</button>

        <button name="download-html" className="btn btn-ghost">
          Download HTML & CSS
        </button>
      </div>
    </form>
  );
}
