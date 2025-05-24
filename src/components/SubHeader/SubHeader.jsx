import styles from "./subheader.module.css";

export default function SubHeader() {
  return (
    <ul className={styles.subHeader}>
      <li>
        <a href="">Listening</a>
      </li>
      <li>
        <a href="">Writing</a>
      </li>
      <li>
        <a href="">Speaking</a>
      </li>
      <li>
        <a href="">Reading</a>
      </li>
    </ul>
  );
}
