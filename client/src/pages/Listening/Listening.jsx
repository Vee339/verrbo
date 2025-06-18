import styles from "./listening.module.css";
import { useEffect, useState } from "react";

const apiKey = `AIzaSyBGMQBzySjWxCOzdtVLmE6b6Lv_EogFwnE`;

export default function Listening() {
  const [retrievedVideos, setRetrievedVideos] = useState([]);
  const [videoInfo, setVideoInfo] = useState({});

  useEffect(() => {
    async function retrieveVideos() {
      try {
        const response = await fetch("/api/listeningvideos");
        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const data = await response.json();
        setRetrievedVideos(data);
      } catch (err) {
        console.log("Failed to fetch writing topic");
      }
    }
    retrieveVideos();
  }, []);

  async function getVideoInfo(youtubeId) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&key=${apiKey}&part=snippet,statistics&fields=items(id,snippet,statistics)`
      );
      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }
      const videoData = await response.json();
      setVideoInfo(videoData);
    } catch (err) {
      console.log("Failed to fetch the video");
    }
  }
  return (
    <main>
      <h1>Videos to Train your Ears to the Language </h1>
      <div className={styles.videoContainer}>
        {retrievedVideos.map((video) => {
          const videoInfo = getVideoInfo(video.youtubeId);
          console.log(videoInfo);
          return <p key={video.youtubeId}>{video.youtubeId}</p>;
        })}
      </div>
    </main>
  );
}
