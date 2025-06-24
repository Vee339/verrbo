import { IoMdRefresh } from "react-icons/io";
import styles from "./writing.module.css";
import { useState, useEffect } from "react";

export default function Writing() {
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    fetchTopic();
  }, []);

  async function fetchTopic() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/writingtopic`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }

      const retrievedTopic = await response.json();
      setTopic({
        topicId: retrievedTopic._id,
        question: retrievedTopic.topic,
        level: retrievedTopic.level,
      });
    } catch (err) {
      console.log("Failed to fetch writing topic:", err);
    }
  }
  if (!topic) {
    return <p>Loading....</p>;
  }
  return (
    <main>
      <h1>{topic.question}</h1>
      <button className={`btn ${styles.changeTopic}`} onClick={fetchTopic}>
        <span>
          <IoMdRefresh />
        </span>
        Change Topic
      </button>
      <form method="POST" action="/api/adduserwriting">
        <input type="hidden" name="topic_id" value={topic.topicId} />
        <textarea
          placeholder="Start writing here..."
          name="writing_content"
        ></textarea>
        <div className={styles.buttons}>
          <button className="btn secondary">Save as a draft</button>
          <button type="submit" className="btn">
            Save
          </button>
        </div>
      </form>
    </main>
  );
}
