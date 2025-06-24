import styles from "./header.module.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h2>
        <a href="">
          <img src="/verrbo2.svg" alt="" className={styles.logoImage} />
        </a>
      </h2>
      <nav className={styles.mainNav}>
        <ul>
          <li>
            <NavLink to="">Home</NavLink>
          </li>
          <li>
            <NavLink to="">Live Site</NavLink>
          </li>
          <li>
            <NavLink to="profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/admin/logout">Logout</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
