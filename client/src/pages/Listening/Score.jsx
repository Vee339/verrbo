import { useLocation } from "react-router-dom";
import styles from "./listening.module.css";

export default function Score() {
  let location = useLocation();
  const totalWords = location.state.totalWords;
  const incorrectWords = location.state.wrongWords;
  const userWords = location.state.triedWords;
  const wrongWordsArray = [...incorrectWords];
  const wrongWords = wrongWordsArray.length;

  // Calculations
  console.log(userWords);
  console.log(totalWords);
  console.log(wrongWords);
  const correctWords = userWords - wrongWords;
  const score = ((correctWords / totalWords) * 100).toFixed(2);
  return (
    <main>
      <h1>Your Score is {score}%.</h1>
      <h2>List of words that you got wrong: </h2>
      <ul className={styles.wordsList}>
        {wrongWordsArray.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </main>
  );
}
