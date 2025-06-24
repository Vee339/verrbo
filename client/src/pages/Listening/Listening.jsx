import styles from "./listening.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

export default function Listening() {
  const [retrievedVideos, setRetrievedVideos] = useState([]);
  const [videoInfo, setVideoInfo] = useState({});

  useEffect(() => {
    async function retrieveVideos() {
      try {
        // fetch all the videoIDs from the Database
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/listeningvideos`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const data = await response.json();
        setRetrievedVideos(data);

        // fetch information of all the videos with the help of YouTube IDs
        const videoInfos = await Promise.all(
          data.map(async (video) => {
            const res = await fetch(
              `https://www.googleapis.com/youtube/v3/videos?id=${video.youtubeId}&key=${apiKey}&part=snippet,statistics&fields=items(id,snippet,statistics)`
            );
            const json = await res.json();
            return { id: video.youtubeId, data: json.items[0] };
          })
        );

        const infoMap = {};
        videoInfos.forEach((item) => {
          infoMap[item.id] = item.data;
        });
        setVideoInfo(infoMap);
      } catch (err) {
        console.log(`Failed to fetch writing topic: ${err}`);
      }
    }
    retrieveVideos();
  }, []);

  return (
    <main>
      <h1>Videos to Train your Ears to the Language </h1>
      <div className={styles.videosContainer}>
        {retrievedVideos.map((video) => {
          const info = videoInfo[video.youtubeId];
          return (
            <Link
              to="practice"
              state={{ videoId: video.youtubeId, transcript: video.transcript }}
              key={video.youtubeId}
              className={styles.videoCard}
            >
              <p className={styles.videoTitle}>{info?.snippet?.title}</p>
              <img
                className={styles.videoThumbnail}
                src={info?.snippet?.thumbnails?.medium?.url}
                alt=""
              />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
