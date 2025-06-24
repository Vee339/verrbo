import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    async function logoutUser() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/logout`,
          {
            credentials: "include",
            method: "POST",
          }
        );

        if (res.ok) {
          console.log("Logged out successfully");
        } else {
          console.error("Failed to log out");
        }
        navigate("/user/login", { replace: true });
      } catch (err) {
        console.error("Logout error:", err);
        navigate("/user/login", { replace: true });
      }
    }
    logoutUser();
  }, [navigate]);
  return <p>Logging out....</p>;
}
