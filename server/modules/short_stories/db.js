const mongoose = require("mongoose");
const { objectId } = require("mongodb");

const dbUrl = process.env.DBHOST;

// Set up the short_stories Schema and Model
const shortStorySchema = new mongoose.Schema({
  title: String,
  level: String,
  image_filename: String,
  body: String,
});

const ShortStory = mongoose.model(
  "ShortStory",
  shortStorySchema,
  "short_stories"
);

async function connect() {
  await mongoose.connect(dbUrl);
}

async function getShortStories() {
  await connect();
  const shortStories = await ShortStory.find({});
  return shortStories;
}

module.exports = {
  getShortStories,
};
