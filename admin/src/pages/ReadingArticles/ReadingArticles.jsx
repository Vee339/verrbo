import { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function ReadingArticles() {
  const [readingArticlesList, setReadingArticlesList] = useState([]);

  useEffect(() => {
    async function getReadingArticles() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/readingarticles`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const data = await response.json();
        setReadingArticlesList(data);
      } catch (err) {
        console.log(`Could not retrieve the articles list: ${err}`);
      }
    }
    getReadingArticles();
  }, []);

  return (
    <>
      <h1>Reading Articles Database:</h1>
      <Link to="add" className="actionBtn add">
        <IoAddSharp />
        Add New
      </Link>
      <ul className="contentContainer">
        {readingArticlesList.map((readingArticle) => {
          return (
            <li key={readingArticle._id}>
              <h3 className="readingArticle">Topic: {readingArticle.title}</h3>
              <p className="contentStr">
                {readingArticle.content.slice(0, 400)}...
              </p>
              <p className="level">Level: {readingArticle.level}</p>
              <a href={readingArticle.website_url}>
                {readingArticle.website_name}
              </a>
              <div className="buttons">
                <Link
                  to="edit"
                  state={{
                    id: readingArticle._id,
                    title: readingArticle.title,
                    content: readingArticle.content,
                    level: readingArticle.level,
                    websiteName: readingArticle.website_name,
                    websiteUrl: readingArticle.website_url,
                    authorName: readingArticle.author_name,
                    articleUrl: readingArticle.article_url,
                  }}
                  className="actionBtn edit"
                >
                  <CiEdit />
                </Link>
                <Link
                  to="delete"
                  state={{ id: readingArticle._id }}
                  className="actionBtn delete"
                >
                  <AiOutlineDelete />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
