import styles from "./writing.module.css";

export default function Writing() {
  return (
    <main>
      <h1>
        Describe the first memory of your childhood when you learned something.
      </h1>
      <form>
        <textarea>Start writing here...</textarea>
        <div className="buttons">
          <button className="btn">Save as a draft</button>
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
