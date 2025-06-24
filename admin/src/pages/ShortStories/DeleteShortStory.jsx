import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function DeleteShortStory() {
  let location = useLocation();
  const id = location.state.id;

  const navigate = useNavigate();

  async function handleDelete(e) {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/deleteshortstory?id=${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (res.ok) {
        console.log("Story has been deleted successfully");
        navigate("/shortstories");
      } else {
        console.log("Failed to delete the story");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main>
      <h1>Do you want to the Delete this Story: {id}</h1>
      <p className="notice">
        <strong>Note:</strong>This action cannot be undone.
      </p>
      <div className="buttons deletePage">
        <Link className="actionBtn cancel" to="/shortstories">
          Cancel
        </Link>
        <Link className="actionBtn confirmDelete" onClick={handleDelete}>
          Confirm Delete
        </Link>
      </div>
    </main>
  );
}
