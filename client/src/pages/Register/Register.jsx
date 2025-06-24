import styles from "./register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("user");

  async function handleSubmit(e) {
    e.preventDefault();
    const userDetails = { username, email, password, role };

    try {
      const res = await fetch("/api/user/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Registeration is successful");
        console.log("User Role:", data.role);
        setUsername("");
        setPassword("");
        setEmail("");
        navigate("/user/login");
      } else {
        throw new Error(data.message || "Failed to login");
      }
    } catch (err) {
      setError("Registration is Failed", err.message);
    }
  }

  return (
    <main className={styles.mainContent}>
      <h1 className={styles.registerHeading}>Create a new account</h1>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
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
          <label htmlFor="email" className={styles.formLabel}>
            Email:
          </label>
          <input
            type="email"
            value={email}
            name="email"
            id="email"
            className={styles.emailInput}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" className={styles.registerBtn}>
          Register
        </button>
        <p className={styles.loginLink}>
          Already have an account? <Link to="/user/login">Login Here</Link>
        </p>
      </form>
    </main>
  );
}
