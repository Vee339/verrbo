import { IoMdRefresh } from "react-icons/io";
import { FaMicrophoneAlt } from "react-icons/fa";
import styles from "./speaking.module.css";
import { useState, useEffect } from "react";

export default function Speaking() {
  const [topic, setTopic] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    fetchTopic();
  }, []);

  async function fetchTopic() {
    try {
      const response = await fetch("/api/speakingtopic");
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
      console.log("Failed to fetch speaking topic:", err);
    }
  }
  if (!topic) {
    return <p>Loading....</p>;
  }
  return (
    <main>
      <h1>{topic.question}</h1>
      <button onClick={fetchTopic} className={`btn ${styles.changeTopic}`}>
        <span>
          <IoMdRefresh />
        </span>
        Change Topic
      </button>
      <div className={styles.micElem}>
        <button className={styles.micBtn}>
          <FaMicrophoneAlt />
        </button>
      </div>
      <div className={styles.actionBtns}>
        {isRecording ? (
          <>
            <button className="btn">Reset</button>
            <button className="btn">Pause</button>
            <button className="btn">Done</button>
          </>
        ) : (
          <button className="btn">Start Recording</button>
        )}
      </div>
    </main>
  );
}
