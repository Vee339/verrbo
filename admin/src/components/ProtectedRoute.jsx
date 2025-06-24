import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/session`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();

        if (data.loggedIn && data.role === "admin") {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
        setAuthChecked(true);
      } catch (err) {
        console.log("Error checking session:", err);
        setAuthChecked(true);
      }
    }
    checkSession();
  }, []);

  if (!authChecked) {
    return <p>Checking authentication...</p>;
  }

  if (!isAuthorized) {
    return <Navigate to="/admin/login" />;
  }

  return children;
}
