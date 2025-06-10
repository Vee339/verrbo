import { IoMdRefresh } from "react-icons/io";
import styles from "./writing.module.css";
import { useState } from "react";

export default function Writing() {
  const [topic, setTopic] = useState({
    topicId: "68475961bf8a7e72a5cb0ce2",
    question:
      "Describe the first memory of your childhood when you learned something.",
    level: "B1",
  });
  async function changeTopic() {
    try {
      const response = await fetch("/api/writingtopic");
      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }

      const retrievedTopic = await response.json();
      // setTopic(retrievedTopic.topic);
      setTopic({
        topicId: retrievedTopic._id,
        question: retrievedTopic.topic,
        level: retrievedTopic.level,
      });
      console.log(topic.topicId);
    } catch (err) {
      console.log("Failed to fetch writing topic:", err);
    }
  }
  return (
    <main>
      <h1>{topic.question}</h1>
      <button className={`btn ${styles.changeTopic}`} onClick={changeTopic}>
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
          {/* <a href="">Save as draft</a> */}
          <button type="submit" className="btn">
            Save
          </button>
        </div>
      </form>
    </main>
  );
}
