const mongoose = require("mongoose");
const { objectId } = require("mongodb");

const dbUrl = process.env.DBHOST;

// Set up the short_stories Schema and Model
const readingArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  level: String,
  website_name: String,
  website_url: String,
  author_name: String,
  article_url: String,
});

const ReadingArticle = mongoose.model(
  "ReadingArticle",
  readingArticleSchema,
  "reading_articles"
);

async function connect() {
  await mongoose.connect(dbUrl);
}

async function getReadingArticles() {
  await connect();
  const readingArticles = await ReadingArticle.find({});
  return readingArticles;
}

module.exports = {
  getReadingArticles,
};
