import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./header.module.css";

export default function Header() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/user/session");
        const data = await res.json();

        if (data.loggedIn) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (err) {
        console.log("Error checking session:", err);
      }
    }
    checkSession();
  }, []);
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
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="about">About</NavLink>
          </li>
          <li>
            <NavLink to="contact">Contact</NavLink>
          </li>
          <li>
            {isAuthorized ? (
              <NavLink to="/user/logout">Logout</NavLink>
            ) : (
              <NavLink to="/user/login">Login</NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
