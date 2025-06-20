import { useState } from "react";

export default function AddVideo() {
  const [youtubeId, setYoutubeId] = useState("");
  const [level, setLevel] = useState("");
  const [transcript, setTranscript] = useState("");

  return (
    <>
      <h1>Add a video that you think will help the learners</h1>
      <form action="">
        <h2>Fill the data below:</h2>
        <div className="inputBox">
          <label htmlFor="">URL:</label>
          <input
            type="text"
            value="url"
            placeholder="Copy and Paste the link of the YouTube here"
            required
          />
        </div>
        <div className="inputBox">
          <label htmlFor="proficiencyLevel">CEFR Level:</label>
          <select name="level" id="proficiencyLevel">
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
            placeholder="Write or paste the transcript of the video"
            required
          ></textarea>
        </div>
        <input type="submit" value="Submit" className="actionBtn add" />
      </form>
    </>
  );
}
