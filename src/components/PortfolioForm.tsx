import { useForm, type SubmitHandler } from "react-hook-form";
import type { Portfolio } from "../types/Portfolio";
import { validateGithubUrl } from "../lib/urlValidators";
import { useEffect, useState } from "react";

type PortfolioFormProps = {
  onChange: React.Dispatch<React.SetStateAction<Portfolio>>;
};

export default function PortfolioForm({ onChange }: PortfolioFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Portfolio>();

  const [localPortfolio, setLocalPortfolio] = useState<Portfolio>({
    name: "",
    description: "",
    githubUrl: "",
    imgUrl: null,
  });

  const onSubmit: SubmitHandler<Portfolio> = (data) => console.log(data);

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
        {errors.githubUrl && <span>{errors.githubUrl.message}</span>}
      </fieldset>

      <button className="mt-5 btn btn-primary">Create a portfolio page</button>
    </form>
  );
}
