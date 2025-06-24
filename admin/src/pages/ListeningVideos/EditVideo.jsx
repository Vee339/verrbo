import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditVideo() {
  let location = useLocation();
  const navigate = useNavigate();
  const youtubeId = location.state.youtubeId;
  const [level, setLevel] = useState(location.state.level);
  const [transcript, setTranscript] = useState(location.state.transcript);

  async function handleSubmit(e) {
    e.preventDefault();

    const videoData = { youtubeId, level, transcript };
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/updateyoutubevideo`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(videoData),
        }
      );
      if (res.ok) {
        console.log("Video updated successfully");
        navigate("/listeningvideos");
      } else {
        console.log("Failed to update the video");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1>Edit the video: {youtubeId}</h1>
      <form onSubmit={handleSubmit}>
        <h2>Fill the data below:</h2>
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
        <div className="inputBox">
          <label htmlFor="">Transcript:</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            value={transcript}
            placeholder="Write or paste the transcript of the video"
            onChange={(e) => setTranscript(e.target.value)}
            required
          ></textarea>
        </div>
        <input type="submit" value="Save Changes" className="actionBtn add" />
      </form>
    </>
  );
}
