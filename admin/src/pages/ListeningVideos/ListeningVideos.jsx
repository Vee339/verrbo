import { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const apiKey = `AIzaSyBGMQBzySjWxCOzdtVLmE6b6Lv_EogFwnE`;

export default function ListeningVideos() {
  const [videosList, setVideosList] = useState([]);
  const [videoInfo, setVideoInfo] = useState({});

  useEffect(() => {
    async function getVideos() {
      try {
        const response = await fetch("/api/listeningvideos");
        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const data = await response.json();
        setVideosList(data);

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
        console.log(`Could not retrieve the videos list: ${err}`);
      }
    }
    getVideos();
  }, []);
  return (
    <>
      <h1>YouTube Videos Database: </h1>
      <Link to="add" className="actionBtn add">
        <IoAddSharp />
        Add New
      </Link>
      <ul className="contentContainer">
        {videosList.map((video) => {
          const info = videoInfo[video.youtubeId];
          return (
            <li key={video.youtubeId}>
              <h3 className="videoTitle">
                Video Title: {info?.snippet?.title}
              </h3>
              <p className="videoId">YouTube Id: {video.youtubeId}</p>
              <div className="buttons">
                <Link
                  to="edit"
                  state={{
                    youtubeId: video.youtubeId,
                    level: video.level,
                    transcript: video.transcript,
                  }}
                  className="actionBtn edit"
                >
                  <CiEdit />
                </Link>
                <Link
                  to="delete"
                  state={{ youtubeId: video.youtubeId }}
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
