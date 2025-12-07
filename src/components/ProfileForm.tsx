import { useForm, type SubmitHandler } from "react-hook-form";
import type { ProfileFormType } from "../types/ProfileFormType";
import { validateGithubUrl } from "../lib/urlValidators";

export default function ProfileForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileFormType>();

  const onSubmit: SubmitHandler<ProfileFormType> = (data) => console.log(data);

  console.log(watch("name"));

  return (
    <div className="grid sm:grid-cols-2 w-full">
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

        <button className="mt-5 btn btn-primary">
          Create a portfolio page
        </button>
      </form>

      <div className="mockup-window bg-base-100 border border-base-300">
        <div className="grid place-content-center h-80">Hello!</div>
      </div>
    </div>
  );
}
