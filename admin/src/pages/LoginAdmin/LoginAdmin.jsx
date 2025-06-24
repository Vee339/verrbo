import styles from "./loginadmin.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = { username, password };

    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Login is successful");
        console.log("User Role:", data.role);
        setError("");
        setUsername("");
        setPassword("");
        navigate("/");
      } else {
        throw new Error(data.message || "Failed to login");
      }
    } catch (err) {
      setError("An error occurred while logging in:", err.message);
    }
  }

  return (
    <main className={styles.mainContent}>
      <h1>Login to the Admin Dashboard</h1>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className="inputBox">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            className={styles.usernameInput}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            required
          />
        </div>
        <div className="inputBox">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            name="password"
            id="password"
            className={styles.passwordInput}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.loginBtn}>
          Login
        </button>
      </form>
    </main>
  );
}
