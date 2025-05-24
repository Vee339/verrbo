import styles from "./header.module.css";

export default function Header() {
  return (
    <header>
      <h2 className={styles.logo}>
        <a href="">
          <img src="/verrbo2.svg" alt="" />
        </a>
      </h2>
      <nav>
        <ul className={styles.mainMenu}>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">About</a>
          </li>
          <li>
            <a href="">Contact Us</a>
          </li>
          <li>
            <a href="">Profile</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
