import { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function WritingTopics() {
  const [writingTopicsList, setWritingTopicsList] = useState([]);

  useEffect(() => {
    async function getWritingTopics() {
      try {
        const response = await fetch("/api/writingtopics");
        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const data = await response.json();
        setWritingTopicsList(data);
      } catch (err) {
        console.log(`Could not retrieve the videos list: ${err}`);
      }
    }
    getWritingTopics();
  }, []);

  return (
    <>
      <h1>Writing Topics Database: </h1>
      <Link to="add" className="actionBtn add">
        <IoAddSharp />
        Add New
      </Link>
      <ul className="contentContainer">
        {writingTopicsList.map((writingTopic) => {
          return (
            <li key={writingTopic._id}>
              <h3 className="writingTopic">Topic: {writingTopic.topic}</h3>
              <p className="level">Level: {writingTopic.level}</p>
              <div className="buttons">
                <Link
                  to="edit"
                  state={{
                    id: writingTopic._id,
                    topic: writingTopic.topic,
                    level: writingTopic.level,
                  }}
                  className="actionBtn edit"
                >
                  <CiEdit />
                </Link>
                <Link
                  to="delete"
                  state={{ id: writingTopic._id }}
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
