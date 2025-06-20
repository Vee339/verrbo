import styles from "./sidebar.module.css";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <ul>
        <li>
          <NavLink to="listeningvideos">YouTube Videos</NavLink>
        </li>
        <li>
          <NavLink to="writingtopics">Writing Topics</NavLink>
        </li>
        <li>
          <NavLink to="speakingtopics">Speaking Topics</NavLink>
        </li>
        <li>
          <NavLink to="readingarticles">Reading Articles</NavLink>
        </li>
        <li>
          <NavLink to="shortstories">Short Stories</NavLink>
        </li>
        <li>
          <NavLink to="sentences">Sentences</NavLink>
        </li>
        <li>
          <NavLink to="sentencecategories">Sentence Categories</NavLink>
        </li>
      </ul>
    </nav>
  );
}
