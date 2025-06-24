import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function EditSpeakingTopic() {
  let location = useLocation();
  const navigate = useNavigate();

  const topicId = location.state.id;
  const [speakingTopic, setSpeakingTopic] = useState(location.state.topic);
  const [level, setLevel] = useState(location.state.level);

  async function handleSubmit(e) {
    e.preventDefault();

    const topicData = {
      id: topicId,
      topic: speakingTopic,
      level: level,
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/updatespeakingtopic`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(topicData),
        }
      );
      if (res.ok) {
        console.log("Topic has been successfully");
        setSpeakingTopic("");
        setLevel("");
        navigate("/speakingtopics");
      } else {
        console.log("Failed to update the topic");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1>Edit the Speaking Topic in the Database</h1>
      <form onSubmit={handleSubmit}>
        <h2>Edit the data below:</h2>
        <div className="inputBox">
          <label htmlFor="">Topic:</label>
          <textarea
            name="speaking_topic"
            id="speakingTopic"
            cols="30"
            rows="5"
            value={speakingTopic}
            placeholder="Write the topic in one to two lines"
            onChange={(e) => setSpeakingTopic(e.target.value)}
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

        <input type="submit" value="Save Changes" className="actionBtn add" />
      </form>
    </>
  );
}
