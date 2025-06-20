import { useLocation } from "react-router-dom";
import styles from "./reading.module.css";

export default function Article() {
  let location = useLocation();
  const title = location.state.title;
  const body = location.state.body;
  const level = location.state.level;
  const website = location.state.website;
  const websiteUrl = location.state.website_url;
  const author = location.state.author;
  const link = location.state.link;
  return (
    <main>
      <article>
        <h1>{title}</h1>
        <p>{body}</p>
      </article>
      <p>
        Based on an article from <a href={websiteUrl}>{website}</a>:
        <a href={link}>[{title}]</a>. Written by [{author}].
      </p>
    </main>
  );
}
