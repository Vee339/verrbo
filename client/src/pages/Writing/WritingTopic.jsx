import { IoMdRefresh } from "react-icons/io";
import styles from "./writing.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function WritingTopic() {
  const navigate = useNavigate();

  const [topic, setTopic] = useState(null);
  const [content, setContent] = useState("");

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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/session`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      const user_id = data.userId;

      const writingData = {
        userId: user_id,
        topicId: topic.topicId,
        content: content,
        feedback: "Need some improvements",
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/adduserwriting`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(writingData),
        }
      );
      if (response.ok) {
        console.log("Writing has been added successfully");
        setContent("");
        navigate("/writing/done");
      }
    } catch (err) {
      console.log(`Could not save the writing: ${err}`);
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
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Start writing here..."
          name="writing_content"
          id="writingContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <div className={styles.buttons}>
          <button type="submit" className="btn">
            Save
          </button>
        </div>
      </form>
    </main>
  );
}
