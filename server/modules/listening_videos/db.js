const mongoose = require("mongoose");
const { objectId } = require("mongodb");

const dbUrl = process.env.DBHOST;

// Set up the listening_video Schema and Model
const listeningVideoSchema = new mongoose.Schema({
  youtubeId: String,
  level: String,
  transcript: String,
  added_at: Date,
});

const ListeningVideo = mongoose.model(
  "ListeningVideo",
  listeningVideoSchema,
  "youtube_videos"
);

async function connect() {
  await mongoose.connect(dbUrl);
}

async function getYouTubeVideos() {
  await connect();
  const youtubeVideos = await ListeningVideo.find({});
  return youtubeVideos;
}

module.exports = {
  getYouTubeVideos,
};
