import { useLocation } from "react-router-dom";
import styles from "./reading.module.css";

export default function Story() {
  let location = useLocation();
  const title = location.state.title;
  const image = location.state.imageUrl;
  const content = location.state.text;
  const level = location.state.level;
  return (
    <main>
      <h1>{title}</h1>
      <div className={styles.storiesContainer}>
        <p className={styles.storyContent}>{content}</p>
        <img src={`/images/stories/${image}`} className={styles.contentImage} />
      </div>
    </main>
  );
}
