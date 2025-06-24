import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddWritingTopic() {
  const navigate = useNavigate();

  const [writingTopic, setWritingTopic] = useState("");
  const [level, setLevel] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const topicData = {
      topic: writingTopic,
      level: level,
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/addwritingtopic`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(topicData),
        }
      );
      if (res.ok) {
        console.log("Topic added successfully");
        setWritingTopic("");
        setLevel("");
        navigate("/writingtopics");
      } else {
        console.log("Failed to add the topic");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1>Add a Writing Topic in the Database</h1>
      <form onSubmit={handleSubmit}>
        <h2>Fill the data below:</h2>
        <div className="inputBox">
          <label htmlFor="">Topic:</label>
          <textarea
            name="writing_topic"
            id="writingTopic"
            cols="30"
            rows="5"
            value={writingTopic}
            placeholder="Write the topic in one to two lines"
            onChange={(e) => setWritingTopic(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="inputBox">
          <label htmlFor="proficiencyLevel">CEFR Level:</label>
          <select
            value={level}
            name="level"
            id="proficiencyLevel"
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
          </select>
        </div>

        <input type="submit" value="Submit" className="actionBtn add" />
      </form>
    </>
  );
}
