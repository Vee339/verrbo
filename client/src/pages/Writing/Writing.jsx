import { IoMdRefresh } from "react-icons/io";
import styles from "./writing.module.css";

export default function Writing() {
  return (
    <main>
      <h1>
        Describe the first memory of your childhood when you learned something.
      </h1>
      <button className={`btn ${styles.changeTopic}`}>
        <span>
          <IoMdRefresh />
        </span>
        Change Topic
      </button>
      <form>
        <textarea placeholder="Start writing here..."></textarea>
        <div className={styles.buttons}>
          <button className="btn secondary">Save as a draft</button>
          {/* <a href="">Save as draft</a> */}
          <button type="submit" className="btn">
            Save
          </button>
        </div>
      </form>
    </main>
  );
}
