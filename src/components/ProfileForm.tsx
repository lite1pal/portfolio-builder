export default function ProfileForm() {
  return (
    <div className="grid sm:grid-cols-2 w-full">
      <form>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Your name</legend>
          <input type="text" className="input" placeholder="" />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Description</legend>
          <textarea className="textarea" placeholder=""></textarea>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Github Profile URL</legend>
          <input type="text" className="input" placeholder="" />
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
