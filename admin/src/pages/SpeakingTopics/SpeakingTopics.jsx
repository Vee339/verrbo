import { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function SpeakingTopics() {
  const [speakingTopicsList, setSpeakingTopicsList] = useState([]);

  useEffect(() => {
    async function getSpeakingTopics() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/speakingtopics`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const data = await response.json();
        setSpeakingTopicsList(data);
      } catch (err) {
        console.log(`Could not retrieve the videos list: ${err}`);
      }
    }
    getSpeakingTopics();
  }, []);

  return (
    <>
      <h1>Speaking Topics Database: </h1>
      <Link to="add" className="actionBtn add">
        <IoAddSharp />
        Add New
      </Link>
      <ul className="contentContainer">
        {speakingTopicsList.map((speakingTopic) => {
          return (
            <li key={speakingTopic._id}>
              <h3 className="speakingTopic">Topic: {speakingTopic.topic}</h3>
              <p className="level">Level: {speakingTopic.level}</p>
              <div className="buttons">
                <Link
                  to="edit"
                  state={{
                    id: speakingTopic._id,
                    topic: speakingTopic.topic,
                    level: speakingTopic.level,
                  }}
                  className="actionBtn edit"
                >
                  <CiEdit />
                </Link>
                <Link
                  to="delete"
                  state={{ id: speakingTopic._id }}
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
