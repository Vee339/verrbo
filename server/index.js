const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const videosRouter = require("./modules/listening_videos/router");
const writingRouter = require("./modules/writing_topics/router");
const speakingRouter = require("./modules/speaking_topics/router");

const userWritingsDb = require("./modules/user_writings/db");
const shortStoriesDb = require("./modules/short_stories/db");
const readingArticlesDb = require("./modules/reading_articles/db");

const app = express();
const port = process.env.PORT || "8888";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", videosRouter);
app.use("/", writingRouter);
app.use("/", speakingRouter);

app.get("/", async (req, res) => {
  res.send("This is the test command.");
});

app.post("/api/adduserwriting", async (req, res) => {
  const userId = "68463d32a52beee297cb0ce2";
  const topicId = req.body.topic_id;
  const content = req.body.writing_content;
  const submitted_at = new Date();
  const feedback = "Need some improvement in Grammar";
  await userWritingsDb.addUserWriting(
    userId,
    topicId,
    content,
    submitted_at,
    feedback
  );
});

app.get("/api/shortstories", async (req, res) => {
  const shortStories = await shortStoriesDb.getShortStories();
  res.json(shortStories);
});

app.get("/api/readingarticles", async (req, res) => {
  const readingArticles = await readingArticlesDb.getReadingArticles();
  res.json(readingArticles);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
