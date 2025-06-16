import styles from "./subheader.module.css";
import { Link } from "react-router-dom";

export default function SubHeader() {
  return (
    <ul className={styles.subHeader}>
      <li>
        <Link to="listening">Listening</Link>
      </li>
      <li>
        <Link to="writing">Writing</Link>
      </li>
      <li>
        <Link to="speaking">Speaking</Link>
      </li>
      <li>
        <Link to="reading">Reading</Link>
      </li>
    </ul>
  );
}
