import { useForm, type SubmitHandler } from "react-hook-form";
import type { Portfolio } from "../types/Portfolio";
import { validateGithubUrl } from "../lib/urlValidators";
import { useEffect, useState } from "react";
import { fetchPublicRepos } from "../services/github";
import { Loader, UserSearch } from "lucide-react";
import toast from "react-hot-toast";

type PortfolioFormProps = {
  onChange: React.Dispatch<React.SetStateAction<Portfolio>>;
};

export default function PortfolioForm({ onChange }: PortfolioFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Portfolio>();

  const [isFetchingRepos, setIsFetchingRepos] = useState(false);
  const [localPortfolio, setLocalPortfolio] = useState<Portfolio>({
    name: "",
    description: "",
    githubUrl: "",
    imgUrl: null,
    repos: [],
  });

  const isReposFetched = localPortfolio.repos.length > 0;

  const onSubmit: SubmitHandler<Portfolio> = async (data) => console.log(data);

  const fetchGithubRepos = async () => {
    if (isReposFetched) return;

    try {
      setIsFetchingRepos(true);
      const repos = await fetchPublicRepos("lite1pal");

      setLocalPortfolio((prev) => ({
        ...prev,
        repos,
      }));
      setIsFetchingRepos(false);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    onChange(localPortfolio);
  }, [localPortfolio, onChange]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Your picture</legend>
        <input
          {...register("imgUrl", { required: true })}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="file-input file-input-primary"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;

            setLocalPortfolio((prev) => ({
              ...prev,
              imgUrl: file,
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
            placeholder=""
            onChange={(e) =>
              setLocalPortfolio((prev) => ({
                ...prev,
                githubUrl: e.target.value,
              }))
            }
          />
          {!isReposFetched && (
            <button
              onClick={fetchGithubRepos}
              type="button"
              className="btn btn-ghost"
              disabled={isFetchingRepos}
            >
              {isFetchingRepos ? (
                <Loader size={16} />
              ) : (
                <UserSearch size={16} />
              )}
            </button>
          )}
        </div>
        {errors.githubUrl && <span>{errors.githubUrl.message}</span>}
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
