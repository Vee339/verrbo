import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddVideo() {
  const navigate = useNavigate();

  const [videoUrl, setVideoUrl] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [level, setLevel] = useState("");
  const [transcript, setTranscript] = useState("");

  function extractYoutubeId(url) {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setVideoUrl(url);

    const id = extractYoutubeId(url);

    if (id) {
      setYoutubeId(id);
    } else {
      setYoutubeId("");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const videoData = { youtubeId, level, transcript };
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/addyoutubevideo`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(videoData),
        }
      );
      if (res.ok) {
        console.log("Video added successfully");
        setVideoUrl("");
        setYoutubeId("");
        setLevel("");
        setTranscript("");
        navigate("/listeningvideos");
      } else {
        console.log("Failed to add video");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1>Add a video that you think will help the learners</h1>
      <form onSubmit={handleSubmit}>
        <h2>Fill the data below:</h2>
        <div className="inputBox">
          <label htmlFor="">URL:</label>
          <input
            type="text"
            value={videoUrl}
            placeholder="Copy and Paste the link of the YouTube here"
            onChange={handleUrlChange}
            required
          />
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
        <input type="submit" value="Submit" className="actionBtn add" />
      </form>
    </>
  );
}
