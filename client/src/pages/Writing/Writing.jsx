import styles from "./writing.module.css";
import { Link } from "react-router-dom";

export default function Writing() {
  return (
    <main>
      <h1>Choose what you want to write today:</h1>
      <div className={styles.writingOptions}>
        <Link to="topic" className={styles.writingOption} href="">
          Write on Topic
        </Link>
        <Link to="journaling" className={styles.writingOption} href="">
          Journaling
        </Link>
      </div>
    </main>
  );
}
