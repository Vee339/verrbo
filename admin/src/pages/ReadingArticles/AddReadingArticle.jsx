import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddReadingArticle() {
  const navigate = useNavigate();

  const [articleTitle, setArticleTitle] = useState("");
  const [content, setContent] = useState("");
  const [level, setLevel] = useState("");
  const [websiteName, setWebsiteName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [articleUrl, setArticleUrl] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const articleData = {
      title: articleTitle,
      content,
      level,
      websiteName,
      websiteUrl,
      authorName,
      articleUrl,
    };

    try {
      const res = await fetch("/api/addreadingarticle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articleData),
      });
      if (res.ok) {
        console.log("Article added successfully");
        setArticleTitle("");
        setContent("");
        setLevel("");
        setWebsiteName("");
        setWebsiteUrl("");
        setAuthorName("");
        setArticleUrl("");
        navigate("/readingarticles");
      } else {
        console.log("Failed to add the article");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1>Add a Reading Article in the Database</h1>
      <form onSubmit={handleSubmit}>
        <h2>Fill the information below:</h2>
        <div className="inputBox">
          <label htmlFor="articleTitle">Title:</label>
          <textarea
            name="article_title"
            id="articleTitle"
            cols="30"
            rows="5"
            value={articleTitle}
            placeholder="Title of the Article"
            onChange={(e) => setArticleTitle(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="inputBox">
          <label htmlFor="articleContent">Content:</label>
          <textarea
            name="articleContent"
            id="articleContent"
            cols="30"
            rows="14"
            value={content}
            placeholder="Content of the Article"
            onChange={(e) => setContent(e.target.value)}
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
        <div className="inputBox">
          <label htmlFor="websiteName">Website Name:</label>
          <input
            type="text"
            name="website_name"
            id="websiteName"
            value={websiteName}
            placeholder="Name of the Website"
            onChange={(e) => setWebsiteName(e.target.value)}
            required
          />
        </div>
        <div className="inputBox">
          <label htmlFor="websiteUrl">Website URL:</label>
          <input
            type="url"
            name="website_url"
            id="websiteUrl"
            value={websiteUrl}
            placeholder="URL of the Website"
            onChange={(e) => setWebsiteUrl(e.target.value)}
            required
          />
        </div>
        <div className="inputBox">
          <label htmlFor="authorName">Author(s') Name:</label>
          <input
            type="text"
            name="author_name"
            id="authorName"
            value={authorName}
            placeholder="Name of the Author(s)"
            onChange={(e) => setAuthorName(e.target.value)}
            required
          />
        </div>
        <div className="inputBox">
          <label htmlFor="articleUrl">Article URL:</label>
          <input
            type="url"
            name="article_url"
            id="articleUrl"
            value={articleUrl}
            placeholder="URL of the original article"
            onChange={(e) => setArticleUrl(e.target.value)}
            required
          />
        </div>
        <input type="submit" value="Submit" className="actionBtn add" />
      </form>
    </>
  );
}
