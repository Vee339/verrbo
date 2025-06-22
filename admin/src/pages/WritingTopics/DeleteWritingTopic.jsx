import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function DeleteWritingTopic() {
  let location = useLocation();
  const id = location.state.id;

  const navigate = useNavigate();

  async function handleDelete(e) {
    e.preventDefault();
    try {
      const res = await fetch(`/api/deletewritingtopic?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        console.log("Topic has been deleted successfully");
        navigate("/writingtopics");
      } else {
        console.log("Failed to delete the topic");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main>
      <h1>Do you want to the Delete this Writing Topic: {id}</h1>
      <p className="notice">
        <strong>Note:</strong>This action cannot be undone.
      </p>
      <div className="buttons deletePage">
        <Link className="actionBtn cancel" to="/writingtopics">
          Cancel
        </Link>
        <Link className="actionBtn confirmDelete" onClick={handleDelete}>
          Confirm Delete
        </Link>
      </div>
    </main>
  );
}
