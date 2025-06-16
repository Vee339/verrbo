import { NavLink } from "react-router-dom";
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
            {/* <a href="/">Home</a> */}
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            {/* <a href="">About</a> */}
            <NavLink to="about">About</NavLink>
          </li>
          <li>
            {/* <a href="">Contact Us</a> */}
            <NavLink to="contact">Contact</NavLink>
          </li>
          <li>
            {/* <a href="">Profile</a> */}
            <NavLink to="profile">Profile</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
