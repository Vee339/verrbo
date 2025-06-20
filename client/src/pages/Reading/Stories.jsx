import styles from "./reading.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Stories() {
  const [stories, setStories] = useState([]);
  useEffect(() => {
    async function fetchStories() {
      try {
        const res = await fetch("/api/shortstories");
        if (!res.ok) {
          throw new Error(`HTTP Error! status: ${res.status}`);
        }
        const data = await res.json();
        setStories(data);
      } catch (err) {
        console.log(`Failed to fetch the stories: ${err}`);
      }
    }
    fetchStories();
  }, []);

  return (
    <main>
      <h1>Choose any story you want to Read</h1>
      <ul className={styles.storiesList}>
        {stories.map((story) => {
          return (
            <li className={styles.story} key={story._id}>
              <Link
                to="story"
                state={{
                  title: story.title,
                  imageUrl: story.image_filename,
                  text: story.body,
                  level: story.level,
                }}
                className={styles.storyCard}
              >
                <p className={styles.storyTitle}>{story.title}</p>
                <img
                  className={styles.storyImage}
                  src={`/images/stories/${story.image_filename}`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
