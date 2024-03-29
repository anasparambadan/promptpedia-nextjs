import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {type} Post</span>
      </h1>

      <p className="desc text-left max-w-md">
        {type} and share your favourite picks in AI prompts with world and let
        nourish the knowledge.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-bold text-base text-gray-700">
            Your AI prompt
          </span>
          <textarea
            placeholder="Write your prompts here"
            required
            className="form_textarea"
            value={post.prompt}
            onChange={(e) => {
              setPost({ ...post, prompt: e.target.value });
            }}
          ></textarea>
        </label>
        <label>
          <span className="font-satoshi font-bold text-base text-gray-700">
            Tag {" "}
            <span className="font-normal text-sm">(Add a tag to specify the field your prompt best refers to)</span>
          </span>
          <input
            placeholder="tag"
            required
            className="form_input"
            value={post.tag}
            onChange={(e) => {
              setPost({ ...post, tag: e.target.value });
            }}
          ></input>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4" >
            <Link href='/' className=" text-gray-500 text-sm">Cancel</Link>
            <button type="submit" className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white" disabled={submitting} >{submitting?`${type}..`:type}</button>
        </div>
      </form>
    </section>
  );
};

export default Form;
