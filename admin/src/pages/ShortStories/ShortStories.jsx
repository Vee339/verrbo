import { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function ShortStories() {
  const [shortStoriesList, setShortStoriesList] = useState([]);

  useEffect(() => {
    async function getShortStories() {
      try {
        const response = await fetch("/api/shortstories");
        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const data = await response.json();
        setShortStoriesList(data);
      } catch (err) {
        console.log(`Could not retrieve the stories list: ${err}`);
      }
    }
    getShortStories();
  }, []);

  return (
    <>
      <h1>Short Stories Database:</h1>
      <Link to="add" className="actionBtn add">
        <IoAddSharp />
        Add New
      </Link>
      <ul className="contentContainer">
        {shortStoriesList.map((shortStory) => {
          return (
            <li key={shortStory._id}>
              <h3 className="shortStoryTitle">Title: {shortStory.title}</h3>
              <p className="filename">
                Image File: {shortStory.image_filename}
              </p>
              <p className="level">Level: {shortStory.level}</p>
              <p className="shortStory.content">
                {shortStory.body.slice(0, 190)}...
              </p>
              <div className="buttons">
                <Link
                  to="edit"
                  state={{
                    id: shortStory._id,
                    title: shortStory.title,
                    imageFilename: shortStory.image_filename,
                    content: shortStory.body,
                    level: shortStory.level,
                  }}
                  className="actionBtn edit"
                >
                  <CiEdit />
                </Link>
                <Link
                  to="delete"
                  state={{ id: shortStory._id }}
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
