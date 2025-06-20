import styles from "./reading.module.css";
import { Link } from "react-router-dom";

export default function Reading() {
  return (
    <main>
      <h1>Choose the category you want to read today:</h1>
      <div className={styles.readingOptions}>
        <Link to="stories" className={styles.readingOption} href="">
          Short Stories
        </Link>
        <Link to="articles" className={styles.readingOption} href="">
          Articles
        </Link>
        <Link className={styles.readingOption} href="">
          News
        </Link>
      </div>
    </main>
  );
}
