const mongoose = require("mongoose");
const { objectId } = require("mongodb");

const dbUrl = process.env.DBHOST;

// Set up the writing_topic Schema and Model
const writingTopicSchema = new mongoose.Schema({
  topic: String,
  level: String,
  created_at: Date,
});

const WritingTopic = mongoose.model(
  "WritingTopic",
  writingTopicSchema,
  "writing_topics"
);

async function connect() {
  await mongoose.connect(dbUrl);
}

async function getWritingTopic() {
  await connect();
  // console.log("The database is connected");
  const writingTopics = await WritingTopic.find({});
  const randomTopic = pickRandomTopic(writingTopics);
  return randomTopic;
}

module.exports = {
  getWritingTopic,
};

function pickRandomTopic(topics) {
  const itemsCount = topics.length;
  const randomIndex = Math.floor(Math.random() * itemsCount);
  const randomItem = topics[randomIndex];
  return randomItem;
}
