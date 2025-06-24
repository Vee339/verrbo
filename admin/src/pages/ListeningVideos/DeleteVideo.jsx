import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function DeleteVideo() {
  let location = useLocation();
  const youtubeId = location.state.youtubeId;

  const navigate = useNavigate();

  async function handleDelete(e) {
    e.preventDefault();
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/deleteyoutubevideo?youtubeId=${youtubeId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (res.ok) {
        console.log("Video deleted successfully");
        navigate("/listeningvideos");
      } else {
        console.log("Failed to delete the video");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main>
      <h1>Do you want to the Delete this Video: {youtubeId}</h1>
      <p className="notice">
        <strong>Note:</strong>This action cannot be undone.
      </p>
      <div className="buttons deletePage">
        <Link className="actionBtn cancel" to="/listeningvideos">
          Cancel
        </Link>
        <Link className="actionBtn confirmDelete" onClick={handleDelete}>
          Confirm Delete
        </Link>
      </div>
    </main>
  );
}
