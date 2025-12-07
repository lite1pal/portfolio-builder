import { useForm, type SubmitHandler } from "react-hook-form";
import type { Portfolio } from "../types/Portfolio";
import { useEffect } from "react";
import { validateGithubUrl } from "../services/github";
import { Loader, UserSearch } from "lucide-react";
import { useGithubData } from "../hooks/useGithubData";
import { ERROR_MESSAGES } from "../constants/messages";

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
    setValue,
    watch,
    formState: { errors },
  } = useForm<Portfolio>({
    defaultValues: initialPortfolio,
  });

  const { isFetchingRepos, fetchGithubRepos } = useGithubData();

  const formValues = watch();

  const onSubmit: SubmitHandler<Portfolio> = async (data) => console.log(data);

  const handleFetchGithubRepos = async () => {
    await fetchGithubRepos(getValues("githubUrl"), (repos, profile) => {
      setValue("name", profile.name);
      setValue("description", profile.bio);
      setValue("img", profile.avatar_url);
      setValue("repos", repos);
    });
  };

  useEffect(() => {
    onChange(formValues);
  }, [formValues, onChange]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Github Profile URL</legend>
        <div className="flex gap-3 items-center">
          <input
            {...register("githubUrl", {
              required: true,
              validate: (value) =>
                validateGithubUrl(value) || ERROR_MESSAGES.INVALID_GITHUB_URL,
            })}
            type="text"
            className="input"
            placeholder="https://github.com/your-username"
          />
          <button
            onClick={handleFetchGithubRepos}
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
            setValue("img", file);
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
        />
        {errors.name && <span>{ERROR_MESSAGES.REQUIRED_FIELD}</span>}
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Description</legend>
        <textarea
          {...register("description", { required: true })}
          className="textarea"
          placeholder=""
        ></textarea>
        {errors.description && <span>{ERROR_MESSAGES.REQUIRED_FIELD}</span>}
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
