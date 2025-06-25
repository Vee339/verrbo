import styles from "./writing.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Journaling() {
  const navigate = useNavigate();

  const [text, setText] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/session`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      const user_id = data.userId;

      const journalData = {
        userId: user_id,
        text: text,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/addjournalentry`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(journalData),
        }
      );
      if (response.ok) {
        console.log("Journal has been added successfully");
        setText("");
        navigate("/writing/done");
      }
    } catch (err) {
      console.log(`Error occured while saving the journal: ${err}`);
    }
  }

  return (
    <main>
      <h1>Your Language Journey Journal</h1>
      <p>
        Write about anything that you want to. It could be how are feeling
        today, something that you learned today, or your opinion about your
        different types of emotions.
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Start writing here..."
          name="journal_content"
          id="journalContent"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <div className={styles.buttons}>
          <button type="submit" className="btn">
            Save
          </button>
        </div>
      </form>
    </main>
  );
}
