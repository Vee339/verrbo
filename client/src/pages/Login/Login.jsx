import styles from "./login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = { username, password };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/login`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

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
      setError("Incorrect combination of Username and Password", err.message);
    }
  }

  return (
    <main className={styles.mainContent}>
      <h1 className={styles.loginHeading}>Login to your account</h1>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <label htmlFor="username" className={styles.formLabel}>
            Username:
          </label>
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
        <div className={styles.inputBox}>
          <label htmlFor="password" className={styles.formLabel}>
            Password:
          </label>
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
        <p className={styles.registerLink}>
          Don't have an account? <Link to="/user/register">Register Now</Link>
        </p>
      </form>
    </main>
  );
}
