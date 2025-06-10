const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const writingTopicsDb = require("./modules/writing_topics/db");
const userWritingsDb = require("./modules/user_writings/db");

const app = express();
const port = process.env.PORT || "8888";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("This is the test command.");
});

app.get("/api/writingtopic", async (req, res) => {
  const writingTopic = await writingTopicsDb.getWritingTopic();
  res.json(writingTopic);
});

app.post("/api/adduserwriting", async (req, res) => {
  /*
  const userId = "68463d32a52beee297cb0ce2";
  const topicId = "6840d6a484dbb5b392cb0ce2";
  const content =
    "This is my first writing on the verrbo app. I love all of my writings. I want to improve my language learning abilities with this app. Till then have a nice day.";

  const submitted_at = new Date();
  const feedback = "Need some improvement in Grammar";
  await userWritingsDb.addUserWriting(
    userId,
    topicId,
    content,
    submitted_at,
    feedback
  );
  */
  // console.log("The writing has been submitted by the user.");
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
