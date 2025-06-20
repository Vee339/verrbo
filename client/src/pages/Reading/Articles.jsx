import styles from "./reading.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/readingarticles");
        if (!res.ok) {
          throw new Error(`HTTP Error! status: ${res.status}`);
        }
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.log(`Failed to fetch the stories: ${err}`);
      }
    }
    fetchArticles();
  }, []);

  return (
    <main>
      <h1>Click on any Article that Interests You</h1>
      <div className={styles.articlesList}>
        {articles.map((article) => {
          return (
            <h2 className={styles.article} key={article._id}>
              <Link
                to="article"
                state={{
                  title: article.title,
                  body: article.content,
                  level: article.level,
                  website: article.website_name,
                  website_url: article.website_url,
                  author: article.author_name,
                  link: article.article_url,
                }}
                className={styles.articleCard}
              >
                {article.title}
              </Link>
            </h2>
          );
        })}
      </div>
    </main>
  );
}
