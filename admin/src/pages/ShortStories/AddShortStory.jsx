import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddShortStory() {
  const navigate = useNavigate();

  const [storyTitle, setStoryTitle] = useState("");
  const [level, setLevel] = useState("");
  const [filename, setFilename] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const storyData = {
      title: storyTitle,
      level: level,
      filename: filename,
      content: content,
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/addshortstory`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(storyData),
        }
      );
      if (res.ok) {
        console.log("Story has been added successfully");
        setStoryTitle("");
        setContent("");
        setLevel("");
        setFilename("");
        navigate("/shortstories");
      } else {
        console.log("Failed to add the story");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1>Add a Story in the Database</h1>
      <form onSubmit={handleSubmit}>
        <h2>Fill the information below:</h2>
        <div className="inputBox">
          <label htmlFor="storyTitle">Title:</label>
          <input
            type="text"
            name="story_title"
            id="storyTitle"
            value={storyTitle}
            placeholder="Title of the Story"
            onChange={(e) => setStoryTitle(e.target.value)}
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
          <label htmlFor="storyContent">Content:</label>
          <textarea
            name="storyContent"
            id="storyContent"
            cols="30"
            rows="10"
            value={content}
            placeholder="Content of the Story"
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="inputBox">
          <label htmlFor="filename">Filename:</label>
          <input
            type="text"
            name="website_name"
            id="filename"
            value={filename}
            placeholder="Filename of the image added"
            onChange={(e) => setFilename(e.target.value)}
            required
          />
        </div>
        <input type="submit" value="Submit" className="actionBtn add" />
      </form>
    </>
  );
}
