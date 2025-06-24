import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    async function logoutUser() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/logout`,
          { method: "POST", credentials: "include" }
        );

        if (res.ok) {
          console.log("Logged out successfully");
        } else {
          console.error("Failed to log out");
        }
        navigate("/admin/login", { replace: true });
      } catch (err) {
        console.error("Logout error:", err);
        navigate("/admin/login", { replace: true });
      }
    }
    logoutUser();
  }, [navigate]);
  return <p>Logging out....</p>;
}
