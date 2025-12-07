import { useForm, type SubmitHandler } from "react-hook-form";
import type { Portfolio } from "../types/Portfolio";
import { validateGithubUrl } from "../lib/urlValidators";
import { useEffect } from "react";

type PortfolioFormProps = {
  onChange: React.Dispatch<React.SetStateAction<Portfolio>>;
};

export default function PortfolioForm({ onChange }: PortfolioFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Portfolio>();

  const onSubmit: SubmitHandler<Portfolio> = (data) => console.log(data);

  const values = watch();

  useEffect(() => {
    onChange(values);
  }, [values, onChange]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Your name</legend>
        <input
          {...register("name", { required: true })}
          type="text"
          className="input"
          placeholder=""
        />
        {errors.name && <span>This field is required</span>}
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Description</legend>
        <textarea
          {...register("description", { required: true })}
          className="textarea"
          placeholder=""
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
        />
        {errors.githubUrl && <span>{errors.githubUrl.message}</span>}
      </fieldset>

      <button className="mt-5 btn btn-primary">Create a portfolio page</button>
    </form>
  );
}
